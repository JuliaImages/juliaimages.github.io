using Documenter, DemoCards
using Images, ImageFiltering, ImageSegmentation, ImageFeatures, PaddedViews
using ImageContrastAdjustment, TestImages, FileIO, MosaicViews, ImageMorphology

branch = "master"

templates, theme = cardtheme("grid")
demos, demos_cb = makedemos("examples", templates; branch = branch)

format = Documenter.HTML(edit_link = "source",
                         prettyurls = get(ENV, "CI", nothing) == "true",
                         assets = [theme])

makedocs(modules  = [Images, ImageCore, Colors, ColorTypes, FixedPointNumbers, ImageAxes,
                    ImageFeatures, ImageFiltering, ImageMetadata, ImageContrastAdjustment,
                    ImageDistances, ImageQualityIndexes, MosaicViews, TestImages, FileIO,
                    ImageSegmentation, ImageTransformations, PaddedViews, ImageMorphology],
         format   = format,
         sitename = "JuliaImages",
         pages    = ["Home" => "index.md",
                     "Tutorials" => Any[
                         joinpath("tutorials", "install.md"),
                         joinpath("tutorials", "quickstart.md"),
                         joinpath("tutorials", "arrays_colors.md"),
                         joinpath("tutorials", "conversions_views.md"),
                         joinpath("tutorials", "indexing.md")
                     ],
                     "Packages" => Any[
                         joinpath("packages", "imageaxes", "index.md"),
                         joinpath("packages", "imagemetadata", "index.md"),
                         joinpath("packages", "imagesegmentation", "index.md"),
                         joinpath("packages", "imagetransformations", "index.md"),
                         joinpath("packages", "imagefeatures", "index.md")
                     ],
                     "Demos" => demos,
                     "function_reference.md",
                     "api_comparison.md",
                    #  "faqs.md"
                    ])

demos_cb()

deploydocs(repo      = "github.com/JuliaImages/juliaimages.github.io.git",
           target    = "build",
           branch    = branch,
           push_preview = true,
           devbranch = "source",
           deps      = nothing,
           make      = nothing)
