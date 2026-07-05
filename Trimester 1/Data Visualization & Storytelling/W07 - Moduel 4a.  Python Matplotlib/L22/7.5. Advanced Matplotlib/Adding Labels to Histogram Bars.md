# Adding Labels to Histogram Bars

The transcript discusses manually labeling frequencies using loops.

Implementation:

```python
import numpy as np
import matplotlib.pyplot as plt

np.random.seed(42)

data = np.random.normal(size=1000)

counts, bins, patches = plt.hist(
    data,
    bins=20,
    color='lightblue',
    edgecolor='black'
)
