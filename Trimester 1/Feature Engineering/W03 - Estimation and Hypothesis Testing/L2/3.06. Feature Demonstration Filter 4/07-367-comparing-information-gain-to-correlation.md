# 3.6.7. Comparing Information Gain to Correlation

While Mutual Information is exceptionally powerful, it differs fundamentally from traditional correlation metrics in two specific ways.

### 7.1 Absolute Dependency Measurement
Correlation measures the direction and strength of a trend. Mutual Information strictly measures the magnitude of dependence. A high Mutual Information score confirms that a relationship exists, but it offers absolutely zero insight into the geometric shape or direction of that relationship. 

### 7.2 Non-Negative Bounding
Unlike Pearson's correlation, which is bounded between $$-1.0$$and$$1.0$$, Mutual Information is strictly non-negative. Because it is impossible for a feature to increase the total inherent randomness of a target variable, the score can never drop below zero.
