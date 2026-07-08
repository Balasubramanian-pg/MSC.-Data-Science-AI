# Impact of Poor Data on Machine Learning

Machine learning models learn patterns directly from the training data.

The simplified workflow looks like this:

```mermaid
flowchart LR
    A[Raw Data] --> B[Data Preprocessing]
    B --> C[Feature Engineering]
    C --> D[Machine Learning Model]
    D --> E[Predictions]
```

If preprocessing fails to detect poor-quality data:

```mermaid
flowchart TD
    A[Incomplete Data]
    B[Noisy Data]
    C[Inconsistent Data]

    A --> D[Poor Training Dataset]
    B --> D
    C --> D

    D --> E[Weak Model]
    E --> F[Bad Predictions]
```

This directly affects:

- Prediction accuracy
    
- Statistical validity
    
- Decision-making quality
    
- Business trust
    
- Automation reliability
