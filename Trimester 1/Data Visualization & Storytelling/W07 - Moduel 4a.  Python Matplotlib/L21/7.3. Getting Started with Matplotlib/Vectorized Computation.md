# Vectorized Computation

An important hidden concept here:

```python
y = np.sin(x)
```

works on the entire array simultaneously.

This is called:

> vectorization.

Without NumPy:  
you would need loops.

Example:

```python
y = []

for value in x:
    y.append(math.sin(value))
```

NumPy avoids explicit loops and is much faster.
