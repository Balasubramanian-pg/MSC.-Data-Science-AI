---

## Reading Material: Model Assessment and Adjusted R²

# Adjusted (R^2) in Multiple Linear Regression

# 1. Revisiting Model Fit

In both simple and multiple regression, the total variation in the response variable is decomposed into:

$$  
SST = SSR + SSE  
$$

Where:

|Term|Meaning|
|---|---|
|(SST)|Total variation in (Y)|
|(SSR)|Variation explained by the model|
|(SSE)|Unexplained variation (residual error)|

The standard coefficient of determination is still:

$$  
R^2 = \frac{SSR}{SST}  
$$

Interpretation:

> Proportion of variance in (Y) explained by the predictors.


# 2. Why (R^2) Seems Attractive

At first glance, (R^2) appears ideal.

Properties:

- easy to interpret
    
- bounded between 0 and 1
    
- directly tied to explained variance
    

Higher (R^2) appears to mean:

- better fit
    
- more predictive power
    
- more explanatory strength
    

But this intuition breaks badly in multiple regression.


# 3. The Fundamental Flaw of (R^2)

In multiple regression:

# (R^2) never decreases when predictors are added.

Even if the new predictor is:

- meaningless
    
- random noise
    
- completely unrelated to (Y)
    

(R^2) will usually increase slightly.

This is one of the most important conceptual traps in regression.


# 4. Why This Happens

OLS is fundamentally an optimization algorithm.

Its objective:

$$  
\min SSE  
$$

When we add another predictor:

- model flexibility increases
    
- optimization space expands
    
- regression gains another degree of freedom
    

This allows the model to fit random noise slightly better.


# 5. Intuition: The “Flexible Curve” Problem

Imagine fitting shapes through points.

A simple model:

- rigid
    
- constrained
    

A more complex model:

- flexible
    
- can bend toward random fluctuations
    

More flexibility almost always reduces training error.

This does NOT mean the model learned real structure.

It may simply memorize noise.


# 6. The Mathematical Mechanism

Recall:

$$  
R^2 = 1 - \frac{SSE}{SST}  
$$

Since:

- (SST) is fixed for the dataset
    
- adding predictors cannot increase SSE
    

then:

$$  
R^2  
$$

must stay the same or increase.


# 7. Why This Is Dangerous

Suppose we compare:

|Model|Predictors|
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

# Overfitting


# 8. Overfitting

Overfitting occurs when a model learns:

- random sample noise
    
- accidental fluctuations
    
- non-generalizable patterns
    

instead of underlying structure.


# 9. The Core Tradeoff

Regression always balances:

|Goal|Risk|
|---|---|
|Better fit|More complexity|
|More predictors|More variance|
|Flexible model|Overfitting|

This is the:

# Bias-Variance Tradeoff


# 10. Why We Need a Penalty

A good model selection metric must reward:

- explanatory power
    

while penalizing:

- unnecessary complexity
    

Standard (R^2) rewards fit only.

It ignores complexity entirely.


# 11. The Solution: Adjusted (R^2)

Adjusted (R^2) modifies ordinary (R^2) by incorporating a complexity penalty.

Formula:

# $$  
R^2_{adj}

## 1

\frac{SSE/(n-k-1)}  
{SST/(n-1)}  
$$

Where:

|Symbol|Meaning|
|---|---|
|(n)|Number of observations|
|(k)|Number of predictors|


# 12. Rewriting the Formula

Notice:

# $$  
\frac{SSE}{n-k-1}

MSE  
$$

Mean Square Error.

And:

# $$  
\frac{SST}{n-1}

MST  
$$

Mean Square Total.

Thus:

# $$  
R^2_{adj}

## 1

\frac{MSE}{MST}  
$$


# 13. Deep Interpretation

Adjusted (R^2) asks:

> “Does this new predictor reduce prediction error enough to justify its complexity cost?”

This is fundamentally:

# performance-per-parameter


# 14. How the Penalty Works

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

- weak predictors get punished
    
- only useful predictors improve adjusted (R^2)
    


# 15. Intuition Using Real Numbers

Suppose:

|Situation|SSE Reduction|
|---|---|
|Useful variable|Large drop|
|Useless variable|Tiny drop|

A useful variable offsets the complexity penalty.

A useless variable does not.

Thus:

- adjusted (R^2) rises only for meaningful improvement
    


# 16. Important Consequence

Unlike ordinary (R^2):

# Adjusted (R^2) can decrease

This is extremely important.

It allows:

- complexity control
    
- model comparison
    
- overfitting detection
    


# 17. Adjusted (R^2) as a Parsimony Metric

Adjusted (R^2) prefers:

# parsimonious models

Meaning:

> models that explain as much as possible using as few predictors as necessary.

This idea appears everywhere in science.


# 18. Occam’s Razor Connection

Adjusted (R^2) operationalizes:

# Occam’s Razor

Simpler explanations are preferred unless added complexity produces meaningful gains.


# 19. Why Adjusted (R^2) Is Better for Model Comparison

Suppose:

|Model|Predictors|(R^2)|Adjusted (R^2)|
|---|---|---|---|
|A|2|0.72|0.71|
|B|8|0.74|0.66|

Naive (R^2) prefers B.

Adjusted (R^2) prefers A.

Interpretation:

- Model B added complexity without meaningful explanatory improvement.
    


# 20. Large Gap Warning Signal

If:

$$  
R^2 - R^2_{adj}  
$$

is large:

this suggests:

- too many weak predictors
    
- overfitting risk
    
- inflated complexity
    


# 21. Can Adjusted (R^2) Be Negative?

Yes.

This surprises many students.


## Why?

If the model performs worse than expected by random chance:

$$  
R^2_{adj} < 0  
$$

This indicates:

- predictors contribute essentially no useful information
    


# 22. Comparison with Standard (R^2)

|Property|(R^2)|Adjusted (R^2)|
|---|---|---|
|Always increases with predictors|Yes|No|
|Penalizes complexity|No|Yes|
|Useful for model comparison|Weakly|Strongly|
|Can be negative|No|Yes|
|Overfitting resistant|No|Better|


# 23. Geometric Interpretation

Adding predictors expands the predictor subspace.

Ordinary (R^2):

- rewards larger projection spaces
    

Adjusted (R^2):

- asks whether expanded geometry genuinely improves approximation quality
    


# 24. Connection to Machine Learning

Adjusted (R^2) is an early form of:

# regularization thinking

Modern ML uses stronger complexity penalties:

|Method|Penalty Type|
|---|---|
|Adjusted (R^2)|Degree-of-freedom penalty|
|Ridge Regression|L2 penalty|
|Lasso|L1 penalty|
|AIC/BIC|Information penalties|


# 25. Why Training Accuracy Is Dangerous

Pure (R^2) behaves like:

# training accuracy

It measures fit on observed data only.

But predictive systems must generalize to:

# unseen data

Adjusted (R^2) partially compensates for this.


# 26. Limitations of Adjusted (R^2)

Adjusted (R^2) is better than ordinary (R^2), but still imperfect.

It does NOT fully solve:

- overfitting
    
- causal ambiguity
    
- nonlinear misspecification
    
- multicollinearity
    


# 27. Better Modern Alternatives

In predictive modeling, stronger evaluation tools include:

- cross-validation
    
- test-set performance
    
- AIC
    
- BIC
    
- regularization methods
    

Still, adjusted (R^2) remains highly useful in classical regression.


# 28. Python Example

```python
import pandas as pd
import statsmodels.api as sm

# Example dataset
data = pd.DataFrame({
    "x1": $$1, 2, 3, 4, 5$$,
    "x2": $$5, 4, 3, 2, 1$$,
    "noise": $$7, 1, 8, 2, 9$$,
    "y": $$10, 15, 20, 25, 30$$
})

# Predictors
X = data$$$$"x1", "x2", "noise"$$$$

# Add intercept
X = sm.add_constant(X)

# Response
y = data$$"y"$$

# Fit model
model = sm.OLS(y, X).fit()

# Print metrics
print("R²:", model.rsquared)
print("Adjusted R²:", model.rsquared_adj)
```


# 29. Practical Workflow

```mermaid
flowchart TD

A$$Fit Candidate Models$$
--> B$$Compute R²$$

B --> C$$Compute Adjusted R²$$

C --> D$$Compare Model Complexity$$

D --> E$$Select Most Parsimonious Model$$

E --> F$$Validate with Diagnostics$$
```


# 30. Statistical Philosophy Behind Adjusted (R^2)

Adjusted (R^2) reflects a deeper scientific principle:

> Explanations should earn their complexity.

A model should not gain credibility merely by becoming more complicated.


# 31. Common Misconceptions

## Misconception 1

“Higher (R^2) always means better model.”

False.


## Misconception 2

“Adding predictors always improves predictive quality.”

False.

May simply fit noise.


## Misconception 3

“Adjusted (R^2) guarantees no overfitting.”

False.

It only partially penalizes complexity.


# 32. Final Takeaways

$$!IMPORTANT$$

Ordinary (R^2) has a critical flaw in multiple regression:

> it always increases when predictors are added.

This makes it unreliable for model selection.

Adjusted (R^2) fixes this by penalizing unnecessary complexity.

Core formula:

# $$
R^2_{\text{adj}} = 1 - \frac{SSE/(n-k-1)}{SST/(n-1)}
$$

Key conceptual insight:

> A predictor should only remain in the model if it improves fit enough to justify its complexity cost.

Adjusted (R^2) helps identify:

- parsimonious models
    
- meaningful predictors
    
- overfitting risks
    

It is fundamentally:

# a complexity-aware measure of explained variance.