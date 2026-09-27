# Migration in progress
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
- Proposed by Sashank Reddi et al. (2018), **AMSGrad** enforces a monotonic non-decreasing 