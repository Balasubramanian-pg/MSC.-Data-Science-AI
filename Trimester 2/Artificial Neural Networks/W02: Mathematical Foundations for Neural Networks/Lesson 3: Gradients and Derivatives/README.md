# Migration in progress
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
- The gradient of a quadratic