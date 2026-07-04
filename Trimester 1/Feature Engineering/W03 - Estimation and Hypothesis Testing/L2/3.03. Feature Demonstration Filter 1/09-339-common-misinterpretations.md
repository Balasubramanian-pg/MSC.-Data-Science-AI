# 3.3.9. Common Misinterpretations

When utilizing Pearson's correlation, practitioners frequently make conceptual errors. 

### Interpretation 1
>[!Warning]
> "A correlation of zero means the variables are entirely independent."

Wrong. A correlation of zero strictly implies there is no *linear* relationship. The variables could still share a deterministic, non-linear relationship.

### Interpretation 2
>[!Warning]
> "A high correlation confirms that the feature causes the target variable to change."

Wrong. Correlation measures statistical association, not causal mechanics. Confounding hidden variables can easily cause two entirely unrelated features to exhibit identical linear movements.

### Interpretation 3
>[!Warning]
> "We should always keep the feature with the highest correlation and discard the rest."

Wrong. If the highest correlated feature also exhibits extreme multicollinearity with the remaining dataset, retaining it without evaluating feature-to-feature redundancy can irreparably damage the stability of a linear model.
