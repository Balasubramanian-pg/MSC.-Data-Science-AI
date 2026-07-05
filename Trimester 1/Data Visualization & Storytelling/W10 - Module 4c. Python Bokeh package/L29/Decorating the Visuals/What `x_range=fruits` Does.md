# What `x_range=fruits` Does

This is the important part.

```python
x_range=fruits
```

Without this:

```python
x = [1,2,3,4]
```

Bokeh assumes a continuous numeric axis.

With:

```python
x = ["Apple", "Mango"]
```

Bokeh creates a categorical axis.

Visual interpretation:

```text
Continuous Axis:
1 ---- 2 ---- 3 ---- 4

Categorical Axis:
Apple | Mango | Orange | Banana
```
