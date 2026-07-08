# Question 43

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
