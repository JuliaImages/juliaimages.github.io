# ImageSegmentation.jl

## Introduction

Image Segmentation is the process of partitioning the image into regions that have similar attributes. Image segmentation has various applications e.g, medical image segmentation, image compression and is used as a preprocessing step in higher level vision tasks like object detection and optical flow. This package is a collection of image segmentation algorithms written in Julia.

## Installation

```julia
Pkg.add("ImageSegmentation")
```

## Functions

All the segmentation algorithms (except Fuzzy C-means) return a struct `SegmentedImage`
that captures most of the details regarding the segments.

* `image_indexmap`      : An array conatining the assigned labels for each pixel
* `segment_labels`      : List of all the applied labels
* `segment_means`       : Dict(Label => Mean intensity)
* `segment_pixel_count` : Dict(Label => Pixel Count)

#### Seeded Region Growing

This algorithm segments an image with repsect to a set of *n* seeds. Given the
set of seeds in the form of a vector of tuples of `CartesianIndex` and label,
the algorithm tries to assign these labels to each of the remaining points.

###### Inputs

* `img`             :  N-D image to be segmented (arbitrary indices are allowed)
* `seeds`           :  `Vector` containing seeds. Each seed is a Tuple of a
                       CartesianIndex{N} and a label. See below note for more
                       information on labels.
* `kernel_dim`      :  (Optional) `Vector{Int}` having length N or a `NTuple{N,Int}`
                       whose ith element is an odd positive integer representing
                       the length of the ith edge of the N-orthotopic neighbourhood
* `neighbourhood`   :  (Optional) Function taking CartesianIndex{N} as input and
                       returning the neighbourhood of that point.
* `diff_fn`         :  (Optional) Function that returns a difference measure(δ)
                       between the mean color of a region and color of a point

!!! note
    The labels attached to points must be positive integers, although multiple
    points can be assigned the same label. The output includes a labelled array
    that has same indexing as that of input image. Every index is assigned to
    either one of labels or a special label '0' indicating that the algorithm
    was unable to assign that index to a unique label.

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
boundary points and tries to find the

###### Inputs

* `img`             :  N-D image to be segmented (arbitrary indices are allowed)
* `threshold`       :  Upper bound of the difference measure (δ) for considering
                       pixel into same segment
* `kernel_dim`      :  (Optional) `Vector{Int}` having length N or a `NTuple{N,Int}`
                       whose ith element is an odd positive integer representing
                       the length of the ith edge of the N-orthotopic neighbourhood
* `neighbourhood`   :  (Optional) Function taking CartesianIndex{N} as input and
                       returning the neighbourhood of that point.
* `diff_fn`         :  (Optional) Function that returns a difference measure (δ)
                       between the mean color of a region and color of a point

###### Demo

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
**Time Complexity:** O(n) where `n` is the number of pixels


###### Inputs

* `img`         : N-D image to be segmented (arbitrary indices are allowed)
* `threshold`   : Upper bound of the difference measure (δ) for considering
                  pixel into same segment; an `AbstractArray` can be passed
                  having same number of dimensions as that of `img` for adaptive
                  thresholding
* `diff_fn`     : (Optional) Function that returns a difference measure (δ)
                  between the mean color of a region and color of a point

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

#### Mean Shift

#### Region Splitting using RegionTrees

This algorithm follows the divide and conquer methodology. If the input
image is homogeneous then nothing is to be done. In the other case, the
image is split into two across every dimension and the smaller parts are
segmented recursively. This procedure generates a region tree which can
be used to create a segmented image.

**Time Complexity:** O(n * log(n)) where `n` is the number of pixels

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
