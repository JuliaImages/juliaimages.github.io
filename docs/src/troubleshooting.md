# Installation troubleshooting

### I can't load an image (Mac/OSX)

[QuartzImageIO](https://github.com/JuliaIO/QuartzImageIO.jl) should be fairly easy to install on OSX, and is the recommended first choice on macs.
Unfortunately, it does not work for all image types.

[ImageMagick](https://github.com/JuliaIO/ImageMagick.jl) is more broadly-capable, but is also finicky particularly for mac users.
See https://github.com/JuliaIO/ImageMagick.jl#osx for some things to try.

### I can't load an image (Windows and Linux)

These platforms use [ImageMagick](https://github.com/JuliaIO/ImageMagick.jl) by default.
The first thing to try is `Pkg.build("ImageMagick")`; if you see any errors, these are likely to be the cause of your problem.
See the [troubleshooting](https://github.com/JuliaIO/ImageMagick.jl#troubleshooting) section of that page for more help.

### I can't display an image (ImageView)

ImageView depends on [Gtk](https://github.com/JuliaGraphics/Gtk.jl); if the error messages suggest this may be the problem, see [Gtk's troubleshooting page](https://github.com/JuliaGraphics/Gtk.jl/blob/master/doc/installation.md).
You can test your installation of Gtk with `Pkg.test("Gtk")`; if it passes, the source of trouble is likely to lie elsewhere.
