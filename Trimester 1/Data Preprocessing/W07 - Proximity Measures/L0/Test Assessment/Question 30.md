# Question 30

**Question:** Which statement best describes similarity and dissimilarity measures?

* **Eliminated Options:**

  * *They are unrelated concepts:* They are mathematically connected.
  * *High similarity always implies high dissimilarity:* The relationship is inverse.
  * *They always have identical values:* This occurs only under special circumstances.

* **Correct Answer:** **High similarity generally corresponds to low dissimilarity**

> [!IMPORTANT]
> **Explanation:**
>
> Similarity and dissimilarity are inverse concepts:
>
> $$
> s(x,y)=1-d(x,y)
> $$
>
> when both measures are normalized to the interval [0,1].
>
> Distance-based algorithms typically use dissimilarity, while recommendation systems often rely on similarity measures.
