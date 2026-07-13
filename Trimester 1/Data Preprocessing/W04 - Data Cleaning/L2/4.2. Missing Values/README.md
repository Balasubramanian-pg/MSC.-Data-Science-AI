# 4.2. Missing Values

## 4.2.1. Introduction to Data Cleaning

Raw data collected from production systems is almost never ready for direct ingestion by machine learning algorithms.

Data cleaning is the process of identifying and correcting corrupted, inaccurate, or incomplete records within a dataset. Performing data cleaning is an essential step in the data preprocessing lifecycle, establishing the foundation of data quality before mathematical modeling.

To build a robust data cleaning pipeline, we must first understand why real-world data is naturally prone to corruption and noise.

## 4.2.2. Why Real-World Data Is Dirty

In theoretical environments, datasets are clean, structured, and complete. In the real world, data collection is messy, manual, inconsistent, and highly error-prone.

Dirty data arises because real-world recording processes involve multiple intermediate systems, network connections, and human inputs. Any failure in these subsystems can introduce errors or result in incomplete records.

The primary source of this corruption occurs during the physical-to-digital data conversion process.

## 4.2.3. Physical World to Digital Data Conversion

When physical phenomena are digitized (such as temperature, user clicks, or heart rate), multiple hardware and software steps are executed:

- **Quantization and Analog-to-Digital Conversion (ADC):** Sensors must map continuous, infinite physical scales (such as temperature) to discrete, finite digital values. This quantization process introduces small, unavoidable measurement errors.
- **Data Transmission Over Networks:** Digitized values are transmitted over network packets. If packets are dropped due to network latency or interference, those values are lost.

Beyond these basic hardware limits, modern systems are exposed to multiple other sources of data corruption.

## 4.2.4. Sources of Dirty Data

Data quality issues can be introduced during any phase of the data lifecycle:
- **Human Data Entry Errors:** Operators mistyping values, omitting fields, or selecting incorrect categories during transcription.
- **Legacy Database Migration:** Merging databases with mismatched schemas or different string formats.
- **API and System Failure:** Temporary timeouts or software crashes during streaming ingestion.

These diverse failures manifest as three major types of data quality problems in our databases.

## 4.2.5. Types of Data Quality Problems

We categorize data quality issues into three primary domains of failure:

### 5.1 Incomplete Data
Data objects that lack specific attribute values (e.g., recording a customer profile without an email address or age).

### 5.2 Noisy Data
Complete but corrupted values that contain random, non-representative fluctuations (e.g., a temperature sensor suddenly recording $$100.000^{\circ}\text{C}$$ in a mild room).

### 5.3 Inconsistent Data
Discrepancies in data formats, units, or logical constraints across different tables (e.g., storing the date as `YYYY-MM-DD` in some rows and `DD/MM/YYYY` in others).

Understanding these structural issues is essential because ignoring them has severe consequences for downstream analytical tasks.

## 4.2.6. Why Data Cleaning Is Necessary

No machine learning model can bypass the limits of its training data.

If the training dataset is filled with incomplete, noisy, or inconsistent records, the optimization engine will learn these errors as valid signals. This leads to high test-set error rates, poor generalization on unseen data, and silent production failures.

Among these anomalies, incomplete data representing missing values is one of the most common and disruptive problems.

## 4.2.7. Understanding Missing Values

A missing value occurs when an attribute that should exist for a data object is absent.

We represent missing values mathematically as `$$\text{NULL}$$`, `$$\text{NaN}$$` (Not a Number), or `$$\text{None}$$`.

If left uncorrected, these missing coordinates cause standard machine learning models to fail immediately.

## 4.2.8. Missing Values and Machine Learning Failure

Most classical machine learning libraries assume that all input design matrices contain complete real-valued coordinates.

If an algorithm attempts to execute matrix multiplication or gradient optimization over a matrix containing `$$\text{NaN}$$` entries, the system will throw runtime exceptions or generate uncomputable gradient updates, halting the entire training pipeline.

To understand why missing values cause algebraic calculations to fail, let us analyze their impact on distance-based metrics.

## 4.2.9. Euclidean Distance and Missing Data

Distance-based models (such as K-Means, K-Nearest Neighbors, and Support Vector Machines) rely on calculating geometric distances between coordinate vectors.

The Euclidean distance between two vectors $$x_1$$ and $$x_2$$ in a $$p$$-dimensional space is:

$$
d(x_1, x_2) = \sqrt{\sum_{j=1}^{p} (x_{1j} - x_{2j})^2}
$$

Let us restate this Euclidean distance formula for emphasis:

$$
d(x_1, x_2) = \sqrt{\sum_{j=1}^{p} (x_{1j} - x_{2j})^2}
$$

If any coordinate value $$x_{ij}$$ is missing (represented as `$$\text{NaN}$$`), subtracting it from a valid coordinate yields `$$\text{NaN}$$`:

$$
(x_{1j} - \text{NaN})^2 \implies \text{NaN}
$$

This propagates through the summation and square root, making the entire pairwise distance calculation undefined, rendering neighbor searches impossible.

To resolve these mathematical failures, engineers must employ structured preprocessing methods to handle or impute missing values.

## 4.2.10. Methods for Handling Missing Values

We employ different validation strategies to resolve missing values depending on the scale and complexity of the dataset:

### 10.1 Ignoring Tuples
Dropping any data object (row) that contains one or more missing values. This is simple but can permanently discard valuable training samples if missingness is common.

### 10.2 Manual Filling
Having human operators manually research and input the correct values. This is highly accurate but expensive and completely unscalable for large-scale data systems.

### 10.3 Global Constants
Replacing missing values with a uniform, fixed placeholder (such as `$$\text{"Unknown"}$$` for categorical features or `$$-1.000$$` for numeric features).

### 10.4 Local Constants
Replacing missing values with a placeholder that varies based on structured subsets of the data (such as using regional averages for missing income fields).

### 10.5 Central Tendency Methods
Replacing missing continuous values with the arithmetic mean or median of the observed values. The Mean Imputation formula is:

$$
\bar{x} = \frac{1}{n} \sum_{i=1}^{n} x_i
$$

where:
- $$\bar{x}$$ = the calculated sample mean
- $$x_i$$ = each observed, non-null value in the feature column
- $$n$$ = the total number of non-null observations

Let us explicitly restate this fundamental Mean Imputation formula for emphasis:

$$
\bar{x} = \frac{1}{n} \sum_{i=1}^{n} x_i
$$

For skewed distributions, the median is preferred over the mean because it is robust to outliers.

### 10.6 Conditional Filling
Using predictive modeling (such as training a regression model or decision tree) to infer the missing coordinate based on all other observed features of the data object.

To see how these handling methods restore the metric space of our data, let us walk through a manual calculation step-by-step.

## 4.2.11. Worked Mathematical Example: Euclidean Distance Failure and Central Tendency Resolution

We will demonstrate how a missing coordinate value ($$\text{NaN}$$) causes the Euclidean distance calculation between two vectors to fail, resolve the missing value using mean imputation, and compute the final valid distance.

Suppose:
- We have two coordinate points in a two-dimensional feature space ($$p = 2$$):
  $$
  x_1 = [3.000, 4.000]
  $$
  $$
  x_2 = [6.000, \text{NaN}]
  $$
- The second coordinate of $$x_2$$ is missing ($$\text{NaN}$$).
- The baseline vector of valid values for this second attribute across the rest of the dataset is:
  $$
  A_2 = [4.000, 8.000, 12.000]
  $$
- We wish to demonstrate how the missing value causes Euclidean distance calculation to fail, resolve the missing value using mean imputation, and compute the final valid distance.

We will follow a five-step calculation pipeline.

### Step 1: Define Labeled Dataset and Identify the Missing Coordinate
We record our coordinate vectors:

$$
x_1 = [3.000, 4.000]
$$

$$
x_2 = [6.000, \text{NaN}]
$$

### Step 2: Demonstrate Euclidean Distance Failure
We attempt to calculate the Euclidean distance using the L2 formula:

$$
d(x_1, x_2) = \sqrt{(3.000 - 6.000)^2 + (4.000 - \text{NaN})^2}
$$

$$
d(x_1, x_2) = \sqrt{(-3.000)^2 + \text{NaN}} \implies \text{NaN}
$$

The distance calculation fails, returning an uncomputable result.

### Step 3: Calculate the Mean of Attribute 2
We calculate the arithmetic mean of the observed values in $$A_2$$ using the formula:

$$
\mu = \frac{1}{n} \sum_{i=1}^{n} a_i
$$

Substituting the valid entries of $$A_2$$:

$$
\mu = \frac{4.000 + 8.000 + 12.000}{3} = \frac{24.000}{3} = 8.000
$$

### Step 4: Impute the Missing Value in the Coordinate Vector
We replace the $$\text{NaN}$$ coordinate in $$x_2$$ with our calculated mean of $$8.000$$:

$$
x_2^* = [6.000, 8.000]
$$

### Step 5: Compute the Reconstructed Euclidean Distance
We calculate the Euclidean distance using the updated coordinate:

$$
d(x_1, x_2^*) = \sqrt{(3.000 - 6.000)^2 + (4.000 - 8.000)^2}
$$

$$
d(x_1, x_2^*) = \sqrt{(-3.000)^2 + (-4.000)^2} = \sqrt{9.000 + 16.000} = \sqrt{25.000} = 5.000
$$

The final metrics are:

$$
\mathbf{\mu = 8.000}
$$

$$
\mathbf{d(x_1, x_2^*) = 5.000}
$$

The final resolved Euclidean distance is **5.000**, confirming that central tendency imputation successfully restores the metric space.

While these imputation methods are highly effective, implementing them incorrectly can introduce serious modeling failures.

## 4.2.12. Common Preprocessing and Modeling Failure Modes

When designing data cleaning pipelines, practitioners frequently make critical mistakes that can compromise model performance.

### 12.1 Running Distance-Based Models Prior to Null Imputation

>[!Warning]
> **Ignoring Missing Coordinates in Distance Calculations**
> Attempting to train distance-based models (such as KNN or K-Means) on datasets containing uncorrected `NaN` entries will cause runtime failures. Because distance calculations become undefined in the presence of missing values, any model relying on pairwise distances will fail to initialize or execute. Always impute null coordinates before fitting distance-based algorithms.

### 12.2 Imputing Heavily Skewed Columns with the Arithmetic Mean

>[!Warning]
> **Using Mean Imputation on Skewed Features**
> Applying mean imputation to highly skewed features (such as annual income or transaction amounts) introduces significant statistical bias. The mean is sensitive to extreme outliers and will skew the imputed values away from the true distribution. For skewed features, use robust central tendency metrics like the median instead.

### 12.3 Leaking Test Set Data During Imputation Calculations

>[!Warning]
> **Calculating Imputation Metrics Over the Entire Dataset**
> Computing the mean ($$\mu$$) or median of a feature over the entire dataset before splitting it into training and testing sets leaks information from the test set into the training process. This leads to overly optimistic validation metrics that drop sharply when the model encounters true out-of-distribution production data. Always compute imputation metrics on the training set only, and apply those calculated metrics to scale the test set.

In conclusion, understanding these preprocessing techniques defines the statistical and mathematical limits of your feature space.

## 4.2.13. Conclusions and Missing Value Handling Matrix

Data cleaning requires systematically resolving missing values before running modeling algorithms.

Let us restate our Euclidean distance formula to highlight how coordinate differences are aggregated:

$$
d(x_1, x_2) = \sqrt{\sum_{j=1}^{p} (x_{1j} - x_{2j})^2}
$$

Let us restate our Mean Imputation formula to highlight how central tendencies are calculated:

$$
\bar{x} = \frac{1}{n} \sum_{i=1}^{n} x_i
$$

The following table contrasts the key missing value handling strategies.

| Preprocessing Strategy | Core Action | Best For | Risk |
| :---: | :---: | :---: | :---: |
| **Ignoring Tuples** | Delete rows containing any null value | Large datasets with rare missingness | Can permanently discard valuable training samples |
| **Central Tendency** | Replace nulls with mean or median | Symmetric continuous features | Can artificially reduce variance in features |
| **Conditional Filling** | Predict nulls using classification or regression | Highly correlated features | Computationally expensive to execute |

By strategically identifying missing coordinates and applying appropriate statistical transformations, machine learning engineers can ensure their pipelines ingest clean, mathematically sound datasets, establishing a reliable geometric foundation for predictive models.
