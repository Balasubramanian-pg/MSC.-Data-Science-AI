# 3.9.6. Sequential Backward Selection (SBS)

Sequential Backward Selection represents the exact inverse of the bottom-up approach. It is a top-down search strategy.

Rather than starting empty, SBS begins with the complete dataset containing all available features. In the first iteration, the algorithm temporarily removes each feature one by one, training a new model for every removal.

The algorithm identifies the specific feature whose absence causes the least harm to the model's performance. In cases where the dataset contains heavy noise, removing a feature might actually improve the overall performance. The identified feature is permanently discarded.

This pruning process repeats iteratively, stripping away non-predictive variables until the desired feature count is achieved.
