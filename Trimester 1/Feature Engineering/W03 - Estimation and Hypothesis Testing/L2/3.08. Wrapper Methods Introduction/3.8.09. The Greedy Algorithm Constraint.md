# 3.8.9. The Greedy Algorithm Constraint

Both Sequential Forward Selection and Sequential Backward Selection suffer from a critical mathematical limitation: they are greedy algorithms. 

A greedy algorithm makes the best locally optimal choice at each specific step, assuming that these local choices will ultimately lead to the global optimum. However, this assumption is frequently false. Once SFS adds a feature, it can never remove it later, even if subsequent additions render the first feature obsolete. Similarly, once SBS drops a feature, it can never retrieve it.

>[!Note]
> Because greedy algorithms cannot revisit past decisions, they guarantee a computationally fast local optimum, but they do not guarantee finding the global optimum subset.

To find the true global optimum, one must return to the exhaustive search space calculation:

$$
S = 2^n
$$

Because computing $$2^n$$ models is impossible for large datasets, practitioners accept the greedy constraint as a necessary compromise for computational feasibility.
