# Migration in progress
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

- **Maximum likelihood estimation (MLE)** finds the parameter v