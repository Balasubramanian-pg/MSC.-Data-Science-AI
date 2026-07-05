# Basic Pie Chart

```python
import matplotlib.pyplot as plt

sources = [
    "Organic",
    "Direct",
    "Referral",
    "Social",
    "Other"
]

traffic = [45, 25, 15, 10, 5]

plt.figure(figsize=(6,6))

plt.pie(
    traffic,
    labels=sources,
    autopct='%1.1f%%',
    startangle=90
)

plt.title("Website Traffic Sources")

plt.show()
```
