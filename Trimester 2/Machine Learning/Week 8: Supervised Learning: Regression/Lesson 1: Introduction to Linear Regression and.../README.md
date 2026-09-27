# Lesson 1: Introduction to Linear Regression and...

Linear Regression Fundamentals:

- Linear regression models the relationship between one or more independent predictor variables and a continuous numeric target variable.
- Simple linear regression uses a single feature to predict the target using a straight line equation defined by a slope and an intercept.
- Multiple linear regression extends this approach to handle multiple features simultaneously by assigning a weight coefficient to each feature.
- The model assumes a linear relationship where changes in the input variables produce proportional changes in the target output.

The Hypothesis Function and Cost Function:

- The hypothesis function calculates the predicted value as a weighted sum of the input features plus a constant bias term.
- Residuals represent the numerical difference between the actual observed target values and the values predicted by the model.
- The mean squared error cost function measures overall performance by averaging the squared values of these residuals across all training instances.
- Squaring residuals ensures that positive and negative prediction errors do not cancel each other out.
- The squaring operation penalizes larger prediction mistakes much more severely than small deviations.

Finding the Best Fit with Ordinary Least Squares:

- Ordinary least squares aims to find the exact parameter weights that minimize the total sum of squared residuals.
- For simple linear regression, closed-form formulas directly calculate the optimal slope and intercept using sample variances and covariances.
- For multiple linear regression, the normal equation uses matrix operations to analytically solve for the exact optimal weights.
- Important: The normal equation requires computing the inverse of a feature matrix, which becomes computationally impractical when dealing with tens of thousands of features.

Optimization Using Gradient Descent:

- Gradient descent provides an alternative iterative optimization approach that scales well to large datasets and feature spaces.
- The algorithm computes the partial derivatives of the cost function with respect to each model parameter to identify the slope of the error surface.
- Parameters are repeatedly adjusted in the opposite direction of the gradient to step toward the minimum cost.
- The learning rate hyperparameter determines the size of each step taken during parameter updates.
- Important: Setting a learning rate too large can cause parameters to oscillate wildly and diverge, while a tiny learning rate leads to very slow training.
- Gradient descent can run in batch mode using the entire dataset, stochastic mode using one sample at a time, or mini-batch mode using small sample subsets.
- Feature scaling ensures all input variables are on comparable numerical scales, allowing gradient descent to converge much faster.

Core Assumptions of Linear Regression:

- Linearity requires that the relationship between the features and the target outcome is linear.
- Independence of errors assumes that residual errors from different data points are not correlated with one another.
- Homoscedasticity assumes that the variance of the residuals remains uniform across all ranges of predicted values.
- Normality assumes that the prediction error terms follow a standard bell-shaped normal distribution.
- Absence of multicollinearity requires that the input feature variables are not heavily correlated with each other.

Basic Evaluation Metrics:

- Mean absolute error calculates the average magnitude of absolute errors, providing an intuitive error scale in original units.
- Mean squared error provides a sensitive measure of model fit that penalizes occasional large outliers.
- Root mean squared error takes the square root of the mean squared error, returning the metric back to the original units of the target.
- The coefficient of determination, known as R-squared, shows the proportion of target variance explained by the regression line compared to a simple mean baseline.

Key Takeaways:

- Linear regression predicts continuous target variables by fitting a weighted linear combination of input features.
- Model performance is tracked using the mean squared error cost function, which squares individual residual errors.
- Parameters can be solved directly using the ordinary least squares normal equation or iteratively using gradient descent.
- Gradient descent requires careful tuning of the learning rate and benefits significantly from feature scaling.
- The model relies on key statistical assumptions including linearity, homoscedasticity, error independence, and low multicollinearity.
- Standard evaluation metrics include mean absolute error, root mean squared error, and R-squared.
