using Documenter

makedocs(format   = Documenter.Formats.HTML,
         sitename = "JuliaImages",
         pages    = ["index.md"])

deploydocs(repo    = "github.com/JuliaImages/juliaimages.github.io.git",
           branch  = "master",
           julia   = "0.5",
           osname  = "linux",
           deps    = nothing,
           make    = nothing)
