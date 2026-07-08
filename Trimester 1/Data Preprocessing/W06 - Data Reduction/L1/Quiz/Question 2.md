# Question 2

**Question:** A dataset for predicting house prices contains two columns: `price_in_usd` and `price_in_eur`. What kind of feature is `price_in_eur` if `price_in_usd` is already present?

* **Eliminated Options:**

  * *An irrelevant feature:* The EUR price is directly related to the USD price and therefore is relevant.
  * *A sparse feature:* Sparsity refers to features containing mostly zero values.
  * *A noisy feature:* Noise introduces random variation rather than duplicate information.

* **Correct Answer:** **A redundant feature**

> [!NOTE]
> **Explanation:**
>
> If:
>
> $$
> \text{price_in_eur} = \text{price_in_usd} \times \text{Exchange Rate}
> $$
>
> then `price_in_eur` provides no additional information because it can be derived directly from `price_in_usd`.
>
> Such features are called **redundant features**.
