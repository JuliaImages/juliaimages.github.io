using Images
using ImageSegmentation, Distances, TestImages

img = testimage("coffee")
seg = felzenszwalb(img, 10, 100)

weight_fn(i,j) = euclidean(segment_pixel_count(seg, i), segment_pixel_count(seg, j))

G, vert_map = region_adjacency_graph(seg, weight_fn)

function homogeneous(img)
    min, max = extrema(img)
    max - min < 0.2
end

t = region_tree( Gray.(img), homogeneous)        # `img` is an image

# This file was generated using Literate.jl, https://github.com/fredrikekre/Literate.jl

