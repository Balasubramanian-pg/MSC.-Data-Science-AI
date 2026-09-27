# Migration in progress
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
- **Precondition 1 (Bounded Data):** There exists a positive real co