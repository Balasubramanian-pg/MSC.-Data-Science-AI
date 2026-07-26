
### **QUESTION 4 (10 Marks)**

**Part (a)**
*   **(i) What is a trend in time-series data? [2 Marks]**
    A trend is the long-term progression or general direction of the data over time. It shows whether the overall values are consistently increasing (upward trend), decreasing (downward trend), or remaining stable over a long period, ignoring short-term fluctuations.
*   **(ii) What is a lag feature? Give one example. [2 Marks]**
    A lag feature is a variable that contains the value of a time-series metric from a prior time step. It helps models understand past behaviors to predict future outcomes.
    *   **Example:** If you are predicting today's ice cream sales, a useful lag feature would be `Sales_Yesterday` (Lag 1) or `Sales_Last_Week` (Lag 7).
*   **(iii) Why should we avoid using future data while creating features? [3 Marks]**
    Using future data (which would not realistically be available at the time of making a prediction) causes a severe issue called **Data Leakage**. It allows the model to "cheat" during training, resulting in artificially high accuracy metrics. However, when deployed in the real world (where the future is unknown), the model will fail drastically.

**Part (b)**
*   **(i) What is Automated Feature Engineering (AutoFE)? [1 Mark]**
    AutoFE is the process of using algorithms and software frameworks to automatically generate, transform, and evaluate hundreds or thousands of features from raw data without manual human intervention.
*   **(ii) Why is an additional step required after AutoFE before building the final model? [2 Marks]**
    AutoFE employs a "brute force" approach, generating massive amounts of features by combining everything. This results in highly correlated, redundant, or purely noisy features. An additional **Feature Selection** step is mandatory to filter out the useless features to prevent overfitting, reduce computational cost, and solve the curse of dimensionality.
