# Lesson 3: Activation Functions: The Nonlinear

## Non-Linear Activation Functions as Computational Engines

Non-linear activation functions serve as the functional core of deep neural networks, transforming affine matrix multiplications into flexible, curved coordinate mappings. Without non-linearity, networks of arbitrary depth collapse algebraically into single-layer linear transformations incapable of resolving complex geometries. Selecting an appropriate activation function governs network expressiveness, numerical stability, gradient propagation efficiency, and training convergence speed.

## Mathematical Properties of Activation Functions

### Differentiability and Subgradient Mechanics

- Backpropagation requires activation functions to be **differentiable almost everywhere** to allow gradient calculation via the multivariate chain rule.
- Smooth activations (such as Sigmoid and Tanh) possess continuous classical derivatives across their entire mathematical domain: $\mathbb{R} \to \mathbb{R}$.
- Piecewise linear activations (such as ReLU) feature points of non-differentiability, specifically at the origin ($z = 0$).
- At singular points of non-differentiability, optimization frameworks utilize **subgradient calculus**:
  $$\partial f(0) = [0, 1]$$
- Standard software implementations resolve the subgradient at $z = 0$ by convention, setting the derivative value deterministically to either $0$ or $1$ without impairing gradient descent convergence.

### The Zero-Centering Criterion and Gradient Dynamics

- An activation function is **zero-centered** if its output domain produces an expected value near zero over standard initialization distributions: $\mathbb{E}[g(z)] \approx 0$.
- Non-zero-centered functions (such as Sigmoid, where outputs are strictly positive: $g(z) \in (0, 1)$) introduce systematic optimization inefficiencies.
- The partial derivative of the loss $\mathcal{L}$ with respect to weight $w_i^{[l]}$ depends on the incoming activation from the prior layer:
  $$\frac{\partial \mathcal{L}}{\partial w_i^{[l]}} = \frac{\partial \mathcal{L}}{\partial z^{[l]}} a_i^{[l-1]}$$
- Because $a_i^{[l-1]} > 0$ for all inputs, every weight gradient feeding into a specific neuron shares the identical sign of the upstream error $\frac{\partial \mathcal{L}}{\partial z^{[l]}}$.
- This sign coupling forces parameter updates to move simultaneously in positive or negative directions, causing erratic **zig-zag trajectories** toward the minimum and slowing training speed.

### Bounded Versus Unbounded Activation Ranges

- **Bounded activations** restrict output magnitudes to finite intervals (such as $(0, 1)$ for Sigmoid or $(-1, 1)$ for Tanh).
- Bounded ranges provide numerical stability in early training by preventing forward activations from compounding into floating-point overflow.
- Bounded functions inevitably exhibit asymptotic flattening at extreme inputs, triggering severe **gradient saturation**.
- **Unbounded activations** (such as ReLU: $[0, \infty)$) eliminate positive gradient saturation, allowing backpropagated error signals to flow across arbitrary layer depths without decay.
- Unbounded functions can lead to activation explosion if weight matrices have spectral norms exceeding one, requiring techniques like batch normalization and gradient clipping.

> [!Tip]
> **Zero-centered activations** eliminate directional coupling: allowing outputs to take both positive and negative values ensures that incoming weight updates can move independently, preventing zig-zagging optimization paths.

## Classical Saturating Activations: Sigmoid and Tanh

### The Logistic Sigmoid and Gradient Decay

- The **logistic sigmoid** maps continuous real inputs into posterior probability bounds:
  $$\sigma(z) = \frac{1}{1 + e^{-z}}$$
- Its first derivative expresses in terms of the output:
  $$\sigma'(z) = \sigma(z)(1 - \sigma(z))$$
- The derivative peaks at the origin: $\sigma'(0) = 0.25$.
- Because $|\sigma'(z)| \le 0.25$ everywhere, chaining these derivatives across $L$ layers causes the backpropagated error to diminish by at least a factor of $4$ per layer:
  $$\|\nabla_{a^{[1]}} \mathcal{L}\| \propto \prod_{l=1}^L \sigma'(z^{[l]}) \le (0.25)^L$$
- In networks with more than four layers, error signals in early layers decay toward machine epsilon, causing learning to halt completely.

### The Hyperbolic Tangent and Zero-Mean Alignment

- The **hyperbolic tangent (Tanh)** function is an affine-scaled variant of the logistic sigmoid:
  $$\tanh(z) = \frac{e^z - e^{-z}}{e^z + e^{-z}} = 2\sigma(2z) - 1$$
- Its output maps to the symmetric interval $(-1, 1)$, satisfying the zero-centering criterion: $\tanh(0) = 0$.
- Its first derivative reaches a maximum value of $1.0$ at the origin:
  $$\tanh'(z) = 1 - \tanh^2(z)$$
- While Tanh improves on Sigmoid by offering zero-centered activations and four times larger peak gradient flow ($\tanh'(0) = 1.0$ vs $\sigma'(0) = 0.25$), it remains vulnerable to saturation.

### The Saturation Mechanism and Vanishing Gradients

- Both Sigmoid and Tanh display asymptotic plateaus when input magnitudes become large ($|z| \ge 3$).
- In these saturated regimes, the local derivative approaches zero: $\lim_{|z| \to \infty} g'(z) = 0$.
- When a neuron's pre-activation drifts into these regimes, multiplying incoming gradients by the local derivative near zero scales the upstream error to zero.
- The neuron ceases to transmit learning signals backward, freezing parameter updates in all upstream layers connected to it.

> [!Important]
> **Activation saturation** extinguishes gradient flow: when inputs to Sigmoid or Tanh units exceed absolute values of three, the local derivative drops to near zero, stopping weight updates across all preceding layers.

## Non-Saturating Piecewise Linear Activations

### The Rectified Linear Unit (ReLU) Mechanics

- Introduced to deep architectures to eliminate gradient vanishing, the **Rectified Linear Unit (ReLU)** is defined as:
  $$\text{ReLU}(z) = \max(0, z) = \begin{cases} z & \text{if } z > 0 \\ 0 & \text{if } z \le 0 \end{cases}$$
- Its derivative is piecewise constant across active domains:
  $$\frac{d}{dz}\text{ReLU}(z) = \begin{cases} 1 & \text{if } z > 0 \\ 0 & \text{if } z < 0 \end{cases}$$
- For positive inputs ($z > 0$), ReLU exhibits **zero gradient saturation**: the derivative is strictly $1.0$, allowing gradients to backpropagate across deep networks without scaling decay.
- ReLU is computationally inexpensive, requiring only an algebraic comparison against zero rather than floating-point exponentiation.
- It induces **activation sparsity**: negative inputs produce an exact zero activation, leading to sparse latent representations where only a fraction of neurons fire for any given sample.

### The Dying ReLU Pathology

- Despite its training speed advantages, ReLU suffers from the **Dying ReLU problem**.
- If a large gradient update shifts a neuron's bias or weights such that its pre-activation is strictly negative ($z < 0$) across the entire dataset, the neuron outputs zero constantly.
- In this regime, the derivative evaluates to zero everywhere: $\frac{d}{dz} = 0$.
- The neuron receives no gradient updates during subsequent backpropagation steps, locking its weights permanently in an inactive state.
- In poorly initialized or unregularized networks, up to 40% of all ReLU neurons can die during early training, reducing the functional capacity of the network.

### Leaky ReLU and Parametric Variants (PReLU)

- **Leaky ReLU** prevents neuron death by introducing a small, constant positive slope $\alpha$ (typically $\alpha = 0.01$) across the negative input domain:
  $$\text{Leaky ReLU}(z) = \max(\alpha z, z) = \begin{cases} z & \text{if } z > 0 \\ \alpha z & \text{if } z \le 0 \end{cases}$$
- Its derivative is strictly non-zero across its entire domain:
  $$\frac{d}{dz}\text{Leaky ReLU}(z) = \begin{cases} 1 & \text{if } z > 0 \\ \alpha & \text{if } z < 0 \end{cases}$$
- The negative slope $\alpha$ ensures that inactive neurons pass a small gradient signal ($\alpha$), allowing optimizer updates to pull the neuron back into an active state.
- **Parametric ReLU (PReLU)** treats the slope coefficient $\alpha$ as a learnable parameter optimized through standard backpropagation:
  $$\frac{\partial \mathcal{L}}{\partial \alpha} = \sum_{i} \frac{\partial \mathcal{L}}{\partial a_i} \cdot \min(0, z_i)$$
- Learnable negative slopes allow the network to adjust activation behavior per layer, operating as standard ReLU when $\alpha = 0$ or approaching a linear transformation when $\alpha \to 1$.

> [!Tip]
> **Leaky ReLU** eliminates dead neurons: assigning a small non-zero slope to negative pre-activations preserves gradient flow, ensuring inactive neurons can recover during optimization.

## Modern Continuous and Gated Activations

### Exponential Linear Units: ELU and SELU

- The **Exponential Linear Unit (ELU)** smooths the negative activation regime using an exponential curve:
  $$\text{ELU}(z) = \begin{cases} z & \text{if } z > 0 \\ \alpha(e^z - 1) & \text{if } z \le 0 \end{cases}$$
- Its first derivative is continuous everywhere when $\alpha = 1.0$:
  $$\frac{d}{dz}\text{ELU}(z) = \begin{cases} 1 & \text{if } z > 0 \\ \text{ELU}(z) + \alpha & \text{if } z \le 0 \end{cases}$$
- The negative asymptotic saturation ($-\alpha$) provides robust resistance to input noise, while the smooth negative tail brings the expected value of activations closer to zero.
- The **Scaled Exponential Linear Unit (SELU)** scales the ELU formulation using two fixed mathematical constants ($\lambda \approx 1.0507$, $\alpha \approx 1.6733$):
  $$\text{SELU}(z) = \lambda \begin{cases} z & \text{if } z > 0 \\ \alpha(e^z - 1) & \text{if } z \le 0 \end{cases}$$
- SELU induces **self-normalizing properties** in feedforward networks, causing activation distributions across layers to converge naturally toward zero mean and unit variance without explicit batch normalization.

### Gaussian Error Linear Units (GELU)

- The **Gaussian Error Linear Unit (GELU)** weights the input by the cumulative distribution function (CDF) of the standard normal distribution:
  $$\text{GELU}(z) = z \cdot \Phi(z) = z \cdot P(X \le z) = z \cdot \frac{1}{2} \left[ 1 + \text{erf}\left(\frac{z}{\sqrt{2}}\right) \right]$$
  where $\text{erf}(\cdot)$ denotes the Gauss error function.
- A fast numerical approximation avoids costly error function integrations:
  $$\text{GELU}(z) \approx 0.5z \left( 1 + \tanh\left( \sqrt{\frac{2}{\pi}} \left( z + 0.044715 z^3 \right) \right) \right)$$
- Unlike ReLU, GELU is smooth, non-monotonic, and retains curvature across negative values, dipping to a global minimum of approximately $-0.17$ at $z \approx -0.75$.
- GELU functions as a probabilistic gate that suppresses small inputs while passing large positive inputs, serving as the standard activation function in modern Transformer models (including BERT, GPT, and RoBERTa).

### Self-Gated Formulations: Swish and Mish

- The **Swish (SiLU)** activation function uses a self-gated sigmoid mechanism:
  $$\text{Swish}(z) = z \cdot \sigma(\beta z) = \frac{z}{1 + e^{-\beta z}}$$
  where $\beta$ is a fixed hyperparameter or a learnable parameter.
- Swish is smooth, non-monotonic, bounded below (at approximately $-0.28$ for $\beta=1$), and unbounded above.
- Its non-monotonic profile allows small negative inputs to produce negative outputs, preserving small gradient signals that standard ReLU discards.
- The **Mish** activation function couples the input with the hyperbolic tangent of the softplus function:
  $$\text{Mish}(z) = z \cdot \tanh(\text{softplus}(z)) = z \cdot \tanh(\ln(1 + e^z))$$
- Mish provides continuous, non-linear curvature that eliminates gradient plateaus, outperforming ReLU in deep convolutional networks and object detection systems.

> [!Important]
> **Smooth non-monotonicity** improves deep representation: activations like GELU and Swish dip below zero before rising, providing continuous curvature that preserves subtle gradients and speeds convergence in deep architectures.

## Comparative Matrix of Activation Functions

| Activation Function | Mathematical Definition | Output Domain | Peak Derivative $g'(0)$ | Zero-Centered? | Primary Strength / Bottleneck |
|---|---|---|---|---|---|
| **Logistic Sigmoid** | $\frac{1}{1 + e^{-z}}$ | $(0, 1)$ | $0.25$ | No | Probabilistic output mapping; severe gradient vanishing across layers |
| **Tanh** | $\frac{e^z - e^{-z}}{e^z + e^{-z}}$ | $(-1, 1)$ | $1.00$ | Yes | Zero-centered outputs; saturates and eliminates gradients at $|z| > 3$ |
| **ReLU** | $\max(0, z)$ | $[0, \infty)$ | Undefined ($1.0$ by convention) | No | High computational speed and non-saturating positive slope; prone to Dying ReLU |
| **Leaky ReLU** | $\max(\alpha z, z), \; \alpha \approx 0.01$ | $(-\infty, \infty)$ | Undefined ($1.0$ by convention) | Near zero | Eliminates dead neurons via negative slope; introduces empirical hyperparameter $\alpha$ |
| **ELU** | $z$ if $z > 0$; $\alpha(e^z - 1)$ if $z \le 0$ | $(-\alpha, \infty)$ | $1.00$ (for $\alpha=1$) | Yes ($\approx 0$) | Smooth noise resistance; requires transcendental exponential evaluations |
| **SELU** | $\lambda z$ if $z > 0$; $\lambda\alpha(e^z - 1)$ if $z \le 0$ | $(-\lambda\alpha, \infty)$ | $\lambda \approx 1.05$ | Yes | Enables self-normalizing networks; sensitive to non-standard initialization |
| **GELU** | $z \cdot \Phi(z)$ | $(-0.17, \infty)$ | $0.50$ | Near zero | Smooth probabilistic gating; higher computational cost than piecewise linear functions |
| **Swish (SiLU)** | $z \cdot \sigma(z)$ | $(-0.28, \infty)$ | $0.50$ | Near zero | Non-monotonic and unbounded; requires floating-point exponential operations |
| **Mish** | $z \cdot \tanh(\ln(1 + e^z))$ | $(-0.31, \infty)$ | $0.60$ | Near zero | Smooth gradient profile across loss surfaces; computationally expensive evaluation |

> [!Tip]
> **Activation selection depends on architecture**: use ReLU or Leaky ReLU for standard dense layers and CNNs to maximize throughput; choose GELU or Swish for Transformers and very deep architectures to optimize gradient flow.

## Key Takeaways

- **Non-linear activations** provide the mathematical curvature necessary to prevent multi-layer networks from collapsing into single linear transformations.
- **Differentiability almost everywhere** enables gradient descent, with subgradient conventions at points of non-differentiability ensuring stable backpropagation.
- **Non-zero centered activations** (such as Sigmoid) force weight updates to couple in sign, causing inefficient zig-zagging optimization paths.
- **Saturating functions** (Sigmoid and Tanh) compress extreme inputs into flat plateaus, reducing backpropagated gradients to near zero and halting learning in deep layers.
- **ReLU eliminates positive gradient saturation** with a constant derivative of $1.0$, but risks the Dying ReLU failure mode when neurons become trapped in negative pre-activation regimes.
- **Leaky ReLU and PReLU** resolve neuron death by providing a small non-zero slope across the negative domain, ensuring continuous gradient transmission.
- **GELU and Swish** introduce smooth, non-monotonic gating profiles that retain subtle negative gradient signals, forming the standard activation choices for modern Transformer architectures.
- **Activation tradeoffs balance speed and stability**: simple piecewise functions like ReLU maximize GPU throughput, while smooth functions like GELU deliver superior convergence on complex loss surfaces.

> [!Important]
> The fundamental design principle of activation functions: **gradient preservation governs trainability**; choosing non-saturating, zero-centered, and smooth activations keeps backpropagated error signals stable, allowing gradient descent to train deep architectures reliably.
