# Migration in progress
# Lesson 2: Summary and Assessment

Clustering Algorithms Summary:

- K-Means partitions data into k spherical clusters by iteratively alternating between point assignment and centroid updates.
- K-Means operates efficiently with linear time complexity per iteration relative to sample size, but requires specifying k in advance.
- Agglomerative hierarchical clustering merges point pairs bottom-up based on linkage rules such as single, complete, average, or Ward linkage.
- Hierarchical clustering creates an interpretable dendrogram tree structure, but its quadratic memory requirement limits scalability to large datasets.
- DBSCAN discovers clusters of arbitrary non-linear shapes based on spatial point density determined by epsilon radius and minimum neighborhood points.
- DBSCAN separates unclustered anomalies into noise points, making it robust against outliers.

Selecting Cluster Counts and Validation:

- The elbow method plots within-cluster sum of squares against k values, seeking an inflection point where additional clusters yield diminishing returns.
- The silhouette coefficient evaluates individual point cohesion versus separation from neighboring clusters, bounded between minus one and plus one.
- A higher average silhouette score indicates well-separated, compact groupings, while negative scores indicate misassigned points.
- Davies-Bouldin index evaluates cluster overlap, where lower numerical values represent distinct and tightly clustered groups.
- External validation metrics such as the Adjusted Rand Index compare clustering outputs to known ground-truth labels when benchmarks exist.
- Important: Unsupervised validation metrics evaluate geometric compactness and separation, which may not always reflect true real-world business utility.

Comparison Across Algorithms:

- K-Means performs best on spherical, similarly sized clusters with continuous variables and requires pre-scaled features.
- Hierarchical clustering works well for small datasets where nested cluster hierarchies provide domain insight, such as biological taxonomies.
- DBSCAN excels when data contains irregularly shaped clusters and severe noise, though it struggles with varying regional densities.
- Feature scaling must be applied across all distance-based algorithms to