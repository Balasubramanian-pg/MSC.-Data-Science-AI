# Overlaying Multiple Signals

Instead of separate subplots:

```python
axes[0].plot(temp)
axes[0].plot(humidity)
```

But this risks clutter if scales differ significantly.
