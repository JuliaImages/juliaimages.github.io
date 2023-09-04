# ---
# cover: assets/fastscanning.gif
# title: Fast Scanning Segmentation Algorithm
# description: This demo shows how to use the meanshift algorithm to segment an image.
# author: Ashwani Rathee
# date: 2021-09-12
# ---

# Fast scanning algorithm segments the image by scanning it once and comparing each
# pixel to its upper and left neighbor. The algorithm starts from the first pixel
# and assigns it to a new segment ``A_1``. Label count `lc` is assigned 1. Then it starts a column-wise traversal
# of the image and for every pixel, it computes the difference measure `diff_fn`
# between the pixel and its left neighbor, say ``\delta_{l}`` and between the pixel and
# its top neighbor, say ``\delta_{t}``. Four cases arise:
# 1) ``\delta_{l} \ge`` `threshold` and ``\delta_{t} <``   `threshold` : 
#    We can say that the point has similar intensity to that its top neighbor.
#    Hence, we assign the point to the segment that contains its top neighbor.
# 2) ``\delta_{l} <``   `threshold` and ``\delta_{t} \ge`` `threshold` : 
#    Similar to case 1, we assign the point to the segment that contains its left neighbor.
# 3) ``\delta_{l} \ge`` `threshold` and ``\delta_{t} \ge`` `threshold` : 
#    Point is significantly different from its top and left neighbors and is
#    assigned a new label ``A_{\text{lc}+1}`` and `lc` is incremented.
# 4) ``\delta_{l} <``   `threshold` and ``\delta_{t} <``   `threshold` : 
#    In this case, we merge the top and left segments together and assign 
#    the point under consideration to this merged segment.

# This algorithm segments the image in just two passes (one for segmenting and other for
# merging), hence it is very fast and can be used in real time applications.

# **Time Complexity:** ``O(n)`` where ``n`` is the number of pixels

using Images
using ImageSegmentation, TestImages
using IndirectArrays

img = testimage("blobs")
img = imresize(img, (128, 128));

# Now we will segment the image using the fast scanning algorithm.

segments = fast_scanning(img, 0.1)  # threshold = 0.1
segments = prune_segments(segments, i->(segment_pixel_count(segments,i)<50), (i,j)->(-segment_pixel_count(segments,j)))
labels = labels_map(segments)
colored_labels = IndirectArray(labels, distinguishable_colors(maximum(labels)))
masked_colored_labels = colored_labels .* (1 .- Gray.(img))
mosaic(img, colored_labels, masked_colored_labels; nrow=1)

# ## References:
# - http://djj.ee.ntu.edu.tw/FastSegment.pdf
save("assets/fastscanning.gif", cat(img, colored_labels, masked_colored_labels; dims=3); fps=1) #src
