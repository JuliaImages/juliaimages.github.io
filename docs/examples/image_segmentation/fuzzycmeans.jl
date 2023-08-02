# ---
# cover: assets/fuzzycmeans.gif
# title: Fuzzy C-Means
# description: This demo shows how to use the fuzzy c-means algorithm to segment an image.
# author: Ashwani Rathee
# date: 2021-09-22
# ---

# Fuzzy C-means clustering is widely used for unsupervised image segmentation. It is an
# iterative algorithm which tries to minimize the cost function:

# 
# $J = \displaystyle\sum_{i=1}^{N} \sum_{j=1}^{C} \delta_{ij} \| x_{i} - c_{j} \|^2$
# 

# Unlike K-means, it allows pixels to belong to two or more clusters. It is widely used
# for medical imaging like in the soft segmentation of brain tissue model.
# Note that both Fuzzy C-means and K-means have an element of randomness, and it's possible
# to get results that vary considerably from one run to the next.

# Fuzzy C-Means clustering is a soft clustering approach, where each data point is assigned 
# a likelihood or probability score to belong to that cluster. 

# The step-wise approach of the Fuzzy c-means clustering algorithm is:
# - Fix the value of c (number of clusters), and select a value of m (generally 1.25<m<2), 
# and initialize partition matrix U.

# ![](assets/p1.png)
# - Calculate cluster centers (centroid).
# ![](assets/p2.png)

# Here,
# µ: Fuzzy membership value
# m: fuzziness parameter
# 
# - Update Partition Matrix
# ![](assets/p3.png)
# - Repeat the above steps until convergence.

# **Time Complexity:** ``O(n \cdot C^2 \cdot \text{iter})`` where ``n`` is the number of pixels, ``C`` is
# number of clusters and ``\text{iter}`` is the number of iterations.

using Images
using ImageSegmentation, TestImages
using IndirectArrays

img = testimage("blobs")


# Briefly, `r` contains two fields of interest:

# - `centers`, a `3×C` matrix of center positions for `C` clusters in RGB 
# colorspace. You can extract it as a vector of colors using `centers = colorview(RGB, r.centers)`.
# - `weights`, a `n×C` matrix such that `r.weights[10,2]` would be the weight
#   of the 10th pixel in the green color channel (color channel 2).  

# You can visualize this component as `centers[i]*reshape(r.weights[:,i], axes(img))`.
# See the documentation in [Clustering.jl](https://github.com/JuliaStats/Clustering.jl) for further details.

segments =  fuzzy_cmeans(img, 3, 2)

# Let's segment it using fuzzy cmeans and show results

centers = colorview(RGB, segments.centers);
red = centers[1]*reshape(segments.weights[:,1], axes(img));
green = centers[2]*reshape(segments.weights[:,2], axes(img));
blue = centers[3]*reshape(segments.weights[:,3], axes(img));

# Output with pixel intensity = cluster center intensity * membership of pixel in that class

mosaic(img, red, green, blue; nrow=1)

# Here we use `IndirectArray` to store the indexed image, for more explaination on it please
# check the tutorial [Indexed image in 5 minutes](@ref demo_indexed_image).

save("assets/fuzzycmeans.gif", cat(img, red, green, blue; dims=3); fps=1) #src
