# Question 1

**Question:** Which of the following scenarios is a direct application of data aggregation?

* **Eliminated Options:**

  * *Scaling all monetary values to a range between 0 and 1:* This is normalization, not aggregation.
  * *Correcting a zip code from "1001" to "01001":* This is data cleaning.
  * *Removing a "customer_favorite_color" column from a loan application dataset:* This is feature selection or dimensionality reduction.

* **Correct Answer:** **Calculating the total monthly sales from a table of daily sales figures**

> [!NOTE]
> **Explanation:**
>
> Data aggregation combines multiple detailed records into a summarized form.
>
> For example:
>
> $$
> \text{Monthly Sales} = \sum_{i=1}^{30} \text{Daily Sales}_i
> $$
>
> Aggregation reduces data volume while preserving useful information for analysis.
