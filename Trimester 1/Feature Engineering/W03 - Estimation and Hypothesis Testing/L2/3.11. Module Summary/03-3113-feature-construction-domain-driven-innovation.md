# 3.11.3. Feature Construction: Domain-Driven Innovation

While extraction relies heavily on linear algebra and variance maximization, feature construction is a highly creative, domain-dependent engineering process. 

Feature construction generates entirely new variables from existing ones to expose hidden relationships. The primary goal is to make complex, non-linear patterns explicitly available so that simpler estimators, such as Logistic Regression, can successfully converge on a robust decision boundary.

Consider a real estate dataset containing raw price and total square footage. A strictly linear model may fail to capture the purchasing threshold behavior. By constructing a new mathematical ratio, we provide the model with a direct indicator of value:

$$
Ratio = \frac{Price}{Area}
$$

where:

- $$Ratio$$ = the newly engineered value metric
- $$Price$$ = the original continuous cost feature
- $$Area$$ = the original continuous size feature

Similarly, synergistic interactions between separate demographics are made explicit through multiplication, fundamentally expanding the algorithm's geometric learning capacity.
