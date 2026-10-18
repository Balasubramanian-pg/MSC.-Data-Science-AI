### Rank Degradation in Linear Cascades

- By the [Sylvester and fundamental rank inequalities](https://math.stackexchange.com/questions/298836/sylvester-rank-inequality-operatornamerank-a-operatornamerankb-leq-o), the rank of a matrix product is upper-bounded by the minimum rank of any constituent matrix:
  #  $$\text{rank}(W_{\text{eff}}) = \text{rank}\left( \prod_{l=L}^1 W^{[l]} \right) \le \min_{l \in \{1, \dots, L\}} \text{rank}(W^{[l]})$$

- If any intermediate layer $k$ acts as a **bottleneck** by having fewer neurons than the input ($n^{[k]} < n^{[0]}$), the maximum rank of $W_{\text{eff}}$ is strictly capped at $n^{[k]}$.
- A low-rank bottleneck projects the input vector into a compressed lower-dimensional subspace, causing permanent information loss that subsequent linear layers cannot restore.

> [!Important]
> **Non-linear activations** prevent linear collapse: omitting non-linearities between layers reduces a network of arbitrary depth to a single matrix multiplication, completely eliminating the representational advantage of depth.
