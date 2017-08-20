# ImageSegmentation.jl

## Introduction

Image Segmentation is the process of partitioning the image into regions that have similar attributes. Image segmentation has various applications e.g, medical image segmentation, image compression and is used as a preprocessing step in higher level vision tasks like object detection and optical flow. This package is a collection of image segmentation algorithms written in Julia.

## Installation

```julia
Pkg.add("ImageSegmentation")
```

## Example

Let's see an example on how to use the segmentation algorithms in this package. We will try to seperate the deer, the ground and the sky in the image below using seeded region growing algorithm. This algorithm initializes the regions as the user-provided seed points and iteratively adds pixels to each region.

![Original](assets/segmentation/deer.jpg) 

```julia
using Images, ImageSegmentation, ImageView

img = load("deer.jpg")
seeds = [(CartesianIndex(75, 250), 1), (CartesianIndex(150,165), 2), (CartesianIndex(200, 300), 3)]
segments = seeded_region_growing(img, seeds)
imshow(map(i->segments.segment_means[i], segments.image_indexmap))
```

![Original](assets/segmentation/deer_seg1.jpg) 

All the segmentation algorithm (except Fuzzy C-means) return a struct `SegmentedImage` that stores the segmentation result. `SegmentedImage` contains a list of applied labels and an array containing the assigned label for each pixel. `seeded_region_growing` needs the initial seed points from the user. Some algorithms only need to know the number of segments or level of detail in segmentation. For example, `felzenszwalb` only needs a single parameter k which controls the size of segments. Larger k will result in bigger segments.

```julia
using Images, ImageSegmentation, ImageView

img = load("deer.jpg")
segments = felzenszwalb(img, 100)
imshow(map(i->segments.segment_means[i], segments.image_indexmap))

segments = felzenszwalb(img, 5)  #smaller segments but noisy segmentation
imshow(map(i->segments.segment_means[i], segments.image_indexmap))

segments = felzenszwalb(img, 5, 100)  #removes small segments
imshow(map(i->segments.segment_means[i], segments.image_indexmap))
```

![Original](assets/segmentation/deer_seg2.jpg)  ![Original](assets/segmentation/deer_seg3.jpg)  ![Original](assets/segmentation/deer_seg4.jpg)

`felzenzwalb` takes an optional argument `min_size` - it removes all segments smaller with less the `min_size` pixels. Most methods don't remove small segments in their core algorithm. We can use the `prune_segments` method to postprocess the segmentation result and remove small segments.


## Algorithms

#### Seeded Region Growing

This algorithm segments an image with repsect to a set of *n* seeds. Given the
set of seeds in the form of a vector of tuples of `CartesianIndex` and label,
the algorithm tries to assign these labels to each of the remaining points.

###### Demo

```julia
julia> using ImageSegmentation, Images;
julia> img = load("worm.jpg");
julia> seeds = [(CartesianIndex(104, 48), 1), (CartesianIndex( 49, 40), 1),
                (CartesianIndex( 72,131), 1), (CartesianIndex(109,217), 1),
                (CartesianIndex( 28, 87), 2), (CartesianIndex( 64,201), 2),
                (CartesianIndex(104, 72), 2), (CartesianIndex( 86,138), 2)];
julia> seg = seeded_region_growing(img, seeds);
```
**Original:**

![Original](assets/segmentation/worm.jpg)

**Segmented Image with labels replaced by their intensity means:**

![SegmentedImage](assets/segmentation/worm_seg.jpg)

#### Unseeded Region Growing

This algorithm is similar to [Seeded Region Growing](@ref) but does not require
any prior information about the seed points. This algorithm checks all the
boundary points and tries to find the most suitable pixel-label pair. It then
assigns that pixel to the label and updates the boundary points. If no such
pair is found, a new label is assigned to that pixel and the list of labels is updated.

###### Demo

```julia
julia> using ImageSegmentation, Images;
julia> img = load("scene.jpg");
julia> seg = unseeded_region_growing(img, 0.08);
```

| Threshold | Output | Compression percentage|
| ------------- | ----------| -------------------------|
| Original    | ![scene](https://user-images.githubusercontent.com/15063205/27087931-ecf2490c-5073-11e7-902f-e28b68975979.jpg) | 0 % |
| 0.02 | ![seg1](https://user-images.githubusercontent.com/15063205/27088052-41996c74-5074-11e7-9ff1-1941d1be88c4.jpg) | 50% |
| 0.05 | ![seg2](https://user-images.githubusercontent.com/15063205/27088179-9761458c-5074-11e7-9305-91411d862b22.jpg) | 62.5% |
| 0.1 | ![seg3](https://user-images.githubusercontent.com/15063205/27088318-f556be88-5074-11e7-9b1e-271963060e90.jpg) | 70.8% |
| 0.2 | ![seg4](https://user-images.githubusercontent.com/15063205/27088449-4ed7774a-5075-11e7-91bd-f18438ca57a0.jpg) | 79.2% |


#### Felzenswalb's Region Merging Algorithm

This algorithm operates on a Region Adjacency Graph (RAG). Each pixel/region is a node in the graph and adjacent pixels/regions have edges between them with weight measuring the dissimilarity between pixels/regions. The algorithm repeatedly merges similar regions till we get the final segmentation. It efficiently computes oversegmented “superpixels” in an image. The function can be directly called with an image (the implementation internally creates a RAG of the image first and then proceeds).

###### Demo

```julia
using Images, ImageSegmentation, TestImages;

img = Gray.(testimage("house"));
segments = felzenszwalb(img, 300, 100);
```

![img1](assets/segmentation/house.jpg) ![img2](assets/segmentation/felzenszwalb.jpg)

#### MeanShift Segmentation

MeanShift is a clustering technique. It's primary advantages are that it doesn't assume a prior on the shape of the cluster (e.g, gaussian for k-means) and we also don't need to know the number of clusters beforehand. The algorithm doesn't scale well with size of image.

#### Fast Scanning

Fast scanning algorithm tries to segment the image in two pass by comparing
each pixel to its left-neighbour and noting if it can be merged with them. If it
can't be merged then a new label is assigned to it. If more than one labels can be
assigned then all the applicable labels are merged together. Since it requires only
two passes, it is very fast and can be used in real time applications.

**Time Complexity:** ``O(n)`` where ``n`` is the number of pixels

###### Demo

```julia
julia> using ImageSegmentation, TestImages;
julia> img = testimage("camera");
julia> seg = fast_scanning(img, 0.1);
julia> seg = prune_segments(seg, i->(seg.segment_pixel_count[i]<50), (i,j)->(-seg.segment_pixel_count[j]))
```

**Original:**

![Original](assets/segmentation/camera.jpg)

**Segmented Image:**

![SegmentedImage](assets/segmentation/camera_seg.jpg)

#### Region Splitting using RegionTrees

This algorithm follows the divide and conquer methodology. If the input
image is homogeneous then nothing is to be done. In the other case, the
image is split into two across every dimension and the smaller parts are
segmented recursively. This procedure generates a region tree which can
be used to create a segmented image.

**Time Complexity:** ``O(n*log(n))`` where ``n`` is the number of pixels

###### Demo

```julia
julia> using TestImages, ImageSegmentation;
julia> img = testimage("lena_gray")
julia> function homogeneous(img)
           min, max = extrema(img)
           max - min < 0.2
       end
julia> seg = region_splitting(img, homogeneous);
```

**Original:**

![Original](assets/segmentation/lena.jpg)

**Segmented Image with labels replaced by their intensity means:**

![SegmentedImage](assets/segmentation/lena_seg.jpg)

#### Fuzzy C-means

Fuzzy C-means clustering is widely used for unsupervised image segmentation. It is an
iterative algorithm which tries to minimize the cost function:

```math
J = \displaystyle\sum_{i=1}^{N} \sum_{j=1}^{C} \delta_{ij} \| x_{i} - c_{j} \|^2
```

Unlike K-means, it allows pixels to belong to two or more clusters. It is widely used
for medical imaging like in the soft segmentation of brain tissue model.

**Time Complexity:** ``O(n*C^2*iter)`` where ``n`` is the number of pixels, ``C`` is
number of clusters and ``iter`` is the number of iterations.

###### Demo

```julia
julia> using ImageSegmentation, Images;
julia> img = load("ring.jpg");
julia> r = fuzzy_cmeans(img, 4, 1.8);
```

**Original**

![Original](assets/segmentation/ring.jpg)

**Output with pixel intensity = cluster center intensity * membership of pixel in that class**

![SegmentedImage1](assets/segmentation/ring_s1.jpg) ![SegmentedImage2](assets/segmentation/ring_s3.jpg)
![SegmentedImage3](assets/segmentation/ring_s4.jpg) ![SegmentedImage4](assets/segmentation/ring_s2.jpg)

#### Watershed

The watershed algorithm treats an image as a topographic surface where bright pixels correspond to peaks and dark pixels correspond to valleys. The algorithm starts flooding from valleys (local minima) of this topographic surface and region boundaries are formed when water from different sources merge. If the image is noisy, this approach leads to oversegmetation. To prevent oversegmentation, marker-based watershed is used i.e. the topographic surface is flooded from a predefined set of markers.  

###### Demo

```julia
using Images, ImageSegmentation;

img = load(download("http://docs.opencv.org/3.1.0/water_coins.jpg"));
bw = Gray.(img).>0.5;
dist = 1.-distance_transform(feature_transform(bw));
markers = label_components(dist.<-15);
segments = watershed(dist, markers);
```

![img1](assets/segmentation/water_coins.jpg) ![img2](assets/segmentation/watershed.jpg)

## Some helpful functions

#### Creating a Region Adjacency Graph (RAG)

A region adjacency graph can directly be constructed from a `SegmentedImage`
using the `region_adjacency_graph` function. Each segment is denoted by a vertex
and edges are constructed between adjacent segments. The output is a tuple of
`SimpleWeightedGraph` and a Dict(label=>vertex) with weights assigned according to `weight_fn`.

```julia
julia> using ImageSegmentation, Distances
julia> weight_fn(i,j) = euclidean(seg.segment_pixel_count[i], seg.segment_pixel_count[j]);
julia> G, vert_map = region_adjacency_graph(seg, weight_fn);    # `seg` is a `SegmentedImage`
julia> G
{2536, 6536} undirected simple Int64 graph with Float64 weights
```

#### Creating a Region Tree

A region tree can be constructed from an image using `region_tree` function.
If the image is not homogeneous, then it is split into half along each dimension and
the function is called recursively for each portion of the image. The output is a
`RegionTree`.

```julia
julia> using ImageSegmentation
julia> function homogeneous(img)
           min, max = extrema(img)
           max - min < 0.2
       end
julia> t = region_tree(img, homogeneous)        # `img` is an image
Cell: RegionTrees.HyperRectangle{2,Float64}([1.0, 1.0], [300.0, 300.0])
```

#### Pruning unnecessary segments

All the unnecessary segments can be easily removed from a `SegmentedImage` using
`prune_segments`. It removes a segment by replacing it with the neighbor which has
the least value of `diff_fn`. A list of the segments to be removed can be supplied.
Alternately, a function can be supplied that return true for the labels that must
be removed.

!!! note
    The resultant `SegmentedImage` might have the different labels compared to
    the original `SegmentedImage`.

```julia
julia> seg.image_indexmap
4×4 Array{Int64,2}:
 1  1  3  3
 1  1  3  3
 2  2  2  2
 2  2  2  2
julia> diff_fn(rem_label, neigh_label) = seg.segment_pixel_count[rem_label] - seg.segment_pixel_count[neigh_label];
julia> new_seg = prune_segments(seg, [3], diff_fn);
julia> new_seg.image_indexmap
4×4 Array{Int64,2}:
 1  1  2  2
 1  1  2  2
 2  2  2  2
 2  2  2  2
```

#### Removing a segment

If only one segment is to be removed, then `rem_segment!` can be used.
It removes a segment from a `SegmentedImage` in place, replacing it with the
neighbouring segment having least `diff_fn` value.

!!! note
    If multiple segments need to be removed then [`prune_segments`](@ref) should be
    preferred as it is much more time efficient than calling `rem_segment!` multiple times.

```julia
julia> seg.image_indexmap
4×4 Array{Int64,2}:
 1  1  3  3
 1  1  3  3
 2  2  2  2
 2  2  2  2
julia> diff_fn(rem_label, neigh_label) = seg.segment_pixel_count[rem_label] - seg.segment_pixel_count[neigh_label];
julia> rem_segment!(seg, 3, diff_fn);
julia> seg.image_indexmap
4×4 Array{Int64,2}:
 1  1  2  2
 1  1  2  2
 2  2  2  2
 2  2  2  2
```
