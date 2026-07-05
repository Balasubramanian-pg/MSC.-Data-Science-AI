# Internal Structure

Conceptually:

```mermaid
flowchart TD
    A[Glyph Renderer]
    A --> B[Glyph]
    B --> C[Fill Properties]
    B --> D[Line Properties]
```
