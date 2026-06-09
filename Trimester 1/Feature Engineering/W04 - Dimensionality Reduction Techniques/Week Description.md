---
title: W04 - Dimensionality Reduction Techniques
module: Statistical Modelling And Inferencing
week: W04 - Dimensionality Reduction Techniques
---

This module focuses on **Dimensionality Reduction**, a critical set of techniques for managing high-dimensional datasets where the number of features can obscure underlying patterns or lead to the "curse of dimensionality."

### 1. The Necessity of Dimensionality Reduction

In modern machine learning, datasets frequently contain hundreds or thousands of features (e.g., pixel intensities, word embeddings). High dimensionality poses three primary challenges:

- **The Curse of Dimensionality:** As dimensions increase, data points become sparse in space, making proximity-based algorithms (like KNN or K-Means) ineffective.
    
- **Computational Complexity:** Increased dimensions lead to higher memory usage and slower training times.
    
- **Overfitting:** Models with excessive features are prone to "memorizing" noise rather than generalizing the signal.
    

### 2. Principal Component Analysis (PCA)

PCA is a linear transformation technique that reduces dimensionality while retaining the maximum possible variance.

- **Mathematical Intuition:** It identifies orthogonal axes, called **Principal Components (PCs)**, which are linear combinations of the original features. The first PC captures the direction of maximum variance, and subsequent PCs capture remaining variance in perpendicular directions.
    
- **Core Components:**
    
    - **Covariance Matrix:** Represents how features vary together.
        
    - **Eigenvectors:** Define the axes of the new feature space.
        
    - **Eigenvalues:** Measure the variance (information) captured by each component.
        
- **Use Case:** Excellent for noise reduction and [preprocessing](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W03 - General Feature Engineering Techniques/L1/Demonstration.md#preprocessing) for linear models.
    

### 3. Singular Value Decomposition (SVD)

SVD is a fundamental matrix factorization technique that decomposes a matrix $X$ into three distinct parts: $X = U \Sigma V^T$.

- **Core Intuition:** It breaks the data into:
    
    - **$U$:** Left singular vectors (relationships between data points).
        
    - **$\Sigma$:** Singular values (importance/strength of each relationship).
        
    - **$V^T$:** Right singular vectors (relationships between features).
        
- **Truncated SVD:** By keeping only the top components (truncation), we effectively filter out noise. It is often preferred over PCA for **sparse matrices** (e.g., text data) because it does not require mean-centering.
    

### 4. [t-Distributed Stochastic Neighbor Embedding (t-SNE)](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W04 - Dimensionality Reduction Techniques/t-SNE.md#t-distributed-stochastic-neighbor-embedding-t-sne)

t-SNE is a non-linear dimensionality reduction technique designed specifically for data [visualization](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W04 - Dimensionality Reduction Techniques/Readme.md#visualization).

- **Local vs. Global Structure:** While PCA preserves global variance, t-SNE prioritizes preserving **local neighborhoods**. Points close together in high-dimensional space are kept close in the 2D/3D projection.
    
- **Crowding Problem:** It utilizes the Student's t-distribution in the low-dimensional space to alleviate "crowding," allowing for clearer cluster separation.
    
- **Important Note:** t-SNE is **stochastic** (different runs can produce different results) and is intended solely for **[visualization](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W04 - Dimensionality Reduction Techniques/Readme.md#visualization)**. Its output coordinates are typically not meaningful features for model training.
    

### 5. Technique Comparison [Summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W07 - Feature Engineering Techniques for Time-Series Data/Module%20Summary.md#[summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W07 - Feature Engineering Techniques for Time-Series Data/Overview.md#summary))

|**Technique**|**Goal**|**Linearity**|**Primary Usage**|
|---|---|---|---|
|**PCA**|Variance Retention|Linear|Data compression & [preprocessing](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W03 - General Feature Engineering Techniques/L1/Demonstration.md#preprocessing)|
|**SVD**|Latent Factorization|Linear|Recommendation systems & Sparse data|
|**t-SNE**|Local Structure|Non-linear|Exploratory Data [Visualization](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W04 - Dimensionality Reduction Techniques/Readme.md#visualization)|

**Best Practice:** Use PCA or SVD when you need reproducible, stable features for a predictive model. Use t-SNE when you need to "see" your data structure to verify class separability or find hidden clusters during exploratory data analysis (EDA).

Would you like to explore the code implementation for these techniques, or would you like to discuss the trade-offs between "Linear" vs "Non-linear" dimensionality reduction in more detail?

Tags: #statistics #machine-learning #data-science #statistical-modelling