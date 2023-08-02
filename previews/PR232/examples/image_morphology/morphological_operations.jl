using Images, Noise, ImageMorphology
using ImageBinarization
using ImageDraw
using TestImages

img_src = testimage("morphology_test_512")

img_input = binarize(Gray.(img_src), UnimodalRosin()) .> 0.5

Gray.(img_input)

cordinates = convexhull(img_input)
img_convex = RGB.(copy(img_input))
push!(cordinates, cordinates[1])
draw!(img_convex, Path(cordinates), RGB(1))
img_convex

img_noise = salt_pepper(img_input, 0.5)
fill_image_1 = imfill(img_noise, (0.1, 1))
fill_image_2 = imfill(img_noise, (0.1, 10)) # this configuration gets us best results
fill_image_3 = imfill(img_noise, (1, 10))
fill_image_4 = imfill(img_noise, (5, 20)) # objects of smaller sizes gets left out
Gray.([img_noise fill_image_1 fill_image_2 fill_image_3 fill_image_4])

img_thinning = thinning(img_input, algo = GuoAlgo());
Gray.([img_input img_thinning])

cleared_img_1 = clearborder(img_input, 20); # 20 is the width of border that's examined
cleared_img_2 = clearborder(img_input, 30); # notice how it remove the inner circle even if it's outside its range
cleared_img_3 = clearborder(img_input, 30, 1);

Gray.([img_input cleared_img_1 cleared_img_2 cleared_img_3])

# This file was generated using Literate.jl, https://github.com/fredrikekre/Literate.jl

