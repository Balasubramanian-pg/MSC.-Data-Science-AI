# Lesson 3: Gradients and Derivatives

## Gradients and Derivatives for Neural Networks

Differential calculus provides the analytical framework for measuring how adjustments to model parameters influence loss function values during training. Neural networks learn by propagating error signals across computational graphs, updating parameter values through systematic application of the multivariate chain rule. Understanding partial derivatives, gradient vectors, Jacobians, and Hessians is essential for analyzing optimization trajectories, choosing step sizes, and troubleshooting gradient instabilities.

## Derivatives and Rates of Change

### The Derivative as Instantaneous Rate of Change

- A **derivative** measures the *instantaneous rate of change* of a function output with respect to an infinitesimal variation in its input: $f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$.
- Geometrically, the derivative represents the *slope of the tangent line* to the function curve at a specified evaluation point.
- In optimization, the sign of the derivative indicates direction: a positive derivative means increasing the input increases the output, while a negative derivative indicates that increasing the input decreases the output.
- A derivative of zero identifies a **stationary point** (critical point), where the tangent line is horizontal, indicating a local minimum, local maximum, or inflection point.

### Foundational Differentiation Rules

- The **power rule** calculates derivatives of polynomial terms: $\frac{d}{dx} x^n = n x^{n-1}$.
- The **sum rule** establishes linearity: $\frac{d}{dx} [a f(x) + b g(x)] = a f'(x) + b g'(x)$.
- The **product rule** computes changes in interacting terms: $\frac{d}{dx} [f(x) g(x)] = f'(x) g(x) + f(x) g'(x)$.
- The **quotient rule** determines derivatives of rational functions: $\frac{d}{dx} \left[ \frac{f(x)}{g(x)} \right] = \frac{f'(x) g(x) - f(x) g'(x)}{[g(x)]^2}$.
- Activation functions require explicit analytic derivatives; for example, the sigmoid function $\sigma(x) = \frac{1}{1 + e^{-x}}$ yields the self-referential derivative $\sigma'(x) = \sigma(x)(1 - \sigma(x))$.

> [!Tip]
> **Derivatives** quantify parameter sensitivity: calculating the derivative of the loss function indicates the exact direction and magnitude of adjustment required to reduce prediction error.

## Partial Derivatives and the Gradient Vector

### Partial Derivatives in Multidimensional Spaces

- A **partial derivative** measures the rate of change of a multivariable function $f(x_1, x_2, \dots, x_n)$ with respect to *one variable* while holding all remaining variables constant.
- The notation $\frac{\partial f}{\partial x_i}$ isolates the sensitivity of the output to variations along the single coordinate axis $x_i$.
- Evaluating partial derivatives independently treats complex, interconnected networks as collections of distinct single-variable subproblems at any given instant.

### Geometric Properties of the Gradient

- The **gradient** ($\nabla f$) packages all first-order partial derivatives of a scalar function into a single vector: $\nabla f(x) = \left[ \frac{\partial f}{\partial x_1}, \frac{\partial f}{\partial x_2}, \dots, \frac{\partial f}{\partial x_n} \right]^T$.
- The gradient vector points directly in the direction of **steepest ascent** on the multidimensional loss surface.
- The magnitude of the gradient, $\|\nabla f\|_2$, quantifies the *steepness* or maximum slope of the surface at that specific location.
- The negative gradient, $-\nabla f$, defines the direction of **steepest descent**, dictating parameter updates in gradient descent algorithms: $\theta \leftarrow \theta - \eta \nabla_\theta \mathcal{L}$.

### Directional Derivatives and Level Sets

- A **directional derivative** ($D_v f = \nabla f \cdot v$) computes the rate of change of $f$ along an arbitrary unit vector direction $v$.
- The directional derivative achieves its maximum value when $v$ aligns parallel to $\nabla f$, and equals zero when $v$ is orthogonal to $\nabla f$.
- The gradient vector is always *perpendicular to the level curves* (contour lines) or level surfaces of the function.
- Following the negative gradient vector produces an optimization trajectory that crosses orthogonal contour lines toward lower loss values.

> [!Important]
> **The gradient vector** establishes the optimal local search direction: gradient descent moves along the negative gradient to achieve the greatest possible local reduction in loss per unit distance.

## The Chain Rule and the Backpropagation Engine

### Univariate and Multivariate Chain Rules

- The **univariate chain rule** states that the derivative of a composite function $z = f(g(x))$ is the product of the outer and inner derivatives: $\frac{dz}{dx} = \frac{dz}{dg} \cdot \frac{dg}{dx}$.
- The **multivariate chain rule** sums gradient contributions across all independent paths connecting the input to the output through intermediate variables: $\frac{\partial z}{\partial x} = \sum_j \frac{\partial z}{\partial u_j} \frac{\partial u_j}{\partial x}$.
- Deep neural networks represent nested composite functions: $f(x) = f_L(f_{L-1}(\dots f_1(x; W_1)\dots; W_{L-1}); W_L)$.
- Computing loss sensitivity for early layers requires propagating derivatives backward through every intermediate transformation via continuous matrix chain multiplications.

### Computational Graphs and Backpropagation

- A **computational graph** represents mathematical expressions as directed acyclic graphs where nodes represent operations or variables, and edges carry tensor data.
- The **forward pass** evaluates operations sequentially from inputs to outputs, caching intermediate activations needed for derivative calculations.
- The **backward pass** applies the chain rule systematically in reverse topological order, starting from the scalar loss node and moving toward the network parameters.
- Caching forward activations reduces computational redundancy by reusing intermediate values rather than recomputing them during reverse sweeps.

> [!Tip]
> **The chain rule** forms the mathematical engine of backpropagation: it decomposes the gradient of a complex composite network into local derivative computations executed at individual nodes.

## Vector and Matrix Calculus

### The Jacobian Matrix

- The **Jacobian matrix** ($J$) generalizes the gradient to vector-valued functions $f: \mathbb{R}^n \to \mathbb{R}^m$, containing all first-order partial derivatives.
- The Jacobian entry at row $i$ and column $j$ is defined as $J_{ij} = \frac{\partial f_i}{\partial x_j}$, producing an $m \times n$ matrix.
- Layers with multi-dimensional outputs (such as Softmax activations or fully connected layers) use Jacobians to describe how every output element responds to every input element.
- Deep learning frameworks compute **vector-Jacobian products (VJPs)** rather than materializing full Jacobian matrices, avoiding extreme memory consumption during backpropagation.

### Gradients of Linear and Matrix Forms

- The gradient of an inner product with respect to a vector satisfies: $\nabla_x (w^T x) = w$.
- The gradient of a quadratic form with a symmetric matrix $A$ satisfies: $\nabla_x (x^T A x) = 2 A x$.
- For a dense layer computing $z = Wx + b$, the gradient of a scalar loss $\mathcal{L}$ with respect to the input vector is $\nabla_x \mathcal{L} = W^T (\nabla_z \mathcal{L})$.
- The gradient of the scalar loss with respect to the weight matrix is the outer product of upstream gradients and forward activations: $\nabla_W \mathcal{L} = (\nabla_z \mathcal{L}) x^T$.
- The gradient with respect to the bias vector equals the upstream error vector directly: $\nabla_b \mathcal{L} = \nabla_z \mathcal{L}$.

> [!Important]
> **Vector-Jacobian products** make backpropagation scalable: computing the product of an incoming error vector with a local Jacobian avoids allocating massive dense derivative matrices in memory.

## Second-Order Derivatives and Curvature

### The Hessian Matrix and Local Curvature

- The **Hessian matrix** ($H$) is a square $n \times n$ matrix containing all *second-order partial derivatives* of a scalar-valued function: $H_{ij} = \frac{\partial^2 f}{\partial x_i \partial x_j}$.
- By **Schwarz's theorem**, if the second partial derivatives are continuous, the Hessian is symmetric: $H_{ij} = H_{ji}$ (meaning $H = H^T$).
- The Hessian measures the **curvature** of the loss surface, indicating whether the gradient is changing rapidly or slowly along specific directions.
- The second-order Taylor expansion approximates a function locally: $f(x + \Delta x) \approx f(x) + \nabla f(x)^T \Delta x + \frac{1}{2} \Delta x^T H \Delta x$.

### Hessian Eigenvalues and Critical Point Classification

- The eigenvalues of the Hessian determine the geometric nature of a stationary point where $\nabla f(x) = 0$.
- A **positive-definite Hessian** (all eigenvalues strictly positive) indicates strictly upward curvature, confirming a **local minimum**.
- A **negative-definite Hessian** (all eigenvalues strictly negative) indicates downward curvature in all directions, confirming a **local maximum**.
- An **indefinite Hessian** (possessing both positive and negative eigenvalues) identifies a **saddle point**, where the surface curves upward along some axes and downward along others.
- High-dimensional loss surfaces are dominated by saddle points rather than local minima, making methods that overcome zero-gradient plateaus essential.

### Ill-Conditioning and Optimization Obstacles

- The **condition number** of the Hessian, $\kappa(H) = \frac{|\lambda_{\max}|}{|\lambda_{\min}|}$, measures the disparity in curvature across different coordinate axes.
- A high condition number creates an **ill-conditioned surface** (such as a narrow, elongated valley or ravine).
- First-order gradient descent oscillates violently across the steep walls of the ravine while making slow progress along the flat valley floor.
- Second-order optimization methods (such as Newton's method: $\Delta x = -H^{-1} \nabla f$) rescale step sizes using curvature, but computing and inverting the full $n \times n$ Hessian is computationally prohibitive for deep architectures.

> [!Tip]
> **Hessian eigenvalues** identify loss geometry: positive eigenvalues in every direction confirm a local minimum, while mixed positive and negative eigenvalues expose a saddle point.

## Differentiation Paradigms in Deep Learning

### Evaluation Methods for Derivatives

- **Numerical differentiation** uses finite difference approximations: $f'(x) \approx \frac{f(x+h) - f(x)}{h}$; it requires $O(n)$ function evaluations for $n$ variables and suffers from floating-point truncation errors.
- **Symbolic differentiation** manipulates algebraic expressions mathematically using computer algebra systems; it produces exact expressions but suffers from exponential expression growth (expression swell).
- **Forward-mode automatic differentiation** calculates derivatives alongside the forward pass using dual numbers; it is computationally efficient when the number of inputs is small and the number of outputs is large ($m \gg n$).
- **Reverse-mode automatic differentiation** executes a forward pass to compute values followed by a reverse sweep to collect derivatives; it evaluates gradients of a scalar objective with respect to millions of inputs ($n \gg 1$) in a single backward pass.

| Differentiation Technique | Mathematical Basis | Time Complexity for $f: \mathbb{R}^n \to \mathbb{R}$ | Memory Consumption | Accuracy | Suitability for Deep Learning |
|---|---|---|---|---|---|
| **Numerical Differentiation** | Finite difference quotient | $O(n)$ forward passes | $O(1)$ intermediate state | Low (truncation/roundoff errors) | Gradient verification and sanity checks only |
| **Symbolic Differentiation** | Exact algebraic transformation rules | Variable (expression swell) | High (tree expansion) | Exact | Symbolic model generation; unusable for deep nets |
| **Forward-Mode Autodiff** | Dual numbers / Forward tangent propagation | $O(n)$ forward passes | $O(1)$ activation storage | Exact up to machine precision | Jacobian-vector products; inefficient for scalar loss |
| **Reverse-Mode Autodiff** | Reverse computational graph traversal | $O(1)$ forward passes | $O(L)$ activation storage | Exact up to machine precision | Standard backpropagation in modern deep learning |

> [!Important]
> **Reverse-mode automatic differentiation** enables deep learning at scale: it computes exact gradients for millions of parameters in a single reverse sweep with a computational cost proportional to one forward pass.

## Key Takeaways

- **Derivatives** measure parameter sensitivity, while the **gradient vector** aggregates all first-order partial derivatives to define the local direction of steepest ascent.
- **Gradient descent** updates parameters in the direction of the negative gradient, stepping orthogonally across loss contour boundaries toward lower error values.
- **The chain rule** provides the analytical mechanism for evaluating composite functions, allowing deep architectures to compute gradients layer by layer.
- **Computational graphs** operationalize calculus in software, saving forward activations to evaluate reverse-mode derivative expressions efficiently.
- **The Jacobian matrix** encapsulates all first-order partial derivatives for vector-to-vector functions, with vector-Jacobian products avoiding high memory allocations during backpropagation.
- **The Hessian matrix** captures second-order curvature information; its eigenvalues classify critical points into local minima, local maxima, and saddle points.
- **Ill-conditioned loss surfaces** cause standard gradient descent to oscillate across steep ravines, motivating adaptive learning rate algorithms and momentum.
- **Reverse-mode automatic differentiation** computes exact parameter gradients for scalar objective functions in $O(1)$ backward passes relative to the forward compute time.

> [!Tip]
> Neural network training relies on **first-order differential calculus**: reverse-mode automatic differentiation evaluates exact gradient vectors using the multivariate chain rule, guiding parameters across high-dimensional, non-convex loss surfaces toward minimal error configurations.
