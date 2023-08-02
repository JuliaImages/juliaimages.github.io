using Images, TestImages
using ImageFeatures

img_src = testimage("coffee")

img_patch1 = img_src[170:180, 20:30] # Patch 1 & Patch 2 are from table with unidirectional texture
img_patch2 = img_src[190:200, 20:30]
img_patch3 = img_src[40:50, 310:320] # Patch 3 & Patch 4 are from coffe inside cup
img_patch4 = img_src[60:70, 320:330]
img_patches = [img_patch1, img_patch2, img_patch3, img_patch4]
mosaicview(img_patches; nrow=1, npad=1, fillvalue=1)

glcm_results = [];
glcm_sym_results = [];
glcm_norm_results = [];

distance = 5
angle = 0
mat_size = 4

for patch in img_patches
    glcm_output = glcm(patch, distance, angle, mat_size)
    glcm_sym_output = glcm_symmetric(patch, distance, angle, mat_size)
    glcm_norm_output = glcm_norm(patch, distance, angle, mat_size)
    push!(glcm_results, glcm_output)
    push!(glcm_sym_results, glcm_sym_output)
    push!(glcm_norm_results, glcm_norm_output)
end

glcm_results # GLCM matrix

glcm_sym_results # GLCM Symmetrical matrix

glcm_norm_results # GLCM normalised matrix

property = [correlation,dissimilarity]
x = []
y = []

for i in glcm_results
    point = []
    for j in property
        glcm_pro = glcm_prop(i, j)
        push!(point,glcm_pro)
    end
    push!(x,point[1])
    push!(y,point[2])
end
x,y

# This file was generated using Literate.jl, https://github.com/fredrikekre/Literate.jl

