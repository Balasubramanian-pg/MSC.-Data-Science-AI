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
  $$S_c = \sum_k w_k^c F_k = \frac{1}{Z} \sum_{i, j} \sum_k w_k^c A_k(i, j)$$
- The class activation map maps directly to:
  $$M_{\text{CAM}}^c(i, j) = \sum_k w_k^c A_k(i, j)$$
- While mathematically exact, standard CAM requires altering network architectures to enforce GAP layers, necessitating full model retraining.

### Gradient-Weighted Class Activation Mapping (Grad-CAM)

- **Grad-CAM** generalizes activation mapping to arbitrary convolutional neural networks without requiring structural layer modifications or retraining.
- Grad-CAM calculates importance weights $\alpha_k^c$ for each feature map $k$ by computing the global-average-pooled gradient of class logit $y^c$ with respect to activation map $A^k$:
  $$\alpha_k^c = \frac{1}{Z} \sum_{i=1}^U \sum_{j=1}^V \frac{\partial y^c}{\partial A_{i, j}^k}$$
  where $Z = U \times V$ represents the spatial dimensions of the feature map.
- The final heat map aggregates the weighted feature maps through a Rectified Linear Unit:
  $$L_{\text{Grad-CAM}}^c = \text{ReLU}\left( \sum_k \alpha_k^c A^k \right)$$
- The **ReLU operator** is critical: it isolates features that exert a positive correlation with target class $c$, filtering out background patterns that contribute toward opposing classification categories.
- Upsampling $L_{\text{Grad-CAM}}^c$ to the input image dimensions yields a coarse spatial localization of class-defining visual features.

> [!Tip]
> **Grad-CAM target layer selection**: compute Grad-CAM over the terminal convolutional layer of a vision model; early layers capture low-level edges and textures, while final convolutional layers encode high-level semantic objects.

## Sanity Checks and Explanatory Failure Modes

### The Saliency Sanity Protocol

- Saliency methods can generate visually compelling heatmaps that do not reflect learned network parameters.
- **The Model Parameter Randomization Test (Cascading Randomization):** Progressively randomizes the weights of a trained network from the terminal classification layer down to the initial convolutional layer.
  - A valid explanation method must degrade and lose coherence as layer weights randomize.
  - Empirical audits reveal that methods like *Guided Backpropagation* and *Guided Grad-CAM* produce identical edge-detection heatmaps even when all model weights are completely randomized, proving they act as edge detectors invariant to learned parameters.
- **The Data Randomization Test:** Evaluates whether an attribution method changes when a network is trained on permuted labels. Explanations that remain invariant between models trained on true labels and random labels fail the sanity check.
- Integrated Gradients and Grad-CAM successfully pass cascading parameter randomization tests, confirming their fidelity to internal learned representations.

### Explanation Manipulation and Fragility

- Post-hoc explainers remain vulnerable to **adversarial manipulation**.
- Adding imperceptible perturbations ($\|\delta\|_\infty \le \epsilon$) to input images can alter the resulting saliency map completely while leaving the underlying classification label unchanged.
- LIME and KernelSHAP can be deceived by adversarial wrappers that detect whether an input is an authentic sample or a synthetic perturbation, executing fair behavior on perturbations while executing biased logic on actual inputs.

> [!Important]
> **Visual edge-detection artifacts**: never deploy Guided Backpropagation or Guided Grad-CAM for model audits, because their visual outputs reflect low-level input image gradients rather than the decision logic of trained weight parameters.

## Comparative Taxonomy of Explainability Methods

| Method | Scope | Access Requirement | Mathematical Formulation | Axiomatic Foundation | Primary Technical Limitation |
|---|---|---|---|---|---|
| **LIME** | Local | Model-Agnostic | $\arg\min_{g} \mathcal{L}(f, g, \pi_x) + \Omega(g)$ | Heuristic local surrogate | Sampling instability; sensitive to kernel width |
| **KernelSHAP** | Local | Model-Agnostic | Shapley kernel weighted regression | Efficiency, Symmetry, Additivity | Computationally expensive ($O(2^{|F|})$ combinations) |
| **Integrated Gradients** | Local | Model-Specific (Gradients) | $(x_i - x_i') \int_0^1 \nabla_x F(x' + \alpha(x - x')) d\alpha$ | Completeness, Invariance | Sensitivity to reference baseline choice ($x'$) |
| **SmoothGrad** | Local | Model-Specific (Gradients) | $\frac{1}{N} \sum \nabla_x S_c(x + \mathcal{N}(0, \sigma^2 I))$ | Heuristic noise reduction | Computationally multiplied ($N \ge 50$ forward-backward passes) |
| **Grad-CAM** | Local | Model-Specific (Activations) | $\text{ReLU}(\sum_k \alpha_k^c A^k)$ | Gradient-weighted pooling | Coarse spatial resolution bounded by feature map grid |
| **TreeSHAP** | Local & Global | Model-Specific (Tree-based) | Recursive tree path conditional expectations | Efficiency, Additivity | Restricted strictly to decision trees and gradient boosted ensembles |

> [!Tip]
> **Method pairing for comprehensive audits**: deploy Integrated Gradients to evaluate feature-level numerical attributions on continuous inputs, paired with Grad-CAM to localize macroscopic spatial activations in convolutional backbones.

## Key Takeaways

- **Post-hoc methods interpret black-box systems**: attribution frameworks extract local or global importance scores without constraining the architectural capacity of the underlying model.
- **LIME fits local linear approximations**: perturbation sampling around a target instance constructs a locally linear surrogate, though it remains prone to sampling variance.
- **SHAP enforces axiomatic attribution**: grounded in cooperative game theory, Shapley values provide the only attribution framework that satisfies efficiency, missingness, symmetry, and additivity.
- **Integrated Gradients resolves gradient saturation**: integrating partial derivatives along a straight line from a neutral baseline satisfies the completeness axiom and prevents zero-gradient artifacts.
- **Grad-CAM pools spatial feature gradients**: weighting final convolutional feature maps by backpropagated class gradients localizes visual regions of interest without requiring architectural redesign.
- **The ReLU operator isolates positive class evidence**: Grad-CAM applies ReLU to exclude features whose activation correlates negatively with the target class.
- **Sanity checks expose pseudo-explanations**: parameter randomization tests prove that methods like Guided Backpropagation function as image edge detectors rather than indicators of learned model weights.
- **Attribution methods remain susceptible to perturbations**: adversarial input shifts can alter saliency maps without changing model predictions, requiring robust baseline verification.

> [!Important]
> **Axiomatic grounding ensures explanation fidelity**: select attribution tools that satisfy formal mathematical axioms—such as Integrated Gradients and SHAP—to guarantee that explanations accurately represent parameter contributions rather than visualization artifacts.
