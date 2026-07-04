# 3.10.2. The Mathematical Framework of Lasso Regularization

The most prominent embedded mechanism within linear modeling relies on absolute value penalties, specifically via Lasso regression. 

Lasso regression introduces an $$L_1$$ regularization penalty term directly to the loss function. This mathematical constraint forces the algorithm to balance minimizing the standard predictive error against the absolute size of the learned coefficients.

The objective is to minimize the following regularized loss function:

$$
Loss_{L1} = \sum_{i=1}^{n} (y_i - \hat{y}_i)^2 + \lambda \sum_{j=1}^{p} |\beta_j|
$$

where:

- $$Loss_{L1}$$ = total regularized error
- $$y_i$$ = actual observed target value
- $$\hat{y}_i$$ = predicted target value
- $$\lambda$$ = regularization tuning parameter
- $$\beta_j$$ = coefficient weight of the $$ j $$-th feature
- $$p$$ = total number of engineered features

Because the geometry of the absolute value function creates sharp corners in the multidimensional parameter space, the optimization process forces the coefficients of less relevant features to become exactly zero. 

To emphasize this structural penalty, we restate the governing equation:

$$
Loss_{L1} = \sum_{i=1}^{n} (y_i - \hat{y}_i)^2 + \lambda \sum_{j=1}^{p} |\beta_j|
$$

When a coefficient mathematically reaches zero, the algorithm has simultaneously performed regression estimation and automated feature selection.
