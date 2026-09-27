# Migration in progress
# Lesson 3: Automated Hyperparameter Tuning

Automated hyperparameter optimization (HPO) replaces manual trial and error with algorithmic exploration strategies that navigate complex configuration spaces. As model complexity and hyperparameter dimensionality expand, brute-force grid searches become computationally intractable. Modern automated tuning frameworks leverage Bayesian surrogate modeling, multi-fidelity resource allocation, and evolutionary population dynamics to locate optimal hyperparameter configurations while minimizing total compute expenditure.

## Exhaustive and Stochastic Search Strategies

### Grid Search and the Curse of Dimensionality

- **Grid Search** discretizes the search space by evaluating the Cartesian product of predefined candidate sets across $d$ hyperparameter dimensions:
  $$\Lambda_{\text{grid}} = \Lambda_1 \times \Lambda_2 \times \dots \times \Lambda_d$$
- If each hyperparameter dimension contains $k$ candidate values, the total number of full training evaluations scales exponentially as $O(k^d)$.
- The fundamental defect of grid search is its vulnerability to *low effective dimensionality*: in deep neural networks, only a small subset of hyperparameters significantly drives validation performance.
- When evaluating two hyperparameters where only one is impactful, a $(k \times k)$ grid tests only $k$ distinct values of the important variable, repeating each setting $k$ times across redundant variations of the uninfluential variable.

### Random Search Efficiency

- **Random Search** samples configurations independently from defined probability distributions over the search space:
  $$\lambda^{(i)} \sim P(\Lambda) \quad \text{for } i \in \{1, \dots, N\}$$
- For a fixed evaluation budget of $N$ training runs, random search evaluates $N$ distinct values for *every* individual hyperparameter, maximizing coverage along high-impact dimensions.
- If an optimal performance region occupies a fraction $p$ of the parameter volume, the probability of finding at least one configuration within that region in $N$ independent trials evaluates to:
  $$P(\text{success}) = 1 - (1 - p)^N$$
- To achieve a $95\%$ probability of testing a configuration within the top $5\%$ ($p=0.05$) of the search space, random search requires only $N \ge \frac{\ln(1 - 0.95)}{\ln(1 - 0.05)} \approx 59$ trials, regardless of total search dimensionality $d$.

> [!Important]
> **Random search superiority**: random search consistently outperforms grid search in high-dimensional spaces because it never wastes evaluation trials testing duplicate values along low-impact hyperparameter axes.

## Sequential Model-Based and Bayesian Optimization

### The Surrogate Model Framework

- Sequential Model-Based Optimization (SMBO) builds a probabilistic proxy model $\mathcal{M}$ to approximate the expensive black-box validation function $f(\lambda) = \mathcal{L}_{\text{val}}(\theta^*(\lambda))$.
- The optimization loop iterates sequentially:
  1. Fit surrogate model $\mathcal{M}$ to all previously evaluated pairs $\mathcal{D}_{1:t-1} = \{(\lambda_i, y_i)\}_{i=1}^{t-1}$.
  2. Optimize a fast mathematical **acquisition function** $\alpha(\lambda)$ over $\mathcal{M}$ to select the most promising next configuration $\lambda_t$.
  3. Execute the full neural network training run using $\lambda_t$ to observe empirical metric $y_t$.
  4. Augment the observation dataset $\mathcal{D}_{1:t} = \mathcal{D}_{1:t-1} \cup \{(\lambda_t, y_t)\}$ and repeat.

### Gaussian Processes Versus Tree-Structured Parzen Estimators

- **Gaussian Processes (GPs):** Define non-parametric prior distributions over functions, providing closed-form posterior mean $\mu(\lambda)$ and variance $\sigma^2(\lambda)$ predictions.
  - GPs scale cubically with the number of trials ($O(N^3)$), making them computationally prohibitive beyond a few hundred evaluations.
  - Standard GP kernels struggle with categorical, conditional, and high-dimensional parameter spaces ($d > 15$).
- **Tree-Structured Parzen Estimators (TPE):** Reformulate Bayesian optimization by modeling the probability distribution of hyperparameters conditioned on validation score, $P(\lambda \mid y)$, rather than modeling $P(y \mid \lambda)$ directly.
- TPE splits historical trials into two groups using a performance quantile threshold $\gamma \in (0, 1)$ (typically $\gamma = 0.15$):
  $$P(\lambda \mid y) = \begin{cases} \ell(\lambda) & \text{if } y < y^* \\ g(\lambda) & \text{if } y \ge y^* \end{cases}$$
  where $y^*$ is the $\gamma$-th quantile of observed validation losses.
- Optimizing the acquisition function under TPE simplifies directly to maximizing the density ratio:
  $$\arg\max_\lambda \frac{\ell(\lambda)}{g(\lambda)}$$
  which selects configurations that have high likelihood under top-performing runs $\ell(\lambda)$ and low likelihood under poor runs $g(\lambda)$.

### Acquisition Functions and the Exploration-Exploitation Trade-Off

- **Expected Improvement (EI):** Quantifies the expectation of outperforming the current best loss $y_{\text{best}}$:
  $$\text{EI}(\lambda) = \mathbb{E}\left[ \max(0, \, y_{\text{best}} - f(\lambda)) \right]$$
- **Upper Confidence Bound (UCB / LCB):** Explicitly balances exploration and exploitation via parameter $\kappa$:
  $$\text{LCB}(\lambda) = \mu(\lambda) - \kappa \cdot \sigma(\lambda)$$
  Small predicted mean $\mu(\lambda)$ encourages exploitation of known fertile basins, while large predictive variance $\sigma(\lambda)$ forces exploration of uncharted regions.

> [!Tip]
> **Surrogate model selection**: deploy Tree-Structured Parzen Estimators (TPE) instead of Gaussian Processes when optimizing mixed spaces that include discrete layer sizes, categorical optimizers, and conditional hyperparameters.

## Multi-Fidelity and Bandit-Based Optimization

### Successive Halving Dynamics

- Standard HPO wastes computational budgets training unpromising configurations to completion.
- **Successive Halving (SHA)** treats configuration selection as a non-stochastic multi-armed bandit problem, allocating resources across tiered evaluation rungs.
- The algorithm begins with $N$ randomly sampled configurations evaluated on a small initial budget (such as $1$ epoch or a small data fraction).
- All candidates are ranked by validation performance; only the top $\frac{1}{\eta}$ fraction (typically $\eta = 3$) advances to the next rung.
- Advancing candidates receive an increased budget multiplied by factor $\eta$, repeating until the final survivors complete full training runs.

### Hyperband and Budget Allocation

- Success