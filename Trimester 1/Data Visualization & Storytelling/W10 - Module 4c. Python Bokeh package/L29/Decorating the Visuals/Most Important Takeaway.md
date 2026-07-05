# Most Important Takeaway

This section reinforces that Bokeh is an object hierarchy:

```mermaid
flowchart TD
    A[Figure]

    A --> B[Title]
    A --> C[Legend]
    A --> D[Glyphs]

    C --> E[Location]
    C --> F[Title]
    C --> G[Text Properties]
```

Everything is editable because everything is represented as structured objects, not static rendering instructions.

This section covers two important topics:

1. advanced legend customization
    
2. color palettes in Bokeh
    

The deeper theme is:

> turning default charts into intentionally designed visual systems
