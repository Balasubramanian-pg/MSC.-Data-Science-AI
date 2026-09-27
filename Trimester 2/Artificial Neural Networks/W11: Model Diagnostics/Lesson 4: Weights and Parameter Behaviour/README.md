# Migration in progress
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
- **Bi-modal splitting