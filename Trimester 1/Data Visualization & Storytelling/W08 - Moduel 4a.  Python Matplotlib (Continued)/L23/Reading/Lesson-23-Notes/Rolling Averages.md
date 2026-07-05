# Rolling Averages

Weather data is noisy.

Smoothing improves interpretability.

Example:

```python
df_weather['temp_max'].rolling(30).mean().plot()
```

This computes a 30-day moving average.
