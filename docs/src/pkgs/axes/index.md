# ImageAxes.jl

While images can often be represented as plain `Array`s, sometimes
additional information about the "meaning" of each axis of the array
is needed.  For example, in a 3-dimensional MRI scan, the voxels may
not have the same spacing along the z-axis that they do along the x-
and y-axes, and this fact should be accounted for during the display
and/or analysis of such images.  Likewise, a movie has two spatial
axes and one temporal axis; this fact may be relevant for how one
performs image processing.

The ImageAxes package (which is incorporated into Images) combines
features from [AxisArrays](https://github.com/mbauman/AxisArrays.jl)
and [SimpleTraits](https://github.com/mauro3/SimpleTraits.jl) to
provide a convenient representation and programming paradigm for
dealing with such images.

## Installation

If you want to directly use `ImageAxes`, `add` it via the package manager.

## Usage

### Names and locations

The simplest thing you can do is to provide names to your image axes:

```@example 1
using ImageAxes
img = AxisArray(reshape(1:192, (8,8,3)), :x, :y, :z)
```

As described in more detail in the [AxisArrays documentation](https://github.com/mbauman/AxisArrays.jl), you can now take slices like this:

```@example 1
slz = img[Axis{:z}(2)]
```
```@example 1
slx = img[Axis{:x}(2)]
```
```@example 1
sly = img[Axis{:y}(2)]
```

You can also give units to the axes:

```@example
using ImageAxes, Unitful
const mm = u"mm"
img = AxisArray(reshape(1:192, (8,8,3)),
                Axis{:x}(1mm:1mm:8mm),
                Axis{:y}(1mm:1mm:8mm),
                Axis{:z}(2mm:3mm:8mm))
```

which specifies that `x` and `y` have spacing of 1mm and `z` has a
spacing of 3mm, as well as the location of the center of each voxel.

### Temporal axes

Any array possessing an axis `Axis{:time}` will be recognized as
having a temporal dimension.  Given an array `A`,

```@example 2
using ImageAxes, Unitful
const s = u"s"
img = AxisArray(reshape(1:9*300, (3,3,300)),
                Axis{:x}(1:3),
                Axis{:y}(1:3),
                Axis{:time}(1s/30:1s/30:10s))
```

you can retrieve its temporal axis with

```@example 2
ax = timeaxis(img)
```

and index it like

```@example 2
img[ax(4)]  # returns the 4th "timeslice"
```

You can also specialize methods like this:

```@example
using ImageAxes, SimpleTraits
@traitfn nimages(img::AA) where {AA<:AxisArray;  HasTimeAxis{AA}} = length(timeaxis(img))
@traitfn nimages(img::AA) where {AA<:AxisArray; !HasTimeAxis{AA}} = 1
```

where the pre-defined `HasTimeAxis` trait will restrict that method to
arrays that have a timeaxis. A more complex example is

```julia
using ImageAxes, SimpleTraits, Statistics

@traitfn meanintensity(img::AA) where {AA<:AxisArray; !HasTimeAxis{AA}} = mean(img)
@traitfn function meanintensity(img::AA) where {AA<:AxisArray; HasTimeAxis{AA}}
    ax = timeaxis(img)
    n = length(ax)
    intensity = zeros(eltype(img), n)
    for ti in 1:n
        sl = view(img, ax(ti))
        intensity[ti] = mean(sl)
    end
    intensity
end
```

and, when appropriate, it will return the mean intensity at each timeslice.

#### Custom temporal axes

Using `SimpleTraits`'s `@traitimpl`, you can add `Axis{:t}` or
`Axis{:scantime}` or any other name to the list of axes that have a
temporal dimension:

```@example
using ImageAxes, SimpleTraits
@traitimpl TimeAxis{Axis{:t}}
```

Note this declaration affects all arrays throughout your entire
session.  Moreover, it should be made before calling any functions on
array-types that possess such axes; a convenient place to do this is
right after you say `using ImageAxes` in your top-level script.
