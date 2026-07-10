# 3.8.7. Sequential Backward Selection (SBS)

The inverse heuristic search strategy to SFS is Sequential Backward Selection (SBS). 

Instead of building a subset from scratch, Sequential Backward Selection represents a "top-down" approach. The algorithm begins by training a model on the complete, full feature set. In the first iteration, it temporarily removes each feature one by one, training a new model to see what happens to the performance metric. 

The algorithm permanently drops the feature whose removal hurts model performance the least, or in cases of severe noise, whose removal actually improves performance. This iterative elimination continues, stripping away the least valuable features one at a time until the desired subset size is reached. 

Because SBS starts with all features evaluated simultaneously, it is often better at preserving complex interactions than SFS, though it requires significantly more computational power initially.
