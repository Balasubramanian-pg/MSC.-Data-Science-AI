
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
