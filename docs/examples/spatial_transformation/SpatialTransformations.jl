# ---
# title: Cropping,Resizing and Rescaling
# cover: assets/lighthouse.png
# author: Ashwani Rathee
# date: 2020-11-24
# ---

# This demonstration shows how to use cropping,resizing and rescaling operations on an 
# image in julia using ImageTransformations.jl

using ImageCore, ImageTransformations, TestImages
## load img_source
img_source = testimage("lighthouse")  

# ## Cropping Operation

# Cropping is one of the most basic photo manipulation processes, and it is carried out to 
# remove an unwanted object or irrelevant noise from the periphery of a photograph, to 
# change its aspect ratio, or to improve the overall composition.

# Let's first check the size of the image

img_size=size(img_source)

# Output is (512,768) which stands means img_source is 512 in height and 768 in width.
# In Julia,Images are vertical major ,which means that this first index corresponds to the
# vertical axis and the second to the horizontal axis.This might be different from other
# programming languages.

# Let's crop the image from sides by 1/8 of img_source each side and leave it as it is from
# top to bottom.

# Easiest way to do this is indexing: img_source[y1:y2,x1:x2]

# Region of Interest:(y1,y2) sets the range for y-axis and (x1,x2) sets the range for 
# x-axis of source image.

img_cropped = img_source[ : ,floor(Int, 1/8*img_size[2]) : floor(Int, 7/8*img_size[2])]

# Let's see img_cropped size:

size(img_cropped)

# Ther is another method to do this and that is through using PaddedView,which is shown [here](https://juliaimages.org/stable/democards/examples/spatial_transformation/alpha_compositing/#Alpha-Compositing/)

# ## Resizing Operation

# Resizing is a method to resize an image to given specific outout image shape.It is different from rescaling as in rescaling we use scaling factor to manipulate image.

img_square = imresize(img_source,(400,400));
img_small = imresize(img_source, ratio=1/4);
img_medium = imresize(img_small, size(img_small).*2);
mosaicview(img_source, img_square, img_small, img_medium;nrow=1)

# ## Rescaling

# Rescale operation resizes an image by a given scaling factor. The scaling factor can 
# either be a single floating point value, or multiple values - one along each axis. 
# Image scaling is the process of changing the size of an image and saving the original 
# proportions. 

# ### Rescaling by percentage

percentage_scale=0.6
new_size = trunc.(Int, size(img_source) .* percentage_scale)
img_rescaled = imresize(img_source, new_size);
mosaicview(img_source, img_rescaled; nrow = 1)

# We calculated new size by estimating the size of frame by multiplying size by scale and
# then truncated it to Int format.

# ### Rescaling to a specific dimension

new_width = 200
percentage_scale = new_width / size(img_source)[2];
new_size = trunc.(Int, size(img_source) .* percentage_scale);
img_rescaled = imresize(img_source, new_size);
mosaicview(img_source, img_rescaled; nrow = 1)

# We have updated our scale by percentage solution to calculate scale-percentage 
# dynamically based on a change in one of the dimensions.
# Remember: size(sourceimage)[1] corresponds to height, while size(sourceimage)[2] 
# corresponds to width.

# ### Rescaling by two-fold using restrict function

rescaled_both = restrict(img_source); # both side
rescaled_height = restrict(img_source, 1); # height
rescaled_width = restrict(img_source, 2); # width
mosaicview(img_source, rescaled_both, rescaled_height, rescaled_width; nrow = 1)
