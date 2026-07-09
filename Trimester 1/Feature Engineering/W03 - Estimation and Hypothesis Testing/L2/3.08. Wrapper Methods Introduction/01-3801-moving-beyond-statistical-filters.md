# 3.8.1. Moving Beyond Statistical Filters

Filter methods evaluate the intrinsic properties of data mathematically, making them ideal as an initial preprocessing step. By relying on correlation, variance, or information theory, filter methods operate entirely independently of any machine learning predictive model. 

However, this independence is also their primary limitation. Because filter methods do not simulate actual learning, they cannot determine how a specific algorithm will react to a given subset of features. A mathematically optimal feature according to a statistical test might perform poorly when fed into an actual decision boundary. 

To bridge the gap between theoretical feature importance and practical model performance, data scientists utilize a fundamentally different approach. This model-centric approach introduces the concept of wrapper methods.
