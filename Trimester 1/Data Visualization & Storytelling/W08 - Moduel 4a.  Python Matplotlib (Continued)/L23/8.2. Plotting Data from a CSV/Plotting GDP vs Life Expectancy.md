# Plotting GDP vs Life Expectancy

```python
import matplotlib.pyplot as plt

plt.figure(figsize=(10, 6))

plt.scatter(
    df['gdp_per_capita'],
    df['life_expectancy'],
    s=df['population'] * 10
)

plt.xlabel('GDP per Capita')
plt.ylabel('Life Expectancy')

plt.title(
    'GDP vs Life Expectancy'
)

plt.grid(True)

plt.show()
```

Source transcript:
