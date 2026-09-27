# Week 6: Supervised Learning: k-Nearest Neighbour

## Supervised Learning: k-Nearest Neighbours Foundations, Metrics, and Scalability

The $k$-Nearest Neighbours (KNN) algorithm represents the primary non-parametric, instance-based approach to supervised learning. Unlike eager learning algorithms that optimize an explicit global mathematical function during a dedicated training phase, KNN defers computation until inference time, storing raw observations in memory to generate localized predictions. Examining its lazy learning mechanics, classification and regression decision engines, metric space formulations, the curse of dimensionality, and spatial indexing acceleration trees establishes the theoretical and operational foundations of proximity-based supervised prediction.

## Foundations of Instance-Based Lazy Learning

### Lazy Versus Eager Learning Paradigms

- **Eager Learning:** Algorithms (such as Logistic Regression, Decision Trees, and Neural Networks) process the training dataset $\mathcal{D}$ during an upfront fitting phase, optimizing parameter weights $\theta$ to construct an abstract global hypothesis function $f_\theta(x)$. Once training concludes, raw training instances can be discarded; inference requires evaluating only the compact mathematical function $f_\theta(x)$.
- **Lazy Learning (Instance-Based / Memory-Based):** The algorithm executes zero parameter optimization during training, simply ingesting and storing the empirical observations:
  $$\text{Training Phase: } \mathcal{D} = \{(x^{(1)}, y^{(1)}), (x^{(2)}, y^{(2)}), \dots, (x^{(N)}, y^{(N)})\} \to \text{Memory Allocation}$$
- Computational cost shifts entirely to the **query phase**: when presented with an unseen test point $x_q$, the model computes pairwise distances between $x_q$ and all stored training samples, dynamically constructing a local hypothesis tailored to the immediate neighborhood.

```mermaid
flowchart TD
    subgraph Eager["Eager Learning Paradigm (e.g., Logistic Regression, MLPs)"]
        D1["Training Data D"] --> Fit["Training Phase: Optimize Parameters θ via Loss Minimization"]
        Fit --> Model["Abstract Global Model: f_θ(x) (Discard Raw Data)"]
        Model --> Infer1["Inference: Fast Evaluation of f_θ(x_q) in O(1) or O(P)"]
    end

    subgraph Lazy["Lazy Learning Paradigm (k-Nearest Neighbours)"]
        D2["Training Data D"] --> Store["Training Phase: Store Raw Instances in Memory (O(1) Time)"]
        Store --> Infer2["Inference Phase: Compute Pairwise Distances to All N Points<br/>Identify k Neighbors & Aggregate Targets (O(N * D) Time)"]
    end
```

### The Local Smoothness and Lipschitz Continuity Assumption

- KNN relies on the foundational **smoothness assumption**: observations residing in close spatial proximity within feature space $\mathbb{R}^D$ are assumed to share identical target labels or similar continuous responses:
  $$d(x_i, x_j) \approx 0 \implies P(Y \mid X = x_i) \approx P(Y \mid X = x_j)$$
- This assumes that the underlying data-generating function $f(x)$ satisfies **Lipschitz continuity**, bounding the rate at which target values can change relative to spatial displacement:
  $$|f(x_1) - f(x_2)| \le L \|x_1 - x_2\|$$
  where $L < \infty$ represents the Lipschitz constant.

### Non-Parametric Capacity Scaling

- Parametric models enforce a fixed number of parameters (e.g., $w \in \mathbb{R}^D$ in linear models), bounding model capacity independently of dataset size $N$.
- KNN is strictly **non-parametric**: it does not assume a functional form for $f(x)$, and its effective capacity scales dynamically with dataset size $N$.
- As the volume of training instances expands ($N \to \infty$), the spatial neighborhoods around query points shrink toward zero ($d \to 0$), allowing KNN to approximate arbitrary continuous functions or non-linear decision boundaries.

> [!Important]
> **Lazy learning shifts compute from training to inference**: KNN requires zero training time ($O(1)$) by storing raw data directly, but incurs high inference latency ($O(N \cdot D)$) because every query requires calculating distances across all stored observations.

## The KNN Decision Engine: Classification and Regression

### Majority Voting and Distance-Weighted Classification

- Given a query vector $x_q$, the algorithm identifies the set of $k$ closest training points under distance metric $d(\cdot)$, denoted $N_k(x_q) \subset \mathcal{D}$.
- **Unweighted Majority Voting:** Each neighbor casts an equal vote, and the query point assigns to the most frequent categorical mode:
  $$\hat{y} = \arg\max_{c \in \{1, \dots, C\}} \sum_{i \in N_k(x_q)} \mathbf{1}[y^{(i)} = c]$$
- **Distance-Weighted Voting:** Assigning equal votes can cause errors if distant neighbors overpower closer instances. Weighting votes inversely by distance prioritizes closer samples:
  $$w_i = \frac{1}{d(x_q, x^{(i)})^2 + \epsilon}$$
  $$\hat{y} = \arg\max_{c \in \{1, \dots, C\}} \sum_{i \in N_k(x_q)} w_i \mathbf{1}[y^{(i)} = c]$$
  where $\epsilon \approx 10^{-8}$ prevents division by zero when a query point coincides with a training observation.

### Continuous Regression and Locally Weighted Averaging

- For continuous regression targets ($y \in \mathbb{R}$), KNN estimates the conditional expectation $\mathbb{E}[Y \mid X = x_q]$ by computing the arithmetic mean of the neighboring responses:
  $$\hat{y} = \frac{1}{k} \sum_{i \in N_k(x_q)} y^{(i)}$$
- Applying distance weighting constructs a **locally weighted kernel smoother**:
  $$\hat{y} = \frac{\sum_{i \in N_k(x_q)} w_i y^{(i)}}{\sum_{i \in N_k(x_q)} w_i}, \quad w_i = \frac{1}{d(x_q, x^{(i)})}$$

### The Capacity Spectrum: $k=1$ Voronoi Overfitting to $k=N$ Underfitting

- The hyperparameter $k$ acts as an explicit regularizer, controlling model complexity across the bias-variance spectrum:
  - **$k = 1$ (1-Nearest Neighbour):**
    - The decision boundary forms a non-linear **Voronoi tessellation** around individual training points.
    - Training error evaluates to zero ($R_{\text{emp}} = 0$).
    - The model exhibits **low bias and high variance**, creating sharp, jagged decision boundaries that fit isolated outliers, measurement noise, and sample quirks (**overfitting**).
  - **Intermediate $k$ (e.g., $k \in [3, 15]$):**
    - Averages out local noise by aggregating consensus over a local neighborhood, producing smooth, robust decision boundaries.
  - **$k = N$ (Global Average):**
    - The neighborhood expands to encompass the entire dataset.
    - For classification, the model predicts the global majority class for all inputs; for regression, it outputs the global sample mean $\bar{y}$.
    - The model exhibits **high bias and zero variance**, ignoring local feature variations (**underfitting**).

### The Cover-Hart Theoretical Generalization Bound

- In a foundational theoretical result, Thomas Cover and Peter Hart (1967) proved that as dataset size approaches infinity ($N \to \infty$), the asymptotic probability of error for a 1-Nearest Neighbour classifier ($R_{1\text{-NN}}$) is tightly bounded by the theoretical **Bayes error rate** ($R^*$):
  $$R^* \le R_{1\text{-NN}} \le 2 R^* (1 - R^*) \le 2 R^*$$
  where $R^*$ represents the lowest achievable error rate by any classifier given complete knowledge of true distributions $P(X, Y)$.
- This theorem proves that even a simple 1-NN model captures at least half of the information contained in an infinite training set without parametric tuning.

> [!Tip]
> **Use odd values of k for binary classification**: selecting an odd integer (e.g., $k = 3, 5, 7$) eliminates voting ties in two-class problems, while cross-validation determines the optimal point on the bias-variance spectrum.

## Metric Spaces and Distance Formulations

### Minkowski Metrics: Manhattan, Euclidean, and Chebyshev

- The choice of distance metric defines the geometric topology of the neighborhood. The generalized **Minkowski distance** between vectors $x, z \in \mathbb{R}^D$ is parameterized by order $p \ge 1$:
  $$D_{\text{Minkowski}}(x, z) = \left( \sum_{d=1}^D |x_d - z_d|^p \right)^{\frac{1}{p}}$$
- **Manhattan Distance ($L_1$ Norm, $p = 1$):**
  $$D_{L_1}(x, z) = \sum_{d=1}^D |x_d - z_d|$$
  Evaluates rectilinear grid displacements (city-block paths). Iso-distance contours form diamond-shaped geometries. It is less sensitive to extreme outliers along individual dimensions than higher-order norms.
- **Euclidean Distance ($L_2$ Norm, $p = 2$):**
  $$D_{L_2}(x, z) = \sqrt{\sum_{d=1}^D (x_d - z_d)^2}$$
  Evaluates straight-line physical displacement. Iso-distance contours form isotropic hyperspheres.
- **Chebyshev Distance ($L_\infty$ Norm, $p \to \infty$):**
  $$D_{L_\infty}(x, z) = \max_{d \in \{1, \dots, D\}} |x_d - z_d|$$
  Measures the maximum single coordinate deviation. Iso-distance contours form hypercubes.

### Cosine Distance for Angular Orientation

- In text mining, document retrieval, and high-dimensional representation learning, vector magnitude reflects document length rather than thematic content.
- **Cosine Distance** normalizes vector lengths to evaluate angular disparity:
  $$D_{\text{Cosine}}(x, z) = 1 - \frac{x \cdot z}{\|x\|_2 \|z\|_2} = 1 - \frac{\sum_{d=1}^D x_d z_d}{\sqrt{\sum x_d^2} \sqrt{\sum z_d^2}}$$
- Cosine distance ranges within $[0, 2]$, measuring semantic directional alignment while remaining invariant to uniform vector scaling ($c \cdot x$).

### Mahalanobis Distance for Covariance-Aware Geometry

- Standard Euclidean metrics assume that feature dimensions are uncorrelated and share identical unit variance.
- When features exhibit correlation and unequal variance, Euclidean distances become distorted.
- **Mahalanobis Distance** incorporates the empirical covariance matrix $\Sigma \in \mathbb{R}^{D \times D}$ to decorrelate features and scale by directional variance:
  $$D_{\text{Mahalanobis}}(x, z) = \sqrt{(x - z)^T \Sigma^{-1} (x - z)}$$
- If features are uncorrelated with unit variance ($\Sigma = I$), Mahalanobis distance simplifies to standard Euclidean distance.

### The Imperative of Feature Scaling

- Distance metrics sum differences across all coordinate axes.
- If attribute $A_1$ (e.g., Annual Income) has range $[10,000, \; 500,000]$ and attribute $A_2$ (e.g., Number of Children) has range $[0, \; 5]$:
  $$d(x, z) = \sqrt{(50,000 - 45,000)^2 + (3 - 1)^2} = \sqrt{25,000,000 + 4} \approx 5,000.0004$$
- The unscaled income feature completely dominates the distance metric, rendering the child count attribute mathematically irrelevant.
- Continuous attributes must be rescaled using **Z-score standardization** ($x_{\text{std}} = \frac{x - \mu}{\sigma}$) or **Min-Max normalization** ($x_{\text{norm}} = \frac{x - x_{\min}}{x_{\max} - x_{\min}}$) before computing nearest neighbors.

> [!Important]
> **Unscaled features distort distance metrics**: attributes with large raw numerical ranges dominate Euclidean calculations; features must be standardized to unit variance to ensure all dimensions contribute equally to neighborhood selection.

## The Curse of Dimensionality in Proximity Estimation

### The Distance Concentration Phenomenon

- As feature dimensionality $D$ expands, the volume of the space grows exponentially relative to the data, causing nearest-neighbor estimation to degrade.
- Kevin Beyer et al. (1999) proved the **distance concentration theorem**: for a wide class of data distributions, as dimensionality approaches infinity ($D \to \infty$), the difference between the distance to the farthest point ($d_{\max}$) and the distance to the nearest point ($d_{\min}$) normalized by the minimum distance approaches zero:
  $$\lim_{D \to \infty} \frac{d_{\max} - d_{\min}}{d_{\min}} = 0$$
- In high-dimensional spaces ($D > 50$), all data points become roughly equidistant from each other, rendering the concept of a "nearest" neighbor meaningless.

### Volume Dilation and Non-Local Neighborhoods

- Consider a $D$-dimensional unit hypercube $[0, 1]^D$. To capture a local neighborhood containing a fraction $f$ of the total data volume, the sub-cube edge length $e$ must satisfy:
  $$e^D = f \implies e = f^{\frac{1}{D}}$$
- Evaluating edge lengths required to capture $10\%$ of the data ($f = 0.10$):
  - In $D = 1$ dimension: $e = (0.10)^1 = 0.10$ (a localized $10\%$ window).
  - In $D = 10$ dimensions: $e = (0.10)^{\frac{1}{10}} \approx 0.794$ (requires covering $79.4\%$ of each coordinate axis).
  - In $D = 100$ dimensions: $e = (0.10)^{\frac{1}{100}} \approx 0.977$ (requires covering $97.7\%$ of the entire feature space).
- To capture even a tiny fraction of data points in high dimensions, the neighborhood must expand across almost the entire range of every attribute, violating the core assumption of local smoothness.

### The Empty Space Problem

- The volume of a hyper-sphere of radius $r$ inscribed within a hyper-cube of edge length $2r$ evaluates as:
  $$V_{\text{sphere}}(r) = \frac{\pi^{\frac{D}{2}}}{\Gamma\left(\frac{D}{2} + 1\right)} r^D, \quad V_{\text{cube}}(r) = (2r)^D$$
- The ratio of sphere volume to cube volume approaches zero as dimension grows:
  $$\lim_{D \to \infty} \frac{V_{\text{sphere}}}{V_{\text{cube}}} = \lim_{D \to \infty} \frac{\pi^{D/2}}{2^D \Gamma\left(\frac{D}{2} + 1\right)} = 0$$
- Almost the entire volume of a high-dimensional hypercube resides in its corners rather than its interior, isolating points in sparse, empty regions and degrading density estimation.

> [!Tip]
> **Compress dimensions before applying KNN**: distance concentration in high dimensions ($D > 20$) makes points appear equidistant; apply PCA, t-SNE, or autoencoders to compress data to an intrinsic manifold before computing neighbors.

## Spatial Indexing and Efficient Search Structures

### Brute-Force Linear Scanning Inefficiencies

- The naive approach to nearest-neighbor queries evaluates distances between query point $x_q$ and all $N$ stored training instances.
- Computing distances across $D$ dimensions requires $O(N \cdot D)$ time complexity per query.
- For large datasets ($N = 10^7$) or real-world latency-critical applications, brute-force linear scanning creates an unacceptable computational bottleneck.

### $k$-d Trees and Axis-Aligned Space Decomposition

- Introduced by Jon Louis Bentley (1975), the **$k$-d Tree (k-dimensional tree)** is a space-partitioning binary tree that indexes points in continuous metric space.
- **Tree Construction:**
  1. Select a coordinate axis $d \in \{1, \dots, D\}$, cycling through dimensions across tree depth: $d = (\text{depth} \bmod D) + 1$.
  2. Find the median observation along axis $d$.
  3. Split the active subset using an axis-aligned orthogonal hyperplane passing through the median point.
  4. Recurse on left and right sub-trees until leaf capacity is reached.
- Constructing a $k$-d tree requires $O(D \cdot N \log N)$ time and $O(N)$ storage.
- **Query Traversal:**
  - Descend the tree to find the leaf containing query point $x_q$.
  - Backtrack up the tree, checking whether a hypersphere centered at $x_q$ with radius equal to the current nearest distance intersects the splitting hyperplane of adjacent branches.
  - If no intersection occurs, the entire adjacent sub-tree is pruned from search.
- **Dimensionality Bottleneck:** On low-dimensional data ($D \le 10$), $k$-d trees achieve average query times of $O(D \log N)$. In high dimensions ($D > 20$), query hyperspheres intersect almost all partitioning hyperplanes, forcing the search to inspect nearly all branches and degrading query time to brute-force $O(N \cdot D)$.

```mermaid
flowchart TD
    subgraph Space["2D Orthogonal Space Decomposition"]
        Node1["Split 1: x-axis at Median X1"]
        Node1 --> LeftX["Left: x <= X1"]
        Node1 --> RightX["Right: x > X1"]
        LeftX --> Split2["Split 2: y-axis at Median Y1"]
        RightX --> Split3["Split 3: y-axis at Median Y2"]
    end

    subgraph Tree["Equivalent Binary k-d Tree"]
        Root["Root Node (Split on x=X1)"]
        Root --> LChild["Child 1 (Split on y=Y1)"]
        Root --> RChild["Child 2 (Split on y=Y2)"]
        LChild --> Leaf1["Leaf A: [Points]"]
        LChild --> Leaf2["Leaf B: [Points]"]
        RChild --> Leaf3["Leaf C: [Points]"]
        RChild --> Leaf4["Leaf D: [Points]"]
    end
```

### Ball Trees and Metric Pruning via the Triangle Inequality

- Introduced by Stephen Omohundro (1989), the **Ball Tree** partitions points into nested multidimensional hyperspheres (balls) rather than axis-aligned boxes.
- A ball node $B = (c, r)$ is defined by a central coordinate $c \in \mathbb{R}^D$ and a radius $r \in \mathbb{R}^+$ containing all points $x$ such that $\|x - c\| \le r$.
- **Pruning via Triangle Inequality:** During nearest-neighbor search, if the distance from query point $x_q$ to ball center $c$ satisfies:
  $$d(x_q, c) - r > d_{\text{best}}$$
  where $d_{\text{best}}$ is the distance to the current closest candidate neighbor, the triangle inequality guarantees that *no point inside ball $B$ can be closer than $d_{\text{best}}$*.
- The entire sub-tree beneath ball $B$ is pruned without evaluating its member points, outperforming $k$-d trees in moderate dimensions ($D \approx 20$ to $50$).

### Approximate Nearest Neighbor (ANN) Indexing

- When dimensionality exceeds $D > 50$ and dataset size exceeds millions of vectors, exact tree-based retrieval degrades to brute-force speeds.
- Industrial vector search engines deploy **Approximate Nearest Neighbor (ANN)** indexing algorithms, sacrificing exact accuracy to achieve sub-millisecond query latencies:
  - **Hierarchical Navigable Small World (HNSW):** Multi-layer geometric graphs that execute fast greedy skip-list routing across proximity networks.
  - **Inverted File Index with Product Quantization (IVF-PQ / FAISS):** Clusters vector space into Voronoi cells, decomposing high-dimensional vectors into compact quantized byte codes to compute fast approximate distances.

> [!Important]
> **Spatial indexing trees degrade in high dimensions**: $k$-d trees achieve $O(\log N)$ query times when $D \le 10$, but degrade to brute-force $O(N)$ when $D > 20$; higher-dimensional vector search requires Ball trees or Approximate Nearest Neighbor graphs (HNSW).

## Comparative Matrices of Metrics and Indexing Data Structures

| Metric Formulation | Mathematical Expression | Contour Geometry | Robustness to Scale Disparities | Primary Application Domain |
|---|---|---|---|---|
| **Manhattan ($L_1$)** | $\sum_{d=1}^D \|x_d - z_d\|$ | Diamond / Octahedron | Moderate | Grid networks, high-dimensional sparse data, city path routing |
| **Euclidean ($L_2$)** | $\sqrt{\sum_{d=1}^D (x_d - z_d)^2}$ | Hypersphere / Circle | **Poor** (scale-sensitive) | Continuous spatial coordinates, isotropic physical measurements |
| **Chebyshev ($L_\infty$)** | $\max_d \|x_d - z_d\|$ | Hypercube / Square | Poor | Warehouse logistics, chessboard king movements, manufacturing tolerances |
| **Cosine Distance** | $1 - \frac{x \cdot z}{\|x\|_2 \|z\|_2}$ | Angular rays from origin | **High** (magnitude-invariant) | Natural language embeddings, TF-IDF documents, recommendation systems |
| **Mahalanobis** | $\sqrt{(x - z)^T \Sigma^{-1} (x - z)}$ | Rotated hyper-ellipsoid | **High** (variance-normalized) | Correlated features, statistical outlier detection, sensor arrays |

### Comparison of Nearest Neighbor Search Algorithms

| Search Algorithm | Index Construction Complexity | Average Query Time Complexity | Memory Overhead | Maximum Dimensionality ($D$) | Exact or Approximate? |
|---|---|---|---|---|---|
| **Brute-Force Scan** | $O(1)$ (No index built) | $O(N \cdot D)$ (Exhaustive) | $O(N \cdot D)$ (Raw data only) | Unbounded ($D > 10,000$) | **Exact** |
| **$k$-d Tree** | $O(D \cdot N \log N)$ | $O(D \log N)$ (Low $D$) | $O(N \cdot D)$ (Tree pointers) | Effective strictly for $D \le 15$ | **Exact** |
| **Ball Tree** | $O(D \cdot N \log N)$ | $O(D \log N)$ (Moderate $D$) | $O(N \cdot D)$ (Tree pointers) | Effective for $D \le 50$ | **Exact** |
| **HNSW (Graph ANN)** | $O(N \log N \cdot M)$ | $O(\log N)$ (High throughput) | $O(N \cdot M)$ (Graph edges) | Scales to $D > 1,000$ | **Approximate** ($\approx 95-99\%$ recall) |

> [!Tip]
> **Select retrieval methods based on dimensions and dataset size**: use $k$-d trees for low dimensions ($D \le 10$), switch to Ball trees for moderate dimensions ($D \le 50$), and deploy HNSW graphs when searching high-dimensional embedding spaces ($D > 100$).

## Key Takeaways

- **KNN is an instance-based lazy learner**, storing raw training data without parameter optimization ($O(1)$ training) and deferring distance calculations to query time ($O(N \cdot D)$).
- **The algorithm assumes local smoothness**, relying on spatial proximity to approximate unknown target labels under Lipschitz continuity assumptions.
- **The hyperparameter $k$ controls model capacity**: setting $k=1$ produces non-linear Voronoi partitions prone to overfitting, while setting $k=N$ outputs global sample means, causing underfitting.
- **The Cover-Hart Theorem bounds asymptotic 1-NN error**: as $N \to \infty$, the 1-NN error rate is bounded by at most twice the optimal Bayes error rate ($R^* \le R_{1\text{-NN}} \le 2R^*$).
- **Feature standardization is mandatory**: because distance metrics evaluate numerical differences across coordinate axes, unscaled attributes dominate distance calculations.
- **The curse of dimensionality causes distance concentration**: as $D \to \infty$, the difference between minimum and maximum distances approaches zero, making points appear equidistant.
- **Volume dilation invalidates local neighborhoods**: in high dimensions, capturing even 10% of data volume requires neighborhoods to span almost the entire range of every attribute.
- **Spatial indexing trees accelerate low-dimensional queries**: $k$-d trees and Ball trees prune sub-trees using orthogonal hyperplanes and triangle inequalities, achieving $O(\log N)$ query times when $D$ is small.
- **Approximate Nearest Neighbor (HNSW) graphs power high-dimensional retrieval**, trading exact mathematical precision for sub-millisecond search speeds across vector embeddings.

> [!Tip]
> The foundational law of instance-based prediction: **local proximity defines target likelihood, but feature scaling and dimensionality control validity**; ensuring attributes are standardized and compressing high-dimensional spaces allows nearest-neighbor estimators to deliver reliable non-parametric predictions.
