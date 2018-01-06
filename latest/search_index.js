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
    "text": "JuliaImages (source code) hosts the major Julia packages for image processing. Julia is well-suited to image processing because it is a modern and elegant high-level language that is a pleasure to use, while also allowing you to write \"inner loops\" that compile to efficient machine code (i.e., it is as fast as C).  Julia supports multithreading and, through add-on packages, GPU processing.JuliaImages is a collection of packages specifically focused on image processing.  It is not yet as complete as some toolkits for other programming languages, but it has many useful algorithms.  It is focused on clean architecture and is designed to unify \"machine vision\" and \"biomedical 3d image processing\" communities.These pages are designed to help you get started with image analysis in Julia.Pages = [\"install.md\", \"quickstart.md\", \"arrays_colors.md\", \"conversions_views.md\", \"indexing.md\", \"imageaxes.md\", \"imagefiltering.md\", \"imagemetadata.md\", \"imagesegmentation.md\", \"function_reference.md\", \"api_comparison.md\"]"
},

{
    "location": "install.html#",
    "page": "Getting started: Installation and testing your install",
    "title": "Getting started: Installation and testing your install",
    "category": "page",
    "text": ""
},

{
    "location": "install.html#Getting-started:-Installation-and-testing-your-install-1",
    "page": "Getting started: Installation and testing your install",
    "title": "Getting started: Installation and testing your install",
    "category": "section",
    "text": "Most users probably want to start with the Images package, which bundles much (but not all) of the functionality in JuliaImages."
},

{
    "location": "install.html#Installation-1",
    "page": "Getting started: Installation and testing your install",
    "title": "Installation",
    "category": "section",
    "text": "Install Images via the package manager,Pkg.add(\"Images\")This will also install many dependencies.Images (and possibly some additional packages) may be all you need to manipulate images programmatically. However, most users will want to take one or two additional steps: ensuring that you can load and display images."
},

{
    "location": "install.html#Loading-your-first-image-1",
    "page": "Getting started: Installation and testing your install",
    "title": "Loading your first image",
    "category": "section",
    "text": "When testing ideas or just following along with the documentation, it can be useful to have some images to work with. The TestImages package bundles several \"standard\" images for you.To load one of the images from this package, sayPkg.add(\"TestImages\")    # if you haven't already installed this package\nusing TestImages\nimg = testimage(\"mandrill\")If this is your first time working with images in Julia, it's likely that these commands will prompt you to install one or more additional packages appropriate for your platform; you should generally accept the recommendation, unless you have reasons to prefer an alternate solution.For loading image files that might already be on your computer, you should (if you installed Images) already have the FileIO package:using FileIO\nimg = load(\"myphoto.png\")This should load the image for you, possibly prompting you to install an input/output package appropriate for your platform."
},

{
    "location": "install.html#Displaying-images-1",
    "page": "Getting started: Installation and testing your install",
    "title": "Displaying images",
    "category": "section",
    "text": "When working with images, it's obviously helpful to be able to look at them.  If you use Julia through Juno (FIXME: figure out Juno) or IJulia, images should display automatically:(Image: IJulia)Users of the Julia command-line interface (REPL) can install the ImageView package:Pkg.add(\"ImageView\")\nusing TestImages, Images, ImageView\nimg = testimage(\"mandrill\")\nimshow(img)ImageView includes interactive features (panning/zooming, contrast adjustment, playing movies, labeling, etc.) and may be of interest even for users of graphical environments."
},

{
    "location": "install.html#Troubleshooting-1",
    "page": "Getting started: Installation and testing your install",
    "title": "Troubleshooting",
    "category": "section",
    "text": "Reading and writing images, as well as graphical display, involve interactions with external software libraries; occasionally, the installation of these libraries goes badly. If you experience any difficulties with any of the above steps, please see the Installation troubleshooting page for more information."
},

{
    "location": "quickstart.html#",
    "page": "Quickstart",
    "title": "Quickstart",
    "category": "page",
    "text": ""
},

{
    "location": "quickstart.html#Quickstart-1",
    "page": "Quickstart",
    "title": "Quickstart",
    "category": "section",
    "text": "If you're comfortable with Julia or have used another image-processing package before, this page may help you get started quickly. If some of the terms or concepts here seem strange, don't worry–-there are much more detailed explanations in the following sections."
},

{
    "location": "quickstart.html#Images-are-just-arrays-1",
    "page": "Quickstart",
    "title": "Images are just arrays",
    "category": "section",
    "text": "For most purposes, any AbstractArray can be treated as an image. For example,using Images\n\nimg = rand(640,480)               # a random Float64 image\nimg = rand(RGB{N0f8}, 256, 256)   # a random RGB image, 8 bits per channel\n# select a region-of-interest from a larger image\nimgc = img[200:245, 17:42]        # makes a copy\nimgv = @view img[200:245, 17:42]  # makes a view\n# an image that starts black in the upper left and gets bright in the lower right:\nimg = reshape(linspace(0,1,10^4), 100, 100)\n# a 3d box image\nimg = zeros(128, 128, 80)\nimg[20:100, 20:100, 10:70] = 1Some add-on packages enable additional behavior. For example,using Images, Unitful, AxisArrays\nusing Unitful: mm, s\n\nimg = AxisArray(rand(256, 256, 100, 50), (:x, :y, :z, :time), (0.4mm, 0.4mm, 1mm, 2s))defines a 4d image (3 space dimensions plus one time dimension) with the specified name and physical pixel spacing for each coordinate. The AxisArrays package supports rich and efficient operations on such arrays, and can be useful to keep track of not just pixel spacing but the orientation convention used for multidimensional images.JuliaImages interoperates smoothly with AxisArrays and many other packages.  As further examples,the ImageMetadata package (incorporated into Images itself) allows you to \"tag\" images with custom metadata\nthe IndirectArrays package supports indexed (colormap) images\nthe MappedArrays package allows you to represent lazy value-transformations, facilitating work with images that may be too large to store in memory at once\nImageTransformations allows you to encode rotations, shears, deformations, etc., either eagerly or lazilyIt is very easy to define new array types in Julia–and consequently specialized images or operations–and have them interoperate smoothly with the vast majority of functions in JuliaImages."
},

{
    "location": "quickstart.html#Colors,-the-0-to-1-intensity-scale,-and-views-1",
    "page": "Quickstart",
    "title": "Colors, the 0-to-1 intensity scale, and views",
    "category": "section",
    "text": "In JuliaImages, by default all images are displayed assuming that 0 means \"black\" and 1 means \"white\" or \"saturated\" (the latter applying to channels of an RGB image).  Perhaps surprisingly, this 0-to-1 convention applies even when the intensities are encoded using only 8-bits per color channel.  JuliaImages uses a special type, N0f8, that interprets an 8-bit \"integer\" as if it had been scaled by 1/255, thus encoding values from 0 to 1 in 256 steps.  N0f8 numbers (standing for Normalized, with 0 integer bits and 8 fractional bits) obey standard mathematical rules, and can be added, multiplied, etc. There are types like N0f16 for working with 16-bit images (and even N2f14 for images acquired with a 14-bit camera, etc.).This infrastructure allows us to unify \"integer\" and floating-point images, and avoids the need for special conversion functions that change the value of pixels when your main goal is simply to change the type (numeric precision and properties) used to represent the pixel.Because images are just arrays, some environments (e.g., IJulia/Jupyter) will display numeric arrays as arrays (using a text representation) but will display 2d arrays that have Colorant elements as images.  You can \"convert\" in the following ways:img = colorview(Gray, rand(8, 8))          # encodes as Gray{Float64}, so displays as image\nimg = colorview(RGB, rand(3, 8, 8))        # encodes as a 2d RGB{Float64} array\nimg = colorview(RGB, rand(N0f8, 3, 8, 8))  # uses only 8 bits per channel\n# The following two \"convert\" between representation as an 8-bit RGB\n# image and as a 3×m×n UInt8 array\nimg = colorview(RGB, normedview(A))\nA = rawview(channelview(rand(RGB{N0f8}, 8, 8)))All of these \"conversions\" actually create views, meaning that no copies of the underlying storage are made unless you call copy on the result."
},

{
    "location": "quickstart.html#Default-orientation-and-storage-order-1",
    "page": "Quickstart",
    "title": "Default orientation and storage order",
    "category": "section",
    "text": "Images are \"vertical-major,\" meaning that when the image is displayed the first index corresponds to the vertical axis. Note that by default, in Julia the first index is also the fastest (i.e., has adjacent storage in memory).You can use permuteddimsview to \"reinterpret\" the orientation of a chunk of memory without making a copy, or permutedims if you want a copy."
},

{
    "location": "quickstart.html#Arrays-with-arbitrary-indices-1",
    "page": "Quickstart",
    "title": "Arrays with arbitrary indices",
    "category": "section",
    "text": "If you have an input image and perform some kind of spatial transformation on it, how do pixels/voxels in the transformed image match up to pixels in the input? Through Julia's support for arrays with indices that start at values other than 1, it is possible to allow array indices to represent absolute position in space, making it straightforward to keep track of the correspondence between location across multiple images. More information can be found in Keeping track of location with unconventional indices."
},

{
    "location": "quickstart.html#Function-categories-1",
    "page": "Quickstart",
    "title": "Function categories",
    "category": "section",
    "text": "See Summary and function reference for more information about each of the topics below. The list below is accessible via ?Images from the Julia REPL. If you've used other frameworks previously, you may also be interested in the Comparison with other image processing frameworks.Constructors, conversions, and traits:Construction: use constructors of specialized packages, e.g., AxisArray, ImageMeta, etc.\n\"Conversion\": colorview, channelview, rawview, normedview, permuteddimsview, paddedviews\nTraits: pixelspacing, sdims, timeaxis, timedim, spacedirectionsContrast/coloration:clamp01, clamp01nan, scaleminmax, colorsigned, scalesignedAlgorithms:Reductions: maxfinite, maxabsfinite, minfinite, meanfinite, sad, ssd, integral_image, boxdiff, gaussian_pyramid\nResizing and spatial transformations: restrict, imresize, warp\nFiltering: imfilter, imfilter!, imfilter_LoG, mapwindow, imROF, padarray\nFiltering kernels: Kernel. or KernelFactors., followed by ando[345], guassian2d, imaverage, imdog, imlaplacian, prewitt, sobel\nExposure : imhist, histeq, adjust_gamma, histmatch, imadjustintensity, imstretch, imcomplement, clahe, cliphist\nGradients: backdiffx, backdiffy, forwarddiffx, forwarddiffy, imgradients\nEdge detection: imedge, imgradients, thin_edges, magnitude, phase, magnitudephase, orientation, canny\nCorner detection: imcorner, harris, shi_tomasi, kitchen_rosenfeld, meancovs, gammacovs, fastcorners\nBlob detection: blob_LoG, findlocalmaxima, findlocalminima\nMorphological operations: dilate, erode, closing, opening, tophat, bothat, morphogradient, morpholaplace, feature_transform, distance_transform\nConnected components: label_components, component_boxes, component_lengths, component_indices, component_subscripts, component_centroids\nInterpolation: bilinear_interpolationTest images and phantoms (see also TestImages.jl):shepp_loganSee also the excellent ImageFeatures package, which supports a number of algorithms important for computer vision."
},

{
    "location": "arrays_colors.html#",
    "page": "Arrays, Numbers, and Colors",
    "title": "Arrays, Numbers, and Colors",
    "category": "page",
    "text": ""
},

{
    "location": "arrays_colors.html#Arrays,-Numbers,-and-Colors-1",
    "page": "Arrays, Numbers, and Colors",
    "title": "Arrays, Numbers, and Colors",
    "category": "section",
    "text": "DocTestSetup = quote\n    srand(2)\nendIn Julia, an image is just an array, and many of the ways you manipulate images come from the general methods to work with multidimensional arrays. For example,julia> img = rand(2,2)\n2×2 Array{Float64,2}:\n 0.366796  0.210256\n 0.523879  0.819338defines an \"image\" img of 64-bit floating-point numbers. You should be able to use this as an image in most or all functions in JuliaImages.We'll be talking quite a bit about handling arrays. This page will focus on the \"element type\" (eltype) stored in the array. In case you're new to Julia, if a is an array of integers:julia> a = [1,2,3,4]\n4-element Array{Int64,1}:\n 1\n 2\n 3\n 4then all of the following create a new array where the element type is Float64:convert(Array{Float64}, a)\nmap(Float64, a)\nFloat64.(a)     # short for broadcast(Float64, a)For example,julia> Float64.(a)\n4-element Array{Float64,1}:\n 1.0\n 2.0\n 3.0\n 4.0Arrays are indexed with square brackets (a[1]), with indexing starting at 1 by default. A two-dimensional array like img can be indexed as img[2,1], which would be the second row, first column. Julia also supports \"linear indexing,\" using a single integer to address elements of an arbitrary multidimensional array in a manner that (in simple cases) reflects the memory offset of the particular element. For example, img[3] corresponds to img[1,2] (numbering goes down columns, and then wraps around at the top of the next column, because Julia arrays are stored in \"column major\" order where the fastest dimension is the first dimension)."
},

{
    "location": "arrays_colors.html#Numbers-versus-colors-1",
    "page": "Arrays, Numbers, and Colors",
    "title": "Numbers versus colors",
    "category": "section",
    "text": "For the array img we created above, you can display it as a grayscale image using ImageView. But if you're following along in IJulia, you might notice that img does not display as an image: instead, it prints as an array of numbers as shown above.  Arrays of \"plain numbers\" are not displayed graphically, because they might represent something numerical (e.g., a matrix used for linear algebra) rather than an image. To indicate that this is worthy of graphical display, convert the element type to a color chosen from the Colors package:(Image: float_gray)Here we used Gray to indicate that this array should be interpreted as a grayscale image.Under the hood, what is Gray doing?  It's informative to see the \"raw\" object, displayed as text:(Image: float_gray_text)(should there be a convenience function for this?) (Users of the Julia command-line REPL interface will see this representation immediately, rather than the graphical one.)You can see this is a 2×2 array of Gray{Float64} objects. You might be curious how these Gray objects are represented. In the command-line REPL, it looks like this (the same command works with IJulia):julia> dump(imgg[1,1])\nColorTypes.Gray{Float64}\n  val: Float64 0.36679641243992434dump shows the \"internal\" representation of an object.  You can see that Gray is a type (technically, an immutable) with a single field val; for Gray{Float64}, val is a 64-bit floating point number. Using val directly is not recommended: you can extract the Float64 value with the accessor functions real or gray (the reason for the latter name will be clearer when we discuss RGB colors).What kind of overhead do these objects incur?julia> sizeof(img)\n32\n\njulia> sizeof(imgg)\n32The answer is \"none\": they don't take up any memory of their own, nor do they typically require any additional processing time. The Gray \"wrapper\" is just an \"interpretation\" of the values, one that helps clarify that this should be displayed as a grayscale image.  Indeed, img and imgg compare as equal:julia> img == imgg\ntrueThere's more to say on this topic, but we'll wait until we discuss Conversions vs. views."
},

{
    "location": "arrays_colors.html#Colors-beyond-the-pale-1",
    "page": "Arrays, Numbers, and Colors",
    "title": "Colors beyond the pale",
    "category": "section",
    "text": "Gray is not the only color in the universe:(Image: randrgb)Let's look at imgc as text (shown here in the REPL):julia> imgc\n2×2 Array{ColorTypes.RGB{Float32},2}:\n RGB{Float32}(0.75509,0.965058,0.65486)     RGB{Float32}(0.696203,0.142474,0.783316)\n RGB{Float32}(0.705195,0.953892,0.0744661)  RGB{Float32}(0.571945,0.42736,0.548254)\n\njulia> size(imgc)\n(2,2)\n\njulia> dump(imgc[1,1])\nColorTypes.RGB{Float32}\n  r: Float32 0.7550899\n  g: Float32 0.9650581\n  b: Float32 0.65485954Here we see one of the primary differences between Julia's approach to images and that of several other popular frameworks: imgc does not have a dimension of the array devoted to the \"color channel.\" Instead, every element of the array corresponds to a complete pixel's worth of information. Often this simplifies the logic of many algorithms, sometimes allowing a single implementation to work for both color and grayscale images.You can extract the individual color channels using their field names (r, g, and b), but as you'll see in a moment, a more universal approach is to use accessor functions:julia> c = imgc[1,1]; (red(c), green(c), blue(c))\n(0.7550899f0,0.9650581f0,0.65485954f0)Julia's Colors package allows the same color to be represented in several different ways, and this can facilitate interaction with other tools. For example, certain C libraries permit or prefer the order of the color channels to be different:julia> dump(convert(BGR, c))\nColorTypes.BGR{Float32}\n  b: Float32 0.65485954\n  g: Float32 0.9650581\n  r: Float32 0.7550899or even to pack the red, green, and blue colors–-together with a dummy \"alpha\" (transparency) channel–-into a single 32-bit integer:julia> c24 = convert(RGB24, c); dump(c24)\nColorTypes.RGB24\n  color: UInt32 12711591\n\njulia> c24.color\n0x00c1f6a7From first (the first two hex-digits after the \"0x\") to last (the final two hex-digits), the order of the channels here is alpha, red, green, blue:julia> 0xc1/0xff\n0.7568627450980392\n\njulia> 0xf6/0xff\n0.9647058823529412\n\njulia> 0xa7/0xff\n0.6549019607843137These values are close to the channels of c, but have been rounded off–-each channel is encoded with only 8 bits, so some approximation of the exact floating-point value is unavoidable."
},

{
    "location": "arrays_colors.html#A-consistent-scale-for-floating-point-and-\"integer\"-colors:-fixed-point-numbers-1",
    "page": "Arrays, Numbers, and Colors",
    "title": "A consistent scale for floating-point and \"integer\" colors: fixed-point numbers",
    "category": "section",
    "text": "c24 does not have an r field, but we can still use red to extract the red channel:julia> r = red(c24)\n0.757N0f8This may look fairly strange at first, so let's unpack this carefully. Notice first that the \"floating-point\" portion of this number matches (to within the precision of the rounding) the value of red(c). The N0f8 means \"Normalized with 8 fractional bits, with 0 bits left for representing values higher than 1.\" This is a fixed-point number–-rather like floating-point numbers, except that the decimal does not \"float\". Internally, these are represented in terms of the 8-bit unsigned integer UInt8julia> dump(r)\nFixedPointNumbers.Normed{UInt8,8}\n  i: UInt8 193(Note that N0f8 is an abbreviation; the full typename is Normed{UInt8, 8}.) N0f8 interprets this 8-bit integer as a value lying between 0 and 1, with 0 corresponding to 0x00 and 1 corresponding to 0xff. This interpretation affects how the number is used for arithmetic and conversion to and from other values. Stated another way, r behaves asjulia> r == 193/255\ntruefor essentially all purposes (but see A note on arithmetic overflow).This has a very important consequence: in many other image frameworks, the \"meaning\" of an image depends on how it is stored, but in Julia the meaning can be assigned independently of storage representation. For example, in a different language/framework, the following sequence:img = uint8(255*rand(10, 10, 3));\nfigure; image(img)\nimgd = double(img);   % convert to double-precision, but don't change the values\nfigure; image(imgd)might produce the following images:img imgd\n(Image: checker) (Image: checker2)The one on the right looks white because floating-point types are interpreted on a 0-to-1 colorscale, whereas uint8 is interpreted on a 0-to-255 colorscale.Many frameworks offer convenience functions for converting images from one representation to another, but this can be a source of bugs if we go to compare images: in most number systems we would agree that 255 != 1.0, and this fact means that you sometimes need to be quite careful when converting from one representation to another. Conversely, using these Julia packages there is no discrepancy in \"meaning\" between the encoding of images represented as floating point or 8-bit (or 16-bit) fixed-point numbers: 0 always means \"black\" and 1 always means \"white\" or \"saturated.\"Now, this doesn't prevent you from constructing pixels with values out of this range:(Image: saturated_spectrum)Notice that the first two yellows look identical, because both the red and green color channels are 1 or higher and consequently are saturated.However, you should be aware that for integer inputs, the default is to use the N0f8 element type, and this type cannot represent values outside the range from 0 to 1:julia> RGB(8,2,0)\nERROR: ArgumentError: (8,2,0) are integers in the range 0-255, but integer inputs are encoded with the N0f8\n  type, an 8-bit type representing 256 discrete values between 0 and 1.\n  Consider dividing your input values by 255, for example: RGB{N0f8}(8/255,2/255,0/255)\n  See the READMEs for FixedPointNumbers and ColorTypes for more information.\n in throw_colorerror(::Type{FixedPointNumbers.Normed{UInt8,8}}, ::Tuple{Int64,Int64,Int64}) at /home/tim/.julia/v0.5/ColorTypes/src/types.jl:639\n in throw_colorerror(::Type{FixedPointNumbers.Normed{UInt8,8}}, ::Int64, ::Int64, ::Int64) at /home/tim/.julia/v0.5/ColorTypes/src/types.jl:608\n in checkval at /home/tim/.julia/v0.5/ColorTypes/src/types.jl:596 [inlined]\n in ColorTypes.RGB{FixedPointNumbers.Normed{UInt8,8}}(::Int64, ::Int64, ::Int64) at /home/tim/.julia/v0.5/ColorTypes/src/types.jl:90\n in ColorTypes.RGB{T<:Union{AbstractFloat,FixedPointNumbers.FixedPoint}}(::Int64, ::Int64, ::Int64) at /home/tim/.julia/v0.5/ColorTypes/src/types.jl:437The error message here reminds you how to resolve a common mistake, trying to construct red as RGB(255, 0, 0). In Julia, that should always be RGB(1, 0, 0)."
},

{
    "location": "arrays_colors.html#More-fixed-point-numbers-1",
    "page": "Arrays, Numbers, and Colors",
    "title": "More fixed-point numbers",
    "category": "section",
    "text": "16-bit images can be expressed in terms of the N0f16 type. Let's compare the maximum values (typemax) and smallest-difference (eps) representable with N0f8 and N0f16:julia> using FixedPointNumbers\n\njulia> (typemax(N0f8), eps(N0f8))\n(1.0N0f8,0.004N0f8)\n\njulia> (typemax(N0f16), eps(N0f16))\n(1.0N0f16,2.0e-5N0f16)You can see that this type also has a maximum value of 1, but is higher precision, with the gap between adjacent numbers being much smaller.Many cameras (particularly, scientific cameras) now return 16-bit values. However, some cameras do not provide a full 16 bits worth of information; for example, the camera might be 12-bit and return values between 0x0000 and 0x0fff.  As an N0f16, the latter displays as nearly black:(Image: 12bit_black)Since the camera is saturated, this is quite misleading–-it should instead display as white.This again illustrates one of the fundamental problems about assuming that the representation (a 16-bit integer) also describes the meaning of the number. In Julia, we decouple these by providing many different fixed-point number types. In this case, the natural way to interpret these values is by using a fixed-point number with 12 fractional bits; this leaves 4 bits that we can use to represent values bigger than 1, so the number type is called N4f12:julia> (typemax(N4f12), eps(N4f12))\n(16.0037N4f12,0.0002N4f12)You can see that the maximum value achievable by an N4f12 is approximately 16 = 2^4.Using this N4f12 interpretation of the 16 bits, the color displays correctly as white:(Image: 12bit_black)and acts like 1 for all arithmetic purposes. Even though the raw representation as 0x0fff is the same, we can endow the number with appropriate meaning through its type."
},

{
    "location": "arrays_colors.html#A-note-on-arithmetic-overflow-1",
    "page": "Arrays, Numbers, and Colors",
    "title": "A note on arithmetic overflow",
    "category": "section",
    "text": "Sometimes, being able to construct a color values outside 0 to 1 is useful. For example, if you want to compute the average color in an image, the natural approach is to first sum all the pixels and then divide by the total number of pixels. At an intermediate stage, the sum will typically result in a color that is well beyond saturation.It's important to note that arithmetic with N0f8 numbers, like arithmetic with UInt8, overflows:julia> 0xff + 0xff\n0xfe\n\njulia> 0xfe/0xff\n0.996078431372549\n\njulia> 1N0f8 + 1N0f8\n0.996N0f8Consequently, if you're accumulating values, it's advisable to accumulate them in an appropriate floating-point type, such as Float32, Gray{Float64}, or RGB{Float32}."
},

{
    "location": "conversions_views.html#",
    "page": "Conversions vs. views",
    "title": "Conversions vs. views",
    "category": "page",
    "text": ""
},

{
    "location": "conversions_views.html#Conversions-vs.-views-1",
    "page": "Conversions vs. views",
    "title": "Conversions vs. views",
    "category": "section",
    "text": ""
},

{
    "location": "conversions_views.html#Sharing-memory:-an-introduction-to-views-1",
    "page": "Conversions vs. views",
    "title": "Sharing memory: an introduction to views",
    "category": "section",
    "text": "In Arrays, Numbers, and Colors we discussed how one can convert the element type of an array a = [1,2,3,4] using a syntax like Float64.(a). You might be curious what affect, if any, Int.(a) has:julia> a = [1,2,3,4]\n4-element Array{Int64,1}:\n 1\n 2\n 3\n 4\n\njulia> b = Int.(a)\n4-element Array{Int64,1}:\n 1\n 2\n 3\n 4There's certainly no obvious change, and as you'd expect b == a returns true.  Beyond having equal size and elements, there's a more extensive notion of \"sameness\": do a and b refer to the same storage area in memory?  We can test that in the following ways:julia> a === b   # note: 3 equal signs!\nfalseor more generally by setting a value and seeing whether the change is reflected in the other:julia> b[1] = 5\n5\n\njulia> b\n4-element Array{Int64,1}:\n 5\n 2\n 3\n 4\n\njulia> a\n4-element Array{Int64,1}:\n 1\n 2\n 3\n 4Since the types of a and b are identical, both tests tell us that a and b are independent objects, even if they (initially) had the same values.This occurs because f.(a) (which calls the function broadcast(f, a)) always allocates a new array to return its values. However, not all functions operate this way. One good example is view:julia> v = view(a, :)\n4-element SubArray{Int64,1,Array{Int64,1},Tuple{Colon},true}:\n 1\n 2\n 3\n 4Now, v and a have the same values but are distinct objects:julia> v == a\ntrue\n\njulia> v === a\nfalseHowever, they share the same memory:julia> v[1] = 10\n10\n\njulia> v\n4-element SubArray{Int64,1,Array{Int64,1},Tuple{Colon},true}:\n 10\n  2\n  3\n  4\n\njulia> a\n4-element Array{Int64,1}:\n 10\n  2\n  3\n  4Consequently, v is a \"view\" of the values stored in a.  While this usage of view is trivial, more generally it can be used to select a rectangular region of interest, which is a common operation in image processing; this region is selected without copying any data, and any manipulations of the values within this region are reflected in the original (parent) array. See the documentation on view, by typing ?view, for more information.view is not the only function with this property: another good example is reshape, which can be used to change the dimensions of an array:julia> r = reshape(a, 2, 2)\n2×2 Array{Int64,2}:\n 10  3\n  2  4\n\njulia> r[1,2] = 7\n7\n\njulia> r\n2×2 Array{Int64,2}:\n 10  7\n  2  4\n\njulia> a\n4-element Array{Int64,1}:\n 10\n  2\n  7\n  4Notice that the return type of reshape is just an Array, one which happens to be serving as a view of a. However, some inputs cannot be represented as a view with an Array. For example:julia> r = reshape(1:15, 3, 5)\n3×5 Base.ReshapedArray{Int64,2,UnitRange{Int64},Tuple{}}:\n 1  4  7  10  13\n 2  5  8  11  14\n 3  6  9  12  15A UnitRange is represented compactly–-storing only the starting and stopping values–-so there is no memory location that can be referenced to access all values. In such cases, reshape returns a ReshapedArray, which is a generic \"view type\" that handles reshaping of any kind of AbstractArray.The output of both view and reshape are always views: make a change in either the parent or the view, and the change is reflected in the other."
},

{
    "location": "conversions_views.html#Views-for-\"converting\"-between-fixed-point-and-raw-representations-1",
    "page": "Conversions vs. views",
    "title": "Views for \"converting\" between fixed-point and raw representations",
    "category": "section",
    "text": "Arrays, Numbers, and Colors also introduced the fixed-point numbers used in some representations of color (or grayscale) information. If you want to switch representation, you can use the reinterpret function:julia> using FixedPointNumbers\n\njulia> x = 0.5N0f8\n0.502N0f8\n\njulia> y = reinterpret(x)  # alternatively, use: reinterpret(UInt8, x)\n0x80\n\njulia> reinterpret(N0f8, y)\n0.502N0f8You can apply this to arrays:julia> a = [0.2N0f8, 0.8N0f8]\n2-element Array{FixedPointNumbers.Normed{UInt8,8},1}:\n 0.2N0f8\n 0.8N0f8\n\njulia> b = reinterpret.(a)\n2-element Array{UInt8,1}:\n 0x33\n 0xccBecause of the f.(a) call, b does not share memory with a:julia> b[2] = 0xff\n0xff\n\njulia> a\n2-element Array{FixedPointNumbers.Normed{UInt8,8},1}:\n 0.2N0f8\n 0.8N0f8Often this might not be a problem, but sometimes you might wish that these referenced the same underlying object.  For such situations, JuliaImages, through the ImageCore package (which is bundled with Images), implements views that can perform this reinterpretation:julia> using Images\n\njulia> v = rawview(a)\n2-element Array{UInt8,1}:\n 0x33\n 0xcc\n\njulia> v[2] = 0xff\n0xff\n\njulia> a\n2-element Array{FixedPointNumbers.Normed{UInt8,8},1}:\n 0.2N0f8\n 1.0N0f8The opposite transformation is normedview:julia> c = [0x11, 0x22]\n2-element Array{UInt8,1}:\n 0x11\n 0x22\n\njulia> normedview(c)\n2-element Array{FixedPointNumbers.Normed{UInt8,8},1}:\n 0.067N0f8\n 0.133N0f8normedview allows you to pass the interpreted type as the first argument, i.e., normedview(N0f8, A), and indeed it's required to do so unless A has element type UInt8, in which case normedview assumes you want N0f8.Like reshape, both rawview and normedview might return an Array or a more complicated type (a MappedArray from the MappedArrays package), depending on the types of the inputs."
},

{
    "location": "conversions_views.html#Color-separations:-views-for-converting-between-numbers-and-colors-1",
    "page": "Conversions vs. views",
    "title": "Color separations: views for converting between numbers and colors",
    "category": "section",
    "text": "In Arrays, Numbers, and Colors, we pointed out that one can convert a numeric array to a grayscale array with Gray.(a); the opposite transformation can be performed with real.(b). Handling RGB colors is a little more complicated, because the dimensionality of the array changes. One approach is to use Julia's comprehensions:julia> a = reshape(collect(0.1:0.1:0.6), 3, 2)\n3×2 Array{Float64,2}:\n 0.1  0.4\n 0.2  0.5\n 0.3  0.6\n\njulia> c = [RGB(a[1,j], a[2,j], a[3,j]) for j = 1:2]\n2-element Array{ColorTypes.RGB{Float64},1}:\n RGB{Float64}(0.1,0.2,0.3)\n RGB{Float64}(0.4,0.5,0.6)\n\njulia> x = [getfield(c[j], i) for i = 1:3, j = 1:2]\n3×2 Array{Float64,2}:\n 0.1  0.4\n 0.2  0.5\n 0.3  0.6While this approach works, it's not without flaws:this implementation relies on the two-dimensionality of a; a 3d array (producing a 2d color image) would need a different implementation\nthe use of getfield assumes that elements of c have fields and that they are in the order r, g, b. Given the large number of different representations of RGB supported by ColorTypes, neither of these assumptions is entirely safe.\nit always makes a copy of the dataTo address these weaknesses, JuliaImages provides two complementary view types, ColorView and ChannelView:julia> colv = colorview(RGB, a)\n2-element Array{ColorTypes.RGB{Float64},1}:\n RGB{Float64}(0.1,0.2,0.3)\n RGB{Float64}(0.4,0.5,0.6)\n\njulia> chanv = channelview(c)\n3×2 Array{Float64,2}:\n 0.1  0.4\n 0.2  0.5\n 0.3  0.6colorview and channelview always return a view of the original array; whether they return an Array or a ColorView/ChannelView again depends on the input types."
},

{
    "location": "conversions_views.html#Using-colorview-to-make-color-overlays-1",
    "page": "Conversions vs. views",
    "title": "Using colorview to make color overlays",
    "category": "section",
    "text": "Another use for colorview is to combine multiple grayscale images into a single color image. For example:using Colors, Images\nr = linspace(0,1,11)\nb = linspace(1,0,11)\nimg1d = colorview(RGB, r, zeroarray, b)results (in IJulia) in(Image: linspace)zeroarray is a special constant that \"expands\" to return the equivalent of an all-zeros array matching the indices of the other inputs to colorview."
},

{
    "location": "conversions_views.html#Changing-the-order-of-dimensions-1",
    "page": "Conversions vs. views",
    "title": "Changing the order of dimensions",
    "category": "section",
    "text": "When you've separated colors into a separate color dimension, some code might assume that color is the last (slowest) dimension. You can convert directly using Julia's permutedims function:julia> pc = permutedims(a, (2,1))\n2×3 Array{Float64,2}:\n 0.1  0.2  0.3\n 0.4  0.5  0.6permutedims explicitly creates a new array with the data rearranged in memory. It's also possible to perform something similar as a view:julia> pv = permuteddimsview(a, (2,1))\n2×3 permuteddimsview(::Array{Float64,2}, (2,1)) with element type Float64:\n 0.1  0.2  0.3\n 0.4  0.5  0.6While this looks the same, pv (unlike pc) shares memory with a; this is an apparent permutation, achieved by having the indexing of a permuteddimsview array swap the input indexes whenever individual elements are accessed.One thing to be aware of is that the performance of these two might differ, for reasons that have to do with how CPUs and memory work rather than any limitation of Julia. If a is large and you want to access all three elements corresponding to the color channels of a single pixel, pv will likely be more efficient because values are adjacent in memory and thus likely share a cache line. Conversely, if you want to access different pixels from a single color channel sequentially, pc may be more efficient (for the same reason)."
},

{
    "location": "conversions_views.html#Adding-padding-1",
    "page": "Conversions vs. views",
    "title": "Adding padding",
    "category": "section",
    "text": "Sometimes when you want to compare two images, one might be of a different size than another. You can create array views that have common indices with paddedviews:julia> a1 = reshape([1,2], 2, 1)\n2×1 Array{Int64,2}:\n 1\n 2\n\njulia> a2 = [1.0,2.0]'\n1×2 Array{Float64,2}:\n 1.0  2.0\n\njulia> a1p, a2p = paddedviews(0, a1, a2);   # 0 is the fill value\n\njulia> a1p\n2×2 PaddedViews.PaddedView{Int64,2,Tuple{Base.OneTo{Int64},Base.OneTo{Int64}},Array{Int64,2}}:\n 1  0\n 2  0\n\njulia> a2p\n2×2 PaddedViews.PaddedView{Float64,2,Tuple{Base.OneTo{Int64},Base.OneTo{Int64}},Array{Float64,2}}:\n 1.0  2.0\n 0.0  0.0This can be especially useful in conjunction with colorview to compare two (or more) grayscale images. See Keeping track of location with unconventional indices for more information."
},

{
    "location": "conversions_views.html#Decoupling-views-from-the-parent-memory-1",
    "page": "Conversions vs. views",
    "title": "Decoupling views from the parent memory",
    "category": "section",
    "text": "If you want to use some of these views but have an application where the sharing of memory is actually problematic, keep in mind that you can always call Julia's copy function to create a copy of the array. The type of the resulting copy might not be identical to the original, but the values will be the same."
},

{
    "location": "conversions_views.html#Composing-views-(and-compact-summaries)-1",
    "page": "Conversions vs. views",
    "title": "Composing views (and compact summaries)",
    "category": "section",
    "text": "When Julia displays an array as text, there is usually a 1-line summary at the top showing the array type. You may have already noticed that JuliaImages uses an unconventional syntax for summarizing information about certain kinds of arrays. For example, the type of pv above isBase.PermutedDimsArrays.PermutedDimsArray{Float64,2,(2,1),(2,1),Array{Float64,2}}but when you display such an object, in the summary line it prints aspermuteddimsview(::Array{Float64,2}, (2,1)) with element type Float64This is intended to result in more easily-readable information about types.The main motivation for this is that different view types can be combined freely, and when you do so sometimes the type gets quite long. For example, suppose you have a disk file storing a m×n×3×t UInt8 array representing an RGB movie (t being the time axis). To have it display as an RGB movie, you might create the following view of the array A:mov = colorview(RGB, normedview(permuteddimsview(A, (3,1,2,4))))If you show mov at the REPL, the summary prints like this:ColorView{RGB}(normedview(N0f8, permuteddimsview(::Array{UInt8,4}, (3,1,2,4)))) with element type ColorTypes.RGB{FixedPointNumbers.Normed{UInt8,8}}which may be somewhat easier to read than the type:ImageCore.ColorView{ColorTypes.RGB{FixedPointNumbers.Normed{UInt8,8}},3,MappedArrays.MappedArray{FixedPointNumbers.Normed{UInt8,8},4,Base.PermutedDimsArrays.PermutedDimsArray{UInt8,4,(3,1,2,4),(2,3,1,4),Array{UInt8,4}},ImageCore.##29#30{FixedPointNumbers.Normed{UInt8,8}},Base.#reinterpret}}While there is little or no performance cost to making use of JuliaImage's convenient views, sometimes the types can get complicated! The strategy adopted here is to ShowItLikeYouBuildIt."
},

{
    "location": "indexing.html#",
    "page": "Arrays: more advanced indexing",
    "title": "Arrays: more advanced indexing",
    "category": "page",
    "text": ""
},

{
    "location": "indexing.html#Arrays:-more-advanced-indexing-1",
    "page": "Arrays: more advanced indexing",
    "title": "Arrays: more advanced indexing",
    "category": "section",
    "text": "In addition to the handling of numbers and colors, one of the main ways that JuliaImages leverages Julia is through a number of more sophisticated indexing operations. These are perhaps best illustrated with examples."
},

{
    "location": "indexing.html#Keeping-track-of-location-with-unconventional-indices-1",
    "page": "Arrays: more advanced indexing",
    "title": "Keeping track of location with unconventional indices",
    "category": "section",
    "text": "Consider the following pair of images:imgref img\n(Image: cameraman) (Image: cameraman)You might guess that the one on the right is a rotated version of the one on the left. But, what is the angle? Is there also a translation?A \"low tech\" way to test this is to rotate and shift the image on the right until it seems aligned with the one on the left. We could overlay the two images (Using colorview to make color overlays) to see how well we're doing.# Define the transformation, using CoordinateTransformations\n# We're rotating around the center of img\njulia> tfm = recenter(RotMatrix(pi/8), center(img))\nAffineMap([0.92388 -0.382683; 0.382683 0.92388], [88.7786,-59.3199])\n\n# Apply it to the image\njulia> imgrot = warp(img, tfm);\n\njulia> summary(img)\n\"386×386 Array{Gray{N0f8},2}\"\n\njulia> summary(imgrot)\n\"-59:446×-59:446 OffsetArray{Gray{Float64},2}\"While img has indices that start with the conventional 1, the summary of imgrot reports that it has indices (-59:446, -59:446). This means that the first element of imgrot is indexed with imgrot[-59,-59] and the last element with imgrot[446,446].What is the meaning of these indices that extend beyond those of the original array in both directions? Displaying the rotated image–-especially when overlaid on the original–-reveals why:julia> imgov = colorview(RGB, paddedviews(0, img, imgrot, zeroarray)...)(Image: rot_overlay)The padding on all sides of the array leaves space for the fact that the rotated image (green) contains some pixels out of the region covered by the original image (red).  The fact that Julia allows these indices to be negative means that we have no trouble adding appropriate \"padding\" to the original image: we just copy the original over to the padded array, using its original indices.We can test whether imgrot aligns well with the original unrotated image imgref at the top of this page:julia> imgov_ref = colorview(RGB, paddedviews(0, imgref, imgrot, zeroarray)...)(Image: ref_overlay)The fact that the overlapping portion looks yellow–-the combination of red and green–-indicates that we have perfect alignment.You can learn more about Julia's support for arbitrary indices in this blog post."
},

{
    "location": "indexing.html#Keeping-track-of-orientation-with-named-axes-1",
    "page": "Arrays: more advanced indexing",
    "title": "Keeping track of orientation with named axes",
    "category": "section",
    "text": "Suppose you are presented with a 3-dimensional grayscale image. Is this a movie (2d over time), or a 3d image (x, y, and z)? In such situations, one of the best ways to keep yourself oriented is by naming the axes.julia> using Images, TestImages\n\njulia> img = testimage(\"mri\");\n\n# Create a \"labeled image\"\njulia> imgl = AxisArray(img, :A, :R, :S)\n3-dimensional AxisArray{ColorTypes.Gray{FixedPointNumbers.Normed{UInt8,8}},3,...} with axes:\n    :A, Base.OneTo(226)\n    :R, Base.OneTo(186)\n    :S, Base.OneTo(27)\nAnd data, a 226×186×27 Array{ColorTypes.Gray{FixedPointNumbers.Normed{UInt8,8}},3}:\n[:, :, 1] =\n Gray{N0f8}(0.0)  Gray{N0f8}(0.0)  Gray{N0f8}(0.0)  Gray{N0f8}(0.0)  …  Gray{N0f8}(0.0)  Gray{N0f8}(0.0)  Gray{N0f8}(0.0)  Gray{N0f8}(0.0)\n Gray{N0f8}(0.0)  Gray{N0f8}(0.0)  Gray{N0f8}(0.0)  Gray{N0f8}(0.0)     Gray{N0f8}(0.0)  Gray{N0f8}(0.0)  Gray{N0f8}(0.0)  Gray{N0f8}(0.0)\n...Here we used the AxisArrays package to name our axes in terms of the RAS coordinate system (Right, Anterior, Superior) as commonly used in magnetic resonance imaging.We can use this coordinate system to help with visualization. Let's look at a \"horizontal slice,\" one perpendicular to the superior-inferior axis (i.e., a slice with constant S value):(Image: Sslice)From the summary you can see that the slice has just the :A and :R axes remaining.We could slice along the R and A axes too, although for this image (which is sampled very anisotropically) they are not as informative.The ImageAxes and ImageMetadata packages add additional functionality to AxisArrays that may be useful when you need to encode more information about your image."
},

{
    "location": "imageaxes.html#",
    "page": "ImageAxes.jl",
    "title": "ImageAxes.jl",
    "category": "page",
    "text": ""
},

{
    "location": "imageaxes.html#ImageAxes.jl-1",
    "page": "ImageAxes.jl",
    "title": "ImageAxes.jl",
    "category": "section",
    "text": "While images can often be represented as plain Arrays, sometimes additional information about the \"meaning\" of each axis of the array is needed.  For example, in a 3-dimensional MRI scan, the voxels may not have the same spacing along the z-axis that they do along the x- and y-axes, and this fact should be accounted for during the display and/or analysis of such images.  Likewise, a movie has two spatial axes and one temporal axis; this fact may be relevant for how one performs image processing.The ImageAxes package (which is incorporated into Images) combines features from AxisArrays and SimpleTraits to provide a convenient representation and programming paradigm for dealing with such images."
},

{
    "location": "imageaxes.html#Installation-1",
    "page": "ImageAxes.jl",
    "title": "Installation",
    "category": "section",
    "text": "If you've installed the Images packages, ImageAxes should already be installed for you. If not, add it withPkg.add(\"ImageAxes\")"
},

{
    "location": "imageaxes.html#Usage-1",
    "page": "ImageAxes.jl",
    "title": "Usage",
    "category": "section",
    "text": ""
},

{
    "location": "imageaxes.html#Names-and-locations-1",
    "page": "ImageAxes.jl",
    "title": "Names and locations",
    "category": "section",
    "text": "The simplest thing you can do is to provide names to your image axes:using ImageAxes\nimg = AxisArray(reshape(1:192, (8,8,3)), :x, :y, :z)As described in more detail in the AxisArrays documentation, you can now take slices like this:sl = img[Axis{:z}(2)]You can also give units to the axes:using ImageAxes, Unitful\nconst mm = u\"mm\"\nimg = AxisArray(reshape(1:192, (8,8,3)),\n                Axis{:x}(1mm:1mm:8mm),\n                Axis{:y}(1mm:1mm:8mm),\n                Axis{:z}(2mm:3mm:8mm))which specifies that x and y have spacing of 1mm and z has a spacing of 3mm, as well as the location of the center of each voxel."
},

{
    "location": "imageaxes.html#Temporal-axes-1",
    "page": "ImageAxes.jl",
    "title": "Temporal axes",
    "category": "section",
    "text": "Any array possessing an axis Axis{:time} will be recognized as having a temporal dimension.  Given an array A,using ImageAxes, Unitful\nconst s = u\"s\"\nimg = AxisArray(reshape(1:9*300, (3,3,300)),\n                Axis{:x}(1:3),\n                Axis{:y}(1:3),\n                Axis{:time}(1s/30:1s/30:10s))you can retrieve its temporal axis withax = timeaxis(img)and index it likeimg[ax(4)]  # returns the 4th \"timeslice\"You can also specialize methods like this:using ImageAxes, SimpleTraits\n@traitfn nimages{AA<:AxisArray;  HasTimeAxis{AA}}(img::AA) = length(timeaxis(img))\n@traitfn nimages{AA<:AxisArray; !HasTimeAxis{AA}}(img::AA) = 1where the pre-defined HasTimeAxis trait will restrict that method to arrays that have a timeaxis. A more complex example isusing ImageAxes, SimpleTraits\n@traitfn meanintensity{AA<:AxisArray; !HasTimeAxis{AA}}(img::AA) = mean(img)\n@traitfn function meanintensity{AA<:AxisArray; HasTimeAxis{AA}}(img::AA)\n    ax = timeaxis(img)\n    n = length(x)\n    intensity = zeros(eltype(img), n)\n    for ti = 1:n\n        sl = img[ax[ti]]  # the image slice at time ax[ti]\n        intensity[ti] = mean(sl)\n    end\n    intensity\nendand, when appropriate, it will return the mean intensity at each timeslice."
},

{
    "location": "imageaxes.html#Custom-temporal-axes-1",
    "page": "ImageAxes.jl",
    "title": "Custom temporal axes",
    "category": "section",
    "text": "Using SimpleTraits's @traitimpl, you can add Axis{:t} or Axis{:scantime} or any other name to the list of axes that have a temporal dimension:using ImageAxes, SimpleTraits\n@traitimpl TimeAxis{Axis{:t}}Note this declaration affects all arrays throughout your entire session.  Moreover, it should be made before calling any functions on array-types that possess such axes; a convenient place to do this is right after you say using ImageAxes in your top-level script."
},

{
    "location": "imagefiltering.html#",
    "page": "ImageFiltering.jl",
    "title": "ImageFiltering.jl",
    "category": "page",
    "text": ""
},

{
    "location": "imagefiltering.html#ImageFiltering.jl-1",
    "page": "ImageFiltering.jl",
    "title": "ImageFiltering.jl",
    "category": "section",
    "text": "ImageFiltering (a package that is incorporated into Images) supports linear and nonlinear filtering operations on arrays, with an emphasis on the kinds of operations used in image processing. The core function is imfilter, and common kernels (filters) are organized in the Kernel and KernelFactors modules."
},

{
    "location": "imagefiltering.html#Demonstration-1",
    "page": "ImageFiltering.jl",
    "title": "Demonstration",
    "category": "section",
    "text": "Let's start with a simple example of linear filtering:julia> using ImageFiltering, TestImages\n\njulia> img = testimage(\"mandrill\");\n\njulia> imgg = imfilter(img, Kernel.gaussian(3));\n\njulia> imgl = imfilter(img, Kernel.Laplacian());When displayed, these three images look like this:(Image: filterintro)The most commonly used function for filtering is imfilter."
},

{
    "location": "imagefiltering.html#Linear-filtering:-noteworthy-features-1",
    "page": "ImageFiltering.jl",
    "title": "Linear filtering: noteworthy features",
    "category": "section",
    "text": "DocTestSetup = quote\n    using Colors, ImageFiltering, TestImages\n    img = testimage(\"mandrill\")\nend"
},

{
    "location": "imagefiltering.html#Correlation,-not-convolution-1",
    "page": "ImageFiltering.jl",
    "title": "Correlation, not convolution",
    "category": "section",
    "text": "ImageFiltering uses the following formula to calculate the filtered image F from an input image A and kernel K:FI = sum_J AI+J KJConsequently, the resulting image is the correlation, not convolution, of the input and the kernel. If you want the convolution, first call reflect on the kernel."
},

{
    "location": "imagefiltering.html#Kernel-indices-1",
    "page": "ImageFiltering.jl",
    "title": "Kernel indices",
    "category": "section",
    "text": "ImageFiltering exploits a feature introduced into Julia 0.5, the ability to define arrays whose indices span an arbitrary range:julia> Kernel.gaussian(1)\nOffsetArrays.OffsetArray{Float64,2,Array{Float64,2}} with indices -2:2×-2:2:\n 0.00296902  0.0133062  0.0219382  0.0133062  0.00296902\n 0.0133062   0.0596343  0.0983203  0.0596343  0.0133062\n 0.0219382   0.0983203  0.162103   0.0983203  0.0219382\n 0.0133062   0.0596343  0.0983203  0.0596343  0.0133062\n 0.00296902  0.0133062  0.0219382  0.0133062  0.00296902The indices of this array span the range -2:2 along each axis, and the center of the gaussian is at position [0,0].  As a consequence, this filter \"blurs\" but does not \"shift\" the image; were the center instead at, say, [3,3], the filtered image would be shifted by 3 pixels downward and to the right compared to the original.The centered function is a handy utility for converting an ordinary array to one that has coordinates [0,0,...] at its center position:julia> centered([1 0 1; 0 1 0; 1 0 1])\nOffsetArrays.OffsetArray{Int64,2,Array{Int64,2}} with indices -1:1×-1:1:\n 1  0  1\n 0  1  0\n 1  0  1See OffsetArrays for more information."
},

{
    "location": "imagefiltering.html#Factored-kernels-1",
    "page": "ImageFiltering.jl",
    "title": "Factored kernels",
    "category": "section",
    "text": "A key feature of Gaussian kernels–-along with many other commonly-used kernels–-is that they are separable, meaning that K[j_1,j_2,...] can be written as K_1j_1 K_2j_2 cdots. As a consequence, the correlationFi_1i_2 = sum_j_1j_2 Ai_1+j_1i_2+j_2 Kj_1j_2can be writtenFi_1i_2 = sum_j_2 left(sum_j_1 Ai_1+j_1i_2+j_2 K_1j_1right) K_2j_2If the kernel is of size m×n, then the upper version line requires mn operations for each point of filtered, whereas the lower version requires m+n operations. Especially when m and n are larger, this can result in a substantial savings.To enable efficient computation for separable kernels, imfilter accepts a tuple of kernels, filtering the image by each sequentially. You can either supply m×1 and 1×n filters directly, or (somewhat more efficiently) call kernelfactors on a tuple-of-vectors:julia> kern1 = centered([1/3, 1/3, 1/3])\nOffsetArrays.OffsetArray{Float64,1,Array{Float64,1}} with indices -1:1:\n 0.333333\n 0.333333\n 0.333333\n\njulia> kernf = kernelfactors((kern1, kern1))\n(ImageFiltering.KernelFactors.ReshapedOneD{Float64,2,0,OffsetArrays.OffsetArray{Float64,1,Array{Float64,1}}}([0.333333,0.333333,0.333333]),ImageFiltering.KernelFactors.ReshapedOneD{Float64,2,1,OffsetArrays.OffsetArray{Float64,1,Array{Float64,1}}}([0.333333,0.333333,0.333333]))\n\njulia> kernp = broadcast(*, kernf...)\nOffsetArrays.OffsetArray{Float64,2,Array{Float64,2}} with indices -1:1×-1:1:\n 0.111111  0.111111  0.111111\n 0.111111  0.111111  0.111111\n 0.111111  0.111111  0.111111\n\njulia> imfilter(img, kernf) ≈ imfilter(img, kernp)\ntrueIf the kernel is a two dimensional array, imfilter will attempt to factor it; if successful, it will use the separable algorithm. You can prevent this automatic factorization by passing the kernel as a tuple, e.g., as (kernp,)."
},

{
    "location": "imagefiltering.html#Popular-kernels-in-Kernel-and-KernelFactors-modules-1",
    "page": "ImageFiltering.jl",
    "title": "Popular kernels in Kernel and KernelFactors modules",
    "category": "section",
    "text": "The two modules Kernel and KernelFactors implement popular kernels in \"dense\" and \"factored\" forms, respectively. Type ?Kernel or ?KernelFactors at the REPL to see which kernels are supported.A common task in image processing and computer vision is computing image gradients (derivatives), for which there is the dedicated function imgradients."
},

{
    "location": "imagefiltering.html#Automatic-choice-of-FIR-or-FFT-1",
    "page": "ImageFiltering.jl",
    "title": "Automatic choice of FIR or FFT",
    "category": "section",
    "text": "For linear filtering with a finite-impulse response filtering, one can either choose a direct algorithm or one based on the fast Fourier transform (FFT).  By default, this choice is made based on kernel size. You can manually specify the algorithm using Algorithm.FFT() or Algorithm.FIR()."
},

{
    "location": "imagefiltering.html#Multithreading-1",
    "page": "ImageFiltering.jl",
    "title": "Multithreading",
    "category": "section",
    "text": "If you launch Julia with JULIA_NUM_THREADS=n (where n > 1), then FIR filtering will by default use multiple threads.  You can control the algorithm by specifying a resource as defined by ComputationalResources. For example, imfilter(CPU1(Algorithm.FIR()), img, ...) would force the computation to be single-threaded."
},

{
    "location": "imagefiltering.html#Arbitrary-operations-over-sliding-windows-1",
    "page": "ImageFiltering.jl",
    "title": "Arbitrary operations over sliding windows",
    "category": "section",
    "text": "This package also exports mapwindow, which allows you to pass an arbitrary function to operate on the values within a sliding window.mapwindow has optimized implementations for some functions (currently, extrema)."
},

{
    "location": "imagemetadata.html#",
    "page": "ImageMetadata.jl",
    "title": "ImageMetadata.jl",
    "category": "page",
    "text": ""
},

{
    "location": "imagemetadata.html#ImageMetadata.jl-1",
    "page": "ImageMetadata.jl",
    "title": "ImageMetadata.jl",
    "category": "section",
    "text": "ImageMetadata (a package incorporated into Images) allows you to add metadata to images: for example, the date and time at which it was collected, identifiers for the location or subject, etc. This metadata is stored as a dictionary, and the ImageMeta type combines properties of arrays and Dict."
},

{
    "location": "imagemetadata.html#Introduction-1",
    "page": "ImageMetadata.jl",
    "title": "Introduction",
    "category": "section",
    "text": "You typically create an ImageMeta using keyword arguments:julia> using Colors, ImageMetadata\n\njulia> img = ImageMeta(fill(RGB(1,0,0), 3, 2), date=Date(2016, 7, 31), time=\"high noon\")\nRGB ImageMeta with:\n  data: 3×2 Array{ColorTypes.RGB{FixedPointNumbers.Normed{UInt8,8}},2}\n  properties:\n    time: high noon\n    date: 2016-07-31DocTestSetup = quote\n    using Colors, ImageMetadata\n    img = ImageMeta(fill(RGB(1,0,0), 3, 2), date=Date(2016, 7, 31), time=\"high noon\")\nendYou can then index elements of img like this:julia> img[1,2]\nRGB{N0f8}(1.0,0.0,0.0)and access and set properties like this:julia> img[\"time\"]\n\"high noon\"\n\njulia> img[\"time\"] = \"evening\"\n\"evening\"\n\njulia> img\nRGB ImageMeta with:\n  data: 3×2 Array{ColorTypes.RGB{FixedPointNumbers.Normed{UInt8,8}},2}\n  properties:\n    time: evening\n    date: 2016-07-31You can extract the data matrix with data(img):julia> data(img)\n3×2 Array{ColorTypes.RGB{FixedPointNumbers.Normed{UInt8,8}},2}:\n RGB{N0f8}(1.0,0.0,0.0)  RGB{N0f8}(1.0,0.0,0.0)\n RGB{N0f8}(1.0,0.0,0.0)  RGB{N0f8}(1.0,0.0,0.0)\n RGB{N0f8}(1.0,0.0,0.0)  RGB{N0f8}(1.0,0.0,0.0)and the properties dictionary with properties:julia> properties(img)\nDict{String,Any} with 2 entries:\n  \"time\" => \"high noon\"\n  \"date\" => 2016-07-31Properties are not accessed or modified by most of Images' algorithms–-the traits that most affect processing are encoded through Julia's type system.  However, functions that receive an ImageMeta should return an ImageMeta when appropriate. Naturally, in your own code it's fine to use properties to your advantage for custom tasks."
},

{
    "location": "imagemetadata.html#getindexim/viewim-1",
    "page": "ImageMetadata.jl",
    "title": "getindexim/viewim",
    "category": "section",
    "text": "As with the rest of julia, img[i,j,...] will return just the values in an ImageMeta; the properties dictionary is \"left behind.\" You can ensure that the return is also an ImageMeta using getindexim instead of getindex (img[i,j] gets converted into getindex(img, i, j), hence the name):julia> c = getindexim(img, 1:2, 1:2)\nRGB ImageMeta with:\n  data: 2×2 Array{ColorTypes.RGB{FixedPointNumbers.Normed{UInt8,8}},2}\n  properties:\n    time: high noon\n    date: 2016-07-31This copies both the data (just the relevant portions) and the properties dictionary. In contrast,julia> v = viewim(img, 1:2, 1:2)\nRGB ImageMeta with:\n  data: 2×2 SubArray{ColorTypes.RGB{FixedPointNumbers.Normed{UInt8,8}},2,Array{ColorTypes.RGB{FixedPointNumbers.Normed{UInt8,8}},2},Tuple{UnitRange{Int64},UnitRange{Int64}},false}\n  properties:\n    time: high noon\n    date: 2016-07-31shares both the data and the properties with the original image img. Modifying values or properties in c has no impact on img, but modifying values or properties in v does."
},

{
    "location": "imagemetadata.html#copyproperties/shareproperties-1",
    "page": "ImageMetadata.jl",
    "title": "copyproperties/shareproperties",
    "category": "section",
    "text": "Two convenient ways to construct a new image with the \"same\" properties are copyproperties (makes a copy of the properties dictionary) and shareproperties (shares the properties dictionary).Incidentally, similar makes a copy of the properties dictionary."
},

{
    "location": "imagemetadata.html#spatialproperties-1",
    "page": "ImageMetadata.jl",
    "title": "spatialproperties",
    "category": "section",
    "text": "Occasionally you may have a property that is linked to the spatial axes of the image. In such cases, one source for potential confusion is permutedims, which swaps the order of the dimensions in the array: if the order is not also swapped in the appropriate properties, chaos could result.You can declare that certain properties are coupled to spatial axes using \"spatialproperties\":julia> using ImageMetadata\n\njulia> A = reshape(1:15, 3, 5)\n3×5 Base.ReshapedArray{Int64,2,UnitRange{Int64},Tuple{}}:\n 1  4  7  10  13\n 2  5  8  11  14\n 3  6  9  12  15\n\njulia> img = ImageMeta(A, spatialproperties=Set([\"maxsum\"]), maxsum=[maximum(sum(A,1)), maximum(sum(A,2))])\nInt64 ImageMeta with:\n  data: 3×5 Base.ReshapedArray{Int64,2,UnitRange{Int64},Tuple{}}\n  properties:\n    maxsum: [42,45]\n    spatialproperties: Set(String[\"maxsum\"])\n\njulia> imgp = permutedims(img, (2,1))\nInt64 ImageMeta with:\n  data: 5×3 Array{Int64,2}\n  properties:\n    maxsum: [45,42]\n    spatialproperties: Set(String[\"maxsum\"])\n\njulia> maximum(sum(imgp,1))\n45It's not possible to anticipate all the possible transformations that might be necessary, but at least simple swaps are handled automatically."
},

{
    "location": "imagesegmentation.html#",
    "page": "ImageSegmentation.jl",
    "title": "ImageSegmentation.jl",
    "category": "page",
    "text": ""
},

{
    "location": "imagesegmentation.html#ImageSegmentation.jl-1",
    "page": "ImageSegmentation.jl",
    "title": "ImageSegmentation.jl",
    "category": "section",
    "text": ""
},

{
    "location": "imagesegmentation.html#Introduction-1",
    "page": "ImageSegmentation.jl",
    "title": "Introduction",
    "category": "section",
    "text": "Image Segmentation is the process of partitioning the image into regions that have similar attributes. Image segmentation has various applications e.g, medical image segmentation, image compression and is used as a preprocessing step in higher level vision tasks like object detection and optical flow. This package is a collection of image segmentation algorithms written in Julia."
},

{
    "location": "imagesegmentation.html#Installation-1",
    "page": "ImageSegmentation.jl",
    "title": "Installation",
    "category": "section",
    "text": "Pkg.add(\"ImageSegmentation\")"
},

{
    "location": "imagesegmentation.html#Example-1",
    "page": "ImageSegmentation.jl",
    "title": "Example",
    "category": "section",
    "text": "Image segmentation is not a mathematically well-defined problem: for example, the only lossless representation of the input image would be to say that each pixel is its own segment. Yet this does not correspond to our own intuitive notion that some pixels are naturally grouped together. As a consequence, many algorithms require parameters, often some kind of threshold expressing your willingness to tolerate a certain amount of variation among the pixels within a single segment.Let's see an example on how to use the segmentation algorithms in this package. We will try to separate the horse, the ground and the sky in the image below. We will explore two algorithms - seeded region growing and felzenszwalb. Seeded region growing requires us to know the number of segments and some points on each segment beforehand whereas felzenszwalb uses a more abstract parameter controlling degree of within-segment similarity.(Image: Original)sourceThe documentation for seeded_region_growing says that it needs two arguments - the image to be segmented and a set of seed points for each region. The seed points have to be stored as a vector of (position, label) tuples, where position is a CartesianIndex and label is an integer. We will start by opening the image using ImageView and reading the coordinates of the seed points.using Images, ImageView\n\nimg = load(\"horse.jpg\")\nimshow(img)Hover over the different objects you'd like to segment, and read out the coordinates of one or more points inside each object. We will store the seed points as a vector of (seed position, label) tuples and use seeded_region_growing with the recorded seed points.using ImageSegmentation\nseeds = [(CartesianIndex(126,81),1), (CartesianIndex(93,255),2), (CartesianIndex(213,97),3)]\nsegments = seeded_region_growing(img, seeds)All the segmentation algorithms (except Fuzzy C-means) return a struct SegmentedImage that stores the segmentation result. SegmentedImage contains a list of applied labels, an array containing the assigned label for each pixel, and mean color and number of pixels in each segment. This section explains how to access information about the segments.length(segment_labels(segments))   # number of segments = 3\n\nsegment_mean(segments)\n#first segment's color (horse) = RGB(0.0647831,0.0588508,0.074473) = black\n#second segment's color (sky) = RGB(0.793598,0.839543,0.932374) = light blue\n#third segment's color (grass) = RGB(0.329876,0.357805,0.23745) = green\n\n# for visualizing the segmentation, create an image by replacing each each label in label_map(segments) with it's mean color\nimshow(map(i->segment_mean(segments,i), labels_map(segments)))(Image: Original)You can see that the algorithm did a fairly good job of segmenting the three objects. The only obvious error is the fact that elements of the sky that were \"framed\" by the horse ended up being grouped with the ground. This is because seeded_region_growing always returns connected regions, and there is no path connecting those portions of sky to the larger image. If we add some additional seed points in those regions, and give them the same label 2 that we used for the rest of the sky, we will get a result that is more or less perfect.seeds = [(CartesianIndex(126,81), 1), (CartesianIndex(93,255), 2), (CartesianIndex(171,103), 2),\n         (CartesianIndex(172,142), 2), (CartesianIndex(182,72), 2), (CartesianIndex(213,97), 3)]\nsegments = seeded_region_growing(img, seeds)\nimshow(map(i->segment_mean(segments,i), labels_map(segments)))(Image: Original)Now let's segment this image using felzenszwalb algorithm. felzenswalb only needs a single parameter k which controls the size of segments. Larger k will result in bigger segments. Using k=5 to k=500 generally gives good results.using Images, ImageSegmentation, ImageView\n\nimg = load(\"horse.jpg\")\nsegments = felzenszwalb(img, 100)\nimshow(map(i->segment_mean(segments,i), labels_map(segments)))\n\nsegments = felzenszwalb(img, 10)  #smaller segments but noisy segmentation\nimshow(map(i->segment_mean(segments,i), labels_map(segments)))k = 100 k = 10\n(Image: Original) (Image: Original)We only got two segments with k = 100. Setting k = 10 resulted in smaller but rather noisy segments. felzenzwalb also takes an optional argument min_size - it removes all segments smaller than min_size pixels. (Most methods don't remove small segments in their core algorithm. We can use the prune_segments method to postprocess the segmentation result and remove small segments.)segments = felzenszwalb(img, 10, 100)  # removes segments with fewer than 100 pixels\nimshow(map(i->segment_mean(segments,i), labels_map(segments)))(Image: Original)"
},

{
    "location": "imagesegmentation.html#Result-1",
    "page": "ImageSegmentation.jl",
    "title": "Result",
    "category": "section",
    "text": "All segmentation algorithms (except Fuzzy C-Means) return a struct SegmentedImage as its output. SegmentedImage contains all the necessary information about the segments. The following functions can be used to get the information about the segments:labels_map : It returns an array containing the labels assigned to each pixel\nsegment_labels : It returns a list of all the assigned labels\nsegment_mean : It returns the mean intensity of the supplied label.\nsegment_pixel_count : It returns the count of the pixels that are assigned the supplied label."
},

{
    "location": "imagesegmentation.html#Demo-1",
    "page": "ImageSegmentation.jl",
    "title": "Demo",
    "category": "section",
    "text": "julia> img = fill(1, 4, 4);\n\njulia> img[1:2,1:2] = 2;\n\njulia> img\n4×4 Array{Int64,2}:\n 2  2  1  1\n 2  2  1  1\n 1  1  1  1\n 1  1  1  1\n\njulia> seg = fast_scanning(img, 0.5);\n\njulia> labels_map(seg) # returns the assigned labels map\n4×4 Array{Int64,2}:\n 1  1  3  3\n 1  1  3  3\n 3  3  3  3\n 3  3  3  3\n\njulia> segment_labels(seg) # returns a list of all assigned labels\n2-element Array{Int64,1}:\n 1\n 3\n\njulia> segment_mean(seg, 1) # returns the mean intensity of label 1\n2\n\njulia> segment_pixel_count(seg, 1) # returns the pixel count of label 1\n4"
},

{
    "location": "imagesegmentation.html#Algorithms-1",
    "page": "ImageSegmentation.jl",
    "title": "Algorithms",
    "category": "section",
    "text": ""
},

{
    "location": "imagesegmentation.html#Seeded-Region-Growing-1",
    "page": "ImageSegmentation.jl",
    "title": "Seeded Region Growing",
    "category": "section",
    "text": "Seeded region growing segments an image with respect to some user-defined seeds. Each seed is a (position, label) tuple, where position is a CartesianIndex and label is a positive integer. Each label corresponds to a unique partition of the image. The algorithm tries to assign these labels to each of the remaining points. If more than one point has the same label then they will be contribute to the same segment."
},

{
    "location": "imagesegmentation.html#Demo-2",
    "page": "ImageSegmentation.jl",
    "title": "Demo",
    "category": "section",
    "text": "julia> using ImageSegmentation, Images;\njulia> img = load(\"worm.jpg\");\njulia> seeds = [(CartesianIndex(104, 48), 1), (CartesianIndex( 49, 40), 1),\n                (CartesianIndex( 72,131), 1), (CartesianIndex(109,217), 1),\n                (CartesianIndex( 28, 87), 2), (CartesianIndex( 64,201), 2),\n                (CartesianIndex(104, 72), 2), (CartesianIndex( 86,138), 2)];\njulia> seg = seeded_region_growing(img, seeds);Original (source):(Image: Original)Segmented Image with labels replaced by their intensity means:(Image: SegmentedImage)"
},

{
    "location": "imagesegmentation.html#Unseeded-Region-Growing-1",
    "page": "ImageSegmentation.jl",
    "title": "Unseeded Region Growing",
    "category": "section",
    "text": "This algorithm is similar to Seeded Region Growing but does not require any prior information about the seed points. The segmentation process initializes with region A_1 containing a single pixel of the image. Let an intermediate state of the algorithm consist of a set of identified regions A_1 A_2  A_n. Let T be the set of all unallocated pixels which borders at least one of these regions. The growing process involves selecting a point z in T and region A_j where j in   1n   such thatdelta (  z A_j )  = min_x in T k in   1n     delta (  x A_k )  where delta (  x A_i )  =  img (  x )  - mean_y in A_i   img (  y )    If delta (  z A_j )  is less than threshold then the pixel z is added to A_j. Otherwise we choose the most similar region alpha such thatalpha = argmin_A_k  delta (  z A_k)  If delta (  z alpha )  is less than threshold then the pixel z is added to alpha. If neither of the two conditions is satisfied, then the pixel is assigned a new region A_n+1. After assignment of z, we update the statistic of the assigned region. The algorithm halts when all the pixels have been assigned to some region.unseeded_region_growing requires the image img and threshold as its parameters."
},

{
    "location": "imagesegmentation.html#Demo-3",
    "page": "ImageSegmentation.jl",
    "title": "Demo",
    "category": "section",
    "text": "julia> using ImageSegmentation, Images;\njulia> img = load(\"tree.jpg\");\njulia> seg = unseeded_region_growing(img, 0.05); # here 0.05 is the thresholdThreshold Output Compression percentage\nOriginal (source) (Image: tree) 0 %\n0.05 (Image: tree_seg1) 60.63%\n0.1 (Image: tree_seg2) 71.27%\n0.2 (Image: tree_seg3) 79.96%"
},

{
    "location": "imagesegmentation.html#Felzenswalb's-Region-Merging-Algorithm-1",
    "page": "ImageSegmentation.jl",
    "title": "Felzenswalb's Region Merging Algorithm",
    "category": "section",
    "text": "This algorithm operates on a Region Adjacency Graph (RAG). Each pixel/region is a node in the graph and adjacent pixels/regions have edges between them with weight measuring the dissimilarity between pixels/regions. The algorithm repeatedly merges similar regions till we get the final segmentation. It efficiently computes oversegmented “superpixels” in an image. The function can be directly called with an image (the implementation internally creates a RAG of the image first and then proceeds)."
},

{
    "location": "imagesegmentation.html#Demo-4",
    "page": "ImageSegmentation.jl",
    "title": "Demo",
    "category": "section",
    "text": "using Images, ImageSegmentation, TestImages;\n\nimg = Gray.(testimage(\"house\"));\nsegments = felzenszwalb(img, 300, 100); # k=300 (the merging threshold), min_size = 100 (smallest number of pixels/region)\n\n# visualize segmentation by creating an image with each label replaced by a random color\nfunction get_random_color(seed)\n    srand(seed)\n    rand(RGB{N0f8})\nend\nimshow(map(i->get_random_color(i), labels_map(segments)))(Image: img1) (Image: img2)"
},

{
    "location": "imagesegmentation.html#MeanShift-Segmentation-1",
    "page": "ImageSegmentation.jl",
    "title": "MeanShift Segmentation",
    "category": "section",
    "text": "MeanShift is a clustering technique. Its primary advantages are that it doesn't assume a prior on the shape of the cluster (e.g, gaussian for k-means) and we don't need to know the number of clusters beforehand. The algorithm doesn't scale well with size of image."
},

{
    "location": "imagesegmentation.html#Demo-5",
    "page": "ImageSegmentation.jl",
    "title": "Demo",
    "category": "section",
    "text": "using Images, ImageSegmentation, TestImages;\n\nimg = Gray.(testimage(\"house\"));\nimg = imresize(img, (256, 256))\nsegments = meanshift(img, 16, 8/255); # parameters are smoothing radii: spatial=16, intensity-wise=8/255(Image: img1) (Image: img2)"
},

{
    "location": "imagesegmentation.html#Fast-Scanning-1",
    "page": "ImageSegmentation.jl",
    "title": "Fast Scanning",
    "category": "section",
    "text": "Fast scanning algorithm segments the image by scanning it once and comparing each pixel to its upper and left neighbor. The algorithm starts from the first pixel and assigns it to a new segment A_1. Label count lc is assigned 1. Then it starts a column-wise traversal of the image and for every pixel, it computes the difference measure diff_fn between the pixel and its left neighbor, say delta_l and between the pixel and its top neighbor, say delta_t. Four cases arise:delta_l >= threshold and delta_t < threshold : We can say that the point has similar intensity to that its top neighbor. Hence, we assign the point to the segment that contains its top neighbor.\ndelta_l < threshold and delta_t >= threshold : Similar to case 1, we assign the point to the segment that contains its left neighbor.\ndelta_l >= threshold and delta_t >= threshold : Point is significantly different from its top and left neighbors and is assigned a new label A_lc+1 and lc is incremented.\ndelta_l < threshold and delta_t < threshold : In this case, we merge the top and left semgents together and assign the point under consideration to this merged segment.This algorithm segments the image in just two passes (one for segmenting and other for merging), hence it is very fast and can be used in real time applications.Time Complexity: O(n) where n is the number of pixels"
},

{
    "location": "imagesegmentation.html#Demo-6",
    "page": "ImageSegmentation.jl",
    "title": "Demo",
    "category": "section",
    "text": "julia> using ImageSegmentation, TestImages;\njulia> img = testimage(\"camera\");\njulia> seg = fast_scanning(img, 0.1);  # threshold = 0.1\njulia> seg = prune_segments(seg, i->(segment_pixel_count(seg,i)<50), (i,j)->(-segment_pixel_count(seg,j)))Original:(Image: Original)Segmented Image:(Image: SegmentedImage)"
},

{
    "location": "imagesegmentation.html#Region-Splitting-using-RegionTrees-1",
    "page": "ImageSegmentation.jl",
    "title": "Region Splitting using RegionTrees",
    "category": "section",
    "text": "This algorithm follows the divide and conquer methodology. If the input image is homogeneous then nothing is to be done. In the other case, the image is split into two across every dimension and the smaller parts are segmented recursively. This procedure generates a region tree which can be used to create a segmented image.Time Complexity: O(n*log(n)) where n is the number of pixels"
},

{
    "location": "imagesegmentation.html#Demo-7",
    "page": "ImageSegmentation.jl",
    "title": "Demo",
    "category": "section",
    "text": "julia> using TestImages, ImageSegmentation;\njulia> img = testimage(\"lena_gray\")\njulia> function homogeneous(img)\n           min, max = extrema(img)\n           max - min < 0.2\n       end\njulia> seg = region_splitting(img, homogeneous);Original:(Image: Original)Segmented Image with labels replaced by their intensity means:(Image: SegmentedImage)"
},

{
    "location": "imagesegmentation.html#Fuzzy-C-means-1",
    "page": "ImageSegmentation.jl",
    "title": "Fuzzy C-means",
    "category": "section",
    "text": "Fuzzy C-means clustering is widely used for unsupervised image segmentation. It is an iterative algorithm which tries to minimize the cost function:J = displaystylesum_i=1^N sum_j=1^C delta_ij  x_i - c_j ^2Unlike K-means, it allows pixels to belong to two or more clusters. It is widely used for medical imaging like in the soft segmentation of brain tissue model.Time Complexity: O(n*C^2*iter) where n is the number of pixels, C is number of clusters and iter is the number of iterations."
},

{
    "location": "imagesegmentation.html#Demo-8",
    "page": "ImageSegmentation.jl",
    "title": "Demo",
    "category": "section",
    "text": "julia> using ImageSegmentation, Images;\njulia> img = load(\"flower.jpg\");\njulia> r = fuzzy_cmeans(img, 3, 2);Original (source)(Image: Original)Output with pixel intensity = cluster center intensity * membership of pixel in that classMagenta petals Greenish Leaves White background\n(Image: SegmentedImage1) (Image: SegmentedImage2) (Image: SegmentedImage3)"
},

{
    "location": "imagesegmentation.html#Watershed-1",
    "page": "ImageSegmentation.jl",
    "title": "Watershed",
    "category": "section",
    "text": "The watershed algorithm treats an image as a topographic surface where bright pixels correspond to peaks and dark pixels correspond to valleys. The algorithm starts flooding from valleys (local minima) of this topographic surface and region boundaries are formed when water from different sources merge. If the image is noisy, this approach leads to oversegmetation. To prevent oversegmentation, marker-based watershed is used i.e. the topographic surface is flooded from a predefined set of markers.Let's see an example on how to use watershed to segment touching objects. To use watershed, we need to modify the image such that in the new image flooding the topographic surface from the markers separates each coin. If this modified image is noisy, flooding from local minima may lead to oversegmentation and so we also need a way to find the marker positions. In this example, the inverted distance_transform of the thresholded image (dist image) has the required topographic structure (This page explains why this works). We can threshold the dist image to get the marker positions."
},

{
    "location": "imagesegmentation.html#Demo-9",
    "page": "ImageSegmentation.jl",
    "title": "Demo",
    "category": "section",
    "text": "using Images, ImageSegmentation;\n\nimg = load(download(\"http://docs.opencv.org/3.1.0/water_coins.jpg\"));\nbw = Gray.(img).>0.5;\ndist = 1.-distance_transform(feature_transform(bw));\nmarkers = label_components(dist.<-15);\nsegments = watershed(dist, markers);Original Image Thresholded Image\n(Image: img1) (Image: img1)Inverted Distance Transform Image Markers\n(Image: img1) (Image: img1)Segmented Image\n(Image: img2)"
},

{
    "location": "imagesegmentation.html#Some-helpful-functions-1",
    "page": "ImageSegmentation.jl",
    "title": "Some helpful functions",
    "category": "section",
    "text": ""
},

{
    "location": "imagesegmentation.html#Creating-a-Region-Adjacency-Graph-(RAG)-1",
    "page": "ImageSegmentation.jl",
    "title": "Creating a Region Adjacency Graph (RAG)",
    "category": "section",
    "text": "A region adjacency graph can directly be constructed from a SegmentedImage using the region_adjacency_graph function. Each segment is denoted by a vertex and edges are constructed between adjacent segments. The output is a tuple of SimpleWeightedGraph and a Dict(label=>vertex) with weights assigned according to weight_fn.julia> using ImageSegmentation, Distances, TestImages\njulia> img = testimage(\"camera\");\njulia> seg = felzenszwalb(img, 10, 100);\njulia> weight_fn(i,j) = euclidean(segment_pixel_count(seg,i), segment_pixel_count(seg,j));\njulia> G, vert_map = region_adjacency_graph(seg, weight_fn);\njulia> G\n{70, 139} undirected simple Int64 graph with Float64 weightsHere, the difference in pixel count has been used as the weight of the connecting edges. This difference measure can be useful if one wants to use this region adjacency graph to remove smaller segments by merging them with their neighbouring largest segment. Another useful difference measure is the euclidean distance between the mean intensities of the two segments."
},

{
    "location": "imagesegmentation.html#Creating-a-Region-Tree-1",
    "page": "ImageSegmentation.jl",
    "title": "Creating a Region Tree",
    "category": "section",
    "text": "A region tree can be constructed from an image using region_tree function. If the image is not homogeneous, then it is split into half along each dimension and the function is called recursively for each portion of the image. The output is a RegionTree.julia> using ImageSegmentation\njulia> function homogeneous(img)\n           min, max = extrema(img)\n           max - min < 0.2\n       end\njulia> t = region_tree(img, homogeneous)        # `img` is an image\nCell: RegionTrees.HyperRectangle{2,Float64}([1.0, 1.0], [300.0, 300.0])For more information regarding RegionTrees, see this."
},

{
    "location": "imagesegmentation.html#Pruning-unnecessary-segments-1",
    "page": "ImageSegmentation.jl",
    "title": "Pruning unnecessary segments",
    "category": "section",
    "text": "All the unnecessary segments can be easily removed from a SegmentedImage using prune_segments. It removes a segment by replacing it with the neighbor which has the least value of diff_fn. A list of the segments to be removed can be supplied. Alternately, a function can be supplied that returns true for the labels that must be removed.note: Note\nThe resultant SegmentedImage might have the different labels compared to the original SegmentedImage.For this example and the next one (in Removing a segment), a sample SegmentedImage has been used. It can be generated as:julia> img = fill(1, 4, 4);\njulia> img[3:4,:] = 2;\njulia> img[1:2,3:4] = 3;\njulia> seg = fast_scanning(img, 0.5);\njulia> labels_map(seg)\n4×4 Array{Int64,2}:\n 1  1  3  3\n 1  1  3  3\n 2  2  2  2\n 2  2  2  2julia> seg.image_indexmap\n4×4 Array{Int64,2}:\n 1  1  3  3\n 1  1  3  3\n 2  2  2  2\n 2  2  2  2\njulia> diff_fn(rem_label, neigh_label) = segment_pixel_count(seg,rem_label) - segment_pixel_count(seg,neigh_label);\njulia> new_seg = prune_segments(seg, [3], diff_fn);\njulia> labels_map(new_seg)\n4×4 Array{Int64,2}:\n 1  1  2  2\n 1  1  2  2\n 2  2  2  2\n 2  2  2  2"
},

{
    "location": "imagesegmentation.html#Removing-a-segment-1",
    "page": "ImageSegmentation.jl",
    "title": "Removing a segment",
    "category": "section",
    "text": "If only one segment is to be removed, then rem_segment! can be used. It removes a segment from a SegmentedImage in place, replacing it with the neighbouring segment having least diff_fn value.note: Note\nIf multiple segments need to be removed then prune_segments should be preferred as it is much more time efficient than calling rem_segment! multiple times.julia> seg.image_indexmap\n4×4 Array{Int64,2}:\n 1  1  3  3\n 1  1  3  3\n 2  2  2  2\n 2  2  2  2\njulia> diff_fn(rem_label, neigh_label) = segment_pixel_count(seg,rem_label) - segment_pixel_count(seg,neigh_label);\njulia> rem_segment!(seg, 3, diff_fn);\njulia> labels_map(new_seg)\n4×4 Array{Int64,2}:\n 1  1  2  2\n 1  1  2  2\n 2  2  2  2\n 2  2  2  2"
},

{
    "location": "imagefeatures.html#",
    "page": "ImageFeatures.jl",
    "title": "ImageFeatures.jl",
    "category": "page",
    "text": ""
},

{
    "location": "imagefeatures.html#ImageFeatures.jl-1",
    "page": "ImageFeatures.jl",
    "title": "ImageFeatures.jl",
    "category": "section",
    "text": "The ImageFeatures package allows you to compute compact \"descriptors\" of images or image regions.  These descriptors are in a form that permits comparison against similar descriptors in other images or other portions of the same image. This can be useful in many applications, such as object recognition, localization, or image registration.ImagesFeatures has its own documentation, and you should consult that for a comprehensive overview of the functionality of the package. Here, we'll briefly illustrate one type of feature and its application to image registration, the BRISK descriptor.The BRISK descriptor examines the structure of an image around a keypoint. Given a keypoint, the mean intensity (loosely-speaking) is computed in a set of patches surrounding the point:(Image: BRISK Sampling Pattern)BRISK then re-represents these intensities in a way that is invariant under rotations. This allows you to compare descriptors in two images, one of which might be a rotated version of the other.Let us take a look at a simple example where the BRISK descriptor is used to match two images where one has been translated by (50, 40) pixels and then rotated by an angle of 75 degrees. We will use the lighthouse image from the TestImages package for this example.First, let us create the two images we will match using BRISK.\nusing ImageFeatures, TestImages, Images, ImageDraw, CoordinateTransformations\n\nimg = testimage(\"lighthouse\")\nimg1 = Gray.(img)\nrot = recenter(RotMatrix(5pi/6), [size(img1)...] .÷ 2)  # a rotation around the center\ntform = rot ∘ Translation(-50, -40)\nimg2 = warp(img1, tform, indices(img1))\nnothing # hideTo calculate the descriptors, we first need to get the keypoints. For this tutorial, we will use the FAST corners to generate keypoints (see fastcorners).features_1 = Features(fastcorners(img1, 12, 0.35))\nfeatures_2 = Features(fastcorners(img2, 12, 0.35))\nnothing # hideTo create the BRISK descriptor, we first need to define the parameters by calling the BRISK constructor.brisk_params = BRISK()\nnothing # hideNow pass the image with the keypoints and the parameters to the create_descriptor function.desc_1, ret_features_1 = create_descriptor(img1, features_1, brisk_params)\ndesc_2, ret_features_2 = create_descriptor(img2, features_2, brisk_params)\nnothing # hideThe obtained descriptors can be used to find the matches between the two images using the match_keypoints function.matches = match_keypoints(Keypoints(ret_features_1), Keypoints(ret_features_2), desc_1, desc_2, 0.1)\nnothing # hideWe can use the ImageDraw.jl package to view the results.\ngrid = hcat(img1, img2)\noffset = CartesianIndex(0, size(img1, 2))\nmap(m -> draw!(grid, LineSegment(m[1], m[2] + offset)), matches)\nsave(\"assets/features/brisk_example.jpg\", grid); nothing # hide\n(Image: )You can see that the points have been accurately matched despite the large magnitude of this rotation."
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

{
    "location": "demos/color_separations_svd.html#",
    "page": "Color separations and the SVD",
    "title": "Color separations and the SVD",
    "category": "page",
    "text": ""
},

{
    "location": "demos/color_separations_svd.html#Color-separations-and-the-SVD-1",
    "page": "Color separations and the SVD",
    "title": "Color separations and the SVD",
    "category": "section",
    "text": "This demonstration shows how to work with color channels and build a simple GUI to explore image compression using the Singular Value Decomposition (SVD).using Images, TestImages, Interact\n\nimg = testimage(\"mandrill\")\n\nchannels = float(channelview(img))\n\nfunction rank_approx(M, k)\n    U, S, V = svd(M)\n    M = U[:, 1:k] * Diagonal(S[1:k]) * V[:, 1:k]'\n    M = min.(max.(M, 0.0), 1.)\nend\n\nn = 100\n@manipulate for k1 in 1:n, k2 in 1:n, k3 in 1:n\n    colorview(RGB,\n              rank_approx(channels[1,:,:], k1),\n              rank_approx(channels[2,:,:], k2),\n              rank_approx(channels[3,:,:], k3)\n              )\nendHere's the result in IJulia:(Image: mandrill)You can click on the slider bars to change the number of components used in each color channel."
},

{
    "location": "function_reference.html#",
    "page": "Summary and function reference",
    "title": "Summary and function reference",
    "category": "page",
    "text": ""
},

{
    "location": "function_reference.html#Summary-and-function-reference-1",
    "page": "Summary and function reference",
    "title": "Summary and function reference",
    "category": "section",
    "text": "Below, [] in an argument list means an optional argument."
},

{
    "location": "function_reference.html#Image-loading-and-saving-1",
    "page": "Summary and function reference",
    "title": "Image loading and saving",
    "category": "section",
    "text": "using FileIO\nimg = load(\"myimage.png\")\nsave(\"imagecopy.jpg\", img)Standard test images are available in the TestImages package:using TestImages\nimg = testimage(\"mandrill\")"
},

{
    "location": "function_reference.html#ImageCore.colorview",
    "page": "Summary and function reference",
    "title": "ImageCore.colorview",
    "category": "Function",
    "text": "colorview(C, A)\n\nreturns a view of the numeric array A, interpreting successive elements of A as if they were channels of Colorant C. This is almost identical to ColorView{C}(A), except that if A is a ChannelView, it will simply return the parent of A, or use reinterpret when appropriate. Consequently, the output may not be a ColorView array.\n\nOf relevance for types like RGB and BGR, the elements of A are interpreted in constructor-argument order, not memory order (see reinterpret if you want to use memory order).\n\nExample\n\nA = rand(3, 10, 10)\nimg = colorview(RGB, A)\n\n\n\ncolorview(C, gray1, gray2, ...) -> imgC\n\nCombine numeric/grayscale images gray1, gray2, etc., into the separate color channels of an array imgC with element type C<:Colorant.\n\nAs a convenience, the constant zeroarray fills in an array of matched size with all zeros.\n\nExample\n\nimgC = colorview(RGB, r, zeroarray, b)\n\ncreates an image with r in the red chanel, b in the blue channel, and nothing in the green channel.\n\nSee also: StackedView.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageCore.ColorView",
    "page": "Summary and function reference",
    "title": "ImageCore.ColorView",
    "category": "Type",
    "text": "ColorView{C}(A)\n\ncreates a \"view\" of the numeric array A, interpreting the first dimension of A as if were the channels of a Colorant C. The first dimension must have the proper number of elements for the constructor of C. For example, if A is a 3-by-m-by-n N0f8 array, ColorView{RGB}(A) will create an m-by-n array with element type RGB{N0f8}. Color spaces with a single element (i.e., grayscale) do not \"consume\" the first dimension of A.\n\nOf relevance for types like RGB and BGR, the elements of A are interpreted in constructor-argument order, not memory order (see reinterpret if you want to use memory order).\n\nThe opposite transformation is implemented by ChannelView. See also colorview.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageCore.channelview",
    "page": "Summary and function reference",
    "title": "ImageCore.channelview",
    "category": "Function",
    "text": "channelview(A)\n\nreturns a view of A, splitting out (if necessary) the color channels of A into a new first dimension. This is almost identical to ChannelView(A), except that if A is a ColorView, it will simply return the parent of A, or will use reinterpret when appropriate. Consequently, the output may not be a ChannelView array.\n\nOf relevance for types like RGB and BGR, the channels of the returned array will be in constructor-argument order, not memory order (see reinterpret if you want to use memory order).\n\n\n\n"
},

{
    "location": "function_reference.html#ImageCore.ChannelView",
    "page": "Summary and function reference",
    "title": "ImageCore.ChannelView",
    "category": "Type",
    "text": "ChannelView(A)\n\ncreates a \"view\" of the Colorant array A, splitting out (if necessary) the separate color channels of eltype(A) into a new first dimension. For example, if A is a m-by-n RGB{N0f8} array, ChannelView(A) will return a 3-by-m-by-n N0f8 array. Color spaces with a single element (i.e., grayscale) do not add a new first dimension of A.\n\nOf relevance for types like RGB and BGR, the channels of the returned array will be in constructor-argument order, not memory order (see reinterpret if you want to use memory order).\n\nThe opposite transformation is implemented by ColorView. See also channelview.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageCore.normedview",
    "page": "Summary and function reference",
    "title": "ImageCore.normedview",
    "category": "Function",
    "text": "normedview([T], img::AbstractArray{Unsigned})\n\nreturns a \"view\" of img where the values are interpreted in terms of Normed number types. For example, if img is an Array{UInt8}, the view will act like an Array{N0f8}.  Supply T if the element type of img is UInt16, to specify whether you want a N6f10, N4f12, N2f14, or N0f16 result.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageCore.rawview",
    "page": "Summary and function reference",
    "title": "ImageCore.rawview",
    "category": "Function",
    "text": "rawview(img::AbstractArray{FixedPoint})\n\nreturns a \"view\" of img where the values are interpreted in terms of their raw underlying storage. For example, if img is an Array{N0f8}, the view will act like an Array{UInt8}.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageCore.permuteddimsview",
    "page": "Summary and function reference",
    "title": "ImageCore.permuteddimsview",
    "category": "Function",
    "text": "permuteddimsview(A, perm)\n\nreturns a \"view\" of A with its dimensions permuted as specified by perm. This is like permutedims, except that it produces a view rather than a copy of A; consequently, any manipulations you make to the output will be mirrored in A. Compared to the copy, the view is much faster to create, but generally slower to use.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageCore.StackedView",
    "page": "Summary and function reference",
    "title": "ImageCore.StackedView",
    "category": "Type",
    "text": "StackedView(B, C, ...) -> A\n\nPresent arrays B, C, etc, as if they are separate channels along the first dimension of A. In particular,\n\nB == A[1,:,:...]\nC == A[2,:,:...]\n\nand so on. Combined with colorview, this allows one to combine two or more grayscale images into a single color image.\n\nSee also: colorview.\n\n\n\n"
},

{
    "location": "function_reference.html#PaddedViews.paddedviews",
    "page": "Summary and function reference",
    "title": "PaddedViews.paddedviews",
    "category": "Function",
    "text": "Aspad = paddedviews(fillvalue, A1, A2, ....)\n\nPad the arrays A1, A2, ..., to a common size or set of indices, chosen as the span of indices enclosing all of the input arrays.\n\nExample:\n\njulia> a1 = reshape([1,2], 2, 1)\n2×1 Array{Int64,2}:\n 1\n 2\n\njulia> a2 = [1.0,2.0]'\n1×2 Array{Float64,2}:\n 1.0  2.0\n\njulia> a1p, a2p = paddedviews(0, a1, a2);\n\njulia> a1p\n2×2 PaddedViews.PaddedView{Int64,2,Tuple{Base.OneTo{Int64},Base.OneTo{Int64}},Array{Int64,2}}:\n 1  0\n 2  0\n\njulia> a2p\n2×2 PaddedViews.PaddedView{Float64,2,Tuple{Base.OneTo{Int64},Base.OneTo{Int64}},Array{Float64,2}}:\n 1.0  2.0\n 0.0  0.0\n\n\n\n"
},

{
    "location": "function_reference.html#Image-construction,-conversion,-and-views-1",
    "page": "Summary and function reference",
    "title": "Image construction, conversion, and views",
    "category": "section",
    "text": "Any array can be treated as an Image.  In graphical environments, only arrays with Colorant element types (Gray, RGB, ARGB, etc.) are automatically displayed as images.colorview\nColorView\nchannelview\nChannelView\nnormedview\nrawview\npermuteddimsview\nStackedView\npaddedviewsImages with defined geometry and axis meaning can be constructed using the AxisArrays package:using AxisArrays\nimg = AxisArray(A, (:y, :x, :time), (0.25μm, 0.25μm, 0.125s))  # see Unitful.jl for unitsCustom metadata can be added as follows:img = ImageMeta(A, date=now(), patientID=12345)Any of these operations may be composed together, e.g., if you have an m×n×3 UInt8 array, you can put it in canonical RGB format and add metadata:img = ImageMeta(colorview(RGB, normedview(permuteddimsview(A, (3,1,2)))), sample=\"control\")"
},

{
    "location": "function_reference.html#ImageCore.pixelspacing",
    "page": "Summary and function reference",
    "title": "ImageCore.pixelspacing",
    "category": "Function",
    "text": "pixelspacing(img) -> (sx, sy, ...)\n\nReturn a tuple representing the separation between adjacent pixels along each axis of the image.  Defaults to (1,1,...).  Use ImagesAxes for images with anisotropic spacing or to encode the spacing using physical units.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageCore.spacedirections",
    "page": "Summary and function reference",
    "title": "ImageCore.spacedirections",
    "category": "Function",
    "text": "spacedirections(img) -> (axis1, axis2, ...)\n\nReturn a tuple-of-tuples, each axis[i] representing the displacement vector between adjacent pixels along spatial axis i of the image array, relative to some external coordinate system (\"physical coordinates\").\n\nBy default this is computed from pixelspacing, but you can set this manually using ImagesMeta.\n\n\n\nspacedirections(img)\n\nUsing ImageMetadata, you can set this property manually. For example, you could indicate that a photograph was taken with the camera tilted 30-degree relative to vertical using\n\nimg[\"spacedirections\"] = ((0.866025,-0.5),(0.5,0.866025))\n\nIf not specified, it will be computed from pixelspacing(img), placing the spacing along the \"diagonal\".  If desired, you can set this property in terms of physical units, and each axis can have distinct units.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageCore.sdims",
    "page": "Summary and function reference",
    "title": "ImageCore.sdims",
    "category": "Function",
    "text": "sdims(img)\n\nReturn the number of spatial dimensions in the image. Defaults to the same as ndims, but with ImagesAxes you can specify that some axes correspond to other quantities (e.g., time) and thus not included by sdims.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageCore.coords_spatial",
    "page": "Summary and function reference",
    "title": "ImageCore.coords_spatial",
    "category": "Function",
    "text": "coords_spatial(img)\n\nReturn a tuple listing the spatial dimensions of img.\n\nNote that a better strategy may be to use ImagesAxes and take slices along the time axis.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageCore.size_spatial",
    "page": "Summary and function reference",
    "title": "ImageCore.size_spatial",
    "category": "Function",
    "text": "size_spatial(img)\n\nReturn a tuple listing the sizes of the spatial dimensions of the image. Defaults to the same as size, but using ImagesAxes you can mark some axes as being non-spatial.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageCore.indices_spatial",
    "page": "Summary and function reference",
    "title": "ImageCore.indices_spatial",
    "category": "Function",
    "text": "indices_spatial(img)\n\nReturn a tuple with the indices of the spatial dimensions of the image. Defaults to the same as indices, but using ImagesAxes you can mark some axes as being non-spatial.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageCore.nimages",
    "page": "Summary and function reference",
    "title": "ImageCore.nimages",
    "category": "Function",
    "text": "nimages(img)\n\nReturn the number of time-points in the image array. Defaults to\n\nUse ImagesAxes if you want to use an explicit time dimension.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageCore.assert_timedim_last",
    "page": "Summary and function reference",
    "title": "ImageCore.assert_timedim_last",
    "category": "Function",
    "text": "assert_timedim_last(img)\n\nThrow an error if the image has a time dimension that is not the last dimension.\n\n\n\n"
},

{
    "location": "function_reference.html#Traits-1",
    "page": "Summary and function reference",
    "title": "Traits",
    "category": "section",
    "text": "These functions are the preferred way to access certain types of \"internal\" data about an image. They can sometimes be useful in allowing you to write generic code.pixelspacing\nspacedirections\nsdims\ncoords_spatial\nsize_spatial\nindices_spatial\nnimages\nassert_timedim_last"
},

{
    "location": "function_reference.html#ImageCore.clamp01",
    "page": "Summary and function reference",
    "title": "ImageCore.clamp01",
    "category": "Function",
    "text": "clamp01(x) -> y\n\nProduce a value y that lies between 0 and 1, and equal to x when x is already in this range. Equivalent to clamp(x, 0, 1) for numeric values. For colors, this function is applied to each color channel separately.\n\nSee also: clamp01nan.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageCore.clamp01nan",
    "page": "Summary and function reference",
    "title": "ImageCore.clamp01nan",
    "category": "Function",
    "text": "clamp01nan(x) -> y\n\nSimilar to clamp01, except that any NaN values are changed to 0.\n\nSee also: clamp01.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageCore.scaleminmax",
    "page": "Summary and function reference",
    "title": "ImageCore.scaleminmax",
    "category": "Function",
    "text": "scaleminmax(min, max) -> f\nscaleminmax(T, min, max) -> f\n\nReturn a function f which maps values less than or equal to min to 0, values greater than or equal to max to 1, and uses a linear scale in between. min and max should be real values.\n\nOptionally specify the return type T. If T is a colorant (e.g., RGB), then scaling is applied to each color channel.\n\nExamples\n\nExample 1\n\njulia> f = scaleminmax(-10, 10)\n(::#9) (generic function with 1 method)\n\njulia> f(10)\n1.0\n\njulia> f(-10)\n0.0\n\njulia> f(5)\n0.75\n\nExample 2\n\njulia> c = RGB(255.0,128.0,0.0)\nRGB{Float64}(255.0,128.0,0.0)\n\njulia> f = scaleminmax(RGB, 0, 255)\n(::#13) (generic function with 1 method)\n\njulia> f(c)\nRGB{Float64}(1.0,0.5019607843137255,0.0)\n\nSee also: takemap.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageCore.scalesigned",
    "page": "Summary and function reference",
    "title": "ImageCore.scalesigned",
    "category": "Function",
    "text": "scalesigned(maxabs) -> f\n\nReturn a function f which scales values in the range [-maxabs, maxabs] (clamping values that lie outside this range) to the range [-1, 1].\n\nSee also: colorsigned.\n\n\n\nscalesigned(min, center, max) -> f\n\nReturn a function f which scales values in the range [min, center] to [-1,0] and [center,max] to [0,1]. Values smaller than min/max get clamped to min/max, respectively.\n\nSee also: colorsigned.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageCore.colorsigned",
    "page": "Summary and function reference",
    "title": "ImageCore.colorsigned",
    "category": "Function",
    "text": "colorsigned()\ncolorsigned(colorneg, colorpos) -> f\ncolorsigned(colorneg, colorcenter, colorpos) -> f\n\nDefine a function that maps negative values (in the range [-1,0]) to the linear colormap between colorneg and colorcenter, and positive values (in the range [0,1]) to the linear colormap between colorcenter and colorpos.\n\nThe default colors are:\n\ncolorcenter: white\ncolorneg: green1\ncolorpos: magenta\n\nSee also: scalesigned.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageCore.takemap",
    "page": "Summary and function reference",
    "title": "ImageCore.takemap",
    "category": "Function",
    "text": "takemap(f, A) -> fnew\ntakemap(f, T, A) -> fnew\n\nGiven a value-mapping function f and an array A, return a \"concrete\" mapping function fnew. When applied to elements of A, fnew should return valid values for storage or display, for example in the range from 0 to 1 (for grayscale) or valid colorants. fnew may be adapted to the actual values present in A, and may not produce valid values for any inputs not in A.\n\nOptionally one can specify the output type T that fnew should produce.\n\nExample:\n\njulia> A = [0, 1, 1000];\n\njulia> f = takemap(scaleminmax, A)\n(::#7) (generic function with 1 method)\n\njulia> f.(A)\n3-element Array{Float64,1}:\n 0.0\n 0.001\n 1.0\n\n\n\n"
},

{
    "location": "function_reference.html#Element-transformation-and-intensity-scaling-1",
    "page": "Summary and function reference",
    "title": "Element transformation and intensity scaling",
    "category": "section",
    "text": "clamp01\nclamp01nan\nscaleminmax\nscalesigned\ncolorsigned\ntakemap"
},

{
    "location": "function_reference.html#ImageCore.float32",
    "page": "Summary and function reference",
    "title": "ImageCore.float32",
    "category": "Function",
    "text": "float32.(img)\n\nconverts the raw storage type of img to Float32, without changing the color space.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageCore.float64",
    "page": "Summary and function reference",
    "title": "ImageCore.float64",
    "category": "Function",
    "text": "float64.(img)\n\nconverts the raw storage type of img to Float64, without changing the color space.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageCore.n0f8",
    "page": "Summary and function reference",
    "title": "ImageCore.n0f8",
    "category": "Function",
    "text": "n0f8.(img)\n\nconverts the raw storage type of img to N0f8, without changing the color space.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageCore.n6f10",
    "page": "Summary and function reference",
    "title": "ImageCore.n6f10",
    "category": "Function",
    "text": "n6f10.(img)\n\nconverts the raw storage type of img to N6f10, without changing the color space.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageCore.n4f12",
    "page": "Summary and function reference",
    "title": "ImageCore.n4f12",
    "category": "Function",
    "text": "n4f12.(img)\n\nconverts the raw storage type of img to N4f12, without changing the color space.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageCore.n2f14",
    "page": "Summary and function reference",
    "title": "ImageCore.n2f14",
    "category": "Function",
    "text": "n2f14.(img)\n\nconverts the raw storage type of img to N2f14, without changing the color space.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageCore.n0f16",
    "page": "Summary and function reference",
    "title": "ImageCore.n0f16",
    "category": "Function",
    "text": "n0f16.(img)\n\nconverts the raw storage type of img to N0f16, without changing the color space.\n\n\n\n"
},

{
    "location": "function_reference.html#Storage-type-transformation-1",
    "page": "Summary and function reference",
    "title": "Storage-type transformation",
    "category": "section",
    "text": "float32\nfloat64\nn0f8\nn6f10\nn4f12\nn2f14\nn0f16"
},

{
    "location": "function_reference.html#Color-conversion-1",
    "page": "Summary and function reference",
    "title": "Color conversion",
    "category": "section",
    "text": "imgg = Gray.(img)calculates a grayscale representation of a color image using the Rec 601 luma.imghsv = HSV.(img)converts to an HSV representation of color information."
},

{
    "location": "function_reference.html#Image-algorithms-1",
    "page": "Summary and function reference",
    "title": "Image algorithms",
    "category": "section",
    "text": ""
},

{
    "location": "function_reference.html#ImageFiltering.imfilter",
    "page": "Summary and function reference",
    "title": "ImageFiltering.imfilter",
    "category": "Function",
    "text": "imfilter([T], img, kernel, [border=\"replicate\"], [alg]) --> imgfilt\nimfilter([r], img, kernel, [border=\"replicate\"], [alg]) --> imgfilt\nimfilter(r, T, img, kernel, [border=\"replicate\"], [alg]) --> imgfilt\n\nFilter an array img with kernel kernel by computing their correlation.\n\nkernel[0,0,..] corresponds to the origin (zero displacement) of the kernel; you can use centered to place the origin at the array center, or use the OffsetArrays package to set kernel's indices manually. For example, to filter with a random centered 3x3 kernel, you could use either of the following:\n\nkernel = centered(rand(3,3))\nkernel = OffsetArray(rand(3,3), -1:1, -1:1)\n\nkernel can be specified as an array or as a \"factored kernel,\" a tuple (filt1, filt2, ...) of filters to apply along each axis of the image. In cases where you know your kernel is separable, this format can speed processing.  Each of these should have the same dimensionality as the image itself, and be shaped in a manner that indicates the filtering axis, e.g., a 3x1 filter for filtering the first dimension and a 1x3 filter for filtering the second dimension. In two dimensions, any kernel passed as a single matrix is checked for separability; if you want to eliminate that check, pass the kernel as a single-element tuple, (kernel,).\n\nOptionally specify the border, as one of Fill(value), \"replicate\", \"circular\", \"symmetric\", \"reflect\", NA(), or Inner(). The default is \"replicate\". These choices specify the boundary conditions, and therefore affect the result at the edges of the image. See padarray for more information.\n\nalg allows you to choose the particular algorithm: FIR() (finite impulse response, aka traditional digital filtering) or FFT() (Fourier-based filtering). If no choice is specified, one will be chosen based on the size of the image and kernel in a way that strives to deliver good performance. Alternatively you can use a custom filter type, like KernelFactors.IIRGaussian.\n\nOptionally, you can control the element type of the output image by passing in a type T as the first argument.\n\nYou can also dispatch to different implementations by passing in a resource r as defined by the ComputationalResources package.  For example,\n\nimfilter(ArrayFire(), img, kernel)\n\nwould request that the computation be performed on the GPU using the ArrayFire libraries.\n\nSee also: imfilter!, centered, padarray, Pad, Fill, Inner, KernelFactors.IIRGaussian.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageFiltering.imfilter!",
    "page": "Summary and function reference",
    "title": "ImageFiltering.imfilter!",
    "category": "Function",
    "text": "imfilter!(imgfilt, img, kernel, [border=\"replicate\"], [alg])\nimfilter!(r, imgfilt, img, kernel, border, [inds])\nimfilter!(r, imgfilt, img, kernel, border::NoPad, [inds=indices(imgfilt)])\n\nFilter an array img with kernel kernel by computing their correlation, storing the result in imgfilt.\n\nThe indices of imgfilt determine the region over which the filtered image is computed–-you can use this fact to select just a specific region of interest, although be aware that the input img might still get padded.  Alteratively, explicitly provide the indices inds of imgfilt that you want to calculate, and use NoPad boundary conditions. In such cases, you are responsible for supplying appropriate padding: img must be indexable for all of the locations needed for calculating the output. This syntax is best-supported for FIR filtering; in particular, that that IIR filtering can lead to results that are inconsistent with respect to filtering the entire array.\n\nSee also: imfilter.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageFiltering.imgradients",
    "page": "Summary and function reference",
    "title": "ImageFiltering.imgradients",
    "category": "Function",
    "text": "imgradients(img, kernelfun=KernelFactors.ando3, border=\"replicate\") -> gimg1, gimg2, ...\n\nEstimate the gradient of img at all points of the image, using a kernel specified by kernelfun. The gradient is returned as a tuple-of-arrays, one for each dimension of the input; gimg1 corresponds to the derivative with respect to the first dimension, gimg2 to the second, and so on. At the image edges, border is used to specify the boundary conditions.\n\nkernelfun may be one of the filters defined in the KernelFactors module, or more generally any function which satisfies the following interface:\n\nkernelfun(extended::NTuple{N,Bool}, d) -> kern_d\n\nkern_d is the kernel for producing the derivative with respect to the dth dimension of an N-dimensional array. extended[i] is true if the image is of size > 1 along dimension i. kern_d may be provided as a dense or factored kernel, with factored representations recommended when the kernel is separable.\n\n\n\nimgradients(img, points, [kernelfunc], [border]) -> G\n\nPerforms edge detection filtering in the N-dimensional array img. Gradients are computed at specified points (or indexes) in the array.\n\nAll kernel functions are specified as KernelFactors.func. For 2d images, the choices for func include sobel, prewitt, ando3, ando4, and ando5. For other dimensionalities, the ando4 and ando5 kernels are not available.\n\nBorder options:\"replicate\", \"circular\", \"reflect\", \"symmetric\".\n\nReturns a 2D array G with the gradients as rows. The number of rows is the number of points at which the gradient was computed and the number of columns is the dimensionality of the array.\n\n\n\n"
},

{
    "location": "function_reference.html#Linear-filtering-1",
    "page": "Summary and function reference",
    "title": "Linear filtering",
    "category": "section",
    "text": "imfilter\nimfilter!\nimgradients"
},

{
    "location": "function_reference.html#ImageFiltering.Kernel.sobel",
    "page": "Summary and function reference",
    "title": "ImageFiltering.Kernel.sobel",
    "category": "Function",
    "text": "diff1, diff2 = sobel()\n\nReturn kernels for two-dimensional gradient compution using the Sobel operator. diff1 computes the gradient along the first (y) dimension, and diff2 computes the gradient along the second (x) dimension.\n\nSee also: KernelFactors.sobel, Kernel.prewitt, Kernel.ando3.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageFiltering.Kernel.prewitt",
    "page": "Summary and function reference",
    "title": "ImageFiltering.Kernel.prewitt",
    "category": "Function",
    "text": "diff1, diff2 = prewitt()\n\nReturn kernels for two-dimensional gradient compution using the Prewitt operator.  diff1 computes the gradient along the first (y) dimension, and diff2 computes the gradient along the second (x) dimension.\n\nSee also: KernelFactors.prewitt, Kernel.sobel, Kernel.ando3.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageFiltering.Kernel.ando3",
    "page": "Summary and function reference",
    "title": "ImageFiltering.Kernel.ando3",
    "category": "Function",
    "text": "diff1, diff2 = ando3()\n\nReturn 3x3 kernels for two-dimensional gradient compution using the optimal \"Ando\" filters.  diff1 computes the gradient along the y-axis (first dimension), and diff2 computes the gradient along the x-axis (second dimension).\n\nCitation\n\nAndo Shigeru, IEEE Trans. Pat. Anal. Mach. Int., vol. 22 no 3, March 2000\n\nSee also: KernelFactors.ando3, Kernel.ando4, Kernel.ando5.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageFiltering.Kernel.ando4",
    "page": "Summary and function reference",
    "title": "ImageFiltering.Kernel.ando4",
    "category": "Function",
    "text": "diff1, diff2 = ando4()\n\nReturn 4x4 kernels for two-dimensional gradient compution using the optimal \"Ando\" filters.  diff1 computes the gradient along the y-axis (first dimension), and diff2 computes the gradient along the x-axis (second dimension).\n\nCitation\n\nAndo Shigeru, IEEE Trans. Pat. Anal. Mach. Int., vol. 22 no 3, March 2000\n\nSee also: KernelFactors.ando4, Kernel.ando3, Kernel.ando5.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageFiltering.Kernel.ando5",
    "page": "Summary and function reference",
    "title": "ImageFiltering.Kernel.ando5",
    "category": "Function",
    "text": "diff1, diff2 = ando5()\n\nReturn 5x5 kernels for two-dimensional gradient compution using the optimal \"Ando\" filters.  diff1 computes the gradient along the y-axis (first dimension), and diff2 computes the gradient along the x-axis (second dimension).\n\nCitation\n\nAndo Shigeru, IEEE Trans. Pat. Anal. Mach. Int., vol. 22 no 3, March 2000\n\nSee also: KernelFactors.ando5, Kernel.ando3, Kernel.ando4.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageFiltering.Kernel.gaussian",
    "page": "Summary and function reference",
    "title": "ImageFiltering.Kernel.gaussian",
    "category": "Function",
    "text": "gaussian((σ1, σ2, ...), [(l1, l2, ...]) -> g\ngaussian(σ)                  -> g\n\nConstruct a multidimensional gaussian filter, with standard deviation σd along dimension d. Optionally provide the kernel length l, which must be a tuple of the same length.\n\nIf σ is supplied as a single number, a symmetric 2d kernel is constructed.\n\nSee also: KernelFactors.gaussian.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageFiltering.Kernel.DoG",
    "page": "Summary and function reference",
    "title": "ImageFiltering.Kernel.DoG",
    "category": "Function",
    "text": "DoG((σp1, σp2, ...), (σm1, σm2, ...), [l1, l2, ...]) -> k\nDoG((σ1, σ2, ...))                                   -> k\nDoG(σ::Real)                                         -> k\n\nConstruct a multidimensional difference-of-gaussian kernel k, equal to gaussian(σp, l)-gaussian(σm, l).  When only a single σ is supplied, the default is to choose σp = σ, σm = √2 σ. Optionally provide the kernel length l; the default is to extend by two max(σp,σm) in each direction from the center. l must be odd.\n\nIf σ is provided as a single number, a symmetric 2d DoG kernel is returned.\n\nSee also: KernelFactors.IIRGaussian.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageFiltering.Kernel.LoG",
    "page": "Summary and function reference",
    "title": "ImageFiltering.Kernel.LoG",
    "category": "Function",
    "text": "LoG((σ1, σ2, ...)) -> k\nLoG(σ)             -> k\n\nConstruct a Laplacian-of-Gaussian kernel k. σd is the gaussian width along dimension d.  If σ is supplied as a single number, a symmetric 2d kernel is returned.\n\nSee also: KernelFactors.IIRGaussian and Kernel.Laplacian.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageFiltering.Kernel.Laplacian",
    "page": "Summary and function reference",
    "title": "ImageFiltering.Kernel.Laplacian",
    "category": "Type",
    "text": "Laplacian((true,true,false,...))\nLaplacian(dims, N)\nLacplacian()\n\nLaplacian kernel in N dimensions, taking derivatives along the directions marked as true in the supplied tuple. Alternatively, one can pass dims, a listing of the dimensions for differentiation. (However, this variant is not inferrable.)\n\nLaplacian() is the 2d laplacian, equivalent to Laplacian((true,true)).\n\nThe kernel is represented as an opaque type, but you can use convert(AbstractArray, L) to convert it into array format.\n\n\n\n"
},

{
    "location": "function_reference.html#Kernel-1",
    "page": "Summary and function reference",
    "title": "Kernel",
    "category": "section",
    "text": "Kernel.sobel\nKernel.prewitt\nKernel.ando3\nKernel.ando4\nKernel.ando5\nKernel.gaussian\nKernel.DoG\nKernel.LoG\nKernel.Laplacian"
},

{
    "location": "function_reference.html#ImageFiltering.KernelFactors.sobel",
    "page": "Summary and function reference",
    "title": "ImageFiltering.KernelFactors.sobel",
    "category": "Function",
    "text": "kern1, kern2 = sobel()\n\nFactored Sobel filters for dimensions 1 and 2 of a two-dimensional image. Each is a 2-tuple of one-dimensional filters.\n\n\n\nkern = sobel(extended::NTuple{N,Bool}, d)\n\nReturn a factored Sobel filter for computing the gradient in N dimensions along axis d. If extended[dim] is false, kern will have size 1 along that dimension.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageFiltering.KernelFactors.prewitt",
    "page": "Summary and function reference",
    "title": "ImageFiltering.KernelFactors.prewitt",
    "category": "Function",
    "text": "kern1, kern2 = prewitt() returns factored Prewitt filters for dimensions 1 and 2 of your image\n\n\n\nkern = prewitt(extended::NTuple{N,Bool}, d)\n\nReturn a factored Prewitt filter for computing the gradient in N dimensions along axis d. If extended[dim] is false, kern will have size 1 along that dimension.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageFiltering.KernelFactors.ando3",
    "page": "Summary and function reference",
    "title": "ImageFiltering.KernelFactors.ando3",
    "category": "Function",
    "text": "kern1, kern2 = ando3() returns optimal 3x3 gradient filters for dimensions 1 and 2 of your image, as defined in Ando Shigeru, IEEE Trans. Pat. Anal. Mach. Int., vol. 22 no 3, March 2000.\n\nSee also: Kernel.ando3, KernelFactors.ando4, KernelFactors.ando5.\n\n\n\nkern = ando3(extended::NTuple{N,Bool}, d)\n\nReturn a factored Ando filter (size 3) for computing the gradient in N dimensions along axis d.  If extended[dim] is false, kern will have size 1 along that dimension.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageFiltering.KernelFactors.ando4",
    "page": "Summary and function reference",
    "title": "ImageFiltering.KernelFactors.ando4",
    "category": "Function",
    "text": "kern1, kern2 = ando4() returns separable approximations of the optimal 4x4 filters for dimensions 1 and 2 of your image, as defined in Ando Shigeru, IEEE Trans. Pat. Anal. Mach. Int., vol. 22 no 3, March 2000.\n\nSee also: Kernel.ando4.\n\n\n\nkern = ando4(extended::NTuple{N,Bool}, d)\n\nReturn a factored Ando filter (size 4) for computing the gradient in N dimensions along axis d.  If extended[dim] is false, kern will have size 1 along that dimension.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageFiltering.KernelFactors.ando5",
    "page": "Summary and function reference",
    "title": "ImageFiltering.KernelFactors.ando5",
    "category": "Function",
    "text": "kern1, kern2 = ando5_sep() returns separable approximations of the optimal 5x5 gradient filters for dimensions 1 and 2 of your image, as defined in Ando Shigeru, IEEE Trans. Pat. Anal. Mach. Int., vol. 22 no 3, March 2000.\n\nSee also: Kernel.ando5.\n\n\n\nkern = ando5(extended::NTuple{N,Bool}, d)\n\nReturn a factored Ando filter (size 5) for computing the gradient in N dimensions along axis d.  If extended[dim] is false, kern will have size 1 along that dimension.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageFiltering.KernelFactors.gaussian",
    "page": "Summary and function reference",
    "title": "ImageFiltering.KernelFactors.gaussian",
    "category": "Function",
    "text": "gaussian(σ::Real, [l]) -> g\n\nConstruct a 1d gaussian kernel g with standard deviation σ, optionally providing the kernel length l. The default is to extend by two σ in each direction from the center. l must be odd.\n\n\n\ngaussian((σ1, σ2, ...), [l]) -> (g1, g2, ...)\n\nConstruct a multidimensional gaussian filter as a product of single-dimension factors, with standard deviation σd along dimension d. Optionally provide the kernel length l, which must be a tuple of the same length.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageFiltering.KernelFactors.IIRGaussian",
    "page": "Summary and function reference",
    "title": "ImageFiltering.KernelFactors.IIRGaussian",
    "category": "Function",
    "text": "IIRGaussian([T], σ; emit_warning::Bool=true)\n\nConstruct an infinite impulse response (IIR) approximation to a Gaussian of standard deviation σ. σ may either be a single real number or a tuple of numbers; in the latter case, a tuple of such filters will be created, each for filtering a different dimension of an array.\n\nOptionally specify the type T for the filter coefficients; if not supplied, it will match σ (unless σ is not floating-point, in which case Float64 will be chosen).\n\nCitation\n\nI. T. Young, L. J. van Vliet, and M. van Ginkel, \"Recursive Gabor Filtering\". IEEE Trans. Sig. Proc., 50: 2798-2805 (2002).\n\n\n\n"
},

{
    "location": "function_reference.html#ImageFiltering.KernelFactors.TriggsSdika",
    "page": "Summary and function reference",
    "title": "ImageFiltering.KernelFactors.TriggsSdika",
    "category": "Type",
    "text": "TriggsSdika(a, b, scale, M)\n\nDefines a kernel for one-dimensional infinite impulse response (IIR) filtering. a is a \"forward\" filter, b a \"backward\" filter, M is a matrix for matching boundary conditions at the right edge, and scale is a constant scaling applied to each element at the conclusion of filtering.\n\nCitation\n\nB. Triggs and M. Sdika, \"Boundary conditions for Young-van Vliet recursive filtering\". IEEE Trans. on Sig. Proc. 54: 2365-2367 (2006).\n\n\n\nTriggsSdika(ab, scale)\n\nCreate a symmetric Triggs-Sdika filter (with a = b = ab). M is calculated for you. Only length 3 filters are currently supported.\n\n\n\n"
},

{
    "location": "function_reference.html#KernelFactors-1",
    "page": "Summary and function reference",
    "title": "KernelFactors",
    "category": "section",
    "text": "KernelFactors.sobel\nKernelFactors.prewitt\nKernelFactors.ando3\nKernelFactors.ando4\nKernelFactors.ando5\nKernelFactors.gaussian\nKernelFactors.IIRGaussian\nKernelFactors.TriggsSdika"
},

{
    "location": "function_reference.html#ImageFiltering.centered",
    "page": "Summary and function reference",
    "title": "ImageFiltering.centered",
    "category": "Function",
    "text": "centered(kernel) -> shiftedkernel\n\nShift the origin-of-coordinates to the center of kernel. The center-element of kernel will be accessed by shiftedkernel[0, 0, ...].\n\nThis function makes it easy to supply kernels using regular Arrays, and provides compatibility with other languages that do not support arbitrary indices.\n\nSee also: imfilter.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageFiltering.KernelFactors.kernelfactors",
    "page": "Summary and function reference",
    "title": "ImageFiltering.KernelFactors.kernelfactors",
    "category": "Function",
    "text": "kernelfactors(factors::Tuple)\n\nPrepare a factored kernel for filtering. If passed a 2-tuple of vectors of lengths m and n, this will return a 2-tuple of ReshapedVectors that are effectively of sizes m×1 and 1×n. In general, each successive factor will be reshaped to extend along the corresponding dimension.\n\nIf passed a tuple of general arrays, it is assumed that each is shaped appropriately along its \"leading\" dimensions; the dimensionality of each is \"extended\" to N = length(factors), appending 1s to the size as needed.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageFiltering.Kernel.reflect",
    "page": "Summary and function reference",
    "title": "ImageFiltering.Kernel.reflect",
    "category": "Function",
    "text": "reflect(kernel) --> reflectedkernel\n\nCompute the pointwise reflection around 0, 0, ... of the kernel kernel.  Using imfilter with a reflectedkernel performs convolution, rather than correlation, with respect to the original kernel.\n\n\n\n"
},

{
    "location": "function_reference.html#Kernel-utilities-1",
    "page": "Summary and function reference",
    "title": "Kernel utilities",
    "category": "section",
    "text": "centered\nkernelfactors\nreflect"
},

{
    "location": "function_reference.html#ImageFiltering.padarray",
    "page": "Summary and function reference",
    "title": "ImageFiltering.padarray",
    "category": "Function",
    "text": "padarray([T], img, border) --> imgpadded\n\nGenerate a padded image from an array img and a specification border of the boundary conditions and amount of padding to add. border can be a Pad, Fill, or Inner object.\n\nOptionally provide the element type T of imgpadded.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageFiltering.Pad",
    "page": "Summary and function reference",
    "title": "ImageFiltering.Pad",
    "category": "Type",
    "text": "Pad is a type that stores choices about padding. Instances must set style, a Symbol specifying the boundary conditions of the image, one of:\n\n:replicate (repeat edge values to infinity)\n:circular (image edges \"wrap around\")\n:symmetric (the image reflects relative to a position between pixels)\n:reflect (the image reflects relative to the edge itself)\n\nThe default value is :replicate.\n\nIt's worth emphasizing that padding is most straightforwardly specified as a string,\n\nimfilter(img, kernel, \"replicate\")\n\nrather than\n\nimfilter(img, kernel, Pad(:replicate))\n\n\n\n"
},

{
    "location": "function_reference.html#ImageFiltering.Fill",
    "page": "Summary and function reference",
    "title": "ImageFiltering.Fill",
    "category": "Type",
    "text": "Fill(val)\nFill(val, lo, hi)\n\nPad the edges of the image with a constant value, val.\n\nOptionally supply the extent of the padding, see Pad.\n\nExample:\n\nimfilter(img, kernel, Fill(zero(eltype(img))))\n\n\n\n"
},

{
    "location": "function_reference.html#ImageFiltering.Inner",
    "page": "Summary and function reference",
    "title": "ImageFiltering.Inner",
    "category": "Type",
    "text": "Inner()\nInner(lo, hi)\n\nIndicate that edges are to be discarded in filtering, only the interior of the result it to be returned.\n\nExample:\n\nimfilter(img, kernel, Inner())\n\n\n\n"
},

{
    "location": "function_reference.html#ImageFiltering.NA",
    "page": "Summary and function reference",
    "title": "ImageFiltering.NA",
    "category": "Type",
    "text": "NA()\nNA(lo, hi)\n\nChoose filtering using \"NA\" (Not Available) boundary conditions. This is most appropriate for filters that have only positive weights, such as blurring filters. Effectively, the output pixel value is normalized in the following way:\n\n          filtered img with Fill(0) boundary conditions\noutput =  ---------------------------------------------\n          filtered 1   with Fill(0) boundary conditions\n\nAs a consequence, filtering has the same behavior as nanmean. Indeed, invalid pixels in img can be marked as NaN and then they are effectively omitted from the filtered result.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageFiltering.NoPad",
    "page": "Summary and function reference",
    "title": "ImageFiltering.NoPad",
    "category": "Type",
    "text": "NoPad()\nNoPad(border)\n\nIndicates that no padding should be applied to the input array, or that you have already pre-padded the input image. Passing a border object allows you to preserve \"memory\" of a border choice; it can be retrieved by indexing with [].\n\nExample\n\nnp = NoPad(Pad(:replicate))\nimfilter!(out, img, kernel, np)\n\nruns filtering directly, skipping any padding steps.  Every entry of out must be computable using in-bounds operations on img and kernel.\n\n\n\n"
},

{
    "location": "function_reference.html#Boundaries-and-padding-1",
    "page": "Summary and function reference",
    "title": "Boundaries and padding",
    "category": "section",
    "text": "padarray\nPad\nFill\nInner\nNA\nNoPad"
},

{
    "location": "function_reference.html#ImageFiltering.Algorithm.FIR",
    "page": "Summary and function reference",
    "title": "ImageFiltering.Algorithm.FIR",
    "category": "Type",
    "text": "Filter using a direct algorithm\n\n\n\n"
},

{
    "location": "function_reference.html#ImageFiltering.Algorithm.FFT",
    "page": "Summary and function reference",
    "title": "ImageFiltering.Algorithm.FFT",
    "category": "Type",
    "text": "Filter using the Fast Fourier Transform\n\n\n\n"
},

{
    "location": "function_reference.html#ImageFiltering.Algorithm.IIR",
    "page": "Summary and function reference",
    "title": "ImageFiltering.Algorithm.IIR",
    "category": "Type",
    "text": "Filter with an Infinite Impulse Response filter\n\n\n\n"
},

{
    "location": "function_reference.html#ImageFiltering.Algorithm.Mixed",
    "page": "Summary and function reference",
    "title": "ImageFiltering.Algorithm.Mixed",
    "category": "Type",
    "text": "Filter with a cascade of mixed types (IIR, FIR)\n\n\n\n"
},

{
    "location": "function_reference.html#Algorithms-1",
    "page": "Summary and function reference",
    "title": "Algorithms",
    "category": "section",
    "text": "Algorithm.FIR\nAlgorithm.FFT\nAlgorithm.IIR\nAlgorithm.Mixed"
},

{
    "location": "function_reference.html#ImageFiltering.KernelFactors.ReshapedOneD",
    "page": "Summary and function reference",
    "title": "ImageFiltering.KernelFactors.ReshapedOneD",
    "category": "Type",
    "text": "ReshapedOneD{N,Npre}(data)\n\nReturn an object of dimensionality N, where data must have dimensionality 1. The indices are 0:0 for the first Npre dimensions, have the indices of data for dimension Npre+1, and are 0:0 for the remaining dimensions.\n\ndata must support eltype and ndims, but does not have to be an AbstractArray.\n\nReshapedOneDs allow one to specify a \"filtering dimension\" for a 1-dimensional filter.\n\n\n\n"
},

{
    "location": "function_reference.html#Internal-machinery-1",
    "page": "Summary and function reference",
    "title": "Internal machinery",
    "category": "section",
    "text": "KernelFactors.ReshapedOneD"
},

{
    "location": "function_reference.html#ImageFiltering.MapWindow.mapwindow",
    "page": "Summary and function reference",
    "title": "ImageFiltering.MapWindow.mapwindow",
    "category": "Function",
    "text": "mapwindow(f, img, window, [border=\"replicate\"]) -> imgf\n\nApply f to sliding windows of img, with window size or indices specified by window. For example, mapwindow(median!, img, window) returns an Array of values similar to img (median-filtered, of course), whereas mapwindow(extrema, img, window) returns an Array of (min,max) tuples over a window of size window centered on each point of img.\n\nThe function f receives a buffer buf for the window of data surrounding the current point. If window is specified as a Dims-tuple (tuple-of-integers), then all the integers must be odd and the window is centered around the current image point. For example, if window=(3,3), then f will receive an Array buf corresponding to offsets (-1:1, -1:1) from the imgf[i,j] for which this is currently being computed. Alternatively, window can be a tuple of AbstractUnitRanges, in which case the specified ranges are used for buf; this allows you to use asymmetric windows if needed.\n\nborder specifies how the edges of img should be handled; see imfilter for details.\n\nFor functions that can only take AbstractVector inputs, you might have to first specialize default_shape:\n\nf = v->quantile(v, 0.75)\nImageFiltering.MapWindow.default_shape(::typeof(f)) = vec\n\nand then mapwindow(f, img, (m,n)) should filter at the 75th quantile.\n\nSee also: imfilter.\n\n\n\n"
},

{
    "location": "function_reference.html#Images.imROF",
    "page": "Summary and function reference",
    "title": "Images.imROF",
    "category": "Function",
    "text": "imgr = imROF(img, λ, iterations)\n\nPerform Rudin-Osher-Fatemi (ROF) filtering, more commonly known as Total Variation (TV) denoising or TV regularization. λ is the regularization coefficient for the derivative, and iterations is the number of relaxation iterations taken. 2d only.\n\nSee https://en.wikipedia.org/wiki/Total_variation_denoising and Chambolle, A. (2004). \"An algorithm for total variation minimization and applications\".     Journal of Mathematical Imaging and Vision. 20: 89–97\n\n\n\n"
},

{
    "location": "function_reference.html#Nonlinear-filtering-and-transformation-1",
    "page": "Summary and function reference",
    "title": "Nonlinear filtering and transformation",
    "category": "section",
    "text": "mapwindow\nimROF"
},

{
    "location": "function_reference.html#Images.magnitude",
    "page": "Summary and function reference",
    "title": "Images.magnitude",
    "category": "Function",
    "text": "m = magnitude(grad_x, grad_y)\n\nCalculates the magnitude of the gradient images given by grad_x and grad_y. Equivalent to sqrt(grad_x^2 + grad_y^2).\n\nReturns a magnitude image the same size as grad_x and grad_y.\n\n\n\n"
},

{
    "location": "function_reference.html#Images.phase",
    "page": "Summary and function reference",
    "title": "Images.phase",
    "category": "Function",
    "text": "phase(grad_x, grad_y) -> p\n\nCalculate the rotation angle of the gradient given by grad_x and grad_y. Equivalent to atan2(-grad_y, grad_x), except that when both grad_x and grad_y are effectively zero, the corresponding angle is set to zero.\n\n\n\n"
},

{
    "location": "function_reference.html#Images.orientation",
    "page": "Summary and function reference",
    "title": "Images.orientation",
    "category": "Function",
    "text": "orientation(grad_x, grad_y) -> orient\n\nCalculate the orientation angle of the strongest edge from gradient images given by grad_x and grad_y.  Equivalent to atan2(grad_x, grad_y).  When both grad_x and grad_y are effectively zero, the corresponding angle is set to zero.\n\n\n\n"
},

{
    "location": "function_reference.html#Images.magnitude_phase",
    "page": "Summary and function reference",
    "title": "Images.magnitude_phase",
    "category": "Function",
    "text": "magnitude_phase(grad_x, grad_y) -> m, p\n\nConvenience function for calculating the magnitude and phase of the gradient images given in grad_x and grad_y.  Returns a tuple containing the magnitude and phase images.  See magnitude and phase for details.\n\n\n\n"
},

{
    "location": "function_reference.html#Images.imedge",
    "page": "Summary and function reference",
    "title": "Images.imedge",
    "category": "Function",
    "text": "grad_y, grad_x, mag, orient = imedge(img, kernelfun=KernelFactors.ando3, border=\"replicate\")\n\nEdge-detection filtering. kernelfun is a valid kernel function for imgradients, defaulting to KernelFactors.ando3. border is any of the boundary conditions specified in padarray.\n\nReturns a tuple (grad_y, grad_x, mag, orient), which are the horizontal gradient, vertical gradient, and the magnitude and orientation of the strongest edge, respectively.\n\n\n\n"
},

{
    "location": "function_reference.html#Images.thin_edges",
    "page": "Summary and function reference",
    "title": "Images.thin_edges",
    "category": "Function",
    "text": "thinned = thin_edges(img, gradientangle, [border])\nthinned, subpix = thin_edges_subpix(img, gradientangle, [border])\nthinned, subpix = thin_edges_nonmaxsup(img, gradientangle, [border]; [radius::Float64=1.35], [theta=pi/180])\nthinned, subpix = thin_edges_nonmaxsup_subpix(img, gradientangle, [border]; [radius::Float64=1.35], [theta=pi/180])\n\nEdge thinning for 2D edge images.  Currently the only algorithm available is non-maximal suppression, which takes an edge image and its gradient angle, and checks each edge point for local maximality in the direction of the gradient. The returned image is non-zero only at maximal edge locations.\n\nborder is any of the boundary conditions specified in padarray.\n\nIn addition to the maximal edge image, the _subpix versions of these functions also return an estimate of the subpixel location of each local maxima, as a 2D array or image of Graphics.Point objects.  Additionally, each local maxima is adjusted to the estimated value at the subpixel location.\n\nCurrently, the _nonmaxsup functions are identical to the first two function calls, except that they also accept additional keyword arguments.  radius indicates the step size to use when searching in the direction of the gradient; values between 1.2 and 1.5 are suggested (default 1.35).  theta indicates the step size to use when discretizing angles in the gradientangle image, in radians (default: 1 degree in radians = pi/180).\n\nExample:\n\ng = rgb2gray(rgb_image)\ngx, gy = imgradients(g)\nmag, grad_angle = magnitude_phase(gx,gy)\nmag[mag .< 0.5] = 0.0  # Threshold magnitude image\nthinned, subpix =  thin_edges_subpix(mag, grad_angle)\n\n\n\n"
},

{
    "location": "function_reference.html#Images.canny",
    "page": "Summary and function reference",
    "title": "Images.canny",
    "category": "Function",
    "text": "canny_edges = canny(img, (upper, lower), sigma=1.4)\n\nPerforms Canny Edge Detection on the input image.\n\nParameters :\n\n(upper, lower) :  Bounds for hysteresis thresholding   sigma :           Specifies the standard deviation of the gaussian filter\n\nExample\n\nimgedg = canny(img, (Percentile(80), Percentile(20)))\n\n\n\n"
},

{
    "location": "function_reference.html#Edge-detection-1",
    "page": "Summary and function reference",
    "title": "Edge detection",
    "category": "section",
    "text": "magnitude\nphase\norientation\nmagnitude_phase\nimedge\nthin_edges\ncanny"
},

{
    "location": "function_reference.html#Images.imcorner",
    "page": "Summary and function reference",
    "title": "Images.imcorner",
    "category": "Function",
    "text": "corners = imcorner(img; [method])\ncorners = imcorner(img, threshold, percentile; [method])\n\nPerforms corner detection using one of the following methods -\n\n1. harris\n2. shi_tomasi\n3. kitchen_rosenfeld\n\nThe parameters of the individual methods are described in their documentation. The maxima values of the resultant responses are taken as corners. If a threshold is specified, the values of the responses are thresholded to give the corner pixels. The threshold is assumed to be a percentile value unless percentile is set to false.\n\n\n\n"
},

{
    "location": "function_reference.html#Images.harris",
    "page": "Summary and function reference",
    "title": "Images.harris",
    "category": "Function",
    "text": "harris_response = harris(img; [k], [border], [weights])\n\nPerforms Harris corner detection. The covariances can be taken using either a mean weighted filter or a gamma kernel.\n\n\n\n"
},

{
    "location": "function_reference.html#Images.shi_tomasi",
    "page": "Summary and function reference",
    "title": "Images.shi_tomasi",
    "category": "Function",
    "text": "shi_tomasi_response = shi_tomasi(img; [border], [weights])\n\nPerforms Shi Tomasi corner detection. The covariances can be taken using either a mean weighted filter or a gamma kernel.\n\n\n\n"
},

{
    "location": "function_reference.html#Images.kitchen_rosenfeld",
    "page": "Summary and function reference",
    "title": "Images.kitchen_rosenfeld",
    "category": "Function",
    "text": "kitchen_rosenfeld_response = kitchen_rosenfeld(img; [border])\n\nPerforms Kitchen Rosenfeld corner detection. The covariances can be taken using either a mean weighted filter or a gamma kernel.\n\n\n\n"
},

{
    "location": "function_reference.html#Images.fastcorners",
    "page": "Summary and function reference",
    "title": "Images.fastcorners",
    "category": "Function",
    "text": "fastcorners(img, n, threshold) -> corners\n\nPerforms FAST Corner Detection. n is the number of contiguous pixels which need to be greater (lesser) than intensity + threshold (intensity - threshold) for a pixel to be marked as a corner. The default value for n is 12.\n\n\n\n"
},

{
    "location": "function_reference.html#Corner-Detection-1",
    "page": "Summary and function reference",
    "title": "Corner Detection",
    "category": "section",
    "text": "imcorner\nharris\nshi_tomasi\nkitchen_rosenfeld\nfastcorners"
},

{
    "location": "function_reference.html#Images.blob_LoG",
    "page": "Summary and function reference",
    "title": "Images.blob_LoG",
    "category": "Function",
    "text": "blob_LoG(img, σscales, [edges], [σshape]) -> Vector{BlobLoG}\n\nFind \"blobs\" in an N-D image using the negative Lapacian of Gaussians with the specifed vector or tuple of σ values. The algorithm searches for places where the filtered image (for a particular σ) is at a peak compared to all spatially- and σ-adjacent voxels, where σ is σscales[i] * σshape for some i. By default, σshape is an ntuple of 1s.\n\nThe optional edges argument controls whether peaks on the edges are included. edges can be true or false, or a N+1-tuple in which the first entry controls whether edge-σ values are eligible to serve as peaks, and the remaining N entries control each of the N dimensions of img.\n\nCitation:\n\nLindeberg T (1998), \"Feature Detection with Automatic Scale Selection\", International Journal of Computer Vision, 30(2), 79–116.\n\nSee also: BlobLoG.\n\n\n\n"
},

{
    "location": "function_reference.html#Images.BlobLoG",
    "page": "Summary and function reference",
    "title": "Images.BlobLoG",
    "category": "Type",
    "text": "BlobLoG stores information about the location of peaks as discovered by blob_LoG. It has fields:\n\nlocation: the location of a peak in the filtered image (a CartesianIndex)\nσ: the value of σ which lead to the largest -LoG-filtered amplitude at this location\namplitude: the value of the -LoG(σ)-filtered image at the peak\n\nNote that the radius is equal to σ√2.\n\nSee also: blob_LoG.\n\n\n\n"
},

{
    "location": "function_reference.html#Images.findlocalmaxima",
    "page": "Summary and function reference",
    "title": "Images.findlocalmaxima",
    "category": "Function",
    "text": "findlocalmaxima(img, [region, edges]) -> Vector{CartesianIndex}\n\nReturns the coordinates of elements whose value is larger than all of their immediate neighbors.  region is a list of dimensions to consider.  edges is a boolean specifying whether to include the first and last elements of each dimension, or a tuple-of-Bool specifying edge behavior for each dimension separately.\n\n\n\n"
},

{
    "location": "function_reference.html#Images.findlocalminima",
    "page": "Summary and function reference",
    "title": "Images.findlocalminima",
    "category": "Function",
    "text": "Like findlocalmaxima, but returns the coordinates of the smallest elements.\n\n\n\n"
},

{
    "location": "function_reference.html#Feature-Extraction-1",
    "page": "Summary and function reference",
    "title": "Feature Extraction",
    "category": "section",
    "text": "See the ImageFeatures package for a much more comprehensive set of tools.blob_LoG\nBlobLoG\nfindlocalmaxima\nfindlocalminima"
},

{
    "location": "function_reference.html#Images.imhist",
    "page": "Summary and function reference",
    "title": "Images.imhist",
    "category": "Function",
    "text": "edges, count = imhist(img, nbins)\nedges, count = imhist(img, nbins, minval, maxval)\n\nGenerates a histogram for the image over nbins spread between (minval, maxval]. If minval and maxval are not given, then the minimum and maximum values present in the image are taken.\n\nedges is a vector that specifies how the range is divided; count[i+1] is the number of values x that satisfy edges[i] <= x < edges[i+1]. count[1] is the number satisfying x < edges[1], and count[end] is the number satisfying x >= edges[end]. Consequently, length(count) == length(edges)+1.\n\n\n\n"
},

{
    "location": "function_reference.html#Images.cliphist",
    "page": "Summary and function reference",
    "title": "Images.cliphist",
    "category": "Function",
    "text": "clipped_hist = cliphist(hist, clip)\n\nClips the histogram above a certain value clip. The excess left in the bins exceeding clip is redistributed among the remaining bins.\n\n\n\n"
},

{
    "location": "function_reference.html#Images.histeq",
    "page": "Summary and function reference",
    "title": "Images.histeq",
    "category": "Function",
    "text": "hist_equalised_img = histeq(img, nbins)\nhist_equalised_img = histeq(img, nbins, minval, maxval)\n\nReturns a histogram equalised image with a granularity of approximately nbins number of bins.\n\nThe histeq function can handle a variety of input types. The returned image depends on the input type. If the input is an Image then the resulting image is of the same type and has the same properties.\n\nFor coloured images, the input is converted to YIQ type and the Y channel is equalised. This is the combined with the I and Q channels and the resulting image converted to the same type as the input.\n\nIf minval and maxval are specified then intensities are equalized to the range (minval, maxval). The default values are 0 and 1.\n\n\n\n"
},

{
    "location": "function_reference.html#Images.adjust_gamma",
    "page": "Summary and function reference",
    "title": "Images.adjust_gamma",
    "category": "Function",
    "text": "gamma_corrected_img = adjust_gamma(img, gamma)\n\nReturns a gamma corrected image.\n\nThe adjust_gamma function can handle a variety of input types. The returned image depends on the input type. If the input is an Image then the resulting image is of the same type and has the same properties.\n\nFor coloured images, the input is converted to YIQ type and the Y channel is gamma corrected. This is the combined with the I and Q channels and the resulting image converted to the same type as the input.\n\n\n\n"
},

{
    "location": "function_reference.html#Images.imstretch",
    "page": "Summary and function reference",
    "title": "Images.imstretch",
    "category": "Function",
    "text": "imgs = imstretch(img, m, slope) enhances or reduces (for slope > 1 or < 1, respectively) the contrast near saturation (0 and 1). This is essentially a symmetric gamma-correction. For a pixel of brightness p, the new intensity is 1/(1+(m/(p+eps))^slope).\n\nThis assumes the input img has intensities between 0 and 1.\n\n\n\n"
},

{
    "location": "function_reference.html#Images.imadjustintensity",
    "page": "Summary and function reference",
    "title": "Images.imadjustintensity",
    "category": "Function",
    "text": "imadjustintensity(img [, (minval,maxval)]) -> Image\n\nMap intensities over the interval (minval,maxval) to the interval    [0,1]. This is equivalent to map(ScaleMinMax(eltype(img), minval,    maxval), img).  (minval,maxval) defaults to extrema(img).\n\n\n\n"
},

{
    "location": "function_reference.html#Images.complement",
    "page": "Summary and function reference",
    "title": "Images.complement",
    "category": "Function",
    "text": "y = complement(x)\n\nTake the complement 1-x of x.  If x is a color with an alpha channel, the alpha channel is left untouched.\n\n\n\n"
},

{
    "location": "function_reference.html#Images.histmatch",
    "page": "Summary and function reference",
    "title": "Images.histmatch",
    "category": "Function",
    "text": "hist_matched_img = histmatch(img, oimg, nbins)\n\nReturns a grayscale histogram matched image with a granularity of nbins number of bins. img is the image to be matched and oimg is the image having the desired histogram to be matched to.\n\n\n\n"
},

{
    "location": "function_reference.html#Images.clahe",
    "page": "Summary and function reference",
    "title": "Images.clahe",
    "category": "Function",
    "text": "hist_equalised_img = clahe(img, nbins, xblocks = 8, yblocks = 8, clip = 3)\n\n\nPerforms Contrast Limited Adaptive Histogram Equalisation (CLAHE) on the input image. It differs from ordinary histogram equalization in the respect that the adaptive method computes several histograms, each corresponding to a distinct section of the image, and uses them to redistribute the lightness values of the image. It is therefore suitable for improving the local contrast and enhancing the definitions of edges in each region of an image.\n\nIn the straightforward form, CLAHE is done by calculation a histogram of a window around each pixel and using the transformation function of the equalised histogram to rescale the pixel. Since this is computationally expensive, we use interpolation which gives a significant rise in efficiency without compromising the result. The image is divided into a grid and equalised histograms are calculated for each block. Then, each pixel is interpolated using the closest histograms.\n\nThe xblocks and yblocks specify the number of blocks to divide the input image into in each direction. nbins specifies the granularity of histogram calculation of each local region. clip specifies the value at which the histogram is clipped. The excess in the histogram bins with value exceeding clip is redistributed among the other bins.\n\n\n\n"
},

{
    "location": "function_reference.html#Exposure-1",
    "page": "Summary and function reference",
    "title": "Exposure",
    "category": "section",
    "text": "imhist\ncliphist\nhisteq\nadjust_gamma\nimstretch\nimadjustintensity\ncomplement\nhistmatch\nclahe"
},

{
    "location": "function_reference.html#ImageTransformations.imresize",
    "page": "Summary and function reference",
    "title": "ImageTransformations.imresize",
    "category": "Function",
    "text": "imresize(img, sz) -> imgr\nimresize(img, inds) -> imgr\n\nChange img to be of size sz (or to have indices inds). This interpolates the values at sub-pixel locations. If you are shrinking the image, you risk aliasing unless you low-pass filter img first. For example:\n\nσ = map((o,n)->0.75*o/n, size(img), sz)\nkern = KernelFactors.gaussian(σ)   # from ImageFiltering\nimgr = imresize(imfilter(img, kern, NA()), sz)\n\nSee also restrict.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageTransformations.restrict",
    "page": "Summary and function reference",
    "title": "ImageTransformations.restrict",
    "category": "Function",
    "text": "restrict(img[, region]) -> imgr\n\nReduce the size of img by two-fold along the dimensions listed in region, or all spatial coordinates if region is not specified.  It anti-aliases the image as it goes, so is better than a naive summation over 2x2 blocks.\n\nSee also imresize.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageTransformations.warp",
    "page": "Summary and function reference",
    "title": "ImageTransformations.warp",
    "category": "Function",
    "text": "warp(img, tform, [indices], [degree = Linear()], [fill = NaN]) -> imgw\n\nTransform the coordinates of img, returning a new imgw satisfying imgw[I] = img[tform(I)]. This approach is known as backward mode warping. The transformation tform must accept a SVector as input. A useful package to create a wide variety of such transformations is CoordinateTransformations.jl.\n\nReconstruction scheme\n\nDuring warping, values for img must be reconstructed at arbitrary locations tform(I) which do not lie on to the lattice of pixels. How this reconstruction is done depends on the type of img and the optional parameter degree.\n\nWhen img is a plain array, then on-grid b-spline interpolation will be used. It is possible to configure what degree of b-spline to use with the parameter degree. For example one can use degree = Linear() for linear interpolation, degree = Constant() for nearest neighbor interpolation, or degree = Quadratic(Flat()) for quadratic interpolation.\n\nIn the case tform(I) maps to indices outside the original img, those locations are set to a value fill (which defaults to NaN if the element type supports it, and 0 otherwise). The parameter fill also accepts extrapolation schemes, such as Flat(), Periodic() or Reflect().\n\nFor more control over the reconstruction scheme –- and how beyond-the-edge points are handled –- pass img as an AbstractInterpolation or AbstractExtrapolation from Interpolations.jl.\n\nThe meaning of the coordinates\n\nThe output array imgw has indices that would result from applying inv(tform) to the indices of img. This can be very handy for keeping track of how pixels in imgw line up with pixels in img.\n\nIf you just want a plain array, you can \"strip\" the custom indices with parent(imgw).\n\nExamples: a 2d rotation (see JuliaImages documentation for pictures)\n\njulia> using Images, CoordinateTransformations, TestImages, OffsetArrays\n\njulia> img = testimage(\"lighthouse\");\n\njulia> indices(img)\n(Base.OneTo(512),Base.OneTo(768))\n\n# Rotate around the center of `img`\njulia> tfm = recenter(RotMatrix(-pi/4), center(img))\nAffineMap([0.707107 0.707107; -0.707107 0.707107], [-196.755,293.99])\n\njulia> imgw = warp(img, tfm);\n\njulia> indices(imgw)\n(-196:709,-68:837)\n\n# Alternatively, specify the origin in the image itself\njulia> img0 = OffsetArray(img, -30:481, -384:383);  # origin near top of image\n\njulia> rot = LinearMap(RotMatrix(-pi/4))\nLinearMap([0.707107 -0.707107; 0.707107 0.707107])\n\njulia> imgw = warp(img0, rot);\n\njulia> indices(imgw)\n(-293:612,-293:611)\n\njulia> imgr = parent(imgw);\n\njulia> indices(imgr)\n(Base.OneTo(906),Base.OneTo(905))\n\n\n\n"
},

{
    "location": "function_reference.html#Spatial-transformations-and-resizing-1",
    "page": "Summary and function reference",
    "title": "Spatial transformations and resizing",
    "category": "section",
    "text": "imresize\nrestrict\nwarp"
},

{
    "location": "function_reference.html#Images.minfinite",
    "page": "Summary and function reference",
    "title": "Images.minfinite",
    "category": "Function",
    "text": "m = minfinite(A) calculates the minimum value in A, ignoring any values that are not finite (Inf or NaN).\n\n\n\n"
},

{
    "location": "function_reference.html#Images.maxfinite",
    "page": "Summary and function reference",
    "title": "Images.maxfinite",
    "category": "Function",
    "text": "m = maxfinite(A) calculates the maximum value in A, ignoring any values that are not finite (Inf or NaN).\n\n\n\n"
},

{
    "location": "function_reference.html#Images.maxabsfinite",
    "page": "Summary and function reference",
    "title": "Images.maxabsfinite",
    "category": "Function",
    "text": "m = maxabsfinite(A) calculates the maximum absolute value in A, ignoring any values that are not finite (Inf or NaN).\n\n\n\n"
},

{
    "location": "function_reference.html#Images.meanfinite",
    "page": "Summary and function reference",
    "title": "Images.meanfinite",
    "category": "Function",
    "text": "M = meanfinite(img, region) calculates the mean value along the dimensions listed in region, ignoring any non-finite values.\n\n\n\n"
},

{
    "location": "function_reference.html#Images.ssd",
    "page": "Summary and function reference",
    "title": "Images.ssd",
    "category": "Function",
    "text": "s = ssd(A, B) computes the sum-of-squared differences over arrays/images A and B\n\n\n\n"
},

{
    "location": "function_reference.html#Images.ssdn",
    "page": "Summary and function reference",
    "title": "Images.ssdn",
    "category": "Function",
    "text": "s = ssdn(A, B) computes the sum-of-squared differences over arrays/images A and B, normalized by array size\n\n\n\n"
},

{
    "location": "function_reference.html#Images.sad",
    "page": "Summary and function reference",
    "title": "Images.sad",
    "category": "Function",
    "text": "s = sad(A, B) computes the sum-of-absolute differences over arrays/images A and B\n\n\n\n"
},

{
    "location": "function_reference.html#Images.sadn",
    "page": "Summary and function reference",
    "title": "Images.sadn",
    "category": "Function",
    "text": "s = sadn(A, B) computes the sum-of-absolute differences over arrays/images A and B, normalized by array size\n\n\n\n"
},

{
    "location": "function_reference.html#Image-statistics-1",
    "page": "Summary and function reference",
    "title": "Image statistics",
    "category": "section",
    "text": "minfinite\nmaxfinite\nmaxabsfinite\nmeanfinite\nssd\nssdn\nsad\nsadn"
},

{
    "location": "function_reference.html#ImageMorphology.dilate",
    "page": "Summary and function reference",
    "title": "ImageMorphology.dilate",
    "category": "Function",
    "text": "imgd = dilate(img, [region])\n\nperform a max-filter over nearest-neighbors. The default is 8-connectivity in 2d, 27-connectivity in 3d, etc. You can specify the list of dimensions that you want to include in the connectivity, e.g., region = [1,2] would exclude the third dimension from filtering.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageMorphology.erode",
    "page": "Summary and function reference",
    "title": "ImageMorphology.erode",
    "category": "Function",
    "text": "imge = erode(img, [region])\n\nperform a min-filter over nearest-neighbors. The default is 8-connectivity in 2d, 27-connectivity in 3d, etc. You can specify the list of dimensions that you want to include in the connectivity, e.g., region = [1,2] would exclude the third dimension from filtering.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageMorphology.opening",
    "page": "Summary and function reference",
    "title": "ImageMorphology.opening",
    "category": "Function",
    "text": "imgo = opening(img, [region]) performs the opening morphology operation, equivalent to dilate(erode(img)). region allows you to control the dimensions over which this operation is performed.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageMorphology.closing",
    "page": "Summary and function reference",
    "title": "ImageMorphology.closing",
    "category": "Function",
    "text": "imgc = closing(img, [region]) performs the closing morphology operation, equivalent to erode(dilate(img)). region allows you to control the dimensions over which this operation is performed.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageMorphology.tophat",
    "page": "Summary and function reference",
    "title": "ImageMorphology.tophat",
    "category": "Function",
    "text": "imgth = tophat(img, [region]) performs top hat of an image, which is defined as the image minus its morphological opening. region allows you to control the dimensions over which this operation is performed.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageMorphology.bothat",
    "page": "Summary and function reference",
    "title": "ImageMorphology.bothat",
    "category": "Function",
    "text": "imgbh = bothat(img, [region]) performs bottom hat of an image, which is defined as its morphological closing minus the original image. region allows you to control the dimensions over which this operation is performed.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageMorphology.morphogradient",
    "page": "Summary and function reference",
    "title": "ImageMorphology.morphogradient",
    "category": "Function",
    "text": "imgmg = morphogradient(img, [region]) returns morphological gradient of the image, which is the difference between the dilation and the erosion of a given image. region allows you to control the dimensions over which this operation is performed.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageMorphology.morpholaplace",
    "page": "Summary and function reference",
    "title": "ImageMorphology.morpholaplace",
    "category": "Function",
    "text": "imgml = morpholaplace(img, [region]) performs Morphological Laplacian of an image, which is defined as the arithmetic difference between the internal and the external gradient. region allows you to control the dimensions over which this operation is performed.\n\n\n\n"
},

{
    "location": "function_reference.html#Images.label_components",
    "page": "Summary and function reference",
    "title": "Images.label_components",
    "category": "Function",
    "text": "label = label_components(tf, [connectivity])\nlabel = label_components(tf, [region])\n\nFind the connected components in a binary array tf. There are two forms that connectivity can take:\n\nIt can be a boolean array of the same dimensionality as tf, of size 1 or 3\n\nalong each dimension. Each entry in the array determines whether a given neighbor is used for connectivity analyses. For example, connectivity = trues(3,3) would use 8-connectivity and test all pixels that touch the current one, even the corners.\n\nYou can provide a list indicating which dimensions are used to\n\ndetermine connectivity. For example, region = [1,3] would not test neighbors along dimension 2 for connectivity. This corresponds to just the nearest neighbors, i.e., 4-connectivity in 2d and 6-connectivity in 3d.\n\nThe default is region = 1:ndims(A).\n\nThe output label is an integer array, where 0 is used for background pixels, and each connected region gets a different integer index.\n\n\n\n"
},

{
    "location": "function_reference.html#Images.component_boxes",
    "page": "Summary and function reference",
    "title": "Images.component_boxes",
    "category": "Function",
    "text": "component_boxes(labeled_array) -> an array of bounding boxes for each label, including the background label 0\n\n\n\n"
},

{
    "location": "function_reference.html#Images.component_lengths",
    "page": "Summary and function reference",
    "title": "Images.component_lengths",
    "category": "Function",
    "text": "component_lengths(labeled_array) -> an array of areas (2D), volumes (3D), etc. for each label, including the background label 0\n\n\n\n"
},

{
    "location": "function_reference.html#Images.component_indices",
    "page": "Summary and function reference",
    "title": "Images.component_indices",
    "category": "Function",
    "text": "component_indices(labeled_array) -> an array of pixels for each label, including the background label 0\n\n\n\n"
},

{
    "location": "function_reference.html#Images.component_subscripts",
    "page": "Summary and function reference",
    "title": "Images.component_subscripts",
    "category": "Function",
    "text": "component_subscripts(labeled_array) -> an array of pixels for each label, including the background label 0\n\n\n\n"
},

{
    "location": "function_reference.html#Images.component_centroids",
    "page": "Summary and function reference",
    "title": "Images.component_centroids",
    "category": "Function",
    "text": "component_centroids(labeled_array) -> an array of centroids for each label, including the background label 0\n\n\n\n"
},

{
    "location": "function_reference.html#Images.FeatureTransform.feature_transform",
    "page": "Summary and function reference",
    "title": "Images.FeatureTransform.feature_transform",
    "category": "Function",
    "text": "feature_transform(I::AbstractArray{Bool, N}, [w=nothing]) -> F\n\nCompute the feature transform of a binary image I, finding the closest \"feature\" (positions where I is true) for each location in I.  Specifically, F[i] is a CartesianIndex encoding the position closest to i for which I[F[i]] is true.  In cases where two or more features in I have the same distance from i, an arbitrary feature is chosen. If I has no true values, then all locations are mapped to an index where each coordinate is typemin(Int).\n\nOptionally specify the weight w assigned to each coordinate.  For example, if I corresponds to an image where voxels are anisotropic, w could be the voxel spacing along each coordinate axis. The default value of nothing is equivalent to w=(1,1,...).\n\nSee also: distance_transform.\n\nCitation\n\n'A Linear Time Algorithm for Computing Exact Euclidean Distance Transforms of Binary Images in Arbitrary Dimensions' Maurer et al., 2003\n\n\n\n"
},

{
    "location": "function_reference.html#Images.FeatureTransform.distance_transform",
    "page": "Summary and function reference",
    "title": "Images.FeatureTransform.distance_transform",
    "category": "Function",
    "text": "distance_transform(F::AbstractArray{CartesianIndex}, [w=nothing]) -> D\n\nCompute the distance transform of F, where each element F[i] represents a \"target\" or \"feature\" location assigned to i. Specifically, D[i] is the distance between i and F[i]. Optionally specify the weight w assigned to each coordinate; the default value of nothing is equivalent to w=(1,1,...).\n\nSee also: feature_transform.\n\n\n\n"
},

{
    "location": "function_reference.html#Morphological-operations-1",
    "page": "Summary and function reference",
    "title": "Morphological operations",
    "category": "section",
    "text": "dilate\nerode\nopening\nclosing\ntophat\nbothat\nmorphogradient\nmorpholaplace\nlabel_components\ncomponent_boxes\ncomponent_lengths\ncomponent_indices\ncomponent_subscripts\ncomponent_centroids\nfeature_transform\ndistance_transform"
},

{
    "location": "function_reference.html#Images.bilinear_interpolation",
    "page": "Summary and function reference",
    "title": "Images.bilinear_interpolation",
    "category": "Function",
    "text": "P = bilinear_interpolation(img, r, c)\n\nBilinear Interpolation is used to interpolate functions of two variables on a rectilinear 2D grid.\n\nThe interpolation is done in one direction first and then the values obtained are used to do the interpolation in the second direction.\n\n\n\n"
},

{
    "location": "function_reference.html#Interpolation-1",
    "page": "Summary and function reference",
    "title": "Interpolation",
    "category": "section",
    "text": "bilinear_interpolation"
},

{
    "location": "function_reference.html#Images.integral_image",
    "page": "Summary and function reference",
    "title": "Images.integral_image",
    "category": "Function",
    "text": "integral_img = integral_image(img)\n\nReturns the integral image of an image. The integral image is calculated by assigning to each pixel the sum of all pixels above it and to its left, i.e. the rectangle from (1, 1) to the pixel. An integral image is a data structure which helps in efficient calculation of sum of pixels in a rectangular subset of an image. See boxdiff for more information.\n\n\n\n"
},

{
    "location": "function_reference.html#Images.boxdiff",
    "page": "Summary and function reference",
    "title": "Images.boxdiff",
    "category": "Function",
    "text": "sum = boxdiff(integral_image, ytop:ybot, xtop:xbot)\nsum = boxdiff(integral_image, CartesianIndex(tl_y, tl_x), CartesianIndex(br_y, br_x))\nsum = boxdiff(integral_image, tl_y, tl_x, br_y, br_x)\n\nAn integral image is a data structure which helps in efficient calculation of sum of pixels in a rectangular subset of an image. It stores at each pixel the sum of all pixels above it and to its left. The sum of a window in an image can be directly calculated using four array references of the integral image, irrespective of the size of the window, given the yrange and xrange of the window. Given an integral image -\n\n    A - - - - - - B -\n    - * * * * * * * -\n    - * * * * * * * -\n    - * * * * * * * -\n    - * * * * * * * -\n    - * * * * * * * -\n    C * * * * * * D -\n    - - - - - - - - -\n\nThe sum of pixels in the area denoted by * is given by S = D + A - B - C.\n\n\n\n"
},

{
    "location": "function_reference.html#Integral-Images-1",
    "page": "Summary and function reference",
    "title": "Integral Images",
    "category": "section",
    "text": "integral_image\nboxdiff"
},

{
    "location": "function_reference.html#Images.gaussian_pyramid",
    "page": "Summary and function reference",
    "title": "Images.gaussian_pyramid",
    "category": "Function",
    "text": "pyramid = gaussian_pyramid(img, n_scales, downsample, sigma)\n\nReturns a  gaussian pyramid of scales n_scales, each downsampled by a factor downsample and sigma for the gaussian kernel.\n\n\n\n"
},

{
    "location": "function_reference.html#Pyramids-1",
    "page": "Summary and function reference",
    "title": "Pyramids",
    "category": "section",
    "text": "gaussian_pyramid"
},

{
    "location": "function_reference.html#Images.shepp_logan",
    "page": "Summary and function reference",
    "title": "Images.shepp_logan",
    "category": "Function",
    "text": "phantom = shepp_logan(N,[M]; highContrast=true)\n\noutput the NxM Shepp-Logan phantom, which is a standard test image usually used for comparing image reconstruction algorithms in the field of computed tomography (CT) and magnetic resonance imaging (MRI). If the argument M is omitted, the phantom is of size NxN. When setting the keyword argument highConstrast to false, the CT version of the phantom is created. Otherwise, the high contrast MRI version is calculated.\n\n\n\n"
},

{
    "location": "function_reference.html#Phantoms-1",
    "page": "Summary and function reference",
    "title": "Phantoms",
    "category": "section",
    "text": "shepp_logan"
},

{
    "location": "function_reference.html#ImageMetadata.ImageMeta",
    "page": "Summary and function reference",
    "title": "ImageMetadata.ImageMeta",
    "category": "Type",
    "text": "ImageMeta is an AbstractArray that can have metadata, stored in a dictionary.\n\nConstruct an image with ImageMeta(A, props) (for a properties dictionary props), or with Image(A, prop1=val1, prop2=val2, ...).\n\n\n\n"
},

{
    "location": "function_reference.html#ImageAxes.data",
    "page": "Summary and function reference",
    "title": "ImageAxes.data",
    "category": "Function",
    "text": "data(img::ImageMeta) -> array\n\nExtract the data from img, omitting the properties dictionary. array shares storage with img, so changes to one affect the other.\n\nSee also: properties.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageMetadata.properties",
    "page": "Summary and function reference",
    "title": "ImageMetadata.properties",
    "category": "Function",
    "text": "properties(imgmeta) -> props\n\nExtract the properties dictionary props for imgmeta. props shares storage with img, so changes to one affect the other.\n\nSee also: data.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageMetadata.copyproperties",
    "page": "Summary and function reference",
    "title": "ImageMetadata.copyproperties",
    "category": "Function",
    "text": "copyproperties(img::ImageMeta, data) -> imgnew\n\nCreate a new \"image,\" copying the properties dictionary of img but using the data of the AbstractArray data. Note that changing the properties of imgnew does not affect the properties of img.\n\nSee also: shareproperties.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageMetadata.shareproperties",
    "page": "Summary and function reference",
    "title": "ImageMetadata.shareproperties",
    "category": "Function",
    "text": "shareproperties(img::ImageMeta, data) -> imgnew\n\nCreate a new \"image,\" reusing the properties dictionary of img but using the data of the AbstractArray data. The two images have synchronized properties; modifying one also affects the other.\n\nSee also: copyproperties.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageMetadata.spatialproperties",
    "page": "Summary and function reference",
    "title": "ImageMetadata.spatialproperties",
    "category": "Function",
    "text": "spatialproperties(img)\n\nReturn a vector of strings, containing the names of properties that have been declared \"spatial\" and hence should be permuted when calling permutedims.  Declare such properties like this:\n\nimg[\"spatialproperties\"] = [\"spacedirections\"]\n\n\n\n"
},

{
    "location": "function_reference.html#Image-metadata-utilities-1",
    "page": "Summary and function reference",
    "title": "Image metadata utilities",
    "category": "section",
    "text": "ImageMeta\ndata\nproperties\ncopyproperties\nshareproperties\nspatialproperties"
},

{
    "location": "function_reference.html#ImageSegmentation.SegmentedImage",
    "page": "Summary and function reference",
    "title": "ImageSegmentation.SegmentedImage",
    "category": "Type",
    "text": "SegmentedImage type contains the index-label mapping, assigned labels, segment mean intensity and pixel count of each segment.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageSegmentation.ImageEdge",
    "page": "Summary and function reference",
    "title": "ImageSegmentation.ImageEdge",
    "category": "Type",
    "text": "edge = ImageEdge(index1, index2, weight)\n\nConstruct an edge in a Region Adjacency Graph. index1 and index2 are the integers corresponding to individual pixels/voxels (in the sense of linear indexing via sub2ind), and weight is the edge weight (measures the dissimilarity between pixels/voxels).\n\n\n\n"
},

{
    "location": "function_reference.html#ImageSegmentation.labels_map",
    "page": "Summary and function reference",
    "title": "ImageSegmentation.labels_map",
    "category": "Function",
    "text": "img_labeled = labels_map(seg)\n\nReturn an array containing the label assigned to each pixel.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageSegmentation.segment_labels",
    "page": "Summary and function reference",
    "title": "ImageSegmentation.segment_labels",
    "category": "Function",
    "text": "labels = segment_labels(seg)\n\nReturns the list of assigned labels\n\n\n\n"
},

{
    "location": "function_reference.html#ImageSegmentation.segment_pixel_count",
    "page": "Summary and function reference",
    "title": "ImageSegmentation.segment_pixel_count",
    "category": "Function",
    "text": "c = segment_pixel_count(seg, l)\n\nReturns the count of pixels that are assigned label l. If no label is supplied, it returns a Dict(label=>pixel_count) of all the labels.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageSegmentation.segment_mean",
    "page": "Summary and function reference",
    "title": "ImageSegmentation.segment_mean",
    "category": "Function",
    "text": "m = segment_mean(seg, l)\n\nReturns the mean intensity of label l. If no label is supplied, it returns a Dict(label=>mean) of all the labels.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageSegmentation.seeded_region_growing",
    "page": "Summary and function reference",
    "title": "ImageSegmentation.seeded_region_growing",
    "category": "Function",
    "text": "seg_img = seeded_region_growing(img, seeds, [kernel_dim], [diff_fn])\nseg_img = seeded_region_growing(img, seeds, [neighbourhood], [diff_fn])\n\nSegments the N-D image img using the seeded region growing algorithm and returns a SegmentedImage containing information about the segments.\n\nArguments:\n\nimg             :  N-D image to be segmented (arbitrary indices are allowed)\nseeds           :  Vector containing seeds. Each seed is a Tuple of a                      CartesianIndex{N} and a label. See below note for more                      information on labels.\nkernel_dim      :  (Optional) Vector{Int} having length N or a NTuple{N,Int}                      whose ith element is an odd positive integer representing                      the length of the ith edge of the N-orthotopic neighbourhood\nneighbourhood   :  (Optional) Function taking CartesianIndex{N} as input and                      returning the neighbourhood of that point.\ndiff_fn         :  (Optional) Function that returns a difference measure(δ)                      between the mean color of a region and color of a point\n\nnote: Note\nThe labels attached to points must be positive integers, although multiple points can be assigned the same label. The output includes a labelled array that has same indexing as that of input image. Every index is assigned to either one of labels or a special label '0' indicating that the algorithm was unable to assign that index to a unique label.\n\nExamples\n\njulia> img = zeros(Gray{N0f8},4,4);\njulia> img[2:4,2:4] = 1;\njulia> seeds = [(CartesianIndex(3,1),1),(CartesianIndex(2,2),2)];\njulia> seg = seeded_region_growing(img, seeds);\njulia> labels_map(seg)\n4×4 Array{Int64,2}:\n 1  1  1  1\n 1  2  2  2\n 1  2  2  2\n 1  2  2  2\n\n\nCitation:\n\nAlbert Mehnert, Paul Jackaway (1997), \"An improved seeded region growing algorithm\", Pattern Recognition Letters 18 (1997), 1065-1071\n\n\n\n"
},

{
    "location": "function_reference.html#ImageSegmentation.unseeded_region_growing",
    "page": "Summary and function reference",
    "title": "ImageSegmentation.unseeded_region_growing",
    "category": "Function",
    "text": "seg_img = unseeded_region_growing(img, threshold, [kernel_dim], [diff_fn])\nseg_img = unseeded_region_growing(img, threshold, [neighbourhood], [diff_fn])\n\nSegments the N-D image using automatic (unseeded) region growing algorithm and returns a SegmentedImage containing information about the segments.\n\nArguments:\n\nimg             :  N-D image to be segmented (arbitrary indices are allowed)\nthreshold       :  Upper bound of the difference measure (δ) for considering                      pixel into same segment\nkernel_dim      :  (Optional) Vector{Int} having length N or a NTuple{N,Int}                      whose ith element is an odd positive integer representing                      the length of the ith edge of the N-orthotopic neighbourhood\nneighbourhood   :  (Optional) Function taking CartesianIndex{N} as input and                      returning the neighbourhood of that point.\ndiff_fn         :  (Optional) Function that returns a difference measure (δ)                      between the mean color of a region and color of a point\n\nExamples\n\njulia> img = zeros(Gray{N0f8},4,4);\njulia> img[2:4,2:4] = 1;\njulia> seg = unseeded_region_growing(img, 0.2);\njulia> labels_map(seg)\n4×4 Array{Int64,2}:\n 1  1  1  1\n 1  2  2  2\n 1  2  2  2\n 1  2  2  2\n\n\n\n\n"
},

{
    "location": "function_reference.html#ImageSegmentation.felzenszwalb",
    "page": "Summary and function reference",
    "title": "ImageSegmentation.felzenszwalb",
    "category": "Function",
    "text": "segments                = felzenszwalb(img, k, [min_size])\nindex_map, num_segments = felzenszwalb(edges, num_vertices, k, [min_size])\n\nSegments an image using Felzenszwalb's graph-based algorithm. The function can be used in either of two ways -\n\nsegments = felzenszwalb(img, k, [min_size])\n\nSegments an image using Felzenszwalb's segmentation algorithm and returns the result as SegmentedImage. The algorithm uses euclidean distance in color space as edge weights for the region adjacency graph.\n\nParameters:\n\nimg            = input image\nk              = Threshold for region merging step. Larger threshold will result in bigger segments.\nmin_size       = Minimum segment size\n\nindex_map, num_segments = felzenszwalb(edges, num_vertices, k, [min_size])\n\nSegments an image represented as Region Adjacency Graph(RAG) using Felzenszwalb's segmentation algorithm. Each pixel/region  corresponds to a node in the graph and weights on each edge measure the dissimilarity between pixels. The function returns the number of segments and index mapping from nodes of the RAG to segments.\n\nParameters:\n\nedges          = Array of edges in RAG. Each edge is represented as ImageEdge.\nnum_vertices   = Number of vertices in RAG\nk              = Threshold for region merging step. Larger threshold will result in bigger segments.\nmin_size       = Minimum segment size\n\n\n\n"
},

{
    "location": "function_reference.html#ImageSegmentation.fast_scanning",
    "page": "Summary and function reference",
    "title": "ImageSegmentation.fast_scanning",
    "category": "Function",
    "text": "seg_img = fast_scanning(img, threshold, [diff_fn])\n\nSegments the N-D image using a fast scanning algorithm and returns a SegmentedImage containing information about the segments.\n\nArguments:\n\nimg         : N-D image to be segmented (arbitrary indices are allowed)\nthreshold   : Upper bound of the difference measure (δ) for considering                 pixel into same segment; an AbstractArray can be passed                 having same number of dimensions as that of img for adaptive                 thresholding\ndiff_fn     : (Optional) Function that returns a difference measure (δ)                 between the mean color of a region and color of a point\n\nExamples:\n\njulia> img = zeros(Float64, (3,3));\njulia> img[2,:] = 0.5;\njulia> img[:,2] = 0.6;\njulia> seg = fast_scanning(img, 0.2);\njulia> labels_map(seg)\n3×3 Array{Int64,2}:\n 1  4  5\n 4  4  4\n 3  4  6\n\nCitation:\n\nJian-Jiun Ding, Cheng-Jin Kuo, Wen-Chih Hong, \"An efficient image segmentation technique by fast scanning and adaptive merging\"\n\n\n\n"
},

{
    "location": "function_reference.html#ImageSegmentation.watershed",
    "page": "Summary and function reference",
    "title": "ImageSegmentation.watershed",
    "category": "Function",
    "text": "segments                = watershed(img, markers)\n\nSegments the image using watershed transform. Each basin formed by watershed transform corresponds to a segment. If you are using image local minimas as markers, consider using hmin_transform to avoid oversegmentation.\n\nParameters:  \n\nimg            = input grayscale image\nmarkers        = An array (same size as img) with each region's marker assigned a index starting from 1. Zero means not a marker.                     If two markers have the same index, their regions will be merged into a single region.                     If you have markers as a boolean array, use label_components.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageSegmentation.hmin_transform",
    "page": "Summary and function reference",
    "title": "ImageSegmentation.hmin_transform",
    "category": "Function",
    "text": "out = hmin_transform(img, h)\n\nSuppresses all minima in grayscale image whose depth is less than h.  \n\nH-minima transform is defined as the reconstruction by erosion of (img + h) by img. See Morphological image analysis by Soille pg 170-172.  \n\n\n\n"
},

{
    "location": "function_reference.html#ImageSegmentation.region_adjacency_graph",
    "page": "Summary and function reference",
    "title": "ImageSegmentation.region_adjacency_graph",
    "category": "Function",
    "text": "G, vert_map = region_adjacency_graph(seg, weight_fn)\n\nConstructs a region adjacency graph (RAG) from the SegmentedImage. It returns the RAG along with a Dict(label=>vertex) map. weight_fn is used to assign weights to the edges.\n\nweight_fn(label1, label2)\n\nReturns a real number corresponding to the weight of the edge between label1 and label2.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageSegmentation.rem_segment",
    "page": "Summary and function reference",
    "title": "ImageSegmentation.rem_segment",
    "category": "Function",
    "text": "new_seg = rem_segment(seg, label, diff_fn)\n\nRemoves the segment having label label and returns the new SegmentedImage. For more info, see remove_segment!\n\n\n\n"
},

{
    "location": "function_reference.html#ImageSegmentation.rem_segment!",
    "page": "Summary and function reference",
    "title": "ImageSegmentation.rem_segment!",
    "category": "Function",
    "text": "rem_segment!(seg, label, diff_fn)\n\nIn place removal of the segment having label label, replacing it with the neighboring segment having least diff_fn value.\n\nd = diff_fn(rem_label, neigh_label)\n\nA difference measure between label to be removed and its neighbors. isless must be defined for objects of the type of d.\n\nExamples\n\n    # This removes the label `l` and replaces it with the label of\n    # neighbor having maximum pixel count.\n    julia> rem_segment!(seg, l, (i,j)->(-seg.segment_pixel_count[j]))\n\n    # This removes the label `l` and replaces it with the label of\n    # neighbor having the least value of euclidian metric.\n    julia> rem_segment!(seg, l, (i,j)->sum(abs2, seg.segment_means[i]-seg.segment_means[j]))\n\n\n\n"
},

{
    "location": "function_reference.html#ImageSegmentation.prune_segments",
    "page": "Summary and function reference",
    "title": "ImageSegmentation.prune_segments",
    "category": "Function",
    "text": "new_seg = prune_segments(seg, rem_labels, diff_fn)\n\nRemoves all segments that have labels in rem_labels replacing them with their neighbouring segment having least diff_fn. rem_labels is a Vector of labels.\n\nnew_seg = prune_segments(seg, is_rem, diff_fn)\n\nRemoves all segments for which is_rem returns true replacing them with their neighbouring segment having least diff_fn.\n\nis_rem(label) -> Bool\n\nReturns true if label label is to be removed otherwise false.\n\nd = diff_fn(rem_label, neigh_label)\n\nA difference measure between label to be removed and its neighbors. isless must be defined for objects of the type of d.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageSegmentation.region_tree",
    "page": "Summary and function reference",
    "title": "ImageSegmentation.region_tree",
    "category": "Function",
    "text": "t = region_tree(img, homogeneous)\n\nCreates a region tree from img by splitting it recursively until all the regions are homogeneous.\n\nb = homogeneous(img)\n\nReturns true if img is homogeneous.\n\nExamples\n\n# img is an array with elements of type `Float64`\njulia> function homogeneous(img)\n           min, max = extrema(img)\n           max - min < 0.2\n       end\n       \njulia> t = region_tree(img, homogeneous);\n\n\n\n"
},

{
    "location": "function_reference.html#ImageSegmentation.region_splitting",
    "page": "Summary and function reference",
    "title": "ImageSegmentation.region_splitting",
    "category": "Function",
    "text": "seg = region_splitting(img, homogeneous)\n\nSegments img by recursively splitting it until all the segments are homogeneous.\n\nb = homogeneous(img)\n\nReturns true if img is homogeneous.\n\nExamples\n\n# img is an array with elements of type `Float64`\njulia> function homogeneous(img)\n           min, max = extrema(img)\n           max - min < 0.2\n       end\n\njulia> seg = region_splitting(img, homogeneous);\n\n\n\n"
},

{
    "location": "function_reference.html#Image-segmentation-1",
    "page": "Summary and function reference",
    "title": "Image segmentation",
    "category": "section",
    "text": "SegmentedImage\nImageEdge\nlabels_map\nsegment_labels\nsegment_pixel_count\nsegment_mean\nseeded_region_growing\nunseeded_region_growing\nfelzenszwalb\nfast_scanning\nwatershed\nhmin_transform\nregion_adjacency_graph\nrem_segment\nrem_segment!\nprune_segments\nregion_tree\nregion_splitting"
},

{
    "location": "function_reference.html#ImageFeatures-1",
    "page": "Summary and function reference",
    "title": "ImageFeatures",
    "category": "section",
    "text": ""
},

{
    "location": "function_reference.html#ImageFeatures.Feature",
    "page": "Summary and function reference",
    "title": "ImageFeatures.Feature",
    "category": "Type",
    "text": "feature = Feature(keypoint, orientation = 0.0, scale = 0.0)\n\nThe Feature type has the keypoint, its orientation and its scale.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageFeatures.Features",
    "page": "Summary and function reference",
    "title": "ImageFeatures.Features",
    "category": "Type",
    "text": "features = Features(boolean_img)\nfeatures = Features(keypoints)\n\nReturns a Vector{Feature} of features generated from the true values in a boolean image or from a list of keypoints.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageFeatures.Keypoint",
    "page": "Summary and function reference",
    "title": "ImageFeatures.Keypoint",
    "category": "Type",
    "text": "keypoint = Keypoint(y, x)\nkeypoint = Keypoint(feature)\n\nA Keypoint may be created by passing the coordinates of the point or from a feature.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageFeatures.Keypoints",
    "page": "Summary and function reference",
    "title": "ImageFeatures.Keypoints",
    "category": "Type",
    "text": "keypoints = Keypoints(boolean_img)\nkeypoints = Keypoints(features)\n\nCreates a Vector{Keypoint} of the true values in a boolean image or from a list of features.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageFeatures.BRIEF",
    "page": "Summary and function reference",
    "title": "ImageFeatures.BRIEF",
    "category": "Type",
    "text": "brief_params = BRIEF([size = 128], [window = 9], [sigma = 2 ^ 0.5], [sampling_type = gaussian], [seed = 123])\n\nArgument Type Description\nsize Int Size of the descriptor\nwindow Int Size of sampling window\nsigma Float64 Value of sigma used for inital gaussian smoothing of image\nsampling_type Function Type of sampling used for building the descriptor (See BRIEF Sampling Patterns)\nseed Int Random seed used for generating the sampling pairs. For matching two descriptors, the seed used to build both should be same.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageFeatures.ORB",
    "page": "Summary and function reference",
    "title": "ImageFeatures.ORB",
    "category": "Type",
    "text": "orb_params = ORB([num_keypoints = 500], [n_fast = 12], [threshold = 0.25], [harris_factor = 0.04], [downsample = 1.3], [levels = 8], [sigma = 1.2])\n\nArgument Type Description\nnum_keypoints Int Number of keypoints to extract and size of the descriptor calculated\nn_fast Int Number of consecutive pixels used for finding corners with FAST. See [fastcorners]\nthreshold Float64 Threshold used to find corners in FAST. See [fastcorners]\nharris_factor Float64 Harris factor k used to rank keypoints by harris responses and extract the best ones\ndownsample Float64 Downsampling parameter used while building the gaussian pyramid. See [gaussian_pyramid] in Images.jl\nlevels Int Number of levels in the gaussian pyramid.  See [gaussian_pyramid] in Images.jl\nsigma Float64 Used for gaussian smoothing in each level of the gaussian pyramid.  See [gaussian_pyramid] in Images.jl\n\n\n\n"
},

{
    "location": "function_reference.html#ImageFeatures.FREAK",
    "page": "Summary and function reference",
    "title": "ImageFeatures.FREAK",
    "category": "Type",
    "text": "freak_params = FREAK([pattern_scale = 22.0])\n\nArgument Type Description\npattern_scale Float64 Scaling factor for the sampling window\n\n\n\n"
},

{
    "location": "function_reference.html#ImageFeatures.BRISK",
    "page": "Summary and function reference",
    "title": "ImageFeatures.BRISK",
    "category": "Type",
    "text": "brisk_params = BRISK([pattern_scale = 1.0])\n\nArgument Type Description\npattern_scale Float64 Scaling factor for the sampling window\n\n\n\n"
},

{
    "location": "function_reference.html#Types-1",
    "page": "Summary and function reference",
    "title": "Types",
    "category": "section",
    "text": "Feature\nFeatures\nKeypoint\nKeypoints\nBRIEF\nORB\nFREAK\nBRISK"
},

{
    "location": "function_reference.html#ImageFeatures.corner_orientations",
    "page": "Summary and function reference",
    "title": "ImageFeatures.corner_orientations",
    "category": "Function",
    "text": "orientations = corner_orientations(img)\norientations = corner_orientations(img, corners)\norientations = corner_orientations(img, corners, kernel)\n\nReturns the orientations of corner patches in an image. The orientation of a corner patch is denoted by the orientation of the vector between intensity centroid and the corner. The intensity centroid can be calculated as C = (m01/m00, m10/m00) where mpq is defined as -\n\n`mpq = (x^p)(y^q)I(y, x) for each p, q in the corner patch`\n\nThe kernel used for the patch can be given through the kernel argument. The default kernel used is a gaussian kernel of size 5x5.\n\n\n\n"
},

{
    "location": "function_reference.html#Corners-1",
    "page": "Summary and function reference",
    "title": "Corners",
    "category": "section",
    "text": "corner_orientations"
},

{
    "location": "function_reference.html#ImageFeatures.random_uniform",
    "page": "Summary and function reference",
    "title": "ImageFeatures.random_uniform",
    "category": "Function",
    "text": "sample_one, sample_two = random_uniform(size, window, seed)\n\nBuilds sampling pairs using random uniform sampling.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageFeatures.random_coarse",
    "page": "Summary and function reference",
    "title": "ImageFeatures.random_coarse",
    "category": "Function",
    "text": "sample_one, sample_two = random_coarse(size, window, seed)\n\nBuilds sampling pairs using random sampling over a coarse grid.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageFeatures.gaussian",
    "page": "Summary and function reference",
    "title": "ImageFeatures.gaussian",
    "category": "Function",
    "text": "sample_one, sample_two = gaussian(size, window, seed)\n\nBuilds sampling pairs using gaussian sampling.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageFeatures.gaussian_local",
    "page": "Summary and function reference",
    "title": "ImageFeatures.gaussian_local",
    "category": "Function",
    "text": "sample_one, sample_two = gaussian_local(size, window, seed)\n\nPairs (Xi, Yi) are randomly sampled using a Gaussian distribution where first X is sampled with a standard deviation of 0.04*S^2 and then the Yi’s are sampled using a Gaussian distribution – Each Yi is sampled with mean Xi and standard deviation of 0.01 * S^2\n\n\n\n"
},

{
    "location": "function_reference.html#ImageFeatures.center_sample",
    "page": "Summary and function reference",
    "title": "ImageFeatures.center_sample",
    "category": "Function",
    "text": "sample_one, sample_two = center_sample(size, window, seed)\n\nBuilds sampling pairs (Xi, Yi) where Xi is (0, 0) and Yi is sampled uniformly from the window.\n\n\n\n"
},

{
    "location": "function_reference.html#BRIEF-Sampling-Patterns-1",
    "page": "Summary and function reference",
    "title": "BRIEF Sampling Patterns",
    "category": "section",
    "text": "random_uniform\nrandom_coarse\ngaussian\ngaussian_local\ncenter_sample"
},

{
    "location": "function_reference.html#Feature-Description-1",
    "page": "Summary and function reference",
    "title": "Feature Description",
    "category": "section",
    "text": "create_descriptor"
},

{
    "location": "function_reference.html#ImageFeatures.hamming_distance",
    "page": "Summary and function reference",
    "title": "ImageFeatures.hamming_distance",
    "category": "Function",
    "text": "distance = hamming_distance(desc_1, desc_2)\n\nCalculates the hamming distance between two descriptors.\n\n\n\n"
},

{
    "location": "function_reference.html#ImageFeatures.match_keypoints",
    "page": "Summary and function reference",
    "title": "ImageFeatures.match_keypoints",
    "category": "Function",
    "text": "matches = match_keypoints(keypoints_1, keypoints_2, desc_1, desc_2, threshold = 0.1)\n\nFinds matched keypoints using the hamming_distance function having distance value less than threshold.\n\n\n\n"
},

{
    "location": "function_reference.html#Feature-Matching-1",
    "page": "Summary and function reference",
    "title": "Feature Matching",
    "category": "section",
    "text": "hamming_distance\nmatch_keypoints"
},

{
    "location": "function_reference.html#Texture-Matching-1",
    "page": "Summary and function reference",
    "title": "Texture Matching",
    "category": "section",
    "text": ""
},

{
    "location": "function_reference.html#Gray-Level-Co-occurence-Matrix-1",
    "page": "Summary and function reference",
    "title": "Gray Level Co-occurence Matrix",
    "category": "section",
    "text": "glcm\nglcm_symmetric\nglcm_norm\nglcm_prop\nmax_prob\ncontrast\nASM\nIDM\nglcm_entropy\nenergy\ndissimilarity\ncorrelation\nglcm_mean_ref\nglcm_mean_neighbour\nglcm_var_ref\nglcm_var_neighbour"
},

{
    "location": "function_reference.html#Local-Binary-Patterns-1",
    "page": "Summary and function reference",
    "title": "Local Binary Patterns",
    "category": "section",
    "text": "lbp\nmodified_lbp\ndirection_coded_lbp\nlbp_original\nlbp_uniform\nlbp_rotation_invariant\nmulti_block_lbp"
},

{
    "location": "api_comparison.html#",
    "page": "Comparison with other image processing frameworks",
    "title": "Comparison with other image processing frameworks",
    "category": "page",
    "text": ""
},

{
    "location": "api_comparison.html#Comparison-with-other-image-processing-frameworks-1",
    "page": "Comparison with other image processing frameworks",
    "title": "Comparison with other image processing frameworks",
    "category": "section",
    "text": "The following table may be useful for people migrating from other frameworks, and for identifying missing functionality in JuliaImages. Note that there are relevant packages which have not been integrated into more general frameworks or hosted at JuliaImages (e.g., DICOM.jl, etc.); such functionality is not documented here. This table is certainly not complete, and additions/corrections are welcome.Operation JuliaImages scikit-image + NumPy Matlab (ImageProcessing + ComputerVision)\nInput/output   \nRead image file load (FileIO.jl) imread imread\nWrite image file save (FileIO.jl) imsave imwrite\nImage file metadata magickinfo (ImageMagick.jl)  imfinfo\nTest images testimage (TestImages.jl) astronaut etc. “cameraman.tif” etc\n   \nElement type and color   \nChange numeric precision float32, float64, n0f8, etc. img_as_float etc im2double etc\nChange color space HSV.(img) etc. rgb2hsv etc. rgb2lab etc.\nWhitepoint adjustment map whitebalance (Colors.jl)  makecform\nHigh dynamic range   tonemap\n   \nIntensity & quantization   \nClamping clamp01, clamp01nan  \nLinear scaling scaleminmax, scalesigned, etc. rescale_intensity imadjust\nNonlinear scaling adjust_gamma, imstretch adjust_gamma imadjust\nCompute histogram imhist histogram imhist\nHistogram equalization histeq equalize_hist histeq\nAdaptive equalization clahe equalize_adapthist adapthisteq\nReference histogram matching histmatch  imhistmatch\nQuantization map anonymous function  imquantize\nThreshold estimation  threshold_otsu etc. graythresh etc.\n   \nVisualization and interactivity   \nVisualization imshow (ImageView.jl) imshow imshow, implay, etc.\nContrast adjustment ImageView.jl  imcontrast\nPixel information ImageView.jl  impixelinfo\nDistance measurement   imdistline\nText display of region   impixelregion\nZooming/scrolling ImageView.jl and GtkUtilities.jl imshow imscrollpanel etc.\nInteractive colormap   imcolormaptool\nRegion selection  RecatangleTool etc. imrect, imellipse, imfreehand, etc.\nImage comparison colorview  imshowpair, imfuse\nLabel colorization IndirectArray, ColorizedArray label2rgb label2rgb\n   \nAnnotation   \nDraw lines line, line! (ImageDraw.jl) line, polygon line (visualization only)\nDraw circles/ellipses circle!, ellipse! (ImageDraw.jl) circle, ellipse viscircles (visualization only)\n   \nTransformations   \nResize imresize, restrict resize imresize\nImage pyramids gaussian_pyramid (or use restrict) pyramid_gaussian etc. impyramid\nRotate warp rotate imrotate\nTranslate warp  imtranslate\nGeneral geometric transformation warp warp imwarp\nHough transform  hough_circle, etc. hough\nRadon transform  radon, iradon radon, iradon\nDistance transform feature_transform, distance_transform  bwdist, graydist\n   \nRegistration   \n   \nStatistics and image comparison   \nImage differences ssd, sad, etc.  immse, ssim\nMin/max/mean minfinite, maxfinite, meanfinite  nanmax, etc.\nEntropy entropy  entropy\n   \nFiltering and padding   \nLinear filtering imfilter gaussian, etc. imfilter\nMedian/max/quantile filtering mapwindow median/max etc. nlfilter, medfilt2, etc.\nOther nonlinear filtering (e.g., std) mapwindow  nlfilter, stdfilt\nGradients imgradients sobel_h etc. imgradientxy etc.\nIntegral image integral_image integral_image integralImage\nPadding padarray pad padarray\nDeconvolution weiner (Deconvolution.jl) richardson_lucy, weiner, etc. deconvlucy, deconvwnr, etc.\n   \nFeatures   \nEdge detection imedge, canny canny edge\nCorner detection imcorner, fastcorners corner_harris etc. detectFASTFeatures\nBlob detection blob_LoG blob_log etc. \nLocal binary patterns lbp etc. (ImageFeatures.jl) local_binary_pattern extractLBPFeatures\nHistogram of oriented gradients  hog extractHOGFeatures\nGray-level co-occurence glcm etc. (ImageFeatures.jl) greycomatrix graycomatrix\nPoint descriptors BRIEF, ORB, etc. (ImageFeatures.jl) BRIEF, ORB, etc. detectBRISK etc.\nFeature matching match_keypoints (ImageFeatures.jl) match_descriptors matchFeatures\n   \nSegmentation   \nConnected components label_components label bwconncomp, bwlabel\nForeground/background  active_contour activecontour\nClustering kmeans, fuzzy_cmeans, mean_shift quickshift, slic \nMarker segmentation seeded_region_growing random_walker imsegfmm\nWatershed watershed watershed watershed\n   \nMorphological operations   \nDilation dilate dilation, binary_dilation imdilate\nErosion erode  \nOpening opening opening imopen\nClosing closing closing imclose\nTop-hat filtering tophat tophat etc. imtophat\nBottom-hat filtering bothat bottomhat imbothat\nRegional max/min mapwindow filters.rank.maximum etc. imregionalmax etc.\nConvex hull  convex_hull_image bwconvhull\nBorders  clear_border imclearborder\nBoundaries  find_boundaries boundarymask\nFilling  remove_small_holes imfill, regionfill"
},

]}