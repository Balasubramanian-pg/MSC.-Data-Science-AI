# Drill-Down as a Defense Against Misleading Aggregation

The lecture correctly links Simpson’s Paradox to:

- dashboard interactivity
    
- drill-down exploration
    

Good dashboards allow users to move from:

- summary  
    to
    
- decomposition
    

Example workflow:

```mermaid
flowchart LR
    A[Overall KPI] --> B[Regional Breakdown]
    B --> C[Store-Level Analysis]
    C --> D[Product-Level Investigation]
```

Without drill-down:

- misleading aggregation remains hidden.
