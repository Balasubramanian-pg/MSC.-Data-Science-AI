# 3.9.11. Common Misinterpretations

Due to the complex nature of model-centric optimization, several conceptual traps exist.

### Interpretation 1

>[!Warning]
> "SFS and SBS will eventually converge on the exact same feature subset."

Wrong. 
Because they start from opposite ends of the search space and make irreversible greedy decisions, SFS and SBS frequently yield entirely different final feature subsets.

### Interpretation 2

>[!Warning]
> "Wrapper methods prevent overfitting by removing bad features."

Wrong. 
Wrapper methods carry an extreme risk of overfitting to the validation data. By evaluating thousands of combinations against the exact same validation set, the algorithm can easily select features that model the noise rather than the signal.

### Interpretation 3

>[!Warning]
> "These methods eliminate the need for cross-validation."

Wrong. 
Because of the severe overfitting risk, the evaluation metric:

$$
J(X)
$$

must be calculated using rigorous k-fold cross-validation at every single step, which further explodes the required computational cost.
