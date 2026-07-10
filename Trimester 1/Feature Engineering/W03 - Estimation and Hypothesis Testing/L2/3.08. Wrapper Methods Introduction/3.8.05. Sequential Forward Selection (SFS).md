# 3.8.5. Sequential Forward Selection (SFS)

To avoid evaluating every possible subset, data scientists deploy sequential search strategies. The most common "bottom-up" approach is Sequential Forward Selection (SFS).

Sequential Forward Selection begins with an entirely empty feature set. During the first iteration, the algorithm trains a separate model for every single available feature and selects the one that produces the highest performance metric. In the second iteration, the algorithm pairs the first selected feature with every remaining feature, training new models to find the optimal pair. 

This forward-building process repeats continuously. The algorithm adds exactly one feature per step, strictly choosing the feature that provides the greatest immediate boost to model performance. The loop terminates when a target feature count is reached or when adding new features ceases to improve the evaluation metric.
