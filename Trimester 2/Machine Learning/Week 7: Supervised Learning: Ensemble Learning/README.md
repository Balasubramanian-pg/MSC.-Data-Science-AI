# Week 7: Supervised Learning: Ensemble Learning

## 1. Introduction to Ensemble Learning

### What is Ensemble Learning?
Ensemble learning is a machine learning paradigm where **multiple base models (often called "weak learners")** are trained and combined to solve a single prediction problem. 

* **Weak Learner:** A model that performs slightly better than random guessing (e.g., a shallow decision tree, also known as a decision stump).
* **Strong Learner:** A high-performing model with low bias and low variance.

### The Intuition: "Wisdom of the Crowd"
If you have $M$ independent classifiers, each with an error rate $\epsilon < 0.5$, the probability that the majority vote is wrong decreases exponentially as $M$ increases (analogous to **Condorcet’s Jury Theorem**).

### Bias-Variance Tradeoff Perspective
* Models with **high variance** (e.g., deep decision trees) tend to overfit.
* Models with **high bias** (e.g., shallow linear models) tend to underfit.
* Different ensemble techniques are engineered to explicitly reduce **variance**, **bias**, or both.

---

## 2. Taxonomy of Ensemble Methods

Ensemble techniques generally fall into four main categories:

```
                  ┌────────────────────────────────────────┐
                  │            Ensemble Methods            │
                  └──────────────────┬─────────────────────┘
         ┌───────────────────────────┼───────────────────────────┐
         ▼                           ▼                           ▼
    Simple Voting/Averaging       Bagging                     Boosting                  Stacking
  (Hard/Soft Voting)       (Parallel / Variance ↓)    (Sequential / Bias ↓)     (Meta-learner / Heterogeneous)
```

---

## 3. Simple Ensembles: Voting & Averaging

Used primarily when combining heterogeneous models (e.g., combining a Logistic Regression, an SVM, and a Random Forest).

### Classification: Voting
* **Hard Voting (Majority Rule):** The final class is the class predicted by the majority of individual classifiers:
  $$\hat{y} = \text{mode}\{C_1(x), C_2(x), \dots, C_M(x)\}$$
* **Soft Voting (Weighted Probabilities):** Predicts the class with the highest average predicted probability across all models. (Generally performs better than hard voting because it gives more weight to highly confident predictions):
  $$\hat{y} = \arg\max_{c} \frac{1}{M} \sum_{m=1}^{M} P_m(y = c \mid x)$$

### Regression: Averaging
* **Simple Average:** $\hat{y} = \frac{1}{M} \sum_{m=1}^{M} \hat{y}_m$
* **Weighted Average:** $\hat{y} = \sum_{m=1}^{M} w_m \hat{y}_m$, where $\sum w_m = 1$ (weights often reflect validation performance).

---

## 4. Bagging (Bootstrap Aggregating)

### Goal: **Reduce Variance** without increasing Bias

### How Bagging Works:
1. **Bootstrapping:** From a dataset of size $N$, sample $N$ points **uniformly at random with replacement** to create $B$ separate bootstrap samples.
   * On average, each bootstrap sample contains roughly **$63.2\%$** of the unique original data points; the remaining **$36.8\%$** are left out (called **Out-of-Bag / OOB** data).
2. **Parallel Training:** Train a separate high-variance base model (e.g., a fully grown, unpruned decision tree) independently on each bootstrap sample.
3. **Aggregation:**
   * For **Regression:** Average the predictions: $\hat{y} = \frac{1}{B} \sum_{b=1}^{B} f_b(x)$
   * For **Classification:** Majority vote.

### Out-of-Bag (OOB) Evaluation:
* Because each sample was excluded from $\approx 36.8\%$ of the trees, we can evaluate each tree using only the samples it was never trained on.
* OOB score serves as an integrated cross-validation metric without requiring a separate validation set.

---

## 5. Random Forests (Bagging + Feature Subspace)

A Random Forest is an extension of Bagging applied to decision trees, designed to **decorrelate** the trees.

### The Problem with Simple Bagging of Trees:
If one or two features are dominant predictors, almost all bagged trees will split on them first. This makes the trees correlated, limiting variance reduction.

### The Random Forest Solution:
1. **Row Sampling:** Bootstrap sampling of training data (same as standard Bagging).
2. **Feature Sampling:** At **each split** within every tree, select a random subset of $m$ features from the total $p$ available features:
   * **Classification:** typically $m \approx \sqrt{p}$
   * **Regression:** typically $m \approx \frac{p}{3}$
3. Search for the best split **only among those $m$ features**.

### Feature Importance:
* **MDI (Mean Decrease Impurity / Gini Importance):** Total reduction in node impurity brought by a feature, averaged across all trees.
* **MDA (Mean Decrease Accuracy / Permutation Importance):** Measure the drop in performance when the values of a feature are randomly shuffled in the OOB set.

---

## 6. Boosting

### Goal: **Reduce Bias** (and incrementally reduce Variance)

Boosting trains weak learners **sequentially**. Each learner focuses on the mistakes made by the previous learners.

### A. AdaBoost (Adaptive Boosting)
* **Mechanism:** Adjusts the **sample weights** at each iteration.
* **Workflow:**
  1. Initialize all sample weights equally: $w_i = \frac{1}{N}$.
  2. Train a weak learner (usually a decision stump).
  3. Calculate the weighted training error $\epsilon_t$.
  4. Compute the model's weight in the final ensemble:
     $$\alpha_t = \frac{1}{2} \ln \left( \frac{1 - \epsilon_t}{\epsilon_t} \right)$$
     *(Low error $\rightarrow$ large $\alpha_t$)*
  5. Update instance weights:
     * Correctly classified: $w_i \leftarrow w_i \cdot e^{-\alpha_t}$
     * Misclassified: $w_i \leftarrow w_i \cdot e^{\alpha_t}$
  6. Normalize weights and repeat.

### B. Gradient Boosting (GBM)
* **Mechanism:** Rather than adjusting sample weights, subsequent models are trained on the **pseudo-residuals** (the negative gradients of the loss function) of the previous models.
* **Residual Concept (Squared Error Loss):**
  $$r_{i, m} = y_i - \hat{y}_{i, (m-1)}$$
  A new decision tree $h_m(x)$ is trained to predict $r_{i, m}$.
* **Update Rule:**
  $$\hat{y}_{(m)} = \hat{y}_{(m-1)} + \eta \cdot h_m(x)$$
  where $\eta$ is the **learning rate / shrinkage parameter** ($0 < \eta \le 1$). Smaller $\eta$ prevents overfitting.

### Modern Gradient Boosting Libraries:
* **XGBoost (Extreme Gradient Boosted Trees):** Second-order Taylor approximation of loss, exact/approximate quantile splits, $L_1/L_2$ tree complexity regularization.
* **LightGBM:** Fast, leaf-wise tree growth instead of depth-wise, Histogram-based feature binning, GOSS (Gradient-based One-Side Sampling).
* **CatBoost:** Efficient native handling of categorical features without one-hot encoding, symmetric/oblivious decision trees to prevent target leakage.

---

## 7. Stacking (Stacked Generalization)

Stacking combines multiple **heterogeneous** models using another machine learning model (the **meta-learner**).

### Structure:
* **Base Models (Level-0):** Multiple distinct algorithms (e.g., Random Forest, SVM, LightGBM, Neural Net).
* **Meta-Model (Level-1):** A simpler model (e.g., Logistic Regression or Ridge Regression) that takes the predictions of the Level-0 models as input features to predict the final target.

```
       [ Training Data ]
         │     │     │
         ▼     ▼     ▼
     [Model 1][Model 2][Model 3]   <-- Level 0 Base Learners
         │     │     │
         └─────┼─────┘
               ▼
     [ Predicted Probabilities ]   <-- Level 1 Features
               │
               ▼
        [ Meta-Learner ]          <-- Level 1 (e.g., Logistic Regression)
               │
               ▼
        [ Final Output ]
```

> **Critical Rule (Preventing Leakage):** Meta-features must be generated using **Out-of-Fold (OOF) cross-validation**. If you use base model predictions on the data they were trained on, the meta-model will overfit to the base models' overconfidence.

---

## 8. Summary Comparison Table

| Feature | Bagging (e.g., Random Forest) | Boosting (e.g., XGBoost, LightGBM) | Stacking |
| :--- | :--- | :--- | :--- |
| **Base Models** | Homogeneous (independent) | Homogeneous (dependent) | Heterogeneous |
| **Training Process** | Parallel | Sequential | Staged (base $\rightarrow$ meta) |
| **Primary Error Reduction** | **Variance** | **Bias** | Both |
| **Base Learner Requirement** | High variance, unpruned (complex) | High bias, shallow (weak) | Diverse models |
| **Risk of Overfitting** | Very low (adding trees rarely overfits) | High if iterations are too large | Moderate (requires careful OOF setup) |
| **Hyperparameters to Tune** | `n_estimators`, `max_features` | `learning_rate`, `max_depth`, `n_estimators` | Choice of base models & meta-model |

---

## 9. Typical Exam & Interview Questions

1. **Why does Random Forest select a random subset of features at each split instead of using all features?**
   * *Answer:* To decorrelate the trees. If one feature is overwhelmingly predictive, all trees would split on it first, making the trees similar and limiting the variance reduction achieved by averaging.
2. **What is the mathematical fraction of samples left out in an Out-of-Bag (OOB) sample as $N \to \infty$?**
   * *Answer:* $\lim_{N \to \infty} \left(1 - \frac{1}{N}\right)^N = \frac{1}{e} \approx 0.368$ ($36.8\%$).
3. **Why do we use a low learning rate (shrinkage) in Gradient Boosting?**
   * *Answer:* A smaller learning rate forces the algorithm to make cautious, incremental updates, reducing the risk of overfitting and leaving room for subsequent trees to optimize different residual components.
4. **How does Stacking differ from Soft Voting?**
   * *Answer:* Soft voting assigns fixed or manually tuned weights to probabilities, whereas Stacking trains an actual machine learning model (the meta-learner) to discover the optimal weighting dynamically.
