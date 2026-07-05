# Step 8: Plot World Map

```python
world = gpd.read_file(
    gpd.datasets.get_path('naturalearth_lowres')
)

ax = world.plot(figsize=(15,10))
```
