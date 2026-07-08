# Question 40

**Question:** Which distance measure calculates proximity using only the largest coordinate difference?

* **Eliminated Options:**

  * *Euclidean Distance:* Considers all coordinate differences.
  * *Manhattan Distance:* Sums absolute differences.
  * *Minkowski Distance ((p=2)):* Equivalent to Euclidean distance.

* **Correct Answer:** **Supremum (Chebyshev) Distance**

> [!IMPORTANT]
> **Explanation:**
>
> The Chebyshev distance is:
>
> $$
> d(x,y)=\max_i |x_i-y_i|
> $$
>
> It is frequently used in applications where the maximum deviation is critical.
