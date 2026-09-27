# Week 9: Unsupervised Learning: Clustering

Clustering Fundamentals:

- Clustering is an unsupervised learning task that groups unlabeled data points based on feature similarity.
- Similarity is computed using distance metrics such as Euclidean distance, Manhattan distance, or Cosine similarity.
- Distance calculations depend directly on feature magnitudes, which makes feature standardization or normalization essential prior to clustering.
- High similarity within the same cluster and low similarity between different clusters indicate good clustering quality.

K-Means Clustering:

- K-Means is a centroid-based partitioning algorithm that assigns observations to a predefined number of clusters denoted by k.
- The algorithm begins by initializing k centroids in the feature space.
- Each data point is assigned to its closest centroid based on Euclidean distance.
- Centroids are recomputed by taking the mean of all points assigned to each cluster.
- Assignment and update steps repeat iteratively until centroid positions stabilize or maximum iterations are reached.
- The objective is to minimize inertia, which is the sum of squared distances between points and their assigned centroids.
- Standard random initialization can lead to poor local optima, making K-Means++ initialization the preferred method for spreading initial centroids apart.
- Important: K-Means assumes spherical clusters of similar size and density, making it perform poorly on complex, elongated, or non-linear cluster shapes.
- The elbow method plots inertia against various values of k to locate the point where reductions in inertia begin to level off.

Hierarchical Clustering:

- Hierarchical clustering builds a tree-like hierarchy of clusters without requiring the number of clusters to be chosen beforehand.
- Agglomerative clustering operates bottom-up, starting with every point as its own cluster and merging the closest pairs iteratively.
- Divisive clustering operates top-down, starting with all points in a single cluster and splitting them recursively.
- Single linkage measures distance between the closest points of two clusters, often creating long chain-like clusters.
- Complete linkage measures distance between the farthest points of two clusters, favoring compact spherical shapes.
- Average linkage calculates the average distance between all pairs of points across clusters.
- Ward linkage minimizes the total within-cluster variance when merging clusters.
- A dendrogram displays the hierarchical merge history, allowing users to choose an appropriate cluster count by cutting the tree horizontally.
- Important: Hierarchical clustering requires substantial computational memory and time, making it difficult to scale to very large datasets.

DBSCAN Density-Based Clustering:

- DBSCAN groups points based on local spatial density and can identify clusters of arbitrary shapes.
- The algorithm uses two primary hyperparameters: epsilon, which defines the neighborhood radius, and minPts, which sets the minimum number of points required within that radius.
- A core point contains at least minPts within its epsilon neighborhood.
- A border point contains fewer than minPts within its radius but falls inside the neighborhood of a core point.
- A noise point does not meet core requirements and is not reachable from any core point.
- Noise points are treated as anomalies rather than forced into unnatural clusters.
- DBSCAN struggles when datasets contain clusters of widely differing densities or when feature spaces have very high dimensions.

Clustering Evaluation Metrics:

- Internal evaluation metrics evaluate cluster separation and compactness without relying on true reference labels.
- The silhouette coefficient measures how similar a point is to its own cluster compared to neighboring clusters, with values ranging from minus one to plus one.
- A silhouette score close to plus one indicates strong separation and compact clusters, while values near zero indicate overlapping groups.
- The Davies-Bouldin index evaluates the ratio of within-cluster distances to between-cluster distances, where lower scores represent superior clustering.
- External metrics such as the Adjusted Rand Index compare predicted cluster assignments against ground truth labels when reference data is available.

Key Takeaways:

- Clustering organizes unlabeled observations into groups based on measured distance or spatial density.
- Feature scaling is mandatory to prevent high-magnitude features from dominating distance calculations.
- K-Means efficiently partitions data into k spherical clusters by iteratively updating centroid positions.
- Hierarchical clustering provides a dendrogram view of data grouping without requiring k in advance, but it scales poorly on large datasets.
- DBSCAN detects non-linear cluster geometries and isolates noise points using radius and density thresholds.
- Cluster performance is measured internally using silhouette analysis and Davies-Bouldin scores, or externally using ground truth indices.
