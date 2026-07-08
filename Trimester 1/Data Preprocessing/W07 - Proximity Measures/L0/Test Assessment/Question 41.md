# Question 41

**Question:** Why is standardization often preferred over min-max normalization when extreme outliers exist?

* **Eliminated Options:**

  * *Standardization removes outliers:* Outliers still remain.
  * *Standardization converts data into binary form:* It does not.
  * *Standardization changes nominal attributes into numerical ones:* It only applies to numerical data.

* **Correct Answer:** **Standardization is generally less sensitive to extreme values**

> [!TIP]
> **Explanation:**
>
> Standardization transforms data as:
>
> $$
> z=\frac{x-\mu}{\sigma}
> $$
>
> While outliers still affect the mean and standard deviation, min-max scaling can compress most observations into a narrow range when extreme values are present.
