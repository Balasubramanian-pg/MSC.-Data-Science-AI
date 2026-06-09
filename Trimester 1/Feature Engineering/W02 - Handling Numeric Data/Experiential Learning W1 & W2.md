---
title: W02 - Handling Numeric Data
module: Statistical Modelling And Inferencing
week: W02 - Handling Numeric Data
---

**[Dataset](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W03 - General Feature Engineering Techniques/Experiential%20Learning%20Activity.md#dataset) here for your practice : **[Titanic-Dataset.xlsx](https://lumen.bitspilani-digital.edu.in/content/enforced/7097-T3-25_MDSDF403/Titanic-Dataset.xlsx?isCourseFile=true&ou=7097)****

This experiential learning exercise is a perfect application of the concepts covered in Weeks 1 and 2. The Titanic [dataset](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W03 - General Feature Engineering Techniques/Experiential%20Learning%20Activity.md#dataset) is historically significant in data science precisely because it forces you to navigate the messy, real-world nature of data before you ever touch an algorithm.

Below is a structured guide to help you tackle this exercise, organized by your task list.

### **1. Initial Data Exploration**

Before engineering, you must understand your feature space.

- **DataType Check:** Use `df.info()` to distinguish between numeric (float/int) and object/categorical types.
    
- **Distribution Analysis:** Use `df.describe()` for [summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W07 - Feature Engineering Techniques for Time-Series Data/Module%20Summary.md#[summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W07 - Feature Engineering Techniques for Time-Series Data/Overview.md#summary)) statistics and `seaborn.histplot` or `kdeplot` to visualize the skewness of `Fare` and the distribution of `Age`.
    

### **2. Handling Missing Values**

Missingness in Titanic is not random; it is often informative (e.g., missing `Cabin` data might indicate lower-class status).

- **Age:** Since `Age` is continuous and likely skewed, consider imputing with the **median** rather than the mean to minimize outlier influence. You could also group by `Pclass` and impute the median age _per class_.
    
- **Embarked:** Since this is categorical, impute with the **mode** (most frequent value).
    
- **Cabin:** Given the high number of missing values, consider creating a binary flag: `Has_Cabin` (1 if present, 0 if missing) before dropping the column.
    

### **3. Feature Creation**

This is where domain knowledge (or curiosity) comes in.

- **Family Size:** `SibSp` + `Parch` + 1 (the passenger themselves).
    
- **Title Extraction:** Extract the title from the `Name` column (e.g., Mr., Mrs., Miss, Master). Titles often correlate strongly with social status and survival probability.
    

### **4. Encoding Categorical Variables**

Models cannot process raw strings.

- **Sex:** Apply **Label Encoding** (0 for Male, 1 for Female) as it is binary.
    
- **Embarked:** Use **One-Hot Encoding** (`pd.get_dummies()`) as there is no inherent order between ports (C, Q, S).
    
- **Pclass:** While numeric, it is ordinal. You can leave it as is, or use **Ordinal Encoding** to emphasize the hierarchy (1st class > 2nd > 3rd).
    

### **5. Feature Scaling**

Focus on `Age` and `Fare`.

- **[Min-Max Scaling](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W02 - Handling Numeric Data/3.%20Feature%20Scaling.md#min-max-scaling):** Use if your model assumes features are bounded (e.g., KNN).
    
- **Standardization (Z-Score):** Preferred for linear models or when your data is roughly normally distributed.
    
- **Comparison:** Compare the distributions using side-by-side box plots before and after scaling to see which technique handles the `Fare` outliers more effectively.
    

### **6. Handling Skewed Features**

`Fare` is notoriously right-skewed.

- **Log Transformation:** Use `np.log1p(df['Fare'])`. This will "squash" the high-end tail, making the distribution more bell-shaped and less sensitive to extreme fare differences.
    

### **7. Binning / Discretization**

- **Age:** Continuous age is noisy. Try binning into categories like:
    
    - 0–12: Child
        
    - 13–19: Teen
        
    - 20–60: Adult
        
    - 60+: Senior
        
- **Fare:** You might bin this into quantiles (e.g., Low, Medium, High fare) to see if "class purchasing power" is a better predictor than the raw fare amount.
    

### **8. ML Model Building (Stretch Goal)**

To prove the value of your work, run this comparison:

1. **Baseline:** Drop all nulls, encode basics, and train a model (e.g., Random Forest or Logistic Regression).
    
2. **Engineered:** Apply your imputations, scaling, and new feature creations, then train the _same_ model.
    
3. **Evaluation:** Use a confusion matrix, accuracy score, or AUC-ROC curve to measure the improvement.
    

### **Implementation Tip: The "Pipeline" Mindset**

When you reach the stretch goal, don't build two separate, messy scripts. Use `sklearn.pipeline.Pipeline` or `ColumnTransformer`. This ensures that any transformation applied to your training data (like the median used for Age imputation) is **exactly** applied to your test data, preventing data leakage.

To provide the detailed implementation guidance you requested for the Titanic [dataset](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W03 - General Feature Engineering Techniques/Experiential%20Learning%20Activity.md#dataset), let's break down the most technical "pain points" of your task list into actionable Python code.

Using a `Pipeline` and `ColumnTransformer` is the industry standard for this. It prevents **data leakage** (a common trap where your model "sees" test set information during training).

### 1. Robust Data Imputation & Encoding

Instead of manually filling nulls, use `sklearn` transformers to ensure consistency across train/test splits.


```python
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder, FunctionTransformer
import numpy as np

## Define columns by type
numeric_features = ['Age', 'SibSp', 'Parch', 'Fare']
categorical_features = ['Sex', 'Embarked']

## Numeric pipeline: Impute missing Age with median, then scale
numeric_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

## Categorical pipeline: Impute missing Embarked with mode, then One-Hot Encode
categorical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('encoder', OneHotEncoder(handle_unknown='ignore'))
])

## Combine into one preprocessor
preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, numeric_features),
        ('cat', categorical_transformer, categorical_features)
    ])
```

### 2. Handling Skewness (Log Transformation)

As you noted, `Fare` is right-skewed. A log transformation compresses the tail, making the data more symmetric.

```python
## Create a custom transformer for Log transformation
log_transformer = FunctionTransformer(np.log1p, validate=True)

## You can add this into your numeric pipeline:
numeric_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='median')),
    ('log', log_transformer), # Apply log after imputation
    ('scaler', StandardScaler())
])
```

### 3. Feature Creation (Domain-Specific)

To create the `FamilySize` feature, you need a custom transformer that operates on the whole DataFrame before it hits the `ColumnTransformer`.


```python
from sklearn.base import BaseEstimator, TransformerMixin

class FamilySizeAdder(BaseEstimator, TransformerMixin):
    def fit(self, X, y=None):
        return self
    
    def transform(self, X):
        # SibSp + Parch + 1 (self)
        family_size = X['SibSp'] + X['Parch'] + 1
        return np.c_[X, family_size] # Append as a new column
```

### 4. Binning / Discretization

If you want to turn `Age` into discrete categories ("Child", "Teen", etc.) instead of keeping it continuous, you can use `KBinsDiscretizer`.


```python
from sklearn.preprocessing import KBinsDiscretizer

## Discretize Age into 4 bins
discretizer = KBinsDiscretizer(n_bins=4, encode='ordinal', strategy='quantile')
## Use this in your pipeline to transform continuous Age to categorical bins
```

### 5. Evaluating Performance (The Stretch Goal)

To truly see the "before and after," compare the baseline against your engineered features.


```Python
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

## 1. Pipeline with all engineering steps
full_pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', RandomForestClassifier(random_state=42))
])

## 2. Train and Evaluate
X_train, X_test, y_train, y_test = train_test_split(df.drop('Survived', axis=1), df['Survived'], test_size=0.2)
full_pipeline.fit(X_train, y_train)
preds = full_pipeline.predict(X_test)

print(f"Accuracy with Feature Engineering: {accuracy_score(y_test, preds):.2f}")
```

### [Key Takeaways](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W01 - Overview of Feature Engineering/Readme.md#key-takeaways) for your Titanic Exercise:

- **Leakage Prevention:** Always use `fit_transform` on your training data and _only_ `transform` on your test data. The `Pipeline` handles this automatically.
    
- **Why scaling?** Since you might use models like KNN or Logistic Regression to predict survival, scaling ensures that `Fare` (which can be 500+) doesn't overwhelm `Age` (which is < 100).
    
- **Validation:** Use a simple `RandomForestClassifier` as your baseline. Because it is a tree-based model, it is naturally robust to unscaled data, which makes it an excellent "control" for testing how much your specific feature engineering steps (like Log transform for `Fare`) actually help the model performance.
    

**Which of these transformations (Imputation, Scaling, Log Transform, or Binning) would you like to see integrated into a complete, runnable script first?**

Tags: #statistics #machine-learning #data-science #statistical-modelling