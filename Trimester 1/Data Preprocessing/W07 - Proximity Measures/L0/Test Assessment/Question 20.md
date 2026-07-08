# Question 20

**Question:** What is the range of values for the Cosine Similarity measure when applied to non-negative vectors?

* **Eliminated Options:**

  * *-1 to 1:* This is the general range when negative values are allowed.
  * *0 to 100:* Cosine similarity is not expressed as a percentage.
  * *-100 to 100:* Not a valid similarity scale.

* **Correct Answer:** **0 to 1**

> [!TIP]
> **Explanation:**
>
> For non-negative vectors:
>
> * 1 indicates identical direction.
> * 0 indicates orthogonality (completely dissimilar).
>
> Since most text mining applications use non-negative term frequencies, cosine similarity usually ranges from 0 to 1.
