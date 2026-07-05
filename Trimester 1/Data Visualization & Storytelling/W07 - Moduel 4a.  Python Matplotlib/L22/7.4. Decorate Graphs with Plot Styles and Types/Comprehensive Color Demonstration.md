# Comprehensive Color Demonstration

```python
import numpy as np
import matplotlib.pyplot as plt

x = [0, 1]

plt.figure(figsize=(10, 5))

plt.plot(x, [0, 0], color='r', linewidth=4, label='Single Letter')
plt.plot(x, [1, 1], color='C1', linewidth=4, label='Default Cycle')
plt.plot(x, [2, 2], color='limegreen', linewidth=4, label='Named')
plt.plot(x, [3, 3], color='#FF5733', linewidth=4, label='Hex')
plt.plot(x, [4, 4], color=(0.2, 0.4, 0.8, 0.7), linewidth=4, label='RGBA')
plt.plot(x, [5, 5], color='0.4', linewidth=4, label='Grayscale')

plt.legend()
plt.show()
```

Transcript reference:
