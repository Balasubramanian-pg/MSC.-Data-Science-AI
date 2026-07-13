# Binning salary into 3 discrete ordinal brackets (e.g., for tax brackets)

```python
binner = KBinsDiscretizer(n_bins=3, encode='ordinal', strategy='uniform')
data['Salary_Bracket'] = binner.fit_transform(data[['Salary_USD']])
# ML models prefer continuous data centered at 0 with unit variance

scaler = StandardScaler()
data[['Joining_Year_Scaled', 'Salary_Scaled']] = scaler.fit_transform(data[['Joining_Year', 'Salary_USD']])

# We drop Employee_ID as it has no predictive power (cardinality = N)

ohe = OneHotEncoder(sparse_output=False, dtype=int)
dept_encoded = ohe.fit_transform(data[['Department']])
dept_columns = ohe.get_feature_names_out(['Department'])
df_dept = pd.DataFrame(dept_encoded, columns=dept_columns)

# We must explicitly define the hierarchy array for the algorithm

perf_hierarchy = [['Low', 'Medium', 'High']]
oe = OrdinalEncoder(categories=perf_hierarchy, dtype=int)
data['Performance_Encoded'] = oe.fit_transform(data[['Performance']])

```
