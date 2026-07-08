# Question 13

**Question:** Why are numerical attributes often normalized before computing Euclidean distance?

* **Eliminated Options:**

  * *To convert them into binary values:* Normalization does not binarize data.
  * *To remove missing values:* Missing value treatment is a separate preprocessing step.
  * *To reduce dimensionality:* Normalization does not decrease the number of features.

* **Correct Answer:** **To prevent attributes with large scales from dominating the distance calculation**

> [!TIP]
> **Explanation:**
> Suppose one attribute ranges from 0 to 100,000 while another ranges from 0 to 10. The larger-scale attribute would dominate the Euclidean distance calculation.
>
> Common normalization methods include:
>
> * Min-Max Scaling
> * Z-score Standardization
