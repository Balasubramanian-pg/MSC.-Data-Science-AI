# Question 32

**Question:** Which distance measure satisfies the triangle inequality property?

* **Eliminated Options:**

  * *Simple Matching Coefficient:* It is a similarity measure, not a distance metric.
  * *Cosine Similarity:* Measures angular similarity rather than metric distance.
  * *Jaccard Coefficient:* Primarily a similarity measure and does not inherently satisfy all metric properties.

* **Correct Answer:** **Euclidean Distance**

> [!NOTE]
> **Explanation:**
>
> A valid metric distance must satisfy:
>
> $$
> d(x,z) \leq d(x,y)+d(y,z)
> $$
>
> Euclidean Distance obeys this property, ensuring that the direct path between two points is never longer than an indirect path.
