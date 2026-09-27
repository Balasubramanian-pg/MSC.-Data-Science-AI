# Migration in progress
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
- A dendrogram displays the hierarchical merge history