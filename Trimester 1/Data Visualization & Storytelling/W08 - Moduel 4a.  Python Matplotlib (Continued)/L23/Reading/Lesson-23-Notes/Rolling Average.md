# Rolling Average

Weather data is noisy.

Smooth trends improve interpretability.

```python
df_weather['temp_max'].rolling(30).mean()
```
