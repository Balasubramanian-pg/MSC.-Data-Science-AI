# 3.4.7. Example of Rank Correlation Calculation

Suppose:

- $$ n = 5 $$ observations in the sample
    
- The data has been ranked and paired
    
- The calculated differences between ranks yielded: $$ \sum d_i^2 = 4 $$
    
- We must evaluate the monotonic relationship
    

### Step 1: Compute Sample Size Parameter
$$
n(n^2 - 1) = 5(25 - 1) = 120
$$

### Step 2: Compute Scaled Sum of Squares
$$
6 \sum d_i^2 = 6(4) = 24
$$

### Step 3: Compute the Ratio
$$
\frac{24}{120} = 0.2
$$

### Step 4: Subtract the Ratio from One
$$
1 - 0.2 = 0.8
$$

### Step 5: Final Rank Correlation
**$$ \rho = 0.8 $$**

Interpretation: 

The calculation yields a strong positive monotonic relationship, indicating that as one variable increases in rank, the other reliably increases as well.
