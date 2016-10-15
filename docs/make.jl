using Documenter

makedocs(format   = :html,
         sitename = "JuliaImages",
         pages    = ["Home"=>"index.md", "install.md", "arrays_colors.md", "conversions_views.md", "troubleshooting.md"])

deploydocs(repo    = "github.com/JuliaImages/juliaimages.github.io.git",
           target  = "build",
           branch  = "master",
           latest  = "source",
           julia   = "0.5",
           osname  = "linux",
           deps    = nothing,
           make    = nothing)
