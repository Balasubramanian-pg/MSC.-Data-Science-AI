# Lesson 3: Adaptive Optimizers

## Adaptive Optimizers in Deep Learning

Standard gradient descent updates all parameters using a single, uniform scalar learning rate, treating every coordinate in parameter space as if it possessed identical curvature and sensitivity. In deep multi-layer architectures, gradients across layers, channels, and sparse features vary by multiple orders of magnitude. Adaptive optimization algorithms resolve this imbalance by constructing coordinate-wise scaling factors from running gradient statistics, allowing networks to navigate ill-conditioned ravines, accelerate sparse feature learning, and stabilize deep parameter updates.

## Motivation for Coordinate-Wise Step Sizes

### The Limitations of Global Learning Rates

- In standard Stochastic Gradient Descent (SGD) and Momentum, a single scalar step size $\eta$ governs parameter updates across all $P$ variables simultaneously:
  $$\Delta \theta = -\eta g_t$$
- If a global learning rate is calibrated to prevent numerical divergence along steep, high-curvature coordinates ($\lambda_{\max}(H)$), updates along flat, low-curvature coordinates ($\lambda_{\min}(H)$) become infinitesimal.
- If the learning rate is increased to accelerate movement along flat directions, the optimizer overshoots along steep coordinates, triggering oscillation and divergence across narrow ravines.

### Diagonal Preconditioning and Curvature Compensation

- Second-order Newton methods resolve non-uniform curvature by multiplying the gradient by the inverse Hessian matrix ($H^{-1} g$).
- Storing and inverting the full Hessian is computationally impossible for deep networks, but approximating the Hessian using a **diagonal preconditioning matrix** $D_t \in \mathbb{R}^{P \times P}$ offers a computationally viable alternative:
  $$\theta_{t+1} = \theta_t - \eta D_t^{-1/2} g_t$$
- Setting each diagonal element $D_{ii}$ proportional to the local curvature or historical gradient magnitude along coordinate $i$ normalizes the effective step size across all dimensions.
- Coordinates exhibiting steep slopes or frequent updates receive smaller steps, while flat coordinates with small or infrequent gradients receive larger steps.

### Sparse Features Versus Dense Activations

- In natural language processing, recommendation engines, and graph networks, parameter tensors experience high frequency disparity:
  - Rare token embeddings or categorical features receive gradients only once every thousands of mini-batches.
  - Dense hidden linear layers and classification heads receive substantial gradient updates on every backward pass.
- A global learning rate causes parameters associated with rare tokens to learn slowly, while parameters receiving frequent updates risk overshooting.
- Adaptive optimizers rescale coordinates independently, ensuring that rare parameters make meaningful progress when activated.

> [!Tip]
> **Diagonal preconditioning rescales parameter coordinates**: dividing gradients by coordinate-wise historical statistics normalizes step sizes across non-uniform curvature, preventing steep coordinates from oscillating while keeping flat coordinates moving.

## First-Generation Adaptive Solvers: AdaGrad and RMSprop

### AdaGrad and Cumulative Gradient Sums

- Proposed by John Duchi, Elad Hazan, and Yoram Singer (2011), **AdaGrad (Adaptive Gradient Algorithm)** scales coordinate learning rates inversely with the root sum of past squared gradients.
- For each parameter coordinate $j$, the algorithm accumulates the square of historical partial derivatives into a vector $G_t \in \mathbb{R}^P$:
  $$G_{t, j} = G_{t-1, j} + g_{t, j}^2$$
  $$\theta_{t+1, j} = \theta_{t, j} - \frac{\eta}{\sqrt{G_{t, j}} + \epsilon} g_{t, j}$$
  where $\epsilon \approx 10^{-8}$ is a smoothing term that prevents division by zero.
- The effective step size for parameter $j$ scales as $\eta_{\text{eff}, j} = \frac{\eta}{\sqrt{G_{t, j}} + \epsilon}$, automatically dampening updates along coordinates that generate large historical gradients.

### The Premature Learning Rate Stoppage Bottleneck

- Because the squared gradient terms $g_{t, j}^2$ are non-negative, the accumulator vector increases monotonically at every single training step:
  $$G_{t, j} \ge G_{t-1, j} \quad \forall t$$
- As training proceeds across thousands of mini-batch iterations, $G_{t, j}$ grows without bound, forcing the effective learning rate $\frac{\eta}{\sqrt{G_t} + \epsilon}$ to decay strictly toward zero.
- In deep neural networks, this cumulative accumulation causes the learning rate to decay to near zero during early training epochs, stopping the optimizer before it reaches a viable minimum.

### RMSprop and Exponentially Decaying Windows

- Developed by Geoffrey Hinton (2012), **RMSprop** resolves the monotonic decay problem of AdaGrad by replacing the cumulative sum with an **exponential moving average (EMA)** of squared gradients.
- Rather than remembering all past gradients from the start of training, RMSprop restricts its second-moment memory to an effective window of the most recent $\frac{1}{1 - \beta}$ steps:
  $$v_t = \beta v_{t-1} + (1 - \beta) g_t \odot g_t$$
  $$\theta_{t+1} = \theta_t - \frac{\eta}{\sqrt{v_t} + \epsilon} \odot g_t$$
  where $\odot$ denotes element-wise multiplication, and $\beta$ is typically set to $0.9$.
- Normalizing the gradient by its recent root-mean-square magnitude allows the effective step size to adapt dynamically: if gradients decrease inside a flat basin, $v_t$ decreases, expanding the effective step size to accelerate progress.

> [!Important]
> **RMSprop prevents step-size starvation**: replacing AdaGrad's infinite cumulative sum with an exponential moving average restricts historical memory to recent steps, allowing effective learning rates to expand or contract dynamically.

## Adam: Combining First and Second Moments

### Unified Moment Formulation

- Proposed by Diederik Kingma and Jimmy Ba (2014), **Adam (Adaptive Moment Estimation)** combines the directional smoothing of momentum with the coordinate-wise scaling of RMSprop.
- Adam tracks exponentially decaying moving averages of both past gradients (**first moment: mean**) and past squared gradients (**second uncentered moment: variance**):
  $$m_t = \beta_1 m_{t-1} + (1 - \beta_1) g_t \quad \text{(First Moment Estimate)}$$
  $$v_t = \beta_2 v_{t-1} + (1 - \beta_2) g_t \odot g_t \quad \text{(Second Moment Estimate)}$$
- Standard default hyperparameters are set to $\beta_1 = 0.9$, $\beta_2 = 0.999$, and $\epsilon = 10^{-8}$.

### Mathematical Derivation of Bias Correction

- Vectors $m_t$ and $v_t$ are initialized to zero vectors ($m_0 = 0, v_0 = 0$).
- Unrolling the recurrence relation for the first moment across $t$ steps yields:
  $$m_t = (1 - \beta_1) \sum_{i=1}^t \beta_1^{t-i} g_i$$
- Taking the mathematical expectation of $m_t$, assuming the true gradient distribution has a stationary local mean $\mathbb{E}[g_i] = \mathbb{E}[g_t]$:
  $$\mathbb{E}[m_t] = \mathbb{E}\left[ (1 - \beta_1) \sum_{i=1}^t \beta_1^{t-i} g_i \right] = \mathbb{E}[g_t] (1 - \beta_1) \sum_{i=1}^t \beta_1^{t-i}$$
- Applying the finite geometric series formula $\sum_{k=0}^{t-1} \beta_1^k = \frac{1 - \beta_1^t}{1 - \beta_1}$:
  $$\mathbb{E}[m_t] = \mathbb{E}[g_t] (1 - \beta_1) \left( \frac{1 - \beta_1^t}{1 - \beta_1} \right) = \mathbb{E}[g_t] (1 - \beta_1^t)$$
- Because $\beta_1 \in (0, 1)$, the factor $(1 - \beta_1^t)$ is strictly less than one, meaning $m_t$ is biased toward zero during early training steps.
- Dividing by the correction factor restores an unbiased estimator:
  $$\hat{m}_t = \frac{m_t}{1 - \beta_1^t}, \quad \text{such that } \mathbb{E}[\hat{m}_t] = \mathbb{E}[g_t]$$
- Applying identical steps to the second-moment accumulator yields the variance correction:
  $$\hat{v}_t = \frac{v_t}{1 - \beta_2^t}, \quad \text{such that } \mathbb{E}[\hat{v}_t] = \mathbb{E}[g_t^2]$$

### The Composite Adam Update Equation

- The parameter update equation combines the bias-corrected first and second moments:
  $$\theta_{t+1} = \theta_t - \frac{\eta}{\sqrt{\hat{v}_t} + \epsilon} \odot \hat{m}_t$$
- The first moment $\hat{m}_t$ maintains directional velocity to dampen high-frequency oscillations across ravines.
- The second moment $\hat{v}_t$ scales updates so that each coordinate step size is bounded approximately by $\pm \eta$, providing robust optimization across diverse loss topographies.

> [!Tip]
> **Bias correction counteracts zero-initialization**: dividing moments by $(1 - \beta^t)$ removes the artificial pull toward zero during early training steps, ensuring that early updates maintain their intended scale.

## Advanced Formulations: AdamW, AMSGrad, and NAdam

### The L2 Regularization Breakdown in Adaptive Schemes

- In standard SGD, adding an $L_2$ penalty $\frac{1}{2}\lambda \|\theta\|_2^2$ to the loss function produces an analytical gradient $g_t + \lambda \theta_t$, which yields standard **weight decay**:
  $$\theta_{t+1} = \theta_t - \eta(g_t + \lambda \theta_t) = (1 - \eta \lambda)\theta_t - \eta g_t$$
- In adaptive optimizers like Adam, traditional library implementations added the regularization gradient $\lambda \theta_t$ directly to the objective gradient before computing moments:
  $$g_t \leftarrow \nabla \mathcal{L}(\theta_t) + \lambda \theta_t$$
- This inclusion routes the regularizer through the second-moment accumulator $v_t$:
  $$v_t = \beta_2 v_{t-1} + (1 - \beta_2)(g_t + \lambda \theta_t)^2$$
  $$\theta_{t+1} = \theta_t - \frac{\eta}{\sqrt{\hat{v}_t} + \epsilon} \odot (\hat{m}_t + \lambda \theta_t)$$
- Consequently, parameters with large historical gradients experience *less* weight decay because their denominator $\sqrt{\hat{v}_t}$ is large, while parameters with small gradients experience *more* weight decay.

### AdamW and True Decoupled Weight Decay

- Proposed by Ilya Loshchilov and Frank Hutter (2017), **AdamW** decouples weight decay from the gradient update entirely:
  $$\theta_{t+1} = (1 - \eta_t \lambda)\theta_t - \frac{\eta_t}{\sqrt{\hat{v}_t} + \epsilon} \odot \hat{m}_t$$
  where the decay term $\eta_t \lambda \theta_t$ applies directly to the parameter tensor without passing through the second-moment denominator $\sqrt{\hat{v}_t}$.
- Decoupling weight decay restores proportional parameter shrinkage across all layers, ensuring that weights with large gradients undergo the same relative decay as weights with small gradients.
- AdamW improves validation generalization over standard Adam, establishing itself as the default optimizer for Transformers and deep vision architectures.

### AMSGrad and Non-Increasing Learning Rates

- Sashank Reddi, Satyen Kale, and Sanjiv Kumar (2018) identified a theoretical convergence failure in Adam: when past gradients feature large, informative values followed by small gradients, the moving average $v_t$ decreases, causing the effective learning rate to increase unexpectedly.
- **AMSGrad** resolves this issue by preserving a monotonic, non-decreasing second-moment estimate:
  $$\hat{v}_t^{\max} = \max(\hat{v}_{t-1}^{\max}, \; v_t)$$
  $$\theta_{t+1} = \theta_t - \frac{\eta}{\sqrt{\hat{v}_t^{\max}} + \epsilon} \odot m_t$$
- By guaranteeing that $\hat{v}_t^{\max} \ge \hat{v}_{t-1}^{\max}$, AMSGrad prevents the effective step size from increasing, providing formal convergence proofs in non-convex settings.

### NAdam: Injecting Nesterov Acceleration

- Formulated by Timothy Dozat (2016), **NAdam (Nesterov-accelerated Adaptive Moment Estimation)** integrates Nesterov accelerated momentum into Adam's first-moment update.
- Instead of using the delayed velocity vector $\hat{m}_t$, NAdam calculates a lookahead first-moment vector:
  $$\bar{m}_t = \beta_{1, t+1} \hat{m}_t + (1 - \beta_{1, t}) \frac{g_t}{1 - \prod_{i=1}^t \beta_{1, i}}$$
  $$\theta_{t+1} = \theta_t - \frac{\eta}{\sqrt{\hat{v}_t} + \epsilon} \odot \bar{m}_t$$
- Applying the lookahead gradient adds an adaptive braking effect to Adam's updates, accelerating convergence on steep descent trajectories.

> [!Important]
> **AdamW decouples weight decay from variance scaling**: applying parameter shrinkage directly to the weights rather than adding it to the gradient prevents adaptive denominators from distorting regularization, improving model generalization.

## Comparative Matrix of Adaptive Optimization Algorithms

| Optimizer | First-Moment Tracking (Velocity) | Second-Moment Tracking (Scale) | Bias Correction | Weight Decay Formulation | Auxiliary Memory State | Primary Advantage / Tradeoff |
|---|---|---|---|---|---|---|
| **AdaGrad** | None (uses raw gradient $g_t$) | Cumulative sum: $\sum g_i^2$ | No | Coupled $L_2$ gradient penalty | $1P$ (stores cumulative sum $G$) | Scales sparse features well; learning rate decays to zero prematurely |
| **RMSprop** | None (uses raw gradient $g_t$) | Exponential moving average | No | Coupled $L_2$ gradient penalty | $1P$ (stores moving average $v$) | Resolves premature stoppage; lacks momentum directional smoothing |
| **AdaDelta** | None (tracks update RMS) | Exponential moving average | No | Coupled $L_2$ gradient penalty | $2P$ (stores $v$ and $\Delta \theta$ RMS) | Eliminates learning rate hyperparameter; limited control over update steps |
| **Adam** | EMA with decay $\beta_1$ | EMA with decay $\beta_2$ | Yes | Coupled $L_2$ gradient penalty | $2P$ (stores $m$ and $v$) | Fast initial convergence; coupled weight decay impairs generalization |
| **AdamW** | EMA with decay $\beta_1$ | EMA with decay $\beta_2$ | Yes | **Decoupled parameter shrinkage** | $2P$ (stores $m$ and $v$) | Restores true weight decay; standard baseline for deep architectures |
| **AMSGrad** | EMA with decay $\beta_1$ | Monotonic maximum: $v_t^{\max}$ | No | Coupled $L_2$ gradient penalty | $2P$ (stores $m$ and $v^{\max}$) | Guarantees non-increasing step sizes; can converge conservatively |
| **NAdam** | Nesterov lookahead momentum | EMA with decay $\beta_2$ | Yes | Coupled $L_2$ gradient penalty | $2P$ (stores $m$ and $v$) | Faster convergence via predictive lookahead; sensitive to hyperparameter tuning |

> [!Tip]
> **Select AdamW for modern deep learning**: decoupling weight decay from adaptive moment updates delivers the fast convergence of Adam alongside the generalization benefits of true parameter shrinkage.

## Key Takeaways

- **Global learning rates fail on non-uniform curvature**: setting a single step size across an entire model causes steep coordinates to oscillate while flat coordinates stall.
- **Coordinate-wise adaptation approximates diagonal preconditioning**, scaling each parameter update by an estimate of its local curvature to normalize step sizes.
- **AdaGrad scales updates by cumulative squared gradients**, handling sparse data effectively but suffering from premature learning rate starvation as sums grow monotonically.
- **RMSprop replaces cumulative sums with exponential moving averages**, restricting historical memory to an effective window of $\frac{1}{1-\beta}$ steps to keep learning rates active.
- **Adam unifies first and second moments**, combining momentum velocity with RMSprop variance scaling to control both update direction and magnitude.
- **Initialization bias correction** unbiases early moment estimates, eliminating the artificial pull toward zero caused by zero-initialized state vectors.
- **Coupled L2 regularization distorts adaptive updates** because weights with large historical gradients experience less shrinkage through division by $\sqrt{v_t}$.
- **AdamW decouples weight decay from gradient calculation**, ensuring uniform regularization across all network parameters and improving model generalization.

> [!Tip]
> The central principle of adaptive optimization: **coordinate scaling normalizes curvature, while decoupled decay preserves regularization**; combining moment-based velocity, coordinate-wise variance scaling, and direct parameter shrinkage allows adaptive optimizers to train deep architectures stably across complex, non-convex error surfaces.
