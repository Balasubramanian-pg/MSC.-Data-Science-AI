# Custom Colormaps

The transcript demonstrates segmented colormaps.

Example:

```python
from matplotlib.colors import LinearSegmentedColormap

custom_cmap = LinearSegmentedColormap.from_list(
    "custom",
    ["red", "yellow", "green"]
)
```
