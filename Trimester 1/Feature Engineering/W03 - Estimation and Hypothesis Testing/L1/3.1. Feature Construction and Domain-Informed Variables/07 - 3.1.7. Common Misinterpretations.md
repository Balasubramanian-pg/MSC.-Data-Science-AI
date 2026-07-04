# 3.1.7. Common Misinterpretations

Many practitioners fall into predictable traps when constructing features, leading to degraded model performance.

### Interpretation 1

>[!Warning]
> **More features always lead to better predictive accuracy.**

Wrong. 

Adding irrelevant or highly correlated constructed features increases the curse of dimensionality, causing the model to overfit to noise rather than learning the underlying signal.

### Interpretation 2

>[!Warning]
> **Automated feature generation tools can replace human domain expertise.**

Wrong under complex real-world conditions. 

While automated tools can generate thousands of polynomial combinations, they lack the contextual awareness to know which combinations are physically or economically impossible, leading to nonsensical models.

### Interpretation 3

>[!Warning]
> **Interaction terms are always beneficial for linear models.**

Not necessarily. 

If the two base features are already highly correlated, their interaction term will introduce severe multicollinearity, destabilizing the coefficient estimates and making the model highly sensitive to minor data shifts.
