# 3.9.7. Mathematical Objective of SBS

Just like the forward approach, SBS relies on the continuous evaluation of the objective function:

$$
J(X)
$$

However, SBS seeks to identify a feature to remove, denoted as:

$$
x^-
$$

such that removing it minimizes the performance drop, thereby maximizing:

$$
J(X - x^-)
$$

Because SBS begins with the full feature set, it requires significantly more computational power during the initial iterations than SFS, as training models on all features simultaneously is highly expensive.
