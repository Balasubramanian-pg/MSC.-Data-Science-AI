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
- Parameter manifests should remain strictly immutable once a run begins, preventing post-hoc parameter tampering from invalidating recorded metrics.

> [!Tip]
> **Automated configuration logging**: serialize the active configuration dictionary directly into the model checkpoint file, ensuring that every saved weight tensor retains an unalterable record of the hyperparameters that produced it.

## Statistical Rigor in Evaluation and Verification

### The Flaw of Single-Seed Benchmarking

- Reporting model evaluation results from a single training run introduces significant empirical bias.
- A marginal performance gain of $0.5\%$ or $1.0\%$ on a validation benchmark can stem entirely from a favorable random seed initialization rather than an architectural or algorithmic improvement.
- Rigorous experimentation requires evaluating models across a minimum of $K \ge 5$ independent random seeds, reporting the sample mean and sample standard deviation:
  $$\bar{x} = \frac{1}{K} \sum_{k=1}^K x_k, \quad s = \sqrt{\frac{1}{K - 1} \sum_{k=1}^K (x_k - \bar{x})^2}$$
  reported formally as $\bar{x} \pm s$.

### Hypothesis Testing and Statistical Significance

- When comparing a proposed model architecture against a baseline, establish whether observed gains achieve statistical significance.
- **Paired Two-Sample t-Test:** Evaluates whether the mean difference between models trained across identical seed pairings is statistically non-zero under normal distributional assumptions:
  $$t = \frac{\bar{d}}{s_d / \sqrt{K}}$$
  where $\bar{d}$ is the average difference across paired seed evaluations and $s_d$ is the standard deviation of differences.
- **Wilcoxon Signed-Rank Test:** Serves as a non-parametric alternative that evaluates paired differences without assuming normally distributed metric populations.
- Reject the null hypothesis ($H_0$: models exhibit identical performance) only when the computed $p$-value falls below the significance threshold (typically $p < 0.05$).

### Preventing Data Leakage Across Splits

- **Preprocessing Leakage:** Feature scalers, imputation medians, and tokenizers must fit exclusively on the training partition and transform validation or test splits downstream.
- **Temporal Leakage:** Time-series and sequential forecasting tasks require walk-forward or expanding-window validation splits rather than randomized k-fold splits, preventing future information from leaking into historical training windows.
- **Group Leakage:** Datasets containing multiple samples from identical subjects or sensor sources demand grouped k-fold partitioning, ensuring that individual subjects appear exclusively in either training or evaluation splits.

> [!Important]
> **Multi-seed statistical testing**: never claim architectural superiority based on single-run validation improvements; declare performance gains valid only after confirming statistical significance across multiple independent random seeds.

## Comparative Taxonomy of Reproducibility Strategies

| Reproducibility Level | Target Guarantee | Core Mechanism | Computational Cost | Primary Operational Use Case |
|---|---|---|---|---|
| **Bitwise Determinism** | Exact numerical match ($0.0\%$ variation across runs) | Pinned seeds, `use_deterministic_algorithms`, fixed CUDA buffers | Moderate to High ($10\% \text{ to } 30\% \text{ speed drop}$) | Unit testing, software regression tests, debugging silent failures |
| **Statistical Reproducibility**| Consistent distributions ($\mu \pm \sigma$ within confidence intervals) | Synchronized seeds, standard CUDA autotuning enabled | Minimal to None | Production training, architecture comparison, research sweeps |
| **Environment Parity** | System-level replication across hardware nodes | Docker containers, locked package dependency trees | Low (One-time container build) | Distributed cluster training, cloud scaling, team collaboration |
| **Data Versioned Lineage** | Immutable input pipelines across training lifecycles | Cryptographic dataset hashes, DVC split manifests | Minimal storage overhead | Production audits, compliance validation, long-term maintenance |

> [!Tip]
> **Progressive validation workflow**: use bitwise determinism during initial algorithm implementation to confirm code correctness, then transition to multi-seed statistical testing to validate final model generalization.

## Key Takeaways

- **Non-determinism arises from multiple layers**: random seeds, framework scheduling, and low-level GPU floating-point non-associativity contribute to execution variance.
- **GPU thread race conditions alter arithmetic orders**: non-deterministic accumulation in parallel reductions causes minute rounding discrepancies that compound across training.
- **Full determinism requires synchronized PRNG states**: seeding Python, NumPy, PyTorch CPU, and PyTorch CUDA engines simultaneously stabilizes random execution paths.
- **Deterministic CUDA flags impose performance costs**: disabling `cudnn.benchmark` and activating deterministic algorithms guarantees reproducibility at the cost of execution throughput.
- **Provenance requires five structural pillars**: complete lineage tracking captures code commit hashes, data split checksums, environment containers, config manifests, and model checkpoints.
- **Single-seed evaluation creates false conclusions**: minor metric gains can reflect favorable seed draws, requiring multi-seed evaluations reporting mean and standard deviation ($\bar{x} \pm s$).
- **Hypothesis testing confirms meaningful gains**: paired statistical tests ensure that measured performance differences achieve formal significance ($p < 0.05$).
- **Strict partition boundaries prevent data leakage**: fitting preprocessing pipelines exclusively on training splits protects validation integrity from information leakage.

> [!Important]
> **Reproducibility is the foundation of empirical progress**: treating experiment control as a fundamental engineering protocol ensures that observed metric improvements represent genuine algorithmic advances rather than uncontrolled stochastic fluctuations.
