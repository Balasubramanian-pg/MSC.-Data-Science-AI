# Migration in progress
# Lesson 4: Learning Rate Schedules

## Learning Rate Schedules and Trajectory Control

The learning rate stands as the most critical hyperparameter in neural network training, dictating the step size taken along parameter descent trajectories. Keeping the learning rate constant throughout training creates a structural compromise between early exploration speed and late convergence precision. Implementing dynamic learning rate schedules controls optimizer velocity across training phases, allowing networks to escape sharp local traps early, traverse intermediate valleys stably, and settle smoothly into wide, generalizing minima.

## The Rationale for Dynamic Learning Rates

### The Exploration Versus Exploitation Dilemma

- Optimization in deep neural networks balances two competing operational regimes across its training lifecycle:
  - **Exploration (Early Phase):** Parameters require large step sizes to escape high-loss regions, cross shallow saddle points, and bypass poor, sharp local minima.
  - **Exploitation (Late Phase):** Parameters require small, refined step sizes to navigate flat, complex loss valleys without overshooting the minimum.
- A fixed scalar learning rate cannot satisfy both requirements: a large rate causes late-stage oscillation around minima, while a small rate traps early updates in suboptimal plateaus.

### The Pathology of Constant Step Sizes

- Under a constant step size $\eta$, gradient descent approaches a local minimum until the gradient norm scales with the residual error.
- Near a minimum, the displacement taken by an update step ($\Delta \theta = -\eta \nabla \mathcal{L}$) exceeds the width of the central basin if the step size violates the local curvature bound: $\eta > \frac{2}{\lambda_{\max}(H)}$.
- When this occurs, parameter updates bounce continuously back and forth across the ravine walls without settling into the basin floor, establishing a persistent **error plateau**.
- Decaying the learning rate over time shrinks the update displacement, allowing parameters to descend into the basin floor.

### Convergence Guarantees via Robbins-Monro Conditions

- Classical stochastic approximation theory establishes formal conditions for the convergence of noisy iterative optimizers to a local minimum.
- The **Robbins-Monro conditions** require the sequence of step sizes $\{\eta_t\}_{t=1}^\infty$ to satisfy two simultaneous mathematical constraints:
  $$\sum_{t=1}^\infty \eta_t = \infty \quad \text{and} \quad \sum_{t=1}^\infty \eta_t^2 < \infty$$
- **Divergent Sum Condition ($\sum \eta_t = \infty$):** Guarantees that the optimizer possesses sufficient cumulative energy to travel arbitrary distances across parameter space, preventing the algorithm from stalling before reaching a stationary point.
- **Finite Squared Sum Condition ($\sum \eta_t^2 < \infty$):** Guarantees that the cumulative variance introduced by stochastic gradient noise decays over time, forcing parameter fluctuations to damp out and settle into an exact minimum.

> [!Tip]
> **The Robbins-Monro conditions balance reach and stability**: step sizes must decay slowly enough to allow the model to traverse distant parameter space ($\sum \eta_t = \infty$), but fast enough to eliminate stochastic noise near the minimum ($\sum \eta_t^2 < \infty$).

## Learning Rate Warmup Mechanics

### Stabilization of Early Random Weights

- At the start of training, network parameters are randomly initialized, and feature representations are unorganized.
- Computing gradients on early mini-batches produces noisy, high-magnitude vectors that reflect random initializations rather than true task structure.
- Applying a large peak learning rate $\eta_{\max}$ at step zero can cause massive early parameter updates that push weights into extreme numerical regimes or saturate activation functions.
- **Learning rate warmup** begins optimization with a small step size, gradually increasing it over an initial interval to allow early layer activations and running statistics to stabilize.

### Second-Moment Variance Dampening in Adam

- Adaptive optimizers like Adam and AdamW track the uncentered second moment of past gradients: $v_t = \beta_2 v_{t-1} + (1 - \beta_2) g_t^2$.
- During the first few iterations, the historical sample size is small, making the second-moment estimate noisy and prone to underestimating true gradient variance despite bias correction.
- Dividing early gradients by $\sqrt{\hat{v}_t} + \epsilon$ when $\hat{v}_t$ is uncalibrated can produce large step sizes along unstable directions.
- Implementing warmup holds step sizes small while the second-moment vector accumulates a stable historical average of gradient variance.

### Linear and Non-Linear Warmup Formulations

- In **Linear Warmup**, the learning rate scales upward linearly from a tiny baseline $\eta_{\text{base}}$ to the peak target rate $\eta_{\max}$ over $T_{\text{warmup}}$ iterations:
  $$\eta_t = \eta_{\text{base}} + (\eta_{\max} - \eta_{\text{base}}) \frac{t}{T_{\text{warmup}}} \quad \forall t \le T_{\text{warmup}}$$
- Standard practice sets $\eta_{\text{base}} \approx 0$ or $\eta_{\text{base}} = \frac{\eta_{\max}}{100}$.
- **Non-linear variants** apply quadratic or exponential curves to ramp up the step size smoothly, preventing abrupt changes in parameter velocity as warmup completes.

> [!Important]
> **Warmup protects initial representations**: ramping up step sizes over initial epochs prevents noisy early gradients from destabilizing random weights and allows adaptive variance accumulators to calibrate.

## Classical Monotonic Decay Schedules

### Step Decay (Piecewise Constant Decay)

- **Step Decay** reduces the learning rate by a multiplicative factor $\gamma \in (0, 1)$ at predetermined epoch milestones $s$:
  $$\eta_t = \eta_0 \cdot \gamma^{\lfloor t / s \rfloor}$$
- A common implementation drops the learning rate by a factor of 10 ($\gamma = 0.1$) every 30 epochs during image classification training.
- Step decay creates distinct optimization phases: the model explores a broad error basin, and each step drop causes an immediate drop in training error followed by fine-tuning on a localized plateau.
- While effective, step decay introduces rigid hyperparameters (decay factor $\gamma$ and milestone step $s$) that require manual tuning.

### Exponential and Power Decay

- **Exponential Decay** decreases the learning rate continuously at every iteration using an exponential envelope:
  $$\eta_t = \eta_0 \cdot e^{-k t} \quad \text{or} \quad \eta_t = \eta_0 \cdot \gamma^t$$
  where $k$ controls the rate of decay.
- Exponential schedules transition smoothly without abrupt drops, but setting $k$ too high can decay the step size to near zero prematurely, halting learning before convergence.
- **Power Decay (Time-Based Decay)** scales the learning rate inversely with time:
  $$\eta_t = \frac{\eta_0}{1 + k t}$$
  Setting the power exponent to 1 satisfies the Robbins-Monro conditions, providing continuous step-size reduction.

### Polynomial Decay Protocols

- **Polynomial Decay** controls step-size reduction using a polynomial exponent $p$, driving the learning rate to a designated floor $\eta_{\min}$ over a fixed budget of $T_{\max}$ steps:
  $$\eta_t = (\eta_0 - \eta_{\min}) \left( 1 - \frac{t}{T_{\max}} \right)^p + \eta_{\min}$$
- Setting $p = 1.0$ produces **Linear Decay**, which is widely used in fine-tuning large language models and Transformer architectures.
- Setting $p > 1.0$ drops the learning rate quickly early on and levels out, while $p < 1.0$ keeps the rate higher for longer before decaying near the budget limit.

> [!Tip]
> **Linear decay suits fixed-budget fine-tuning**: reducing the learning rate linearly to zero over a predetermined step count provides stable convergence when adapting pre-trained models.

## Cyclical Schedules and Cosine Annealing

### Cosine Annealing Formulation

- Proposed by Ilya Loshchilov and Frank Hutter (2016), **Cosine Annealing** decays the learning rate following a half-cosine curve:
  $$\eta_t = \eta_{\min} + \frac{1}{2}(\eta_{\max} - \eta_{\min}) \left( 1 + \cos\left(\frac{t}{T_{\max}} \pi\right) \right)$$
- The schedule features smooth transitions: it decays slowly near the peak $\eta_{\max}$, accelerates through the middle phase, and flattens out near the minimum floor $\eta_{\min}$.
- The intermediate descent