var documenterSearchIndex = {"docs": [

{
    "location": "index.html#",
    "page": "Home",
    "title": "Home",
    "category": "page",
    "text": ""
},

{
    "location": "index.html#JuliaImages:-image-processing-and-machine-vision-for-Julia-1",
    "page": "Home",
    "title": "JuliaImages: image processing and machine vision for Julia",
    "category": "section",
    "text": "JuliaImages hosts the major Julia packages for image processing. These pages are designed to help you get started with image analysis in Julia.Pages = [\"install.md\"]"
},

{
    "location": "install.html#",
    "page": "Getting started: Installation and testing your setup",
    "title": "Getting started: Installation and testing your setup",
    "category": "page",
    "text": ""
},

{
    "location": "install.html#Getting-started:-Installation-and-testing-your-setup-1",
    "page": "Getting started: Installation and testing your setup",
    "title": "Getting started: Installation and testing your setup",
    "category": "section",
    "text": "Most users probably want to start with the Images package, which bundles much (but not all) of the functionality in JuliaImages."
},

{
    "location": "install.html#Installation-1",
    "page": "Getting started: Installation and testing your setup",
    "title": "Installation",
    "category": "section",
    "text": "Install Images via the package manager,Pkg.add(\"Images\")This will also install many dependencies.Images (and possibly some additional packages) may be all you need to manipulate images programmatically. However, most users will want to take one or two additional steps: ensuring that you can load and display images."
},

{
    "location": "install.html#Loading-your-first-image-1",
    "page": "Getting started: Installation and testing your setup",
    "title": "Loading your first image",
    "category": "section",
    "text": "When testing ideas or just following along with the documentation, it can be useful to have some images to work with. The TestImages package bundles several \"standard\" images for you.To load one of the images from this package, sayPkg.add(\"TestImages\")    # if you haven't already installed this package\nusing TestImages\nimg = testimage(\"mandrill\")For loading image files that might already be on your computer, you should (if you installed Images) already have the FileIO package:using FileIO\nimg = load(\"myphoto.png\")This should load the image for you, possibly prompting you to install an input/output package appropriate for your platform."
},

{
    "location": "install.html#Displaying-images-1",
    "page": "Getting started: Installation and testing your setup",
    "title": "Displaying images",
    "category": "section",
    "text": "When working with images, it's obviously helpful to be able to look at them. If you use Julia through Juno or IJulia, images should display automatically. Users of the Julia command-line interface (REPL) can install the ImageView package:Pkg.add(\"ImageView\")\nusing TestImages, Images, ImageView\nimg = testimage(\"mandrill\")\nimshow(img)"
},

{
    "location": "install.html#Troubleshooting-1",
    "page": "Getting started: Installation and testing your setup",
    "title": "Troubleshooting",
    "category": "section",
    "text": "Reading and writing images, as well as graphical display, involve interactions with external software libraries; occasionally, the installation of these libraries goes badly. If you experience any difficulties with any of the above steps, please see the Installation troubleshooting page for more information."
},

{
    "location": "troubleshooting.html#",
    "page": "Installation troubleshooting",
    "title": "Installation troubleshooting",
    "category": "page",
    "text": ""
},

{
    "location": "troubleshooting.html#Installation-troubleshooting-1",
    "page": "Installation troubleshooting",
    "title": "Installation troubleshooting",
    "category": "section",
    "text": ""
},

{
    "location": "troubleshooting.html#I-can't-load-an-image-(Mac/OSX)-1",
    "page": "Installation troubleshooting",
    "title": "I can't load an image (Mac/OSX)",
    "category": "section",
    "text": "QuartzImageIO should be fairly easy to install on OSX, and is the recommended first choice on macs. Unfortunately, it does not work for all image types.ImageMagick is more broadly-capable, but is also finicky particularly for mac users. See https://github.com/JuliaIO/ImageMagick.jl#osx for some things to try."
},

{
    "location": "troubleshooting.html#I-can't-load-an-image-(Windows-and-Linux)-1",
    "page": "Installation troubleshooting",
    "title": "I can't load an image (Windows and Linux)",
    "category": "section",
    "text": "These platforms use ImageMagick by default. The first thing to try is Pkg.build(\"ImageMagick\"); if you see any errors, these are likely to be the cause of your problem. See the troubleshooting section of that page for more help."
},

{
    "location": "troubleshooting.html#I-can't-display-an-image-(ImageView)-1",
    "page": "Installation troubleshooting",
    "title": "I can't display an image (ImageView)",
    "category": "section",
    "text": "ImageView depends on Gtk; if the error messages suggest this may be the problem, see Gtk's troubleshooting page. You can test your installation of Gtk with Pkg.test(\"Gtk\"); if it passes, the source of trouble is likely to lie elsewhere."
},

]}
