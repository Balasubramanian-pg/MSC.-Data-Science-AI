### **QUESTION 1 (10 Marks)**

**Part (a)**
*   **(i) What is the main goal of feature extraction? [1 Mark]**
    The main goal of feature extraction is to transform raw, high-dimensional, or unstructured data into a compact, numerical representation (a set of features) that a machine learning model can process, while preserving the most important and relevant information.
*   **(ii) Give two types of data where feature extraction is mandatory and briefly state why it is required in each case. [2 Marks]**
    1.  **Text Data (NLP):** Machine learning models only compute numbers, not words. Text must be extracted into numerical vectors (e.g., Bag of Words, Word Embeddings) so algorithms can process them.
    2.  **Image Data (Computer Vision):** Images are stored as massive grids of pixel intensities. Feature extraction is needed to identify meaningful patterns (like edges, corners, or textures) instead of forcing the model to learn from raw millions of pixels. *(Note: Audio data is also a correct alternative).*
*   **(iii) Explain why raw data is often not directly usable by machine learning models. [2 Marks]**
    Raw data is rarely ready for ML models because it often contains missing values, outliers, and noise. Furthermore, it might exist in incompatible formats (like strings, dates, or JSON) or varying scales. Machine learning models are mathematical functions that require clean, standardized, structured numerical matrices to learn patterns effectively.

**Part (b)**
*   **(i) What is feature construction? [2 Marks]**
    Feature construction is the manual process of creating new features from existing raw data to highlight underlying patterns or relationships. It involves applying mathematical formulas, domain knowledge, or logical operations to combine or transform variables, thereby increasing the predictive power of the model.
*   **(ii) Suggest one new feature from `MonthlyIncome` and `MonthlyExpense` and explain its usefulness. [3 Marks]**
    *   **Constructed Feature:** `Savings` (Calculated as `MonthlyIncome` - `MonthlyExpense`) or `SavingsRatio` (Calculated as `Savings` / `MonthlyIncome`).
    *   **Usefulness:** This feature explicitly represents a person's disposable income and financial health. In a use case like predicting loan default, a person's actual remaining money (`Savings`) is a far stronger and more direct predictor of their ability to repay a loan than looking at their income and expenses separately.

---

