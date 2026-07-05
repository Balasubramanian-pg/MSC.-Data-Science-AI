# Question

**What is the most likely impact of not scaling features before applying KMeans clustering?**

### Options

* Increased convergence speed
* Biased clustering due to feature magnitude dominance
* Improved silhouette score
* More meaningful cluster centroids

### Answer

✅ **Biased clustering due to feature magnitude dominance**

> [!NOTE]
> **Reason**
>
> KMeans relies on distance calculations to assign observations to clusters.
>
> Without scaling, variables with larger numeric ranges disproportionately influence the clustering process.
>
> As a result, clusters become biased toward high-magnitude features rather than reflecting the true underlying structure of the data.
