# 3.5.6. Example of a Chi-Square Calculation

To fully understand how the filter operates, we calculate the statistic for a simplified binary feature and target.

Suppose:

- Observed count for Category A: $$ O_1 = 45 $$
    
- Expected count for Category A: $$ E_1 = 30 $$
    
- Observed count for Category B: $$ O_2 = 15 $$
    
- Expected count for Category B: $$ E_2 = 30 $$
    

### Step 1: Compute Deviation for Category A
$$
45 - 30 = 15
$$

### Step 2: Compute Component for Category A
$$
\frac{15^2}{30} = \frac{225}{30} = 7.5
$$

### Step 3: Compute Deviation for Category B
$$
15 - 30 = -15
$$

### Step 4: Compute Component for Category B
$$
\frac{(-15)^2}{30} = \frac{225}{30} = 7.5
$$

### Step 5: Compute Final Chi-Square Statistic
$$
7.5 + 7.5 = 15.0
$$

**Final Interpretation:** The substantial resulting value indicates a strong deviation from expected frequencies. This feature exhibits dependency with the target and should be retained for model training.
