# ---
# title: RGB to HSV and thresholding
# cover: assets/rgb_hsv_thresholding.png
# author: Johnny Chen
# date: 2019-12-07
# ---

# This example illustrates how RGB to HSV (Hue, Saturation, Value) conversion
# can be used to facilitate segmentation processes.

using Images, TestImages, LinearAlgebra

rgb_img = testimage("lighthouse")
hsv_img = HSV.(rgb_img)
channels = channelview(float.(hsv_img))
hue_img = channels[1,:,:]
value_img = channels[3,:,:]
saturation_img = channels[2,:,:]
#md nothing #hide

#-
# A simple segmentation of the image can then be effectively performed 
# by a mere thresholding of the HSV channels.
mask = zeros(size(hue_img))
h, s, v = 80, 150, 150
for ind in eachindex(hue_img)
    if hue_img[ind] <= h && saturation_img[ind] <= s/255 && value_img[ind] <= v/255 
        mask[ind] = 1
    end
end
binary_img = colorview(Gray, mask)

# The obtained binary image can be used as a mask on the
# original RGB image.
segmented_img = mask .* rgb_img

hcat(rgb_img, binary_img, segmented_img)

save("assets/rgb_hsv_thresholding.png", binary_img) #src
