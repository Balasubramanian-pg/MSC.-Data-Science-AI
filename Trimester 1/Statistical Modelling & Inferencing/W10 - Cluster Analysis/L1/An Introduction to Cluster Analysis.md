---
title: W10 - Cluster Analysis
module: Statistical Modelling And Inferencing
week: W10 - Cluster Analysis
---

**Contents**  
I Foundations of Cluster Analysis  
1 What is Cluster Analysis?   
1.1 Unsupervised vs. Supervised Learning  
1.2 Measuring Similarity: The Role of Distance  
II Clustering Algorithms   
2 Hierarchical Clustering   
2.1 The Agglomerative Method  
2.2 Linkage Criteria   
3 K-Means Clustering   
3.1 The K-Means Algorithm   
3.2 Strengths and Weaknesses  
4 Choosing the Number of Clusters (K)   
4.1 The Elbow Method  
4.2 The Silhouette Method

**Part I  
Foundations of Cluster Analysis**

**1 What is Cluster Analysis?**

### 1.1 Unsupervised vs. Supervised Learning: The Difference in "Guiding"

The distinction between supervised and unsupervised learning is defined by the **presence of a teacher**—a target variable ($Y$) that tells the algorithm whether it got the [answer](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[answer](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[answer](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#answer))) right or wrong.

#### Supervised Learning: Learning with a Map

Think of supervised learning as a classroom where the teacher provides the questions _and_ the [answer](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[answer](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[answer](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#answer))) key.

- **Mechanism:** The algorithm maps inputs ($X$) to known outputs ($Y$). It calculates the "loss" (how far its prediction was from the truth) and iteratively adjusts its internal parameters to minimize that error.
    
- **Objective:** Prediction. You want the model to generalize so that when it sees new data, it can guess the correct label or value.
    
- **[Examples](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W08 - Forecasting & Time Series Analysis/L0/Time%20Series%20Analysis.md#examples):** Linear regression to forecast sales; Logistic regression to predict customer churn.
    

#### Unsupervised Learning: Exploration in the Unknown

Unsupervised learning is like being dropped into a foreign country with no map and no dictionary. There is no "[answer](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[answer](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[answer](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#answer))) key." You are forced to look for patterns, structure, and similarities on your own.

- **Mechanism:** The algorithm analyzes the intrinsic geometry of the data. It looks for points that are "close" to each other based on mathematical distance, or density regions where data is concentrated.
    
- **Objective:** Discovery. You want to understand the "topology" of your data to uncover hidden segments, archetypes, or anomalies.
    
- **[Examples](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W08 - Forecasting & Time Series Analysis/L0/Time%20Series%20Analysis.md#examples):** Market segmentation, anomaly detection (identifying fraud), and data compression (Factor Analysis).
    

#### The Core Logic of Clustering

Clustering is the quintessential unsupervised task. It relies on the principle of **Cohesion and Separation**:

1. **Intra-cluster Cohesion:** Objects within the same group must share a high degree of similarity (e.g., all physicians in a "High-Volume Prescriber" cluster share similar prescription behaviors).
    
2. **Inter-cluster Separation:** Objects in different groups must be distinctly different (e.g., "High-Volume Prescribers" should be mathematically distant from "Low-Volume, Occasional Prescribers").
    

### Comparison: Defining the Analytical Strategy

|**Feature**|**Supervised Learning**|**Unsupervised Learning**|
|---|---|---|
|**Labels ($Y$)**|Required|Absent|
|**Primary Goal**|Prediction (Forecast)|Exploration (Structure/Grouping)|
|**Algorithm's "Task"**|Error Minimization|Pattern Discovery|
|**Typical Output**|Values/Categories|Segments/Buckets|

### [Why this matters for your work](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W13 - Introduction To Bayesian Inference/L1/An%20Introduction%20to%20Bayesian%20Inference.md#why-this-matters-for-your-work)

In your role as a Business Analyst, you will frequently shift between these two modes:

- When you have a **fixed historical dataset** for a mature product (e.g., last 3 years of monthly revenue), you use **Supervised Learning** to forecast next month's volume.
    
- When you are tasked with **"finding new market opportunities"** or "profiling your physician base," you use **Unsupervised Clustering** because you don't know _a priori_ what those segments look like—you need the data to reveal them to you.
    

**To get deeper into the mechanics of how we "group" these items, would you like to explore the concept of "Distance Metrics" (how the algorithm mathematically measures similarity), or shall we dive into the most famous partitioning algorithm: K-Means?**


### 1.2 Measuring Similarity: The Geometry of Clustering

In cluster analysis, the computer does not "understand" similarity in the human sense; it understands it as **spatial proximity**. To group objects, we represent them as coordinates in an $m$-dimensional space, where $m$ is the number of features (e.g., age, income, prescription volume). The core task is to calculate the "gap" between them.

#### The Euclidean Distance: Measuring the "Straight-Line" Path

The [formula](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#formula) you cited, $d(p, q) = \sqrt{\sum_{i=1}^{m} (p_i - q_i)^2}$, is the classic "as-the-crow-flies" distance. It calculates the length of the line segment connecting two points in multidimensional space.

- **High Distance = Low Similarity:** Points far apart are distinct; they belong in different clusters.
    
- **Low Distance = High Similarity:** Points close together share similar profiles; they belong in the same cluster.
    

#### The "Scale Trap": Why Standardization is Non-Negotiable

Distance metrics are **inherently biased toward variables with larger ranges**.

Consider a physician dataset:

- **Variable A (Prescription Volume):** Range 0 to 10,000.
    
- **Variable B (Years of Practice):** Range 0 to 40.
    

If you calculate Euclidean distance without scaling, Variable A will dominate the result. The algorithm will effectively ignore "Years of Practice" because its values are tiny compared to the massive swings in "Prescription Volume." To ensure all features have an **equal voice** in determining similarity, we must standardize them.

**The Standardization Protocol:**

Transform each variable $X$ into a Z-score:

$$Z = \frac{x - \mu}{\sigma}$$

- This gives every variable a [mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#mean) of 0 and a standard deviation of 1. Now, a "1-unit difference" in _Prescription Volume_ is mathematically equivalent to a "1-unit difference" in _Years of Practice_.
    

#### Beyond Euclidean: Alternative Distance Metrics

While Euclidean is the standard, it is not the only tool in the box:

- **Manhattan Distance (L1 Norm):** Calculates the distance as the sum of absolute differences. Think of this as navigating a city grid where you can only move along the [axes](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#axes), not diagonally. It is often more robust if your data has outliers.
    
- **Cosine Similarity:** Measures the _angle_ between two vectors rather than the distance between points. It is excellent when the _magnitude_ of the features doesn't matter, but the _relative proportions_ do (e.g., comparing the content profile of two different patient medical records).
    

### Strategy [Summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W01 - Basic Probability & Statistics/L2/Reading%202%20Parametric%20vs.%20Non-Parametric%20Methods.md#[summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#[summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L1/The%20Multiple%20Regression%20Model.md#summary))) for Similarity Measurement

|**Step**|**Technique**|**Purpose**|
|---|---|---|
|**Preprocessing**|Z-score Standardization|Prevents large-scale variables from dominating.|
|**Metric Selection**|Euclidean Distance|Standard choice for continuous, dense data.|
|**Alternative**|Manhattan / Cosine|Use for outlier-heavy or high-dimensional sparse data.|

**Strategic Note:** In your work with IQVIA or clinical datasets, remember that **outliers** (e.g., one massive hospital system among thousands of small clinics) can heavily distort Euclidean distances. Always check your distribution for extreme values before deciding on your distance metric.

**Shall we proceed to the actual partitioning process with the K-Means algorithm, or would you like to discuss how to handle categorical data (which doesn't fit into the "Euclidean distance" framework) when performing clustering?**

![[Pasted image 20260525125547.png]]

**[Part II](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W13 - Introduction To Bayesian Inference/L1/An%20Introduction%20to%20Bayesian%20Inference.md#part-ii)  
Clustering Algorithms**

**2 Hierarchical Clustering**  
Hierarchical clustering does not produce a single partition of the data, but rather a full hierarchy of clusters. The main output is a tree-like structure called a dendrogram, which shows how clusters are merged (or split) at different levels of similarity.

**2.1 The Agglomerative Method**  
The most common approach is agglomerative (bottom-up) clustering. The algorithm is as follows:

1. Start by treating each of the n data points as an individual cluster.
2. Find the two closest (most similar) clusters and merge them. We now have n − 1 clusters.
3. Recompute the distances between the new cluster and all other clusters.
4. Repeat steps 2 and 3 until only one cluster, containing all data points, remains.

**2.2 Linkage Criteria**  
Step 3 requires a method for defining the distance between two clusters. This is known as the linkage criterion.

- **Single Linkage (Nearest Neighbor):** The distance between two clusters is the distance between the two closest points in those clusters. This method can result in long, ”snaky” clusters.
- **Complete Linkage (Farthest Neighbor):** The distance between two clusters is the distance between the two most distant points. This method tends to produce more compact, spherical clusters.
- **Average Linkage:** The distance is the average of all pairwise distances between the points in one cluster and the points in the other. This is often a good compromise between single and complete linkage.
- **Ward’s Method:** This method merges the two clusters that lead to the minimum increase in the total within-cluster sum of squares (WCSS). It is a very popular method that tends to create compact, equally-sized clusters.

![](https://lumen.bitspilani-digital.edu.in/content/enforced/7089-T3-25_MDSDF401/161.png?ou=7089)  
_Figure 2:_ Illustration of single linkage (distance between the two nearest points) and complete linkage (distance between the two farthest points).  
The resulting dendrogram allows the user to visualize the entire hierarchy and choose a number of clusters by ”cutting” the tree at a desired level of dissimilarity.  
Complete

**3 K-Means Clustering**  
K-Means is the most popular partitional clustering algorithm. Unlike hierarchical clustering, it does not create a hierarchy; instead, it partitions the data into a pre-specified number of clusters, K.

**3.1 The K-Means Algorithm**  
The objective of K-Means is to find cluster assignments that minimize the Within Cluster Sum of Squares (WCSS), which is the sum of the squared Euclidean distances of each point to the center ([mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#mean)) of its assigned cluster.  
The algorithm proceeds as follows:

1. Initialization: Randomly select K data points from the dataset to serve as the initial cluster centers, or centroids.
2. Assignment Step: For each data point, calculate its distance to every centroid. Assign the data point to the cluster of the closest centroid.
3. Update Step: After all points have been assigned, recalculate the position of each centroid by taking the [mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#mean) of all data points assigned to its cluster.
4. Iteration: Repeat the Assignment and Update steps until the cluster assignments no longer change (the algorithm has converged).

**3.2 Strengths and Weaknesses**

- **Strengths:** K-Means is computationally very fast and scales well to large datasets, making it a popular choice in big data applications.
- **Weaknesses:** – The user must specify the number of clusters, K, in advance. – The algorithm is sensitive to the initial random placement of centroids and can converge to a poor local optimum. Running the algorithm multiple times with different random starts is a common solution. – It implicitly assumes that clusters are spherical, have similar sizes, and similar densities. It performs poorly on data with non-convex (e.g., crescent-shaped) clusters.

**4 Choosing the Number of Clusters (K)**  
For partitional algorithms like K-Means, choosing the optimal number of clusters is a critical and often subjective task. Several methods can guide this decision, but they should be used as aids, not absolute rules.

**4.1 The Elbow Method**  
This is the most common heuristic. It involves running the K-Means algorithm for a range of K values (e.g., from 2 to 10) and, for each run, calculating the WCSS.

- A plot is made with K on the x-axis and WCSS on the y-axis.
- The WCSS will always decrease as K increases. However, the plot will often show a distinct “elbow” point, after which the rate of decrease slows down substantially.
- This elbow point represents the point of diminishing returns, where adding another cluster does not explain much more of the variance. It is often chosen as the optimal K.

![](https://lumen.bitspilani-digital.edu.in/content/enforced/7089-T3-25_MDSDF401/171.png?ou=7089)  
_Figure 3:_ An elbow plot showing that the benefit of adding more clusters decreases significantly after K=3.

**4.2 The Silhouette Method**  
This method provides a more sophisticated measure of cluster quality. For each data point, a silhouette score is calculated, which measures how similar that point is to its own cluster compared to other, neighboring clusters. The score ranges from -1 to 1, where a high value indicates that the object is well-matched to its own cluster and poorly matched to neighboring clusters.  
To choose K, one computes the average silhouette score for all data points for a range of K values. The value of K that maximizes the average silhouette score is chosen as the optimal number of clusters.  
Ultimately, these quantitative methods should be combined with domain knowledge. The best number of clusters is the one that produces the most stable, interpretable, and actionable groupings for your specific application.

Tags: #statistics #machine-learning #data-science #statistical-modelling