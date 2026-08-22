**Part (b)**
*   **(i) What is Automated Feature Engineering (AutoFE)? [1 Mark]**
    AutoFE is the process of using algorithms and software frameworks to automatically generate, transform, and evaluate hundreds or thousands of features from raw data without manual human intervention.
*   **(ii) Why is an additional step required after AutoFE before building the final model? [2 Marks]**
    AutoFE employs a "brute force" approach, generating massive amounts of features by combining everything. This results in highly correlated, redundant, or purely noisy features. An additional **Feature Selection** step is mandatory to filter out the useless features to prevent overfitting, reduce computational cost, and solve the curse of dimensionality.
