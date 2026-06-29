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

## Question 19

**Question:** Which similarity measure is commonly used for market basket analysis where transactions are represented as sets of purchased items?

* **Eliminated Options:**

  * *Euclidean Distance:* Not suitable for sparse transactional set data.
  * *Pearson Correlation:* Measures linear relationships between continuous variables.
  * *Manhattan Distance:* Primarily used for numerical attributes.

* **Correct Answer:** **Jaccard Coefficient**

> [!NOTE]
> **Explanation:**
>
> Market basket data is typically sparse and binary. The Jaccard Coefficient measures the similarity between two sets:
>
> $$
> J(A,B)=\frac{|A \cap B|}{|A \cup B|}
> $$
>
> It considers only shared purchases and ignores items neither customer bought.

## Question 20

**Question:** What is the range of values for the Cosine Similarity measure when applied to non-negative vectors?

* **Eliminated Options:**

  * *-1 to 1:* This is the general range when negative values are allowed.
  * *0 to 100:* Cosine similarity is not expressed as a percentage.
  * *-100 to 100:* Not a valid similarity scale.

* **Correct Answer:** **0 to 1**

> [!TIP]
> **Explanation:**
>
> For non-negative vectors:
>
> * 1 indicates identical direction.
> * 0 indicates orthogonality (completely dissimilar).
>
> Since most text mining applications use non-negative term frequencies, cosine similarity usually ranges from 0 to 1.

## Question 21

**Question:** Which attribute type consists of categories with no inherent ordering?

* **Eliminated Options:**

  * *Ordinal Attribute:* Categories have a meaningful order.
  * *Continuous Attribute:* Values are numerical and measurable.
  * *Binary Attribute:* Restricted to only two possible states.

* **Correct Answer:** **Nominal Attribute**

> [!NOTE]
> **Explanation:**
>
> Examples of nominal attributes include:
>
> * Eye Color
> * Blood Type
> * Nationality
>
> No category is naturally greater or smaller than another.

## Question 22

**Question:** In Simple Matching Coefficient (SMC), which matches contribute to similarity?

* **Eliminated Options:**

  * *Only 1-1 matches:* This is characteristic of the Jaccard Coefficient.
  * *Only 0-0 matches:* Ignores mutual presence information.
  * *Only mismatches:* Mismatches decrease similarity.

* **Correct Answer:** **Both 1-1 and 0-0 matches**

> [!IMPORTANT]
> **Explanation:**
>
> The Simple Matching Coefficient is:
>
> $$
> SMC=\frac{M_{11}+M_{00}}{M_{01}+M_{10}+M_{11}+M_{00}}
> $$
>
> Both mutual presence and mutual absence contribute equally.

## Question 23

**Question:** What happens to Euclidean distance when the dimensionality of the dataset becomes very high?

* **Eliminated Options:**

  * *Distances become exactly zero:* High dimensionality does not force zero distances.
  * *Distance computation becomes impossible:* It remains computationally feasible.
  * *All objects become identical:* Objects remain distinct.

* **Correct Answer:** **Distances between objects tend to become increasingly similar**

> [!WARNING]
> **Explanation:**
>
> This phenomenon is known as the **Curse of Dimensionality**.
>
> In very high-dimensional spaces:
>
> * The distinction between nearest and farthest neighbors decreases.
> * Distance-based algorithms may lose effectiveness.
>
> This is a major challenge in clustering and nearest-neighbor methods.

## Question 24

**Question:** Which distance metric would be most appropriate for a robot moving only horizontally and vertically on a warehouse floor?

* **Eliminated Options:**

  * *Euclidean Distance:* Assumes unrestricted movement in any direction.
  * *Cosine Similarity:* Measures orientation rather than travel distance.
  * *Jaccard Coefficient:* Designed for set similarity.

* **Correct Answer:** **Manhattan Distance**

> [!NOTE]
> **Explanation:**
>
> Since the robot can move only along rows and columns, Manhattan Distance accurately models the actual path traveled.

## Question 25

**Question:** Which property must every valid distance measure satisfy?

* **Eliminated Options:**

  * *Distance can be negative:* Distances are always non-negative.
  * *Distance from an object to itself can be positive:* Self-distance must equal zero.
  * *Distance depends on observation order:* Valid distance measures are symmetric.

* **Correct Answer:** **The distance between an object and itself must be zero**

> [!IMPORTANT]
> **Explanation:**
>
> A valid metric must satisfy:
>
> 1. Non-negativity
> 2. Identity:
>
> $$
> d(x,x)=0
> $$
>
> 3. Symmetry:
>
> $$
> d(x,y)=d(y,x)
> $$
>
> 4. Triangle Inequality

## Question 26

**Question:** Which proximity measure is least affected by differences in document length?

* **Eliminated Options:**

  * *Euclidean Distance:* Sensitive to vector magnitude.
  * *Manhattan Distance:* Influenced by total counts.
  * *Minkowski Distance:* Still magnitude dependent.

* **Correct Answer:** **Cosine Similarity**

> [!TIP]
> **Explanation:**
>
> Two documents containing identical word distributions but different lengths will have:
>
> * High Cosine Similarity
> * Potentially large Euclidean Distance
>
> This makes cosine similarity highly effective for information retrieval systems.

## Question 27

**Question:** Which binary attribute type is typically used when the presence of a feature is rare and more informative than its absence?

* **Eliminated Options:**

  * *Symmetric Binary Attribute:* Treats both states equally.
  * *Nominal Attribute:* Does not specifically model rarity.
  * *Continuous Attribute:* Not binary.

* **Correct Answer:** **Asymmetric Binary Attribute**

> [!NOTE]
> **Explanation:**
>
> Examples include:
>
> * Fraud Detection
> * Disease Diagnosis
> * Defect Detection
>
> In these cases, a positive occurrence is much more informative than a negative one.

## Question 28

**Question:** What does a Jaccard Coefficient value of 1 indicate?

* **Eliminated Options:**

  * *Complete dissimilarity:* Indicates no common features.
  * *Partial similarity:* Represents only moderate overlap.
  * *No relationship:* Jaccard always quantifies similarity.

* **Correct Answer:** **The two objects share all considered features**

> [!NOTE]
> **Explanation:**
>
> A Jaccard similarity of:
>
> $$
> J(A,B)=1
> $$
>
> means:
>
> $$
> A=B
> $$
>
> with respect to the attributes being compared.

## Question 29

**Question:** Why are ordinal attributes often normalized after being converted to ranks?

* **Eliminated Options:**

  * *To remove ordering information:* Normalization preserves ordering.
  * *To convert them into nominal attributes:* This would lose valuable information.
  * *To create binary attributes:* Binarization is unnecessary.

* **Correct Answer:** **To place the ranked values on a common scale**

> [!TIP]
> **Explanation:**
>
> After assigning ranks:
>
> $$
> z_{if}=\frac{r_{if}-1}{M_f-1}
> $$
>
> where:
>
> * (r_{if}) = rank
> * (M_f) = number of states
>
> This standardizes ordinal values to the range [0,1].

## Question 30

**Question:** Which statement best describes similarity and dissimilarity measures?

* **Eliminated Options:**

  * *They are unrelated concepts:* They are mathematically connected.
  * *High similarity always implies high dissimilarity:* The relationship is inverse.
  * *They always have identical values:* This occurs only under special circumstances.

* **Correct Answer:** **High similarity generally corresponds to low dissimilarity**

> [!IMPORTANT]
> **Explanation:**
>
> Similarity and dissimilarity are inverse concepts:
>
> $$
> s(x,y)=1-d(x,y)
> $$
>
> when both measures are normalized to the interval [0,1].
>
> Distance-based algorithms typically use dissimilarity, while recommendation systems often rely on similarity measures.

## Question 31

**Question:** Which proximity measure would be most suitable for comparing two DNA sequences of equal length?

* **Eliminated Options:**

  * *Cosine Similarity:* More appropriate for vector data.
  * *Euclidean Distance:* Requires numerical coordinates.
  * *Jaccard Coefficient:* Ignores positional information.

* **Correct Answer:** **Hamming Distance**

> [!NOTE]
> **Explanation:**
>
> Hamming Distance counts the number of positions at which corresponding symbols differ.
>
> Example:
>
> ```
> Sequence 1: ACTGGA
> Sequence 2: ACTAGA
> ```
>
> Only one position differs, so:
>
> $$
> d_H=1
> $$
