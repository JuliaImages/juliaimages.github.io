# ---
# cover: assets/regiongrowing.gif
# title: Region Growing Algorithm
# description: This demo shows how to use the region growing algorithm to segment an image.
# author: Ashwani Rathee
# date: 2021-08-25
# ---

# Region Growing Algorithm is a procedure that groups pixels or sub regions
# into a larger regions. We use principle of similiarity to group similar pixels.
# Principle of similiarity states that a region is coherent if all the pixels of that
# region are homogeneous and criterion of homogenity could be glcm, color, texture
# shape and model etc

# Major steps in a region growing algorithm:
# - Selection of initial seed
# - Seed Growing Criteria
# - Termination of the segmentation process

# In this demonstration, we will segment an image using the region growing algorithm.
# There are two methods to do region growing - the first one is the seeded region growing method,
# second one is the unseeded region growing method.

using Images
using ImageSegmentation
using Random

function get_random_color(seed)
    Random.seed!(seed)
    rand(RGB{N0f8})
end

# ## Seeded Region Growing

# Seeded region growing segments an image with respect to some user-defined seeds.
# Each seed is a `(position, label)`` tuple, where `position` is a `CartesianIndex` and
# label is a positive integer. Each label corresponds to a unique partition of 
# the image. The algorithm tries to assign these labels to each of the remaining 
# points. If more than one point has the same label then they will be contribute
# to the same segment.

img = load("assets/worm.jpg")
img_small = zeros(Gray{N0f8},5,5)
img_small[2,2] = 1.0
img_small[2,3] = 1.0
img_small[3,2] = 1.0
img_small[2,4] = 1.0
img_small[4,2] = 1.0
img_small[4,4] = 0.9

img_small

# These below are user defined seeds that will be used in the region growing algorithm.


seeds = [(CartesianIndex(104, 48), 1), (CartesianIndex( 49, 40), 1),
                (CartesianIndex( 72,131), 1), (CartesianIndex(109,217), 1),
                (CartesianIndex( 28, 87), 2), (CartesianIndex( 64,201), 2),
                (CartesianIndex(104, 72), 2), (CartesianIndex( 86,138), 2)]; # seeds for worm image
seeds_small = [(CartesianIndex(3,2),1),(CartesianIndex(3,3),2),(CartesianIndex(4,4),3)] # seed for img_small

# Now, let's segment this image using seeded_region_growing. First for the img_small then worm image.

seg_small = seeded_region_growing(img_small, seeds_small)
result = map(i->get_random_color(i), labels_map(seg_small)) .* (1 .-Gray.(img_small))

# Let's see results for worm case..

seg = seeded_region_growing(img, seeds)
result = map(i->get_random_color(i), labels_map(seg)) .* (1 .-Gray.(img))

# Let's see labels_map results which were then used in the seg_small case.

labels_map(seg_small)

# ## Unseeded region growing

# This algorithm is similar to [Seeded Region Growing](@ref) but does not require
# any prior information about the seed points. The segmentation process initializes
# with region ``A_1`` containing a single pixel of the image. Let an intermediate state
# of the algorithm consist of a set of identified regions ``A_1, A_2, ..., A_n``.
# Let ``T`` be the set of all unallocated pixels which borders at least one of these
# regions. The growing process involves selecting a point ``z \in T`` and region ``A_j``
# where ``j \in [ 1,n ] `` such that

# ```math
# \delta(z, A_j)= \min_{x \in T, k \in [ 1,n ] } \{ \delta(x, A_k)\}
# ```
# where `` \delta(x, A_i)= | \operatorname{img}(x) - \operatorname{mean}_{y \in A_i} [ \operatorname{img}(y) ] |``

# If ``\delta(z, A_j)`` is less than `threshold` then the pixel `z` is added to ``A_j``.
# Otherwise we choose the most similar region ``\alpha`` such that

# ```math
# \alpha = \argmin_{A_k} \{ \delta(z, A_k) \}
# ```
# If ``\delta(z, \alpha)`` is less than `threshold` then the pixel `z` is added to ``\alpha``.
# If neither of the two conditions is satisfied, then the pixel is assigned a new region ``A_{n+1}``.
# After assignment of ``z``, we update the statistic of the assigned region. The algorithm halts when
# all the pixels have been assigned to some region.

# `unseeded_region_growing` requires the image `img` and `threshold` as its parameters.

img_src = load("assets/worm.jpg")

# Now, let's segment this image using unseeded_region_growing

seg_small = unseeded_region_growing(img_small, 0.05) # here 0.05 is the threshold
result = map(i->get_random_color(i), labels_map(seg_small)) .* (1 .-Gray.(img_small))

# Let's see results for worm case..

seg = unseeded_region_growing(img_src, 0.5) # here 0.05 is the threshold
result = map(i->get_random_color(i), labels_map(seg)) .* (1 .-Gray.(img_src))

# Let's see labels_map results which were then used in the seg_small case.

labels_map(seg_small)

save("assets/regiongrowing.gif", cat(img, result; dims=3); fps=1) #src
