# Alternative: Style After Creation

Because the glyph is stored:

```python
circle = plot.circle(...)
```

You can later do:

```python
circle.glyph.fill_color = "blue"
```

This is extremely important.
