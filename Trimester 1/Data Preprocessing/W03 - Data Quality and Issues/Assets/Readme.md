
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

# Question 21

Which of the following is the best definition of data cleaning?

## Options

* Compressing large datasets to save storage space.
* Identifying and correcting errors, inconsistencies, and inaccuracies in data.
* Encrypting sensitive information before storage.
* Visualizing data using charts.

## Answer

✅ **Identifying and correcting errors, inconsistencies, and inaccuracies in data.**

> [!NOTE]
> **Reason**
>
> **Data cleaning** is the process of improving data quality by identifying and correcting issues such as missing values, duplicate records, inconsistent formats, invalid values, and noisy observations before analysis.

# Question 22

Which of the following is an example of an invalid data value?

## Options

* Age = 28
* Salary = $75,000
* Gender = "Unknown"
* Month = 15

## Answer

✅ **Month = 15**

> [!NOTE]
> **Reason**
>
> Months can only have values from **1 to 12**. A value of **15** violates domain constraints, making it an example of invalid data.

# Question 23

Which of the following is most likely to introduce duplicate records?

## Options

* Feature Scaling
* Merging customer data from multiple CRM systems
* Standardizing numerical variables
* Applying PCA

## Answer

✅ **Merging customer data from multiple CRM systems**

> [!NOTE]
> **Reason**
>
> When multiple systems contain records for the same customer, duplicate records can appear unless entity matching and deduplication techniques are applied.

# Question 24

What is the primary objective of outlier detection?

## Options

* Increase the number of records
* Identify observations that differ significantly from the majority
* Normalize all numerical variables
* Remove every extreme value automatically

## Answer

✅ **Identify observations that differ significantly from the majority**

> [!NOTE]
> **Reason**
>
> Outlier detection aims to identify unusual observations that may represent errors, fraud, rare events, or important business cases. Detection does not necessarily imply removal.

# Question 25

Which of the following is an example of inconsistent data?

## Options

* A customer age of 42
* The same customer recorded as "Male" in one system and "Female" in another
* A missing phone number
* A sales amount of $250

## Answer

✅ **The same customer recorded as "Male" in one system and "Female" in another**

> [!NOTE]
> **Reason**
>
> **Consistency** requires that the same information be represented uniformly across systems. Conflicting values for the same entity indicate inconsistent data.

# Question 26

Which statistical measure is commonly used to identify outliers using the IQR method?

## Options

* Mean
* Variance
* Interquartile Range
* Standard Error

## Answer

✅ **Interquartile Range**

> [!NOTE]
> **Reason**
>
> The **IQR method** identifies outliers using:
>
> * Lower Bound = Q1 − 1.5 × IQR
> * Upper Bound = Q3 + 1.5 × IQR
>
> Values outside these limits are considered potential outliers.

# Question 27

Which of the following is a possible consequence of poor data quality?

## Options

* Better predictive accuracy
* Faster model training with improved results
* Incorrect business decisions
* Reduced need for preprocessing

## Answer

✅ **Incorrect business decisions**

> [!NOTE]
> **Reason**
>
> Poor-quality data leads to unreliable analyses, inaccurate models, and misleading reports. Organizations may make costly decisions based on incorrect or incomplete information.

# Question 28

Which of the following best describes data validation?

## Options

* Compressing datasets
* Ensuring data satisfies predefined rules and constraints
* Removing all duplicate records
* Performing feature engineering

## Answer

✅ **Ensuring data satisfies predefined rules and constraints**

> [!NOTE]
> **Reason**
>
> **Data validation** checks whether data conforms to business rules, acceptable ranges, formats, and logical constraints before it is used for analysis.

# Question 29

Which of the following techniques is commonly used to replace missing numerical values?

## Options

* Mean Imputation
* Tokenization
* One-Hot Encoding
* Min-Max Scaling

## Answer

✅ **Mean Imputation**

> [!NOTE]
> **Reason**
>
> One common approach for handling missing numerical values is **mean imputation**, where missing entries are replaced with the average of the available values.
>
> Depending on the dataset, median or model-based imputation may sometimes be more appropriate.

# Question 30

Why should duplicate records be removed before performing statistical analysis?

## Options

* They reduce the number of features.
* They may bias summary statistics and model results.
* They automatically create missing values.
* They convert numerical data into categorical data.

## Answer

✅ **They may bias summary statistics and model results.**

> [!NOTE]
> **Reason**
>
> Duplicate records can artificially inflate counts, distort averages, bias probability estimates, and negatively affect machine learning models. Removing duplicates helps ensure that analyses accurately represent the underlying population.

# Question 31

Which of the following is an example of timely data?

## Options

* Last year's stock prices used for today's intraday trading decisions.
* Yesterday's weather forecast used for today's planning.
* Real-time inventory levels used for order fulfillment.
* A census collected twenty years ago.

## Answer

✅ **Real-time inventory levels used for order fulfillment.**

> [!NOTE]
> **Reason**
>
> **Timeliness** refers to data being current and available when needed. Real-time inventory enables accurate order processing and prevents overselling.

# Question 32

What is the primary purpose of data profiling?

## Options

* Encrypt sensitive information
* Understand the structure, quality, and characteristics of data
* Train machine learning models
* Visualize business KPIs

## Answer

✅ **Understand the structure, quality, and characteristics of data**

> [!NOTE]
> **Reason**
>
> **Data profiling** examines datasets to identify missing values, unique values, distributions, inconsistencies, duplicates, and potential quality issues before cleaning and analysis.

# Question 33

Which of the following best describes noisy data?

## Options

* Data that follows a perfect pattern
* Random errors or unwanted variations in measurements
* Missing observations
* Duplicate customer records

## Answer

✅ **Random errors or unwanted variations in measurements**

> [!NOTE]
> **Reason**
>
> Noise represents unwanted fluctuations introduced through measurement errors, transmission issues, or sensor inaccuracies. Excessive noise can obscure meaningful patterns in the data.

# Question 34

A customer's email address is stored as "john@gmail" instead of "[john@gmail.com](mailto:john@gmail.com)". This is primarily an example of:

## Options

* Outlier
* Duplicate Data
* Validity Issue
* Timeliness Issue

## Answer

✅ **Validity Issue**

> [!NOTE]
> **Reason**
>
> The email does not conform to the expected format defined by business rules. Although a value exists, it is invalid because it fails validation requirements.

# Question 35

Which statement best summarizes the relationship between data quality and machine learning performance?

## Options

* Model performance depends only on algorithm selection.
* High-quality data is essential for building reliable and accurate machine learning models.
* Data quality only affects visualization.
* Data quality becomes important only after deployment.

## Answer

✅ **High-quality data is essential for building reliable and accurate machine learning models.**

> [!NOTE]
> **Reason**
>
> The principle **"Garbage In, Garbage Out (GIGO)"** applies directly to machine learning. Models trained on inaccurate, inconsistent, incomplete, or noisy data are likely to produce unreliable predictions, regardless of how advanced the algorithm is.
