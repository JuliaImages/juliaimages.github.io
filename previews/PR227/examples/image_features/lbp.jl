using ImageFeatures
using Images, TestImages

img = restrict(Gray.(testimage("house"))) # size 256*256 house image

img_lbp = lbp(img, 8, 3, lbp_original); # use the original LBP implementation
img_lbp = @. Gray.(img_lbp / 255.0) # convert to normalized gray image
edges, counts = build_histogram(img_lbp, 25, minval = 0, maxval = 1);
# plot(edges[1:end-1], counts[1:end-1]; title="LBP vs No. of Occurences", xlabel="Normalized LBP values", ylabel="Number of occurences")

mosaicview(img, img_lbp; nrow = 1, rowmajor = true)

# This file was generated using Literate.jl, https://github.com/fredrikekre/Literate.jl

