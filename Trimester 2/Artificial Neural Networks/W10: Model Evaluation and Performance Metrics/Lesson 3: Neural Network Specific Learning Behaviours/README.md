# Migration in progress
# Lesson 3: Neural Network Specific Learning Behaviours

Neural networks exhibit non-classical optimization and generalization phenomena that diverge fundamentally from traditional statistical learning theory. Behaviors such as benign overfitting, the double descent curve, spectral bias, and grokking reveal how deep architectures navigate high-dimensional parameter spaces. Evaluating modern deep models requires tracking these non-linear learning dynamics to distinguish brute-force memorization from robust feature representation.

## The Double Descent Phenomenon and Modern Generalization

### Breakdown of the Classical U-Shaped Risk Curve

- Classical learning theory posits a strict **bias-variance trade-off**: increasing model complexity reduces bias but causes variance to explode, producing a U-shaped validation error curve with an optimal intermediate capacity.
- Deep neural networks violate this classical assumption by operating in an **overparameterized regime** where the number of parameters $p$ vastly exceeds the number of training samples $n$ ($p \gg n$), yet validation error steadily improves.
- The transition between regimes defines the **double descent curve**, which separates learning behavior into three distinct zones:
  - **Underparameterized Zone ($p < n$):** Classical bias reduction dominates; increasing parameters improves both training and test performance.
  - **The Interpolation Threshold ($p \approx n$):** The network has just enough parameters to achieve zero training error; parameter choices become severely constrained, forcing the model to fit noisy labels with high-norm weights that cause test risk to spike drastically.
  - **Overparameterized Zone ($p \gg n$):** Multiple zero-loss interpolating solutions exist; gradient descent selects the interpolator with the minimum parameter norm, smoothing the function and causing test error to decrease systematically.

### Epoch-Wise and Sample-Wise Double Descent

- **Epoch-wise double descent** occurs during training time at fixed model capacity: test error decreases, rises near the point where the network interpolates the training set, and subsequently declines again as optimization continues.
- **Sample-wise double descent** appears when varying the training dataset size $n$: test risk peaks when $n$ approaches model parameter capacity $p$, demonstrating that intermediate data volumes can temporarily yield worse generalization than smaller subsets.
- *Benign overfitting* characterizes this overparameterized state, where networks interpolate noisy training labels completely without degrading generalization on unseen distributions.

> [!Important]
> **Interpolation risk peaks**: peak validation error occurs precisely at the interpolation boundary where model capacity matches dataset size, requiring practitioners to push deep networks far beyond this threshold into the overparameterized regime.

## Spectral Bias and the Frequency Principle

### Priority of Low-Frequency Function Approximation

- Deep neural networks exhibit **spectral bias** (also termed the *Frequency Principle* or *F-Principle*): gradient descent fits low-frequency, smooth spatial components of a target function before capturing high-frequency variations.
- In Fourier frequency decomposition, lower spectral frequencies correspond to broad, generalized topological boundaries, whereas high frequencies correspond to fine-grained variations or empirical label noise.
- Early training epochs act as an *implicit low-pass filter*, capturing coarse underlying class geometries while remaining impervious to high-frequency perturbations.
- High-frequency patterns require substantially more optimization epochs to resolve, meaning that label noise is fitted only late in the training trajectory.

### Implications for Early Stopping and Regularization

- **Early stopping** exploits spectral bias by halting optimization after low-frequency target structures converge but before the network begins learning high-frequency noise.
- Architectures with standard activation functions (such as ReLU) exhibit an exponential decay in convergence speed for high-frequency Fourier modes, requiring architectural interventions (such as Fourier features or Sinusoidal representations) when high-frequency modeling is explicitly desired.

> [!Tip]
> **Early stopping mechanism**: stopping training based on validation plateaus preserves low-frequency generalizable features while preventing gradient descent from fitting destructive high-frequency noise.

## Implicit Regularization and Minimum-Norm Selection

### Inductive Bias of First-Order Optimizers

- In overparameterized regimes, the empirical loss objective possesses an infinite manifold of global minima achieving exact zero loss ($\mathcal{L}(\theta) = 0$).
- Standard Stochastic Gradient Descent (SGD) does not sample randomly from this zero-loss manifold; it provides an **implicit regularization** (or *implicit bias*) that directs parameters toward solutions with minimal structural complexity.
- In overparameterized linear models, gradient descent initialized at zero converges provably to the **minimum $L_2$-norm interpolator**:
  $$\min_\theta \|\theta\|_2 \quad \text{subject to} \quad X\theta = y$$
- For separable classification under cross-entropy loss, gradient descent drives parameter vectors in direction toward the **maximum-margin decision boundary**, mirroring the geometric margin maximization of hard-margin Support Vector Machines without explicit constraints.

### Flat Versus Sharp Minima Dynamics

- The local curvature of the loss surface at convergence dictates generalization stability, quantified by the **Hessian matrix** of second-order loss derivatives:
  $$H = \nabla^2 \mathcal{L}(\theta)$$
- **Sharp minima** feature large eigenvalues in the Hessian matrix ($\lambda_{\max}(H) \gg 0$), indicating steep loss ravines where minute distribution shifts between training and test distributions produce massive error spikes.
- **Flat minima** feature low Hessian eigenvalues across wide parame