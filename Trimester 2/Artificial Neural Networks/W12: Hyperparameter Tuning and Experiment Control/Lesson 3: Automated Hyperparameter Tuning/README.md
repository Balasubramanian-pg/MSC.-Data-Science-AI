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

- Successive Halving faces the *budget allocation dilemma*: choosing between evaluating many configurations on small initial budgets (high exploration, risk of early false pruning) versus evaluating fewer configurations on large budgets (low exploration, reliable rankings).
- **Hyperband** resolves this dilemma by executing an outer loop over multiple brackets of Successive Halving, varying the trade-off between candidate count $N$ and initial resource budget $R$.
- Early brackets prioritize aggressive exploration by evaluating vast candidate pools on tiny initial slices, while later brackets allocate larger initial budgets to smaller candidate sets.
- **BOHB (Bayesian Optimization and Hyperband)** replaces Hyperband's uniform random sampling subroutine with TPE-guided sampling, combining the fast pruning of bandits with the sample efficiency of Bayesian surrogate modeling.

### Asynchronous Successive Halving (ASHA)

- Standard SHA requires all configurations in a rung to finish training before ranking and promoting the top fraction, creating idle-worker bottlenecks in distributed clusters.
- **Asynchronous Successive Halving (ASHA)** promotes a configuration to the next rung immediately whenever its metric exceeds the promotion threshold of currently completed runs at that rung.
- Workers never wait for lagging nodes, maximizing hardware throughput and scaling linearly across large distributed compute clusters.

> [!Important]
> **Early stopping via multi-fidelity**: multi-fidelity algorithms discard unpromising configurations early, allowing teams to explore ten to one hundred times more hyperparameter candidates within the same compute budget.

## Evolutionary and Population-Based Strategies

### Population-Based Training Dynamics

- Standard HPO algorithms optimize static hyperparameters evaluated from scratch for each trial.
- **Population-Based Training (PBT)** optimizes parameter weights and hyperparameter schedules simultaneously within a single shared execution run.
- PBT maintains a population of $K$ networks training concurrently in parallel.
- At periodic training intervals, each agent executes an **exploit-and-explore** cycle:
  - **Exploit:** An underperforming model copies the network weights and optimizer state from a top-performing agent in the population.
  - **Explore:** The cloned agent mutates its hyperparameters stochastically (such as multiplying learning rate or weight decay by random factors drawn from $\{0.8, 1.2\}$).
- Training resumes from the updated parameter checkpoint using the mutated hyperparameters.

### Learning Dynamic Schedules

- PBT discovers adaptive, non-stationary hyperparameter schedules throughout optimization rather than committing to static configurations.
- Agents learn complex optimization trajectories, discovering schedules such as continuous learning rate decay, progressive batch size scaling, and dynamic data augmentation adjustments.
- Compute efficiency matches that of standard parallel training, because zero compute is spent restarting failed configurations from epoch zero.

> [!Tip]
> **PBT for non-stationary tasks**: deploy Population-Based Training for workloads requiring complex dynamic schedules, such as reinforcement learning, generative adversarial networks, and large-scale model pre-training.

## Comparative Taxonomy of Automated HPO Strategies

| Strategy | Search Mechanism | Sample Efficiency | Computational Overhead | Handles Conditional Spaces | Discovers Dynamic Schedules | Ideal Use Case |
|---|---|---|---|---|---|---|
| **Grid Search** | Exhaustive Cartesian grid | Very Low | Extremely High ($O(k^d)$) | Poor | No | Low dimensions ($d \le 2$) with coarse boundaries |
| **Random Search** | Uniform stochastic sampling | Moderate | Moderate to High | High | No | Standard baseline; high-dimensional initial sweeps |
| **Bayesian (GP)** | Gaussian Process surrogate | High | High per step ($O(N^3)$) | Poor | No | Continuous spaces ($d \le 15$); expensive evaluations |
| **Bayesian (TPE)** | Kernel density estimation | High | Low per step | Excellent | No | Mixed-variable spaces; moderate evaluation budgets |
| **Hyperband** | Multi-fidelity bandit pruning | Very High | Low total compute | Excellent | No | Large candidate pools with fast early metric signals |
| **BOHB** | TPE coupled with Hyperband | Superior | Optimal resource use | Excellent | No | Large-scale deep learning hyperparameter tuning |
| **PBT** | Evolutionary exploit-explore | Superior | Minimal (Reuses weights) | Moderate | Yes | End-to-end schedule optimization; RL pipelines |

> [!Tip]
> **Two-stage optimization workflow**: initiate hyperparameter exploration using BOHB or ASHA to locate high-performing configuration basins rapidly, then refine surrounding continuous parameters using localized Bayesian TPE.

## Key Takeaways

- **Grid search suffers from exponential scaling**: Cartesian combinations waste evaluation trials repeating settings across uninfluential hyperparameter dimensions.
- **Random search provides efficient spatial coverage**: drawing samples randomly ensures unique evaluations along all hyperparameter axes, maximizing exposure to critical variables.
- **Bayesian optimization builds probabilistic surrogates**: SMBO models the validation loss surface to select candidate points that maximize acquisition functions like Expected Improvement.
- **TPE excels in complex neural search spaces**: modeling $P(\lambda \mid y)$ enables Tree-Structured Parzen Estimators to handle discrete, categorical, and conditional variables efficiently.
- **Multi-fidelity pruning eliminates poor configurations**: Successive Halving allocates small initial budgets to large candidate pools, promoting only the top performers to full training.
- **Hyperband balances candidate volume and fidelity**: executing nested Successive Halving brackets resolves the trade-off between aggressive early pruning and deep single-run evaluation.
- **ASHA removes synchronization bottlenecks**: promoting candidates asynchronously keeps distributed GPU clusters fully saturated without idle worker delays.
- **Population-Based Training optimizes weights and schedules together**: periodic exploit-and-explore cycles discover dynamic hyperparameter trajectories without restarting training from iteration zero.

> [!Important]
> **Automated tuning preserves engineering efficiency**: transitioning from manual adjustments to multi-fidelity Bayesian frameworks like BOHB or ASHA maximizes model performance while drastically cutting compute budgets and human operational overhead.
