# Step 4: Plot on Specific Axes

Example:

```python
axes[0].plot(
    df.weather.index,
    df.weather['temp_max'],
    color='crimson'
)

axes[1].plot(
    df.weather.index,
    df.weather['precipitation'],
    color='royalblue'
)

axes[2].plot(
    df.weather.index,
    df.weather['wind'],
    color='green'
)
```
