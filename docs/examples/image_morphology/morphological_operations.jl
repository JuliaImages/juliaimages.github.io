# ---
# title: Convex Hull, Filling, Thinning, ClearBorder
# author: Ashwani Rathee
# date: 2021-7-4
# ---

# In this demonstration, we will be covering morphological operations like
# convexhull, image thinning, hole filling and border clearing.

using Images, Noise, ImageMorphology
using ImageBinarization
using ImageDraw
using TestImages

img_src = testimage("morphology_test_512")

# Thresholding of image

img_input = binarize(Gray.(img_src), UnimodalRosin()) .> 0.5

# This is the image that we will be using throughout this demonstration
# in its boolean form as below mentioned operations are applied on binary images. 

Gray.(img_input)

# ## Convex Hull

# Convex Hull operation outputs outer most cover-like boundary of a binary image and 
# returns the vertices of convex hull as a CartesianIndex array.

cordinates = convexhull(img_input)
img_convex = RGB.(copy(img_input))
push!(cordinates, cordinates[1])
draw!(img_convex, Path(cordinates), RGB(1))
img_convex

# ## Image Filling

# Image filling operation finds connected components of an image using `flood-fill 
# algorithm` and operation gives result image after filling objects that falls in the 
# range of interval specified.

# For filling objects, represent the holes(part to be filled) with `true` in your array. Meaning color RGB(1)/black

# `imfill(img, interval, value, connectivity)` require a `boolean` array, `interval` is a tuple `(a,b)` that specifies the
# range of values to be filled, the objects of size in this range will be filled with `false` . `connectivity`
# takes the same values as in label_components (Default value is `1:ndims(img)``)

img_noise = salt_pepper(img_input, 0.5)
fill_image_1 = imfill(img_noise, (0.1, 1)) 
fill_image_2 = imfill(img_noise, (0.1, 10)) # this configuration gets us best results
fill_image_3 = imfill(img_noise, (1, 10)) 
fill_image_4 = imfill(img_noise, (5, 20)) # objects of smaller sizes gets left out
Gray.([img_noise fill_image_1 fill_image_2 fill_image_3 fill_image_4])

# ## Image thinning

# Thinning operation applies a binary blob thinning operation to achieve a skeletization of the input image. 
# Guo Algorithm, decides which pixels to keep and which to remove using 3 rules given in original paper.

img_thinning = thinning(img_input, algo = GuoAlgo());
Gray.([img_input img_thinning])

# ## Clear Border

# Clearborder method can be used to clear objects connected to the border of the image.

# `clearborder(img, width, background)` can be used upon binary/grayscale input image
# on a `width` pixel wide border(`Default is 1 pixel`). `background` is the value that is given
# to pixels that are cleared(`Default is 0, black color`)

cleared_img_1 = clearborder(img_input, 20); # 20 is the width of border that's examined
cleared_img_2 = clearborder(img_input, 30); # notice how it remove the inner circle even if it's outside its range
cleared_img_3 = clearborder(img_input, 30, 1);
# Default color for removal is 0 meaning remove `RGB(0)` but now since it's 1 it's clears the whole image due to flood fill algorithm
Gray.([img_input cleared_img_1 cleared_img_2 cleared_img_3])
