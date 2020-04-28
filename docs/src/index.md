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

This documentation is a collection of several parts:

* The "Tutorials" part contains a list of tutorials that help you gain better understanding of the JuliaImages
  ecosystem.
* The ["Packages"](@ref page_packages_index) part contains information about specific components (themselves
  Julia packages) that together comprise JuliaImages and address specific subfields of image processing.
* The "Demos" part gives you demonstrations of how to carry out specific tasks with JuliaImages.
* The ["References"](@ref page_references) part is a collection of function references provided by JuliaImages.
  The recommended way to use the references is by the searching function of your browser `Ctrl-F`/`Cmd-F`.
* The ["Comparison with other image processing frameworks"](@ref page_api_comparison) would be helpful
  if you've used other frameworks previously.
