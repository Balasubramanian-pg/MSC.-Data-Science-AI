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
- **Flat minima** feature low Hessian eigenvalues across wide parameter basins, ensuring that test-set distribution shifts cause minimal degradation in empirical loss.
- Mini-batch gradient noise acts as an implicit regularizer: larger batch sizes drive parameters into sharp minima, whereas smaller batch sizes generate stochastic noise that bounces optimization trajectories out of sharp ravines into flatter basins.

> [!Tip]
> **Batch size selection**: small to moderate mini-batch sizes introduce gradient variance that steers optimization away from sharp, poorly generalizing loss ravines toward flat parameter basins.

## Memorization, Random Labels, and Representation Grokking

### The Random Label Test and Classical Bounds Failure

- Classical learning theory relies on uniform convergence metrics, such as **Vapnik-Chervonenkis (VC) Dimension** and **Rademacher Complexity**, to bound generalization error based on model capacity.
- Deep neural networks completely shatter these theoretical bounds: an overparameterized network can achieve $100\%$ training accuracy on image datasets where the labels are replaced with completely random permutations.
- While the network possesses the raw representational capacity to memorize arbitrary random noise, the *learning dynamics* differ fundamentally:
  - Training on true labels converges rapidly because the architecture exploits structured spatial dependencies.
  - Training on random labels requires orders of magnitude more gradient steps, indicating that gradient descent prioritizes natural patterns over rote memorization.

### The Grokking Phenomenon

- **Grokking** describes a distinct optimization dynamic where test generalization occurs thousands of epochs *after* the network achieves near-zero training error.
- During the initial training phase, the network fits training data entirely through complex, high-norm memorization circuits, causing validation accuracy to remain near random chance.
- Under continued optimization with explicit weight decay ($L_2$ regularization), the optimizer executes a delayed *phase transition*: high-norm memorizing weights decay, forcing the network to discover compact, low-norm generalizing circuits.
- Grokking appears prominently in symbolic, algorithmic, and modular arithmetic tasks, proving that long plateaus in validation accuracy do not necessarily denote ultimate model failure.

> [!Important]
> **Delayed generalization dynamics**: prolonged plateaus in validation metrics during algorithmic tasks do not guarantee optimization deadlocks, as $L_2$ regularization can trigger sudden phase transitions from memorization to generalized solutions.

## Comparative Dynamics of Neural Learning Phenomena

| Learning Phenomenon | Underlying Mechanism | Behavior on Training Metrics | Behavior on Validation Metrics | Impact on Evaluation Protocol |
|---|---|---|---|---|
| **Classical Overfitting** | Excessive capacity fits noise in underparameterized setting | Monotonically approaches zero | U-shaped curve; diverges rapidly past capacity minimum | Identifies optimal stopping point at the validation minimum |
| **Double Descent** | Transition from constrained to unconstrained interpolation | Monotonically approaches zero; hits zero at interpolation threshold | Spikes at $p \approx n$, then decreases systematically as $p \gg n$ | Avoids intermediate parameter scales near the interpolation threshold |
| **Spectral Bias** | Low-frequency Fourier modes converge before high frequencies | Fits smooth macro-patterns early, noise and high frequencies late | Generalizes well early; decays only after high frequencies fit | Leverages early stopping as a structural low-pass regularization filter |
| **Grokking** | Regularization compresses high-norm memorization into minimal circuits | Plunges to zero almost immediately; stays flat | Stagnates at chance level for thousands of epochs before jumping to near $100\%$ | Demands extended training horizons beyond initial loss convergence |
| **Sharp Minima Traps** | Large batch sizes or high learning rates freeze in steep ravines | Drives loss to near-zero with minimal gradient variance | High generalization error and sensitivity to covariate shifts | Requires tracking Hessian spectral norms or loss landscape sharpness |

> [!Tip]
> **Evaluation horizon extension**: evaluate modern overparameterized models across extended epoch horizons to verify whether validation plateaus represent permanent capacity barriers or transient memorization phases prior to grokking.

## Key Takeaways

- **Overparameterization alters risk dynamics**: neural networks bypass the classical bias-variance limit, achieving optimal generalization in overparameterized regimes far past the interpolation threshold.
- **The interpolation threshold represents peak risk**: validation error surges when model parameter capacity precisely matches dataset scale due to parameter instability.
- **Spectral bias prioritizes low frequencies**: gradient descent learns smooth, generalized target structures during early epochs before attempting to fit high-frequency details.
- **SGD provides implicit regularizing pressure**: first-order optimization naturally selects interpolators with minimal norms and maximal geometric margins without explicit penalties.
- **Flat minima ensure generalization stability**: broad, low-curvature parameter basins tolerate test distribution shifts far better than narrow, sharp loss ravines.
- **Memorization requires higher optimization effort**: while deep networks can memorize completely randomized labels, structured natural data converges far faster.
- **Grokking reveals delayed generalization phases**: networks can maintain zero training loss for thousands of iterations before weight decay forces a phase transition into generalized algorithmic circuits.

> [!Important]
> **Non-classical validation requirements**: evaluating deep networks requires moving beyond static error metrics to assess learning trajectories, loss surface curvature, and parameter norms, ensuring models leverage inductive biases rather than brute-force memorization.
