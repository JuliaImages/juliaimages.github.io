using Documenter

makedocs(format   = Documenter.Formats.HTML,
         sitename = "JuliaImages",
         pages    = ["index.md", "install.md", "troubleshooting.md"])

deploydocs(repo    = "github.com/JuliaImages/juliaimages.github.io.git",
           branch  = "master",
           latest  = "source",
           julia   = "0.5",
           osname  = "linux",
           deps    = nothing,
           make    = nothing)
