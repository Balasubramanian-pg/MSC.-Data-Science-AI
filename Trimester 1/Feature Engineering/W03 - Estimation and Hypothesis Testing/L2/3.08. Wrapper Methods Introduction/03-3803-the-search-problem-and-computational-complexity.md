# 3.8.3. The Search Problem and Computational Complexity

By evaluating features through model training, wrapper methods convert the feature selection process into an enormous combinatorial search problem. 

To guarantee finding the absolute best combination of features, an algorithm would have to evaluate every possible combination. The total number of subsets in this theoretical search space is calculated using the following formula:

$$
S = 2^n
$$

where:

- $$S$$ = total number of possible feature subsets
    
- $$n$$ = total number of available features in the dataset
    

Because this growth is exponential, evaluating every combination quickly becomes mathematically impossible. An exhaustive search on a modest dataset containing only 50 features would require evaluating over one quadrillion distinct models.

$$
S = 2^{50}
$$

Because exhaustive search is computationally infeasible, wrapper methods must employ targeted, heuristic search strategies to navigate the feature space efficiently.
