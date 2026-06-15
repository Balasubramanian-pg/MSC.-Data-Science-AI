# Model Assessment and Adjusted R²

## [Adjusted (R^2)](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#adjusted-r2) in [Multiple Linear Regression](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L1/The%20Least%20Squares%20Method%20in%20Multiple%20Regression.md#multiple-linear-regression)

## 1. Revisiting Model Fit

In both simple and multiple regression, the total variation in the [response variable](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L1/The%20Multiple%20Regression%20Model.md#response)-variable) is decomposed into:

$$
SST = SSR + SSE
$$

Where:

|Term|Meaning|
|---|---|
|(SST)|Total variation in (Y)|
|(SSR)|Variation explained by the model|
|(SSE)|Unexplained variation (residual error)|

The standard [coefficient of determination](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#coefficient-of-determination) is still:

$$
R^2 = \frac{SSR}{SST}
$$

Interpretation:

> Proportion of variance in (Y) explained by the [predictors](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#predictors).

## 2. Why (R^2) Seems Attractive

At first glance, (R^2) appears ideal.

Properties:

- easy to interpret
    
- bounded between 0 and 1
    
- directly tied to [explained variance](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06%20-%20Simple%20Linear%20Regression/L2/The%20Coefficient%20of%20Determination%20%28R%C2%B2%29.md#explained-variance)
    

Higher (R^2) appears to [mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04%20-%20Estimation%20And%20Hypothesis%20Testing%20Cont/L2/Testing%20Population%20Proportions.md#mean):

- better fit
    
- more predictive power
    
- more explanatory strength
    

But this [intuition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06%20-%20Simple%20Linear%20Regression/L2/Residual%20Analysis.md#intuition))) breaks badly in multiple regression.

## 3. The Fundamental Flaw of (R^2)

In multiple regression:

## (R^2) never decreases when [predictors](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#predictors) are added.

Even if the new predictor is:

- meaningless
    
- random [noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06%20-%20Simple%20Linear%20Regression/L2/Testing%20for%20Significance%20in%20Regression.md#noise)
    
- completely unrelated to (Y)
    

(R^2) will usually increase slightly.

This is one of the most important conceptual traps in regression.

## 4. Why This Happens

OLS is fundamentally an optimization algorithm.

Its objective:

$$
\min SSE
$$

When we add another predictor:

- model flexibility increases
    
- optimization space expands
    
- regression gains another degree of freedom
    

This allows the model to fit random [noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06%20-%20Simple%20Linear%20Regression/L2/Testing%20for%20Significance%20in%20Regression.md#noise) slightly better.

## 5. [Intuition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06%20-%20Simple%20Linear%20Regression/L2/Residual%20Analysis.md#intuition))): The “Flexible Curve” Problem

Imagine fitting shapes through points.

A simple model:

- rigid
    
- constrained
    

A more complex model:

- flexible
    
- can bend toward random fluctuations
    

More flexibility almost always reduces training error.

This does NOT [mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04%20-%20Estimation%20And%20Hypothesis%20Testing%20Cont/L2/Testing%20Population%20Proportions.md#mean) the model learned real structure.

It may simply memorize [noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06%20-%20Simple%20Linear%20Regression/L2/Testing%20for%20Significance%20in%20Regression.md#noise).

## 6. The Mathematical Mechanism

Recall:

$$
R^2 = 1 - \frac{SSE}{SST}
$$

Since:

- (SST) is fixed for the dataset
    
- adding [predictors](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#predictors) cannot increase SSE
    

then:

$$
R^2
$$

must stay the same or increase.

## 7. [Why This Is Dangerous](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06%20-%20Simple%20Linear%20Regression/L2/Residual%20Analysis.md#why-this-is-dangerous)

Suppose we compare:

|Model|[Predictors](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#predictors)|
|---|---|
|Model A|Age|
|Model B|Age + Shoe Size|
|Model C|Age + Shoe Size + Random Number|

Pure (R^2) may rank:

$$
C > B > A
$$

even when extra variables are useless.

This creates:

## Overfitting

## 8. Overfitting

Overfitting occurs when a model learns:

- random sample [noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06%20-%20Simple%20Linear%20Regression/L2/Testing%20for%20Significance%20in%20Regression.md#noise)
    
- accidental fluctuations
    
- non-generalizable patterns
    

instead of underlying structure.

## 9. The Core Tradeoff

Regression always balances:

|Goal|Risk|
|---|---|
|Better fit|More complexity|
|More [predictors](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#predictors)|More variance|
|Flexible model|Overfitting|

This is the:

## [Bias-Variance Tradeoff](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L1/The%20Multiple%20Regression%20Model.md#bias-variance-tradeoff)

## 10. Why We Need a Penalty

A good model selection metric must reward:

- explanatory power
    

while penalizing:

- unnecessary complexity
    

Standard (R^2) rewards fit only.

It ignores complexity entirely.

## 11. The Solution: [Adjusted (R^2)](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#adjusted-r2)

[Adjusted (R^2)](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#adjusted-r2) modifies ordinary (R^2) by incorporating a complexity penalty.

[Formula](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06%20-%20Simple%20Linear%20Regression/L2/Testing%20for%20Significance%20in%20Regression.md#formula):

##

$$
R^2_{adj}

## 1

\frac{SSE/(n-k-1)}  
{SST/(n-1)}
$$

Where:

|Symbol|Meaning|
|---|---|
|(n)|Number of observations|
|(k)|Number of [predictors](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#predictors)|

## 12. Rewriting the [Formula](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06%20-%20Simple%20Linear%20Regression/L2/Testing%20for%20Significance%20in%20Regression.md#formula)

Notice:

##

$$
\frac{SSE}{n-k-1}

MSE
$$

[Mean Square Error](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06%20-%20Simple%20Linear%20Regression/L2/Testing%20for%20Significance%20in%20Regression.md#[mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04%20-%20Estimation%20And%20Hypothesis%20Testing%20Cont/L2/Testing%20Population%20Proportions.md#mean)-square-error).

And:

##

$$
\frac{SST}{n-1}

MST
$$

[Mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04%20-%20Estimation%20And%20Hypothesis%20Testing%20Cont/L2/Testing%20Population%20Proportions.md#mean) Square Total.

Thus:

##

$$
R^2_{adj}

## 1

\frac{MSE}{MST}
$$

## 13. Deep Interpretation

[Adjusted (R^2)](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#adjusted-r2) asks:

> “Does this new predictor reduce prediction error enough to justify its complexity cost?”

This is fundamentally:

## performance-per-parameter

## 14. How the Penalty Works

Adding a predictor increases:

$$
k
$$

which reduces:

$$
n-k-1
$$

This makes the denominator of MSE smaller.

Smaller denominator inflates MSE unless SSE decreases substantially.

Thus:

- weak [predictors](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#predictors) get punished
    
- only useful [predictors](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#predictors) improve [adjusted (R^2)](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#adjusted-r2)
    

## 15. [Intuition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06%20-%20Simple%20Linear%20Regression/L2/Residual%20Analysis.md#intuition))) Using Real Numbers

Suppose:

|[Situation](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#situation)|SSE Reduction|
|---|---|
|Useful variable|Large drop|
|Useless variable|Tiny drop|

A useful variable offsets the complexity penalty.

A useless variable does not.

Thus:

- [adjusted (R^2)](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#adjusted-r2) rises only for meaningful improvement
    

## 16. Important Consequence

Unlike ordinary (R^2):

## [Adjusted (R^2)](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#adjusted-r2) can decrease

This is extremely important.

It allows:

- complexity control
    
- model comparison
    
- overfitting detection
    

## 17. [Adjusted (R^2)](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#adjusted-r2) as a Parsimony Metric

[Adjusted (R^2)](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#adjusted-r2) prefers:

## parsimonious models

Meaning:

> models that explain as much as possible using as few [predictors](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#predictors) as necessary.

This idea appears everywhere in science.

## 18. Occam’s Razor Connection

[Adjusted (R^2)](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#adjusted-r2) operationalizes:

## Occam’s Razor

Simpler explanations are preferred unless added complexity produces meaningful gains.

## 19. Why [Adjusted (R^2)](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#adjusted-r2) Is Better for Model Comparison

Suppose:

|Model|[Predictors](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#predictors)|(R^2)|[Adjusted (R^2)](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#adjusted-r2)|
|---|---|---|---|
|A|2|0.72|0.71|
|B|8|0.74|0.66|

Naive (R^2) prefers B.

[Adjusted (R^2)](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#adjusted-r2) prefers A.

Interpretation:

- Model B added complexity without meaningful explanatory improvement.
    

## 20. Large Gap Warning [Signal](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06%20-%20Simple%20Linear%20Regression/L2/Testing%20for%20Significance%20in%20Regression.md#signal)

If:

$$
R^2 - R^2_{adj}
$$

is large:

this suggests:

- too many weak [predictors](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#predictors)
    
- [overfitting risk](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#overfitting-risk)
    
- inflated complexity
    

## 21. Can [Adjusted (R^2)](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#adjusted-r2) Be Negative?

Yes.

This surprises many students.

## [Why?](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#why)

If the model performs worse than expected by random chance:

$$
R^2_{adj} < 0
$$

This indicates:

- [predictors](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#predictors) contribute essentially no useful information
    

## 22. Comparison with Standard (R^2)

|Property|(R^2)|[Adjusted (R^2)](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#adjusted-r2)|
|---|---|---|
|Always increases with [predictors](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#predictors)|Yes|No|
|Penalizes complexity|No|Yes|
|Useful for model comparison|Weakly|Strongly|
|Can be negative|No|Yes|
|Overfitting resistant|No|Better|

## 23. Geometric Interpretation

Adding [predictors](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#predictors) expands the predictor subspace.

Ordinary (R^2):

- rewards larger projection spaces
    

[Adjusted (R^2)](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#adjusted-r2):

- asks whether expanded geometry genuinely improves approximation quality
    

## 24. Connection to Machine Learning

[Adjusted (R^2)](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#adjusted-r2) is an early form of:

## regularization thinking

Modern ML uses stronger complexity penalties:

|Method|Penalty Type|
|---|---|
|[Adjusted (R^2)](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#adjusted-r2)|Degree-of-freedom penalty|
|Ridge Regression|L2 penalty|
|Lasso|L1 penalty|
|AIC/BIC|Information penalties|

## 25. Why Training Accuracy Is Dangerous

Pure (R^2) behaves like:

## training accuracy

It measures fit on observed data only.

But predictive systems must generalize to:

## unseen data

[Adjusted (R^2)](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#adjusted-r2) partially compensates for this.

## 26. Limitations of [Adjusted (R^2)](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#adjusted-r2)

[Adjusted (R^2)](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#adjusted-r2) is better than ordinary (R^2), but still imperfect.

It does NOT fully solve:

- overfitting
    
- causal ambiguity
    
- nonlinear misspecification
    
- [multicollinearity](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L1/The%20Least%20Squares%20Method%20in%20Multiple%20Regression.md#multicollinearity))
    

## 27. Better Modern Alternatives

In predictive modeling, stronger evaluation tools include:

- cross-validation
    
- test-set performance
    
- AIC
    
- BIC
    
- regularization methods
    

Still, [adjusted (R^2)](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#adjusted-r2) remains highly useful in classical regression.

## [28. Python Example](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06%20-%20Simple%20Linear%20Regression/L2/Testing%20for%20Significance%20in%20Regression.md#28-python-[example](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#example))

```python
import pandas as pd
import statsmodels.api as sm

## Example dataset
data = pd.DataFrame({
    "x1":

$$
1, 2, 3, 4, 5
$$

,
    "x2":

$$
5, 4, 3, 2, 1
$$

,
    "noise":

$$
7, 1, 8, 2, 9
$$

,
    "y":

$$
10, 15, 20, 25, 30
$$

})

## Predictors
X = data

$$

$$

"x1", "x2", "noise"

$$

$$

## Add intercept
X = sm.add_constant(X)

## Response
y = data

$$
"y"
$$

## Fit model
model = sm.OLS(y, X).fit()

## Print metrics
print("R²:", model.rsquared)
print("Adjusted R²:", model.rsquared_adj)
```

## 29. Practical Workflow

```mermaid
flowchart TD

A

$$
Fit Candidate Models
$$

--> B

$$
Compute R²
$$

B --> C

$$
Compute Adjusted R²
$$

C --> D

$$
Compare Model Complexity
$$

D --> E

$$
Select Most Parsimonious Model
$$

E --> F

$$
Validate with Diagnostics
$$

```

## 30. Statistical Philosophy Behind [Adjusted (R^2)](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#adjusted-r2)

[Adjusted (R^2)](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#adjusted-r2) reflects a deeper scientific principle:

> Explanations should earn their complexity.

A model should not gain credibility merely by becoming more complicated.

## 31. Common Misconceptions

## [Misconception 1](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06%20-%20Simple%20Linear%20Regression/L2/Testing%20for%20Significance%20in%20Regression.md#misconception-1)

“Higher (R^2) always means better model.”

False.

## [Misconception 2](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06%20-%20Simple%20Linear%20Regression/L2/Testing%20for%20Significance%20in%20Regression.md#misconception-2)

“Adding [predictors](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#predictors) always improves predictive quality.”

False.

May simply fit [noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06%20-%20Simple%20Linear%20Regression/L2/Testing%20for%20Significance%20in%20Regression.md#noise).

## [Misconception 3](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06%20-%20Simple%20Linear%20Regression/L2/Testing%20for%20Significance%20in%20Regression.md#misconception-3)

“[Adjusted (R^2)](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#adjusted-r2) guarantees no overfitting.”

False.

It only partially penalizes complexity.

## [32. Final Takeaways](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L1/The%20Multiple%20Regression%20Model.md#32-final-takeaways)

$$
!IMPORTANT
$$

Ordinary (R^2) has a critical flaw in multiple regression:

> it always increases when [predictors](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#predictors) are added.

This makes it unreliable for model selection.

[Adjusted (R^2)](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#adjusted-r2) fixes this by penalizing unnecessary complexity.

Core [formula](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06%20-%20Simple%20Linear%20Regression/L2/Testing%20for%20Significance%20in%20Regression.md#formula):

##

$$
R^2_{\text{adj}} = 1 - \frac{SSE/(n-k-1)}{SST/(n-1)}
$$

Key conceptual insight:

> A predictor should only remain in the model if it improves fit enough to justify its complexity cost.

[Adjusted (R^2)](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#adjusted-r2) helps identify:

- parsimonious models
    
- meaningful [predictors](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07%20-%20Multiple%20Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#predictors)
    
- overfitting risks
    

It is fundamentally:

## a complexity-aware measure of [explained variance](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06%20-%20Simple%20Linear%20Regression/L2/The%20Coefficient%20of%20Determination%20%28R%C2%B2%29.md#explained-variance).

Tags: #statistics #machine-learning #data-science #statistical-modelling
