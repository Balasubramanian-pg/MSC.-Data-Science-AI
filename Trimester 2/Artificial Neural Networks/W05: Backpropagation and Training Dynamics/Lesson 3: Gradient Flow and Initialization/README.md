# Migration in progress
# Lesson 3: Gradient Flow and Initialization

## Gradient Flow and Weight Initialization in Deep Networks

The trainability of deep neural networks depends on preserving stable signal propagation during both the forward and backward passes. When information traverses dozens or hundreds of stacked layers, uncalibrated parameter initializations trigger exponential signal decay or catastrophic magnitude explosion. Understanding the mathematics of gradient flow, the symmetry-breaking imperative, variance-preserving initialization frameworks, and architectural stabilizers ensures that error signals propagate across deep computational graphs without attenuation.

## The Mathematics of Gradient Flow across Depth

### The Jacobian Chain Product

- In an $L$-layer network, the sensitivity of the terminal loss $\mathcal{L}$ with respect to the input or early activations $a^{[1]}$ expands as a continuous product of layer-wise Jacobian matrices:
  $$\nabla_{a^{[1]}} \mathcal{L} = \left[ \prod_{l=2}^L J^{[l]} \right] \nabla_{a^{[L]}} \mathcal{L}$$
  where $J^{[l]} = \frac{\partial a^{[l]}}{\partial a^{[l-1]}} \in \mathbb{R}^{n^{[l]} \times n^{[l-1]}}$.
- Expanding the Jacobian into affine parameters and activation derivatives reveals the internal product structure:
  $$J^{[l]} = \text{diag}(g'^{[l]}(z^{[l]})) W^{[l]}$$
- The backpropagated gradient reaching the first hidden layer expands to:
  $$\nabla_{a^{[1]}} \mathcal{L} = \left[ \prod_{l=2}^L \left( W^{[l]T} \text{diag}(g'^{[l]}(z^{[l]})) \right) \right] \nabla_{a^{[L]}} \mathcal{L}$$
- The stability of the gradient vector depends on the cumulative multiplicative effect of this matrix-derivative chain.

### Singular Values and Spectral Radius Dynamics

- Decomposing the cumulative transformation matrix via **Singular Value Decomposition (SVD)** isolates its scaling properties across orthogonal axes: $\prod_{l=2}^L W^{[l]T} = U \Sigma V^T$.
- The **spectral norm** $\|W^{[l]}\|_2 = \sigma_{\max}(W^{[l]})$ quantifies the maximum amplification factor that layer $l$ can apply to an incoming error vector.
- The **spectral radius** $\rho(W)$ dictates long-term asymptotic scaling under repeated self-multiplication:
  $$\rho(W) = \max_i |\lambda_i(W)|$$
- If the singular values of the transition matrices persistently deviate from unity, error signals compound exponentially with layer depth $L$:
  $$\|\nabla_{a^{[1]}} \mathcal{L}\| \propto \left( \prod_{l=2}^L \sigma_l \right) \|\nabla_{a^{[L]}} \mathcal{L}\|$$

### Gradient Vanishing and Exploding Thresholds

- **The Vanishing Condition:** If the singular values or activation derivatives satisfy $\sigma_{\max}(W^{[l]T} \text{diag}(g')) < 1.0$ across depth, the gradient norm decays as $O(\gamma^L)$ where $\gamma < 1$.
- Vanishing gradients reduce parameter updates in early layers to near zero, freezing representation learning while final layers continue to update.
- **The Exploding Condition:** If the product satisfies $\sigma_{\min}(W^{[l]T} \text{diag}(g')) > 1.0$, error signals compound as $O(\gamma^L)$ where $\gamma > 1$.
- Exploding gradients produce massive parameter displacements that push weights into numerical overflow (`NaN` or `Inf`), causing training to diverge.

> [!Important]
> **Gradient flow is governed by matrix products**: maintaining stable learning across deep networks requires the effective singular values of layer-wise Jacobian products to remain close to unity throughout forward and backward passes.

## Initialization Pathologies and Symmetry Breaking

### Zero Initialization and the Symmetry Trap

- Initializing all weights to zero ($W^{[l]} = 0$) causes complete optimization failure in multi-layer architectures.
- If $W^{[l]} = 0$, every neuron in layer $l$ receives identical pre-activations: $z_j^{[l]} = b_j^{[l]}$.
- Assuming biases initialize at zero, post-activations evaluate identically across all neurons in that layer: $a_1^{[l]} = a_2^{[l]} = \dots = a_{n_l}^{[l]} = g(0)$.
- During the backward pass, each neuron receives an identical error signal $\delta_j^{[l]}$, producing identical weight gradients:
  $$\frac{\partial \mathcal{L}}{\partial w_{jk}^{[l]}} = \delta_j^{[l]} a_k^{[l-1]} = \delta_1^{[l]} a_k^{[l-1]}$$
- Because updates are identical, all neurons within a layer remain mathematically identical across all training epochs, reducing network capacity to that of a single neuron per layer.
- **Symmetry breaking** requires drawing initial weights from non-identical random distributions to ensure neurons learn distinct feature detectors.

### Small Random Initialization and Signal Collapse

- Attempting to break symmetry by sampling weights from a tiny Gaussian distribution (such as $W \sim \mathcal{N}(0, 0.01^2)$) fails in deep networks.
- In a dense layer computing $z_j = \sum_{i=1}^{n_{\text{in}}} w_{ji} x_i$, the variance of the pre-activation scales with the input dimension and weight variance:
  $$\text{Var}(z_j) = n_{\text{in}} \text{Var}(w) \text{Var}(x) = n_{\text{in}} (0.0001) \text{Var}(x)$$
- If $n_{\text{in}} \times 0.0001 \ll 1$, the variance of forward activations shrinks toward zero with each successive layer:
  $$\text{Var}(a^{[L]}) \propto \left( n_{\text{in}} \sigma_w^2 \right)^L \text{Var}(a^{[0]}) \to 0$$
- Forward activations collapse to zero in early hidden layers, while backward gradients vanish before reaching early weights.

### Large Random Initialization and Immediate Saturation

- Sampling weights from distributions with large variances (such as $W \sim \mathcal{N}(0, 1.0^2)$) causes activations to explode in magnitude.
- In wide layers ($n_{\text{in}} = 1000$), the pre-activation variance evaluates to $\text{Var}(z_j) = 1000 \times 1.0 \times \text{Var}(x) = 1000 \text{Var}(x)$.
- Standard deviations scale to large values ($|z| \gg 10$), pushing saturating activations (Sigmoid or Tanh) into their flat asymptotic regimes.
- In these saturated regimes, activation derivatives evaluate to near zero ($g'(z) \approx 0$), causing gradients to vanish on the very first backward pass.

> [!Tip]
> **Symmetry breaking requires calibrated variance**: sampling weights randomly breaks neuron redundancy, but the distribution variance must scale inversely with layer width to prevent signal collapse or activation saturation.

## Variance-Preserving Initialization Strategies

### The Glorot (Xavier) Framework for Symmetric Activations

- Proposed by Xavier Glorot and Yoshua Bengio (2010), **Glorot initialization** preserves signal variance across deep networks equipped with symmetric, zero-centered activations (such as Tanh).
- Let inputs $x_i$ and weights $w_{ji}$ be independent random variables with zero mean ($\mathbb{E}[x] = 0, \mathbb{E}[w] = 0$).
- The pre-activation of neuron $j$ evaluates to:
  $$z_j = \sum_{i=1}^{n_{\text{in}}} w_{ji} a_i$$
- Evaluating the variance of this sum:
  $$\text{Var}(z_j) = \sum_{i=1}^{n_{\text{in}}} \text{Var}(w_{ji} a_i) = \sum_{i=1}^{n_{\text{in}}} \left( \mathbb{E}[w_{ji}^2] \mathbb{E}[a_i^2] - (\mathbb{E}[w_{ji}])^2 (\mathbb{E}[a_i])^2 \right) = n_{\text{in}} \text{Var}(w) \text{Var}(a)$$
- To keep the forward signal variance constant across layers ($\text{Var}(z) = \text{Var}(a)$), the weights must satisfy:
  $$\text{Var}(w) = \frac{1}{n_{\text{in}}}$$
- Repeating this derivation for the backward pass to keep error variance constant ($\text{Var}(\delta^{[l-1]}) = \text{Var}(\delta^{[l]})$) requires:
  $$\text{Var}(w) = \frac{1}{n_{\text{out}}}$$
- Balancing forward signal preservation and backward error flow simultaneously uses the harmonic mean of fan-in and fan-out:
  $$\text{Var}(w) = \frac{2}{n_{\text{in}} + n_{\text{out}}}$$
- **Glorot Normal:** $W \sim \mathcal{N}\left(0, \frac{2}{n_{\text{in}} + n_{\text{out}}}\right)$.
- **Glorot Uniform:** $W \sim \mathcal{U}\left(-\sqrt{\frac{6}{n_