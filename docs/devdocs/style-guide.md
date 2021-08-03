---
date: 2021-08-03
---

# Style Guide

The following sections are extensions to [the Julia Style
Guide](https://docs.julialang.org/en/v1/manual/style-guide/) for JuliaImages ecosystem. Without
explicit statement, we follow the Julia style guide convention.

The purpose of this style guide is to make JuliaImages codebase more reliable and more easy to
read and maintain.

## Write storage-type agnostic code

In most of other languages and frameworks for image processing, there exists chaos and mixed usage
of `0-1` value range and `0-255` value range. This is because the storage type `UInt8` is mixed with
the computational type `Float32`/`Float64`. JuliaImages unifies these by introducing fixed-point
numbers, e.g., `N0f8` is stored internally using `UInt8` but ranges from `0` to `1`. Unless there
are some justified reasons, it is a bad practice to write codes like `img .= img ./ 255` or
`im2double(img)` variants.

## Consistant usage of 0-1 range

The rule of thumb in JuliaImages is that we consistantly treat all colors in a 0-1 range

## Use less macros

> "Most of the time, don't do metaprogramming." JuliaCon 2019 | Keynote: Professor Steven G. Johnson

Macros are magics, the more magic you use, the less maintainable the codebase is. Unless the usage is
justified, e.g., it makes the code more readable and/or performant (`@.`, `@inbounds`), we don't use
macros. Don't overuse macros only for convenient purposes.

Specifically, MacroTools.jl and other macro packages that aims to provide extended syntaxes are
delibrately not used; they are powerful but it makes the code a lot harder to understand.

## Write generic code

The entire JuliaImages ecosystem builds on top of various color types (e.g., `RGB`, `Gray`) and
various array types (e.g., `Array`, `OffsetArray`). There are more array types than you could have
know. To make the codes more reliable and usable, it is recommended to code in a generic way.

There are many cases that generic codes can't be achieved, but ideally, generic code in JuliaImages
means that your function should work regardless of

- colorant types: `RGB`, `Gray`, etc
- element types: `N0f8`, `Float32`
- array dimension
- array axes: `axes`

There are many convinient tools in ImageCore/Colors or Julia Base to support this. For example:

- to write colorant generic codes:
  - `color_type`/`base_color_type`/`base_colorant_type` extracts the colorant type
  - `gamutmin`/`gamutmax` gives you colorant range information
- to write element type generic codes:
  - `promote_type` promotes multiple types into a common type: `promote_type(Gray{N0f8},
    Gray{Float32}) == Gray{Float32}`
  - `float` converts to float type: `float(Gray{N0f8}) == Gray{Float32}`
  - `eltype` gives you the internal element type: `eltype(RGB{N0f8}) == N0f8`.
- to write dimension generic codes:
  - use `ndims` and perhaps `ntuple` to build the data: `ntuple(_->2, ndims(img))` gives
    `(2, 2,..., 2)`, which is `ndims(img)` number of `2`s.
  - use `CartesianIndexes` to loop the image instead of multi-level for loops
- to write axes generic codes:
  - use `axes` instead of `size`: for example, write `for i in axes(img, 1)` instead of
    `for i in 1:size(img, 1)`, as the latter version assumes your array to be 1-based indexing.
  - use linear indices instead of cartesian indices: for example, use `img[i]` instead of `img[x, y]`.
    This is because `img[1] == first(img)` holds unconditionally while `img[1, 1] == first(img)`
    doesn't. Linear indices can also be slightly faster than cartesian indices in inner most for loop.

[Test coverage](@ref style_test_coverage) section provides a check list for you to make sure your
codes are written generally. With that check list passed, it's highly likely that your code works
seamless with the JuliaImages ecosystem.

## Keep small dependency

Images.jl is an out-of-box solution for users of JuliaImages ecosystem. However, if you're
developing image processing packages, you should instead depends on the more lightweight
`ImageCore`/`ImageBase` (or even lightweight `Colors`).

## [Test coverage](@id style_test_coverage)

Various functions have their own limitations, so by no means your function should pass all the
checklist.

- type stability check: use `@inferred` macro to make sure your function are type stable.
- colorant type agnostic check: if your function supports different color space, make sure you have test cases
  for it. For example, `RGB`, `Gray`, `Lab`, `RGBA`, `GrayA` are good test candidates.
- elment type agnostic check: make sure your function outputs approximately the same results for `N0f8`,
  `Float32` and other storage types.
- axes agnostic check: `Array` and `OffsetArray`(e.g., `OffsetArray.centered(img)`) are good test
  candidates.
- dimension agnostic check: make sure your function accepts `Vector`, `Matrix` and `Array{T, 3}`
  inputs. For some function, 0-dimensional array (e.g., `x=zeros(); x[]=1.0`) is also worth testing.

## Naming guide

- maintain consistency with the [Julia Style Guide](https://docs.julialang.org/en/latest/manual/style-guide/)
- operations whose primary goal is to construct something should be nouns:
  - when the goal is to create a specific type, use the uppercase constructor name (e.g., `HOG()`)
  - when the type created depends on the inputs, use a lowercase function (e.g., `colorview`)
- operations that fetch a property or type parameter should be nouns (e.g., `axes`, `eltype`)
- for functions that compute something or perform an operation, start with a verb (e.g., `warp`)
- "lazy" computations should use the noun form (e.g., `mappedarray` rather than `maparray`)

More examples of current names that are consistent with these guidelines:

- `testimage`, `line` are fine as-is (by the "constructors are nouns" convention)
- `colorview` as a lazy computation is better than an alternative like `combinechannels`
- the new `build_histogram` and `adjust_histogram` (implemented in #761, #762) are better than `imhist` and `histeq` (which, for now, still remain)

Some examples of current names that would change due to these guidelines:

- `imfilter` violates the "start with a verb" convention. `filterarray`, `mapstencil` (inspired by `mapwindow`) would both be acceptable
- `imshow`->`showimage`
- while `dilate` is good, `tophat` seems wrong, though I don't immediately have a suggestion as to how to change it

## API specification

Because there are various algorithms to do one single task, we recommend the verb+noun+how API most
of the user-level codes. For example, `binarize(img, Otsu())` is read as "binarize the image using
Otsu method".

This takes advantage of Julia's native multiple dispatch. Things can be very different, but the idea
is to implement in the following way:

```julia
abstract type AbstractBinarizationMethod end

struct MyAlg <: AbstractBinarizationMethod
    # algorithm_specific_parameters
    ...
end

function binarize(img, alg::MyAlg)
    # do the implementation here
end
```

The good part of this design is that there is only one API introduced here, and users can expect the
output types to be implementation invariant.

## If possible, implement the in-place version

Many image processing algorithms admits a filter property: that it accepts an image (or series of
images), and then output another image (or series of images). This makes it both intuitive and
efficient to implement the in-place version first, and then wrap the out-of-place function with some
allocation and checks. Let's take clamp as an example

```julia
clmap01(img) = clamp01!(copy(img))

function clamp01!(img::AbstractArray{T}) where T
    map(x->clamp(x, zero(T), one(T)), img)
end
```

Providing an allocation-free in-place helps reducing unnecessary memory allocation. If an algorithm
is called multiple times, then one could pre-allocate a buffer to store the result of each call, and
thus makes the code faster by reducing unnecessary memory allocations.

## Documentation guide

- Properly cite the reference in the docstring of the implemented algorithms.
