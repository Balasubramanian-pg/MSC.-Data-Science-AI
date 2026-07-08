# Question 2

**Question:** What is the main reason to apply normalization to features before using a distance-based algorithm like k-Nearest Neighbours (k-NN)?

* **Eliminated Options:**

  * *To increase the number of features available for the model:* Normalization does not create new features.
  * *To ensure all features are stored as text strings:* Normalization operates on numerical values, not text conversion.
  * *To make the data perfectly fit a normal distribution:* Normalization rescales values but does not guarantee normality.

* **Correct Answer:** **To prevent features with large numerical ranges from dominating the distance calculations**

> [!IMPORTANT]
> **Explanation:**
>
> Distance-based algorithms such as k-NN compute distances using formulas like:
>
> $$
> d(x,y)=\sqrt{\sum_{i=1}^{n}(x_i-y_i)^2}
> $$
>
> If one feature ranges from 0 to 100,000 while another ranges from 0 to 10, the larger feature will dominate the distance computation.
>
> Normalization places features on comparable scales, ensuring each contributes fairly.
