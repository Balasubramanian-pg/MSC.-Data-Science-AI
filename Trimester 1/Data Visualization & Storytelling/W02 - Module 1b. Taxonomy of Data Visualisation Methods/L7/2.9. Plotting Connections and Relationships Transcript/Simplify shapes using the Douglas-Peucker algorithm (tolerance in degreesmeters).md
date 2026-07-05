# Simplify shapes using the Douglas-Peucker algorithm (tolerance in degrees/meters)

gdf["geometry"] = gdf["geometry"].simplify(tolerance=0.001, preserve_topology=True)
