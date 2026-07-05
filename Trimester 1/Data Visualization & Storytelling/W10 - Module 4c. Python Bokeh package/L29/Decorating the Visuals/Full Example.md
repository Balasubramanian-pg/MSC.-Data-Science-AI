# Full Example

```python
from bokeh.plotting import figure, show

fruits = ["Apple", "Mango", "Orange", "Banana"]
counts = [10, 25, 18, 30]

p = figure(
    x_range=fruits,
    height=350,
    title="Fruit Sales"
)

p.vbar(
    x=fruits,
    top=counts,
    width=0.5,

    # RGBA color
    color=(120, 20, 20, 0.6)
)

show(p)
```
