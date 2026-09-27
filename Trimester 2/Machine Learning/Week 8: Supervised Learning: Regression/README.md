# Week 8: Supervised Learning: Regression

Regression Fundamentals:

- Regression is a supervised learning task where the model predicts a continuous numerical output from input features.
- Simple linear regression uses a single explanatory feature to model a linear relationship with the target.
- Multiple linear regression models the relationship between multiple input features and a single continuous target.
- The model computes predictions by taking a linear combination of input features weighted by coefficients plus an intercept term.
- Ordinary least squares calculates parameters analytically using the normal equation to minimize the sum of squared differences.
- The closed form solution can be computationally expensive when dealing with a very large number of features.

Optimization with Gradient Descent:

- Gradient descent is an iterative optimization algorithm used when analytical solutions are too slow or impractical.
- The algorithm calculates the partial derivatives of the mean squared error cost function with respect to each model parameter.
- Batch gradient descent calculates gradients using the entire training dataset at each update step.
- Stochastic gradient descent updates parameters using one sample at a time, resulting in faster but noisier updates.
- Mini-batch gradient descent computes updates over small batches of training samples, combining stability and speed.
- The learning rate controls the step size taken in the direction of the negative gradient.
- Important: Setting the learning rate too high can cause the optimization to diverge, while setting it too low makes training excessively slow.
- Feature scaling using standardization or normalization helps gradient descent converge much faster.

Polynomial Regression:

- Polynomial regression fits non-linear relationships by creating polynomial combinations of the original features.
- The model remains linear in its parameters even though it represents non-linear curves relative to the raw inputs.
- Low-degree polynomials may underfit complex data, while high-degree polynomials can easily overfit noise.

Regularized Regression Models:

- Regularization adds a penalty term to the cost function to constrain large weights and prevent overfitting.
- Ridge regression adds an L2 norm penalty proportional to the sum of squared weight values.
- Ridge shrinks coefficients toward zero without making them exactly zero, making it suitable when many features contribute to the target.
- Lasso regression adds an L1 norm penalty proportional to the sum of absolute weight values.
- Lasso can force less important feature weights to become exactly zero, functioning as an automated feature selection method.
- Elastic net combines both L1 and L2 penalties using a mixing ratio, balancing sparsity with stability when features are correlated.
- Important: Input features must be standardized before applying regularized regression so that penalties apply equally across all features.

Evaluation Metrics for Regression:

- Mean absolute error measures the average magnitude of prediction errors without squaring them, making it robust to outliers.
- Mean squared error penalizes larger errors more heavily because errors are squared.
- Root mean squared error provides the error value in the same units as the target variable.
- R-squared indicates the proportion of target variance explained by the model features relative to a baseline mean predictor.
- Adjusted R-squared penalizes the addition of irrelevant features to provide a more reliable measure in multiple regression.

Assumptions of Linear Regression:

- Linearity assumes a straight line relationship between independent variables and the dependent variable.
- Independence of errors assumes that residual errors are uncorrelated with each other.
- Homoscedasticity assumes that the variance of the residuals remains constant across all levels of predicted values.
- Normality assumes that residual errors follow a normal distribution.
- Absence of multicollinearity requires that independent variables do not have strong linear correlations with one another.

Key Takeaways:

- Linear regression models relationships between input features and continuous numerical targets using linear parameter weights.
- Models can be optimized analytically using ordinary least squares or iteratively using gradient descent.
- Polynomial feature expansion models non-linear trends but raises the risk of overfitting.
- Ridge regression applies an L2 penalty to shrink coefficients and control variance.
- Lasso regression applies an L1 penalty to produce sparse models through automatic feature selection.
- Features must be scaled before applying regularization or running gradient descent.
- Regression performance is assessed using metrics like root mean squared error, mean absolute error, and adjusted R-squared.
