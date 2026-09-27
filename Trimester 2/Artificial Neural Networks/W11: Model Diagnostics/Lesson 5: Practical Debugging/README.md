# Migration in progress
# Lesson 5: Practical Debugging

Practical debugging in neural network engineering establishes reproducible, step-by-step procedures for locating and correcting silent failures across data loaders, computational graphs, and optimization loops. Because neural networks rarely crash when flawed, software defects manifest as degraded convergence rates, plateaus, or erratic loss explosions. A disciplined debugging protocol isolates data pipeline errors from mathematical implementation bugs, verifying model components independently before committing large-scale compute resources.

## The Systematic Neural Network Debugging Hierarchy

### The Sequential Verification Architecture

- Debugging deep learning pipelines requires a structured order of operations, moving strictly from data pipelines to model architecture, followed by optimization and hyperparameter tuning.
- Tuning hyperparameters on an unverified codebase wastes time and compute, because adjustments can mask underlying software defects without fixing root causes.
- The debugging protocol follows four sequential phases:
  - **Phase 1: Data Pipeline Auditing:** Verifying data ingestion, tensor shapes, normalization statistics, label encodings, and batch collation.
  - **Phase 2: Graph and Initialization Sanity:** Checking forward pass execution, analytical initial loss, parameter shapes, and execution mode toggles.
  - **Phase 3: The Single-Batch Memorization Test:** Forcing the network to achieve zero empirical loss on a tiny sample subset without regularization.
  - **Phase 4: Optimization and Hyperparameter Sweeps:** Isolating learning rate bounds, gradient dynamics, and loss surface conditioning.

### Baselines and Simplification Strategy

- Start with the simplest viable architecture: begin with a standard linear model or a two-layer MLP before deploying deep convolutional stacks or transformers.
- Establish a trivial heuristic baseline (such as predicting the majority class or the historical feature mean) to verify that the pipeline outperforms chance before complex training begins.
- Fix all pseudo-random number generator (PRNG) seeds across system libraries (such as NumPy, PyTorch, and CUDA) to ensure deterministic runs during bug isolation.

> [!Important]
> **Debugging precedes tuning**: never adjust learning rate schedules, layer widths, or regularizers until the data pipeline and computational graph pass deterministic sanity and single-batch overfitting checks.

## Data Pipeline and Input Integrity Debugging

### Silent Data Corruption Modes

- **Normalization Inconsistencies:** Calculating mean and standard deviation across the entire dataset rather than exclusively over the training split introduces data leakage; failing to scale input features (such as leaving pixel values in $[0, 255]$ instead of $[0, 1]$) causes gradient explosions.
- **Label Permutation and Alignment:** Shuffling feature matrices while leaving target vectors unaligned destroys input-target correspondence, forcing the network to train on randomized labels.
- **Destructive Data Augmentation:** Applying excessive geometric or photometric transformations can erase class-defining features, such as horizontally flipping asymmetric images (e.g., text or directional signs) or applying heavy crops that exclude target objects.
- **Dataset Shuffling Failures:** Failing to shuffle training data between epochs produces auto-correlated mini-batches, causing optimization trajectories to oscillate along class boundaries.

### Input Inspection Protocol

- Render raw input tensors visually or statistically directly after batch collation (`DataLoader` output) rather than inspecting raw disk files.
- Print minimum, maximum, mean, and standard deviation for inputs entering the forward pass: inputs should exhibit zero mean and unit variance ($\mu \approx 0, \sigma^2 \approx 1$).
- Verify target distribution balance across mini-batches; highly skewed batches can trigger early bias shifts that stall gradient updates in subsequent layers.

> [!Tip]
> **Post-loader inspection**: plot and inspect batches extracted directly from the training data loader to verify that augmentations preserve semantic labels and that tensor scalings match expectations.

## Computational Graph and Implementation Verification

### Mode Toggling and Layer Behavior

- Neural network frameworks rely on explicit execution modes that alter layer mechanics:
  - **Training Mode (`model.train()`):** Enables Dropout sampling and updates running means and variances in Batch Normalization layers.
  - **Evaluation Mode (`model.eval()`):** Disables Dropout and freezes Batch Normalization running statistics, switching to fixed global inference metrics.
- Forgetting to invoke `model.eval()` during validation causes batch-dependent output shifts and inflates validation variance.
- Forgetting to revert to `model.train()` freezes normalization running statistics, slowing convergence during training.

### Graph Connectivity and Gradient Bugs

- **Detached Tensors:** Accidental use of `.detach()`, conversion of intermediate tensors to NumPy arrays, or in-place tensor modifications breaks the computational graph, preventing gradients from reaching upstream layers.
- **Missing Zero-Grad Steps:** Forgetting `optimizer.zero_grad()` causes gradients to accumulate additively across successive iterations, inflating effective step sizes and causing numerical instability.
- **Omitted Parameter Registration:** Defining sub-modules as raw Python lists rather than container classes (`nn.ModuleList`) prevents their weights from registering in `model.parameters()`, leaving those layers completely untrained.
- **Analytical Gradient Checks:** When implementing custom backward passes or specialized loss functions, compare analytical gradients against numerical finite-difference approximat