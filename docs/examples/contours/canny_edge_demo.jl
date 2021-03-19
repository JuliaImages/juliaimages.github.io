# ---
# cover: assets/canny.gif
# title: Canny Edge Detection
# author: Ashwani Rathee
# date: 2021-2-1
# ---


# Canny filter is a multi-stage edge detector. It uses a filter based on the 
# derivative of a Gaussian to compute the intensity of the gradients.
# The Gaussian reduces the effect of noise present in the image. Then, potential
# edges are thinned down to 1-pixel curves by removing non-maximum pixels of 
# the gradient magnitude. Finally, edge pixels are kept or removed using hysteresis
# thresholding on the gradient magnitude.

# Canny has three adjustable parameters: the width of the Gaussian (the noisier
# the image, the greater the width), and the low and high threshold for the 
# hysteresis thresholding.

# Importing Packages

using ImageTransformations
using ImageCore
using TestImages
using CoordinateTransformations
using Rotations
using ImageFiltering
using ImageEdgeDetection
using Noise

# For most purposes, any AbstractArray can be treated as an image.
# For example, the numeric array can be interpreted as a grayscale image.

# First, we create our test image.

img_gray = zeros(Gray{Float64}, 200, 200)
img_gray[50:150, 50:150] .= 1
img_gray #hide #md

# Creates a basic image.

# Now, we rotate our image by pi/4.

# First, we need to define the transformation and then implement it with
# warp function in ImageTransformations.jl

tfm = recenter(RotMatrix(pi / 4), center(img_gray))
img_rot = warp(img_gray, tfm)

# Now, we blur our image with a Gaussian filter with sigma=2

img_gauss = imfilter(img_rot, Kernel.gaussian(2))

# Now, let's add random noise which makes our canny edge detection 
# function works a little harder since the canny filter is based on the idea of finding gradients.

# We use salt_pepper filter from noise.jl, salt, and pepper noise in general 
# is a noise that modifies a pixel with two different values of noise. 
# Usually it sets randomly black and white spots on the image.

img_noise = salt_pepper(img_gauss, 0.05, salt_prob = 0, pepper = 0.9)

# We will now compute the canny filter values for 2 different values of
# sigma(sigma=1,sigma=3),`spatial_scale` can be used to specify sigma.

# Suppose one wants to mark the edges in an image.
# This can be achieved by simply choosing an appropriate algorithm 
# and calling `detect_edges` or `detect_edges!` in the image.

# Canny hysteresis thresholds can be controlled by setting 
# appropriate keyword parameters.

algo_sigma1 = Canny(
    spatial_scale = 1,
    high = ImageEdgeDetection.Percentile(80),
    low = ImageEdgeDetection.Percentile(20),
);
algo_sigma3 = Canny(
    spatial_scale = 5,
    high = ImageEdgeDetection.Percentile(80),
    low = ImageEdgeDetection.Percentile(20),
);

# Let's now compute the results with the `detect_edges` function

img_edges1 = detect_edges(img_noise, algo_sigma1);
img_edges3 = detect_edges(img_noise, algo_sigma3);

# Let's see how we created the images and the results in a single view 
# with `mosaicview from [MosaicViews.jl](https://github.com/JuliaArrays/MosaicViews.jl), which is re-exported by `ImageCore.jl`.

mosaicview(img_gray, img_rot, img_gauss, img_noise, img_edges1, img_edges3; nrow = 1)
save("assets/canny.gif",cat(img_gray, img_rot, img_gauss, img_noise, img_edges1, img_edges3;dims=3)) #src
# From left to right: initial gray image,rotated image,blurred image,image with 
# random noise,resulting images with edges detected sigma = 1,edge detected image with sigma = 3
