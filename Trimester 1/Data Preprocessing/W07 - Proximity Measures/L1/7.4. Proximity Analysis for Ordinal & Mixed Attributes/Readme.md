# 7.4. Proximity Analysis for Ordinal and Mixed Attributes

## 7.4.1. Introduction to Proximity in Heterogeneous Data

Real-world data is rarely uniform or easy to analyze.

While classical clustering and distance-based algorithms assume that all input variables are continuous and numeric, practical datasets are complex mixtures of multiple data types. Proximity measures, which quantify the distance or similarity between distinct observations, must adapt to this heterogeneity. This section explores how to calculate robust proximity metrics when dealing with ordinal data and mixed-type attributes.

Having established that data is frequently heterogeneous, let us first isolate how to mathematically treat ordinal attributes before combining them with other types.

## 7.4.2. Understanding Ordinal Attributes

An ordinal attribute is a categorical variable where a clear, natural ordering exists among the values, but the absolute distance between these values cannot be quantified.

In these attributes, order matters but magnitude does not.

The following table displays representative examples of ordinal attributes alongside their ordered categorical values.

| Attribute Name | Ordered Values |
| :---: | :---: |
| Customer Satisfaction | Poor < Fair < Good < Excellent |
| Education Level | High School < Bachelor's < Master's < PhD |
| Competitive Ranking | Bronze < Silver < Gold |

In these cases, we can state that a patient with a "Severe" symptom is in a worse state than one with a "Moderate" symptom, but we cannot mathematically state that the difference between "Severe" and "Moderate" is identical to the difference between "Moderate" and "Mild".

While ordinal categories present an inherent hierarchy, they are still symbolic labels, which leads to the central mathematical dilemma of ordinal representation.

## 7.4.3. The Core Challenge of Ordinal Data

The core mathematical obstacle with ordinal attributes lies in the lack of a defined metric space.

Because the labels are non-numeric symbols, basic algebraic operators such as addition and subtraction are invalid.

If we attempt to calculate the similarity between two entities directly using their symbolic categories, we lose the valuable ordering information. For instance, treating "Excellent" and "Good" as having the exact same dissimilarity as "Excellent" and "Poor" is a significant loss of information. Conversely, we cannot directly compute:

$$
\text{Good} - \text{Poor}
$$

without mapping these labels to a numerical scale. Therefore, we must define a systematic transformation pipeline to map these ordered categories into a numeric space without introducing arbitrary distortions.

To resolve this fundamental limitation, we must establish a structured numeric conversion system.

## 7.4.4. The Pipeline for Ordinal Proximity Analysis

To perform proximity calculations on ordinal variables, we utilize a three-stage preprocessing pipeline.

This workflow ensures that the ordinal properties are mathematically preserved and scaled appropriately.

The pipeline consists of:
1. Rank Encoding
2. Scale Normalization
3. Distance Computation

This progression converts symbolic order into a bounded numeric domain where classical distance metrics can operate reliably.

The first stage in this structured transformation is mapping categories directly to integers based on their position.

## 7.4.5. Step 1: Rank Encoding

The first step is to map the ordered categories to sequential integer ranks.

Let an ordinal attribute have $$M$$ distinct states. We define the set of ordered states as:

$$
S = \{s_1, s_2, \dots, s_M\}
$$

where the order is defined as:

$$
s_1 < s_2 < \dots < s_M
$$

We assign an integer rank $$r_{if}$$ to the value of the $$f$$-th attribute for the $$i$$-th object. The rank encoding rule is:

$$
r_{if} \in \{1, 2, \dots, M\}
$$

where:
- $$r_{if}$$ = the assigned integer rank of object $$i$$ for attribute $$f$$
- $$M$$ = total number of ordered states in the attribute's domain
- $$i$$ = the object index
- $$f$$ = the specific ordinal attribute index

This mapping preserves the ordering constraint such that if:

$$
s_a > s_b
$$

then:

$$
r_{af} > r_{bf}
$$

This numeric representation preserves the qualitative ordering of the original attributes while preparing them for algebraic scaling.

Although integer ranks provide numerical sequence, they do not account for variations in scale between different attributes, necessitating a normalization step.

## 7.4.6. Step 2: Normalization of Ranks

Once the ranks are encoded, they possess a defined numerical range.

However, different ordinal attributes may have different numbers of states, leading to different maximum ranks. To prevent attributes with a larger number of states from dominating the proximity calculation, we must map the ranks to a common scale.

We apply **Min-Max Normalization** to transform the integer ranks into a standardized range of $$0$$ to $$1$$. The normalization formula for the $$f$$-th attribute of the $$i$$-th object is:

$$
z_{if} = \frac{r_{if} - 1}{M_f - 1}
$$

where:
- $$z_{if}$$ = the normalized value of the attribute, satisfying $$0 \le z_{if} \le 1$$
- $$r_{if}$$ = the assigned integer rank of object $$i$$ for attribute $$f$$
- $$M_f$$ = the maximum number of states (or the maximum rank) for attribute $$f$$
- $$1$$ = the minimum possible rank

Let us explicitly restate the key normalization formula:

$$
z_{if} = \frac{r_{if} - 1}{M_f - 1}
$$

>[!Tip]
> Min-max normalization maps the discrete scale into a uniform metric space, ensuring that ordinal features with different category counts are weighted equally.

This transformation ensures that all ordinal variables contribute equally to any subsequent distance computation, regardless of how many categories they originally contained.

Once the ranks are normalized onto a uniform scale, we are ready to calculate mathematical distances between objects.

## 7.4.7. Step 3: Distance Calculation

After normalization, the ordinal variables are represented as continuous values bounded between $$0$$ and $$1$$.

They can now be treated as numeric features, allowing us to compute pairwise dissimilarity.

The most common metric used for these normalized variables is the **Manhattan Distance**, which calculates the absolute difference between two objects. The pairwise dissimilarity $$d(i,j)$$ between object $$i$$ and object $$j$$ for a single ordinal attribute $$f$$ is defined as:

$$
d(i,j) = |z_{if} - z_{jf}|
$$

where:
- $$d(i,j)$$ = the dissimilarity between object $$i$$ and object $$j$$
- $$z_{if}$$ = the normalized rank of object $$i$$
- $$z_{jf}$$ = the normalized rank of object $$j$$

For multi-attribute datasets consisting of multiple normalized ordinal variables, we can compute the overall Manhattan distance:

$$
d(i,j) = \sum_{f=1}^{p} |z_{if} - z_{jf}|
$$

where:
- $$p$$ = total number of ordinal attributes being evaluated
- $$z_{if}$$ = the normalized value of attribute $$f$$ for object $$i$$
- $$z_{jf}$$ = the normalized value of attribute $$f$$ for object $$j$$

Let us examine how this three-step pipeline operates in practice with a concrete numerical calculation.

## 7.4.8. Worked Numerical Example for Ordinal Proximity

To illustrate the entire pipeline, we will compute the pairwise dissimilarity between two customers based on their survey responses.

Suppose:
- Customer A has a satisfaction level of **Good**
- Customer B has a satisfaction level of **Fair**
- The available ordered states are **Poor**, **Fair**, **Good**, and **Excellent**
- The total number of states $$M_f$$ is equal to $$4$$

We will follow the five-step process to find the distance.

### Step 1: Assign Integer Ranks
The categories are ordered as:

$$
\text{Poor} < \text{Fair} < \text{Good} < \text{Excellent}
$$

We assign the integer ranks:

$$
r_{\text{Poor}} = 1
$$

$$
r_{\text{Fair}} = 2
$$

$$
r_{\text{Good}} = 3
$$

$$
r_{\text{Excellent}} = 4
$$

Therefore, the rank for Customer A ($$r_{A}$$) is $$3$$, and the rank for Customer B ($$r_{B}$$) is $$2$$.

### Step 2: Normalize the Ranks
We apply the Min-Max normalization formula using the maximum rank $$M_f = 4$$:

$$
z_{if} = \frac{r_{if} - 1}{M_f - 1}
$$

For Customer A ($$r_{A} = 3$$):

$$
z_{Af} = \frac{3 - 1}{4 - 1} = \frac{2}{3} \approx 0.667
$$

For Customer B ($$r_{B} = 2$$):

$$
z_{Bf} = \frac{2 - 1}{4 - 1} = \frac{1}{3} \approx 0.333
$$

### Step 3: Define the Dissimilarity Formula
The dissimilarity metric is the absolute Manhattan difference:

$$
d(A,B) = |z_{Af} - z_{Bf}|
$$

### Step 4: Compute the Absolute Difference
Substituting the normalized values:

$$
d(A,B) = \left| \frac{2}{3} - \frac{1}{3} \right| = \frac{1}{3}
$$

### Step 5: State the Final Result
The final pairwise dissimilarity between Customer A and Customer B is:

$$
\mathbf{d(A,B) \approx 0.333}
$$

This low dissimilarity indicates that the two customers have relatively similar satisfaction levels.

Now that we have mastered the isolated handling of ordinal variables, we can expand our analytical scope to datasets that contain multiple attribute classes simultaneously.

## 7.4.9. Introduction to Mixed-Type Attributes

While standard datasets are often treated as containing only a single attribute type, real-world databases are heterogeneous.

They contain a mixture of nominal, binary, ordinal, and numeric variables.

The following table displays a representative example of a mixed-type customer record.

| Attribute Name | Attribute Type | Example Value |
| :---: | :---: | :---: |
| Country | Nominal | Spain |
| Age | Numeric (Ratio) | 34 |
| Subscription Status | Binary (Symmetric) | Active |
| Education Level | Ordinal | Master's |

Calculating a single proximity matrix directly from such a table is challenging because a standard Euclidean distance cannot handle nominal variables, nor can Jaccard coefficients handle continuous numeric scales. We must utilize a unified methodology that can combine these distinct mathematical structures.

To resolve the mathematical conflicts that arise when computing distances across diverse data formats, we must introduce Gower's general framework.

## 7.4.10. Mathematical Formulation of Mixed Attribute Dissimilarity (Gower's Methodology)

To compute similarity across heterogeneous variables, we utilize **Gower's Dissimilarity Coefficient**.

This metric processes each attribute separately based on its type, scales the individual dissimilarities to a range of $$0$$ to $$1$$, and then combines them into a single weighted average.

The general formula for Gower's dissimilarity $$d(i,j)$$ between object $$i$$ and object $$j$$ is:

$$
d(i,j) = \frac{\sum_{f=1}^{p} \delta_{ijf} d_{ijf}}{\sum_{f=1}^{p} \delta_{ijf}}
$$

where:
- $$p$$ = total number of attributes in the dataset
- $$d_{ijf}$$ = the dissimilarity contribution of the $$f$$-th attribute between object $$i$$ and object $$j$$
- $$\delta_{ijf}$$ = an indicator weight variable (typically $$1$$ or $$0$$) representing the applicability of attribute $$f$$
- $$d(i,j)$$ = the final aggregated dissimilarity score bounded between $$0$$ and $$1$$

Let us explicitly restate the key formula for Gower's dissimilarity for emphasis:

$$
d(i,j) = \frac{\sum_{f=1}^{p} \delta_{ijf} d_{ijf}}{\sum_{f=1}^{p} \delta_{ijf}}
$$

>[!Note]
> Gower's dissimilarity coefficient acts as an adaptive meta-metric, delegating the calculation of individual attribute distances to their respective domain-specific mathematical functions.

This formula constructs a mathematically rigorous framework where variables of completely different scales and types can coexist in a single distance metric.

To make Gower's equation operational, we must define the precise mathematical rules for calculating dissimilarity for each unique data type.

## 7.4.11. Specific Dissimilarity Rules by Attribute Type

The individual dissimilarity contribution $$d_{ijf}$$ is calculated according to the underlying mathematical type of attribute $$f$$.

### 11.1 Nominal and Binary (Symmetric) Attributes
For nominal attributes and symmetric binary attributes, the dissimilarity is based on simple matching:

$$
d_{ijf} = 0 \quad \text{if} \quad x_{if} = x_{jf}
$$

$$
d_{ijf} = 1 \quad \text{if} \quad x_{if} \neq x_{jf}
$$

where:
- $$x_{if}$$ = value of attribute $$f$$ for object $$i$$
- $$x_{jf}$$ = value of attribute $$f$$ for object $$j$$

### 11.2 Numeric (Continuous) Attributes
For continuous numeric variables, the dissimilarity is the absolute difference scaled by the maximum range of that variable in the dataset:

$$
d_{ijf} = \frac{|x_{if} - x_{jf}|}{\max(x_f) - \min(x_f)}
$$

where:
- $$\max(x_f)$$ = the maximum value observed for attribute $$f$$ across all objects
- $$\min(x_f)$$ = the minimum value observed for attribute $$f$$ across all objects
- $$\max(x_f) - \min(x_f)$$ = the global range $$R_f$$ of attribute $$f$$

### 11.3 Ordinal Attributes
For ordinal variables, we first apply the rank encoding and normalization pipeline described in Section 7.4.6 to obtain the normalized ranks $$z_{if}$$ and $$z_{jf}$$. We then calculate:

$$
d_{ijf} = |z_{if} - z_{jf}|
$$

where:
- $$z_{if}$$ = normalized rank for object $$i$$
- $$z_{jf}$$ = normalized rank for object $$j$$

In addition to scaling specific attribute differences, we need a robust mechanism to handle missing values or non-applicable categorical attributes through selective weights.

## 7.4.12. Understanding the Indicator Weight Factor

The indicator weight factor $$\delta_{ijf}$$ determines whether attribute $$f$$ should contribute to the distance calculation between object $$i$$ and object $$j$$.

The weight is set according to the following rules:
- $$\delta_{ijf} = 0$$ if either $$x_{if}$$ or $$x_{jf}$$ is missing in the dataset.
- $$\delta_{ijf} = 0$$ if attribute $$f$$ is an asymmetric binary variable and both objects have a value of $$0$$ (since joint absence of asymmetric features is non-informative).
- $$\delta_{ijf} = 1$$ for all other valid matches.

By utilizing this selective weighting mechanism:

$$
\delta_{ijf} \in \{0, 1\}
$$

we can construct a highly flexible metric that elegantly handles missing entries and asymmetric distributions without introducing computational bias.

Let us walk through a complete, multi-attribute clinical example to see how Gower's dissimilarity coefficient is calculated step-by-step.

## 7.4.13. Worked Numerical Example for Mixed Attribute Proximity

To demonstrate Gower's method, we will calculate the dissimilarity between two patient records in a clinical database.

Suppose:
- The dataset contains three attributes: **Country** (Nominal), **Age** (Numeric), and **Condition Severity** (Ordinal with states: Mild, Moderate, Severe).
- For the Age attribute, the database has a minimum value of $$20$$ and a maximum value of $$70$$, giving a range of $$50$$.
- Patient 1 has the values: Country = Spain, Age = 30, Condition Severity = Mild.
- Patient 2 has the values: Country = France, Age = 40, Condition Severity = Severe.
- All three attributes are present and applicable, so the weights are: $$\delta_{121} = 1$$, $$\delta_{122} = 1$$, $$\delta_{123} = 1$$.

We will follow the five-step process to compute the overall dissimilarity.

### Step 1: Calculate Nominal Dissimilarity
The first attribute is Country, which is nominal. Because Patient 1 is from Spain and Patient 2 is from France, the values do not match:

$$
d_{121} = 1
$$

### Step 2: Calculate Numeric Dissimilarity
The second attribute is Age. We compute the normalized absolute difference using the observed range of $$50$$:

$$
d_{122} = \frac{|30 - 40|}{70 - 20} = \frac{10}{50} = 0.2
$$

### Step 3: Calculate Ordinal Dissimilarity
The third attribute is Condition Severity. First, we compute the normalized values using the formula:

$$
z_{if} = \frac{r_{if} - 1}{M_f - 1}
$$

For Patient 1 (Mild, rank = $$1$$):

$$
z_{13} = \frac{1 - 1}{3 - 1} = 0
$$

For Patient 2 (Severe, rank = $$3$$):

$$
z_{23} = \frac{3 - 1}{3 - 1} = 1
$$

The dissimilarity contribution is:

$$
d_{123} = |0 - 1| = 1
$$

### Step 4: Perform Weighted Accumulation
We sum the weighted dissimilarity values and the indicator weights where $$\delta_{121} = \delta_{122} = \delta_{123} = 1$$:

$$
\sum_{f=1}^{3} \delta_{12f} d_{12f} = (1 \times 1) + (1 \times 0.2) + (1 \times 1) = 2.2
$$

$$
\sum_{f=1}^{3} \delta_{12f} = 1 + 1 + 1 = 3
$$

### Step 5: Compute Final Aggregated Dissimilarity
We divide the accumulated dissimilarity by the sum of the weights:

$$
d(1,2) = \frac{2.2}{3} \approx 0.733
$$

The final aggregated dissimilarity between Patient 1 and Patient 2 is:

$$
\mathbf{d(1,2) \approx 0.733}
$$

This high dissimilarity index indicates that the two patient records are relatively distant.

After calculating a complete pairwise dissimilarity matrix for a population, the next critical step is creating an intuitive visualization of the proximity structures.

## 7.4.14. Visualization of Proximity: Heat Maps and Similarity Matrices

Once the proximity matrix is computed for a dataset of mixed attributes, visualizing the relationships is critical. Heat maps are particularly effective tools for this task.

In a heat map representing a proximity matrix:
- Both columns and rows represent individual data objects.
- The color intensity of each cell represents the magnitude of the pairwise dissimilarity score $$d(i,j)$$.
- Typically, dark colors represent high similarity (low dissimilarity) while light colors represent low similarity (high dissimilarity).

By applying hierarchical clustering to reorder the rows and columns of the heat map, blocks of highly similar objects naturally emerge as cohesive squares along the diagonal. This visualization technique allows analysts to quickly discover patterns, anomalies, and structural groupings across complex, heterogeneous datasets.

While the analytical and visualization pipelines are powerful, their execution is highly sensitive to critical preprocessing errors.

## 7.4.15. Common Failure Modes in Mixed Proximity Analysis

When implementing proximity measures on ordinal and mixed-type attributes, practitioners often make critical errors that distort the underlying geometry of the data.

### 15.1 Disregarding Ordinal Hierarchy

>[!Warning]
> **Treating Ordinal Variables as Nominal Categories**
> Map-encoding ordinal attributes as simple nominal variables (e.g., using one-hot encoding) completely discards ordering information. For example, treating "Excellent" vs "Good" as having the exact same distance as "Excellent" vs "Poor" distorts the underlying structural relationships of the data, leading to suboptimal clustering and classification performance.

### 15.2 Neglecting Attribute Range Normalization

>[!Warning]
> **Omitting the Range Scaling Step for Numeric Attributes**
> Failing to divide the numeric absolute differences by their global range:
> $$
> \max(x_f) - \min(x_f)
> $$
> allows variables with naturally large magnitudes (such as annual income in the thousands or millions) to completely overwhelm small-magnitude variables (such as rating scales from 1 to 5). This makes the overall distance a proxy for a single high-magnitude feature.

### 15.3 Misinterpreting Symmetric vs Asymmetric Binary Variables

>[!Warning]
> **Applying Symmetric Dissimilarity to Asymmetric Attributes**
> Using standard symmetric matching on asymmetric binary attributes (such as the presence of a rare medical disease) incorrectly treats joint-absence (0-0 matches) as a sign of similarity. Since the absence of a rare disease in two healthy patients does not imply clinical similarity, this misinterpretation artificially inflates similarity scores and compromises downstream analytical models.

In conclusion, mastering heterogeneous proximity analysis is an essential skill for managing the complexity of real-world machine learning systems.

## 7.4.16. Conclusions and Summary

Proximity analysis in heterogeneous spaces requires transforming qualitative, symbolic data into bounded numeric representations before combining them.

The following table contrasts the processing mechanisms and mathematical requirements for nominal, ordinal, numeric, and mixed attributes.

| Attribute Type | Required Preprocessing | Distance Metric | Bounded Range |
| :---: | :---: | :---: | :---: |
| Nominal | None (Identity Matching) | Simple Matching Coefficient | $$[0, 1]$$ |
| Ordinal | Rank Encoding & Min-Max | Manhattan Distance | $$[0, 1]$$ |
| Numeric | Range Scaling | Scaled Absolute Difference | $$[0, 1]$$ |
| Mixed | Modular Preprocessing by Type | Gower's Dissimilarity Coefficient | $$[0, 1]$$ |

By enforcing a unified scale where every variable's dissimilarity is mapped to the range $$[0, 1]$$, Gower's coefficient provides a robust framework for distance-based machine learning algorithms. Whether training a K-Nearest Neighbors classifier, establishing clusters, or building recommender systems, designing a rigorous preprocessing pipeline is crucial for meaningful mathematical representation.
