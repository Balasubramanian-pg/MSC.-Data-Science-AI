# 3.4.8. Robustness to Outliers

One of the most critical advantages of rank-based correlation over raw-value calculation is severe outlier suppression.

Because Spearman’s framework utilizes assigned ranks rather than raw values, extreme mathematical anomalies have significantly reduced impact on the final coefficient. If a dataset contains typical values ranging from $$10$$ to $$50$$, and suddenly encounters an extreme outlier of $$1,000,000$$, the rank conversion simply assigns the outlier the highest sequential rank.

The massive numerical distance of the outlier is completely neutralized by the ordinal ranking system, making this filter method exceptionally stable for noisy, uncleaned data.
