# 3.7.7. Factors Limiting the Fisher Score

Despite its computational efficiency, the reliance on basic statistical aggregations introduces rigid limitations.

### 7.1 Numeric Focus constraint
The Fisher Score fundamentally requires continuous numerical features. Because it calculates mathematical means and variances, it cannot evaluate raw categorical or text data. Any non-numeric feature must undergo complex mathematical encoding before this specific filter method can be applied.

### 7.2 Distribution Shape Assumptions
The formula strictly assumes that features separate based on a shift in their central tendencies (their means). If two classes possess identical means but wildly different distribution shapes—such as one being tightly clustered while the other forms a massive surrounding ring—the Fisher Score will evaluate to zero. It entirely fails to capture complex, non-linear separations where the centers of the distributions overlap.
