# Why Normalization is Necessary

Suppose one attribute ranges between:

$$
1 \to 10
$$

while another ranges between:

$$
1000 \to 1,000,000
$$

Even if the first attribute is more informative, the second attribute dominates calculations because of its larger numerical magnitude.

The lecture emphasizes:

> Magnitude influences machine learning behavior.

Normalization prevents this dominance.

```mermaid
flowchart LR
    A[Unequal Feature Magnitudes]
    --> B[Normalization]

    B --> C[Balanced Feature Influence]

    C --> D[Improved Learning]
```
