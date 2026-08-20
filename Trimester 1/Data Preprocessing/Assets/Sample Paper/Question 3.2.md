# Question 3.2 [5 Marks]

Differentiate between the following with suitable examples:

### i. Normalization and Standardization

### ii. Data Cleaning and Data Transformation

### Task

Explain why each technique serves a **different purpose during data preprocessing**.

This question asks you to differentiate **two pairs of preprocessing concepts**. The easiest way to score well is to define each concept, give an example, and explain its purpose.

### i. Normalization vs Standardization

| Aspect            | Normalization                                                       | Standardization                                                                                |
| ----------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **Meaning**       | Rescales values to a fixed range, usually **0 to 1**                | Rescales data so it has a **mean of 0 and standard deviation of 1**                            |
| **Common method** | Min-Max scaling                                                     | Z-score scaling                                                                                |
| **Effect**        | All values fall within a specified range                            | Values indicate how far they are from the mean                                                 |
| **Example**       | Age values from 20 to 60 can be converted to values between 0 and 1 | A CGPA of 8.5 can be converted into a z-score based on the mean and standard deviation of CGPA |
| **Useful when**   | Features need a common bounded scale                                | Features have different units/scales and algorithms benefit from centered data                 |


**Example:**

Suppose a dataset contains:

* Age: `20 to 60`
* Income: `₹20,000 to ₹2,00,000`

Income has much larger numerical values than age. A machine learning algorithm may therefore give disproportionate importance to income.

**Normalization** converts both features to a common range.

**Standardization** instead transforms them based on their mean and standard deviation.

**Key difference:**

> Normalization puts values on a fixed range, while standardization centers data around the mean and scales it according to standard deviation.

### ii. Data Cleaning vs Data Transformation

| Aspect              | Data Cleaning                                       | Data Transformation                                       |
| ------------------- | --------------------------------------------------- | --------------------------------------------------------- |
| **Purpose**         | Improve the **quality and correctness** of data     | Convert data into a **suitable format or representation** |
| **Focus**           | Errors, missing values, duplicates, inconsistencies | Scaling, encoding, aggregation, feature creation          |
| **Example**         | Removing duplicate customer records                 | Converting Gender `Male/Female` into `0/1`                |
| **Another example** | Correcting `Mumabi` to `Mumbai`                     | Converting income from annual to monthly                  |
| **Goal**            | Make data accurate, consistent, and reliable        | Make data suitable for analysis or machine learning       |

### Why They Serve Different Purposes

**Data Cleaning answers:**

> "Is my data correct and reliable?"

Examples include:

* Handling missing values
* Removing duplicates
* Correcting invalid values
* Fixing inconsistent spellings
* Detecting erroneous records

**Data Transformation answers:**

> "Is my data represented in a form that the analysis or model can use effectively?"

Examples include:

* Normalization
* Standardization
* Encoding categorical variables
* Aggregation
* Feature engineering
* Changing data formats

### Exam-Friendly Summary

**Normalization:** Rescales data to a fixed range, commonly 0 to 1.

**Standardization:** Rescales data using its mean and standard deviation, producing a mean of 0 and standard deviation of 1.

**Data Cleaning:** Identifies and fixes **data quality problems** such as missing, duplicate, invalid, or inconsistent data.

**Data Transformation:** Converts cleaned data into a **suitable representation** for analysis or machine learning.

**Core distinction:**

> **Cleaning makes data correct. Transformation makes data usable.**

