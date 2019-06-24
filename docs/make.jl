using Documenter, Images, ImageFiltering, ImageSegmentation, ImageFeatures, PaddedViews

makedocs(modules  = [Images, ImageCore, Colors, ColorTypes, FixedPointNumbers, ImageAxes,
                    ImageFeatures, ImageFiltering, ImageMetadata,
                    ImageSegmentation, ImageTransformations, PaddedViews, ImageMorphology],
         format   = Documenter.HTML(edit_branch = "source",
                                    assets = [joinpath("assets", "style.css")]),
         sitename = "JuliaImages",
         pages    = ["Home" => "index.md",
                     "install.md",
                     "Manual" => Any[
                         "quickstart.md",
                         "arrays_colors.md",
                         "conversions_views.md",
                         "indexing.md",
                         "imageaxes.md",
                         "imagefiltering.md",
                         "imagemetadata.md",
                         "imagesegmentation.md",
                         "imagetransformations.md",
                         "imagefeatures.md",
                         "troubleshooting.md",
                     ],
                     "Demos" => Any[
                         "demos.md",
                         "demos/color_separations_svd.md",
                         "demos/rgb_hsv_thresholding.md",
                     ],
                     "function_reference.md",
                     "api_comparison.md",
                    ])

deploydocs(repo      = "github.com/JuliaImages/juliaimages.github.io.git",
           target    = "build",
           branch    = "master",
           devbranch = "source",
           deps      = nothing,
           make      = nothing)
