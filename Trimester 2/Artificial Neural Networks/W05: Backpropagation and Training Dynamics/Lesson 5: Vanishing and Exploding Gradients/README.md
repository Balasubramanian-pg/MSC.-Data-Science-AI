# Migration in progress
# Lesson 5: Vanishing and Exploding Gradients

## Vanishing and Exploding Gradients in Deep Neural Networks

Training deep neural networks requires propagating learning signals across extended computational chains without exponential amplification or severe attenuation. When backpropagation chains Jacobian matrices across dozens or hundreds of stacked layers, small scaling discrepancies compound exponentially, driving gradient magnitudes toward machine zero or arithmetic infinity. Diagnosing the mathematical origins of vanishing and exploding gradients, identifying their operational symptoms, and deploying architectural and algorithmic countermeasures ensures stable training across deep feedforward and recurrent networks.

## Mathematical Mechanics of Gradient Scaling

### The Chain Rule Decomposition

- In an $L$-layer feedforward network, the sensitivity of the objective loss $\mathcal{L}$ with respect to the pre-activation vector of an early layer $z^{[1]}$ expands as a continuous chain of matrix products:
  $$\delta^{[1]} = \frac{\partial \mathcal{L}}{\partial z^{[1]}} = \left[ \prod_{l=2}^L \left( W^{[l]T} \text{diag}(g'^{[l]}(z^{[l]})) \right) \right] \delta^{[L]}$$
  where $W^{[l]}$ is the layer weight matrix, $g'^{[l]}(z^{[l]})$ is the local activation derivative vector, and $\delta^{[L]} = \nabla_{z^{[L]}} \mathcal{L}$ is the output error vector.
- The overall transformation mapping downstream errors to early layers represents a composite **Jacobian product operator**:
  $$\Omega = \prod_{l=2}^L T^{[l]}, \quad \text{where } T^{[l]} = W^{[l]T} \text{diag}(g'^{[l]}(z^{[l]})) \in \mathbb{R}^{n^{[l-1]} \times n^{[l]}}$$
- The magnitude of the backpropagated error vector scales directly with the mathematical properties of the operator matrix $\Omega$:
  $$\|\delta^{[1]}\|_2 \le \|\Omega\|_2 \|\delta^{[L]}\|_2$$
  where $\|\Omega\|_2 = \sigma_{\max}(\Omega)$ denotes the spectral norm (largest singular value) of the composite transformation.

### Spectral Norms and Exponential Dynamics

- Applying the sub-multiplicative property of matrix norms establishes an upper bound on the composite operator:
  $$\|\Omega\|_2 = \left\| \prod_{l=2}^L T^{[l]} \right\|_2 \le \prod_{l=2}^L \|T^{[l]}\|_2 \le \prod_{l=2}^L \|W^{[l]}\|_2 \|g'^{[l]}(z^{[l]})\|_\infty$$
  where $\|g'^{[l]}(z^{[l]})\|_\infty = \max_j |g'^{[l]}(z_j^{[l]})|$ is the maximum scalar derivative across layer $l$.
- Let $\gamma_l = \|W^{[l]}\|_2 \|g'^{[l]}\|_\infty$ denote the effective scaling coefficient of layer $l$, and let $\bar{\gamma}$ denote its geometric mean across all layers:
  $$\|\delta^{[1]}\|_2 \approx (\bar{\gamma})^{L-1} \|\delta^{[L]}\|_2$$
- Because the network depth $L$ appears in the exponent, the gradient vector exhibits **exponential sensitivity** to the base value $\bar{\gamma}$:
  - If $\bar{\gamma} < 1.0$, the gradient norm decays exponentially toward zero: $\lim_{L \to \infty} (\bar{\gamma})^L = 0$ (**Vanishing Gradient**).
  - If $\bar{\gamma} > 1.0$, the gradient norm compounds exponentially toward infinity: $\lim_{L \to \infty} (\bar{\gamma})^L = \infty$ (**Exploding Gradient**).
  - Stable gradient propagation requires maintaining the critical balance condition: $\bar{\gamma} \approx 1.0$.

### The Lipschitz Continuity Perspective

- A function $f: \mathbb{R}^n \to \mathbb{R}^m$ is **Lipschitz continuous** with Lipschitz constant $K$ if:
  $$\|f(x_1) - f(x_2)\|_2 \le K \|x_1 - x_2\|_2 \quad \forall x_1, x_2$$
- The local Lipschitz constant of an $L$-layer network bounds the maximum gradient norm: $\|\nabla_x \mathcal{L}\|_2 \le \prod_{l=1}^L K^{[l]}$, where $K^{[l]} = \|W^{[l]}\|_2 \cdot \text{Lip}(g^{[l]})$.
- When $K^{[l]} < 1$, each layer acts as a strict contraction mapping, compressing input differences and causing gradient signals to vanish.
- When $K^{[l]} > 1$, the network acts as an expansion mapping, amplifying minor input perturbations into large output swings and triggering gradient explosion.

> [!Important]
> **Gradient flow is an exponential scaling phenomenon**: because backpropagation evaluates continuous products across $L$ layers, any persistent deviation of the effective layer gain from unity causes error signals to decay to machine zero or explode to infinity.

## The Vanishing Gradient Pathology

### Activation Saturation and Derivative Attenuation

- Classical activation functions like the **Logistic Sigmoid** and **Hyperbolic Tangent (Tanh)** exhibit flat horizontal plateaus at extreme input values ($|z| \gg 0$).
- The maximum derivative of the sigmoid function evaluates to:
  $$\max_z \sigma'(z) = \sigma'(0) = 0.25$$
- Even under optimal weight configurations where $\|W^{[l]}\|_2 \approx 1.0$, the derivative contribution guarantees an upper bound on layer gain of $\gamma \le 0.25$.
- In a 10-layer sigmoid network, the gradient attenuates by an exponential factor of at least:
  $$(0.25)^{10} \approx 9.54 \times 10^{-7}$$
- When activations drift away from zero into saturated regions ($|z| > 3$), local derivatives drop below $10^{-3}$, causing the backpropagated error to vanish entirely within three to four layers.

### Diagnostic Indicators and Layer-Wise Ratios

- **Early Layer Weight Stagnation:** Monitoring parameter updates reveals that final layer weights ($W^{[L]}$) receive updates, while early layer weights ($W^{[1]}, W^{[2]}$) show near-zero gradient norms:
  $$\|\nabla_{W^{[1]}} \mathcal{L}\|_F \ll \|\nabla_{W^{[L]}} \mathcal{L}\|_F$$
- **Gradient Magnitude Ratio:** Tracking the relative ratio of gradient norms across terminal and initial layers provides an explicit metric of vanishing behavior:
  $$\text{Ratio} = \frac{\|\nabla_{W^{[L]}} \mathcal{L}\|_F}{\|\nabla_{W^{[1]}} \mathcal{L}\|_F} > 10^4$$
- **Loss Plateauing:** Training loss drops initially as the final classification layer fits its bias to class priors, then flatlines completely because the underlying representation layers receive no corrective updates.

### Structural Consequences on Latent Representations

- When early layers receive zero gradient updates, their parameters remain locked in their initial, randomized configurations.
- The network fails to execute **representation learning**, operating as an unoptimized random feature extractor feeding into a linear output layer.
- Adding layers fails to reduce training loss; deep networks perform worse than shallow networks on the training set, illustrating an **optimization failure** rather than overfitting.

> [!Tip]
> **Vanishing gradients freeze early feature extraction**: when early layer gradients decay to machine zero, the network cannot learn hierarchical representations, reducing a deep model to a shallow classifier trained on static random weights.

## The Exploding Gradient Pathology

### Spectral Growth in Deep and Recurrent Graphs

- When the spectral norm of weight matrices exceeds unity ($\|W^{[l]}\|_2 > 1.0$), small backpropagated error signals are amplified at each layer.
- In **Recurrent Neural Networks (RNNs)**, the identical transition weight matrix $W_{\text{rec}}$ is multiplied across $T$ temporal sequence steps:
  $$\frac{\partial h_T}{\partial h_1} = \prod_{t=2}^T W_{\text{rec}}^T \text{diag}(g'(z_t))$$
- If the largest eigenvalue of $W_{\text{rec}}$ exceeds unity ($|\lambda_{\max}| > 1$), error signals scale as $\lambda^T$, causing gradients to explode over long temporal dependencies.

### Numerical Overflow and NaN Contagion

- Exploding gradients produce parameter update steps ($\Delta \theta = -\eta \nabla_\theta \mathcal{L}$) that exceed the representational bounds of IEEE 754 floating-point formats.
- Evaluating weights that exceed $10^{38}$ in FP32 or $65,504$ in FP16 triggers immediate overflow, returning positive or negative infinity ($\pm \infty$).
- Any subsequent operation involving infinity (such as $\infty - \infty$ or $0 \