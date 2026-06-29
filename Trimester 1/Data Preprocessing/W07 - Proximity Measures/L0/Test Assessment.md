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

## Question 32

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

## Question 33

**Question:** What is the Euclidean distance between the points ((2,3)) and ((5,7))?

* **Eliminated Options:**

  * *5:* This ignores squaring and square-root operations.
  * *4:* This considers only one dimension.
  * *7:* This is the sum of coordinate differences.

* **Correct Answer:** **5**

> [!TIP]
> **Explanation:**
>
> Using the Euclidean distance formula:
>
> $$
> d=\sqrt{(5-2)^2+(7-3)^2}
> $$
>
> $$
> d=\sqrt{3^2+4^2}
> $$
>
> $$
> d=\sqrt{9+16}=\sqrt{25}=5
> $$

## Question 34

**Question:** Which similarity measure is computed as the ratio of common features to total unique features?

* **Eliminated Options:**

  * *Cosine Similarity:* Based on vector angles.
  * *Simple Matching Coefficient:* Includes mutual absences.
  * *Pearson Correlation:* Measures linear relationships.

* **Correct Answer:** **Jaccard Coefficient**

> [!NOTE]
> **Explanation:**
>
> The Jaccard similarity is:
>
> $$
> J(A,B)=\frac{|A\cap B|}{|A\cup B|}
> $$
>
> It measures overlap relative to the total number of distinct features.

## Question 35

**Question:** Which type of attribute can take any real value within a specified range?

* **Eliminated Options:**

  * *Binary Attribute:* Has only two possible values.
  * *Nominal Attribute:* Represents categories without ordering.
  * *Ordinal Attribute:* Represents ordered categories.

* **Correct Answer:** **Continuous Attribute**

> [!IMPORTANT]
> **Explanation:**
>
> Examples include:
>
> * Temperature
> * Height
> * Weight
> * Blood Pressure
>
> Continuous attributes can assume infinitely many values within an interval.

## Question 36

**Question:** Which proximity measure would be most appropriate for comparing customer purchase histories represented as sets of purchased products?

* **Eliminated Options:**

  * *Euclidean Distance:* Not ideal for sparse set-based data.
  * *Manhattan Distance:* Designed primarily for numerical attributes.
  * *Hamming Distance:* Requires aligned positions.

* **Correct Answer:** **Jaccard Coefficient**

> [!TIP]
> **Explanation:**
>
> Purchase histories often contain many absent items. The Jaccard Coefficient focuses only on shared purchases:
>
> $$
> J(A,B)=\frac{\text{Common Purchases}}{\text{Total Unique Purchases}}
> $$

## Question 37

**Question:** If two vectors are orthogonal, what is their cosine similarity?

* **Eliminated Options:**

  * *1:* Indicates identical direction.
  * *0.5:* Represents partial similarity.
  * *-1:* Indicates opposite directions.

* **Correct Answer:** **0**

> [!NOTE]
> **Explanation:**
>
> Orthogonal vectors form an angle of:
>
> $$
> \theta=90^\circ
> $$
>
> Therefore:
>
> $$
> \cos(90^\circ)=0
> $$
>
> indicating no directional similarity.

## Question 38

**Question:** What is the primary disadvantage of Euclidean distance in high-dimensional datasets?

* **Eliminated Options:**

  * *It cannot handle numerical attributes:* Numerical data is its primary use case.
  * *It becomes computationally impossible:* It remains computationally feasible.
  * *It ignores attribute magnitudes:* Magnitude strongly influences Euclidean distance.

* **Correct Answer:** **Distance values become less discriminative**

> [!WARNING]
> **Explanation:**
>
> In high-dimensional spaces:
>
> * Nearest and farthest distances become increasingly similar.
> * Clustering and nearest-neighbor algorithms become less effective.
>
> This is known as the **Curse of Dimensionality**.

## Question 39

**Question:** Which of the following is an example of an asymmetric binary attribute?

* **Eliminated Options:**

  * *Gender (Male/Female):* Both states are equally important.
  * *Pass/Fail in a classroom quiz:* Usually treated symmetrically.
  * *Marital Status (Married/Single):* Both categories carry equal importance.

* **Correct Answer:** **Whether a network intrusion attack occurred (Yes/No)**

> [!NOTE]
> **Explanation:**
>
> Intrusion events are rare and highly significant.
>
> A "Yes" carries much more information than a "No", making this an asymmetric binary attribute.

## Question 40

**Question:** Which distance measure calculates proximity using only the largest coordinate difference?

* **Eliminated Options:**

  * *Euclidean Distance:* Considers all coordinate differences.
  * *Manhattan Distance:* Sums absolute differences.
  * *Minkowski Distance ((p=2)):* Equivalent to Euclidean distance.

* **Correct Answer:** **Supremum (Chebyshev) Distance**

> [!IMPORTANT]
> **Explanation:**
>
> The Chebyshev distance is:
>
> $$
> d(x,y)=\max_i |x_i-y_i|
> $$
>
> It is frequently used in applications where the maximum deviation is critical.

## Question 41

**Question:** Why is standardization often preferred over min-max normalization when extreme outliers exist?

* **Eliminated Options:**

  * *Standardization removes outliers:* Outliers still remain.
  * *Standardization converts data into binary form:* It does not.
  * *Standardization changes nominal attributes into numerical ones:* It only applies to numerical data.

* **Correct Answer:** **Standardization is generally less sensitive to extreme values**

> [!TIP]
> **Explanation:**
>
> Standardization transforms data as:
>
> $$
> z=\frac{x-\mu}{\sigma}
> $$
>
> While outliers still affect the mean and standard deviation, min-max scaling can compress most observations into a narrow range when extreme values are present.

## Question 42

**Question:** In proximity analysis, what does a distance value of zero indicate?

* **Eliminated Options:**

  * *Complete dissimilarity:* This represents maximum separation.
  * *Missing information:* Distance values do not indicate missingness.
  * *Weak similarity:* Zero distance implies perfect similarity.

* **Correct Answer:** **The objects are identical with respect to the measured attributes**

> [!NOTE]
> **Explanation:**
>
> For most distance metrics:
>
> $$
> d(x,y)=0
> $$
>
> means:
>
> $$
> x=y
> $$
>
> for all considered dimensions.

## Question 43

**Question:** Which of the following algorithms directly depends on proximity computations to classify unseen observations?

* **Eliminated Options:**

  * *Naive Bayes:* Uses probability distributions.
  * *Decision Trees:* Use recursive splitting rules.
  * *Apriori:* Mines association rules.

* **Correct Answer:** **K-Nearest Neighbors (KNN)**

> [!IMPORTANT]
> **Explanation:**
>
> KNN classifies a new observation by:
>
> 1. Calculating distances to training observations.
> 2. Selecting the nearest (k) neighbors.
> 3. Assigning the majority class among neighbors.
>
> Distance computation is the foundation of KNN.

## Question 44

**Question:** Which similarity measure is most appropriate when comparing sparse binary vectors containing many zeros?

* **Eliminated Options:**

  * *Simple Matching Coefficient:* Gives equal importance to 0-0 matches.
  * *Euclidean Distance:* Not ideal for sparse binary data.
  * *Pearson Correlation:* Intended for continuous variables.

* **Correct Answer:** **Jaccard Coefficient**

> [!NOTE]
> **Explanation:**
>
> Sparse datasets contain many absent features. The Jaccard Coefficient ignores mutual absences:
>
> $$
> J=\frac{M_{11}}{M_{11}+M_{10}+M_{01}}
> $$
>
> making it especially useful for recommendation systems and market basket analysis.

## Question 45

**Question:** Why is proximity analysis considered fundamental in data mining?

* **Eliminated Options:**

  * *It automatically cleans data:* Data cleaning is a separate preprocessing task.
  * *It eliminates the need for feature engineering:* Feature engineering remains essential.
  * *It guarantees perfect predictions:* No analytical technique provides such guarantees.

* **Correct Answer:** **Many mining algorithms rely on measuring similarity or dissimilarity between objects**

> [!IMPORTANT]
> **Explanation:**
>
> Proximity measures underpin numerous data mining techniques, including:
>
> * Clustering
> * Classification
> * Recommendation Systems
> * Outlier Detection
> * Information Retrieval
>
> Without a way to quantify similarity or distance, many machine learning algorithms cannot operate effectively.
