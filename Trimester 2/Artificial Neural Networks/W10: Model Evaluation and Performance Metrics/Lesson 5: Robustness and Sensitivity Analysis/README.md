# Lesson 5: Robustness and Sensitivity Analysis

Robustness and sensitivity analysis evaluate how stable neural network predictions remain under input perturbations, distributional shifts, and adversarial manipulations. While standard performance metrics assume identically distributed training and test distributions, real-world deployment exposes architectures to sensor noise, environmental corruptions, and targeted attacks. Quantifying local input gradients, out-of-distribution stability, and worst-case bounds guarantees that models remain reliable when test conditions deviate from nominal training environments.

## Foundations of Robustness and Input Sensitivity

### Mathematical Formalization of Input Fragility

- A neural network function $f: \mathbb{R}^d \to \mathbb{R}^C$ maps input features to target predictions through stacked affine layers and non-linearities.
- **Local sensitivity** evaluates the rate of change in network outputs relative to infinitesimal changes in the input vector $x$, formalized by the input **Jacobian matrix** $J(x) \in \mathbb{R}^{C \times d}$:
  $$J(x) = \nabla_x f(x) = \begin{bmatrix} \frac{\partial f_1(x)}{\partial x_1} & \dots & \frac{\partial f_1(x)}{\partial x_d} \\ \vdots & \ddots & \vdots \\ \frac{\partial f_C(x)}{\partial x_1} & \dots & \frac{\partial f_C(x)}{\partial x_d} \end{bmatrix}$$
- The Frobenius norm of the Jacobian, $\|J(x)\|_F$, measures total local variance; high norms indicate that microscopic input fluctuations produce massive output swings.
- **Lipschitz continuity** bounds the maximum possible output shift across the entire input space using a global *Lipschitz constant* $L$:
  $$\|f(x) - f(x')\|_q \le L \|x - x'\|_p \quad \forall x, x' \in \mathcal{X}$$
- The global Lipschitz constant of a standard feedforward network is upper-bounded by the product of the spectral norms (maximum singular values) of its constituent weight matrices:
  $$L \le \prod_{l=1}^L \|W^{[l]}\|_2$$
  where each non-linear activation satisfies $1$-Lipschitz continuity (such as ReLU or GeLU).
- Unconstrained parameter growth inflates spectral norms, lowering network stability and making outputs vulnerable to imperceptible perturbations.

### Feature Attribution and Global Sensitivity

- **Gradient-based saliency** computes $\nabla_x \mathcal{L}(f(x), y)$ to isolate which input dimensions exert the strongest local influence on the objective loss.
- **Integrated Gradients** addresses gradient saturation in non-linear units by integrating gradients along a straight path from a neutral baseline $x_0$ to input $x$:
  $$\text{IG}_i(x) = (x_i - x_{0,i}) \times \int_0^1 \frac{\partial f(x_0 + \alpha(x - x_0))}{\partial x_i} \, d\alpha$$
- **Variance-based global sensitivity** (such as Sobol indices) decomposes total output variance across individual input features and mutual interactions, quantifying how uncertainty in specific inputs propagates to final decisions.

> [!Important]
> **Jacobian norm constraints**: minimizing input Jacobian norms during training acts as an explicit regularizer, reducing predictive variance and bounding local output sensitivity under input shifts.

## Adversarial Robustness and Threat Models

### Bounded Perturbation Threat Models

- **Adversarial examples** are intentionally crafted input vectors $x_{\text{adv}} = x + \delta$ designed to cause misclassification while constraining perturbation size $\|\delta\|_p \le \epsilon$ below human perception thresholds.
- Perturbations evaluate across metric geometries defined by $L_p$ norms:
  - **$L_\infty$ norm:** $\|\delta\|_\infty = \max_i |\delta_i| \le \epsilon$, bounding the maximum change permitted in any single input feature.
  - **$L_2$ norm:** $\|\delta\|_2 = \sqrt{\sum_i \delta_i^2} \le \epsilon$, bounding the aggregate Euclidean energy of the perturbation vector.
  - **$L_0$ norm:** $\|\delta\|_0 = \sum_i \mathbf{1}(\delta_i \neq 0) \le k$, bounding the total number of features permitted to change.

### First-Order Adversarial Attack Formulations

- The **Fast Gradient Sign Method (FGSM)** generates a single-step $L_\infty$ adversarial attack by moving in the direction of the loss gradient:
  $$x_{\text{adv}} = x + \epsilon \cdot \text{sign}\left(\nabla_x \mathcal{L}(f(x), y)\right)$$
- FGSM operates on the assumption of *local linearity*: in high-dimensional spaces, accumulating minute linear shifts along thousands of input dimensions produces massive logit deviations.
- **Projected Gradient Descent (PGD)** provides a stronger iterative multi-step attack by iteratively updating the perturbation and projecting the result back onto the $\epsilon$-ball:
  $$x^{(t+1)} = \Pi_{x + \mathcal{S}} \left( x^{(t)} + \alpha \cdot \text{sign}\left(\nabla_{x^{(t)}} \mathcal{L}(f(x^{(t)}), y)\right) \right)$$
  where $\Pi$ denotes the Euclidean or box projection operator, $\alpha$ is the step size, and $\mathcal{S} = \{\delta : \|\delta\|_p \le \epsilon\}$.
- PGD represents the definitive empirical first-order adversary for evaluating worst-case robustness inside the local perturbation ball.

> [!Tip]
> **Multi-step adversarial validation**: avoid evaluating models solely against single-step attacks like FGSM; gradient masking can deceive single-step evaluations while multi-step PGD readily exposes underlying model vulnerabilities.

## Distribution Shifts and Common Corruptions

### Typology of Dataset Shifts

- Standard evaluation operates under the *Independent and Identically Distributed (I.I.D.)* assumption, where training and deployment data share joint distribution $P_{\text{train}}(X, Y) = P_{\text{test}}(X, Y)$.
- **Covariate shift** occurs when the input distribution shifts while the underlying conditional label mapping remains invariant:
  $$P_{\text{train}}(X) \neq P_{\text{test}}(X), \quad P(Y \mid X)_{\text{train}} = P(Y \mid X)_{\text{test}}$$
- **Label shift** (prior probability shift) occurs when class distributions shift while conditional input distributions remain identical:
  $$P_{\text{train}}(Y) \neq P_{\text{test}}(Y), \quad P(X \mid Y)_{\text{train}} = P(X \mid Y)_{\text{test}}$$
- **Concept shift** occurs when the true relationship between features and labels changes over time:
  $$P(Y \mid X)_{\text{train}} \neq P(Y \mid X)_{\text{test}}, \quad P_{\text{train}}(X) = P_{\text{test}}(X)$$

### Systematic Corruption Benchmarking

- The **Common Corruptions Benchmark** evaluates model resilience against non-adversarial, realistic environmental noise across standardized corruption categories (noise, blur, weather conditions, and digital compressions).
- Performance degrades systematically across five discrete severity levels ($s \in \{1, 2, 3, 4, 5\}$).
- The **Corruption Error ($CE$)** normalizes the classification error of evaluated model $f$ against a standard baseline model $b$ for corruption type $c$ and severity $s$:
  $$\text{CE}_c^f = \frac{\sum_{s=1}^5 E_{s, c}^f}{\sum_{s=1}^5 E_{s, c}^b}$$
- The **Mean Corruption Error (mCE)** aggregates performance across all corruption categories:
  $$\text{mCE} = \frac{1}{|\mathcal{C}|} \sum_{c \in \mathcal{C}} \text{CE}_c^f$$
- Lower mCE values indicate superior generalized robustness to real-world sensory degradation.

> [!Tip]
> **Stress-testing pipelines**: include systematic corruption benchmarks in continuous evaluation pipelines to catch out-of-distribution degradation that clean validation accuracy cannot detect.

## Certified Defense Frameworks and Trade-Offs

### Min-Max Adversarial Training

- Robust optimization reframes empirical risk minimization into a saddle-point **min-max optimization problem**:
  $$\min_\theta \mathbb{E}_{(x, y) \sim \mathcal{D}} \left[ \max_{\delta \in \mathcal{S}} \mathcal{L}(f_\theta(x + \delta), y) \right]$$
- The inner maximization searches for the worst-case adversarial perturbation $\delta$ within constraint set $\mathcal{S}$ using multi-step PGD.
- The outer minimization updates model parameters $\theta$ via standard SGD to minimize the loss evaluated on those worst-case samples.
- Min-max adversarial training produces networks with empirical resilience against first-order attacks, but increases training computational cost roughly five- to ten-fold.

### Certified Robustness via Randomized Smoothing

- Empirical defenses remain susceptible to newer or stronger adaptive attacks, creating a demand for mathematically provable *certified robustness*.
- **Randomized smoothing** transforms an arbitrary base classifier $f$ into a provably robust smoothed classifier $g$ by evaluating expectations under isotropic Gaussian noise:
  $$g(x) = \arg\max_c P_{\epsilon \sim \mathcal{N}(0, \sigma^2 I)}\left(f(x + \epsilon) = c\right)$$
- If the top class probability $p_A$ and runner-up probability $p_B$ satisfy $p_A > p_B$, the smoothed model $g$ is provably robust within an $L_2$ radius $R$:
  $$R = \frac{\sigma}{2} \left( \Phi^{-1}(p_A) - \Phi^{-1}(p_B) \right)$$
  where $\Phi^{-1}$ is the inverse cumulative distribution function of the standard Gaussian distribution.

### The Accuracy-Robustness Trade-Off

- Enhancing adversarial robustness often leads to a drop in clean accuracy on unperturbed test data.
- The **robustness-accuracy dilemma** arises because the Bayes optimal decision boundary for clean distributions can differ substantially from the boundary that maximizes the minimum distance to all training instances.
- Forcing a model to tolerate perturbations expands its decision margins, smoothing out fine-grained discriminative features needed to separate closely adjoining classes in clean space.

> [!Important]
> **The accuracy-robustness trade-off**: optimizing for worst-case adversarial margins pulls decision boundaries away from high-density data regions, often imposing a direct reduction in clean data accuracy.

## Comparative Analysis of Robustness Evaluation Paradigms

| Robustness Paradigm | Perturbation Nature | Evaluation Objective | Mathematical Metric | Computational Cost | Primary Limitation |
|---|---|---|---|---|---|
| **Local Sensitivity Analysis** | Infinitesimal ($\delta \to 0$) | Measure local gradient magnitudes | Jacobian Frobenius Norm ($\|J\|_F$) | Low (Single backward pass) | Fails to capture non-linear jumps beyond local neighborhoods |
| **Empirical Adversarial (FGSM)** | Single-step $L_\infty$ | Evaluate simple gradient-based shifts | Error under FGSM at fixed $\epsilon$ | Low (One forward-backward step) | Susceptible to gradient masking; overestimates true robustness |
| **Iterative Adversarial (PGD)** | Multi-step $L_p$ | Find worst-case empirical perturbation | Robust accuracy under $K$-step PGD | High ($K$ forward-backward loops) | Not mathematically guaranteed; vulnerable to adaptive attacks |
| **Certified Smoothing** | Stochastic Gaussian noise | Prove certified prediction radius | Certified radius $R$ via Neyman-Pearson | High (Monte Carlo sampling $N \ge 10^4$) | High inference latency; restricted primarily to $L_2$ balls |
| **Corruption Testing (mCE)** | Natural transformations | Measure performance under domain shift | Mean Corruption Error relative to baseline | Moderate (Inference across corruption suite) | Evaluates predefined synthetic corruptions rather than open-world shifts |

> [!Tip]
> **Combined robustness auditing**: pair empirical PGD stress-testing with corruption benchmark suites (such as mCE) to evaluate both worst-case adversarial defenses and average-case environmental stability.

## Key Takeaways

- **Input sensitivity measures local fragility**: high Jacobian norms reveal that minor input perturbations produce outsized shifts in output logits.
- **Spectral norm bounds guarantee stability**: bounding the product of layer-wise weight spectral norms restricts the network's global Lipschitz constant, stabilizing representations.
- **Adversarial vulnerability stems from high dimensionality**: small linear perturbations accumulate across wide input dimensions, driving large cumulative logit deviations.
- **PGD provides reliable empirical auditing**: iterative projected gradient attacks bypass gradient masking to establish realistic lower bounds on empirical adversarial accuracy.
- **Distribution shifts degrade uncalibrated models**: covariate, label, and concept shifts alter data geometry, requiring standardized benchmarks like mCE to isolate out-of-distribution drop-offs.
- **Adversarial min-max training hardens decision margins**: training against worst-case perturbations discovered during optimization prevents empirical boundary collapse.
- **Randomized smoothing guarantees certified margins**: adding Gaussian noise to inference inputs provides mathematically provable $L_2$ robustness radii via order statistics.
- **Robustness incurs clean accuracy penalties**: enlarging safety margins around decision boundaries frequently sacrifices fine-grained discriminative capacity on uncorrupted samples.

> [!Important]
> **Comprehensive safety audits require diverse metrics**: measuring model health exclusively on clean validation data hides severe operational fragilities; production deployment demands auditing local sensitivity, adversarial vulnerability, and environmental corruption resilience simultaneously.
