
### Algebraic Proof of Linear Cascades

- Cascading multiple dense layers without intermediate non-linear activation functions provides no representational benefit over a single linear transformation.
- *Proof:* Consider an $L$-layer network where every activation function is the identity operator $g^{[l]}(z) = z$.
- The output of the first layer evaluates to:
  $$a^{[1]} = W^{[1]} x + b^{[1]}$$
- The output of the second layer evaluates to:
  $$a^{[2]} = W^{[2]} a^{[1]} + b^{[2]} = W^{[2]} (W^{[1]} x + b^{[1]}) + b^{[2]} = (W^{[2]} W^{[1]}) x + (W^{[2]} b^{[1]} + b^{[2]})$$
- By mathematical induction, the final output across $L$ layers expands to:
  $$a^{[L]} = \left( \prod_{l=L}^1 W^{[l]} \right) x + \sum_{i=1}^{L-1} \left( \prod_{j=L}^{i+1} W^{[j]} \right) b^{[i]} + b^{[L]}$$
- Defining the effective parameters:
  $$W_{\text{eff}} = \prod_{l=L}^1 W^{[l]} \in \mathbb{R}^{n^{[L]} \times n^{[0]}}, \quad b_{\text{eff}} = \sum_{i=1}^{L-1} \left( \prod_{j=L}^{i+1} W^{[j]} \right) b^{[i]} + b^{[L]} \in \mathbb{R}^{n^{[L]} \times 1}$$
- The system collapses into a single affine transformation:
  $$\hat{y} = a^{[L]} = W_{\text{eff}} x + b_{\text{eff}}$$
- Stacking linear layers without non-linearities does not alter the hypothesis class, leaving the model incapable of separating non-linearly separable distributions.
