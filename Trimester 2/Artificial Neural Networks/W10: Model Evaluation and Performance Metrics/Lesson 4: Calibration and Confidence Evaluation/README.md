# Lesson 4: Calibration and Confidence Evaluation

Probability calibration evaluates how accurately a neural network estimates the true likelihood of its predictions. While modern deep architectures consistently outperform shallow models on classification accuracy, they systematically produce overconfident probability distributions. Aligning raw output logits with empirical frequencies ensures that confidence scores serve as reliable measures of predictive uncertainty in high-consequence deployment environments.

## The Foundations of Neural Network Calibration

### Definition of Perfect Calibration

- A classification network outputs a predicted class label $\hat{Y} = \arg\max_c \hat{p}_c$ and an associated confidence estimate $\hat{P} = \max_c \hat{p}_c \in [0, 1]$.
- A network exhibits *perfect calibration* if the empirical probability of a prediction being correct matches its assigned confidence score across all confidence levels:
  $$P(\hat{Y} = Y \mid \hat{P} = p) = p \quad \forall p \in [0, 1]$$
- If a network processes $100$ samples with an individual confidence score of $0.80$, exactly $80$ of those instances must belong to the predicted class for the model to be well-calibrated.
- **Overconfidence** occurs when average confidence exceeds empirical accuracy ($P(\hat{Y} = Y \mid \hat{P} = p) < p$), leading models to assign near-certainty to erroneous classifications.
- **Underconfidence** occurs when empirical accuracy outpaces predicted confidence ($P(\hat{Y} = Y \mid \hat{P} = p) > p$), causing conservative estimates despite strong model accuracy.

### The Modern Overconfidence Paradox

- Historical shallow architectures (such as single-layer perceptrons and shallow MLPs) were naturally well-calibrated because their limited capacity prevented severe logit growth.
- Modern deep architectures (such as deep ResNets, DenseNets, and Transformers) achieve state-of-the-art accuracy while displaying severe probability miscalibration.
- Architectural factors driving modern miscalibration include:
  - **Increased Depth and Width:** High capacity enables networks to drive training cross-entropy loss toward zero long after classification error has saturated.
  - **Batch Normalization:** Normalization layers unconstrain intermediate logit magnitudes, allowing pre-softmax values to scale aggressively.
  - **Diminished Weight Decay:** Relaxing $L_2$ regularization parameters prevents weight compression, encouraging extreme logit divergence.
- Optimizing negative log-likelihood (NLL) encourages the model to output probability vectors with extreme values near $0$ and $1$, separating margin boundaries at the expense of distribution fidelity.

> [!Important]
> **Accuracy-calibration decoupling**: high classification accuracy does not imply reliable probability estimation, because modern deep models achieve superior decision boundaries while generating severely overconfident confidence scores.

## Quantitative Calibration Metrics and Visual Diagnostics

### Visual Assessment via Reliability Diagrams

- **Reliability diagrams** plot empirical accuracy as a function of predicted confidence to expose distributional miscalibration visually.
- The continuous confidence space $[0, 1]$ partitions into $M$ equally spaced discrete bins $I_m = (\frac{m-1}{M}, \frac{m}{M}]$ for $m \in \{1, \dots, M\}$.
- Let $B_m$ denote the set of sample indices whose predicted confidences fall into bin $I_m$.
- The empirical **accuracy** of bin $B_m$ evaluates as:
  $$\text{acc}(B_m) = \frac{1}{|B_m|} \sum_{i \in B_m} \mathbf{1}(\hat{y}_i = y_i)$$
- The average **confidence** of bin $B_m$ evaluates as:
  $$\text{conf}(B_m) = \frac{1}{|B_m|} \sum_{i \in B_m} \hat{p}_i$$
- A perfectly calibrated model aligns with the diagonal identity function $\text{acc}(B_m) = \text{conf}(B_m)$. Any discrepancy between the plotted bars and the diagonal reflects a calibration gap.

### Scalar Calibration Error Formulations

- **Expected Calibration Error (ECE)** calculates the weighted average of the absolute differences between accuracy and confidence across all bins:
  $$\text{ECE} = \sum_{m=1}^M \frac{|B_m|}{N} \left| \text{acc}(B_m) - \text{conf}(B_m) \right|$$
  where $N$ represents the total number of validation instances.
- **Maximum Calibration Error (MCE)** identifies the worst-case deviation across all populated bins, providing critical risk assessments for safety-critical systems:
  $$\text{MCE} = \max_{m \in \{1, \dots, M\}} \left| \text{acc}(B_m) - \text{conf}(B_m) \right|$$
- **Adaptive ECE** replaces equal-width bins with equal-frequency bins, ensuring each partition contains an identical sample count ($|B_m| = N / M$) to prevent sample sparsity in lower confidence intervals.
- **Negative Log-Likelihood (NLL)** serves as a standard probabilistic evaluation metric:
  $$\mathcal{L}_{\text{NLL}} = - \frac{1}{N} \sum_{i=1}^N \sum_{c=1}^C y_{ic} \log(\hat{p}_{ic})$$
  Because NLL is a *strictly proper scoring rule*, it attains its unique theoretical global minimum if and only if the predicted probability distribution matches the true conditional distribution.

> [!Tip]
> **Metric selection for calibration**: utilize Adaptive ECE alongside standard ECE to ensure that bins with minimal sample representation do not obscure calibration errors in populated confidence regions.

## Post-Hoc Calibration Techniques

### Temperature Scaling

- **Temperature scaling** recalibrates multi-class neural predictions without retraining network weights by applying a single learned scalar parameter $T > 0$ to pre-activation logits $z_i$:
  $$\hat{p}_{ic} = \frac{\exp(z_{ic} / T)}{\sum_{j=1}^C \exp(z_{ij} / T)}$$
- The optimal temperature parameter $T$ is optimized via gradient descent to minimize cross-entropy loss over an independent validation set while holding all network weights frozen.
- When $T > 1$, the softmax distribution flattens, lowering inflated confidence scores and correcting overconfidence.
- When $T < 1$, the distribution sharpens, elevating confidence estimates.
- Temperature scaling preserves the *monotonicity* of output logits, ensuring that class rankings remain unchanged:
  $$\arg\max_c (z_{ic} / T) = \arg\max_c z_{ic}$$
- The transformation preserves original classification accuracy and multi-class AUROC while reducing ECE.

### Vector Scaling, Matrix Scaling, and Non-Parametric Alternatives

- **Vector Scaling** applies a linear transformation parameterized by a diagonal weight matrix $W = \text{diag}(w_1, \dots, w_C)$ and a bias vector $b \in \mathbb{R}^C$:
  $$\hat{p}_{ic} = \text{softmax}(W z_i + b)$$
- **Matrix Scaling** unconstrains $W$ to a full $(C \times C)$ matrix, introducing $C^2 + C$ parameters. The quadratic parameter growth increases the risk of overfitting small validation sets.
- **Platt Scaling** fits a univariate logistic regression model to scalar output logits in binary classification tasks:
  $$\hat{p}_i = \sigma(w z_i + b)$$
- **Isotonic Regression** fits a non-parametric, piecewise constant monotonic step function to map uncalibrated probabilities to empirical frequencies. The method requires extensive validation data to avoid bin quantization artifacts.

> [!Tip]
> **Temperature scaling efficiency**: choose single-parameter temperature scaling over matrix scaling for deep models, because minimal parameter overhead prevents validation overfitting while completely preserving raw classification accuracy.

## Train-Time Regularization and Structural Calibration

### Label Smoothing and Logit Penalty

- Standard one-hot ground-truth encodings force the network to produce infinite logit separations, driving probability vectors to extremes.
- **Label smoothing** replaces hard binary targets $y_c \in \{0, 1\}$ with a smoothed distribution parameterized by smoothing factor $\alpha \in (0, 1)$:
  $$y_c^{\text{smooth}} = (1 - \alpha) y_c + \frac{\alpha}{C}$$
  where $C$ denotes the total number of target classes.
- Soft targets penalize overconfident logit extremes during standard backpropagation, keeping penultimate activations within bounded ranges and yielding models that are naturally calibrated upon convergence.
- **Focal Loss** adds a modulating factor $(1 - p_t)^\gamma$ to standard cross-entropy loss:
  $$\mathcal{L}_{\text{Focal}} = - (1 - p_t)^\gamma \log(p_t)$$
  Downweighting well-classified easy examples prevents confident background classes from overwhelming gradient updates, preserving calibrated probabilities along class boundaries.

### Deep Ensembles and Uncertainty Decomposition

- **Deep Ensembles** train multiple identical architectures initialized with distinct random weight seeds across non-convex loss surfaces.
- Ensembling averages predictions across disparate local minima, capturing *epistemic uncertainty* (model parameter ambiguity) alongside *aleatoric uncertainty* (inherent data noise):
  $$\bar{p}_c = \frac{1}{K} \sum_{k=1}^K \hat{p}_{c}^{(k)}$$
- Averaging probability distributions across ensemble members naturally pulls overconfident peripheral predictions inward, producing calibration profiles that surpass single-model post-hoc methods.

> [!Important]
> **Label smoothing trade-off**: incorporating label smoothing during training improves probability calibration and ECE, but can degrade post-hoc temperature scaling flexibility if downstream systems rely on unconstrained logit representations.

## Comparative Analysis of Calibration Methodologies

| Calibration Approach | Execution Phase | Parameter Complexity | Retains Classification Accuracy? | Prevents Validation Overfitting? | Implementation Complexity |
|---|---|---|---|---|---|
| **Temperature Scaling** | Post-Hoc | Minimal ($1$ scalar parameter) | Yes (Strictly preserved) | High | Minimal (Single scalar optimization) |
| **Platt Scaling** | Post-Hoc | Low ($2$ parameters for binary) | Yes (Binary tasks) | High | Minimal (Logistic regression fit) |
| **Matrix Scaling** | Post-Hoc | High ($C^2 + C$ parameters) | No (Can alter top rank) | Low (Prone to overfitting) | Moderate (Matrix optimization) |
| **Isotonic Regression** | Post-Hoc | Non-parametric (Step function) | No (Can produce flat ties) | Moderate (Requires large $N$) | Moderate (Requires monotonic fitting) |
| **Label Smoothing** | Training Time | Zero (Hyperparameter $\alpha$) | Altered during optimization | High | Minimal (Loss function alteration) |
| **Focal Loss** | Training Time | Zero (Hyperparameter $\gamma$) | Altered during optimization | High | Minimal (Loss function alteration) |
| **Deep Ensembles** | Training + Inference | Multiplied ($K \times \text{Params}$) | Altered (Generally improves) | Very High | High ($K$-fold computational overhead) |

> [!Tip]
> **Deployment workflow**: apply label smoothing during training for baseline probability stability, then fine-tune with temperature scaling on holdout validation data to minimize residual ECE before production serving.

## Key Takeaways

- **Calibration measures probability truthfulness**: a calibrated network ensures that a predicted confidence of $p$ reflects an empirical real-world success rate of $p$.
- **Modern deep networks are systematically overconfident**: structural factors such as depth, width, and normalization layers cause networks to minimize cross-entropy loss by inflating logits long after accuracy plateaus.
- **Reliability diagrams identify calibration gaps**: binning confidences against empirical accuracy plots reveals whether an architecture suffers from overconfidence or underconfidence.
- **Expected Calibration Error quantifies miscalibration**: ECE calculates the weighted average difference between predicted confidence and empirical accuracy across all defined bins.
- **Temperature scaling preserves class ranking**: scaling logits by a learned validation temperature $T > 0$ softens overconfident distributions while keeping original classification accuracy and AUROC intact.
- **Label smoothing regularizes logit extremes**: distributing a fraction $\alpha$ of target mass across incorrect classes prevents backpropagation from driving logits to extreme margins.
- **Deep ensembles improve calibration robustly**: combining outputs from multiple random initializations captures epistemic uncertainty and mitigates overconfidence more effectively than individual models.

> [!Important]
> **Probabilistic integrity in production**: evaluating neural networks requires measuring calibration error alongside discriminative metrics, ensuring models produce trustworthy confidence bounds that allow downstream systems to trigger human escalation or automated fallbacks.
