# Question 29

**Question:** Why are ordinal attributes often normalized after being converted to ranks?

* **Eliminated Options:**

  * *To remove ordering information:* Normalization preserves ordering.
  * *To convert them into nominal attributes:* This would lose valuable information.
  * *To create binary attributes:* Binarization is unnecessary.

* **Correct Answer:** **To place the ranked values on a common scale**

> [!TIP]
> **Explanation:**
>
> After assigning ranks:
>
> $$
> z_{if}=\frac{r_{if}-1}{M_f-1}
> $$
>
> where:
>
> * (r_{if}) = rank
> * (M_f) = number of states
>
> This standardizes ordinal values to the range [0,1].
