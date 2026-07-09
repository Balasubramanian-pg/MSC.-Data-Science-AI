# 3.9.2. The Combinatorial Search Space

When treating the model as the final evaluator, finding the absolute best feature subset requires testing every possible feature combination.

The total number of possible subsets is defined by:

$$
S = 2^n
$$

where:

- $$S$$ = total number of feature combinations
    
- $$n$$ = total number of available features in the dataset
    

Because this search space grows exponentially, evaluating all combinations becomes computationally impossible for large datasets. To navigate this massive space efficiently, data scientists must deploy heuristic search algorithms. The two most prominent strategies for this task are Sequential Forward Selection and Sequential Backward Selection.
