# Lesson 2: Multi-Layer Perceptron

## Multi-Layer Perceptron Architecture and Forward Dynamics

The Multi-Layer Perceptron (MLP) forms the structural core of feedforward deep learning. By linking multiple dense layers of neurons via parameterized affine transformations and element-wise non-linear activations, MLPs map arbitrary input vectors into expressive latent representations. A rigorous understanding of matrix vectorization, dimension alignment, geometric partitioning, and theoretical expressiveness provides the mathematical tools required to design and scale deep feedforward networks.

## Matrix Vectorization and Dimensional Tracking

### Dimension Alignment Rules

- In an $L$-layer network, let $n^{[l]}$ denote the number of neurons in layer $l$, where $l \in \{0, 1, \dots, L\}$ and $l=0$ designates the input layer.
- The **weight matrix** for layer $l$, denoted $W^{[l]}$, has dimensions $(n^{[l]} \times n^{[l-1]})$, where rows correspond to the destination neurons and columns correspond to the source features.
- The **bias vector** for layer $l$, denoted $b^{[l]}$, has dimensions $(n^{[l]} \times 1)$, providing an independent intercept for each destination neuron.
- For an individual input vector $x \in \mathbb{R}^{n^{[0]} \times 1}$, the forward equations evaluate as:
  $$z^{[l]} = W^{[l]} a^{[l-1]} + b^{[l]}$$
  $$a^{[l]} = g^{[l]}(z^{[l]})$$
  where $a^{[0]} = x$, pre-activation $z^{[l]} \in \mathbb{R}^{n^{[l]} \times 1}$, and post-activation $a^{[l]} \in \mathbb{R}^{n^{[l]} \times 1}$.
- Verifying inner-dimension compatibility across layers ($(n^{[l]} \times n^{[l-1]}) \times (n^{[l-1]} \times 1) \to (n^{[l]} \times 1)$) prevents dimension mismatch errors during forward execution.

### Batch Matrix Formulations

- Processing a mini-batch of $m$ training instances simultaneously accelerates execution on parallel hardware by replacing sequential vector operations with matrix multiplication.
- Under the **column-oriented convention**, activations form matrices of size $(n^{[l]} \times m)$ where each column represents a distinct training sample:
  $$Z^{[l]} = W^{[l]} A^{[l-1]} + b^{[l]} \mathbf{1}_m^T$$
  $$A^{[l]} = g^{[l]}(Z^{[l]})$$
  where $\mathbf{1}_m^T$ is a row vector of ones of length $m$, broadcasting the $(n^{[l]} \times 1)$ bias vector across all $m$ columns.
- Under the **row-oriented convention** standard in modern frameworks (such as PyTorch and TensorFlow), each sample forms a row in a design matrix of shape $(m \times n^{[l]})$:
  $$Z^{[l]} = A^{[l-1]} (W^{[l]})^T + \mathbf{1}_m (b^{[l]})^T$$
  $$A^{[l]} = g^{[l]}(Z^{[l]})$$
- Batch evaluation preserves the identical mathematical transformation for each individual instance while maximizing cache locality and GPU tensor core utilization.

> [!Tip]
> **Dimension alignment** serves as the primary structural check: tracking matrix shapes across successive layers ensures that inner product operations match and vector broadcasting executes correctly during mini-batch operations.

## The Linear Collapse Theorem and Rank Bottlenecks

### Algebraic Proof of Linear Cascades

- Cascading multiple dense layers without intermediate non-linear activation functions provides no representational benefit over a single linear transformation.
- *Proof:* Consider an $L$-layer network where every activation function is the identity operator $g^{[l]}(z) = z$.
- The output of the first layer evaluates to:
  $$a^{[1]} = W^{[1]} x + b^{[1]}$$
- The output of the second layer evaluates to:
  $$a^{[2]} = W^{[2]} a^{[1]} + b^{[2]} = W^{[2]} (W^{[1]} x + b^{[1]}) + b^{[2]} = (W^{[2]} W^{[1]}) x + (W^{[2]} b^{[1]} + b^{[2]})$$
- By mathematical induction, the final output across $L$ layers expands to:
  $$a^{[L]} = \left( \prod_{l=L}^1 W^{[l]} \right) x + \sum_{i=1}^{L-1} \left( \prod_{j=L}^{i+1} W^{[j]} \right) b^{[i]} + b^{[L]}$$
- Defining the effective parameters:
  $$W_{\text{eff}} = \prod_{l=L}^1 W^{[l]} \in \mathbb{R}^{n^{[L]} \times n^{[0]}}, \quad b_{\text{eff}} = \sum_{i=1}^{L-1} \left( \prod_{j=L}^{i+1} W^{[j]} \right) b^{[i]} + b^{[L]} \in \mathbb{R}^{n^{[L]} \times 1}$$
- The system collapses into a single affine transformation:
  $$\hat{y} = a^{[L]} = W_{\text{eff}} x + b_{\text{eff}}$$
- Stacking linear layers without non-linearities does not alter the hypothesis class, leaving the model incapable of separating non-linearly separable distributions.

### Rank Degradation in Linear Cascades

- By the Sylvester and fundamental rank inequalities, the rank of a matrix product is upper-bounded by the minimum rank of any constituent matrix:
  $$\text{rank}(W_{\text{eff}}) = \text{rank}\left( \prod_{l=L}^1 W^{[l]} \right) \le \min_{l \in \{1, \dots, L\}} \text{rank}(W^{[l]})$$
- If any intermediate layer $k$ acts as a **bottleneck** by having fewer neurons than the input ($n^{[k]} < n^{[0]}$), the maximum rank of $W_{\text{eff}}$ is strictly capped at $n^{[k]}$.
- A low-rank bottleneck projects the input vector into a compressed lower-dimensional subspace, causing permanent information loss that subsequent linear layers cannot restore.

> [!Important]
> **Non-linear activations** prevent linear collapse: omitting non-linearities between layers reduces a network of arbitrary depth to a single matrix multiplication, completely eliminating the representational advantage of depth.

## Geometric Construction of Complex Boundaries

### Partitioning via Hyperplane Combinations

- Each individual neuron in the first hidden layer establishes an $(n-1)$-dimensional **hyperplane decision boundary** defined by $w_i^T x + b_i = 0$.
- In a two-dimensional feature space, each first-layer neuron draws a single linear cut across the coordinate plane.
- By taking non-linear activations (such as threshold step functions or saturated sigmoids), the hidden neuron outputs indicate which side of its corresponding hyperplane a sample occupies.
- The next layer combines these active half-spaces through intersection operations, carving out **convex polyhedra (polytopes)** in feature space.
- A single hidden layer can enclose bounded, open, or semi-bounded convex polyhedral decision regions.

### Forming Non-Convex and Disconnected Regions

- A single convex region cannot classify complex target classes that feature non-convex shapes, disjoint clusters, or internal cavities.
- Adding a **second hidden layer** allows the network to compute logical unions over the convex polyhedra produced by the first hidden layer.
- Output neurons assemble these convex pieces into arbitrary **non-convex**, **disconnected**, or **multi-punctured decision regions**.
- Three operational tiers establish the foundational geometric hierarchy of MLPs:
  - **Hidden Layer 1:** Constructs individual linear hyperplanes.
  - **Hidden Layer 2:** Combines hyperplanes via intersections to form isolated convex polyhedra.
  - **Output Layer:** Combines convex polyhedra via unions to form arbitrary non-convex geometric geometries.

> [!Tip]
> **Geometric hierarchy** scales with depth: layer one draws linear cuts, layer two binds these cuts into convex shapes, and layer three joins convex shapes into arbitrary non-convex decision territories.

## Theoretical Expressiveness: The Universal Approximation Theorem

### Formal Statement and Assumptions

- Formulated by George Cybenko (1989) for sigmoidal activations and generalized by Kurt Hornik (1991) to arbitrary non-constant, continuous, and bounded activation functions:
- The **Universal Approximation Theorem** proves that a standard feedforward architecture with a **single hidden layer** of finite width can approximate any continuous function $f: K \to \mathbb{R}$ on a compact subset $K \subset \mathbb{R}^n$ to arbitrary precision $\epsilon > 0$.
- Formally, for every continuous function $f \in C(K)$ and metric $\epsilon > 0$, there exists an integer $N$, weight vectors $w_i \in \mathbb{R}^n$, bias scalars $b_i \in \mathbb{R}$, and output weights $v_i \in \mathbb{R}$ such that:
  $$\left| \sum_{i=1}^N v_i \, g(w_i^T x + b_i) - f(x) \right| < \epsilon \quad \forall x \in K$$

### Capacity Versus Algorithmic Learnability

- The Universal Approximation Theorem is an **existence proof**, confirming that a parameter configuration satisfying the error threshold exists within the parameter space.
- The theorem provides no mathematical guarantee that optimization algorithms (such as Stochastic Gradient Descent) can discover these optimal weights from empirical data.
- The objective error surface of neural networks is non-convex and filled with saddle points, ill-conditioned plateaus, and bad local minima, meaning theoretical capacity does not ensure **empirical trainability**.

### Depth Efficiency and Compositional Sparsity

- While a single hidden layer can approximate any continuous function, doing so often requires an **exponential width** ($N \in O(2^n)$) relative to input dimension $n$.
- Functions composed of hierarchical sub-functions (such as $f(x) = f_L(f_{L-1}(\dots f_1(x)\dots))$) exhibit **compositional structure**.
- Deep networks can approximate compositional functions using a **polynomial number of parameters** $O(\text{poly}(n))$, whereas shallow networks require exponential width ($O(2^n)$) to achieve identical approximation precision.
- Deep architectures distribute function approximations across cascading tiers, trading raw width for reusable, depth-efficient feature transformations.

> [!Important]
> **The Universal Approximation Theorem** guarantees representational capacity, not optimization success: an architecture possessing the capacity to represent a function may fail to learn it under standard gradient descent.

## Comparative Structural Analysis of Network Topologies

| Structural Dimension | Single-Layer Perceptron ($L=1$) | Shallow MLP ($L=2$) | Deep MLP ($L \ge 3$) | Wide Shallow MLP ($L=2, n_1 \gg 1$) |
|---|---|---|---|---|
| **Boundary Geometry** | Single flat hyperplane | Convex polyhedral regions | Arbitrary non-convex, disjoint regions | Approximates non-convex shapes via fine facets |
| **Separability Requirement** | Strictly linearly separable | Linearly separable in hidden space | Highly complex non-linear manifolds | Complex continuous functions on compact sets |
| **Parameter Scaling** | Linear: $O(n_0 \cdot n_1)$ | Modest: $O(n_0 n_1 + n_1 n_2)$ | Highly efficient: $O(\sum n_l n_{l-1})$ | Exponential: $O(n_0 \cdot 2^n)$ |
| **Optimization Surface** | Convex (for Logistic) or piecewise flat | Non-convex with local minima | Non-convex with saddle points and ravines | Non-convex with flat degenerate plateaus |
| **Gradient Flow** | Direct update ($O(1)$ step) | 1-step backpropagation chain | Sensitive to vanishing/exploding gradients | Gradients do not vanish across depth |
| **Compositional Reuse** | None | Limited to single combination tier | Extensive multi-tier feature hierarchy | Zero reuse; features re-evaluated independently |

> [!Tip]
> **Depth provides parameter efficiency**: while a wide shallow network builds complex boundaries by tiling thousands of independent hyperplane facets, a deep network builds them through hierarchical composition with far fewer total parameters.

## Key Takeaways

- **Matrix dimensions** dictate valid forward execution: layer weight matrices $W^{[l]}$ must match shape $(n^{[l]} \times n^{[l-1]})$ to map activations $a^{[l-1]}$ to pre-activations $z^{[l]}$.
- **Batch processing** organizes activations into matrices ($m$ samples), executing forward propagation via high-throughput matrix-matrix products rather than looping over vectors.
- **The Linear Collapse Theorem** proves that stacking linear operations without activation functions collapses the entire network to a single affine mapping $\hat{y} = W_{\text{eff}} x + b_{\text{eff}}$.
- **Intermediate bottlenecks** cap the maximum rank of linear cascades: $\text{rank}(W_{\text{eff}}) \le \min_l \text{rank}(W^{[l]})$, causing unrecoverable data compression.
- **Geometric complexity emerges across layers**: hidden layer one constructs linear half-spaces, hidden layer two intersects them into convex polyhedra, and output layers unite them into non-convex territories.
- **The Universal Approximation Theorem** establishes that a single hidden layer can approximate any continuous function on compact sets, provided sufficient hidden neurons.
- **Representation does not imply learning**: universal approximation guarantees the existence of a solution, not that gradient-based optimization will locate it.
- **Hierarchical depth scales efficiently**: deep architectures approximate compositional functions using polynomially bounded parameters, whereas shallow networks require exponential width.

> [!Important]
> The fundamental design principle of Multi-Layer Perceptrons: **cascaded non-linear transformations generate representational power**; alternating affine projections with non-linear activations allows deep networks to construct complex non-convex decision spaces with high parameter efficiency.
