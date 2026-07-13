# Weather Prediction Example

The lecture again uses weather prediction to explain normalization.

Suppose the dataset contains:

|Temperature|Humidity|
|---|---|
|35|50|
|34|75|

The raw measurements originate from physical sensors.

However, different attributes naturally operate on different scales.

```mermaid
flowchart LR
    A[Raw Sensor Data]
    --> B[Temperature]

    A --> C[Humidity]

    B --> D[Different Scales]
    C --> D

    D --> E[Normalization]
```

Normalization transforms all attributes into comparable ranges before machine learning begins.
