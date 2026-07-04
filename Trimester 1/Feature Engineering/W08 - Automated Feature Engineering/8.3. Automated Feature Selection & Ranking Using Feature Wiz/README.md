---
title: W08 - Automated Feature Engineering
module: Statistical Modelling And Inferencing
week: W08 - Automated Feature Engineering
---

## [Automated Feature Engineering: SULOV and Recursive Elimination](./Automated%20Feature%20Engineering%20-%20SULOV%20and%20Recursive%20Elimination.md)

## [1. Concept Introduction](./1.%20Concept%20Introduction.md)

## [2. Intuition: Why not just use correlation?](./2.%20Intuition%20-%20Why%20not%20just%20use%20correlation.md)

## [3. Mathematical Formulation](./3.%20Mathematical%20Formulation.md)

## [4. Visual Intuition: The Architecture](./4.%20Visual%20Intuition%20-%20The%20Architecture.md)

## [5. Python Implementations](./5.%20Python%20Implementations.md)

## [Example Usage:](./Example%20Usage%20-.md)

## [X_train, y_train = load_my_data()](./X_train%2C%20y_train%20%3D%20load_my_data%28%29.md)

## [optimized_features = manual_sulov(X_train, y_train, corr_limit=0.75)](./optimized_features%20%3D%20manual_sulov%28X_train%2C%20y_train%2C%20corr_limit%3D0.75%29.md)

## [Assume df is our wide dataset containing categorical and numerical features](./Assume%20df%20is%20our%20wide%20dataset%20containing%20categorical%20and%20numerical%20features.md)

## [Assume 'target' is a binary classification target (0 or 1)](./Assume%20%27target%27%20is%20a%20binary%20classification%20target%20%280%20or%201%29.md)

## [Initialize the FeatureWiz pipeline](./Initialize%20the%20FeatureWiz%20pipeline.md)

## [Fit and transform the training data](./Fit%20and%20transform%20the%20training%20data.md)

## [Note: FeatureWiz internally splits data to evaluate the XGBoost model without overfitting](./Note%20-%20FeatureWiz%20internally%20splits%20data%20to%20evaluate%20the%20XGBoost%20model%20without%20overfitting.md)

## [Transform the test data using the learned features](./Transform%20the%20test%20data%20using%20the%20learned%20features.md)

## [Extract the final list of features chosen by the meta-algorithm](./Extract%20the%20final%20list%20of%20features%20chosen%20by%20the%20meta-algorithm.md)

## [6. Common Mistakes and Trade-offs](./6.%20Common%20Mistakes%20and%20Trade-offs.md)

## [7. Interview-Style Insights](./7.%20Interview-Style%20Insights.md)

## [8. Summary & Key Takeaways](./8.%20Summary%20%26%20Key%20Takeaways.md)
