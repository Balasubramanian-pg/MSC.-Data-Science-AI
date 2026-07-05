# Step 3: Load Geographic Data

```python
chicago = gpd.read_file(
    geodatasets.get_path("geoda.chicago_commpop")
)
```

This is equivalent to:

```python
pd.read_csv()
```

but for geospatial files.
