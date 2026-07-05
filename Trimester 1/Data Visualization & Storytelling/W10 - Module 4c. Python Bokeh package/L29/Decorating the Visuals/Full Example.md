# Full Example

```python
from bokeh.plotting import figure, show
from bokeh.transform import linear_cmap
from bokeh.palettes import Turbo256
from bokeh.models import ColorBar
from bokeh.models import ColumnDataSource

x = list(range(-32, 33))
y = [i**2 for i in x]

source = ColumnDataSource(data=dict(x=x, y=y))

mapper = linear_cmap(
    field_name='y',
    palette=Turbo256,
    low=min(y),
    high=max(y)
)

mapper_plot = figure(
    title="Linear Color Mapping Example",
    height=400,
    width=700
)

scatter = mapper_plot.scatter(
    'x',
    'y',

    source=source,

    color=mapper,
    size=10
)
