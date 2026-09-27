# Migration in progress
# Lesson 2: Summary and Assessment

Regression Summary:

- Regression models estimate continuous numeric values from one or more explanatory features.
- Linear regression builds predictions by summing weighted feature values alongside a bias intercept term.
- Ordinary least squares minimizes the sum of squared differences between actual and predicted target values.
- The normal equation provides an analytical solution but scales poorly when feature counts become very large.
- Gradient descent updates weights iteratively using partial derivatives of the mean squared error cost function.
- Proper feature scaling through standardization allows gradient descent to converge reliably and quickly.

Regularization and Model Selection:

- Polynomial regression captures non-linear curves by transforming features into higher-order power terms.
- High-degree polynomials frequently overfit training noise and suffer from high variance.
- Regularization adds a mathematical penalty to the loss function to constrain weight magnitudes.
- Ridge regression adds an L2 penalty proportional to squared weight values, shrinking coefficients toward zero without eliminating them.
- Lasso regression adds an L1 penalty proportional to absolute weight values, driving unimportant weights to zero for feature selection.
- Elastic net combines both L1 and L2 penalties, providing stability when features display strong correlations.
- Important: Input features must always be standardized prior to fitting regularized models so penalties apply uniformly across variables.

Evaluation Metrics and Diagnostics:

- Mean absolute error calculates average error magnitude and resists distortions from occasional large outliers.
- Mean squared error heavily penalizes large errors by squaring individual residuals.
- Root mean squared error maintains the squared penalty while expressing error values in original target units.
- R-squared measures the proportion of target variance explained by the regression line compared to a simple average baseline.
- Adjusted R-squared incorporates a penalty for each added feature, preventing false performance gains from irrelevant predictors.
- Diagnostic residual plots help check essential assumptions such as linearity, homoscedasticity, and normal error distributions.

Assessment Review and Practice Scenario