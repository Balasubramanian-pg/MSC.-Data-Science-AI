# Number Processing Pipeline

```mermaid
flowchart TD
    A[Numbers in Text]
    
    A --> B{Retain Meaning?}
    
    B -->|Yes| C[Convert to Words]
    
    B -->|No| D[Remove]
```
