# 5.3. Data Normalization Techniques

## 5.3.1. Introduction to Normalization Techniques

In data engineering and statistical modeling, raw continuous attributes often exhibit different scales, units, and ranges.

**Data Normalization** is a core preprocessing step designed to scale continuous attributes so they conform to a uniform, standard range. When continuous features are not normalized, optimization algorithms (such as gradient descent) can experience slow convergence, and distance-based distance metrics can become highly biased toward features with larger absolute scales.

To address these issues, we select from several standard normalization techniques depending on the scale and distribution of the dataset.

## 5.3.2. Why Normalization is Necessary

We normalize continuous attributes to prevent features with naturally larger absolute scales from dominating the model's calculations.

For example, if a dataset contains both age (ranging from $$18.000$$ to $$80.000$$) and annual income (ranging from $$10,000.000$$ to $$1,000,000.000$$), any algorithm that relies on distance calculations (such as K-Means or KNN) will be dominated by the income feature. The mathematical contribution of the age feature is effectively reduced to zero, creating significant bias. Normalization resolves this scale dominance by mapping both features to a common, standardized range.

The first classical method used to achieve this scaling is Min-Max Normalization.

## 5.3.3. Min-Max Normalization

Min-Max normalization scales features to a specific, bounded target interval (typically $$[0.000, 1.000]$$).

### 3.1 Core Idea
Min-Max normalization performs a linear transformation on the original data, mapping the minimum observed value in the column to the lower boundary of the target interval and the maximum observed value to the upper boundary.

### 3.2 Formula
The general formula for Min-Max Normalization is mathematically defined as:

$$
v' = \frac{v - \min_A}{\max_A - \min_A} \times (new\_max_A - new\_min_A) + new\_min_A
$$

where:
- $$v'$$ = the normalized value
- $$v$$ = the original raw value
- $$\min_A$$ = the minimum observed value in column $$A$$
- $$\max_A$$ = the maximum observed value in column $$A$$
- $$new\_min_A$$ = the lower boundary of the target interval (typically $$0.000$$)
- $$new\_max_A$$ = the upper boundary of the target interval (typically $$1.000$$)

Let us explicitly restate this Min-Max formula for emphasis:

$$
v' = \frac{v - \min_A}{\max_A - \min_A} \times (new\_max_A - new\_min_A) + new\_min_A
$$

### 3.3 Linear Transformation Property
Min-Max normalization is a linear transformation. It preserves the exact relative relationships and proportions between the original data points, simply re-scaling them to fit within the new boundaries without altering the underlying shape of the distribution.

### 3.4 Advantages and Limitations
Min-Max normalization is highly effective for algorithms that assume bounded inputs (such as neural networks or image processing models). However, it is highly sensitive to outliers—a single extreme outlier will compress the normal sub-population into a tiny, indistinguishable interval near zero.

To address this sensitivity to outliers, we use Z-Score Normalization.

## 5.3.4. Z-Score Normalization

Z-Score Normalization (also known as standardization) standardizes features to have zero mean and unit variance.

### 4.1 Core Idea
Z-Score normalization scales features based on their mean and standard deviation. It does not enforce rigid, bounded intervals, making it highly robust to outliers.

### 4.2 Formula
The formula for Z-Score Normalization is mathematically defined as:

$$
v' = \frac{v - \mu_A}{\sigma_A}
$$

where:
- $$v'$$ = the standardized Z-score
- $$v$$ = the original raw value
- $$\mu_A$$ = the arithmetic mean of feature column $$A$$
- $$\sigma_A$$ = the standard deviation of feature column $$A$$

Let us explicitly restate this Z-score formula for emphasis:

$$
v' = \frac{v - \mu_A}{\sigma_A}
$$

### 4.3 Mean and Standard Deviation Formulation
The mean $$\mu_A$$ and standard deviation $$\sigma_A$$ are calculated over the observed column values using standard statistical estimators:

$$
\mu_A = \frac{1}{n} \sum_{i=1}^{n} v_i
$$

$$
\sigma_A = \sqrt{\frac{1}{n} \sum_{i=1}^{n} (v_i - \mu_A)^2}
$$

### 4.4 Robustness Against Outliers
Because Z-score normalization does not rely on absolute minimum and maximum boundaries, a single extreme outlier will not compress the rest of the distribution. The outlier will simply be mapped to a large positive or negative Z-score, preserving the statistical variation of the normal sub-population.

When computational simplicity is the primary constraint, we can use Decimal Scaling Normalization.

## 5.3.5. Decimal Scaling Normalization

Decimal Scaling Normalization scales features by moving the decimal point of values of attribute $$A$$.

### 5.1 Core Idea
Decimal scaling normalizes values by dividing them by a power of ten. The number of decimal places moved depends on the maximum absolute value in the column, ensuring that all normalized values are bounded within the interval $$[-1.000, 1.000]$$.

### 5.2 Formula
The formula for Decimal Scaling Normalization is mathematically defined as:

$$
v' = \frac{v}{10^j}
$$

where:
- $$v'$$ = the normalized value
- $$v$$ = the original raw value
- $$j$$ = the smallest integer such that the maximum absolute value of the normalized column is less than $$1.000$$:
  $$
  \max(|v'|) < 1.000
  $$

Let us explicitly restate this Decimal Scaling formula for emphasis:

$$
v' = \frac{v}{10^j}
$$

### 5.3 Relationship Preservation Discussion
Like Min-Max scaling, decimal scaling is a linear transformation. It preserves the exact relative differences and logical relationships between original values while scaling them down by a factor of $$10^j$$.

To clarify how these three normalization techniques operate on raw continuous data, let us walk through a manual calculation step-by-step.

## 5.3.6. Worked Mathematical Example: Step-by-Step Execution of the Three Methods

We will normalize a raw dataset containing three continuous transaction records using Min-Max scaling, Z-score standardization, and Decimal scaling.

Suppose:
- We have a small raw dataset representing daily transactions in USD ($$V$$) over three days:
  $$
  V = [10.000,\ 30.000,\ 100.000]
  $$
- We set our target interval for Min-Max normalization to the standard range of $$[0.000, 1.000]$$.
- We wish to execute and compare all three normalization methods over this dataset.

We will follow a five-step calculation pipeline.

### Step 1: Define Raw Dataset and Calculate Baseline Parameters
We record our raw data points ($$n = 3$$):

$$
v_1 = 10.000
$$

$$
v_2 = 30.000
$$

$$
v_3 = 100.000
$$

We identify our Min-Max bounds:

$$
\min_A = 10.000
$$

$$
\max_A = 100.000
$$

We compute our Z-score parameters, starting with the arithmetic mean:

$$
\mu_A = \frac{10.000 + 30.000 + 100.000}{3} = \frac{140.000}{3} \approx 46.667
$$

The variance is calculated as:

$$
\sigma_A^2 = \frac{(10.000 - 46.667)^2 + (30.000 - 46.667)^2 + (100.000 - 46.667)^2}{3} \approx \frac{1344.444 + 277.778 + 2844.444}{3} = \frac{4466.666}{3} \approx 1488.889
$$

The standard deviation is:

$$
\sigma_A = \sqrt{1488.889} \approx 38.586
$$

For decimal scaling, the maximum absolute value is:

$$
\max(|V|) = 100.000
$$

The smallest integer $$j$$ such that the maximum absolute value is less than $$1.000$$ is $$j = 3$$, since:

$$
\frac{100.000}{10^3} = 0.100 < 1.000
$$

### Step 2: Calculate Min-Max Normalized Values
Using our target interval $$[0.000, 1.000]$$, we compute:

$$
v_{i,\text{minmax}} = \frac{v_i - \min_A}{\max_A - \min_A}
$$

For $$v_1 = 10.000$$:

$$
v_{1,\text{minmax}} = \frac{10.000 - 10.000}{100.000 - 10.000} = 0.000
$$

For $$v_2 = 30.000$$:

$$
v_{2,\text{minmax}} = \frac{30.000 - 10.000}{100.000 - 10.000} = \frac{20.000}{90.000} \approx 0.222
$$

For $$v_3 = 100.000$$:

$$
v_{3,\text{minmax}} = \frac{100.000 - 10.000}{100.000 - 10.000} = 1.000
$$

### Step 3: Calculate Z-Score Standardized Values
Using our mean $$\mu_A = 46.667$$ and standard deviation $$\sigma_A = 38.586$$, we compute:

$$
v_{i,\text{zscore}} = \frac{v_i - \mu_A}{\sigma_A}
$$

For $$v_1 = 10.000$$:

$$
v_{1,\text{zscore}} = \frac{10.000 - 46.667}{38.586} = \frac{-36.667}{38.586} \approx -0.950
$$

For $$v_2 = 30.000$$:

$$
v_{2,\text{zscore}} = \frac{30.000 - 46.667}{38.586} = \frac{-16.667}{38.586} \approx -0.432
$$

For $$v_3 = 100.000$$:

$$
v_{3,\text{zscore}} = \frac{100.000 - 46.667}{38.586} = \frac{53.333}{38.586} \approx 1.382
$$

### Step 4: Calculate Decimal Scaled Values
Using $$j = 3$$, we divide each value by $$10^3$$:

$$
v_{i,\text{decimal}} = \frac{v_i}{10^3}
$$

For $$v_1 = 10.000$$:

$$
v_{1,\text{decimal}} = \frac{10.000}{10^3} = 0.010
$$

For $$v_2 = 30.000$$:

$$
v_{2,\text{decimal}} = \frac{30.000}{10^3} = 0.030
$$

For $$v_3 = 100.000$$:

$$
v_{3,\text{decimal}} = \frac{100.000}{10^3} = 0.100
$$

### Step 5: Compare the Three Normalized Output Configurations
We aggregate and compare our final results:

$$
V_{\text{minmax}} \approx \mathbf{[0.000,\ 0.222,\ 1.000]}
$$

$$
V_{\text{zscore}} \approx \mathbf{[-0.950,\ -0.432,\ 1.382]}
$$

$$
V_{\text{decimal}} = \mathbf{[0.010,\ 0.030,\ 0.100]}
$$

These outputs show the distinct ranges and statistical distributions produced by each technique over the same raw dataset, highlighting their structural differences.

Understanding these differences is essential when deciding which technique is best suited for your specific data distribution.

## 5.3.7. Comparing the Three Methods

The choice between Min-Max, Z-Score, and Decimal Scaling depends entirely on the characteristics of the dataset:

- **Min-Max Normalization:** Best suited for datasets with known, bounded limits and no extreme outliers. It maps data to a specific, bounded interval (typically $$[0.000, 1.000]$$), preserving the relative spacing of values.
- **Z-Score Normalization:** Best suited for datasets with extreme outliers or non-standard distributions. It standardizes features to have zero mean and unit variance, safely preserving outlier variations.
- **Decimal Scaling:** A computationally simple linear transformation that scales values down by a power of ten. However, it does not guarantee a standardized mean or variance, making it less useful for modern machine learning pipelines.

This comparison highlights how uncorrected outliers can impact each technique differently.

## 5.3.8. Impact of Outliers on Normalization

Outliers degrade normalization techniques differently depending on their mathematical formulations:

### 8.1 Min-Max Outlier Sensitivity
Because Min-Max scaling depends directly on absolute minimum and maximum boundaries, a single extreme outlier will compress the normal sub-population into a tiny, indistinguishable interval near zero. This removes statistical variation, preventing models from learning structural patterns.

### 8.2 Z-Score Outlier Robustness
Because Z-score normalization standardizes features using the mean and standard deviation, it is highly robust to outliers. The outlier is simply mapped to a large positive or negative Z-score, safely preserving the statistical variation of the normal sub-population.

Choosing the right normalization strategy is therefore critical for preventing model degradation.

## 5.3.9. Choosing the Right Normalization Strategy

To select the appropriate normalization strategy, we must evaluate both the data distribution and the requirements of our downstream machine learning algorithms:

### 9.1 Linear vs. Nonlinear Transformations
Both Min-Max and Decimal Scaling are linear transformations—they preserve the exact relative differences and proportions of the original data. Z-Score normalization, on the other hand, is a non-linear transformation if the underlying data is not normally distributed, as it shifts the shape of the distribution to conform to a standardized mean and variance.

Failing to account for these mathematical assumptions during feature scaling can introduce severe errors into model pipelines.

## 5.3.10. Common Preprocessing and Modeling Failure Modes

When designing normalization pipelines, practitioners frequently make critical mistakes that can compromise model performance.

### 10.1 Applying Naive Min-Max Scaling on Outlier-Prone Data

>[!Warning]
> **Executing Min-Max Normalization on Datasets Containing Extreme Outliers**
> Applying Min-Max scaling to a continuous feature that contains uncorrected outliers is a major preprocessing error. Because Min-Max depends on absolute minimum and maximum boundaries, a single extreme outlier will compress the normal sub-population into a tiny, indistinguishable coordinate interval near zero, destroying the model's capacity to learn structural patterns. Use Z-score standardization instead for outlier-prone datasets.

### 10.2 Data Leakage via Global Normalization Calculations

>[!Warning]
> **Calculating Scaling Parameters over the Entire Dataset**
> Computing transformation parameters (such as the mean $$\mu_A$$ and standard deviation $$\sigma_A$$ used in Z-score standardization) over the entire dataset before splitting it into training and testing sets leaks information from the test set into the training process. This leads to overly optimistic validation metrics that drop sharply when the model encounters true out-of-distribution production data. Always compute scaling parameters on the training set only, and apply those calculated parameters to scale the test set.

### 10.3 Applying Decimal Scaling Blindly Across Columns of Different Magnitudes

>[!Warning]
> **Scaling Features Separately Without Verifying Dimensional Spacing**
> Applying decimal scaling to features with different absolute scales (such as age and annual income) without aligning their raw dimensions will fail to resolve scale dominance. Because decimal scaling only moves the decimal point based on the maximum value of each individual column, the features will still retain different relative scales, introducing bias.

In conclusion, understanding these preprocessing techniques defines the statistical and mathematical limits of your feature space.

## 5.3.11. Conclusions and Normalization Techniques Summary Matrix

Data normalization is a foundational step that balances feature scales, prevents scale dominance, and accelerates model convergence.

Let us explicitly restate our core scaling formulas:

- Min-Max Normalization:
  $$
  v' = \frac{v - \min_A}{\max_A - \min_A} \times (new\_max_A - new\_min_A) + new\_min_A
  $$
- Z-score Standardization:
  $$
  v' = \frac{v - \mu_A}{\sigma_A}
  $$
- Decimal Scaling Normalization:
  $$
  v' = \frac{v}{10^j}
  $$

The following table summarizes the key properties and applications of each normalization technique.

| Normalization Technique | Target Range | Outlier Robustness | Best For |
| :---: | :---: | :---: | :---: |
| **Min-Max** | Predefined interval (typically $$[0.000, 1.000]$$) | Low (highly sensitive) | Image processing, neural networks |
| **Z-Score** | Unbounded (typically centered near $$0.000$$) | High (preserves outliers safely) | Linear models, PCA, clustering |
| **Decimal Scaling** | Bounded interval $$[-1.000, 1.000]$$ | Moderate | Simple integer scaling tasks |

By strategically selecting and applying appropriate data normalization techniques, machine learning engineers can ensure their pipelines ingest clean, mathematically sound datasets, establishing a reliable geometric foundation for predictive models.
