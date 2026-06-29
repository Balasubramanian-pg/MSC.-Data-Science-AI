
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

## Question 4

**Question:** What is the primary role of data transformation in data preprocessing?

* **Eliminated Options:**

  * *To correct typos and spelling errors in the data:* This is a data cleaning task.
  * *To find the distances or similarities between data objects:* This is part of proximity analysis.
  * *To reduce the number of records in the dataset:* This is data reduction or sampling.

* **Correct Answer:** **To convert raw data into a format that is more suitable and useful for analysis**

> [!NOTE]
> **Explanation:**
>
> Data transformation modifies data into forms that improve analysis and model performance.
>
> Common transformation techniques include:
>
> * Normalization
> * Aggregation
> * Smoothing
> * Attribute construction
> * Generalization
>
> The goal is:
>
> $$
> \text{Raw Data} \rightarrow \text{Useful Analytical Format}
> $$

## Question 5

**Question:** What is one of the primary benefits of aggregated data?

* **Eliminated Options:**

  * *Aggregation increases the precision of the data by adding more detail:* Aggregation summarizes data and typically reduces detail.
  * *Aggregation ensures that outliers are always preserved and highlighted:* Outliers may actually be hidden during aggregation.
  * *Aggregation is a required first step before any data cleaning can occur:* Data cleaning can occur independently of aggregation.

* **Correct Answer:** **Aggregation can reduce the size of the dataset and improve computational efficiency**

> [!TIP]
> **Explanation:**
>
> Aggregation combines detailed records into summarized forms.
>
> Example:
>
> $$
> \text{Daily Sales} \rightarrow \text{Monthly Sales}
> $$
>
> Benefits include:
>
> * Reduced storage requirements
> * Faster processing
> * Improved computational efficiency
> * Simplified analysis

## Question 6

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

## Question 7

**Question:** You have a set of student marks with a mean = 60 and a standard deviation = 10. If a student scored 35, what is their Z-score?

* **Eliminated Options:**

  * *2.5:* This would correspond to a score above the mean, not below it.
  * *-1.5:* Incorrect application of the Z-score formula.
  * *3.5:* This value is inconsistent with the given statistics.

* **Correct Answer:** **-2.5**

> [!IMPORTANT]
> **Explanation:**
>
> The Z-score is calculated as:
>
> $$
> z=\frac{x-\mu}{\sigma}
> $$
>
> Substituting the given values:
>
> $$
> z=\frac{35-60}{10}
> $$
>
> $$
> z=\frac{-25}{10}
> $$
>
> $$
> z=-2.5
> $$
>
> A Z-score of **-2.5** means the student's score is **2.5 standard deviations below the mean**.
