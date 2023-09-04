# ---
# cover: assets/felzenszwalb.gif
# title: Felzenszwalb Algorithm
# description: This demo shows how to use the felzenszwalb algorithm to segment an image.
# author: Ashwani Rathee
# date: 2021-09-5
# ---

# In this demonstration, we will try to understand Felzenszwalb's Region Merging Algorithm.

# # Felzenszwalb's Region Merging Algorithm
# `Efficient Graph-Based- Image- Segmentation`, which is commonly referred as
# `Felzenszwalb’s Algorithm` is powerful image segmentation method which uses
# graph based approach to segmentation. Elements(Pixels) in image can be considered as
# vertices and the weight of an edge is measure of the dissimilarity between two pixels
# connected by that edge(e.g. difference in intensity, color, motion,etc). The higher the weight,
# the less similar two pixels are.

# Let $G = (V, E)$ be an undirected graph with vertices $v_i ∈ V$, the set of elements 
# to be segmented, and edges $(v_i, v_j ) ∈ E$ corresponding to pairs of neighboring 
# vertices. Each edge $(v_i, v_j ) ∈ E$ has a corresponding weight $w((v_i, v_j ))$, which 
# is a non-negative measure of the dissimilarity between neighboring elements v_i and v_j

# S is a segmentation of a graph G such that G’ = (V, E’), where E’ ⊂ E . S divides G 
# into G’ such that it contains distinct components (or regions) C. 

using Images 
using ImageSegmentation, TestImages
using Random

# The algorithm follows a bottom-up procedure. Given G=(V,E) and |V|=n, 
# |E|=m. Where |V| is the number of vertices(pixels) and |E| is the number of edges.

# The algorithm follows a bottom-up procedure. Given $G=(V, E)$ and $|V|=n, |E|=m$:
# 1. Edges are sorted by weight in ascending order, labeled as $e_1, e_2, \dots, e_m$.
# 2. Initially, each pixel stays in its own component, so we start with $$n$$ components.
# 3. Repeat for $$k=1, \dots, m$$:
#     * The segmentation snapshot at the step $$k$$ is denoted as $$S^k$$.
#     * We take  the k-th edge in the order, $$e_k = (v_i, v_j)$$. 
#     * If $$v_i$$ and $$v_j$$ belong to the same component, do nothing and thus $$S^k = S^{k-1}$$.
#     * If $$v_i$$ and $$v_j$$ belong to two different components $$C_i^{k-1}$$ and $$C_j^{k-1}$$ as in the segmentation $$S^{k-1}$$, we want to merge them into one if $$w(v_i, v_j) \leq MInt(C_i^{k-1}, C_j^{k-1})$$; otherwise do nothing.

# The entire segmentation process can be visualized as below:
# #  ![](assets/felzenszwalb3.png)

# The quality of a segmentation is assessed by a pairwise region comparison predicate defined for given two regions $$C_1$$ and $$C_2$$:

# $D(C_1, C_2) = 
# \begin{cases}
#   \text{True} & \text{ if } Dif(C_1, C_2) > MInt(C_1, C_2) \\
#   \text{False} & \text{ otherwise}
# \end{cases}$

# Where,
# - **Internal difference**: $$Int(C) = \max_{e\in MST(C, E)} w(e)$$, where $$MST$$ is the minimum spanning tree of the
#     components. A component $$C$$ can still remain connected even when we have removed all the edges with weights < $$Int(C)$$.
# - **Difference between two components**: $$Dif(C_1, C_2) = \min_{v_i \in C_1, v_j \in C_2, (v_i, v_j) \in E} w(v_i, v_j)$$.
#    $$Dif(C_1, C_2) = \infty$$ if there is no edge in-between.
# - **Minimum internal difference**: $$MInt(C_1, C_2) = min(Int(C_1) + \tau(C_1), Int(C_2) + \tau(C_2))$$, where $$\tau(C) = k / \vert C \vert$$ 
#   helps make sure we have a meaningful threshold for the difference between components. With a higher $$k$$, 
#   it is more likely to result in larger components. 
# # ![](assets/felzenszwalb1.png)

# Only when the predicate holds True, we consider them as two independent components; otherwise the 
# segmentation is too fine and they probably should be merged.

function get_random_color(seed)
    Random.seed!(seed)
    rand(RGB{N0f8})
end

img = Gray.(testimage("coffee"))

# Now let's segment with `felzenszwalb` method which requires a image with - `img`,`k` which is threshold for region merging step
# i.e. larger threshold will result in bigger segments and `min_size` which sets minimum segment size (in pixels)

segments_k100 = felzenszwalb(img, 100) # k=100 (the merging threshold)
segments_k10 = felzenszwalb(img, 10) # k=10 

# Here let's visualize segmentation by creating an image with each label replaced by a random color:

result_klow  = map(i-> get_random_color(i), labels_map(segments_k10))
result_khigh  = map(i-> get_random_color(i), labels_map(segments_k100))

mosaic(img, result_klow, result_khigh; nrow=1)

# As we can see, higher k generates a very different image with bigger segments combined together.
# # ![](assets/felzenszwalb2.png)

save("assets/felzenszwalb.gif", cat(img, result_klow, result_khigh; dims=3); fps=1) #src

# # References:
# - https://lilianweng.github.io/lil-log/2017/10/29/object-recognition-for-dummies-part-1.html