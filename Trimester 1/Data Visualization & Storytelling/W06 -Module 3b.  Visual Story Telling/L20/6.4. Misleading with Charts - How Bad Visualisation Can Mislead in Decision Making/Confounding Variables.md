# Confounding Variables

A confounder affects:

- both observed variables simultaneously
    

Example structure:

```mermaid
flowchart TD
    A[Hot Weather] --> B[Ice Cream Sales]
    A --> C[Crime Activity]
```

The observed relationship:

- ice cream ↔ murders
    

is not causal.

The true driver:

- weather.
