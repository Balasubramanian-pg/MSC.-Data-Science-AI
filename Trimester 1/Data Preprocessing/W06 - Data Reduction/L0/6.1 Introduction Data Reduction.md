# 6.0. Data Reduction

## 6.0.1. The Imperative of Data Reduction

Transitioning from raw data collection to actionable modeling requires managing the sheer volume and complexity of modern datasets. Data reduction techniques aim to reduce the size of the dataset while maintaining the integrity of the original data. The resulting smaller representation is much smaller in volume, yet produces the same or almost the same analytical results.

The primary motivation for data reduction is computational efficiency. Algorithms that scale poorly with the number of records or the number of attributes become intractable on massive datasets. Furthermore, high-dimensional data suffers from the **curse of dimensionality**, where the volume of the space increases so fast that the available data becomes sparse, rendering distance-based algorithms meaningless.

## 6.0.2. Data Aggregation and Compression

The most straightforward approach to data reduction is to consolidate the data itself to lower the computational burden.

### 2.1 Data Aggregation

Data aggregation involves consolidating or summarizing data to capture the essence of the data of interest. The goal is to reduce the number of distinct values while preserving the underlying statistical properties.

For example, aggregating daily sales figures into monthly totals, or aggregating city-level population data into country-level totals. The mathematical operation is typically a sum, average, or maximum over a defined window.

### 2.2 Data Compression

Data compression applies algorithms to transform the data into a smaller representation. 

**Lossless compression** allows the original data to be perfectly reconstructed without any information loss. 
**Lossy compression** approximates the original data, which is acceptable when small errors do not significantly impact the subsequent analysis.

## 6.0.3. Sampling for Data Reduction

Sampling was introduced as a foundational concept for statistical inference. In the context of data reduction, sampling is used explicitly to reduce the computational burden of processing massive datasets.

Instead of mining the entire dataset of $$N$$ records, we extract a representative subset of $$n$$ records, where $$n \ll N$$. The key requirement is that the sample must be representative; otherwise, the analysis performed on the reduced dataset will yield biased conclusions.

Stratified sampling is particularly useful for data reduction when the dataset contains rare but important classes. By sampling proportionally from each stratum, we ensure that minority classes are not lost in the reduction process.

## 6.0.4. Attribute Subset Selection

High-dimensional datasets often contain redundant or irrelevant attributes. Attribute subset selection, also known as feature selection, attempts to remove these extraneous features to reduce the dimensionality of the data.

The goal is to find a minimal subset of attributes $$R \subset A$$, where $$A$$ is the full set of attributes, such that the probability distribution of the target classes is as close as possible to the original distribution obtained using all attributes.

### 4.1 Stepwise Forward Selection

Forward selection starts with the empty set of attributes. At each step, the best of the remaining original attributes is added to the reduced set. This process terminates when no further improvement in the model's performance is observed.

### 4.2 Backward Elimination

Backward elimination starts with the full set of attributes. At each step, the worst-performing attribute is removed. This process terminates when no further improvement is observed.

### 4.3 Decision Tree Induction

Decision tree algorithms, such as ID3 or C4.5, originally build a tree by recursively selecting the most informative attribute. This same logic can be used for attribute subset selection: the attributes that appear in the final tree form the reduced subset, while those that are never used are discarded.

## 6.0.5. Dimensionality Reduction and Feature Extraction

When attribute selection is insufficient, we must transform the data into a lower-dimensional space. This is known as feature extraction or dimensionality reduction.

### 5.1 Principal Component Analysis

Principal Component Analysis (PCA) is the most widely used linear dimensionality reduction technique. It projects the data onto a new coordinate system such that the greatest variance by any projection of the data comes to lie on the first coordinate (called the first principal component), the second greatest variance on the second coordinate, and so on.

The mathematical foundation of PCA relies on the eigendecomposition of the data's covariance matrix.

Let $$X$$ be the centered data matrix. The covariance matrix $$C$$ is defined as:

$$
C = \frac{1}{n-1} X^T X
$$

where:
- $$C$$ = covariance matrix
- $$X$$ = centered data matrix (mean subtracted)
- $$n$$ = number of observations

To emphasize the covariance matrix formula, we restate it:

$$
C = \frac{1}{n-1} X^T X
$$

The principal components are the eigenvectors of $$C$$. The importance of each component is given by its corresponding eigenvalue $$\lambda$$.

The eigenvalue equation is:

$$
C v = \lambda v
$$

where:
- $$v$$ = eigenvector (principal component direction)
- $$\lambda$$ = eigenvalue (variance explained by the component)

To emphasize the eigenvalue equation, we restate it:

$$
C v = \lambda v
$$

By selecting the top $$k$$ eigenvectors corresponding to the largest eigenvalues, we project the original $$d$$-dimensional data into a $$k$$-dimensional space, where $$k \ll d$$.

## 6.0.6. Feature Creation and Discretization

Feature creation generates new attributes that are more informative or easier to work with than the original attributes. 

### 6.1 Feature Mapping

Feature mapping transforms data to a new space. A common example is applying a logarithmic transformation to a heavily right-skewed variable to normalize its distribution.

### 6.2 Discretization

Discretization converts continuous numerical attributes into categorical intervals. This is particularly useful for algorithms that require categorical inputs or to reduce the impact of minor observation errors.

The process involves dividing the range of the attribute into a set of intervals. Common splitting criteria include equal width, equal frequency (quantiles), or entropy-based splitting.

## 6.0.7. Example of Principal Component Analysis

To solidify the mathematical concepts of dimensionality reduction, we apply the PCA formulas to a concrete scenario.

Suppose:
- A dataset with $$n = 3$$ observations and $$d = 2$$ attributes.
- The original data matrix is:
  $$x_1 = (1, 1)$$
  $$x_2 = (2, 3)$$
  $$x_3 = (3, 5)$$
- We want to compute the covariance matrix and find the principal components.

### Step 1: Compute the Mean of Each Attribute

For the first attribute:
$$
\bar{x}_1 = \frac{1 + 2 + 3}{3} = 2
$$

For the second attribute:
$$
\bar{x}_2 = \frac{1 + 3 + 5}{3} = 3
$$

### Step 2: Center the Data Matrix

Subtract the mean from each observation to form the centered matrix $$X$$:
$$
X = \begin{bmatrix} 1 - 2 & 1 - 3 \\ 2 - 2 & 3 - 3 \\ 3 - 2 & 5 - 3 \end{bmatrix} = \begin{bmatrix} -1 & -2 \\ 0 & 0 \\ 1 & 2 \end{bmatrix}
$$

### Step 3: Compute the Covariance Matrix

Using the formula $$C = \frac{1}{n-1} X^T X$$:
$$
X^T X = \begin{bmatrix} -1 & 0 & 1 \\ -2 & 0 & 2 \end{bmatrix} \begin{bmatrix} -1 & -2 \\ 0 & 0 \\ 1 & 2 \end{bmatrix} = \begin{bmatrix} 2 & 4 \\ 4 & 8 \end{bmatrix}
$$

$$
C = \frac{1}{3 - 1} \begin{bmatrix} 2 & 4 \\ 4 & 8 \end{bmatrix} = \begin{bmatrix} 1 & 2 \\ 2 & 4 \end{bmatrix}
$$

### Step 4: Compute the Eigenvalues

Solve the characteristic equation $$\det(C - \lambda I) = 0$$:
$$
\det \begin{bmatrix} 1 - \lambda & 2 \\ 2 & 4 - \lambda \end{bmatrix} = (1 - \lambda)(4 - \lambda) - 4 = \lambda^2 - 5\lambda = 0
$$

The eigenvalues are:
$$
\lambda_1 = 5, \quad \lambda_2 = 0
$$

### Step 5: Determine the Variance Explained

The first principal component corresponds to the largest eigenvalue $$\lambda_1 = 5$$. The variance explained by this single component is:
$$
\text{Variance Explained} = \frac{5}{5 + 0} = 1.0
$$

The first principal component captures **100%** of the variance, meaning the 2-dimensional data can be perfectly reduced to a 1-dimensional space without any loss of information.

## 6.0.8. Conclusions

Data reduction is a critical preprocessing step that bridges the gap between raw, unwieldy datasets and computationally tractable models. By carefully applying aggregation, sampling, attribute selection, and dimensionality reduction, we preserve the essential statistical structure of the data while discarding the noise and redundancy.

### 8.1. Summary of Data Reduction Techniques

The following table summarizes the primary data reduction techniques and their specific use cases.

| Technique | Mechanism | Primary Use Case |
|:---|:---:|---:|
| Aggregation | Summarizing data over windows | Reducing temporal or spatial granularity |
| Sampling | Selecting a representative subset | Handling massive record counts ($$n$$) |
| Attribute Selection | Removing irrelevant features | Reducing dimensionality ($$d$$) |
| PCA | Eigendecomposition of covariance | Handling highly correlated features |
| Discretization | Binning continuous variables | Simplifying continuous distributions |

### 8.2. The Tradeoff of Reduction

Every data reduction technique involves a tradeoff between computational efficiency and information loss. 

>[!Warning]
> Aggressive data reduction can destroy subtle patterns and nonlinear interactions. Always validate that your reduced dataset yields consistent analytical results compared to the full dataset before deploying models in production.

>[!Tip]
> When dealing with high-dimensional data, always compute the variance explained by the principal components. If the top $$k$$ components do not capture at least 80% to 90% of the total variance, linear dimensionality reduction may be discarding critical information.
