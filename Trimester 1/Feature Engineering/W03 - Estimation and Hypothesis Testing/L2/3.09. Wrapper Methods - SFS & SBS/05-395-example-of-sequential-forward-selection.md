# 3.9.5. Example of Sequential Forward Selection

Suppose:

- Total available features = {A, B, C, D}
- Target number of features = 2
- Evaluation metric = Model Accuracy
- Base Model = Logistic Regression

### Step 1: [Initialize Search Space]
Starting subset = {}

### Step 2: [Evaluate Individual Features]
Accuracy(B) = 0.72

### Step 3: [Select First Feature]
Current subset = {B}

### Step 4: [Evaluate Combinations]
Accuracy({B, C}) = 0.82

### Step 5: [Select Final Subset]
Final subset = {B, C}
