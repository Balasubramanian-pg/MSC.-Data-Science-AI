# Migration in progress
# Lesson 3: Filters, Stride, Padding and Pooling

## Filters, Stride, Padding, and Pooling Mechanics

Convolutional architectures control spatial resolution, parameter volume, and geometric invariance using four interrelated primitives: filters, stride, padding, and pooling. While filter dimensions and channel counts govern feature diversity and representational capacity, stride and padding dictate spatial feature map dimensions across layers. Pooling operations introduce local translation invariance and reduce computational load without adding learnable parameters. Analyzing the discrete mathematics and backpropagation dynamics of these four operations establishes the structural rules required to design balanced deep vision models.

## Filter Anatomy and Depth Dynamics

### The 3D Filter Volume

- In multi-channel convolutional layers, a filter is not a flat matrix, but a **three-dimensional tensor** parameterized by channel depth, kernel height, and kernel width:
  $$W_k \in \mathbb{R}^{C_{\text{in}} \times K_h \times K_w}$$
- The channel depth of every filter must match the channel depth of the incoming input tensor ($C_{\text{in}}$).
- A filter sweeping across an RGB input image ($C_{\text{in}} = 3$) with spatial size $3 \times 3$ has dimensions $3 \times 3 \times 3 = 27$ weight parameters.
- If the incoming feature map contains 256 channels, each individual $3 \times 3$ filter possesses a volume of $256 \times 3 \times 3 = 2,304$ weight parameters.

### Cross-Channel Summation and Scalar Biases

- Evaluating a 3D filter at a specific spatial coordinate $(i, j)$ requires computing 2D cross-correlations across each input channel and summing the results into a single scalar value:
  $$Z_k(i, j) = \sum_{c=1}^{C_{\text{in}}} \sum_{m=0}^{K_h-1} \sum_{n=0}^{K_w-1} X_c(i + m, \; j + n) W_k(c, m, n) + b_k$$
- Each filter incorporates a single **scalar bias parameter** $b_k \in \mathbb{R}$ that is added to the spatial sum, shifting the activation threshold uniformly across the entire output feature map.
- The 3D filter collapses all $C_{\text{in}}$ channels at coordinate $(i, j)$ into a single pre-activation scalar, fusing spatial patterns and depth cues concurrently.

### Filter Banks and Output Tensor Dimensionality

- A single 3D filter produces a single two-dimensional feature map of shape $(H_{\text{out}} \times W_{\text{out}})$.
- To detect multiple diverse visual features concurrently, the layer deploys a **filter bank** comprising $C_{\text{out}}$ distinct 3D filters assembled into a 4D weight tensor:
  $$\mathcal{W} \in \mathbb{R}^{C_{\text{out}} \times C_{\text{in}} \times K_h \times K_w}$$
- Stacking the resulting 2D feature maps produces a 3D output tensor:
  $$\mathcal{Z} \in \mathbb{R}^{C_{\text{out}} \times H_{\text{out}} \times W_{\text{out}}}$$
- The number of output channels ($C_{\text{out}}$) is determined strictly by the number of filters in the bank, independent of input channel depth.

> [!Tip]
> **Filters collapse input channels while expanding output depth**: each 3D filter integrates all $C_{\text{in}}$ channels into a single 2D feature map, while deploying $C_{\text{out}}$ filters creates an output tensor with depth $C_{\text{out}}$.

## Stride Dynamics and Spatial Compression

### Step Sizes and Sampling Frequency

- The **stride** ($S \in \mathbb{Z}^+$) defines the interval distance by which the filter shifts across the input tensor along horizontal and vertical axes.
- **Unit Stride ($S = 1$):** The filter shifts by a single pixel between successive evaluations, producing overlapping receptive fields that preserve fine spatial detail.
- **Subsampling Stride ($S \ge 2$):** The filter skips intermediate pixels, shifting by $S$ units per step and reducing spatial output resolution by an approximate factor of $\frac{1}{S}$.

### Downsampling via Strided Filtering

- Increasing stride reduces the computational cost of subsequent layers by shrinking the height and width of downstream feature maps.
- Evaluating a stride of $S = 2$ on an input of size $H \times W$ cuts output spatial resolution roughly in half ($H/2 \times W/2$), reducing the total number of spatial evaluations by approximately $75\%$.
- Striding provides a non-invertible spatial compression that discards high-frequency pixel variations while capturing dominant structural trends.

### Learnable Downsampling Versus Non-Parametric Operations

- Traditional architectures downsampled feature maps using fixed, non-parametric pooling layers (such as Max Pooling).
- Modern architectures (such as ResNet and ConvNeXt) frequently replace pooling layers with **strided convolutions** ($K = 3, S = 2$).
- Strided convolutions allow the network to optimize the spatial downsampling weights through backpropagation rather than relying on static pooling heuristics.

> [!Important]
> **Stride acts as a spatial subsampler**: setting $S \ge 2$ reduces spatial dimensions without requiring separate pooling layers, allowing the network to learn optimal downsampling filters via backpropagation.

## Padding Strategies and Boundary Preservation

### The Boundary Attenuation Problem

- Without padding, boundary pixels on the perimeter of an image cannot center the filter window without causing kernel elements to hang over empty space.
- Consequently, boundary pixels participate in far fewer cross-correlation operations than central pixels, causing information near borders to wash out.
- Applying unpadded convolutions erodes spatial dimensions by $(K - 1)$ pixels on every layer:
  $$H_{\text{out}} = H_{\text{in}} - K_h + 1$$
- In deep networks containing dozens of sequential layers, unpadded filtering causes spatial dimensions to collapse to zero before sufficient depth is achieved.

### Valid Padding Versus Same Padding

- **Valid Padding ($P = 0$):**
  - No synthetic border is added around the input perimeter.
  - The filter operates exclusively within real pixel coordinates, shrinking spatial dimensions at each layer.
  - Used when boundary edge artifacts must be strictly avoided.
- **Same Padding ($P \ge 1$):**
  - Appends a frame of zero-valued pixels around the perimeter of the input tensor.
  - For odd-sized kernels ($K_h = K_w = K$) and unit stride ($S = 1$), choosing padding $P$:
    $$P = \frac{K - 1}{2}$$
    ensures that the output spatial resolution matches the input resolution exactly: $H_{\text{out}} = H_{\text{in}}$.
  - A $3 \times 3$ filter requires $P = 1$; a $5 \times 5$ filter requires $P = 2$; a $7 \times 7$ filter requires $P = 3$.

### The General Spatial Dimension Equation

- Combining input height ($H_{\text{in}}$), kernel height ($K_h$), total vertical padding ($2P$), and vertical stride ($S$) yields the unified spatial dimension equation:
  $$H_{\text{out}} = \left\lfloor \frac{H_{\text{in}} - K_h + 2P}{S} \right\rfloor + 1$$
- The floor function $\lfloor \cdot \rfloor$ reflects that when the remaining pixel margin does not fit a full filter step, the hanging fractional step is truncated.
- If asymmetric padding is applied ($P