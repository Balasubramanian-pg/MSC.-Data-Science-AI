# Example

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 10, 20)

y1 = x
y2 = x + 2

plt.plot(
    x,
    y1,
    color='red',
    linestyle='--',
    label='Series 1'
)

plt.plot(
    x,
    y2,
    color='green',
    marker='*',
    markersize=8,
    linestyle=':',
    label='Series 2'
)

plt.legend()

plt.show()
```

Transcript reference:
