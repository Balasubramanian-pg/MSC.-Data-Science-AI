# Migration in progress
# Lesson 3: Core Regularization Methods

## Core Regularization Methods in Deep Learning

Regularization techniques provide the mathematical and algorithmic mechanisms required to prevent over-parameterized neural networks from memorizing sample noise. By penalizing model complexity, injecting stochastic noise into layer activations, constraining optimization time horizons, and synthesizing transformed inputs, regularization enforces smooth decision boundaries that generalize to unseen data distributions. Examining the analytical derivations, operational mechanics, and architectural trade-offs of these core methods establishes the technical playbook for controlling model capacity.

## Explicit Parameter Norm Penalties

### L2 Regularization and Multiplicative Weight Shrinkage

- **$L_2$ regularization** (weight decay / Ridge penalty) modifies the objective loss function by adding a quadratic penalty on the squared Euclidean norm of the weight tensors:
  $$\tilde{\mathcal{L}}(\theta; X, y) = \mathcal{L}(\theta; X, y) + \frac{\alpha}{2} \|w\|_2^2 = \mathcal{L}(\theta; X, y) + \frac{\alpha}{2} w^T w$$
  where $\alpha > 0$ denotes the regularization strength hyperparameter, and $w$ encompasses all kernel weights while strictly excluding bias parameters.
- Evaluating the gradient with respect to the weight vector yields:
  $$\nabla_w \tilde{\mathcal{L}} = \nabla_w \mathcal{L} + \alpha w$$
- Executing a standard gradient descent update step demonstrates the **multiplicative shrinkage** dynamic:
  $$w_{t+1} = w_t - \eta \left( \nabla_w \mathcal{L}(w_t) + \alpha w_t \right) = (1 - \eta \alpha) w_t - \eta \nabla_w \mathcal{L}(w_t)$$
- Prior to updating parameters along the negative empirical gradient ($-\eta \nabla_w \mathcal{L}$), the weight vector is shrunk by multiplying by a factor strictly less than one: $(1 - \eta \alpha) < 1$.

### Hessian Eigenvalue Contraction under L2 Constraints

- Approximating the objective loss locally with a quadratic Taylor expansion centered at the unregularized minimum $w^*$ reveals how $L_2$ penalties alter parameter coordinates:
  $$\hat{\mathcal{L}}(w) \approx \mathcal{L}(w^*) + \frac{1}{2} (w - w^*)^T H (w - w^*)$$
  where $H$ represents the Hessian matrix evaluated at $w^*$.
- Adding the $L_2$ regularization penalty and setting the gradient of the quadratic approximation to zero yields:
  $$\nabla_w \tilde{\mathcal{L}} = H(w - w^*) + \alpha w = 0 \implies (H + \alpha I) w = H w^* \implies \tilde{w} = (H + \alpha I)^{-1} H w^*$$
- Decomposing the real symmetric Hessian into its orthogonal eigenvectors $Q$ and diagonal eigenvalues $\Lambda$ ($H = Q \Lambda Q^T$) isolates the coordinate contraction:
  $$\tilde{w} = Q (\Lambda + \alpha I)^{-1} \Lambda Q^T w^*$$
- Expressed along individual eigenvector directions $v_i$, each weight coordinate rescales according to its local curvature eigenvalue $\lambda_i$:
  $$\tilde{w}_i = \left( \frac{\lambda_i}{\lambda_i + \alpha} \right) w_i^*$$
- **High-Curvature Directions ($\lambda_i \gg \alpha$):** The shrinkage factor $\frac{\lambda_i}{\lambda_i + \alpha} \approx 1$, meaning weights that align with strong directional signals and steep loss walls remain largely unconstrained.
- **Low-Curvature Directions ($\lambda_i \ll \alpha$):** The shrinkage factor $\frac{\lambda_i}{\lambda_i + \alpha} \to 0$, shrinking weights that align with flat, uninformative directions toward zero to prevent fitting sample noise.

### L1 Regularization and Exact Coordinate Sparsity

- **$L_1$ regularization** (Lasso) penalizes the sum of the absolute values of the individual weight parameters:
  $$\tilde{\mathcal{L}}(\theta; X, y) = \mathcal{L}(\theta; X, y) + \alpha \|w\|_1 = \mathcal{L}(\theta; X, y) + \alpha \sum_j |w_j|$$
- The gradient update uses the subgradient of the absolute value function:
  $$\nabla_w \tilde{\mathcal{L}} = \nabla_w \mathcal{L} + \alpha \, \text{sgn}(w)$$
  $$w_{t+1} = w_t - \eta \nabla_w \mathcal{L}(w_t) - \eta \alpha \, \text{sgn}(w_t)$$
- While $L_2$ shrinkage scales proportionally with the current weight magnitude, $L_1$ regularization subtracts a constant scalar quantity ($\eta \alpha$) regardless of parameter size.
- If a parameter's magnitude falls below the threshold $|w_j| \le \eta \alpha$ while its empirical gradient is small, the update drives the coordinate to **exact zero** ($w_j = 0$).
- $L_1$ regularization performs automated **feature selection**, producing sparse weight matrices that reduce memory footprints and isolate dominant input signals.

### Why Bias Terms are Excluded from Norm Penalties

- Regularization penalties are applied strictly to synaptic weight matrices ($W^{[l]}$) and omitted from bias vectors ($b^{[l]}$).
- An individual weight governs the multiplicative relationship between two features or neurons, controlling boundary orientation and sensitivity to input variance.
- A bias parameter controls the spatial translation (intercept) of the decision hyperplane, determining the baseline activation threshold independent of feature scale.
- Penalizing the bias introduces high statistical bias without reducing model variance, restricting the network from shifting its coordinate origin to fit class imbalances.

> [!Important]
> **Norm penalties act as curvature filters**: $L_2$ regularization rescales weights based on Hessian eigenvalues, shrinking parameters along flat noise directions while preserving strong signals, whereas $L_1$ drives uninformative weights to exact zero.

## Stochastic Regularization: Dropout Mechanics

### Breaking Complex Co-Adaptations

- In unregularized deep networks, neurons often develop **co-adaptations**, where a hidden unit learns to correct for the specific errors or quirks of its neighboring units rather than extracting general features.
- Proposed by Nitish Srivastava et al. (2014), **Dropout** injects stochastic Bernoulli noise into hidden representations during the forward pass.
- For each forward pass, each hidden neuron's activation is independently muted with probability $1 - p$, where $p \in (0, 1]$ represents the **retention probability**:
  $$r_j \sim \text{Bernoulli}(p)$$
  $$\tilde{a}_j = r_j \cdot a_j$$
- Because a neuron cannot predict which companion units will remain active on any given forward pass, it must extract robust, independent features that perform reliably across random contexts.

### Inverted Dropout Formulation

- In standard dropout, muting neurons with probability $1 - p$ reduces the expected total activation sum during training by a factor of $p$:
  $$\mathbb{E}[\tilde{a}] = p \cdot a$$
- Standard dropout requires multiplying weights by $p$ at inference time ($W_{\text{eval}} = p \cdot W$) to align activation scales between training and evaluation, creating engineering friction in deployment pipelines.
- Modern frameworks implement **Inverted Dropout**, scaling active activations upward by $\frac{1}{p}$ during the training phase:
  $$\tilde{a} = \frac{r \odot a}{p}, \quad r_j \sim \text{Bernoulli}(p)$$
- The expectation of the inverted dropout activation matches the unmasked activation:
  $$\mathbb{E}[\tilde{a}] = \frac{1}{p} \mathbb{E}[r \odot a] = \frac{1}{p} (p \cdot a) = a$$
- Inverted dropout ensures that the forward pass during evaluation runs unmasked without runtime scaling, reducing inference latency and simplifying graph serialization.

### The Ensemble Averaging Interpretation

- An $n$-neuron layer regularized with dropout contains $2^n$ possible binary masking configurations, corresponding to $2^n$ distinct sub-networks that share underlying weight tensors.
- Training with dropout samples a different sub-network on each mini-batch step, applying localized weight updates across the shared parameter base.
- At inference time, executing a single forward pass through the unmasked network with scaled weights approximates the **geometric mean** of the predictive distributions produced by all $2^n$ sub-architectures:
  $$P_{\text{ensemble}}(y \mid x) \propto \left( \prod_{k=1}^{2^n} P(y \mid x; \text{mask}_k) \right)^{\frac{1}{2^n}}$$
- Dropout functions as a computationally efficient ensemble method, combining the regularization benefits of thousands of models without storing multiple weight checkpoints.

### The Dropout and Batch Normalization Interaction

- Combining Dropout and Batch Normalization within the same architecture can induce training instability, known as the **variance shift conflict**.
- Dropout alters activation variance between training (where elements are zeroed out and rescaled) and inference (where all units fire continuously).
- Batch Normalization computes running population variance statistics during training; introducing dropout-induced variance fluctuations causes inference population statistics to diverge from true layer distributions.
- When pairing both techniques, modern architectures place Dropout after Batch Normalization ($\text{Dense} \to \text{BatchNorm} \to \text{Activation} \to \text{Dropout}$) or replace Dropout with weight decay and data augmentation in convolutional backbones.

> [!Tip]
> **Inverted dropout simplifies inference pipelines**: dividing active activations by $p$ during training keeps output magnitudes balanced, allowing evaluation to run