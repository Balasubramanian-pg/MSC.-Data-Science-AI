# 3.7.3. Mathematical Formulation of the Fisher Score

The computation of the metric transforms the theoretical balance of variances into a rigorous algebraic ratio.

For a binary classification task, the formula for the Fisher Score evaluates the squared difference of the means divided by the sum of the variances:

$$
\text{Fisher Score} = \frac{(\mu_0 - \mu_1)^2}{\sigma_0^2 + \sigma_1^2}
$$

Where:

- $$\mu_0$$ = the mean of the continuous feature for class 0
    
- $$\mu_1$$ = the mean of the continuous feature for class 1
    
- $$\sigma_0^2$$ = the variance of the feature for class 0
    
- $$\sigma_1^2$$ = the variance of the feature for class 1
    

To ensure mathematical stability, practitioners frequently add a microscopic constant, often denoted as epsilon, to the denominator. This prevents fatal division-by-zero errors in cases where the feature variance approaches absolute zero.

Because this formula is central to understanding class separation, we restate the underlying relationship:

$$
\text{Fisher Score} = \frac{(\mu_0 - \mu_1)^2}{\sigma_0^2 + \sigma_1^2}
$$

A higher resulting ratio explicitly confirms greater discriminative power.
