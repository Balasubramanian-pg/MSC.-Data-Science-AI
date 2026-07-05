# Example Plot

```python
from bokeh.plotting import figure, show
from bokeh.palettes import Cividis

x = [1,2,3,4,5]
y = [3,7,2,6,4]

colors = Cividis[5]

plot = figure(height=300)

plot.vbar(
    x=x,
    top=y,
    width=0.5,
    color=colors
)

show(plot)
```
