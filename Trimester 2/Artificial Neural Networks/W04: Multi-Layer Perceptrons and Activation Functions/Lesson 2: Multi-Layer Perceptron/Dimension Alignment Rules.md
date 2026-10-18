- In an $L$-layer network, let $n^{[l]}$ denote the number of neurons in layer $l$, where $l \in \{0, 1, \dots, L\}$ and $l=0$ designates the input layer.
- The **weight matrix** for layer $l$, denoted $W^{[l]}$, has dimensions $(n^{[l]} \times n^{[l-1]})$, where rows correspond to the destination neurons and columns correspond to the source features.
- The **bias vector** for layer $l$, denoted $b^{[l]}$, has dimensions $(n^{[l]} \times 1)$, providing an independent intercept for each destination neuron.
- For an individual input vector $x \in \mathbb{R}^{n^{[0]} \times 1}$, the forward equations evaluate as:
  $$z^{[l]} = W^{[l]} a^{[l-1]} + b^{[l]}$$
  $$a^{[l]} = g^{[l]}(z^{[l]})$$
  where $a^{[0]} = x$, pre-activation $z^{[l]} \in \mathbb{R}^{n^{[l]} \times 1}$, and post-activation $a^{[l]} \in \mathbb{R}^{n^{[l]} \times 1}$.
- Verifying inner-dimension compatibility across layers ($(n^{[l]} \times n^{[l-1]}) \times (n^{[l-1]} \times 1) \to (n^{[l]} \times 1)$) prevents dimension mismatch errors during forward execution.
