# Migration in progress
# Lesson 4: Experiment Control and Reproducibility

Experiment control and reproducibility establish scientific rigor in deep learning workflows by isolating algorithmic improvements from stochastic execution variance. Because neural network training combines non-deterministic GPU hardware primitives, randomized data pipelines, and non-convex optimization dynamics, unconstrained pipelines produce noisy metric fluctuations. Standardizing configuration schemas, enforcing deterministic mathematical operations, logging comprehensive artifact lineage, and conducting statistical significance testing transform empirical iteration into a verifiable, auditable discipline.

## Foundations of Non-Determinism in Deep Learning

### Sources of Execution Variance

- Training variance originates across three distinct architectural layers:
  - **Algorithmic Stochasticity:** Pseudo-random initializations of layer weights, mini-batch shuffling permutations, dropout masking patterns, and probabilistic data augmentations.
  - **Software Environment Variations:** Unsynchronized random seeds across runtime libraries, differing framework versions (such as PyTorch or TensorFlow), and unpinned dependency trees.
  - **Hardware and Low-Level Numerical Non-Determinism:** Floating-point non-associativity and asynchronous multi-threaded kernel execution on parallel hardware.

### Floating-Point Non-Associativity and GPU Concurrency

- IEEE 754 floating-point addition is mathematically *non-associative* due to finite precision and rounding:
  $$(a + b) + c \neq a + (b + c)$$
- In massively parallel GPU architectures, reduction operations (such as summing thousands of element-wise loss gradients across threads) accumulate values in non-deterministic orders dictated by thread scheduling and race conditions.
- Atomic floating-point operations (such as CUDA `atomicAdd`) introduce non-deterministic floating-point round-off errors at the bit level.
- Across millions of backpropagation steps, tiny bit-level rounding differences compound through non-linear activation functions, causing identical code executed on the same hardware to diverge into distinct optimization trajectories.
- The `cudnn.benchmark` autotuner introduces non-determinism by testing multiple convolution algorithms on initial batches and selecting the fastest algorithm, which can alter arithmetic accumulation paths between runs.

> [!Important]
> **Floating-point rounding compounds non-determinism**: GPU thread concurrency alters the summation order of loss gradients, introducing microscopic bitwise rounding variations that compound across backpropagation passes to produce divergent parameter states.

## The Deterministic Implementation Protocol

### Multi-Library PRNG Synchronization

- Establishing deterministic training baselines requires synchronizing all active pseudo-random number generator (PRNG) engines simultaneously at the start of execution:
  ```python
  import os, random, numpy as np, torch

  def seed_everything(seed=42):
      os.environ["PYTHONHASHSEED"] = str(seed)
      random.seed(seed)
      np.random.seed(seed)
      torch.manual_seed(seed)
      torch.cuda.manual_seed(seed)
      torch.cuda.manual_seed_all(seed)
  ```
- Set worker initialization functions in multi-processed data loaders to prevent child worker processes from inheriting identical static PRNG states:
  ```python
  def seed_worker(worker_id):
      worker_seed = torch.initial_seed() % 2**32
      np.random.seed(worker_seed)
      random.seed(worker_seed)
  ```

### Enforcing Deterministic CUDA Operations

- Enforcing bitwise reproducibility across PyTorch and CUDA requires configuring explicit deterministic flags:
  ```python
  torch.backends.cudnn.deterministic = True
  torch.backends.cudnn.benchmark = False
  torch.use_deterministic_algorithms(True)
  os.environ["CUBLAS_WORKSPACE_CONFIG"] = ":4096:8"
  ```
- Setting `CUBLAS_WORKSPACE_CONFIG` allocates deterministic memory buffers for cuBLAS routines, eliminating non-deterministic atomic reductions.
- Enforcing strict determinism introduces an engineering trade-off: disabling hardware autotuning and replacing atomic primitives with deterministic algorithms can reduce training throughput by $10\%$ to $30\%$.

> [!Tip]
> **Selective determinism**: enforce strict bitwise determinism during regression testing and bug localization, but transition to statistical reproducibility across fixed seeds during large-scale pre-training to retain maximum GPU hardware throughput.

## Experiment Lineage and Provenance Management

### The Five Pillars of Experiment Tracking

- Complete experimental provenance requires logging five structural pillars for every training iteration:
  - **Code Lineage:** Exact Git commit SHA, remote repository URL, and confirmation of a clean working tree without uncommitted changes.
  - **Data Lineage:** Unique cryptographic checksums (MD5 or SHA-256) of raw data files, data split manifests, and preprocessing pipeline versions managed through tools like Data Version Control (DVC).
  - **Environment Lineage:** Exact Docker image digests, operating system builds, CUDA driver versions, and frozen package dependency manifests (`requirements.lock`).
  - **Configuration Lineage:** Immutable, machine-readable parameter files (YAML or JSON) capturing every optimization, architectural, and evaluation setting.
  - **Output Artifacts:** Serialized model checkpoints, step-level loss trajectories, evaluation metric logs, and output confusion matrices.

### Centralized Metadata and Run Tracking

- Modern experiment tracking platforms (such as MLflow, Weights & Biases, or TensorBoard) organize training runs into structured, searchable repositories.
- Logging step-level telemetry (including training loss, validation metrics, gradient norms, and learning rate decay) enables real-time comparison across parallel sweeps.
- Parameter manifests should remain strictly immutable once a run begins, preventing post-hoc parameter