# Migration in progress
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
- The linear scaling rule remain