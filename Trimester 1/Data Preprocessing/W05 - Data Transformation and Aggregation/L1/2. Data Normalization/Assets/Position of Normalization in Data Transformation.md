# Position of Normalization in Data Transformation

The lecture places normalization inside the broader data transformation stage.

The hierarchy becomes:

```mermaid
flowchart TD
    A[Data Preprocessing]
    --> B[Data Transformation]

    B --> C[Data Normalization]
    B --> D[Data Aggregation]
```

Normalization is therefore one specific technique inside transformation workflows.
