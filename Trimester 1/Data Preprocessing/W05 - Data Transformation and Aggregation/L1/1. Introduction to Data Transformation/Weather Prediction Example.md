# Weather Prediction Example

The lecture repeatedly uses weather prediction to explain transformation intuitively.

Suppose the objective is:

> Predict whether it will rain tomorrow.

To answer this, multiple environmental variables must be collected.

|Parameter|Source|
|---|---|
|Humidity|Sensor|
|Temperature|Sensor|
|Wind Speed|Sensor|
|Wind Direction|Sensor|

The system gathers these physical measurements from the environment and stores them digitally.

```mermaid
flowchart LR
    A[Physical Environment]
    --> B[Sensor Collection]

    B --> C[Humidity]
    B --> D[Temperature]
    B --> E[Wind Speed]
    B --> F[Wind Direction]

    C --> G[Raw Dataset]
    D --> G
    E --> G
    F --> G
```
