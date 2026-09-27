# Migration in progress
# Lesson 3: Linear Separability and XOR Motivation

## Linear Separability and the XOR Dilemma

Linear separability defines the geometric boundary condition where two distinct classes can be partitioned completely by a single flat hyperplane. The structural inability of single-layer perceptrons to resolve non-linearly separable logic, exemplified by the exclusive-or (XOR) function, exposed the representational boundaries of single-layer threshold logic. Analyzing the mathematical mechanics of this failure motivates the transition to non-linear feature mappings and multilayer architectures capable of forming complex decision surfaces.

## Geometric Mechanics of Linear Separability

### Convex Sets and Convex Hulls

- A set $S \subset \mathbb{R}^n$ is **convex** if the line segment connecting any two points in $S$ lies entirely within $S$: $\alpha x_1 + (1-\alpha) x_2 \in S$ for all $x_1, x_2 \in S$ and $\alpha \in [0, 1]$.
- The **convex hull** $\text{conv}(X)$ of a finite dataset $X = \{x^{(1)}, \dots, x^{(k)}\}$ represents the minimal convex set containing all points in $X$, defined by all possible convex combinations: $$\text{conv}(X) = \left\{ \sum_{i=1}^k \alpha_i x^{(i)} \;\middle|\; \alpha_i \ge 0, \; \sum_{i=1}^k \alpha_i = 1 \right\}$$
- The **Hyperplane Separation Theorem** states that two non-empty, disjoint convex sets in $\mathbb{R}^n$ can be completely separated by an affine hyperplane.
- Two point classes $\mathcal{D}_+$ and $\mathcal{D}_-$ are **linearly separable** if and only if their respective convex hulls share no intersecting points: $\text{conv}(\mathcal{D}_+) \cap \text{conv}(\mathcal{D}_-) = \emptyset$.

### Mathematical Formulation in Hyperplanes

- Linear separability requires finding a parameter vector $w \in \mathbb{R}^n$ and bias $b \in \mathbb{R}$ that satisfy two sets of strict linear inequalities simultaneously:
  $$w^T x^{(i)} + b > 0 \quad \forall x^{(i)} \in \mathcal{D}_+$$
  $$w^T x^{(i)} + b < 0 \quad \forall x^{(i)} \in \mathcal{D}_-$$
- In augmented vector notation ($\tilde{w} = [b, w^T]^T$, $\tilde{x} = [1, x^T]^T$), linear separability requires that the functional margin be strictly positive across all $N$ data instances:
  $$y^{(i)} (\tilde{w}^T \tilde{x}^{(i)}) > 0 \quad \forall i \in \{1, \dots, N\}, \quad y^{(i)} \in \{-1, +1\}$$
- When the convex hulls of two classes overlap, no orientation of $w$ or position of $b$ can prevent at least one sample from landing on the incorrect side of the decision boundary.

> [!Tip]
> **The Hyperplane Separation Theorem** provides the definitive geometric test for separability: two classes can be classified without error by a single Perceptron if and only if their convex hulls do not intersect in feature space.

## Boolean Functions and Linear Classification

### Combinatorics of Boolean Functions

- An $n$-input Boolean function maps binary vertices of an $n$-dimensional hypercube to a single binary output: $f: \{0, 1\}^n \to \{0, 1\}$.
- The total number of distinct Boolean functions over $n$ inputs equals $2^{2^n}$, exhibiting double-exponential growth.
- For two inputs ($n=2$), there are $2^{2^2} = 16$ possible functions, 14 of which are linearly separable.
- For three inputs ($n=3$), only 104 out of $2^{2^3} = 256$ possible functions are linearly separable.
- For four inputs ($n=4$), only 1,882 out of $2^{2^4} = 65,536$ functions are linearly separable.
- As input dimensionality increases, the proportion of Boolean functions that qualify as **linear threshold functions** approaches zero: $\lim_{n \to \infty} \frac{\text{Separable Functions}}{2^{2^n}} = 0$.

### Linearly Separable Gates: AND, OR, and NAND

- The **AND gate** fires only when both inputs are active; it is linearly separated by the hyperplane $x_1 + x_2 - 1.5 = 0$.
- The **OR gate** fires when at least one input is active; it is linearly separated by the hyperplane $x_1 + x_2 - 0.5 = 0$.
- The **NAND gate** inverts the AND logic, outputting 0 only when both inputs are active; it is linearly separated by the hyperplane $-x_1 - x_2 + 1.5 = 0$.
- The **NOR gate** inverts the OR logic, outputting 1 only when both inputs are inactive; it is linearly separated by the hyperplane $-x_1 - x_2 + 0.5 = 0$.

> [!Important]
> **Boolean threshold limits** scale poorly with dimension: while simple logic gates are linearly separable, the overwhelming majority of higher-dimensional logical functions cannot be solved by a single linear threshold unit.

## The XOR Dilemma

### Geometric Visualization in Two Dimensions

- The **Exclusive-OR (XOR)** function outputs 1 if and only if exactly one input equals 1, producing the following truth table:
  - $x^{(1)} = (0, 0) \to y = 0$
  - $x^{(2)} = (1, 0) \to y = 1$
  - $x^{(3)} = (0, 1) \to y = 1$
  - $x^{(4)} = (1, 1) \to y = 0$
- Plotting these four vertices on a two-dimensional Cartesian plane places positive classes at $(1, 0)$ and $(0, 1)$ along the off-diagonal axis, while negative classes occupy $(0, 0)$ and $(1, 1)$ along the main diagonal axis.
- The line segment connecting the positive instances intersects the line segment connecting the negative instances at the central coordinate $(0.5, 0.5)$.
- Because the line segments intersect, their convex hulls share an internal point, proving that the positive and negative classes cannot be partitioned by any straight line.

### Algebraic Proof of Non-Separability

- Assume there exists a set of real weights $w_1, w_2$ and a scalar bias $b$ that separates the XOR function using a step activation:
  - Point $(0, 0) \to 0$: $w_1(0) + w_2(0) + b < 0 \implies b < 0$
  - Point $(1, 0) \to 1$: $w_1(1) + w_2(0) + b > 0 \implies w_1 + b > 0$
  - Point $(0, 1) \to 1$: $w_1(0) + w_2(1) + b > 0 \implies w_2 + b > 0$
  - Point $(1, 1) \to 0$: $w_1(1) + w_2(1) + b < 0 \implies w_1 + w_2 + b < 0$
- Summing the two positive classification inequalities ($w_1 + b > 0$ and $w_2 + b > 0$) yields:
  $$(w_1 + b) + (w_2 + b) > 0 \implies w_1 + w_2 + 2b > 0$$
- Regrouping the left-hand side of this derived inequality isolates the left side of the fourth condition:
  $$(w_1 + w_2 + b) + b > 0$$
- From the fourth condition, $(w_1 + w_2 + b) < 0$, and from the first condition, $b < 0$.
- The sum of two strictly negative real numbers must be strictly negative:
  $$(w_1 + w_2 + b) + b < 0$$
- The system demands that the quantity $(w_1 + w_2 + b) + b$ be simultaneously strictly positive and strictly negative, which is an algebraic contradiction.
- This contradiction proves that no configuration of real-valued weights and biases exists that can evaluate the XOR operation with a single Perceptron.

> [!Important]
> **The algebraic impossibility of XOR** stems from conflicting inequalities: isolating off-diagonal coordinates requires weights to be positive, which forces the diagonal coordinate sum past the negative