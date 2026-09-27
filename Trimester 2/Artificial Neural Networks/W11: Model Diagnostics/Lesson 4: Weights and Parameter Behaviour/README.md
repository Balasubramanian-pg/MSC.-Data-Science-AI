# Lesson 4: Weights and Parameter Behaviour

Parameter diagnostics examine the trajectories, magnitude distributions, and spectral properties of neural network weight tensors throughout the optimization lifecycle. While gradient flow reflects instantaneous backward forces, parameter behavior reveals the cumulative geometric changes that define learned representations. Monitoring weight norm evolution, spectral degradation, update-to-weight ratios, and regularization interactions allows practitioners to isolate structural pathologies such as parameter explosion, representation freezing, and scale-invariance decay.

## Mathematical Foundations of Parameter Dynamics

### Parameter Trajectories in High-Dimensional Space

- Neural network training updates parameter tensors $\theta \in \mathbb{R}^P$ across high-dimensional non-convex loss surfaces via first-order optimization rules:
  $$\theta_{t+1} = \theta_t - \Delta \theta_t$$
  where $\Delta \theta_t$ incorporates learning rates, gradient moments, and regularization steps.
- The **distance from initialization** measures the cumulative Euclidean displacement of layer weights relative to their random initialization state $W_0^{[l]}$:
  $$\Delta_{\text{init}}^{[l]} = \frac{\|W_t^{[l]} - W_0^{[l]}\|_F}{\|W_0^{[l]}\|_F}$$
  where $\|W\|_F = \sqrt{\sum_{i,j} W_{i,j}^2}$ denotes the Frobenius matrix norm.
- In healthy deep networks, early feature-extraction layers undergo moderate displacement ($0.5 \le \Delta_{\text{init}} \le 2.0$), while terminal classification layers exhibit higher displacement ($3.0 \le \Delta_{\text{init}} \le 10.0$).
- Displacements approaching zero ($\Delta_{\text{init}} \approx 0$) confirm that a layer remains frozen in its initial random configuration, failing to contribute learned features to the forward pipeline.

### Spectral Properties and Lipschitz Bounds

- The expressiveness and sensitivity of a linear transformation depend on the singular value spectrum of weight matrix $W^{[l]} \in \mathbb{R}^{n^{[l]} \times n^{[l-1]}}$.
- Via Singular Value Decomposition (SVD), the weight matrix decomposes into orthogonal bases and singular values:
  $$W^{[l]} = U \Sigma V^T, \quad \Sigma = \text{diag}(\sigma_1, \sigma_2, \dots, \sigma_r)$$
  where $\sigma_1 \ge \sigma_2 \ge \dots \ge \sigma_r \ge 0$.
- The **spectral norm** corresponds to the largest singular value ($\|W^{[l]}\|_2 = \sigma_{\max}$), defining the maximum amplification factor that the matrix applies to any incoming vector.
- The **stable rank** ($\text{srank}$) evaluates parameter redundancy and effective matrix dimensionality without threshold-dependent rank truncations:
  $$\text{srank}\left(W^{[l]}\right) = \frac{\|W^{[l]}\|_F^2}{\|W^{[l]}\|_2^2} = \frac{\sum_{i=1}^r \sigma_i^2}{\sigma_1^2}$$
- Low stable rank relative to matrix dimensions indicates that parameter updates have collapsed into a narrow linear subspace, leaving surplus weights redundant.

> [!Important]
> **Spectral norm growth inflates sensitivity**: unconstrained increases in weight spectral norms exponentially scale the network Lipschitz bound, making output representations fragile under minute input perturbations.

## Taxonomy of Parameter Pathologies

### Weight Explosion and Unbounded Growth

- Weight explosion occurs when parameter norms $\|W^{[l]}\|_F$ increase continuously across epochs without reaching an asymptotic equilibrium.
- Large parameter values sharpen the loss surface, compressing flat minima basins into steep ravines and amplifying sensitivity to input noise.
- Excessive weight scales force pre-activations into the asymptotic saturation regimes of non-linear activations, producing widespread gradient vanishing in adjacent backward passes.
- Primary causes include absence of weight decay, uncalibrated learning rates, and runaway scaling in layers preceding unconstrained normalization units.

### Weight Stagnation and Representation Freezing

- Weight stagnation occurs when parameter tensors fail to move significantly from their initial random states throughout training.
- Parameter distributions remain centered near their initialization variances with near-zero displacement ($\Delta_{\text{init}}^{[l]} \ll 10^{-2}$).
- This pathology emerges when layer-wise gradients vanish, learning rates are set excessively low, or $L_2$ regularization penalties overpower small empirical data gradients.
- When early layers stagnate, downstream layers receive fixed, pseudo-random projections, severely restricting the network to shallow linear combinations.

### Scale Invariance and Effective Learning Rate Decay

- When a linear layer is followed directly by Batch Normalization (BatchNorm), scaling the weight tensor by an arbitrary positive scalar $c > 0$ does not change the forward activations:
  $$\text{BN}(c W x) = \text{BN}(W x)$$
- While forward outputs remain invariant to weight scale, backpropagated gradients scale inversely with $c$:
  $$\nabla_{c W} \mathcal{L} = \frac{1}{c} \nabla_W \mathcal{L}$$
- As weight norms $\|W\|_F$ drift upward in the absence of explicit regularization, the gradient magnitude shrinks, causing the **effective learning rate** $\alpha_{\text{eff}}$ to decay toward zero:
  $$\alpha_{\text{eff}} = \frac{\alpha}{\|W\|_F^2}$$
- The network experiences artificial optimization slowdowns even when the scheduled nominal learning rate $\alpha$ remains high.

> [!Tip]
> **Decouple weight norms under normalization**: apply explicit weight decay to parameters in layers followed by Batch Normalization to prevent unchecked norm growth from driving effective learning rates to zero.

## Telemetry Metrics and Diagnostic Tracking

### The Update-to-Weight Ratio

- The **update-to-weight ratio** $r^{[l]}$ provides the primary quantitative check for parameter health by comparing optimization step sizes directly against weight norms:
  $$r^{[l]} = \frac{\|\theta_{t+1}^{[l]} - \theta_t^{[l]}\|_2}{\|\theta_t^{[l]}\|_2} = \frac{\|\alpha \cdot \Delta \theta_t^{[l]}\|_2}{\|\theta_t^{[l]}\|_2}$$
- Tracking $r^{[l]}$ on a logarithmic scale reveals structural disparities across layers:
  - **Healthy Target ($10^{-4} \le r^{[l]} \le 10^{-2}$):** Parameters update at roughly $0.1\%$ of their current magnitude per optimization step, allowing stable trajectory adjustments.
  - **Stagnation ($r^{[l]} < 10^{-5}$):** Updates are negligible relative to weight magnitudes; layers require orders of magnitude more steps to adjust representations.
  - **Instability ($r^{[l]} > 10^{-1}$):** Updates equal or exceed parameter magnitudes, overwriting established feature structures and causing optimization thrashing.

### Distributional and Histogram Telemetry

- Plotting weight value histograms over training epochs verifies structural distribution stability.
- Healthy parameter distributions maintain smooth, zero-centered bell curves whose standard deviations contract moderately under weight decay or expand slightly during feature differentiation.
- **Bi-modal splitting** occurs when weights separate into distinct positive and negative clusters, often indicating unconstrained bias accumulation or saturated gating mechanics.
- **Extreme outliers** (weights exceeding $5\sigma$ from the layer mean) indicate localized gradient spikes, which distort feature attribution and destabilize matrix multiplications.

> [!Tip]
> **Layer-wise update alignment**: if early layers display update ratios below $10^{-5}$ while terminal layers display ratios above $10^{-2}$, use layer-wise adaptive learning rates or AdamW to equalize update velocities across network depth.

## Optimizer Dynamics and Parameter Regularization

### Decoupled Weight Decay Versus $L_2$ Regularization

- In standard Stochastic Gradient Descent (SGD), $L_2$ regularization and weight decay execute identically by adding a penalty proportional to parameter magnitude:
  $$\mathcal{L}_{\text{reg}}(\theta) = \mathcal{L}(\theta) + \frac{\lambda}{2} \|\theta\|_2^2 \implies \theta_{t+1} = (1 - \alpha \lambda) \theta_t - \alpha \nabla_\theta \mathcal{L}(\theta_t)$$
- In adaptive optimizers (such as standard Adam), implementing $L_2$ regularization by adding $\lambda \theta$ directly to the gradient vector distorts parameter updates:
  $$g_t = \nabla \mathcal{L}(\theta_t) + \lambda \theta_t, \quad \theta_{t+1} = \theta_t - \frac{\alpha}{\sqrt{\hat{v}_t} + \epsilon} \hat{m}_t$$
- Parameters with historically large gradients accumulate large second-moment estimates $\hat{v}_t$, suppressing the effective penalty factor $\frac{\lambda \theta}{\sqrt{\hat{v}_t}}$, while parameters with tiny gradients receive disproportionately large penalties.
- **Decoupled Weight Decay (AdamW)** resolves this distortion by subtracting the decay term directly from the weight tensor independently of the adaptive gradient steps:
  $$\theta_{t+1} = \theta_t - \alpha \lambda \theta_t - \frac{\alpha}{\sqrt{\hat{v}_t} + \epsilon} \hat{m}_t$$
- AdamW restores uniform parameter regularization across all network coordinates regardless of gradient scales.

### Weight Pruning and Structural Sparsity Diagnostics

- The **Lottery Ticket Hypothesis** demonstrates that dense, randomly initialized feedforward networks contain sparse subnetworks (*winning tickets*) that can match the test accuracy of the original dense network when trained in isolation.
- Evaluating the magnitude distribution of trained weights identifies parameter redundancy: weights with absolute values near zero ($|W_{i,j}| < \epsilon$) contribute minimally to activation variances.
- Tracking the parameter sparsity ratio after applying magnitude-based thresholding measures the structural compressibility of the architecture:
  $$\text{Sparsity} = \frac{1}{P} \sum_{i=1}^P \mathbf{1}\left( |\theta_i| \le \tau \right)$$
- If a network maintains validation performance after pruning $80\%$ of its parameters, the baseline dense model operates with excessive parameter redundancy.

> [!Important]
> **AdamW preserves regularization mechanics**: using standard Adam with $L_2$ penalty penalties penalizes parameters inversely relative to gradient frequency; adopting decoupled weight decay (AdamW) ensures uniform parameter contraction across all layers.

## Comparative Diagnostic Matrix of Parameter Pathologies

| Parameter Pathology | Telemetry Diagnostic Signal | Underlying Mathematical Cause | Impact on Training Progression | Prescribed Remediation |
|---|---|---|---|---|
| **Weight Explosion** | $\|W^{[l]}\|_F \to \infty$; spectral norm $\sigma_{\max} \gg 10^2$ | Zero weight decay; excessive learning rate; absence of normalization | Output logits blow up; activation saturation; numerical overflow | Implement AdamW with weight decay $\lambda \in [10^{-4}, 10^{-2}]$; add LayerNorm |
| **Weight Stagnation** | Displacement $\Delta_{\text{init}}^{[l]} \approx 0$; update ratio $r^{[l]} < 10^{-5}$ | Gradient vanishing upstream; learning rate tuned excessively low | Early layers fail to extract features; network acts as a linear model | Increase learning rate; adopt residual skip connections; lower weight decay |
| **Effective LR Decay** | $\|W^{[l]}\|_F$ grows steadily while effective update step shrinks | Weight scale invariance under BatchNorm without weight decay | Optimization slows to a standstill despite fixed nominal learning rate | Enforce explicit weight decay on weights preceding normalization layers |
| **Parameter Thrashing** | Update ratio $r^{[l]} > 10^{-1}$; high directional variance | Learning rate exceeds loss curvature bounds ($\alpha > \frac{2}{\lambda_{\max}(H)}$) | Weights oscillate violently across loss ravines; loss oscillates or diverges | Reduce learning rate; introduce gradient clipping; increase mini-batch size |
| **Low Stable Rank** | $\text{srank}(W^{[l]}) \ll \min(n_{\text{in}}, n_{\text{out}})$; dominant $\sigma_1$ | Overparameterization collapsed onto low-dimensional subspace | Network exhibits excessive parameter redundancy with low expressiveness | Apply spectral norm regularization; prune redundant weights; reduce layer width |

> [!Tip]
> **Diagnostic review sequence**: inspect parameter update ratios $r^{[l]}$ first, track Frobenius displacement $\Delta_{\text{init}}$ second, and check spectral norms $\sigma_{\max}$ third to isolate weight failures methodically.

## Key Takeaways

- **Parameter metrics evaluate cumulative optimization health**: weight norms and displacements capture long-term structural changes that single-step gradient evaluations miss.
- **Frobenius displacement confirms representation learning**: tracking distance from initialization ensures that early feature extractors actively optimize rather than remaining frozen in random initial states.
- **Spectral norms bound local sensitivity**: tracking the largest singular value $\sigma_{\max}$ of weight matrices controls the global Lipschitz constant, preventing brittle output behaviors.
- **Update-to-weight ratios indicate parameter stability**: maintaining step sizes within $10^{-4} \le r^{[l]} \le 10^{-2}$ guarantees that parameters update without inducing optimization thrashing.
- **Batch Normalization induces effective learning rate decay**: unconstrained weight growth in layers preceding normalization reduces effective gradient steps, requiring explicit weight decay to stabilize convergence.
- **AdamW decouples regularization from gradient history**: applying weight decay directly to parameter tensors prevents adaptive second moments from distorting parameter shrinkage.
- **Stable rank measures structural parameter efficiency**: computing the ratio of Frobenius norm to spectral norm reveals whether weight matrices utilize their full matrix dimensions or collapse into redundant, low-rank subspaces.

> [!Important]
> **Parameter dynamics dictate model reliability**: auditing weight distributions, spectral norms, and update velocities ensures that optimization yields well-conditioned, regularized parameter states capable of generalized feature extraction.
