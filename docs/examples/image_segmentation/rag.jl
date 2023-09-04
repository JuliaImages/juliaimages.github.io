# ---
# cover: assets/rag.gif
# title: Region Adjacency Graph
# description: This demo shows how to use the region_adjacency_graph
# author: Ashwani Rathee
# date: 2021-09-5
# ---

# In this demonstraton, we will study about region adjacency graph and region tree.

# Region Adjacency Graph (RAG), $G=V,E$, is composed of nodes/vertices representing the regions and edges representing the adjacency.
# Region Adjacency Graphs, as the name suggests represent adjacency of regions
# with a graph. Each region in the image is a node in a graph.

# There is an edge between every pair of adjacent regions (regions whose pixels are 
# adjacent). The weight of between every two nodes can be defined in a variety of ways.
# For this example, we will use the difference of average color between two regions as
# their edge weight. The more similar the regions, the lesser the weight between
# them. Because we are using difference in mean color to compute the edge weight,
# the method has been named rag_mean_color.

# # Creating a Region Adjacency Graph (RAG)

# A region adjacency graph can directly be constructed from a SegmentedImage
# using the `region_adjacency_graph` function. Each segment is denoted by a 
# vertex and edges are constructed between adjacent segments. The output 
# is a tuple of SimpleWeightedGraph and a Dict(label=>vertex) with weights assigned according to weight_fn.

using Images
using ImageSegmentation, Distances, TestImages

# We will use coffee image for this demonstration.

img = testimage("coffee")
seg = felzenszwalb(img, 10, 100)

# Here we calculate the weight of the graph edges using euclidean distance between 
# 2 segments.

weight_fn(i,j) = euclidean(segment_pixel_count(seg, i), segment_pixel_count(seg, j))

# `region_adjacency_graph` requires the seg which has provides label map and weight to
# create the graph.

G, vert_map = region_adjacency_graph(seg, weight_fn)

# G is an undirected simple Int64 graph with Float64 weights. `region_adjacency_graph`
# returns the RAG along with a Dict(label=>vertex) map.

# Here, the difference in pixel count has been used as the weight 
# of the connecting edges. This difference measure can be useful 
# if one wants to use this region adjacency graph to remove smaller
# segments by merging them with their neighbouring largest segment.
# Another useful difference measure is the euclidean distance 
# between the mean intensities of the two segments.


# ## Creating a Region Tree

# A region tree can be constructed from an image using `region_tree` function. 
# If the image is not homogeneous, then it is split into half along each 
# dimension and the function is called recursively for each portion of the 
# image. The output is a RegionTree.

function homogeneous(img)
    min, max = extrema(img)
    max - min < 0.2
end

t = region_tree( Gray.(img), homogeneous)        # `img` is an image


save("assets/rag.gif", cat(img, Gray.(img); dims=3); fps=1) #src
