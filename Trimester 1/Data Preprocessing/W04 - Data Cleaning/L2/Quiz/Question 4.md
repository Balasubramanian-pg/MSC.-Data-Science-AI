# Question 4

**Question:** The process of sorting data and then smoothing it by replacing values with their bin's average or median is known as __________________.

* **Eliminated Options:**

  * *Clustering:* Groups similar objects into clusters but does not smooth values by bins.
  * *Regression:* Fits mathematical relationships between variables.
  * *Manual inspection:* Involves human review rather than automated smoothing.

* **Correct Answer:** **Binning**

> [!IMPORTANT]
> **Explanation:**
>
> Binning is a data smoothing technique used to reduce noise.
>
> The process typically involves:
>
> 1. Sorting the data.
> 2. Dividing the data into bins.
> 3. Replacing values within each bin using:
>
>    * Bin mean
>    * Bin median
>    * Bin boundaries
>
> Example:
>
> Original values:
>
> $$
> [4, 8, 15, 21, 24]
> $$
>
> After binning and smoothing by mean:
>
> $$
> [9, 9, 9, 22.5, 22.5]
> $$
>
> Binning helps reduce the impact of random noise in datasets.
