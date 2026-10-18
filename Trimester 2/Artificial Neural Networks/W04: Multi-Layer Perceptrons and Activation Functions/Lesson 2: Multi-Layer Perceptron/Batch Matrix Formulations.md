- Processing a mini-batch of $m$ training instances simultaneously accelerates execution on **parallel hardware** by replacing sequential vector operations with matrix multiplication.
- Under the **column-oriented convention**, activations form matrices of size $(n^{[l]} \times m)$ where each column represents a distinct training sample:

>[!Important]
> # $$Z^{[l]} = W^{[l]} A^{[l-1]} + b^{[l]} \mathbf{1}_m^T$$ $$A^{[l]} = g^{[l]}(Z^{[l]})$$

- where $\mathbf{1}_m^T$ is a **row vector** of ones of length $m$, broadcasting the $(n^{[l]} \times 1)$ bias vector across all $m$ columns.
- Under the **row-oriented convention** standard in modern frameworks (such as PyTorch and TensorFlow), each sample forms a row in a design matrix of shape $(m \times n^{[l]})$:

>[!Note]
># $$Z^{[l]} = A^{[l-1]} (W^{[l]})^T + \mathbf{1}_m (b^{[l]})^T$$ $$A^{[l]} = g^{[l]}(Z^{[l]})$$
- Batch evaluation preserves the identical mathematical transformation for each individual instance while maximizing cache locality and GPU tensor core utilization.
