using Documenter, DemoCards
using Images, ImageFiltering, ImageSegmentation, ImageFeatures, PaddedViews

branch = "master"

templates, theme = cardtheme("grid")
demos, demos_cb = makedemos("examples", templates; branch = branch)

format = Documenter.HTML(edit_link = "source",
                         prettyurls = get(ENV, "CI", nothing) == "true",
                         assets = [theme])

makedocs(modules  = [Images, ImageCore, Colors, ColorTypes, FixedPointNumbers, ImageAxes,
                    ImageFeatures, ImageFiltering, ImageMetadata,
                    ImageSegmentation, ImageTransformations, PaddedViews, ImageMorphology],
         format   = format,
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
                     "Demos" => demos,
                     "function_reference.md",
                     "api_comparison.md",
                    ])

demos_cb()

deploydocs(repo      = "github.com/JuliaImages/juliaimages.github.io.git",
           target    = "build",
           branch    = branch,
           push_preview = true,
           devbranch = "source",
           deps      = nothing,
           make      = nothing)
