# [Conversions vs. views](@id page_conversions_views)

## Sharing memory: an introduction to views

In [Arrays, Numbers, and Colors](@ref page_arrays_colors) we discussed how one can
convert the element type of an array `a = [1,2,3,4]` using a syntax
like `Float64.(a)`. You might be curious what affect, if any,
`Int.(a)` has:

```jldoctest
julia> a = [1,2,3,4]
4-element Array{Int64,1}:
 1
 2
 3
 4

julia> b = Int.(a)
4-element Array{Int64,1}:
 1
 2
 3
 4
```

There's certainly no obvious change, and as you'd expect `b == a`
returns `true`.  Beyond having equal size and elements, there's a more
extensive notion of "sameness": do `a` and `b` refer to the *same*
storage area in memory?  We can test that in the following ways:

```jldoctest; setup = :(a = [1,2,3,4]; b = Int.(a))
julia> a === b   # note: 3 equal signs!
false
```

or more generally by setting a value and seeing whether the change is
reflected in the other:

```jldoctest; setup = :(a = [1,2,3,4]; b = Int.(a))
julia> b[1] = 5
5

julia> b
4-element Array{Int64,1}:
 5
 2
 3
 4

julia> a
4-element Array{Int64,1}:
 1
 2
 3
 4
```

Since the types of `a` and `b` are identical, both tests tell us that
`a` and `b` are independent objects, even if they (initially) had the
same values.

This occurs because `f.(a)` (which calls the function `broadcast(f,
a)`) always allocates a new array to return its values. However, not
all functions operate this way. One good example is `view`:

```jldoctest; setup = :(a = [1,2,3,4])
julia> v = view(a, :)
4-element view(::Array{Int64,1}, :) with eltype Int64:
 1
 2
 3
 4
```

`v` and `a` have the same values, but again they are distinct objects:

```jldoctest; setup = :(a = [1,2,3,4]; v = view(a, :))
julia> v == a
true

julia> v === a
false
```

However, **they share the same memory**:

```jldoctest; setup = :(a = [1,2,3,4]; v = view(a, :))
julia> v[1] = 10
10

julia> v
4-element view(::Array{Int64,1}, :) with eltype Int64:
 10
  2
  3
  4

julia> a
4-element Array{Int64,1}:
 10
  2
  3
  4
```

Consequently, `v` is a "view" of the values stored in `a`.  While this
usage of `view` is trivial, more generally it can be used to select a
rectangular region of interest, which is a common operation in image
processing; this region is selected without copying any data, and any
manipulations of the values within this region are reflected in the
original (parent) array. See the documentation on `view`, by typing
`?view`, for more information.

`view` is not the only function with this property: another good
example is `reshape`, which can be used to change the dimensions of an
array:

```jldoctest; setup = :(a = [10,2,3,4])
julia> r = reshape(a, 2, 2)
2×2 Array{Int64,2}:
 10  3
  2  4

julia> r[1,2] = 7
7

julia> r
2×2 Array{Int64,2}:
 10  7
  2  4

julia> a
4-element Array{Int64,1}:
 10
  2
  7
  4
```

Notice that the return type of `reshape` is just an `Array`, one which
happens to be serving as a view of `a`. However, some inputs cannot be
represented as a view with an `Array`. For example:

```jldoctest
julia> r = reshape(1:15, 3, 5)
3×5 reshape(::UnitRange{Int64}, 3, 5) with eltype Int64:
 1  4  7  10  13
 2  5  8  11  14
 3  6  9  12  15
```

A `UnitRange` is represented compactly---storing only the starting and
stopping values---so there is no memory location that can be referenced to
access all values. In such cases, `reshape` returns a `ReshapedArray`,
which is a generic "view type" that handles reshaping of any kind of
`AbstractArray`.

The output of both `view` and `reshape` are *always* views: make a
change in either the parent or the view, and the change is reflected
in the other.

## Views for "converting" between fixed-point and raw representations

[Arrays, Numbers, and Colors](@ref page_arrays_colors) also introduced the fixed-point
numbers used in some representations of color (or grayscale)
information. If you want to switch representation, you can use the
`reinterpret` function:

```jldoctest
julia> using FixedPointNumbers

julia> x = 0.5N0f8
0.502N0f8

julia> y = reinterpret(x)  # alternatively, use: reinterpret(UInt8, x)
0x80

julia> reinterpret(N0f8, y)
0.502N0f8
```

You can apply this to arrays:

```jldoctest; setup = :(using FixedPointNumbers)
julia> a = [0.2N0f8, 0.8N0f8]
2-element Array{N0f8,1} with eltype Normed{UInt8,8}:
 0.2N0f8
 0.8N0f8

julia> b = reinterpret.(a)
2-element Array{UInt8,1}:
 0x33
 0xcc
```

Because of the `f.(a)` call, `b` does not share memory with `a`:

```jldoctest; setup = :(using FixedPointNumbers; a = [0.2N0f8, 0.8N0f8]; b = reinterpret.(a))
julia> b[2] = 0xff
0xff

julia> a
2-element Array{N0f8,1} with eltype Normed{UInt8,8}:
 0.2N0f8
 0.8N0f8
```

Often this might not be a problem, but sometimes you might wish that
these referenced the same underlying object.  For such situations,
JuliaImages, through the
[ImageCore](https://github.com/JuliaImages/ImageCore.jl) package
(which is bundled with Images), implements views that can perform this
reinterpretation:

```jldoctest; setup = :(using FixedPointNumbers; a = [0.2N0f8, 0.8N0f8])
julia> using Images

julia> v = rawview(a)
2-element reinterpret(UInt8, ::Array{N0f8,1}):
 0x33
 0xcc

julia> v[2] = 0xff
0xff

julia> a
2-element Array{N0f8,1} with eltype Normed{UInt8,8}:
 0.2N0f8
 1.0N0f8
```

We can understand clearly from below code that `v` is an immutable object, or is just 
a reference of `a`. It doesn't has a separate memory allocated to it:

```jldoctest; setup = :(using Images)
julia> a = [0.2N0f8,0.8N0f8]
2-element Array{N0f8,1} with eltype Normed{UInt8,8}:
 0.2N0f8
 0.8N0f8

julia> v = rawview(a)
2-element reinterpret(UInt8, ::Array{N0f8,1}):
 0x33
 0xcc

julia> pointer_from_objref(a) #function used to find address of an object
Ptr{Nothing} @0x00000000144adc90

julia> pointer_from_objref(v) #v is just a immutable reference to a, no separate memory allocated to it.
ERROR: pointer_from_objref cannot be used on immutable objects
Stacktrace:
 [1] error(::String) at .\error.jl:33
 [2] pointer_from_objref(::Any) at .\pointer.jl:146
 [3] top-level scope at none:1
 ```

The opposite transformation is `normedview`:

```jldoctest; setup = :(using Images)
julia> c = [0x11, 0x22]
2-element Array{UInt8,1}:
 0x11
 0x22

julia> normedview(c)
2-element reinterpret(N0f8, ::Array{UInt8,1}):
 0.067N0f8
 0.133N0f8
```

`normedview` allows you to pass the interpreted type as the first
argument, i.e., `normedview(N0f8, A)`, and indeed it's required to do
so unless `A` has element type `UInt8`, in which case `normedview`
assumes you want `N0f8`.

Like `reshape`, both `rawview` and `normedview` might return an
`Array` or a more complicated type (a `ReinterpretArray`, or a
`MappedArray` from the
[MappedArrays package](https://github.com/JuliaArrays/MappedArrays.jl)),
depending on the types of the inputs.

## Color separations: views for converting between numbers and colors

In [Arrays, Numbers, and Colors](@ref page_arrays_colors), we pointed out that one can
convert a numeric array to a grayscale array with `Gray.(a)`; the
opposite transformation can be performed with `real.(b)`. Handling RGB
colors is a little more complicated, because the dimensionality of the
array changes. One approach is to use Julia's comprehensions:

```jldoctest; setup = :(using ColorTypes)
julia> a = reshape(collect(0.1:0.1:0.6), 3, 2)
3×2 Array{Float64,2}:
 0.1  0.4
 0.2  0.5
 0.3  0.6

julia> c = [RGB(a[1,j], a[2,j], a[3,j]) for j = 1:2]
2-element Array{RGB{Float64},1} with eltype RGB{Float64}:
 RGB{Float64}(0.1,0.2,0.3)
 RGB{Float64}(0.4,0.5,0.6)

julia> x = [getfield(c[j], i) for i = 1:3, j = 1:2]
3×2 Array{Float64,2}:
 0.1  0.4
 0.2  0.5
 0.3  0.6
```

While this approach works, it's not without flaws:

- this implementation relies on the two-dimensionality of `a`; a 3d array (producing a 2d color image) would need a different implementation
- the use of `getfield` assumes that elements of `c` have fields and that they are in the order `r`, `g`, `b`. Given the large number of different representations of RGB supported by [ColorTypes](https://github.com/JuliaGraphics/ColorTypes.jl), neither of these assumptions is entirely safe.
- it always makes a copy of the data

To address these weaknesses, JuliaImages provides two complementary view function, `colorview` and `channelview`:

```jldoctest; setup = :(using Images; a = reshape(collect(0.1:0.1:0.6), 3, 2); c = [RGB(a[1,j], a[2,j], a[3,j]) for j = 1:2])
julia> colv = colorview(RGB, a)
2-element reshape(reinterpret(RGB{Float64}, ::Array{Float64,2}), 2) with eltype RGB{Float64}:
 RGB{Float64}(0.1,0.2,0.3)
 RGB{Float64}(0.4,0.5,0.6)

julia> chanv = channelview(c)
3×2 reinterpret(Float64, ::Array{RGB{Float64},2}):
 0.1  0.4
 0.2  0.5
 0.3  0.6
```

`colorview` and `channelview` *always* return a view of the original
array.

## Using colorview to make color overlays

Another use for `colorview` is to combine multiple grayscale images into a single color image. For example:

```jldoctest
using Colors, Images
r = range(0,stop=1,length=11)
b = range(1,stop=0,length=11)
img1d = colorview(RGB, r, zeroarray, b)

# output

11-element mappedarray(RGB{Float64}, ImageCore.extractchannels, ::StepRangeLen{Float64,Base.TwicePrecision{Float64},Base.TwicePrecision{Float64}}, ::ImageCore.ZeroArray{Float64,1,Base.OneTo{Int64}}, ::StepRangeLen{Float64,Base.TwicePrecision{Float64},Base.TwicePrecision{Float64}}) with eltype RGB{Float64}:
 RGB{Float64}(0.0,0.0,1.0)
 RGB{Float64}(0.1,0.0,0.9)
 RGB{Float64}(0.2,0.0,0.8)
 RGB{Float64}(0.3,0.0,0.7)
 RGB{Float64}(0.4,0.0,0.6)
 RGB{Float64}(0.5,0.0,0.5)
 RGB{Float64}(0.6,0.0,0.4)
 RGB{Float64}(0.7,0.0,0.3)
 RGB{Float64}(0.8,0.0,0.2)
 RGB{Float64}(0.9,0.0,0.1)
 RGB{Float64}(1.0,0.0,0.0)
```

results (in IJulia) in

![linspace](assets/conversions_views/linspace.png)

`zeroarray` is a special constant that "expands" to return the
equivalent of an all-zeros array with axes matching the other
inputs to `colorview`.

## Changing the order of dimensions

When you've separated colors into a separate color dimension, some
code might assume that color is the last (slowest) dimension. You can
convert directly using Julia's `permutedims` function:

```jldoctest; setup = :(a = reshape(collect(0.1:0.1:0.6), 3, 2))
julia> pc = permutedims(a, (2,1))
2×3 Array{Float64,2}:
 0.1  0.2  0.3
 0.4  0.5  0.6
```

`permutedims` explicitly creates a new array with the data rearranged in memory. It's also possible to perform something similar
as a view:

```jldoctest; setup = :(using Images; a = reshape(collect(0.1:0.1:0.6), 3, 2))
julia> pv = PermutedDimsArray(a, (2,1))
2×3 PermutedDimsArray(::Array{Float64,2}, (2, 1)) with eltype Float64:
 0.1  0.2  0.3
 0.4  0.5  0.6
```

While this looks the same, `pv` (unlike `pc`) shares memory with `a`; this is
an *apparent* permutation, achieved by having the indexing of a
`PermutedDimsArray` swap the input indexes whenever individual
elements are accessed.

One thing to be aware of is that the performance of these two might
differ, for reasons that have to do with how CPUs and memory work
rather than any limitation of Julia. If `a` is large and you want to
access all three elements corresponding to the color channels of a
single pixel, `pv` will likely be more efficient because values are
adjacent in memory and thus likely share a cache line. Conversely, if
you want to access different pixels from a single color channel
sequentially, `pc` may be more efficient (for the same reason).

## Adding padding

Sometimes when you want to compare two images, one might be of a
different size than another. You can create array views that have
common indices with `paddedviews`:

```jldoctest; setup = :(using Images)
julia> a1 = reshape([1,2], 2, 1)
2×1 Array{Int64,2}:
 1
 2

julia> a2 = [1.0,2.0]'
1×2 LinearAlgebra.Adjoint{Float64,Array{Float64,1}}:
 1.0  2.0

julia> a1p, a2p = paddedviews(0, a1, a2);   # 0 is the fill value

julia> a1p
2×2 PaddedView(0, ::Array{Int64,2}, (Base.OneTo(2), Base.OneTo(2))) with eltype Int64:
 1  0
 2  0

julia> a2p
2×2 PaddedView(0.0, ::LinearAlgebra.Adjoint{Float64,Array{Float64,1}}, (Base.OneTo(2), Base.OneTo(2))) with eltype Float64:
 1.0  2.0
 0.0  0.0
```

This can be especially useful in conjunction with `colorview` to
compare two (or more) grayscale images. See
[Keeping track of location with unconventional indices](@ref) for more
information.

## StackedViews

Sometimes it's helpful to combine several images into a single view for
further array-like manipulation.

```jldoctest; setup = :(using Images)
julia> img1 = reshape(1:8, (2,4))
2×4 reshape(::UnitRange{Int64}, 2, 4) with eltype Int64:
 1  3  5  7
 2  4  6  8

julia> img2 = reshape(11:18, (2,4))
2×4 reshape(::UnitRange{Int64}, 2, 4) with eltype Int64:
 11  13  15  17
 12  14  16  18

julia> sv = StackedView(img1, img2)
2×2×4 StackedView{Int64,3,Tuple{Base.ReshapedArray{Int64,2,UnitRange{Int64},Tuple{}},Base.ReshapedArray{Int64,2,UnitRange{Int64},Tuple{}}}}:
[:, :, 1] =
  1   2
 11  12

[:, :, 2] =
  3   4
 13  14

[:, :, 3] =
  5   6
 15  16

[:, :, 4] =
  7   8
 17  18

julia> imgMatrix = reshape(sv, (2, 8))
2×8 reshape(::StackedView{Int64,3,Tuple{Base.ReshapedArray{Int64,2,UnitRange{Int64},Tuple{}},Base.ReshapedArray{Int64,2,UnitRange{Int64},Tuple{}}}}, 2, 8) with eltype Int64:
  1   2   3   4   5   6   7   8
 11  12  13  14  15  16  17  18
```

## Decoupling views from the parent memory

If you want to use some of these views but have an application where
the sharing of memory is actually problematic, keep in mind that you
can always call Julia's `copy` function to create a copy of the
array. The type of the resulting copy might not be identical to the
original, but the values will be the same.

## Composing views (and compact summaries)

When Julia displays an array as text, there is usually a 1-line
summary at the top showing the array type. You may have already
noticed that JuliaImages uses an unconventional syntax for summarizing
information about certain kinds of arrays. For example, the type of
`pv` above is

```julia
PermutedDimsArray{Float64,2,(2,1),(2,1),Array{Float64,2}}
```

but when you display such an object, in the summary line it prints as

```julia
2×3 PermutedDimsArray(::Array{Float64,2}, (2, 1)) with eltype Float64
```

This is intended to result in more easily-readable information about
types.

The main motivation for this is that different view types can be
combined freely, and when you do so sometimes the type gets quite
long. For example, suppose you have a disk file storing a `m×n×3×t
UInt8` array representing an RGB movie (`t` being the time axis). To
have it display as an RGB movie, you might create the following view of
the array `A`:

```@setup view
using Images
using Random
Random.seed!(1234)
```

```@repl view
A = rand(UInt8, 5, 6, 3, 10);
mov = colorview(RGB, normedview(PermutedDimsArray(A, (3,1,2,4))));

summary(mov)
typeof(mov)
```

While there is little or no performance cost to making use of
JuliaImage's convenient views, sometimes the types can get
complicated!
