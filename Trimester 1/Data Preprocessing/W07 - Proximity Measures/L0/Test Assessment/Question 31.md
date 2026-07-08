# Question 31

**Question:** Which proximity measure would be most suitable for comparing two DNA sequences of equal length?

* **Eliminated Options:**

  * *Cosine Similarity:* More appropriate for vector data.
  * *Euclidean Distance:* Requires numerical coordinates.
  * *Jaccard Coefficient:* Ignores positional information.

* **Correct Answer:** **Hamming Distance**

> [!NOTE]
> **Explanation:**
>
> Hamming Distance counts the number of positions at which corresponding symbols differ.
>
> Example:
>
> ```
> Sequence 1: ACTGGA
> Sequence 2: ACTAGA
> ```
>
> Only one position differs, so:
>
> $$
> d_H=1
> $$
