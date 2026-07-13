# Visual Understanding of Outliers

The lecture describes outliers using a two-dimensional dataset.

Most observations cluster together while a few isolated points lie far away.

```mermaid
flowchart TD
    A[Dense Cluster of Normal Points]
    --> B[Far Isolated Observation]

    B --> C[Potential Outlier]
```

Conceptually:

|Point Type|Position|
|---|---|
|Normal Data|Near cluster center|
|Outlier|Far from cluster|

Outlier detection algorithms attempt to quantify this separation mathematically.
