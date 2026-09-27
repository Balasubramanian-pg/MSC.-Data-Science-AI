# Migration in progress
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
- To