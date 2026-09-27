# Lesson 6: Summary and Assessment
## Optimization Algorithms: Module Summary and Assessment

Mastering neural network optimization requires understanding how gradient vectors, curvature geometry, and adaptive mechanics coordinate to update network parameters. Navigating high-dimensional, non-convex error surfaces demands algorithms that overcome ill-conditioned ravines, bypass saddle points, adapt coordinate-wise step sizes, and locate flat, generalizing basins. Synthesizing first-order descent principles, momentum formulations, adaptive variance scaling, and trajectory schedules prepares engineers to design stable training pipelines across diverse deep architectures.

## Synthesis of Core Week 6 Foundations

### First-Order Trajectories and Momentum Dynamics

- **Steepest descent derivation:** The Cauchy-Schwarz inequality proves that stepping in the negative gradient direction ($-\nabla_\theta \mathcal{L}$) maximizes the local decrease in loss per unit distance.
- **Curvature bounds on step size:** In an $L$-smooth loss surface, setting $\eta \ge \frac{2}{\lambda_{\max}(H)}$ triggers numerical divergence, while ill-conditioned ravines ($\kappa(H) \gg 1$) force standard gradient descent to oscillate across steep walls.
- **Polyak momentum:** Accumulating an exponential moving average of past gradients into a velocity vector ($v_t = \beta v_{t-1} + (1-\beta)g_t$) cancels cross-ravine oscillations and accelerates progress along flat valley floors.
- **Nesterov Accelerated Gradient (NAG):** Evaluating gradients at projected lookahead coordinates ($\theta_t - \eta \beta v_{t-1}$) provides an adaptive braking mechanism before the optimizer overshoots descent basins.

### Coordinate-Wise Adaptive Scaling and Decoupled Decay

- **Diagonal preconditioning:** Adaptive algorithms scale coordinate step sizes inversely with historical gradient magnitudes, normalizing updates across non-uniform curvature and sparse features.
- **AdaGrad's cumulative sum flaw:** Monotonically increasing squared gradient accumulators ($G_t \ge G_{t-1}$) force effective learning rates to decay to near zero prematurely.
- **RMSprop's exponential window:** Replacing cumulative sums with exponential moving averages ($v_t = \beta v_{t-1} + (1-\beta)g_t^2$) restricts historical memory to recent iterations, keeping learning rates active.
- **Adam's unified moments:** Adam tracks both directional velocity (first moment $m_t$) and coordinate variance (second moment $v_t$), employing step-dependent bias corrections ($\frac{1}{1-\beta^t}$) to unbias early zero-initialized states.
- **AdamW's decoupled weight decay:** Separating weight decay from gradient computation prevents adaptive scale denominators from distorting parameter shrinkage, ensuring uniform regularization.

### Step-Size Control and Geometric Stabilization

- **Robbins-Monro conditions:** Stable stochastic convergence requires $\sum \eta_t = \infty$ to ensure sufficient parameter reach, and $\sum \eta_t^2 < \infty$ to eliminate stochastic noise near the minimum.
- **Warmup stabilization:** Gradually increasing the learning rate from zero over early epochs protects randomly initialized weights from destructive updates and allows Adam's second moment to stabilize.
- **Cosine Annealing:** Decaying step sizes along a half-cosine curve ensures smooth transitions, spending productive time in mid-rate exploration before settling into fine convergence.
- **Flat basin discovery:** Flat minima tolerate data distribution shifts; algorithms like **Stochastic Weight Averaging (SWA)** and **Sharpness-Aware Minimization (SAM)** explicitly seek low-curvature basins to improve generalization.

> [!Tip]
> **Coordinated optimization design ensures convergence**: pairing momentum velocity with coordinate-wise variance scaling, decoupled weight decay, and scheduled step sizes allows deep networks to navigate ill-conditioned error surfaces reliably.

## Comprehensive Optimization Diagnostic Matrix

| Optimization Algorithm | Mathematical Update Rule | Primary Directional Mechanism | Coordinate Scaling Method | Auxiliary Parameter Memory | Primary Vulnerability / Failure Mode |
|---|---|---|---|---|---|
| **SGD + Momentum** | $\theta_{t+1} = \theta_t - \eta v_t$ | Exponential moving average of gradients ($v_t$) | None (single global scalar $\eta$) | $1P$ (stores velocity $v$) | Struggles with sparse features; requires manual coordinate tuning |
| **AdaGrad** | $\theta_{t+1} = \theta_t - \frac{\eta}{\sqrt{G_t} + \epsilon} \odot g_t$ | Raw incoming gradient ($g_t$) | Cumulative sum of squares: $\sum g_i^2$ | $1P$ (stores squared sum $G$) | Monotonic learning rate decay halts training prematurely |
| **RMSprop** | $\theta_{t+1} = \theta_t - \frac{\eta}{\sqrt{v_t} + \epsilon} \odot g_t$ | Raw incoming gradient ($g_t$) | Exponential moving average: $v_t$ | $1P$ (stores variance EMA $v$) | Lacks directional momentum; can oscillate in flat valleys |
| **Adam** | $\theta_{t+1} = \theta_t - \frac{\eta}{\sqrt{\hat{v}_t} + \epsilon} \odot \hat{m}_t$ | Bias-corrected velocity: $\hat{m}_t$ | Bias-corrected variance EMA: $\hat{v}_t$ | $2P$ (stores moments $m, v$) | Coupled $L_2$ regularization distorts parameter weight decay |
| **AdamW** | $\theta_{t+1} = (1 - \eta\lambda)\theta_t - \frac{\eta}{\sqrt{\hat{v}_t} + \epsilon} \odot \hat{m}_t$ | Bias-corrected velocity: $\hat{m}_t$ | Bias-corrected variance EMA: $\hat{v}_t$ | $2P$ (stores moments $m, v$) | Higher memory footprint; sensitive to peak learning rate selection |
| **Sharpness-Aware Min (SAM)**| $\theta_{t+1} = \theta_t - \eta \nabla \mathcal{L}(\theta + \hat{\epsilon})$ | Perturbed worst-case gradient | Derived from underlying base solver | $1P$ to $2P$ (depends on base solver) | Doubles computational cost ($2\times$ forward and backward passes) |

> [!Important]
> **Match optimizers to architectural requirements**: deploy SGD with Momentum for vision models requiring strong generalization, use AdamW as the standard baseline for Transformers, and apply SAM when minimizing curvature sharpness is critical.

## Assessment Preparation

### Conceptual Review Questions

- **Question 1 (The Mathematical Breakdown of L2 Regularization in Adam):** Why does adding an $L_2$ penalty directly to the loss function fail to perform true weight decay when using adaptive optimizers like Adam?
  - *Answer:* In standard SGD, minimizing $\mathcal{L}(\theta) + \frac{\lambda}{2}\|\theta\|_2^2$ adds $\lambda \theta$ to the gradient, yielding the update $\theta \leftarrow \theta - \eta g - \eta \lambda \theta$, which decays weights proportionally to their magnitude. In Adam, adding $\lambda \theta$ routes the regularization term through the second-moment accumulator $v_t$, modifying the update to $\Delta \theta \propto \frac{g_t + \lambda \theta_t}{\sqrt{v_t} + \epsilon}$. Parameters with large historical gradients produce large $v_t$ values, scaling down the regularization effect. Weights with small historical gradients receive larger relative weight decay. AdamW resolves this by subtracting $\eta \lambda \theta$ outside the adaptive update, restoring uniform parameter shrinkage.
- **Question 2 (The Curvature Bottleneck in Narrow Valleys):** Given a loss surface where the Hessian eigenvalues are $\lambda_{\max} = 100$ and $\lambda_{\min} = 0.1$, explain why standard gradient descent fails to make rapid progress along the valley floor.
  - *Answer:* The condition number of this surface is $\kappa(H) = \frac{100}{0.1} = 1000$. To prevent numerical divergence along the steep axis of maximum curvature, the learning rate is strictly bounded by $\eta < \frac{2}{\lambda_{\max}} = \frac{2}{100} = 0.02$. Along the gentle axis of minimum curvature, the parameter update per step is proportional to $\eta \lambda_{\min}$. Substituting the maximum stable learning rate yields a maximum progress factor of at most $0.02 \times 0.1 = 0.002$ per step. Progress along the valley floor toward the minimum is constrained to an infinitesimal crawl to keep updates from oscillating out of control across the steep walls.
- **Question 3 (The Role of Bias Correction in Early Adam Iterations):** What happens to Adam's parameter updates during the first few training iterations if the bias correction terms are omitted?
  - *Answer:* Because the moment vectors are initialized at zero ($m_0 = 0, v_0 = 0$), the exponential moving averages are heavily biased toward zero in early steps. For $\beta_1 = 0.9$ and $\beta_2 = 0.999$, at step $t=1$, $m_1 = 0.1 g_1$ and $v_1 = 0.001 g_1^2$. Without bias correction, the effective update evaluates to $\Delta \theta = -\frac{\eta}{\sqrt{0.001 g_1^2} + \epsilon} (0.1 g_1) \approx -\eta \frac{0.1}{\sqrt{0.001}} \text{sgn}(g_1) \approx -3.16 \eta \text{sgn}(g_1)$. The second moment is suppressed much more severely than the first moment ($0.001$ vs $0.1$), causing the denominator to be artificially small. This causes early updates to spike unpredictably, destabilizing initial weights.
- **Question 4 (Mechanism of the 1cycle Policy):** Why does the 1cycle policy decrease momentum while increasing the learning rate during its initial ramp-up phase?
  - *Answer:* The 1cycle policy pairs an aggressive learning rate increase with an inverted momentum schedule. During the ramp-up phase, the learning rate reaches high peak values to explore parameter space and prevent the model from settling into sharp local minima. Keeping momentum high (e.g., $0.95$) during this phase would cause velocity to compound excessively, overshooting valleys and destabilizing training. Lowering momentum (e.g., to $0.85$) while the learning rate peaks allows the optimizer to navigate rapidly using large steps while dampening runaway kinetic energy.

### Applied Analytical Scenarios

- **Scenario A (Loss Spikes and Divergence in Transformer Training):** An engineer trains a 24-layer Transformer using AdamW in FP16 mixed precision with a constant learning rate of $\eta = 10^{-3}$. At iteration 450, the loss spikes from $2.4$ to $89.0$, followed by `NaN` values across all parameters.
  - *Diagnosis:* The absence of a learning rate warmup schedule allowed noisy, high-magnitude early gradients to pass through uncalibrated second-moment accumulators, causing an oversized step that threw parameters onto a steep error cliff. Evaluating in FP16 without dynamic loss scaling allowed small gradients to underflow to zero and large activations to overflow into `Inf`, triggering `NaN` contagion.
  - *Remedy:* Implement a linear learning rate warmup over the first 2,000 steps to allow the second moment to stabilize. Enable dynamic loss scaling to prevent half-precision underflow, apply global gradient norm clipping with a threshold of $c = 1.0$, and transition from a constant learning rate to a cosine annealing decay schedule.
- **Scenario B (Stagnation in an Ill-Conditioned Regression Problem):** A model trained with standard mini-batch SGD on an unnormalized dataset exhibits severe training oscillation: loss values bounce between $15.0$ and $45.0$ without descending, while reducing the learning rate by a factor of 10 causes the loss to flatline at $35.0$.
  - *Diagnosis:* The loss surface is ill-conditioned due to unnormalized input features, creating a high Hessian condition number. When the learning rate is large, updates bounce across the steep walls; when reduced, updates lack the velocity to make meaningful progress along the flat valley floor.
  - *Remedy:* Standardize input features to zero mean and unit variance. Switch the optimizer from standard SGD to AdamW or SGD with Momentum ($\beta = 0.9$) to accumulate directional velocity along the valley floor while dampening cross-wall oscillations.
- **Scenario C (Overfitting in a Deep Convolutional Network):** A ResNet-50 trained with Adam achieves zero training loss, but validation error plateaus at an unacceptable 18%. Inspecting the loss surface curvature reveals a large spectral norm ($\lambda_{\max}(H) = 450$).
  - *Diagnosis:* The model has converged into a sharp minimum. Standard Adam paired with coupled $L_2$ regularization failed to enforce sufficient parameter shrinkage, allowing the model to fit high-frequency training noise that does not generalize under validation distribution shifts.
  - *Remedy:* Transition from standard Adam to AdamW to decouple weight decay and restore true parameter regularization. Alternatively, switch to SGD with Momentum paired with a Cosine Annealing schedule, or apply Sharpness-Aware Minimization (SAM) to penalize curvature sharpness and guide parameters toward a flat basin.

> [!Important]
> **Isolate optimization failure from architectural limitations**: unstable loss spikes point to uncalibrated initial step sizes or half-precision overflow, whereas poor validation generalization from zero training error signals convergence into a sharp minimum.

### Self-Assessment Technical Calculations

#### Problem 1: Stepwise Adam Update Calculation with Bias Correction

A neural network contains a scalar parameter $\theta$ initialized at $\theta_0 = 1.0$. The optimizer is configured with Adam using hyperparameters $\eta = 0.01$, $\beta_1 = 0.9$, $\beta_2 = 0.999$, and $\epsilon = 10^{-8}$. At step $t = 1$, the loss function produces a parameter gradient of $g_1 = 0.5$.

1. Compute the uncorrected first moment $m_1$ and second moment $v_1$.
2. Calculate the bias-corrected moments $\hat{m}_1$ and $\hat{v}_1$.
3. Compute the parameter update displacement $\Delta \theta_1$ and the updated parameter value $\theta_1$.

*Stepwise Solution:*
1. Uncorrected Moment Accumulation:
   - Initial states: $m_0 = 0, v_0 = 0$.
   - Compute first moment:
     $$m_1 = \beta_1 m_0 + (1 - \beta_1) g_1 = 0.9(0) + (1 - 0.9)(0.5) = 0.1(0.5) = \mathbf{0.05}$$
   - Compute second uncentered moment:
     $$v_1 = \beta_2 v_0 + (1 - \beta_2) g_1^2 = 0.999(0) + (1 - 0.999)(0.5)^2 = 0.001(0.25) = \mathbf{0.00025}$$
2. Bias-Corrected Moments Evaluation:
   - Compute corrected first moment:
     $$\hat{m}_1 = \frac{m_1}{1 - \beta_1^1} = \frac{0.05}{1 - 0.9} = \frac{0.05}{0.1} = \mathbf{0.50}$$
   - Compute corrected second moment:
     $$\hat{v}_1 = \frac{v_1}{1 - \beta_2^1} = \frac{0.00025}{1 - 0.999} = \frac{0.00025}{0.001} = \mathbf{0.25}$$
3. Parameter Update Step:
   - Compute the denominator scale:
     $$\sqrt{\hat{v}_1} + \epsilon = \sqrt{0.25} + 10^{-8} = 0.5 + 10^{-8} \approx 0.50$$
   - Compute the parameter displacement:
     $$\Delta \theta_1 = -\frac{\eta}{\sqrt{\hat{v}_1} + \epsilon} \hat{m}_1 = -\frac{0.01}{0.50} (0.50) = \mathbf{-0.01}$$
   - Apply the update:
     $$\theta_1 = \theta_0 + \Delta \theta_1 = 1.0 - 0.01 = \mathbf{0.99}$$
*Conclusion:* On the first step, bias correction scales the uncorrected moments so that the effective update simplifies to $-\eta \cdot \text{sgn}(g_1) = -0.01$, preserving the intended step size.

#### Problem 2: Cosine Annealing Learning Rate Computation

A deep learning model trains over a total budget of $T_{\max} = 10,000$ iterations using a Cosine Annealing schedule preceded by a linear warmup. The schedule parameters are defined as:
- Warmup duration: $T_{\text{warmup}} = 500$ steps
- Peak learning rate: $\eta_{\max} = 0.001$
- Minimum floor learning rate: $\eta_{\min} = 10^{-6}$

Compute the exact learning rate $\eta_t$ at:
1. Iteration $t = 250$ (within the warmup phase).
2. Iteration $t = 5,250$ (within the cosine annealing phase).

*Stepwise Solution:*
1. Step Size at $t = 250$ (Warmup Phase):
   - For $t \le T_{\text{warmup}}$, the learning rate follows linear interpolation from zero to $\eta_{\max}$:
     $$\eta_t = \eta_{\max} \cdot \frac{t}{T_{\text{warmup}}}$$
   - Substitute the values:
     $$\eta_{250} = 0.001 \cdot \frac{250}{500} = 0.001 \cdot 0.5 = \mathbf{0.0005} \quad (5.0 \times 10^{-4})$$
2. Step Size at $t = 5,250$ (Cosine Annealing Phase):
   - For $t > T_{\text{warmup}}$, define the elapsed cosine steps $t'$ and the remaining cosine budget $T'$:
     $$t' = t - T_{\text{warmup}} = 5250 - 500 = 4750$$
     $$T' = T_{\max} - T_{\text{warmup}} = 10000 - 500 = 9500$$
   - Evaluate the progress ratio across the cosine phase:
     $$\frac{t'}{T'} = \frac{4750}{9500} = 0.5$$
   - State the cosine annealing formula:
     $$\eta_t = \eta_{\min} + \frac{1}{2}(\eta_{\max} - \eta_{\min}) \left( 1 + \cos\left( \frac{t'}{T'} \pi \right) \right)$$
   - Substitute the progress ratio:
     $$\cos(0.5 \pi) = \cos\left(\frac{\pi}{2}\right) = 0.0$$
     $$\eta_{5250} = 10^{-6} + \frac{1}{2}(0.001 - 10^{-6})(1 + 0.0)$$
     $$\eta_{5250} = 10^{-6} + 0.5(0.000999) = 10^{-6} + 0.0004995 = \mathbf{0.0005005}$$

#### Problem 3: Sharpness-Aware Minimization (SAM) Perturbation Vector

Consider a two-dimensional quadratic objective function $f(\theta_1, \theta_2) = 2 \theta_1^2 + 8 \theta_2^2$. The current parameter configuration is $\theta = [1.0, \; 0.5]^T$. The optimizer implements Sharpness-Aware Minimization with a perturbation radius of $\rho = 0.05$ and a base learning rate of $\eta = 0.1$.

1. Compute the local gradient vector $\nabla f(\theta)$ and its Euclidean norm.
2. Determine the worst-case local perturbation vector $\hat{\epsilon}$.
3. Evaluate the gradient at the perturbed coordinate and compute the final SAM parameter update.

*Stepwise Solution:*
1. Local Gradient Evaluation:
   - Differentiate $f$ with respect to each coordinate:
     $$\frac{\partial f}{\partial \theta_1} = 4 \theta_1, \quad \frac{\partial f}{\partial \theta_2} = 16 \theta_2$$
   - Substitute $\theta = [1.0, \; 0.5]^T$:
     $$\nabla f(\theta) = [4(1.0), \; 16(0.5)]^T = \mathbf{[4.0, \; 8.0]^T}$$
   - Compute the Euclidean norm:
     $$\|\nabla f(\theta)\|_2 = \sqrt{(4.0)^2 + (8.0)^2} = \sqrt{16 + 64} = \sqrt{80} \approx \mathbf{8.94427}$$
2. Perturbation Vector Calculation:
   - The worst-case perturbation points along the normalized gradient scaled by $\rho$:
     $$\hat{\epsilon} = \rho \frac{\nabla f(\theta)}{\|\nabla f(\theta)\|_2} = 0.05 \frac{[4.0, \; 8.0]^T}{8.94427} \approx 0.05 [0.44721, \; 0.89443]^T = \mathbf{[0.02236, \; 0.04472]^T}$$
3. Perturbed Gradient and Parameter Update:
   - Compute the perturbed parameter location:
     $$\theta_{\text{adv}} = \theta + \hat{\epsilon} = [1.0 + 0.02236, \; 0.5 + 0.04472]^T = [1.02236, \; 0.54472]^T$$
   - Evaluate the gradient at the perturbed location:
     $$\nabla f(\theta_{\text{adv}}) = [4(1.02236), \; 16(0.54472)]^T = \mathbf{[4.08944, \; 8.71552]^T}$$
   - Compute the SAM update step:
     $$\theta_{\text{new}} = \theta - \eta \nabla f(\theta_{\text{adv}}) = \begin{bmatrix} 1.0 \\ 0.5 \end{bmatrix} - 0.1 \begin{bmatrix} 4.08944 \\ 8.71552 \end{bmatrix} = \begin{bmatrix} 1.0 - 0.40894 \\ 0.5 - 0.87155 \end{bmatrix} = \mathbf{\begin{bmatrix} 0.59106 \\ -0.37155 \end{bmatrix}}$$
*Conclusion:* Evaluating the gradient at the perturbed coordinate inflates the update along the high-curvature axis ($\theta_2$), penalizing surface sharpness and pulling the parameters away from steep boundaries.

> [!Tip]
> **Algebraic verification clarifies optimizer behavior**: tracking single-step updates manually exposes how momentum buffers kinetic velocity, how Adam unbiases early moments, and how SAM penalizes curvature sharpness.

## Key Takeaways

- **First-order optimization** guides deep learning by moving along the negative gradient, with step sizes constrained by the maximum eigenvalue of the Hessian ($\eta < \frac{2}{\lambda_{\max}}$).
- **Polyak momentum and Nesterov acceleration** stabilize trajectories across ill-conditioned ravines, dampening cross-wall oscillations and building speed along flat valleys.
- **Adaptive learning rate algorithms** approximate diagonal preconditioning, scaling updates per coordinate based on running gradient variance.
- **Adam unifies velocity and variance**, tracking bias-corrected first and second moments to provide stable step sizes across diverse parameter topographies.
- **AdamW decouples weight decay from gradient calculation**, ensuring uniform parameter shrinkage across all layers and improving generalization in deep networks.
- **Learning rate warmup** prevents noisy early gradients from destabilizing randomly initialized layers and allows adaptive variance accumulators to calibrate.
- **Cosine Annealing provides smooth step-size reduction**, exploring intermediate parameters thoroughly before settling into fine convergence.
- **Flat minima generalize more reliably than sharp minima**; methods like SWA and SAM discover flat, robust basins by averaging trajectory weights or explicitly optimizing against local curvature sharpness.

> [!Tip]
> The defining principle of deep optimization: **velocity navigates curvature, adaptive scaling normalizes coordinates, and schedules ensure basin settlement**; uniting momentum, coordinate-wise variance scaling, decoupled weight decay, and scheduled step sizes enables optimizers to train deep neural networks stably across complex, non-convex error surfaces.
