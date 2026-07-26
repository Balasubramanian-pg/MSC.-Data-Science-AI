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
