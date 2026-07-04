# 3.8.10. Common Misinterpretations

The model-centric nature of wrapper methods frequently leads to conceptual misunderstandings regarding their safety and applicability. 

### Interpretation 1

>[!Warning]
> "Wrapper methods will find the absolute best possible combination of features."

Wrong. 
Due to the greedy constraints of sequential search strategies, wrapper methods find a highly optimized subset, but it is rarely the true global optimum.

### Interpretation 2

>[!Warning]
> "The subset found by a wrapper method is universally optimal across all algorithms."

Wrong. 
Wrapper methods are heavily model-specific. A feature subset optimized using a Support Vector Machine will likely perform sub-optimally if transferred directly to a Random Forest algorithm.

### Interpretation 3

>[!Warning]
> "Wrapper methods prevent overfitting by removing noisy variables."

Wrong. 
Wrapper methods carry an exceptionally high risk of overfitting to the validation set. Because the algorithm repeatedly tests hundreds of combinations against the exact same validation data, it often selects features that map exclusively to the validation set's specific noise.
