# 3.5.4. Strategic Usage in Feature Selection

The Chi-Square test operates strictly as a filter method because it evaluates features before the model training phase begins.

Data scientists compute the test statistic for every categorical feature against the categorical target variable. The features are then ranked in descending order based on their generated scores. A higher score indicates a stronger deviation from independence, which directly translates to a higher likelihood that the feature contains valuable predictive information.

>[!Tip]
> Practitioners typically select the "Top K" features based on the highest Chi-Square scores, confidently dropping the remaining independent features to reduce dataset dimensionality.

This filtering mechanism ensures that computational power is focused exclusively on variables that share meaningful information with the target label.
