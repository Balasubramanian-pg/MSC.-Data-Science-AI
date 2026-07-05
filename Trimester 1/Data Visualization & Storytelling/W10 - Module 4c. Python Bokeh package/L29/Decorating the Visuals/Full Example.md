# Full Example

```python
from bokeh.plotting import figure, show

plot = figure(height=300)

circle = plot.circle(
    [1,2,3],
    [2,5,8],

    size=20,
    fill_color="yellow",
    line_color="red"
)
