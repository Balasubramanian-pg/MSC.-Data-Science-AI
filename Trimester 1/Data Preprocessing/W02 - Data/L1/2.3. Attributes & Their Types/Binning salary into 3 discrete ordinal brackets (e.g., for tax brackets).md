# Binning salary into 3 discrete ordinal brackets (e.g., for tax brackets)

```python
binner = KBinsDiscretizer(n_bins=3, encode='ordinal', strategy='uniform')
data['Salary_Bracket'] = binner.fit_transform(data[['Salary_USD']])
```
