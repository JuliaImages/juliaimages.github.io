# JuliaImages: image processing and machine vision for Julia

JuliaImages ([source code](https://github.com/JuliaImages)) hosts the
major [Julia](http://julialang.org/) packages for image processing.
Julia is well-suited to image processing because it is a modern and
elegant high-level language that is a pleasure to use, while also
allowing you to write "inner loops" that compile to efficient machine
code (i.e., it is as fast as C).  Julia supports multithreading and,
through add-on packages, GPU processing.

JuliaImages is a collection of packages specifically focused on image
processing.  It is not yet as complete as some toolkits for other
programming languages, but it has many useful algorithms.  It is
focused on clean architecture and is designed to unify "machine
vision" and "biomedical 3d image processing" communities.

These pages are designed to help you get started with image analysis
in Julia.

!!! note

    Please help improve this documentation--if something confuses you, chances
    are you're not alone. It's easy to do as you read along: just click on the
    "Edit on GitHub" link above, and then
    [edit the files directly in your browser](https://help.github.com/articles/editing-files-in-another-user-s-repository/).
    Your changes will be vetted by developers before becoming permanent, so don't
    worry about whether you might say something wrong.

The following is a list of packages that are closely related to the JuliaImages ecosystem and also maintained by members of
JuliaImages.

* Core packages
  * [ColorTypes.jl](https://github.com/JuliaGraphics/ColorTypes.jl)\*, [Colors.jl](https://github.com/JuliaGraphics/Colors.jl)\* and [ColorVectorSpaces.jl](https://github.com/JuliaGraphics/ColorVectorSpace.jl)\* provides pixel-level definitions and functions.
  * [FixedPointNumbers.jl](https://github.com/JuliaMath/FixedPointNumbers.jl)\* provides several data types (e.g., `N0f8`) for image storage usage.
  * [ImageCore.jl](https://juliaimages.org/ImageCore.jl/stable/)\* provides various basic and convenient views, traits and functions to support image processing algorithms.
* Traits and utilities
  * [ImageAxes.jl](https://github.com/JuliaImages/ImageAxes.jl)\* supports [AxisArrays.jl](https://github.com/JuliaArrays/AxisArrays.jl)\* to endow the axes with "meaning".
  * [ImageMetadata.jl](https://github.com/JuliaImages/ImageMetadata.jl)\* is a simple package providing utilities for working with images that have metadata attached.
  * 🚧 [ImageDraw.jl](https://github.com/JuliaImages/ImageDraw.jl) let you draw shapes on an image.
  * [ImageDistances.jl](https://github.com/JuliaImages/ImageDistances.jl)\* is a [Distances.jl](https://github.com/JuliaStats/Distances.jl) wrapper for images.
  * [OffsetArrays.jl](https://github.com/JuliaArrays/OffsetArrays.jl) supports arrays with arbitrary indices offsets.
  * [MappedViews.jl](https://github.com/JuliaArrays/MappedArrays.jl) provides lazy in-place transformations of arrays.
  * [PaddedViews.jl](https://github.com/JuliaArrays/PaddedViews.jl)\* add virtual padding to the edges of an array. It also allows you to composite multiple images together.
  * [TestImages.jl](https://github.com/JuliaImages/TestImages.jl) provides several "standard" test images.
  * Image visulization are supported by [various packages](@ref sec_visualization)
  * Image saving and loading are supported by packages under [JuliaIO](@ref sec_imageio)
* Algorithms
  * [ImageBinarization.jl](https://github.com/zygmuntszpak/ImageBinarization.jl) provides various image binarization algorithms.
  * [ImageContrastAdjustment.jl](https://juliaimages.org/ImageContrastAdjustment.jl/stable/)\* supports image contrast enhancement and manipulation.
  * [ImageMorphology.jl](https://github.com/JuliaImages/ImageMorphology.jl)\* provides several morphological operations for image processing.
  * [ImageFiltering.jl](https://juliaimages.org/ImageFiltering.jl/stable/)\* supports basic filtering operations.
  * [ImageFeatures.jl](https://github.com/JuliaImages/ImageFeatures.jl) is a package for identifying and characterizing "keypoints" (salient features) in images.
  * [ImageQualityIndexes.jl](https://github.com/JuliaImages/ImageQualityIndexes.jl)\* provides several image quality assessment indexes, e.g., PSNR and SSIM.
  * [ImageTransformations.jl](https://github.com/JuliaImages/ImageTransformations.jl)\* provides functions related to geometric transformations.
  * [ImageSegmentation.jl](https://github.com/JuliaImages/ImageSegmentation.jl) provides several image segmentation algorithms.
* Miscellaneous third-party packages
  * [Augmentor.jl](https://github.com/Evizero/Augmentor.jl) provides several basic image augmentation operations for image-related machine learning tasks.

Items marked with \* means that they are reexported by `Images.jl` via
[Reexport.jl](https://github.com/simonster/Reexport.jl) so that you can import all of them with only `using Images`.
