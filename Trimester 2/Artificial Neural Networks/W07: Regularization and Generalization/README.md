# Migration in progress
# W07: Regularization and Generalization

## Regularization and Generalization in Deep Neural Networks

Deep neural networks possess millions or billions of parameters, granting them the capacity to memorize arbitrary patterns, noise, and labels. The primary objective of machine learning is not minimizing training error, but achieving low error on unseen data drawn from the true data-generating distribution. Regularization encompasses all modifications made to a learning algorithm intended to reduce generalization error without necessarily reducing training error. Understanding statistical learning bounds, explicit norm penalties, stochastic transformations, and implicit optimization biases equips engineers to constrain model capacity and ensure robust real-world performance.

## The Generalization Problem and Statistical Learning Theory

### Empirical Risk Versus True Risk

- In supervised learning, the ultimate objective is minimizing the **true risk** (expected generalization loss) over the joint data-generating distribution $P_{\text{data}}(x, y)$:
  $$R_{\text{true}}(\theta) = \mathbb{E}_{(x, y) \sim P_{\text{data}}} [\mathcal{L}(f(x; \theta), y)] = \int \mathcal{L}(f(x; \theta), y) \, dP(x, y)$$
- Because the true distribution $P_{\text{data}}$ is unobservable, learning algorithms minimize the **empirical risk** calculated over an observed training set of $N$ samples:
  $$R_{\text{emp}}(\theta) = \frac{1}{N} \sum_{i=1}^N \mathcal{L}(f(x^{(i)}; \theta), y^{(i)})$$
- The difference between true risk and empirical risk defines the **generalization gap**:
  $$\Delta_{\text{gen}}(\theta) = R_{\text{true}}(\theta) - R_{\text{emp}}(\theta)$$
- **Overfitting** occurs when an over-parameterized model drives empirical risk $R_{\text{emp}}$ to zero while the generalization gap $\Delta_{\text{gen}}$ diverges, causing poor performance on test distributions.

### The Classical Bias-Variance Decomposition

- For quadratic loss functions, the expected prediction error on an unseen sample $x$ decomposes into three distinct statistical components:
  $$\mathbb{E}[(y - \hat{f}(x))^2] = \text{Bias}[\hat{f}(x)]^2 + \text{Var}(\hat{f}(x)) + \sigma_{\text{irreducible}}^2$$
- **Bias ($\text{Bias}[\hat{f}(x)] = \mathbb{E}[\hat{f}(x)] - y$):** Quantifies systematic error introduced by incorrect model assumptions; high bias produces **underfitting**, where the model fails to capture underlying data structure.
- **Variance ($\text{Var}(\hat{f}(x)) = \mathbb{E}[(\hat{f}(x) - \mathbb{E}[\hat{f}(x)])^2]$):** Measures model sensitivity to small fluctuations in the training set; high variance produces **overfitting**, where parameters fit idiosyncratic sample noise.
- **Irreducible Error ($\sigma_{\text{irreducible}}^2$):** Represents the intrinsic noise present in the data generation process, establishing a theoretical lower bound on performance.
- Classical statistical learning theory dictates a strict trade-off: increasing model capacity reduces bias while increasing variance, producing a U-shaped validation error curve.

### The Modern Double Descent Phenomenon

- Deep over-parameterized networks challenge the classical U-curve through the **Double Descent** phenomenon (Mikhail Belkin et al., 2019).
- The learning curve divides into two distinct regimes separated by the **interpolation threshold**:
  - **Under-Parameterized Regime ($P < N$):** Classical behavior applies; validation loss decreases to a minimum, then rises steeply as capacity approaches the sample count $N$.
  - **Interpolation Threshold ($P \approx N$):** The model has just enough capacity to fit the training set exactly ($R_{\text{emp}} = 0$); test error peaks because parameters are forced into extreme, unstable configurations to interpolate noisy points.
  - **Over-Parameterized Regime ($P \gg N$):** As parameters exceed sample counts, test risk drops again, forming a second descent toward low generalization error.
- In the over-parameterized regime, continuous optimization algorithms (like SGD) exhibit **implicit regularization**, selecting the minimum-norm interpolating solution that maintains smooth decision boundaries (**benign overfitting**).

> [!Tip]
> **Modern over-parameterization escapes the classical bias-variance tradeoff**: beyond the interpolation threshold where parameters exceed sample counts, excess capacity allows models to interpolate training data while maintaining smooth, generalizing functions.

## Explicit Norm Penalties: L1, L2, and Weight Decay

### L2 Regularization (Weight Decay) and Hessian Rescaling

- **$L_2$ regularization** (Ridge regression / Tikhonov regularization) adds a quadratic penalty proportional to the squared Euclidean norm of the weight vector to the loss:
  $$\mathcal{L}_{\text{total}}(\theta) = \mathcal{L}(\theta) + \frac{\lambda}{2} \|w\|_2^2 = \mathcal{L}(\theta) + \frac{\lambda}{2} \sum_j w_j^2$$
  where $\lambda > 0$ is the regularization strength, and bias terms are excluded to avoid restricting coordinate translation.
- Differentiating with respect to $w$ yields the analytical gradient update:
  $$w_{t+1} = w_t - \eta \left( \nabla_w \mathcal{L}(w_t) + \lambda w_t \right) = (1 - \eta \lambda) w_t - \eta \nabla_w \mathcal{L}(w_t)$$
- The coefficient $(1 - \eta \lambda)$ acts as a **multiplicative shrinkage factor**, decaying weight magnitudes toward zero on every iteration prior to applying the gradient step.
- Analyzing $L_2$ regularization through a quadratic approximation of the loss reveals its impact on the eigenvectors of the Hessian matrix $H$:
  $$\tilde{w}_i = \frac{\sigma_i}{\sigma_i + \lambda} w_i^*$$
  where $\sigma_i$ is the eigenvalue of the Hessian along eigenvector $v_i$, and $w^*$ is the unregularized minimum.
- Along directions of **high curvature** ($\sigma_i \gg \lambda$), $\frac{\sigma_i}{\sigma_i + \lambda} \approx 1$, leaving parameters largely unconstrained.
- Along directions of **low curvature** ($\sigma_i \ll \lambda$), $\frac{\sigma_i}{\sigma_i + \lambda} \approx 0$, shrinking parameters toward zero to prevent the model from fitting noise along flat axes.

### L1 Regularization and Parameter Sparsity

- **$L_1$ regularization** (Lasso) penalizes the sum of the absolute values of the weight coordinates:
  $$\mathcal{L}_{\text{total}}(\theta) = \mathcal{L}(\theta) + \lambda \|w\|_1 = \mathcal{L}(\theta) + \lambda \sum_j |w_j|$$
- The gradient update evaluates using the subgradient of the absolute value function:
  $$w_{t+1} = w_t - \eta \nabla_w \mathcal{L}(w_t) - \eta \lambda \text{sgn}(w_t)$$
- Unlike $L_2$ shrinkage, which scales proportionally with weight magnitude, $L_1$ subtracts a constant scalar $\eta \lambda$ regardless of parameter size.
- This constant deduction drives parameters with small gradients to **exact zero**, producing **sparse weight representations** that perform automated feature selection.

### Probabilistic Foundations: MAP Estimation and Priors

- Norm penalties correspond directly to **Maximum A Posteriori (MAP)** parameter estimation under specific Bayesian prior distributions:
  $$\theta_{\text{MAP}} = \arg\max_\theta \sum_{i=1}^N \ln P(y^{(i)} \mid x^{(i)}; \theta) + \ln P(\theta)$$
- **Gaussian Prior $\to L_2$ Regularization:** Assuming a zero-mean isotropic Gaussian prior $w \sim \mathcal{N}(0, \sigma^2 I)$ yields $\ln P(w) \propto -\frac{1}{2\sigma^2} \|w\|_2^2$, making weight decay mathematically equivalent to MAP estimation with $\lambda = \frac{1}{\sigma^2}$.
- **Laplace Prior $\to L_1$ Regularization:** Assuming an independent zero-mean Laplace prior $w_j \sim \text{Laplace}(0, b)$ yields $\ln P(w) \propto -\frac{1}{b} \|w\|_1$, making $L_1$ penalty equivalent to MAP estimation with $\lambda = \frac{1}{b}$.

> [!Important]
> **Norm penalties reflect Bayesian priors**: $L_2$ regularization imposes a Gaussian prior that shrinks weights smoothly based on curvature, while $L_1$ regularization imposes a Laplace prior that drives redundant weights to absolute zero.

## Stochastic Regularization: Dropout and Inverted Variants

### The Dropout Mechanism and Co-Adaptation Prevention

- Proposed by Nitish Srivastava, Geoffrey Hinton, et al. (2014), **Dropout** introduces stochastic noise directly into hidden layer representations during training.
- For each forward pass, each neuron's activation is independently zeroed out with probability $(1 - p)$, where $p \in (0, 1]$ represents the **retention probability**:
  $$r_j \sim \text{Bernoulli}(p)$$
  $$\tilde{a}_j = r_j \cdot a_j$$
- Dropping neurons randomly prevents **co-adaptation**, a failure mode where neurons rely on the presence of specific companion neurons to compensate for errors.
- By forcing each neuron to produce useful representations without relying on fixed neighbors, dropout encourages units to learn robust, generalized features.

### Inverted Dropout Mechanics

- In standard dropout, expected activation values during training drop by a factor of $p$ ($\mathbb{E}[\tilde{a}] = p \cdot a$).
- Standard dropout requires scaling weights downward by $p$ during evaluation ($W_{\text{test}} = p \cdot W$) to match output magnitudes, adding complexity to deployment.
- **Inverted Dropout** resolves this by scaling active activations upward by $\frac{1}{p}$ during the training phase:
  $$\tilde{a} = \frac{r \odot a}{p}$$
- Scaling during training ensures that the expected activation magnitude remains invariant across training and evaluation:
  $$\mathbb{E}[\tilde{a}] = \frac{1}{p} (p \cdot a) = a$$
- Inverted dropout eliminates runtime adjustments, allowing the test-time model to execute standard forward passes without masking or weight rescaling.

### The Implicit Geometric Ensemble Perspective

- A network containing $n$ dropout neurons represents a collection of $2^n$ distinct sub-architectures that share paramete