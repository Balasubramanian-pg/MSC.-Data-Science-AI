# 3.7.8. Common Misinterpretations

The simplicity of the variance ratio frequently causes data scientists to misinterpret its exact findings.

### Interpretation 1

>[!Warning]
> "A low Fisher Score proves the feature has no predictive value."

Wrong. 
A low score strictly proves the feature lacks mean-based separation. The feature might still separate the classes beautifully through a non-linear interaction or a differing geometric shape that the variance ratio simply cannot detect.

### Interpretation 2

>[!Warning]
> "The Fisher Score can evaluate feature-to-feature redundancy."

Wrong. 
Unlike Pearson's correlation or Spearman's rank, which can compare two independent features to check for multicollinearity, the Fisher Score exclusively measures a single continuous feature against a categorical target label.

### Interpretation 3

>[!Warning]
> "Because it is computationally fast, it should be the only filter method used."

Wrong. 
Relying exclusively on the Fisher Score leaves a classification model blind to complex informational patterns. The safest workflow pairs the Fisher Score with a non-linear method, such as Mutual Information, to capture signals missed by mean-based separation.
