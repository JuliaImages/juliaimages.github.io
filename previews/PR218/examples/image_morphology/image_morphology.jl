using Images
using ImageMorphology, TestImages

img = Gray.(testimage("morphology_test_512"))

img_erode = @. Gray(img < 0.8); # keeps white objects white
img_erosion1 = erode(img_erode)
img_erosion2 = erode(erode(img_erode))
mosaicview(img_erode, img_erosion1, img_erosion2; nrow = 1)

img_dilate = @. Gray(img > 0.9);
img_dilate1 = dilate(img_dilate)
img_dilate2 = dilate(dilate(img_dilate))
mosaicview(img_dilate, img_dilate1, img_dilate2; nrow = 1)

img_opening = @. Gray(1 * img > 0.5);
img_opening1 = opening(img_opening)
img_opening2 = opening(opening(img_opening))
mosaicview(img_opening, img_opening1, img_opening2; nrow = 1)

img_closing = @. Gray(1 * img > 0.5);
img_closing1 = closing(img_closing)
img_closing2 = closing(closing(img_closing))
mosaicview(img_closing1, img_closing1, img_closing2; nrow = 1)

img_tophat = @. Gray(1 * img > 0.2);
img_tophat1 = tophat(img_tophat)
img_tophat2 = tophat(tophat(img_tophat))
mosaicview(img_tophat, img_tophat1, img_tophat2; nrow = 1)

img_bothat = @. Gray(1 * img > 0.5);
img_bothat1 = bothat(img_tophat)
img_bothat2 = bothat(bothat(img_tophat))
img_bothat3 = bothat(bothat(bothat(img_tophat)))
mosaicview(img_bothat, img_bothat1, img_bothat2; nrow = 1)

img_gray = @. Gray(0.8 * img > 0.7);
img_morphograd = morphogradient(@. Gray(0.8 * img > 0.4))
mosaicview(img_gray, img_morphograd; nrow = 1)

img_gray = @. Gray(0.8 * Gray.(img) > 0.7);
img_morpholap = morpholaplace(img_gray)
mosaicview(img_gray, img_morpholap; nrow = 1)

# This file was generated using Literate.jl, https://github.com/fredrikekre/Literate.jl

