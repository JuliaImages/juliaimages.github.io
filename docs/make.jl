using Documenter, Images, ImageFiltering, ImageSegmentation, ImageFeatures

makedocs(format   = :html,
         sitename = "JuliaImages",
         pages    = [      "Home"=>"index.md",
                           "install.md",
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
                           "function_reference.md",
                           "api_comparison.md"
                  ])

deploydocs(repo    = "github.com/JuliaImages/juliaimages.github.io.git",
           target  = "build",
           branch  = "master",
           latest  = "source",
           julia   = "0.6",
           osname  = "linux",
           deps    = nothing,
           make    = nothing)
