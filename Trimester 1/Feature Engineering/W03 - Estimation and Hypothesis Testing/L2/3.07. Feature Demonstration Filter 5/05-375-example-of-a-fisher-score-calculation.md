# 3.7.5. Example of a Fisher Score Calculation

To fully understand the mechanics of the ratio, we calculate the discriminative power of a hypothetical continuous feature for a binary target.

Suppose:

- Mean of the feature for class 0: $$\mu_0 = 12.0$$
    
- Mean of the feature for class 1: $$\mu_1 = 18.0$$
    
- Variance of the feature for class 0: $$\sigma_0^2 = 4.0$$
    
- Variance of the feature for class 1: $$\sigma_1^2 = 5.0$$
    

### Step 1: Calculate Mean Difference
$$
12.0 - 18.0 = -6.0
$$

### Step 2: Calculate Squared Mean Difference (Between-Class)
$$
(-6.0)^2 = 36.0
$$

### Step 3: Calculate Sum of Variances (Within-Class)
$$
4.0 + 5.0 = 9.0
$$

### Step 4: Setup the Fisher Score Ratio
$$
\frac{36.0}{9.0}
$$

### Step 5: Final Fisher Score
**$$4.0$$**

This substantial final score indicates that the distance between the class means is significantly larger than the internal noise of the classes themselves. This feature provides a robust classification signal.
