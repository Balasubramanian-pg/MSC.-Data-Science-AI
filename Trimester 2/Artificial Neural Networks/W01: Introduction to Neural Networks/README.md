# Migration in progress
# W01: Introduction to Neural Networks

**What Is an Artificial Neural Network?**

An artificial neural network (ANN) is a computational model inspired by the structure and function of biological neural networks found in animal brains. It is a network of interconnected nodes called neurons, where each neuron receives weighted inputs and generates a response through an activation function.

- **Connectionism**: ANNs belong to the connectionist school of AI, which contrasts with symbolic AI. While symbolic AI initially dominated, the connectionist approach is now more prevalent.
- **Biological inspiration**: The brain is composed of a complex network of neurons. Although each neuron exhibits relatively simple behavior, it is connected to thousands of other neurons, contributing to the intricate functionality of the network.
- **Key caveat**: Researchers like Yann LeCun have noted that ANNs resemble biological neural networks in much the same way that an airplane's wings resemble those of a bird — inspiration, not replication.

> **Important:** ANNs are computational models inspired by biological neurons — each neuron is a simple computational unit, and complexity arises from the interconnectedness of these units.

**The Biological Neuron and Its Artificial Analogue**

Understanding the biological neuron provides intuition for the artificial version.

- **Dendrites** collect input from other neurons — analogous to input parameters.
- **Synapses** control the strength of the connection — analogous to weights.
- **Axon hillock** generates outgoing spikes when enough charge flows in — analogous to the activation function.
- **Output** is the average firing rate of the neuron — analogous to the output value.

The human brain has about 10¹¹ neurons, each with about 10³ weights — a huge number of weights that can affect computation in a very short time, far exceeding the bandwidth of a conventional computer.

> **Important:** The artificial neuron abstracts biology into three operations: weighted sum of inputs, addition of a bias, and application of an activation function.

**The Perceptron: The Simplest Neural Unit**

The perceptron is a neural system composed of only a single neuron. Strictly speaking, it is not a network. Mathematically, perceptron operation is:

**y = f(x) = φ(wᵀx + b)**

where φ(u) is the activation function, w = [w₁ … w_d]ᵀ is the weight vector, and b is the bias.

**The Perceptron as a Binary Classifier**

With a hard-threshold activation function set to 0, the perceptron output is:

**y = f(x) = φ₀(wᵀx + b) = { 1, if wᵀx + b > 0; 0, otherwise }**

This can be used as a binary classifier. The purpose of the bias is to change the decision boundary.

**Training the Perceptron**

Training determines the weight and bias. The perceptron learning algorithm converges only if the problem is linearly separable. In that case, the delta rule (a particular instance of gradient descent) updates the weights by minimizing the error function:

**E = ½ Σᵢ₌₁ⁿ (yᵢ − f(xᵢ))²**

The weight update is: **∂E/∂wⱼ = −(yᵢ − f(xᵢ)) · xⱼ**

**Historical Context**

- **McCulloch and Pitts** proposed the first mathematical model of a neuron in the 1940s.
- **Frank Rosenblatt** introduced the perceptron in the 1950s and built the first hardware neural network system.
- Rosenblatt demonstrated theoretically that the perceptron learning algorithm was guaranteed to find a solution, in a finite number of steps, to any problem that was solvable in principle by a perceptron.
- **Minsky and Papert** later showed that a simple switch-type network using a step activation function could only solve linearly separable problems — a limitation that temporarily stalled the field.

> **Important:** The perceptron is the simplest neural unit and can only solve linearly separable problems — this limitation is what motivated multilayer networks.

**Activation Functions: Enabling Non-Linearity**

A common characteristic of various ANNs is that the activation function is always nonlinear. This is what allows neural networks to learn complex patterns.

**Common Activation Functions**

| Function | Formula | Range | Key Property |
|---|---|---|---|
| **Identity** | φ(u) = u | (−∞, ∞) | Linear; reduces to simple multiplication |
| **Sigmoid (logistic)** | φ(u) = 1/(1+e⁻ᵘ) | (0, 1) | Historically most used; differentiable; derivative s'(u) = s(u)[1−s(u)] |
| **Tanh** | φ(u) = (eᵘ−e⁻ᵘ)/(eᵘ+e⁻ᵘ) | (−1, 1) | Zero-centered; preferable to logistic for faster convergence |
| **Hard threshold** | φ(u) = I(u ≥ u_thsh) | {0, 1} | Non-differentiable; used in original perceptron |
| **ReLU** | φ(u) = max(0, u) | [0, ∞) | Computationally simple; accelerates training and convergence |

**The Vanishing Gradient Problem**

The sigmoid function has a derivative close to zero when |u| > 4, causing numerical problems for large numbers of hidden layers — the vanishing gradient problem. ReLU avoids this problem for positive values.

**Empirical performance**: ReLU achieved 91.05% accuracy vs. Tanh at 85.42% and Sigmoid at 81.34% in comparative studies.

> **Important:** ReLU is the default activation function for hidden layers in modern networks — it is computationally efficient and avoids the vanishing gra