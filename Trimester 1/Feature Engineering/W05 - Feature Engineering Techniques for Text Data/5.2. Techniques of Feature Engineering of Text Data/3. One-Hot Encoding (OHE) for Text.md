# 3. One-Hot Encoding (OHE) for Text

### Intuition
Before word counts or frequency, the most primitive way to represent categorical data (like distinct words or distinct document classes) is One-Hot Encoding. You assign each category a unique column. If the category is present, the column gets a `1`, otherwise `0`.

For text, if our universe of words is `["science", "religion", "hockey"]`, we define a 3-dimensional space. "science" is the x-axis, "religion" is the y-axis, "hockey" is the z-axis.

### Mathematical Formulation
Let the vocabulary $V$ have size $N$. 
A mapping function maps every word $w_i \in V$ to a unique integer index $j \in \{1, 2, \dots, N\}$.
The One-Hot vector $v_w \in \{0,1\}^N$ for a word $w$ is defined via the Kronecker delta:

$$
v_{w, k} = \delta_{j, k} = 
\begin{cases} 
1 & \text{if } k = j \\
0 & \text{if } k \neq j 
\end{cases}
$$

> [!IMPORTANT]
> **The Geometric Limitation:**
> The dot product between any two distinct one-hot encoded words is exactly 0.
> $v_{science}^T \cdot v_{physics} = 0$
> Therefore, the cosine similarity between "science" and "physics" is 0. OHE assumes all words are completely orthogonal and strictly independent, which violates linguistic reality (semantics).

### Python Implementation

```python
import numpy as np
from sklearn.preprocessing import OneHotEncoder
