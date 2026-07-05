# Create Geometry

```python
gdf_cities = gpd.GeoDataFrame(
    cities_df,
    geometry=gpd.points_from_xy(
        cities_df.longitude,
        cities_df.latitude
    )
)
```
