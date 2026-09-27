# Migration in progress
# Lesson 1: Introduction

## Introduction to Optimization Algorithms in Deep Learning

While backpropagation evaluates the exact gradient of a loss function across computational graphs, optimization algorithms determine how those gradient vectors guide parameter updates. Training a deep neural network requires navigating complex, high-dimensional error surfaces characterized by non-convexity, saddle points, and ill-conditioned ravines. Establishing the theoretical differences between pure mathematical optimization and machine learning generalization, alongside classifying zero-, first-, and second-order methods, frames the evolutionary necessity of modern adaptive optimizers.

## The Machine Learning Optimization Paradigm

### Empirical Risk Minimization as an Optimization Proxy

- Mathematical optimization seeks parameter configurations $\theta^*$ that minimize a direct objective function: $\min_\theta f(\theta)$.
- In machine learning, the true objective is minimizing the **expected risk** over the underlying data-generating distribution $P_{\text{data}}$:
  $$\mathcal{R}(\theta) = \mathbb{E}_{(x, y) \sim P_{\text{data}}} [\mathcal{L}(f(x; \theta), y)]$$
- Because the true data distribution $P_{\text{data}}$ is unobservable, learning algorithms optimize an empirical proxy known as **Empirical Risk Minimization (ERM)** over a finite dataset of $N$ samples:
  $$\mathcal{R}_{\text{emp}}(\theta) = \frac{1}{N} \sum_{i=1}^N \mathcal{L}(f(x^{(i)}; \theta), y^{(i)})$$
- Optimization in deep learning serves as a proxy for **generalization performance**, meaning driving training loss to absolute zero can harm real-world test performance through overfitting.

### Pure Optimization Versus Generalization Risk

- Pure mathematical optimization terminates only when the gradient norm reaches machine zero ($\|\nabla_\theta \mathcal{L}\| \to 0$) or satisfies formal Karush-Kuhn-Tucker (KKT) conditions.
- Deep learning optimizers prioritize finding parameter regions with high **generalization capacity** over finding exact numerical global minima of the empirical training loss.
- The optimization trajectory itself acts as an **implicit regularizer**: early stopping, learning rate choices, and stochastic sampling noise influence which basin of attraction the model settles into.

### Non-Convex Complexity in High Dimensions

- Classical convex optimization guarantees that every local minimum is a global minimum, allowing second-order methods or line searches to converge quickly.
- Deep neural network error surfaces are highly **non-convex**, possessing combinatorial numbers of saddle points, local plateaus, and degenerate valleys.
- Over-parameterization ($P \gg N$) creates continuous manifolds of equivalent zero-loss solutions, turning the optimization challenge from finding *a* minimum into finding a *well-generalizing* minimum.

> [!Tip]
> **Optimization serves generalization**: unlike classical optimization which seeks exact numerical minima, deep learning uses optimization as a proxy to discover broad parameter basins that generalize well to unseen data.

## Taxonomy of Optimization Methods

### Zero-Order (Derivative-Free) Methods

- **Zero-order optimization** evaluates only the scalar function values $\mathcal{L}(\theta)$ without calculating derivatives.
- Techniques include **random search**, **evolutionary algorithms**, **genetic algorithms**, and **Nelder-Mead simplex search**.
- Estimating update directions in a $P$-dimensional parameter space requires sampling at least $O(P)$ directional perturbations per step.
- For deep networks with millions or billions of parameters ($P > 10^7$), zero-order methods become computationally intractable due to the curse of dimensionality, restricting their use to non-differentiable hyperparameter tuning or black-box reinforcement learning.

### First-Order (Gradient-Based) Methods

- **First-order optimization** uses the first partial derivatives of the loss function with respect to parameters: $g = \nabla_\theta \mathcal{L}(\theta)$.
- These methods evaluate the local direction of steepest ascent, moving parameters in the opposite direction: $\theta \leftarrow \theta - \eta g$.
- First-order methods form the computational backbone of deep learning because reverse-mode automatic differentiation calculates the full gradient vector in time proportional to a single forward pass.
- Standard first-order methods evaluate only the local slope, remaining unaware of local curvature (the rate of change of the gradient).

### Second-Order (Curvature-Based) Methods

- **Second-Order optimization** incorporates second derivatives via the **Hessian matrix** $H \in \mathbb{R}^{P \times P}$ to rescale parameter steps by local surface curvature.
- The classical **Newton-Raphson update** scales updates by the inverse Hessian: $\theta \leftarrow \theta - H^{-1} \nabla_\theta \mathcal{L}$.
- Incorporating curvature allows second-order methods to take direct steps toward the minimum of quadratic bowls without oscillating across narrow valleys.
- The $O(P^2)$ memory required to store the Hessian and the $O(P^3)$ computation required to invert it make exact second-order optimization impossible for modern deep architectures.

> [!Important]
> **First-order methods dominate deep learning**: because computing exact Hessians scales cubically with parameter count ($O(P^3)$), first-order gradient methods computed via backpropagation represent the only computationally viable approach for deep networks.

## The Evolutionary Trajectory of First-Order Solvers

### Classical Descent and Stochastic Approximations

- Augustin-Louis Cauchy introduced gradient descent in 1847, formulating deterministic descent steps across full datasets.
- Herbert Robbins and Sutton Monro (1951) introduced the **Stochastic Approximation** framework, proving that evaluating noisy gradient estimates over individual samples can converge to the minimum under decaying step sizes.
- Mini-batch stochastic gradient descent became the standard for modern deep learning by balancing parallel GPU tensor hardware with stochastic gradient noise.

### The Momentum Era: Overcoming Ravines and Noise

- Standard SGD makes slow progress when navigating ill-conditioned valleys where cross-valley gradients oscillate while forward-progress gradients remain small.
- Boris Polyak (1964) introduced the **Heavy Ball (Momentum)** method, modeling optimization as a physical mass rolling down an error surface to dampen oscillations and accelerate descent.
- Yurii Nesterov (1983) refined this with **Neste