# Hierarchical Clustering: Agglomerative Methods & Linkage Criteria

The transcript you provided is mostly accurate, but it glosses over a critical technical distinction: it conflates **Average Linkage** with **Centroid Linkage**. Average linkage (specifically UPGMA) calculates the mean distance between *all* pairs of points across two clusters. Centroid linkage calculates the distance between the *centroids* (means) of the two clusters. In high-dimensional or irregularly shaped data, these behave very differently. We will clarify this and build a rigorous, production-grade understanding of Hierarchical Clustering.

> [!IMPORTANT]
> Hierarchical Clustering does not require you to specify the number of clusters ($K$) upfront. Instead, it builds a hierarchy (a tree) of clusters. You decide where to "cut" the tree to get your final flat clusters based on business logic or a distance threshold.

## [1. Concept Introduction](./1.%20Concept%20Introduction.md)
