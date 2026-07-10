# 3.6.4. Mathematical Formulation of Mutual Information

The metric is computed by subtracting the remaining conditional uncertainty from the original total uncertainty. 

The core formula for Mutual Information is:

$$
I(X; Y) = H(Y) - H(Y|X)
$$

Where:

- $$I(X; Y)$$ = Mutual Information between the feature and the target
    
- $$H(Y)$$ = Initial entropy (total uncertainty) of the target variable
    
- $$H(Y|X)$$ = Conditional entropy (remaining uncertainty) of the target given the feature
    

This fundamental equation demonstrates that Mutual Information is strictly the difference between how much we did not know before observing the feature, and how much we still do not know after observing the feature.

Because this equation is critical to understanding feature selection, we restate the governing relationship:

$$
I(X; Y) = H(Y) - H(Y|X)
$$

The amount of uncertainty removed is the exact amount of informational value the feature provides.
