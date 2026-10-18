## Formal Statement and Assumptions

- Formulated by George Cybenko (1989) for sigmoidal activations and generalized by Kurt Hornik (1991) to arbitrary non-constant, continuous, and bounded activation functions:

>[!Tip]
>The **Universal Approximation Theorem** proves that a standard feedforward architecture with a **single hidden layer** of finite width can approximate any continuous function
># $f: K \to \mathbb{R}$
>on a compact subset
># $K \subset \mathbb{R}^n$
>to arbitrary precision $\epsilon > 0$.

- Formally, for every continuous function
- $f \in C(K)$ and metric $\epsilon > 0$,
- there exists an integer $N$, weight vectors
# $w_i \in \mathbb{R}^n$,
- bias scalars $b_i \in \mathbb{R}$, and output weights $v_i \in \mathbb{R}$ such that:

# $$\left| \sum_{i=1}^N v_i \, g(w_i^T x + b_i) - f(x) \right| < \epsilon \quad \forall x \in K$$
