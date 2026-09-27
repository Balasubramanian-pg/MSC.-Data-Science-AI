# W05: Backpropagation and Training Dynamics

## Backpropagation and Training Dynamics in Neural Networks

The training of deep artificial neural networks centers on calculating error gradients across parameterized computational graphs and applying those gradients to update network parameters. The backpropagation algorithm implements reverse-mode automatic differentiation, allowing networks to compute exact partial derivatives of a scalar loss function with respect to millions of parameters in time proportional to the forward pass. Analyzing gradient propagation mechanics, optimizer trajectories, and training dynamics provides the theoretical basis required to control convergence speed and ensure robust generalization.

## Computational Graphs and Reverse-Mode Differentiation

### Directed Acyclic Graphs and Intermediate Caching

- Neural network architectures express computation as **directed acyclic graphs (DAGs)** where nodes represent mathematical operations or input variables, and directed edges convey tensor data.
- The **forward pass** traverses the computational graph in topological order, executing primitive tensor operations and saving intermediate activations in memory.
- The **backward pass** traverses the computational graph in reverse topological order, applying the multivariate chain rule to evaluate adjoints (gradients) with respect to every intermediate node.
- Caching forward activations ($a^{[l-1]}$ and $z^{[l]}$) is mandatory because evaluating the analytical derivatives of parameterized layers requires both upstream error signals and local inputs.

### Reverse-Mode Automatic Differentiation Mechanics

- Automatic differentiation evaluates derivatives algorithmically by decomposing expressions into elementary operations with known analytic derivatives.
- For a composite function $f: \mathbb{R}^n \to \mathbb{R}^m$, **forward-mode automatic differentiation** tracks directional derivatives forward, requiring $n$ sweeps to compute a full Jacobian matrix.
- **Reverse-mode automatic differentiation** tracks adjoint values backward from a scalar output ($m=1$) to all input variables simultaneously in a single sweep:
  $$\bar{u} = \frac{\partial \mathcal{L}}{\partial u}$$
- Because neural network training optimizes a solitary scalar objective function ($\mathcal{L} \in \mathbb{R}$) over millions of input parameters ($\theta \in \mathbb{R}^P$), reverse-mode autodiff evaluates parameter gradients in $O(1)$ reverse passes relative to the forward compute time.

### Vector-Jacobian Products (VJPs)

- Computing an explicit Jacobian matrix $J \in \mathbb{R}^{m \times n}$ for intermediate layers requires prohibitive memory allocations for large tensor dimensions.
- Reverse-mode automatic differentiation executes backpropagation via **Vector-Jacobian Products (VJPs)**:
  $$v^T J = \bar{y}^T \left( \frac{\partial y}{\partial x} \right)$$
  where $\bar{y} = \nabla_y \mathcal{L}$ represents the incoming scalar loss gradient with respect to layer outputs.
- Frameworks compute the vector-matrix product directly without ever instantiating the uncompressed, high-dimensional Jacobian matrix in memory.

> [!Tip]
> **Vector-Jacobian products** make deep backpropagation feasible: evaluating the adjoint product directly avoids allocating dense intermediate derivative matrices, keeping memory consumption linear with network depth.

## The Backpropagation Algorithm: Mathematical Derivation

### The Error Signal Definition

- Consider an $L$-layer Multi-Layer Perceptron where layer $l \in \{1, \dots, L\}$ computes:
  $$z^{[l]} = W^{[l]} a^{[l-1]} + b^{[l]}, \quad a^{[l]} = g^{[l]}(z^{[l]})$$
  with $a^{[0]} = x$, weight matrix $W^{[l]} \in \mathbb{R}^{n^{[l]} \times n^{[l-1]}}$, and bias vector $b^{[l]} \in \mathbb{R}^{n^{[l]}}$.
- Define the local **error vector** $\delta^{[l]} \in \mathbb{R}^{n^{[l]}}$ as the partial derivative of the scalar loss $\mathcal{L}$ with respect to the pre-activation vector $z^{[l]}$:
  $$\delta^{[l]} \equiv \frac{\partial \mathcal{L}}{\partial z^{[l]}} = \nabla_{z^{[l]}} \mathcal{L}$$
- The error vector represents the sensitivity of the global objective function to perturbations in the affine sum before the non-linear activation is applied.

### Output Layer Error Formulation

- For the final output layer $L$, apply the chain rule connecting the loss $\mathcal{L}$, the post-activation prediction $\hat{y} = a^{[L]}$, and the pre-activation vector $z^{[L]}$:
  $$\delta^{[L]} = \frac{\partial \mathcal{L}}{\partial z^{[L]}} = \left( \frac{\partial a^{[L]}}{\partial z^{[L]}} \right)^T \frac{\partial \mathcal{L}}{\partial a^{[L]}} = \nabla_{a^{[L]}} \mathcal{L} \odot g'^{[L]}(z^{[L]})$$
  where $\odot$ denotes the element-wise Hadamard product.
- When coupling an activation function with its natural statistical loss distribution, exact derivative cancellations simplify $\delta^{[L]}$:
  - **Mean Squared Error with Identity Output:** $\delta^{[L]} = \frac{1}{m} (\hat{y} - y)$.
  - **Binary Cross-Entropy with Sigmoid Output:** $\delta^{[L]} = \hat{y} - y$.
  - **Categorical Cross-Entropy with Softmax Output:** $\delta^{[L]} = \hat{y} - y$.

### Backward Error Propagation Across Hidden Layers

- To compute the error signal $\delta^{[l]}$ at an internal hidden layer $l$ from the downstream error signal $\delta^{[l+1]}$, apply the multivariate chain rule:
  $$\delta^{[l]} = \frac{\partial \mathcal{L}}{\partial z^{[l]}} = \left( \frac{\partial z^{[l+1]}}{\partial z^{[l]}} \right)^T \frac{\partial \mathcal{L}}{\partial z^{[l+1]}} = \left( \frac{\partial z^{[l+1]}}{\partial z^{[l]}} \right)^T \delta^{[l+1]}$$
- Expand the intermediate dependency through post-activations: $z^{[l+1]} = W^{[l+1]} g^{[l]}(z^{[l]}) + b^{[l+1]}$.
- Differentiating with respect to $z^{[l]}$ yields the Jacobian factor:
  $$\frac{\partial z^{[l+1]}}{\partial z^{[l]}} = W^{[l+1]} \text{diag}(g'^{[l]}(z^{[l]}))$$
- Transposing and multiplying by $\delta^{[l+1]}$ yields the fundamental **backpropagation recurrence relation**:
  $$\delta^{[l]} = (W^{[l+1]T} \delta^{[l+1]}) \odot g'^{[l]}(z^{[l]})$$
- The transposed weight matrix $W^{[l+1]T}$ routes error signals backward across synapses, while the element-wise product scales the transmitted error by the local activation derivative.

### Parameter Gradient Equations and Batch Matrix Form

- Applying the chain rule to the learnable parameters in layer $l$ yields the weight and bias gradients:
  $$\frac{\partial \mathcal{L}}{\partial W^{[l]}} = \delta^{[l]} (a^{[l-1]})^T, \quad \frac{\partial \mathcal{L}}{\partial b^{[l]}} = \delta^{[l]}$$
- The weight gradient is the **outer product** of the outgoing error vector $\delta^{[l]}$ and the incoming activation vector $a^{[l-1]}$.
- For a mini-batch of $m$ instances organized into row matrices where activations $A^{[l-1]} \in \mathbb{R}^{m \times n^{[l-1]}}$ and pre-activation gradients $dZ^{[l]} \in \mathbb{R}^{m \times n^{[l]}}$, the batch updates evaluate via matrix products:
  $$dZ^{[l]} = dA^{[l]} \odot g'^{[l]}(Z^{[l]})$$
  $$dW^{[l]} = \frac{1}{m} (dZ^{[l]})^T A^{[l-1]} \in \mathbb{R}^{n^{[l]} \times n^{[l-1]}}$$
  $$db^{[l]} = \frac{1}{m} (dZ^{[l]})^T \mathbf{1}_m \in \mathbb{R}^{n^{[l]} \times 1}$$
  $$dA^{[l-1]} = dZ^{[l]} W^{[l]} \in \mathbb{R}^{m \times n^{[l-1]}}$$

> [!Important]
> **The backpropagation recurrence** maps errors in reverse: layer error vectors propagate backward via multiplication by transposed weight matrices ($W^T \delta$), scaling by local activation derivatives to produce outer-product parameter updates.

## Gradient Descent Regimes and Batch Dynamics

### Batch, Stochastic, and Mini-Batch Regimes

- **Batch Gradient Descent (BGD)** evaluates the true empirical gradient across the entire training dataset of $N$ samples before executing a parameter update:
  $$\theta_{t+1} = \theta_t - \eta \frac{1}{N} \sum_{i=1}^N \nabla_\theta \mathcal{L}_i(\theta_t)$$
  BGD provides a deterministic, monotonic descent on convex surfaces, but becomes computationally intractable for large datasets and cannot escape sharp sub-optimal local minima.
- **Stochastic Gradient Descent (SGD)** updates parameters after computing the gradient on a single randomly selected sample ($m=1$):
  $$\theta_{t+1} = \theta_t - \eta \nabla_\theta \mathcal{L}_i(\theta_t)$$
  SGD requires minimal memory and updates parameters quickly, but high gradient variance induces violent fluctuations that hinder exact convergence.
- **Mini-Batch Gradient Descent** balances computational efficiency and update stability by evaluating gradients over a small subset of data ($m \in [32, 2048]$):
  $$\theta_{t+1} = \theta_t - \eta \frac{1}{m} \sum_{i=1}^m \nabla_\theta \mathcal{L}_i(\theta_t)$$
  Mini-batches leverage GPU matrix-multiplication pipelines while maintaining sufficient gradient variance to escape poor local traps.

### Stochastic Noise as an Optimization Regularizer

- The difference between a mini-batch gradient estimate and the true batch gradient acts as zero-mean **stochastic gradient noise**:
  $$\epsilon_t = \nabla \mathcal{L}_{\text{batch}}(\theta_t) - \nabla \mathcal{L}_{\text{full}}(\theta_t), \quad \mathbb{E}[\epsilon_t] \approx 0$$
- The covariance of this noise scales inversely with batch size: $\text{Cov}(\epsilon_t) \propto \frac{1}{m}$.
- Stochastic noise performs an implicit thermal exploration similar to Langevin dynamics, helping the optimizer escape shallow saddle points and sharp, non-generalizing local minima.
- Training with moderately sized mini-batches often achieves superior validation generalization compared to full-batch training, which tends to converge into sharp minima.

### The Batch Size and Learning Rate Scaling Law

- Increasing the mini-batch size reduces gradient noise variance, allowing larger parameter steps without causing optimization instability.
- The **Linear Scaling Rule** states that when multiplying the mini-batch size by a scalar factor $k$ ($m' = k \cdot m$), the base learning rate should also be scaled by $k$ ($\eta' = k \cdot \eta$).
- The mathematical justification rests on update equivalence: executing one large batch step with learning rate $k\eta$ approximates the cumulative parameter displacement of $k$ consecutive small batch steps with learning rate $\eta$.
- When scaling to massive batch sizes, the linear rule breaks down due to curvature constraints, requiring **gradual learning rate warmup** to prevent early optimization divergence.

> [!Tip]
> **Mini-batch noise aids generalization**: the variance inherent in smaller mini-batches prevents the optimizer from getting trapped in sharp, overfitted minima, driving parameters toward wide, robust basins.

## Momentum-Based and Adaptive Optimizers

### Classical Momentum and Ravine Acceleration

- Standard gradient descent struggles in regions of high condition numbers (narrow valleys or ravines), where curvature along the cross-valley axis is orders of magnitude steeper than along the valley base.
- The **Classical Momentum** algorithm models physical inertia by accumulating an exponentially decaying moving average of past gradients into a velocity vector $v_t$:
  $$v_t = \beta v_{t-1} + (1 - \beta) g_t$$
  $$\theta_{t+1} = \theta_t - \eta v_t$$
  where $\beta \in [0.9, 0.99]$ serves as the momentum coefficient, and $g_t = \nabla_\theta \mathcal{L}(\theta_t)$.
- Along directions with oscillating gradient signs (cross-ravine walls), consecutive terms cancel out, dampening destructive oscillations.
- Along directions with consistent gradient signs (the valley base), momentum terms accumulate constructively, accelerating descent along the flat floor.

### Nesterov Accelerated Gradient (NAG)

- Classical momentum computes the current gradient at the existing position $\theta_t$ before applying the velocity vector.
- **Nesterov Accelerated Gradient (NAG)** calculates a lookahead gradient at the projected parameter location ($\theta_t - \beta v_{t-1}$):
  $$g_t = \nabla_\theta \mathcal{L}(\theta_t - \beta v_{t-1})$$
  $$v_t = \beta v_{t-1} + \eta g_t$$
  $$\theta_{t+1} = \theta_t - v_t$$
- Computing gradients at the anticipated destination provides an adaptive damping mechanism, slowing updates when the velocity vector heads toward an ascending slope.

### RMSprop and Adaptive Gradient Scaling

- Introduced by Geoffrey Hinton, **RMSprop** resolves the diminishing learning rate pathology of AdaGrad by replacing raw gradient accumulation with an exponential moving average of squared gradients:
  $$s_t = \beta s_{t-1} + (1 - \beta) g_t^2$$
  $$\theta_{t+1} = \theta_t - \frac{\eta}{\sqrt{s_t} + \epsilon} \odot g_t$$
  where $g_t^2$ is the element-wise square, $\beta \approx 0.9$, and $\epsilon \approx 10^{-8}$ prevents division by zero.
- RMSprop dynamically scales the effective step size for each coordinate: parameters with large historical gradients receive smaller updates, while parameters with infrequent or small gradients receive larger steps.

### Adam: Adaptive Moment Estimation with Bias Correction

- **Adam (Adaptive Moment Estimation)** combines the principles of classical momentum and RMSprop, tracking both the first raw moment (mean) and second uncentered moment (variance) of past gradients:
  $$m_t = \beta_1 m_{t-1} + (1 - \beta_1) g_t \quad \text{(First Moment Estimate)}$$
  $$v_t = \beta_2 v_{t-1} + (1 - \beta_2) g_t^2 \quad \text{(Second Moment Estimate)}$$
  standard hyperparameters are $\beta_1 = 0.9$ and $\beta_2 = 0.999$.
- Because vectors $m_t$ and $v_t$ are initialized at zero, they are biased toward zero during early training steps, especially when decay rates approach unity.
- Adam resolves this distortion using **bias correction** terms that scale moments based on the current step count $t$:
  $$\hat{m}_t = \frac{m_t}{1 - \beta_1^t}, \quad \hat{v}_t = \frac{v_t}{1 - \beta_2^t}$$
- The parameter update equation combines both corrected estimates:
  $$\theta_{t+1} = \theta_t - \frac{\eta}{\sqrt{\hat{v}_t} + \epsilon} \hat{m}_t$$

### AdamW and Decoupled Weight Decay

- In standard SGD, $L_2$ regularization ($\frac{1}{2} \lambda \|\theta\|_2^2$) and direct **weight decay** ($\theta \leftarrow \theta - \eta \lambda \theta$) produce mathematically identical updates.
- In adaptive optimizers like Adam, combining $L_2$ regularization adds $\lambda \theta$ directly to the gradient vector $g_t$:
  $$g_t \leftarrow \nabla \mathcal{L}(\theta_t) + \lambda \theta_t$$
- This inclusion causes the regularizer to pass through the second-moment accumulator $v_t$, meaning weights with large historical gradients experience *less* weight decay than weights with small gradients:
  $$\Delta \theta \propto \frac{\lambda \theta}{\sqrt{v_t} + \epsilon}$$
- Proposed by Ilya Loshchilov and Frank Hutter, **AdamW** decouples weight decay from the gradient update entirely:
  $$\theta_{t+1} = \theta_t - \eta \lambda \theta_t - \frac{\eta}{\sqrt{\hat{v}_t} + \epsilon} \hat{m}_t$$
- Decoupled weight decay restores proportional regularization across all parameters, improving generalization in Transformers and deep architectures.

> [!Important]
> **AdamW decouples weight decay**: separating weight decay from gradient computation prevents adaptive scale normalization from distorting the regularizer, ensuring uniform parameter shrinkage across all layers.

## Training Dynamics, Error Topography, and Schedulers

### Saddle Points, Plateaus, and Curvature Obstacles

- High-dimensional error spaces are dominated by **saddle points** rather than isolated local minima.
- At a saddle point, the gradient evaluates to zero ($\nabla \mathcal{L} = 0$), but the Hessian matrix contains both positive and negative eigenvalues.
- Standard gradient descent slows down when approaching these plateaus because weak gradients produce small update steps.
- Modern optimizers overcome saddle points using momentum and noisy mini-batch estimates, which help push parameters along negative curvature axes to resume descent.

### Sharp Versus Flat Minima and Generalization

- A **flat minimum** occupies a broad, gentle basin where the eigenvalues of the Hessian matrix remain small ($\lambda_{\max}(H) \ll \infty$).
- A **sharp minimum** resides in a narrow, steep canyon characterized by large Hessian eigenvalues and high condition numbers.
- A model resting in a sharp minimum generalises poorly: small distributional shifts between training and test sets displace the loss significantly, degrading test performance.
- Optimization parameters that encourage flat basin discovery include moderate mini-batch sizes, momentum, adaptive learning rates, and weight decay.

### Learning Rate Warmup and Schedulers

- Keeping the learning rate constant throughout training produces suboptimal convergence; high rates prevent final settlement into deep basins, while low rates slow initial exploration.
- **Learning Rate Warmup** linearly increases $\eta$ from zero to its target base value over the initial epochs, preventing large, noisy early updates from destabilizing random weights.
- **Step Decay** reduces the learning rate by a multiplicative factor $\gamma$ (such as $0.1$) at fixed epoch milestones.
- **Cosine Annealing** decreases the learning rate following a cosine curve toward a minimum floor $\eta_{\min}$:
  $$\eta_t = \eta_{\min} + \frac{1}{2} (\eta_{\max} - \eta_{\min}) \left( 1 + \cos\left( \frac{t}{T_{\max}} \pi \right) \right)$$
- Cosine decay provides a smooth schedule that spends substantial time in mid-range exploration before settling into fine convergence.

> [!Tip]
> **Learning rate warmup stabilizes early training**: gradually ramping up the learning rate during the first few epochs prevents initial gradients from distorting randomly initialized weights before activations normalize.

## Comparative Matrix of Optimization Algorithms

| Optimizer | Update Formulation | First Moment (Direction) | Second Moment (Scaling) | Memory Footprint | Primary Strength / Weakness |
|---|---|---|---|---|---|
| **SGD** | $\theta - \eta g_t$ | None ($g_t$ only) | None | $O(0)$ auxiliary state | Low memory and strong theoretical convergence; oscillates in ill-conditioned valleys |
| **SGD + Momentum** | $\theta - \eta v_t$ | Exponential moving average ($v_t$) | None | $O(P)$ (stores velocity $v$) | Dampens cross-valley oscillations; requires tuning momentum parameter $\beta$ |
| **Nesterov (NAG)** | $\theta - v_t$ | Lookahead momentum ($v_t$) | None | $O(P)$ (stores velocity $v$) | Adds predictive braking on descending slopes; sensitive to hyperparameter choices |
| **AdaGrad** | $\theta - \frac{\eta}{\sqrt{G_t} + \epsilon} g_t$ | None ($g_t$ only) | Monotonic sum ($\sum g_i^2$) | $O(P)$ (stores squared sum $G$) | Effective for sparse feature problems; learning rate decays to zero prematurely |
| **RMSprop** | $\theta - \frac{\eta}{\sqrt{s_t} + \epsilon} g_t$ | None ($g_t$ only) | Exponential moving average ($s_t$) | $O(P)$ (stores moving average $s$) | Resolves premature learning rate decay; lacks momentum-driven directional velocity |
| **Adam** | $\theta - \frac{\eta}{\sqrt{\hat{v}_t} + \epsilon} \hat{m}_t$ | Moving average with bias correction | Moving average with bias correction | $O(2P)$ (stores $m$ and $v$) | Fast initial convergence across tasks; non-decoupled L2 regularization causes issues |
| **AdamW** | $\theta(1 - \eta\lambda) - \frac{\eta}{\sqrt{\hat{v}_t} + \epsilon} \hat{m}_t$ | Moving average with bias correction | Moving average with bias correction | $O(2P)$ (stores $m$ and $v$) | Restores true weight decay; standard choice for Transformers and modern architectures |

> [!Important]
> **Select AdamW for modern architectures**: decoupling weight decay from adaptive moment updates delivers the fast convergence of Adam alongside the generalization benefits of true parameter shrinkage.

## Key Takeaways

- **Reverse-mode automatic differentiation** evaluates parameter gradients for scalar objectives in $O(1)$ reverse passes relative to the forward compute time.
- **Vector-Jacobian Products (VJPs)** evaluate adjoint values directly without allocating uncompressed high-dimensional Jacobian matrices in memory.
- **The backpropagation algorithm** propagates error signals backward through networks via transposed weight matrices ($W^T \delta$) scaled by local activation derivatives.
- **Mini-batch gradient descent** balances GPU parallel compute with stochastic gradient noise, which helps parameters avoid sharp, non-generalizing local traps.
- **The Linear Scaling Rule** pairs batch size growth with proportional learning rate increases ($\eta' = k\eta$), supported by early learning rate warmup.
- **Classical momentum** dampens destructive cross-axis oscillations and accelerates progress along flat valley floors by tracking gradient velocity.
- **Adam** combines first-moment velocity and second-moment adaptive scaling, utilizing bias corrections to counteract zero-initialization distortions.
- **AdamW** decouples weight decay from adaptive gradient scaling, ensuring uniform regularization across parameters and improving model generalization.

> [!Tip]
> The core principle of neural network optimization: **backpropagation computes exact sensitivities, while adaptive dynamics govern convergence**; combining reverse-mode calculus with decoupled adaptive optimizers and scheduled learning rates allows gradient descent to navigate complex non-convex error surfaces reliably.
