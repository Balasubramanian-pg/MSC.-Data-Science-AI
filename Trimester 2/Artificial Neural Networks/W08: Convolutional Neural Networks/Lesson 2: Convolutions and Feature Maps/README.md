# Migration in progress
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
  where $\lfloor \cdot \rf