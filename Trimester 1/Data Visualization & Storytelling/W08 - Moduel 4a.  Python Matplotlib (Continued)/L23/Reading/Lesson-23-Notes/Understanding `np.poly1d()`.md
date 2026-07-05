# Understanding `np.poly1d()`

The lecture introduces:

```python
np.poly1d(coeffs)
```

This converts coefficients into a callable function.

Example:

```python
poly = np.poly1d(coeffs)

poly(5)
```

evaluates the fitted curve at:

$$
x = 5
$$
