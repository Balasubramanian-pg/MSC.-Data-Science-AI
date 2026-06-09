---
title: W03 - General Feature Engineering Techniques
module: Statistical Modelling And Inferencing
week: W03 - General Feature Engineering Techniques
---

### Information Theoretic Measures: Mutual Information (MI)

#### [1. Clear Overview](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W01 - Overview of Feature Engineering/3.%20Working%20With%20Sample%20Dataset%20-%20I.md#1-clear-overview)

Information theoretic measures provide a robust framework for quantifying the dependency between variables by measuring the amount of information shared between them. The core metric, **Mutual Information (MI)**, quantifies the reduction in uncertainty about a target variable $Y$ given knowledge of a feature $X$. Unlike Pearson’s or Spearman’s correlation, which are restricted to linear or monotonic relationships, MI is capable of capturing any arbitrary dependency, making it an essential filter method for feature selection in complex, real-world datasets.

#### 2. Theoretical Foundations

**Entropy ($H$):**

Entropy is a measure of randomness or uncertainty in a random variable.

- High Entropy ($H(Y)$): The target variable $Y$ is highly unpredictable (high randomness).
    
- Low Entropy: The target variable $Y$ is predictable or has little variation.
    

**Mutual Information ($I(X; Y)$):**

Mutual information measures how much the uncertainty of $Y$ is reduced by knowing $X$. It is defined as:

$$I(X; Y) = H(Y) - H(Y|X)$$

- $H(Y)$: Entropy of the target.
    
- $H(Y|X)$: Conditional entropy of the target given the feature (remaining uncertainty).
    
- Interpretation: If $I(X; Y)$ is large, knowing $X$ significantly reduces our uncertainty about $Y$, indicating $X$ is a highly informative feature. If $I(X; Y) = 0$, $X$ and $Y$ are independent.
    

#### [3. Strategic Usage in Feature Selection](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W03 - General Feature Engineering Techniques/L2/Feature%20Demonstration%20Filter%202.md#3-strategic-usage-in-feature-selection)

- **Filter Mechanism:** Like other filter methods, it ranks features before training. It is particularly effective for high-dimensional datasets where you need to quickly identify which features offer the most "informational gain."
    
- **Selection Process:**
    
    1. Compute the MI score for every feature with the target.
        
    2. Rank features in descending order of MI.
        
    3. Select the top $k$ features that yield the highest information gain.
        

#### [4. Python Implementation](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W03 - General Feature Engineering Techniques/L2/Feature%20Demonstration%20Filter%203.md#4-python-implementation)

Using scikit-learn, `mutual_info_classif` (for classification) or `mutual_info_regression` (for regression) are the standard tools.

Python

```
from sklearn.feature_selection import mutual_info_classif

## Compute Mutual Information scores for categorical features
mi_scores = mutual_info_classif(X_encoded, y, discrete_features=True)

## Map to a DataFrame for readability
mi_df = pd.DataFrame({'Feature': X_encoded.columns, 'MI_Score': mi_scores})
mi_df = mi_df.sort_values(by='MI_Score', ascending=False)
```

#### [5. Application Summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W03 - General Feature Engineering Techniques/L2/Embedded%20Methods.md#5-application-[summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W07 - Feature Engineering Techniques for Time-Series Data/Module%20Summary.md#[summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W07 - Feature Engineering Techniques for Time-Series Data/Overview.md#summary)))

- **When to use:** Use Mutual Information when you suspect non-linear relationships or complex dependencies between your features and the target that correlation-based filters would miss.
    
- **Interpretability:** While highly effective, MI scores are purely informational and do not indicate the direction of the relationship (e.g., they won't tell you if a feature increases or decreases the target).
    
- **Workflow Best Practice:** Pair Mutual Information with Pearson or Spearman correlation to get a comprehensive view—use correlation for quick linear/monotonic diagnostics and Mutual Information for capturing nuanced, non-linear predictive signals.
    

Would you like to move on to the next filter method, Fisher Score, or are there specific questions regarding how Mutual Information handles non-linear data?

Tags: #statistics #machine-learning #data-science #statistical-modelling