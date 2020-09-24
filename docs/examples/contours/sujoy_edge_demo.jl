# ---
# cover: assets/sedge.png
# title: Edge detection using Sujoy Filter
# author: Sujoy Kumar Goswami; Partha Ghosh
# date: 2020-09-22
# ---

using Images,Statistics,TestImages

# Sujoy's Edge Detection Algorithm is a better & more generic approach (first derivative)
# for edge detection than the other commonly used first-derivative methods 
# (like Robert’s operator, Prewitt operator, Sobel operator etc.).

# [Paper Link] (https://www.ijert.org/research/a-better-first-derivative-approach-for-edge-detection-IJERTV2IS110616.pdf)

"""
    edges = sujoy(img, four_connectivity=true, just_filter=false),  

Compute edges of an image using the Sujoy algorithm.

# Parameters

* `img` (Required): any gray image,
* `four_connectivity=true`: if true, kernel is based on 4-neighborhood,
   else, kernel is based on 8-neighborhood,
* `just_filter=false`: if true, then return the result of filtering the image with
   the Sujoy's filter(s), but does not threshold (default is false).

# Returns
 
* `edges` : gray image (if just_filter is true), else, bool image.
"""
function sujoy(img, four_connectivity=true, just_filter=false)
    img_channel = Gray.(img)

    min_val = minimum(img_channel)
    img_channel = img_channel.-min_val
    max_val = maximum(img_channel)

    if max_val == 0
        return img
    end

    img_channel = img_channel./max_val

    if four_connectivity
        krnl_h = centered([0 -1 -1 -1 0; 0 -1 -1 -1 0; 0 0 0 0 0; 0 1 1 1 0; 0 1 1 1 0]./12)
        krnl_v = centered([0 0 0 0 0; -1 -1 0 1 1;-1 -1 0 1 1;-1 -1 0 1 1;0 0 0 0 0 ]./12)
    else
        krnl_h = centered([0 0 -1 0 0; 0 -1 -1 -1 0; 0 0 0 0 0; 0 1 1 1 0; 0 0 1 0 0]./8)
        krnl_v = centered([0 0 0 0 0;  0 -1 0 1 0; -1 -1 0 1 1;0 -1 0 1 0; 0 0 0 0 0 ]./8)
    end

    grad_h = imfilter(img_channel,krnl_h')
    grad_v = imfilter(img_channel,krnl_v')

    grad = (grad_h.^2) .+ (grad_v.^2)

    # this is not type stable and only for demonstration purpose
    if just_filter
        return grad
    end
    t = sqrt(mean(grad))
    bool_img = falses(size(grad))
    bool_img[findlocalmaxima(grad)] .= true
    return bool_img.*(sqrt.(grad) .> t)
end

gray_img = testimage("cameraman")
gray_img_edge = sujoy(gray_img,true,true)
mosaicview(gray_img,gray_img_edge; nrow = 1)
save("assets/sedge.png", gray_img_edge) #src
