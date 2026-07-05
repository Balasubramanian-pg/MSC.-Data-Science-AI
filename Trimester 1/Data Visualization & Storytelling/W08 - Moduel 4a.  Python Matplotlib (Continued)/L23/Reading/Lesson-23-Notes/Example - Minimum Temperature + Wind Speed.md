# Example: Minimum Temperature + Wind Speed

The lecture introduces a second weather analysis example.

```python
fig, axes = plt.subplots(
    2,
    1,
    figsize=(12,8),
    sharex=True
)

axes[0].plot(
    df_weather.index,
    df_weather['temp_min'],
    color='deepskyblue'
)

axes[0].set_title(
    'Minimum Daily Temperature'
)

axes[0].set_ylabel(
    'Temp (°C)'
)

axes[1].plot(
    df_weather.index,
    df_weather['wind'],
    color='slategray'
)

axes[1].set_title(
    'Average Daily Wind Speed'
)

axes[1].set_ylabel(
    'Speed (m/s)'
)

fig.suptitle(
    'Seattle Weather Metrics',
    fontsize=16
)

plt.tight_layout(
    rect=[0,0,1,0.96]
)

plt.show()
```
