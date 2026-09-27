# Migration in progress
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
- The transformation preserves original classification accuracy and multi-class AUROC while reducing 