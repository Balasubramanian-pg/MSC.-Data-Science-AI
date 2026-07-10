# 3.8.6. Example of Sequential Forward Selection

To illustrate the bottom-up mechanics of SFS, we evaluate a small hypothetical dataset.

Suppose:

- Available features = {Age, Income, Debt, Tenure}
- Target subset size = 2
- Base model = Logistic Regression
- Evaluation metric = Model Accuracy

### Step 1: [Initialize Search Space]
Starting Subset = {}

### Step 2: [Evaluate Individual Features]
Model Accuracy for Age = 62%
Model Accuracy for Income = 71%
Model Accuracy for Debt = 65%
Model Accuracy for Tenure = 59%

### Step 3: [Select First Optimal Feature]
Selected Subset = {Income}

### Step 4: [Evaluate Feature Pairs]
Model Accuracy for {Income, Age} = 74%
Model Accuracy for {Income, Debt} = 82%
Model Accuracy for {Income, Tenure} = 70%

### Step 5: [Select Final Optimal Subset]
Final Selected Subset = {Income, Debt}
