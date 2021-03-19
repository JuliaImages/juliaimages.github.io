
# ---
# cover: assets/chelsea.gif
# title: Histogram Matching
# author: Ashwani Rathee
# date: 2020-11-21
# ---


# This demo demonstrates the feature of histogram matching.


# In histogram matching, the pixels of the source image is manipulated so that the histogram 
# of reference image matches with source image's histogram.


# Here, histogram matching is shown for the grayscale image. But, it can also be applied on 
# RGB images too. Histogram matching can be used to normalize two images when the images 
# were acquired at the same local illumination (such as shadows) over the same location,
# but by different sensors, atmospheric conditions, or global illumination. 


# Importing packages


using ImageContrastAdjustment
using Images
using Plots
using TestImages


# Load example images: one source image and one reference image


img_source = testimage("chelsea");
img_reference = testimage("coffee");


# Applying histogram matching on source image using the reference image


img_transformed = adjust_histogram(img_source, Matching(targetimg = img_reference));


# **Results** : 


mosaicview(img_source, img_reference, img_transformed; nrow = 1)
save("assets/chelsea.gif",cat(img_source,img_transformed;dims=3)) #src

# From Left to Right: Source Image, Reference Image, Transformed Image


# We want to treat our RGB image as 3-component vector,so that we 
# can access data from red,green,channels to show
# histogram matching effect.


img_source = channelview(img_source);
img_reference = channelview(img_reference);
img_transformed = channelview(img_transformed);


# We plot for each RGB channel, the histogram, and the cumulative histogram. 


# Clearly, the matched image has the same cumulative histogram as the 
# reference image for each channel.


# Analysing change of data in color channel red


hist_sred = histogram(vec(img_source[1, :, :]));
hist_rred = histogram(vec(img_reference[1, :, :]));
hist_tred = histogram(vec(img_transformed[1, :, :]));
plot(
    hist_sred,
    hist_rred,
    hist_tred,
    layout = (1, 3),
    size = (1000, 333),
    legend = false,
    title = ["source" "reference" "histograms matched"],
)


# Analysing change of data in color channel green


hist_sgreen = histogram(vec(img_source[2, :, :]));
hist_rgreen = histogram(vec(img_reference[2, :, :]));
hist_tgreen = histogram(vec(img_transformed[2, :, :]));
plot(
    hist_sgreen,
    hist_rgreen,
    hist_tgreen,
    layout = (1, 3),
    size = (1000, 333),
    legend = false,
    title = ["source" "reference" "histograms matched"],
)


# Analysing change of data in color channel blue


hist_sblue = histogram(vec(img_source[3, :, :]));
hist_rblue = histogram(vec(img_reference[3, :, :]));
hist_tblue = histogram(vec(img_transformed[3, :, :]));
plot(
    hist_sblue,
    hist_rblue,
    hist_tblue,
    layout = (1, 3),
    size = (1000, 333),
    legend = false,
    title = ["source" "reference" "histograms matched"],
)


# ### References:
# 1. Python Example Implementation of Histogram Matching: https://scikit-image.org/docs/stable/auto_examples/color_exposure/plot_histogram_matching.html#sphx-glr-auto-examples-color-exposure-plot-histogram-matching-py
