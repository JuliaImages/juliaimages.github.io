# ---
# cover: assets/lbp.gif
# title: Local Binary Patterns
# description: This demo shows how to use the LBP algorithm to extract features from images.
# author: Ashwani Rathee
# date: 2021-07-17
# ---

# In this demonstration, we show how local binary patterns could be
# used as a very efficient texture classifier. LBP operator labels the
# pixels of an image by thresholding the neighborhood of each pixel and
# considers the result as a binary number. 
# LBP feature vector would assign value to neighboring based on whether 
# the neighboring cells have values higher/lower than threshold(equal to central cell value)
# in a grayscale image.
# ![](assets/lbp.png)
# - Divide the examined window into cells (e.g. `16x16` pixels for each cell).
# - For each pixel in a cell, compare the pixel to each of its `8 neighbors` (on its left-top, left-middle, left-bottom, right-top, etc.). Follow the pixels along a circle, i.e. clockwise or counterclockwise.
# - In the above step, the neighbours considered can be changed by varying the radius of the circle around the pixel, R and the quantisation of the angular space P.
# - Where the center pixel's value is greater than the neighbor's value, write "0". Otherwise, write "1". This gives an 8-digit binary number (which is usually converted to decimal for convenience).
# - Compute the `histogram`, over the cell, of the frequency of each "number" occurring (i.e., each combination of which pixels are smaller and which are greater than the center). This histogram can be seen as a 256-dimensional feature vector.
# - Optionally normalize the `histogram`.
# - Concatenate (normalized) histograms of all cells. This gives a feature vector for the entire window.

# ![](assets/lbp-comp.jpg)
# Above example shows the LBP(P,R) calculation on the grayscale image.

# The output from step 4 is stored in corresponding cell of the resultant array.

# The feature vector can now then be processed using some machine-learning
# algorithm to classify images.
# Such classifiers are often used for face recognition or texture analysis.

using Images, TestImages, ImageFeatures,MosaicViews

# Before taking a real world example, let's take a simple example to  understand
# the basic idea of LBP. With the various types availble in the library, we will
# use the default 8x8 LBP operator.
# Unlike Haralick texture features that compute a global representation of texture based on the Gray Level Co-occurrence Matrix, 
# LBPs instead compute a local representation of texture.

img = Float64.([ 1 2 3; 4 5 6; 7 8 9])
lbpv = lbp(Gray.(img), lbp_uniform);

# For the central cell, the computation will be as follows:

# | Column 1 | Column 2 | Column 3 |
# | :--------: | :---------: | :---------: |
# | 1 | 2 | 3 |
# | 4 | 5 | 6 |
# | 7 | 8 | 9 |

# The output after comparision

# | Column 1 | Column 2 | Column 3 |
# | :--------: | :---------: | :---------: |
# | 0 | 0 |0 |
# | 0 |  |1 |
# | 1 |1 |1 |

# 0* 2^0 + 1 * 2^1 + 1*2^2 + 1*2^3 + 1*2^4 + 0*2^5 + 0*2^6 + 0*2^7 = 0
# still doesn't match
mosaicview(img, lbpv;nrow=1)


# Now let's take a different example of size `512*512` sudoku image
img = testimage("sudoku")

# Original Image
# The first step in constructing the LBP texture descriptor is to convert the image to grayscale. 
# For each pixel in the grayscale image, we select a neighborhood of size r surrounding the 
# center pixel. A LBP value is then calculated for this center pixel and stored in the output 
# 2D array with the same width and height as the input image.

img_gray = Gray.(img) # conversion to grayscale for input in LBP texture descriptor 
img_lbp = lbp(img_gray);
img_lbp2 = lbp(img_gray, 16, 2,lbp_original);
img_lbp3 = lbp(img_gray, 8, 1,lbp_uniform);
img_lbp4 = lbp(img_gray, 16, 2,lbp_uniform);
img_lbp5 = modified_lbp(img_gray, 8, 1);

# Local binary Patterns

img_result = Gray.(Float64.(img_lbp) ./ 255.0)
img_result2 = Gray.(Float64.(img_lbp2) ./ 255.0)
img_result3 = Gray.(Float64.(img_lbp3) ./ 255.0)
img_result4 = Gray.(Float64.(img_lbp4) ./ 255.0)
img_result5 = Gray.(Float64.(img_lbp5) ./ 255.0)

mosaicview(img_result, img_result2, img_result3, img_result4, img_result5;nrow =1,rowmajor=true)

save("assets/lbp.gif", cat(img_gray, img_result; dims=3); fps=2) #src

# # Reference:
# - https://en.wikipedia.org/wiki/Local_binary_patterns
# - http://www.scholarpedia.org/article/Local_Binary_Patterns
# - https://www.pyimagesearch.com/2015/12/07/local-binary-patterns-with-python-opencv/