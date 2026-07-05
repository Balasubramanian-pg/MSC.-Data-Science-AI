# Example

```python
from bokeh.plotting import figure, show
from bokeh.models import NumeralTickFormatter

airways = [
    "Air India",
    "Delta Airlines",
    "Lufthansa",
    "Singapore Airlines"
]

passengers = [1200000, 2500000, 1800000, 3200000]

plot = figure(
    x_range=airways,
    height=400,
    width=700
)

plot.vbar(
    x=airways,
    top=passengers,
    width=0.5
)
