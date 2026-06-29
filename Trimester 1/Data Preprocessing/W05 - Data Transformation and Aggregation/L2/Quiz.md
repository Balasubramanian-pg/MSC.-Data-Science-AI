
<img width="603" height="707" alt="image" src="https://github.com/user-attachments/assets/f2da8b70-4514-4356-84a3-04073246ec8a" />

## Question 1

**Question:** Which of the following scenarios is a direct application of data aggregation?

* **Eliminated Options:**

  * *Scaling all monetary values to a range between 0 and 1:* This is normalization, not aggregation.
  * *Correcting a zip code from "1001" to "01001":* This is data cleaning.
  * *Removing a "customer_favorite_color" column from a loan application dataset:* This is feature selection or dimensionality reduction.

* **Correct Answer:** **Calculating the total monthly sales from a table of daily sales figures**

> [!NOTE]
> **Explanation:**
>
> Data aggregation combines multiple detailed records into a summarized form.
>
> For example:
>
> $$
> \text{Monthly Sales} = \sum_{i=1}^{30} \text{Daily Sales}_i
> $$
>
> Aggregation reduces data volume while preserving useful information for analysis.

## Question 2

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

## Question 3

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
