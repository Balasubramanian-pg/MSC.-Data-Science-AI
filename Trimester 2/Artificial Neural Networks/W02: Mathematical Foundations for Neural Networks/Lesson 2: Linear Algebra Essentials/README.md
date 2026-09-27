# Lesson 2: Linear Algebra Essentials

**Linear Algebra Essentials for Neural Networks**

Linear algebra provides the algebraic structures and geometric operations required to construct, train, and evaluate deep neural networks. Inputs, layer parameters, and internal activations exist as multidimensional arrays that transform through consecutive linear mappings. Mastery of vector spaces, matrix operations, factorizations, and matrix norms enables practitioners to design network topologies, preserve numerical stability, and analyze gradient behavior.

**Fundamental Data Structures: Scalars, Vectors, Matrices, and Tensors**

- A **scalar** is a *single real number* (rank-0 tensor) representing a solitary magnitude, such as a learning rate, loss value, or scalar threshold.
- A **vector** is a *one-dimensional array* (rank-1 tensor) of numbers representing an individual sample or a set of features in an $n$-dimensional coordinate space.
- A **matrix** is a *two-dimensional array* (rank-2 tensor) with rows and columns, used to represent mini-batches of data, linear mapping operations, and layer weights.
- A **tensor** is a *multidimensional generalization* of scalars, vectors, and matrices with arbitrary rank (rank-$N$ tensor).
- Deep learning frameworks store complex inputs as higher-order tensors, such as RGB image batches organized into four dimensions: *batch size*, *channels*, *height*, and *width*.

> [!Tip]
> **Tensors** represent the generalized container for all neural network data: understanding their rank and shape ensures correct dimensional alignment across interconnected layers.

**Vector Operations and Geometry**

- **Vector addition** combines two vectors of identical dimensionality element-wise, geometrically representing the *composition of directional displacements*.
- **Scalar multiplication** scales the magnitude of a vector by a constant factor without altering its directional line, reversing direction if the scalar is negative.
- The **dot product** (inner product) multiplies matching elements of two equal-length vectors and sums the products: $x^T y = \sum_{i=1}^n x_i y_i$.
- Geometrically, the dot product computes the *projection* of one vector onto another, quantifying directional similarity: $x^T y = \|x\|_2 \|y\|_2 \cos(\theta)$.
- Two non-zero vectors are **orthogonal** when their dot product equals zero, meaning they are *perpendicular* and share no shared directional variance.
- The **cosine similarity** isolates orientation from magnitude, serving as a standard distance metric in *embedding spaces* and *vector search engines*.

> [!Tip]
> **The dot product** measures directional alignment: it forms the mathematical core of artificial neurons by evaluating how closely an input vector matches a learned weight vector.

**Vector Norms and Regularization**

- A **vector norm** is a mathematical function that maps a vector to a non-negative real value, quantifying its *length* or *magnitude*.
- The **$L_1$ norm** (Manhattan norm) sums the absolute values of the vector elements: $\|x\|_1 = \sum_{i=1}^n |x_i|$.
- The **$L_2$ norm** (Euclidean norm) calculates the straight-line distance from the origin: $\|x\|_2 = \sqrt{\sum_{i=1}^n x_i^2}$.
- The **$L_\infty$ norm** (maximum norm) identifies the *absolute maximum element* within the vector: $\|x\|_\infty = \max_i |x_i|$.
- In machine learning, the $L_1$ norm induces **parameter sparsity** by driving redundant weights to exactly zero (Lasso regularization).
- The $L_2$ norm forms the basis of **weight decay** (Ridge regularization), preventing individual parameters from growing excessively large and causing overfitting.

> [!Important]
> **Vector norms** quantify parameter size: selecting between L1 and L2 norms directly determines whether your regularizer drives parameters to absolute zero or shrinks them smoothly toward zero.

**Matrix Operations and Affine Transformations**

- **Matrix multiplication** maps an input vector from an input space to an output space: the product $C = AB$ requires the inner dimensions to match, producing a matrix of dimensions $(m \times k) \times (k \times n) \rightarrow (m \times n)$.
- Matrix multiplication does not commute ($AB \neq BA$), though it is associative ($A(BC) = (AB)C$) and distributive ($A(B + C) = AB + AC$).
- The **Hadamard product** ($A \odot B$) performs *element-wise multiplication* between matrices of identical shape, used heavily in gated architectures like LSTMs, GRUs, and attention masks.
- The **transpose** ($A^T$) flips a matrix over its diagonal, converting row vectors into column vectors: $(AB)^T = B^T A^T$.
- A **symmetric matrix** satisfies $A = A^T$, which occurs frequently in covariance matrices, distance matrices, and the Hessian matrix.
- An **affine transformation** combines a linear mapping with a translation vector ($y = Wx + b$), forming the foundational operation executed by a standard dense layer.

> [!Tip]
> **Affine transformations** define the forward pass of dense layers: the weight matrix rotates, shears, and scales the feature space, while the bias vector translates the coordinate origin.

**Linear Independence, Rank, and Systems of Equations**

- A set of vectors is **linearly independent** if no single vector in the set can be expressed as a *linear combination* of the remaining vectors.
- The **span** of a set of vectors defines the entire subspace reachable by all possible linear combinations of those vectors.
- The **rank** of a matrix indicates the maximum number of *linearly independent column or row vectors* it contains.
- A matrix has **full rank** when its rank equals the smaller of its row or column dimensions; otherwise, it is **rank-deficient**.
- An **identity matrix** ($I$) is a square matrix with ones on the main diagonal and zeros elsewhere, leaving any vector unchanged upon multiplication ($Ix = x$).
- A square matrix is **invertible** (non-singular) if and only if it has full rank and a non-zero determinant; its inverse satisfies $A^{-1}A = I$.
- Deep learning frameworks compute solutions to systems of equations using *factorization algorithms* rather than explicit matrix inversion due to numerical instability and computational cost.

> [!Important]
> **Matrix rank** governs representational capacity: an under-parameterized or rank-deficient layer collapses data into a lower-dimensional subspace, causing irreversible information loss.

**Eigenvalues, Eigenvectors, and Eigendecomposition**

- An **eigenvector** of a square matrix $A$ is a non-zero vector $v$ whose direction remains unchanged when multiplied by $A$: $Av = \lambda v$.
- An **eigenvalue** ($\lambda$) is the *scalar factor* by which the corresponding eigenvector stretches, shrinks, or flips during the transformation.
- **Eigendecomposition** decomposes a diagonalizable matrix into its constituent eigenvectors and eigenvalues: $A = Q \Lambda Q^{-1}$, where $Q$ contains eigenvectors and $\Lambda$ is diagonal.
- For real symmetric matrices, the eigenvectors are *mutually orthogonal*, allowing the factorization $A = Q \Lambda Q^T$ (the Spectral Theorem).
- **Principal Component Analysis (PCA)** uses eigendecomposition of the data covariance matrix to find directions of maximum variance for dimensionality reduction.
- In optimization, the eigenvalues of the **Hessian matrix** reveal the local curvature of the loss function, distinguishing local minima, local maxima, and saddle points.

> [!Tip]
> **Eigenvalues** dictate optimization geometry: widely dispersed eigenvalues in the loss Hessian create ill-conditioned surfaces where standard gradient descent oscillates perpendicular to the optimal path.

**Singular Value Decomposition (SVD)**

- **Singular Value Decomposition** factorizes *any* real matrix $A$ of shape $m \times n$ into three matrices: $A = U \Sigma V^T$.
- The matrix $U$ ($m \times m$) contains the **left-singular vectors**, which are the orthogonal eigenvectors of $AA^T$.
- The diagonal matrix $\Sigma$ ($m \times n$) contains non-negative real values called **singular values**, arranged in descending order: $\sigma_1 \ge \sigma_2 \ge \dots \ge 0$.
- The matrix $V$ ($n \times n$) contains the **right-singular vectors**, which are the orthogonal eigenvectors of $A^T A$.
- SVD provides a universal factorization that applies to rectangular, rank-deficient, and singular matrices without exception.
- The **Moore-Penrose pseudoinverse** ($A^+$) uses SVD components to solve under-determined and over-determined linear systems: $A^+ = V \Sigma^+ U^T$.
- The **Eckart-Young-Mirsky theorem** proves that truncating an SVD to the top $k$ singular values yields the *optimal rank-$k$ approximation* under the Frobenius and spectral norms.
- Low-rank approximation techniques use SVD principles to compress heavy weight matrices in large language models via Low-Rank Adaptation (LoRA).

> [!Important]
> **Singular Value Decomposition** generalizes eigendecomposition to all matrices: it isolates the principal components of non-square weight tensors to enable low-rank model compression and stable matrix inversion.

**Matrix Norms and Numerical Stability**

- The **Frobenius norm** measures the overall size of a matrix by taking the square root of the sum of all squared entries: $\|A\|_F = \sqrt{\sum_{i,j} A_{i,j}^2} = \sqrt{\text{Tr}(A^T A)}$.
- The **spectral norm** (matrix 2-norm) measures the maximum factor by which a matrix can stretch a vector: $\|A\|_2 = \sigma_{\max}(A)$.
- The **condition number** of a matrix is the ratio of its largest singular value to its smallest singular value: $\kappa(A) = \frac{\sigma_{\max}}{\sigma_{\min}}$.
- An **ill-conditioned matrix** has an extremely large condition number, meaning minor numerical perturbations in the input produce massive changes in the output.
- In deep architectures, repeated multiplication by weight matrices whose spectral norm exceeds one leads to **exploding gradients**.
- Repeated multiplication by weight matrices whose spectral norm remains strictly below one leads to **vanishing gradients**.
- **Spectral normalization** constrains the spectral norm of layer weights to one, stabilizing training dynamics in deep generative architectures.

> [!Tip]
> **The condition number** determines numerical reliability: ill-conditioned linear layers amplify floating-point rounding errors and cause severe gradient instability during backpropagation.

**Comparative Analysis of Matrix Decompositions**

| Decomposition Method | Matrix Requirement | Factor Form | Computational Cost | Primary Neural Network / Machine Learning Application |
|---|---|---|---|---|
| **Eigendecomposition** | Square, diagonalizable ($n \times n$) | $A = Q \Lambda Q^{-1}$ | $O(n^3)$ | Principal Component Analysis, Hessian curvature analysis |
| **Singular Value Decomposition (SVD)** | Any real matrix ($m \times n$) | $A = U \Sigma V^T$ | $O(\min(mn^2, m^2n))$ | Weight compression, Low-Rank Adaptation (LoRA), pseudoinverse |
| **LU Decomposition** | Square, invertible ($n \times n$) | $A = PLU$ | $O(\frac{2}{3}n^3)$ | Solving linear forward passes, computing determinants |
| **QR Decomposition** | Any rectangular matrix ($m \times n$) | $A = QR$ | $O(2mn^2)$ | Least squares regression, constructing orthogonal weight bases |
| **Cholesky Decomposition** | Symmetric, positive-definite ($n \times n$) | $A = L L^T$ | $O(\frac{1}{3}n^3)$ | Gaussian processes, Kalman filtering, sampling multivariate normal distributions |

> [!Important]
> **Decomposition choice** depends on structural constraints: while eigendecomposition requires square matrices, SVD factorizes arbitrary rectangular tensors, making it the most versatile decomposition for deep learning workloads.

**Key Takeaways**

- **Tensors** form the core geometric containers of neural networks, organizing scalar values, feature vectors, linear operators, and multi-channel batch inputs.
- **The dot product** evaluates directional similarity and projections, acting as the fundamental computation of artificial neurons and attention heads.
- **Vector norms** measure parameter sizes to enforce structural constraints, with $L_1$ producing sparse parameter selections and $L_2$ constraining parameter magnitudes.
- **Affine transformations** combine linear matrix multiplication with bias translations, manipulating data geometry to make target classes linearly separable.
- **Matrix rank** specifies the true dimensionality of a layer's output, warning practitioners against rank-deficient topologies that discard critical input signals.
- **Eigenvalues and eigenvectors** explain coordinate scaling under transformations, mapping directly to Hessian curvature analysis and gradient convergence rates.
- **Singular Value Decomposition** factors rectangular matrices into orthogonal bases and singular values, providing the mathematical engine for model compression and low-rank adaptation.
- **Condition numbers and spectral norms** dictate whether deep matrix chains remain numerically stable or succumb to vanishing and exploding gradients.

> [!Tip]
> Linear algebra is the **geometric foundation** of deep learning: every layer operates as a linear transformation across high-dimensional vector spaces, where norms control model complexity, rank preserves representational capacity, and singular values govern numerical stability.
