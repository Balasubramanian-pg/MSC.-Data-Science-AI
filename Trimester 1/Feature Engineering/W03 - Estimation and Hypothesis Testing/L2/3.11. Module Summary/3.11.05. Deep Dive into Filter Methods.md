# 3.11.5. Deep Dive into Filter Methods

Filter methods serve as the first line of defense against noise and redundancy. They evaluate features strictly independently of any predictive learning algorithm, making them exceptionally fast and highly scalable for massive datasets.

### 5.1 Pearson Correlation

The Pearson correlation coefficient detects strictly linear dependencies between continuous variables.

$$
r = \frac{\sum_{i=1}^{n} (X_i - \bar{X})(Y_i - \bar{Y})}{\sqrt{\sum_{i=1}^{n} (X_i - \bar{X})^2 \sum_{i=1}^{n} (Y_i - \bar{Y})^2}}
$$

where:

- $$r$$ = linear correlation metric
- $$X_i$$ = independent variable observations
- $$Y_i$$ = target variable observations

### 5.2 Spearman Rank Correlation

To capture monotonic relationships without assuming strict linearity, the Spearman rank correlation evaluates the mathematical rank of the data rather than the raw values. This method is highly robust to extreme continuous outliers.

$$
\rho = 1 - \frac{6 \sum_{i=1}^{n} d_i^2}{n(n^2 - 1)}
$$

where:

- $$\rho$$ = Spearman monotonic correlation
- $$d_i$$ = difference between the ranks of corresponding variables
- $$n$$ = total number of observations

### 5.3 Mutual Information

Mutual Information utilizes principles from information theory to uncover arbitrary dependencies, natively identifying highly complex non-linear interactions that correlation coefficients fail to detect.

$$
I(X; Y) = \sum_{y \in Y} \sum_{x \in X} p(x,y) \log \left( \frac{p(x,y)}{p(x)p(y)} \right)
$$

where:

- $$I(X; Y)$$ = calculated mutual information
- $$p(x,y)$$ = joint probability mass function
- $$p(x)$$ = marginal probability of the feature

### 5.4 Fisher Score

The Fisher Score ranks independent variables based on their capacity to mathematically separate distinct categorical classes, explicitly maximizing the between-class variance while minimizing within-class variance.

$$
F = \frac{\sigma_{between}^2}{\sigma_{within}^2}
$$

where:

- $$F$$ = Fisher discrimination score
- $$\sigma_{between}^2$$ = variance between distinct class means
- $$\sigma_{within}^2$$ = variance within individual classes
