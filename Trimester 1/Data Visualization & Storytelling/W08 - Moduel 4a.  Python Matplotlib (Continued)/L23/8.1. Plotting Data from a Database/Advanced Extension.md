# Advanced Extension

You can loop dynamically instead of writing manually.

```python
columns = [
    ('temp_max', 'crimson'),
    ('temp_min', 'orange'),
    ('precipitation', 'royalblue')
]

fig, axes = plt.subplots(3,1,sharex=True)

for ax, (column, color) in zip(axes, columns):

    ax.plot(
        df.weather.index,
        df.weather[column],
        color=color
    )

    ax.set_title(column)

plt.tight_layout()
plt.show()
```

This scales much better for real dashboards.
