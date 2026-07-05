# Why `rect=[0,0,1,0.96]` Matters

The lecture includes:

```python
rect=[0, 0, 1, 0.96]
```

This reserves space for the figure title.

Without this:

```python
fig.suptitle()
```

may overlap with subplot titles.
