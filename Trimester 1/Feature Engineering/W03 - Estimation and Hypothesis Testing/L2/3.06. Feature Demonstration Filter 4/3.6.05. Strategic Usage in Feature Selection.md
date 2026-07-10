# 3.6.5. Strategic Usage in Feature Selection

Information theoretic measures operate as a highly effective filter mechanism prior to model training.

The workflow mirrors other filter methods but evaluates information gain rather than linear variance. Data scientists compute the Mutual Information score between every individual feature and the target variable. Because the metric captures arbitrary dependencies, it provides a comprehensive ranking of raw predictive power, regardless of the underlying data distribution.

Once computed, features are ranked in descending order based on their scores. Practitioners then select the top subset of features that yield the highest information gain, safely discarding the features that fail to reduce target uncertainty.
