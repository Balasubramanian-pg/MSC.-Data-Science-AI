# Important Bokeh Design Principle

Glyphs are objects.

This line:

```python
circle = plot.circle(...)
```

stores the glyph renderer.

That means:

- you can modify it later
    
- inspect it
    
- update it dynamically
