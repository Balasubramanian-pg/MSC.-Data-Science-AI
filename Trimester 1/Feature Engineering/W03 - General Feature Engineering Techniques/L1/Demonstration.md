### Practical Implementation: Feature Extraction (PCA) and Construction

This module demonstrates the application of **Principal Component Analysis (PCA)** for feature extraction and manual **feature construction** to enhance predictive performance using the Telco Customer Churn dataset.

### 1. Feature Extraction via PCA

PCA is a dimensionality reduction technique that transforms a high-dimensional feature space into a smaller set of uncorrelated variables called **principal components**. Each component is a linear combination of original features, ordered by the amount of variance they capture.

#### **Implementation Steps**

1. **Preprocessing:** Before applying PCA, you must prepare the data.
    
    - **Drop Non-Predictive Features:** Remove columns like `customerID`.
        
    - **Handle Missing Values:** Drop rows with missing data.
        
    - **Categorical Encoding:** Use `LabelEncoder` to convert categorical strings into integers.
        
    - **Scaling:** PCA is sensitive to the variance of features. You _must_ apply `StandardScaler` to ensure all features contribute equally.
        
2. **PCA Application:**
    
    - Define the number of components (e.g., `n_components=2`).
        
    - `fit_transform` the scaled data into the new, 2D feature space.
        

Python

```
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler, LabelEncoder

# Preprocessing
le = LabelEncoder()
for col in categorical_features:
    df[col] = le.fit_transform(df[col])

scaler = StandardScaler()
X_scaled = scaler.fit_transform(df.drop('Churn', axis=1))

# PCA Extraction
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X_scaled)
```

#### **Visual Diagnostic**

A 2D scatter plot of the two principal components (`PC1` vs `PC2`), colored by the `Churn` target label, allows for immediate visual diagnosis. It helps determine if the churned vs. non-churned customers form distinct clusters, providing insight into the separability of classes in the reduced space.

### 2. Feature Construction

Feature construction is a domain-driven approach where we combine or transform existing features to make relationships explicit.

#### **Implementation Example: Average Charges Per Service**

By combining `TotalCharges`, `MonthlyCharges`, and `Tenure`, we can engineer a feature that captures the "average intensity" of a customer's spending relative to their loyalty.

Python

```
# Feature Construction
df['avg_charges_per_service'] = df['TotalCharges'] / (df['MonthlyCharges'] + df['Tenure'])

# Cleaning: Ensure no infinities or NaNs arise from the division
df.replace([np.inf, -np.inf], 0, inplace=True)
df.fillna(0, inplace=True)
```

### 3. Key Technical Takeaways

- **Why PCA?** It reduces noise and redundancy by focusing only on the directions of maximum variance. It makes modeling simpler and allows for 2D visualization of high-dimensional datasets.
    
- **Component Contribution:** By examining the loadings (weights) of each original feature on the principal components, we can interpret _what_ the PCA components actually represent (e.g., `Tenure` and `TotalCharges` heavily influence `PC1`).
    
- **Construction vs. Extraction:**
    
    - **Extraction (PCA):** Algorithmic and mathematical; transforms features to reduce dimensionality.
        
    - **Construction (New Features):** Creative and domain-driven; invents new metrics that align with business logic to improve model predictive signal.
        

#### **Workflow Summary for Practical Tasks**

1. **Identify Features:** Separate numerical and categorical columns.
    
2. **Preprocess:** Encode categories and scale numeric data using `StandardScaler`.
    
3. **Extract:** Apply PCA to reduce dimensions and visualize results via scatter plots.
    
4. **Construct:** Use domain knowledge to create new features that might reveal hidden insights.
    
5. **Iterate:** Always visualize your new features to check for distinct groupings relative to your target variable.