# Scale features to zero mean and unit variance


```python
from sklearn.preprocessing import StandardScaler

# Initialize scaler
scaler = StandardScaler()

# Scale numerical features
df[['Age', 'Income', 'Salary']] = scaler.fit_transform(
    df[['Age', 'Income', 'Salary']]
)
```
