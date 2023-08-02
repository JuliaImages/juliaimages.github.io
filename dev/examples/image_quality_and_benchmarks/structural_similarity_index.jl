using Images, TestImages
using Random

img_orig = float64.(testimage("cameraman"))

assess_ssim(img_orig, img_orig)

noise = ones(size(img_orig)) .* 0.2 .* (maximum(img_orig) - minimum(img_orig))
img_const = img_orig + noise

mask = rand(Float64, size(img_orig)) .< 0.5
noise[mask] = noise[mask] .* -1
img_noise = img_orig + noise

mosaicview(img_const, img_noise; nrow=1)

mse(img_orig, img_const), mse(img_orig, img_noise)

assess_ssim(img_orig, img_const), assess_ssim(img_orig, img_noise)

iqi = SSIM(KernelFactors.gaussian(2.0, 11), (0.5, 0.5, 0.5))
assess(iqi, img_orig, img_const)

peakval = maximum(img_orig) .|> Float64 # peakval is max pixel value in original image
assess_psnr(img_noise, img_orig, [peakval]) # 13.979400086720483

noise = ones(size(img_orig)) .* 0.2 .* (maximum(img_orig) - minimum(img_orig))
mask = rand(Float64, size(img_orig)) .< 0.5
noise[mask] = noise[mask] .* -3
img_noise = img_orig + noise

assess_psnr(img_noise, img_orig)

# This file was generated using Literate.jl, https://github.com/fredrikekre/Literate.jl

