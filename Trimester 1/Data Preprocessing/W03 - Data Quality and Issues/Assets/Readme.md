
# Question 6

Which of the following best describes missing data?

## Options

* Data values that are duplicated across multiple records.
* Data values that are unavailable, unknown, or not recorded.
* Data values that are larger than expected.
* Data values that have been normalized.

## Answer

✅ **Data values that are unavailable, unknown, or not recorded.**

> [!NOTE]
> **Reason**
>
> Missing data occurs when one or more attribute values are absent from a dataset. Missing values may result from human error, equipment failure, skipped survey questions, or unavailable information. Proper handling is essential to avoid biased analyses.

# Question 7

Which of the following is an example of noisy data?

## Options

* A customer's age is recorded as 35.
* A temperature sensor fluctuates between 25°C and 80°C within seconds due to a hardware malfunction.
* A customer's address is missing.
* Two identical customer records exist in the database.

## Answer

✅ **A temperature sensor fluctuates between 25°C and 80°C within seconds due to a hardware malfunction.**

> [!NOTE]
> **Reason**
>
> **Noisy data** consists of random errors or variations that do not reflect the true value. Sensor malfunctions, transmission errors, and measurement inaccuracies commonly introduce noise into datasets.

# Question 8

Which data quality dimension ensures that data correctly represents the real-world object or event?

## Options

* Timeliness
* Accuracy
* Completeness
* Uniqueness

## Answer

✅ **Accuracy**

> [!NOTE]
> **Reason**
>
> **Accuracy** measures how closely the recorded data matches the actual real-world values. Incorrect addresses, misspelled names, or invalid measurements reduce data accuracy.

# Question 9

Which data quality dimension ensures that all required values are present?

## Options

* Consistency
* Completeness
* Timeliness
* Validity

## Answer

✅ **Completeness**

> [!NOTE]
> **Reason**
>
> **Completeness** refers to whether all necessary data has been collected and recorded. Missing customer emails, phone numbers, or diagnosis codes reduce data completeness.

# Question 10

A customer appears three times in a CRM system because information was imported from different regional databases. Which data quality issue does this illustrate?

## Options

* Missing Data
* Noise
* Duplicate Data
* Outlier

## Answer

✅ **Duplicate Data**

> [!NOTE]
> **Reason**
>
> Duplicate data occurs when multiple records represent the same real-world entity. This often happens during data integration when proper deduplication or entity matching is not performed.

# Question 11

Which of the following is the best first step after detecting missing values in a dataset?

## Options

* Delete the entire dataset.
* Investigate why the data is missing.
* Replace every missing value with zero.
* Train the machine learning model immediately.

## Answer

✅ **Investigate why the data is missing.**

> [!NOTE]
> **Reason**
>
> Before choosing a treatment strategy, it is important to understand the reason for missing data. Values may be missing completely at random, systematically missing, or intentionally absent, and each situation requires a different approach.

# Question 12

Which of the following techniques is commonly used to reduce random noise in numerical data?

## Options

* Smoothing
* One-Hot Encoding
* Standardization
* Tokenization

## Answer

✅ **Smoothing**

> [!NOTE]
> **Reason**
>
> **Smoothing** techniques such as moving averages, regression smoothing, and binning reduce random fluctuations while preserving the underlying trend in the data.

# Question 13

Which of the following is a common method for handling duplicate records?

## Options

* One-Hot Encoding
* Entity Resolution
* PCA
* Feature Scaling

## Answer

✅ **Entity Resolution**

> [!NOTE]
> **Reason**
>
> **Entity Resolution** identifies records that refer to the same real-world entity even when values differ slightly due to spelling variations, abbreviations, or formatting differences. It is widely used during data integration.

# Question 14

Which of the following is an example of an outlier?

## Options

* A person's height recorded as 175 cm.
* A daily temperature of 24°C.
* A transaction amount of $5 million when most transactions are under $500.
* A customer purchasing two products.

## Answer

✅ **A transaction amount of $5 million when most transactions are under $500.**

> [!NOTE]
> **Reason**
>
> An **outlier** is an observation that differs substantially from the rest of the dataset. Extremely large transactions may represent fraud, data entry errors, or legitimate high-value purchases, so they should be investigated rather than automatically removed.

# Question 15

Which of the following best describes data consistency?

## Options

* Data is entered quickly.
* Data follows the same definitions and formats across systems.
* Data contains no outliers.
* Data is compressed efficiently.

## Answer

✅ **Data follows the same definitions and formats across systems.**

> [!NOTE]
> **Reason**
>
> **Consistency** ensures that the same information is represented uniformly across different datasets and systems. For example, dates should follow the same format, and customer status codes should have consistent meanings.

# Question 16

A patient's blood pressure is recorded as "120/80" in one hospital and "Normal" in another system. This is primarily an example of:

## Options

* Duplicate Data
* Data Consistency Issue
* Outlier Detection
* Missing Data

## Answer

✅ **Data Consistency Issue**

> [!NOTE]
> **Reason**
>
> The same real-world information is represented using different formats across systems. Such inconsistencies complicate integration and analysis unless standardized.

# Question 17

Which of the following data quality dimensions ensures that data conforms to defined business rules?

## Options

* Accuracy
* Validity
* Completeness
* Timeliness

## Answer

✅ **Validity**

> [!NOTE]
> **Reason**
>
> **Validity** measures whether data complies with predefined formats, constraints, and business rules. Examples include ensuring email addresses follow a valid format or ages are within a realistic range.

# Question 18

A customer's age is entered as **-12**. This is primarily an example of:

## Options

* Duplicate Data
* Validity Issue
* Timeliness Issue
* Completeness Issue

## Answer

✅ **Validity Issue**

> [!NOTE]
> **Reason**
>
> A negative age violates business rules and logical constraints. Although the value exists, it is invalid because it cannot occur in the real world.

# Question 19

Which data quality dimension refers to whether information is available when it is needed?

## Options

* Timeliness
* Uniqueness
* Consistency
* Accuracy

## Answer

✅ **Timeliness**

> [!NOTE]
> **Reason**
>
> **Timeliness** measures whether data is sufficiently current for its intended purpose. Outdated inventory levels, delayed financial records, or stale patient information reduce data quality even if the values themselves are accurate.

# Question 20

Why is improving data quality important before building a machine learning model?

## Options

* It guarantees 100% prediction accuracy.
* It reduces the need for feature engineering.
* It enables models to learn from reliable and representative data.
* It automatically selects the best algorithm.

## Answer

✅ **It enables models to learn from reliable and representative data.**

> [!NOTE]
> **Reason**
>
> Machine learning models learn directly from the data they are given. Poor-quality data containing errors, duplicates, missing values, inconsistencies, or noise can lead to biased models, poor predictions, and unreliable business decisions. Improving data quality establishes a strong foundation for effective modeling.
