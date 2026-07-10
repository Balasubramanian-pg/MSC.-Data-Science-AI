# 3.5.9. Conclusions

The Chi-Square test provides a mathematically rigorous foundation for selecting categorical features, allowing data scientists to isolate predictive signals within grouped data.

### 9.1. Anatomy of the Chi-Square Statistic

The core computation evaluates the scaled variance between reality and statistical expectation:

$$
\chi^2 = \sum \frac{(O - E)^2}{E}
$$

By prioritizing features that generate large sums, we filter out independent variables that offer no predictive value to the target.

### 9.2. Categorical Filter Summary

Selecting the appropriate filter depends entirely on the data types present in the dataset. The following table contrasts the Chi-Square test against continuous correlation methods.

| **Filter Method** | **Feature Data Type** | **Target Data Type** |
|----------|----------|----------|
| Pearson Correlation | Continuous | Continuous |
| Spearman Rank | Continuous/Ordinal | Continuous/Ordinal |
| Chi-Square Test | Categorical | Categorical |

When executing a first-pass dimensionality reduction on a high-dimensional categorical dataset, the Chi-Square test serves as the optimal mathematical tool for ensuring model efficiency.
