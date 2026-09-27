# Migration in progress
# Lesson 1: Introduction

## Introduction to Convolutional Neural Networks and Spatial Representation

Fully connected feedforward networks process inputs as flat, unstructured vectors, making them poorly suited for data with native multi-dimensional spatial arrangements. Convolutional Neural Networks (CNNs) introduce architectural inductive biases inspired by biological visual systems, replacing dense matrix products with localized spatial filtering and parameter sharing. Understanding the biological origins of visual processing, the mathematical limitations of dense models on image grids, and the emergence of hierarchical feature representations establishes the foundation for deep computer vision.

## Biological Foundations of Visual Processing

### Hubel and Wiesel's Visual Cortex Discoveries

- In 1959 and 1962, neurophysiologists David Hubel and Torsten Wiesel conducted Nobel Prize-winning studies mapping the primary visual cortex (V1) of mammalian animal models.
- Their experiments demonstrated that individual cortical neurons do not respond uniformly to the entire visual field, but activate only when stimuli appear within a localized sub-region known as the **receptive field**.
- Neurons in V1 respond selectively to specific geometric primitives, such as oriented light bars, edges, and directional lines, rather than raw, unorganized luminance levels.

### Simple Cells Versus Complex Cells

- Biological visual processing organizes functionally into distinct cell categories:
  - **Simple Cells:** Possess spatially distinct excitatory and inhibitory zones within their receptive fields; they fire maximally to static bars of light possessing specific orientations, widths, and precise spatial coordinates.
  - **Complex Cells:** Receive input from multiple simple cells; they fire in response to oriented contours across larger receptive fields, maintaining response strength even when the stimulus shifts position.
- This biological hierarchy inspired artificial network designs: alternating localized feature detectors with spatial pooling stages creates **invariance to local position shifts**.

### The Computational Lineage: Neocognitron to LeNet

- In 1980, Kunihiko Fukushima formulated the **Neocognitron**, a hierarchical multilayer artificial network that implemented Hubel and Wiesel's principles using alternating S-cells (feature extracting) and C-cells (shift-tolerating).
- The Neocognitron lacked an automated backpropagation learning rule, relying on unsupervised, heuristic weight updates.
- In 1989 and 1998, Yann LeCun et al. synthesized backpropagation with weight sharing and local receptive fields to produce **LeNet-5**, establishing modern convolutional architectures for automated character recognition.

> [!Tip]
> **Biological vision inspired artificial convolution**: alternating localized feature extraction (simple cells) with spatial pooling (complex cells) builds hierarchical representations that tolerate positional shifts.

## The Failure of Dense Models on Visual Data

### The Parameter Explosion Bottleneck

- Multi-Layer Perceptrons connect every input element to every neuron in the subsequent layer via an independent weight parameter.
- Processing a modest three-channel color image of resolution $256 \times 256 \times 3 = 196,608$ pixels with a dense hidden layer of $2,048$ units requires:
  $$P = (196,608 \times 2,048) + 2,048 \approx 402,655,232 \text{ parameters}$$
- Allocating over 400 million parameters for a solitary layer consumes prohibitive GPU memory and leads to severe **overfitting**, as model capacity outstrips the volume of available training instances.

### Spatial Vectorization and Topology Destruction

- Dense layers require multidimensional arrays to be flattened into one-dimensional vectors ($x \in \mathbb{R}^{H \cdot W \cdot C}$).
- Vectorization destroys the intrinsic **spatial topology** of the image grid:
  - A pixel at coordinate $(i, j)$ is physically adjacent to pixel $(i+1, j)$, yet flattening rows places them hundreds or thousands of indices apart in the vector.
  - Flattening removes the spatial coordinate relationships that define geometric objects, lines, and textures.

### The Absence of Shift Equivariance

- In a fully connected network, an edge detector learned in the upper-left quadrant of an image is stored in weights specific to those input indices.
- If the identical visual feature appears in the lower-right quadrant, the dense network cannot recognize it unless it independently learns identical weight patterns for those distant indices.
- Dense networks lack **translation equivariance**, requiring redundant parameters to learn identical visual concepts at every distinct coordinate across the input grid.

> [!Important]
> **Dense layers destroy spatial structure**: flattening multidimensional images into vectors breaks local pixel adjacency, explodes parameter counts, and prevents models from recognizing visual patterns that shift across coordinates.

## The Core Inductive Biases of Convolution

### Local Receptive Fields and Sparse Connectivity

- Convolutional layers enforce **sparse connectivity**: each artificial neuron connects only to a small local spatial window of the input tensor, termed its **local receptive field** ($K \times K$).
- If a layer employs $3 \times 3$ filters, each neuron connects to only 9 spatial locations per input channel, regardless of whether the image resolution is $32 \times 32$ or $4096 \times 4096$.
- Sparse connectivity bounds the number of incoming synaptic connections per unit, allowing networks to process high-resolution inputs with manageable computational complexity.

### Parameter Sharing and Tied Synaptic Weights

- Rather than assigning unique weights to each spatial region, a convolutional layer sweeps an identical kernel matrix across the entire input grid, a mechanism known as **parameter sharing** (weight tying).
- A filter trained to detect horizontal bo