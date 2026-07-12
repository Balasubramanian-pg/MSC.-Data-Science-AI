# Weather Prediction System Example

The lecture repeatedly uses weather prediction because it naturally demonstrates nearly every data quality dimension simultaneously.

The complete workflow looks like this:

```mermaid
flowchart TD
    A[Environmental Sensors]
    --> B[Collect Weather Data]

    B --> C[Temperature]
    B --> D[Humidity]
    B --> E[Wind Speed]
    B --> F[Rainfall]

    C --> G[Historical Dataset]
    D --> G
    E --> G
    F --> G

    G --> H[Machine Learning Model]

    H --> I[Rain / No Rain Prediction]
```

This example demonstrates:

|Data Quality Dimension|Weather Example|
|---|---|
|Accuracy|Correct sensor readings|
|Completeness|Enough years of weather data|
|Consistency|Uniform temperature units|
|Timeliness|Frequent measurements|
|Believability|Trusted meteorological sensors|
|Interpretability|Physically meaningful values|
