# Quickstart

If you're comfortable with Julia or have used another image-processing
package before, this page may help you get started quickly. If some of
the terms or concepts here seem strange, don't worry---there are much
more detailed explanations in the following sections.

## Images are just arrays

For most purposes, any `AbstractArray` can be treated as an image. For example,

```jldoctest; output = false
using Images

img = rand(640,480)               # a random Float64 image (grayscale)
# select a region-of-interest from a larger image
imgc = img[200:245, 17:42]        # makes a copy
imgv = @view img[200:245, 17:42]  # makes a view
# an image that starts black in the upper left and gets bright in the lower right:
img = reshape(range(0,stop=1,length=10^4), 100, 100)
# a 3d box image
img = zeros(128, 128, 80)
img[20:100, 20:100, 10:70] .= 1
maximum(img)

# output

1.0
```

Some add-on packages enable additional behavior. For example,

```jldoctest
using Images, Unitful, AxisArrays
using Unitful: mm, s

img = AxisArray(rand(256, 256, 6, 50), (:x, :y, :z, :time), (0.4mm, 0.4mm, 1mm, 2s));
pixelspacing(img)

# output

(0.4 mm, 0.4 mm, 1 mm)
```

defines a 4d image (3 space dimensions plus one time dimension) with
the specified name and physical pixel spacing for each coordinate.
(Note that [`pixelspacing`](@ref) only returns dimensions for spatial coordinates.)
The AxisArrays package supports rich and efficient operations on such
arrays, and can be useful to keep track of not just pixel spacing but
the
[orientation convention used for multidimensional images](http://www.grahamwideman.com/gw/brain/orientation/orientterms.htm).

JuliaImages interoperates smoothly with AxisArrays and many other
packages.  As further examples,

- the `ImageMetadata` package (incorporated into `Images` itself)
  allows you to "tag" images with custom metadata

- the `IndirectArrays` package supports indexed (colormap) images

- the `MappedArrays` package allows you to represent
  [lazy](https://en.wikipedia.org/wiki/Lazy_evaluation)
  value-transformations, facilitating work with images that may be too
  large to store in memory at once

- `ImageTransformations` allows you to encode rotations, shears,
  deformations, etc., either eagerly or lazily

It is very easy to define new array types in Julia--and consequently
specialized images or operations--and have them interoperate
smoothly with the vast majority of functions in JuliaImages.

## Array elements are pixels (and vice versa)

In some languages, an RGB image is represented as an `m × n × 3` array,
where the third dimension is the color-channel dimension.
In such cases the representation of a single pixel is spread out among
3 array elements.
In JuliaImages, the typical representation of such an image would be
an `m × n` array of `RGB` values.
Consequently, every element of the array corresponds to one pixel,
and conversely each pixel is represented by exactly one array element:

```jldoctest
using Images, TestImages

img = testimage("mandrill")
img[350,225]    # pick a reddish pixel from the nose of the mandrill

# output

RGB{N0f8}(0.937,0.294,0.231)
```

(In ImageView, you can "hover" over pixels and see their coordinates in the statusbar.)
The meaning of `N0f8` is summarized [below](@ref The-0-to-1-intensity-scale) and described in detail
[later](@ref fixedpoint).

This design choice facilitates generic code that can handle both
grayscale and color images without needing to introduce extra loops or
checks for a color dimension.
It also provides more rational support for 3d grayscale images--which
might happen to have size 3 along the third dimension--and
consequently helps unify the "computer vision" and "biomedical image
processing" communities.

Because images are just arrays, some environments (e.g.,
Juno or IJulia/Jupyter) will display numeric arrays as arrays using a text
representation but will display 2d arrays that have `Colorant`
elements as images.  You can "convert" in the following ways:

```jldoctest
using Images

# "Convert" a numeric array to a `Colorant` (but grayscale) array
A = rand(8, 8)
img = Gray.(A)               # creates a copy of the data
img = colorview(Gray, A)     # creates a "view" which "reinterprets" but does not copy data

# RGB images
A = rand(3, 8, 8)            # Float64 data (64 bits per color channel)
img = colorview(RGB, A)      # encodes as a 2d RGB{Float64} array
A = rand(N0f8, 3, 8, 8)      # uses only 8 bits per channel
img = colorview(RGB, A)      # encodes as a 2d RGB{Float64} array

# The following illustrates "conversions" between representation as an 8-bit RGB
# image and as a 3×m×n UInt8 array
A = rand(UInt8, 3, 8, 8)
img = colorview(RGB, normedview(A))
A = rand(RGB{N0f8}, 8, 8)
A = rawview(channelview(A))
eltype(A)

# output

UInt8
```

## The 0-to-1 intensity scale

In JuliaImages, by default all images are displayed assuming that 0
means "black" and 1 means "white" or "saturated" (the latter applying
to channels of an RGB image).  Perhaps surprisingly, **this 0-to-1
convention applies even when the intensities are encoded using only
8-bits per color channel**.  JuliaImages uses a special type, `N0f8`,
that interprets an 8-bit "integer" as if it had been scaled by 1/255,
thus encoding values from 0 to 1 in 256 steps.  `N0f8` numbers
(standing for **N**ormalized, with **0** integer bits and **8**
**f**ractional bits) obey standard mathematical rules, and can be
added, multiplied, etc. There are types like `N0f16` for working with
16-bit images (and even `N2f14` for images acquired with a 14-bit
camera, etc.).

This infrastructure allows us to unify "integer" and floating-point
images, and avoids the need for special conversion functions that
change the *value* of pixels when your main goal is simply to change
the *type* (numeric precision and properties) used to represent the
pixel.

## Default orientation and storage order

Images are "vertical-major," meaning that when the image is displayed
the first index corresponds to the vertical axis. Note that by
default, in Julia the first index is also the fastest (i.e., has
adjacent storage in memory).

You can use `permuteddimsview` to "reinterpret" the orientation of a
chunk of memory without making a copy, or `permutedims` if you want a
copy.

## Arrays with arbitrary indices

If you have an input image and perform some kind of spatial
transformation on it, how do pixels/voxels in the transformed image
match up to pixels in the input? Through Julia's support for arrays
with indices that start at values other than 1, it is possible to
allow array indices to represent *absolute* position in space, making
it straightforward to keep track of the correspondence between
location across multiple images. More information can be found in
[Keeping track of location with unconventional indices](@ref).

## Examples of usage

If you feel ready to get started, see the [Demonstrations](@ref) page for inspiration.

## Function categories

See [Summary and function reference](@ref) for more information about
each of the topics below. The list below is accessible via `?Images`
from the Julia REPL. If you've used other frameworks previously, you
may also be interested in the
[Comparison with other image processing frameworks](@ref).

Constructors, conversions, and traits:

- Construction: use constructors of specialized packages, e.g., `AxisArray`, `ImageMeta`, etc.
- "Conversion": `colorview`, `channelview`, `rawview`, `normedview`, `permuteddimsview`, `paddedviews`
- Traits: `pixelspacing`, `sdims`, `timeaxis`, `timedim`, `spacedirections`

Contrast/coloration:

- `clamp01`, `clamp01nan`, `scaleminmax`, `colorsigned`, `scalesigned`

Algorithms:

- Reductions: `maxfinite`, `maxabsfinite`, `minfinite`, `meanfinite`, `sad`, `ssd`, `integral_image`, `boxdiff`, `gaussian_pyramid`
- Resizing and spatial transformations: `restrict`, `imresize`, `warp`
- Filtering: `imfilter`, `imfilter!`, `imfilter_LoG`, `mapwindow`, `imROF`, `padarray`
- Filtering kernels: `Kernel.` or `KernelFactors.`, followed by `ando[345]`, `guassian2d`, `imaverage`, `imdog`, `imlaplacian`, `prewitt`, `sobel`
- Exposure : `imhist`, `histeq`, `adjust_gamma`, `histmatch`, `imadjustintensity`, `imstretch`, `imcomplement`, `clahe`, `cliphist`
- Gradients: `backdiffx`, `backdiffy`, `forwarddiffx`, `forwarddiffy`, `imgradients`
- Edge detection: `imedge`, `imgradients`, `thin_edges`, `magnitude`, `phase`, `magnitudephase`, `orientation`, `canny`
- Corner detection: `imcorner`, `harris`, `shi_tomasi`, `kitchen_rosenfeld`, `meancovs`, `gammacovs`, `fastcorners`
- Blob detection: `blob_LoG`, `findlocalmaxima`, `findlocalminima`
- Morphological operations: `dilate`, `erode`, `closing`, `opening`, `tophat`, `bothat`, `morphogradient`, `morpholaplace`, `feature_transform`, `distance_transform`
- Connected components: `label_components`, `component_boxes`, `component_lengths`, `component_indices`, `component_subscripts`, `component_centroids`
- Interpolation: `bilinear_interpolation`

Test images and phantoms (see also TestImages.jl):

- `shepp_logan`

Also described are the [ImageFeatures.jl](@ref) and [ImageSegmentation.jl](@ref) packages,
which support a number of algorithms important for computer vision.
