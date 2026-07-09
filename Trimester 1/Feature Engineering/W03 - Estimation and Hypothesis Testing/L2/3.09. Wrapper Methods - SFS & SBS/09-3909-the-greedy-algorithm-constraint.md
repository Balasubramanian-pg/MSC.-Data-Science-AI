# 3.9.9. The Greedy Algorithm Constraint

Both Sequential Forward Selection and Sequential Backward Selection share a fundamental mathematical limitation: they are greedy algorithms.

A greedy algorithm makes the best locally optimal choice at each individual step. It assumes that chaining together local optimums will naturally result in the global optimum.

This assumption is mathematically flawed.

Once Sequential Forward Selection adds a feature, it can never remove it, even if subsequent additions make that first feature completely redundant. Conversely, once Sequential Backward Selection drops a feature, it can never reclaim it, even if a later pruning makes that dropped feature highly valuable again.

Because they cannot revisit previous decisions, these methods guarantee a highly optimized local subset, but they rarely find the true globally optimal combination.
