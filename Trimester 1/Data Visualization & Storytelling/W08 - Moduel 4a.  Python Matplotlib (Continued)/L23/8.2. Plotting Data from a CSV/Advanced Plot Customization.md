# Advanced Plot Customization

```python
df.cumsum().plot(
    figsize=(12,6),
    linewidth=2
)

plt.title(
    'Random Walk Simulation'
)

plt.xlabel('Date')
plt.ylabel('Cumulative Value')

plt.legend(
    loc='upper left'
)

plt.grid(alpha=0.3)

plt.show()
```
