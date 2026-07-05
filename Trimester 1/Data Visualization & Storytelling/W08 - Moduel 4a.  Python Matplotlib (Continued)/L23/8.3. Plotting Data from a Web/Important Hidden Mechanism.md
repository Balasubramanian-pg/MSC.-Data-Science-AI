# Important Hidden Mechanism

This:

```python
df_weather['temp_max'].plot()
```

internally becomes:

```python
plt.plot(
    df_weather.index,
    df_weather['temp_max']
)
```

Pandas is abstracting Matplotlib.
