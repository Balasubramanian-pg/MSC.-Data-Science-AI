
<img width="401" height="730" alt="image" src="https://github.com/user-attachments/assets/af826752-4005-4146-a4c8-ca5934896a41" />

# Question 1

## Question

**Which transformation is most appropriate for stabilising variance in a highly right-skewed variable like "Annual Income"?**

### Options

* Equal-width Binning
* Min-Max Normalisation
* Z-score Standardisation
* Log Transformation

### Answer

✅ **Log Transformation**

> [!NOTE]
> **Reason**
>
> A highly right-skewed variable contains a long tail of very large values. A **log transformation** compresses these extreme values, reduces skewness, and stabilises variance. This often makes the distribution more symmetric and suitable for statistical modeling.
>
> Standardisation and normalisation only change the scale of the data; they do not remove skewness.

---

# Question 2

## Question

**Which of the following binning techniques ensures that each bin contains approximately the same number of data points?**

### Options

* Equal-frequency binning
* Equal-width binning
* K-means clustering
* Domain-specific binning

### Answer

✅ **Equal-frequency binning**

> [!NOTE]
> **Reason**
>
> In **equal-frequency binning** (also called quantile binning), the dataset is divided so that each bin contains roughly the same number of observations.
>
> In contrast:
>
> * **Equal-width binning** keeps interval sizes fixed, not observation counts.
> * **K-means clustering** forms clusters based on similarity.
> * **Domain-specific binning** relies on business rules.

---

# Question 3

## Question

**Why is feature scaling critical for distance-based models such as KNN or KMeans?**

### Options

* It helps convert categorical variables to numerical ones.
* It ensures no single feature dominates the distance metric.
* It removes all outliers.
* It reduces the number of features used.

### Answer

✅ **It ensures no single feature dominates the distance metric.**

> [!NOTE]
> **Reason**
>
> Distance-based algorithms compute similarity using measures such as Euclidean distance.
>
> If one feature has a much larger scale than others, it can dominate the distance calculation and bias the model.
>
> Feature scaling ensures that all features contribute more fairly to the distance computation.

---

# Question 4

## Question

**In a credit scoring model, converting a continuous credit score into a binary feature based on a threshold (e.g., 700) is an example of ____________.**

### Options

* Attribute smoothing
* Binarisation
* Feature scaling
* Normalisation

### Answer

✅ **Binarisation**

> [!NOTE]
> **Reason**
>
> **Binarisation** transforms a numerical variable into two categories, typically represented as **0 and 1**, using a threshold.
>
> Example:
>
> * Credit Score ≥ 700 → 1
> * Credit Score < 700 → 0
>
> This process creates a binary feature from a continuous variable.

---

# Question 5

## Question

**What is the most likely impact of not scaling features before applying KMeans clustering?**

### Options

* Increased convergence speed
* Biased clustering due to feature magnitude dominance
* Improved silhouette score
* More meaningful cluster centroids

### Answer

✅ **Biased clustering due to feature magnitude dominance**

> [!NOTE]
> **Reason**
>
> KMeans relies on distance calculations to assign observations to clusters.
>
> Without scaling, variables with larger numeric ranges disproportionately influence the clustering process.
>
> As a result, clusters become biased toward high-magnitude features rather than reflecting the true underlying structure of the data.

# Final Answers Summary

| Question | Correct Answer                                             |
| -------- | ---------------------------------------------------------- |
| Q1       | Log Transformation                                         |
| Q2       | Equal-frequency binning                                    |
| Q3       | It ensures no single feature dominates the distance metric |
| Q4       | Binarisation                                               |
| Q5       | Biased clustering due to feature magnitude dominance       |
