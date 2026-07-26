## QUESTION 4 (10 Marks)
A municipal body collects data on 8 environmental indicators for 60 cities to build a “Green City Index.” A Principal Component Analysis (PCA) is performed on the standardized data. 

**PCA Results - Eigenvalues:**
| Component | Eigenvalue | Proportion of Variance |
| :--- | :--- | :--- |
| PC1 | 3.60 | 45.0% |
| PC2 | 1.80 | 22.5% |
| PC3 | 1.10 | 13.8% |
| PC4 | 0.65 | 8.1% |
| PC5 | 0.40 | 5.0% |
| PC6 | 0.22 | 2.8% |
| PC7 | 0.13 | 1.6% |
| PC8 | 0.10 | 1.2% |
| **Total** | **8.00** | **100%** |

*(Note: The Kaiser criterion recommends retaining components with eigenvalue > 1.)*

**Questions:**
*   **Part (a) [4 marks]:** Using the Kaiser criterion, how many principal components should be retained? What is the cumulative variance explained by the retained components? Explain why PCA is performed on standardized data rather than raw data when variables have different units.

After the PCA analysis, the municipal body also wants to group the 60 cities into clusters. A hierarchical clustering (agglomerative, using Ward’s linkage) was performed on 6 pilot cities (P, Q, R, S, T, U). The merging sequence from the dendrogram is:

| Stage | Clusters Merged | Distance at Merge |
| :--- | :--- | :--- |
| 1 | P and Q | 1.8 |
| 2 | T and U | 2.5 |
| 3 | {P, Q} and R | 4.2 |
| 4 | S and {T, U} | 5.0 |
| 5 | {P, Q, R} and {S, T, U} | 11.5 |

*   **Part (b) [3 marks]:** Using the merging distances above, identify where the largest “gap” occurs between successive merge distances. Based on this gap, how many clusters would you recommend? List the cities in each cluster. Explain the difference between Ward’s linkage and single linkage methods.
*   **Part (c) [3 marks]:** A colleague suggests using K-Means clustering instead. State one advantage of hierarchical clustering over K-Means and one advantage of K-Means over hierarchical clustering. If the number of cities were 10,000 instead of 60, which method would you prefer and why?

Here is the step-by-step solution for **QUESTION 4**.

---

### **Part (a) [4 marks]: Principal Component Analysis (PCA)**

**1. Number of Principal Components to Retain (Kaiser Criterion):**
The Kaiser criterion recommends retaining components with an eigenvalue greater than 1 ($> 1$). 
Looking at the table:
*   PC1: 3.60 (> 1)
*   PC2: 1.80 (> 1)
*   PC3: 1.10 (> 1)
*   PC4: 0.65 (< 1)

Therefore, **3 principal components** should be retained.

**2. Cumulative Variance Explained:**
To find the cumulative variance, sum the proportions of variance for the retained components:
Cumulative Variance = PC1 + PC2 + PC3 
Cumulative Variance = $45.0\% + 22.5\% + 13.8\%$ = **81.3%**
*(The retained components explain 81.3% of the total variance in the dataset).*

**3. Why PCA is performed on standardized data:**
PCA looks for directions (principal components) that maximize the variance in the data. If variables are on completely different scales or units (e.g., measuring carbon emissions in millions of tons vs. particulate matter in micrograms), the variables with larger numerical ranges will exhibit artificially higher variance. If raw data is used, PCA will incorrectly give these large-scale variables the most weight, ignoring the actual underlying correlations. Standardizing the data (scaling variables to have a mean of 0 and a variance of 1) ensures that every environmental indicator contributes equally to the analysis at the start.

---

### **Part (b) [3 marks]: Hierarchical Clustering and Linkage Methods**

**1. Identify the Largest Gap in Merge Distances:**
Let's calculate the difference (gap) between successive merge distances:
*   Gap between Stage 1 and 2: $2.5 - 1.8 = 0.7$
*   Gap between Stage 2 and 3: $4.2 - 2.5 = 1.7$
*   Gap between Stage 3 and 4: $5.0 - 4.2 = 0.8$
*   Gap between Stage 4 and 5: $11.5 - 5.0 = \mathbf{6.5}$

The largest gap occurs **between Stage 4 and Stage 5**.

**2. Recommended Number of Clusters and List of Cities:**
A large jump in merge distance indicates that we are forcing two highly dissimilar clusters to merge. Therefore, we should "cut" the dendrogram right *before* this massive jump occurs (before Stage 5).
*   **Recommended Clusters:** Cutting before Stage 5 leaves us with **2 clusters**. 
*   **Cities in Each Cluster:** Based on the state of the clusters at the end of Stage 4, the clusters are:
    *   **Cluster 1:** {P, Q, R}
    *   **Cluster 2:** {S, T, U}

**3. Ward’s Linkage vs. Single Linkage:**
*   **Ward’s Linkage:** This method evaluates the distance between two clusters by calculating the increase in the total within-cluster variance (or Sum of Squared Errors) after merging them. It seeks to minimize this variance, which tends to produce compact, spherical, and relatively evenly-sized clusters.
*   **Single Linkage:** This method defines the distance between two clusters as the shortest distance between any single data point in the first cluster and any single data point in the second cluster (the "nearest neighbor" approach). While it can identify non-elliptical cluster shapes, it is highly prone to "chaining" (where loose, elongated clusters merge prematurely due to a single close pair of points).

---

### **Part (c) [3 marks]: Comparing K-Means and Hierarchical Clustering**

**1. Advantage of Hierarchical Clustering over K-Means:**
*   **No need to pre-specify $K$:** Hierarchical clustering does not require you to input the number of clusters beforehand. It produces a dendrogram (a visual tree), allowing the user to inspect the data's structure and decide on the optimal number of clusters later (as done in Part b). Furthermore, it is a deterministic algorithm, meaning it will always yield the exact same result for the same dataset, whereas K-Means can yield different results depending on the initial random placement of centroids.

**2. Advantage of K-Means over Hierarchical Clustering:**
*   **Computational Efficiency:** K-Means is much faster and more memory-efficient for large datasets. Its time complexity is linear, roughly $O(n)$, whereas hierarchical clustering has a time complexity of $O(n^3)$ or $O(n^2 \log n)$ and requires generating an $N \times N$ distance matrix, which consumes massive amounts of memory as the dataset grows.

**3. Method Preference for 10,000 Cities:**
If the dataset scaled to 10,000 cities, I would prefer **K-Means clustering**.
*   **Why:** Hierarchical clustering for 10,000 data points would require computing and storing a distance matrix of $10,000 \times 10,000$ (100 million distances), which is highly memory-intensive and computationally slow. K-Means scales extremely well to thousands (or millions) of data points and would be able to partition the 10,000 cities rapidly and efficiently.
