# [Packages under JuliaImages](@id page_packages_index)

!!! tip
    Most users should probably start with the tutorials before diving into the documentation for individual packages.
    Much of JuliaImages' functionality comes from composing very basic operations that are not always
    available in other environments, and the tutorials will make this workflow clearer.

🚧This section documents the individual components that form the JuliaImages ecosystem.
The ones marked with a `*` are available via `using Images`, but you can also use packages individually.
Below, they're grouped into broad categories, then ordered alphabetically so you can start with whatever
you are interested in most.

* Low-level core packages
  * [ColorTypes.jl](https://github.com/JuliaGraphics/ColorTypes.jl)\*,
    [Colors.jl](https://github.com/JuliaGraphics/Colors.jl)\*
    and [ColorVectorSpaces.jl](https://github.com/JuliaGraphics/ColorVectorSpace.jl)\*
    provides pixel-level definitions and functions.
  * [FixedPointNumbers.jl](https://github.com/JuliaMath/FixedPointNumbers.jl)\* provides several data
    types (e.g., `N0f8`) for image storage usage.
  * [ImageCore.jl](https://juliaimages.org/ImageCore.jl/stable/)\* provides various basic and
    convenient views, traits and functions to support image processing algorithms.
* Traits and utilities
  * [ImageAxes.jl](https://github.com/JuliaImages/ImageAxes.jl)\* supports
    [AxisArrays.jl](https://github.com/JuliaArrays/AxisArrays.jl)\* to endow the axes with "meaning".
  * [ImageMetadata.jl](https://github.com/JuliaImages/ImageMetadata.jl)\* is a simple package
    providing utilities for working with images that have metadata attached.
  * 🚧 [ImageDraw.jl](https://github.com/JuliaImages/ImageDraw.jl) let you draw shapes on an image.
  * [ImageDistances.jl](https://github.com/JuliaImages/ImageDistances.jl)\* is a
    [Distances.jl](https://github.com/JuliaStats/Distances.jl) wrapper for images.
  * [OffsetArrays.jl](https://github.com/JuliaArrays/OffsetArrays.jl) supports arrays with arbitrary
    indices offsets.
  * [MappedViews.jl](https://github.com/JuliaArrays/MappedArrays.jl) provides lazy in-place transformations
    of arrays.
  * [PaddedViews.jl](https://github.com/JuliaArrays/PaddedViews.jl)\* add virtual padding to the edges
    of an array. It also allows you to composite multiple images together.
  * [TestImages.jl](https://github.com/JuliaImages/TestImages.jl) provides several "standard" test images.
  * Image visulization are supported by [various packages](@ref sec_visualization)
  * Image saving and loading are supported by packages under [JuliaIO](@ref sec_imageio)
* high-level algorithms
  * [ImageBinarization.jl](https://github.com/zygmuntszpak/ImageBinarization.jl) provides various
    image binarization algorithms.
  * [ImageContrastAdjustment.jl](https://juliaimages.org/ImageContrastAdjustment.jl/stable/)\* supports
    image contrast enhancement and manipulation.
  * [ImageMorphology.jl](https://github.com/JuliaImages/ImageMorphology.jl)\* provides several
    morphological operations for image processing.
  * [ImageFiltering.jl](https://juliaimages.org/ImageFiltering.jl/stable/)\* supports basic filtering operations.
  * [ImageFeatures.jl](https://github.com/JuliaImages/ImageFeatures.jl) is a package for identifying
    and characterizing "keypoints" (salient features) in images.
  * [ImageQualityIndexes.jl](https://github.com/JuliaImages/ImageQualityIndexes.jl)\* provides several
    image quality assessment indexes, e.g., PSNR and SSIM.
  * [ImageTransformations.jl](https://github.com/JuliaImages/ImageTransformations.jl)\* provides functions
    related to geometric transformations.
  * [ImageSegmentation.jl](https://github.com/JuliaImages/ImageSegmentation.jl) provides several image
    segmentation algorithms.
  * [ImageInpainting.jl](https://github.com/JuliaImages/ImageInpainting.jl) provides image inpainting algorithms in Julia

!!! tip
    For package developers, `Images.jl` is usually a large dependency to be included in the `deps` section of
    your `Project.toml`. Hence it is reccomended to add only `ImageCore` together with the exact sub-packages
    you need. You can use `@which` to find out the exact package and file a method/function belongs to.

JuliaImages is not a closed ecosystem; it works nicely with many other packages outside of JuliaImages.
The following is an incomplete list of third-party packages that are widely used together with `Images.jl`:

* [Augmentor.jl](https://github.com/Evizero/Augmentor.jl) provides several basic image augmentation
  operations for image-related machine learning tasks.
* [Flux.jl](https://github.com/FluxML/Flux.jl) is a deep learning toolbox in Julia.


