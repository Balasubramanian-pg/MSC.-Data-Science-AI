# Question 5

Which of the following is the most appropriate technique for reducing random noise in continuous numerical data while preserving the overall trend?

## Options

* One-Hot Encoding
* Binning
* Label Encoding
* Tokenization

## Answer

✅ **Binning**

> [!NOTE]
> **Reason**
>
> **Binning** smooths numerical data by grouping nearby values into bins and replacing them with representative values such as the **bin mean**, **median**, or **boundary values**. This reduces random fluctuations while preserving the overall pattern of the data.

# Question 6

A customer's age is recorded as **250 years**. Before removing this value, what should be the first step?

## Options

* Delete the entire record.
* Replace it with zero.
* Investigate whether it is a data entry error or a legitimate value.
* Normalize the dataset.

## Answer

✅ **Investigate whether it is a data entry error or a legitimate value.**

> [!NOTE]
> **Reason**
>
> Outliers should not be removed automatically. They may result from:
>
> * Data entry errors
> * Measurement errors
> * Genuine but rare observations
>
> Understanding the source of the value helps determine the appropriate treatment.

# Question 7

Which of the following best describes regression-based smoothing?

## Options

* It groups observations into equal-sized bins.
* It replaces missing values with the median.
* It fits a mathematical function to approximate the underlying trend.
* It removes duplicate records.

## Answer

✅ **It fits a mathematical function to approximate the underlying trend.**

> [!NOTE]
> **Reason**
>
> **Regression smoothing** fits a mathematical relationship between variables and uses the fitted model to estimate expected values. Random deviations from the fitted curve are treated as noise.

# Question 8

What is the primary purpose of standardizing date formats during preprocessing?

## Options

* Reduce storage space.
* Improve model accuracy automatically.
* Ensure syntactic consistency across records.
* Remove duplicate values.

## Answer

✅ **Ensure syntactic consistency across records.**

> [!NOTE]
> **Reason**
>
> Different date formats representing the same information can create inconsistencies during analysis. Standardizing all dates into a single format ensures that software and analysts interpret dates consistently.

# Question 9

Which of the following best describes semantic inconsistency?

## Options

* The same data is stored using different file formats.
* The same concept has different meanings across datasets.
* Data is missing from several records.
* Numerical values contain random noise.

## Answer

✅ **The same concept has different meanings across datasets.**

> [!NOTE]
> **Reason**
>
> **Semantic inconsistency** occurs when identical values represent different meanings or different values represent the same meaning across systems.
>
> For example, one system may use **"A"** to indicate "Active," while another uses **"A"** to represent "Archived."

# Question 10

Which preprocessing technique is commonly used to identify duplicate customer records that have slight spelling differences?

## Options

* Entity Resolution
* PCA
* Min-Max Scaling
* Feature Extraction

## Answer

✅ **Entity Resolution**

> [!NOTE]
> **Reason**
>
> **Entity Resolution** compares multiple attributes such as names, addresses, phone numbers, and emails to determine whether multiple records refer to the same real-world entity, even when small differences exist.

# Question 11

Which of the following is an example of structural inconsistency?

## Options

* Dates stored in different formats.
* Customer names with spelling mistakes.
* One database stores "Address" as a single column while another stores Street, City, State, and ZIP separately.
* A customer's salary is missing.

## Answer

✅ **One database stores "Address" as a single column while another stores Street, City, State, and ZIP separately.**

> [!NOTE]
> **Reason**
>
> **Structural inconsistency** occurs when datasets organize the same information using different schemas or database structures, making integration more challenging.

# Question 12

Why is data preprocessing performed before machine learning model training?

## Options

* To guarantee perfect predictions.
* To improve data quality and prepare the dataset for analysis.
* To reduce the number of algorithms available.
* To eliminate all feature engineering.

## Answer

✅ **To improve data quality and prepare the dataset for analysis.**

> [!NOTE]
> **Reason**
>
> Data preprocessing removes errors, resolves inconsistencies, handles missing values, reduces noise, and prepares features, allowing machine learning models to learn from cleaner and more reliable data.

# Question 13

Which of the following is an advantage of using clustering for anomaly detection?

## Options

* It automatically fixes erroneous values.
* It identifies observations that do not naturally belong to any cluster.
* It guarantees that every outlier is an error.
* It converts categorical variables into numerical variables.

## Answer

✅ **It identifies observations that do not naturally belong to any cluster.**

> [!NOTE]
> **Reason**
>
> Clustering separates similar observations into groups. Data points that remain isolated or are located far from established clusters are often considered anomalous and warrant further investigation.

# Question 14

Which of the following situations is most likely to produce missing values?

## Options

* A sensor temporarily loses network connectivity during data collection.
* A database index is rebuilt.
* A dataset is sorted alphabetically.
* A visualization is exported as a PDF.

## Answer

✅ **A sensor temporarily loses network connectivity during data collection.**

> [!NOTE]
> **Reason**
>
> Missing values commonly occur when data cannot be captured due to equipment failures, communication problems, human error, or unavailable information during collection.

# Question 15

Which of the following best explains why preprocessing is considered one of the most time-consuming phases of a Data Science project?

## Options

* Machine learning algorithms cannot be executed afterward.
* Real-world datasets often contain missing values, inconsistencies, duplicates, noise, and invalid records that require careful handling.
* Preprocessing only involves changing column names.
* Preprocessing is performed only after model deployment.

## Answer

✅ **Real-world datasets often contain missing values, inconsistencies, duplicates, noise, and invalid records that require careful handling.**

> [!NOTE]
> **Reason**
>
> In practice, raw datasets are rarely clean. Data scientists spend a significant portion of their time identifying and correcting data quality issues before analysis. Proper preprocessing improves model reliability, reduces bias, and leads to more trustworthy analytical results.

# Question 16

Which of the following best describes data integration?

## Options

* Splitting one dataset into multiple files.
* Combining data from multiple sources into a unified dataset.
* Compressing large datasets.
* Visualizing data using dashboards.

## Answer

✅ **Combining data from multiple sources into a unified dataset.**

> [!NOTE]
> **Reason**
>
> **Data integration** combines information from different databases, applications, or files into a single, consistent dataset. During this process, issues such as duplicates, inconsistent formats, and conflicting values must often be resolved.

# Question 17

A hospital receives patient records from multiple clinics. Before analysis, names, dates, and diagnosis codes are standardized into a common format. This process is known as:

## Options

* Data Standardization
* Data Compression
* Data Encryption
* Feature Scaling

## Answer

✅ **Data Standardization**

> [!NOTE]
> **Reason**
>
> **Data standardization** converts values into consistent formats across all records and systems. This improves consistency and enables accurate integration, reporting, and downstream analysis.

# Question 18

Why is manual inspection generally not preferred for cleaning very large datasets?

## Options

* It increases model accuracy.
* It is slow, expensive, and does not scale well.
* It automatically creates duplicate records.
* It removes all outliers.

## Answer

✅ **It is slow, expensive, and does not scale well.**

> [!NOTE]
> **Reason**
>
> Manual inspection may be appropriate for small datasets, but modern datasets often contain millions of records. Automated preprocessing techniques provide faster, more consistent, and scalable solutions for identifying and correcting data quality issues.

