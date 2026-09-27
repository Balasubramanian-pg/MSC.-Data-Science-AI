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

- Training neural networks relies on continuous, differentiable surrogate loss functions such as **Cross-Entropy Loss (Log-Loss)**, defined for multi-class tasks as:
  $$\mathcal{L}_{\text{CE}} = - \frac{1}{N} \sum_{i=1}^N \sum_{c=1}^M y_{ic} \log(\hat{p}_{ic})$$
  where $y_{ic} \in \{0, 1\}$ is the one-hot indicator and $\hat{p}_{ic}$ is the softmax probability for sample $i$ and class $c$.
- Cross-entropy penalizes overconfident incorrect predictions logarithmically, tending toward positive infinity as the network assigns near-zero probability to the true target.

### Brier Score and Model Calibration

- The **Brier Score** evaluates probability accuracy by computing the mean squared difference between predicted probabilities and binary indicators:
  $$\text{BS} = \frac{1}{N} \sum_{i=1}^N \sum_{c=1}^M (\hat{p}_{ic} - y_{ic})^2$$
  The Brier score decomposes algebraically into three components: *uncertainty*, *reliability* (calibration error), and *resolution* (discriminative capacity).
- Deep neural networks frequently suffer from poor probability calibration: deep layers, batch normalization, and weight decay yield well-separated discriminative boundaries but cause softmax outputs to become severely overconfident.
- **Expected Calibration Error (ECE)** groups probability predictions into $K$ equal-width confidence bins $B_k \subset (0, 1]$ and computes the weighted absolute difference between confidence and accuracy:
  $$\text{ECE} = \sum_{k=1}^K \frac{|B_k|}{N} \left| \text{acc}(B_k) - \text{conf}(B_k) \right|$$
  where $\text{acc}(B_k) = \frac{1}{|B_k|} \sum_{i \in B_k} \mathbf{1}(\hat{y}_i = y_i)$ and $\text{conf}(B_k) = \frac{1}{|B_k|} \sum_{i \in B_k} \hat{p}_i$.
- **Temperature Scaling** recalibrates probabilities post-hoc without altering class rankings or ROC-AUC by scaling pre-activation logits $z$ with a single learned scalar $T > 0$:
  $$\hat{p}_{ic} = \frac{e^{z_{ic} / T}}{\sum_{j=1}^M e^{z_{ij} / T}}$$

> [!Important]
> **Calibration versus discrimination**: deep networks can exhibit near-perfect AUROC while suffering from severe probability overconfidence, requiring temperature scaling to align softmax probabilities with true empirical frequencies.

## Comparative Evaluation of Classical Classification Metrics

| Evaluation Metric | Mathematical Definition | Threshold Dependency | Sensitivity to Class Skew | Primary Failure Mode |
|---|---|---|---|---|
| **Accuracy** | $\frac{TP + TN}{TP + TN + FP + FN}$ | Fixed threshold ($\tau$) | Extreme; inflates under majority dominance | Masking minority class misclassifications |
| **Precision** | $\frac{TP}{TP + FP}$ | Fixed threshold ($\tau$) | High; drops sharply as false alarms grow | Ignores missed positive instances ($FN$) |
| **Recall (Sensitivity)** | $\frac{TP}{TP + FN}$ | Fixed threshold ($\tau$) | Invariant to true negative changes | Incentivizes predicting positive everywhere |
| **$F_1$-Score** | $2 \cdot \frac{\text{Precision} \cdot \text{Recall}}{\text{Precision} + \text{Recall}}$ | Fixed threshold ($\tau$) | High; emphasizes minority positive recovery | Discards true negative sample counts |
| **ROC-AUC** | $\int_0^1 TPR(FPR) \, d(FPR)$ | Threshold invariant | Robust; class ratio shifts do not distort curve | Creates overly optimistic profiles under rare positives |
| **PR-AUC** | $\int_0^1 P(R) \, dR$ | Threshold invariant | Direct; baseline equals class prevalence | Baseline changes when test set prevalence shifts |
| **Cross-Entropy** | $-\sum y_c \log(\hat{p}_c)$ | Threshold free | Sensitive to probability overconfidence | Severe penalties for outlier misclassifications |
| **ECE** | $\sum \frac{\|B_k\|}{N} \|\text{acc}(B_k) - \text{conf}(B_k)\|$ | Threshold free | Sensitive to bin count selection ($K$) | Measures probability correctness, not class separation |

> [!Tip]
> **Metric pairing**: combine threshold-independent ranking metrics (ROC-AUC or PR-AUC) for model comparison with threshold-dependent metrics ($F_\beta$ or cost-weighted matrices) for final deployment decisions.

## Assessment Preparation

### Practice Quantitative Scenarios

- **Scenario 1: Imbalanced Fraud Detection Evaluation**
  - *Context:* A credit card fraud detection network evaluates $100{,}000$ transactions. Ground truth consists of $100$ fraudulent transactions ($Y=1$) and $99{,}900$ legitimate transactions ($Y=0$).
  - *Network Predictions:* The network flags $500$ transactions as fraudulent, of which $80$ are true frauds ($TP = 80$, $FP = 420$). The remaining $20$ true frauds are missed ($FN = 20$), and $99{,}480$ legitimate transactions are cleared ($TN = 99{,}480$).
  - *Calculations:*
    - Accuracy: $\frac{80 + 99{,}480}{100{,}000} = 99.56\%$
    - Precision: $\frac{80}{80 + 420} = 16.0\%$
    - Recall: $\frac{80}{80 + 20} = 80.0\%$
    - False Positive Rate: $\frac{420}{99{,}480 + 420} = \frac{420}{99{,}900} = 0.42\%$
    - $F_1$-Score: $2 \cdot \frac{0.16 \cdot 0.80}{0.16 + 0.80} = 26.67\%$
  - *Diagnostic Interpretation:* High accuracy ($99.56\%$) and low false positive rate ($0.42\%$) mask the reality that $84\%$ of flagged alerts are false alarms, highlighting why Precision and $F_1$-score are necessary metrics.

- **Scenario 2: Multi-Class Averaging Divergence**
  - *Context:* A diagnostic medical imaging classifier identifies three classes: Class A ($1{,}000$ samples, Recall $= 0.95$), Class B ($900$ samples, Recall $= 0.90$), and Class C ($10$ samples, Recall $= 0.10$).
  - *Macro-Recall Computation:*
    $$\text{Macro-Recall} = \frac{0.95 + 0.90 + 0.10}{3} = \frac{1.95}{3} = 65.0\%$$
  - *Weighted-Recall Computation:*
    $$\text{Weighted-Recall} = \left(\frac{1{,}000}{1{,}910} \times 0.95\right) + \left(\frac{900}{1{,}910} \times 0.90\right) + \left(\frac{10}{1{,}910} \times 0.10\right) = 49.74\% + 42.41\% + 0.05\% = 92.2\%$$
  - *Diagnostic Interpretation:* Weighted recall ($92.2\%$) completely conceals the catastrophic failure on rare Class C ($10\%$ recall), whereas macro recall ($65.0\%$) flags the deficiency.

> [!Important]
> **Diagnostic review summary**: when validating safety-critical systems, report macro-averaged figures alongside per-class performance tables to prevent majority-class overrepresentation from masking isolated classification hazards.

## Key Takeaways

- **Accuracy fails under imbalance**: high classification accuracy in skewed datasets often reflects baseline majority prevalence rather than true feature learning.
- **Precision and recall represent operational tradeoffs**: precision penalizes false alarms, whereas recall penalizes missed target events.
- **The $F_\beta$ formulation modulates error penalties**: selecting $\beta > 1$ prioritizes target retrieval, while selecting $\beta < 1$ prioritizes predictive purity.
- **AUROC measures pairwise rank separation**: the metric computes the probability of ranking a random positive higher than a random negative, exhibiting structural invariance to class distribution shifts.
- **PR-AUC exposes rare-event false alarms**: unlike ROC-AUC, precision-recall curves do not incorporate true negatives in their denominators, preventing vast negative pools from masking low precision.
- **Macro-averaging protects minority classes**: unweighted class metric averaging exposes localized predictive collapse that weighted and micro averaging conceal.
- **Deep networks require calibration checks**: modern architectures produce accurate rankings but often output overconfident softmax probabilities, necessitating metric tracking via ECE and correction via temperature scaling.

> [!Important]
> **Operational alignment of evaluation**: optimizing neural networks requires selecting metrics that reflect operational loss functions rather than surrogate training objectives, ensuring that threshold selection and probability calibration mirror real-world decision costs.
