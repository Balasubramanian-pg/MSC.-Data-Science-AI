# Question 1

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
