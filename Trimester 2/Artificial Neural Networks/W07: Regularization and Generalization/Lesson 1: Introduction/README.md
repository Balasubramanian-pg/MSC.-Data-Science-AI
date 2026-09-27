# Migration in progress
# Lesson 1: Introduction

## Introduction to Regularization and Generalization

Training deep neural networks involves two distinct mathematical objectives: minimizing empirical loss on training observations and maintaining predictive accuracy on unseen data. Because modern architectures contain far more parameters than available training instances, unconstrained models can memorize sample noise and output degenerate predictions. Regularization encompasses the mathematical modifications, structural constraints, and algorithmic interventions designed to reduce generalization error without degrading training convergence.

## The Generalization Imperative in Deep Learning

### Optimization Versus Generalization Goals

- **Optimization** focuses on minimizing empirical loss over an observed dataset: $\min_\theta \mathcal{R}_{\text{emp}}(\theta)$.
- **Generalization** measures how well the learned parameter configuration $\theta^*$ predicts targets on unseen data drawn from the true underlying data-generating distribution $P_{\text{data}}$.
- Driving training error to absolute zero often degrades real-world test performance because models fit non-generalizable sample noise, label errors, and spurious correlations.
- The objective of machine learning is finding a parameter configuration that achieves low generalization error, treating empirical loss minimization as an intermediate proxy.

### Defining Regularization Conceptually

- Formulated by Ian Goodfellow, Yoshua Bengio, and Aaron Courville (2016), **regularization** is defined as *any modification made to a learning algorithm intended to reduce its generalization error but not its training error*.
- Regularization methods restrict a model's effective hypothesis space, penalize parameter complexity, or inject stochastic noise into activations during training.
- These constraints encode inductive biases that favor simpler, smoother, and more stable functions over complex, highly oscillatory boundaries.

### Empirical Risk, True Risk, and the Generalization Gap

- The **true risk** (expected generalization loss) evaluates the expected loss over the full data distribution $P_{\text{data}}(x, y)$:
  $$R_{\text{true}}(\theta) = \mathbb{E}_{(x, y) \sim P_{\text{data}}} [\mathcal{L}(f(x; \theta), y)]$$
- The **empirical risk** averages the loss over an observed training dataset of $N$ instances:
  $$R_{\text{emp}}(\theta) = \frac{1}{N} \sum_{i=1}^N \mathcal{L}(f(x^{(i)}; \theta), y^{(i)})$$
- The difference between true risk and empirical risk defines the **generalization gap**:
  $$\Delta_{\text{gen}}(\theta) = R_{\text{true}}(\theta) - R_{\text{emp}}(\theta)$$
- Regularization strategies aim to minimize the generalization gap while keeping empirical risk at an acceptable operational level.

> [!Tip]
> **Regularization targets the generalization gap**: while optimization algorithms minimize empirical training loss, regularization methods minimize the difference between training performance and real-world evaluation error.

## The Classical Bias-Variance Framework

### Bias, Variance, and Irreducible Noise Components

- For continuous regression tasks using squared error, the expected test error decomposes into three additive statistical quantities:
  $$\mathbb{E}[(y - \hat{f}(x))^2] = \text{Bias}[\hat{f}(x)]^2 + \text{Var}(\hat{f}(x)) + \sigma_{\text{noise}}^2$$
- **Bias ($\mathbb{E}[\hat{f}(x)] - y$):** Reflects the mismatch between model capacity and true data complexity; high bias leads to **underfitting**, where the model cannot capture essential patterns.
- **Variance ($\mathbb{E}[(\hat{f}(x) - \mathbb{E}[\hat{f}(x)])^2]$):** Quantifies parameter sensitivity to random variations in training subsets; high variance leads to **overfitting**, where predictions fluctuate based on sample noise.
- **Irreducible Error ($\sigma_{\text{noise}}^2$):** Represents noise intrinsic to the data distribution that cannot be removed by model improvements.

### The Capacity Spectrum: Underfitting to Overfitting

- **Underfitting:** Occurs when model capacity is too restrictive (e.g., fitting a linear model to a periodic function), resulting in high training error and high test error.
- **Optimal Capacity:** Balances capacity and constraint, minimizing overall generalization error where bias and variance contributions intersect.
- **Overfitting:** Occurs when excessive model capacity allows parameters to fit random training noise, resulting in near-zero training error but high test error.

### Validation Learning Curves as Diagnostic Signatures

- Tracking **training loss** and **validation loss** over training epochs reveals model health:
  - **Healthy Convergence:** Both curves descend steadily, plateauing close together with a narrow generalization gap.
  - **Overfitting Divergence:** Training loss descends toward zero while validation loss reverses direction and increases, indicating memorization of training instances.
  - **Underfitting Stagnation:** Both training and validation curves plateau early at high loss values, indicating insufficient capacity or excessive regularization constraints.

> [!Important]
> **Learning curve divergences diagnose overfitting**: when training loss continues declining while validation error climbs, model capacity exceeds task constraints, requiring immediate regularization.

## Taxonomy of Regularization Paradigms

### Parameter Penalty Formulations

- **Explicit norm penalties** augment the objective loss function with a cost that penalizes parameter complexity:
  $$\mathcal{L}_{\te