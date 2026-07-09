# 3.4.3. Mathematical Formulation of Spearman’s Correlation

Unlike methods that rely on raw continuous values, Spearman’s methodology begins by converting all raw data into discrete ranks.

The highest value in a dataset receives the first rank, the second highest receives the second rank, and so forth. Once the variables are converted into paired ranks, the metric calculates the variance between those assigned ranks.

The mathematical formulation for Spearman's rank correlation is:

$$
\rho = 1 - \frac{6 \sum d_i^2}{n(n^2 - 1)}
$$

where:

- $$ \rho $$ = Spearman's rank correlation coefficient
    
- $$ d_i $$ = difference between the two assigned ranks for each observation
    
- $$ \sum d_i^2 $$ = sum of the squared differences of all corresponding ranks
    
- $$ n $$ = total number of paired observations
    

This formula mathematically normalizes the relationship between the ranks, yielding a standardized coefficient bounded by fixed numerical limits.
