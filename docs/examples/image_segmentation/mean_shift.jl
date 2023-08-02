# ---
# cover: assets/meanshift.gif
# title: Mean Shift Segmentation Algorithm
# description: This demo shows how to use the meanshift algorithm to segment an image.
# author: Ashwani Rathee
# date: 2021-09-18
# ---

# Mean Shift segmentation is a local homogenization technique that is very useful
# for damping shading or tonality differences in localized objects.
# It replaces each pixel with the mean of the pixels in a range-r neighborhood 
# and whose value is within a distance d.

# K-means segmentation is another segmentation technique which is popular
# but has two main issues:
# -  We have specify a prior on the number of clusters(Number of K which is no of
#    segments).
# - It can be sensitive to value of k-means parameter.

# Meanshift mitigates the above two issues.
# Let's say below is the pixel feature distribution in an image when we take pixels
# and we map it in feature map.

# ![](assets/pixelf.png)

# Below example image shows x,y coordinates corresponds to features and 3rd column 
# is the density of the feature.

# ![](assets/normalized.png)

# - Each hill represents a cluster
# - Peak(mode) of hill represents "center" of the cluster
# - Each pixel climbs the steepest hill within its neighborhood
# - Pixel assigned to the hill(cluster) it climbs. That's the idea behind meanshift. 
# Those hills are then assigned labels and the image is segmented.

# ![](assets/coloredpfd.png)

# The Mean Shift takes usually 3 inputs:

# - A distance function for measuring distances between pixels. Usually the 
#   Euclidean distance, but any other well defined distance function could be used. 
#   The Manhattan Distance is another useful choice sometimes.
# - A radius. All pixels within this radius (measured according the above distance) 
#   will be accounted for the calculation.
# - A value difference. From all pixels inside radius r, we will take only those 
#   whose values are within this difference for calculating the mean

# ## Mean Shift Algorithm

# Given: Distribution of N pixels in feature space.

# Task: Find modes(clusters) of distribution. 

# Clustering:
# - Set $m_i = f_i$ as initial mean fro each pixel idea
# - Repeat the following for each mean mi:
#   - place window of size $w$ around $m_i$.
#   - compute centroid m within the window set $mi = main$
#   - stop if shift in mean $m_i$ is less than a threshoold $\epsilon$, $m_i$ is the mode

# It's a very simple but computationally expensive method which doesn't require input of
# the number of clusters. Very robust to outliers and clustering depends on window size w.

using Images
using ImageSegmentation, TestImages
using IndirectArrays

img = Gray.(testimage("blobs"))
img = imresize(img, (128, 128));


# Now let's segment images with mean shift clustering algorithm

segments = meanshift(img, 16, 8/255) # parameters are smoothing radii: spatial=16, intensity-wise=8/255
labels = labels_map(segments)
colored_labels = IndirectArray(labels, distinguishable_colors(maximum(labels)))
masked_colored_labels = colored_labels .* (1 .- img)

mosaic(img, colored_labels, masked_colored_labels; nrow=1)

# Here we use `IndirectArray` to store the indexed image, for more explaination on it please
# check the tutorial [Indexed image in 5 minutes](@ref demo_indexed_image).

# ## References:
# - [Mean Shift Clustering](https://en.wikipedia.org/wiki/Mean_shift)
# - http://vision.stanford.edu/teaching/cs131_fall1617/lectures/lecture13_kmeans_mean_shift_cs131_2016

save("assets/meanshift.gif", cat(img, colored_labels, masked_colored_labels; dims=3); fps=1) #src
