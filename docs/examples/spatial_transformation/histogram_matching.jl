
# ---
# cover: assets/chelsea.gif
# title: Histogram Matching
# author: Ashwani Rathee
# date: 2020-11-21
# ---


# This demo demonstrates the feature of histogram matching.


# Purpose of Histogram matching is to transform the intensities in a source image so that the intensities distribute according to the histogram of a specified target image. 

# Here, histogram matching is shown for the RGB image. But, it can also be applied on 
# Grayscale images too. Histogram matching can be used to normalize two images when the images 
# were acquired at the same local illumination (such as shadows) over the same location,
# but by different sensors, atmospheric conditions, or global illumination. 


# Importing packages


using ImageContrastAdjustment
using Images
using Plots
using TestImages

# Load example images: one source image and one reference image 

# "TestImages.jl" provides access to a good number of sample images for testing purposes. We first import test images chelsea and coffee which have
# have been recently added to TestImages.jl 

img_source = testimage("chelsea");
img_reference = testimage("coffee");

# Applying histogram matching on source image using the reference image,
# adjust_histogram function from ImageContrastAdjustment.jl 
# returns a histogram matched image with a granularity of nbins i.e. number of bins. 
# The first argument img is the image to be matched, and the second argument targetimg is 
# the image having the desired histogram to be matched to.

img_transformed = adjust_histogram(img_source, Matching(targetimg = img_reference));


# **Results** : 


mosaicview(img_source, img_reference, img_transformed; nrow = 1)
save("assets/chelsea.gif", cat(img_source, img_transformed; dims = 3)) #src

# From Left to Right: Source Image, Reference Image, Transformed Image


# We want to treat our RGB image as a 3-component vector, so that we 
# can access data from red, green,channels to show
# histogram matching effect through a combined graph.


img_source = channelview(img_source);
img_reference = channelview(img_reference);
img_transformed = channelview(img_transformed);


# To show the effect of histogram matching, We plot for each RGB channel, the histogram, and the cumulative histogram.

# Visual inspection from the plots confirms that img_transformed resembles img_target
# much more closely than img_source. We plot the graph with Plots.jl by looping over the 
# color channels and plotting them for each i.e. source image, reference image. transformed image

# Analysing change of data in color channels: Red, Green, Blue

hist_final = []
for i = 1:3
    hist_s = histogram(vec(img_source[i, :, :]))
    hist_r = histogram(vec(img_reference[i, :, :]))
    hist_t = histogram(vec(img_transformed[i, :, :]))
    push!(hist_final, hist_s)
    push!(hist_final, hist_r)
    push!(hist_final, hist_t)
end
plot(
    hist_final...,
    layout = (3, 3),
    size = (1000, 1000),
    legend = false,
    title = ["Source" "Reference" "Histograms Matched"],
    reuse = false,
)

# ### References:
# 1. Python Example Implementation of Histogram Matching: https://scikit-image.org/docs/stable/auto_examples/color_exposure/plot_histogram_matching.html#sphx-glr-auto-examples-color-exposure-plot-histogram-matching-py
