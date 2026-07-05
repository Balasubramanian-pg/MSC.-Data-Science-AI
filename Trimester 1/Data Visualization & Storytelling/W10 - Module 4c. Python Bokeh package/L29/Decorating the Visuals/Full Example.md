# Full Example

```python
from bokeh.plotting import figure, show
from bokeh.models import NumeralTickFormatter

carrier_names = [
    "Delta Airlines",
    "American Airlines",
    "United Airlines",
    "Lufthansa",
    "Emirates",
    "Qatar Airways",
    "Singapore Airlines",
    "Air India",
    "Southwest Airlines",
    "British Airways"
]

passengers = [
    14000000,
    12000000,
    11000000,
    10000000,
    9500000,
    9200000,
    9000000,
    8500000,
    8000000,
    7800000
]

plot = figure(
    x_range=carrier_names,
    title="Top 10 Carriers by Passengers",
    height=400,
    width=800
)

plot.vbar(
    x=carrier_names,
    top=passengers,
    width=0.5,
    legend_label="Passengers"
)
