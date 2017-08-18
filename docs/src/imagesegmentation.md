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

Seeded Region Growing

Unseeded Region Growing

Felzenswalb's Region Splitting

Fast Scanning

Mean Shift

Region Splitting using RegionTrees

K-means

Fuzzy C-means

Watershed segmentation
