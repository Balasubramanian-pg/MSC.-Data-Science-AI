# 3.2. Examples of Data Quality Issues

## 3.2.1. Introduction to Real-World Dirty Data

Real-world data is rarely clean. Most datasets contain missing fields, contradictory formats, measurement errors, duplicate records, or values that simply do not make sense.

In machine learning and data mining, poor-quality data directly reduces model reliability because algorithms fundamentally operate on mathematical relationships between variables. If the underlying data is flawed, the resulting predictions, clusters, classifications, or insights become unreliable. This core limitation is commonly summarized using the principle: **Garbage In, Garbage Out (GIGO)**. A machine learning system trained on poor data will produce poor outcomes regardless of how advanced the algorithm is.

To systematically identify and resolve these issues, we must first map out the taxonomy of data quality failures.

## 3.2.2. Understanding the Taxonomy of Data Quality Issues

We categorize data quality issues into three primary domains of failure:

- **Incomplete Data (Missingness):** Where fields or entire columns are absent.
- **Noisy Data (Corrupt Measurements):** Where values contain random errors or non-representative spikes.
- **Inconsistent Data (Format & Schema Conflicts):** Where data values are recorded using different units, scales, or text formats.

Let us examine the first of these primary domains, focusing on how missingness occurs and its mathematical implications.

## 3.2.3. Incomplete Data and Missingness

Incomplete data occurs when attributes or records are missing from the dataset.

### 3.1 Why Missing Values Matter
Missing values (represented as `NaN` or `None`) disrupt vector operations. Most machine learning algorithms (such as linear models, support vector machines, or neural networks) cannot process null values and will throw runtime errors if they are not resolved during preprocessing.

### 3.2 Types of Missingness (MCAR, MAR, MNAR)
We classify missing data into three distinct mathematical categories based on the underlying missingness mechanism:

- **Missing Completely at Random (MCAR):** The probability of missingness is entirely independent of any values in the dataset:
  $$
  P(\text{Missing} \mid Y, X) = P(\text{Missing})
  $$
- **Missing at Random (MAR):** The probability of missingness depends on other observed variables, but not on the missing values themselves:
  $$
  P(\text{Missing} \mid Y, X) = P(\text{Missing} \mid X)
  $$
- **Missing Not at Random (MNAR):** The probability of missingness depends directly on the unobserved missing values themselves (e.g., high-income earners refusing to report their salary):
  $$
  P(\text{Missing} \mid Y, X) = f(Y)
  $$

Let us explicitly restate the Missing at Random (MAR) formula for emphasis:

$$
P(\text{Missing} \mid Y, X) = P(\text{Missing} \mid X)
$$

In contrast to missing data, noisy data contains complete but corrupted values that distort the model's objective function.

## 3.2.4. Noisy Data and Outlier Distinctions

Noisy data contains complete but corrupted values that distort the model's calculations.

### 4.1 Sources of Noise
Noise represents random error or variance in a measured variable. Sources of noise include physical sensor malfunctions, data transmission degradation, human transcription errors, and background electromagnetic interference.

### 4.2 Noise vs Outliers
We distinguish between noise and outliers based on their statistical validity:
- **Noise:** Random, non-representative fluctuations that corrupt the true underlying signal.
- **Outliers:** Valid, accurate physical measurements that lie far from the rest of the distribution. Outliers represent real-world phenomena (e.g., a stock market crash) and should be preserved or modeled, whereas noise should be filtered out.

Even when data is complete and noise-free, variations in recording formats across different systems can create critical inconsistencies.

## 3.2.5. Inconsistent Data Formats and Units

Inconsistent data occurs when different systems or human operators record the same attributes using different standards.

### 5.1 Unit Inconsistency
Storing variables in different units of measurement across different records. For example, storing height in centimeters ($$\text{cm}$$) for some rows and feet ($$\text{ft}$$) for others.

### 5.2 Format Inconsistency
Storing categorical strings or dates using different formats. For example, recording the date as `YYYY-MM-DD` in some entries and `DD/MM/YYYY` in others, or mixing uppercase and lowercase strings (e.g., "Spain", "SPAIN", "spain").

### 5.3 Rating Scale Inconsistency
Mixing different rating scales (such as assessing customer satisfaction using a 1-to-5 star scale in one survey and a 1-to-10 slider scale in another).

To demonstrate how missingness and noise are resolved during preprocessing, let us walk through a manual computational calculation.

## 3.2.6. Worked Mathematical Example: Statistical Imputation and Noise Filtering

We will resolve a missing value ($$\text{NaN}$$) in a wind speed dataset using median imputation, and then apply a Z-score threshold filter to identify and cap a noisy value.

Suppose:
- We have a small raw data stream representing wind speed measurements in meters per second ($$\text{m/s}$$):
  $$
  X = [10.000,\ \text{NaN},\ 11.000,\ 30.000,\ 9.000]
  $$
- We wish to perform median imputation to resolve the missing value ($$\text{NaN}$$).
- We set our noise detection threshold to:
  $$
  z_{\text{thresh}} = 1.500
  $$
- We wish to calculate the sample mean ($$\mu$$) and standard deviation ($$\sigma$$) of the imputed stream to compute Z-scores and cap any noisy values.

We will follow a five-step calculation pipeline.

### Step 1: Assign Raw Data Stream and Define Missingness
We record our input vector containing a missing value:

$$
X = [10.000,\ \text{NaN},\ 11.000,\ 30.000,\ 9.000]
$$

### Step 2: Execute Median Imputation to Resolve the Missing Value
We identify the valid, non-null entries in our vector: $$[10.000, 11.000, 30.000, 9.000]$$. To calculate the median, we sort the valid entries: $$[9.000, 10.000, 11.000, 30.000]$$.

Since we have an even number of elements, the median is the average of the two middle values:

$$
\tilde{X} = \frac{10.000 + 11.000}{2} = 10.500
$$

To prevent the outlier ($30.000$) from skewing our imputation, we temporarily exclude it. The sorted non-outlier entries are $$[9.000, 10.000, 11.000]$$. The median is:

$$
\tilde{X} = 10.000
$$

We replace the $$\text{NaN}$$ value with this median of $$10.000$$. The imputed vector is:

$$
X_{\text{imputed}} = [10.000,\ 10.000,\ 11.000,\ 30.000,\ 9.000]
$$

### Step 3: Calculate Mean ($$\mu$$) and Standard Deviation ($$\sigma$$) of the Imputed Stream
We calculate the arithmetic mean of the imputed vector:

$$
\mu = \frac{10.000 + 10.000 + 11.000 + 30.000 + 9.000}{5} = \frac{70.000}{5} = 14.000
$$

Next, we calculate the variance:

$$
\sigma^2 = \frac{(10.000 - 14.000)^2 + (10.000 - 14.000)^2 + (11.000 - 14.000)^2 + (30.000 - 14.000)^2 + (9.000 - 14.000)^2}{5}
$$

$$
\sigma^2 = \frac{(-4.000)^2 + (-4.000)^2 + (-3.000)^2 + (16.000)^2 + (-5.000)^2}{5} = \frac{16.000 + 16.000 + 9.000 + 256.000 + 25.000}{5} = 64.400
$$

The standard deviation is:

$$
\sigma = \sqrt{64.400} \approx 8.025
$$

### Step 4: Compute Z-Scores and Isolate Noisy Points
We compute the Z-score of each element using the standardization formula:

$$
z_i = \frac{x_i - \mu}{\sigma}
$$

For the suspected noise point $$x_4 = 30.000$$:

$$
z_4 = \frac{30.000 - 14.000}{8.025} = \frac{16.000}{8.025} \approx 1.994
$$

Since $$z_4 = 1.994 > 1.500$$ ($$z_{\text{thresh}}$$), the value $$30.000$$ is successfully flagged as a noisy outlier.

### Step 5: Apply Noise Capping to Resolve the Outlier
We cap the noisy value at our maximum threshold boundary, defined as $$\mu + z_{\text{thresh}} \sigma$$:

$$
\text{Cap} = 14.000 + 1.500 \times 8.025 = 14.000 + 12.038 = 26.038
$$

We replace the noisy value $$30.000$$ with this capped value. The final cleaned data stream is:

$$
X_{\text{cleaned}} \approx \mathbf{[10.000,\ 10.000,\ 11.000,\ 26.038,\ 9.000]}
$$

The missing value has been imputed and the noisy spike resolved, preparing the data stream for modeling.

In production pipelines, executing these checks manually is impractical, necessitating automated detection systems.

## 3.2.7. Detecting Data Quality Issues

We employ different validation strategies depending on the scale and complexity of the ingestion pipeline:

### 7.1 Manual Detection
Using exploratory data analysis (EDA) techniques to spot-check records, such as plotting boxplots to identify outliers or scanning summary statistics for unexpected null values.

### 7.2 Automated Detection
Implementing programmable validation checks (such as schema validation or range constraints) that automatically scan datasets to flag anomalous records.

### 7.3 Automated Validation Pipeline
A continuous system that intercepts incoming data, runs validation rules, and routes invalid records to a quarantine log for manual review, preventing corrupted data from entering the active training pipeline.

If these validation checkpoints are missing or fail, the resulting dirty data will severely degrade downstream machine learning models.

## 3.2.8. Impact of Poor Data on Machine Learning

When models train on dirty data:
- **Biased Predictions:** Missing values or noise can skew model coefficients, leading to systematic prediction errors.
- **Overfitting to Noise:** Complex models (like deep neural networks) can learn noisy fluctuations as actual signals, resulting in poor generalization on unseen data.
- **Wasted Compute:** Training models on duplicate or corrupted records wastes computing resources and increases pipeline latency.

To prevent these modeling failures, we must analyze the most common preprocessing and modeling pitfalls in detail.

## 3.2.9. Common Preprocessing and Modeling Failure Modes

When designing data cleaning pipelines, practitioners frequently make critical mistakes that can compromise model performance.

### 9.1 Treating Missing Not at Random (MNAR) Data as Missing Completely at Random (MCAR)

>[!Warning]
> **Assuming MCAR when Data is MNAR**
> Treating Missing Not at Random (MNAR) data as Missing Completely at Random (MCAR) and applying naive median imputation introduces significant bias. For example, if low-income earners systematically refuse to report their salary, replacing their missing values with the overall median salary will artificially inflate the lower end of the distribution, leading to skewed model predictions.

### 9.2 Deleting Outliers Without Domain Verification

>[!Warning]
> **Truncating Outliers Blindly**
> Automatically deleting extreme values that lie far from the distribution without checking with domain experts can strip key signals from the dataset. Outliers often represent valid, rare physical events (e.g., bank fraud or extreme pressure spikes). Deleting them makes the model incapable of identifying these rare events.

### 9.3 Hardcoding Formats Without Parsing Validation

>[!Warning]
> **Failing to Standardize String Casing and Datetime Formats**
> Running string or datetime parsing without robust exception handling can cause pipelines to crash silently. Mixing formats (such as `YYYY-MM-DD` and `DD/MM/YYYY`) or string casings (such as "Spain" and "spain") will create duplicate categories and corrupt downstream calculations.

In conclusion, understanding data quality issues defines the statistical and mathematical limits of your feature space.

## 3.2.10. Conclusions and Data Quality Issues Summary Matrix

Data quality issues must be identified and resolved early in the preprocessing pipeline to prevent model degradation.

Let us explicitly restate the Missing at Random (MAR) formula to highlight how missingness is mathematically evaluated:

$$
P(\text{Missing} \mid Y, X) = P(\text{Missing} \mid X)
$$

The following table summarizes the key types of data quality issues and their respective cleaning strategies.

| Quality Issue Type | Primary Cause | Computational Impact | Core Preprocessing Strategy |
| :---: | :---: | :---: | :---: |
| **Incomplete Data** | Sensor drops, optional fields | runtime crashes, skewed distributions | Median imputation, KNN model imputation |
| **Noisy Data** | Transmission errors, transcription slips | Overfitting, high model variance | Z-score filtering, rolling mean smoothing |
| **Inconsistent Data** | Distributed databases, schema drift | Categorical duplication, matrix misalignment | String normalization, schema enforcement |

By carefully measuring and monitoring each quality issue, machine learning engineers can prevent algorithmic bias, minimize processing latency, and build highly scalable, robust data preprocessing pipelines.
