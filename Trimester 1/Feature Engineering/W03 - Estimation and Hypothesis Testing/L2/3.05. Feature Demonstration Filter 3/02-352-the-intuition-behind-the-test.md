# 3.5.2. The Intuition Behind the Test

The Chi-Square test determines whether a categorical feature and a categorical target variable are statistically independent.

In the context of machine learning, independence means that knowing the value of the feature provides absolutely no information about the target variable. If a feature and the target are completely independent, the feature lacks predictive signal and should be discarded. 

The test measures this independence by comparing two distinct values:

- **Observed frequency**: The actual counts of categories recorded in the dataset.
    
- **Expected frequency**: The theoretical counts we would expect to see if the feature and target were completely independent.
    

>[!Note]
> If the observed counts align closely with the expected counts, the variables are likely independent. If a large discrepancy exists between the observed and expected counts, the variables are dependent, indicating strong predictive value.

To quantify this discrepancy, we use a standardized mathematical equation.
