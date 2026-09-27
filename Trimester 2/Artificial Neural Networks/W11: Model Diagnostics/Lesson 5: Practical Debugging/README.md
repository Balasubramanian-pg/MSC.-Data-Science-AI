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
- **Analytical Gradient Checks:** When implementing custom backward passes or specialized loss functions, compare analytical gradients against numerical finite-difference approximations:
  $$\frac{\partial \mathcal{L}}{\partial \theta_i} \approx \frac{\mathcal{L}(\theta_i + \epsilon) - \mathcal{L}(\theta_i - \epsilon)}{2\epsilon}$$
  The relative error should satisfy $\frac{\|g_{\text{analytical}} - g_{\text{numerical}}\|_2}{\|g_{\text{analytical}}\|_2 + \|g_{\text{numerical}}\|_2} < 10^{-6}$.

> [!Tip]
> **Parameter registration checks**: print `sum(p.numel() for p in model.parameters() if p.requires_grad)` before and after architectural changes to confirm that every sub-layer actively registers its tensors for optimization.

## Optimization Diagnostics and Remediation Strategies

### The Single-Batch Memorization Test

- Extract a minimal batch containing $4$ to $16$ samples from the training dataset.
- Disable all regularization mechanisms, including weight decay, dropout, label smoothing, and data augmentations.
- Train the network on this fixed batch using standard SGD or Adam; a correct implementation will drive empirical training loss to zero and achieve $100\%$ classification accuracy within $50$ to $200$ iterations.
- If the network fails to overfit a minimal batch, the codebase contains a confirmed structural defect (such as detached gradients, inverted loss signs, or broken target alignments).

### Systematic Loss Divergence Debugging

- **Handling $\text{NaN}$ and $\text{Inf}$ Losses:**
  - Locate the exact operation producing non-finite values by enabling framework anomaly detection (`torch.autograd.set_detect_anomaly(True)`).
  - Inspect loss functions for unconstrained log operations: replace $\log(p)$ with $\log(p + \epsilon)$ (where $\epsilon = 10^{-8}$) to avoid $\log(0)$.
  - Verify division operations: ensure denominators in normalization layers include a positive variance stabilizer ($\sqrt{\sigma^2 + \epsilon}$).
- **The Learning Rate Range Test:**
  - Execute a preliminary run that increases the learning rate exponentially from $10^{-7}$ to $10^{1}$ over several hundred iterations.
  - Plot loss against log-scale learning rate: identify the minimum point and choose an operational learning rate roughly one order of magnitude smaller than the point where loss begins diverging.

> [!Important]
> **Anomaly detection performance costs**: activate autograd anomaly detection only while diagnosing non-finite loss exceptions, because continuous graph checks add substantial memory and execution overhead.

## Comparative Diagnostic Taxonomy of Implementation Bugs

| Bug Class | Observable Symptom | Verification Test | Corrective Remediation |
|---|---|---|---|
| **Data Leakage** | Validation error is abnormally low; drops instantly | Compare training and validation dataset hashes; check split logic | Split raw data prior to computing preprocessing or normalization statistics |
| **Label Desynchronization** | Training loss plateaus near $\ln(C)$; fails single-batch test | Print `(image, label)` pairs directly from the data loader | Synchronize feature and target shuffling; bind data with fixed seeds |
| **Detached Graph** | Zero weight updates; parameter distance $\Delta_{\text{init}} = 0$ | Check `requires_grad` on intermediate outputs; inspect backprop | Eliminate calls to `.detach()` or `.numpy()` inside the forward execution graph |
| **Missing Zero-Grad** | Loss drops initially, then explodes into oscillations | Log gradient norms across successive iterations | Insert `optimizer.zero_grad()` immediately prior to `loss.backward()` |
| **Unregistered Submodules** | Submodule weights remain static; omitted from optimizer | Inspect `[name for name, _ in model.named_parameters()]` | Wrap Python lists containing submodules inside `nn.ModuleList` |
| **Evaluation Mode Omission** | Inconsistent validation metrics; high test variance | Check `model.training` boolean state during evaluation passes | Call `model.eval()` before validation; wrap inference in `torch.no_grad()` |
| **Unbounded Loss Extreme** | Loss outputs `NaN`; sudden terminal crash | Enable autograd anomaly detection; check gradient norms | Clamp probabilities inside log functions; apply gradient norm clipping |

> [!Tip]
> **Systematic bug elimination**: when multiple issues arise simultaneously, resolve data pipeline errors first, verify single-batch overfitting second, and address loss stability third to isolate issues without confounding effects.

## Key Takeaways

- **Diagnostic sequencing prevents wasted compute**: verify data pipelines, computational graphs, and loss implementations before tuning hyperparameters or adding model capacity.
- **Input tensors require direct validation**: inspect batches directly downstream of data loaders to ensure augmentations preserve semantic labels and features maintain zero mean and unit variance.
- **The single-batch test serves as a primary gate**: an unregularized network must drive training loss to zero on $10$ samples; failure confirms an internal software defect.
- **Execution modes govern layer mechanics**: toggling between training mode and evaluation mode prevents runtime shifts in normalization running statistics and dropout masks.
- **Graph continuity requires explicit verification**: avoid breaking the autograd graph with in-place modifications, detached tensors, or unregistered submodules.
- **Numerical safeguards prevent loss divergence**: incorporate small stabilizing constants into logarithmic and division operations to avoid arithmetic overflows.
- **Learning rate range sweeps replace trial and error**: plotting loss against exponentially increasing learning rates isolates optimal convergence intervals quantitatively.

> [!Important]
> **Disciplined debugging workflow**: robust deep learning systems rely on isolated verification, deterministic execution seeds, minimal overfit benchmarks, and explicit pipeline inspections to eliminate silent software defects before scaling model training.
