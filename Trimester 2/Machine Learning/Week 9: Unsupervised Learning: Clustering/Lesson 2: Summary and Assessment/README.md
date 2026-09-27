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
- Feature scaling must be applied across all distance-based algorithms to keep large numeric scales from dominating the grouping.

Assessment Review and Practice Scenarios:

- Question: Why does standard K-Means fail to group concentric circle datasets correctly?
- Answer: K-Means relies on straight-line Euclidean distance from a central prototype, restricting its decision boundaries to linear Voronoi partitions that cannot model non-linear boundaries.
- Question: How does complete linkage differ from single linkage in agglomerative hierarchical clustering?
- Answer: Single linkage computes the distance between the closest pair of points across two clusters, while complete linkage calculates the distance between the farthest pair, producing more compact clusters.
- Question: What is the effect of setting the DBSCAN epsilon parameter too high?
- Answer: An overly large epsilon causes separate dense regions to merge into a single large cluster and reduces the identification of legitimate noise points.
- Question: What does an average silhouette coefficient close to zero suggest about a clustering result?
- Answer: It indicates substantial cluster overlap, where points lie right along the decision boundaries between neighboring clusters.
- Scenario: An e-commerce platform needs to segment five million customer purchase records into compact customer tiers.
- Recommended approach: Use K-Means or Mini-Batch K-Means due to its computational efficiency on large tabular datasets.
- Scenario: Spatial coordinates from vehicle GPS sensors contain heavy noise and elongated traffic corridor routes.
- Recommended approach: Use DBSCAN to capture non-linear path structures while filtering out random sensor anomalies as noise.

Key Takeaways:

- K-Means provides fast centroid partitioning for spherical data but depends heavily on proper k selection and centroid initialization.
- Hierarchical clustering yields multi-level dendrogram structures without requiring k up front, but scales poorly on large data.
- DBSCAN identifies arbitrary shapes and isolates anomalies as noise using local density parameters.
- Silhouette analysis and Davies-Bouldin indices provide quantitative validation when reference class labels are unavailable.
- Algorithm selection depends on dataset size, cluster geometry, density consistency, and noise tolerance.
