# Practice Quiz

<img width="463" height="812" alt="image" src="https://github.com/user-attachments/assets/4898ed6c-4f60-4c81-a3a6-121b495c24af" />

# Question 1

What is the primary goal of local or sample-level explainability?

## Options

* To understand the overall behavior of a model across the entire dataset.
* To provide a justification for a single prediction made by a complex model for an individual data point.
* To measure the central tendency and dispersion of the features.
* To determine which model, like Linear Regression or Gradient Boosting, is the most accurate.

## Answer

✅ **To provide a justification for a single prediction made by a complex model for an individual data point.**

> [!NOTE]
> **Reason**
>
> **Local explainability** focuses on explaining the prediction for a specific observation or data point. Techniques such as **LIME** and **SHAP** help identify which features contributed most to an individual prediction, making complex models more interpretable at the sample level.

# Question 2

Which classic method for calculating global feature importance is model-agnostic and works by measuring the performance drop after randomly shuffling a single feature's values?

## Options

* Tree-Based Feature Importance (Mean Decrease in Impurity)
* Permutation Feature Importance
* Aggregated SHAP
* Local Interpretable Model-agnostic Explanations (LIME)

## Answer

✅ **Permutation Feature Importance**

> [!NOTE]
> **Reason**
>
> **Permutation Feature Importance (PFI)** measures the importance of a feature by randomly shuffling its values and observing the resulting decrease in model performance. A significant performance drop indicates that the feature is important.
>
> PFI is **model-agnostic**, meaning it can be applied to any trained predictive model.

# Question 3

In a dataset with a positive (right-skewed) distribution, such as household income, the mean is typically less than the median.

## Options

* True
* False

## Answer

✅ **False**

> [!NOTE]
> **Reason**
>
> In a **right-skewed (positively skewed)** distribution, extreme high values pull the **mean** toward the right tail.
>
> Therefore:
>
> **Mean > Median > Mode**
>
> Hence, the statement is false because the mean is typically **greater than** the median.

# Question 4

According to the presentation, what is a primary disadvantage of using tree-based feature importance (mean decrease in impurity)?

## Options

* It can be biased and inflate the importance of high-cardinality features.
* It can only be used for regression problems, not classification.
* It is a model-agnostic method.
* It is very computationally expensive and slow to calculate.

## Answer

✅ **It can be biased and inflate the importance of high-cardinality features.**

> [!NOTE]
> **Reason**
>
> Tree-based feature importance based on **Mean Decrease in Impurity (MDI)** tends to favor features with many unique values (high cardinality), potentially assigning them artificially high importance scores even when they are not truly predictive.

# Question 5

A box plot is a powerful visualization of the five-number summary. What does the "box" part of the plot represent?

## Options

* The mean and the mode of the distribution.
* The full range of the data from minimum to maximum.
* The Interquartile Range (IQR), representing the middle 50% of the data.
* Only the outliers present in the dataset.

## Answer

✅ **The Interquartile Range (IQR), representing the middle 50% of the data.**

> [!NOTE]
> **Reason**
>
> In a box plot, the box extends from the **first quartile (Q1)** to the **third quartile (Q3)**.
>
> The difference between these quartiles is the **Interquartile Range (IQR = Q3 - Q1)**, which contains the middle 50% of the observations and provides a robust measure of data spread.
