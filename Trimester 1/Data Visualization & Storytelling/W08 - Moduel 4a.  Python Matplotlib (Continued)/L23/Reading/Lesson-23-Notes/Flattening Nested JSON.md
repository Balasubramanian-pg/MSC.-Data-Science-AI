# Flattening Nested JSON

Many JSON structures are deeply nested.

Example:

```python
from pandas import json_normalize

flat_df = json_normalize(data)
```

This is essential in production analytics systems.
