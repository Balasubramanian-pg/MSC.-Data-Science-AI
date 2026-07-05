# Example

```python
import pandas as pd
import matplotlib.pyplot as plt

df = pd.DataFrame({
    "Before": [6.5, 5.8],
    "After": [8.2, 6.1]
}, index=["Redesign", "Control"])

errors = pd.DataFrame({
    "Before": [0.05, 0.04],
    "After": [0.03, 0.05]
}, index=["Redesign", "Control"])

ax = df.plot(
    kind='bar',
    yerr=errors,
    capsize=4,
    color=['salmon', 'lightblue']
)

plt.title("User Engagement Before and After")
plt.ylabel("Average Engagement Score")

plt.show()
```
