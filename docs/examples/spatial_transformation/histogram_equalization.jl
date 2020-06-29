# ---
# title: Histogram equalisation
# cover: assets/histogram_equalization.png
# ---

# This demo issustrates the use of [Histogram equalization](https://juliaimages.org/ImageContrastAdjustment.jl/stable/reference/#Equalization-1), [gamma correction matching](https://juliaimages.org/ImageContrastAdjustment.jl/stable/reference/#Matching-1)
# and [Contrast Limited Adaptive Histogram Equalization](https://juliaimages.org/ImageContrastAdjustment.jl/stable/reference/#AdaptiveEqualization-1)

# Histogram equalisation is used to imporve the contrast in an
# single-channel grayscale image. It distributes the intensity of the image
# in a uniform manner. The natural justification for uniformity
# is that the image has better contrast if the intensity levels of an image span
# a wide range on the intensity scale. The transformation is based on mapping of
# cumulative histogram

using ImageContrastAdjustment, TestImages

img = testimage("moonsurface")

# Now we will apply Histogram equalisation, gamma correction and Adaptive histogram equalisation 
# method to enhance contrast of the image

hist_equal = adjust_histogram(img, Equalization(nbins = 256))
gamma_correction = adjust_histogram(img, GammaCorrection(gamma = 2))
hist_adapt = adjust_histogram(img, AdaptiveEqualization(nbins = 256, rblocks = 4, cblocks = 4, clip = 0.2))

hcat(img, hist_equal, gamma_correction, hist_adapt)

# --- save covers --- #src
using Images #src
save("assets/histogram_equalization.png", hist_equal) #src