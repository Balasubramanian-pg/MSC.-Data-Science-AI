import pandas as pd
import numpy as np
from sklearn.preprocessing import OneHotEncoder, OrdinalEncoder, StandardScaler, KBinsDiscretizer

## 1. Constructing a heterogeneous dataset representing various attribute types
data = pd.DataFrame({
    'Employee_ID': ['E01', 'E02', 'E03', 'E04'],       # Nominal (Identifier)
    'Department': ['HR', 'Engineering', 'HR', 'Sales'], # Nominal (Categorical)
    'Performance': ['Low', 'High', 'Medium', 'High'],   # Ordinal
    'Joining_Year': [2015, 2020, 2018, 2022],           # Interval
    'Salary_USD': [55000.50, 120000.00, 75000.75, 90000.25] # Ratio (Continuous)
})

print("--- Original Raw Dataset ---")
print(data)
print("\n")

## 2. Processing Nominal Attributes (One-Hot Encoding)
## We drop Employee_ID as it has no predictive power (cardinality = N)
ohe = OneHotEncoder(sparse_output=False, dtype=int)
dept_encoded = ohe.fit_transform(data[['Department']])
dept_columns = ohe.get_feature_names_out(['Department'])
df_dept = pd.DataFrame(dept_encoded, columns=dept_columns)

## 3. Processing Ordinal Attributes (Ordinal Encoding)
## We must explicitly define the hierarchy array for the algorithm
perf_hierarchy = [['Low', 'Medium', 'High']]
oe = OrdinalEncoder(categories=perf_hierarchy, dtype=int)
data['Performance_Encoded'] = oe.fit_transform(data[['Performance']])

## 4. Processing Interval/Ratio Attributes (Standardization)
## ML models prefer continuous data centered at 0 with unit variance
scaler = StandardScaler()
data[['Joining_Year_Scaled', 'Salary_Scaled']] = scaler.fit_transform(data[['Joining_Year', 'Salary_USD']])

## 5. Continuous to Discrete Transformation (Discretization)
## Binning salary into 3 discrete ordinal brackets (e.g., for tax brackets)
binner = KBinsDiscretizer(n_bins=3, encode='ordinal', strategy='uniform')
data['Salary_Bracket'] = binner.fit_transform(data[['Salary_USD']])

## 6. Final Assembled ML-Ready Design Matrix
ml_ready_matrix = pd.concat([df_dept, data[['Performance_Encoded', 'Joining_Year_Scaled', 'Salary_Scaled', 'Salary_Bracket']]], axis=1)

print("--- ML-Ready Design Matrix (Numeric/Transformed) ---")
print(ml_ready_matrix)
