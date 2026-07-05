# Full Example

```python
from bokeh.plotting import figure, show

x = [1,2,3,4]
y = [2,5,3,7]

title_plot = figure(
    title="Headline Example",
    height=300
)

title_plot.line(x, y, line_width=2)
