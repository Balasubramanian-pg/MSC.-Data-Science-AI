# Real API Example

```python
import pandas as pd

url = "https://jsonplaceholder.typicode.com/users"

df = pd.read_json(url)

print(df.head())
```

This fetches live web API data directly into Pandas.
