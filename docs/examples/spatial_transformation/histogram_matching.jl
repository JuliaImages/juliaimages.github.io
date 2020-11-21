# ---
# cover: assets/woman_darkhair.tif
# title: Histogram Matching
# author: Ashwani Rathee
# date: 2020-11-21
# ---

# This demo demonstrates the feature of histogram matching.

# In histogram matching,the pixels of source image is manipulated so that the histogram 
# of reference image matches with source image's histogram.

# Here,histogram matching is shown for gray scale image.But,it can also be applied on 
# RGB images too.Histogram matching can be used to normalize two images, when the images 
# were acquired at the same local illumination (such as shadows) over the same location,
# but by different sensors,atmospheric conditions or global illumination. 

using Images,ImageCore,TestImages,ImageContrastAdjustment,ImageView
img_source=testimage("woman_darkhair")
img_reference=testimage("lena_gray_512")
img_transformed=adjust_histogram(img_source, Matching(targetimg = img_reference))
mosaicview(img_source,img_reference,img_transformed;nrow=1)

# The images shown above are sourceimage,referenceimage,transformedimage.

# To illustrate the effect of the histogram matching, we plot for source's histogram,
# reference's histogram and the cumulative histogram. Clearly, the matched image
# has the same cumulative histogram as the reference image for each channel.

using Plots
hist_source=histogram(vec(reinterpret(UInt8, img_source)));
hist_reference=histogram(vec(reinterpret(UInt8, img_reference)));
hist_transformed=histogram(vec(reinterpret(UInt8, img_transformed)));
plot(hist_source,hist_reference,hist_transformed, layout =(1,3),size=(1000,333),legend=false,title=["source" "reference" "histograms matched"])

