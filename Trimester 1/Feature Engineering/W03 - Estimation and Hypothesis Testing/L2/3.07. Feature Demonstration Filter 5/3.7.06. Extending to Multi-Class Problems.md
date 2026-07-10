# 3.7.6. Extending to Multi-Class Problems

While natively formulated for binary targets, the logic of the Fisher Score scales seamlessly to complex multi-class scenarios. 

When a dataset contains more than two target classes, the formula must account for the global variance of the entire dataset. In a multi-class configuration, the numerator calculates the variance of each individual class mean against the overall global mean. The denominator continues to sum the internal variances of all individual classes. 

This scaled approach allows the metric to penalize features where multiple class clusters collapse into one another, ensuring clear separation remains the priority regardless of the target's complexity.
