# 3.8.4. Feature Interactions and Combined Signal

The primary strategic advantage of absorbing this high computational cost is the ability to capture complex feature interactions. 

Filter methods traditionally evaluate each feature in isolation. If two independent features appear statistically weak when evaluated independently, a filter method will discard both. However, these features might possess a powerful combined signal that only emerges when they interact within a predictive model.

>[!Tip] 
> Wrapper methods excel at discovering hidden interactions because they evaluate the predictive power of combinations, rather than individual variables.

If two weak features perfectly complement one another to separate a decision boundary, a wrapper method will train on that specific combination, record the performance spike, and successfully retain both features.
