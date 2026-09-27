# W08: Convolutional Neural Networks
## Convolutional Neural Networks: Architectural Foundations and Mechanics

Convolutional Neural Networks (CNNs) represent a foundational class of deep architectures designed specifically to process data organized as multi-dimensional grids, such as images, audio spectrograms, and volumetric video tensors. While dense Multi-Layer Perceptrons disregard spatial structure and suffer from catastrophic parameter growth on high-resolution inputs, CNNs introduce explicit structural inductive biases through local receptive fields, shared synaptic weights, and pooling operations. Understanding the discrete mathematics of multi-channel convolution, spatial downsampling, receptive field expansion, and architectural breakthroughs provides the technical basis for modern computer vision.

## The Transition from Dense to Convolutional Architectures

### The Parameter Explosion in Fully Connected Models

- In a fully connected Multi-Layer Perceptron (MLP), every input unit connects to every hidden neuron, requiring an independent weight parameter for each synaptic path.
- Consider a standard high-resolution RGB image of dimensions $1000 \times 1000 \times 3 = 3 \times 10^6$ input values:
  - Connecting this raw flattened input to a modest first hidden layer containing $1,000$ neurons requires:
    $$P = (3 \times 10^6 \times 1000) + 1000 \approx 3 \times 10^9 \text{ parameters}$$
- Allocating 3 billion floating-point weights ($12\text{ GB}$ of RAM for a single layer in FP32) makes dense models computationally intractable and prone to extreme overfitting on visual inputs.

### Preservation of Spatial Topology and Locality

- Dense layers require vectorizing multidimensional arrays into one-dimensional vectors, discarding the natural spatial coordinates of pixels.
- In physical imagery, pixels in close spatial proximity share strong semantic correlations, a property known as **local spatial coherence**.
- Pixels separated by large spatial distances exhibit weaker direct correlations, meaning a feature detector need only evaluate a constrained local neighborhood rather than the entire input canvas simultaneously.

### The Inductive Biases: Sparse Connectivity and Parameter Sharing

- Convolutional architectures enforce two structural constraints that solve parameter explosion:
  - **Sparse Connectivity (Local Receptive Fields):** Each hidden unit connects only to a small, localized spatial patch of the input tensor (e.g., $3 \times 3$ or $5 \times 5$ pixels). The number of incoming connections per neuron depends strictly on the filter kernel dimensions ($K \times K$), completely decoupled from the spatial resolution of the input image.
  - **Parameter Sharing (Tied Weights):** The exact same weight matrix (kernel) is swept across the entire input grid. If an edge-detecting filter is useful in the top-left corner of an image, that identical filter is equally useful in the bottom-right corner.
- Instead of allocating billions of weights, a convolutional layer allocates a small filter tensor that is reused across all spatial coordinates, reducing parameter requirements by multiple orders of magnitude.

### Equivariance to Translation

- Parameter sharing imparts a mathematical property known as **translation equivariance**.
- A function $f$ is equivariant to a transformation $g$ if transforming the input yields an identically transformed output:
  $$f(g(x)) = g(f(x))$$
- If an input object shifts by a spatial displacement vector $(\Delta x, \Delta y)$, the resulting activation feature map shifts by the identical displacement without altering the computed activation values:
  $$\text{Conv}(\text{Shift}(I)) = \text{Shift}(\text{Conv}(I))$$
- Translation equivariance allows CNNs to identify visual features regardless of where they appear within the sensory field.

> [!Important]
> **Convolutional inductive biases restrict capacity efficiently**: sparse connectivity and parameter sharing reduce parameter counts from billions to thousands, while enforcing translation equivariance across spatial coordinates.

## Mathematical Mechanics of the Convolutional Layer

### Discrete Cross-Correlation Versus Formal Convolution

- In pure mathematics, the continuous **convolution operation** between an input function $I$ and a kernel $K$ involves flipping the kernel across both coordinate axes prior to integration:
  $$(I * K)(t) = \int_{-\infty}^\infty I(\tau) K(t - \tau) \, d\tau$$
- For a discrete two-dimensional input, true convolution requires double index inversion:
  $$S(i, j) = (I * K)(i, j) = \sum_{m} \sum_{n} I(i - m, \; j - n) K(m, n)$$
- Deep learning frameworks omit the kernel-flipping step for computational efficiency, implementing the **discrete cross-correlation operator** while referring to it convention-wise as convolution:
  $$S(i, j) = (I * K)(i, j) = \sum_{m} \sum_{n} I(i + m, \; j + n) K(m, n)$$
- Because kernel weights are learned via backpropagation, flipping the kernel merely mirrors the initial parameter coordinates without altering representational capacity or gradient dynamics.

### Multidimensional Tensor Convolutions

- In practical neural architectures, inputs and activations exist as three-dimensional tensors of shape $(C_{\text{in}} \times H_{\text{in}} \times W_{\text{in}})$, where $C_{\text{in}}$ denotes the channel depth (e.g., 3 for RGB, or 64 for intermediate feature maps).
- A single convolutional filter is a three-dimensional tensor of shape $(C_{\text{in}} \times K_h \times K_w)$, matching the exact channel depth of the input.
- To produce an output tensor containing $C_{\text{out}}$ distinct feature maps, the layer deploys a bank of $C_{\text{out}}$ separate filters assembled into a four-dimensional weight tensor:
  $$\mathcal{W} \in \mathbb{R}^{C_{\text{out}} \times C_{\text{in}} \times K_h \times K_w}$$
- For output channel $k$, the pre-activation at spatial location $(i, j)$ computes the sum of cross-correlations across all input channels, offset by an independent scalar bias $b_k$:
  $$Z_k(i, j) = \sum_{c=1}^{C_{\text{in}}} \sum_{m=0}^{K_h-1} \sum_{n=0}^{K_w-1} X_c(i + m, \; j + n) W_k(c, m, n) + b_k$$
- An element-wise non-linear activation function (such as ReLU or GELU) is applied to generate post-activation feature maps: $A_k(i, j) = g(Z_k(i, j))$.

### Spatial Geometry: Padding, Stride, and Output Dimensions

- The spatial dimensions of the output feature map depend on four geometric hyperparameters: input dimension ($H_{\text{in}}, W_{\text{in}}$), kernel size ($K_h, K_w$), **padding** ($P$), and **stride** ($S$).
- **Padding ($P$):** Adds synthetic pixel borders (typically zeros) around the input perimeter:
  - **Valid Padding ($P = 0$):** No padding applied; filters operate strictly within real pixel boundaries, causing spatial dimensions to shrink by $(K - 1)$ pixels per layer.
  - **Same Padding:** Adds sufficient padding such that the output spatial resolution matches the input resolution when stride $S = 1$:
    $$P = \frac{K - 1}{2} \quad (\text{for odd } K)$$
- **Stride ($S$):** The step size by which the filter shifts across the input grid. A stride of $S = 1$ shifts pixel by pixel; a stride of $S \ge 2$ subsamples the grid, reducing output resolution.
- **Output Spatial Dimension Formula:**
  $$H_{\text{out}} = \left\lfloor \frac{H_{\text{in}} - K_h + 2P}{S} \right\rfloor + 1$$
  $$W_{\text{out}} = \left\lfloor \frac{W_{\text{in}} - K_w + 2P}{S} \right\rfloor + 1$$

### Parameter Accounting in Convolutional Layers

- The total number of learnable parameters in a standard convolutional layer depends exclusively on kernel dimensions and channel counts, remaining invariant to input image resolution:
  $$P_{\text{weights}} = C_{\text{out}} \times (C_{\text{in}} \times K_h \times K_w)$$
  $$P_{\text{biases}} = C_{\text{out}} \quad (\text{one scalar bias per output feature map})$$
  $$P_{\text{total}} = C_{\text{out}} \times (C_{\text{in}} \times K_h \times K_w + 1)$$
- For example, a layer receiving 64 input channels and producing 128 output channels using $3 \times 3$ filters requires:
  $$P = 128 \times (64 \times 3 \times 3 + 1) = 128 \times (576 + 1) = 73,856 \text{ parameters}$$

> [!Tip]
> **Convolutional parameter counts depend on channels, not pixels**: increasing input image resolution increases the computational operations (FLOPs), but leaves the layer's total parameter count completely unchanged.

## Pooling and Spatial Downsampling

### Max Pooling Versus Average Pooling

- Pooling layers perform spatial downsampling by applying non-linear statistical aggregation operations across local window patches.
- **Max Pooling:** Selects the maximum activation value within a local pooling window of size $K_p \times K_p$:
  $$Y(i, j) = \max_{m, n \in [0, K_p-1]} X(i \cdot S + m, \; j \cdot S + n)$$
  Max pooling acts as an invariant feature detector, testing whether a specific pattern exists anywhere within the window regardless of precise sub-pixel location.
- **Average Pooling:** Evaluates the arithmetic mean of all activations within the local window:
  $$Y(i, j) = \frac{1}{K_p^2} \sum_{m=0}^{K_p-1} \sum_{n=0}^{K_p-1} X(i \cdot S + m, \; j \cdot S + n)$$
  Average pooling smooths activations, retaining background contextual information while damping sharp response peaks.
- **Zero Learnable Parameters:** Standard pooling layers contain zero learnable weights and zero biases; they evaluate fixed non-parametric mathematical operations.

### Translation Invariance and Invariance to Local Perturbations

- While convolutional layers are translation *equivariant*, pooling introduces local **translation invariance**.
- If an input feature shifts slightly within the spatial boundary of a pooling window, the maximum operation extracts the identical peak value:
  $$\text{MaxPool}(\text{Perturb}(X)) \approx \text{MaxPool}(X)$$
- Local invariance allows the network to prioritize feature *presence* over absolute *spatial coordinate precision*, enabling robust classification under minor rotations, skews, and translations.

### Global Average Pooling and Dense Layer Replacement

- Introduced in Network-in-Network (Min Lin et al., 2013), **Global Average Pooling (GAP)** reduces each entire $(H \times W)$ feature map to a single scalar value by averaging across all spatial coordinates:
  $$\text{GAP}(X_k) = \frac{1}{H \times W} \sum_{i=1}^H \sum_{j=1}^W X_k(i, j)$$
- Applying GAP to a tensor of shape $(C \times H \times W)$ produces a flattened vector of shape $(C \times 1)$.
- Replacing fully connected classification heads with Global Average Pooling provides structural advantages:
  - Eliminates millions of dense parameters connecting final convolutional feature maps to classification layers, preventing overfitting.
  - Allows networks to process input images of arbitrary, variable spatial resolutions without triggering dimension mismatch errors.
  - Creates direct correspondence between individual feature maps and target category categories, improving model interpretability.

> [!Tip]
> **Global Average Pooling eliminates classification bottlenecks**: collapsing spatial dimensions into channel means removes millions of fully connected parameters, preventing overfitting and enabling variable-resolution inputs.

## Receptive Field Mathematics and Stacking Dynamics

### Theoretical Versus Effective Receptive Fields

- The **Theoretical Receptive Field (TRF)** defines the spatial diameter of the input image patch that can mathematically influence a specific neuron in a downstream feature map.
- The **Effective Receptive Field (ERF)** describes the true operational region that significantly influences the neuron's output activation.
- David Luo et al. (2016) proved that the effective receptive field occupies only a central fraction of the theoretical receptive field, decaying outward following a two-dimensional **Gaussian distribution**:
  $$\text{Influence}(x, y) \propto \exp\left( -\frac{(x - x_0)^2 + (y - y_0)^2}{2\sigma_{\text{eff}}^2} \right)$$
- The effective receptive field expands with network depth, but grows at a slower rate than the theoretical boundary unless explicit architectural techniques are used.

### The Efficiency of Factorized $3 \times 3$ Convolutions

- Visual Geometry Group (VGGNet, 2014) demonstrated that stacking small $3 \times 3$ filters is strictly superior to using large spatial filters (such as $5 \times 5$ or $7 \times 7$).
- **Receptive Field Equivalence:** Stacking two consecutive $3 \times 3$ convolutional layers (stride 1) covers a theoretical receptive field equivalent to a single $5 \times 5$ layer:
  $$\text{Layer 1: } 3 \times 3 \longrightarrow \text{Layer 2: } 3 + (3 - 1) = 5 \times 5$$
  Stacking three $3 \times 3$ layers covers an effective receptive field of $7 \times 7$.
- **Parameter Savings:** Comparing two stacked $3 \times 3$ layers with $C$ channels against a single $5 \times 5$ layer reveals significant parameter reductions:
  $$P_{\text{stacked}} = 2 \times (C \times C \times 3 \times 3) = 18 C^2$$
  $$P_{\text{single}} = 1 \times (C \times C \times 5 \times 5) = 25 C^2$$
  $$\text{Ratio} = \frac{18 C^2}{25 C^2} = 0.72 \quad (\mathbf{28\% \text{ parameter reduction}})$$
- Stacking factorized $3 \times 3$ filters introduces multiple intermediate non-linear activation functions (two ReLUs instead of one), increasing discriminative representational capacity while lowering parameter count.

### Recursive Receptive Field Calculation

- The theoretical receptive field $RF_l$ of layer $l$ calculates recursively from earlier layers using kernel size $K_l$ and accumulated stride:
  $$RF_l = RF_{l-1} + (K_l - 1) \cdot J_{l-1}$$
  where $RF_0 = 1$, and $J_l$ denotes the **cumulative jump (stride)** of the feature map:
  $$J_l = J_{l-1} \cdot S_l \quad (\text{with } J_0 = 1)$$
- Downsampling layers (strided convolutions and pooling) scale the cumulative jump $J$, accelerating receptive field expansion across subsequent layers.

> [!Important]
> **Stacking small kernels beats large kernels**: two consecutive $3 \times 3$ convolutions provide the identical $5 \times 5$ receptive field as a single large filter, but use 28% fewer parameters and incorporate an additional non-linear activation.

## Specialized Convolutional Operators

### $1 \times 1$ Convolutions for Cross-Channel Projection

- Introduced in Network-in-Network and popularized by GoogLeNet (Inception), a **$1 \times 1$ convolution** operates across a spatial receptive field of a single pixel ($K_h = 1, K_w = 1$).
- A $1 \times 1$ convolution acts as a coordinate-wise **cross-channel linear projection** followed by a non-linear activation:
  $$Z_k(i, j) = \sum_{c=1}^{C_{\text{in}}} X_c(i, j) W_k(c) + b_k$$
- **Primary Operational Roles:**
  - **Dimensionality Reduction (Channel Pooling):** Compresses high channel counts (e.g., $512 \to 64$) before executing computationally expensive $3 \times 3$ or $5 \times 5$ spatial convolutions.
  - **Dimensionality Expansion:** Expands channel depth (e.g., $64 \to 256$) after spatial operations to increase representational capacity.
  - **Inexpensive Non-Linearity:** Adds extra non-linear activation stages without altering spatial resolution.

### Dilated (Atrous) Convolutions for Receptive Field Expansion

- **Dilated (Atrous) convolutions** insert spaces into the kernel, inflating its spatial footprint without adding parameters.
- A kernel with dilation rate $d$ spaces its tap elements $d$ units apart:
  $$S(i, j) = \sum_{m} \sum_{n} I(i + m \cdot d, \; j + n \cdot d) K(m, n)$$
- The effective kernel size $K_{\text{eff}}$ expands according to:
  $$K_{\text{eff}} = K + (K - 1)(d - 1)$$
  A $3 \times 3$ kernel with dilation rate $d = 2$ covers a $5 \times 5$ spatial receptive field, while using only 9 learnable parameters.
- Dilated convolutions are essential in semantic segmentation (e.g., DeepLab) and audio synthesis (e.g., WaveNet), expanding receptive fields over large contexts without downsampling spatial resolution via pooling.

### Depthwise Separable Convolutions in Mobile Architectures

- Introduced in Xception (François Chollet, 2017) and MobileNet (Andrew Howard et al., 2017), **Depthwise Separable Convolutions** factorize standard convolution into two independent stages:
  1. **Depthwise Convolution:** Applies a single spatial filter ($K \times K$) per input channel independently without cross-channel interaction:
     $$\text{Params}_{\text{DW}} = C_{\text{in}} \times K \times K$$
  2. **Pointwise Convolution:** Applies a standard $1 \times 1$ convolution to mix channels linearly across the depthwise outputs:
     $$\text{Params}_{\text{PW}} = C_{\text{in}} \times C_{\text{out}} \times 1 \times 1$$
- **Computational Efficiency:** Comparing depthwise separable convolution against standard convolution reveals dramatic parameter and FLOP reductions:
  $$\text{Ratio} = \frac{C_{\text{in}} \cdot K^2 + C_{\text{in}} \cdot C_{\text{out}}}{C_{\text{in}} \cdot C_{\text{out}} \cdot K^2} = \frac{1}{C_{\text{out}}} + \frac{1}{K^2}$$
- For $3 \times 3$ filters ($K=3$) and large channel counts ($C_{\text{out}} \gg 1$), depthwise separable convolutions require approximately **$\frac{1}{9}$ ($\approx 11\%$) of the compute and parameters** of standard convolutions with minimal accuracy loss.

### Transposed Convolutions for Learned Upsampling

- While pooling downsamples spatial grids, dense prediction tasks (semantic segmentation, super-resolution, autoencoders) require spatial upsampling.
- A **Transposed Convolution** (fractionally strided convolution) reverses forward and backward passes, mapping a low-resolution feature map to a higher-resolution output grid.
- Transposed convolutions distribute each input pixel across a weighted kernel footprint on the output grid, learning optimal spatial interpolation weights through backpropagation rather than relying on bilinear upsampling.

> [!Tip]
> **Depthwise separable convolutions reduce compute by nearly 90%**: decoupling spatial filtering from cross-channel mixing allows mobile architectures to achieve near-standard accuracy with a fraction of the parameters.

## Landmark CNN Architectural Evolution

| Architecture Landmark | Input Resolution | Parameter Count | Core Algorithmic Innovation | Structural Downsampling Strategy | Primary Architectural Milestone |
|---|---|---|---|---|---|
| **LeNet-5 (1998)** | $32 \times 32 \times 1$ | $\approx 60\text{ K}$ | Convolution + Average Pooling + Tanh | $2 \times 2$ Average Pooling | Commercialized automated handwritten digit check reading |
| **AlexNet (2012)** | $224 \times 224 \times 3$ | $\approx 62\text{ M}$ | ReLU, Inverted Dropout, Dual-GPU pipeline | Overlapping Max Pooling ($3 \times 3$, stride 2) | Sparked the modern deep learning revolution at ImageNet |
| **VGG-16 (2014)** | $224 \times 224 \times 3$ | $\approx 138\text{ M}$ | Homogeneous stacks of small $3 \times 3$ convolutions | Standard $2 \times 2$ Max Pooling (stride 2) | Proved that architectural depth and small filters improve representations |
| **GoogLeNet (2014)** | $224 \times 224 \times 3$ | $\approx 7\text{ M}$ | Inception modules, $1 \times 1$ bottlenecks, Global Avg Pooling | Strided pooling inside parallel branches | Eliminated dense classification heads; reduced parameters by $90\%$ vs AlexNet |
| **ResNet-50 (2015)** | $224 \times 224 \times 3$ | $\approx 25.6\text{ M}$ | Residual skip connections ($F(x) + x$), Bottleneck blocks | Strided convolutions ($S=2$) within residual blocks | Solved vanishing gradients; enabled training of networks over 100 layers deep |
| **MobileNetV2 (2018)**| $224 \times 224 \times 3$ | $\approx 3.4\text{ M}$ | Inverted residual blocks, Linear bottlenecks | Strided depthwise convolutions | Optimized high-accuracy inference for edge mobile hardware |

### Comparison of Convolutional Operator Variants

| Convolutional Operator | Mathematical Mechanism | Primary Parameter Scaling | Spatial Receptive Field Effect | Primary Application Domain |
|---|---|---|---|---|
| **Standard 2D Conv** | Joint spatial and cross-channel integration | $O(C_{\text{out}} \cdot C_{\text{in}} \cdot K^2)$ | Standard expansion: $K \times K$ | General feature extraction in CNNs |
| **$1 \times 1$ Projection** | Pure cross-channel linear combination | $O(C_{\text{out}} \cdot C_{\text{in}})$ | Spatial size invariant ($1 \times 1$) | Dimensionality reduction; Inception bottlenecks |
| **Dilated (Atrous)** | Strided kernel indexing with holes ($d$) | $O(C_{\text{out}} \cdot C_{\text{in}} \cdot K^2)$ | Rapid expansion: $K + (K-1)(d-1)$ | Semantic segmentation; audio synthesis |
| **Depthwise Separable** | Decoupled spatial filtering + $1 \times 1$ mixing | $O(C_{\text{in}} \cdot K^2 + C_{\text{in}} \cdot C_{\text{out}})$ | Standard expansion ($K \times K$) | Mobile and edge-deployed networks |
| **Transposed Conv** | Inverted gradient backward pass mapping | $O(C_{\text{out}} \cdot C_{\text{in}} \cdot K^2)$ | Upsamples spatial resolution ($H \uparrow, W \uparrow$) | Generative autoencoders; super-resolution |

> [!Important]
> **Architectural evolution moved from brute force to structural efficiency**: modern architectures replace massive parameters with factorized $3 \times 3$ filters, $1 \times 1$ channel bottlenecks, depthwise separable blocks, and residual skip connections.

## Key Takeaways

- **Fully connected layers fail on spatial data** due to combinatorial parameter explosion and the destruction of local spatial coordinates.
- **Sparse connectivity and parameter sharing** act as structural inductive biases, enabling translation equivariance while slashing parameter counts.
- **Deep learning implements cross-correlation**, omitting the mathematical kernel-flipping step because backpropagation learns unconstrained filter orientations directly.
- **Output spatial dimensions** depend on input size, kernel diameter, padding, and stride: $H_{\text{out}} = \lfloor \frac{H - K + 2P}{S} \rfloor + 1$.
- **Convolutional parameter counts depend on channel depth and kernel size**, remaining invariant to the spatial resolution of input images.
- **Max pooling introduces local translation invariance**, reducing spatial dimensions without adding learnable parameters.
- **Global Average Pooling replaces dense classification heads**, removing millions of parameters and enabling models to process variable-resolution inputs.
- **Stacking factorized $3 \times 3$ convolutions** matches the receptive field of large filters while using significantly fewer parameters and incorporating additional non-linear activations.
- **$1 \times 1$ convolutions perform cross-channel projections**, enabling dimensionality reduction and bottleneck blocks that preserve computational efficiency.
- **Depthwise separable convolutions decouple spatial filtering from channel mixing**, reducing computation and parameter requirements by nearly 90%.

> [!Tip]
> The defining principle of convolutional architectures: **spatial locality and weight sharing construct scalable vision models**; replacing dense matrices with localized tensor kernels preserves spatial coordinates, enforces translation equivariance, and enables deep networks to process visual inputs efficiently.
