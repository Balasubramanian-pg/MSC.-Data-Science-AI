# Important Distinction

|Property|Controls|
|---|---|
|line_color|border|
|fill_color|inside area|

Example:

```python
p.circle(
    x,
    y,
    size=20,
    fill_color="red",
    line_color="black"
)
```

Visual:

```text
Black border
Red interior
```
