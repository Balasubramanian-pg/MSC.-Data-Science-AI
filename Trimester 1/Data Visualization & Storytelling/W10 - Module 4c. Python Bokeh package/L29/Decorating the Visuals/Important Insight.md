# Important Insight

Axes are objects too.

Bokeh internally models:

```mermaid
flowchart TD
    A[Figure]
    A --> B[X Axis Object]
    A --> C[Y Axis Object]

    B --> D[Axis Line]
    B --> E[Tick Marks]
    B --> F[Labels]
```
