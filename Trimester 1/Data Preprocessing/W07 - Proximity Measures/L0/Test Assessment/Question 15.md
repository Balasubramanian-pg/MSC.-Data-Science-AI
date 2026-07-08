# Question 15

**Question:** Which Minkowski distance parameter value makes it equivalent to Manhattan Distance?

* **Eliminated Options:**

  * *(p=2):* Produces Euclidean Distance.
  * *(p\to\infty):* Produces Supremum (Chebyshev) Distance.
  * *(p=0):* Not a valid Minkowski metric.

* **Correct Answer:** **(p=1)**

> [!IMPORTANT]
> **Explanation:**
>
> The general Minkowski Distance is:
>
> $$
> d(x,y)=\left(\sum_{i=1}^{n}|x_i-y_i|^p\right)^{1/p}
> $$
>
> Special cases:
>
> * (p=1) → Manhattan Distance
> * (p=2) → Euclidean Distance
> * (p\to\infty) → Supremum Distance
