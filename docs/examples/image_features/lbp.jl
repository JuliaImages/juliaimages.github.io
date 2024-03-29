# ---
# cover: assets/lbp.gif
# title: Local Binary Patterns
# description: This demo shows how to use the LBP algorithm to extract features from images.
# author: Ashwani Rathee
# date: 2021-07-25
# ---

# In this demonstration, we show how local binary patterns (LBP) could be
# used as a very efficient texture classifier.

# LBP operator labels the pixels of an image by thresholding the neighborhood
# of each pixel and considers the result as a binary number.
# LBP feature vector would assign value to neighboring based on whether
# the neighboring cells have values higher/lower than threshold(equal to central cell value)
# in a grayscale image.

# ![](assets/lbp-comp1.png)

# Local binary patterns calculation:
#
# - Divide the examined window into cells (e.g. `16x16` pixels for each cell).
# - For each pixel in a cell, compare the pixel to each of its `8` neighbors (on its
#   left-top, left-middle, left-bottom, right-top, etc.). Follow the pixels along a circle,
#   i.e. clockwise or counterclockwise.
# - In the above step, the neighbours considered can be changed by varying the radius of the
#   circle around the pixel, R and the quantisation of the angular space P.
# - Where the center pixel's value is greater than the neighbor's value, write "0".
#   Otherwise, write "1". This gives an 8-digit binary number (which is usually converted to
#   decimal for convenience).
# - Compute the `histogram`, over the cell, of the frequency of each "number" occurring
#   (i.e., each combination of which pixels are smaller and which are greater than the
#   center). This histogram can be seen as a 256-dimensional feature vector.
# - Optionally normalize the `histogram`.
# - Concatenate (normalized) histograms of all cells. This gives a feature vector for the
#   entire window.

# ![](assets/lbp-comp2.jpg)
# Above example shows the LBP(P,R) calculation on the grayscale image.

# The output from step 4 is stored in corresponding cell of the resultant array.
# The feature vector can now then be processed using some machine-learning
# algorithm to classify images.
# Such classifiers are often used for face recognition or texture analysis.

# Now let's explore local binary patterns using ImageFeatures.jl

using ImageFeatures
using Images, TestImages

# The first step in constructing the LBP texture descriptor is to get a grayscale image, in this
# example we use the house image.

img = restrict(Gray.(testimage("house"))) # size 256*256 house image

# For each pixel in the grayscale image, we select a neighborhood of size `r` surrounding the
# center pixel. A LBP value is then calculated for this center pixel and stored in the output
# 2D array with the same width and height as the input image.

# Now let's calculate local binary pattern output using the `lbp` function API in which we
# have to specify the `method`, `points`,`radius`. There are several different LBP methods
# available in `ImageFeatures.jl` e.g., `lbp_original`, `lbp_uniform` and
# `lbp_rotation_invariant` but we will use original LBP here.
# - `points`: The number of points p in a circularly symmetric neighborhood to consider
#   (thus removing relying on a square neighborhood).
# - `radius`: The radius of the circle `r`, which allows us to account for different scales.

img_lbp = lbp(img, 8, 3, lbp_original); # use the original LBP implementation
img_lbp = @. Gray.(img_lbp / 255.0) # convert to normalized gray image
edges, counts = build_histogram(img_lbp, 25, minval = 0, maxval = 1);
## plot(edges[1:end-1], counts[1:end-1]; title="LBP vs No. of Occurences", xlabel="Normalized LBP values", ylabel="Number of occurences")

# ![](assets/lbp-hist.png)

# Using these edges and counts, we can create a graph which gives us insight into local binary patterns
# output. Local binary patterns gives us a clue to corners, flat and edges in a image.
# There are 5 peaks in this graph and these can classified into these types:
# - Corner : Peaks around `x=0.2` and `x=0.7`
# - Edge : Peak in center around `x=0.5`
# - Flat : Peaks near `x=0.0` and `x=1.0`

mosaicview(img, img_lbp; nrow = 1, rowmajor = true)

save("assets/lbp.gif", cat(img, img_lbp; dims = 3); fps = 1) #src

# # Reference:
# - [Local Binary Patterns - Wikipedia article](https://en.wikipedia.org/wiki/Local_binary_patterns)
# - [Local Binary Patterns - ScholarPedia article](http://www.scholarpedia.org/article/Local_Binary_Patterns)
