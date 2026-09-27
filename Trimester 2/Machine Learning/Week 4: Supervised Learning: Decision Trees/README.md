# Week 4: Supervised Learning: Decision Trees

## Supervised Learning: Decision Trees Foundations, Algorithms, and Pruning

Decision Trees represent a foundational class of non-parametric supervised learning models that solve regression and classification problems by partitioning feature space into nested, axis-aligned regions. Unlike linear models that enforce global geometric boundaries, decision trees recursively subdivide the input space using greedy, top-down splitting algorithms guided by statistical impurity metrics. Understanding the mathematical formulation of impurity functions, splitting criteria across ID3, C4.5, and CART frameworks, and regularization via cost-complexity pruning establishes the basis for both individual tree models and advanced ensemble architectures.

## Foundations of Tree-Based Modeling

### Non-Parametric Recursive Partitioning

- A **Decision Tree** is a non-parametric model that makes zero rigid structural assumptions regarding the underlying functional form $f(x)$ or data distribution $P(X, Y)$.
- Learning proceeds via **recursive binary or multi-way partitioning**, dividing the input space $\mathcal{X} \subseteq \mathbb{R}^D$ into a collection of $M$ disjoint hyper-rectangles:
  $$\mathcal{X} = R_1 \cup R_2 \cup \dots \cup R_M, \quad \text{where } R_j \cap R_k = \emptyset \; \forall j \neq k$$
- The model expresses its global prediction as a constant response $c_m$ within each partition $R_m$:
  $$\hat{y} = f(x) = \sum_{m=1}^M c_m \mathbf{1}[x \in R_m]$$
  - In continuous **Regression Trees**, the constant $c_m$ evaluates as the sample mean of training targets falling within region $R_m$:
    $$c_m = \frac{1}{N_m} \sum_{x^{(i)} \in R_m} y^{(i)}$$
  - In categorical **Classification Trees**, the constant $c_m$ evaluates as the majority class label (mode) or posterior class distribution:
    $$p_{mk} = \frac{1}{N_m} \sum_{x^{(i)} \in R_m} \mathbf{1}[y^{(i)} = k]$$

### Geometric Representation: Axis-Aligned Orthogonal Hyperplanes

- Standard decision tree induction splits on a single input feature $x_j$ at a time against a scalar threshold $t$.
- Each split introduces an $(D-1)$-dimensional **axis-aligned orthogonal hyperplane**:
  $$x_j \le t \quad \text{versus} \quad x_j > t$$
- The boundaries intersect feature axes at strictly perpendicular $90^\circ$ angles, restricting the model to constructing rectilinear, box-like decision regions.
- Approximating smooth, diagonal, or circular boundaries requires a deep staircase sequence of axis-aligned splits, which increases model complexity.

### Anatomical Components of a Decision Tree

- **Root Node:** The topmost node in the hierarchy, containing the entire unpartitioned dataset $\mathcal{D}$.
- **Internal (Decision) Nodes:** Intermediate nodes testing a specific feature condition ($x_j \le t$) to route observations down child branches.
- **Branches:** Directed edges representing the outcome of a node split condition.
- **Leaf (Terminal) Nodes:** Final nodes containing no child branches; they store the final prediction output $c_m$ (class label or numerical mean) and class probability distributions.

```mermaid
flowchart TD
    subgraph FeatureSpace["2D Feature Space Cuts"]
        R1["Region R1 (Class A)"]
        R2["Region R2 (Class B)"]
        R3["Region R3 (Class A)"]
    end

    subgraph TreeStructure["Equivalent Decision Tree"]
        Root["Root: x1 <= t1?"] -->|Yes| Left["Node: x2 <= t2?"]
        Root -->|No| R3_Node["Leaf R3: Class A"]
        Left -->|Yes| R1_Node["Leaf R1: Class A"]
        Left -->|No| R2_Node["Leaf R2: Class B"]
    end
```

> [!Important]
> **Decision trees partition space into axis-aligned hyper-rectangles**: each internal node evaluates a single coordinate against a threshold ($x_j \le t$), producing piecewise constant predictions across rectilinear spatial partitions.

## Mathematical Splitting Criteria and Impurity Metrics

### Shannon Entropy and Information Gain (ID3)

- **Entropy** quantifies the expected information content, uncertainty, or statistical impurity of a dataset $S$ containing observations across $C$ discrete classes:
  $$H(S) = -\sum_{c=1}^C p_c \log_2(p_c)$$
  where $p_c$ is the empirical proportion of instances belonging to class $c$ within node $S$ ($\sum p_c = 1$). By convention, $0 \log_2(0) \equiv 0$.
- **Entropy Bounds:**
  - $H(S) = 0.0$ when the node is **completely pure** (all observations belong to a solitary class).
  - $H(S) = \log_2(C)$ when the node is **maximally impure** (classes are distributed uniformly with equal probability $\frac{1}{C}$).
- **Information Gain ($IG$):** Measures the expected reduction in entropy achieved by partitioning dataset $S$ along attribute $A$:
  $$IG(S, A) = H(S) - \sum_{v \in \text{Values}(A)} \frac{|S_v|}{|S|} H(S_v)$$
  where $S_v$ represents the subset of instances where attribute $A$ takes value $v$. The algorithm selects the feature that maximizes Information Gain.

### The High-Cardinality Bias and Gain Ratio (C4.5)

- Information Gain exhibits a pathology: it favors attributes possessing a large number of distinct values (high cardinality).
- If a dataset contains a unique identifier (such as `Customer_ID`), splitting on this feature creates $N$ singleton leaf nodes, each containing exactly one point ($H(S_v) = 0$).
- Information Gain achieves its maximum value ($IG = H(S)$), producing an overfitted tree with zero predictive generalization.
- Ross Quinlan (1993) resolved this in C4.5 by introducing the **Gain Ratio**, which normalizes Information Gain by the **Intrinsic Value (Split Information)** of the attribute:
  $$IV(S, A) = -\sum_{v \in \text{Values}(A)} \frac{|S_v|}{|S|} \log_2\left( \frac{|S_v|}{|S|} \right)$$
  $$\text{Gain Ratio}(S, A) = \frac{IG(S, A)}{IV(S, A)}$$
- The Intrinsic Value acts as an entropy penalty on the split: attributes with many uniformly populated branches yield large $IV$ values, which penalizes the Gain Ratio and suppresses high-cardinality splits.

### Gini Impurity and the Gini Gain (CART)

- Used in the CART framework, **Gini Impurity** measures the probability that a randomly chosen element from set $S$ would be incorrectly labeled if classified randomly according to the class distribution within the node:
  $$\text{Gini}(S) = 1 - \sum_{c=1}^C p_c^2 = \sum_{c=1}^C p_c (1 - p_c)$$
- **Gini Impurity Bounds:**
  - $\text{Gini}(S) = 0.0$ for a completely pure node ($p_k = 1, p_{j \neq k} = 0$).
  - $\text{Gini}(S) = 1 - \frac{1}{C} = \frac{C - 1}{C}$ for a uniform, maximally impure node (for binary classification, $\max \text{Gini} = 0.5$).
- **Gini Gain (Reduction in Impurity):** For a binary split dividing set $S$ into subsets $S_{\text{left}}$ and $S_{\text{right}}$:
  $$\Delta \text{Gini}(S, A) = \text{Gini}(S) - \left( \frac{|S_{\text{left}}|}{|S|} \text{Gini}(S_{\text{left}}) + \frac{|S_{\text{right}}|}{|S|} \text{Gini}(S_{\text{right}}) \right)$$
- Gini Impurity does not compute logarithmic functions, executing faster on computational hardware than Shannon entropy while yielding equivalent splits over $98\%$ of empirical evaluations.

### Continuous Regression Criteria: Variance Reduction

- In regression trees, impurity is evaluated using the continuous variance of the target variable $y$ around the node mean $\bar{y}$:
  $$\text{Var}(S) = \frac{1}{|S|} \sum_{i \in S} (y_i - \bar{y})^2 = \text{MSE}(S)$$
- The splitting objective seeks the feature $j$ and split threshold $t$ that maximize the **Variance Reduction** (minimizing weighted Mean Squared Error):
  $$\Delta \text{Var}(S, j, t) = \text{Var}(S) - \left( \frac{|S_{\text{left}}|}{|S|} \text{Var}(S_{\text{left}}) + \frac{|S_{\text{right}}|}{|S|} \text{Var}(S_{\text{right}}) \right)$$
- To optimize for median targets and resist continuous outliers, regression trees can substitute Mean Absolute Error (MAE), splitting to minimize absolute deviations around the median.

> [!Tip]
> **Gini and Entropy yield near-identical splits**: Gini Impurity scales as a polynomial ($1 - \sum p^2$), running faster than logarithmic Entropy ($-\sum p \log p$) while discovering the same optimal split boundaries.

## Algorithmic Implementations: ID3, C4.5, and CART

### The ID3 Algorithm Mechanics

- Proposed by Ross Quinlan (1986), **ID3 (Iterative Dichotomiser 3)** uses a greedy, top-down recursive strategy:
  1. Calculate base entropy $H(S)$ of the current node.
  2. For every categorical attribute $A$, compute Information Gain $IG(S, A)$.
  3. Select the attribute $A^*$ yielding the maximum Information Gain.
  4. Create a multi-way branch for every distinct discrete value $v \in \text{Values}(A^*)$.
  5. Partition instances into child nodes $S_v$ and recurse.
- **ID3 Limitations:** Supports strictly discrete/categorical features, cannot process continuous numerical attributes, cannot handle missing values, and implements multi-way splits that cause data fragmentation.

### C4.5 Innovations: Continuous Attributes and Missing Data

- Quinlan expanded ID3 into **C4.5**, introducing three core improvements:
  - **Continuous Feature Handling:** Sorts $N$ continuous values along feature $x_j$, evaluates midpoints between adjacent distinct values as candidate thresholds $t = \frac{v_i + v_{i+1}}{2}$, and selects the threshold that maximizes the Gain Ratio.
  - **Gain Ratio Normalization:** Penalizes high-cardinality attributes using Intrinsic Value.
  - **Handling Missing Attributes:** Assigns instances with missing values fractionally to all child branches proportional to observed branch sample counts ($w_v = \frac{|S_v|}{|S|}$).

### The CART Framework: Binary Trees and Regression Adaptation

- Formulated by Leo Breiman, Jerome Friedman, Richard Olshen, and Charles Stone (1984), **CART (Classification and Regression Trees)** is the standard algorithm implemented in modern libraries (such as scikit-learn).
- **Strictly Binary Splitting:** CART enforces binary tree structures across all node splits:
  - For continuous attributes: evaluates $x_j \le t$ versus $x_j > t$.
  - For nominal categorical attributes with $K$ categories: evaluates all $2^{K-1} - 1$ possible binary partition subsets ($x_j \in \mathcal{S}_A$ versus $x_j \notin \mathcal{S}_A$), preventing multi-way data fragmentation.
- **Dual Problem Support:** Deploys Gini Impurity for categorical classification and Variance Reduction (MSE/MAE) for continuous regression.

```mermaid
flowchart TD
    Start["Node Dataset S"] --> Pure{"Is S Pure or Stopping<br/>Criteria Met?"}
    Pure -- Yes --> MakeLeaf["Create Leaf Node (Assign Mode or Mean)"]
    
    Pure -- No --> EvalSplits["Evaluate All Candidate Features & Thresholds"]
    EvalSplits --> ScoreMetric["Score Splits: Gini / Gain Ratio / Variance Reduction"]
    ScoreMetric --> PickBest["Select Optimal Feature j* and Threshold t*"]
    PickBest --> Partition["Partition Dataset: S_left (x <= t) and S_right (x > t)"]
    Partition --> RecurseL["Recurse on S_left"]
    Partition --> RecurseR["Recurse on S_right"]
```

> [!Important]
> **CART enforces binary splits across all data types**: unlike ID3 and C4.5 which create multi-way branches, CART evaluates strictly binary conditions ($x_j \le t$), preventing exponential sample fragmentation in deep trees.

## Tree Regularization and Pruning Strategies

### The Overfitting Pathology of Fully Grown Trees

- Unconstrained decision trees grow until every leaf node is completely pure ($\text{Gini} = 0, H = 0$) or contains a solitary observation ($N_{\text{leaf}} = 1$).
- A fully grown tree achieves **zero training error** ($\text{Training Accuracy} = 100\%$), but produces a complex decision boundary that models sample noise, outliers, and dataset quirks.
- Fully grown trees exhibit **high variance and low bias**, leading to severe generalization collapse on unseen test data.

### Pre-Pruning Constraints (Early Stopping)

- **Pre-pruning** halts tree induction during execution by enforcing stopping hyperparameters before nodes split:
  - **`max_depth`:** Limits the maximum vertical distance from root to leaf, preventing deep hierarchical memorization.
  - **`min_samples_split`:** The minimum number of samples required within an internal node to evaluate candidate splits (e.g., $N_{\text{node}} \ge 10$).
  - **`min_samples_leaf`:** The minimum sample threshold permitted in any terminal leaf node, preventing the creation of isolated singleton leaves.
  - **`max_leaf_nodes`:** Restricts the total number of terminal regions $M$, enforcing broad spatial partitions.
  - **`min_impurity_decrease`:** Enforces that a candidate split must reduce node impurity by a threshold $\Delta \text{Impurity} \ge \tau$ to be executed.
- Pre-pruning is computationally fast, but risks premature stopping: a split yielding negligible immediate impurity reduction may enable a deeper split that uncovers a critical non-linear interaction.

### Post-Pruning: Minimal Cost-Complexity Pruning

- **Post-pruning** allows the tree to grow to full unconstrained depth, then prunes uninformative sub-trees backward from the leaves.
- CART implements **Minimal Cost-Complexity Pruning** (Weakest Link Pruning), balancing empirical error against tree complexity using hyperparameter $\alpha \ge 0$:
  $$R_\alpha(T) = R(T) + \alpha |T|$$
  where $R(T)$ represents total tree misclassification cost or squared error, $|T|$ is the total number of terminal leaf nodes, and $\alpha$ is the complexity tuning parameter.
- **Pruning Mechanics:**
  - For each internal sub-tree $T_t$ rooted at node $t$, calculate the effective cost-complexity parameter:
    $$g(t) = \frac{R(t) - R(T_t)}{|T_t| - 1}$$
    where $R(t)$ is the error if node $t$ collapsed into a leaf, and $R(T_t)$ is the error of the full sub-tree below $t$.
  - The parameter $g(t)$ measures the error penalty incurred per leaf removed.
  - The algorithm identifies the node $t^*$ that minimizes $g(t)$, collapses its sub-tree into a leaf, and records the pruned sub-tree.
  - Generating a sequence of nested trees parameterized by ascending $\alpha$ values, the optimal $\alpha^*$ is chosen using **held-out validation cross-validation**.

> [!Tip]
> **Post-pruning outperforms pre-pruning**: growing a full tree and pruning backward using Cost-Complexity Pruning ($R_\alpha(T) = R(T) + \alpha |T|$) uncovers deep feature interactions that pre-pruning stops prematurely.

## Geometric Properties, Advantages, and Inherent Limitations

### Invariance to Monotonic Transformations

- Decision tree split evaluation depends strictly on the **rank order** of feature values, not their absolute numerical scales:
  $$\arg\max_t IG(X_j, t) \equiv \arg\max_t IG(g(X_j), g(t))$$
  where $g(\cdot)$ is any strictly monotonically increasing function (e.g., $\ln(x), x^3, \sqrt{x}$).
- Decision trees are invariant to feature scaling, making Z-score standardization and Min-Max normalization unnecessary.

### The Axis-Aligned Boundary Limitation

- Because splits evaluate a single feature independently ($x_j \le t$), decision boundaries are constrained to coordinate axes.
- If true class separation depends on a linear combination of features ($x_1 + x_2 > c$), a decision tree must construct a dense **staircase approximation** using dozens of orthogonal splits.
- This creates high parameter complexity on diagonal decision boundaries, making linear classifiers or Support Vector Machines more efficient for linearly separable data.

### High Variance and Instability to Perturbations

- Decision trees suffer from **high structural variance**: small changes in training data produce large differences in tree topology.
- Because the root split selection is greedy, perturbing a few data instances can cause a different feature to win the initial split, altering all subsequent sub-tree partitions down the hierarchy.
- This instability limits standalone decision trees, motivating ensemble methods like **Random Forests** and **Gradient Boosted Decision Trees (GBDT)** that stabilize predictions by aggregating multiple decorrelated trees.

> [!Important]
> **Trees are scale-invariant but rotationally sensitive**: monotonic scaling does not alter tree decisions, but rotating data diagonally forces trees to construct inefficient staircase boundaries, causing high structural variance.

## Comparative Matrices of Tree Algorithms and Impurity Metrics

| Algorithmic Dimension | ID3 (Quinlan, 1986) | C4.5 (Quinlan, 1993) | CART (Breiman et al., 1984) |
|---|---|---|---|
| **Target Task Types** | Classification only | Classification only | **Classification and Regression** |
| **Branching Topology** | **Multi-way splits** (1 branch per category) | Multi-way (categorical) and binary (numeric) | **Strictly binary splits** ($x_j \le t$) |
| **Splitting Criterion** | Information Gain | **Gain Ratio** | **Gini Impurity** (Class) / **MSE** (Reg) |
| **Continuous Attributes** | No (requires prior discretization) | Yes (evaluates candidate midpoints) | Yes (evaluates candidate midpoints) |
| **Missing Value Handling** | None | Assigns fractional weights down branches | Deploys **surrogate split** backups |
| **Pruning Mechanism** | None | Pessimistic error post-pruning | **Cost-Complexity Pruning** ($R_\alpha(T)$) |

### Comparison of Node Impurity Metrics

| Impurity Metric | Mathematical Formula | Output Range (Binary) | Computational Cost | Primary Optimization Bias |
|---|---|---|---|---|
| **Entropy** | $-\sum_{c=1}^C p_c \log_2(p_c)$ | $[0.0, \; 1.0]$ | Moderate (requires $\log_2$) | Favors balanced class purity reductions |
| **Gain Ratio** | $\frac{IG(S, A)}{-\sum \frac{|S_v|}{|S|} \log_2(\frac{|S_v|}{|S|})}$ | $[0.0, \; 1.0]$ | High (two logarithmic sweeps) | Penalizes high-cardinality attributes |
| **Gini Impurity** | $1 - \sum_{c=1}^C p_c^2$ | $[0.0, \; 0.5]$ | **Low** (pure polynomial arithmetic) | Favors isolating dominant class majorities |
| **Variance / MSE** | $\frac{1}{|S|} \sum (y_i - \bar{y})^2$ | $[0.0, \; \infty)$ | Low (arithmetic variance) | Minimizes squared deviations around means |

> [!Tip]
> **Use CART as the modern benchmark**: CART's strictly binary splits, fast polynomial Gini updates, continuous regression support, and cost-complexity pruning make it the standard implementation in industry libraries.

## Key Takeaways

- **Decision trees partition feature space non-parametrically** into axis-aligned hyper-rectangles, producing piecewise constant predictions across regions.
- **Splitting uses greedy coordinate descent**, evaluating features independently to maximize impurity reduction without backtracking.
- **Entropy measures information uncertainty**, while **Gini Impurity calculates misclassification probability** using polynomial operations.
- **Information Gain exhibits high-cardinality bias**, which C4.5 resolves by dividing by Intrinsic Value to calculate the **Gain Ratio**.
- **CART enforces binary splits across all data types**, using Gini Impurity for classification and Variance Reduction for regression.
- **Unconstrained trees overfit rapidly**, driving training error to zero while failing on test data due to high variance.
- **Pre-pruning stops tree growth early** using structural limits (`max_depth`, `min_samples_split`), while **post-pruning collapses sub-trees backward** using Cost-Complexity criteria ($R_\alpha(T) = R(T) + \alpha |T|$).
- **Decision trees are invariant to monotonic transformations**, eliminating the need for feature scaling, but remain sensitive to diagonal data rotations.

> [!Tip]
> The foundational law of tree modeling: **hierarchical splits trade structural stability for interpretability**; greedy axis-aligned decisions allow individual trees to explain complex non-linear interactions, but their high variance necessitates ensemble methods (Random Forests, Gradient Boosting) for competitive predictive accuracy.
