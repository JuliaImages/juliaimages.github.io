using Documenter, DemoCards
using Images, ImageFiltering, ImageSegmentation, ImageFeatures, PaddedViews
using ImageContrastAdjustment, TestImages, FileIO, MosaicViews, ImageMorphology

branch = "master"

demos, demos_cb, demo_assets = makedemos("examples"; branch = branch)
pkgs, pkgs_cb, _ = makedemos("pkgs"; branch = branch)

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
                     pkgs,
                     "Demos" => demos,
                     "References" => "function_reference.md",
                     "api_comparison.md",
                    #  "faqs.md"
                    ])

demos_cb()
pkgs_cb()

deploydocs(repo      = "github.com/JuliaImages/juliaimages.github.io.git",
           target    = "build",
           branch    = branch,
           push_preview = true,
           devbranch = "source",
           deps      = nothing,
           make      = nothing)
