# Hierarchical Clustering: Agglomerative Methods & Linkage Criteria

The transcript you provided is mostly accurate, but it glosses over a critical technical distinction: it conflates **Average Linkage** with **Centroid Linkage**. Average linkage (specifically UPGMA) calculates the mean distance between *all* pairs of points across two clusters. Centroid linkage calculates the distance between the *centroids* (means) of the two clusters. In high-dimensional or irregularly shaped data, these behave very differently. We will clarify this and build a rigorous, production-grade understanding of Hierarchical Clustering.

> [!IMPORTANT]
> Hierarchical Clustering does not require you to specify the number of clusters ($K$) upfront. Instead, it builds a hierarchy (a tree) of clusters. You decide where to "cut" the tree to get your final flat clusters based on business logic or a distance threshold.

## [1. Concept Introduction](./1.%20Concept%20Introduction.md)

## [2. Intuition: The Corporate Merger](./2.%20Intuition%20-%20The%20Corporate%20Merger.md)

## [3 & 4. Mathematical Explanation & Formula Breakdowns](./3%20%26%204.%20Mathematical%20Explanation%20%26%20Formula%20Breakdowns.md)

## [5. Step-by-Step Derivations (Agglomerative Process)](./5.%20Step-by-Step%20Derivations%20%28Agglomerative%20Process%29.md)

## [6. Real-World Analogies](./6.%20Real-World%20Analogies.md)

## [7 & 8. Python Implementations & Simulations](./7%20%26%208.%20Python%20Implementations%20%26%20Simulations.md)

## [9. Practical Engineering Examples](./9.%20Practical%20Engineering%20Examples.md)

## [10. Common Mistakes & Traps](./10.%20Common%20Mistakes%20%26%20Traps.md)

## [11 & 12. Visual Intuition & System Architecture](./11%20%26%2012.%20Visual%20Intuition%20%26%20System%20Architecture.md)

## [13 & 14. Real-World Applications & ML Connections](./13%20%26%2014.%20Real-World%20Applications%20%26%20ML%20Connections.md)
