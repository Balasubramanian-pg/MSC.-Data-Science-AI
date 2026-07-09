# 3.11.7. Example of Feature Filtering via Fisher Score

To illustrate the mathematical screening of a new feature, we evaluate a constructed metric against a binary classification target.

Suppose:

- Target classes = Group A and Group B
- Mean of the constructed feature in Group A = 12.0
- Mean of the constructed feature in Group B = 20.0
- Variance of the feature in Group A = 4.0
- Variance of the feature in Group B = 4.0

### Step 1: Calculate Between-Class Variance
$$
\sigma_{between}^2 = (20.0 - 12.0)^2 = 8.0^2 = 64.0
$$

### Step 2: Calculate Within-Class Variance Sum
$$
\sigma_{within}^2 = 4.0 + 4.0 = 8.0
$$

### Step 3: Formulate Fisher Score Ratio
$$
F = \frac{64.0}{8.0}
$$

### Step 4: Compute Final Score
$$
F = 8.0
$$

### Step 5: Decision Evaluation
**Feature Retained.** A large Fisher score strictly confirms that the constructed variable provides a massive, easily separable signal between the two target classes.
