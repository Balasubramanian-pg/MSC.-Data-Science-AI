# Lesson 2: Summary and Assessment
## Classification and Prediction: Module Summary and Assessment

Supervised learning provides the mathematical framework for learning functional mappings from labeled empirical observations. Depending on whether target variables are continuous real numbers or discrete categorical symbols, supervised modeling divides into regression and classification. Evaluating model behavior requires understanding the limitations of basic accuracy heuristics, calibrating decision thresholds, analyzing trade-off curves, and diagnosing error distributions. Synthesizing formal problem formulations, discriminative versus generative modeling paradigms, confusion matrix derivations, and regression metrics prepares machine learning practitioners to select, train, and validate supervised prediction pipelines.

## Synthesis of Core Week 3 Foundations

### The Mathematical Duality: Regression and Classification

- **Supervised learning objective:** Searches a hypothesis space $\mathcal{H} = \{f_\theta: \mathcal{X} \to \mathcal{Y}\}$ to discover parameters $\theta^*$ minimizing the empirical surrogate of true generalization risk:
  $$\min_\theta R_{\text{emp}}(f_\theta) = \min_\theta \frac{1}{N} \sum_{i=1}^N \ell(f_\theta(x^{(i)}), y^{(i)})$$
- **Regression duality ($\mathcal{Y} \subseteq \mathbb{R}$):** The model estimates a continuous response surface $f(x)$, approximating the conditional expectation $\mathbb{E}[Y \mid X = x]$ under squared loss ($L_2$) or the conditional median $\text{Median}(Y \mid X = x)$ under absolute loss ($L_1$).
- **Classification duality ($\mathcal{Y} \in \{1, \dots, C\}$):** The model partitions the feature space into discrete decision regions bounded by geometric decision boundaries. Because discrete $0-1$ misclassification loss ($\mathbf{1}[y \neq \hat{y}]$) is non-convex and NP-hard to optimize, algorithms optimize convex surrogate losses:
  - *Cross-Entropy Loss:* Minimizes negative log-likelihood, outputting calibrated posterior probabilities.
  - *Hinge Loss:* Maximizes geometric margins, producing sparse support vector representations.

### Probabilistic Modeling: Discriminative Versus Generative Formulations

- **Discriminative models:** Directly estimate the posterior class distribution $P(Y \mid X)$ or learn decision hyperplanes directly (e.g., Logistic Regression, SVMs, Decision Trees, Neural Networks). They achieve lower asymptotic error on large datasets by focusing parameters strictly on boundary discrimination.
- **Generative models:** Model the joint distribution $P(X, Y) = P(X \mid Y)P(Y)$, learning class priors and class-conditional feature distributions before applying Bayes' theorem to evaluate posteriors (e.g., Naive Bayes, Linear Discriminant Analysis). They converge to their asymptotic error bound faster on tiny datasets ($O(\log D)$ sample complexity) and support native missing-feature marginalization.

### Decomposition Architectures: One-vs-Rest and One-vs-One

- **One-vs-Rest (OvR / One-vs-All):** Trains $C$ binary classifiers, each separating one class from the remaining $C-1$ classes combined. Predictions evaluate via continuous score argmax: $\hat{y} = \arg\max s_k(x)$. OvR minimizes total models trained, but introduces synthetic class imbalance ($1:(C-1)$) and requires calibrated output scores.
- **One-vs-One (OvO / Pairwise):** Trains $\frac{C(C-1)}{2}$ binary classifiers across all unique class pairs. Predictions evaluate via majority voting: $\hat{y} = \arg\max V_c$. OvO trains on small, balanced subsets ($N_j + N_k \ll N$), making it faster than OvR for algorithms with super-linear computational complexity like kernel SVMs ($O(N^2)$).

> [!Tip]
> **Match modeling paradigms to data scale**: deploy generative models like Naive Bayes when data is limited and missing attributes occur, and deploy discriminative models like Logistic Regression or Gradient Boosted Trees to achieve superior asymptotic boundary precision on large datasets.

## The Supervised Evaluation Architecture

```mermaid
flowchart TD
    Model["Trained Supervised Model Output"] --> TypeCheck{"Determine Target Type"}
    
    subgraph RegressionPath["Continuous Regression Evaluation"]
        TypeCheck -- "Continuous Real (y in R)" --> RegResiduals["Compute Residuals: e_i = y_i - y^_i"]
        RegResiduals --> MAE["Mean Absolute Error (MAE): Linear Outlier Resistance"]
        RegResiduals --> RMSE["Root Mean Squared Error (RMSE): Quadratic Variance Penalty"]
        RegResiduals --> R2["R-Squared (R2): Proportion of Variance Explained"]
    end
    
    subgraph ClassificationPath["Categorical Classification Evaluation"]
        TypeCheck -- "Discrete Class (y in {1..C})" --> ProbOutputs["Predicted Class Probabilities: P(Y=c|X)"]
        ProbOutputs --> Threshold["Apply Decision Threshold: tau in [0, 1]"]
        Threshold --> Matrix["Generate Confusion Matrix: TP, FP, FN, TN"]
        
        Matrix --> AccParadox["Accuracy: Deceptive under Class Imbalance"]
        Matrix --> PrecRec["Evaluate Precision vs Recall Tradeoff"]
        PrecRec --> FBeta["F-Beta Score (Harmonic Mean)"]
        
        ProbOutputs --> ROC_PR{"Class Balance Verification"}
        ROC_PR -- "Balanced Classes" --> ROC["ROC Curve & AUC-ROC (Ranking Discrimination)"]
        ROC_PR -- "Severe Imbalance (< 1%)" --> PR["Precision-Recall Curve & PR-AUC (Omit TN)"]
    end
```

> [!Important]
> **Class imbalance invalidates accuracy and ROC curves**: accuracy masks minority failure, and ROC curves become deceptively optimistic because massive True Negative counts suppress the False Positive Rate; evaluate Precision-Recall curves and Macro-F1 on imbalanced targets.

## Comprehensive Supervised Evaluation Metrics Matrix

| Evaluation Metric | Target Domain | Mathematical Formulation | Bounded Range | Outlier Sensitivity | Primary Diagnostic Role |
|---|---|---|---|---|---|
| **Accuracy** | Classification | $\frac{\text{TP} + \text{TN}}{\text{TP} + \text{TN} + \text{FP} + \text{FN}}$ | $[0.0, \; 1.0]$ | Minimal | Baseline check strictly on balanced classes; subject to the accuracy paradox |
| **Precision** | Classification | $\frac{\text{TP}}{\text{TP} + \text{FP}} = P(Y = 1 \mid \hat{Y} = 1)$ | $[0.0, \; 1.0]$ | Sensitive to low $\tau$ | Measures False Alarm cost; critical when False Positives are expensive |
| **Recall (Sensitivity)** | Classification | $\frac{\text{TP}}{\text{TP} + \text{FN}} = P(\hat{Y} = 1 \mid Y = 1)$ | $[0.0, \; 1.0]$ | Sensitive to high $\tau$ | Measures Missed Detection cost; non-negotiable in safety and medical diagnosis |
| **$F_1$-Score** | Classification | $2 \cdot \frac{\text{Precision} \cdot \text{Recall}}{\text{Precision} + \text{Recall}}$ | $[0.0, \; 1.0]$ | Low | Balanced harmonic mean; robust against class imbalance |
| **AUC-ROC** | Classification | $\int_0^1 \text{TPR}(\text{FPR}) \, d(\text{FPR})$ | $[0.0, \; 1.0]$ | Invariant to prevalence | Evaluates threshold-independent ranking discrimination power |
| **AUC-PR** | Classification | $\int_0^1 \text{Precision}(\text{Recall}) \, d(\text{Recall})$ | $[0.0, \; 1.0]$ | High on rare classes | Standard ranking metric on highly skewed rare-event datasets |
| **MAE** | Regression | $\frac{1}{N} \sum \|y_i - \hat{y}_i\|$ | $[0.0, \; \infty)$ | **Low (Linear)** | Measures average magnitude in physical units; robust against outliers |
| **RMSE** | Regression | $\sqrt{\frac{1}{N} \sum (y_i - \hat{y}_i)^2}$ | $[0.0, \; \infty)$ | **High (Quadratic)** | Heavily penalizes large variance errors; standard for continuous modeling |
| **$R^2$ Score** | Regression | $1 - \frac{\sum (y_i - \hat{y}_i)^2}{\sum (y_i - \bar{y})^2}$ | $(-\infty, \; 1.0]$ | High | Measures proportion of target variance explained relative to sample mean |

> [!Tip]
> **Use RMSE when large errors are dangerous and MAE when costs are linear**: RMSE squares residuals, heavily penalizing occasional large deviations, while MAE provides intuitive linear error tracking that resists outlier distortion.

## Assessment Preparation

### Conceptual Review Questions

- **Question 1 (The Mathematical Breakdown of the Accuracy Paradox):** Why does classification accuracy fail as an evaluation metric in rare-event detection, and how does the $F_1$-score resolve this failure?
  - *Answer:* Accuracy evaluates the ratio of correct predictions across both classes: $\text{Accuracy} = \frac{\text{TP} + \text{TN}}{\text{Total}}$. In an imbalanced dataset where the positive class prevalence is $0.1\%$ ($10$ positives out of $10,000$ records), a trivial dummy classifier predicting negative for every sample achieves $\text{Accuracy} = \frac{0 + 9990}{10000} = 0.999$ ($99.9\%$). The metric is dominated by True Negatives, masking the fact that the model missed 100% of the positive class ($\text{Recall} = 0\%$). The $F_1$-score resolves this by taking the harmonic mean of precision and recall: $F_1 = 2 \cdot \frac{\text{Precision} \cdot \text{Recall}}{\text{Precision} + \text{Recall}} = \frac{2\text{TP}}{2\text{TP} + \text{FP} + \text{FN}}$. The $F_1$ equation completely omits True Negatives ($\text{TN}$) from both numerator and denominator; if a dummy model predicts zero True Positives ($\text{TP} = 0$), $F_1$ evaluates to exactly zero, exposing total model failure.
- **Question 2 (Prevalence Invariance in ROC Versus PR Curves):** Explain mathematically why the Receiver Operating Characteristic (ROC) curve is invariant to class distribution shifts, while the Precision-Recall (PR) curve changes when the positive class prevalence drops.
  - *Answer:* The axes of the ROC curve are True Positive Rate ($\text{TPR} = \frac{\text{TP}}{\text{TP} + \text{FN}}$) and False Positive Rate ($\text{FPR} = \frac{\text{FP}}{\text{TN} + \text{FP}}$). The denominator of TPR depends strictly on actual positive instances ($P = \text{TP} + \text{FN}$), and the denominator of FPR depends strictly on actual negative instances ($N = \text{TN} + \text{FP}$). Because both metrics normalize exclusively within their respective class totals, altering the ratio of positive to negative samples in a test set does not change TPR or FPR at any threshold, keeping the ROC curve invariant. In contrast, the PR curve plots Precision ($\frac{\text{TP}}{\text{TP} + \text{FP}}$) against Recall ($\frac{\text{TP}}{\text{TP} + \text{FN}}$). The denominator of Precision combines both True Positives and False Positives. If positive prevalence drops (e.g., from 10% to 0.1%), the pool of actual negative samples expands massively, generating more False Positives for any fixed threshold. The denominator ($\text{TP} + \text{FP}$) inflates, causing Precision to drop across all recall thresholds and lowering the PR curve.
- **Question 3 (The Penalty Mechanism of Adjusted $R^2$):** Why does standard $R^2$ increase monotonically when adding irrelevant features to a multiple linear regression model, and how does Adjusted $R^2$ correct this behavior?
  - *Answer:* Standard $R^2$ evaluates as $R^2 = 1 - \frac{\text{SS}_{\text{res}}}{\text{SS}_{\text{tot}}}$. In ordinary least squares, adding a new feature gives the optimization algorithm an additional degree of freedom to fit training variations. By properties of linear projections, the residual sum of squares cannot increase when expanding feature count ($\text{SS}_{\text{res, new}} \le \text{SS}_{\text{res, old}}$). Because $\text{SS}_{\text{tot}}$ is a fixed constant, $R^2$ increases (or stays constant) even if the added feature is random noise. **Adjusted $R^2$** penalizes feature count by dividing sums of squares by their respective degrees of freedom:
    $$R^2_{\text{adj}} = 1 - \left[ \frac{\text{SS}_{\text{res}} / (N - p - 1)}{\text{SS}_{\text{tot}} / (N - 1)} \right] = 1 - \left[ \frac{(1 - R^2)(N - 1)}{N - p - 1} \right]$$
    where $p$ is the feature count and $N$ is the sample size. Adding a feature increases $p$, which decreases the denominator $(N - p - 1)$, scaling the penalty ratio upward. Adjusted $R^2$ increases if and only if the new feature reduces $\text{SS}_{\text{res}}$ by an amount greater than what would be expected by random chance.
- **Question 4 (Voting Ambiguity in One-vs-One Multiclass Classification):** What is the Condorcet voting paradox in One-vs-One multiclass classification, and how do practical implementations resolve circular ties?
  - *Answer:* In One-vs-One classification, $\frac{C(C-1)}{2}$ binary models cast pairwise votes. When evaluating a query instance, pairwise decisions can form a circular voting cycle (e.g., Classifier 12 votes for Class A over Class B; Classifier 23 votes for Class B over Class C; Classifier 13 votes for Class C over Class A). Each class receives exactly one vote ($V_A = 1, V_B = 1, V_C = 1$), producing a tie where no majority class exists. Practical implementations resolve cyclic ties by using continuous confidence calibration: instead of counting discrete binary votes ($\{0, 1\}$), the algorithm sums the underlying continuous probability estimates or signed margin distances generated by each pairwise classifier:
    $$\hat{y} = \arg\max_c \sum_{j \neq c} P(Y = c \mid Y \in \{c, j\}, x)$$

### Applied Analytical Scenarios

- **Scenario A (Threshold Calibration in Sepsis Clinical Alerting):** An intensive care predictive model outputs continuous sepsis risk probabilities $\hat{p} \in [0, 1]$. Using default threshold $\tau = 0.50$, the model achieves $92\%$ Precision and $48\%$ Recall. Clinical audits reveal that ICU staff are missing early septic shock events, leading to patient deaths.
  - *Diagnosis:* The classification threshold is set too high for a clinical setting where False Negatives are catastrophic. While a 50% threshold keeps False Positives low (high precision), it misses more than half of active infections (low recall).
  - *Remedy:* Recalibrate the decision threshold downward along the Precision-Recall curve, setting $\tau = 0.15$ or $\tau = 0.20$. Dropping the threshold forces the model to classify positive aggressively, driving **Recall to $\ge 95\%$** at the cost of lower Precision. Clinicians accept additional False Positive bed visits to prevent patient fatalities.
- **Scenario B (Model Ranking Failure in High-Volume Financial Fraud):** A bank evaluates two fraud detection models on a transaction stream where fraud prevalence is $0.02\%$ ($200$ fraud events in $1,000,000$ transactions). Model A achieves an AUC-ROC of $0.985$, while Model B achieves an AUC-ROC of $0.970$. However, when deployed, Model A inundates fraud analysts with 40,000 False Positives daily, while Model B produces only 1,200 False Positives while catching more fraud.
  - *Diagnosis:* The bank used AUC-ROC as their primary evaluation metric on an imbalanced dataset. Because normal transactions outnumber fraud by 5000:1, Model A's 40,000 False Positives yield an FPR of only $\frac{40,000}{999,800} \approx 4\%$, allowing its ROC curve to look strong.
  - *Remedy:* Discard AUC-ROC and evaluate models using **Area Under the Precision-Recall Curve (AUC-PR)** and **Precision at Fixed Recall (e.g., Precision at Recall = 80%)**. Model B's PR curve will expose its superior precision at operational thresholds, preventing analyst alert fatigue.
- **Scenario C (Metric Misalignment in Real Estate Valuation):** A real estate algorithm predicts urban property sale prices. The model trains using Mean Squared Error (MSE) loss. Evaluating test metrics shows an MAE of \$18,000, but an RMSE of \$142,000. Real estate agents complain that the model makes erratic predictions on standard suburban homes.
  - *Diagnosis:* The dataset contains a small number of ultra-luxury mansions valued at \$15,000,000 alongside standard \$300,000 homes. Because MSE squares residuals, errors on multi-million dollar luxury estates generated massive loss gradients (e.g., $(15,000,000 - 12,000,000)^2 = 9 \times 10^{12}$), forcing the model parameters to distort predictions on standard homes to minimize luxury errors.
  - *Remedy:* Transform the target variable using a natural logarithm: $y_{\text{log}} = \ln(y)$, or transition the loss function to **Huber Loss** or **Mean Absolute Error (MAE)**. Evaluating in log-space converts absolute dollar errors into relative percentage errors, preventing multi-million dollar luxury outliers from dominating parameter optimization.

> [!Important]
> **Align threshold choices with real-world failure costs**: in clinical or safety systems where misses are fatal, lower decision thresholds to maximize Recall; in rare-event detection, validate models using Precision-Recall curves rather than ROC curves.

### Self-Assessment Technical Calculations

#### Problem 1: Binary Confusion Matrix and $F_\beta$ Metric Evaluation

A medical diagnostic test is evaluated on a validation cohort of $N = 1,000$ patients. The binary confusion matrix evaluates as:
- $\text{True Positives (TP)} = 70$
- $\text{False Positives (FP)} = 10$
- $\text{False Negatives (FN)} = 30$
- $\text{True Negatives (TN)} = 890$

1. Compute Accuracy, Error Rate, and the true positive prevalence of the disease.
2. Compute Precision, Recall (Sensitivity), Specificity, and the False Positive Rate (FPR).
3. Calculate the $F_1$-score.
4. Calculate the $F_2$-score ($\beta = 2.0$), and explain why a clinical team would prioritize $F_2$ over $F_1$.

*Stepwise Solution:*
1. Baseline Cohort Metrics:
   - Total sample size: $N = 70 + 10 + 30 + 890 = 1,000$.
   - True positive disease prevalence:
     $$\text{Prevalence} = \frac{\text{TP} + \text{FN}}{\text{Total}} = \frac{70 + 30}{1000} = \frac{100}{1000} = \mathbf{0.1000} \quad (10.0\%)$$
   - Classification Accuracy:
     $$\text{Accuracy} = \frac{\text{TP} + \text{TN}}{\text{Total}} = \frac{70 + 890}{1000} = \frac{960}{1000} = \mathbf{0.9600} \quad (96.0\%)$$
   - Error Rate:
     $$\text{Error Rate} = 1 - \text{Accuracy} = 1 - 0.9600 = \mathbf{0.0400} \quad (4.0\%)$$
2. Precision, Recall, and Specificity:
   - Precision (Positive Predictive Value):
     $$\text{Precision} = \frac{\text{TP}}{\text{TP} + \text{FP}} = \frac{70}{70 + 10} = \frac{70}{80} = \mathbf{0.8750} \quad (87.5\%)$$
   - Recall (Sensitivity / True Positive Rate):
     $$\text{Recall} = \frac{\text{TP}}{\text{TP} + \text{FN}} = \frac{70}{70 + 30} = \frac{70}{100} = \mathbf{0.7000} \quad (70.0\%)$$
   - Specificity (True Negative Rate):
     $$\text{Specificity} = \frac{\text{TN}}{\text{TN} + \text{FP}} = \frac{890}{890 + 10} = \frac{890}{900} \approx \mathbf{0.9889} \quad (98.89\%)$$
   - False Positive Rate (Fall-out):
     $$\text{FPR} = 1 - \text{Specificity} = \frac{\text{FP}}{\text{TN} + \text{FP}} = \frac{10}{900} \approx \mathbf{0.0111} \quad (1.11\%)$$
3. $F_1$-Score Calculation ($\beta = 1.0$):
   $$F_1 = 2 \times \frac{\text{Precision} \cdot \text{Recall}}{\text{Precision} + \text{Recall}} = 2 \times \frac{0.8750 \times 0.7000}{0.8750 + 0.7000} = 2 \times \frac{0.6125}{1.5750} = \frac{1.2250}{1.5750} \approx \mathbf{0.7778}$$
4. $F_2$-Score Calculation ($\beta = 2.0$):
   - State the general $F_\beta$ formula:
     $$F_\beta = (1 + \beta^2) \frac{\text{Precision} \cdot \text{Recall}}{\beta^2 \text{Precision} + \text{Recall}}$$
   - Substitute $\beta = 2.0 \implies \beta^2 = 4.0$:
     $$F_2 = (1 + 4) \frac{0.8750 \times 0.7000}{4(0.8750) + 0.7000} = 5 \times \frac{0.6125}{3.5000 + 0.7000} = \frac{3.0625}{4.2000} \approx \mathbf{0.7292}$$
   - Clinical interpretation: The $F_2$-score weights Recall twice as heavily as Precision. In clinical diagnosis, missing an active patient ($\text{FN} = 30$) carries far higher risk than issuing a false positive screening requiring follow-up testing ($\text{FP} = 10$). Because Recall is only $70\%$, the $F_2$-score drops to $0.7292$, penalizing the model for missed cases.

#### Problem 2: Continuous Regression Error and Coefficient of Determination ($R^2$)

A regression model predicts output targets for five test instances. The ground-truth values and model predictions evaluate as:
- Ground-Truth Targets: $y = [10.0, \; 20.0, \; 30.0, \; 40.0, \; 50.0]^T$
- Model Predictions: $\hat{y} = [12.0, \; 18.0, \; 32.0, \; 38.0, \; 54.0]^T$

1. Compute the raw residual vector $e_i = y_i - \hat{y}_i$.
2. Compute Mean Absolute Error (MAE), Mean Squared Error (MSE), and Root Mean Squared Error (RMSE).
3. Compute the Total Sum of Squares ($\text{SS}_{\text{tot}}$) and Residual Sum of Squares ($\text{SS}_{\text{res}}$).
4. Calculate the Coefficient of Determination ($R^2$).

*Stepwise Solution:*
1. Residual Evaluation:
   - $e_1 = 10.0 - 12.0 = \mathbf{-2.0}$
   - $e_2 = 20.0 - 18.0 = \mathbf{+2.0}$
   - $e_3 = 30.0 - 32.0 = \mathbf{-2.0}$
   - $e_4 = 40.0 - 38.0 = \mathbf{+2.0}$
   - $e_5 = 50.0 - 54.0 = \mathbf{-4.0}$
   - Absolute residuals: $|e| = [2.0, \; 2.0, \; 2.0, \; 2.0, \; 4.0]^T$
   - Squared residuals: $e^2 = [4.0, \; 4.0, \; 4.0, \; 4.0, \; 16.0]^T$
2. Metric Calculations:
   - Mean Absolute Error:
     $$\text{MAE} = \frac{1}{5} \sum_{i=1}^5 |e_i| = \frac{2.0 + 2.0 + 2.0 + 2.0 + 4.0}{5} = \frac{12.0}{5} = \mathbf{2.4000}$$
   - Mean Squared Error:
     $$\text{MSE} = \frac{1}{5} \sum_{i=1}^5 e_i^2 = \frac{4.0 + 4.0 + 4.0 + 4.0 + 16.0}{5} = \frac{32.0}{5} = \mathbf{6.4000}$$
   - Root Mean Squared Error:
     $$\text{RMSE} = \sqrt{\text{MSE}} = \sqrt{6.4000} \approx \mathbf{2.5298}$$
3. Sum of Squares Evaluation:
   - Target sample mean:
     $$\bar{y} = \frac{10.0 + 20.0 + 30.0 + 40.0 + 50.0}{5} = \frac{150.0}{5} = 30.0$$
   - Total Sum of Squares ($\text{SS}_{\text{tot}} = \sum (y_i - \bar{y})^2$):
     $$\text{SS}_{\text{tot}} = (10-30)^2 + (20-30)^2 + (30-30)^2 + (40-30)^2 + (50-30)^2$$
     $$\text{SS}_{\text{tot}} = (-20)^2 + (-10)^2 + (0)^2 + (10)^2 + (20)^2 = 400.0 + 100.0 + 0.0 + 100.0 + 400.0 = \mathbf{1000.0}$$
   - Residual Sum of Squares ($\text{SS}_{\text{res}} = \sum e_i^2$):
     $$\text{SS}_{\text{res}} = 4.0 + 4.0 + 4.0 + 4.0 + 16.0 = \mathbf{32.0}$$
4. Coefficient of Determination ($R^2$):
   $$R^2 = 1 - \frac{\text{SS}_{\text{res}}}{\text{SS}_{\text{tot}}} = 1 - \frac{32.0}{1000.0} = 1 - 0.0320 = \mathbf{0.9680} \quad (96.8\%)$$
*Conclusion:* The regression model explains $96.8\%$ of the total variance in the target variable relative to the mean baseline.

#### Problem 3: Multiclass Aggregation: Macro-F1 Versus Micro-F1 Computation

A 3-class classifier predicts categories $A, B$, and $C$ across a test cohort of $N = 120$ instances. The empirical confusion matrix (rows = actual ground truth, columns = model predictions) evaluates as:

$$\begin{pmatrix} & \text{Pred } A & \text{Pred } B & \text{Pred } C \\ \text{Actual } A & 50 & 5 & 5 \\ \text{Actual } B & 10 & 30 & 10 \\ \text{Actual } C & 2 & 3 & 5 \end{pmatrix}$$

1. Compute class-level $\text{TP}_k, \text{FP}_k$, and $\text{FN}_k$ for each of the three classes.
2. Calculate individual Precision, Recall, and $F_1$-scores for Class $A$, Class $B$, and Class $C$.
3. Compute the global **Macro-Averaged $F_1$-score**.
4. Compute the global **Micro-Averaged $F_1$-score**, and explain why the micro score exceeds the macro score.

*Stepwise Solution:*
1. Class-Level Confusion Counts:
   - **Class A:**
     - $\text{TP}_A = 50$
     - $\text{FP}_A = 10 + 2 = 12$ (Column sum minus diagonal)
     - $\text{FN}_A = 5 + 5 = 10$ (Row sum minus diagonal)
   - **Class B:**
     - $\text{TP}_B = 30$
     - $\text{FP}_B = 5 + 3 = 8$
     - $\text{FN}_B = 10 + 10 = 20$
   - **Class C (Rare Minority Class):**
     - $\text{TP}_C = 5$
     - $\text{FP}_C = 5 + 10 = 15$
     - $\text{FN}_C = 2 + 3 = 5$
2. Per-Class Precision, Recall, and $F_1$:
   - **Class A:**
     $$\text{Prec}_A = \frac{50}{50 + 12} = \frac{50}{62} \approx 0.8065$$
     $$\text{Rec}_A = \frac{50}{50 + 10} = \frac{50}{60} \approx 0.8333$$
     $$F_{1, A} = 2 \times \frac{0.8065 \times 0.8333}{0.8065 + 0.8333} = \frac{1.3441}{1.6398} \approx \mathbf{0.8197}$$
   - **Class B:**
     $$\text{Prec}_B = \frac{30}{30 + 8} = \frac{30}{38} \approx 0.7895$$
     $$\text{Rec}_B = \frac{30}{30 + 20} = \frac{30}{50} = 0.6000$$
     $$F_{1, B} = 2 \times \frac{0.7895 \times 0.6000}{0.7895 + 0.6000} = \frac{0.9474}{1.3895} \approx \mathbf{0.6818}$$
   - **Class C:**
     $$\text{Prec}_C = \frac{5}{5 + 15} = \frac{5}{20} = 0.2500$$
     $$\text{Rec}_C = \frac{5}{5 + 5} = \frac{5}{10} = 0.5000$$
     $$F_{1, C} = 2 \times \frac{0.2500 \times 0.5000}{0.2500 + 0.5000} = \frac{0.2500}{0.7500} \approx \mathbf{0.3333}$$
3. Macro-Averaged $F_1$-Score:
   $$\text{Macro-}F_1 = \frac{F_{1, A} + F_{1, B} + F_{1, C}}{3} = \frac{0.8197 + 0.6818 + 0.3333}{3} = \frac{1.8348}{3} \approx \mathbf{0.6116} \quad (61.16\%)$$
4. Micro-Averaged $F_1$-Score:
   - Sum global counts:
     $$\sum \text{TP} = 50 + 30 + 5 = 85$$
     $$\sum \text{FP} = 12 + 8 + 15 = 35$$
     $$\sum \text{FN} = 10 + 20 + 5 = 35$$
   - Evaluate global metrics:
     $$\text{Micro-Precision} = \frac{\sum \text{TP}}{\sum \text{TP} + \sum \text{FP}} = \frac{85}{85 + 35} = \frac{85}{120} \approx 0.7083$$
     $$\text{Micro-Recall} = \frac{\sum \text{TP}}{\sum \text{TP} + \sum \text{FN}} = \frac{85}{85 + 35} = \frac{85}{120} \approx 0.7083$$
     $$\text{Micro-}F_1 = 2 \times \frac{0.7083 \times 0.7083}{0.7083 + 0.7083} = \mathbf{0.7083} \quad (70.83\%)$$
*Conclusion:* Micro-$F_1$ evaluates to $70.83\%$ because it pools predictions globally, allowing strong performance on the dominant majority class ($A$, containing 60 samples) to mask errors. Macro-$F_1$ weights all classes equally, dropping to $61.16\%$ and exposing poor performance on minority Class $C$.

> [!Tip]
> **Manual metric tracing exposes aggregation bias**: calculating per-class confusion matrices confirms that Micro-averaging favors majority class performance, while Macro-averaging treats all categories with equal importance.

## Key Takeaways

- **Supervised learning divides into continuous regression and discrete classification**, estimating conditional expectations or geometric decision boundaries.
- **Discriminative models optimize boundaries directly** ($P(Y \mid X)$), while **generative models estimate joint distributions** ($P(X, Y)$), using Bayes' theorem to evaluate posteriors.
- **The accuracy paradox occurs on imbalanced data**, where predicting the majority class yields deceptively high accuracy while completely failing on minority targets.
- **Precision measures false alarm costs**, while **Recall measures missed detection costs**; the $F_\beta$-score balances them using weighted harmonic means.
- **AUC-ROC evaluates threshold-independent ranking discrimination**, remaining invariant to class distribution shifts.
- **Precision-Recall curves are mandatory for rare-event detection**, exposing false positive surges that ROC curves hide behind large True Negative counts.
- **Regression metrics evaluate residual errors**: MAE penalizes deviations linearly to maintain outlier robustness, while RMSE squares deviations to heavily penalize large errors.
- **Multiclass aggregation strategies alter diagnostic conclusions**: Micro-averaging reflects global sample accuracy, while Macro-averaging gives equal weight to all classes, highlighting minority class failure.

> [!Tip]
> The foundational law of supervised evaluation: **the evaluation metric must reflect real-world error costs**; optimizing an algorithm for accuracy on imbalanced data produces degenerate models, while aligning objective metrics with operational costs ensures that machine learning systems deliver practical value.
