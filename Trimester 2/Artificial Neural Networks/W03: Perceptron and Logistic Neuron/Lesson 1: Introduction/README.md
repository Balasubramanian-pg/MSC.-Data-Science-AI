# Migration in progress
# Lesson 1: Introduction

## Foundations of Artificial Neurons: Perceptron and Logistic Models

Artificial neural networks trace their lineage to computational attempts to simulate the information-processing capabilities of biological nervous systems. The progression from rigid mathematical abstractions to adaptive computational units began with early threshold logic and culminated in differentiable models capable of gradient-driven learning. Understanding the architectural mechanics, geometric constraints, and mathematical transitions between the classical Perceptron and the Logistic Neuron establishes the foundation for analyzing modern deep feedforward networks.

## Biological Inspiration and the McCulloch-Pitts Formulation

### Biological Foundations of Neural Computation

- Biological neurons consist of four principal structural components: **dendrites** (signal receivers), the **soma** (cell body that accumulates electrical potentials), the **axon** (signal transmitter), and **synapses** (junctions that modulate signal transmission strength).
- Information flows through electrochemical signals; an action potential (spike) fires along the axon only when the integrated membrane potential in the soma exceeds a specific **activation threshold**.
- **Synaptic plasticity** provides the biological basis of learning, adjusting the efficacy of signal transmission based on neural activity patterns.

### The McCulloch-Pitts (M-P) Neuron

- Developed in 1943, the **McCulloch-Pitts neuron** represents the earliest mathematical formulation of an artificial neural unit.
- Inputs are strictly binary ($x_i \in \{0, 1\}$), categorized into either *excitatory* inputs or *inhibitory* inputs.
- An active inhibitory input unconditionally prevents the neuron from firing, functioning as an absolute veto mechanism.
- Excitatory inputs contribute equally with fixed, unlearnable unit weights: the neuron outputs $1$ if the sum of excitatory inputs meets or exceeds a predefined integer threshold $\theta$, and $0$ otherwise.
- The McCulloch-Pitts model functions as a hardwired logical processor capable of representing basic Boolean operators like AND, OR, and NOT, but it lacks an automated learning algorithm.

> [!Tip]
> **The McCulloch-Pitts model** established computational threshold logic: while it proved that networks of binary switches can evaluate logical operations, its lack of adjustable weights prevented automated learning from empirical data.

## The Rosenblatt Perceptron Architecture

### Mathematical Formulation and Affine Combination

- Introduced by Frank Rosenblatt in 1958, the **Perceptron** introduced learnable synaptic weights and continuous real-valued inputs ($x \in \mathbb{R}^n$).
- Each input feature $x_i$ is scaled by an adjustable **weight** $w_i$, reflecting the relative importance and sign (excitatory or inhibitory) of that feature.
- The neuron computes an **affine combination** (pre-activation sum) of the input signals: $z = \sum_{i=1}^n w_i x_i + b = w^T x + b$.
- The **bias** parameter $b$ acts as an adjustable threshold, shifting the activation boundary away from the coordinate origin to provide translation flexibility.

### The Step Activation Function

- The Perceptron processes the affine sum $z$ through a discontinuous **Heaviside step function** (threshold function):
  $$\hat{y} = f(z) = \begin{cases} 1 & \text{if } z \ge 0 \\ 0 & \text{if } z < 0 \end{cases}$$
- In bipolar formulations, the activation function maps to discrete binary states $\{-1, +1\}$ using the signum function: $\text{sgn}(z)$.
- The output $\hat{y}$ produces a deterministic, hard binary decision that assigns the input vector to one of two mutually exclusive classes.

### The Perceptron Learning Rule

- The **Perceptron Learning Algorithm (PLA)** updates parameters iteratively based on misclassified training examples.
- For a training pair $(x, y)$ with target $y \in \{0, 1\}$ and prediction $\hat{y} \in \{0, 1\}$, parameter updates follow the rule:
  $$w \leftarrow w + \eta (y - \hat{y}) x$$
  $$b \leftarrow b + \eta (y - \hat{y})$$
- The **learning rate** $\eta \in (0, 1]$ scales the magnitude of the corrective adjustment.
- If an example is classified correctly ($y - \hat{y} = 0$), weights remain unchanged; if misclassified, the weight vector rotates toward or away from the input vector to correct the classification error.
- The **Novikoff Perceptron Convergence Theorem** guarantees that if the training data is linearly separable by a margin $\gamma$, the algorithm converges to a separating hyperplane in a finite number of steps bounded by $\left(\frac{R}{\gamma}\right)^2$, where $R = \max \|x\|_2$.

> [!Important]
> **The Perceptron Learning Algorithm** updates weights strictly upon error: it drives parameter convergence in finite iterations for linearly separable datasets, but oscillates indefinitely without terminating if the data cannot be separated by a plane.

## Geometric Boundaries and Linear Separability

### The Hyperplane Decision Boundary

- The decision boundary of a single-layer Perceptron is a flat mathematical **hyperplane** embedded in $\mathbb{R}^n$ defined by the equation $w^T x + b = 0$.
- In two-dimensional input space, this boundary forms a straight line ($w_1 x_1 + w_2 x_2 + b = 0$); in three dimensions, it defines a flat two-dimensional plane.
- The weight vector $w$ is geometrically **orthogonal (normal)** to the decision boundary hyperplane, pointing directly into the half-space where predictions evaluate to $\hat{y} = 1$.
- The bias parameter $b$ determines the orthogonal distance from the coordinate origin to the decision surface: $d = \frac{-b}{\|w\|_2}$.

### The XOR Dilemma and Historical Impact

- A dataset exhibits **linear separability** if a single flat hyperplane can partition positive instances from negative instances without error.
- Elementary Boolean operations such as AND, OR, and NAND are linearly separable, allowing a single Perceptron to model their truth tables successfully.
- In 1969, Marvin Minsky and Seymour Papert demonstrated that the **exclusive-or (XOR)** function cannot be resolved by a single-layer Perceptron because positive labels occupy diagonally opposite corners of the feature space.
- Single-laye