# Question 6

**Question:** Which of the following is considered a potential challenge or limitation of data transformation?

* **Eliminated Options:**

  * *It reduces the need for data cleaning:* Transformation does not eliminate the need for cleaning.
  * *It guarantees an increase in analytical accuracy:* No preprocessing technique guarantees improved accuracy.
  * *It always improves the interpretability of the data:* Some transformations may actually reduce interpretability.

* **Correct Answer:** **It can sometimes lead to a loss of detail or granularity**

> [!WARNING]
> **Explanation:**
>
> Certain transformation techniques, such as aggregation, smoothing, and discretization, may reduce the level of detail available.
>
> For example:
>
> $$
> \text{Daily Sales} \rightarrow \text{Monthly Sales}
> $$
>
> preserves overall trends but loses day-to-day information.
>
> This loss of granularity can affect downstream analysis.
