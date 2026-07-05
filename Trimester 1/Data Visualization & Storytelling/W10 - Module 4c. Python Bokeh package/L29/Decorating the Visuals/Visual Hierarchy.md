# Visual Hierarchy

Internally Bokeh looks conceptually like:

```mermaid
flowchart TD
    A[Figure Object]
    A --> B[Title Object]
    A --> C[Axis Objects]
    A --> D[Glyph Objects]

    B --> E[Text Properties]
```
