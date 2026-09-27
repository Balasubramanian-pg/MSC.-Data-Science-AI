# Migration in progress
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
Consider a binary classification problem with