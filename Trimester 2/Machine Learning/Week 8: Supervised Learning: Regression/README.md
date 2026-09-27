# Migration in progress
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
- Ridge shrinks coefficients toward zero without making them exactly zero, making it s