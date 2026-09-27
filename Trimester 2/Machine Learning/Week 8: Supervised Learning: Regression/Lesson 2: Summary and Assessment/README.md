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

Assessment Review and Practice Scenarios:

- Question: Why does adding irrelevant features cause standard R-squared to increase or stay the same?
- Answer: Standard R-squared reflects only the sum of squared errors, which never increases on training data when new variables are added, making adjusted R-squared necessary.
- Question: Which regularized regression method is best suited for identifying a small subset of key features from hundreds of inputs?
- Answer: Lasso regression is ideal because its L1 penalty sets non-essential feature coefficients exactly to zero.
- Question: What causes gradient descent to oscillate wildly or produce infinite loss values during regression training?
- Answer: The learning rate is set too high, causing weight updates to overshoot the minimum of the error surface.
- Question: How can residual plots detect violations of the homoscedasticity assumption?
- Answer: A funnel or cone shape in a plot of residuals against predicted values indicates that error variance changes across prediction ranges.
- Scenario: A model predicting house prices yields high training accuracy but severe test errors when using fifty polynomial terms.
- Recommended approach: Apply Ridge or Elastic Net regularization to constrain high-order coefficients and reduce variance.
- Scenario: A dataset contains several pairs of highly collinear explanatory features, causing unstable coefficients in standard linear regression.
- Recommended approach: Apply Ridge regression or Elastic Net to stabilize coefficient estimates across correlated variables.

Key Takeaways:

- Regression estimates continuous numeric targets by fitting weighted linear or polynomial equations.
- Optimization uses either closed-form matrix calculations via ordinary least squares or iterative updates via gradient descent.
- Ridge regression applies an L2 penalty to control variance without removing features.
- Lasso regression applies an L1 penalty to shrink unimportant coefficients to zero, performing automated feature selection.
- Elastic net balances L1 and L2 penalties to handle correlated predictors effectively.
- Standardized scaling of input features is mandatory for proper gradient descent convergence and fair regularization.
- Adjusted R-squared, root mean squared error, and residual diagnostic checks ensure robust model evaluation and assumption validation.
