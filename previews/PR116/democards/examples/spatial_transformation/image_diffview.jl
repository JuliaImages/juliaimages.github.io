using Images, MosaicViews
using TestImages

img = float.(testimage("cameraman"))
# rotate img by 4 degrees and keep axes unchanged
img_r = imrotate(img, -pi/45, axes(img))

# The simplest version is a plain diff
plain_diffview = @. img - img_r

# For gray images, a fancy trick is to fill each image into different RGB channels
RGB_diffview = colorview(RGB,
    PermutedDimsArray(
    cat(channelview(img), channelview(img_r), fill(0., size(img)),; dims=3),
    (3, 1, 2))
)

# or convert the RGB view back to Gray after that
Gray_diffview = Gray.(RGB_diffview)

mosaicview(plain_diffview, RGB_diffview, Gray_diffview;
           nrow=1, npad=20, fillvalue=colorant"white")


using FileIO # src
save("assets/image_diffview.png", RGB_diffview) # src

# This file was generated using Literate.jl, https://github.com/fredrikekre/Literate.jl

