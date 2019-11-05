# Getting started: Installation and testing your install

Most users probably want to start with the Images package, which bundles
much (but not all) of the functionality in JuliaImages.

## Installation

Install Images via the [package manager](https://docs.julialang.org/en/v1/stdlib/Pkg/),

```julia
(v1.0) pkg> add Images
```

This will also install many dependencies.

Images (and possibly some additional packages) may be all you need to manipulate images programmatically.
However, most users will want to take one or two additional steps:
ensuring that you can load and display images.

!!! note
    People in some regions such as China might fail installing/precompiling `Images` due to poor network
    status. Using proxy/VPN that has stable connection to Amazon S3 and Github can solve this issue.

## Loading your first image

When testing ideas or just following along with the documentation, it can be
useful to have some images to work with.
The [TestImages](https://github.com/JuliaImages/TestImages.jl) package bundles several "standard" images for you.
If you haven't already installed it, use `pkg> add TestImages`.

To load one of the images from this package, say

```julia
using TestImages
img = testimage("mandrill")
```

If this is your first time working with images in Julia, it's likely
that these commands will prompt you to install one or more additional
packages appropriate for your platform; you should generally accept
the recommendation, unless you have reasons to prefer an alternate
solution.

For loading image files that might already be on your computer, you should
use the [FileIO
package](https://github.com/JuliaIO/FileIO.jl):

```julia
using FileIO
img = load("myphoto.png")
```

This should load the image for you, possibly prompting you to install
an input/output package appropriate for your platform.

## Displaying images

When working with images, it's obviously helpful to be able to look at
them.  If you use Julia through [Juno](http://junolab.org/) or
[IJulia](https://github.com/JuliaLang/IJulia.jl), images should
display automatically:

![IJulia](assets/ijulia.png)

Users of the Julia command-line interface (REPL) can install the [ImageView](https://github.com/timholy/ImageView.jl) package:

```julia
using TestImages, Images, ImageView
img = testimage("mandrill")
imshow(img)
```

`ImageView` includes interactive features (panning/zooming, contrast
adjustment, playing movies, labeling, etc.) and may be of interest
even for users of graphical environments.

## Troubleshooting

Reading and writing images, as well as graphical display, involve interactions with external software libraries;
occasionally, the installation of these libraries goes badly.
If you experience any difficulties with any of the above steps, please see the [Installation troubleshooting](@ref) page for more information.
