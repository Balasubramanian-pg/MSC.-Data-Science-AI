# Migration in progress
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
- The learning rate hyperparameter determin