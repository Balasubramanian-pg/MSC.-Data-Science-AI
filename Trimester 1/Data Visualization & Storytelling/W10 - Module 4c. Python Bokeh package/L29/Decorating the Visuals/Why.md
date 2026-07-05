# Why?

Bokeh layout system uses positional keywords.

Correct:

```python
plot.add_layout(plot.title, "above")
```

Not:

```python
"top"
```

because internally Bokeh layout regions are:

- above
    
- below
    
- left
    
- right
    

This comes from web-layout architecture.
