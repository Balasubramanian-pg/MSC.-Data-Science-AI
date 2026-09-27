# Migration in progress
# Lesson 2: Classical Metrics Refresher (in the Neural Context)

Classical performance metrics provide quantitative foundations for evaluating neural network behavior beyond raw training loss minimization. Understanding the mathematical properties, class-imbalance sensitivities, and threshold dynamics of these metrics ensures rigorous assessment of network predictions. Applying classical evaluation standards within deep learning architectures bridges the gap between surrogate loss optimization and operational decision-making.

## Confusion Matrix Geometry and Threshold-Dependent Metrics

### The Binary Contingency Matrix

- Binary classification networks terminate in a sigmoid activation $\sigma(z) \in [0, 1]$, outputting a continuous posterior probability $P(Y=1 \mid X)$ that maps to discrete classes via a decision threshold $\tau \in [0, 1]$ (defaulting to $\tau = 0.5$).
- Predictions partition across four disjoint outcomes in a **contingency matrix (confusion matrix)**:
  - **True Positives ($TP$)**: positive instances correctly classified as positive ($\hat{y} \ge \tau, y = 1$).
  - **False Positives ($FP$)**: negative instances incorrectly classified as positive ($\hat{y} \ge \tau, y = 0$); known as *Type I error*.
  - **True Negatives ($TN$)**: negative instances correctly classified as negative ($\hat{y} < \tau, y = 0$).
  - **False Negatives ($FN$)**: positive instances incorrectly classified as negative ($\hat{y} < \tau, y = 1$); known as *Type II error*.
- **Classification Accuracy** measures the global fraction of correct predictions:
  $$\text{Accuracy} = \frac{TP + TN}{TP + TN + FP + FN}$$
- The **accuracy paradox** occurs in imbalanced datasets where a trivial network predicting only the majority class achieves deceptively high accuracy while failing to detect the minority class.

### Precision, Recall, and the $F_\beta$ Continuum

- **Precision** (Positive Predictive Value) quantifies the purity of positive assertions by calculating the fraction of predicted positives that are true positives:
  $$\text{Precision} = \frac{TP}{TP + FP}$$
- **Recall** (Sensitivity, True Positive Rate) quantifies the completeness of positive coverage by calculating the fraction of actual positives captured by the network:
  $$\text{Recall} = \frac{TP}{TP + FN}$$
- **Specificity** (True Negative Rate) calculates the proportion of actual negative instances correctly identified:
  $$\text{Specificity} = \frac{TN}{TN + FP}$$
- **Balanced Accuracy** normalizes for class skew by computing the unweighted arithmetic mean of recall and specificity:
  $$\text{Balanced Accuracy} = \frac{\text{Recall} + \text{Specificity}}{2} = \frac{1}{2} \left( \frac{TP}{TP + FN} + \frac{TN}{TN + FP} \right)$$
- The **$F_\beta$-Score** computes the generalized weighted harmonic mean of precision and recall, parameterized by $\beta \in \mathbb{R}^+$:
  $$F_\beta = (1 + \beta^2) \frac{\text{Precision} \cdot \text{Recall}}{(\beta^2 \cdot \text{Precision}) + \text{Recall}}$$
  - When $\beta = 1$, the standard **$F_1$-Score** weights precision and recall equally.
  - When $\beta = 2$, recall receives twice the emphasis of precision, penalizing false negatives heavily.
  - When $\beta = 0.5$, precision receives twice the emphasis of recall, penalizing false alarms heavily.

> [!Important]
> **Metric alignment with objectives**: maximizing accuracy in class-imbalanced environments produces degenerate models that predict only the majority class, requiring precision-recall optimizations to penalize critical classification errors.

## Threshold-Invariant Discriminative Metrics: ROC-AUC and PR-AUC

### Receiver Operating Characteristic Analysis

- The **Receiver Operating Characteristic (ROC)** curve plots the *True Positive Rate* ($TPR = \text{Recall}$) on the vertical axis against the *False Positive Rate* ($FPR = 1 - \text{Specificity} = \frac{FP}{TN + FP}$) on the horizontal axis across all possible decision thresholds $\tau \in [0, 1]$.
- The diagonal identity line ($TPR = FPR$) represents the performance of an uninformative random classifier.
- The **Area Under the ROC Curve (AUROC / ROC-AUC)** provides a single threshold-independent scalar value ranging from $0.5$ (random guess) to $1.0$ (perfect separation).
- ROC-AUC has a precise *probabilistic interpretation*: it equals the probability that the network assigns a higher predicted score to a randomly chosen positive instance than to a randomly chosen negative instance:
  $$\text{AUROC} = P(\hat{y}^+ > \hat{y}^-)$$
- ROC curves remain invariant under changes to class prevalences because $TPR$ and $FPR$ evaluate within their respective ground-truth class marginals.

### Precision-Recall Curves and Class Imbalance

- The **Precision-Recall (PR) curve** plots Precision on the vertical axis against Recall on the horizontal axis across all thresholds $\tau \in [0, 1]$.
- In datasets where the positive class is rare, the $TN$ term in the denominator of $FPR$ dominates, keeping $FPR$ artificially low even when the network generates thousands of false alarms.
- Precision directly incorporates $FP$ against $TP$, causing the PR curve to plunge when false alarms proliferate, regardless of $TN$ magnitude.
- The **Area Under the PR Curve (AUPRC)** or **Average Precision (AP)** aggregates precision across recall levels:
  $$\text{AP} = \sum_{k=1}^K (R_k - R_{k-1}) P_k$$
- Unlike ROC-AUC, the baseline performance of a random classifier on a PR curve equals the prevalence of the positive class ($\frac{P}{P + N}$), making AUPRC sensitive to class ratio variations.

> [!Tip]
> **Metric choice under class imbalance**: evaluate models with PR-AUC instead of ROC-AUC when positive targets are rare, because large true negative counts inflate ROC curves while masking poor predictive precision.

## Multi-Class Aggregation Paradigms: Macro, Micro, and Weighted Formulations

### Averaging Mechanics for Multi-Class Topologies

- In an $M$-class classification network using softmax outputs, per-class confusion matrices are derived via a *one-versus-all* decomposition where class $c$ is positive and all remaining classes are negative.
- **Macro-averaging** computes the metric independently for each individual class and takes the unweighted arithmetic mean across all $M$ classes:
  $$\text{Macro-Metric} = \frac{1}{M} \sum_{c=1}^M \text{Metric}_c$$
  Macro-averaging assigns equal weight to every class regardless of sample size, reflecting model competence on minority classes.
- **Micro-averaging** pools raw contingency tallies ($TP, FP, FN, TN$) globally across all classes before calculating the final metric:
  $$\text{Micro-Precision} = \frac{\sum_{c=1}^M TP_c}{\sum_{c=1}^M (TP_c + FP_c)}, \quad \text{Micro-Recall} = \frac{\sum_{c=1}^M TP_c}{\sum_{c=1}^M (TP_c + FN_c)}$$
  In single-label multi-class classification, Micro-Precision, Micro-Recall, and Micro-$F_1$ mathematically collapse to overall Classification Accuracy.
- **Weighted-averaging** calculates the metric for each class independently and computes a weighted average proportional to the ground-truth sample count (*support*) of each class:
  $$\text{Weighted-Metric} = \sum_{c=1}^M \frac{N_c}{N} \text{Metric}_c$$
  Weighted-averaging accounts for class imbalances but can conceal poor predictive performance on low-support classes.

> [!Tip]
> **Averaging strategy selection**: apply macro-averaging when minority class accuracy is critical to task success, whereas micro-averaging reflects aggregate dataset utility dominated by high-frequency classes.

## Probabilistic Loss and Calibration Metrics in Deep Architectures

### Logarithmic Loss and Information Divergence

- Training neural networks relies on continuous, differentiable surrogate loss functions s