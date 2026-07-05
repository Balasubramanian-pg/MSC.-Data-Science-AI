---
title: W02 - Handling Numeric Data
module: Statistical Modelling And Inferencing
week: W02 - Handling Numeric Data
---

**Dataset here for your practice : **[Titanic-Dataset.xlsx](https://lumen.bitspilani-digital.edu.in/content/enforced/7097-T3-25_MDSDF403/Titanic-Dataset.xlsx?isCourseFile=true&ou=7097)****

This experiential learning exercise is a perfect application of the concepts covered in Weeks 1 and 2. The Titanic dataset is historically significant in data science precisely because it forces you to navigate the messy, real-world nature of data before you ever touch an algorithm.

Below is a structured guide to help you tackle this exercise, organized by your task list.

### **1. Initial Data Exploration**

Before engineering, you must understand your feature space.

- **DataType Check:** Use `df.info()` to distinguish between numeric (float/int) and object/categorical types.
    
- **Distribution Analysis:** Use `df.describe()` for summary statistics and `seaborn.histplot` or `kdeplot` to visualize the skewness of `Fare` and the distribution of `Age`.
    

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

- **Min-Max Scaling:** Use if your model assumes features are bounded (e.g., KNN).
    
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

To provide the detailed implementation guidance you requested for the Titanic dataset, let's break down the most technical "pain points" of your task list into actionable Python code.

Using a `Pipeline` and `ColumnTransformer` is the industry standard for this. It prevents **data leakage** (a common trap where your model "sees" test set information during training).

### 1. Robust Data Imputation & Encoding

Instead of manually filling nulls, use `sklearn` transformers to ensure consistency across train/test splits.

```python
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder, FunctionTransformer
import numpy as np

## [Define columns by type](./Define%20columns%20by%20type.md)

## [Numeric pipeline: Impute missing Age with median, then scale](./Numeric%20pipeline%20-%20Impute%20missing%20Age%20with%20median%2C%20then%20scale.md)

## [Categorical pipeline: Impute missing Embarked with mode, then One-Hot Encode](./Categorical%20pipeline%20-%20Impute%20missing%20Embarked%20with%20mode%2C%20then%20One-Hot%20Encode.md)

## [Combine into one preprocessor](./Combine%20into%20one%20preprocessor.md)

## [Create a custom transformer for Log transformation](./Create%20a%20custom%20transformer%20for%20Log%20transformation.md)

## [You can add this into your numeric pipeline:](./You%20can%20add%20this%20into%20your%20numeric%20pipeline%20-.md)
