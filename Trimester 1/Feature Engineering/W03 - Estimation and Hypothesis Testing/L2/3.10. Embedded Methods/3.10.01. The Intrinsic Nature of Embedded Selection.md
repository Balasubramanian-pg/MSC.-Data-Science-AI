# 3.10.1. The Intrinsic Nature of Embedded Selection

While wrapper methods evaluate subsets by training the estimator repeatedly from scratch, embedded methods perform feature selection as an intrinsic part of the training process itself. 

Rather than treating the predictive algorithm as a disconnected black box, embedded methods leverage the internal optimization mechanics of the model to simultaneously assess feature importance while fitting the data. This integration makes embedded methods highly computationally efficient and deeply model-aware, capturing synergistic feature interactions that isolated filter methods completely ignore.
