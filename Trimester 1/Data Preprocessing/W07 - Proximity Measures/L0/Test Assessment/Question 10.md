# Question 10

**Question:** Which similarity measure is most appropriate for comparing text documents represented as high-dimensional word-frequency vectors?

* **Eliminated Options:**

  * *Euclidean Distance:* Sensitive to document length and magnitude differences.
  * *Simple Matching Coefficient:* Designed for binary attributes rather than frequency vectors.
  * *Hamming Distance:* Only counts positional mismatches and is unsuitable for document vectors.

* **Correct Answer:** **Cosine Similarity**

> [!TIP]
> **Explanation:**
> Cosine Similarity measures the cosine of the angle between two vectors:
>
> $$
> \text{sim}(x,y)=\frac{x \cdot y}{||x||,||y||}
> $$
>
> It focuses on orientation rather than magnitude, making it ideal for text mining applications such as document clustering and information retrieval.
