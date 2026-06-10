---

## Reading Material: The Method of Least Squares

---
# 1. The Problem of “Best Fit”

Suppose we collect paired observations:

$$  
(x_1,y_1),  
(x_2,y_2),  
\dots,  
(x_n,y_n)  
$$

and display them on a scatter plot.

Immediately, a visual trend often emerges.

Some relationships appear:

- upward sloping
    
- downward sloping
    
- weakly related
    
- strongly related
    

The natural instinct is to draw a straight line through the cloud of points.

However, a critical problem appears:

> Which line is the “best” line?

Many possible lines could pass through the data cloud.

Some lines obviously fit poorly.

Others appear visually reasonable.

But visual intuition is subjective and unreliable.

Statistical modeling requires a rigorous mathematical criterion for defining:

$$  
\text{Best Fit}  
$$

\text{Best Fit}

The Method of Least Squares provides that criterion.

# 2. Why “Best Fit” Is Nontrivial

If every data point fell perfectly on a straight line, regression would be trivial.

But real-world data contains variability.

Consider:

- study hours vs exam scores
    
- advertising vs sales
    
- temperature vs electricity demand
    

Even if a strong trend exists, observations still scatter around the trend because of:

- random variation
    
- measurement error
    
- omitted variables
    
- environmental factors
    
- human unpredictability
    

Thus:

$$  
\text{No Single Line Passes Through Every Point}  
$$

\text{No Single Line Passes Through Every Point}

Regression therefore becomes an optimization problem.

# 3. The Geometry of Regression

Suppose we propose a candidate regression line:

# $$  
\hat{y}

b_0+b_1x  
$$

\hat{y}=b_0+b_1x

For every observed point:

$$  
(x_i,y_i)  
$$

the line produces a predicted value:

# $$  
\hat{y}_i

b_0+b_1x_i  
$$

\hat{y}_i=b_0+b_1x_i

The question becomes:

$$  
\text{How far is the observed point from the line?}  
$$

This distance defines prediction error.

# 4. Residuals: Measuring Prediction Error

For each observation, the vertical difference between:

- actual value
    
- predicted value
    

is called the residual.

The residual for observation:

$$  
i  
$$

is:

# $$  
e_i

y_i-\hat{y}_i  
$$

e_i=y_i-\hat{y}_i

Equivalently:

# $$  
e_i

## \text{Actual}_i

\text{Predicted}_i  
$$

e_i=\text{Actual}_i-\text{Predicted}_i

Residuals quantify model error observation-by-observation.

# 5. Why Vertical Distance Is Used

Regression predicts:

$$  
Y  
\text{ from }  
X  
$$

Therefore, error is measured vertically rather than horizontally.

The regression model assumes:

- predictor values are given
    
- uncertainty exists in the response variable
    

Thus residuals represent deviations in the:

$$  
Y  
$$

direction.

This distinction becomes important later in statistical theory.

# 6. Interpreting Residuals

Residuals contain substantial diagnostic information.

## Positive Residual

If:

$$  
e_i>0  
$$

then:

$$  
y_i>\hat{y}_i  
$$

The observed point lies above the line.

The model underpredicted the observation.

---

## Negative Residual

If:

$$  
e_i<0  
$$

then:

$$  
y_i<\hat{y}_i  
$$

The observed point lies below the line.

The model overpredicted the observation.

---

## Zero Residual

If:

$$  
e_i=0  
$$

then the observation lies exactly on the regression line.

# 7. A Good Regression Line

A good regression line should produce residuals that are:

- small
    
- balanced around zero
    
- lacking systematic structure
    

The central problem becomes:

$$  
\text{How do we combine all residuals into one measure of total error?}  
$$

# 8. Why Simple Summation Fails

One possible approach is:

$$  
\sum e_i  
$$

However, this fails completely.

Positive and negative residuals cancel each other out.

A terrible line could still produce:

$$  
\sum e_i=0  
$$

because overpredictions and underpredictions offset each other.

In fact, one important property of least squares regression is:

$$  
\sum e_i = 0  
$$

\sum e_i=0

Thus raw residual summation cannot measure fit quality.

# 9. Absolute Residuals

Another possibility is:

$$  
\sum |e_i|  
$$

This avoids cancellation because absolute values are always nonnegative.

However, absolute value optimization is mathematically inconvenient.

It produces non-smooth optimization problems that are harder to solve analytically.

# 10. Squared Residuals

The most important idea in least squares regression is squaring residuals before summing them.

This produces:

$$  
e_i^2  
$$

Squaring provides two major advantages.

# 11. Advantage 1: Elimination of Negative Values

Because:

$$  
e_i^2 \ge 0  
$$

positive and negative residuals no longer cancel.

Every prediction error contributes positively to total error.

This allows meaningful aggregation.

# 12. Advantage 2: Penalizing Large Errors

Squaring magnifies large mistakes dramatically.

Example:

|Residual|Squared Residual|
|---|---|
|$$2$$|$$4$$|
|$$10$$|$$100$$|

Large prediction errors therefore become disproportionately costly.

This forces the regression line to avoid extreme misses.

This property stabilizes the fitted model substantially.

# 13. The Sum of Squared Errors (SSE)

The total regression error is measured using the Sum of Squared Errors:

# $$  
SSE

\sum e_i^2  
$$

SSE=\sum e_i^2

Substituting residual definitions:

# $$  
SSE

\sum  
(y_i-\hat{y}_i)^2  
$$

SSE=\sum(y_i-\hat{y}_i)^2

Since:

$$  
\hat{y}_i=b_0+b_1x_i  
$$

we obtain:

# $$  
SSE

\sum  
\left(  
y_i-(b_0+b_1x_i)  
\right)^2  
$$

SSE=\sum\left(y_i-(b_0+b_1x_i)\right)^2

This equation defines total prediction error as a function of:

- slope
    
- intercept
    

# 14. The Least Squares Criterion

The Method of Least Squares selects:

$$  
b_0,b_1  
$$

that minimize:

$$  
SSE  
$$

\min SSE

Thus:

> The best-fitting regression line is the line with the smallest total squared prediction error.

This is one of the foundational optimization principles in all of statistics and machine learning.

# 15. Why Least Squares Became Dominant

Least squares became the dominant regression framework because it possesses extraordinary mathematical properties.

It produces:

- unique solutions
    
- computational efficiency
    
- differentiable optimization
    
- elegant statistical theory
    
- strong geometric interpretation
    

Much of modern statistical learning is built on least-squares logic.

# 16. The Optimization Problem

The regression fitting problem becomes:

$$  
\min_{b_0,b_1}  
\sum  
\left(  
y_i-(b_0+b_1x_i)  
\right)^2  
$$

\min_{b_0,b_1}\sum\left(y_i-(b_0+b_1x_i)\right)^2

This is a calculus optimization problem.

The objective function is quadratic and convex, guaranteeing a unique global minimum.

# 17. Solving the Least Squares Problem

To minimize:

$$  
SSE  
$$

we:

1. take partial derivatives with respect to:
    
    - $$b_0$$
        
    - $$b_1$$
        
2. set derivatives equal to zero
    
3. solve the resulting system of equations
    

These are called the normal equations.

The solution produces explicit formulas for the regression coefficients.

# 18. The Least Squares Slope Formula

The slope estimate is:

# $$  
b_1

\frac{  
\sum  
(x_i-\bar{x})(y_i-\bar{y})  
}{  
\sum  
(x_i-\bar{x})^2  
}  
$$

b_1=\frac{\sum(x_i-\bar{x})(y_i-\bar{y})}{\sum(x_i-\bar{x})^2}

This formula measures:

$$  
\text{Covariation}  
\div  
\text{Variation in }X  
$$

The numerator measures joint movement between variables.

The denominator measures spread in the predictor variable.

# 19. Interpretation of the Numerator

The quantity:

$$  
(x_i-\bar{x})(y_i-\bar{y})  
$$

captures whether deviations from means move together.

If:

- large $$X$$ values correspond to large $$Y$$ values
    

then products tend to be positive.

This produces a positive slope.

If deviations move oppositely, the slope becomes negative.

# 20. Interpretation of the Denominator

The denominator:

$$  
\sum(x_i-\bar{x})^2  
$$

measures variability in:

$$  
X  
$$

If predictor values show little variation, estimating a meaningful slope becomes difficult.

Regression fundamentally requires variation in the explanatory variable.

# 21. The Least Squares Intercept Formula

Once the slope is determined, the intercept is:

# $$  
b_0

## \bar{y}

b_1\bar{x}  
$$

b_0=\bar{y}-b_1\bar{x}

This formula guarantees a remarkable geometric property.

# 22. The Regression Line Passes Through the Means

The least squares regression line always passes through:

$$  
(\bar{x},\bar{y})  
$$

(\bar{x},\bar{y})

called the point of averages.

Proof:

Substitute:

$$  
x=\bar{x}  
$$

into:

$$  
\hat{y}=b_0+b_1x  
$$

Then:

# $$  
\hat{y}

# (\bar{y}-b_1\bar{x})  
+  
b_1\bar{x}

\bar{y}  
$$

Thus:

$$  
(\bar{x},\bar{y})  
$$

lies exactly on the regression line.

# 23. Why Passing Through the Means Makes Sense

The point:

$$  
(\bar{x},\bar{y})  
$$

represents the center of the data cloud.

A regression line summarizing central tendency should naturally pass through the center of the observations.

This geometric property is not arbitrary.

It emerges directly from least-squares optimization.

# 24. Residual Properties

Least squares regression produces several important residual properties.

## Residual Sum Equals Zero

$$  
\sum e_i=0  
$$

---

## Residual Mean Equals Zero

$$  
\bar{e}=0  
$$

---

## Residuals Are Orthogonal to Predictor Values

$$  
\sum x_ie_i=0  
$$

These properties emerge automatically from the optimization process.

# 25. The Deep Geometry of Least Squares

Least squares regression can be interpreted geometrically as projection.

The fitted regression line represents the closest linear approximation to the observed data cloud.

The optimization minimizes total squared distance between:

- observed outcomes
    
- projected outcomes
    

This geometric interpretation becomes central in higher-dimensional regression theory.

# 26. Why Least Squares Matters Beyond Regression

Least squares is not merely a regression tool.

It became foundational across:

- machine learning
    
- signal processing
    
- optimization
    
- econometrics
    
- neural networks
    
- scientific computing
    

Much of predictive modeling fundamentally reduces to minimizing some version of squared error.

# 27. Statistical Intuition Behind Least Squares

The Method of Least Squares fundamentally attempts to find the line that best balances all observations simultaneously.

The line must compromise between:

- overprediction
    
- underprediction
    
- local fit
    
- global fit
    

The optimization objective becomes:

$$  
\text{Minimize Total Prediction Failure}  
$$

\text{Minimize Total Prediction Failure}

# 28. The Broader Statistical Perspective

Least squares regression represents a major conceptual shift in statistics.

The goal is no longer merely:

- estimating averages
    
- comparing groups
    

Instead, regression constructs mathematical models describing relationships between variables.

The framework becomes:

$$  
\text{Data}  
\rightarrow  
\text{Model}  
\rightarrow  
\text{Prediction}  
$$

\text{Data}\rightarrow\text{Model}\rightarrow\text{Prediction}

This transition forms the foundation of modern predictive analytics and statistical learning.

The Method of Least Squares is therefore not just a computational trick.

It is one of the central organizing principles of quantitative modeling itself.