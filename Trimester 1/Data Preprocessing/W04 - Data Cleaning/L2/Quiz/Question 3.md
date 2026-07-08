# Question 3

**Question:** A dataset records dates in two different formats: "MM/DD/YYYY" (e.g., 10/01/2023) and "DD-Mon-YY" (e.g., 01-Oct-23). This problem is an example of what type of inconsistency?

* **Eliminated Options:**

  * *Semantic Inconsistency:* Semantic inconsistencies occur when the meaning of data differs, not merely its format.
  * *Structural Inconsistency:* Structural inconsistencies involve differences in schema or database organization rather than value formatting.
  * *Intentional Inconsistency:* This is not a recognized category in data preprocessing.

* **Correct Answer:** **Syntactic Inconsistency**

> [!NOTE]
> **Explanation:**
>
> Syntactic inconsistencies occur when the same information is represented using different formats or syntaxes.
>
> For example:
>
> $$
> \text{10/01/2023} \equiv \text{01-Oct-23}
> $$
>
> Both values represent the same date but use different formatting conventions.
>
> Standardizing the format ensures consistency across the dataset.
