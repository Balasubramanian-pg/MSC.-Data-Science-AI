# Migration in progress
# Lesson 3: Explainability Methods

Explainability methods extract human-interpretable rationales from complex neural networks, bridging the gap between non-linear tensor representations and human cognitive understanding. By probing input-output dynamics, integrating backpropagated gradients, or projecting feature activations into spatial attribution maps, these techniques quantify the relative influence of individual inputs. Implementing explainability methods requires understanding their mathematical mechanics, axiomatic guarantees, and computational constraints to select appropriate auditing instruments for tabular, visual, and sequential architectures.

## Local Model-Agnostic Surrogates: LIME and KernelSHAP

### Local Interpretable Model-Agnostic Explanations (LIME)

- **LIME** approximates the local decision boundary of an arbitrary black-box classifier $f(x)$ by fitting an interpretable surrogate model $g \in G$ (such as a sparse linear regressor) in the immediate neighborhood of target instance $x$.
- The method generates a perturbed dataset $\mathcal{Z}$ by drawing samples $z'$ around $x$ and weighting each perturbation using an exponential distance metric:
  $$\pi_x(z) = \exp\left( -\frac{D(x, z)^2}{\sigma^2} \right)$$
  where $D(x, z)$ represents Euclidean or cosine distance, and $\sigma$ is the kernel width.
- The objective minimizes surrogate fidelity loss alongside a model complexity penalty $\Omega(g)$:
  $$\xi(x) = \arg\min_{g \in G} \mathcal{L}\left(f, g, \pi_x\right) + \Omega(g)$$
- The resulting linear weights $\beta_i$ reflect local feature importance: positive values indicate features supporting the prediction, while negative values indicate opposing factors.
- LIME operates independently of network architecture, but displays high *sampling variance*: identical inputs can produce divergent attribution scores across repeated runs due to stochastic neighborhood sampling.

### SHapley Additive exPlanations (SHAP)

- **SHAP** grounds feature attribution in cooperative game theory, modeling the input features as players in a coalition and the network prediction as the total game payout.
- The classical **Shapley value** calculates the marginal contribution of feature $i$, averaged over all possible feature subsets $S \subseteq F \setminus \{i\}$:
  $$\phi_i(x) = \sum_{S \subseteq F \setminus \{i\}} \frac{|S|! \, (|F| - |S| - 1)!}{|F|!} \left[ f_x(S \cup \{i\}) - f_x(S) \right]$$
  where $|F|$ is the total number of input features, and $f_x(S)$ is the conditional expectation of the model output evaluated with only subset $S$ present.
- Shapley values represent the unique attribution formulation that satisfies four fundamental mathematical axioms:
  - **Efficiency (Local Accuracy):** Attributions sum exactly to the difference between model output and baseline expected value:
    $$\sum_{i=1}^{|F|} \phi_i(x) = f(x) - \mathbb{E}[f(X)]$$
  - **Missingness:** A feature that has no impact on predictions across all coalitions receives an attribution score of zero ($\phi_i(x) = 0$).
  - **Symmetry:** Two features that contribute identically to all coalitions receive equal attribution scores ($\phi_i(x) = \phi_j(x)$).
  - **Additivity (Monotonicity):** If a model is formed by summing two sub-models ($f = f_1 + f_2$), the total attribution equals the sum of the individual attributions ($\phi_i = \phi_i^{(1)} + \phi_i^{(2)}$).
- **KernelSHAP** approximates Shapley values for arbitrary models via weighted linear regression using the specialized Shapley kernel, avoiding exponential subset enumeration.

> [!Important]
> **Axiomatic uniqueness of SHAP**: Shapley values provide the only mathematical attribution formulation that guarantees efficiency and additivity, ensuring local explanations sum strictly to the total predictive deviation from the global baseline.

## Gradient-Based Attribution and Saliency Mechanics

### Vanilla Saliency and Gradient Saturation

- **Vanilla Saliency Maps** calculate feature importance by taking the first-order partial derivative of the target class score $S_c(x)$ with respect to each input coordinate:
  $$\text{Saliency}_i(x) = \frac{\partial S_c(x)}{\partial x_i}$$
- Saliency maps identify which input pixels require the smallest modification to change the class logit, but suffer from **gradient saturation**.
- When an activation unit enters a saturated flat regime (such as a ReLU where $z \gg 0$ or a Sigmoid where $\sigma(z) \approx 1$), local gradients drop toward zero ($\frac{\partial f}{\partial x} \to 0$) even though the feature remains critical to the prediction.
- **SmoothGrad** alleviates visual noise in saliency maps by averaging vanilla gradients across $N$ Gaussian-perturbed copies of input $x$:
  $$\hat{S}(x) = \frac{1}{N} \sum_{k=1}^N \nabla_x S_c\left( x + \epsilon_k \right), \quad \epsilon_k \sim \mathcal{N}\left(0, \sigma^2 I\right)$$

### Integrated Gradients

- **Integrated Gradients (IG)** resolves gradient saturation by integrating partial derivatives along a straight linear path between a neutral baseline $x'$ and the input instance $x$:
  $$\text{IG}_i(x) = (x_i - x_i') \times \int_0^1 \frac{\partial F\left(x' + \alpha (x - x')\right)}{\partial x_i} \, d\alpha$$
  where $F(x)$ represents the output activation for the target class.
- The path integral evaluates in practice via a Riemann sum across $m$ discrete interpolation steps:
  $$\text{IG}_i^{\text{approx}}(x) = (x_i - x_i') \times \frac{1}{m} \sum_{k=1}^m \frac{\partial F\left( x' + \frac{k}{m}(x - x') \right)}{\partial x_i}$$
  Typically, $m \in [50, 300]$ provides adequate numerical convergence.
- Integrated Gradients satisfies **Completeness**: the sum of attributions equals the difference between the network prediction at input $x$ and the prediction at baseline $x'$:
  $$\sum_{i=1}^d \text{IG}_i(x) = F(x) - F(x')$$
- Integrated Gradients satisfies **Implementation Invariance**: two functionally identical neural networks that produce identical outputs for all inputs yield identical attribution scores, regardless of internal architectural wiring.

> [!Tip]
> **Baseline selection in Integrated Gradients**: choose a neutral reference baseline that represents information absence, such as an all-black image in vision tasks or zero-vector embeddings in natural language processing.

## Activation-Based Visual Explanations: CAM and Grad-CAM

### Class Activation Mapping (CAM)

- **Class Activation Mapping (CAM)** computes visual heatmaps by restricting the vision backbone to convolutional layers followed immediately by Global Average Pooling (GAP) and a dense classification layer.
- Let $A_k(i, j)$ denote the spatial activation of channel $k$ in the terminal convolutional layer at pixel coordinate $(i, j)$.
- The GAP operation averages spatial coordinates to yield channel vector $F_k = \frac{1}{Z} \sum_{i} \sum_{j} A_k(i, j)$.
- The logit for target class $c$ evaluates as:
  $$S_c = \sum_k w_k^c F_k = \frac{1}{Z} \sum_{i, j} \sum_k w_k^c A_k(i