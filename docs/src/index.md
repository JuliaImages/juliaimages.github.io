# JuliaImages: image processing and machine vision for Julia

JuliaImages ([source code](https://github.com/JuliaImages)) hosts the
major [Julia](http://julialang.org/) packages for image processing.
Julia is well-suited to image processing because it is a modern and
elegant high-level language that is a pleasure to use, while also
allowing you to write "inner loops" that compile to efficient machine
code (i.e., it is as fast as C).  Julia supports multithreading and,
through add-on packages, GPU processing.

JuliaImages is a collection of packages specifically focused on image
processing.  It is not yet as complete as some toolkits for other
programming languages, but it has many useful algorithms.  It is
focused on clean architecture and is designed to unify "machine
vision" and "biomedical 3d image processing" communities.

These pages are designed to help you get started with image analysis
in Julia.

!!! note

    Please help improve this documentation--if something confuses you, chances
    are you're not alone. It's easy to do as you read along: just click on the
    "Edit on GitHub" link above, and then
    [edit the files directly in your browser](https://help.github.com/articles/editing-files-in-another-user-s-repository/).
    Your changes will be vetted by developers before becoming permanent, so don't
    worry about whether you might say something wrong.

This documentation is a collection of two parts: a top-level documentation that guides you into the
JuliaImages ecosystem, and a list of more specific documentation of sub-packages that gives you more
information of each image processing subfields.

The "Tutorials" part contains a list of tutorials that help you gain better understanding of the JuliaImages
ecosystems. The ["Packages"](@ref page_packages_index) part contains all related sub-packages in JuliaImages,
users can get more information on the specific image processing subfields by reading them. The "Demos"
part gives you a task-by-task introduction of how you could do your daily work with JuliaImages.
The "References" part is a collection of function references, it's a dictionary of functions in JuliaImages
and the recommended way to use it is by the searching function of your browser `Ctrl-F`/`Cmd-F`.

This documentation is generated with the following environment setup. While reading the documentation,
if you encounter any errors or if the outputs in your local machine differ from the documentation,
you could first check the Julia and package versions you're using. If the error or inconsistency still exists,
please [file an issue](https://github.com/JuliaImages/juliaimages.github.io/issues/new) for that; it
helps us improve the documentation.

```@setup versions
using InteractiveUtils
```
```@repl versions
using Pkg, Dates
today()
versioninfo()
Pkg.status()
```
