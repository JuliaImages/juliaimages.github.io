# Conversions vs. views

## Sharing memory: an introduction to views

In [Arrays, Numbers, and Colors](@ref) we discussed how one can
convert the element type of an array `a = [1,2,3,4]` using a syntax
like `Float64.(a)`. You might be curious what affect, if any,
`Int.(a)` has:

```julia
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

```julia
julia> a === b   # note: 3 equal signs!
false
```

or more generally by setting a value and seeing whether the change is
reflected in the other:

```julia
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

```julia
julia> v = view(a, :)
4-element SubArray{Int64,1,Array{Int64,1},Tuple{Colon},true}:
 1
 2
 3
 4
```

Now, `v` and `a` have the same values but are distinct objects:

```julia
julia> v == a
true

julia> v === a
false
```

However, **they share the same memory**:

```julia
julia> v[1] = 10
10

julia> v
4-element SubArray{Int64,1,Array{Int64,1},Tuple{Colon},true}:
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

```julia
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

```julia
julia> r = reshape(1:15, 3, 5)
3×5 Base.ReshapedArray{Int64,2,UnitRange{Int64},Tuple{}}:
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

[Arrays, Numbers, and Colors](@ref) also introduced the fixed-point
numbers used in some representations of color (or grayscale)
information. If you want to switch representation, you can use the
`reinterpret` function:

```julia
julia> using FixedPointNumbers

julia> x = 0.5N0f8
0.502N0f8

julia> y = reinterpret(x)  # alternatively, use: reinterpret(UInt8, x)
0x80

julia> reinterpret(N0f8, y)
0.502N0f8
```

You can apply this to arrays:

```julia
julia> a = [0.2N0f8, 0.8N0f8]
2-element Array{FixedPointNumbers.UFixed{UInt8,8},1}:
 0.2N0f8
 0.8N0f8

julia> b = reinterpret.(a)
2-element Array{UInt8,1}:
 0x33
 0xcc
```

Because of the `f.(a)` call, `b` does not share memory with `a`:

```julia
julia> b[2] = 0xff
0xff

julia> a
2-element Array{FixedPointNumbers.UFixed{UInt8,8},1}:
 0.2N0f8
 0.8N0f8
```

Often this might not be a problem, but sometimes you might wish that
these referenced the same underlying object.  For such situations,
JuliaImages, through the
[ImageCore](https://github.com/JuliaImages/ImageCore.jl) package
(which is bundled with Images), implements views that can perform this
reinterpretation:

```julia
julia> using Images

julia> v = rawview(a)
2-element Array{UInt8,1}:
 0x33
 0xcc

julia> v[2] = 0xff
0xff

julia> a
2-element Array{FixedPointNumbers.UFixed{UInt8,8},1}:
 0.2N0f8
 1.0N0f8
```

The opposite transformation is `ufixedview`:

```julia
julia> c = [0x11, 0x22]
2-element Array{UInt8,1}:
 0x11
 0x22

julia> ufixedview(c)
2-element Array{FixedPointNumbers.UFixed{UInt8,8},1}:
 0.067N0f8
 0.133N0f8
```

`ufixedview` allows you to pass the interpreted type as the first
argument, i.e., `ufixedview(N0f8, A)`, and indeed it's required to do
so unless `A` has element type `UInt8`, in which case `ufixedview`
assumes you want `N0f8`.

Like `reshape`, both `rawview` and `ufixedview` might return an
`Array` or a more complicated type (a `MappedArray` from the
[MappedArrays package](https://github.com/JuliaArrays/MappedArrays.jl)),
depending on the types of the inputs.

## Color separations: views for converting between numbers and colors

In [Arrays, Numbers, and Colors](@ref), we pointed out that one can
convert a numeric array to a grayscale array with `Gray.(a)`; the
opposite transformation can be performed with `real.(b)`. Handling RGB
colors is a little more complicated, because the dimensionality of the
array changes. One approach is to use Julia's comprehensions:

```julia
julia> a = reshape(collect(0.1:0.1:0.6), 3, 2)
3×2 Array{Float64,2}:
 0.1  0.4
 0.2  0.5
 0.3  0.6

julia> c = [RGB(a[1,j], a[2,j], a[3,j]) for j = 1:2]
2-element Array{ColorTypes.RGB{Float64},1}:
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

To address these weaknesses, JuliaImages provides two complementary view types, `ColorView` and `ChannelView`:

```julia
julia> colv = colorview(RGB, a)
2-element Array{ColorTypes.RGB{Float64},1}:
 RGB{Float64}(0.1,0.2,0.3)
 RGB{Float64}(0.4,0.5,0.6)

julia> chanv = channelview(c)
3×2 Array{Float64,2}:
 0.1  0.4
 0.2  0.5
 0.3  0.6
```

`colorview` and `channelview` *always* return a view of the original
array; whether they return an `Array` or a `ColorView`/`ChannelView`
again depends on the input types.

## Using colorview to make color overlays

Another use for `colorview` is to combine multiple grayscale images into a single color image. For example:

```julia
using Colors, Images
r = linspace(0,1,11)
b = linspace(1,0,11)
img1d = colorview(RGB, r, zeroarray, b)
```

results (in IJulia) in

![linspace](assets/conversions_views/linspace.png)

`zeroarray` is a special constant that "expands" to return the
equivalent of an all-zeros array matching the indices of the other
inputs to `colorview`.

## Changing the order of dimensions

When you've separated colors into a separate color dimension, some
code might assume that color is the last (slowest) dimension. You can
convert directly using Julia's `permutedims` function:

```julia
julia> pc = permutedims(a, (2,1))
2×3 Array{Float64,2}:
 0.1  0.2  0.3
 0.4  0.5  0.6
```

`permutedims` explicitly creates a new array with the data rearranged in memory. It's also possible to perform something similar
as a view:

```julia
julia> pv = permuteddimsview(a, (2,1))
2×3 permuteddimsview(::Array{Float64,2}, (2,1)) with element type Float64:
 0.1  0.2  0.3
 0.4  0.5  0.6
```

While this looks the same, `pv` (unlike `pc`) shares memory with `a`; this is
an *apparent* permutation, achieved by having the indexing of a
`permuteddimsview` array swap the input indexes whenever individual
elements are accessed.

One thing to be aware of is that the performance of these two might
differ, for reasons that have to do with how CPUs and memory work
rather than any limitation of Julia. If `a` is large and you want to
access all three elements corresponding to the color channels of a
single pixel, `pv` will likely be more efficient because values are
adjacent in memory and thus likely share a cache line. Conversely, if
you want to access different pixels from a single color channel
sequentially, `pc` may be more efficient (for the same reason).

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
Base.PermutedDimsArrays.PermutedDimsArray{Float64,2,(2,1),(2,1),Array{Float64,2}}
```

but when you display such an object, in the summary line it prints as

```julia
permuteddimsview(::Array{Float64,2}, (2,1)) with element type Float64
```

This is intended to result in more easily-readable information about
types.

The main motivation for this is that different view types can be
combined freely, and when you do so sometimes the type gets quite
long. For example, suppose you have a disk file storing a `m×n×3×t
UInt8` array representing an RGB movie (`t` being the time axis). To
have it display as an RGB movie, you might create the following view of
the array `A`:

```julia
mov = colorview(RGB, ufixedview(permuteddimsview(A, (3,1,2,4))))
```

If you show `mov` at the REPL, the `summary` prints like this:

```julia
ColorView{RGB}(ufixedview(N0f8, permuteddimsview(::Array{UInt8,4}, (3,1,2,4)))) with element type ColorTypes.RGB{FixedPointNumbers.UFixed{UInt8,8}}
```

which may be somewhat easier to read than the type:

```julia
ImageCore.ColorView{ColorTypes.RGB{FixedPointNumbers.UFixed{UInt8,8}},3,MappedArrays.MappedArray{FixedPointNumbers.UFixed{UInt8,8},4,Base.PermutedDimsArrays.PermutedDimsArray{UInt8,4,(3,1,2,4),(2,3,1,4),Array{UInt8,4}},ImageCore.##29#30{FixedPointNumbers.UFixed{UInt8,8}},Base.#reinterpret}}
```

While there is little or no performance cost to making use of
JuliaImage's convenient views, sometimes the types can get
complicated! The strategy adopted here is to
[ShowItLikeYouBuildIt](https://github.com/JuliaArrays/ShowItLikeYouBuildIt.jl).
