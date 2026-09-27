# Lesson 2: Gradient Descent: The Foundation

## Gradient Descent: The Foundational Optimization Engine

Gradient descent represents the primary iterative algorithm for minimizing objective loss functions in neural networks. By calculating partial derivatives across continuous computational graphs, gradient descent repeatedly adjusts parameters in the direction that produces the steepest local decrease in loss. Analyzing its first-order mathematical derivation, the behavioral differences across batch regimes, step-size convergence bounds, and stochastic gradient noise dynamics establishes the baseline for all advanced deep learning optimizers.

## Mathematical Derivation of the Descent Direction

### First-Order Taylor Expansion

- Let $\mathcal{L}(\theta): \mathbb{R}^P \to \mathbb{R}$ represent a continuously differentiable loss function parameterized by vector $\theta \in \mathbb{R}^P$.
- Evaluating an infinitesimal parameter displacement $\Delta \theta$ uses a first-order **Taylor expansion** around the current coordinates:
  $$\mathcal{L}(\theta + \Delta \theta) \approx \mathcal{L}(\theta) + \nabla_\theta \mathcal{L}(\theta)^T \Delta \theta$$
  where $\nabla_\theta \mathcal{L}(\theta) \in \mathbb{R}^P$ is the gradient vector containing all first-order partial derivatives.
- To decrease the loss value ($\mathcal{L}(\theta + \Delta \theta) < \mathcal{L}(\theta)$), the inner product term must evaluate strictly negative:
  $$\nabla_\theta \mathcal{L}(\theta)^T \Delta \theta < 0$$

### The Inner Product Optimization Proof

- To find the unit directional vector $u$ ($\|u\|_2 = 1$) that maximizes the local decrease in loss per unit step size, formulate the constrained minimization problem:
  $$\min_u \nabla_\theta \mathcal{L}(\theta)^T u \quad \text{subject to } \|u\|_2 = 1$$
- By the **Cauchy-Schwarz inequality**, the inner product satisfies:
  $$\nabla_\theta \mathcal{L}(\theta)^T u \ge -\|\nabla_\theta \mathcal{L}(\theta)\|_2 \|u\|_2 = -\|\nabla_\theta \mathcal{L}(\theta)\|_2$$
- The minimum occurs if and only if the vector $u$ is chosen antiparallel (pointing in the exact opposite direction) to the gradient vector:
  $$u^* = -\frac{\nabla_\theta \mathcal{L}(\theta)}{\|\nabla_\theta \mathcal{L}(\theta)\|_2}$$
- The negative gradient vector ($-\nabla_\theta \mathcal{L}(\theta)$) defines the unique direction of **steepest descent** in Euclidean parameter space.

### The Classical Parameter Update Rule

- Scaling the optimal normalized direction by a positive step-size parameter $\eta \in \mathbb{R}^+$ produces the foundational **gradient descent update equation**:
  $$\theta_{t+1} = \theta_t - \eta \nabla_\theta \mathcal{L}(\theta_t)$$
- In component-wise notation, each parameter coordinate updates based on its own partial derivative:
  $$\theta_{j, t+1} = \theta_{j, t} - \eta \frac{\partial \mathcal{L}}{\partial \theta_j}$$
- The parameter $\eta$, known as the **learning rate**, governs the physical distance traversed along the negative gradient vector at each iteration.

> [!Tip]
> **The negative gradient is the steepest path**: the Cauchy-Schwarz inequality proves that stepping in the exact opposite direction of the gradient vector produces the greatest local reduction in loss per unit distance.

## The Three Batch Regimes of Gradient Descent

### Batch Gradient Descent (BGD) Properties

- **Batch Gradient Descent** evaluates the true empirical gradient by averaging losses across all $N$ examples in the entire training dataset:
  $$g_t = \nabla_\theta \mathcal{L}_{\text{full}}(\theta_t) = \frac{1}{N} \sum_{i=1}^N \nabla_\theta \mathcal{L}_i(\theta_t)$$
  $$\theta_{t+1} = \theta_t - \eta g_t$$
- The optimization trajectory is deterministic and smooth, guaranteeing monotonic descent on convex surfaces when paired with an appropriate learning rate.
- BGD scales poorly to modern datasets containing millions of samples because every single parameter update requires $N$ forward and backward passes.
- On non-convex surfaces, BGD lacks a mechanism to escape sharp, suboptimal local minima or saddle points once the gradient norm decays toward zero.

### Stochastic Gradient Descent (SGD) Dynamics

- Pure **Stochastic Gradient Descent** updates parameters using a single randomly selected training instance ($m = 1$) at each step $t$:
  $$g_t = \nabla_\theta \mathcal{L}_i(\theta_t), \quad i \sim \text{Uniform}(1, \dots, N)$$
  $$\theta_{t+1} = \theta_t - \eta g_t$$
- Because individual samples contain idiosyncratic noise and outliers, the computed gradient serves as a high-variance, unbiased estimate of the true full gradient:
  $$\mathbb{E}_{i}[g_t] = \nabla_\theta \mathcal{L}_{\text{full}}(\theta_t)$$
- The optimization path fluctuates erratically, which prevents the parameters from settling smoothly into a minimum, requiring learning rate decay to achieve final convergence.
- Processing one sample at a time fails to leverage the massive parallel compute capabilities of modern GPU matrix-multiplication units.

### Mini-Batch Gradient Descent Mechanics

- **Mini-Batch Gradient Descent** balances computational efficiency and update stability by evaluating gradients over a small subset of $m$ training samples ($m \in [32, 2048]$):
  $$g_t = \frac{1}{m} \sum_{k=1}^m \nabla_\theta \mathcal{L}_{i_k}(\theta_t)$$
  $$\theta_{t+1} = \theta_t - \eta g_t$$
- Grouping samples into contiguous memory blocks allows deep learning frameworks to execute operations as high-throughput matrix-matrix products (GEMM).
- Averaging across $m$ samples reduces gradient variance by a factor of $\frac{1}{m}$ compared to pure SGD, producing stable updates while retaining enough stochastic noise to escape sharp local traps.

> [!Important]
> **Mini-batching balances hardware speed and noise**: mini-batches convert iterative vector updates into parallel GPU matrix multiplications while retaining enough gradient variance to escape sharp local traps.

## Learning Rate Dynamics and Curvature Limits

### The Step Size Spectrum: Underfitting to Divergence

- Selecting the learning rate $\eta$ controls the stability, convergence rate, and final quality of the trained model:
  - **Excessively Small $\eta$:** Parameter updates crawl slowly along the error surface; training consumes prohibitive compute budgets and easily stalls on flat plateaus or high-dimensional saddle points.
  - **Moderately Small $\eta$:** Produces steady, monotonic convergence, but risks settling into the nearest local basin without exploring alternative parameter regions.
  - **Excessively Large $\eta$:** The update step exceeds the trusted radius of the first-order Taylor approximation, causing parameters to overshoot descent valleys, oscillate with increasing amplitude across ravines, and diverge to numerical infinity (`NaN`).

### Lipschitz Smoothness and the Upper Bound on Step Size

- Assume the gradient of the loss function is **$L$-Lipschitz continuous** (meaning the surface is $L$-smooth):
  $$\|\nabla \mathcal{L}(\theta_1) - \nabla \mathcal{L}(\theta_2)\|_2 \le L \|\theta_1 - \theta_2\|_2 \quad \forall \theta_1, \theta_2$$
  where the Lipschitz constant $L = \lambda_{\max}(H)$ corresponds to the maximum eigenvalue of the Hessian matrix.
- By the **Descent Lemma**, the loss following an update step satisfies:
  $$\mathcal{L}(\theta - \eta \nabla \mathcal{L}(\theta)) \le \mathcal{L}(\theta) - \eta \left( 1 - \frac{L\eta}{2} \right) \|\nabla \mathcal{L}(\theta)\|_2^2$$
- To guarantee that each step strictly decreases the loss ($\mathcal{L}(\theta_{t+1}) < \mathcal{L}(\theta_t)$), the scaling bracket must evaluate positive:
  $$1 - \frac{L\eta}{2} > 0 \implies \eta < \frac{2}{L} = \frac{2}{\lambda_{\max}(H)}$$
- The optimal step size maximizing descent progress evaluates to:
  $$\eta^* = \frac{1}{L} = \frac{1}{\lambda_{\max}(H)}$$

### The Curvature Bottleneck in Ill-Conditioned Ravines

- When the loss surface forms an ill-conditioned ravine ($\kappa(H) = \frac{\lambda_{\max}}{\lambda_{\min}} \gg 1$), the scalar learning rate faces conflicting constraints.
- Along the steep axis of maximum curvature ($\lambda_{\max}$), preventing numerical divergence requires bounding the step size:
  $$\eta < \frac{2}{\lambda_{\max}}$$
- Along the gentle axis of minimum curvature ($\lambda_{\min}$), the effective convergence rate is proportional to $\eta \lambda_{\min}$.
- Substituting the stability bound into the gentle axis yields a maximum progress factor per step bounded by:
  $$\text{Progress} \le \frac{2 \lambda_{\min}}{\lambda_{\max}} = \frac{2}{\kappa(H)} \ll 1$$
- On ill-conditioned surfaces, gradient descent is forced to take tiny steps to maintain stability across the steep walls, causing progress along the valley floor toward the minimum to stall.

> [!Important]
> **Curvature bounds the maximum learning rate**: in an $L$-smooth loss surface, setting $\eta \ge \frac{2}{\lambda_{\max}}$ causes updates to diverge; in narrow ravines, this stability ceiling restricts progress along the valley floor to a crawl.

## Stochastic Gradient Noise and Generalization

### The Noise Covariance Formulation

- Decompose the mini-batch gradient estimate into the true full-batch gradient plus an error noise vector $\xi_t$:
  $$g_t = \nabla \mathcal{L}_{\text{full}}(\theta_t) + \xi_t$$
  where $\mathbb{E}[\xi_t] = 0$.
- The **covariance matrix** of this stochastic gradient noise evaluates as:
  $$\Sigma(\theta) = \text{Cov}(\xi_t) = \mathbb{E}[\xi_t \xi_t^T] = \frac{1}{m} \left[ \frac{1}{N} \sum_{i=1}^N \nabla \mathcal{L}_i(\theta) \nabla \mathcal{L}_i(\theta)^T - \nabla \mathcal{L}_{\text{full}}(\theta) \nabla \mathcal{L}_{\text{full}}(\theta)^T \right]$$
- The noise covariance scales inversely with the mini-batch size $m$: smaller batches produce larger noise covariance, whereas full-batch descent drives noise covariance to zero.

### Noise as Langevin Exploration

- Parameter dynamics under stochastic mini-batch noise approximate continuous **Stochastic Gradient Langevin Dynamics (SGLD)**:
  $$\Delta \theta_t \approx -\eta \nabla \mathcal{L}_{\text{full}}(\theta_t) + \sqrt{\frac{\eta^2}{m} \Sigma(\theta_t)} \mathcal{N}(0, I)$$
- The ratio of learning rate to batch size defines an effective **diffusion temperature**:
  $$T_{\text{eff}} \approx \frac{\eta}{2m}$$
- This thermal noise acts as an implicit regularizer: parameters bounce out of narrow, sharp local minima that possess small basins of attraction, allowing the trajectory to settle into broad, flat basins.
- Training with small or moderate mini-batches ($m \le 256$) frequently yields lower validation generalization error than full-batch gradient descent.

### The Linear Scaling Rule for Large Batches

- When distributed across multiple GPU nodes, practitioners scale the mini-batch size by a factor $k$ ($m' = k \cdot m$) to keep tensor cores saturated.
- Increasing the batch size by $k$ reduces noise variance by a factor of $k$, dampening the exploratory behavior of the optimizer.
- To preserve the magnitude of parameter displacement per epoch, the **Linear Scaling Rule** scales the base learning rate by the same factor $k$:
  $$\eta' = k \cdot \eta$$
- Scaling $\eta$ linearly with batch size maintains a constant ratio $\frac{\eta}{m}$, preserving the effective diffusion temperature and optimization trajectory.
- When scaling to massive batch sizes ($m > 8192$), linear scaling can break down due to curvature limits, requiring a **gradual warmup schedule** to prevent early optimization divergence.

> [!Tip]
> **The ratio of learning rate to batch size controls exploration**: the effective noise temperature scales with $\frac{\eta}{m}$, meaning scaling the batch size requires a proportional increase in learning rate to preserve generalization.

## Comparative Analysis of Gradient Descent Regimes

| Characteristic | Batch Gradient Descent (BGD) | Stochastic Gradient Descent (Pure SGD) | Mini-Batch Gradient Descent |
|---|---|---|---|
| **Batch Size ($m$)** | $m = N$ (Entire dataset) | $m = 1$ (Single sample) | $m \in [32, 2048]$ (Typical subset) |
| **Compute Complexity per Update** | $O(N \cdot P)$ | $O(1 \cdot P)$ | $O(m \cdot P)$ |
| **Memory Consumption** | Maximum ($O(N)$ activations cached) | Minimum ($O(1)$ activation state) | Moderate ($O(m)$ activation state) |
| **Trajectory Across Loss Surface** | Deterministic, smooth, monotonic | Erratic, noisy, high-variance oscillation | Smooth path with controlled local noise |
| **GPU Tensor Core Utilization** | Moderate to High (limited by RAM) | Minimal (memory bandwidth bound) | Optimal (maximizes matrix GEMM pipelines) |
| **Ability to Escape Sharp Minima** | Poor (zero stochastic perturbation) | High (extreme stochastic perturbation) | Tunable (controlled by ratio $\frac{\eta}{m}$) |
| **Stopping Condition Criterion** | $\|\nabla \mathcal{L}\| \to 0$ or validation plateau | Requires learning rate decay schedule | Early stopping on validation metric |

> [!Tip]
> **Mini-batch descent is the deep learning baseline**: processing small subsets balances parallel tensor hardware utilization with enough stochastic variance to escape sharp, non-generalizing local minima.

## Key Takeaways

- **The negative gradient vector** defines the direction of steepest descent, providing the optimal local direction to reduce loss per unit step size.
- **Batch Gradient Descent** evaluates all $N$ samples per step, yielding deterministic descent paths that become computationally intractable on massive datasets.
- **Pure Stochastic Gradient Descent** evaluates one sample per update, introducing high gradient variance that prevents exact convergence without step-size decay.
- **Mini-Batch Gradient Descent** provides the practical standard for deep learning, leveraging parallel GPU matrix operations while maintaining exploratory stochastic noise.
- **The maximum stable learning rate** is bounded by surface curvature ($\eta < \frac{2}{\lambda_{\max}(H)}$); exceeding this threshold triggers explosive numerical divergence.
- **Ill-conditioned ravines restrict convergence speed**: the optimizer must use small step sizes to avoid oscillating across steep walls, slowing progress along the valley floor.
- **Stochastic gradient noise provides implicit regularization**: noise covariance scales inversely with batch size ($\text{Cov} \propto \frac{1}{m}$), helping parameters settle into flat, generalizing minima.
- **The Linear Scaling Rule** preserves optimization dynamics when training across distributed accelerators by scaling the learning rate proportionally with batch size ($\eta' = k\eta$).

> [!Tip]
> The foundational rule of gradient optimization: **curvature dictates the step-size ceiling, while stochastic noise governs generalization**; selecting mini-batch sizes and learning rates that balance hardware parallel compute with exploratory variance allows gradient descent to locate wide, robust parameter basins.
