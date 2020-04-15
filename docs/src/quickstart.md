# Quickstart

If you're comfortable with Julia or have used another image-processing
package before, this page may help you get started quickly. If some of
the terms or concepts here seem strange, don't worry---there are much
more detailed explanations in the following sections.

## Images are just arrays

```@setup array
using Images, ImageDraw

make_roi(tl::Point, br::Point) = Polygon([tl, Point(br.x, tl.y), br, Point(tl.x, br.y)])
make_roi(xs::UnitRange, ys::UnitRange) = make_roi(Point(ys[1], xs[1]), Point(ys[end], xs[end]))
```

For most purposes, any `AbstractArray` can be treated as an image. For example, numeric array can be interpreted as a grayscale image.

```@repl array
img = rand(4, 4)
```
```@example array
Gray.(img) #hide
```

We could also select a region-of-interest from a larger image

```@example array
# generate an image that starts black in the upper left
# and gets bright in the lower right
img = Array(reshape(range(0,stop=1,length=10^4), 100, 100))
# make a copy
img_c = img[51:70, 21:70] # red
# make a view
img_v = @view img[16:35, 41:90] # blue

out = vcat(img, hcat(img_c, img_v)) # hide
out = RGB.(Gray.(out)) # hide
img_boundary = make_roi(1:100, 1:100) # hide
roi_c = make_roi(51:70, 21:70) # hide
roi_v = make_roi(16:35, 41:90) # hide
roi_c_boundary = make_roi(101:120, 1:50) # hide
roi_v_boundary = make_roi(101:120, 51:100) # hide
draw!(out, img_boundary, RGB{Float64}(0, 0, 0)) # hide
draw!(out, roi_c_boundary, RGB{Float64}(1, 0, 0)) # hide
draw!(out, roi_c, RGB{Float64}(1, 0, 0)) # hide
draw!(out, roi_v_boundary, RGB{Float64}(0, 0, 1)) # hide
draw!(out, roi_v, RGB{Float64}(0, 0, 1)) # hide
```

As you might know, changing the value of a view would affect the original
image, while changing that of a copy doesn't:

```@example array
fill!(img_c, 1) # red region in original doesn't change
fill!(img_v, 0) # blue

out = vcat(img, hcat(img_c, img_v)) # hide
out = RGB.(Gray.(out)) # hide
img_boundary = make_roi(1:100, 1:100) # hide
roi_c = make_roi(51:70, 21:70) # hide
roi_v = make_roi(16:35, 41:90) # hide
roi_c_boundary = make_roi(101:120, 1:50) # hide
roi_v_boundary = make_roi(101:120, 51:100) # hide
draw!(out, img_boundary, RGB{Float64}(0, 0, 0)) # hide
draw!(out, roi_c_boundary, RGB{Float64}(1, 0, 0)) # hide
draw!(out, roi_c, RGB{Float64}(1, 0, 0)) # hide
draw!(out, roi_v_boundary, RGB{Float64}(0, 0, 1)) # hide
draw!(out, roi_v, RGB{Float64}(0, 0, 1)) # hide
```

Don't worry if you don't get the "image" result, that's expected and you'll
learn how to automatically display an image later in JuliaImages.

Some add-on packages enable additional behavior. For example,

```@example array
using Unitful, AxisArrays
using Unitful: mm, s

img = AxisArray(rand(256, 256, 6, 50), (:x, :y, :z, :time), (0.4mm, 0.4mm, 1mm, 2s))
nothing # hide
```

defines a 4d image (3 space dimensions plus one time dimension) with
the specified name and physical pixel spacing for each coordinate.
The [`AxisArrays`](https://github.com/JuliaArrays/AxisArrays.jl) package supports rich and efficient operations on such
arrays, and can be useful to keep track of not just pixel spacing but
the
[orientation convention used for multidimensional images](http://www.grahamwideman.com/gw/brain/orientation/orientterms.htm).

JuliaImages interoperates smoothly with `AxisArrays` and many other
packages.  As further examples,

- the [`ImageMetadata`](https://github.com/JuliaImages/ImageMetadata.jl) package (incorporated into `Images` itself)
  allows you to "tag" images with custom metadata

- the [`IndirectArrays`](https://github.com/JuliaArrays/IndirectArrays.jl) package supports indexed (colormap) images

- the [`MappedArrays`](https://github.com/JuliaArrays/MappedArrays.jl) package allows you to represent
  [lazy](https://en.wikipedia.org/wiki/Lazy_evaluation)
  value-transformations, facilitating work with images that may be too
  large to store in memory at once

- [`ImageTransformations`](https://github.com/JuliaImages/ImageTransformations.jl) allows you to encode rotations, shears,
  deformations, etc., either eagerly or lazily

It is very easy to define new array types in Julia--and consequently
specialized images or operations--and have them interoperate
smoothly with the vast majority of functions in JuliaImages.

## Array elements are pixels (and vice versa)

```@setup pixel
using Images, MosaicViews
```

Elements of image are called **pixels**; in JuliaImages we provide an
abstraction on this concept. For example, we have `Gray` for grayscale image,
`RGB` for RGB image, `Lab` for Lab image, and etc.

Creating a pixel is initializing a struct of that type:

```@example pixel
Gray(0.0) # black
Gray(1.0) # white
RGB(1.0, 0.0, 0.0) # red
RGB(0.0, 1.0, 0.0) # green
RGB(0.0, 0.0, 1.0) # blue
[RGB.(Gray(0.0)) RGB.(Gray(1.0)) RGB(1.0, 0.0, 0.0) RGB(0.0, 1.0, 0.0) RGB(0.0, 0.0, 1.0)] # hide
```

and image is just an array of pixel objects:

```@repl pixel
img_gray = rand(Gray, 2, 2)
img_rgb = rand(RGB, 2, 2)
img_lab = rand(Lab, 2, 2)
```
```@example pixel
mosaicview(RGB.(img_gray), RGB.(img_rgb), RGB.(img_lab), # hide
           fillvalue=RGB(1, 1, 1), # hide
           nrow=1, npad=2) # hide
```

As you can see, both `img_rgb` and `img_lab` images are of size
``2 \times 2`` (instead of ``2 \times 2 \times 3`` or ``3 \times 2 \times 2``);
a RGB image is an array of `RGB` pixels whereas a Lab image is an array of `Lab` pixel.

!!! note
    It's recommended to use `Gray` instead of the `Number` type in JuliaImages since it indicates
    that the array of numbers is best interpreted as a grayscale image. For example, it
    triggers `Atom/Juno` and `Jupyter` to display the array as an image instead of a
    matrix of numbers. There's no performance overhead for using `Gray` over `Number`.

This design choice facilitates generic code that can handle both
grayscale and color images without needing to introduce extra loops or
checks for a color dimension.
It also provides more rational support for 3d grayscale images--which
might happen to have size 3 along the third dimension--and
consequently helps unify the "computer vision" and "biomedical image
processing" communities.

## Color conversions are construction/view

Conversions between different `Colorant`s are straightforward:

```@repl pixel
RGB.(img_gray) # Gray => RGB
Gray.(img_rgb) # RGB => Gray
```

!!! note
    You'll see [broadcasting](https://docs.julialang.org/en/v1/manual/arrays/#Broadcasting-1)
    semantics used in JuliaImages here and there, check the documentation if
    you're not familiar with it.

Sometimes, to work with other packages, you'll need to convert a ``m \times n``
`RGB` image to ``m \times n \times 3`` numeric array and vice versa. The functions
`channelview` and `colorview` are designed for this purpose. For example:

```@repl pixel
img_CHW = channelview(img_rgb) # 3 * 2 * 2
img_HWC = permutedims(img_CHW, (2, 3, 1)) # 2 * 2 * 3
```

```@repl pixel
img_CHW = permutedims(img_HWC, (3, 1, 2)) # 3 * 2 * 2
img_rgb = colorview(RGB, img_CHW) # 2 * 2
```

!!! warning
    Don't overuse `channelview` because it loses the colorant information by
    converting an image to a raw numeric array.

    It's very likely that users from other languages will have the tendency to
    `channelview` every image they're going to process. Unfamiliarity of the pixel
    concept provided by JuliaImages doesn't necessarily mean it's bad.

!!! note
    The reason we use CHW (i.e., channel-height-width) order instead of HWC
    is that this provides a memory friendly indexing mechanisim for `Array`.
    By default, in Julia the first index is also the fastest (i.e., has
    adjacent storage in memory). For more details, please refer to the performance tip:
    [Access arrays in memory order, along columns](https://docs.julialang.org/en/v1/manual/performance-tips/#Access-arrays-in-memory-order,-along-columns-1)

    You can use `PermutedDimsArray` to "reinterpret" the orientation of a
    chunk of memory without making a copy, or `permutedims` if you want a
    copy.

For `Gray` images, the following codes are almost equivalent except that the
construction version copies the data while the view version doesn't.

```@example pixel
img_num = rand(4, 4)

img_gray_copy = Gray.(img_num) # construction
img_num_copy = Float64.(img_gray_copy) # construction

img_gray_view = colorview(Gray, img_num) # view
img_num_view = channelview(img_gray_view) # view
nothing # hide
```

## The 0-to-1 intensity scale

```@setup fixedpoint
using ImageCore, ImageShow, FixedPointNumbers
```

In JuliaImages, by default all images are displayed assuming that 0
means "black" and 1 means "white" or "saturated" (the latter applying
to channels of an RGB image).

Perhaps surprisingly, **this 0-to-1 convention applies even when the
intensities are encoded using only 8-bits per color channel**. JuliaImages
uses a special type, `N0f8`, that interprets an 8-bit "integer" as if it had
been scaled by 1/255, thus encoding values from 0 to 1 in 256 steps.

`N0f8` numbers (standing for **N**ormalized, with **0** integer bits and
**8** **f**ractional bits) obey standard mathematical rules, and can be
added, multiplied, etc. There are types like `N0f16` for working with 16-bit
images (and even `N2f14` for images acquired with a 14-bit camera, etc.).

```@repl fixedpoint
img_n0f8 = rand(N0f8, 2, 2)
float.(img_n0f8)
```

!!! note
    This infrastructure allows us to unify "integer" and floating-point
    images, and avoids the need for special conversion functions (e.g.,
    `im2double` in MATLAB) that change the *value* of pixels when your main goal is simply to
    change the *type* (numeric precision and properties) used to represent the pixel.

Although it's not recommended, but you can use `rawview` to get the
underlying storage data and convert it to `UInt8` (or other types) if you insist.

```@repl fixedpoint
img_n0f8_raw = rawview(img_n0f8)
float.(img_n0f8_raw)
```

Conversions between the storage type, i.e., the actual numeric type, without changing the color type
are supported by the following functions:

* [`float32`](@ref), [`float64`](@ref)
* [`n0f8`](@ref), [`n6f10`](@ref), [`n4f12`](@ref), [`n2f14`](@ref), [`n0f16`](@ref)

```@repl fixedpoint
img = rand(Gray{N0f8}, 2, 2)
img_float32 = float32.(img) # Gray{N0f8} => Gray{Float32}
img_n0f16 = n0f16.(img_float32) # Gray{Float32} => Gray{N0f16}
```

If you don't want to specify the destination type, `float` is designed for this:

```@repl fixedpoint
img_n0f8 = rand(Gray{N0f8}, 2, 2)
img_float = float.(img_n0f8) # Gray{N0f8} => Gray{Float32}
```

For a view-like conversion without new memory allocation, `of_eltype` in [`MappedArrays`](https://github.com/JuliaArrays/MappedArrays.jl) is designed for this:

```@repl fixedpoint
using MappedArrays
img_float_view = of_eltype(Gray{Float32}, img_n0f8)
eltype(img_float_view)
```

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
may also be interested in the [Comparison with other image processing frameworks](@ref).
Also described are the [ImageFeatures.jl](@ref) and [ImageSegmentation.jl](@ref)
packages, which support a number of algorithms important for computer vision.

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
- Exposure : `build_histogram`, `adjust_histogram`, `imadjustintensity`, `imstretch`, `imcomplement`, `AdaptiveEqualization`, `GammaCorrection`, `cliphist`
- Gradients: `backdiffx`, `backdiffy`, `forwarddiffx`, `forwarddiffy`, `imgradients`
- Edge detection: `imedge`, `imgradients`, `thin_edges`, `magnitude`, `phase`, `magnitudephase`, `orientation`, `canny`
- Corner detection: `imcorner`, `harris`, `shi_tomasi`, `kitchen_rosenfeld`, `meancovs`, `gammacovs`, `fastcorners`
- Blob detection: `blob_LoG`, `findlocalmaxima`, `findlocalminima`
- Morphological operations: `dilate`, `erode`, `closing`, `opening`, `tophat`, `bothat`, `morphogradient`, `morpholaplace`, `feature_transform`, `distance_transform`
- Connected components: `label_components`, `component_boxes`, `component_lengths`, `component_indices`, `component_subscripts`, `component_centroids`
- Interpolation: `bilinear_interpolation`

Test images and phantoms (see also TestImages.jl):

- `shepp_logan`
