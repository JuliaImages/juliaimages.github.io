# juliaimages.github.io

Documentation For [JuliaImages](https://github.com/JuliaImages), the organization for image processing with Julia.

[![](https://img.shields.io/badge/docs-latest-blue.svg)](https://juliaimages.github.io/latest)

Note that the source files for the documentation are on the `source`
branch; `master` is used only for deploying the generated HTML
content.

## Adding demos

Users are invited to add demonstrations carrying out particular tasks, for example like the gallery for [scikit-image](http://scikit-image.org/docs/stable/auto_examples/).
The current procedure is as follows:

- `git clone` a copy of this repository
- Add a new [markdown file](https://en.wikipedia.org/wiki/Markdown) to `docs/src/demos` for your demo. Generally demos should contain one or more images, which should be added to `docs/src/assets/demos`. (If you have many images in your demo, consider creating a subdirectory for your images.)
- Add a "card" for your demo in `docs/src/demos.md`, using one of the images you added as a "thumbnail" advertising your demo.
- Build the documentation locally with `julia make.jl` from `docs/`. Inspect it (by opening `docs/build/index.html` in a browser) to make sure all is well.
- Commit your changes (including all new files) and submit a pull request.
