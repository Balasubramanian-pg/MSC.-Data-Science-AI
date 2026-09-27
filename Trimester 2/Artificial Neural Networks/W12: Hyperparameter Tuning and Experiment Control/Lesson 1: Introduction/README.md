# Migration in progress
# Lesson 1: Introduction to Hyperparameter Tuning and Experiment Control

Hyperparameter tuning and experiment control establish rigorous methodologies for exploring, optimizing, and tracking the external configuration variables that govern neural network training. Unlike internal model parameters that update directly via backpropagation, hyperparameters define the structural architecture, optimization dynamics, and regularization bounds prior to execution. Systematic experiment control eliminates non-deterministic variance, ensures reproducible validation comparisons, and transforms empirical model iteration into an auditable optimization science.

## The Foundations of Hyperparameters in Deep Learning

### Parameters Versus Hyperparameters

- Internal **parameters** ($\theta \in \mathbb{R}^P$) encompass the layer weights and bias vectors optimized automatically through gradient descent to minimize empirical training loss:
  $$\theta^* = \arg\min_\theta \mathcal{L}_{\text{train}}(\theta; \mathcal{D}_{\text{train}})$$
- External **hyperparameters** ($\lambda \in \Lambda$) encompass the user-configured settings that dictate model architecture, optimization dynamics, and regularizing constraints.
- Hyperparameter optimization (HPO) functions mathematically as a *bilevel optimization problem*:
  $$\min_{\lambda \in \Lambda} \mathcal{L}_{\text{val}}\left(\theta^*(\lambda); \mathcal{D}_{\text{val}}\right) \quad \text{subject to} \quad \theta^*(\lambda) \in \arg\min_\theta \mathcal{L}_{\text{train}}\left(\theta; \mathcal{D}_{\text{train}}, \lambda\right)$$
- The inner optimization evaluates parameter updates on the training split, while the outer optimization searches for the hyperparameter vector $\lambda$ that minimizes loss on an independent validation split.
- Evaluating the outer objective requires complete or partial training trajectories, making hyperparameter evaluation computationally expensive.

### Hyperparameter Search Spaces

- Hyperparameter spaces combine multiple distinct mathematical data types:
  - **Continuous Hyperparameters:** Real-valued variables across continuous intervals, such as learning rate ($\alpha \in [10^{-5}, 10^{-1}]$) and weight decay ($\lambda_{\text{reg}} \in [10^{-6}, 10^{-2}]$).
  - **Discrete Hyperparameters:** Integer-valued variables, such as batch size ($B \in \{16, 32, 64, 128, 256\}$), layer count ($L \in \{2, 4, 8, 16\}$), and hidden units ($n^{[l]} \in \{64, 128, 256, 512\}$).
  - **Categorical Hyperparameters:** Discrete choices without ordinal relationships, such as optimizer type ($\{\text{SGD}, \text{AdamW}, \text{RMSprop}\}$) and activation function ($\{\text{ReLU}, \text{LeakyReLU}, \text{GeLU}\}$).
  - **Conditional Hyperparameters:** Structural variables active only when specific parent configurations are selected, such as momentum coefficient $\beta_1$ being evaluated only when AdamW or SGD with Momentum is chosen.

> [!Important]
> **Bilevel optimization complexity**: tuning hyperparameters requires treating validation loss as an expensive black-box function of training runs, requiring disciplined search protocols rather than ad-hoc parameter tweaks.

## Hierarchy and Priority of Neural Hyperparameters

### First-Order Tuning Targets

- The **learning rate** ($\alpha$) represents the single most critical hyperparameter across deep learning architectures: it determines step magnitude across non-convex loss surfaces.
- Setting $\alpha$ too high causes immediate gradient explosion or divergence, while setting it too low induces optimization stagnation and locks parameters in sub-optimal basins.
- The **mini-batch size** ($B$) dictates gradient variance per step: small batches introduce stochastic regularization that aids generalization, while large batches maximize GPU hardware utilization and tensor-core throughput.
- **Learning rate schedules and warmup** dictate optimization stability: initial linear warmups prevent destructive early updates before activation statistics stabilize, while cosine or step decays ensure late-stage convergence into flat minima.

### Secondary and Structural Tuning Targets

- **Optimizer selection and momentum parameters:** Choosing between SGD with Momentum ($\beta = 0.9$) and adaptive optimizers (AdamW with $\beta_1 = 0.9, \beta_2 = 0.999$) dictates update direction and per-coordinate scaling.
- **Weight decay coefficient ($\lambda_{\text{reg}}$):** Regulates the $L_2$ shrinkage pressure applied to parameter tensors, controlling model complexity and suppressing representation overconfidence.
- **Architectural dimensions:** Network depth ($L$) and layer width ($n^{[l]}$) dictate total hypothesis capacity; scaling width generally eases optimization, while scaling depth yields higher parameter efficiency for hierarchical representations.
- **Regularization rates:** Dropout retention probability ($p$) and label smoothing coefficients ($\epsilon$) modulate generalization bounds under limited data constraints.

> [!Tip]
> **Tuning priority hierarchy**: tune the learning rate and its schedule first, batch size second, optimizer momentum and weight decay third, and fine-tune architectural depth and dropout last.

## Scale Selection and Sampling Geometries

### Linear Versus Logarithmic Search Scales

- Sampling hyperparameters on a linear scale fails when candidate values span multiple orders of magnitude.
- In a linear search for learning rate $\alpha \in [0.0001, 0.1]$, roughly $90\%$ of candidate samples fall into the interval $[0.01, 0.1]$, leaving the critical exploration range $[0.0001, 0.001]$ with only $1\%$ of the search budget.
- Sampling across a **logarithmic scale** assigns equal probability density to every order of magnitude:
  $$r \sim \mathcal{U}(a, b) \implies \alpha = 10^r$$
  where $a = \log_{10}(\alpha_{\min})$ and $b = \log_{10}(\alpha_{\max})$.
- For the interval $\alpha \in [10^{-4}, 10^{-1}]$, sampling exponents uniformly $r \sim \mathcal{U}(-4, -1)$ distributes candidate evaluations evenly across $[10^{-4}, 10^{-3}]$, $[10^{-3}, 10^{-2}]$, and $[10^{-2}, 10^{-1}]$.

### Complementary Logarithmic Sampling for Saturated Parameters

- Hyperparameters whose performance boundaries approach $1.0$ (such as momentum $\beta \approx 0.9$ or $0.999$) require sampling on a **complementary logarithmic scale**.
- The sensitivity of momentum resides in the residual quantity $(1 - \beta)$: the effective memory horizon of exponentially weighted averages scales as $\frac{1}{1 - \beta}$.
- Changing $\beta$ from $0.90$ to $0.905$ yields minimal impact (horizon shifts from $10$ to $10.5$ steps), whereas changing $\beta$ from $0.999$ to $0.9995$ doubles the memory horizon from $1{,}000$ to $2{,}000$ steps.
- Sample momentum by drawing the exponent of the residual uniformly:
  $$r \sim \mathcal{U}(a, b) \implies \b