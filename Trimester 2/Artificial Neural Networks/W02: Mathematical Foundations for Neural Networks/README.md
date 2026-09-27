# W02: Mathematical Foundations for Neural Networks

**Why Mathematical Foundations Matter**

Neural networks are **mathematical objects** before they are code. The training process is an *optimization problem*, the forward pass is a *sequence of matrix operations*, and the learning signal comes from *derivatives computed via the chain rule*.

- Without this math, you can **use** a neural network but cannot **explain why it works**, **debug why it is not converging**, or **design a new loss function**.
- The four mathematical pillars that underpin most modern AI algorithms are **linear algebra**, **calculus and optimization**, **probability and statistics**, and **information theory**.

> [!Tip]
> **Linear algebra** represents the data and the network; **calculus** tells the network how to learn; **probability** handles uncertainty; and **optimization** drives the learning process.

**Linear Algebra: How Neural Networks Represent Data**

Linear algebra is the **structural foundation** of neural network models. It provides the language for representing data, network parameters, and transformations.

**Vectors and Vector Spaces**

- A **vector** represents a *data instance* in a multidimensional space. Each dimension corresponds to a feature.
- A **vector space** is the mathematical structure where these vectors live, enabling operations like **addition** and **scalar multiplication**.
- The **dot product** measures *similarity* between two vectors and is fundamental to how neurons compute weighted sums.

**Matrices and Matrix Operations**

- A **matrix** models *collections of data*, *layers of a neural network*, *synaptic weights*, and *forward propagation operations*.
- **Matrix multiplication** is the core operation of the forward pass. It represents a *linear transformation* of the input data.
- **Transposition**, **determinants**, and **eigenvalues** are frequent operations in both supervised and unsupervised learning algorithms.

**Eigenvalues and Eigenvectors**

- **Eigenvectors** are directions that *do not change* under a linear transformation; **eigenvalues** are the *scaling factors* along those directions.
- They are used in **principal component analysis (PCA)** for dimensionality reduction and in analyzing the stability of optimization.

**Singular Value Decomposition (SVD)**

- **SVD** decomposes *any matrix* into three matrices, revealing its fundamental structure.
- Used for **dimensionality reduction**, **low-rank approximation**, **recommender systems**, and **improving numerical stability** of methods.
- **PCA** is a special case of SVD applied to centered data.

**Matrix Decompositions**

- **LU factorization** and **QR factorization** are used to *solve systems of equations* and *improve numerical stability*.
- **Matrix decompositions** allow you to *detect redundancies* and *reduce dimensionality* in data.

> [!Tip]
> **Matrix multiplication** in neural networks is a *linear transformation*: it maps input vectors into new spaces where the network can separate patterns.

**Calculus: How Neural Networks Learn**

Calculus provides the tools for **measuring change** and **optimizing** the network's parameters. Without calculus, there is no learning.

**Derivatives: The Rate of Change**

- A **derivative** measures the *rate of change* of a function: how much the output changes when the input changes by a tiny amount.
- In neural networks, derivatives tell us *how the loss changes* when we adjust a weight.

**The Chain Rule: The Heart of Backpropagation**

- The **chain rule** states that the derivative of a composition of functions is the *product of the derivatives* of each function.
- A neural network is a *composition of differentiable functions*. The chain rule allows us to compute the gradient of the loss with respect to *every weight* in the network.
- **Backpropagation** is the algorithm that applies the chain rule *recursively* over the computational graph, starting from the output layer and moving backward to the input layer.

**Partial Derivatives and Gradients**

- A **partial derivative** measures how a function changes with respect to *one variable* while holding others constant.
- The **gradient** is the vector of all partial derivatives. It points in the direction of *steepest ascent*.
- Gradient descent moves in the *opposite direction* of the gradient to minimize the loss.

**The Jacobian and Hessian**

- The **Jacobian matrix** generalizes the gradient to *vector-valued functions*. It contains all first-order partial derivatives.
- The **Hessian matrix** contains all *second-order partial derivatives*. It describes the *curvature* of the loss surface.
- The **Jacobian** is essential for backpropagation in multilayer networks; the **Hessian** is used in second-order optimization methods.

> [!Tip]
> **The chain rule** is the single most important calculus concept for neural networks: it enables **backpropagation**, which computes the gradient of the loss with respect to every weight.

**Probability and Statistics: Handling Uncertainty**

Probability and statistics provide the framework for **modeling uncertainty**, **making inferences**, and **estimating parameters** from data.

**Probability Distributions**

- A **probability distribution** describes how likely different outcomes are.
- Common distributions in neural networks include the **normal (Gaussian)** distribution, the **Bernoulli** distribution, and the **categorical** distribution.
- The choice of output distribution determines the **loss function**: Gaussian output → mean squared error; Bernoulli output → binary cross-entropy; categorical output → categorical cross-entropy.

**Bayes' Theorem**

- **Bayes' theorem** describes how to *update beliefs* in light of new evidence.
- In neural networks, the **Bayesian approach** treats model parameters as *probability distributions* rather than fixed values. This allows the network to *state its own uncertainty*.

**Maximum Likelihood Estimation**

- **Maximum likelihood estimation (MLE)** finds the parameter values that make the observed data *most probable*.
- Training a neural network with **cross-entropy loss** is equivalent to *maximum likelihood estimation* under a categorical distribution.
- Training with **mean squared error** is equivalent to MLE under a Gaussian distribution.

**Expectation and Variance**

- **Expectation** is the *average value* of a random variable.
- **Variance** measures the *spread* of a distribution.
- These concepts are used in **initialization schemes**, **regularization**, and **uncertainty quantification**.

> [!Tip]
> **Maximum likelihood estimation** connects probability to loss functions: choosing a loss function is implicitly choosing a *probabilistic model* for the data.

**Optimization: Finding the Best Parameters**

Optimization is the process of **minimizing the loss function** to find the best weights and biases. It is the *engine* of neural network training.

**Gradient Descent**

- **Gradient descent** updates parameters in the direction that *reduces the loss* based on the computed gradient.
- The update rule is: **θ ← θ − η · ∇_θ J(θ)**, where η is the **learning rate**.

**Stochastic Gradient Descent (SGD)**

- **SGD** computes the gradient using a *single data point* or a *mini-batch* rather than the entire dataset.
- This makes training *computationally feasible* on large datasets and introduces *noise* that can help escape local minima.

**Learning Rate**

- The **learning rate** controls the *step size* of each update. It is the *most important hyperparameter*.
- Too large: the loss *diverges* or oscillates. Too small: training is *slow* and may get stuck.

**Convexity and Non-Convexity**

- A **convex** function has a *single global minimum*; gradient descent is guaranteed to find it.
- Neural network loss surfaces are **non-convex**, with many local minima and saddle points.
- Despite non-convexity, deep learning *works well in practice* because most local minima are *good enough*, and saddle points are the main obstacle.

**Advanced Optimizers**

- **Momentum** accelerates SGD by accumulating a *velocity* in the gradient direction.
- **Adam** combines momentum with *adaptive learning rates* per parameter. It works well in practice across a wide range of problems.
- **RMSprop** adapts the learning rate based on the *recent magnitude* of gradients.

> [!Tip]
> **The learning rate** is the most critical hyperparameter in neural network training: it determines whether the network *converges*, *diverges*, or *converges too slowly* to be useful.

**Matrix Calculus: The Language of Backpropagation**

Matrix calculus extends ordinary calculus to **vectors and matrices**. It is the *native language* of neural network backpropagation.

- **Vector-Jacobian products** and **Jacobian-vector products** are the fundamental operations in automatic differentiation.
- **Chain rules on computational graphs** are how frameworks like PyTorch and TensorFlow compute gradients.
- **Second derivatives**, **Hessian matrices**, and **quadratic approximations** are used in second-order optimization and in analyzing the curvature of the loss surface.

> [!Tip]
> **Matrix calculus** allows you to derive backpropagation equations *efficiently* and to implement them correctly in code using vectorized operations.

**Information Theory: Measuring Information and Loss**

Information theory provides the theoretical foundation for **loss functions** and for understanding what neural networks learn.

**Entropy**

- **Shannon entropy** measures the *average uncertainty* or *information content* of a probability distribution.
- High entropy means high uncertainty; low entropy means the distribution is *concentrated* on a few outcomes.

**Cross-Entropy**

- **Cross-entropy** measures the *difference* between two probability distributions: the true distribution and the model's predicted distribution.
- **Cross-entropy loss** is the standard loss function for classification tasks. Minimizing cross-entropy is equivalent to *maximizing the likelihood* of the correct labels.

**Kullback-Leibler (KL) Divergence**

- **KL divergence** measures the *extra information cost* of using an imperfect model instead of the true distribution.
- **Cross-entropy** = **entropy** + **KL divergence**. Minimizing cross-entropy is equivalent to minimizing KL divergence when the true entropy is constant.
- KL divergence is used in **variational autoencoders (VAEs)**, **knowledge distillation**, and **reinforcement learning**.

**Mutual Information**

- **Mutual information** measures how much *knowing one variable* tells you about another.
- It is used in **feature selection**, **representation learning**, and **information bottleneck** methods.

> [!Tip]
> **Cross-entropy loss** is not just a convenient choice: it is the *maximum likelihood estimate* under a categorical distribution, connecting information theory directly to neural network training.

**Key Takeaways**

- **Linear algebra** provides the *structural language* of neural networks: vectors, matrices, and decompositions represent data and transformations.
- **Calculus**, especially the **chain rule**, enables **backpropagation**, which is how neural networks learn from errors.
- **Probability and statistics** handle *uncertainty* and connect *loss functions* to *maximum likelihood estimation*.
- **Optimization** drives learning through **gradient descent** and its variants; the **learning rate** is the most critical hyperparameter.
- **Matrix calculus** is the *native language* of backpropagation, enabling efficient gradient computation on computational graphs.
- **Information theory** provides the theoretical basis for **cross-entropy loss** and for measuring what neural networks learn.

> [!Tip]
> The core insight of the mathematical foundations: neural network training is a **non-convex optimization problem** solved by **gradient descent**, where gradients are computed by **backpropagation** using the **chain rule**, and the loss function is chosen based on the **probabilistic model** of the data.
