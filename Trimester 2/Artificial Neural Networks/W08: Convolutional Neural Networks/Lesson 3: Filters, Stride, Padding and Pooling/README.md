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
- If asymmetric padding is applied ($P_{\text{top}} \neq P_{\text{bottom}}$), total padding replaces $2P$ with $P_{\text{top}} + P_{\text{bottom}}$.

> [!Tip]
> **Same padding preserves spatial resolution across depth**: setting $P = \frac{K-1}{2}$ for odd-sized kernels guarantees that output spatial dimensions equal input dimensions under unit stride, preventing deep networks from collapsing spatially.

## Pooling Operations and Invariance Mechanics

### Max Pooling and Peak Signal Extraction

- **Max Pooling** partitions the input feature map into local spatial grids of size $K_p \times K_p$ and outputs the maximum scalar value within each window:
  $$Y_k(i, j) = \max_{m, n \in [0, K_p-1]} X_k(i \cdot S + m, \; j \cdot S + n)$$
- Standard configurations use $K_p = 2 \times 2$ windows with stride $S = 2$, halving spatial resolution while preserving channel depth.
- Max pooling operates as an activation detector: it tests whether a specific visual feature is present anywhere within the window, regardless of its precise sub-pixel coordinates.
- Max pooling contains **zero learnable parameters**, updating no weights during gradient descent.

### Average Pooling and Contextual Smoothing

- **Average Pooling** computes the arithmetic mean of all activations within the local pooling window:
  $$Y_k(i, j) = \frac{1}{K_p^2} \sum_{m=0}^{K_p-1} \sum_{n=0}^{K_p-1} X_k(i \cdot S + m, \; j \cdot S + n)$$
- While max pooling isolates the single most prominent feature spike, average pooling aggregates all activations within the window, smoothing the feature map and retaining background context.
- Average pooling is widely used in early vision networks and downsampling paths where smooth background statistics must be preserved.

### Backpropagation Through Pooling Layers

- Because pooling operations evaluate fixed non-parametric functions, they do not update parameters; they route incoming error gradients backward to upstream activations.
- **Max Pooling Backward Pass:** The gradient flows exclusively to the specific spatial index that produced the maximum value during the forward pass; all non-maximal indices receive a gradient of zero:
  $$\frac{\partial \mathcal{L}}{\partial X_k(i, j)} = \begin{cases} \frac{\partial \mathcal{L}}{\partial Y_k(r, c)} & \text{if } (i, j) = \arg\max \text{ in window } (r, c) \\ 0 & \text{otherwise} \end{cases}$$
  To execute this backward pass, the forward pass must store the coordinate indices of the winning activations in a **switch map** (argmax cache).
- **Average Pooling Backward Pass:** The incoming error gradient distributes equally among all $K_p^2$ inputs that contributed to the average:
  $$\frac{\partial \mathcal{L}}{\partial X_k(i, j)} = \frac{1}{K_p^2} \frac{\partial \mathcal{L}}{\partial Y_k(r, c)}$$

### Global Average Pooling as a Structural Regularizer

- **Global Average Pooling (GAP)** reduces each entire $(H \times W)$ feature map into a single scalar value by averaging across all spatial coordinates:
  $$\text{GAP}(X_k) = \frac{1}{H \times W} \sum_{i=1}^H \sum_{j=1}^W X_k(i, j)$$
- Applying GAP to a tensor of shape $(C \times H \times W)$ outputs a vector of shape $(C \times 1)$.
- Replacing fully connected classification layers with Global Average Pooling removes millions of dense weights, preventing overfitting and allowing architectures to process variable input resolutions without dimension mismatch errors.

> [!Important]
> **Max pooling gradients route through switches**: backpropagation routes error signals exclusively to the winning maximum index identified during the forward pass, setting gradients for all non-maximum positions within the window to zero.

## Comparative Matrix of Downsampling and Pooling Strategies

| Strategy | Learnable Parameters | Gradient Routing Mechanism | Output Spatial Resolution | Primary Operational Strength | Architectural Usage |
|---|---|---|---|---|---|
| **Max Pooling ($2 \times 2, S=2$)** | $0$ (Non-parametric) | Routes 100% of error to $\arg\max$; zero elsewhere | Halved: $(\lfloor \frac{H}{2} \rfloor \times \lfloor \frac{W}{2} \rfloor)$ | Sharp feature preservation; local shift invariance | Classic feature extractors (VGGNet, AlexNet) |
| **Average Pooling ($2 \times 2, S=2$)** | $0$ (Non-parametric) | Distributes error uniformly: $\frac{1}{K_p^2}$ to all units | Halved: $(\lfloor \frac{H}{2} \rfloor \times \lfloor \frac{W}{2} \rfloor)$ | Smooths background context; retains low-contrast cues | Inception modules; residual sub-sampling paths |
| **Strided Conv ($K=3, S=2$)** | $C_{\text{out}} \times (C_{\text{in}} \cdot K^2 + 1)$ | Standard backpropagation across learned weights | Halved: $(\lfloor \frac{H - K + 2P}{2} \rfloor + 1)$ | Learns optimal downsampling filters dynamically | Modern CNN backbones (ResNet, ConvNeXt) |
| **Global Avg Pooling (GAP)** | $0$ (Non-parametric) | Distributes error uniformly: $\frac{1}{H \cdot W}$ across all pixels | Collapsed: $(1 \times 1 \times C)$ | Eliminates dense classification parameters; regularizes | Terminal transition before classification heads |

> [!Tip]
> **Modern backbones favor strided convolutions and GAP**: replacing standard pooling layers with strided convolutions enables learnable downsampling, while terminal Global Average Pooling eliminates dense layer parameter bottlenecks.

## Key Takeaways

- **Filters are 3D volumes matching input depth ($C_{\text{in}} \times K_h \times K_w$)**; evaluating a filter computes localized cross-correlations across all channels and sums them into a single 2D feature map.
- **Filter banks define output channel depth**: deploying $C_{\text{out}}$ separate 3D filters produces an output tensor of shape $(C_{\text{out}} \times H_{\text{out}} \times W_{\text{out}})$.
- **Stride ($S$) governs spatial sampling frequency**; setting $S \ge 2$ downsamples the output grid, reducing memory and computation in subsequent layers.
- **Valid padding ($P=0$) erodes spatial boundaries** by $(K-1)$ pixels per layer, while **same padding ($P=\frac{K-1}{2}$)** preserves spatial resolution under unit stride.
- **The spatial dimension formula** $H_{\text{out}} = \lfloor \frac{H_{\text{in}} - K_h + 2P}{S} \rfloor + 1$ determines feature map dimensions across arbitrary kernel, stride, and padding configurations.
- **Max pooling extracts dominant local features** and provides translation invariance without introducing learnable parameters.
- **Max pooling backpropagation uses switch maps**, routing the entire incoming error gradient to the winning forward maximum coordinate while zeroing non-maximal inputs.
- **Global Average Pooling collapses spatial dimensions to $1 \times 1$**, replacing dense classification heads and enabling models to process variable-resolution inputs.

> [!Tip]
> The governing design principle of convolutional geometry: **channel depth captures semantic complexity, while stride and pooling control spatial resolution**; coordinating filter counts, padding, and downsampling schedules allows deep networks to trade fine spatial coordinates for rich semantic feature representations.
