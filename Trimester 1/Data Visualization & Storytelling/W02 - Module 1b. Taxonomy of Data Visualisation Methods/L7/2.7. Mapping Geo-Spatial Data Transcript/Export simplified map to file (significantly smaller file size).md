# Export simplified map to file (significantly smaller file size)

gdf.to_file("us_counties_optimized.geojson", driver="GeoJSON")
```

### C. Colorblind-Friendly Map Styling

#### Issue: Standard Green-to-Red Palettes Are Misleading
Using a standard green-to-red color palette (such as green for low unemployment, red for high unemployment) makes maps unreadable for red-green colorblind viewers, rendering critical economic or health maps useless.

#### Mitigations:
* **Use Colorblind-Friendly Palettes:** Use perceptually uniform palettes like **Viridis** (blue-to-yellow) or **Cividis** that remain clear and distinguishable for all colorblind viewers.
* **Test Your Map's Contrast:** Convert your map to grayscale to ensure there is enough contrast and brightness variation for readers to tell the regions apart without relying on color alone.
