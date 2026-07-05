# Example Dataset

The transcript models social media platforms and user counts.

```python
import pandas as pd
import matplotlib.pyplot as plt

platforms = [
    "ConnectMe",
    "ShareIt",
    "LinkUp",
    "BuzzNet"
]

users = [120, 95, 140, 80]

df = pd.DataFrame({
    "Platform": platforms,
    "Users": users
})

ax = df.plot(
    kind='bar',
    x='Platform',
    y='Users',
    legend=False,
    color='cornflowerblue'
)

plt.title("Monthly Active Users")
plt.xlabel("Platform")
plt.ylabel("Users (Millions)")

plt.show()
```

Transcript reference:
