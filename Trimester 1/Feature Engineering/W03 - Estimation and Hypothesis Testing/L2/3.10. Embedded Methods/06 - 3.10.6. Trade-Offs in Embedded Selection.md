# 3.10.6. Trade-Offs in Embedded Selection

The implementation of embedded selectors introduces specific computational advantages and methodological limitations.

### 6.1 Computational Scalability
Because the selection executes simultaneously with the parameter optimization, embedded methods bypass the exponential computational cost of wrapper methods. They remain highly viable for massive, high-dimensional matrices.

### 6.2 Model Awareness
The feature importance ranking strictly considers how the variables interact within that specific model's architecture. It natively captures the non-linear dependencies required by the algorithm.

### 6.3 Architectural Dependency
The primary limitation is transferability. The feature subset deemed optimal by a Random Forest might completely fail when mapped into a Logistic Regression estimator, as different models prioritize different geometric configurations.
