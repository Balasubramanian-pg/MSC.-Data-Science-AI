# Lesson 1: Introduction

## Introduction to Multi-Layer Perceptrons and Non-Linear Representations

Single-neuron classifiers establish fundamental linear decision boundaries, yet real-world phenomena exhibit non-linear interactions that exceed the representational capacity of isolated threshold units. The Multi-Layer Perceptron (MLP) resolves this limitation by arranging individual neurons into cascaded computational stages known as hidden layers. Understanding the structural taxonomy, functional purpose of latent representations, and topological definitions of feedforward networks provides the conceptual foundation for designing deep architectures.

## The Evolutionary Step Beyond Single Neurons

### Representational Bottlenecks of Single Units

- A solitary Perceptron or Logistic Neuron maps inputs directly to an output through a single affine combination followed by a static activation function.
- Because the argument to the activation function is linear ($z = w^T x + b$), the resulting decision surface is constrained to a flat $(n-1)$-dimensional **hyperplane**.
- Target data distributions whose classes wrap, interlock, or cross along diagonal axes cannot be separated without error by a solitary plane.
- Overcoming this geometric bottleneck requires shifting from manual feature engineering to **representation learning**, where internal network layers construct hierarchical features automatically.

### The Concept of Representation Learning

- Classical machine learning relies on handcrafted transformation pipelines to project non-linear raw inputs into separable feature coordinates before applying a linear classifier.
- Multi-Layer Perceptrons integrate feature extraction and classification into a unified, **end-to-end differentiable system**.
- Intermediate layers learn **latent representations** directly from raw data, discovering geometric coordinate transformations optimized for the objective loss function.
- Lower layers identify elementary local coordinate patterns, while successive higher layers compose these patterns into abstract, global decision regions.

> [!Tip]
> **Representation learning** replaces heuristic feature extraction: intermediate layers act as automated coordinate transformers that reshape complex data geometry into configurations that output layers can classify linearly.

## Anatomical Structure of Multi-Layer Perceptrons

### Layer Taxonomy: Input, Hidden, and Output Layers

- The **input layer** serves as the passive entry point for the network, holding the raw feature vector $x \in \mathbb{R}^{n_0}$ without performing arithmetic transformations or applying activations.
- **Hidden layers** reside between the input and output stages, performing sequential non-linear operations that are not directly observed in the target label space.
- The term *hidden* denotes that intermediate activations represent internal latent states rather than ground-truth supervisory targets provided by the training dataset.
- The **output layer** executes the final transformation, mapping latent features into task-specific prediction spaces such as class probabilities or real-valued regression outputs.

### Topological Properties: Depth, Width, and Density

- The **depth** ($L$) of an architecture corresponds to the number of parameterized weight layers connecting the input to the final output, excluding the input layer itself.
- The **width** ($n_l$) of layer $l$ represents the number of distinct neurons operating concurrently at that specific depth.
- In a standard **fully connected (dense)** layer, every neuron receives weighted synaptic connections from every unit in the immediately preceding layer.
- An architecture's **capacity** measures its expressiveness, governed jointly by depth, layer-wise width, and total learnable parameter count.

### Feedforward Connectivity and Directed Graphs

- Multi-Layer Perceptrons operate as **directed acyclic graphs (DAGs)**, processing activations in a single forward sweep without feedback loops.
- Information flows strictly downstream: inputs activate the first hidden layer, propagating through intermediate latent states until the output layer generates predictions.
- The absence of internal cycles ensures deterministic execution during the **forward pass**, allowing intermediate activations to be cached for reverse-mode automatic differentiation.
- Networks possessing internal cyclical connections belong to the family of *Recurrent Neural Networks (RNNs)*, whereas MLPs remain strictly feedforward.

> [!Important]
> **Feedforward topology** ensures deterministic propagation: executing computation across directed acyclic graphs prevents infinite loops and guarantees that every neuron's activation depends strictly on the outputs of upstream layers.

## Functional Mechanics of Hidden Transformations

### Latent Space Warping

- A single hidden layer decomposes computation into two consecutive operations: a linear matrix mapping followed by an element-wise non-linear activation.
- The linear affine transformation ($z^{[1]} = W^{[1]} x + b^{[1]}$) projects, rotates, and scales the original input space.
- The non-linear activation ($a^{[1]} = g(z^{[1]})$) introduces **space bending**, warping the feature coordinates non-linearly.
- Through this geometric warping, points that were non-linearly separable in the input coordinate system become linearly separable in the hidden activation space ($a^{[1]}$).
- The output layer then applies a standard linear hyperplane across these transformed coordinates to perform final classification.

### The High-Level Function of Activation Functions

- Activation functions prevent deep networks from collapsing mathematically into a single-layer linear model.
- Applying a purely linear activation at every intermediate layer reduces a multi-layer cascade to a single matrix product, neutralizing the benefit of added depth.
- Non-linear activations introduce the curvature required to approximate complex decision boundaries, non-linear manifolds, and continuous multi-dimensional functions.
- The mathematical characteristics of activation functions directly control training speed, numerical stability, and susceptibility to vanishing or exploding gradients.

> [!Tip]
> **Latent space warping** untangles complex data: intermediate layers deform input coordinate systems so that decision surfaces that appear non-linear in input space are flat hyperplanes in hidden activation space.

## Comparative Architectural Progression

| Architectural Model | Hidden Layers | Decision Boundary Geometry | Feature Engineering Dependency | Representational Limit | Canonical Example |
|---|---|---|---|---|---|
| **Single-Layer Perceptron** | 0 | Flat linear hyperplane | Complete (requires linearly separable raw inputs) | Fails on simple non-linear logic (XOR) | Rosenblatt Perceptron |
| **Logistic Neuron** | 0 | Soft linear hyperplane with probabilistic margin | Complete (requires linearly separable raw inputs) | Limited to monotonic, linear log-odds | Single-unit Logistic Regression |
| **Shallow MLP** | 1 | Convex polygonal regions and arbitrary continuous approximations | Minimal (learns elementary feature combinations) | Requires exponential width for complex periodic functions | 2-Layer Neural Network ($L=2$) |
| **Deep MLP** | $\ge 2$ | Arbitrary non-convex, disconnected geometric regions | Autonomous (constructs hierarchical compositional features) | Parameter-efficient approximation of compositional mappings | Deep Feedforward Network ($L \ge 3$) |

> [!Important]
> **Hierarchical depth** enables parameter efficiency: while a shallow network can approximate any continuous function given infinite width, deep networks represent compositional structures using exponentially fewer parameters.

## Key Takeaways

- **Single-neuron models** are bound by linear separability, preventing them from classifying distributions with complex, intersecting, or non-convex class boundaries.
- **Multi-Layer Perceptrons** introduce intermediate hidden layers to execute representation learning, eliminating the reliance on handcrafted feature extraction.
- **Hidden layers** generate internal latent coordinates that are not directly observed in the external data, serving as automated feature representations.
- **Dense feedforward topologies** organize computation into directed acyclic graphs where activations advance unidirectionally without recurrent loops.
- **Network capacity** scales with depth and width, determining the geometric complexity of the decision surfaces the network can construct.
- **Latent space transformations** combine affine matrix operations with non-linear functions to bend feature space, making non-separable data linearly separable.
- **Non-linear activations** are essential to prevent deep networks from collapsing algebraically into a single linear transformation.
- **Deep architectures** provide exponential efficiency over wide, shallow networks by learning hierarchical, compositional representations across successive layers.

> [!Tip]
> The foundational principle of multi-layer architectures: **depth creates representation**; cascading linear matrix projections with non-linear activation functions enables neural networks to warp high-dimensional space, transforming complex raw data into linearly separable latent geometries.
