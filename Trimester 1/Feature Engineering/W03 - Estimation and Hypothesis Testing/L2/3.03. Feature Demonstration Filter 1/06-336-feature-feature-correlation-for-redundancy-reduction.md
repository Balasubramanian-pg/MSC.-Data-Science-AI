# 3.3.6. Feature-Feature Correlation for Redundancy Reduction

The secondary application of Pearson's correlation evaluates relationships between the features themselves to eliminate **multicollinearity**.

Multicollinearity occurs when two or more independent variables are highly correlated with each other. If two features possess an exceptionally high correlation, they are effectively providing redundant information to the model. 

>[!Tip] 
> Dropping one feature from a highly correlated pair reduces model complexity and prevents coefficient instability in linear algorithms.

In a multiple linear regression scenario, for example, the algorithm will struggle to assign appropriate independent weights to identical signals. By calculating a correlation matrix comparing all features against one another, practitioners can identify and remove redundant variables before training begins.
