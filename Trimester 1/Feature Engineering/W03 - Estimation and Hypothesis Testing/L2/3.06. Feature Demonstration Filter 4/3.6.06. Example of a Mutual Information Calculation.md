# 3.6.6. Example of a Mutual Information Calculation

To operationalize this theoretical framework, we calculate the information gain for a hypothetical feature. 

Suppose:

- Total target entropy: $$H(Y) = 1.25$$
- Conditional entropy given feature: $$H(Y|X) = 0.45$$
- The predefined minimum selection threshold is $$0.50$$

### Step 1: Identify Initial Target Uncertainty
$$
H(Y) = 1.25
$$

### Step 2: Identify Conditional Uncertainty
$$
H(Y|X) = 0.45
$$

### Step 3: Compute Information Gain
$$
1.25 - 0.45 = 0.80
$$

### Step 4: Evaluate Against Threshold
$$
0.80 > 0.50
$$

### Step 5: Final Selection Decision
**Retain the feature**

Because the feature removes a substantial block of uncertainty, it exceeds the threshold and is selected for the final predictive model.
