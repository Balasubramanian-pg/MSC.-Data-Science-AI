# 3.6.9. Common Misinterpretations

The abstract nature of information theory frequently leads to critical misunderstandings during applied feature selection.

### Interpretation 1

>[!Warning]
> "A high Mutual Information score indicates a strong positive linear trend."

Wrong. 
Mutual Information provides no directional or geometric data. The feature could exhibit a highly erratic, non-linear pattern that just happens to perfectly map to the target's variance. 

### Interpretation 2

>[!Warning]
> "Mutual Information scores are always bounded between 0 and 1."

Wrong. 
While Mutual Information cannot be negative, its upper bound depends entirely on the base of the logarithm used to calculate the underlying entropy. Unless explicitly normalized, the raw score can exceed a value of one.

### Interpretation 3

>[!Warning]
> "If Mutual Information is zero, the variables might still have a non-linear relationship."

Wrong. 
Unlike linear correlation, which can evaluate to zero even when a perfect quadratic relationship exists, a Mutual Information score of zero implies strict and total statistical independence. There is no relationship of any kind.
