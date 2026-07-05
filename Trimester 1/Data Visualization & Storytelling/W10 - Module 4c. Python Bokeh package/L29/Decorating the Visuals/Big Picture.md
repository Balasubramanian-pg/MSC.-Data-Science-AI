# Big Picture

In Bokeh, every visual element has properties.

Example:

|Element|Properties|
|---|---|
|Text|font size, color, style|
|Line|width, color, dash, transparency|
|Fill|fill color, opacity|
|Hatch|patterns, hatch color|

Think of Bokeh as:

```mermaid
flowchart TD
    A[Plot] --> B[Glyphs]
    B --> C[Visual Properties]
    
    C --> D[Text Properties]
    C --> E[Line Properties]
    C --> F[Fill Properties]
    C --> G[Hatch Properties]
```
