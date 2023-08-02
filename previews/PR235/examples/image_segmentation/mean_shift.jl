using Images
using ImageSegmentation, TestImages
using IndirectArrays

img = Gray.(testimage("blobs"))
img = imresize(img, (128, 128));

segments = meanshift(img, 16, 8/255) # parameters are smoothing radii: spatial=16, intensity-wise=8/255
labels = labels_map(segments)
colored_labels = IndirectArray(labels, distinguishable_colors(maximum(labels)))
masked_colored_labels = colored_labels .* (1 .- img)

mosaic(img, colored_labels, masked_colored_labels; nrow=1)

# This file was generated using Literate.jl, https://github.com/fredrikekre/Literate.jl

