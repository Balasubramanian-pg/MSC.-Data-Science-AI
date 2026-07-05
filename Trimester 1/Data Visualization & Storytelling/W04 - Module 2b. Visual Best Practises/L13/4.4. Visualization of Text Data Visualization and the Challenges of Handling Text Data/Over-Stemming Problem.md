# Over-Stemming Problem

```mermaid
flowchart TD
    A[Original Words]
    
    A --> B[Stem Reduction]
    
    B --> C{Semantic Meaning Preserved?}
    
    C -->|Yes| D[Useful Simplification]
    
    C -->|No| E[Meaning Distortion]
```
