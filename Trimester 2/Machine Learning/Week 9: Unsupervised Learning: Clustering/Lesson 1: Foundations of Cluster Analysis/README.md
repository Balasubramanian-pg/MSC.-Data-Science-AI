# Migration in progress
# Lesson 1: Foundations of Cluster Analysis

Overview of Cluster Analysis:

- Cluster analysis is an unsupervised learning technique that groups unlabeled observations based on patterns of similarity.
- Unlike classification, clustering does not use predefined class labels or target variables during training.
- The fundamental objective is to maximize similarity among items within the same cluster while minimizing similarity between distinct clusters.
- Common applications include customer market segmentation, document categorization, image segmentation, and anomaly detection.

Cluster Types and Structures:

- Well-separated clusters occur when every point within a cluster is closer to all points in that cluster than to any point in another cluster.
- Prototype-based clusters define a cluster as a collection of points that are closer to a central prototype or centroid than to other prototypes.
- Density-based clusters represent dense regions of points separated by low-density regions of noise or empty space.
- Graph-based or contiguous clusters form when points are grouped based on local connectivity or shared nearest neighbors.
- Hard clustering assigns each observation strictly to a single group, whereas soft or fuzzy clustering assigns membership probabilities across multiple groups.

Distance and Proximity Measures:

- Clustering results depend heavily on the mathematical function chosen to measure distance or proximity between points.
- Euclidean distance measures the straight-line geometric distance between two numeric points across dimensions.
- Manhattan distance calculates the sum of absolute differences along each feature axis, which works well for grid-like spaces.
- Minkowski distance provides a generalized metric that encompasses both Manhattan and Euclidean distances through an exponent parameter.
- Cosine similarity measures the cosine of the angle between two feature vectors, making it effective for high-dimensional text data where vector magnitude matters less than direction.
- Jaccard similarity evaluates the overlap between sets, which is useful when dealing with binary or presence-absence features.

Data Preprocessing Requirements:

- Raw numerical features often have drastically different units and scales, such as income in thousands versus age in tens.
- Unscaled features with large numerical magnitudes dominate distance