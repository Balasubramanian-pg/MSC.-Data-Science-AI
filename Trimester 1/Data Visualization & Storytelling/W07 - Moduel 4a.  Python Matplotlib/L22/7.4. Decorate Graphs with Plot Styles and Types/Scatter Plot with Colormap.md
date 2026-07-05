# Scatter Plot with Colormap

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.random.rand(100)
y = np.random.rand(100)
z = np.random.rand(100)

plt.scatter(
    x,
    y,
    c=z,
    cmap='viridis'
)

plt.colorbar()

plt.show()
```
