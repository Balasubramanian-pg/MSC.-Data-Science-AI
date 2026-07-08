# Question 44

**Question:** Which similarity measure is most appropriate when comparing sparse binary vectors containing many zeros?

* **Eliminated Options:**

  * *Simple Matching Coefficient:* Gives equal importance to 0-0 matches.
  * *Euclidean Distance:* Not ideal for sparse binary data.
  * *Pearson Correlation:* Intended for continuous variables.

* **Correct Answer:** **Jaccard Coefficient**

> [!NOTE]
> **Explanation:**
>
> Sparse datasets contain many absent features. The Jaccard Coefficient ignores mutual absences:
>
> $$
> J=\frac{M_{11}}{M_{11}+M_{10}+M_{01}}
> $$
>
> making it especially useful for recommendation systems and market basket analysis.
