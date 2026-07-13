# 1.3. Descriptive Methods: Clustering and Association Rule Mining

## 1.3.1. Introduction to Descriptive Methods

Descriptive methods, also known as unsupervised learning, focus on identifying inherent structures, underlying patterns, and summaries within data without a predefined target variable.

Unlike predictive methods that map inputs to known outputs through function approximation:

$$
Y = f(X) + \epsilon
$$

descriptive methods answer a different fundamental question: "What is the natural state and relationship within this data?" By evaluating the raw joint probability density:

$$
P(X)
$$

these systems uncover hidden groupings, dense regions, and logical co-occurrences directly from unlabelled datasets.

To understand how descriptive methods uncover these latent patterns, we must examine the intuitive concepts that govern their grouping logic.

## 1.3.2. Core Intuition of Descriptive Methods

The intuition behind descriptive methods lies in the concept of natural categorization.

When presented with unlabeled data, intelligent systems look for clusters where observations are densely packed together, or identify rules where certain events repeatedly occur alongside others. This is done without human guidance or historical labels. The system must establish its own objective criteria for what makes items "similar" or "connected."

The first major class of descriptive methods maps data directly into geometric vector spaces to isolate spatial boundaries.

## 1.3.3. Clustering: Geometric Pattern Discovery

Clustering is the process of partitioning a dataset into distinct, non-overlapping groups (clusters) such that observations within the same group are highly similar, while observations in different groups are highly distinct.

By treating each observation as a multi-dimensional coordinate point:

$$
x \in \mathbb{R}^d
$$

clustering algorithms evaluate proximity using spatial distance metrics. The classical partition-based approach is K-Means clustering, which groups data by minimizing the geometric distance between points and their corresponding cluster centers.

To implement this spatial partitioning programmatically, we must formalize the objective function of the classic K-Means clustering algorithm.

## 1.3.4. Mathematical Formulation of K-Means Clustering

K-Means clustering iteratively partitions $$N$$ observations into $$k$$ clusters by minimizing the **Within-Cluster Sum of Squares (WCSS)**.

The WCSS objective function is defined as:

$$
WCSS = \sum_{i=1}^{k} \sum_{x \in C_i} ||x - \mu_i||^2
$$

where:
- $$k$$ = the total number of clusters
- $$C_i$$ = the set of data points assigned to cluster $$i$$
- $$\mu_i$$ = the centroid (mean coordinates) of cluster $$i$$
- $$||x - \mu_i||^2$$ = the squared Euclidean distance between point $$x$$ and centroid $$\mu_i$$

Let us explicitly restate the key WCSS formula for emphasis:

$$
WCSS = \sum_{i=1}^{k} \sum_{x \in C_i} ||x - \mu_i||^2
$$

The algorithm minimizes this objective function by repeating two steps until the centroids converge:

### 4.1 Assignment Step
Each observation $$x$$ is assigned to its nearest centroid based on the minimum squared Euclidean distance:

$$
C_i^{(t)} = \left\{ x : ||x - \mu_i^{(t)}||^2 \le ||x - \mu_j^{(t)}||^2 \quad \forall j, 1 \le j \le k \right\}
$$

### 4.2 Update Step
Centroid coordinates are recalculated as the mean of all data points currently assigned to that cluster:

$$
\mu_i^{(t+1)} = \frac{1}{|C_i^{(t)}|} \sum_{x \in C_i^{(t)}} x
$$

While clustering groups observations geometrically, alternative descriptive methods identify logical co-occurrences of items within discrete transactions.

## 1.3.5. Association Rule Mining

Association rule mining identifies strong, non-trivial relationships and co-occurrences between items in transactional databases.

A classic example of association rule mining is market basket analysis, which uncovers relationships between items purchased together.

Let $$I = \{i_1, i_2, \dots, i_m\}$$ be a set of items, and let $$T = \{t_1, t_2, \dots, t_n\}$$ be a set of transactions where each transaction contains a subset of items. An association rule is written as an implication:

$$
A \implies B
$$

where $$A \subset I$$, $$B \subset I$$, and $$A \cap B = \emptyset$$.

We evaluate the strength of an association rule using three key metrics:

### Support
The proportion of transactions in the database that contain the itemset:

$$
\text{Support}(A) = \frac{\text{Number of transactions containing } A}{\text{Total number of transactions}}
$$

### Confidence
The conditional probability that a transaction contains itemset $$B$$, given that it already contains itemset $$A$$:

$$
\text{Confidence}(A \implies B) = \frac{\text{Support}(A \cup B)}{\text{Support}(A)}
$$

Let us explicitly restate the Confidence formula for emphasis:

$$
\text{Confidence}(A \implies B) = \frac{\text{Support}(A \cup B)}{\text{Support}(A)}
$$

### Lift
The ratio of the observed support of the combined itemset to the expected support if the items were completely independent:

$$
\text{Lift}(A \implies B) = \frac{\text{Confidence}(A \implies B)}{\text{Support}(B)} = \frac{\text{Support}(A \cup B)}{\text{Support}(A) \times \text{Support}(B)}
$$

where:
- $$\text{Lift} > 1$$ indicates a positive correlation (items are purchased together more often than expected by random chance).
- $$\text{Lift} = 1$$ indicates complete independence.
- $$\text{Lift} < 1$$ indicates a negative correlation.

To see how both geometric clustering and transactional association rules are calculated mathematically, we will walk through a unified numerical example.

## 1.3.6. Worked Mathematical Example: Centroid Assignment and Association Metrics

We will calculate a manual centroid assignment update for a K-Means model, followed by the evaluation of an association rule from a small database.

Suppose:
- We have three coordinate data points representing customer profiles:
  - $$X_1 = (1, 1)$$
  - $$X_2 = (2, 1)$$
  - $$X_3 = (4, 3)$$
- We have initialized two cluster centroids at:
  - $$\mu_1 = (1, 2)$$
  - $$\mu_2 = (5, 3)$$
- We have a transactional database containing five customer baskets:
  - $$T_1 = \{\text{Bread}, \text{Milk}\}$$
  - $$T_2 = \{\text{Bread}\}$$
  - $$T_3 = \{\text{Bread}, \text{Milk}, \text{Butter}\}$$
  - $$T_4 = \{\text{Milk}, \text{Butter}\}$$
  - $$T_5 = \{\text{Bread}, \text{Milk}\}$$
- We wish to evaluate the mathematical strength of the association rule:
  - $$\text{Bread} \implies \text{Milk}$$

We will follow a five-step calculation pipeline.

### Step 1: Compute Squared Euclidean Distance to Centroids
For each data point, we calculate the squared distance to each centroid.

For $$X_1 = (1, 1)$$:

$$
d^2(X_1, \mu_1) = (1 - 1)^2 + (1 - 2)^2 = 0 + 1 = 1
$$

$$
d^2(X_1, \mu_2) = (1 - 5)^2 + (1 - 3)^2 = 16 + 4 = 20
$$

For $$X_2 = (2, 1)$$:

$$
d^2(X_2, \mu_1) = (2 - 1)^2 + (1 - 2)^2 = 1 + 1 = 2
$$

$$
d^2(X_2, \mu_2) = (2 - 5)^2 + (1 - 3)^2 = 9 + 4 = 13
$$

For $$X_3 = (4, 3)$$:

$$
d^2(X_3, \mu_1) = (4 - 1)^2 + (3 - 2)^2 = 9 + 1 = 10
$$

$$
d^2(X_3, \mu_2) = (4 - 5)^2 + (3 - 3)^2 = 1 + 0 = 1
$$

### Step 2: Assign Points to Clusters
We assign each point to its nearest centroid:
- $$X_1$$ is assigned to Cluster 1 since $$1 < 20$$.
- $$X_2$$ is assigned to Cluster 1 since $$2 < 13$$.
- $$X_3$$ is assigned to Cluster 2 since $$1 < 10$$.

The resulting partitions are:

$$
C_1 = \{X_1, X_2\}
$$

$$
C_2 = \{X_3\}
$$

### Step 3: Recalculate Centroid Coordinates
We compute the new centroid locations as the mean of their assigned points.

For the updated centroid $$\mu_1^*$$:

$$
\mu_1^* = \left( \frac{1 + 2}{2}, \frac{1 + 1}{2} \right) = (1.5, 1.0)
$$

For the updated centroid $$\mu_2^*$$:

$$
\mu_2^* = (4.0, 3.0)
$$

### Step 4: Calculate Association Rule Support and Confidence
Now we analyze our transactional database of five baskets ($$N = 5$$) to evaluate the rule:

$$
\text{Bread} \implies \text{Milk}
$$

The supporting transactions are:
- Transactions containing Bread: $$T_1, T_2, T_3, T_5$$ (count = 4)
- Transactions containing Milk: $$T_1, T_3, T_4, T_5$$ (count = 4)
- Transactions containing both Bread and Milk ($$\text{Bread} \cup \text{Milk}$$): $$T_1, T_3, T_5$$ (count = 3)

The support metrics are:

$$
\text{Support}(\text{Bread}) = \frac{4}{5} = 0.800
$$

$$
\text{Support}(\text{Milk}) = \frac{4}{5} = 0.800
$$

$$
\text{Support}(\text{Bread} \cup \text{Milk}) = \frac{3}{5} = 0.600
$$

We calculate confidence using the conditional probability formula:

$$
\text{Confidence}(\text{Bread} \implies \text{Milk}) = \frac{\text{Support}(\text{Bread} \cup \text{Milk})}{\text{Support}(\text{Bread})} = \frac{0.600}{0.800} = 0.750
$$

### Step 5: Compute Association Rule Lift
We calculate the final lift coefficient to evaluate the strength of the co-occurrence over independent chance:

$$
\text{Lift}(\text{Bread} \implies \text{Milk}) = \frac{\text{Confidence}(\text{Bread} \implies \text{Milk})}{\text{Support}(\text{Milk})} = \frac{0.750}{0.800} = 0.9385
$$

The final updated centroids are:

$$
\mathbf{\mu_1^* = (1.5, 1.0)}
$$

$$
\mathbf{\mu_2^* = (4.0, 3.0)}
$$

For the transactional rule, the final metrics are:

$$
\mathbf{\text{Confidence} = 0.750}
$$

$$
\mathbf{\text{Lift} = 0.938}
$$

A lift of **0.938** indicates that Bread and Milk are slightly negatively correlated in our transactional database. Despite a high confidence of **0.750**, customers who purchase Bread are slightly less likely to purchase Milk than what we would expect by random chance.

With these mathematical calculations verified, we can implement an end-to-end Python pipeline to solve both clustering and association tasks programmatically.

## 1.3.7. Python Implementation: End-to-End Unsupervised Pipeline

The following Python script simulates a customer database, groups profiles using the K-Means algorithm, and extracts purchase rules using transaction lists.

```python
import numpy as np
import pandas as pd
from sklearn.cluster import KMeans

# -------------------------------------------------------------------------
# DESCRIPTIVE METHOD 1: Customer Segmentation via Geometric Clustering
# -------------------------------------------------------------------------
# Generate 100 customer profiles (attributes: annual spend and visit frequency)
np.random.seed(42)
customer_spend = np.concatenate([
    np.random.normal(loc=20.0, scale=5.0, size=50),
    np.random.normal(loc=80.0, scale=10.0, size=50)
])
customer_visits = np.concatenate([
    np.random.normal(loc=2.0, scale=0.5, size=50),
    np.random.normal(loc=12.0, scale=2.0, size=50)
])

profiles = pd.DataFrame({
    'annual_spend': customer_spend,
    'visit_frequency': customer_visits
})

# Initialize and fit the KMeans algorithm using 'k-means++' smart initialization
kmeans = KMeans(n_clusters=2, init='k-means++', random_state=42, n_init=10)
profiles['cluster_label'] = kmeans.fit_predict(profiles)

print("K-Means Clustering Completed.")
print(f"Computed Centroid 1: {kmeans.cluster_centers_[0]}")
print(f"Computed Centroid 2: {kmeans.cluster_centers_[1]}")
print("\n" + "="*60 + "\n")

# -------------------------------------------------------------------------
# DESCRIPTIVE METHOD 2: Market Basket Association Rule Mining
# -------------------------------------------------------------------------
# We implement a pure Python transactional rule calculator
transactions = [
    ['Bread', 'Milk'],
    ['Bread'],
    ['Bread', 'Milk', 'Butter'],
    ['Milk', 'Butter'],
    ['Bread', 'Milk']
]

n_transactions = len(transactions)

def calculate_support(itemset):
    match_count = sum(1 for t in transactions if all(item in t for item in itemset))
    return match_count / n_transactions

# Evaluate the transaction rules
support_bread = calculate_support(['Bread'])
support_milk = calculate_support(['Milk'])
support_joint = calculate_support(['Bread', 'Milk'])

confidence_rule = support_joint / support_bread if support_bread > 0 else 0
lift_rule = confidence_rule / support_milk if support_milk > 0 else 0

print("Association Rule Mining Completed:")
print(f"Evaluated Rule: Bread => Milk")
print(f"Support(Bread): {support_bread * 100:.2f}%")
print(f"Support(Milk): {support_milk * 100:.2f}%")
print(f"Rule Joint Support: {support_joint * 100:.2f}%")
print(f"Rule Confidence: {confidence_rule * 100:.2f}%")
print(f"Rule Lift Coefficient: {lift_rule:.3f}")
```

Now that we have demonstrated these algorithms programmatically, we can explore the advanced engineering challenges and complexity issues that occur in production systems.

## 1.3.8. Advanced Engineering Notes

Deploying descriptive algorithms in production requires managing several key operational trade-offs:

### Centroid Initialization using K-Means++
Standard K-Means is highly sensitive to the initial random placement of centroids, which can cause the model to get stuck in local minima. To address this, the `k-means++` algorithm initializes centroids by choosing the first center at random, and then selecting subsequent centers from the remaining data points with a probability proportional to their squared distance to the nearest existing center. This approach ensures a wider, more representative spread of initial centroids, accelerating convergence and improving cluster stability.

### Computational Complexity Scaling
The computational complexity of the standard K-Means algorithm scales as:

$$
O(N \cdot k \cdot I \cdot d)
$$

where:
- $$N$$ = total number of observations
- $$k$$ = total number of clusters
- $$I$$ = total number of optimization iterations until convergence
- $$d$$ = total number of feature dimensions (variables)

As dimensionality ($$d$$) grows, distance calculations become increasingly expensive, which can degrade clustering performance.

Similarly, association rule mining algorithms like Apriori scale exponentially with the number of unique items, making filtering techniques based on minimum support thresholds essential.

While these algorithms scale efficiently with proper optimization, they are highly sensitive to preprocessing configurations.

## 1.3.9. Common Preprocessing Failure Modes and Pitfalls

When implementing unsupervised pipelines, several common mistakes can compromise model performance.

### 9.1 Naive K-Means Clustering on Unscaled Continuous Features

>[!Warning]
> **Omitting the Range Normalization Step Before Distance Calculations**
> Because K-Means relies directly on Euclidean distance to assign points to clusters, features with naturally larger scales (such as annual income in the thousands) will completely dominate the Within-Cluster Sum of Squares (WCSS) calculation:
> $$
> WCSS = \sum_{i=1}^{k} \sum_{x \in C_i} ||x - \mu_i||^2
> $$
> This effectively renders smaller-scale features (such as visit frequency ranging from 1 to 10) invisible, resulting in clusters that are only grouped along a single dimension.

### 9.2 Relying on High-Lift Rules of Sparse, Low-Support Itemsets

>[!Warning]
> **Extracting Unvalidated Rules from Rare Event Classes**
> Association rules with extremely high lift values can easily occur due to random chance if the items involved have very low support. For example, if a rare specialty item is purchased only twice, and in one of those transactions a customer also buys bread, the calculated lift for the rule:
> $$
> \text{Specialty Item} \implies \text{Bread}
> $$
> will be extremely high. However, relying on this rule for business decisions is risky, as it lacks statistical significance and does not generalize to the broader customer population.

### 9.3 Overlooking Null Transactions in Market Basket Layouts

>[!Warning]
> **Including Missing or Non-informative Baskets in Support Calculations**
> Failing to filter out empty transactions, administrative entries, or corrupted zero-item records before calculating support values artificially inflates the denominator ($$N$$). This systematically dilutes the calculated support of all valid itemsets, causing highly useful association rules to be incorrectly filtered out by minimum support thresholds.

To summarize these core unsupervised methodologies, we can evaluate their structures side-by-side.

## 1.3.10. Conclusions and Descriptive Modeling Summary Matrix

Descriptive methods provide a powerful framework for discovering natural groupings and logical relationships in unlabeled datasets.

Let us explicitly restate the key K-Means objective function (WCSS) that we seek to minimize:

$$
WCSS = \sum_{i=1}^{k} \sum_{x \in C_i} ||x - \mu_i||^2
$$

The following table summarizes the key computational properties of partition-based clustering and association rule mining.

| Descriptive Framework | Primary Target | Fundamental Metric | Primary Mathematical Assumption |
| :---: | :---: | :---: | :---: |
| Partition-based Clustering (K-Means) | Spatial groupings of vectors | Within-Cluster Sum of Squares (WCSS) | Features are continuous and scaled spherically |
| Association Rule Mining (Apriori) | Co-occurring item itemsets | Support, Confidence, and Lift | Transaction boundaries are clearly defined |

By carefully aligning the descriptive metric (whether geometric distance or transactional co-occurrence) with the structure of your data, unsupervised models can uncover deep, actionable structures that might otherwise remain hidden in noisy, unlabelled databases.
