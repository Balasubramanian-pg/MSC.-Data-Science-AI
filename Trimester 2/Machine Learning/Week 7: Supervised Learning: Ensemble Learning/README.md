# Migration in progress
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

Boosting trains weak learner