# Choosing the Optimal Number of Clusters (K) in K-Means

Before we dive into the math and code, we need to clear up a massive terminology gap in your transcript. The transcript refers to the "ELBO curve." That is incorrect in this context. ELBO stands for Evidence Lower Bound, which is used in Variational Inference and VAEs. What the transcript is actually describing is the **Elbow Method**, which plots the Within-Cluster Sum of Squares (WCSS). 

If you use "ELBO" in a machine learning interview when talking about K-Means, you will fail that question. We are talking about the Elbow Method and the Silhouette Score. Let's fix that mental model right now and get into the actual engineering.

> [!IMPORTANT]
> K is a hyperparameter in K-Means. The algorithm does not learn K; you must define it. Choosing K is an optimization problem balancing model complexity (number of clusters) against error (variance within clusters).

## [1. Concept Introduction](./1.%20Concept%20Introduction.md)
