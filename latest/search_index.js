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
    "text": "JuliaImages (source code) hosts the major Julia packages for image processing. Julia is well-suited to image processing because it is a modern and elegant high-level language that is a pleasure to use, while also allowing you to write \"inner loops\" that compile to efficient machine code (i.e., it is as fast as C).  Julia supports multithreading and, through add-on packages, GPU processing.JuliaImages is a collection of packages specifically focused on image processing.  It is not yet as complete as some toolkits for other programming languages, but it has many useful algorithms.  It is focused on clean architecture and is designed to unify \"machine vision\" and \"biomedical 3d image processing\" communities.These pages are designed to help you get started with image analysis in Julia.Pages = [\"install.md\", \"quickstart.md\", \"arrays_colors.md\", \"conversions_views.md\", \"indexing.md\", \"imageaxes.md\", \"imagefiltering.md\", \"imagemetadata.md\"]"
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
    "text": "For most purposes, any AbstractArray can be treated as an image. For example,using Images\n\nimg = rand(640,480)               # a random Float64 image\nimg = rand(RGB{N0f8}, 256, 256)   # a random RGB image, 8 bits per channel\n# select a region-of-interest from a larger image\nimgc = img[200:245, 17:42]        # makes a copy\nimgv = @view img[200:245, 17:42]  # makes a view\n# an image that starts small in the upper left and gets large in the lower right:\nimg = reshape(linspace(0,1,10^4), 100, 100)\n# a 3d box image\nimg = zeros(128, 128, 80)\nimg[20:100, 20:100, 10:70] = 1Some add-on packages enable additional behavior. For example,using Images, Unitful, AxisArrays\n\nimg = AxisArray(rand(256, 256, 100, 50), (:x, :y, :z, :time), (0.4mm, 0.4mm, 1mm, 2s))defines a 4d image (3 space dimensions plus one time dimension) with the specified name and physical pixel spacing for each coordinate. The AxisArrays package supports rich and efficient operations on such arrays.JuliaImages interoperates smoothly with AxisArrays and many other packages.  As further examples,the ImageMetadata package (incorporated into Images itself) allows you to \"tag\" images with custom metadata\nthe IndirectArrays package supports indexed (colormap) images\nthe MappedArrays package allows you to represent lazy value-transformations, facilitating work with images that may be too large to store in memory at once\nImageTransformations allows you to encode rotations, shears, etc., either eagerly or lazilyIt is very easy to define new array types in Julia–and consequently specialized images or operations–and have them interoperate smoothly with the vast majority of functions in JuliaImages."
},

{
    "location": "quickstart.html#Colors,-the-0-to-1-intensity-scale,-and-views-1",
    "page": "Quickstart",
    "title": "Colors, the 0-to-1 intensity scale, and views",
    "category": "section",
    "text": "In JuliaImages, by default all images are displayed assuming that 0 means \"black\" and 1 means \"white\" or \"saturated\" (the latter applying to channels of an RGB image).  Perhaps surprisingly, this 0-to-1 convention applies even when the intensities are encoded using only 8-bits per color channel.  JuliaImages uses a special type, N0f8, that interprets an 8-bit \"integer\" as if it had been scaled by 1/255, thus encoding values from 0 to 1 in 256 steps.  N0f8 numbers (standing for Normalized, with 0 integer bits and 8 fractional bits) obey standard mathematical rules, and can be added, multiplied, etc. There are types like N0f16 for working with 16-bit images (and even N2f14 for images acquired with a 14-bit camera, etc.).This infrastructure allows us to unify \"integer\" and floating-point images, and avoids the need for special conversion functions that change the value of pixels when your main goal is simply to change the type (numeric precision and properties) used to represent the pixel.Because images are just arrays, some environments (e.g., IJulia/Jupyter) will display numeric arrays as arrays (using a text representation) but will display 2d arrays that have Colorant elements as images.  You can \"convert\" in the following ways:img = colorview(Gray, rand(8, 8))          # encodes as Gray{Float64}, so displays as image\nimg = colorview(RGB, rand(3, 8, 8))        # encodes as a 2d RGB{Float64} array\nimg = colorview(RGB, rand(N0f8, 3, 8, 8))  # uses only 8 bits per channel\n# The following two \"convert\" between representation as an 8-bit RGB\n# image and as a 3×m×n UInt8 array\nimg = colorview(RGB, ufixedview(A))\nA = rawview(channelview(rand(RGB{N0f8}, 8, 8)))All of these \"conversions\" actually create views, meaning that no copies of the underlying storage are made unless you call copy on the result."
},

{
    "location": "quickstart.html#Default-orientation-and-storage-order-1",
    "page": "Quickstart",
    "title": "Default orientation and storage order",
    "category": "section",
    "text": "Images are \"vertical-major,\" meaning that when the image is displayed the first index corresponds to the vertical axis. Note that by default, in Julia the first index is also the fastest (i.e., has adjacent storage in memory).You can use permuteddimsview to \"reinterpret\" the orientation of a chunk of memory without making a copy, or permutedims if you want a copy."
},

{
    "location": "quickstart.html#Function-categories-1",
    "page": "Quickstart",
    "title": "Function categories",
    "category": "section",
    "text": "See the Function reference for more information about each of these. The list below is accessible via ?Images from the Julia REPL.Constructors, conversions, and traits:- Construction: use constructors of specialized packages, e.g., `AxisArray`, `ImageMeta`, etc.\n- \"Conversion\": `colorview`, `channelview`, `rawview`, `ufixedview`, `permuteddimsview`\n- Traits: `pixelspacing`, `sdims`, `timeaxis`, `timedim`, `spacedirections`Contrast/coloration:- `clamp01`, `clamp01nan`, `scaleminmax`, `colorsigned`, `scalesigned`Algorithms:- Reductions: `maxfinite`, `maxabsfinite`, `minfinite`, `meanfinite`, `sad`, `ssd`, `integral_image`, `boxdiff`, `gaussian_pyramid`\n- Resizing: `restrict`, `imresize` (not yet exported)\n- Filtering: `imfilter`, `imfilter_fft`, `imfilter_gaussian`, `imfilter_LoG`, `imROF`, `ncc`, `padarray`\n- Filtering kernels: `ando[345]`, `guassian2d`, `imaverage`, `imdog`, `imlaplacian`, `prewitt`, `sobel`\n- Exposure : `imhist`, `histeq`, `adjust_gamma`, `histmatch`, `imadjustintensity`, `imstretch`, `imcomplement`, `clahe`, `cliphist`\n- Gradients: `backdiffx`, `backdiffy`, `forwarddiffx`, `forwarddiffy`, `imgradients`\n- Edge detection: `imedge`, `imgradients`, `thin_edges`, `magnitude`, `phase`, `magnitudephase`, `orientation`, `canny`\n- Corner detection: `imcorner`, `harris`, `shi_tomasi`, `kitchen_rosenfeld`, `meancovs`, `gammacovs`, `fastcorners`\n- Blob detection: `blob_LoG`, `findlocalmaxima`, `findlocalminima`\n- Morphological operations: `dilate`, `erode`, `closing`, `opening`, `tophat`, `bothat`, `morphogradient`, `morpholaplace`\n- Connected components: `label_components`, `component_boxes`, `component_lengths`, `component_indices`, `component_subscripts`, `component_centroids`\n- Interpolation: `bilinear_interpolation`Test images and phantoms (see also TestImages.jl):- `shepp_logan`See also the excellent ImageFeatures package, which supports a number of algorithms important for computer vision."
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
    "text": "c24 does not have an r field, but we can still use red to extract the red channel:julia> r = red(c24)\n0.757N0f8This may look fairly strange at first, so let's unpack this carefully. Notice first that the \"floating-point\" portion of this number matches (to within the precision of the rounding) the value of red(c). The N0f8 means \"Normalized with 8 fractional bits, with 0 bits left for representing values higher than 1.\" This is a fixed-point number–-rather like floating-point numbers, except that the decimal does not \"float\". Internally, these are represented in terms of the 8-bit unsigned integer UInt8julia> dump(r)\nFixedPointNumbers.UFixed{UInt8,8}\n  i: UInt8 193(Note that N0f8 is an abbreviation; the full typename is UFixed{UInt8, 8}.) N0f8 interprets this 8-bit integer as a value lying between 0 and 1, with 0 corresponding to 0x00 and 1 corresponding to 0xff. This interpretation affects how the number is used for arithmetic and conversion to and from other values. Stated another way, r behaves asjulia> r == 193/255\ntruefor essentailly all purposes (but see A note on arithmetic overflow).This has a very important consequence: in many other image frameworks, the \"meaning\" of an image depends on how it is stored, but in Julia the meaning can be assigned independently of storage representation. In some other frameworks, if your image is stored with floating-point numbers, then \"white\" corresponds to all color channels having the value 1.0; conversely, if it is stored with unsigned 8-bit integers, then \"white\" corresponds to values of 255. In most number systems we would agree that 255 != 1.0, and this fact means that you sometimes need to be quite careful when converting from one representation to another.  Conversely, using these Julia packages there is no discrepancy in \"meaning\" between the encoding of images represented as floating point or 8-bit (or 16-bit) fixed-point numbers: 0 always means \"black\" and 1 always means \"white\" or \"saturated.\"Now, this doesn't prevent you from constructing pixels with values out of this range:(Image: saturated_spectrum)Notice that the first two yellows look identical, because both the red and green color channels are 1 or higher and consequently are saturated.However, you should be aware that for integer inputs, the default is to use the N0f8 element type, and this type cannot represent values outside the range from 0 to 1:julia> RGB(8,2,0)\nERROR: ArgumentError: (8,2,0) are integers in the range 0-255, but integer inputs are encoded with the N0f8\n  type, an 8-bit type representing 256 discrete values between 0 and 1.\n  Consider dividing your input values by 255, for example: RGB{N0f8}(8/255,2/255,0/255)\n  See the READMEs for FixedPointNumbers and ColorTypes for more information.\n in throw_colorerror(::Type{FixedPointNumbers.UFixed{UInt8,8}}, ::Tuple{Int64,Int64,Int64}) at /home/tim/.julia/v0.5/ColorTypes/src/types.jl:639\n in throw_colorerror(::Type{FixedPointNumbers.UFixed{UInt8,8}}, ::Int64, ::Int64, ::Int64) at /home/tim/.julia/v0.5/ColorTypes/src/types.jl:608\n in checkval at /home/tim/.julia/v0.5/ColorTypes/src/types.jl:596 [inlined]\n in ColorTypes.RGB{FixedPointNumbers.UFixed{UInt8,8}}(::Int64, ::Int64, ::Int64) at /home/tim/.julia/v0.5/ColorTypes/src/types.jl:90\n in ColorTypes.RGB{T<:Union{AbstractFloat,FixedPointNumbers.FixedPoint}}(::Int64, ::Int64, ::Int64) at /home/tim/.julia/v0.5/ColorTypes/src/types.jl:437The error message here reminds you how to resolve a common mistake, trying to construct red as RGB(255, 0, 0). In Julia, that should always be RGB(1, 0, 0)."
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
    "text": "Arrays, Numbers, and Colors also introduced the fixed-point numbers used in some representations of color (or grayscale) information. If you want to switch representation, you can use the reinterpret function:julia> using FixedPointNumbers\n\njulia> x = 0.5N0f8\n0.502N0f8\n\njulia> y = reinterpret(x)  # alternatively, use: reinterpret(UInt8, x)\n0x80\n\njulia> reinterpret(N0f8, y)\n0.502N0f8You can apply this to arrays:julia> a = [0.2N0f8, 0.8N0f8]\n2-element Array{FixedPointNumbers.UFixed{UInt8,8},1}:\n 0.2N0f8\n 0.8N0f8\n\njulia> b = reinterpret.(a)\n2-element Array{UInt8,1}:\n 0x33\n 0xccBecause of the f.(a) call, b does not share memory with a:julia> b[2] = 0xff\n0xff\n\njulia> a\n2-element Array{FixedPointNumbers.UFixed{UInt8,8},1}:\n 0.2N0f8\n 0.8N0f8Often this might not be a problem, but sometimes you might wish that these referenced the same underlying object.  For such situations, JuliaImages, through the ImageCore package (which is bundled with Images), implements views that can perform this reinterpretation:julia> using Images\n\njulia> v = rawview(a)\n2-element Array{UInt8,1}:\n 0x33\n 0xcc\n\njulia> v[2] = 0xff\n0xff\n\njulia> a\n2-element Array{FixedPointNumbers.UFixed{UInt8,8},1}:\n 0.2N0f8\n 1.0N0f8The opposite transformation is ufixedview:julia> c = [0x11, 0x22]\n2-element Array{UInt8,1}:\n 0x11\n 0x22\n\njulia> ufixedview(c)\n2-element Array{FixedPointNumbers.UFixed{UInt8,8},1}:\n 0.067N0f8\n 0.133N0f8ufixedview allows you to pass the interpreted type as the first argument, i.e., ufixedview(N0f8, A), and indeed it's required to do so unless A has element type UInt8, in which case ufixedview assumes you want N0f8.Like reshape, both rawview and ufixedview might return an Array or a more complicated type (a MappedArray from the MappedArrays package), depending on the types of the inputs."
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
    "text": "When Julia displays an array as text, there is usually a 1-line summary at the top showing the array type. You may have already noticed that JuliaImages uses an unconventional syntax for summarizing information about certain kinds of arrays. For example, the type of pv above isBase.PermutedDimsArrays.PermutedDimsArray{Float64,2,(2,1),(2,1),Array{Float64,2}}but when you display such an object, in the summary line it prints aspermuteddimsview(::Array{Float64,2}, (2,1)) with element type Float64This is intended to result in more easily-readable information about types.The main motivation for this is that different view types can be combined freely, and when you do so sometimes the type gets quite long. For example, suppose you have a disk file storing a m×n×3×t UInt8 array representing an RGB movie (t being the time axis). To have it display as an RGB movie, you might create the following view of the array A:mov = colorview(RGB, ufixedview(permuteddimsview(A, (3,1,2,4))))If you show mov at the REPL, the summary prints like this:ColorView{RGB}(ufixedview(N0f8, permuteddimsview(::Array{UInt8,4}, (3,1,2,4)))) with element type ColorTypes.RGB{FixedPointNumbers.UFixed{UInt8,8}}which may be somewhat easier to read than the type:ImageCore.ColorView{ColorTypes.RGB{FixedPointNumbers.UFixed{UInt8,8}},3,MappedArrays.MappedArray{FixedPointNumbers.UFixed{UInt8,8},4,Base.PermutedDimsArrays.PermutedDimsArray{UInt8,4,(3,1,2,4),(2,3,1,4),Array{UInt8,4}},ImageCore.##29#30{FixedPointNumbers.UFixed{UInt8,8}},Base.#reinterpret}}While there is little or no performance cost to making use of JuliaImage's convenient views, sometimes the types can get complicated! The strategy adopted here is to ShowItLikeYouBuildIt."
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
    "text": "(Note: this depends on the not-yet-integrated ImageTransformations.jl)Consider the following pair of images:col col\n(Image: cameraman) (Image: cameraman)You might guess that the one on the right is a rotated version of the one on the left. But, what is the angle? Is there also a translation?A \"low tech\" way to test this is to rotate and shift the image on the right until it seems aligned with the one on the left. We could overlay the two images (Using colorview to make color overlays) to see how well we're doing.# Define the transformation, using CoordinateTransformations\n# We're rotating around the center of img\njulia> tfm = recenter(RotMatrix(pi/8), center(img))\nAffineMap([0.92388 -0.382683; 0.382683 0.92388], [88.7786,-59.3199])\n\n# Apply it to the image\njulia> imgrot = warp(img, tfm);\n\njulia> summary(img)\n\"386×386 Array{Gray{N0f8},2}\"\n\njulia> summary(imgrot)\n\"-59:446×-59:446 OffsetArray{Gray{Float64},2}\"While img has indices that start with the conventional 1, the summary of imgrot reports that it has indices (-59:446, -59:446). This means that the first element of imgrot is indexed with imgrot[-59,-59] and the last element with imgrot[446,446].What is the meaning of these indices that extend beyond those of the original array in both directions? Displaying the rotated image–-especially when overlaid on the original–-reveals why:# Create a padded version of the original with the same indices as imgrot\njulia> img0 = similar(imgrot);\n\njulia> fill!(img0, 0);\n\n# Copy the original image into the same index location\njulia> img0[1:386, 1:386] = img;  # or write as img0[indices(img)...] = img\n\n# Create the overlay\njulia> imgov = colorview(RGB, img0, imgrot, zeroarray)(Image: rot_overlay)The padding on all sides of the array leaves space for the fact that the rotated image (green) contains some pixels out of the region covered by the original image (red).  The fact that Julia allows these indices to be negative means that we have no trouble adding appropriate \"padding\" to the original image: we just copy the original over to the padded array, using its original indices.We can test whether this rotation aligns well with the original unrotated image at the top of this page:julia> img0[indices(imgref)...] = imgref;  # imgref is the image on the left, top of page\n\njulia> imgov = colorview(RGB, img0, imgrot, zeroarray);(Image: ref_overlay)The fact that the overlapping portion looks yellow–-the combination of red and green–-indicates that we have perfect alignment.You can learn more about Julia's support for arbitrary indices at ??. (to be written)"
},

{
    "location": "indexing.html#Keeping-track-of-orientation-with-named-axes-1",
    "page": "Arrays: more advanced indexing",
    "title": "Keeping track of orientation with named axes",
    "category": "section",
    "text": "Suppose you are presented with a 3-dimensional grayscale image. Is this a movie (2d over time), or a 3d image (x, y, and z)? In such situations, one of the best ways to keep yourself oriented is by naming the axes.julia> using Images, TestImages\n\njulia> img = testimage(\"mri\");\n\n# Create a \"labeled image\"\njulia> imgl = AxisArray(img, :A, :R, :S)\n3-dimensional AxisArray{ColorTypes.Gray{FixedPointNumbers.UFixed{UInt8,8}},3,...} with axes:\n    :A, Base.OneTo(226)\n    :R, Base.OneTo(186)\n    :S, Base.OneTo(27)\nAnd data, a 226×186×27 Array{ColorTypes.Gray{FixedPointNumbers.UFixed{UInt8,8}},3}:\n[:, :, 1] =\n Gray{U8}(0.0)  Gray{U8}(0.0)  Gray{U8}(0.0)  Gray{U8}(0.0)  …  Gray{U8}(0.0)  Gray{U8}(0.0)  Gray{U8}(0.0)  Gray{U8}(0.0)\n Gray{U8}(0.0)  Gray{U8}(0.0)  Gray{U8}(0.0)  Gray{U8}(0.0)     Gray{U8}(0.0)  Gray{U8}(0.0)  Gray{U8}(0.0)  Gray{U8}(0.0)\n...Here we used the AxisArrays package to name our axes in terms of the RAS coordinate system (Right, Anterior, Superior) as commonly used in magnetic resonance imaging.We can use this coordinate system to help with visualization. Let's look at a \"horizontal slice,\" one perpendicular to the superior-inferior axis (i.e., a slice with constant S value):(Image: Sslice)From the summary you can see that the slice has just the :A and :R axes remaining.We could slice along the R and A axes too, although for this image (which is sampled very anisotropically) they are not as informative.The ImageAxes and ImageMetadata packages add additional functionality to AxisArrays that may be useful when you need to encode more information about your image."
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
    "text": "You typically create an ImageMeta using keyword arguments:julia> using Colors, ImageMetadata\n\njulia> img = ImageMeta(fill(RGB(1,0,0), 3, 2), date=Date(2016, 7, 31), time=\"high noon\")\nRGB ImageMeta with:\n  data: 3×2 Array{ColorTypes.RGB{FixedPointNumbers.UFixed{UInt8,8}},2}\n  properties:\n    time: high noon\n    date: 2016-07-31DocTestSetup = quote\n    using Colors, ImageMetadata\n    img = ImageMeta(fill(RGB(1,0,0), 3, 2), date=Date(2016, 7, 31), time=\"high noon\")\nendYou can then index elements of img like this:julia> img[1,2]\nRGB{U8}(1.0,0.0,0.0)and access and set properties like this:julia> img[\"time\"]\n\"high noon\"\n\njulia> img[\"time\"] = \"evening\"\n\"evening\"\n\njulia> img\nRGB ImageMeta with:\n  data: 3×2 Array{ColorTypes.RGB{FixedPointNumbers.UFixed{UInt8,8}},2}\n  properties:\n    time: evening\n    date: 2016-07-31You can extract the data matrix with data(img):julia> data(img)\n3×2 Array{ColorTypes.RGB{FixedPointNumbers.UFixed{UInt8,8}},2}:\n RGB{U8}(1.0,0.0,0.0)  RGB{U8}(1.0,0.0,0.0)\n RGB{U8}(1.0,0.0,0.0)  RGB{U8}(1.0,0.0,0.0)\n RGB{U8}(1.0,0.0,0.0)  RGB{U8}(1.0,0.0,0.0)and the properties dictionary with properties:julia> properties(img)\nDict{String,Any} with 2 entries:\n  \"time\" => \"high noon\"\n  \"date\" => 2016-07-31Properties are not accessed or modified by most of Images' algorithms–-the traits that most affect processing are encoded through Julia's type system.  However, functions that receive an ImageMeta should return an ImageMeta when appropriate. Naturally, in your own code it's fine to use properties to your advantage for custom tasks."
},

{
    "location": "imagemetadata.html#getindexim/viewim-1",
    "page": "ImageMetadata.jl",
    "title": "getindexim/viewim",
    "category": "section",
    "text": "As with the rest of julia, img[i,j,...] will return just the values in an ImageMeta; the properties dictionary is \"left behind.\" You can ensure that the return is also an ImageMeta using getindexim instead of getindex (img[i,j] gets converted into getindex(img, i, j), hence the name):julia> c = getindexim(img, 1:2, 1:2)\nRGB ImageMeta with:\n  data: 2×2 Array{ColorTypes.RGB{FixedPointNumbers.UFixed{UInt8,8}},2}\n  properties:\n    time: high noon\n    date: 2016-07-31This copies both the data (just the relevant portions) and the properties dictionary. In contrast,julia> v = viewim(img, 1:2, 1:2)\nRGB ImageMeta with:\n  data: 2×2 SubArray{ColorTypes.RGB{FixedPointNumbers.UFixed{UInt8,8}},2,Array{ColorTypes.RGB{FixedPointNumbers.UFixed{UInt8,8}},2},Tuple{UnitRange{Int64},UnitRange{Int64}},false}\n  properties:\n    time: high noon\n    date: 2016-07-31shares both the data and the properties with the original image img. Modifying values or properties in c has no impact on img, but modifying values or properties in v does."
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
