using Images, MosaicViews
using TestImages

img = float.(testimage("cameraman"))
# rotate img by 4 degrees and keep axes unchanged
img_r = imrotate(img, -pi/45, axes(img))

mosaicview(img, img_r; nrow=1, npad=20, fillvalue=colorant"white")

plain_diffview = @. img - img_r

rgb_data = cat(channelview(img),
               channelview(img_r),
               fill(0., size(img)); # empty fill
               dims=3) # size: (512, 512, 3)
rgb_data = PermutedDimsArray(rgb_data, (3, 1, 2)) # size: (3, 512, 512)
RGB_diffview = colorview(RGB, rgb_data)

Gray_diffview = Gray.(RGB_diffview)

mosaicview(plain_diffview, RGB_diffview, Gray_diffview;
           nrow=1, npad=20, fillvalue=colorant"white")

# This file was generated using Literate.jl, https://github.com/fredrikekre/Literate.jl

