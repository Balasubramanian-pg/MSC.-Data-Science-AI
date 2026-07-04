# 3.9.4. Mathematical Representation of SFS

The selection process relies entirely on a scoring function.

We can denote the evaluation metric as:

$$
J(X)
$$

where:

- $$J$$ = the evaluation function
    
- $$X$$ = the currently selected subset of features
    

At each step, the algorithm seeks to find a new unused feature, denoted as:

$$
x^+
$$

that maximizes the newly combined score:

$$
J(X + x^+)
$$

By strictly maximizing:

$$
J(X)
$$

the algorithm ensures that every addition definitively improves the predictive power of the machine learning model.
