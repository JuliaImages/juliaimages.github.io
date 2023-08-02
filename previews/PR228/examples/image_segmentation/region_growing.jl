using Images
using ImageSegmentation
using Random

function get_random_color(seed)
    Random.seed!(seed)
    rand(RGB{N0f8})
end

img = load("assets/worm.jpg")
img_small = zeros(Gray{N0f8},5,5)
img_small[2,2] = 1.0
img_small[2,3] = 1.0
img_small[3,2] = 1.0
img_small[2,4] = 1.0
img_small[4,2] = 1.0
img_small[4,4] = 0.9

img_small

seeds = [(CartesianIndex(104, 48), 1), (CartesianIndex( 49, 40), 1),
                (CartesianIndex( 72,131), 1), (CartesianIndex(109,217), 1),
                (CartesianIndex( 28, 87), 2), (CartesianIndex( 64,201), 2),
                (CartesianIndex(104, 72), 2), (CartesianIndex( 86,138), 2)]; # seeds for worm image
seeds_small = [(CartesianIndex(3,2),1),(CartesianIndex(3,3),2),(CartesianIndex(4,4),3)] # seed for img_small

seg_small = seeded_region_growing(img_small, seeds_small)
result = map(i->get_random_color(i), labels_map(seg_small)) .* (1 .-Gray.(img_small))

seg = seeded_region_growing(img, seeds)
result = map(i->get_random_color(i), labels_map(seg)) .* (1 .-Gray.(img))

labels_map(seg_small)

img_src = load("assets/worm.jpg")

seg_small = unseeded_region_growing(img_small, 0.05) # here 0.05 is the threshold
result = map(i->get_random_color(i), labels_map(seg_small)) .* (1 .-Gray.(img_small))

seg = unseeded_region_growing(img_src, 0.5) # here 0.05 is the threshold
result = map(i->get_random_color(i), labels_map(seg)) .* (1 .-Gray.(img_src))

labels_map(seg_small)

# This file was generated using Literate.jl, https://github.com/fredrikekre/Literate.jl

