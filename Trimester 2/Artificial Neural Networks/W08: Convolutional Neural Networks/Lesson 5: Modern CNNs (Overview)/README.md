# Migration in progress
# Lesson 5: Modern CNNs (Overview)

## Modern CNN Architectures: Advanced Paradigms and Design Evolution

The architectural design of Convolutional Neural Networks advanced from empirical trial-and-error toward systematic structural engineering. Following the success of classical deep models like ResNet, modern CNNs address fundamental bottlenecks in feature representation, channel interdependencies, multidimensional resource scaling, and computational efficiency. Examining multi-path cardinality in ResNeXt, dynamic channel recalibration in Squeeze-and-Excitation Networks, compound resource allocation in EfficientNet, and the modern architectural redesign of ConvNeXt establishes the state of contemporary convolutional vision backbones.

## Multi-Path Cardinality: ResNeXt

### The Cardinality Dimension

- Traditional methods scaled convolutional networks along two primary structural axes: **depth** (adding more sequential layers) and **width** (increasing the number of channels per layer).
- Saining Xie et al. (2017) introduced **ResNeXt**, proposing a third structural dimension: **cardinality**.
- **Cardinality** defines the *size of the set of transformations*, representing the number of parallel, independent computational paths operating within a single block.
- Empirical and theoretical findings demonstrated that increasing cardinality improves representational accuracy more effectively than increasing depth or width, while keeping computational complexity (FLOPs) and parameter count bounded.

### Split-Transform-Merge Topology

- ResNeXt formalizes an aggregated network transformation following a **Split-Transform-Merge** paradigm:
  $$\mathcal{F}(x) = \sum_{i=1}^C \mathcal{T}_i(x)$$
  where $C$ denotes the cardinality hyperparameter, and each $\mathcal{T}_i(x)$ is a low-dimensional non-linear transformation.
- The input tensor splits into $C$ distinct lower-dimensional paths, each branch undergoes an identical sequence of transformations ($1 \times 1 \to 3 \times 3 \to 1 \times 1$), and the outputs merge via element-wise addition before joining the residual skip connection:
  $$y = x + \sum_{i=1}^C \mathcal{T}_i(x)$$

### Grouped Convolutions as Computational Equivalents

- Evaluating 32 separate individual branches sequentially creates implementation friction on hardware accelerators.
- ResNeXt reformulates the Split-Transform-Merge operation into an equivalent **Grouped Convolution**:
  - A grouped convolution divides incoming channels into $G = C$ mutually exclusive groups.
  - Convolutions execute independently within each group without cross-channel communication.
- Using grouped convolutions allows a ResNeXt bottleneck block to achieve the exact mathematical representation of 32 parallel paths in a single hardware-optimized layer.

```mermaid
flowchart TD
    In["Input Tensor: x (256 x H x W)"] --> Conv1["1x1 Conv (Compress: 256 -> 128) + BN + ReLU"]
    Conv1 --> GConv["3x3 Grouped Conv (Groups=32, Channels=128) + BN + ReLU"]
    GConv --> Conv2["1x1 Conv (Expand: 128 -> 256) + BN"]
    In ----> Skip["Identity Shortcut: x"]
    Conv2 --> Add(("Additive Sum"))
    Skip --> Add
    Add --> OutRelu["ReLU Activation"]
    OutRelu --> Out["Output Tensor (256 x H x W)"]
```

> [!Important]
> **Cardinality outperforms depth and width**: increasing the number of parallel grouped transformation paths (cardinality) yields greater gains in top-1 classification accuracy per FLOP than expanding layer depth or channel width.

## Channel-Wise Attention: Squeeze-and-Excitation Networks

### The Squeeze Step: Global Spatial Embedding

- Standard convolutional layers aggregate spatial context and cross-channel patterns simultaneously, treating all channels with equal importance.
- Proposed by Jie Hu et al. (2018), **Squeeze-and-Excitation Networks (SENet)** introduce dynamic channel-wise attention to model interdependencies between channels explicitly.
- The **Squeeze** operation aggregates spatial feature dimensions $(H \times W)$ into a single scalar per channel using **Global Average Pooling (GAP)**:
  $$z_c = \mathbf{F}_{\text{sq}}(u_c) = \frac{1}{H \times W} \sum_{i=1}^H \sum_{j=1}^W u_c(i, j)$$
- The squeeze step produces a 1D channel descriptor vector $z \in \mathbb{R}^C$ that captures the global contextual distribution of each feature map across the entire spatial canvas.

### The Excitation Step: Adaptive Gating via Bottlenecks

- The **Excitation** operation maps the global channel descriptor $z$ to a set of per-channel modulation weights through a parameterized two-layer bottleneck:
  $$s = \mathbf{F}_{\text{ex}}(z, W) = \sigma\left( W_2 \, \delta(W_1 z) \right)$$
  where $\delta$ denotes the ReLU activation function, $\sigma$ denotes the Sigmoid gating function, $W_1 \in \mathbb{R}^{\frac{C}{r} \times C}$, and $W_2 \in \mathbb{R}^{C \times \frac{C}{r}}$.
- The **reduction ratio** $r$ (typically $r = 16$) compresses channel dimensionality to limit parameter overhead.
- The terminal Sigmoid function bounds the output excitation vector to $s \in (0, 1)^C$, representing the relative importance scalar of each individual channel.

```mermaid
flowchart TD
    In["Feature Map: U (C x H x W)"] --> Squeeze["Global Average Pooling (Squeeze)"]
    Squeeze --> Z["Channel Descriptor: z (C x 1 x 1)"]
    Z --> FC1["Dense Layer (Reduce by r: C -> C/r) + ReLU"]
    FC1 --> FC2["Dense Layer (Expand: C/r -> C) + Sigmoid"]
    FC2 --> S["Channel Scales: s (C x 1 x 1)"]
    In --> Scale(("Channel-Wise Multiplication"))
    S --> Scale
    Scale --> Out["Recalibrated Feature Map: X_tilde (C x H x W)"]
```

### The Scale Step: Dynamic Channel Recalibration

- The final **Scale** operation multiplies each spatial feature map in the original tensor $U$ by its corresponding scalar activation weight $s_c$:
  $$\tilde{x}_c = \mathbf{F}_{\text{scale}}(u_c, s_c) = s_c \cdot u_c$$
  where $u_c \in \mathbb{R}^{H \times W}$, and $s_c \in (0, 1)$ acts as a dynamic channel gate.
- Channels capturing task-critical signals receive weights near one, while channels capturing background noise or redundant features are suppressed toward zero.
- SE blocks introduce minimal parameter overhead (less than 1% additional parameters) and can be bolted onto any baseline architecture (e.g., SE-ResNet, SE-ResNeXt).

> [!Tip]
> **Squeeze-and-Excitation recalibrates channel attention**: squeezing spatial dimensions via global pooling and passing descriptors through a bottleneck allows the network to dynamically scale the importance of individual channels.

## Systematic Scaling: EfficientNet and Compound Scaling

### The Flaws of Unidimensional Scaling

- Scaling convolutional architectures to improve accuracy historically relied on tuning a single dimension arbitrarily:
  - **Depth ($d$):** Adding layers (e.g., ResNet-50 to ResNet-152) captures richer hierarchical features, but suffers from diminishing returns due to vanishing gradients.
  - **Width ($w$):** Expanding channel counts (e.g., WideResNet) captures fine-grained features, but wide, shallow networks struggle to learn complex structural abstractions.
  - **Resolution ($r$):** Increasing input image resolution (e.g., $224 \times 224 \to 512 \times 512$) provides finer visual patterns, but computational cost scales quadratically ($O(r^2)$).
- Mingxing Tan and Quoc Le (2019) demonstrated that scaling any single dimension independently leads to rapid accuracy saturation.

### The Compound Scaling Formula

- **EfficientNet** balances depth, width, and resolution concurrently using a principled mathematical formulation known as **Compound Scaling**.
- The three dimensions scale jointly using a user-defined compound coefficient $\phi$ and fixed scaling constants $(\alpha, \beta, \gamma)$:
  $$\text{Depth: } d = \alpha^\phi$$
  $$\text{Width: } w = \beta^\phi$$
  $$\text{Resolution: } r = \gamma^\phi$$
  $$\text{subject to } \alpha \cdot \beta^2 \cdot \gamma^2 \approx 2 \quad \text{and} \quad \alpha \ge 1, \; \beta \ge 1, \; \gamma \ge 1$$
- Because doubling network depth doubles FLOPs ($2^1$), while doubling width or resolution quadruples FLOPs ($w^2, r^2$), constraining $\alpha \cdot \beta^2 \cdot \gamma^2 \approx 2$ guarantees that scaling $\phi$ by 1 increases total model FLOPs by approximately $2^\phi$.

### EfficientNet-B0 Baseline 