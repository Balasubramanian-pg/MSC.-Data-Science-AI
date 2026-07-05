# Combine into one preprocessor

preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, numeric_features),
        ('cat', categorical_transformer, categorical_features)
    ])
```

### 2. Handling Skewness (Log Transformation)

As you noted, `Fare` is right-skewed. A log transformation compresses the tail, making the data more symmetric.

```python
