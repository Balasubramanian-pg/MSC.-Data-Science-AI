# Question 19

**Question:** Which similarity measure is commonly used for market basket analysis where transactions are represented as sets of purchased items?

* **Eliminated Options:**

  * *Euclidean Distance:* Not suitable for sparse transactional set data.
  * *Pearson Correlation:* Measures linear relationships between continuous variables.
  * *Manhattan Distance:* Primarily used for numerical attributes.

* **Correct Answer:** **Jaccard Coefficient**

> [!NOTE]
> **Explanation:**
>
> Market basket data is typically sparse and binary. The Jaccard Coefficient measures the similarity between two sets:
>
> $$
> J(A,B)=\frac{|A \cap B|}{|A \cup B|}
> $$
>
> It considers only shared purchases and ignores items neither customer bought.
