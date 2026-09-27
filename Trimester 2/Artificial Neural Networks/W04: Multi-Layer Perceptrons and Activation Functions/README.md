# Migration in progress
# W04: Multi-Layer Perceptrons and Activation Functions

## Multi-Layer Perceptrons and Activation Functions

The Multi-Layer Perceptron (MLP) extends single-neuron models into deep architectures capable of modeling non-linear relationships. By arranging artificial neurons into sequential cascades of affine transformations interleaved with non-linear activation functions, MLPs transform input spaces into latent geometries where complex boundaries become linearly separable. Analyzing layer parameterization, the mathematical collapse of purely linear networks, the properties of activation functions, and output configurations establishes the theoretical framework for understanding deep feedforward networks.

## Architectural Anatomy of Multi-Layer Perceptrons

### Layered Organization and Notation Conventions

- A **Multi-Layer Perceptron (MLP)** consists of an **input layer**, one or more intermediate **hidden layers**, and an **output layer**.
- Information flows unidirectionally from input to output without cycles, defining the network as a **feedforward neural network**.
- Let $L$ denote the total number of layers excluding the input layer, indexed by superscript $[l]$ where $l \in \{1, 2, \dots, L\}$.
- The input vector represents layer zero activations: $a^{[0]} = x \in \mathbb{R}^{n_0}$, where $n_0$ is the input feature dimension.
- Each hidden layer $l$ contains $n_l$ neurons, parameterized by a weight matrix $W^{[l]} \in \mathbb{R}^{n_l \times n_{l-1}}$ and a bias vector $b^{[l]} \in \mathbb{R}^{n_l}$.

### Forward Propagation Mechanics

- For each layer $l \in \{1, \dots, L\}$, forward execution proceeds in two successive operations: an **affine transformation** followed by an element-wise **activation function**:
  $$z^{[l]} = W^{[l]} a^{[l-1]} + b^{[l]}$$
  $$a^{[l]} = g^{[l]}(z^{[l]})$$
- The pre-activation vector $z^{[l]} \in \mathbb{R}^{n_l}$ computes the weighted combination of incoming activations.
- The activation vector $a^{[l]} \in \mathbb{R}^{n_l}$ applies the activation function $g^{[l]}: \mathbb{R} \to \mathbb{R}$ independently to each component of $z^{[l]}$.
- For a mini-batch of $m$ training samples organized into a data matrix $A^{[l-1]} \in \mathbb{R}^{m \times n_{l-1}}$, forward propagation evaluates across samples using matrix multiplication:
  $$Z^{[l]} = A^{[l-1]} (W^{[l]})^T + \mathbf{1}_m (b^{[l]})^T$$
  $$A^{[l]} = g^{[l]}(Z^{[l]})$$
  where $\mathbf{1}_m$ is an $m$-dimensional column vector of ones that broadcasts the bias across every row.

### Parameter Accounting and Computational Footprint

- The total number of learnable parameters in a dense layer $l$ equals the sum of its weight entries and bias terms:
  $$P^{[l]} = (n_l \times n_{l-1}) + n_l = n_l (n_{l-1} + 1)$$
- The parameter count of an entire $L$-layer network is the sum across all operational layers:
  $$P_{\text{total}} = \sum_{l=1}^L n_l (n_{l-1} + 1)$$
- Dense layers require quadratic parameter growth relative to layer width, making deep, narrow architectures more parameter-efficient than shallow, ultra-wide layers.

> [!Tip]
> **Forward propagation** decomposes into matrix algebra: caching intermediate pre-activations $z^{[l]}$ and post-activations $a^{[l]}$ during forward evaluation is required to evaluate reverse-mode derivatives during backpropagation.

## The Mathematical Necessity of Non-Linearity

### The Collapse of Linear Cascades

- If every layer in a deep feedforward network uses an **identity activation function** ($g(z) = z$), the entire network reduces algebraically to a single linear transformation.
- *Proof:* Consider a two-layer linear network where $a^{[1]} = W^{[1]} x + b^{[1]}$ and $\hat{y} = W^{[2]} a^{[1]} + b^{[2]}$:
  $$\hat{y} = W^{[2]} (W^{[1]} x + b^{[1]}) + b^{[2]} = (W^{[2]} W^{[1]}) x + (W^{[2]} b^{[1]} + b^{[2]})$$
- Defining an effective weight matrix $W' = W^{[2]} W^{[1]}$ and an effective bias vector $b' = W^{[2]} b^{[1]} + b^{[2]}$ reveals the composite mapping:
  $$\hat{y} = W' x + b'$$
- By mathematical induction, cascading $L$ purely linear layers collapses to a single affine mapping $\hat{y} = W_{\text{eff}} x + b_{\text{eff}}$, where $W_{\text{eff}} = \prod_{l=L}^1 W^{[l]}$.
- A linear network with arbitrary depth cannot compute decision boundaries or representations beyond the capacity of a single-layer linear model.

### The Universal Approximation Theorem

- Formulated by George Cybenko (1989) for sigmoidal activations and generalized by Kurt Hornik (1991) for arbitrary non-constant, bounded, continuous activations:
- The **Universal Approximation Theorem** states that a standard feedforward network with a **single hidden layer** containing a finite number of neurons can approximate any continuous function $f: K \to \mathbb{R}^m$ on a compact subset $K \subset \mathbb{R}^n$ to arbitrary precision $\epsilon > 0$.
- Formally, there exist parameters $\{w_i, b_i, v_i\}$ such that the network output $F(x) = \sum_{i=1}^N v_i \, g(w_i^T x + b_i)$ satisfies:
  $$\sup_{x \in K} |F(x) - f(x)| < \epsilon$$
- While the theorem proves that a shallow network possesses the **representational capacity** to approximate continuous functions, it provides no guarantee that standard optimization algorithms can discover those optimal parameters.

### Representational Efficiency: Depth Versus Width

- Approximating complex, highly oscillatory functions using a single hidden layer can require an **exponential number of hidden neurons** relative to input dimension: $N \in O(2^n)$.
- Deep architectures distribute function approximations across hierarchical representations, where early layers extract low-level features and deeper layers assemble them into complex compositional concepts.
- Composing functions through layer depth allows deep networks to represent specific function classes (such as parity or polynomial functions) using **polynomially bounded parameters**, whereas shallow architectures require exponential parameter counts.

> [!Important]
> **Non-linear activations** prevent structural collapse: without non-linear operations between successive dense layers, adding depth confers no representational power beyond a single linear regression model.

## Classical Saturating Activations

### The Logistic Sigmoid Function

- The **logistic sigmoid** maps real inputs to the open unit interval $(0, 1)$:
  $$\sigma(z) = \frac{1}{1 + e^{-z}}$$
- Its first derivative reaches an absolute maximum of $0.25$ at the origin ($z = 0$):
  $$\sigma'(z) = \sigma(z)(1 - \sigma(z))$$
- **Saturation regimes** occur when $|z| \gg 0$; as activations move into positive or negative extremes, the derivative approaches zero: $\lim_{z \to \pm\infty} \sigma'(z) = 0$.

### The Hyperbolic Tangent (Tanh) Function

- The **hyperbolic tangent** is a scaled, shifted variant of the logistic sigmoid, mapping inputs to the open interval $(-1, 1)$:
  $$\tanh(z) = \frac{e^z - e^{-z}}{e^z + e^{-z}} = 2\sigma(2z) - 1$$
- Its first derivative expresses in terms of the function output, peaking at $1.0$ when $z = 0$:
  $$\tanh'(z) = 1 - \tanh^2(z)$$
- The function is **zero-centered** ($\tanh(0) = 0$), meaning the expected value of activations remains closer to zero throughout training compared to the sigmoid.
- Tanh displays steep saturation at both positive and negative extremes, extinguishing gradient propagation when activations drift into regions where $|z| > 3$.

### The Vanishing Gradient Dilemma and Non-Zero Centering

- The **vanishing gradient problem** occurs during backpropagation when downstream errors are multiplied by saturating activation derivatives across $L$ layers:
  $$\nabla_{a^{[1]}} \mathcal{L} = \left[ \prod_{l=2}^L W^{[l]T} \text{diag}(g'(z^{[l]})) \right] \nabla_{a^{[L]}} \mathcal{L}$$
- Because $\sigma'(z) \le 0.25$ and $\tanh'(z) \le 1.0$, deep chains of these derivatives diminish error signals exponentially toward zero ($O(0.25^L)$ for sigmoid), stalling learning in early layers.
- Sigmoid outputs are strictly positive ($\sigma(z) > 0$), creating a **non-zero centered output** problem.
- When all inputs to a neuron are strictly positive, the gradient of the loss with respect to incoming weights shares the exact same sign across all dimensions:
  $$\frac{\partial \mathcal{L}}{\partial w_i} = \frac{\partial \mathcal{L}}{\partial z} a_i$$
- This forces all parameter updates to move in the same direction (all positive or all negative), inducing slow, inefficient **zig-zag trajectories** during gradient descent optimization.

> [!Important]
> **Activation saturation** causes vanishing gradients: when hidden neurons take extreme values, their derivatives drop to zero, preventing backpropagated error signals from updating parameters in earlier layers.

## Modern Non-Saturating Activation Functions

### The Rectified Linear Unit (ReLU)

- The **Rectified Linear Unit (ReLU)** is a piecewise linear activation function defined by:
  $$\text{ReLU}(z) = \max(0, z) = \begin{cases} z & \text{if } z > 0 \\ 0 & \text{if } z \le 0 \end{cases}$$
- Its sub-derivative evaluates to a constant one for all positive activations:
  $$\frac{d}{dz}\text{ReLU}(z) = \begin{cases} 1 & \text{if } z > 0 \\ 0 & \text{if } z < 0 \end{cases}$$
- For positive inputs, ReLU exhibits **no gradient saturation**; its derivative remains constant at $1.0$, enabling error propagation across deep network depths without exponential decay.
- ReLU is computationally efficient to evaluate, requ