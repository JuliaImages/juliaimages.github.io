using Images
using ImageSegmentation, TestImages
using IndirectArrays

img = testimage("blobs")
img = imresize(img, (128, 128));

segments = fast_scanning(img, 0.1)  # threshold = 0.1
segments = prune_segments(segments, i->(segment_pixel_count(segments,i)<50), (i,j)->(-segment_pixel_count(segments,j)))
labels = labels_map(segments)
colored_labels = IndirectArray(labels, distinguishable_colors(maximum(labels)))
masked_colored_labels = colored_labels .* (1 .- Gray.(img))
mosaic(img, colored_labels, masked_colored_labels; nrow=1)

# This file was generated using Literate.jl, https://github.com/fredrikekre/Literate.jl

