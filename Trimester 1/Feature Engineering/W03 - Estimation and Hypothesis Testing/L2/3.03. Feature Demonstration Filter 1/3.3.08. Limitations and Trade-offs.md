# 3.3.8. Limitations and Trade-offs

While computationally fast and highly interpretable, Pearson's correlation possesses significant mathematical blind spots that can undermine a feature selection strategy.

### 8.1 Linearity Constraint
Pearson's correlation exclusively captures linear patterns. If a feature exhibits a perfectly predictable U-shaped or quadratic relationship with the target variable, the computed correlation metric might still result in $$0.0$$. The method is entirely blind to non-linear complexities.

### 8.2 Outlier Sensitivity
Because the formula relies heavily on the means and standard deviations of the distributions, extreme anomalous values can artificially inflate or deflate the resulting coefficient. A single severe outlier can distort the covariance calculation, leading to the incorrect retention or deletion of a feature.

### 8.3 Independent Evaluation
Filter methods traditionally evaluate each feature in isolation. This paradigm fails to capture complex interactive effects. A specific feature might demonstrate zero correlation with the target independently, but when combined with a secondary feature, it might unlock a highly predictive combined signal. 

These limitations often lead to widespread misunderstandings regarding what the metric actually signifies.
