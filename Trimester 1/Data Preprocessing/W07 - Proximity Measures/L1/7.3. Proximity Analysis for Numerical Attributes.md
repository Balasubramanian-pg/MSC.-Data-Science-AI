# 7.3. Proximity Analysis for Numerical Attributes

## 7.3.1. Introduction to Geometric Similarity

Proximity analysis plays a vital role in data mining, pattern recognition, and unsupervised learning.

When managing datasets filled with numerical attributes, calculating how close or distant observations are from each other is the foundation of many powerful algorithms. This section unpacks the mathematical, geometric, and practical components of proximity metrics for numerical variables.

To systematically apply distance-based operations to data points, we must first understand the fundamental properties of numerical attributes.

## 7.3.2. Properties of Numerical Attributes

A numerical attribute is a quantitative feature represented by real or integer numbers.

These variables possess a key characteristic: arithmetic differences and scale divisions are naturally meaningful.

The following table provides the definitions and characteristics of discrete and continuous numerical variables.

| Type | Definition | Example |
| :---: | :---: | :---: |
| Discrete | Countable, finite integer values | Number of transactions |
| Continuous | Uncountable, infinite range values | Height, temperature, income |

While nominal features only allow for equivalence testing, numerical variables support direct, geometric operations. We can subtract, add, and scale coordinates, making it possible to treat observations as coordinates in a multi-dimensional geometric space.

Because numerical values exist on scale-based axes, we can map them onto a formal mathematical structure known as a metric space.

## 7.3.3. Metric Spaces and Axiomatic Distances

A metric space is a mathematical set where a function defines the distance between any two elements.

For a distance function $$d(x,y)$$ to qualify as a formal metric, it must satisfy four classical axioms.

### 3.1 Non-negativity
The distance between any two observations must always be positive or zero:

$$
d(x,y) \ge 0
$$

### 3.2 Identity of Indiscernibles
The distance between two points is exactly zero if and only if the points are identical:

$$
d(x,y) = 0 \iff x = y
$$

### 3.3 Symmetry
The distance from point $$x$$ to point $$y$$ is identical to the distance from point $$y$$ to point $$x$$:

$$
d(x,y) = d(y,x)
$$

### 3.4 Triangle Inequality
The distance directly between two points cannot exceed the path taken through a third intermediate point $$z$$:

$$
d(x,y) \le d(x,z) + d(z,y)
$$

By adhering to these four foundational axioms, distance calculations remain stable, predictable, and mathematically consistent.

Having defined the basic axiomatic rules of a metric space, we can explore the most universally recognized metric: Euclidean distance.

## 7.3.4. Euclidean Distance (L2 Norm)

The Euclidean distance is the standard straight-line distance between two points in an $$n$$-dimensional space.

It represents the shortest path between points as defined by the classical Pythagorean theorem.

The Euclidean distance formula is mathematically defined as:

$$
d(x,y) = \sqrt{\sum_{k=1}^{n} (x_k - y_k)^2}
$$

where:
- $$d(x,y)$$ = the pairwise straight-line distance
- $$x_k$$ = the coordinate value of point $$x$$ along the $$k$$-th dimension
- $$y_k$$ = the coordinate value of point $$y$$ along the $$k$$-th dimension
- $$n$$ = the total number of dimensions or features

This metric is the default distance calculation across physical and geometric modeling due to its simplicity and direct connection to classical physics.

While straight-line distance is natural in physical environments, grid-constrained systems require an alternative path-based calculation known as Manhattan distance.

## 7.3.5. Manhattan Distance (L1 Norm)

The Manhattan distance calculates the cumulative sum of the absolute differences along each individual axis.

It is also referred to as the taxicab distance or the $$L_1$$ norm.

The Manhattan distance formula is formally defined as:

$$
d(x,y) = \sum_{k=1}^{n} |x_k - y_k|
$$

where:
- $$d(x,y)$$ = the total path-based distance
- $$x_k$$ = the coordinate value of point $$x$$ along the $$k$$-th dimension
- $$y_k$$ = the coordinate value of point $$y$$ along the $$k$$-th dimension
- $$n$$ = the total number of dimensions

This metric is inspired by the grid-like layout of urban streets, such as those in Manhattan. In a grid, a vehicle cannot cut diagonally through buildings; instead, it must traverse horizontal and vertical blocks to reach its destination.

In addition to cumulative path metrics, certain critical engineering scenarios require focusing solely on the single dimension of maximum variation, which brings us to the Supremum distance.

## 7.3.6. Supremum Distance (L-Infinity Norm)

The Supremum distance identifies the single coordinate dimension along which the maximum absolute difference between two points occurs.

It is also referred to as the $$L_{\infty}$$ norm, the maximum norm, or Chebyshev distance.

The Supremum distance formula is defined as:

$$
d(x,y) = \max_{k} |x_k - y_k|
$$

where:
- $$d(x,y)$$ = the supremum distance
- $$x_k$$ = the coordinate value of point $$x$$ along the $$k$$-th dimension
- $$y_k$$ = the coordinate value of point $$y$$ along the $$k$$-th dimension
- $$\max_k$$ = the operator that extracts the maximum difference observed across all dimensions $$k$$

In Chess, for example, the king can move one step horizontally, vertically, or diagonally. The number of moves required for a king to travel from one square to another on a chessboard is exactly equal to the Supremum distance between their coordinates.

Rather than treating these three metrics as disconnected equations, we can unify them under a single generalized framework called the Minkowski distance.

## 7.3.7. Minkowski Distance: The Generalized Metric

The Minkowski distance is a generalized metric framework that encompasses Manhattan, Euclidean, and Supremum distances as special cases.

It provides a parametric way to control how coordinate differences accumulate.

The Minkowski distance formula is defined as:

$$
d(x,y) = \left( \sum_{k=1}^{n} |x_k - y_k|^r \right)^{\frac{1}{r}}
$$

where:
- $$d(x,y)$$ = the generalized Minkowski distance
- $$x_k$$ = the coordinate of point $$x$$ along dimension $$k$$
- $$y_k$$ = the coordinate of point $$y$$ along dimension $$k$$
- $$r$$ = a positive real parameter that dictates the norm of the distance space

By tuning the value of the exponent $$r$$, we can transition smoothly through different geometric configurations of space.

The generalized power of the Minkowski formulation assumes that all attributes contribute uniformly, which is rarely true without prior feature scaling.

## 7.3.8. The Critical Need for Normalization and Standardization

Because distance calculations depend directly on the absolute values of coordinates, variations in scale across different attributes can severely distort proximity.

Consider a dataset evaluating real estate where the first attribute is the number of bedrooms, ranging from $$1$$ to $$5$$, and the second attribute is the annual household income, ranging from $$0$$ to $$10,000,000$$. Without normalizing these scales, the mathematical contribution of the bedroom count is completely overshadowed by the household income. To ensure that each attribute exerts a fair, balanced influence on the final proximity calculation, preprocessing methods such as Min-Max Normalization or Z-Score Standardization must be systematically applied.

Once the continuous features are appropriately normalized, we can also evaluate categorical counterparts, such as utilizing the Hamming distance as a special constrained case.

## 7.3.9. Hamming Distance as a Binary Special Case

The concept of grid-based coordinate difference is not limited to continuous domains; it can also be adapted to discrete, binary scenarios.

For vectors consisting of binary values (where coordinates are restricted to $$0$$ or $$1$$), the Manhattan distance reduces directly to the **Hamming Distance**. The Hamming distance measures the number of coordinate positions at which two corresponding binary vectors differ. It is widely applied in error-correcting codes, natural language processing, bitwise systems, and genomic sequencing.

To see how these abstract distance formulations behave when compared on a single dataset, let us work through a detailed numerical example.

## 7.3.10. Worked Example: Step-by-Step Distance Calculations

To clarify the mathematical mechanics of these metrics, let us calculate the pairwise distance between two coordinate points across multiple distance configurations.

The following table displays the coordinates of four distinct sample data points across two dimensions.

| Point | Attribute 1 | Attribute 2 |
| :---: | :---: | :---: |
| P1 | 0 | 2 |
| P2 | 2 | 0 |
| P3 | 3 | 1 |
| P4 | 5 | 1 |

Suppose:
- We have point $$P_1$$ with coordinate values: $$x = (0, 2)$$
- We have point $$P_2$$ with coordinate values: $$y = (2, 0)$$
- We are evaluating their distance in a two-dimensional system ($$n = 2$$) where the attributes are labeled as $$A_1$$ and $$A_2$$ respectively

We will follow a five-step calculation pipeline.

### Step 1: Assign Point Coordinates
We map the given points to coordinate arrays:

$$
x = (0, 2)
$$

$$
y = (2, 0)
$$

### Step 2: Compute Euclidean Distance (L2 Norm)
We calculate the straight-line distance using the L2 formula:

$$
d_{\text{Euclidean}}(x,y) = \sqrt{(2-0)^2 + (0-2)^2} = \sqrt{4 + 4} = \sqrt{8} \approx 2.828
$$

### Step 3: Compute Manhattan Distance (L1 Norm)
We calculate the grid-based distance using the absolute L1 difference formula:

$$
d_{\text{Manhattan}}(x,y) = |2-0| + |0-2| = 2 + 2 = 4.000
$$

### Step 4: Compute Supremum Distance (L-Infinity Norm)
We extract the maximum single-coordinate deviation utilizing the L-infinity formulation:

$$
d_{\text{Supremum}}(x,y) = \max(|2-0|, |0-2|) = \max(2, 2) = 2.000
$$

### Step 5: State the Final Compared Distance Metrics
The final calculated metrics are summarized below:

$$
\mathbf{d_{\text{Euclidean}}(x,y) \approx 2.828}
$$

$$
\mathbf{d_{\text{Manhattan}}(x,y) = 4.000}
$$

$$
\mathbf{d_{\text{Supremum}}(x,y) = 2.000}
$$

Comparing these computed values reveals that the metric chosen fundamentally shapes the geometric bounds of our spatial search neighborhoods.

## 7.3.11. Neighborhood Geometries and Unit Balls

The distance metric we choose does not merely alter numerical values; it fundamentally alters the physical shape of search neighborhoods.

A unit ball in a metric space is defined as the set of all points whose distance from the center is less than or equal to $$1$$.

### 11.1 Manhattan Neighborhoods (L1 Ball)
Under the Manhattan metric ($$r=1$$), the set of equidistant points from a center forms a diamond-shaped boundary.

### 11.2 Euclidean Neighborhoods (L2 Ball)
Under the Euclidean metric ($$r=2$$), the set of equidistant points forms a perfectly circular boundary.

### 11.3 Supremum Neighborhoods (L-Infinity Ball)
Under the Supremum metric ($$r \to \infty$$), the boundary of equidistant points forms a square-shaped neighborhood.

These geometric differences mean that algorithms like K-Nearest Neighbors (KNN) or Density-Based Spatial Clustering (DBSCAN) will partition the feature space into radically different decision regions depending on the chosen metric.

As we extend these geometric search neighborhoods into higher dimensional spaces, we encounter severe mathematical anomalies collectively known as the curse of dimensionality.

## 7.3.12. The Curse of Dimensionality in Proximity Metrics

As we scale proximity metrics from low-dimensional spaces to high-dimensional coordinate structures, we encounter a severe mathematical phenomenon known as the concentration of measure.

In high-dimensional spaces, the volume of the space grows exponentially relative to the distance from the origin. Consequently, almost all pairs of points in a high-dimensional space become nearly equidistant from one another. The difference between the distance to the nearest neighbor and the distance to the furthest neighbor approaches zero relative to the minimum distance. This means that classical distance metrics lose their discriminatory power as the number of dimensions increases, causing clustering and similarity search algorithms to degrade significantly.

These high-dimensional mathematical phenomena directly govern the downstream performance of practical machine learning pipelines.

## 7.3.13. Impact of Proximity Metric Choice in Machine Learning Pipelines

Because numerical attributes represent different physical processes, choosing the correct metric is highly domain-dependent.

In geographic systems, Euclidean distance is often the natural choice for calculating direct flight paths, whereas Manhattan distance is better suited for urban path planning. In recommendation systems where high-dimensional feature vectors dominate, Manhattan distance and cosine similarity are often preferred because they are less sensitive to high-dimensional noise than Euclidean distance. Selecting the wrong metric changes the underlying similarity geometry, reducing model performance and yielding misleading clusters.

Failing to align distance selection with the dimensionality and scale of a dataset leads to several predictable engineering failures.

## 7.3.14. Common Failure Modes and Misinterpretations

When implementing proximity measures on numerical data, several recurring pitfalls can undermine the accuracy of downstream models.

### 14.1 Skipping Normalization on Multi-Scale Data

>[!Warning]
> **Failing to Standardize Numerical Features**
> When attributes possess wildly different ranges, such as age ranging from 0 to 100 and annual income ranging from 0 to 10,000,000, the larger-scale variable completely dominates the distance sum. This effectively renders the lower-scale attribute mathematically invisible in distance calculations, leading to severely biased clustering and classification.

### 14.2 Defaulting to Euclidean Distance in High Dimensions

>[!Warning]
> **Assuming Euclidean Metric Robustness in High-Dimensional Spaces**
> As the number of dimensions increases, the ratio of the distance to the nearest point versus the farthest point rapidly approaches 1. This mathematical collapse makes Euclidean distance uninformative for high-dimensional datasets, meaning standard neighborhood algorithms like KNN will yield arbitrary, low-quality results.

### 14.3 Treating Asymmetric Attributes with Symmetric Distance Metrics

>[!Warning]
> **Applying Symmetric Metrics to Asymmetric Binary or Numeric Attributes**
> Utilizing symmetric Euclidean or Manhattan distance to compare asymmetric attributes, where the presence of a feature is highly significant but its absence is common and non-informative (e.g., rare genetic sequences), distorts similarity relationships. This leads to artificial clustering of objects based solely on shared zeros rather than shared positive features.

In summary, proximity analysis for numerical attributes is far more than a basic calculation; it is a foundational geometric design choice.

## 7.3.15. Conclusions and Metric Selection Matrix

Proximity metrics define the geometric framework inside which machine learning algorithms operate.

By carefully matching the chosen metric to the scale, dimensionality, and domain of the dataset, analysts can ensure that spatial relationships are captured accurately.

Let us explicitly restate the generalized Minkowski formula for emphasis:

$$
d(x,y) = \left( \sum_{k=1}^{n} |x_k - y_k| ^ r \right) ^ {\frac{1}{r}}
$$

The following table summarizes the key distance metrics, their formulations, geometric shapes, and optimal use cases.

| Metric Type | Mathematical Exponent | Geometric Shape | Primary Application |
| :---: | :---: | :---: | :---: |
| Manhattan | $$r=1$$ | Diamond | Grid-based travel, high-dimensional spaces |
| Euclidean | $$r=2$$ | Circle | Spatial analysis, low-dimensional physical spaces |
| Supremum | $$r \to \infty$$ | Square | Chessboards, worst-case bound analysis |

Ultimately, choosing a proximity metric is a crucial architectural design choice. No single distance metric is universally optimal; instead, the geometry of the chosen metric must carefully match the physical constraints and properties of the problem domain.
