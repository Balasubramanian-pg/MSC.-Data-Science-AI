# Most Important Takeaway

Bokeh customization is hierarchical:

```mermaid
flowchart TD
    A[Figure]
    
    A --> B[Glyphs]
    A --> C[Axes]
    A --> D[Grid]
    A --> E[Title]

    B --> F[fill_color]
    B --> G[line_color]

    C --> H[axis_line_color]
    C --> I[label_properties]
```

Mastering Bokeh means understanding:

- which object owns which property
    
- and how those objects relate structurally.

This section goes deeper into axis customization and introduces:

- tick styling
    
- label styling
    
- label orientation
    
- tick formatting
    

This is where visualization starts becoming presentation engineering, not just plotting.
