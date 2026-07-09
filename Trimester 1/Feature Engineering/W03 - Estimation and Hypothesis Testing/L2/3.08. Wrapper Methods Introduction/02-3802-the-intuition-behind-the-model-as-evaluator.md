# 3.8.2. The Intuition Behind the Model-as-Evaluator

Wrapper methods represent a category of feature selection techniques that directly incorporate the chosen machine learning algorithm into the evaluation process. 

Unlike filter methods which use mathematical proxies, wrapper methods "wrap" the feature selection process around the training and evaluation phases of a specific model. In this framework, the machine learning model itself serves as the final judge of feature quality. The model is trained on a subset of features, and its performance on a validation set dictates whether those features are retained or discarded.

>[!Note]
> The fundamental philosophy of wrapper methods is that the best feature subset is the one that produces the highest accuracy for the specific algorithm being used.

By directly optimizing the final performance metric, wrapper methods inherently align the feature selection process with the ultimate goal of the machine learning pipeline.
