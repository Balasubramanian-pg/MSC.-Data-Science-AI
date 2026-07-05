# Reading String Data into Pandas

```python
from io import StringIO

df = pd.read_csv(
    StringIO(data)
)
```

This converts raw text into a DataFrame.
