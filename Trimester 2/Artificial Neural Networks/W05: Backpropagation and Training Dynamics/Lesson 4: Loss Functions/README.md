# Migration in progress
# Lesson 4: Loss Functions

## Loss Functions in Neural Network Optimization

The objective loss function acts as the mathematical compass that guides gradient descent, translating model prediction errors into scalar signals that drive backpropagation. Selecting a loss function defines the optimization topography, determines parameter sensitivity to outliers, and enforces the probabilistic interpretation of network outputs. Understanding the mathematical derivations, error distributions, gradient dynamics, and stabilization mechanics of loss functions allows practitioners to align neural network architectures with specific task objectives.

## Probabilistic Foundations of Objective Functions

### Empirical Risk Minimization Versus Maximum Likelihood

- Supervised learning operates under **Empirical Risk Minimization (ERM)**, seeking parameter weights $\theta$ that minimize the expected loss over an empirical dataset of $m$ training instances:
  $$\mathcal{R}_{\text{emp}}(\theta) = \frac{1}{m} \sum_{i=1}^m \mathcal{L}(f(x^{(i)}; \theta), y^{(i)})$$
- Grounding loss functions in statistical theory relies on **Maximum Likelihood Estimation (MLE)**, which seeks parameters that maximize the probability of the observed targets conditioned on the inputs:
  $$\theta_{\text{MLE}} = \arg\max_\theta \prod_{i=1}^m P(y^{(i)} \mid x^{(i)}; \theta)$$
- Converting likelihood products into sums via the natural logarithm and taking the negative yields the **Negative Log-Likelihood (NLL)**:
  $$\mathcal{L}_{\text{NLL}}(\theta) = -\sum_{i=1}^m \ln P(y^{(i)} \mid x^{(i)}; \theta)$$
- Minimizing negative log-likelihood is mathematically equivalent to maximizing data likelihood, providing a direct statistical justification for standard neural network loss functions.

### Probability Distribution Pairings

- Selecting a loss function corresponds to adopting an explicit assumption regarding the conditional probability distribution $P(y \mid x)$ of the output:
  - Assuming a **Gaussian distribution** with constant variance produces **Mean Squared Error (MSE)**.
  - Assuming a **Laplace distribution** produces **Mean Absolute Error (MAE)**.
  - Assuming a **Bernoulli distribution** over binary outcomes produces **Binary Cross-Entropy (BCE)**.
  - Assuming a **Categorical (Multinoulli) distribution** over mutually exclusive classes produces **Categorical Cross-Entropy (CCE)**.
- Matching output activation functions with their corresponding statistical loss distributions ensures convex error surfaces at the final layer and prevents optimization stalls.

> [!Tip]
> **Loss functions reflect distribution assumptions**: every standard loss formulation derived from maximum likelihood represents an explicit choice about the underlying noise distribution of the target data.

## Continuous Regression Losses

### Mean Squared Error (MSE / L2 Loss)

- **Mean Squared Error** evaluates the average squared Euclidean distance between continuous predictions and ground-truth targets:
  $$\mathcal{L}_{\text{MSE}} = \frac{1}{2m} \sum_{i=1}^m \| \hat{y}^{(i)} - y^{(i)} \|_2^2$$
  where the factor $\frac{1}{2}$ cancels out during analytical differentiation.
- Differentiating with respect to the output prediction $\hat{y}$ produces a gradient directly proportional to the residual error:
  $$\nabla_{\hat{y}} \mathcal{L}_{\text{MSE}} = \frac{1}{m} (\hat{y} - y)$$
- The quadratic exponent penalizes large residuals aggressively; an error twice as large produces four times the loss and four times the gradient update.
- While MSE produces smooth, continuous curvature near zero error, its quadratic penalty makes it sensitive to extreme **outliers**, which can dominate gradient updates and derail optimization.

### Mean Absolute Error (MAE / L1 Loss)

- **Mean Absolute Error** measures the average absolute difference between predicted and actual values:
  $$\mathcal{L}_{\text{MAE}} = \frac{1}{m} \sum_{i=1}^m | \hat{y}^{(i)} - y^{(i)} |$$
- Its derivative is piecewise constant across active domains:
  $$\frac{\partial \mathcal{L}_{\text{MAE}}}{\partial \hat{y}} = \frac{1}{m} \text{sgn}(\hat{y} - y) = \begin{cases} +\frac{1}{m} & \text{if } \hat{y} > y \\ -\frac{1}{m} & \text{if } \hat{y} < y \end{cases}$$
- Because the gradient magnitude remains constant regardless of error size, MAE is **robust to outliers**, treating extreme anomalies with the same linear importance as standard instances.
- MAE suffers from a point of non-differentiability at the origin ($\hat{y} = y$), where optimization software must rely on subgradient conventions ($\partial |0| \in [-1, 1]$).
- The constant gradient magnitude prevents natural deceleration as predictions approach zero error, causing updates to overshoot and oscillate around the minimum unless learning rates decay.

### Huber Loss and Smooth L1 Regularization

- **Huber Loss** combines the parabolic convergence of MSE for small residuals with the outlier resistance of MAE for large residuals using a threshold parameter $\delta$:
  $$\mathcal{L}_{\text{Huber}} = \begin{cases} \frac{1}{2}(\hat{y} - y)^2 & \text{if } |\hat{y} - y| \le \delta \\ \delta |\hat{y} - y| - \frac{1}{2}\delta^2 & \text{if } |\hat{y} - y| > \delta \end{cases}$$
- Its first derivative transitions continuously across regimes:
  $$\frac{\partial \mathcal{L}_{\text{Huber}}}{\partial \hat{y}} = \begin{cases} \hat{y} - y & \text{if } |\hat{y} - y| \le \delta \\ \delta \cdot \text{sgn}(\hat{y} - y) & \text{if } |\hat{y} - y| > \delta \end{cases}$$
- When $|\hat{y} - y| \le \delta$, the loss behaves like MSE, providing a smooth gradient that shrinks continuously to zero at the minimum to prevent oscillation.
- When $|\hat{y} - y| > \delta$, the loss transitions into linear behavior, bounding the maximum gradient magnitude to $\pm \delta$ to protect parameter updates from disruptive outliers.
- The variant **Smooth L1 Loss** sets $\delta = 1.0$, serving as a standard objective function in object detection bounding-box regression networks (such as Fast R-CNN).

> [!Important]
> **Huber loss balances precision and robustness**: it combines the stable convergence of MSE near zero error with the outlier resistance of MAE, switching dynamically based on the error threshold $\delta$.

## Categorical and Information-Theoretic Losses

### Binary Cross-Entropy and Derivative Cancellation

- For binary targets $y \in \{0, 1\}$, **Binary Cross-Entropy (BCE)** measures the divergence between target labels and predicted probabilities $\hat{y} = \sigma(z) \in (0, 1)$:
  $$\mathcal{L}_{\text{BCE}} = -\frac{1}{m} \sum_{i=1}^m \left[ y^{(i)} \ln(\hat{y}^{(i)}) + (1 - y^{(i)}) \ln(1 - \hat{y}^{(i)}) \right]$$
- Differentiating with respect to the predicted probability yields:
  $$\frac{\partial \mathcal{L}_{\text{BCE}}}{\partial \hat{y}} = \frac{\hat{y} - y}{\hat{y}(1 - \hat{y})}$$
- Multiplying by the sigmoid activation derivative ($\frac{\partial \hat{y}}{\partial z} = \hat{y}(1 - \hat{y})$) triggers an exact algebraic cancellation:
  $$\delta^{[L]} = \frac{\partial \mathcal{L}_{\text{BCE}}}{\partial z^{[L]}} = \frac{\partial \mathcal{L}_{\text{BCE}}}{\partial \hat{y}} \cdot \frac{\partial \hat{y}}{\partial z^{[L]}} = \left[ \frac{\hat{y} - y}{\hat{y}(1 - \hat{y})} \right] \left[ \hat{y}(1 - \hat{y}) \right] = \hat{y} - y$$
- This cancellation removes the saturating derivative term from the denominator, ensuring that large prediction errors produce large, linear gradients that prevent gradient vanishing.

### Categorical Cross-Entropy and Softmax Coupling

- For mutually exclusive classification across $K$ classes with one-hot encoded targets $y \in \{0, 1\}^K$, **Categorical Cross-Entropy (CCE)** evaluates:
  $$\mathcal{L}_{\text{CCE}} = -\frac{1}{m} \sum_{i=1}^m \sum_{k=1}^K y_k^{(i)} \ln(\hat{y}_k^{(i)})$$
  where $\hat{y}_k = \frac{e^{z_k}}{\sum_j e^{z_j}}$ is the Softmax probability for class $k$.
- The Softmax transformation produces a non-diagonal Jacobian where off-diagonal terms couple classes together:
  $$\frac{\partial \hat{y}_k}{\partial z_j} = \begin{cases} \hat{y}_k(1 - \hat{y}_k) & \text{if } k = j \\ -\hat{y}_k \hat{y}_j & \text{if } k \neq j \end{cases}$$
- Contracting this Jacobian with the cross-entropy loss derivative yields the vector difference between predicted probabilities and one-hot ground-truth labels:
  $$\delta^{[L]} = \nabla_{z^{[L]}} \mathcal{L}_{\text{CCE}} = \hat{y} - y \in \mathbb{R