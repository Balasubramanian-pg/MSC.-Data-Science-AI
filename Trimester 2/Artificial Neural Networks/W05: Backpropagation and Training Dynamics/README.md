# Migration in progress
# W05: Backpropagation and Training Dynamics

## Backpropagation and Training Dynamics in Neural Networks

The training of deep artificial neural networks centers on calculating error gradients across parameterized computational graphs and applying those gradients to update network parameters. The backpropagation algorithm implements reverse-mode automatic differentiation, allowing networks to compute exact partial derivatives of a scalar loss function with respect to millions of parameters in time proportional to the forward pass. Analyzing gradient propagation mechanics, optimizer trajectories, and training dynamics provides the theoretical basis required to control convergence speed and ensure robust generalization.

## Computational Graphs and Reverse-Mode Differentiation

### Directed Acyclic Graphs and Intermediate Caching

- Neural network architectures express computation as **directed acyclic graphs (DAGs)** where nodes represent mathematical operations or input variables, and directed edges convey tensor data.
- The **forward pass** traverses the computational graph in topological order, executing primitive tensor operations and saving intermediate activations in memory.
- The **backward pass** traverses the computational graph in reverse topological order, applying the multivariate chain rule to evaluate adjoints (gradients) with respect to every intermediate node.
- Caching forward activations ($a^{[l-1]}$ and $z^{[l]}$) is mandatory because evaluating the analytical derivatives of parameterized layers requires both upstream error signals and local inputs.

### Reverse-Mode Automatic Differentiation Mechanics

- Automatic differentiation evaluates derivatives algorithmically by decomposing expressions into elementary operations with known analytic derivatives.
- For a composite function $f: \mathbb{R}^n \to \mathbb{R}^m$, **forward-mode automatic differentiation** tracks directional derivatives forward, requiring $n$ sweeps to compute a full Jacobian matrix.
- **Reverse-mode automatic differentiation** tracks adjoint values backward from a scalar output ($m=1$) to all input variables simultaneously in a single sweep:
  $$\bar{u} = \frac{\partial \mathcal{L}}{\partial u}$$
- Because neural network training optimizes a solitary scalar objective function ($\mathcal{L} \in \mathbb{R}$) over millions of input parameters ($\theta \in \mathbb{R}^P$), reverse-mode autodiff evaluates parameter gradients in $O(1)$ reverse passes relative to the forward compute time.

### Vector-Jacobian Products (VJPs)

- Computing an explicit Jacobian matrix $J \in \mathbb{R}^{m \times n}$ for intermediate layers requires prohibitive memory allocations for large tensor dimensions.
- Reverse-mode automatic differentiation executes backpropagation via **Vector-Jacobian Products (VJPs)**:
  $$v^T J = \bar{y}^T \left( \frac{\partial y}{\partial x} \right)$$
  where $\bar{y} = \nabla_y \mathcal{L}$ represents the incoming scalar loss gradient with respect to layer outputs.
- Frameworks compute the vector-matrix product directly without ever instantiating the uncompressed, high-dimensional Jacobian matrix in memory.

> [!Tip]
> **Vector-Jacobian products** make deep backpropagation feasible: evaluating the adjoint product directly avoids allocating dense intermediate derivative matrices, keeping memory consumption linear with network depth.

## The Backpropagation Algorithm: Mathematical Derivation

### The Error Signal Definition

- Consider an $L$-layer Multi-Layer Perceptron where layer $l \in \{1, \dots, L\}$ computes:
  $$z^{[l]} = W^{[l]} a^{[l-1]} + b^{[l]}, \quad a^{[l]} = g^{[l]}(z^{[l]})$$
  with $a^{[0]} = x$, weight matrix $W^{[l]} \in \mathbb{R}^{n^{[l]} \times n^{[l-1]}}$, and bias vector $b^{[l]} \in \mathbb{R}^{n^{[l]}}$.
- Define the local **error vector** $\delta^{[l]} \in \mathbb{R}^{n^{[l]}}$ as the partial derivative of the scalar loss $\mathcal{L}$ with respect to the pre-activation vector $z^{[l]}$:
  $$\delta^{[l]} \equiv \frac{\partial \mathcal{L}}{\partial z^{[l]}} = \nabla_{z^{[l]}} \mathcal{L}$$
- The error vector represents the sensitivity of the global objective function to perturbations in the affine sum before the non-linear activation is applied.

### Output Layer Error Formulation

- For the final output layer $L$, apply the chain rule connecting the loss $\mathcal{L}$, the post-activation prediction $\hat{y} = a^{[L]}$, and the pre-activation vector $z^{[L]}$:
  $$\delta^{[L]} = \frac{\partial \mathcal{L}}{\partial z^{[L]}} = \left( \frac{\partial a^{[L]}}{\partial z^{[L]}} \right)^T \frac{\partial \mathcal{L}}{\partial a^{[L]}} = \nabla_{a^{[L]}} \mathcal{L} \odot g'^{[L]}(z^{[L]})$$
  where $\odot$ denotes the element-wise Hadamard product.
- When coupling an activation function with its natural statistical loss distribution, exact derivative cancellations simplify $\delta^{[L]}$:
  - **Mean Squared Error with Identity Output:** $\delta^{[L]} = \frac{1}{m} (\hat{y} - y)$.
  - **Binary Cross-Entropy with Sigmoid Output:** $\delta^{[L]} = \hat{y} - y$.
  - **Categorical Cross-Entropy with Softmax Output:** $\delta^{[L]} = \hat{y} - y$.

### Backward Error Propagation Across Hidden Layers

- To compute the error signal $\delta^{[l]}$ at an internal hidden layer $l$ from the downstream error signal $\delta^{[l+1]}$, apply the multivariate chain rule:
  $$\delta^{[l]} = \frac{\partial \mathcal{L}}{\partial z^{[l]}} = \left( \frac{\partial z^{[l+1]}}{\partial z^{[l]}} \right)^T \frac{\partial \mathcal{L}}{\partial z^{[l+1]}} = \left( \frac{\partial z^{[l+1]}}{\partial z^{[l]}} \right)^T \delta^{[l+1]}$$
- Expand the intermediate dependency through post-activations: $z^{[l+1]} = W^{[l+1]} g^{[l]}(z^{[l]}) + b^{[l+1]}$.
- Differentiating with respect to $z^{[l]}$ yields the Jacobian factor:
  $$\frac{\partial z^{[l+1]}}{\partial z^{[l]}} = W^{[l+1]} \text{diag}(g'^{[l]}(z^{[l]}))$$
- Transposing and multiplying by $\delta^{[l+1]}$ yields the fundamental **backpropagation recurrence relation**:
  $$\delta^{[l]} = (W^{[l+1]T} \delta^{[l+1]}) \odot g'^{[l]}(z^{[l]})$$
- The transposed weight matrix $W^{[l+1]T}$ routes error signals backward across synapses, while the element-wise product scales the transmitted error by the local activation derivative.

### Parameter Gradient Equations and Batch Matrix Form

- Applying the chain rule to the learnable parameters in layer $l$ yields the weight and bias gradients:
  $$\frac{\partial \mathcal{L}}{\partial W^{[l]}} = \delta^{[l]} (a^{[l-1]})^T, \quad \frac{\partial \mathcal{L}}{\partial b^{[l]}} = \delta^{[l]}$$
- The weight gradient is the **outer product** of the outgoing error vector $\delta^{[l]}$ and the incoming activation vector $a^{[l-1]}$.
- For a mini-batch of $m$ instances organized into row matrices where activations $A^{[l-1]} \in \mathbb{R}^{m \times n^{[l-1]}}$ and pre-activation gradients $dZ^{[l]} \in \mathbb{R}^{m \times n^{[l]}}$, the batch updates evaluate via matrix products:
  $$dZ^{[l]} = dA^{[l]} \odot g'^{[l]}(Z^{[l]})$$
  $$dW^{[l]} = \frac{1}{m} (dZ^{[l]})^T A^{[l-1]} \in \mathbb{R}^{n^{[l]} \times n^{[l-1]}}$$
  $$db^{[l]} = \frac{1}{m} (dZ^{[l]})^T \mathbf{1}_m \in \mathbb{R}^{n^{[l]} \times 1}$$
  $$dA^{[l-1]} = dZ^{[l]} W^{[l]} \in \mathbb{R}^{m \times n^{[l-1]}}$$

> [!Important]
> **The backpropagation recurrence** maps errors in reverse: layer error vectors propagate backward via multiplication by transposed weight matrices ($W^T \delta$), scaling by local activation derivatives to produce outer-product parameter updates.

## Gradient Descent Regimes and Batch Dynamics

### Batch, Stochastic, and Mini-Batch Regimes

- **Batch Gradient Descent (BGD)** evaluates the true empirical gradient across the entire training dataset of $N$ samples before executing a parameter update:
  $$\theta_{t+1} = \theta_t - \eta \frac{1}{N} \sum_{i=1}^N \nabla_\theta \mathcal{L}_i(\theta_t)$$
  BGD provides a deterministic, monotonic descent on convex surfaces, but becomes computationally intractable for large datasets and cannot escape sharp sub-optimal local minima.
- **Stochastic Gradient Descent (SGD)** updates parameters after computing the gradient on a single randomly selected sample ($m=1$):
  $$\theta_{t+1} = \theta_t - \eta \nabla_\theta \mathcal{L}_i(\theta_t)$$
  SGD requires minimal memory and updates parameters quickly, but high gradient variance induces violent fluctuations that hinder exact convergence.
- **Mini-Batch Gradient Descent** balances computational efficiency and update stability by evaluating gradients over a small subset of data ($m \in [32, 2048]$):
  $$\theta_{t+1} = \theta_t - \eta \frac{1}{m} \sum_{i=1}^m \nabla_\theta \mathcal{L}_i(\theta_t)$$
  Mini-batches leverage GPU matrix-multiplication pipelines while maintaining sufficient gradient variance to escape poor local traps.

### Stochastic Noise as an Optimization Regularizer

- The difference between a mini-batch gradient estimate and the true batch gradient acts as zero-mean **stochastic gradient noise**:
  $$\epsilon_t = \nabla \mathcal{L}_{\text{batch}}(\theta_t) - \nabla \mathcal{L}_{\text{full}}(\theta_t), \quad \mathbb{E}[\epsilon_t] \approx 0$$
- The covariance of this noise scales inversely with batch size: $\text{Cov}(\epsilon_t) \propto \frac{1}{m}$.
- Stochastic noise performs an implicit thermal exploration similar to Langevin dynamics, helping the optimizer escape shallow saddle points and sharp, non-generalizing local minima.
- Training with moderately sized mini-batches often achieves superior validation generalization compared to full-batch training, which tends to converge into sharp minima.

### The Batch Size and Learning Rate Scaling Law

- Increasing the mini-batch size reduces gradient noise variance, allowing larger parameter steps without causing optimization instability.
- The **Linear Scaling Rule** states that when multiplying the mini-batch size by a scalar factor $k$ ($m' = k \cdot m$), the base learning rate should also be scaled by $k$ ($\eta' = k \cdot \eta$).
- The mathematical justification rests on update equivalence: executing one large batch step with learning rate $k\eta$ approximates the cumulative parameter displacement of $k$ consecutive small batch steps with learning rate $\eta$.
- When scaling to massive batch sizes, the linear rule breaks down due to curvature constraints, requiring **gradual learning rate warmup** to prevent early optimization divergence.

> [!Tip]
> **Mini-batch noise aids generalization**: the variance inherent in smaller mini-batches prevents the optimizer from getting trapped in sharp, overfitted minima, driving parameters toward wide, robust basins.

## Momentum-Based and