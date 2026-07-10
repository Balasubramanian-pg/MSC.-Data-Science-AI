# 3.7.4. Strategic Usage in Feature Selection

Operating entirely independent of the final predictive model, the Fisher Score serves as a high-speed filter mechanism.

During the feature engineering phase, data scientists isolate each continuous numerical feature and compute its Fisher Score against the categorical target variable. Because the formula relies purely on basic aggregations—means and variances—the computation is incredibly fast, making it highly suitable for massive, high-dimensional datasets. 

Once the scores are calculated, the features are ranked in descending order. Practitioners retain the top subset of features that exhibit the highest separation ratios, confidently discarding the remaining features that suffer from overlapping means or excessive internal variance.
