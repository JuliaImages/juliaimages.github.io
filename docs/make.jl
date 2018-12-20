using Documenter, Images, ImageFiltering, ImageSegmentation, ImageFeatures

makedocs(format   = :html,
         sitename = "JuliaImages",
         assets   = [joinpath("assets", "style.css"),
                    ],
         pages    = ["Home"=>"index.md",
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
                         "imagefeatures.md",
                         "troubleshooting.md",
                     ],
                     "Demos" => Any[
                         "demos.md",
                         "demos/color_separations_svd.md",
                     ],
                     "function_reference.md",
                     "api_comparison.md",
                     ],
         html_edit_branch = "source")

deploydocs(repo      = "github.com/JuliaImages/juliaimages.github.io.git",
           target    = "build",
           branch    = "master",
           latest    = "source",
           julia     = "1.0",
           osname    = "linux",
           deps      = nothing,
           make      = nothing)
