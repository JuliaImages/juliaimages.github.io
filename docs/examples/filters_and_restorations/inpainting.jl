# ---
# title: Image Inpainting
# cover: assets/inpainting.png
# ---

# This demo illustrates the use of [image inpainting](https://github.com/JuliaImages/ImageInpainting.jl) algorithm in JuliaImages.

# Inpainting is the process of constructing lost or deteriorated parts of an
# image or video. It is also used for removing undesired elements from a scene.
#  
# The basic idea of inpainting is: Replace those bad marks (or undesired elements) with its 
# neighbouring pixels so that it looks like the neighbourhood.

# In this demo we will be removing an undesired element form an image.

using ImageInpainting, TestImages, ImageCore

img  = Float64.(Gray.(testimage("lighthouse")));
Gray.(img)

# Create a mask of same size as of image
mask = falses(size(img));

# pixels where mask is set to true will be inpainted
mask[50:350,300:400] .= true;
Gray.(mask)

# inpaint take the parametes image, mask and algorithm.  
# We will be using Criminisi [1] algorithm
out = inpaint(img, mask, Criminisi(30,30));

mosaicview(Gray.(img), Gray.(mask), Gray.(out); nrow = 1)

# Note: Currently, ImageInpainting.jl only supports 2D images
# ### References
# [1] Criminisi, A., Pérez, P., Toyama, K., 2004. Region Filling
# and Object Removal by Examplar-based Image Inpainting.

# --- save covers --- #src
using FileIO #src
save("assets/inpainting.png", mosaicview(Gray.(img), Gray.(out); nrow = 1)) #src

