# 3.7.1. Evaluating Class Separability

While methods like Mutual Information and Pearson's correlation evaluate broad statistical dependencies, machine learning classification tasks demand a more specialized approach. 

In classification problems, the fundamental goal is to distinguish between distinct, non-overlapping categories. Therefore, a highly predictive feature must possess a specific geometric property: it must effectively separate the target classes within the mathematical feature space. 

To evaluate this specific property, data scientists utilize the Fisher Score. The Fisher Score is a classic, highly efficient filter method specifically designed for classification tasks. It measures a continuous feature's discriminative power by mathematically evaluating how well its numerical values pull different target classes apart.
