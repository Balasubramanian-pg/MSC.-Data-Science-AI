# Arrow Annotations

```python
peak_x = 1.5 * np.pi
peak_y = np.sin(peak_x)

plt.plot(x, y)

plt.annotate(
    "Local Minimum",
    xy=(peak_x, peak_y),
    xytext=(5, -0.5),
    arrowprops=dict(
        facecolor='black'
    )
)

plt.show()
```

Transcript reference:
