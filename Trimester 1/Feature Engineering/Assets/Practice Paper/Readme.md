Here are the comprehensive, step-by-step solutions for the Feature Engineering model question paper.

---

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

### **QUESTION 2 (10 Marks)**

**Part (a)**
*   **(i) What is feature selection? [3 Marks]**
    Feature selection is the process of choosing a subset of the most relevant and important features from the original dataset to use in model training. It helps to improve model accuracy, reduce training time, combat the "curse of dimensionality," and prevent overfitting by eliminating irrelevant or redundant data.
*   **(ii) Issue with `Temperature_Celsius` and `Temperature_Fahrenheit` and what should be done? [3 Marks]**
    *   **Issue:** Multicollinearity (Perfect correlation). These two features represent the exact same physical information, just on different scales. Using both adds redundant information, which can confuse certain algorithms (like linear regression) and unnecessarily increase model complexity.
    *   **Solution:** Drop one of the features. Keep either Celsius or Fahrenheit, but not both.

**Part (b)**
*   **(i) What is the purpose of dimensionality reduction? [1 Mark]**
    The purpose is to reduce the number of input variables (dimensions) in a dataset while retaining as much of the underlying meaningful variance and information as possible.
*   **(ii) Choose one method and explain how it reduces features. [3 Marks]**
    *   **Method:** Principal Component Analysis (PCA).
    *   **Explanation:** PCA looks at the correlations between all original features and mathematically transforms them into a new, smaller set of independent variables called "Principal Components." These new components are ranked by how much variance (information) they capture from the original data. By keeping only the top few components, PCA reduces the feature count while keeping the most important patterns intact.

---

### **QUESTION 3 (10 Marks)**

**Part (a)**
*   **(i) What are the limitations of Bag of Words (BoW)? [3 Marks]**
    1.  **Ignores Context and Word Order:** BoW treats text as an unordered collection, so "The dog bit the man" and "The man bit the dog" have the exact same representation.
    2.  **Sparsity:** It creates massive, high-dimensional matrices where most values are zero (since most documents only use a tiny fraction of the total vocabulary).
    3.  **No Semantic Understanding:** It treats all words as completely independent. It does not recognize that "good" and "great" have similar meanings.
*   **(ii) Why are word embeddings considered better than BoW in some cases? [3 Marks]**
    Word embeddings (like Word2Vec or GloVe) map words to dense, low-dimensional vectors. They are better because they capture **semantic meaning and context**—words with similar meanings are placed close together in the vector space. Additionally, they solve the sparsity problem by using fixed-size dense arrays instead of massive sparse matrices.

**Part (b)**
*   **(i) What is an edge in an image? [2 Marks]**
    An edge is a boundary or a region in an image where there is a sharp, sudden change in brightness, color, or pixel intensity. Edges typically correspond to the boundaries of objects, shadows, or structural changes in the scene.
*   **(ii) Why is smoothing (noise removal) important before feature extraction in images? [2 Marks]**
    Real-world images contain "noise" (random variations in pixel color/brightness due to camera sensors or lighting). Edge detection algorithms look for sudden pixel changes. If noise is not smoothed out (e.g., using Gaussian blur), the algorithm will mistakenly detect this noise as hundreds of fake edges, ruining the extraction process.

---

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
