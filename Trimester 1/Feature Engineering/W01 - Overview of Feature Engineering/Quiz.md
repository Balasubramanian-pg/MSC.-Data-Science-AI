# Week 1 Quiz

<img width="420" height="715" alt="image" src="https://github.com/user-attachments/assets/6af7ee6d-e4b4-431e-9f29-59cb8d7f498b" />

# Question 1

What happens as dimensionality increases?

## Options

* Training becomes faster.
* Data becomes more compact.
* Data becomes sparse.
* Euclidean distances become more meaningful.

## Answer

✅ **Data becomes sparse.**

> [!NOTE]
> **Reason**
>
> As the number of dimensions increases, data points occupy a much larger feature space. Since the amount of data usually does not grow proportionally, observations become increasingly spread out, resulting in **sparse data**. This phenomenon is a key aspect of the **curse of dimensionality**.

# Question 2

Which model technique inherently provides feature importance?

## Options

* PCA
* KMeans
* DBSCAN
* Random Forest

## Answer

✅ **Random Forest**

> [!NOTE]
> **Reason**
>
> **Random Forest** naturally computes feature importance by measuring how much each feature contributes to reducing impurity across decision trees. PCA performs dimensionality reduction, while KMeans and DBSCAN are clustering algorithms and do not inherently provide feature importance scores.

# Question 3

In logistic regression, what do coefficients represent?

## Options

* Clustering boundaries
* Decision trees
* Distance between classes
* Weight for each feature in predicting log-odds

## Answer

✅ **Weight for each feature in predicting log-odds**

> [!NOTE]
> **Reason**
>
> In logistic regression, each coefficient represents the change in the **log-odds** of the target variable for a one-unit increase in the corresponding feature, assuming all other features remain constant. Larger absolute coefficients indicate stronger influence on the prediction.

# Question 4

Which of the following is not a feature transformation?

## Options

* One-hot encoding
* Normalisation
* Logarithmic scaling
* Random Oversampling

## Answer

✅ **Random Oversampling**

> [!NOTE]
> **Reason**
>
> **Random Oversampling** is a data balancing technique used to address class imbalance by duplicating minority class samples. It does not transform or modify feature values. The other options directly transform or encode features.

# Question 5

What is the main goal of feature engineering?

## Options

* Visualise data only
* Improve predictive performance
* Create overfitting
* Reduce model complexity

## Answer

✅ **Improve predictive performance**

> [!NOTE]
> **Reason**
>
> The primary objective of **feature engineering** is to create, transform, or select features that help machine learning models capture underlying patterns more effectively, thereby improving predictive accuracy and overall model performance.
