---
title: W03 - General Feature Engineering Techniques
module: Statistical Modelling And Inferencing
week: W03 - General Feature Engineering Techniques
---

### Dataset

Students will work on the **Bank Marketing Dataset ([bank_dataset.csv](https://lumen.bitspilani-digital.edu.in/content/enforced/7097-T3-25_MDSDF403/bank_dataset.csv?isCourseFile=true&ou=7097))**.

This experiential learning exercise is a comprehensive end-to-end pipeline. To succeed, you should treat feature engineering not as a series of isolated steps, but as a cohesive transformation process.

Below is a structured approach to each of your tasks, with technical guidance and implementation strategies.

### 1. Feature Understanding & Data Exploration

- **Business Context:** You are dealing with time-sensitive telemarketing data.
    
    - _Example:_ `duration` (the last contact length) is highly predictive but often unavailable _before_ the call. Consider the "Data Leakage" risk here—if you include it in a model meant to predict subscription _before_ the call happens, the model will be unrealistically accurate.
        
- **Exploration:**
    
    - Use `df.isnull().sum()` to quantify missing data.
        
    - Use `df.hist()` for numeric variables (`age`, `balance`, `duration`) to check for skewness.
        

### [2. Feature Construction](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W03 - General Feature Engineering Techniques/L1/Demonstration.md#2-feature-construction) & Transformation

- **Construction:**
    
    - **Ratio:** `Balance_per_campaign` = `balance` / `campaign`. This might indicate how "expensive" a customer is to acquire relative to their account health.
        
    - **Interaction:** `Contact_Frequency` (is the customer being over-contacted?).
        
- **Transformation:**
    
    - **Binning:** Use `pd.cut` to convert `age` into segments (e.g., "Young," "Middle-aged," "Retired"). Often, retired individuals show different subscription behaviors than working-age adults.
        
    - **Encoding:** Use `OneHotEncoder` for `job` and `marital` status. Be cautious: if `job` has too many categories, consider grouping rare categories into an "Other" category to reduce dimensionality.
        

### 3. Multicollinearity & Redundancy

- **Technique:** Compute the correlation matrix using Pearson or Spearman.
    
- **Action:** If `balance` and another financial feature have a correlation $> 0.85$, drop one. Multicollinearity can cause coefficient instability in models like Logistic Regression.
    

### 4. Filter Feature Selection

Rank your features to understand which signals are "loudest."

- **Numeric (Pearson/Spearman):** Use these to rank `age`, `balance`, `duration`, `campaign`, and `pdays` against the target `y`.
    
- **Categorical (Chi-Square):** Use this for `job`, `marital`, `education`, `housing`, and `loan`.
    
- **Non-linear (Mutual Information):** Use `mutual_info_classif` as a catch-all to detect dependencies that the linear tests miss.
    

### 5. Wrapper & Embedded Methods

Wrapper methods will use your model (e.g., Logistic Regression or SVM) to find the "best" subset.

- **SFS/SBS:** Use `SequentialFeatureSelector` from `sklearn`.
    
    - _Trade-off:_ Remember, SFS starts from 0 and adds; SBS starts from all and prunes. SFS is often faster if you expect only a few features to be important.
        
- **Embedded:** Use a `RandomForestClassifier` and call `feature_importances_`.
    
    - _Why?_ Trees naturally handle non-linear relationships and are generally more robust to unscaled data than Logistic Regression.
        

### 6. Pipeline Strategy & Evaluation

To prevent data leakage, wrap your processing in a `Pipeline`:

Python

```
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer

## 1. Preprocessing: Impute + Scale + Encode
preprocessor = ColumnTransformer(transformers=[
    ('num', StandardScaler(), numeric_cols),
    ('cat', OneHotEncoder(), categorical_cols)
])

## 2. Pipeline: Preprocess -> Selection -> Model
model_pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('selector', SelectKBest(score_func=chi2, k=5)), # Filter selection
    ('classifier', LogisticRegression())
])
```

### Tips for Success

1. **Iterate:** Feature engineering is rarely a "one-shot" task. If your cross-validation score is low, go back to step 3 (Construction). Perhaps a new interaction term is needed.
    
2. **Validate:** The "Stretch Goal" is the most important part. Compare the performance of the model using **(a) raw data** (no engineering), **(b) manually constructed features only**, and **(c) features selected by SFS/SBS**.
    
3. **[Visualization](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W04 - Dimensionality Reduction Techniques/Readme.md#visualization):** Use `matplotlib` to plot the "Top 10 Important Features" from your Random Forest embedded method. This is usually the most compelling way to present your work to stakeholders.
    

**Which of these tasks would you like to start with? I can help you draft the code for the correlation ranking or the wrapper selection method if you provide the column list.**

Tags: #statistics #machine-learning #data-science #statistical-modelling