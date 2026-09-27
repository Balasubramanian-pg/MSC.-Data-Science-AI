# Lesson 2: Tuning Core Hyperparameters

Tuning core hyperparameters focuses on optimizing the primary mathematical controls that govern gradient descent trajectories, numerical stability, and convergence rates. Among all external settings, the learning rate, learning rate schedule, mini-batch size, momentum coefficients, and weight decay exert the strongest influence on model performance. Establishing analytical bounds and empirical heuristics for these core variables allows practitioners to maximize optimization velocity while preventing loss divergence and generalization collapse.

## Learning Rate Dynamics and Step Size Optimization

### Theoretical Bounds on Convergence

- In gradient descent optimization, the **learning rate** ($\alpha$) dictates step displacement along the negative gradient vector:
  $$\theta_{t+1} = \theta_t - \alpha \nabla \mathcal{L}(\theta_t)$$
- For an $L$-smooth objective function whose loss Hessian exhibits a maximum eigenvalue $\lambda_{\max}(H)$, first-order gradient descent converges if and only if the step size satisfies:
  $$\alpha < \frac{2}{\lambda_{\max}(H)}$$
- Setting $\alpha = \frac{2}{\lambda_{\max}(H)}$ causes perpetual oscillation across loss ravines without progress.
- Setting $\alpha > \frac{2}{\lambda_{\max}(H)}$ causes gradient explosion, driving loss trajectories toward positive infinity or non-finite values ($\text{NaN}$).
- The theoretically optimal step size on a quadratic surface evaluates to:
  $$\alpha^* = \frac{2}{\lambda_{\max}(H) + \lambda_{\min}(H)}$$
  which balances descent speed along flat dimensions against oscillation suppression along sharp dimensions.

### The Learning Rate Range Test

- The **Learning Rate Range Test** identifies viable step-size bounds empirically within a single preliminary training run.
- Optimization begins with an extremely small learning rate ($\alpha_0 \approx 10^{-7}$) that increases exponentially at each mini-batch step over several hundred iterations:
  $$\alpha_k = \alpha_0 \cdot \left( \frac{\alpha_{\max}}{\alpha_0} \right)^{k / K}$$
  where $K$ denotes the total number of test iterations and $\alpha_{\max} \approx 10^1$.
- Plotting smoothed training loss against $\log_{10}(\alpha)$ yields a characteristic curve:
  - **Stagnation Region:** Loss remains flat at small $\alpha$, where gradient updates fail to overcome initialization barriers.
  - **Descent Region:** Loss decreases steadily as step size expands into optimal descent velocity.
  - **Divergence Boundary:** Loss reaches a global minimum ($\alpha_{\text{min-loss}}$) and turns upward, rising vertically as updates overshoot curvature bounds.
- Set the base operational learning rate to the point of steepest negative slope, roughly one half to one full order of magnitude below $\alpha_{\text{min-loss}}$.

> [!Important]
> **Upper bound selection rule**: choosing a base learning rate equal to the point of absolute minimum loss in a range test causes immediate divergence during extended training, because the optimal static rate resides in the preceding zone of steepest descent.

## Learning Rate Schedules and Warmup Strategies

### Linear Warmup Dynamics

- Initializing deep networks with large initial step sizes destabilizes optimization because early parameter weights and normalization statistics are uncalibrated.
- **Linear Learning Rate Warmup** scales the learning rate linearly from near-zero to the target base rate $\alpha_{\text{base}}$ over an initial budget of $T_{\text{warmup}}$ steps:
  $$\alpha_t = \alpha_{\text{base}} \cdot \frac{t}{T_{\text{warmup}}} \quad \forall t \le T_{\text{warmup}}$$
- Warmup stabilizes running mean and variance estimates in Batch Normalization layers and prevents destructive weight updates while momentum buffers accumulate valid gradient history.

### Classical and Cyclic Decay Schedules

- **Step Decay:** Multiplies the learning rate by a fixed attenuation factor $\gamma \in [0.1, 0.5]$ at predetermined epoch milestones ($E_1, E_2, \dots$):
  $$\alpha_t = \alpha_0 \cdot \gamma^{\lfloor t / s \rfloor}$$
  Step decay forces sharp drop-offs that induce rapid drops in validation error, but introduces sensitive milestone hyperparameters.
- **Cosine Annealing:** Smooths the learning rate downward following a half-period cosine curve, decreasing from $\alpha_{\max}$ to a minimal residual floor $\alpha_{\min}$:
  $$\alpha_t = \alpha_{\min} + \frac{1}{2} (\alpha_{\max} - \alpha_{\min}) \left( 1 + \cos\left( \frac{t}{T_{\max}} \pi \right) \right)$$
  Cosine annealing eliminates step discontinuities, providing continuous, smooth parameter exploration throughout training.
- **The 1cycle Policy:** Executes a triangular schedule that ramps learning rate upward to a high peak while simultaneously decreasing momentum from $0.95$ to $0.85$, followed by an annealing phase with increasing momentum. The rapid surge enables *super-convergence*, allowing models to train in a fraction of standard epochs.

> [!Tip]
> **Warmup duration**: allocate $5\%$ to $10\%$ of total planned training epochs to linear warmup when training deep networks with large batch sizes, preventing initial gradient shocks from destabilizing weights.

## Mini-Batch Size Dynamics and Scaling Laws

### Gradient Noise and Generalization Trade-Offs

- Mini-batch gradient estimation calculates the sample average over $B$ instances:
  $$g_B(\theta) = \frac{1}{B} \sum_{i=1}^B \nabla \mathcal{L}_i(\theta)$$
- The variance of this estimator is inversely proportional to batch size:
  $$\text{Var}(g_B) = \frac{\sigma^2}{B}$$
  where $\sigma^2$ is the variance of individual instance gradients.
- **Small Batches ($B \in [16, 64]$):** High gradient noise provides stochastic regularization, helping optimizer trajectories escape sharp, poorly generalizing local minima to locate flat parameter basins.
- **Large Batches ($B \ge 512$):** Low gradient noise yields accurate gradient estimates and maximizes GPU hardware parallelization, but risks settling into sharp minima that exhibit poor test-set generalization.

### Linear and Square-Root Scaling Rules

- When scaling batch size from baseline $B$ to a larger size $k \cdot B$ across distributed hardware, the step size must scale to maintain optimization dynamics.
- The **Linear Scaling Rule** states that if the batch size multiplies by $k$, the learning rate should multiply by $k$:
  $$\alpha' = k \cdot \alpha$$
  This preserves the total parameter displacement after processing an equivalent number of training instances under standard SGD.
- The linear scaling rule remains valid up to a problem-dependent *critical batch size*; scaling beyond this threshold yields diminishing returns and requires **Square-Root Scaling**:
  $$\alpha' = \sqrt{k} \cdot \alpha$$
  which aligns variance scaling directly with the Central Limit Theorem.

> [!Important]
> **Batch scaling limits**: applying the linear scaling rule without an accompanying linear warmup causes optimization divergence at large batch sizes, because large initial step sizes destabilize parameters before gradient directions stabilize.

## Momentum and Second-Order Acceleration Parameters

### Classical and Nesterov Momentum

- First-order gradient descent oscillates across steep ravine walls while progressing slowly along shallow loss floors.
- **Polyak (Classical) Momentum** dampens oscillations by accumulating past gradients into an exponentially decaying velocity vector $v_t$:
  $$v_{t+1} = \beta v_t + \nabla \mathcal{L}(\theta_t), \quad \theta_{t+1} = \theta_t - \alpha v_{t+1}$$
  where $\beta \in [0, 1)$ serves as the momentum coefficient (typically $\beta = 0.9$).
- Momentum acts as a physical mass traveling down a slope: forces pointing in consistent directions compound constructively by factor $\frac{1}{1 - \beta}$, while alternating perpendicular forces cancel destructively.
- **Nesterov Accelerated Gradient (NAG)** calculates the gradient step at a lookahead position ($\theta_t + \beta v_t$), providing anticipatory braking that suppresses overshoot along high-curvature trajectories.

### Tuning Adaptive Optimizer Parameters in AdamW

- Adaptive Moment Estimation with Decoupled Weight Decay (AdamW) maintains per-parameter moving averages of both the first moment (mean) and second raw moment (uncentered variance):
  $$m_t = \beta_1 m_{t-1} + (1 - \beta_1) g_t, \quad v_t = \beta_2 v_{t-1} + (1 - \beta_2) g_t^2$$
  $$\theta_{t+1} = \theta_t - \alpha \lambda_{\text{reg}} \theta_t - \frac{\alpha}{\sqrt{\hat{v}_t} + \epsilon} \hat{m}_t$$
- **First Moment Coefficient ($\beta_1$):** Controls directional inertia; defaults to $0.9$. Reducing $\beta_1$ to $0.8$ or $0.85$ improves tracking in noisy or non-stationary environments.
- **Second Moment Coefficient ($\beta_2$):** Controls the scale-smoothing window; defaults to $0.999$. In large-scale training or high-variance domains (such as reinforcement learning or language modeling), setting $\beta_2 = 0.98$ or $0.99$ reduces gradient lag.
- **Epsilon ($\epsilon$):** Numerical stability denominator constant; standard default is $10^{-8}$. Raising $\epsilon$ to $10^{-6}$ or $10^{-4}$ stabilizes 16-bit mixed-precision (FP16/BF16) training by preventing division by zero under underflow conditions.

> [!Tip]
> **Epsilon tuning in mixed precision**: raise the AdamW epsilon parameter from $10^{-8}$ to $10^{-6}$ or $10^{-5}$ when switching to 16-bit floating-point training to prevent numerical instability caused by subnormal float limits.

## Comparative Dynamics of Core Hyperparameters

| Hyperparameter | Primary Operational Role | Default or Baseline | Typical Search Range | Recommended Search Scale | Diagnostic Indicator of Misconfiguration |
|---|---|---|---|---|---|
| **Learning Rate ($\alpha$)** | Controls parameter step size along loss surface | $10^{-3}$ (AdamW), $10^{-1}$ (SGD) | $10^{-5} \text{ to } 10^{-1}$ | Logarithmic ($10^r$) | Immediate divergence ($\text{NaN}$) if high; flat loss if low |
| **Batch Size ($B$)** | Governs gradient estimation variance and throughput | $32 \text{ or } 64$ | $16 \text{ to } 2048$ | Powers of $2$ | Out-of-memory errors if high; slow hardware utilization if low |
| **Momentum ($\beta$)** | Dampens cross-ravine oscillations; accelerates descent | $0.90$ | $0.80 \text{ to } 0.99$ | Complementary Log ($1 - 10^r$) | Erratic trajectory overshoot if high; slow flat-floor progress if low |
| **AdamW $\beta_2$** | Sets memory horizon for coordinate-wise variance scaling | $0.999$ | $0.95 \text{ to } 0.9999$ | Complementary Log ($1 - 10^r$) | Stalled early learning if high; noisy coordinate scaling if low |
| **Weight Decay ($\lambda$)** | Enforces parameter shrinkage independent of gradient | $10^{-2}$ (AdamW), $10^{-4}$ (SGD) | $10^{-5} \text{ to } 10^{-1}$ | Logarithmic ($10^r$) | Severe underfitting if high; weight explosion and overfitting if low |
| **Warmup Steps ($T_{\text{warm}}$)**| Prevents destructive parameter updates at iteration zero | $5\% \text{ of total steps}$ | $1\% \text{ to } 15\%$ | Linear scale | Loss spikes or non-finite errors in epoch one if absent |

> [!Tip]
> **Co-tuning strategy**: pair learning rate and batch size adjustments together; whenever batch size increases by factor $k$, apply a linear warmup and scale the base learning rate by $k$ before fine-tuning momentum.

## Key Takeaways

- **Loss Hessian curvature bounds the learning rate**: step sizes must remain strictly below $\frac{2}{\lambda_{\max}(H)}$ to prevent gradient explosion and trajectory divergence.
- **The LR range test isolates optimal step sizes**: plotting loss against exponentially increasing learning rates pinpoints the steepest descent zone prior to the minimum-loss divergence point.
- **Linear warmup stabilizes early optimization**: ramping step sizes from zero over initial steps prevents gradient shocks while normalization running statistics and momentum buffers initialize.
- **Cosine decay enables smooth parameter exploration**: continuous cosine annealing avoids the arbitrary timing decisions and sharp shocks associated with step-decay schedules.
- **Mini-batch size controls gradient stochasticity**: small batches introduce noise that guides parameters toward flat minima, while large batches maximize parallel compute throughput.
- **Scaling batch sizes requires learning rate adjustment**: multiplying batch size by factor $k$ warrants an accompanying linear scaling of learning rate ($\alpha' = k\alpha$) up to the critical batch threshold.
- **Momentum dampens high-curvature oscillations**: accumulating gradient history accelerates progress along consistent directions while canceling opposing perpendicular oscillations.
- **AdamW decoupling restores regularization integrity**: applying weight decay directly to weight tensors ensures uniform parameter shrinkage regardless of adaptive gradient magnitudes.

> [!Important]
> **Core hyperparameter synergy**: the learning rate, batch size, and warmup schedule form an interconnected optimization triad; altering one variable shifts the effective dynamics of the others, requiring coordinated tuning to maintain convergence stability.
