
<img width="779" height="667" alt="image" src="https://github.com/user-attachments/assets/86e614e0-7d4b-4cc6-b61d-b91b3b08cebf" />

## Question 1

**Question:** In a large customer database, the "Fax Number" column is missing for 95% of the entries. Which is the most appropriate and efficient first step for handling this specific column?

* **Eliminated Options:**

  * *Use a global constant like "Unknown":* Replacing 95% of the values with "Unknown" adds little useful information and may unnecessarily increase noise.
  * *Ignore the tuple:* Ignoring rows would discard a large amount of potentially valuable customer information simply because the fax number is missing.
  * *Fill in the missing values manually:* Manual imputation is impractical and inefficient for large datasets.

* **Correct Answer:** **Remove the attribute (column) entirely**

> [!IMPORTANT]
> **Explanation:**
>
> When an attribute contains an extremely high percentage of missing values:
>
> $$
> \text{Missing Percentage} = 95%
> $$
>
> the attribute often contributes little analytical value.
>
> Removing the entire column:
>
> * Reduces dataset complexity.
> * Eliminates noise.
> * Improves computational efficiency.
>
> This is especially appropriate for non-critical attributes such as fax numbers.

## Question 2

**Question:** Which statement best describes the role of clustering in outlier analysis?

* **Eliminated Options:**

  * *It replaces outlier values with the nearest non-outlier value:* Clustering identifies unusual observations but does not automatically replace them.
  * *It creates a box plot to visually identify outliers:* Box plots are visualization tools, not clustering techniques.
  * *It calculates the Z-score for every data point:* Z-score analysis is a statistical method independent of clustering.

* **Correct Answer:** **It groups similar values, making it possible to identify values that fall outside of any group.**

> [!NOTE]
> **Explanation:**
>
> Clustering algorithms partition data into groups of similar observations:
>
> $$
> \text{Cluster} = {\text{similar data objects}}
> $$
>
> Data points that:
>
> * Do not belong to any cluster, or
> * Lie far away from established clusters
>
> are often considered **outliers** or **anomalies**.
>
> Algorithms such as:
>
> * DBSCAN
> * K-Means
> * Hierarchical Clustering
>
> can therefore assist in detecting unusual observations that differ significantly from the majority of the dataset.

<img width="794" height="600" alt="image" src="https://github.com/user-attachments/assets/1bd2e1de-943f-45b5-9b22-1a887c16b517" />
