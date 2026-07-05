# Simple Text Placement

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.plot(x, y)

plt.text(
    3,
    0,
    "Important Region",
    fontsize=12
)

plt.show()
```
