# Apply theme

curdoc().theme = "dark_minimal"

x = [1,2,3,4]
y = [2,5,3,7]

plot = figure(
    title="Theme Example",
    height=300
)

plot.line(x, y, line_width=2)

show(plot)
```
