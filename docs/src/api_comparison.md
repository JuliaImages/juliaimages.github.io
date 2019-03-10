# Comparison with other image processing frameworks

The following table may be useful for people migrating from other
frameworks, and for identifying missing functionality in
JuliaImages. Note that there are relevant packages which have not been
integrated into more general frameworks or hosted at JuliaImages
(e.g., `DICOM.jl`, etc.); such functionality is not documented here.
This table is certainly not complete, and additions/corrections are
welcome.

| Operation                             | JuliaImages                               | scikit-image + NumPy              | Matlab (ImageProcessing + ComputerVision) |
|---------------------------------------|-------------------------------------------|-----------------------------------|-------------------------------------------|
| **Input/output**                      |                                           |                                   |                                           |
| Read image file                       | `load` (FileIO.jl)                        | `imread`                          | `imread`                                  |
| Write image file                      | `save` (FileIO.jl)                        | `imsave`                          | `imwrite`                                 |
| Image file metadata                   | `magickinfo` (ImageMagick.jl)             |                                   | `imfinfo`                                 |
| Test images                           | `testimage` (TestImages.jl)               | `astronaut` etc.                  | “cameraman.tif” etc                       |
|                                       |                                           |                                   |                                           |
| **Element type and color**            |                                           |                                   |                                           |
| Change numeric precision              | `float32`, `float64`, `n0f8`, etc.        | `img_as_float` etc                | `im2double` etc                           |
| Change color space                    | `HSV.(img)` etc.                          | `rgb2hsv` etc.                    | `rgb2lab` etc.                            |
| Whitepoint adjustment                 | map `whitebalance` (Colors.jl)            |                                   | `makecform`                               |
| High dynamic range                    |                                           |                                   | `tonemap`                                 |
|                                       |                                           |                                   |                                           |
| **Intensity & quantization**          |                                           |                                   |                                           |
| Clamping                              | `clamp01`, `clamp01nan`                   |                                   |                                           |
| Linear scaling                        | `scaleminmax`, `scalesigned`, etc.        | `rescale_intensity`               | `imadjust`                                |
| Nonlinear scaling                     | `adjust_gamma`, `imstretch`               | `adjust_gamma`                    | `imadjust`                                |
| Compute histogram                     | `imhist`                                  | `histogram`                       | `imhist`                                  |
| Histogram equalization                | `histeq`                                  | `equalize_hist`                   | `histeq`                                  |
| Adaptive equalization                 | `clahe`                                   | `equalize_adapthist`              | `adapthisteq`                             |
| Reference histogram matching          | `histmatch`                               | `match_histograms`                | `imhistmatch`                             |
| Quantization                          | map anonymous function                    |                                   | `imquantize`                              |
| Threshold estimation                  | `otsu_threshold`                          | `threshold_otsu` etc.             | `graythresh` etc.                         |
|                                       |                                           |                                   |                                           |
| **Visualization and interactivity**   |                                           |                                   |                                           |
| Visualization                         | `imshow` (ImageView.jl)                   | `imshow`                          | `imshow`, `implay`, etc.                  |
| Contrast adjustment                   | ImageView.jl                              |                                   | `imcontrast`                              |
| Pixel information                     | ImageView.jl                              |                                   | `impixelinfo`                             |
| Distance measurement                  |                                           |                                   | `imdistline`                              |
| Text display of region                |                                           |                                   | `impixelregion`                           |
| Zooming/scrolling                     | ImageView.jl and GtkUtilities.jl          | `imshow`                          | `imscrollpanel` etc.                      |
| Interactive colormap                  |                                           |                                   | `imcolormaptool`                          |
| Region selection                      |                                           | `RecatangleTool` etc.             | `imrect`, `imellipse`, `imfreehand`, etc. |
| Image comparison                      | `colorview`                               |                                   | `imshowpair`, `imfuse`                    |
| Label colorization                    | `IndirectArray`, `ColorizedArray`         | `label2rgb`                       | `label2rgb`                               |
|                                       |                                           |                                   |                                           |
| **Annotation**                        |                                           |                                   |                                           |
| Draw lines                            | `line`, `line!` (ImageDraw.jl)            | `line`, `polygon`                 | `line` (visualization only)               |
| Draw circles/ellipses                 | `circle!`, `ellipse!` (ImageDraw.jl)      | `circle`, `ellipse`               | `viscircles` (visualization only)         |
|                                       |                                           |                                   |                                           |
| **Transformations**                   |                                           |                                   |                                           |
| Resize                                | `imresize`, `restrict`                    | `resize`                          | `imresize`                                |
| Image pyramids                        | `gaussian_pyramid` (or use `restrict`)    | `pyramid_gaussian` etc.           | `impyramid`                               |
| Rotate                                | `imrotate`                                    | `rotate`                          | `imrotate`                                |
| Translate                             | `warp`                                    |                                   | `imtranslate`                             |
| General geometric transformation      | `warp`                                    | `warp`                            | `imwarp`                                  |
| Hough transform                       | `hough_transform_standard`, `hough_circle_gradient` | `hough_circle`, etc.              | `hough`                                   |
| Radon transform                       |                                           | `radon`, `iradon`                 | `radon`, `iradon`                         |
| Distance transform                    | `feature_transform`, `distance_transform` |                                   | `bwdist`, `graydist`                      |
|                                       |                                           |                                   |                                           |
| **Registration**                      |                                           |                                   |                                           |
|                                       |                                           |                                   |                                           |
| **Statistics and image comparison**   |                                           |                                   |                                           |
| Image differences                     | `ssd`, `sad`, etc.                        |                                   | `immse`, `ssim`                           |
| Min/max/mean                          | `minfinite`, `maxfinite`, `meanfinite`    |  `minimum`, `maximum`, `mean`     | `nanmax`, etc.                            |
| Entropy                               | `entropy`                                 |  `entropy`                        | `entropy`                                 |
|                                       |                                           |                                   |                                           |
| **Filtering and padding**             |                                           |                                   |                                           |
| Linear filtering                      | `imfilter`                                | `gaussian`, etc.                  | `imfilter`                                |
| Median/max/quantile filtering         | `mapwindow`                               | `median`/`max` etc.               | `nlfilter`, `medfilt2`, etc.              |
| Other nonlinear filtering (e.g., std) | `mapwindow`                               |                                   | `nlfilter`, `stdfilt`                     |
| Gradients                             | `imgradients`                             | `sobel_h` etc.                    | `imgradientxy` etc.                       |
| Integral image                        | `integral_image`                          | `integral_image`                  | `integralImage`                           |
| Padding                               | `padarray`                                | `pad`                             | `padarray`                                |
| Deconvolution                         | `weiner` (Deconvolution.jl)               | `richardson_lucy`, `weiner`, etc. | `deconvlucy`, `deconvwnr`, etc.           |
|                                       |                                           |                                   |                                           |
| **Features**                          |                                           |                                   |                                           |
| Edge detection                        | `imedge`, `canny`                         | `canny`                           | `edge`                                    |
| Corner detection                      | `imcorner`, `fastcorners`                 | `corner_harris` etc.              | `detectFASTFeatures`                      |
| Blob detection                        | `blob_LoG`                                | `blob_log` etc.                   |                                           |
| Local binary patterns                 | `lbp` etc. (ImageFeatures.jl)             | `local_binary_pattern`            | `extractLBPFeatures`                      |
| Histogram of oriented gradients       | `HOG` (ImageFeatures.jl)                  | `hog`                             | `extractHOGFeatures`                      |
| Gray-level co-occurence               | `glcm` etc. (ImageFeatures.jl)            | `greycomatrix`                    | `graycomatrix`                            |
| Point descriptors                     | `BRIEF`, `ORB`, etc. (ImageFeatures.jl)   | `BRIEF`, `ORB`, etc.              | `detectBRISK` etc.                        |
| Feature matching                      | `match_keypoints` (ImageFeatures.jl)      | `match_descriptors`               | `matchFeatures`                           |
|                                       |                                           |                                   |                                           |
| **Segmentation**                      |                                           |                                   |                                           |
| Connected components                  | `label_components`                        | `label`                           | `bwconncomp`, `bwlabel`                   |
| Foreground/background                 |                                           | `active_contour`                  | `activecontour`                           |
| Clustering                            | `kmeans`, `fuzzy_cmeans`, `mean_shift`    | `quickshift`, `slic`                      |                                           |
| Marker segmentation                   | `seeded_region_growing`                   | `random_walker`                   | `imsegfmm`                                |
| Watershed                             |  `watershed`                              | `watershed`                       | `watershed`                               |
|                                       |                                           |                                   |                                           |
| **Morphological operations**          |                                           |                                   |                                           |
| Dilation                              | `dilate`                                  | `dilation`, `binary_dilation`     | `imdilate`                                |
| Erosion                               | `erode`                                   |                                   |                                           |
| Opening                               | `opening`                                 | `opening`                         | `imopen`                                  |
| Closing                               | `closing`                                 | `closing`                         | `imclose`                                 |
| Top-hat filtering                     | `tophat`                                  | `tophat` etc.                     | `imtophat`                                |
| Bottom-hat filtering                  | `bothat`                                  | `bottomhat`                       | `imbothat`                                |
| Regional max/min                      | `mapwindow`                               | `filters.rank.maximum` etc.       | `imregionalmax` etc.                      |
| Convex hull                           | `convexhull`                              | `convex_hull_image`               | `bwconvhull`                              |
| Borders                               | `clearborder`                             | `clear_border`                    | `imclearborder`                           |
| Boundaries                            |                                           | `find_boundaries`                 | `boundarymask`                            |
| Filling                               |                                           | `remove_small_holes`              | `imfill`, `regionfill`                    |
