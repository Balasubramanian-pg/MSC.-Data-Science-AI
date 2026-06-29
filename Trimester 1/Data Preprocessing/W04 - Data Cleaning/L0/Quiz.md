
<img width="751" height="666" alt="image" src="https://github.com/user-attachments/assets/11ef9fc5-c7de-4dd8-a9c3-b4998d860562" />

## Question 1

**Question:** Which of the following activities is a core component of the Data Cleaning task?

* **Eliminated Options:**

  * *Reducing the number of columns to improve model efficiency:* This is feature selection or dimensionality reduction.
  * *Scaling numerical features to a common range, such as 0 to 1:* This is data transformation, specifically normalization.
  * *Combining datasets from multiple sources:* This is data integration.

* **Correct Answer:** **Identifying and handling missing values in a dataset**

> [!NOTE]
> **Explanation:**
>
> Data cleaning focuses on detecting and correcting problems that degrade data quality.
>
> Common data cleaning tasks include:
>
> * Handling missing values
> * Removing duplicate records
> * Correcting inconsistencies
> * Identifying outliers
> * Resolving noisy data
>
> Missing values can negatively impact analysis and machine learning models if not properly addressed.

## Question 2

**Question:** A data analyst decides to group customers into different segments based on their purchasing behaviour. This task of finding similarities between data objects falls under which major preprocessing category?

* **Eliminated Options:**

  * *Data Reduction:* Focuses on reducing data volume or dimensionality.
  * *Data Transformation:* Converts data into more suitable forms for analysis.
  * *Data Cleaning:* Focuses on improving data quality by correcting errors and inconsistencies.

* **Correct Answer:** **Proximity Analysis**

> [!IMPORTANT]
> **Explanation:**
>
> Proximity Analysis measures how similar or dissimilar data objects are.
>
> Customer segmentation often relies on similarity measures:
>
> $$
> \text{Customers with similar purchasing behaviour} \rightarrow \text{Same Segment}
> $$
>
> Techniques such as clustering algorithms, including:
>
> * K-Means
> * Hierarchical Clustering
> * DBSCAN
>
> depend heavily on proximity analysis to group similar customers together.
