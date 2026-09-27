# Migration in progress
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
- Performance d