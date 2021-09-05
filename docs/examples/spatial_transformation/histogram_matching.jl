# ---
# cover: assets/chelsea.gif
# title: Histogram Matching
# author: Ashwani Rathee
# date: 2021-03-23
# ---

# This demo demonstrates the feature of histogram matching.

# Purpose of Histogram matching is to transform the intensities in a source image so that the
# intensities distribute according to the histogram of a specified target image. 

# Here, histogram matching is shown for the RGB image. But, it can also be applied on 
# grayscale images too. Histogram matching can be used to normalize two images when the images 
# were acquired at the same local illumination (such as shadows) over the same location,
# but by different sensors, atmospheric conditions, or global illumination. 

using ImageContrastAdjustment
using Images
using Plots
using TestImages

# Load example images: one source image and one reference image 

# !!! note
#     You need to use `julia >= v"1.3.0"` and `TestImages >= v"1.3.1"` in order to load these
#     two test images.
img_source = testimage("chelsea");
img_reference = testimage("coffee");

# Applying histogram matching on source image using the reference image.
# Here we use `adjust_histogram` function from ImageContrastAdjustment.jl.
# It returns a histogram matched image with a granularity of `nbins`, i.e., number of bins. 
# The first argument `img` is the image to be matched, and the second argument `targetimg` is 
# the image with the desired histogram to be matched to.

img_transformed = adjust_histogram(img_source, Matching(targetimg = img_reference))
mosaicview(img_source, img_reference, img_transformed; nrow = 1)

save("assets/chelsea.gif", cat(img_source, img_transformed; dims = 3); fps=2) #src

# To show the effect of histogram matching, we plot for each RGB channel the histogram.

hist_final = [histogram(vec(c.(img)))
    for c in (red, green, blue)
    for img in [img_source, img_reference, img_transformed]
]

plot(
    hist_final...,
    layout = (3, 3),
    size = (800, 800),
    legend = false,
    title = ["Source" "Reference" "Histograms Matched"],
    reuse = false,
)

# From top to bottom are histograms for the red, green and blue channels.
# From left to right are the source, reference and the matched images.

# Visual inspection from the plots confirms that `img_transformed` resembles `img_target`
# much more closely than `img_source`.

# ### Credit and license

# This demo follows the [scikit-image version](https://scikit-image.org/docs/stable/auto_examples/color_exposure/plot_histogram_matching.html#sphx-glr-auto-examples-color-exposure-plot-histogram-matching-py), any usage of
# this demo should also satisfies the [scikit-image license](https://github.com/scikit-image/scikit-image/blob/main/LICENSE.txt).
