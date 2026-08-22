### **QUESTION 2 (10 Marks)**

**Part (a)**
*   **(i) What is feature selection? [3 Marks]**
    Feature selection is the process of choosing a subset of the most relevant and important features from the original dataset to use in model training. It helps to improve model accuracy, reduce training time, combat the "curse of dimensionality," and prevent overfitting by eliminating irrelevant or redundant data.
*   **(ii) Issue with `Temperature_Celsius` and `Temperature_Fahrenheit` and what should be done? [3 Marks]**
    *   **Issue:** Multicollinearity (Perfect correlation). These two features represent the exact same physical information, just on different scales. Using both adds redundant information, which can confuse certain algorithms (like linear regression) and unnecessarily increase model complexity.
    *   **Solution:** Drop one of the features. Keep either Celsius or Fahrenheit, but not both.

