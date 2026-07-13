# Binning salary into 3 discrete ordinal brackets (e.g., for tax brackets)

```python
binner = KBinsDiscretizer(n_bins=3, encode='ordinal', strategy='uniform')
data['Salary_Bracket'] = binner.fit_transform(data[['Salary_USD']])
# ML models prefer continuous data centered at 0 with unit variance

scaler = StandardScaler()
data[['Joining_Year_Scaled', 'Salary_Scaled']] = scaler.fit_transform(data[['Joining_Year', 'Salary_USD']])

```
