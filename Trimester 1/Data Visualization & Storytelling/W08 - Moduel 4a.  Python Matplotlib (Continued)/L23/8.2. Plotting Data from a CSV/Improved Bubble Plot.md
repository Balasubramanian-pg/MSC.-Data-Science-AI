# Improved Bubble Plot

```python
plt.figure(figsize=(10,6))

scatter = plt.scatter(
    df['gdp_per_capita'],
    df['life_expectancy'],
    s=np.sqrt(df['population']) * 20,
    c=df['gdp_per_capita'],
    cmap='viridis',
    alpha=0.7
)

plt.colorbar(scatter)

plt.xlabel('GDP per Capita')
plt.ylabel('Life Expectancy')

plt.title(
    'Economic Prosperity vs Health'
)

plt.grid(True)

plt.show()
```
