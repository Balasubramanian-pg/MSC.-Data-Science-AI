# Migration in progress
# Lesson 1: Introduction

## Introduction to Backpropagation and Training Dynamics

Designing multi-layer neural network architectures represents only the first phase of deep learning; establishing how internal parameters adapt from empirical observations represents the operational core. The training process requires resolving the credit assignment problem, computing exact sensitivities across nested functions, and steering high-dimensional parameters toward minimal loss configurations. Understanding how computational graphs, reverse-mode automatic differentiation, and optimization dynamics interact establishes the theoretical framework for training deep neural networks.

## The Credit Assignment Challenge and Historical Evolution

### The Structural Dilemma of Hidden Layers

- Early threshold models, such as the Rosenblatt Perceptron, possessed explicit error-driven update rules because supervisory target labels matched the output neuron directly.
- Adding intermediate hidden layers creates the **credit assignment problem**: determining how much responsibility an individual hidden neuron or synaptic weight bears for an observed error at the final output.
- Because training datasets provide ground-truth labels only for the terminal output layer, hidden layers lack direct supervisory error targets.
- Minsky and Papert's 1969 critique emphasized this limitation, asserting that no effective mathematical rule existed to train multi-layered networks of threshold logic units.

### The Rumelhart, Hinton, and Williams Breakthrough

- The historical bottleneck broke in 1986 when David Rumelhart, Geoffrey Hinton, and Ronald Williams demonstrated that combining smooth, continuous activations with the **multivariate chain rule** resolves the credit assignment problem.
- By replacing non-differentiable step functions with continuous sigmoid curves, the composite network becomes an **end-to-end differentiable function**.
- The resulting algorithm, **backpropagation**, propagates continuous error signals from the output layer backward through hidden units to calculate exact partial derivatives for every weight and bias.
- Backpropagation demonstrated that hidden layers can autonomously discover internal latent representations without needing manual feature annotations.

> [!Tip]
> **The credit assignment problem** is solved by continuous differentiability: replacing hard threshold steps with smooth activations allows the chain rule to route fractional error blame to every weight in a deep network.

## The Tripartite Loop of Neural Training

### Stage 1: Forward Propagation and Activation Caching

- The training cycle begins with **forward propagation**, where input tensors pass downstream across successive layers.
- Each layer computes an affine transformation ($z^{[l]} = W^{[l]} a^{[l-1]} + b^{[l]}$) followed by an element-wise activation ($a^{[l]} = g^{[l]}(z^{[l]})$).
- The forward pass terminates at the objective loss function $\mathcal{L}(\hat{y}, y)$, which quantifies the discrepancy between model predictions and true targets as a scalar error value.
- The forward execution graph must cache intermediate activations ($a^{[l-1]}$) and pre-activations ($z^{[l]}$) in memory; these tensors form the local coefficients needed to compute weight gradients during the backward pass.

### Stage 2: Backward Propagation and Gradient Evaluation

- Once the scalar loss is evaluated, **backward propagation** traverses the computational graph in reverse topological order.
- The backward pass applies the multivariate chain rule recursively, computing the gradient of the loss with respect to pre-activations ($\delta^{[l]} = \nabla_{z^{[l]}} \mathcal{L}$) and parameters ($\nabla_{W^{[l]}} \mathcal{L}$, $\nabla_{b^{[l]}} \mathcal{L}$).
- The backward sweep produces exact first-order derivatives that define the direction of steepest loss increase in parameter space.
- Backpropagation terminates when gradients have been evaluated for every learnable tensor and input coordinate.

### Stage 3: Parameter Optimization and State Updates

- Evaluating gradients does not alter network weights on its own; parameter modification occurs during the **optimization step**.
- An **optimizer** (such as Stochastic Gradient Descent, Momentum, or Adam) takes the computed gradients and updates parameter tensors:
  $$\theta_{t+1} = \theta_t - \Delta(\nabla_\theta \mathcal{L}, \mathcal{S}_t, \eta)$$
  where $\mathcal{S}_t$ represents internal optimizer state (such as momentum velocity or adaptive moment accumulators), and $\eta$ is the learning rate.
- Once parameters update, the cached forward tensors are freed from memory, and the cycle repeats on subsequent mini-batches until convergence criteria are met.

> [!Important]
> **Gradient evaluation and parameter updating are distinct**: backpropagation evaluates exact loss sensitivities across parameters, whereas optimization algorithms decide how to adjust weights using those sensitivities and historical update momentum.

## Computational Graphs and Automatic Differentiation Foundations

### Graph Abstraction of Tensor Operations

- Modern deep learning frameworks model execution using **computational graphs**, where leaf nodes represent input data or parameters, interior nodes represent elementary tensor operations, and edges convey multidimensional arrays.
- Graph abstractions allow software engines to optimize execution via kernel fusion, memory reuse, and automated parallelization across hardware accelerators.
- During forward execution, frameworks build dynamic or static graph traces that define the exact topological sequence required for reverse traversal.

### Why Alternative Differentiation Methods Fail

- **Numerical differentiation** approximates derivatives using finite difference quotients ($\frac{f(\theta + \epsilon) - f(\theta)}{\epsilon}$); evaluating a model with $P$ parameters requires $P+1$ full forward passes, making it computationally impossible for networks with millions of weights.
- 