---

## Reading Material: The Least Squares Method in Multiple Regression

---
# Least Squares Estimation in Multiple Linear Regression

# 1. Extending the Least Squares Principle

When moving from simple linear regression to multiple linear regression, the central optimization principle remains unchanged:

> Find the model that minimizes prediction error.

The method used is still:

# Ordinary Least Squares (OLS)

The only difference is geometric complexity.

## Simple Linear Regression

Fits:

# a line

$$ 
\hat{y} = b_0 + b_1 x  
$$

---

## Multiple Linear Regression

Fits:

# a hyperplane

# 
$$ 
\hat{y}

b_0  
+  
b_1 x_1  
+  
b_2 x_2  
+  
\cdots  
+  
b_k x_k  
$$

---

# 2. Geometric Interpretation

In higher dimensions:

- 1 predictor → line
    
- 2 predictors → plane
    
- 3 predictors → 3D hyperplane
    
- (k) predictors → (k)-dimensional hyperplane
    

OLS attempts to place this hyperplane so that it lies as close as possible to the observed data points.

---

# 3. What Does “Close” Mean?

Closeness is measured using:

# Residual Errors

For observation (i):

$$ 
e_i = y_i - \hat{y}_i  
$$

Where:

|Symbol|Meaning|
|---|---|
|(y_i)|Actual value|
|(\hat{y}_i)|Predicted value|
|(e_i)|Residual|

# 4. Why We Square Errors

OLS minimizes:

# Sum of Squared Errors (SSE)

$$ 
SSE = \sum_{i=1}^{n} e_i^2  
$$

Substituting residuals:

# $$ 
SSE

\sum_{i=1}^{n}  
(y_i - \hat{y}_i)^2  
$$

# 5. Multiple Regression SSE

For multiple regression:

# $$ 
\hat{y}_i

b_0  
+  
b_1 x_{i1}  
+  
b_2 x_{i2}  
+  
\cdots  
+  
b_k x_{ik}  
$$

Substituting into SSE:

# 
$$
SSE = \sum_{i=1}^{n} \left( y_i - (b_0 + b_1 x_{i1} + b_2 x_{i2} + \cdots + b_k x_{ik}) \right)^2
$$
This is the objective function OLS minimizes.

# 6. Why Squaring Matters

Squaring residuals serves several purposes.

## 1. Prevents Cancellation

Without squaring:

- positive errors
    
- negative errors
    

would cancel each other.

## 2. Penalizes Large Errors More Heavily

Example:

|Error|Squared Error|
|---|---|
|2|4|
|10|100|

Large mistakes become disproportionately costly.

## 3. Produces Smooth Optimization

Squared functions are differentiable.

This makes calculus tractable.

# 7. Optimization Problem

The regression problem becomes:

# Find coefficients that minimize SSE

Formally:

$$ 
\min_{b_0,b_1,\dots,b_k}  
SSE  
$$

# 8. Calculus-Based Solution

In principle:

- compute derivative of SSE
    
- set derivative equal to zero
    
- solve system of equations
    

In multiple regression, this becomes:

# Partial derivatives

because multiple coefficients exist.

# 9. The Normal Equations

For (k) predictors:

we obtain:

$$ 
k+1  
$$

simultaneous equations.

These are called:

# Normal Equations

# 10. Why Manual Computation Becomes Impossible

With many predictors:

- equations become massive
    
- algebra becomes unstable
    
- hand calculation becomes infeasible
    

Even two-predictor regression becomes tedious manually.

Modern regression fundamentally depends on:

# Matrix algebra

# 11. Matrix Representation of Regression

Matrix notation compresses the entire regression system into elegant linear algebra.

# 12. The Response Vector

The observed outcomes:

$$ 
\mathbf{y}  
$$

are represented as:

$$ 
n \times 1  
$$

column vector.

# $$ 
\mathbf{y}

\begin{bmatrix}  
y_1 \  
y_2 \  
\vdots \  
y_n  
\end{bmatrix}  
$$

# 13. The Coefficient Vector

Unknown coefficients:

# $$ 
\mathbf{b}

\begin{bmatrix}  
b_0 \  
b_1 \  
\vdots \  
b_k  
\end{bmatrix}  
$$

Dimension:

$$ 
(k+1) \times 1  
$$

# 14. The Design Matrix

The predictor matrix:

$$ 
\mathbf{X}  
$$

contains all predictor values.

# $$ 
\mathbf{X}

\begin{bmatrix}  
1 & x_{11} & x_{12} & \cdots & x_{1k} \  
1 & x_{21} & x_{22} & \cdots & x_{2k} \  
\vdots & \vdots & \vdots & \ddots & \vdots \  
1 & x_{n1} & x_{n2} & \cdots & x_{nk}  
\end{bmatrix}  
$$

## Important Detail

The first column is all ones.

This encodes:

$$ 
b_0  
$$

the intercept term.

# 15. Residual Vector

Residuals become:

# $$ 
\mathbf{e}

\begin{bmatrix}  
e_1 \  
e_2 \  
\vdots \  
e_n  
\end{bmatrix}  
$$

# 16. Compact Matrix Form

The entire regression model becomes:

# $$ 
\mathbf{y}

\mathbf{Xb}  
+  
\mathbf{e}  
$$

This single equation represents all observations simultaneously.

# 17. Why This Representation Is Powerful

Matrix notation enables:

- compact representation
    
- computational efficiency
    
- scalable algorithms
    
- geometric interpretation
    
- generalized ML frameworks
    

This is one of the foundational abstractions of machine learning.

# 18. Matrix Form of SSE

Residuals:

## $$
\mathbf{e},\ \mathbf{y},\ \mathbf{Xb}
$$

Thus:

# $$ 
SSE

\mathbf{e}^T \mathbf{e}  
$$

Substituting:

# $$ 
SSE

(\mathbf{y}-\mathbf{Xb})^T  
(\mathbf{y}-\mathbf{Xb})  
$$

This is the matrix optimization objective.

# 19. Why (e^T e) Represents Squared Length

The expression:

$$ 
\mathbf{e}^T \mathbf{e}  
$$

is the dot product of the residual vector with itself.

Equivalent to:

$$ 
e_1^2 + e_2^2 + \cdots + e_n^2  
$$

Geometrically:

# squared Euclidean distance

# 20. Deriving the Matrix Solution

Using matrix calculus:

differentiate SSE with respect to:

$$ 
\mathbf{b}  
$$

Set derivative equal to zero.

This produces:

# Matrix Normal Equations

# $$ 
(\mathbf{X}^T\mathbf{X})\mathbf{b}

\mathbf{X}^T\mathbf{y}  
$$
# 21. Solving for the Coefficients

Multiply both sides by:

$$ 
(\mathbf{X}^T\mathbf{X})^{-1}  
$$

assuming inverse exists.

Result:

# $$ 
\mathbf{b}

(\mathbf{X}^T\mathbf{X})^{-1}  
\mathbf{X}^T  
\mathbf{y}  
$$

This is the famous:

# Closed-Form OLS Solution

# 22. Why This Equation Is Fundamental

This equation underlies:

- linear regression
    
- generalized least squares
    
- ridge regression foundations
    
- linear ML systems
    
- econometrics
    
- signal processing
    

It is one of the most important equations in applied mathematics.

# 23. Understanding Each Matrix Component

## (X^TX)

$$ 
\mathbf{X}^T\mathbf{X}  
$$

captures:

- variances of predictors
    
- covariances between predictors
    

It describes predictor geometry.

## (X^Ty)

$$ 
\mathbf{X}^T\mathbf{y}  
$$

captures:

- relationships between predictors and outcome
    
## ((X^TX)^{-1})

This adjusts for predictor overlap.

It disentangles shared information between variables.

# 24. Why Multicollinearity Causes Problems

If predictors are highly correlated:

$$ 
X^TX  
$$

becomes nearly singular.

Its inverse becomes unstable.

Consequences:

- wildly fluctuating coefficients
    
- inflated standard errors
    
- numerical instability
    

This is the mathematical root of:

# Multicollinearity

# 25. Geometric Interpretation

OLS is fundamentally a projection problem.

The fitted values:

# $$ 
\hat{\mathbf{y}}

\mathbf{Xb}  
$$

are the:

# orthogonal projection of (y)

onto the column space of (X).

# 26. Residual Orthogonality

Residual vector:

# $$
\mathbf{e},\ \mathbf{y},\ \hat{\mathbf{y}}
$$

is orthogonal to the predictor space.

Meaning:

$$ 
X^T e = 0  
$$

This orthogonality condition is the deep geometric meaning of least squares.
# 27. Visual Intuition

```text
               y (actual outcomes)
                *
               /|
              / |
             /  | residual vector e
            /   |
           /    |
          *-----*
        projection
          onto predictor space
```

Regression finds the closest point in predictor space to the actual outcome vector.

# 28. Why Projection Matters in Machine Learning

This projection framework generalizes into:

- PCA
    
- SVD
    
- latent factor models
    
- embeddings
    
- neural network optimization
    

Linear regression is fundamentally geometric optimization.

# 29. Computational Perspective

Direct matrix inversion has computational limits.

Complexity roughly:

$$ 
O(k^3)  
$$

for inversion.

Large-scale ML systems often use:

- gradient descent
    
- QR decomposition
    
- SVD
    
- stochastic optimization
    

instead of direct inversion.

# 30. Numerical Stability

Computing:

$$ 
(X^TX)^{-1}  
$$

directly can be numerically unstable.

Modern libraries rarely compute the inverse explicitly.

They use more stable algorithms internally.

# 31. Python Example

```python
import numpy as np

# Design matrix
X = np.array([
    [1, 2$$,
    [1, 3$$,
    [1, 4$$,
    [1, 5$$
$$)

# Response vector
y = np.array([
    [5$$,
    [7$$,
    [9$$,
    [11$$
$$)

# Closed-form OLS solution
b = np.linalg.inv(X.T @ X) @ X.T @ y

print("Estimated coefficients:")
print(b)
```

# 32. Output Interpretation

Expected coefficients:

```python
[[1.$$
 [2.$$$$
```

Meaning:

$$ 
\hat{y} = 1 + 2x  
$$

# 33. Relationship to Deep Learning

Neural networks generalize this optimization framework.

Difference:

|Linear Regression|Neural Networks|
|---|---|
|Closed-form solution|Iterative optimization|
|Convex loss surface|Non-convex loss surface|
|Matrix inversion|Gradient descent|
|Linear mapping|Nonlinear mapping|

OLS is essentially the simplest supervised learning algorithm.

# 34. Key Insights About Least Squares

[!IMPORTANT$$

Least squares is fundamentally:

# geometric projection + optimization

The OLS solution:

# $$ 
\mathbf{b}

(\mathbf{X}^T\mathbf{X})^{-1}  
\mathbf{X}^T  
\mathbf{y}  
$$

finds the coefficient vector that minimizes:

# $$ 
SSE

(\mathbf{y}-\mathbf{Xb})^T  
(\mathbf{y}-\mathbf{Xb})  
$$

Critical concepts:

- regression minimizes squared residuals
    
- matrix algebra enables scalable computation
    
- (X^TX) encodes predictor relationships
    
- regression is an orthogonal projection problem
    
- residuals are orthogonal to predictor space
    

This matrix framework forms the mathematical backbone of modern statistical learning systems.