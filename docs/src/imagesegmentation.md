# ImageSegmentation.jl


## Introduction

Image segmentation is the process of dividing an image into its salient parts.
Due to the different
This package features multiple segmentation algorithms that can be used

## Installation

```julia
Pkg.add("ImageSegmentation")
```

## Functions

All the segmentation algorithms (except Fuzzy C-means) return a struct `SegmentedImage`
that captures most of the details regarding the segments.

* `image_indexmap` - An array conatining the assigned labels for each pixel
* `segment_labels` - List of all the applied labels
* `segment_means` - Dict(Label => Mean intensity)
* `segment_pixel_count` - Dict(Label => Pixel Count)

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


| Threshold | Output | Compression percentage|
| ------------- | ----------| -------------------------|
| Original    | ![scene](https://user-images.githubusercontent.com/15063205/27087931-ecf2490c-5073-11e7-902f-e28b68975979.jpg) | 0 % |
| 0.02 | ![seg1](https://user-images.githubusercontent.com/15063205/27088052-41996c74-5074-11e7-9ff1-1941d1be88c4.jpg) | 50% |
| 0.05 | ![seg2](https://user-images.githubusercontent.com/15063205/27088179-9761458c-5074-11e7-9305-91411d862b22.jpg) | 62.5% |
| 0.1 | ![seg3](https://user-images.githubusercontent.com/15063205/27088318-f556be88-5074-11e7-9b1e-271963060e90.jpg) | 70.8% |
| 0.2 | ![seg4](https://user-images.githubusercontent.com/15063205/27088449-4ed7774a-5075-11e7-91bd-f18438ca57a0.jpg) | 79.2% |


Felzenswalb's Region Splitting

Fast Scanning

Mean Shift

Region Splitting using RegionTrees

K-means

Fuzzy C-means

Watershed segmentation
