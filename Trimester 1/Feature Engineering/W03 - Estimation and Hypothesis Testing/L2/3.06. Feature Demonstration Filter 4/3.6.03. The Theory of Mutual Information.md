# 3.6.3. The Theory of Mutual Information

While entropy measures the total uncertainty of a single variable, Mutual Information evaluates the shared information between two variables. 

Mutual Information quantifies the exact reduction in uncertainty about a target variable when we are given knowledge of a specific feature. It measures informational dependency. If knowing the value of a feature drastically reduces our uncertainty regarding the target outcome, that feature contains massive predictive signal. 

>[!Note]
> Unlike correlation, Mutual Information makes zero assumptions regarding the shape of the data. It is entirely capable of capturing complex, arbitrary dependencies that traditional linear models completely miss.

If the Mutual Information score is zero, it strictly implies that the feature and the target are completely independent.
