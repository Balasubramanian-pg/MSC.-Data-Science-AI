# Lesson 5: Stabilising and Understanding Convergence

## Stabilising and Understanding Convergence in Deep Optimization

Achieving stable convergence in deep neural networks requires managing the interaction between non-convex loss surfaces, gradient dynamics, and finite-precision hardware. Training failure often manifests as sudden gradient explosions, vanishing updates, loss plateaus, or divergence into sharp, non-generalizing minima. Diagnosing convergence health, smoothing optimization surfaces via normalization, stabilizing mixed-precision execution, and steering parameters toward flat basins ensures dependable training across deep architectures.

## Convergence Criteria and Diagnostic Dynamics

### Defining Convergence in Non-Convex Parameter Space

- In classical convex optimization, convergence occurs when parameters reach the unique global minimum where the gradient evaluates to zero ($\nabla_\theta \mathcal{L}(\theta) = 0$).
- In high-dimensional non-convex deep learning, finding a global minimum is neither guaranteed nor strictly necessary.
- Optimization targets a **first-order stationary point** where the gradient norm falls below an operational threshold:
  $$\|\nabla_\theta \mathcal{L}(\theta)\|_2 \le \epsilon$$
- Because networks are over-parameterized, convergence is evaluated practically by monitoring the empirical rate of loss reduction across consecutive epochs:
  $$\frac{|\mathcal{L}_t - \mathcal{L}_{t-k}|}{\mathcal{L}_{t-k}} < \tau$$
  where $\tau$ is a tolerance threshold and $k$ represents an evaluation interval.

### The Generalization Gap and Overfitting Signatures

- Tracking convergence requires monitoring both **training loss** and **validation loss** simultaneously across training iterations.
- The **generalization gap** measures the performance disparity between empirical training error and validation error:
  $$\Delta_{\text{gen}} = \mathcal{L}_{\text{val}}(\theta) - \mathcal{L}_{\text{train}}(\theta)$$
- **Healthy Convergence:** Both training loss and validation loss decrease smoothly, with the generalization gap remaining bounded and stable.
- **Overfitting Divergence:** Training loss continues to decline toward zero while validation loss halts improvement and begins ascending, signaling that the optimizer is memorizing sample-specific noise.
- **Optimization Stagnation:** Both training and validation losses flatline early at high values, indicating that gradients have vanished or the parameters are trapped on a high-loss plateau.

### Early Stopping as Dynamic Regularization

- **Early stopping** halts training when performance on an independent validation set stops improving, treating training duration as a regularization hyperparameter.
- An evaluation metric (validation loss or accuracy) is monitored across a predefined **patience window** of $k$ epochs.
- If the validation metric fails to achieve an improvement of at least $\delta$ over the best historical record within $k$ epochs, optimization terminates:
  $$\text{Condition: } \mathcal{L}_{\text{val}}(t) > \min_{i < t} \mathcal{L}_{\text{val}}(i) - \delta \quad \forall t \in [t_{\text{best}} + 1, \; t_{\text{best}} + k]$$
- Early stopping preserves the model checkpoint from epoch $t_{\text{best}}$, preventing the optimizer from descending into overfitted parameter regions.

> [!Tip]
> **Early stopping prevents over-optimization**: monitoring validation loss across a patience window limits parameter exploration to generalizing regions, terminating execution before training noise causes overfitting.

## Loss Surface Smoothing and Normalization Layers

### The Lipschitz Smoothing Mechanism of Batch Normalization

- While initially hypothesized to reduce internal covariate shift, research demonstrates that **Batch Normalization (BN)** stabilizes training primarily by **smoothing the loss surface**.
- Batch Normalization rescales pre-activations using mini-batch statistics before applying learnable scale ($\gamma$) and shift ($\beta$) parameters:
  $$\hat{z} = \frac{z - \mu_B}{\sqrt{\sigma_B^2 + \epsilon}}, \quad y = \gamma \hat{z} + \beta$$
- Normalizing activations makes the loss function **$\beta$-Lipschitz smooth**, reducing the effective Lipschitz constant of both the loss and its gradient:
  $$\|\nabla \mathcal{L}(\theta_1) - \nabla \mathcal{L}(\theta_2)\|_2 \le \beta \|\theta_1 - \theta_2\|_2$$
- Smoothing the loss surface suppresses sudden gradient fluctuations, bounds the maximum eigenvalue of the Hessian matrix ($\lambda_{\max}(H)$), and eliminates steep cliffs, allowing optimizers to converge reliably under larger learning rates.

### Layer Normalization for Sequence and Attention Models

- Batch Normalization depends on mini-batch statistics, making it unstable when batch sizes are small ($m < 16$) or when processing variable-length sequences.
- **Layer Normalization (LN)** computes normalization statistics across the channel or hidden feature dimension independently for each individual sample:
  $$\mu_L = \frac{1}{D} \sum_{i=1}^D x_i, \quad \sigma_L^2 = \frac{1}{D} \sum_{i=1}^D (x_i - \mu_L)^2, \quad \hat{x} = \frac{x - \mu_L}{\sqrt{\sigma_L^2 + \epsilon}} \odot \gamma + \beta$$
- Layer Normalization operates identically during training and inference because it does not maintain running population statistics across batches.
- LN serves as the standard normalization layer for Transformers and recurrent architectures, ensuring consistent hidden representation scales across varying sequence positions.

### Spectral Normalization and Lipschitz Bounds

- Introduced by Takeru Miyato et al. (2018), **Spectral Normalization** enforces an explicit Lipschitz constraint directly on network weight matrices.
- The spectral norm of a matrix equals its largest singular value: $\|W\|_2 = \sigma_{\max}(W)$.
- Dividing each weight matrix by its spectral norm bounds the layer's Lipschitz constant to at most one:
  $$W_{\text{SN}} = \frac{W}{\sigma_{\max}(W)}$$
- The largest singular value is calculated efficiently during training using one step of the **power iteration method**:
  $$v \leftarrow \frac{W^T u}{\|W^T u\|_2}, \quad u \leftarrow \frac{W v}{\|W v\|_2}, \quad \sigma_{\max}(W) \approx u^T W v$$
- Bounding every layer to a Lipschitz constant of one guarantees that the composite network cannot amplify input perturbations, preventing gradient explosion in generative adversarial networks and deep classifiers.

> [!Important]
> **Normalization reparameterizes loss geometry**: Batch Normalization and Layer Normalization reduce the condition number of the Hessian matrix, preventing steep curvature cliffs and stabilizing gradient trajectories.

## Gradient Management and Mixed-Precision Stabilization

### Gradient Norm Clipping Thresholds

- Highly non-linear operations can generate sudden gradient surges that destabilize parameter weights in a single step.
- **Gradient Norm Clipping** calculates the global $L_2$ norm across all concatenated network parameters:
  $$\|g_{\text{global}}\|_2 = \sqrt{\sum_{l=1}^L \|\nabla_{W^{[l]}} \mathcal{L}\|_F^2 + \sum_{l=1}^L \|\nabla_{b^{[l]}} \mathcal{L}\|_2^2}$$
- If the global norm exceeds a predefined ceiling threshold $c$, gradients rescale proportionally:
  $$g \leftarrow g \cdot \frac{c}{\max(c, \|g_{\text{global}}\|_2)}$$
- Rescaling preserves the exact **directional angle** of the gradient vector while restricting parameter displacement to a trusted radius, preventing divergence without altering the search direction.

### Loss Spikes and Data Batch Anomalies

- In large-scale training (such as foundation models), loss curves occasionally display sudden, destructive **loss spikes**, jumping by orders of magnitude before returning to baseline or diverging.
- Causes include:
  - **Corrupted Data Instances:** Mislabeled, malformed, or abnormally long sequence samples that generate massive loss gradients.
  - **Outlier Activations:** Intermediate activations in self-attention layers growing excessively large, causing Softmax denominators to overflow.
  - **Unstable Parameter Regimes:** Optimizers briefly traversing narrow, steep ridges in the error surface.
- Mitigations include aggressive gradient clipping ($c \in [0.5, 1.0]$), filtering corrupted data batches, and maintaining running parameter checkpoints to revert corrupted updates automatically.

### Dynamic Loss Scaling in Mixed-Precision Pipelines

- Modern accelerators execute training in **FP16 (Half Precision)** to double compute throughput and halve activation memory requirements.
- The minimum positive normalized value representable in FP16 is approximately $6.1 \times 10^{-5}$; gradient values below this threshold underflow to absolute zero ($0.0$), destroying subtle update signals.
- **Dynamic Loss Scaling** counters gradient underflow by multiplying the forward loss by a large scaling factor $S$ (e.g., $S = 2^{15} = 32768$) prior to backpropagation:
  $$\mathcal{L}_{\text{scaled}} = S \cdot \mathcal{L}$$
- By the chain rule, scaling the loss scales all backpropagated gradients by $S$, shifting small gradient values up into the representable range of FP16.
- Before the optimizer executes parameter updates, gradients are unscaled by dividing by $S$:
  $$g_{\text{unscaled}} = \frac{1}{S} g_{\text{scaled}}$$
- If the system detects `Inf` or `NaN` in the unscaled gradients (indicating overflow), the optimizer skips the parameter update entirely and decreases $S$ (e.g., $S \leftarrow S / 2$); if updates remain stable for a fixed window (e.g., 2000 steps), $S$ increases ($S \leftarrow 2S$).

> [!Tip]
> **Dynamic loss scaling preserves half-precision gradients**: multiplying the loss by factor $S$ shifts small gradient signals above the FP16 underflow threshold, while automatic overflow checks keep values bounded.

## Curvature Geometry: Flat Minima and Advanced Solvers

### Hessian Curvature and Basin Flatness

- The curvature around a local minimum $\theta^*$ is characterized by the spectrum of eigenvalues of the Hessian matrix $H$:
  $$\lambda_1 \ge \lambda_2 \ge \dots \ge \lambda_P \ge 0$$
- The **sharpness** of a basin is quantified by the largest eigenvalue $\lambda_{\max}(H)$ (spectral norm) or the trace of the Hessian ($\text{Tr}(H) = \sum \lambda_i$), which measures the average curvature across all dimensions.
- **Flat Minima:** Characterized by small $\lambda_{\max}$ and low trace values. The loss surface curves gently, meaning parameter variations do not cause large spikes in loss.
- **Sharp Minima:** Characterized by large $\lambda_{\max}$ values. The loss rises steeply away from the minimum, making the model sensitive to distributional shifts and causing validation error to degrade.

### Stochastic Weight Averaging (SWA)

- Developed by Pavel Izmailov et al. (2018), **Stochastic Weight Averaging (SWA)** approximates the geometric center of flat loss basins.
- Standard SGD trajectories with constant or cyclical learning rates oscillate around the perimeter of a basin rather than settling into its center.
- SWA averages the parameter weights collected at regular intervals along an exploratory learning rate trajectory:
  $$\theta_{\text{SWA}} = \frac{1}{K} \sum_{i=1}^K \theta_{i \cdot c}$$
  where $c$ is the checkpoint frequency, and $K$ is the number of collected checkpoints.
- The arithmetic average of points on the basin boundary lands deeper inside the flat interior of the basin, yielding lower validation error without incurring additional inference costs.

### Sharpness-Aware Minimization (SAM)

- Formulated by Pierre Foret et al. (2020), **Sharpness-Aware Minimization (SAM)** optimizes simultaneously for low loss and low curvature.
- Standard ERM minimizes loss at a single coordinate: $\min_\theta \mathcal{L}(\theta)$.
- SAM seeks parameters whose entire surrounding neighborhood within a radius $\rho$ maintains low loss, formulating a **min-max optimization problem**:
  $$\min_\theta \max_{\|\epsilon\|_2 \le \rho} \mathcal{L}(\theta + \epsilon)$$
- The internal maximization identifies the worst-case perturbation vector $\hat{\epsilon}$ using a first-order Taylor expansion:
  $$\hat{\epsilon}(\theta) \approx \rho \frac{\nabla_\theta \mathcal{L}(\theta)}{\|\nabla_\theta \mathcal{L}(\theta)\|_2}$$
- The parameter update is then evaluated at this perturbed coordinate:
  $$\theta_{t+1} = \theta_t - \eta \nabla_\theta \mathcal{L}(\theta + \hat{\epsilon}(\theta))$$
- By penalizing parameter regions where a small perturbation $\rho$ causes loss to spike, SAM avoids sharp canyons and guides models toward wide, robust basins.

> [!Important]
> **SAM explicitly optimizes for basin flatness**: evaluating gradients at the worst-case local perturbation $\theta + \hat{\epsilon}$ penalizes high-curvature regions, guiding parameters toward flat minima that generalize well.

## Comparative Matrix of Convergence Stabilization Techniques

| Stabilization Strategy | Targeted Instability | Mathematical Mechanism | Operational Placement | Computational Overhead |
|---|---|---|---|---|
| **Batch Normalization** | Surface roughness; exploding gradients | Standardizes pre-activations: $\frac{z - \mu_B}{\sqrt{\sigma_B^2 + \epsilon}}$ | Between linear layers and non-linearities | Moderate (batch statistics reduction) |
| **Layer Normalization** | Sequence variance; small-batch drift | Normalizes across feature channels: $\frac{x - \mu_L}{\sqrt{\sigma_L^2 + \epsilon}}$ | Pre- or post-block in Transformers | Low (independent per-sample evaluation) |
| **Spectral Normalization** | Gradient explosion; Lipschitz violation | Constrains matrix norm: $W \leftarrow \frac{W}{\sigma_{\max}(W)}$ | Applied to weight matrices at each step | Low (1 power iteration step) |
| **Gradient Norm Clipping** | Gradient spikes; parameter explosion | Global vector rescaling: $g \cdot \min(1, \frac{c}{\|g\|_2})$ | Between backward pass and optimizer update | Minimal ($O(P)$ vector norm reduction) |
| **Dynamic Loss Scaling** | FP16 gradient underflow / overflow | Scales loss by $S$; verifies overflow checks | Wraps forward loss and backward gradients | Negligible (global scalar checks) |
| **Stochastic Weight Avg (SWA)**| Trapping in boundary regions of basins | Averages trajectory checkpoints: $\frac{1}{K}\sum \theta_k$ | Post-training or periodic parameter tracking | Zero runtime cost; minimal memory state |
| **Sharpness-Aware Min (SAM)** | Sharp minima convergence; poor generalization | Min-max perturbation: $\nabla \mathcal{L}(\theta + \hat{\epsilon})$ | Replaces standard optimizer update step | High ($2\times$ forward and backward passes) |

> [!Tip]
> **Combine runtime stabilization with geometric solvers**: pairing normalization layers and dynamic loss scaling with flat-basin optimizers like SWA or SAM ensures stable training and robust validation generalization.

## Key Takeaways

- **Convergence in deep learning is evaluated empirically**: because error surfaces are non-convex, training focuses on reaching first-order stationary points ($\|\nabla \mathcal{L}\| \le \epsilon$) and monitoring validation loss plateaus.
- **The generalization gap signals training health**: diverging validation loss while training loss declines identifies overfitting, requiring early stopping or increased regularization.
- **Normalization layers smooth loss surfaces**: Batch Normalization and Layer Normalization reduce the Lipschitz constant of the loss gradient, bounding Hessian eigenvalues and allowing higher learning rates.
- **Spectral Normalization bounds the Lipschitz constant to unity**, preventing layers from amplifying input perturbations and stabilizing gradient flow.
- **Gradient norm clipping preserves update direction**: rescaling the global gradient vector bounds parameter step sizes while keeping the original descent heading intact.
- **Dynamic loss scaling prevents FP16 underflow**: scaling the loss by a factor $S$ shifts small gradients above floating-point precision limits, while automatic overflow checks catch numerical exceptions.
- **Flat minima generalize better than sharp minima** because broad, low-curvature basins tolerate data distribution shifts between training and evaluation environments.
- **SWA and SAM discover flat minima directly**: SWA averages parameter checkpoints to locate the geometric center of basins, while SAM penalizes local curvature using worst-case perturbations.

> [!Tip]
> The central principle of training stability: **geometric smoothness ensures convergence reliability**; deploying normalization layers to smooth curvature, gradient clipping to eliminate spikes, and sharpness-aware solvers to locate broad basins allows deep networks to converge predictably to high-performing solutions.
