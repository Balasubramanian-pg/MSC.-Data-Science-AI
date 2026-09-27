# Lesson 2: Convolutions and Feature Maps

## Convolutions and Feature Maps in Neural Networks

The core computational mechanism of a Convolutional Neural Network is the convolutional layer, which replaces dense vector-matrix products with localized spatial cross-correlations. By sweeping multidimensional filter kernels across input grids, the layer extracts translation-equivariant response patterns into structured arrays known as feature maps. Analyzing the discrete algebra of multi-channel tensor operations, the spatial control exerted by stride and padding, and the memory footprint of intermediate activations provides the technical basis for configuring deep convolutional backbones.

## The Mathematics of 2D Spatial Filtering

### The Discrete Cross-Correlation Operator

- Standard deep learning frameworks implement the **discrete cross-correlation operator** while referring to it convention-wise as convolution:
  $$S(i, j) = (I * K)(i, j) = \sum_{m=0}^{K_h-1} \sum_{n=0}^{K_w-1} I(i + m, \; j + n) K(m, n)$$
  where $I$ represents the 2D input array, $K$ represents a kernel filter of spatial dimensions $K_h \times K_w$, and $S(i, j)$ represents the resulting scalar pre-activation at coordinate $(i, j)$.
- In formal mathematical convolution, the kernel flips across both horizontal and vertical axes before multiplication ($K(-m, -n)$); neural networks omit this inversion because kernel parameters are unconstrained real values optimized directly via backpropagation.

### Element-Wise Multiplication and Accumulation

- At each spatial step $(i, j)$, the filter overlays an identical-sized sub-region of the input known as a **patch**.
- The operation executes two steps:
  1. **Hadamard Multiplication:** Multiplies each kernel entry by its corresponding overlapping input pixel: $P(m, n) = I(i + m, j + n) \cdot K(m, n)$.
  2. **Accumulation:** Sums all element-wise products into a single scalar value: $\sum_{m, n} P(m, n)$.
- The magnitude of the accumulated scalar measures the **structural alignment** between the local image patch and the kernel template; patches matching the kernel pattern produce large positive outputs, while non-matching regions produce values near zero or negative.

### Bias Intercepts and Activation Mapping

- An independent scalar **bias parameter** $b_k$ is added to the accumulated cross-correlation sum for each filter:
  $$Z(i, j) = S(i, j) + b_k = \left( \sum_{m=0}^{K_h-1} \sum_{n=0}^{K_w-1} I(i + m, \; j + n) K(m, n) \right) + b_k$$
- An element-wise non-linear **activation function** $g(\cdot)$ (such as ReLU, Leaky ReLU, or GELU) maps the affine pre-activation $Z(i, j)$ to produce the final post-activation value:
  $$A(i, j) = g(Z(i, j))$$
- Applying non-linear activations allows the network to threshold feature presence, passing strong visual signals forward while zeroing out unaligned background regions.

> [!Tip]
> **Cross-correlation measures pattern alignment**: sweeping a kernel across an input grid computes localized inner products that quantify how closely each spatial patch matches the filter template.

## Multi-Channel Convolutions and Tensor Transformations

### Channel Integration Across Depth

- Input images and intermediate layer outputs exist as 3D tensors of shape $(C_{\text{in}} \times H_{\text{in}} \times W_{\text{in}})$, where $C_{\text{in}}$ denotes channel depth (e.g., 3 for RGB, or 64 to 512 for hidden representations).
- A single convolutional filter is a 3D tensor of shape $(C_{\text{in}} \times K_h \times K_w)$, matching the exact channel depth of the incoming input tensor.
- To compute an output spatial coordinate, 2D cross-correlations execute independently across each input channel and are summed together into a single scalar value:
  $$Z_k(i, j) = \sum_{c=1}^{C_{\text{in}}} \left( \sum_{m=0}^{K_h-1} \sum_{n=0}^{K_w-1} X_c(i + m, \; j + n) W_k(c, m, n) \right) + b_k$$
- Channel integration performs **cross-channel spatial fusion**, allowing the filter to detect multi-spectral patterns (such as combining specific red, green, and blue cues to identify a unique texture).

### The 4D Weight Tensor Parameterization

- A single 3D filter collapses all $C_{\text{in}}$ input channels into a solitary 2D feature map.
- To detect $C_{\text{out}}$ distinct visual features concurrently, the layer deploys a bank of $C_{\text{out}}$ separate 3D filters, assembling them into a **4D weight tensor**:
  $$\mathcal{W} \in \mathbb{R}^{C_{\text{out}} \times C_{\text{in}} \times K_h \times K_w}$$
- The layer incorporates a 1D bias vector containing one scalar parameter per output feature map:
  $$b \in \mathbb{R}^{C_{\text{out}}}$$
- The total learnable parameter count for the layer is:
  $$P_{\text{total}} = C_{\text{out}} \times (C_{\text{in}} \times K_h \times K_w) + C_{\text{out}}$$

### Synthesizing Output Feature Maps

- The simultaneous evaluation of all $C_{\text{out}}$ filters produces an output tensor containing $C_{\text{out}}$ distinct 2D channels:
  $$\mathcal{A} \in \mathbb{R}^{C_{\text{out}} \times H_{\text{out}} \times W_{\text{out}}}$$
- Each 2D slice $A_k = \mathcal{A}[k, :, :]$ represents the **feature map** corresponding to the $k$-th filter.
- This transformation maps an input tensor with $C_{\text{in}}$ channels into a latent representation with $C_{\text{out}}$ channels, allowing the network to expand or contract feature dimensionality across depth.

> [!Important]
> **Filters match input channel depth**: a convolutional filter is a 3D tensor of shape $(C_{\text{in}} \times K \times K)$ that sums cross-correlations across all input channels to generate a single 2D feature map slice.

## Spatial Boundary Geometry: Stride and Padding

### Boundary Attenuation and Valid Padding

- When a filter of size $K \times K$ sweeps across an unpadded input grid, boundary pixels cannot center the kernel without causing filter elements to hang over the edge.
- **Valid Padding ($P = 0$):** Restricts kernel positions strictly to coordinates where the entire filter fits inside the real input grid.
- Without padding, the spatial output dimensions shrink on every layer by $(K - 1)$ pixels:
  $$H_{\text{out}} = H_{\text{in}} - K_h + 1$$
- In deep networks, repeated valid convolutions erode spatial dimensions rapidly, restricting depth and discarding boundary contextual information.

### Dimension Preservation via Same Padding

- **Same Padding** appends synthetic zero-valued borders of width $P$ around the perimeter of the input tensor.
- Choosing $P$ such that the output spatial resolution matches the input resolution when stride $S = 1$ requires:
  $$P = \frac{K - 1}{2} \quad (\text{for odd kernel sizes } K)$$
- For a standard $3 \times 3$ kernel ($K = 3$), applying padding $P = 1$ preserves spatial dimensions exactly ($H_{\text{out}} = H_{\text{in}}$).
- For a $5 \times 5$ kernel ($K = 5$), applying padding $P = 2$ preserves spatial dimensions.
- Zero-padding allows architectures to stack dozens of layers without premature spatial collapse, ensuring border pixels are sampled as frequently as central pixels.

### Stride Dynamics and Subsampling

- The **stride** ($S$) defines the spatial step size by which the filter shifts between successive evaluations.
- A stride of $S = 1$ evaluates overlapping windows shifted by a single pixel, preserving fine spatial resolution.
- A stride of $S \ge 2$ skips intermediate coordinates, downsampling the output feature map by an approximate factor of $S$.
- **Strided convolution** acts as an alternative to non-parametric pooling, allowing the network to learn optimal spatial downsampling weights through backpropagation.

### The Unified Output Dimension Formula

- Combining input dimensions, kernel sizes, padding allocations, and stride values yields the unified spatial dimension equations:
  $$H_{\text{out}} = \left\lfloor \frac{H_{\text{in}} - K_h + 2P}{S} \right\rfloor + 1$$
  $$W_{\text{out}} = \left\lfloor \frac{W_{\text{in}} - K_w + 2P}{S} \right\rfloor + 1$$
  where $\lfloor \cdot \rfloor$ denotes the floor function, ensuring valid integer grid indices.

> [!Tip]
> **Same padding preserves spatial resolution**: setting zero-padding to $P = \frac{K-1}{2}$ for odd-sized kernels prevents boundary erosion, allowing deep networks to maintain constant spatial dimensions across successive layers.

## Nature and Semantics of Feature Maps

### Feature Maps as Spatial Response Fields

- A **feature map** is a two-dimensional grid representing the spatial distribution of activations produced by a specific learned filter.
- Coordinate $(i, j)$ in feature map $A_k$ indicates the degree to which visual feature $k$ is present at that relative location in the input image.
- Because kernels are shared across all coordinates, a feature map preserves spatial topography: an activated cluster in the top-right of a feature map corresponds directly to a detected pattern in the top-right of the input canvas.

### Channel Depth as Feature Diversity

- The channel dimension $C_{\text{out}}$ of an intermediate tensor does not represent color or spatial coordinates; it represents the **cardinality of distinct visual detectors**.
- A tensor of shape $(256 \times 28 \times 28)$ represents 256 distinct visual filters, each evaluating its own $28 \times 28$ spatial activation grid across the input image.
- As networks process information from input to output, architectures typically trade spatial resolution for channel depth: spatial grids downsample ($H \downarrow, W \downarrow$) while channel capacity expands ($C \uparrow$) to encode increasingly diverse and abstract features.

### Hierarchical Visual Abstraction Across Layers

- Feature maps undergo qualitative semantic transformation as depth increases:
  - **Early Layers (Conv1 - Conv2):** High spatial resolution, shallow channel depth. Feature maps display high-frequency responses corresponding to edges, corners, and localized color gradients.
  - **Intermediate Layers (Conv3 - Conv4):** Moderate spatial resolution, expanded channel depth. Feature maps capture geometric motifs, textures, contours, and recurring parts.
  - **Deep Layers (Conv5+):** Low spatial resolution, wide channel depth. Feature maps display sparse, localized activation clusters corresponding to holistic semantic parts (e.g., eyes, wheels, text fragments), largely invariant to minor pixel transformations.

> [!Important]
> **Channel depth trades space for semantic abstraction**: deep architectures systematically reduce spatial resolution ($H \downarrow, W \downarrow$) while increasing channel count ($C \uparrow$) to transition from local edges to complex class semantics.

## Computational Complexity and Memory Footprint

### Floating-Point Operations (FLOPs) Accounting

- The computational cost of a convolutional layer is dominated by the multiply-accumulate operations executed across all output pixels and filter weights.
- Generating a single output scalar requires $C_{\text{in}} \times K_h \times K_w$ multiplications and an equivalent number of additions.
- Evaluating all $H_{\text{out}} \times W_{\text{out}}$ spatial locations across all $C_{\text{out}}$ feature maps yields the standard **FLOPs formula**:
  $$\text{FLOPs} = 2 \times H_{\text{out}} \times W_{\text{out}} \times C_{\text{out}} \times (C_{\text{in}} \times K_h \times K_w)$$
- For an input processing a $56 \times 56$ grid with 64 input channels, 128 output channels, and $3 \times 3$ filters:
  $$\text{FLOPs} = 2 \times 56 \times 56 \times 128 \times (64 \times 3 \times 3) \approx 462,422,016 \text{ operations} \approx 462.4 \text{ MFLOPs}$$

### Parameter Footprint Versus Activation Cache Memory

- A standard misconception is that parameter weights dominate GPU memory consumption during training.
- In convolutional layers, parameter counts are small due to parameter sharing:
  $$\text{Memory}_{\text{params}} = C_{\text{out}} \times (C_{\text{in}} \times K_h \times K_w + 1) \times 4 \text{ bytes (FP32)}$$
  (For the above layer: $73,856 \text{ parameters} \approx 295 \text{ KB}$).
- Conversely, forward activations must be cached in memory for each sample in a mini-batch of size $m$ to compute backward gradients:
  $$\text{Memory}_{\text{activations}} = m \times C_{\text{out}} \times H_{\text{out}} \times W_{\text{out}} \times 4 \text{ bytes (FP32)}$$
  (For batch size $m = 64$: $64 \times 128 \times 56 \times 56 \times 4 \text{ bytes} \approx 102.7 \text{ MB}$).
- Intermediate **activation caching consumes hundreds of times more RAM than static parameter storage**, making feature map resolution the primary constraint on maximum mini-batch size.

> [!Tip]
> **Activation tensors dominate training memory**: while parameter weights occupy negligible space due to weight sharing, cached intermediate feature maps consume megabytes per layer, dictating GPU batch size limits.

## Comparative Matrix of Padding Strategies

| Padding Mode | Mathematical Padding Size ($P$) | Output Spatial Dimension ($S=1$) | Boundary Pixel Weighting | Memory / Compute Impact | Primary Engineering Use Case |
|---|---|---|---|---|---|
| **Valid Padding** | $P = 0$ (No border added) | Shrinks: $H_{\text{out}} = H_{\text{in}} - K + 1$ | Under-represented (sampled fewer times than center) | Minimal (smallest feature maps) | WaveNet audio synthesis; tasks where boundary artifacts must be avoided |
| **Same Padding** | $P = \frac{K-1}{2}$ (Zero-padded borders) | Invariant: $H_{\text{out}} = H_{\text{in}}$ | Balanced (boundary pixels participate in equal steps) | Standard baseline for deep backbones | Universal standard for deep CNNs (VGG, ResNet) to enable deep stacking |
| **Full Padding** | $P = K - 1$ (Maximum border added) | Expands: $H_{\text{out}} = H_{\text{in}} + K - 1$ | Over-represented (captures extreme edge interactions) | Maximum compute and activation memory | Signal processing, acoustic filtering, specialized autoencoders |

> [!Important]
> **Same padding is the default choice**: setting $P = \frac{K-1}{2}$ prevents spatial dimensions from collapsing prematurely, allowing networks to build depth without losing image boundary coordinates.

## Key Takeaways

- **Convolutional layers execute cross-correlation**, calculating localized element-wise multiplications and accumulations between moving kernels and input patches.
- **Filter depth matches input channel depth**: a convolutional filter is a 3D tensor of shape $(C_{\text{in}} \times K_h \times K_w)$ that sums across all input channels to output a single 2D feature map slice.
- **A bank of $C_{\text{out}}$ filters** creates a 4D weight tensor $\mathcal{W} \in \mathbb{R}^{C_{\text{out}} \times C_{\text{in}} \times K_h \times K_w}$, producing a multi-channel output tensor $\mathcal{A} \in \mathbb{R}^{C_{\text{out}} \times H_{\text{out}} \times W_{\text{out}}}$.
- **Same padding ($P = \frac{K-1}{2}$)** preserves spatial grid dimensions when stride $S=1$, preventing spatial erosion across deep layer stacks.
- **The spatial dimension equation** $H_{\text{out}} = \lfloor \frac{H - K + 2P}{S} \rfloor + 1$ dictates feature map resolution across arbitrary padding and stride configurations.
- **Feature maps represent spatial detection fields**, preserving visual coordinate topography while encoding the intensity of specific learned features.
- **Architectures trade spatial resolution for channel depth**: networks downsample spatial grids ($H \downarrow, W \downarrow$) while expanding channel cardinality ($C \uparrow$) to transition from local edges to abstract semantics.
- **Cached feature map activations dominate training memory**, requiring significantly more GPU RAM than static filter weights and establishing the upper ceiling on training batch sizes.

> [!Tip]
> The central mechanics of convolutional processing: **multichannel filtering fuses spatial and depth information**; localized 3D kernels sweep across spatial grids to synthesize structured feature maps, allowing deep networks to preserve geometric topography while expanding semantic expressiveness.
