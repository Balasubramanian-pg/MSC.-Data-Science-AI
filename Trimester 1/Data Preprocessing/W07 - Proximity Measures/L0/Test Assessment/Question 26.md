# Question 26

**Question:** Which proximity measure is least affected by differences in document length?

* **Eliminated Options:**

  * *Euclidean Distance:* Sensitive to vector magnitude.
  * *Manhattan Distance:* Influenced by total counts.
  * *Minkowski Distance:* Still magnitude dependent.

* **Correct Answer:** **Cosine Similarity**

> [!TIP]
> **Explanation:**
>
> Two documents containing identical word distributions but different lengths will have:
>
> * High Cosine Similarity
> * Potentially large Euclidean Distance
>
> This makes cosine similarity highly effective for information retrieval systems.
