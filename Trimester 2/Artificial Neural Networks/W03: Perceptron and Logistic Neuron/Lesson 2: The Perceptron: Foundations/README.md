# Lesson 2: The Perceptron: Foundations

## Perceptron Architecture and Mathematical Modeling

The classical Perceptron represents the foundational linear threshold classifier in supervised learning. It maps continuous multidimensional input vectors to discrete binary outputs using an affine transformation combined with a non-differentiable step function. Formulating the Perceptron mathematically reveals how adjustable weights and geometric boundaries interact, setting the theoretical groundwork for understanding linear classification, convergence guarantees, and margin maximization.

## Mathematical Formulation and Decision Hyperplanes

### The Augmented Vector Formulation

- An artificial neuron receives an input vector $x = [x_1, x_2, \dots, x_n]^T \in \mathbb{R}^n$ and scales each coordinate using a weight vector $w = [w_1, w_2, \dots, w_n]^T \in \mathbb{R}^n$.
- The net pre-activation value $z$ evaluates the **affine combination** of inputs and weights with a scalar bias $b \in \mathbb{R}$:
  $$z = \sum_{i=1}^n w_i x_i + b = w^T x + b$$
- The **augmented vector representation** absorbs the scalar bias into the weight vector by appending a dummy feature $x_0 = 1$ to the input:
  $$\tilde{w} = [b, w_1, w_2, \dots, w_n]^T \in \mathbb{R}^{n+1}, \quad \tilde{x} = [1, x_1, x_2, \dots, x_n]^T \in \mathbb{R}^{n+1}$$
- In augmented form, the pre-activation calculation simplifies to a pure **inner product** passing through the origin in $(n+1)$-dimensional space: $z = \tilde{w}^T \tilde{x}$.

### Activation Profiles: Binary vs Bipolar

- The standard Perceptron maps the continuous affine sum $z$ to a discrete output space using a discontinuous threshold function.
- The **unipolar (binary) step function** outputs values in $\{0, 1\}$:
  $$\hat{y} = H(z) = \begin{cases} 1 & \text{if } z \ge 0 \\ 0 & \text{if } z < 0 \end{cases}$$
- The **bipolar signum function** outputs values in $\{-1, +1\}$:
  $$\hat{y} = \text{sgn}(z) = \begin{cases} +1 & \text{if } z \ge 0 \\ -1 & \text{if } z < 0 \end{cases}$$
- In the bipolar formulation, a sample $(x^{(k)}, y^{(k)})$ is classified correctly if and only if the product of the true label and the pre-activation sum is strictly non-negative: $y^{(k)}(w^T x^{(k)} + b) \ge 0$.

> [!Tip]
> **Augmented vector notation** eliminates the bias parameter as an explicit scalar: it embeds translation directly into linear matrix operations by fixing an invariant coordinate value of one.

## Geometry of the Decision Boundary

### Hyperplane Properties and Normal Vectors

- The **decision boundary** of a Perceptron is an $(n-1)$-dimensional **hyperplane** embedded in an $n$-dimensional vector space, defined by the set of points where the net input is zero:
  $$\mathcal{H} = \{x \in \mathbb{R}^n \mid w^T x + b = 0\}$$
- The weight vector $w$ is geometrically **normal (orthogonal)** to the decision hyperplane at every point along its surface.
- The vector $w$ points directly into the positive decision region where $w^T x + b > 0$, while the opposite direction defines the negative decision region where $w^T x + b < 0$.
- Modifying the orientation of $w$ rotates the decision hyperplane, whereas modifying the bias scalar $b$ translates the boundary along the normal direction without altering its angular orientation.

### Geometric and Functional Margins

- The **signed algebraic distance** from any arbitrary data point $x$ to the decision hyperplane equals the projection of $x$ onto the normalized normal vector:
  $$d(x, \mathcal{H}) = \frac{w^T x + b}{\|w\|_2}$$
- The **functional margin** of a dataset with respect to a hyperplane normalizes correctness with the true label $y^{(k)} \in \{-1, +1\}$:
  $$\hat{\gamma}^{(k)} = y^{(k)} (w^T x^{(k)} + b)$$
- The **geometric margin** represents the scale-invariant physical distance from the boundary to the sample:
  $$\gamma^{(k)} = \frac{y^{(k)} (w^T x^{(k)} + b)}{\|w\|_2}$$
- Rescaling the parameters by a positive scalar factor $c$ ($\tilde{w} \leftarrow c \tilde{w}$) multiplies the functional margin by $c$, but leaves the geometric margin unchanged.

> [!Important]
> **The weight vector** acts as the geometric normal of the separating hyperplane: its magnitude governs scale sensitivity, while its direction determines the decision boundary orientation in feature space.

## The Perceptron Learning Algorithm (PLA)

### Error-Driven Parameter Updates

- The **Perceptron Learning Algorithm** is an online, mistake-driven heuristic that updates weights only when an example is misclassified.
- Initializing with $\tilde{w}_0 = 0$ (or random small values), the algorithm iterates through training instances $\{(\tilde{x}^{(k)}, y^{(k)})\}$.
- For a bipolar classification target $y^{(k)} \in \{-1, +1\}$, a misclassification occurs whenever $y^{(k)} (\tilde{w}^T \tilde{x}^{(k)}) \le 0$.
- When a mistake occurs, the parameter update rule modifies the augmented weight vector using a learning rate parameter $\eta \in (0, 1]$:
  $$\tilde{w}_{t+1} \leftarrow \tilde{w}_t + \eta y^{(k)} \tilde{x}^{(k)}$$
- Correctly classified instances satisfy $y^{(k)} (\tilde{w}^T \tilde{x}^{(k)}) > 0$ and leave parameters unchanged: $\tilde{w}_{t+1} \leftarrow \tilde{w}_t$.

### Geometric Mechanics of Parameter Rotation

- When a positive example ($y^{(k)} = +1$) is misclassified, the angle between $\tilde{w}$ and $\tilde{x}^{(k)}$ is obtuse ($\tilde{w}^T \tilde{x}^{(k)} < 0$).
- Adding $\tilde{x}^{(k)}$ to $\tilde{w}_t$ reduces the angle between the weight vector and the instance vector, rotating the decision hyperplane toward the misclassified point:
  $$\tilde{w}_{t+1}^T \tilde{x}^{(k)} = (\tilde{w}_t + \eta \tilde{x}^{(k)})^T \tilde{x}^{(k)} = \tilde{w}_t^T \tilde{x}^{(k)} + \eta \|\tilde{x}^{(k)}\|_2^2$$
- Because $\eta \|\tilde{x}^{(k)}\|_2^2 > 0$, the update increases the net input value, driving it closer to or across the positive threshold.
- When a negative example ($y^{(k)} = -1$) is misclassified, subtracting $\tilde{x}^{(k)}$ widens the angle between the vectors, reducing the net input value.

### Influence of Learning Rate and Initialization

- If the initial weight vector is set to zero ($\tilde{w}_0 = 0$), the learning rate parameter $\eta$ serves strictly as a global scaling factor.
- Rescaling $\eta$ scales the resulting weight vector $\tilde{w}_t$ by the exact same scalar constant without changing the geometric sequence of generated hyperplanes.
- If $\tilde{w}_0 \neq 0$, the learning rate controls the relative balance between the initial parameter values and accumulated error corrections.

> [!Tip]
> **Perceptron parameter updates** act as directional corrections: adding or subtracting the misclassified input vector rotates the normal vector to bring the decision surface into alignment with the true class label.

## The Novikoff Convergence Theorem

### Theoretical Preconditions: Bounded Radius and Margin

- The **Novikoff Perceptron Convergence Theorem** (1962) proves that if a dataset is linearly separable, the Perceptron Learning Algorithm terminates in a finite number of steps.
- **Precondition 1 (Bounded Data):** There exists a positive real constant $R$ such that all augmented training vectors lie within a hypersphere of radius $R$:
  $$\|\tilde{x}^{(k)}\|_2 \le R \quad \forall k \in \{1, \dots, N\}$$
- **Precondition 2 (Linear Separability):** There exists an optimal unit weight vector $\tilde{w}^*$ ($\|\tilde{w}^*\|_2 = 1$) and a strictly positive margin $\gamma > 0$ such that:
  $$y^{(k)} (\tilde{w}^{*T} \tilde{x}^{(k)}) \ge \gamma \quad \forall k \in \{1, \dots, N\}$$

### Mathematical Bound on Maximum Mistakes

- Setting $\tilde{w}_0 = 0$ and $\eta = 1$, assume the algorithm makes $k$ classification mistakes during execution.
- **Lower Bound on Alignment:** Projecting the weight vector onto the optimal vector $\tilde{w}^*$ after $k$ updates yields:
  $$\tilde{w}_k^T \tilde{w}^* = (\tilde{w}_{k-1} + y^{(k)} \tilde{x}^{(k)})^T \tilde{w}^* = \tilde{w}_{k-1}^T \tilde{w}^* + y^{(k)} (\tilde{w}^{*T} \tilde{x}^{(k)}) \ge \tilde{w}_{k-1}^T \tilde{w}^* + \gamma$$
  By induction across $k$ updates, this guarantees: $\tilde{w}_k^T \tilde{w}^* \ge k \gamma$.
- Applying the Cauchy-Schwarz inequality provides:
  $$\|\tilde{w}_k\|_2^2 = \|\tilde{w}_k\|_2^2 \|\tilde{w}^*\|_2^2 \ge (\tilde{w}_k^T \tilde{w}^*)^2 \ge k^2 \gamma^2$$
- **Upper Bound on Norm Growth:** Expanding the squared Euclidean norm of the weight vector yields:
  $$\|\tilde{w}_k\|_2^2 = \|\tilde{w}_{k-1} + y^{(k)} \tilde{x}^{(k)}\|_2^2 = \|\tilde{w}_{k-1}\|_2^2 + 2 y^{(k)} (\tilde{w}_{k-1}^T \tilde{x}^{(k)}) + \|\tilde{x}^{(k)}\|_2^2$$
  Because an update occurs only when $y^{(k)} (\tilde{w}_{k-1}^T \tilde{x}^{(k)}) \le 0$, and given $\|\tilde{x}^{(k)}\|_2 \le R$:
  $$\|\tilde{w}_k\|_2^2 \le \|\tilde{w}_{k-1}\|_2^2 + R^2 \le k R^2$$
- **Combining the Bounds:**
  $$k^2 \gamma^2 \le \|\tilde{w}_k\|_2^2 \le k R^2 \implies k^2 \gamma^2 \le k R^2 \implies k \le \left( \frac{R}{\gamma} \right)^2$$

### Structural Implications of the Bound

- The maximum number of mistakes $k_{\max} = \lfloor \frac{R^2}{\gamma^2} \rfloor$ depends exclusively on the **geometric margin** $\gamma$ and the data **radius** $R$.
- The mistake bound is completely independent of the total number of training samples $N$.
- The mistake bound does not depend explicitly on the input space dimensionality $n$, except as dimension affects the ratio $\frac{R}{\gamma}$.

> [!Important]
> **Novikoff's theorem** provides a finite mistake guarantee: the total mistakes made by the Perceptron are bounded by $(R/\gamma)^2$, proving that convergence speed is determined by data spread and class separation margin rather than dataset size.

## Non-Separability and the Pocket Algorithm

### The Perceptron Cycling Hazard

- If training data is **linearly non-separable**, the preconditions for Novikoff's convergence theorem fail ($\gamma \le 0$).
- When presented with non-separable distributions, the Perceptron Learning Algorithm never terminates, entering an infinite loop of parameter oscillations known as **cycling**.
- The algorithm's final state depends arbitrarily on when execution is halted, often yielding a hyperplane with poor classification performance across the entire dataset.

### The Pocket Algorithm Architecture

- Developed by Stephen Gallant in 1990, the **Pocket Algorithm** adapts the Perceptron to non-separable datasets.
- The algorithm runs standard Perceptron updates on misclassified instances while maintaining a separate secondary parameter vector stored in its **pocket** ($\tilde{w}_{\text{pocket}}$).
- At each step, the algorithm tracks the number of consecutive correct classifications or evaluates overall classification accuracy across the dataset.
- If the current candidate weight vector achieves higher classification accuracy (or survives longer without errors) than the vector in the pocket, the candidate replaces the pocket contents.
- When training reaches an allocated epoch limit, execution terminates and returns $\tilde{w}_{\text{pocket}}$, providing the best linear boundary discovered during optimization.

> [!Tip]
> **The Pocket Algorithm** stabilizes non-separable training: preserving the highest-accuracy parameter configuration in an isolated buffer protects the final model from destructive updates caused by noise or non-separable instances.

## Comparative Analysis of Linear Classifiers

| Characteristic | Standard Perceptron | Pocket Algorithm | Linear Support Vector Machine |
|---|---|---|---|
| **Separability Requirement** | Strictly linearly separable | Operates on non-separable data | Operates on non-separable data (via slack $\xi$) |
| **Termination Guarantee** | Finite steps if separable; oscillates if not | Terminates at pre-set epoch limit | Deterministic convergence (convex quadratic problem) |
| **Separating Hyperplane** | Any arbitrary separating hyperplane | Best empirical accuracy hyperplane found | Unique **maximum-margin** hyperplane |
| **Computational Complexity** | $O(N \cdot n)$ per epoch | $O(N \cdot n)$ per epoch plus validation checks | $O(N^2 \cdot n)$ to $O(N^3)$ (quadratic programming) |
| **Sensitivity to Outliers** | High (triggers boundary shifts) | Moderate (retains top historic state) | Low (governed by support vectors and $C$ parameter) |
| **Loss Function Formulation** | Perceptron criterion loss: $\sum \max(0, -y w^T x)$ | Non-differentiable $0/1$ misclassification loss | Convex **Hinge loss**: $\max(0, 1 - y w^T x)$ |

> [!Important]
> **Margin quality** differentiates linear architectures: while the Perceptron accepts any boundary that separates training points, SVMs find the unique boundary that maximizes the clearance margin between classes.

## Key Takeaways

- **The augmented weight vector** integrates the bias scalar into the weight vector by appending a constant feature $x_0 = 1$, turning affine combinations into dot products.
- **Decision hyperplanes** are mathematically defined by $w^T x + b = 0$, with the weight vector $w$ forming an orthogonal normal vector pointing toward the positive prediction space.
- **The Perceptron Learning Algorithm** is mistake-driven; it adjusts parameters by adding or subtracting misclassified instance vectors to rotate the decision surface.
- **The Novikoff Convergence Theorem** proves that the Perceptron converges in at most $(R/\gamma)^2$ updates for any linearly separable dataset, regardless of sample count.
- **Data non-separability** causes the standard Perceptron to oscillate infinitely, making termination criteria and mistake bounds invalid.
- **The Pocket Algorithm** manages non-separable distributions by retaining the most accurate historical weight vector in a dedicated buffer while online updates proceed.
- **Boundary arbitrariness** limits the classical Perceptron, as it stops at the first valid separating hyperplane rather than optimizing the generalization margin between classes.

> [!Tip]
> The classical Perceptron establishes the foundational paradigm of neural computing: **error-driven geometric adjustments** rotate a decision hyperplane until it isolates target classes, providing finite convergence for separable problems while highlighting the necessity of margin optimization and non-linear extensions.
