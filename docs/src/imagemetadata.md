# ImageMetadata.jl

ImageMetadata (a package incorporated into Images) allows you to add
metadata to images: for example, the date and time at which it was
collected, identifiers for the location or subject, etc. This metadata
is stored as a dictionary, and the `ImageMeta` type combines
properties of arrays and `Dict`.

## Introduction

You typically create an `ImageMeta` using keyword arguments:

```jldoctest
julia> using Colors, ImageMetadata, Dates

julia> img = ImageMeta(fill(RGB(1,0,0), 3, 2), date=Date(2016, 7, 31), time="high noon")
RGB ImageMeta with:
  data: 3×2 Array{RGB{N0f8},2} with eltype RGB{Normed{UInt8,8}}
  properties:
    time: high noon
    date: 2016-07-31
```

```@meta
DocTestSetup = quote
    using Colors, ImageMetadata, Dates
    img = ImageMeta(fill(RGB(1,0,0), 3, 2), date=Date(2016, 7, 31), time="high noon")
end
```

You can then index elements of `img` like this:

```jldoctest
julia> img[1,2]
RGB{N0f8}(1.0,0.0,0.0)
```

and access and set properties like this:

```jldoctest
julia> img["time"]
"high noon"

julia> img["time"] = "evening"
"evening"

julia> img
RGB ImageMeta with:
  data: 3×2 Array{RGB{N0f8},2} with eltype RGB{Normed{UInt8,8}}
  properties:
    time: evening
    date: 2016-07-31
```

You can extract the data matrix with `data(img)`:

```jldoctest
julia> data(img)
3×2 Array{RGB{N0f8},2} with eltype RGB{Normed{UInt8,8}}:
 RGB{N0f8}(1.0,0.0,0.0)  RGB{N0f8}(1.0,0.0,0.0)
 RGB{N0f8}(1.0,0.0,0.0)  RGB{N0f8}(1.0,0.0,0.0)
 RGB{N0f8}(1.0,0.0,0.0)  RGB{N0f8}(1.0,0.0,0.0)
```

and the properties dictionary with `properties`:

```jldoctest
julia> properties(img)
Dict{String,Any} with 2 entries:
  "time" => "high noon"
  "date" => 2016-07-31
```

Properties are not accessed or modified by most of Images'
algorithms---the traits that most affect processing are encoded
through Julia's type system.  However, functions that receive an
`ImageMeta` should return an `ImageMeta` when appropriate. Naturally,
in your own code it's fine to use properties to your advantage for
custom tasks.

If you index a scalar location (a single pixel), `img[i,j,...]` will return just the value
of that pixel. But if you index a range, you get another `ImageMeta`:

```jldoctest
julia> c = img[1:2, 1:2]
RGB ImageMeta with:
  data: 2×2 Array{RGB{N0f8},2} with eltype RGB{Normed{UInt8,8}}
  properties:
    time: high noon
    date: 2016-07-31
```

This copies both the data (just the relevant portions) and the properties dictionary. In contrast,

```jldoctest
julia> v = view(img, 1:2, 1:2)
RGB ImageMeta with:
  data: 2×2 view(::Array{RGB{N0f8},2}, 1:2, 1:2) with eltype RGB{Normed{UInt8,8}}
  properties:
    time: high noon
    date: 2016-07-31
```

shares both the data and the properties with the original image
`img`. Modifying values or properties in `c` has no impact on `img`,
but modifying values or properties in `v` does.


### copyproperties/shareproperties

Two convenient ways to construct a new image with the "same"
properties are `copyproperties` (makes a copy of the properties
dictionary) and `shareproperties` (shares the properties dictionary).

Incidentally, `similar` makes a copy of the properties dictionary.

### spatialproperties

Occasionally you may have a property that is linked to the spatial
axes of the image. In such cases, one source for potential confusion
is `permutedims`, which swaps the order of the dimensions in the
array: if the order is not also swapped in the appropriate properties,
chaos could result.

You can declare that certain properties are coupled to spatial axes
using `"spatialproperties"`:

```jldoctest
julia> using ImageMetadata

julia> A = reshape(1:15, 3, 5)
3×5 reshape(::UnitRange{Int64}, 3, 5) with eltype Int64:
 1  4  7  10  13
 2  5  8  11  14
 3  6  9  12  15

julia> img = ImageMeta(A, spatialproperties=Set(["maxsum"]), maxsum=[maximum(sum(A,dims=1)), maximum(sum(A,dims=2))])
Int64 ImageMeta with:
  data: 3×5 reshape(::UnitRange{Int64}, 3, 5) with eltype Int64
  properties:
    maxsum: [42, 45]
    spatialproperties: Set(["maxsum"])

julia> imgp = permutedims(img, (2,1))
Int64 ImageMeta with:
  data: 5×3 Array{Int64,2}
  properties:
    maxsum: [45, 42]
    spatialproperties: Set(["maxsum"])

julia> maximum(sum(imgp, dims=1))
45
```

It's not possible to anticipate all the possible transformations that
might be necessary, but at least simple swaps are handled automatically.
