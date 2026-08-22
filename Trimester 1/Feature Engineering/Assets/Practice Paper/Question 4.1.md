
### **QUESTION 4 (10 Marks)**

**Part (a)**
*   **(i) What is a trend in time-series data? [2 Marks]**
    A trend is the long-term progression or general direction of the data over time. It shows whether the overall values are consistently increasing (upward trend), decreasing (downward trend), or remaining stable over a long period, ignoring short-term fluctuations.
*   **(ii) What is a lag feature? Give one example. [2 Marks]**
    A lag feature is a variable that contains the value of a time-series metric from a prior time step. It helps models understand past behaviors to predict future outcomes.
    *   **Example:** If you are predicting today's ice cream sales, a useful lag feature would be `Sales_Yesterday` (Lag 1) or `Sales_Last_Week` (Lag 7).
*   **(iii) Why should we avoid using future data while creating features? [3 Marks]**
    Using future data (which would not realistically be available at the time of making a prediction) causes a severe issue called **Data Leakage**. It allows the model to "cheat" during training, resulting in artificially high accuracy metrics. However, when deployed in the real world (where the future is unknown), the model will fail drastically.


