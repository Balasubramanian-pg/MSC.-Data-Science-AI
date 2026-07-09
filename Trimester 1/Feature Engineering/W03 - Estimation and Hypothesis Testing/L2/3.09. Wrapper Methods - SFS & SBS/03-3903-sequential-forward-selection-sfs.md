# 3.9.3. Sequential Forward Selection (SFS)

Sequential Forward Selection is a bottom-up search strategy.

The algorithm begins with an entirely empty feature set. In the first iteration, it evaluates every single feature individually by training a separate model for each. It permanently adds the single feature that provides the greatest improvement to a predefined performance metric, such as cross-validated accuracy.

In the second iteration, the algorithm pairs the newly selected feature with every remaining unused feature. It trains a new batch of models and again selects the combination that maximizes performance.

>[!Tip]
> Sequential Forward Selection greedily builds the best subset by adding the strongest independent contributor at each individual step.

This continuous loop terminates only when a predefined target number of features is reached, or when adding additional features yields no further improvement to the model.
