# Creating Random DataFrames

```python
import numpy as np
import pandas as pd

np.random.seed(42)

dates = pd.date_range(
    '2000-01-01',
    periods=1000
)

df = pd.DataFrame(
    np.random.randn(1000, 3),
    index=dates,
    columns=['A', 'B', 'C']
)
```
