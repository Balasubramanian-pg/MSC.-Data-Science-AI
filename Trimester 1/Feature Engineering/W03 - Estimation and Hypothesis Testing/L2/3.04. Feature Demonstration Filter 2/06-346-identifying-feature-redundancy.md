# 3.4.6. Identifying Feature Redundancy

The secondary application of rank correlation focuses on eliminating multicollinearity through a feature-to-feature matrix.

By calculating the rank correlation between every independent variable, data scientists can identify monotonic redundancies. If two independent variables exhibit a nearly identical ranking structure, they provide mathematically duplicated information to the predictive model. 

>[!Tip] 
> Dropping one feature from a pair with a highly correlated rank structure reduces dimensionality and prevents unnecessary model complexity.

Identifying this redundancy early allows for the construction of leaner, more efficient machine learning algorithms. We can demonstrate this exact calculation process using a simplified dataset.
