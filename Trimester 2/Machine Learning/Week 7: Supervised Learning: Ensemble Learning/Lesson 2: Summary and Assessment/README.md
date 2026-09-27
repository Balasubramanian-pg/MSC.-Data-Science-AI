# Lesson 2: Summary and Assessment

## Part 1: Week 7 Executive Summary & Synthesis

### 1. The Core Paradigm
Ensemble methods construct a predictive engine $F(x)$ by aggregating $M$ base models $\{f_1(x), f_2(x), \dots, f_M(x)\}$. The foundational premise relies on **error decorrelation**: if errors produced by base models are zero-mean and uncorrelated, variance drops proportionally to $\frac{1}{M}$:

$$\operatorname{Var}\left(\frac{1}{M}\sum_{m=1}^M f_m(x)\right) = \frac{1}{M}\bar{\sigma}^2 + \frac{M-1}{M}\bar{\rho}\,\bar{\sigma}^2$$

* If pairwise correlation $\bar{\rho} \to 0$, the ensemble variance approaches $0$ as $M \to \infty$.
* If base learners are identical ($\bar{\rho} = 1$), the ensemble yields no variance reduction.

### 2. Comparative Mechanism Matrix

| Dimension | Bagging (Bootstrap Aggregation) | Boosting | Stacking (Stacked Generalization) |
| :--- | :--- | :--- | :--- |
| **Primary Objective** | **Variance reduction** ($\sigma^2 \downarrow$) | **Bias reduction** ($\text{Bias} \downarrow$) | Exploiting **hypothesis diversity** |
| **Base Model Dependency** | Fully independent (parallelizable) | Strictly sequential (iterative) | Independent base tier $\to$ Meta-tier |
| **Base Learner Complexity** | High variance / low bias (deep trees) | High bias / low variance (shallow stumps) | Heterogeneous algorithms |
| **Data Generation** | Uniform random sample with replacement ($N$ from $N$) | Iterative re-weighting or gradient residual fitting | Out-of-Fold (OOF) cross-validation splits |
| **Aggregation Rule** | Simple average or majority vote | Weighted additive combination | Learned meta-estimator function |
| **Risk of Overfitting** | Very low as $M \to \infty$ | High if $M$ is too large or $\eta$ not tuned | High if OOF protocol is violated |

### 3. Key Algorithmic Formulations

#### A. Random Forest
* **Subspace Randomization:** At each node split, evaluates only a subset of size $m \le p$ features (typically $m = \lfloor\sqrt{p}\rfloor$ for classification, $m = \lfloor p/3 \rfloor$ for regression) to force $\bar{\rho} \downarrow$.
* **Out-of-Bag (OOB) Invariant:** As $N \to \infty$, the probability a given sample is omitted from a bootstrap set is:
  $$\lim_{N \to \infty} \left(1 - \frac{1}{N}\right)^N = \frac{1}{e} \approx 0.3679$$
  Leaving $\approx 36.8\%$ of data available as an unbiased validation proxy for each tree.

#### B. Gradient Boosting Machine (GBM)
* Operates as **gradient descent in function space**.
* For step $m$ and loss function $L(y, \hat{y})$, compute pseudo-residuals:
  $$r_{im} = -\left[ \frac{\partial L(y_i, F(x_i))}{\partial F(x_i)} \right]_{F(x) = F_{m-1}(x)}$$
* Fit a base tree $h_m(x)$ to targets $\{r_{im}\}_{i=1}^N$.
* Update the ensemble with learning rate (shrinkage) $\eta \in (0, 1]$:
  $$F_m(x) = F_{m-1}(x) + \eta \cdot \gamma_m h_m(x)$$

#### C. Stacking Protocol
To construct meta-features $Z \in \mathbb{R}^{N \times K}$ from $K$ base models without label leakage:
1. Partition training data $\mathcal{D}_{\text{train}}$ into $J$ folds.
2. For fold $j \in \{1, \dots, J\}$, train base models on $\mathcal{D}_{-j}$ and predict on validation split $\mathcal{D}_j$.
3. Stack out-of-fold validation predictions to build training inputs for the Level-1 meta-learner.

## Part 2: Multiple-Choice Assessment

### Question 1
**Why does an AdaBoost classifier with decision stumps suffer severely when the training set contains high label noise (mislabeled instances)?**
* A) Stumps cannot compute non-linear split boundaries.
* B) The algorithm exponentially increases the weights of consistently misclassified points, causing subsequent learners to focus heavily on outliers and noise.
* C) The learning rate parameter $\eta$ decays to 0, terminating training prematurely.
* D) It triggers infinite loops during the normalization of sample weights $w_i$.

### Question 2
**Suppose you train a Random Forest with 1,000 deep decision trees on a tabular dataset. You decide to increase the number of trees to 5,000 without altering other hyperparameters. What is the expected outcome?**
* A) The model will overfit the training data due to excessive capacity.
* B) The training error will drop to exactly 0, but validation error will surge.
* C) The generalization error will plateau and converge; adding trees does not induce overfitting in Bagging.
* D) Feature importance rankings will invert because features become uncorrelated.

### Question 3
**In Gradient Boosted Regression Trees using Mean Squared Error loss $L(y, \hat{y}) = \frac{1}{2}(y - \hat{y})^2$, what target does the $m$-th tree fit?**
* A) The raw class labels $y_i$.
* B) The classic algebraic residuals $y_i - F_{m-1}(x_i)$.
* C) The absolute error signs $\operatorname{sign}(y_i - F_{m-1}(x_i))$.
* D) The ratio $\frac{y_i}{F_{m-1}(x_i)}$.

### Question 4
**A data scientist builds a Stacking classifier. They train three base models on the entire training set, generate predictions on that same training set, and feed those predictions as inputs to train a Logistic Regression meta-model. What fundamental flaw is present?**
* A) Target leakage leading to extreme optimism: the meta-model over-relies on whichever base model overfits the training set the most.
* B) Underfitting: the meta-model does not receive enough variance from the inputs.
* C) Multicollinearity: logistic regression cannot be trained on continuous probability inputs.
* D) The base models cannot be evaluated using ROC-AUC.

### Question 5
**How does feature subspace sampling (evaluating only $m = \sqrt{p}$ features per split) improve a Random Forest compared to a naive Bagged Tree ensemble?**
* A) It decreases the bias of individual base trees.
* B) It guarantees that every tree splits on the single globally optimal feature first.
* C) It reduces the pairwise correlation $\rho$ between trees, yielding a greater overall variance reduction when averaged.
* D) It eliminates the need for Out-of-Bag validation.

### Assessment Answer Key & Rationales

* **Q1: B** — AdaBoost updates weights via $w_{i}^{(t+1)} = w_i^{(t)} \exp(\alpha_t)$ for misclassified instances. Noisy/mislabeled instances are consistently misclassified, driving their weights exponentially upward and hijacking model capacity away from the underlying distribution.
* **Q2: C** — Bagging is a variance reduction technique. The strong law of large numbers guarantees convergence of the ensemble average as $M \to \infty$. Adding more trees reduces variance down to its asymptote ($\rho \sigma^2$); it does not increase variance or cause overfitting.
* **Q3: B** — The negative gradient of the squared loss is:
  $$-\frac{\partial L}{\partial F_{m-1}(x_i)} = -\left( -(y_i - F_{m-1}(x_i)) \right) = y_i - F_{m-1}(x_i)$$
  which is exactly the standard residual.
* **Q4: A** — If Level-0 models predict on their own training data, high-variance models (e.g., deep trees) will produce near-perfect predictions. The Level-1 meta-learner will learn to blindly trust that overfitted model, failing completely on unseen test data. Out-of-Fold (OOF) cross-validation is mandatory.
* **Q5: C** — If a dataset has a few dominant predictors, standard bagged trees will repeatedly split on those same features, making the resulting trees structurally correlated ($\rho \approx 1$). Restricting split candidates forces trees to explore alternative features, decorrelating them and lowering ensemble variance.

## Part 3: Quantitative & Analytical Problems

### Problem 1: AdaBoost Step-by-Step Numerical Run
Consider a binary classification problem with targets $y \in \{-1, +1\}$ and $N = 4$ observations. 
At iteration $t=1$, all weights are initialized uniformly: $w_i^{(1)} = 0.25$ for $i \in \{1, 2, 3, 4\}$.

A base learner $h_1(x)$ produces the following predictions:
* Observation 1: $y_1 = +1$, $h_1(x_1) = +1$
* Observation 2: $y_2 = +1$, $h_1(x_2) = +1$
* Observation 3: $y_3 = -1$, $h_1(x_3) = +1$ *(Misclassified)*
* Observation 4: $y_4 = -1$, $h_1(x_4) = -1$

**Tasks:**
1. Compute the weighted error $\epsilon_1$.
2. Compute the model weight coefficient $\alpha_1$.
3. Compute the unnormalized updated weights $\tilde{w}_i^{(2)}$ and the normalized weights $w_i^{(2)}$.

#### Solution:
**1. Weighted Error:**
$$\epsilon_1 = \sum_{i: y_i \neq h_1(x_i)} w_i^{(1)} = w_3^{(1)} = 0.25$$

**2. Model Weight $\alpha_1$:**
$$\alpha_1 = \frac{1}{2} \ln\left(\frac{1 - \epsilon_1}{\epsilon_1}\right) = \frac{1}{2} \ln\left(\frac{0.75}{0.25}\right) = \frac{1}{2} \ln(3) \approx \frac{1}{2}(1.0986) \approx 0.5493$$

**3. Weight Updates:**
Using the update rule $\tilde{w}_i^{(2)} = w_i^{(1)} \exp\left(-\alpha_1 y_i h_1(x_i)\right)$:
* Note that $e^{-\alpha_1} = e^{-\frac{1}{2}\ln(3)} = 3^{-1/2} = \frac{1}{\sqrt{3}} \approx 0.5774$
* Note that $e^{\alpha_1} = e^{\frac{1}{2}\ln(3)} = \sqrt{3} \approx 1.7321$

For correctly classified samples ($i \in \{1, 2, 4\}$):
$$\tilde{w}_i^{(2)} = 0.25 \times e^{-\alpha_1} = 0.25 \times 0.5774 \approx 0.1443$$

For the misclassified sample ($i = 3$):
$$\tilde{w}_3^{(2)} = 0.25 \times e^{\alpha_1} = 0.25 \times 1.7321 \approx 0.4330$$

Normalization factor $Z_1$:
$$Z_1 = 3 \times (0.1443) + 0.4330 = 0.4330 + 0.4330 = 0.8660$$
*(Note: analytically, $Z_1 = 2\sqrt{\epsilon_1(1-\epsilon_1)} = 2\sqrt{0.25 \times 0.75} = 2 \times \frac{\sqrt{3}}{4} = \frac{\sqrt{3}}{2} \approx 0.8660$)*

Normalized weights:
$$w_1^{(2)} = w_2^{(2)} = w_4^{(2)} = \frac{0.1443}{0.8660} = \frac{1}{6} \approx 0.1667$$
$$w_3^{(2)} = \frac{0.4330}{0.8660} = \frac{3}{6} = 0.5000$$

*(The misclassified point now accounts for exactly $50\%$ of the total weight mass for the next iteration).*

### Problem 2: Gradient Boosting with Absolute Error Loss (L1 Loss)
Consider training a Gradient Boosting regressor using Mean Absolute Error:
$$L(y, \hat{y}) = |y - \hat{y}|$$

**Task:**
1. Derive the pseudo-residual expression $r_{im} = -\left[\frac{\partial L(y_i, F(x_i))}{\partial F(x_i)}\right]_{F=F_{m-1}}$.
2. Explain why Gradient Boosting using L1 loss is significantly more robust to label outliers than standard GBM using L2 loss.

#### Solution:
**1. Derivative:**
The derivative of $|y_i - F(x_i)|$ with respect to $F(x_i)$ is:
$$\frac{\partial |y_i - F(x_i)|}{\partial F(x_i)} = -\operatorname{sign}(y_i - F(x_i)) \quad (\text{for } y_i \neq F(x_i))$$
Therefore, the negative gradient (pseudo-residual) is:
$$r_{im} = -\left( -\operatorname{sign}(y_i - F_{m-1}(x_i)) \right) = \operatorname{sign}(y_i - F_{m-1}(x_i))$$
$$r_{im} \in \{-1, +1\}$$

**2. Robustness to Outliers:**
* In **L2 loss**, residuals are $r_{im} = y_i - F_{m-1}(x_i)$. If an outlier has an extreme value (e.g., $y_i = 10,000$ while predictions are $\approx 10$), the residual is enormous ($9,990$). The next tree will devote most of its splits and leaf values to fitting this single point.
* In **L1 loss**, the residual is strictly bounded to $\{-1, +1\}$ regardless of how extreme $|y_i - F_{m-1}(x_i)|$ is. The outlier exerts no more influence on the split criterion than any ordinary point whose sign is incorrect.

## Part 4: Applied Scenario & Architecture Exercises

### Scenario A: Real-Time Latency vs. Offline Batch
**Context:** You are deploying a fraud detection system. The inference endpoint must meet a strict Service Level Agreement (SLA): $P_{99} \text{ latency} < 10 \text{ ms}$. 
Your data science team developed two candidates:
1. **Model A:** A 2-tier Stacking Ensemble combining a Deep Neural Network, a CatBoost model, and a Random Forest (total 1,200 trees across models) routed into a Logistic Regression meta-learner.
2. **Model B:** A single LightGBM model with 120 trees, max depth of 6, utilizing native integer binning.

*Validation Metrics:*
* Model A: $\text{ROC-AUC} = 0.942$
* Model B: $\text{ROC-AUC} = 0.936$

**Engineering Decision Task:** Which model do you deploy to production, and why?
* **Answer & Rationale:** 
  Deploy **Model B**. 
  Although Model A achieves a marginally higher AUC ($+0.006$), computing inference across a heterogeneous ensemble (Neural Net + CatBoost + Random Forest) requires sequential/parallel dependencies, significant memory bandwidth, feature transformations for multiple paradigms, and inference across over 1,200 trees plus neural forward passes. This architecture is almost guaranteed to violate the $10\text{ ms}$ SLA at $P_{99}$. 
  LightGBM evaluates 120 depth-bounded trees via shallow lookups and histogram-binned routing, typically executing in $< 1\text{ ms}$ per sample. The negligible AUC gain in Model A does not offset the latency risk and operational overhead.

### Scenario B: Diagnosing Model Degradation
**Context:** You train an XGBoost model on financial loan data.
* Training Set Log-Loss: **0.11**
* Validation Set Log-Loss: **0.48**

**Diagnosis & Remediation Task:**
1. Identify the primary problem in terms of the bias-variance tradeoff.
2. Propose three specific hyperparameter modifications in XGBoost to rectify this condition.

* **Answer & Rationale:**
  1. **Diagnosis:** Severe **overfitting** (high variance). The model is memorizing training instances and failing to generalize to validation data.
  2. **Remediation Hyperparameters:**
     * **Decrease `max_depth`:** (e.g., from default 6 down to 3 or 4) to limit individual tree capacity and higher-order feature interactions.
     * **Increase Regularization (`reg_lambda` / `reg_alpha` / `gamma`):** Increase L2 (`reg_lambda`) or L1 (`reg_alpha`) penalties on leaf weights, or increase `gamma` (minimum loss reduction required to make a further partition).
     * **Introduce Subsampling (`subsample` and `colsample_bytree`):** Set row subsampling to $0.7 - 0.8$ and column subsampling to $0.6 - 0.8$ to inject randomness and reduce correlation across sequential trees.
     * *(Alternative)*: **Decrease `learning_rate` ($\eta$)** while using **Early Stopping** based on validation loss.

## Part 5: Practical Implementation Checklist

Before completing Week 7, ensure you can reproduce this standard ensemble pipeline:

```python
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, StackingClassifier
from sklearn.linear_model import LogisticRegression
from xgboost import XGBClassifier

# 1. Setup synthetic data
X, y = make_classification(n_samples=5000, n_features=25, n_informative=15, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 2. Define Level-0 base learners
base_learners = [
    ('rf', RandomForestClassifier(n_estimators=100, max_depth=6, random_state=42)),
    ('xgb', XGBClassifier(n_estimators=100, max_depth=3, learning_rate=0.05, random_state=42))
]

# 3. Define Level-1 meta learner with Out-of-Fold CV
stacking_clf = StackingClassifier(
    estimators=base_learners,
    final_estimator=LogisticRegression(),
    cv=5,  # Mandatory 5-fold CV to prevent target leakage into the meta-estimator
    n_jobs=-1
)

# 4. Fit & Evaluate
stacking_clf.fit(X_train, y_train)
acc = stacking_clf.score(X_test, y_test)
print(f"Stacking Ensemble Test Accuracy: {acc:.4f}")
```
