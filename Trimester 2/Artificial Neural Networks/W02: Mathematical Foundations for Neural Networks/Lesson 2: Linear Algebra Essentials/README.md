# Migration in progress
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
- An **eigenvalue** ($\lambda$) is the *scalar fact