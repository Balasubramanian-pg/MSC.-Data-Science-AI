# You can add this into your numeric pipeline:

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
