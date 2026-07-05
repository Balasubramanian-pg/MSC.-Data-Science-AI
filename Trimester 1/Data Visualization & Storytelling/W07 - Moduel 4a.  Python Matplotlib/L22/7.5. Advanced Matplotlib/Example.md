# Example

```python
import numpy as np
import matplotlib.pyplot as plt

categories = [
    "Sales",
    "Marketing",
    "Finance",
    "Operations",
    "HR"
]

values = [80, 70, 90, 85, 60]

angles = np.linspace(
    0,
    2 * np.pi,
    len(categories),
    endpoint=False
)

values = np.concatenate((values, [values[0]]))
angles = np.concatenate((angles, [angles[0]]))

fig, ax = plt.subplots(
    figsize=(6,6),
    subplot_kw=dict(polar=True)
)

ax.plot(angles, values)

ax.fill(angles, values, alpha=0.25)

ax.set_xticks(angles[:-1])
ax.set_xticklabels(categories)

plt.show()
```
