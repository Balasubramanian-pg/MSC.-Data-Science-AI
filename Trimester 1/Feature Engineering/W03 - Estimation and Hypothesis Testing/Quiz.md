# Week 3 Quiz

<img width="435" height="799" alt="image" src="https://github.com/user-attachments/assets/28c24f7d-828c-4459-979f-ffc7399550a8" />

# Question 1

Which of the following techniques is most appropriate for transforming a paragraph of text into a numeric feature vector?

## Options

* Feature Selection
* Feature Construction
* Feature Extraction
* Wrapper Method

## Answer

✅ **Feature Extraction**

> [!NOTE]
> **Reason**
>
> **Feature Extraction** converts raw data into a set of numerical features that can be used by machine learning algorithms. In text analytics, techniques such as **Bag of Words**, **TF-IDF**, and **word embeddings** transform text paragraphs into numeric vectors suitable for modeling.

# Question 2

Why might applying LASSO (L1 regularization) be considered an embedded method for feature selection?

## Options

* It removes features during model training by shrinking some coefficients to zero.
* It uses pre-selected features before training begins.
* It measures correlation among features.
* It evaluates all feature combinations explicitly.

## Answer

✅ **It removes features during model training by shrinking some coefficients to zero.**

> [!NOTE]
> **Reason**
>
> **LASSO** is an embedded feature selection method because feature selection occurs **during model training itself**. The L1 penalty forces less important feature coefficients toward zero, effectively removing them from the model while simultaneously fitting the model.

# Question 3

Which filter method is best suited for identifying non-linear monotonic relationships between an ordinal feature and a continuous target?

## Options

* Chi-Square Test
* Spearman's Correlation
* Fisher Score
* Pearson's Correlation

## Answer

✅ **Spearman's Correlation**

> [!NOTE]
> **Reason**
>
> **Spearman's Correlation** measures the strength and direction of a **monotonic relationship** between variables using ranks rather than raw values. It can capture both linear and non-linear monotonic relationships, making it well-suited for ordinal features and continuous targets.
>
> **Pearson's Correlation** is primarily designed for linear relationships.

# Question 4

Which of the following is a wrapper method that begins with no features and incrementally adds the most beneficial feature at each step?

## Options

* Sequential Forward Selection
* Random Forest Feature Importance
* LASSO
* Sequential Backward Selection

## Answer

✅ **Sequential Forward Selection**

> [!NOTE]
> **Reason**
>
> **Sequential Forward Selection (SFS)** starts with an empty feature set and iteratively adds the feature that provides the greatest improvement in model performance at each step. Since it repeatedly trains and evaluates models, it is classified as a **wrapper method**.

# Question 5

Which method is most suitable when the dataset has very high dimensionality (e.g., gene expression data with 10,000+ features) and we want fast filtering of potentially relevant features?

## Options

* Embedded methods with SVM
* Backward Feature Elimination
* Fisher Score
* Wrapper methods with cross-validation

## Answer

✅ **Fisher Score**

> [!NOTE]
> **Reason**
>
> For extremely high-dimensional datasets, **filter methods** are generally preferred because they are computationally efficient and independent of any specific model. **Fisher Score** ranks features individually based on their discriminative power, making it particularly suitable for quickly filtering thousands of features before more sophisticated modeling.
