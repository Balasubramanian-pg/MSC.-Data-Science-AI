# Full Example

```python
from bokeh.plotting import figure, show

x = [1,2,3,4,5]
y = [2,5,3,7,6]

plot = figure(
    title="Headline Example",
    height=300
)

plot.line(
    x,
    y,
    line_width=2
)
