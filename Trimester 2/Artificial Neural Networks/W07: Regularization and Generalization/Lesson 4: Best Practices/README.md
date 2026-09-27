# Migration in progress
# Lesson 4: Best Practices

## Regularization Best Practices and Engineering Protocols

Developing robust deep learning models requires moving beyond isolated regularization methods toward a coordinated, multi-tiered engineering protocol. Deploying regularizers indiscriminately can introduce conflicting inductive biases, suppress model capacity, and trigger optimization stalls. Establishing a systematic development workflow, resolving architectural incompatibilities such as the Dropout-BatchNorm conflict, calibrating domain-specific regularization recipes, and conducting rigorous ablation studies ensures that models maintain expressive power while generalizing reliably to production distributions.

## The Layered Defense Framework

### Multi-Tiered Regularization Architecture

- Effective regularization operates across four coordinated levels of the deep learning pipeline:
  - **Data Level:** Expands the empirical data distribution using domain-specific data augmentation, Mixup, CutMix, and synthetic noise injection.
  - **Structural Level:** Constrains internal layer representations through stochastic activation masking (Inverted Dropout, Stochastic Depth) and normalization layers (Batch Normalization, Layer Normalization).
  - **Objective Level:** Modifies the loss calculation using explicit parameter penalties ($L_2$ weight decay, $L_1$ sparsity) and target modifications (Label Smoothing).
  - **Optimization Level:** Exploits optimization dynamics through early stopping, learning rate warmup, cosine decay schedules, and mini-batch stochastic noise.

### The First Make It Overfit Principle

- Before applying regularization constraints, verify that the unregularized architecture possesses sufficient capacity to learn the task.
- **Validation Protocol:** Train the baseline model on a tiny representative subset of data (e.g., 50 to 100 samples) without regularization or data augmentation.
- The model must drive training loss to near zero and achieve 100% training accuracy within a few dozen epochs.
- If a model cannot overfit a miniature dataset, it suffers from structural underfitting, buggy gradient propagation, poor parameter initialization, or inappropriate learning rates; applying regularization in this state guarantees training failure.
- Once capacity is confirmed by achieving zero training loss on the subset, scale to the full dataset and introduce regularizers incrementally to close the generalization gap.

### Avoiding the Over-Regularization Trap

- Combining multiple strong regularizers simultaneously often reduces a model's effective capacity too severely, shifting it from an overfitting regime into an **underfitting regime**.
- **Diagnostic Signature:** Training loss stalls above acceptable target thresholds, while validation loss tracks training loss closely without improving.
- Counteract over-regularization by stripping away regularizers in reverse order: reduce label smoothing, lower weight decay coefficients, decrease dropout rates, and simplify data augmentation transformations until training loss resumes healthy descent.

> [!Tip]
> **Verify capacity before regularizing**: ensure the model can overfit a tiny subset of training samples with zero loss before applying regularization, confirming that the architecture can represent the underlying task.

## Domain-Specific Regularization Recipes

### Computer Vision Backbones (CNNs and ViTs)

- **Convolutional Neural Networks (CNNs):**
  - **Primary Regularizers:** Aggressive data augmentation (random resized crops, horizontal flips, RandAugment) paired with **Weight Decay** ($\lambda \in [10^{-4}, 10^{-2}]$) via AdamW or SGD with Momentum.
  - **Normalization:** Rely primarily on **Batch Normalization**; the mini-batch sampling noise provides substantial implicit regularization.
  - **Dropout Constraints:** Avoid standard Dropout in convolutional layers; spatial correlations between neighboring pixels allow masked activations to be reconstructed from adjacent channels, making spatial dropout ineffective while slowing training.
- **Vision Transformers (ViTs):**
  - ViTs lack the hardwired translation equivariance and locality biases of CNNs, requiring stronger regularization on small and medium datasets.
  - **Primary Suite:** High weight decay ($\lambda \approx 0.05$), **Stochastic Depth (DropPath)** to randomly skip entire residual blocks, **Mixup** ($\alpha = 0.8$), **CutMix** ($\alpha = 1.0$), and **Label Smoothing** ($\epsilon = 0.1$).

### Sequence Models and Natural Language Processing

- **Transformer Language Models and Recurrent Architectures:**
  - **Normalization:** Deploy **Layer Normalization** or **RMSNorm** exclusively; Batch Normalization fails due to variable sequence lengths and small batch sizes.
  - **Stochastic Masking:** Apply **Inverted Dropout** with retention rate $p \in [0.1, 0.2]$ across multi-head self-attention projection layers and feedforward networks.
  - **Weight Decay:** Use **AdamW** with decoupled weight decay ($\lambda \in [0.01, 0.1]$), applying shrinkage strictly to linear weight matrices while exempting LayerNorm scale/bias parameters and token embeddings.
  - **Label Smoothing:** Apply label smoothing ($\epsilon = 0.1$) to vocabulary cross-entropy loss to prevent output projection layers from producing overconfident logit spikes on ambiguous tokens.

### Dense Tabular Multi-Layer Perceptrons

- Tabular datasets lack spatial or temporal invariance, rendering vision-style augmentations (like cropping or flipping) invalid.
- **Primary Suite:** Pair moderate **Inverted Dropout** ($p \in [0.2, 0.5]$) on hidden dense layers with **$L_2$ Weight Decay** ($\lambda \in [10^{-3}, 10^{-1}]$).
- **Feature Selection:** Deploy **$L_1$ regularization** when tabular inputs contain thousands of noisy or redundant uncurated features to drive irrelevant input weights to exact zero.
- **Validation Control:** Enforce strict **Early Stopping** with a patience window of 10 to 20 epochs; tabular models overfit quickly once the training loss drops.

> [!Important]
> **Select regularizers by modality**: use data augmentation, weight decay, and Mixup for vision; deploy LayerNorm, attention dropout, and decoupled weight decay for NLP; use dropout and early stopping for tabular MLPs.

## Resolving Regularization Conflicts and Pathologies

### The Dropout and Batch Normalization Variance Shift

- Combining Dropout and Batch Normalization within the same sub-network often destabilizes training, a failure known as the **variance shift conflict** (Qingsong Li et al., 2018).
- During training, dropout zeroes out activations randomly, altering the variance of signals fed into subsequent layers.
- Batch Normalization computes running population variance statistics during training; when the network switches to evaluation mode (where dropout is disabled and all units fire), the variance of incoming activations shifts significantly.
- The pre-computed running statistics stored in Batch Normalization no longer match the true activation distributions, causing validation error to degrade.
- **Engineering Best Practice:** Place Dropout strictly *after* Batch Normalization and non-linear activations ($\text{Conv/Dense} \to \text{BatchNorm} \to \text{ReLU} \to \text{Dropout}$), or avoid Dropout entirely in convolutional networks that use Batch Normalization.

### Decoupled Weight Decay in Adaptive Solvers
