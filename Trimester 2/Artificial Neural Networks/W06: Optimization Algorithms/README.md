# W06: Optimization Algorithms

## Optimization Algorithms in Deep Neural Networks

Optimization algorithms function as the computational engine that updates neural network parameters by navigating complex, high-dimensional error surfaces. First-order methods rely on backpropagated gradient vectors to update weights, but standard gradient descent struggles with pathological curvature, saddle points, and stochastic noise. Modern deep learning combines momentum-based acceleration, coordinate-wise adaptive learning rates, decoupled weight decay, and scheduled step sizes to achieve fast convergence and robust validation generalization.

## Geometry and Challenges of Neural Loss Surfaces

### Ill-Conditioned Curvature and Hessian Eigenvalues

- The local geometry of a loss surface around parameter configuration $\theta$ is described by the **Hessian matrix** $H \in \mathbb{R}^{P \times P}$, containing all second-order partial derivatives: $H_{ij} = \frac{\partial^2 \mathcal{L}}{\partial \theta_i \partial \theta_j}$.
- The **condition number** $\kappa(H) = \frac{|\lambda_{\max}|}{|\lambda_{\min}|}$ quantifies the disparity in curvature between the steepest and gentlest directions on the loss surface.
- An **ill-conditioned surface** ($\kappa(H) \gg 1$) forms elongated ravines or valleys where the walls are steep but the valley floor slopes gently toward the minimum.
- Standard gradient descent oscillates violently across the steep walls because the gradient aligns almost orthogonally to the direction of the minimum, slowing progress along the base of the ravine.

### Saddle Points, Plateaus, and Negative Curvature

- High-dimensional non-convex error surfaces are dominated by **saddle points** rather than isolated sub-optimal local minima.
- At a saddle point, the gradient vector vanishes ($\nabla_\theta \mathcal{L} = 0$), but the Hessian matrix is **indefinite**, possessing both positive and negative eigenvalues.
- Directions corresponding to positive eigenvalues curve upward, while directions corresponding to negative eigenvalues curve downward.
- First-order gradient descent stalls when approaching saddle points because the gradient norm decays to zero, leaving the parameters trapped on flat plateaus unless momentum or stochastic noise perturbs the trajectory along escape paths.

### Flat Versus Sharp Minima and Generalization

- A **flat minimum** occupies a wide, low-curvature basin where the eigenvalues of the Hessian remain small ($\lambda_{\max}(H) \ll \infty$).
- A **sharp minimum** resides in a narrow, steep ravine characterized by large Hessian eigenvalues and high condition numbers.
- Under distributional shifts between training and test sets, parameter vectors located in sharp minima experience large spikes in test loss because minor coordinate displacements move the model up the steep canyon walls.
- Flat minima provide robust **generalization tolerance**: small parameter perturbations or domain shifts leave the evaluation loss near the basin floor.

> [!Important]
> **Curvature disparity dominates optimization difficulty**: ill-conditioned loss surfaces cause standard gradient descent to oscillate across steep ravines, while high-dimensional saddle points cause optimization to stall on zero-gradient plateaus.

## Stochastic Gradient Descent and Momentum Acceleration

### Mini-Batch SGD Dynamics and Stochastic Noise

- **Mini-Batch Stochastic Gradient Descent (SGD)** approximates the true full-dataset gradient over a randomly sampled subset of $m$ examples:
  $$g_t = \frac{1}{m} \sum_{i=1}^m \nabla_\theta \mathcal{L}_i(\theta_t)$$
  $$\theta_{t+1} = \theta_t - \eta g_t$$
- The variance of the gradient estimate acts as zero-mean **stochastic noise** ($\mathbb{E}[g_t] = \nabla \mathcal{L}_{\text{full}}(\theta_t)$), with noise covariance scaling inversely with batch size: $\text{Cov}(g_t) \propto \frac{1}{m}$.
- Stochastic noise performs implicit exploration across the optimization terrain, helping parameters escape sharp local traps and saddle points to settle into flat, generalizing basins.

### Classical Polyak Momentum and Ravine Dampening

- Introduced by Boris Polyak (1964), the **Momentum** method models the physical behavior of a heavy particle rolling down a potential well.
- The algorithm accumulates an exponentially decaying moving average of past gradients into a **velocity vector** $v_t$:
  $$v_t = \beta v_{t-1} + (1 - \beta) g_t$$
  $$\theta_{t+1} = \theta_t - \eta v_t$$
  where $\beta \in [0.9, 0.99]$ serves as the momentum coefficient.
- In directions with alternating gradient signs (cross-ravine oscillations), consecutive updates cancel out, dampening destructive oscillations.
- In directions with consistent gradient signs (along the ravine floor), momentum terms compound constructively, accelerating convergence along flat valleys by an effective factor of $\frac{1}{1 - \beta}$.

### Nesterov Accelerated Gradient (NAG) Lookahead

- Classical momentum calculates the local gradient at the current position $\theta_t$ before applying the accumulated velocity vector.
- **Nesterov Accelerated Gradient (NAG)** computes a lookahead gradient at the projected parameter location ($\theta_t - \eta \beta v_{t-1}$):
  $$g_t = \nabla_\theta \mathcal{L}(\theta_t - \eta \beta v_{t-1})$$
  $$v_t = \beta v_{t-1} + (1 - \beta) g_t$$
  $$\theta_{t+1} = \theta_t - \eta v_t$$
- Computing the gradient at the anticipated future position acts as an adaptive braking mechanism: if the velocity vector points toward an ascending slope, the lookahead gradient points in the opposite direction, slowing down updates before the optimizer overshoots the minimum.

> [!Tip]
> **Momentum accelerates flat descent and dampens oscillations**: accumulating past gradient vectors allows momentum to cancel out cross-valley oscillations while building speed along the base of narrow ravines.

## Adaptive Learning Rate Algorithms

### AdaGrad and the Monotonic Decay Bottleneck

- Proposed by John Duchi et al. (2011), **AdaGrad (Adaptive Gradient Algorithm)** scales the learning rate per parameter based on historical gradient magnitudes:
  $$G_t = G_{t-1} + g_t \odot g_t$$
  $$\theta_{t+1} = \theta_t - \frac{\eta}{\sqrt{G_t} + \epsilon} \odot g_t$$
  where $\odot$ is element-wise multiplication, and $\epsilon \approx 10^{-8}$ prevents division by zero.
- Frequently updated parameters with large historical gradients receive aggressive step-size dampening, while rarely updated parameters receive larger effective steps, making AdaGrad well-suited for sparse data.
- Because $G_t$ accumulates squared gradients monotonically ($G_t \ge G_{t-1}$), the effective learning rate decays continuously toward zero, causing training to stall prematurely before reaching a minimum.

### RMSprop and Exponential Moving Averages

- Developed by Geoffrey Hinton, **RMSprop** resolves AdaGrad's premature stoppage by replacing the unbounded cumulative sum with an **exponentially decaying average** of squared gradients:
  $$s_t = \beta s_{t-1} + (1 - \beta) g_t \odot g_t$$
  $$\theta_{t+1} = \theta_t - \frac{\eta}{\sqrt{s_t} + \epsilon} \odot g_t$$
  where $\beta$ is typically set to $0.9$.
- RMSprop restricts its historical memory to an effective window of the most recent $\frac{1}{1 - \beta}$ steps.
- Scaling updates by the root mean square of recent gradients normalizes step sizes across non-uniform curvature, allowing the optimizer to traverse flat plateaus and steep cliffs with stable update magnitudes.

### Adam: Integrating First and Second Moments

- Proposed by Diederik Kingma and Jimmy Ba (2014), **Adam (Adaptive Moment Estimation)** combines the principles of momentum (first moment) and RMSprop (second moment):
  $$m_t = \beta_1 m_{t-1} + (1 - \beta_1) g_t \quad \text{(First Moment: Mean)}$$
  $$v_t = \beta_2 v_{t-1} + (1 - \beta_2) g_t \odot g_t \quad \text{(Second Moment: Variance)}$$
  standard default hyperparameters are $\beta_1 = 0.9$ and $\beta_2 = 0.999$.
- Because vectors $m_t$ and $v_t$ are initialized to zero, they are biased toward zero during early iterations, especially when decay rates $\beta_1$ and $\beta_2$ approach unity.
- Adam corrects for this initialization bias using step-dependent **bias correction** terms:
  $$\hat{m}_t = \frac{m_t}{1 - \beta_1^t}, \quad \hat{v}_t = \frac{v_t}{1 - \beta_2^t}$$
- The final parameter update rule combines the bias-corrected moments:
  $$\theta_{t+1} = \theta_t - \frac{\eta}{\sqrt{\hat{v}_t} + \epsilon} \odot \hat{m}_t$$

### AdamW and the Decoupled Weight Decay Resolution

- In standard SGD, $L_2$ regularization ($\frac{1}{2} \lambda \|\theta\|_2^2$) and direct **weight decay** ($\theta \leftarrow (1 - \eta \lambda)\theta$) produce identical parameter updates.
- In adaptive optimizers like Adam, traditional implementations add the regularizer gradient $\lambda \theta$ directly to the objective gradient: $g_t \leftarrow \nabla \mathcal{L}(\theta_t) + \lambda \theta_t$.
- This inclusion routes the regularizer through the second-moment accumulator $v_t$:
  $$\Delta \theta \propto \frac{g_t + \lambda \theta_t}{\sqrt{v_t} + \epsilon}$$
- Consequently, parameters with large historical gradients experience *less* weight decay than parameters with small historical gradients, distorting regularization.
- Ilya Loshchilov and Frank Hutter (2017) resolved this pathology in **AdamW** by decoupling weight decay from the gradient moments entirely:
  $$\theta_{t+1} = \theta_t - \eta_t \lambda \theta_t - \frac{\eta_t}{\sqrt{\hat{v}_t} + \epsilon} \odot \hat{m}_t$$
- Decoupled weight decay restores proportional parameter shrinkage across all layers, improving generalization in Transformers and deep residual networks.

### AMSGrad and Non-Increasing Step Guarantees

- Standard Adam can fail to converge on simple convex optimization problems when past gradients exhibit high variance, because the second-moment estimate $v_t$ can fluctuate unpredictably.
- Proposed by Sashank Reddi et al. (2018), **AMSGrad** enforces a monotonic non-decreasing second-moment accumulator by tracking maximum historical variance:
  $$\hat{v}_t^{\max} = \max(\hat{v}_{t-1}^{\max}, \; v_t)$$
  $$\theta_{t+1} = \theta_t - \frac{\eta}{\sqrt{\hat{v}_t^{\max}} + \epsilon} \odot m_t$$
- Preserving $\hat{v}_t^{\max} \ge \hat{v}_{t-1}^{\max}$ guarantees that the effective learning rate never increases unexpectedly, providing formal convergence proofs for adaptive optimization.

> [!Important]
> **AdamW decouples weight decay from adaptive scaling**: separating the regularization step from gradient moment accumulation ensures uniform parameter shrinkage, preventing weights with large gradients from escaping regularization.

## Second-Order Optimization and Computational Limits

### Newton's Method and Curvature Scaling

- Classical second-order optimization uses a second-order Taylor expansion to approximate the loss surface locally:
  $$\mathcal{L}(\theta + \Delta \theta) \approx \mathcal{L}(\theta) + \nabla \mathcal{L}(\theta)^T \Delta \theta + \frac{1}{2} \Delta \theta^T H \Delta \theta$$
- Minimizing this quadratic model with respect to $\Delta \theta$ yields **Newton's update rule**:
  $$\theta_{t+1} = \theta_t - H^{-1} \nabla_\theta \mathcal{L}(\theta_t)$$
- Newton's method rescales parameter steps by the inverse Hessian, automatically handling ill-conditioned curvature and leaping directly to the minimum of a pure quadratic bowl in a single step.

### The Computational Intractability of the Hessian

- For modern neural networks containing $P \approx 10^7$ to $10^{11}$ parameters, computing and storing the explicit Hessian matrix requires $O(P^2)$ memory:
  $$\text{Memory for } 10^8 \text{ parameters} \approx (10^8)^2 \times 4 \text{ bytes} \approx 4 \times 10^{16} \text{ bytes} = 40,000 \text{ Terabytes}$$
- Inverting an explicit Hessian requires $O(P^3)$ floating-point operations per step, making exact second-order optimization computationally impossible for deep architectures.
- Newton's method is attracted to **saddle points** and local maxima when the Hessian is not positive definite, requiring complex damping or trust-region modifications.

### Quasi-Newton Methods: BFGS and L-BFGS

- **Quasi-Newton methods** avoid explicit Hessian calculation by iteratively constructing low-rank approximations of the inverse Hessian ($B \approx H^{-1}$) using differences between successive gradient vectors.
- The **Broyden-Fletcher-Goldfarb-Shanno (BFGS)** algorithm updates the inverse Hessian approximation with rank-2 updates, scaling memory as $O(P^2)$.
- **Limited-Memory BFGS (L-BFGS)** stores only the $k$ most recent parameter displacements ($\Delta \theta$) and gradient differences ($\Delta g$), reducing memory consumption to $O(kP)$ where $k \in [5, 20]$.
- While L-BFGS is effective for small full-batch convex problems, it performs poorly under mini-batch stochastic gradient noise, making first-order adaptive methods the standard for deep learning workloads.

> [!Tip]
> **Exact second-order methods are computationally prohibitive**: while Newton's method handles curvature directly, its $O(P^2)$ memory and $O(P^3)$ compute costs require deep learning to rely on first-order approximations like AdamW.

## Learning Rate Scheduling and Trajectory Control

### Learning Rate Warmup Mechanics

- Randomly initialized weight vectors produce erratic, large-magnitude gradient estimates during early training iterations.
- Applying a large initial learning rate can displace parameters onto steep, unrecoverable loss cliffs, destroying initial representation structures.
- **Linear Learning Rate Warmup** linearly ramps the learning rate from near zero to its peak base value $\eta_{\max}$ over the first $T_{\text{warmup}}$ steps:
  $$\eta_t = \eta_{\max} \cdot \frac{t}{T_{\text{warmup}}} \quad \forall t \le T_{\text{warmup}}$$
- Warmup stabilizes early training by allowing backpropagated gradients to normalize before the optimizer executes large parameter updates.

### Cosine Annealing and Warm Restarts

- Introduced by Ilya Loshchilov and Frank Hutter (2016), **Cosine Annealing** decays the learning rate following a half-cosine curve:
  $$\eta_t = \eta_{\min} + \frac{1}{2}(\eta_{\max} - \eta_{\min}) \left( 1 + \cos\left(\frac{t}{T_{\max}} \pi\right) \right)$$
  where $\eta_{\min}$ is the minimum floor, and $T_{\max}$ is the total epoch budget.
- The schedule transitions smoothly: it decreases slowly near $\eta_{\max}$, accelerates descent through the middle phase, and flattens out near $\eta_{\min}$ for fine convergence.
- **Cosine Annealing with Warm Restarts (SGDR)** periodically resets the learning rate to $\eta_{\max}$ after fixed cycle periods, giving the optimizer enough energy to escape local minima and explore alternative basins.

### Cyclical Learning Rates and the One-Cycle Policy

- Formulated by Leslie Smith (2017), **Cyclical Learning Rates (CLR)** oscillate the step size between a minimum bound $\eta_{\min}$ and a maximum bound $\eta_{\max}$ across training epochs.
- The **1cycle policy** completes a single cycle: it ramps the learning rate up to a high peak while decreasing momentum, then decreases the learning rate to near zero while increasing momentum.
- High peak learning rates act as an **implicit regularizer**, preventing the model from settling into sharp minima and speeding up convergence over short training budgets.

> [!Tip]
> **Learning rate warmup prevents early divergence**: ramping up step sizes over initial epochs protects randomly initialized layers, while cosine decay allows parameters to settle smoothly into deep basins.

## Comparative Matrix of Neural Optimization Algorithms

| Optimizer | Mathematical Update Rule | First Moment (Direction) | Second Moment (Scale) | Auxiliary Memory State | Primary Advantage / Targeted Failure |
|---|---|---|---|---|---|
| **SGD** | $\theta_{t+1} = \theta_t - \eta g_t$ | None (uses raw gradient $g_t$) | None | $0$ auxiliary parameters | Minimal memory footprint; oscillates in narrow ill-conditioned ravines |
| **Momentum** | $v_t = \beta v_{t-1} + (1-\beta) g_t$ <br> $\theta_{t+1} = \theta_t - \eta v_t$ | Exponential moving average | None | $1P$ (stores velocity vector $v$) | Dampens cross-ravine oscillations; accelerates descent on flat floors |
| **NAG** | $g_t = \nabla \mathcal{L}(\theta_t - \eta \beta v_{t-1})$ <br> $\theta_{t+1} = \theta_t - \eta v_t$ | Lookahead momentum | None | $1P$ (stores velocity vector $v$) | Adds predictive braking before ascending slopes; sensitive to noise |
| **AdaGrad** | $\theta_{t+1} = \theta_t - \frac{\eta}{\sqrt{G_t} + \epsilon} \odot g_t$ | None | Monotonic sum: $\sum g_i^2$ | $1P$ (stores squared sum $G$) | Scales sparse features well; learning rate decays to zero prematurely |
| **RMSprop** | $\theta_{t+1} = \theta_t - \frac{\eta}{\sqrt{s_t} + \epsilon} \odot g_t$ | None | Exponential average: $s_t$ | $1P$ (stores moving average $s$) | Resolves premature learning rate decay; lacks directional velocity |
| **Adam** | $\theta_{t+1} = \theta_t - \frac{\eta}{\sqrt{\hat{v}_t} + \epsilon} \odot \hat{m}_t$ | Bias-corrected average: $\hat{m}_t$ | Bias-corrected average: $\hat{v}_t$ | $2P$ (stores moment vectors $m, v$) | Fast initial convergence; traditional L2 regularization causes issues |
| **AdamW** | $\theta_{t+1} = (1 - \eta\lambda)\theta_t - \frac{\eta}{\sqrt{\hat{v}_t} + \epsilon} \odot \hat{m}_t$ | Bias-corrected average: $\hat{m}_t$ | Bias-corrected average: $\hat{v}_t$ | $2P$ (stores moment vectors $m, v$) | Decouples weight decay; standard choice for Transformers and deep ResNets |
| **AMSGrad** | $\theta_{t+1} = \theta_t - \frac{\eta}{\sqrt{\hat{v}_t^{\max}} + \epsilon} \odot m_t$ | Exponential average: $m_t$ | Maximum historical variance | $2P$ (stores vectors $m, v^{\max}$) | Guarantees non-increasing step sizes; eliminates divergence traps in Adam |

> [!Important]
> **AdamW is the baseline for deep architectures**: decoupling weight decay from adaptive coordinate scaling delivers the fast initial convergence of Adam alongside the generalization benefits of true parameter shrinkage.

## Key Takeaways

- **Ill-conditioned curvature** creates steep ravines with high condition numbers ($\kappa(H) \gg 1$), causing standard gradient descent to oscillate across walls while making slow forward progress.
- **Saddle points dominate high-dimensional loss surfaces**; optimization algorithms require momentum or stochastic gradient noise to traverse zero-gradient plateaus along negative curvature directions.
- **Polyak momentum** accumulates velocity over past gradients, canceling out cross-valley oscillations and accelerating descent along the base of narrow ravines.
- **Nesterov Accelerated Gradient (NAG)** evaluates gradients at projected lookahead coordinates, providing an adaptive braking mechanism on descending slopes.
- **AdaGrad scales step sizes inversely** with cumulative historical gradient norms, but suffers from premature stoppage as the learning rate decays monotonically toward zero.
- **RMSprop and Adam** use exponential moving averages of squared gradients to preserve adaptive scaling over recent training steps without decaying to zero.
- **AdamW decouples weight decay from gradient updates**, preventing adaptive coordinate scaling from distorting parameter shrinkage and improving generalization.
- **Second-order Newton methods are computationally intractable** for deep networks due to $O(P^2)$ memory and $O(P^3)$ compute costs, making first-order adaptive methods the standard.
- **Learning rate schedules govern convergence**: linear warmup protects randomly initialized weights during early training, while cosine annealing allows smooth convergence into flat minima.

> [!Tip]
> The foundational principle of deep optimization: **velocity dampens curvature, while adaptive scaling handles non-uniformity**; combining momentum-based directional velocity with decoupled coordinate-wise variance normalization and scheduled step sizes allows optimizers to navigate complex, non-convex loss surfaces efficiently.
