# Feature Selection and Attribute Subselection

The lecture introduces attribute subselection.

Not all collected variables contribute meaningfully to prediction.

Example:

|Feature|Importance|
|---|---|
|Humidity|Important|
|Temperature|Important|
|Random Feature ABC|Irrelevant|

Transformation identifies useful features and removes irrelevant ones.

```mermaid
flowchart TD
    A[All Features]
    --> B[Feature Evaluation]

    B --> C[Relevant Features]

    B --> D[Discard Irrelevant Features]
```

This reduces both:

- computational burden
    
- noise inside the model
