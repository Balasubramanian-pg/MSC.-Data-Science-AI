# Question 23

**Question:** What happens to Euclidean distance when the dimensionality of the dataset becomes very high?

* **Eliminated Options:**

  * *Distances become exactly zero:* High dimensionality does not force zero distances.
  * *Distance computation becomes impossible:* It remains computationally feasible.
  * *All objects become identical:* Objects remain distinct.

* **Correct Answer:** **Distances between objects tend to become increasingly similar**

> [!WARNING]
> **Explanation:**
>
> This phenomenon is known as the **Curse of Dimensionality**.
>
> In very high-dimensional spaces:
>
> * The distinction between nearest and farthest neighbors decreases.
> * Distance-based algorithms may lose effectiveness.
>
> This is a major challenge in clustering and nearest-neighbor methods.
