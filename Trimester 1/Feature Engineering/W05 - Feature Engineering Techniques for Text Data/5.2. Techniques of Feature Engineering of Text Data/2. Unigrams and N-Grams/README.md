# 2. Unigrams and N-Grams

### Intuition
A unigram treats text as an unordered "Bag of Words" (BoW). Imagine taking a sentence, chopping it into individual words, and throwing them into a bucket. You know *what* words are present, but you lose *where* they were. 

An **$n$-gram** is a contiguous sequence of $n$ items from a given sample of text. By increasing $n$ (bigrams, trigrams), we expand our sliding window to capture local word dependencies. 

* **Unigrams ($n=1$):** `["machine", "learning", "is", "great"]`
* **Bigrams ($n=2$):** `["machine learning", "learning is", "is great"]` 
* **Trigrams ($n=3$):** `["machine learning is", "learning is great"]`

Bigrams allow a model to differentiate between "good movie" and "not good", which a pure unigram model would fail to distinguish because it simply counts the occurrences of "not" and "good" independently.

### Mathematical Formulation

Let a document $D$ be a sequence of tokens $D = (w_1, w_2, \dots, w_k)$.

An $n$-gram is a tuple of $n$ consecutive tokens:
$g_i^{(n)} = (w_i, w_{i+1}, \dots, w_{i+n-1})$

The vocabulary of all unique $n$-grams in the corpus $\mathcal{C}$ is denoted as $V^{(n)}$. The dimensionality of the feature space is $|V^{(n)}|$.

The feature vector for document $D$ using $n$-grams is $x_D \in \mathbb{N}^{|V^{(n)}|}$, where the $j$-th element is the term frequency:

$$
x_{D, j} = \sum_{i=1}^{k-n+1} \mathbb{I} \left[ g_i^{(n)} == v_j \right]
$$

Where:
* $v_j$ is the $j$-th $n$-gram in the vocabulary $V^{(n)}$.
* $\mathbb{I}[\cdot]$ is the indicator function evaluating to 1 if true, 0 otherwise.

> [!WARNING]
> **The Curse of Dimensionality:**
> If a vocabulary has size $|V|$, the theoretical maximum number of possible bigrams is $|V|^2$, and trigrams is $|V|^3$. While natural language is highly constrained (not all word combinations occur), the feature matrix grows exponentially and becomes extremely sparse.

### Visual Intuition: N-Gram Sliding Window

```mermaid
flowchart LR
    subgraph Document
        direction LR
        W01 - Overview of Feature Engineering(New) --> W2(York)
        W2 --> W03 - General Feature Engineering Techniques(City)
        W03 - General Feature Engineering Techniques --> W4(is)
        W4 --> W5(huge)
    end

    subgraph Bi-Grams
        B1["(New, York)"]
        B2["(York, City)"]
        B3["(City, is)"]
    end
    
    W01 - Overview of Feature Engineering -.-> B1
    W2 -.-> B1
    W2 -.-> B2
    W03 - General Feature Engineering Techniques -.-> B2
    W03 - General Feature Engineering Techniques -.-> B3
    W4 -.-> B3
```

### Python Implementation

We utilize `scikit-learn`'s `CountVectorizer`, which creates a sparse matrix representation.

```python
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
