# Summary and function reference

Below, `[]` in an argument list means an optional argument.

## Image loading and saving

```julia
using FileIO
img = load("myimage.png")
save("imagecopy.jpg", img)
```
Standard test images are available in the [TestImages](http://juliaimages.github.io/TestImages.jl) package:
```julia
using TestImages
img = testimage("mandrill")
```

## Image construction, conversion, and views

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
permuteddimsview
StackedView
paddedviews
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
assert_timedim_last
```

## Element transformation and intensity scaling

```@docs
clamp01
clamp01nan
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
Kernel.Laplacian
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
cliphist
imstretch
imadjustintensity
complement
AdaptiveEqualization
GammaCorrection
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

```@docs
minfinite
maxfinite
maxabsfinite
meanfinite
ssd
mse
sad
mae
entropy
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

### Phantoms

```@docs
shepp_logan
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
