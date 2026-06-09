---
title: W04 - Dimensionality Reduction Techniques
module: Statistical Modelling And Inferencing
week: W04 - Dimensionality Reduction Techniques
---

### t-Distributed Stochastic Neighbor Embedding (t-SNE)

#### [1. Clear Overview](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W01 - Overview of Feature Engineering/3.%20Working%20With%20Sample%20Dataset%20-%20I.md#1-clear-overview)

**t-SNE (t-Distributed Stochastic Neighbor Embedding)** is a powerful non-linear dimensionality reduction technique specifically optimized for **data [visualization](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W04 - Dimensionality Reduction Techniques/Readme.md#visualization)**. Unlike PCA, which focuses on preserving global variance (the "big picture"), t-SNE prioritizes the preservation of **local structure**, ensuring that data points that are close together in the high-dimensional space remain clustered together in the low-dimensional 2D or 3D projection.

#### [2. Theoretical Framework](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W04 - Dimensionality Reduction Techniques/Principal%20Component%20Analysis.md#2-theoretical-framework)

t-SNE operates through a probabilistic approach to capture neighborhood relationships:

- **High-Dimensional Similarity:** It calculates pairwise similarities between points in the original space, treating them as probabilities. Points close to each other have a high probability of being neighbors.
    
- **Low-Dimensional Mapping:** It attempts to reproduce these probabilities in a 2D or 3D space.
    
- **The "Crowding Problem" & t-distribution:** When projecting high-dimensional data into 2D, points often become "crowded." t-SNE uses the **Student's t-distribution** in the low-dimensional space, which has "heavier tails" than a normal distribution. This effectively pushes apart points that are not immediate neighbors, preventing cluster overlap and allowing the [visualization](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W04 - Dimensionality Reduction Techniques/Readme.md#visualization) to "spread out" distinct groups.
    

#### 3. Strategic Usage: [Visualization](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W04 - Dimensionality Reduction Techniques/Readme.md#visualization) vs. Engineering

It is critical to distinguish t-SNE from true feature extraction (like PCA or SVD):

- **[Visualization](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W04 - Dimensionality Reduction Techniques/Readme.md#visualization) Tool:** t-SNE is designed for exploratory data analysis (EDA). It helps practitioners identify hidden clusters, group similarities, and detect anomalies.
    
- **Not for Feature Engineering:** The output coordinates produced by t-SNE are **not stable** across different runs (it is a stochastic process). Furthermore, these coordinates do not represent a meaningful transformation that can be applied to new, unseen data. Therefore, you **cannot** use t-SNE coordinates as features for training a predictive model.
    

#### [4. Python Implementation](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W03 - General Feature Engineering Techniques/L2/Feature%20Demonstration%20Filter%203.md#4-python-implementation)

t-SNE is implemented in scikit-learn. Because it is computationally expensive ($O(N^2)$ or $O(N \log N)$), it is often preceded by a PCA step to reduce the initial feature dimensionality before applying t-SNE.

Python

```
from sklearn.manifold import TSNE
import matplotlib.pyplot as plt

## t-SNE preserves local structure; ideal for finding clusters
tsne = TSNE(n_components=2, perplexity=30, random_state=42)
X_tsne = tsne.fit_transform(X_scaled)

## Visualize the resulting 2D space
plt.scatter(X_tsne[:, 0], X_tsne[:, 1], c=labels)
plt.title("t-SNE Visualization")
plt.show()
```

#### 5. Comparison: t-SNE vs. PCA

|**Feature**|**PCA**|**t-SNE**|
|---|---|---|
|**Objective**|Preserve Global Variance|Preserve Local Neighborhoods|
|**Linearity**|Linear|Non-linear|
|**Output Stability**|Deterministic (same input = same output)|Stochastic (different runs = different output)|
|**Primary Use**|Feature Extraction/Compression|Exploratory Data [Visualization](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W04 - Dimensionality Reduction Techniques/Readme.md#visualization)|
|**Predictive Utility**|High (can be used for training)|None (cannot be used for training)|

#### [6. Application Summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W03 - General Feature Engineering Techniques/L2/Feature%20Demonstration%20Filter%201.md#6-application-[summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W07 - Feature Engineering Techniques for Time-Series Data/Module%20Summary.md#[summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W07 - Feature Engineering Techniques for Time-Series Data/Overview.md#summary)))

Use t-SNE when you need to "see" your data to understand its topology—for instance, verifying if your classes are naturally separable or identifying if your clustering algorithm is failing due to poor data structure. If you need a deterministic, reproducible feature set for training a predictive model, **rely on PCA or SVD instead.**

Would you like to discuss the concept of "Perplexity" in t-SNE—the parameter that dictates how many neighbors the algorithm considers—or should we move to a different module?

Tags: #statistics #machine-learning #data-science #statistical-modelling