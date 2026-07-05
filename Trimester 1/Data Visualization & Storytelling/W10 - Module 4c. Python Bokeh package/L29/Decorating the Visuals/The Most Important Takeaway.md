# The Most Important Takeaway

The instructor summarizes the core architecture correctly:

```python
plot_object.component.property = value
```

Examples:

```python
p.title.text_color = "red"

p.xaxis.axis_label_text_font_size = "14pt"

p.legend.label_text_color = "green"
```

This object-property system is the foundation of:

- Bokeh
    
- Matplotlib OO API
    
- Plotly internals
    
- most UI frameworks
