using Documenter, DemoCards
using Images, ImageFiltering, ImageSegmentation, ImageFeatures, PaddedViews
using ImageContrastAdjustment, TestImages, FileIO, MosaicViews, ImageMorphology

# loading Plots before generating demos (might be helpful to avoid segfaults)
using Plots
ENV["GKSwstype"] = "nul" # needed for the GR backend on headless servers
gr()

branch = "master"

demos, demos_cb, demo_assets = makedemos("examples"; branch = branch)

assets = []
isnothing(demo_assets) || push!(assets, demo_assets)

format = Documenter.HTML(edit_link = "source",
                         prettyurls = get(ENV, "CI", nothing) == "true",
                         assets = assets)

makedocs(modules  = [Images, ImageCore, Colors, ColorTypes, FixedPointNumbers, ImageAxes,
                    ImageFeatures, ImageFiltering, ImageMetadata, ImageContrastAdjustment,
                    ImageDistances, ImageQualityIndexes, MosaicViews, TestImages, FileIO,
                    ImageSegmentation, ImageTransformations, PaddedViews, ImageMorphology],
         format   = format,
         sitename = "JuliaImages",
         pages    = ["Home" => "index.md",
                     "install.md",
                     "Tutorials" => Any[
                         joinpath("tutorials", "quickstart.md"),
                         joinpath("tutorials", "arrays_colors.md"),
                         joinpath("tutorials", "conversions_views.md"),
                         joinpath("tutorials", "indexing.md")
                     ],
                     "Packages" => Any[
                         "Introduction" => joinpath("pkgs", "index.md"),
                         "ImageAxes.jl" => joinpath("pkgs", "axes", "index.md"),
                         "ImageMetaData.jl" => joinpath("pkgs", "metadata", "index.md"),
                         "ImageSegmentation.jl" => joinpath("pkgs", "segmentation", "index.md"),
                         "ImageTransformations.jl" => joinpath("pkgs", "transformations", "index.md"),
                         "ImageFeatures.jl" => joinpath("pkgs", "features", "index.md")
                     ],
                     "Demos" => demos,
                     "References" => "function_reference.md",
                     "api_comparison.md",
                    #  "faqs.md"
                    ])

demos_cb()

deploydocs(repo      = "github.com/JuliaImages/juliaimages.github.io.git",
           target    = "build",
           branch    = branch,
           push_preview = true,
           forcepush = true,
           devbranch = "source",
           deps      = nothing,
           make      = nothing)
