# ---
# cover: assets/glcm.png
# title: Gray Level Co-occurrence Matrix
# description:  The first introduction to GLCM(Gray Level Co-occurrence Matrix)
# author: Ashwani Rathee
# date: 2021-08-9
# ---

# Gray Level Co-occurrence Matrix (GLCM) is used for texture analysis.
# We consider two pixels at a time, called the reference and the neighbour pixel.
# We define a particular spatial relationship between the reference and neighbour 
# pixel before calculating the GLCM. For example, we may define the neighbour to be 1
# pixel to the right of the current pixel, or it can be 3 pixels above, or 2 pixels
# diagonally (one of NE, NW, SE, SW) from the reference.

# Once a spatial relationship is defined, we create a GLCM of size (Range of
# Intensities x Range of Intensities) all initialised to 0. For example, a 8 bit single
# channel Image will have a 256x256 GLCM. We then traverse through the image and for
# every pair of intensities we find for the defined spatial relationship, we increment
# that cell of the matrix.

# ## Gray Level Co-occurence Matrix

# Each entry of the GLCM[i,j] holds the count of the number of times that pair of
# intensities appears in the image with the defined spatial relationship.

# ![](assets/glcm.png)

# The matrix may be made symmetrical by adding it to its transpose and normalised to
# that each cell expresses the probability of that pair of intensities occurring in the image.

# Once the GLCM is calculated, we can find texture properties from the matrix to represent
# the textures in the image.

# ## GLCM Properties

# The properties can be calculated over the entire matrix or by considering a window
# which is moved along the matrix.

# - Mean
# - Variance
# - Correlation
# - Contrast
# - IDM (Inverse Difference Moment)
# - ASM (Angular Second Moment)
# - Entropy
# - Max Probability
# - Energy
# - Dissimilarity

# ImageFeatures.jl provide methods for GLCM matrix calculation(with symmetric and normalized versions)

using Images, TestImages
using ImageFeatures

img_src = testimage("coffee")

# In this section, we will see how glcm could be calculated and how results are
# different for different types of textures. We will be using 4 `11x11` pixels
# patches as shown below.

img_patch1 = img_src[170:180, 20:30] # Patch 1 & Patch 2 are from table with unidirectional texture
img_patch2 = img_src[190:200, 20:30]
img_patch3 = img_src[40:50, 310:320] # Patch 3 & Patch 4 are from coffee inside cup
img_patch4 = img_src[60:70, 320:330]
img_patches = [img_patch1, img_patch2, img_patch3, img_patch4]
mosaicview(img_patches; nrow=1, npad=1, fillvalue=1)

# As we can already take a guess, patch 1 and patch 2 are very similiar(unidirectional texture) and
# that's also true for patch 3 and patch 4 which are very similiar(smooth texture).

glcm_results = [];

# The `distances` and `angles` arguments may be a single integer or a vector of
# integers if multiple GLCMs need to be calculated. The `mat_size` argument is used
# to define the granularity of the GLCM. 

distance = 5
angle = 0
mat_size = 4

glcm_results = [glcm(patch, distance, angle, mat_size) for patch in img_patches]


glcm_results # GLCM matrix

# GLCM symmetrical is basically `glcm_output .+ transpose(glcm_output)`
# GLCM normalised is basically `glcm_output ./ sum(glcm_output)`

# In next part, we will see how the GLCM matrix calculation can be used to
# differentiate textures based on statistics. `glcm_prop` is used to calculate
# various properties. 
# Various properties can be calculated like `mean`, `variance`, `correlation`,
# `contrast`, `IDM` (Inverse Difference Moment),`ASM` (Angular Second Moment),
# `entropy`, `max_prob` (Max Probability), `energy` and `dissimilarity`.

glcm_correlation = [glcm_prop(x, correlation) for x in glcm_results]
glcm_dissimilarity = [glcm_prop(x, dissimilarity) for x in glcm_results]
glcm_correlation, glcm_dissimilarity

# These properties can be directly calculated too using syntax `property(glcm_matrix)`.
# For example: To calculate correlation, we can do `correlation(glcm(img_patch1))``

# We can create graph between correlation and dissimilarity properties of particular
# GLCM matrices. It's easy to notice that the Patch 1 & Patch 2 are closer in the properties
# and similiarly for Patch 3 and Patch 4.

# ![](assets/scatter.png)

# Graph can be made using GLCM symmetric and normalised version, which produces very similiar outputs to give
# us a hint at how similiar textures have similiar properties.

save("assets/glcm.png", img_src) #src

# References:
# - https://en.wikipedia.org/wiki/Co-occurrence_matrix
# - Scikit GLCM example
# - http://www.code.ucsd.edu/pcosman/glcm.pdf
