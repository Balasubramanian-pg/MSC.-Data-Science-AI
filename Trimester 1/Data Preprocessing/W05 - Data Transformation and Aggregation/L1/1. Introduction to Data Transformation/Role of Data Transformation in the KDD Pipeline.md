# Role of Data Transformation in the KDD Pipeline

The lecture connects transformation to the KDD pipeline.

The overall workflow becomes:

```mermaid
flowchart LR
    A[Raw Data]
    --> B[Data Selection]

    B --> C[Data Preprocessing]

    C --> D[Data Transformation]

    D --> E[Machine Learning / Mining]

    E --> F[Analysis]
```

Transformation prepares the dataset for downstream learning algorithms.

It is therefore an intermediate but foundational stage.
