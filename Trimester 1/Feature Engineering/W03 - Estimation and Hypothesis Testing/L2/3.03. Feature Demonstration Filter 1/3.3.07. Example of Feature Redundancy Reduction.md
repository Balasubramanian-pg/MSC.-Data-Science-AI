# 3.3.7. Example of Feature Redundancy Reduction

To operationalize the redundancy reduction strategy, we apply the mathematical formula to a hypothetical dataset.

Suppose:

- Feature $$X$$ represents "tenure in months"
- Feature $$Y$$ represents "total lifetime charges"
- Covariance $$\text{cov}(X, Y) = 2450.0$$
- Standard deviation $$\sigma_x = 24.5$$
- Standard deviation $$\sigma_y = 110.0$$
- Redundancy removal threshold = $$0.85$$

### Step 1: Extract Covariance
$$
\text{cov}(X, Y) = 2450.0
$$

### Step 2: Compute Product of Standard Deviations
$$
\sigma_x \sigma_y = 24.5 \times 110.0 = 2695.0
$$

### Step 3: Compute Pearson's Correlation  
$$
r_{xy} = \frac{2450.0}{2695.0} \approx 0.909
$$

### Step 4: Evaluate Against Redundancy Threshold
$$
0.909 > 0.85
$$

### Step 5: Final Selection Decision
**Drop feature $$Y$$** from the dataset to eliminate redundant information.

This straightforward computation allows for rapid pruning of the dataset. However, relying exclusively on this filter metric presents certain risks.
