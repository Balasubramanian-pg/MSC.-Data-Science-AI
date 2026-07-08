# Why Data Cleaning is Necessary

Machine learning algorithms rely on mathematical computations.

If datasets contain missing or corrupted values, many algorithms cannot execute properly.

The preprocessing workflow therefore becomes:

```mermaid
flowchart TD
    A[Raw Dirty Data]
    --> B[Data Cleaning]

    B --> C[Missing Value Handling]
    B --> D[Noise Removal]
    B --> E[Consistency Standardization]

    C --> F[Clean Dataset]
    D --> F
    E --> F

    F --> G[ML Model Training]
```

Without cleaning, downstream predictions become unreliable.
