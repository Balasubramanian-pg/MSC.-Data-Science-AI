# Migration in progress
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

- The parameter update equation combines the bias-corrected firs