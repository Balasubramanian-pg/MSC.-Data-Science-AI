# 3.11.9. The Most Common Misinterpretations

Because feature engineering blends domain intuition with rigorous linear algebra, critical conceptual failures are common.

### 9.1 Interpretation 1

>[!Warning]
> "Providing the algorithm with more engineered features always guarantees a more accurate model."

Wrong.
Injecting an excessive number of features geometrically inflates the parameter space, invoking the curse of dimensionality. This strictly leads to algorithmic memorization of noise rather than learning underlying signals.

### 9.2 Interpretation 2

>[!Warning]
> "Filter methods can successfully identify powerful synergistic interactions between variables."

Wrong.
Standard filter methods, particularly linear correlation, evaluate variables in absolute isolation. A feature that appears statistically useless on its own might be highly predictive when mathematically multiplied by another feature, a property filters cannot natively detect.

### 9.3 Interpretation 3

>[!Warning]
> "Wrapper methods are completely immune to overfitting."

Wrong.
Because wrapper methods repeatedly test subsets against the exact same training matrix, they frequently select a specific combination of variables perfectly over-optimized to the training noise, leading to catastrophic failure during real-world deployment.
