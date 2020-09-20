# ---
# cover: assets/sedge.png
# title: Sujoy Edge Demo
# ---

using Images,Statistics,ImageView,TestImages

# Sujoy edge function


# [Paper Link] (https://www.ijert.org/research/a-better-first-derivative-approach-for-edge-detection-IJERTV2IS110616.pdf)

## edges = sujoy(img, kernel_nhood=0, just_filter=False),  
## 'edges' is a image of edges computed according to Sujoy's algorithm,  


## Parameters
## ----------
## img : any gray image,
## kernel_nhood : 0(default) or 1,
## if 0, kernel is based on 4-neighborhood,
## else, kernel is based on 8-neighborhood,
## just_filter : boolean(optional),
## if true, then return the result of filtering the image with
## the Sujoy's filter(s), but does not threshold (default is False).
##
## Returns
## -------
## edges : gray image (if just_filter is true),
## else, bool image.



function sujoy(img, kernel_nhood=0, just_filter=false)
    img_channel = channelview(img)

    if size(img_channel)[1] == 3
        img = Gray.(img)
        img_channel = channelview(img)
    end
    
    min_val = minimum(img_channel)
    img_channel = img_channel.-min_val
    max_val = maximum(img_channel)
    
    if max_val == 0
        return img
    end
    
    img_channel = img_channel./max_val
    
    img = colorview(RGB, img_channel, img_channel, img_channel)
    img = Gray.(img)
    
    if kernel_nhood == 0
        krnl_h = centered([0 -1 -1 -1 0; 0 -1 -1 -1 0; 0 0 0 0 0; 0 1 1 1 0; 0 1 1 1 0]./12)
        krnl_v = centered([0 0 0 0 0; -1 -1 0 1 1;-1 -1 0 1 1;-1 -1 0 1 1;0 0 0 0 0 ]./12)
    else
        krnl_h = centered([0 0 -1 0 0; 0 -1 -1 -1 0; 0 0 0 0 0; 0 1 1 1 0; 0 0 1 0 0]./8)
        krnl_v = centered([0 0 0 0 0;  0 -1 0 1 0; -1 -1 0 1 1;0 -1 0 1 0; 0 0 0 0 0 ]./8)
    end
    
    grad_h = imfilter(img,krnl_h')
    grad_v = imfilter(img,krnl_v')
    
    grad = (grad_h.^2) .+ (grad_v.^2)
    
    if just_filter
        return grad
    end
    t = sqrt(mean(grad))
    bool_img = falses(size(grad))
    bool_img[findlocalmaxima(grad)] .= true
    return bool_img.*(sqrt.(grad) .> t)
end

input_img = testimage("cameraman")
grayImg = sujoy(input_img,0,true)
mosaicview(input_img,grayImg; nrow = 1)
save("assets/sedge.png", grayImg) #src
