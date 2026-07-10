# 3.5.1. Evaluating Categorical Dependencies

In the domain of feature selection, data scientists frequently encounter variables that do not exist on a continuous numerical scale. 

While correlation metrics excel at evaluating continuous data, they are fundamentally incapable of assessing categorical or nominal features. Categorical data defines distinct groups or classes, such as geographic regions, product categories, or binary outcomes. To properly evaluate the predictive power of these distinct groups, we require a different statistical framework. 

This requirement introduces the Chi-Square test, a powerful statistical filter method specifically designed to evaluate the association between categorical variables.
