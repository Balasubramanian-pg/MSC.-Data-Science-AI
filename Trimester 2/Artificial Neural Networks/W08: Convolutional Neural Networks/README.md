# Migration in progress
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
- The **Effective Receptive Field (ERF)** describes the 