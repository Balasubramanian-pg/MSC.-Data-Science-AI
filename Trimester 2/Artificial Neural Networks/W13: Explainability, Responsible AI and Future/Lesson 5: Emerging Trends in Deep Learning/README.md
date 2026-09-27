# Migration in progress
# Lesson 5: Emerging Trends in Deep Learning

Emerging trends in deep learning focus on overcoming the computational, theoretical, and operational scaling barriers of classical transformer architectures. As training expenditure and model dimensions scale, innovations in sub-quadratic sequence modeling, sparse computation, parameter-efficient adaptation, and mechanistic circuit auditing redefine network design. Integrating sparse mixture-of-experts routing, state-space representations, and dictionary-based representation disentanglement drives modern artificial neural networks toward sustainable scaling and verifiable reasoning.

## Sub-Quadratic Sequence Models and Architectural Evolutions

### Beyond Quadratic Self-Attention

- Standard **Transformer Self-Attention** calculates pairwise affinities across sequence tokens, scaling with quadratic time and memory complexity relative to sequence length $T$:
  $$\text{Attention}(Q, K, V) = \text{softmax}\left( \frac{Q K^T}{\sqrt{d_k}} \right) V \implies \mathcal{O}(T^2 \cdot d)$$
- Processing massive context windows (such as millions of tokens or continuous sensor streams) under quadratic scaling becomes memory-prohibitive on modern GPU clusters.
- **Linear Attention** replaces softmax normalization with kernel feature maps $\phi(x)$, exploiting the associativity of matrix multiplication to evaluate key-value interactions in linear time $\mathcal{O}(T \cdot d^2)$:
  $$\text{LinearAttention}(Q, K, V) = \left( \phi(Q) \phi(K)^T \right) V = \phi(Q) \left( \phi(K)^T V \right)$$

### Selective State-Space Models (SSMs)

- **Structured State-Space Models (SSMs)** map continuous 1D input sequences $x(t)$ to latent states $h(t)$ and outputs $y(t)$ through linear differential equations:
  $$h'(t) = A h(t) + B x(t), \quad y(t) = C h(t) + D x(t)$$
- Discretizing these equations via zero-order hold yields recurrence relations for linear-time sequential inference and global convolution kernels for parallel training.
- **Mamba (Selective SSM)** introduces data-dependent selection mechanisms by parameterizing matrices $B$, $C$, and discretization step $\Delta$ as dynamic functions of input $x_t$:
  $$B_t = \text{Linear}_B(x_t), \quad C_t = \text{Linear}_C(x_t), \quad \Delta_t = \text{Softplus}\left( \text{Parameter} + \text{Linear}_\Delta(x_t) \right)$$
- Selectivity allows the network to filter out irrelevant background context while compressing critical tokens into bounded state dimensions, achieving linear $\mathcal{O}(T)$ inference throughput while matching or exceeding transformer language modeling quality.

> [!Important]
> **Selective state compression**: Mamba eliminates quadratic attention bottlenecks by making continuous transition operators input-dependent, compressing long-horizon sequence history into constant-size hidden states during inference.

## Sparse Computation: Mixture of Experts (MoE)

### Dynamic Sparse Gating Mechanics

- Standard dense neural networks activate all parameter weights for every incoming token, causing computational FLOPs per forward pass to scale linearly with total model parameters.
- **Sparse Mixture of Experts (MoE)** replaces dense Feedforward Networks (FFNs) with $E$ parallel expert sub-networks, activating only a small subset $k \ll E$ of experts per token.
- A parameterized **Router (Gating Network)** $G(x)$ computes a categorical distribution over experts using softmax gating:
  $$G(x) = \text{Softmax}\left( \text{KeepTopK}\left( H(x), \, k \right) \right), \quad H(x) = x \cdot W_g + \epsilon$$
  where $\epsilon \sim \mathcal{N}(0, \sigma^2)$ injects exploration noise during training, and $\text{KeepTopK}$ sets unselected expert logits to $-\infty$.
- The aggregated layer output evaluates as the weighted linear combination of top-$k$ expert transformations:
  $$y = \sum_{i \in \text{TopK}} G(x)_i \cdot \text{Expert}_i(x)$$
- Decoupling total parameter capacity from per-token compute enables models to scale total weights by orders of magnitude while preserving constant inference latency.

### Load Imbalance and Auxiliary Loss Formulations

- Unconstrained routing causes **expert collapse**, where the gating network routes all tokens to a small number of favored experts while leaving remaining experts untrained.
- Training stability requires adding an **auxiliary load-balancing loss** $\mathcal{L}_{\text{balance}}$ to penalize non-uniform token routing:
  $$\mathcal{L}_{\text{balance}} = \alpha \cdot E \sum_{i=1}^E f_i \cdot P_i$$
  where $f_i$ is the empirical fraction of tokens routed to expert $i$, and $P_i$ is the average routing probability assigned to expert $i$ across a batch.
- Minimizing $\mathcal{L}_{\text{balance}}$ ensures that all experts receive balanced token allocations across distributed memory ranks.

> [!Tip]
> **Top-k routing selection**: configure top-2 routing in sparse Mixture of Experts layers; activating two experts per token provides gradient routing alternatives that stabilize expert specialization without doubling compute.

## Parameter-Efficient Fine-Tuning (PEFT) and Model Compression

### Low-Rank Adaptation (LoRA)

- Full fine-tuning of multi-billion parameter foundation models requires updating and storing complete optimizer gradient states for all parameters, causing severe memory exhaustion.
- **Low-Rank Adaptation (LoRA)** exploits the *low intrinsic dimensionality* of parameter updates by freezing pretrained weights $W_0 \in \mathbb{R}^{d \times k}$ and injecting trainable rank-decomposition matrices:
  $$W = W_0 + \Delta W = W_0 + \frac{\alpha}{r} (B \cdot A)$$
  where $B \in \mathbb{R}^{d \times r}$, $A \in \mathbb{R}^{r \times k}$, and rank $r \ll \min(d, k)$.
- Matrix $A$ initializes from a random Gaussian distribution, while matrix $B$ initializes to zero, ensuring $\Delta W = 0$ at the start of fine-tuning.
- Setting $r \in [4, 64]$ reduces trainable parameters by over $99\%$ while maintaining task performance comparable to full parameter tuning.
- At deployment, the update $\Delta W$ merges directly into $W_0$ via matrix addition ($W_{\text{deploy}} = W_0 + \frac{\alpha}{r} BA$), introducing zero extra inference latency.

### Quantization and QLoRA

- **Post-Training Quantization (PTQ)** converts 32-bit and 16-bit floating-point weights into 8-bit or 4-bit integer representations using scaled affine mappings:
  $$X_{\text{int}} = \text{round}\left( \frac{X}{\text{scale}} \right) + \text{zero\_point}$$
- **QLoRA** enables fine-tuning on consumer hardware by combining 4-bit NormalFloat (NF4) quantization, Double Quantization (quantizing the quantization constants themselves), and Paged Optimizers to manage memory spikes during backward passes.

> [!Tip]
> **Rank selection in LoRA**: begin fine-tuning experiments with rank $r=8$ and scaling factor $\alpha=16$; scaling rank beyond $r=32$ generally yields diminishing returns while multiplying GPU memory footprints.

## Mechanistic Interpretability and Sparse Autoencoders

### Neural Circuit Reverse-Engineering

- Classical post-hoc interpretability treats deep networks