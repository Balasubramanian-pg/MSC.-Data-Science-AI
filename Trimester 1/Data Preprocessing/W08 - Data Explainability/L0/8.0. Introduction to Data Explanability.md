# 8.0. Introduction to Data Explainability

## 8.0.1. The Imperative of Data Explainability

Transitioning from raw data to predictive models is insufficient in modern data science. We must understand the "why" behind the data's behaviour. Data explainability is the practice of interpreting and understanding the characteristics of a dataset and the behaviour of a model. 

Explainability builds trust. Without it, models are black boxes. We begin by analysing the distribution of the data itself, which reveals underlying patterns, skewness, and spread. This foundational analysis directly informs how we engineer features and interpret model outputs.

## 8.0.2. Analysing Data Distribution: Central Tendency

The first step in explaining a dataset is understanding its centre. Central tendency identifies the typical or central value around which data points cluster.

The **mean** is the arithmetic average, defined as:

$$
\mu = \frac{\sum X}{N}
$$

where:
- $$\mu$$ = population mean
- $$X$$ = each population observation
- $$N$$ = population size

For a sample, the mean is calculated as:

$$
\bar{x} = \frac{\sum x_i}{n}
$$

where:
- $$\bar{x}$$ = sample mean
- $$x_i$$ = individual sample observations
- $$n$$ = sample size

To emphasize the sample mean formula, we restate it:

$$
\bar{x} = \frac{\sum x_i}{n}
$$

The **median** is the middle value when data is sorted. It is robust to outliers, unlike the mean.

The **mode** is the most frequently occurring value. A dataset can have one mode (unimodal), two modes (bimodal), or multiple modes (multimodal).

## 8.0.3. Analysing Data Distribution: Spread and Variability

Central tendency alone is incomplete. Two datasets can have the same mean but vastly different spreads. Variability measures how dispersed the data points are around the centre.

The **variance** measures the average squared deviation from the mean. For a sample, it is defined as:

$$
s^2 = \frac{\sum (x_i - \bar{x})^2}{n - 1}
$$

where:
- $$s^2$$ = sample variance
- $$x_i$$ = individual sample observations
- $$\bar{x}$$ = sample mean
- $$n$$ = sample size

The **standard deviation** is the square root of the variance, bringing the measure back to the original units of the data:

$$
s = \sqrt{\frac{\sum (x_i - \bar{x})^2}{n - 1}}
$$

To emphasize the standard deviation formula, we restate it:

$$
s = \sqrt{\frac{\sum (x_i - \bar{x})^2}{n - 1}}
$$

The **Interquartile Range (IQR)** measures the spread of the middle 50% of the data. It is calculated as:

$$
\text{IQR} = Q_3 - Q_1
$$

where $$Q_3$$ is the 75th percentile and $$Q_1$$ is the 25th percentile. The IQR is highly robust to outliers.

## 8.0.4. Analysing Data Distribution: Shape, Skewness, and Modality

The shape of a distribution explains how data is distributed across its range. 

**Symmetry** occurs when the left and right sides of the distribution are mirror images. In a perfectly symmetric distribution, the mean, median, and mode are equal.

**Skewness** quantifies the asymmetry of the distribution. 

If the tail extends to the right, the distribution is **positively skewed** (right-skewed). In this case, the mean is typically greater than the median.

If the tail extends to the left, the distribution is **negatively skewed** (left-skewed). Here, the mean is typically less than the median.

**Modality** refers to the number of peaks in the distribution. A **unimodal** distribution has one peak, while a **bimodal** distribution has two, often indicating the presence of two distinct subpopulations.

>[!Note]
> Skewness dictates the choice of central tendency measure. For highly skewed data, the median is a far more explainable and reliable measure of the centre than the mean.

## 8.0.5. The Concept of Feature Importance

Transitioning from univariate data analysis to multivariate modelling, we must determine which attributes drive the outcomes. Feature importance quantifies the contribution of each attribute to the predictive power of a model.

Understanding feature importance is crucial for:
- **Interpretability**: Explaining which factors drive predictions.
- **Dimensionality Reduction**: Removing irrelevant or redundant features to simplify the model.
- **Feature Engineering**: Focusing efforts on creating variations of the most important drivers.

## 8.0.6. Tree-Based Feature Importance

Tree-based models, such as Random Forests and Gradient Boosting Machines, provide a natural mechanism for calculating feature importance. 

In a decision tree, each split aims to reduce impurity, such as the Gini impurity or variance. The **tree-based importance** of a feature is the total reduction in impurity attributable to that feature, averaged across all trees in the ensemble.

The importance of feature $$j$$ is calculated as:

$$
\text{Importance}(j) = \frac{\sum_{t=1}^{T} \sum_{s \in S_j} \Delta I(s)}{\sum_{k=1}^{d} \sum_{t=1}^{T} \sum_{s \in S_k} \Delta I(s)}
$$

where:
- $$T$$ = total number of trees
- $$S_j$$ = set of splits using feature $$j$$
- $$\Delta I(s)$$ = reduction in impurity at split $$s$$
- $$d$$ = total number of features

To emphasize the tree-based importance formula, we restate it:

$$
\text{Importance}(j) = \frac{\sum_{t=1}^{T} \sum_{s \in S_j} \Delta I(s)}{\sum_{k=1}^{d} \sum_{t=1}^{T} \sum_{s \in S_k} \Delta I(s)}
$$

>[!Warning]
> Tree-based importance is biased toward features with high cardinality (many unique values) or continuous features, as they have more opportunities to split and reduce impurity.

## 8.0.7. Permutation Feature Importance

To overcome the biases of tree-based importance, we use **permutation feature importance**. This model-agnostic method measures the increase in the model's prediction error after permuting a single feature.

If a feature is important, shuffling its values should destroy the relationship between the feature and the target, significantly increasing the model's error.

The permutation importance for feature $$j$$ is defined as:

$$
\text{PI}(j) = \text{Error}_{\text{permuted}}(j) - \text{Error}_{\text{baseline}}
$$

where:
- $$\text{PI}(j)$$ = permutation importance of feature $$j$$
- $$\text{Error}_{\text{permuted}}(j)$$ = model error after shuffling feature $$j$$
- $$\text{Error}_{\text{baseline}}$$ = original model error on the validation set

To emphasize the permutation importance formula, we restate it:

$$
\text{PI}(j) = \text{Error}_{\text{permuted}}(j) - \text{Error}_{\text{baseline}}
$$

A high positive value indicates that the model relies heavily on that feature. A value near zero indicates the feature is irrelevant.

## 8.0.8. Connecting Explainability to Modelling

Data explainability is not an isolated exercise; it directly informs model behaviour and performance. 

The distribution properties of the data dictate the assumptions of the model. For instance, linear regression assumes normally distributed residuals and is highly sensitive to skewed features and outliers. If a feature is heavily right-skewed, applying a logarithmic transformation can normalize its distribution, stabilizing the variance and improving the model's explainability and performance.

Similarly, feature importance reveals the key drivers in the data. If a model's predictions are driven entirely by a single feature that is known to be a data leakage artifact, the model is invalid. Explainability acts as a sanity check, ensuring the model learns genuine causal or correlative relationships rather than spurious patterns.

## 8.0.9. Example of Computing Distribution Metrics and Feature Importance

To solidify the mathematical concepts of data explainability, we apply the formulas to a concrete scenario.

Suppose:
- Sample data for a feature: 2, 4, 4, 4, 5, 5, 7, 9
- $$n = 8$$
- Baseline model error (Mean Squared Error): 10.0
- Model error after permuting the feature: 14.5

We want to compute the mean, standard deviation, and permutation importance.

### Step 1: Compute the Sample Mean
$$
\bar{x} = \frac{2 + 4 + 4 + 4 + 5 + 5 + 7 + 9}{8} = \frac{40}{8} = 5
$$

### Step 2: Calculate Squared Deviations from the Mean
$$
(2 - 5)^2 = 9
$$
$$
(4 - 5)^2 = 1
$$
$$
(4 - 5)^2 = 1
$$
$$
(4 - 5)^2 = 1
$$
$$
(5 - 5)^2 = 0
$$
$$
(5 - 5)^2 = 0
$$
$$
(7 - 5)^2 = 4
$$
$$
(9 - 5)^2 = 16
$$

### Step 3: Sum the Squared Deviations
$$
\sum (x_i - \bar{x})^2 = 9 + 1 + 1 + 1 + 0 + 0 + 4 + 16 = 32
$$

### Step 4: Compute the Sample Standard Deviation
$$
s = \sqrt{\frac{32}{8 - 1}} = \sqrt{\frac{32}{7}} \approx \sqrt{4.571} \approx 2.138
$$

### Step 5: Compute Permutation Importance
$$
\text{PI}(j) = 14.5 - 10.0 = 4.5
$$

The sample mean is **5**, the sample standard deviation is **2.138**, and the permutation importance is **4.5**.

## 8.0.10. Conclusions

Data explainability bridges the gap between complex algorithms and human understanding. By rigorously analysing data distributions and quantifying feature importance, we transform opaque models into transparent, trustworthy decision-making tools.

### 10.1. Summary of Distribution Metrics

The following table summarizes the primary metrics used to explain a dataset's distribution.

| Metric Category | Specific Metric | Formula / Definition | Primary Use Case |
|:---|:---|:---|:---|
| Central Tendency | Mean | $$\bar{x} = \frac{\sum x_i}{n}$$ | Symmetric data without outliers |
| Central Tendency | Median | Middle value of sorted data | Skewed data or data with outliers |
| Spread | Standard Deviation | $$s = \sqrt{\frac{\sum (x_i - \bar{x})^2}{n - 1}}$$ | Measuring average deviation from the mean |
| Spread | IQR | $$Q_3 - Q_1$$ | Measuring spread of the central 50% of data |

### 10.2. Summary of Feature Importance Methods

The following table compares the two primary methods for evaluating feature importance.

| Method | Mechanism | Key Advantage | Primary Limitation |
|:---|:---|:---|:---|
| Tree-Based | Total impurity reduction | Fast, computed during training | Biased toward high-cardinality features |
| Permutation | Increase in error after shuffling | Model-agnostic, no cardinality bias | Computationally expensive for large datasets |

>[!Tip]
> Always validate tree-based feature importance with permutation importance. Relying solely on impurity reduction can lead you to prioritize irrelevant features simply because they have many unique values.
