## Question 9

**Question:** Which distance metric is also known as the "city block" distance because it measures movement only along horizontal and vertical paths?

* **Eliminated Options:**

  * *Euclidean Distance:* Measures the direct straight-line distance between points.
  * *Cosine Similarity:* Measures the angle between vectors rather than physical distance.
  * *Jaccard Coefficient:* Measures similarity for binary or set data, not geometric distance.

* **Correct Answer:** **Manhattan Distance**

> [!NOTE]
> **Explanation:**
> Manhattan Distance calculates the distance between two points by summing the absolute differences across dimensions:
>
> $$
> d(x,y)=\sum_{i=1}^{n}|x_i-y_i|
> $$
>
> It is called "city block distance" because it resembles traveling through streets laid out in a rectangular grid.

## Question 10

**Question:** Which similarity measure is most appropriate for comparing text documents represented as high-dimensional word-frequency vectors?

* **Eliminated Options:**

  * *Euclidean Distance:* Sensitive to document length and magnitude differences.
  * *Simple Matching Coefficient:* Designed for binary attributes rather than frequency vectors.
  * *Hamming Distance:* Only counts positional mismatches and is unsuitable for document vectors.

* **Correct Answer:** **Cosine Similarity**

> [!TIP]
> **Explanation:**
> Cosine Similarity measures the cosine of the angle between two vectors:
>
> $$
> \text{sim}(x,y)=\frac{x \cdot y}{||x||,||y||}
> $$
>
> It focuses on orientation rather than magnitude, making it ideal for text mining applications such as document clustering and information retrieval.

## Question 11

**Question:** What is the dissimilarity between two nominal attribute values if they are exactly the same?

* **Eliminated Options:**

  * *1:* Indicates complete mismatch.
  * *0.5:* Partial matching is not used for nominal attributes.
  * *Depends on normalization:* Nominal matching does not require normalization.

* **Correct Answer:** **0**

> [!NOTE]
> **Explanation:**
> For nominal attributes:
>
> * Match → Dissimilarity = 0
> * Mismatch → Dissimilarity = 1
>
> Since both values are identical, there is no dissimilarity.

## Question 12

**Question:** Which of the following attributes is best classified as an ordinal attribute?

* **Eliminated Options:**

  * *Blood Type (A, B, AB, O):* Nominal because no natural ordering exists.
  * *Annual Income:* Numerical because values are quantitative.
  * *ZIP Code:* Nominal despite containing numbers.

* **Correct Answer:** **Customer Satisfaction Rating (Poor, Fair, Good, Excellent)**

> [!IMPORTANT]
> **Explanation:**
> Ordinal attributes possess an inherent ordering:
>
> $$
> \text{Poor} < \text{Fair} < \text{Good} < \text{Excellent}
> $$
>
> However, the exact differences between categories are not necessarily equal.

## Question 13

**Question:** Why are numerical attributes often normalized before computing Euclidean distance?

* **Eliminated Options:**

  * *To convert them into binary values:* Normalization does not binarize data.
  * *To remove missing values:* Missing value treatment is a separate preprocessing step.
  * *To reduce dimensionality:* Normalization does not decrease the number of features.

* **Correct Answer:** **To prevent attributes with large scales from dominating the distance calculation**

> [!TIP]
> **Explanation:**
> Suppose one attribute ranges from 0 to 100,000 while another ranges from 0 to 10. The larger-scale attribute would dominate the Euclidean distance calculation.
>
> Common normalization methods include:
>
> * Min-Max Scaling
> * Z-score Standardization

## Question 14

**Question:** Which proximity measure ignores the magnitude of vectors and considers only their direction?

* **Eliminated Options:**

  * *Euclidean Distance:* Uses absolute coordinate values.
  * *Manhattan Distance:* Uses coordinate differences.
  * *Minkowski Distance:* Generalizes Euclidean and Manhattan distances.

* **Correct Answer:** **Cosine Similarity**

> [!NOTE]
> **Explanation:**
> Cosine Similarity evaluates:
>
> $$
> \cos(\theta)
> $$
>
> where $\theta$ is the angle between vectors.
>
> Two vectors pointing in the same direction have a similarity of:
>
> $$
> \cos(0^\circ)=1
> $$

## Question 15

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

## Question 16

**Question:** In the context of binary attributes, what does a 0-0 match represent?

* **Eliminated Options:**

  * *A mismatch between two objects:* Both values are identical.
  * *A missing value:* Zero is a valid attribute state.
  * *A numerical distance of zero:* It specifically refers to mutual absence.

* **Correct Answer:** **Both objects do not possess the feature**

> [!NOTE]
> **Explanation:**
>
> Example:
>
> | Customer | Purchased Product X |
> | -------- | ------------------- |
> | A        | No (0)              |
> | B        | No (0)              |
>
> This is a 0-0 match, indicating mutual absence of the feature.

## Question 17

**Question:** Which distance metric is obtained from the Minkowski distance when (p \to \infty)?

* **Eliminated Options:**

  * *Euclidean Distance:* Corresponds to (p=2).
  * *Manhattan Distance:* Corresponds to (p=1).
  * *Jaccard Distance:* Not derived from Minkowski distance.

* **Correct Answer:** **Supremum Distance**

> [!NOTE]
> **Explanation:**
>
> Supremum Distance, also called Chebyshev Distance, is:
>
> $$
> d(x,y)=\max_i |x_i-y_i|
> $$
>
> It considers only the largest coordinate difference between two objects.

## Question 18

**Question:** Which data mining algorithm relies heavily on proximity calculations to assign objects to clusters?

* **Eliminated Options:**

  * *Apriori Algorithm:* Used for association rule mining.
  * *Decision Trees:* Use attribute splitting rather than proximity.
  * *Naive Bayes:* Uses probabilistic inference.

* **Correct Answer:** **K-Means Clustering**

> [!TIP]
> **Explanation:**
>
> K-Means repeatedly:
>
> 1. Computes distances between points and centroids.
> 2. Assigns each point to the nearest centroid.
> 3. Updates centroid positions.
>
> Euclidean distance is most commonly used in K-Means clustering.
