# 3.10.4. Example of Lasso Coefficient Shrinkage

To solidify the mathematical mechanics of coefficient shrinkage, consider a numerical evaluation of a linear penalty.

Suppose:
- Target continuous variable = $$Y$$
- Initial feature set = $$\{X_1, X_2, X_3\}$$
- Optimal regularization parameter = $$\lambda = 1.5$$
- Unregularized coefficient magnitudes = $$\beta_1 = 4.0$$, $$ \beta_2 = 0.1 $$, $$\beta_3 = -2.5$$

### Step 1: Extract Initial Coefficients
$$\beta_{initial} = [4.0, 0.1, -2.5]$$

### Step 2: Formulate Penalty Term
$$\lambda \sum_{j=1}^{p} |\beta_j|$$

### Step 3: Compute Absolute Penalty
$$1.5 \times (|4.0| + |0.1| + |-2.5|) = 9.9$$

### Step 4: Execute Shrinkage Optimization
$$\beta_2 \rightarrow 0$$

### Step 5: Final Selected Features
**$$\{X_1, X_3\}$$**

By driving the weakest mathematical coefficient strictly to zero, the regularized estimator successfully isolates the most predictive subset without requiring an external wrapper algorithm.
