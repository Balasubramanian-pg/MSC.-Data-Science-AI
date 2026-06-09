---
title: W03 - General Feature Engineering Techniques
module: Statistical Modelling And Inferencing
week: W03 - General Feature Engineering Techniques
---

### Wrapper Methods: Sequential Feature Selection (SFS/SBS)

#### [1. Clear Overview](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W01 - Overview of Feature Engineering/3.%20Working%20With%20Sample%20Dataset%20-%20I.md#1-clear-overview)

Wrapper methods perform feature selection by treating the machine learning model as a "black box" and evaluating different feature subsets based on their predictive performance. 
Unlike filter methods, which rely on independent statistical scores, wrapper methods incorporate the model’s actual performance into the selection process, making them highly effective but computationally demanding.

#### [2. Sequential Forward Selection](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W03 - General Feature Engineering Techniques/Readme.md#2-sequential-forward-selection) (SFS)

SFS is a **bottom-up** approach that builds the feature set from scratch.

- **Logic:**
    
    1. Start with zero features.
        
    2. Iteratively add the single feature that provides the greatest boost to the model’s performance (e.g., cross-validated accuracy).
        
    3. Repeat until the target number of features is reached or no further performance improvement occurs.
        
- **Intuition:** It greedily builds the "best" subset by selecting the strongest contributor at each individual step.
    

#### [3. Sequential Backward Selection](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W03 - General Feature Engineering Techniques/Readme.md#3-sequential-backward-selection) (SBS)

SBS is a **top-down** approach that prunes features from the full [dataset](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W03 - General Feature Engineering Techniques/Experiential%20Learning%20Activity.md#dataset).

- **Logic:**
    
    1. Start with all available features.
        
    2. Iteratively remove the feature whose removal causes the least harm to model performance.
        
    3. Repeat until the desired feature count is reached.
        
- **Intuition:** It identifies and discards "dead weight" (redundant or irrelevant features) that does not contribute meaningfully to the model's predictive power.
    

#### 4. Technical Comparison

|**Metric**|**Sequential Forward Selection (SFS)**|**Sequential Backward Selection (SBS)**|
|---|---|---|
|**Strategy**|Greedy "Building up"|Greedy "Pruning down"|
|**Starts With**|No features|All features|
|**Best Used When**|You want a small, highly predictive subset.|Most features are likely useful, but you need to slim down.|
|**Interaction Handling**|Can miss complex, multi-feature interactions.|Better at handling interactions since it starts with the full feature set.|

#### 5. Implementation in Python

Using `sklearn.feature_selection.SequentialFeatureSelector`, you can specify the `direction` parameter to toggle between forward and backward selection.

Python

```
from sklearn.feature_selection import SequentialFeatureSelector
from sklearn.linear_model import LogisticRegression

## Define the base model
model = LogisticRegression()

## Sequential Forward Selection (SFS)
sfs = SequentialFeatureSelector(model, n_features_to_select=5, direction='forward')
sfs.fit(X, y)
sfs_features = X.columns[sfs.get_support()]

## Sequential Backward Selection (SBS)
sbs = SequentialFeatureSelector(model, n_features_to_select=5, direction='backward')
sbs.fit(X, y)
sbs_features = X.columns[sbs.get_support()]
```

#### 6. Trade-offs and Best Practices

- **Computational Cost:** Both methods are computationally expensive because they require [training the model](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W03 - General Feature Engineering Techniques/L2/Embedded%20Methods.md#training-the-model) repeatedly for every candidate feature at every step.
    
- **Greedy Strategy:** These methods do not guarantee the **globally optimal** subset. Because they make the "locally best" choice at each step, they might overlook a combination of features that perform better together but are individually weak.
    
- **Interpretation:** The resulting subsets often differ significantly between SFS and SBS due to the different starting points. This highlights that "the best feature set" is partially dependent on the methodology used to find it.
    

**[Application Summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W02 - Handling Numeric Data/2.%20Discretization.md#application-[summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W07 - Feature Engineering Techniques for Time-Series Data/Module%20Summary.md#[summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W07 - Feature Engineering Techniques for Time-Series Data/Overview.md#summary))):** Use wrapper methods when accuracy is paramount and you have the computational resources to support multiple training iterations. If computational time is a major constraint, consider embedded methods (like Lasso or Random Forest feature importance) as a faster, model-aware alternative.

Would you like to move on to the final [summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W07 - Feature Engineering Techniques for Time-Series Data/Module%20Summary.md#[summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W07 - Feature Engineering Techniques for Time-Series Data/Overview.md#summary)) of feature selection methods or perhaps perform a Python exercise on these concepts?

Tags: #statistics #machine-learning #data-science #statistical-modelling