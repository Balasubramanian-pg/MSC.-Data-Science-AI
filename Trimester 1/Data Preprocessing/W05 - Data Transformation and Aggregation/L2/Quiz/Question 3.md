# Question 3

**Question:** Which normalization technique rescales data based on its minimum and maximum values?

* **Eliminated Options:**

  * *Decimal Scaling:* Rescales values by moving the decimal point.
  * *Log Transformation:* Reduces skewness and compresses large values.
  * *Z-Score Normalization:* Standardizes values using the mean and standard deviation.

* **Correct Answer:** **Min-Max Normalization**

> [!TIP]
> **Explanation:**
>
> Min-Max Normalization transforms values into a specified range, usually ([0,1]):
>
> $$
> x'=\frac{x-x_{\min}}{x_{\max}-x_{\min}}
> $$
>
> where:
>
> * (x) = original value
> * (x_{\min}) = minimum value in the dataset
> * (x_{\max}) = maximum value in the dataset
>
> This technique preserves the relative ordering of observations while scaling them to a common range.


<img width="394" height="571" alt="image" src="https://github.com/user-attachments/assets/b12db1e2-5909-4102-b4fc-a05081152394" />
