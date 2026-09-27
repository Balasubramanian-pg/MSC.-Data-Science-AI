# Migration in progress
# Lesson 2: Backpropagation

## The Backpropagation Algorithm: Mechanics and Implementation

The backpropagation algorithm evaluates the exact gradient of a scalar loss function with respect to every learnable parameter in a neural network. By applying the multivariate chain rule across nested computational operations, backpropagation routes error signals backward from the terminal loss to earlier layers. A rigorous understanding of the foundational error equations, vectorized batch execution, memory caching constraints, and numerical gradient verification ensures stable model training and reliable implementation.

## The Four Fundamental Equations of Backpropagation

### Equation 1 (BP1): Output Layer Error Signal

- Let $\delta^{[l]} \equiv \nabla_{z^{[l]}} \mathcal{L} = \frac{\partial \mathcal{L}}{\partial z^{[l]}} \in \mathbb{R}^{n^{[l]}}$ represent the **error vector** of layer $l$, measuring the sensitivity of the global loss to changes in pre-activations.
- At the terminal output layer $L$, the loss $\mathcal{L}$ depends on pre-activations $z^{[L]}$ through post-activations $a^{[L]} = g^{[L]}(z^{[L]})$.
- Applying the chain rule yields the first fundamental equation of backpropagation:
  $$\delta^{[L]} = \nabla_{a^{[L]}} \mathcal{L} \odot g'^{[L]}(z^{[L]})$$
  where $\odot$ denotes the element-wise **Hadamard product**, $\nabla_{a^{[L]}} \mathcal{L}$ is the loss gradient with respect to network outputs, and $g'^{[L]}(z^{[L]})$ is the element-wise activation derivative.
- Component-wise, each element evaluates as:
  $$\delta_j^{[L]} = \frac{\partial \mathcal{L}}{\partial a_j^{[L]}} g'^{[L]}(z_j^{[L]})$$
- When pairing activations with compatible loss functions (such as Sigmoid with Binary Cross-Entropy, or Softmax with Categorical Cross-Entropy), the derivative factor cancels the denominator of the loss derivative, simplifying to:
  $$\delta^{[L]} = \hat{y} - y$$

### Equation 2 (BP2): Backward Error Recurrence

- The second equation expresses the error signal $\delta^{[l]}$ of an internal layer $l$ using the downstream error signal $\delta^{[l+1]}$ from the subsequent layer:
  $$\delta^{[l]} = (W^{[l+1]T} \delta^{[l+1]}) \odot g'^{[l]}(z^{[l]})$$
- Expanding this recurrence component-wise isolates the error routed to neuron $j$ in layer $l$:
  $$\delta_j^{[l]} = \left( \sum_{k=1}^{n^{[l+1]}} w_{kj}^{[l+1]} \delta_k^{[l+1]} \right) g'^{[l]}(z_j^{[l]})$$
- The transposed weight matrix $W^{[l+1]T}$ maps incoming downstream errors backward across synaptic paths, summing contributions from every destination neuron $k$.
- The Hadamard multiplication scales these accumulated backpropagated signals by the local slope of the activation function ($g'^{[l]}(z_j^{[l]})$).

### Equation 3 (BP3): Bias Sensitivity Formulation

- The bias vector $b^{[l]}$ enters the pre-activation sum directly as an additive intercept: $z^{[l]} = W^{[l]} a^{[l-1]} + b^{[l]}$.
- The partial derivative of the pre-activation with respect to its bias is the identity matrix: $\frac{\partial z^{[l]}}{\partial b^{[l]}} = I$.
- Applying the chain rule demonstrates that the rate of change of the loss with respect to any layer bias vector equals its local error vector directly:
  $$\frac{\partial \mathcal{L}}{\partial b^{[l]}} = \delta^{[l]}$$
- Component-wise, the sensitivity of the loss to an individual neuron's bias equals its error signal: $\frac{\partial \mathcal{L}}{\partial b_j^{[l]}} = \delta_j^{[l]}$.

### Equation 4 (BP4): Weight Sensitivity and Outer Products

- Synaptic weights scale input activations to generate pre-activations: $z_j^{[l]} = \sum_k w_{jk}^{[l]} a_k^{[l-1]} + b_j^{[l]}$.
- Differentiating with respect to an individual weight gives $\frac{\partial z_j^{[l]}}{\partial w_{jk}^{[l]}} = a_k^{[l-1]}$.
- Applying the chain rule yields the fourth fundamental equation, expressing weight sensitivity as an **outer product**:
  $$\frac{\partial \mathcal{L}}{\partial W^{[l]}} = \delta^{[l]} (a^{[l-1]})^T$$
- Component-wise, the gradient with respect to weight $w_{jk}^{[l]}$ connecting input $k$ to neuron $j$ equals the product of the error at the destination neuron and the activation at the source neuron:
  $$\frac{\partial \mathcal{L}}{\partial w_{jk}^{[l]}} = \delta_j^{[l]} a_k^{[l-1]}$$

> [!Important]
> **The four backpropagation equations form a closed system**: BP1 computes the terminal error, BP2 propagates error signals backward through transposed weight matrices, and BP3 and BP4 combine error vectors with forward activations to compute parameter gradients.

## Vectorized Batch Formulation for Parallel Computation

### Matrix Representation Across Mini-Batches

- Executing backpropagation over a mini-batch of $m$ training samples replaces individual vector outer products with high-throughput matrix multiplications.
- Under the row-oriented convention standard in deep learning frameworks, activations form matrices $A^{[l]} \in \mathbb{R}^{m \times n^{[l]}}$, where each row corresponds to one training sample.
- Define the batch pre-activation gradient matrix as $dZ^{[l]} \in \mathbb{R}^{m \times n^{[l]}}$, where row $i$ represents the error vector $\delta^{[l]}$ for sample $i$:
  $$dZ^{[l]} \equiv \nabla_{Z^{[l]}} \mathcal{L}$$
- Define $dA^{[l]} \equiv \nabla_{A^{[l]}} \mathcal{L} \in \mathbb{R}^{m \times n^{[l]}}$ as the gradient of the total loss with respect to post-activations.

### Layer-Wise Tensor Gradient Derivations

- The backward sequence executes in reverse topological order ($l = L, L-1, \dots, 1$) using four matrix operations per layer:
- **Pre-Activation Error Evaluation:** Multiply incoming activation gradients element-wise by the local activation derivative:
  $$dZ^{[l]} = dA^{[l]} \odot g'^{[l]}(Z^{[l]})$$
- **Weight Gradient Aggregation:** Compute the matrix product between transposed pre-activation errors and incoming forward activations, averaging over the batch size $m$:
  $$dW^{[l]} = \frac{\partial \mathcal{L}}{\partial W^{[l]}} = \frac{1}{m} (dZ^{[l]})^T A^{[l-1]} \in \mathbb{R}^{n^{[l]} \times n^{[l-1]}}$$
- **Bias Gradient Summation:** Sum pre-activation errors across the batch dimension (columns of $dZ^{[l]}$), scaling by $\frac{1}{m}$:
  $$db^{[l]} = \frac{\partial \mathcal{L}}{\partial b^{[l]}} = \frac{1}{m} (dZ^{[l]})^T \mathbf{1}_m \in \mathbb{R}^{n^{[l]} \times 1}$$
  where $\mathbf{1}_m \in \mathbb{R}^{m \times 1}$ is a column vector of ones that performs batch-wise accumulation.
- **Upstream Activation Gradient Propagation:** Route error signals backward into the preceding layer to form incoming gradients for layer $l-1$:
  $$dA^{[l-1]} = \frac{\partial \mathcal{L}}{\partial A^{[l-1]}} = dZ^{[l]} W^{[l]} \in \mathbb{R}^{m \times n^{[l-1]}}$$

### Dimension Compatibility across the Backward Sweep

- Verifying matrix shapes during the backward pass prevents broadcasting bugs and dimension mismatch exceptions:
  - $(dZ^{[l]})^T A^{[l-1]} \longrightarrow (n^{[l]} \times m) \times (m \times n^{[l-1]}) = (n^{[l]} \times n^{[l-1]})$, matching the exact dimensions of $W^{[l]}$.
  - $(dZ^{[l]})^T \mathbf{1}_m \longrightarrow (n^{[l]} \times m) \times (m \times 1) = (n^{[l]} \times 1)$, matching the exact dimensions of $b^{[l]}$.
  - $dZ^{[l]} W^{[l]} \longrightarrow (m \times n^{[l]}) \times (n^{[l]} \times n^{[l-1]}) = (m \times n^{[l-1]})$, matching the exact dimensions of $A^{[l-1]}$.

> [!Tip]
> **Transposed matrix multiplications compute batch gradients**: evaluating $(dZ^{[l]})^T A^{[l-1]}$ computes outer products across all samples and sums them simultaneously, maximizing GPU tensor core utilization.

## Memory Footprint and Activation Checkpointing

### Activation Caching Demands

- Evaluating $dW^{[l]} = \frac{1}{m} (dZ^{[l]})^T A^{[l-1]}$ and $dZ^{[l]} = dA^{[l]} \odot g'(Z^{[l]})$ requires immediate access to fo