# 3.4.5. Strategic Usage for Feature Selection

The primary application of Spearman’s correlation is evaluating independent predictive power against the target variable.

Since this non-parametric method captures non-linear monotonic patterns, it successfully identifies highly predictive features that linear methods frequently overlook. Many real-world features, such as "years of experience versus total income," exhibit curved but consistently increasing relationships. 

A traditional linear filter method might report an artificially low correlation due to the curvature of the income trajectory. By utilizing rank substitution, Spearman’s correlation successfully captures this critical signal, ensuring valuable predictive features are retained for model training.

However, selecting features solely for their target relationship ignores the underlying interactions between the features themselves.
