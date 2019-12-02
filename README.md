# juliaimages.org

Documentation For [JuliaImages](https://github.com/JuliaImages), the organization for image processing with Julia.

[![](https://img.shields.io/badge/docs-latest-blue.svg)](https://juliaimages.org/latest/) [![Build Status](https://travis-ci.org/JuliaImages/juliaimages.github.io.svg?branch=source)](https://travis-ci.org/JuliaImages/juliaimages.github.io)

Note that the source files for the documentation are on the `source`
branch; `master` is used only for deploying the generated HTML
content.

## Adding demos

Users are invited to add demonstrations carrying out particular tasks, for example like the gallery for [scikit-image](http://scikit-image.org/docs/stable/auto_examples/).
The current procedure is as follows:

- `git clone` a copy of this repository and initialize the project by `julia --project=. -e 'using Pkg; Pkg.instantiate()'`
- write your julia source codes to `docs/examples` in [Literate Syntax](https://fredrikekre.github.io/Literate.jl/stable/fileformat/#Syntax-1) and [Documenter Syntax](https://juliadocs.github.io/Documenter.jl/stable/man/syntax/). Powered by [DemoCards.jl](https://github.com/johnnychen94/DemoCards.jl), assets can be generated on the fly.
- Build the documentation locally with `julia --project=. docs/make.jl`. Inspect it (by opening `docs/build/index.html` in a browser) to make sure all is well.
- Commit your changes (including all new files) and submit a pull request.

`DemoCards.jl` as a plugin package to [Documenter](https://github.com/JuliaDocs/Documenter.jl) is used to manage all the demos, check the [DemoCards Quickstart](https://johnnychen94.github.io/DemoCards.jl/stable/democards/quickstart/index.html) for more details.