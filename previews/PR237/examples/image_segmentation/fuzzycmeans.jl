using Images
using ImageSegmentation, TestImages
using IndirectArrays

img = testimage("blobs")

segments =  fuzzy_cmeans(img, 3, 2)

centers = colorview(RGB, segments.centers);
red = centers[1]*reshape(segments.weights[:,1], axes(img));
green = centers[2]*reshape(segments.weights[:,2], axes(img));
blue = centers[3]*reshape(segments.weights[:,3], axes(img));

mosaic(img, red, green, blue; nrow=1)

# This file was generated using Literate.jl, https://github.com/fredrikekre/Literate.jl

