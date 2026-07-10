# 3.9.1. The Wrapper Philosophy

Filter methods evaluate features using statistical proxies, completely separated from the final predictive algorithm. While computationally efficient, this separation creates a fundamental disconnect. A feature might possess strong statistical variance but fail to improve the specific decision boundary of a machine learning model.

Wrapper methods resolve this disconnect by treating the machine learning model itself as a black-box evaluator.

>[!Note]
> Wrapper methods evaluate feature subsets based strictly on the actual predictive performance they generate within the chosen algorithm.

This approach guarantees that the selected features are mathematically optimized for the specific model being deployed. However, this model-centric optimization introduces severe computational challenges.
