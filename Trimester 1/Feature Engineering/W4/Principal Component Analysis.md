### Principal Component Analysis (PCA) Technical Notes

#### [1. Clear Overview](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W1/3.%20Working%20With%20Sample%20Dataset%20-%20I.md#1-clear-overview)

Principal Component Analysis (PCA) is an unsupervised dimensionality reduction technique that transforms a high-dimensional [dataset](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W3/Experiential%20Learning%20Activity.md#dataset) into a lower-dimensional subspace while retaining the maximum possible variance. It achieves this by creating new, uncorrelated features called **Principal Components (PCs)**, which are linear combinations of the original variables.

#### [2. Theoretical Framework](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W4/Singular%20Value%20Description.md#2-theoretical-framework)

PCA operates by identifying the directions of maximum variance in the data.

- **Covariance Matrix:** Captures how all pairs of features vary together.
    
- **Eigenvectors:** Define the directions of the new axes (the Principal Components) in the feature space.
    
- **Eigenvalues:** Represent the magnitude of variance captured by each corresponding eigenvector.
    

**The Procedure:**

1. **Standardize:** Scale the data (mean=0, variance=1) to prevent features with large magnitudes from dominating the analysis.
    
2. **Covariance:** Compute the covariance matrix.
    
3. **Decompose:** Calculate the eigenvalues and eigenvectors of the covariance matrix.
    
4. **Sort & Select:** Sort eigenvectors by descending eigenvalues. Keep the top $k$ eigenvectors to form the new feature space.
    
5. **Project:** Multiply the original data by the selected eigenvectors to create the new components.
    

#### 3. Implementation Details

When applying PCA to the `load_digits` [dataset](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W3/Experiential%20Learning%20Activity.md#dataset) (64 features, 8x8 pixel intensity):


```python
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler

# 1. Scaling is mandatory
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# 2. Extract components
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X_scaled)
```

**Explained Variance Ratio:**

To determine the optimal $k$ (number of components), analyze the cumulative explained variance.


```python
pca_full = PCA().fit(X_scaled)
cumulative_variance = np.cumsum(pca_full.explained_variance_ratio_)

# Plotting the elbow curve
plt.plot(cumulative_variance)
plt.axhline(y=0.95, color='r', linestyle='--') # Identify k for 95% retention
```

#### 4. Critical Interpretation

- **Linear Combinations:** $PC_1 = w_{1,1}X_1 + w_{1,2}X_2 + ... + w_{1,n}X_n$. The weights ($w$) are called **loadings**. High absolute loadings indicate that the original feature contributes significantly to that component.
    
- **The Trade-off:** PCA is mathematically optimal for variance retention, but the resulting components are often "black boxes"—they represent abstract directions in feature space that are rarely directly interpretable as original variables.
    
- **Outlier Sensitivity:** Because PCA is variance-based, outliers can significantly rotate the principal components, leading to unstable results.
    

#### [5. Application Summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W3/L2/Embedded%20Methods.md#5-application-[summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W7/Module%20Summary.md#[summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W7/Overview.md#summary)))

|**Objective**|**Strategy**|
|---|---|
|**Visualize Clusters**|Project high-dimensional data into 2D/3D using PCA.|
|**Reduce Overfitting**|Use only the top $k$ components that explain 90–95% of total variance.|
|**Noise Filtering**|Discard low-variance components, which often correspond to random noise rather than structure.|

**Important Note:** PCA assumes the relationships in your data are linear. If your data structure is inherently non-linear (e.g., a manifold like a Swiss Roll), PCA will fail to capture the underlying structure, and techniques like **t-SNE** or **UMAP** are preferred.

Would you like to examine how to integrate PCA into a machine learning `Pipeline`, or do you have questions on interpreting the loading vectors?