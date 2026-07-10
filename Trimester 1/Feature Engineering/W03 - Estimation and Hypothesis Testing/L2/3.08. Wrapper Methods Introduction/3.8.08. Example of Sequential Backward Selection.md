# 3.8.8. Example of Sequential Backward Selection

To illustrate the top-down mechanics of SBS, we evaluate a similar hypothetical search.

Suppose:

- Initial feature set = {Alpha, Beta, Gamma}
- Target subset size = 2
- Base model = Decision Tree
- Evaluation metric = F1-Score

### Step 1: [Evaluate Complete Set]
F1-Score for {Alpha, Beta, Gamma} = 0.85

### Step 2: [Evaluate Feature Removals]
F1-Score without Alpha (Subset {Beta, Gamma}) = 0.72
F1-Score without Beta (Subset {Alpha, Gamma}) = 0.88
F1-Score without Gamma (Subset {Alpha, Beta}) = 0.81

### Step 3: [Identify Least Valuable Feature]
Removing Beta improved the score from 0.85 to 0.88.

### Step 4: [Execute Feature Elimination]
Dropped Feature = Beta

### Step 5: [Establish Final Subset]
Final Selected Subset = {Alpha, Gamma}
