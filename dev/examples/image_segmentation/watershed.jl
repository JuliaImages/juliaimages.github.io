using Images
using ImageSegmentation, TestImages
using IndirectArrays

img = testimage("blobs")
img_example = zeros(Gray, 5, 5)
img_example[2:4,2:4] .=  Gray(0.6)
bw = Gray.(img) .> 0.5
bw_example = img_example .> 0.5

bw_transform = feature_transform(bw)
bw_transform_example = feature_transform(bw_example)

dist = 1 .- distance_transform(bw_transform)
dist_example = 1 .- distance_transform(bw_transform_example)

dist_trans = dist .< 1
markers = label_components(dist_trans)
markers_example = label_components(dist_example .< 0.5)
Gray.(markers/32.0) # each of the blobs is slightly differently marked by label_components from 1 to 64

segments = watershed(dist, markers)
segments_example = watershed(dist_example , markers_example)

labels = labels_map(segments)
colored_labels = IndirectArray(labels, distinguishable_colors(maximum(labels)))
masked_colored_labels = colored_labels .* (1 .- bw)
mosaic(img, colored_labels, masked_colored_labels; nrow=1)

# This file was generated using Literate.jl, https://github.com/fredrikekre/Literate.jl

