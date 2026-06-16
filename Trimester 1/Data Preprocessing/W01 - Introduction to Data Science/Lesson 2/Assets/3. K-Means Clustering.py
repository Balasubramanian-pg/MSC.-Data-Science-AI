import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans

## 1. Generate synthetic data representing customer segments (e.g., spending vs. frequency)
X, y_true = make_blobs(
    n_samples=500, 
    centers=4, 
    cluster_std=0.60, 
    random_state=42
)

## 2. Initialize and fit the KMeans algorithm
## Using 'k-means++' ensures smarter centroid initialization to avoid local minima
kmeans_model = KMeans(
    n_clusters=4, 
    init='k-means++', 
    n_init=10, 
    max_iter=300, 
    random_state=42
)
cluster_assignments = kmeans_model.fit_predict(X)
centroids = kmeans_model.cluster_centers_

## 3. Visual Intuition
plt.figure(figsize=(10, 6))

## Plot the grouped data points
plt.scatter(
    X[:, 0], X[:, 1], 
    c=cluster_assignments, 
    cmap='viridis', 
    s=30, 
    alpha=0.6,
    label='Data Points'
)

## Plot the learned centroids
plt.scatter(
    centroids[:, 0], centroids[:, 1], 
    c='red', 
    s=200, 
    marker='X', 
    label='Cluster Centroids'
)

plt.title("Market Segmentation: Minimizing Intra-Cluster Distance")
plt.xlabel("Feature 1: Purchase Frequency (Normalized)")
plt.ylabel("Feature 2: Annual Spending (Normalized)")
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()

## 4. Extracting Mathematical Properties
print(f"Algorithm Converged in {kmeans_model.n_iter_} iterations.")
print(f"Final WCSS (Inertia): {kmeans_model.inertia_:.2f}")
