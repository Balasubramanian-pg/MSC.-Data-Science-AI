# Question 36

**Question:** Which proximity measure would be most appropriate for comparing customer purchase histories represented as sets of purchased products?

* **Eliminated Options:**

  * *Euclidean Distance:* Not ideal for sparse set-based data.
  * *Manhattan Distance:* Designed primarily for numerical attributes.
  * *Hamming Distance:* Requires aligned positions.

* **Correct Answer:** **Jaccard Coefficient**

> [!TIP]
> **Explanation:**
>
> Purchase histories often contain many absent items. The Jaccard Coefficient focuses only on shared purchases:
>
> $$
> J(A,B)=\frac{\text{Common Purchases}}{\text{Total Unique Purchases}}
> $$
