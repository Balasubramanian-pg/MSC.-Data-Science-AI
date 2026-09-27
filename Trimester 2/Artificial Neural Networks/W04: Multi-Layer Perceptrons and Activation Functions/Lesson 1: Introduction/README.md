# Migration in progress
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
> **Feedforward topology** ensures deterministic propagation: executing computation across directed acyclic graphs prevents infinite