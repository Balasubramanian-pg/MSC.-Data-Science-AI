## Question 4.2 [5 Marks]

This question is about **reducing the computational burden of a very large dataset without unnecessarily sacrificing predictive performance**.

The key distinction is:

* **Sampling** reduces the **number of records**
* **Feature selection** reduces the **number of attributes**
* **Feature extraction** creates a smaller set of **new dimensions**
* **Feature creation** creates **more informative features** from existing data

### Recommended Answer Structure

| Technique              | Role                                                     | Social Media Example                                                                         | Contribution                                                                          |
| ---------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **Sampling**           | Select a representative subset of users                  | Randomly select 1 million users from 8 million                                               | Reduces training time and memory requirements while retaining representative patterns |
| **Feature Selection**  | Remove irrelevant or redundant attributes                | Remove attributes such as internal IDs or highly redundant activity metrics                  | Reduces dimensionality, noise, and model complexity                                   |
| **Feature Extraction** | Transform many original features into fewer new features | Apply PCA to convert 500 correlated attributes into a smaller number of principal components | Reduces dimensionality while retaining most of the information                        |
| **Feature Creation**   | Derive meaningful features from existing attributes      | Create engagement rate, average daily activity, or posts-per-session                         | Improves the information available to the model and can improve prediction accuracy   |

### 1. Sampling

**Purpose:** Reduce the number of observations used for model development.

With **8 million users**, training on the entire dataset may require substantial computation and memory.

A representative sample, for example **1 million users**, could be selected using random or stratified sampling.

**Why it helps:**

* Reduces training time
* Reduces memory requirements
* Allows faster experimentation
* Can preserve important population characteristics when sampling is representative

For classification problems, **stratified sampling** may be preferable if the target classes are imbalanced.

### 2. Feature Selection

**Purpose:** Select only the most relevant attributes from the 500+ available attributes.

For example, if predicting whether a user will become inactive, useful features might include:

* Login frequency
* Session duration
* Number of posts
* Interaction frequency

Irrelevant attributes such as internal identifiers should be removed.

**Why it helps:**

* Reduces computational complexity
* Removes irrelevant noise
* Can reduce overfitting
* Makes the model easier to interpret

### 3. Feature Extraction / Dimensionality Reduction

**Purpose:** Convert many original attributes into a smaller number of new features while retaining as much useful information as possible.

For example, **Principal Component Analysis (PCA)** could transform 500 correlated attributes into 50 principal components.

**Why it helps:**

* Dramatically reduces dimensionality
* Reduces computation
* Handles correlated variables
* Can improve model efficiency

The trade-off is that the resulting components may be **less interpretable** than the original attributes.

### 4. Feature Creation

**Purpose:** Create new, more meaningful variables from existing data.

For example:

`Total Likes ÷ Total Posts → Average Engagement per Post`

Other examples:

* Sessions per week
* Average session duration
* Engagement rate
* Followers-to-following ratio
* Weekly activity trend

**Why it helps:**

Raw attributes do not always capture the underlying business behaviour. Well-designed derived features can provide stronger signals to the model and potentially **improve prediction accuracy**.

However, feature creation should be controlled because creating hundreds of unnecessary features would increase dimensionality again.

### Recommended Overall Strategy

For **8 million users and 500+ attributes**, I would use a staged approach:

**8M Users × 500+ Features**

↓ **Sampling**

**Representative subset**

↓ **Feature Selection**

**Remove irrelevant/redundant features**

↓ **Feature Creation**

**Create high-value behavioural features**

↓ **Feature Extraction if necessary**

**Reduce remaining high-dimensional feature space**

↓

**Efficient ML Dataset**

### Exam-Friendly Conclusion

> Sampling reduces the **number of observations**, feature selection reduces the **number of original attributes**, feature extraction reduces dimensionality by creating a smaller representation of the data, and feature creation improves the dataset by generating more informative predictors. Used together, these techniques can reduce computation time, memory usage, noise, and model complexity while preserving or improving predictive performance.

