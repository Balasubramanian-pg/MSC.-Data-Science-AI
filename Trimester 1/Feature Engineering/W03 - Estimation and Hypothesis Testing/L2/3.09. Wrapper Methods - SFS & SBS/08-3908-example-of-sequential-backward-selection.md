# 3.9.8. Example of Sequential Backward Selection

Suppose:

- Starting feature set = {X1, X2, X3}
- Target number of features = 2
- Evaluation metric = R-squared
- Base Model = Linear Regression

### Step 1: [Evaluate Complete Set]
R-squared({X1, X2, X3}) = 0.88

### Step 2: [Evaluate Individual Removals]
R-squared without X2 = 0.89

### Step 3: [Identify Least Valuable Feature]
0.89 > 0.88

### Step 4: [Execute Pruning]
Dropped feature = X2

### Step 5: [Establish Final Subset]
Final subset = {X1, X3}
