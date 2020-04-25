# [Summary and function reference](@id page_references)

Below, `[]` in an argument list means an optional argument.

```@contents
Pages=["function_reference.md"]
depth=3
```

## [Image loading and saving](@id ref_io)

[FileIO.jl](https://github.com/JuliaIO/FileIO.jl) is an IO frontend that provides `save` and `load`
to load images easily. The current available backends for image files are:

* [ImageMagick.jl](https://github.com/JuliaIO/ImageMagick.jl) covers most image formats and has extra
  functionality. This can be your first choice if you don't have a preference.
* [QuartzImageIO.jl](https://github.com/JuliaIO/QuartzImageIO.jl) exposes macOS's native image IO
  functionality to Julia. In some cases it's faster than ImageMagick, but it might not cover all your
  needs.
* [ImageIO.jl](https://github.com/JuliaIO/ImageIO.jl) is a new image IO backend (requires julia >=v"1.3")
  that provides an optimized performance for PNG files. Check benchmark
  [here](https://github.com/JuliaIO/PNGFiles.jl/issues/1)
* [OMETIFF.jl](https://github.com/tlnagy/OMETIFF.jl) supports
  [OME-TIFF](https://docs.openmicroscopy.org/ome-model/6.0.0/index.html#ome-tiff) files. If you don't
  know what it is, then it is likely that you don't need this package.

Standard test images are provided by [TestImages.jl](https://github.com/JuliaImages/TestImages.jl)

```@docs
load
save
testimage
shepp_logan
```

## [Image construction, conversion, and views](@id ref_construction)

Any array can be treated as an Image.  In graphical environments, only
arrays with
[`Colorant`](https://github.com/JuliaGraphics/ColorTypes.jl) element
types (`Gray`, `RGB`, `ARGB`, etc.) are automatically displayed as
images.


```@docs
colorview
channelview
normedview
rawview
StackedView
PaddedView
paddedviews
sym_paddedviews
MosaicView
mosaicview
StreamingContainer
```

Images with defined geometry and axis meaning can be constructed using the [`AxisArrays`](https://github.com/JuliaArrays/AxisArrays.jl) package:
```julia
using AxisArrays
img = AxisArray(A, (:y, :x, :time), (0.25μm, 0.25μm, 0.125s))  # see Unitful.jl for units
```

Custom metadata can be added as follows:
```julia
img = ImageMeta(A, date=now(), patientID=12345)
```

Any of these operations may be composed together, e.g., if you have an
`m×n×3 UInt8` array, you can put it in canonical RGB format and add
metadata:

```julia
img = ImageMeta(colorview(RGB, normedview(permuteddimsview(A, (3,1,2)))), sample="control")
```

## Traits

These functions are the preferred way to access certain types of
"internal" data about an image. They can sometimes be useful in
allowing you to write generic code.

```@docs
pixelspacing
spacedirections
sdims
coords_spatial
size_spatial
indices_spatial
nimages
timeaxis
istimeaxis
timedim
assert_timedim_last
StreamIndexStyle
IndexAny
IndexIncremental
```

## Element transformation and intensity scaling

```@docs
clamp01
clamp01!
clamp01nan
clamp01nan!
scaleminmax
scalesigned
colorsigned
takemap
```

## Storage-type transformation

```@docs
float32
float64
n0f8
n6f10
n4f12
n2f14
n0f16
```

## Color channels

You can extract the numeric value of particular color channels:

```@docs
gray
red
green
blue
alpha
```

You can also perform operations on channels:

```@docs
mapc
reducec
mapreducec
```

## Color conversion

```julia
imgg = Gray.(img)
```
calculates a grayscale representation of a color image using the
[Rec 601 luma](http://en.wikipedia.org/wiki/Luma_%28video%29#Rec._601_luma_versus_Rec._709_luma_coefficients).

```julia
imghsv = HSV.(img)
```
converts to an HSV representation of color information.

The [ColorTypes](https://github.com/JuliaGraphics/ColorTypes.jl)
package has a rich set of traits that allow you to perform generic
operations on color types, see its README for more information.

## Image algorithms

### Linear filtering

```@docs
imfilter
imfilter!
imgradients
```

#### Kernel

```@docs
Kernel.sobel
Kernel.prewitt
Kernel.ando3
Kernel.ando4
Kernel.ando5
Kernel.gaussian
Kernel.DoG
Kernel.LoG
Kernel.gabor
Kernel.Laplacian
Kernel.bickley
Kernel.scharr
```

#### KernelFactors

```@docs
KernelFactors.sobel
KernelFactors.prewitt
KernelFactors.ando3
KernelFactors.ando4
KernelFactors.ando5
KernelFactors.gaussian
KernelFactors.IIRGaussian
KernelFactors.TriggsSdika
KernelFactors.bickley
KernelFactors.scharr
```

#### Kernel utilities

```@docs
centered
kernelfactors
reflect
```

#### Boundaries and padding

```@docs
padarray
Pad
Fill
Inner
NA
NoPad
```

#### Algorithms

```@docs
Algorithm.FIR
Algorithm.FFT
Algorithm.IIR
Algorithm.Mixed
```

#### Internal machinery

```@docs
KernelFactors.ReshapedOneD
```

### Nonlinear filtering and transformation

```@docs
mapwindow
imROF
```

### Edge detection

```@docs
magnitude
phase
orientation
magnitude_phase
imedge
thin_edges
canny
Percentile
```

### Corner Detection

```@docs
imcorner
harris
shi_tomasi
kitchen_rosenfeld
fastcorners
```

### Feature Extraction

See the [ImageFeatures](https://juliaimages.org/ImageFeatures.jl/stable/) package for a much more comprehensive set of tools.

```@docs
blob_LoG
BlobLoG
findlocalmaxima
findlocalminima
```

### Exposure

```@docs
build_histogram
adjust_histogram
adjust_histogram!
AdaptiveEqualization
Equalization
GammaCorrection
LinearStretching
Matching
MidwayEqualization
cliphist
imstretch
imadjustintensity
complement
```

### Spatial transformations and resizing

```@docs
imresize
imrotate
restrict
warp
warpedview
invwarpedview
WarpedView
InvWarpedView
```

### Image statistics

Functions for image statistics are spreaded out in Images.jl, ImageDistances.jl and ImageQualityIndexes.jl

```@docs
minfinite
maxfinite
maxabsfinite
meanfinite
entropy
```

### General Distances

| type name               |  convenient syntax         | math definition                   |
| ----------------------- | -------------------------- | --------------------------------- |
|  Euclidean              |  `euclidean(x, y)`         | `sqrt(sum((x - y) .^ 2))`         |
|  SqEuclidean            |  `sqeuclidean(x, y)`       | `sum((x - y).^2)`                 |
|  Cityblock              |  `cityblock(x, y)`         | `sum(abs(x - y))`                 |
|  TotalVariation         |  `totalvariation(x, y)`    | `sum(abs(x - y)) / 2`             |
|  Minkowski              |  `minkowski(x, y, p)`      | `sum(abs(x - y).^p) ^ (1/p)`      |
|  Hamming                |  `hamming(x, y)`           | `sum(x .!= y)`                    |
|  SumAbsoluteDifference  |  `sad(x, y)`               | `sum(abs(x - y))`                 |
|  SumSquaredDifference   |  `ssd(x, y)`               | `sum((x - y).^2)`                 |
|  MeanAbsoluteError      |  `mae(x, y)`, `sadn(x, y)` | `sum(abs(x - y))/len(x)`          |
|  MeanSquaredError       |  `mse(x, y)`, `ssdn(x, y)` | `sum((x - y).^2)/len(x)`          |
|  RootMeanSquaredError   |  `rmse(x, y)`              | `sqrt(sum((x - y) .^ 2))`         |
|  NCC                    |  `ncc(x, y)`               | `dot(x,y)/(norm(x)*norm(y))`      |

#### Image-specific Distances

| Distance type | Convenient syntax | References |
|----------|------------------------|------------|
| `Hausdorff` and `ModifiedHausdorff` | `hausdorff(imgA,imgB)` and `modified_hausdorff(imgA,imgB)` | Dubuisson, M-P et al. 1994. A Modified Hausdorff Distance for Object-Matching. |
| `CIEDE2000` | `ciede2000(imgA,imgB)` and `ciede2000(imgA,imgB; metric=DE_2000())` | Sharma, G., Wu, W., and Dalal, E. N., 2005. The CIEDE2000 color‐difference formula. |

#### Image metrics

```@docs
PSNR
SSIM
colorfulness
HASLER_AND_SUSSTRUNK_M3
```

### Morphological operations

```@docs
dilate
erode
opening
closing
tophat
bothat
morphogradient
morpholaplace
label_components
component_boxes
component_lengths
component_indices
component_subscripts
component_centroids
feature_transform
distance_transform
convexhull
GuoAlgo
thinning
```

### Interpolation

```@docs
bilinear_interpolation
```

### Integral Images

```@docs
integral_image
boxdiff
```

### Pyramids

```@docs
gaussian_pyramid
```

## Image metadata utilities

```@docs
ImageMeta
arraydata
properties
copyproperties
shareproperties
spatialproperties
```

## Image segmentation

```@docs
SegmentedImage
ImageEdge
otsu_threshold
labels_map
segment_labels
segment_pixel_count
segment_mean
seeded_region_growing
unseeded_region_growing
felzenszwalb
fast_scanning
watershed
hmin_transform
region_adjacency_graph
rem_segment
rem_segment!
prune_segments
region_tree
region_splitting
```

## ImageFeatures

### Geometric features

```@docs
hough_transform_standard
hough_circle_gradient
```

### Types

```@docs
Feature
Features
Keypoint
Keypoints
BRIEF
ORB
FREAK
BRISK
HOG
```

### Corners

```@docs
corner_orientations
```

### BRIEF Sampling Patterns

```@docs
random_uniform
random_coarse
gaussian
gaussian_local
center_sample
```

### Feature Description

```@docs
create_descriptor
```

### Feature Matching

```@docs
hamming_distance
match_keypoints
```

### Texture Matching

#### Gray Level Co-occurence Matrix

```julia
glcm
glcm_symmetric
glcm_norm
glcm_prop
max_prob
contrast
ASM
IDM
glcm_entropy
energy
dissimilarity
correlation
glcm_mean_ref
glcm_mean_neighbour
glcm_var_ref
glcm_var_neighbour
```

#### Local Binary Patterns

```julia
lbp
modified_lbp
direction_coded_lbp
lbp_original
lbp_uniform
lbp_rotation_invariant
multi_block_lbp
```
