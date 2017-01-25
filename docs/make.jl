using Documenter, Images, ImageFiltering

makedocs(format   = :html,
         sitename = "JuliaImages",
         pages    = ["Home"=>"index.md", "install.md", "quickstart.md", "arrays_colors.md", "conversions_views.md", "indexing.md", "imageaxes.md", "imagefiltering.md", "imagemetadata.md", "troubleshooting.md", "function_reference.md"])

deploydocs(repo    = "github.com/JuliaImages/juliaimages.github.io.git",
           target  = "build",
           branch  = "master",
           latest  = "source",
           julia   = "0.5",
           osname  = "linux",
           deps    = nothing,
           make    = nothing)
