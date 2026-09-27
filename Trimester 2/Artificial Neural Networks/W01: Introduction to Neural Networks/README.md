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

> **Important:** ReLU is the default activation function for hidden layers in modern networks — it is computationally efficient and avoids the vanishing gradient problem that plagues Sigmoid and Tanh.

**Multilayer Perceptrons (MLPs) and Hidden Layers**

The multilayer perceptron (MLP) combines more than one layer of weights to map from input space to output space. Each intermediate layer is called a hidden layer.

**Architecture**

- **Input layer**: Serves only to store the values of the input variables.
- **Hidden layer(s)**: Perceptron units arranged in parallel so that multiple hyperplane tests can be conducted on linear combinations of input variables.
- **Output layer**: Produces the final prediction.

**Universal Approximation**

One hidden layer is enough to approximate any continuous single-valued function — this is a powerful property of MLPs. However, deeper networks can learn more complex representations with fewer neurons per layer.

**Notation**

For a network with L layers, layer l has s_l units. The forward equations are:

**z¹ = x** (input)
**zˡ = Wˡ aˡ⁻¹ + bˡ**
**aˡ = f(zˡ)**
**L(aᴸ, y)** = loss

> **Important:** A single hidden layer is theoretically sufficient to approximate any continuous function, but deep networks are more parameter-efficient for complex patterns.

**Forward Propagation and Backpropagation**

**Forward Propagation**

Forward propagation computes the network's output for a given input by propagating activations through the layers:

**zˡ = Wˡ aˡ⁻¹ + bˡ**
**aˡ = f(zˡ)**

This is the inference step — given input x, compute the predicted output.

**Backpropagation: Learning from Mistakes**

Backpropagation is the algorithm for training neural networks. It can be thought of as learning from mistakes: for example, when a child touches a hot stove and gets burned, that child learns that stoves can be hot.

**High-level algorithm**:
1. **Randomly initialize weights** wᵢⱼˡ for all layers.
2. **Forward propagate** to get f_w(x) for any x.
3. **Execute backpropagation** — compute partial derivatives ∂E/∂wᵢⱼ⁽ˡ⁾.
4. **Use gradient descent** to minimize the non-convex error E(w): **wᵢⱼˡ = wᵢⱼˡ − η · ∂E/∂wᵢⱼ⁽ˡ⁾**.

The chain rule of calculus is used to compute derivatives layer by layer, starting from the output and propagating backward.

**The Delta Rule and Its Generalization**

The delta rule is the basis for most applied learning algorithms. Backpropagation is a generalization of the delta rule, again based on gradient descent to minimize the sum squared difference between target and actual outputs.

> **Important:** Backpropagation uses the chain rule to compute gradients layer by layer, starting from the output and propagating backward — this is what enables deep networks to learn.

**Training: Loss Functions and Optimization**

Training a neural network is an optimization procedure aimed at obtaining weights and biases that minimize a loss function.

**Common Loss Functions**

- **Mean Squared Error (MSE)**: L = ½(z − y)² — used for regression.
- **Cross-entropy loss**: Used for classification tasks.
- **Negated kurtosis loss**: A novel loss function for improving training efficiency.

**Gradient Descent**

The gradient descent algorithm updates parameters in the direction that reduces the loss based on computed gradients:

**θ ← θ − η · ∇_θ J(θ)**

where η is the learning rate.

**Stochastic Gradient Descent (SGD)**

SGD randomly picks a data point (x⁽ⁱ⁾, y⁽ⁱ⁾) and updates weights incrementally, rather than computing the gradient over the entire dataset.

> **Important:** Training is optimization: find the weights that minimize the loss function. Gradient descent is the workhorse algorithm, and backpropagation computes the gradients it needs.

**Learning Objectives for This Module**

Based on course materials, by the end of this introduction you should be able to:

- **Explain perceptrons and MLPs**: structure, function, history, and limitations.
- **Describe activation functions**: their role in enabling complex pattern learning.
- **Implement a feedforward neural network** with Keras on Fashion-MNIST.
- **Interpret neural network training and results**: visualization and evaluation metrics.
- **Familiarize with deep learning frameworks**: PyTorch, TensorFlow, and Keras for model building and deployment.

**Key Takeaways**

- **ANNs are inspired by biological neurons** — simple computational units interconnected to form a network that collectively performs complex computations.
- **The perceptron is the simplest unit** and can only solve linearly separable problems; the delta rule trains it via gradient descent.
- **Activation functions introduce non-linearity**, which is essential for learning complex patterns. ReLU is the modern default for hidden layers.
- **MLPs add hidden layers**, enabling approximation of any continuous function and learning of hierarchical representations.
- **Backpropagation** computes gradients layer by layer using the chain rule, enabling deep networks to learn from errors.
- **Training is optimization** — minimize a loss function via gradient descent, updating weights in the direction that reduces error.

> **Important:** The core insight of neural networks: complex intelligence emerges from many simple units connected together, each performing a weighted sum and a non-linear activation, with learning driven by backpropagation of errors.
