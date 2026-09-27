# Migration in progress
# W09: Sequence Models

## Sequence Models and Recurrent Architectures

Feedforward and convolutional networks operate on the assumption of independent, identically distributed instances with fixed-dimensional inputs. Real-world tasks such as natural language processing, speech recognition, financial forecasting, and computational biology process sequential data where ordering, temporal context, and variable lengths dictate semantic meaning. Recurrent architectures resolve these challenges by maintaining internal hidden states that persist information across time steps through cyclical feedback loops. Analyzing the mathematical formulations of Recurrent Neural Networks (RNNs), Long Short-Term Memory (LSTM) cells, Gated Recurrent Units (GRUs), and sequence-to-sequence mappings provides the theoretical framework for modeling temporal dependencies.

## Foundations of Sequential Processing

### The Nature of Temporal and Sequential Data

- Sequential data consists of ordered tokens or vectors where the semantic value of coordinate $t$ depends directly on historical context:
  $$X = (x_1, x_2, \dots, x_T), \quad x_t \in \mathbb{R}^D$$
- The sequence length $T$ is generally non-uniform across samples within a dataset.
- Sequential distributions violate standard Markov assumptions: long-range semantic relationships require information to persist across dozens or hundreds of intervening time steps.

### Why Feedforward and Convolutional Networks Fail on Sequences

- **Fixed-Dimensional Inputs:** Standard MLPs require input vectors of rigid dimension $N$; handling variable sequence lengths requires artificial truncation or zero-padding that discards information or wastes compute.
- **Absence of Shared Temporal Memory:** An MLP cannot share parameters across time steps; a word appearing at index 1 is evaluated with entirely different weights than the identical word appearing at index 10.
- **Finite Context Receptive Fields:** While 1D convolutions process local sequence windows, capturing long-range dependencies requires stacking deep dilated layers, which increases latency and parameter volume.

### Sequence Mapping Taxonomies

- Sequence processing encompasses five distinct structural input-to-output topologies:
  - **One-to-One:** Standard non-sequential classification (fixed vector to fixed class).
  - **One-to-Many:** An individual non-sequential input maps to an ordered sequence (e.g., Image Captioning: image $\to$ sequence of descriptive words).
  - **Many-to-One:** An input sequence compresses into a single stationary prediction (e.g., Sentiment Analysis: text reviews $\to$ binary sentiment scalar).
  - **Many-to-Many (Synchronized):** Real-time sequence alignment where an output token is generated for every input token (e.g., Video Frame Classification, Part-of-Speech Tagging).
  - **Many-to-Many (Asynchronous / Delayed):** An input sequence is consumed entirely before generating an output sequence of different length (e.g., Machine Translation: English sentence $\to$ French sentence).

> [!Important]
> **Sequential processing requires dynamic temporal memory**: feedforward networks fail on sequences because they enforce static input dimensions, lack temporal parameter sharing, and cannot maintain long-range state across time.

## Vanilla Recurrent Neural Networks

### The Recurrent State Equation

- A standard **Recurrent Neural Network (RNN)** maintains an internal **hidden state vector** $h_t \in \mathbb{R}^H$ that acts as dynamic working memory.
- At time step $t$, the network receives input vector $x_t \in \mathbb{R}^D$ and the previous hidden state $h_{t-1}$, computing the updated hidden representation via an affine transformation followed by a hyperbolic tangent activation:
  $$h_t = \tanh(W_{hh} h_{t-1} + W_{xh} x_t + b_h)$$
  where $W_{hh} \in \mathbb{R}^{H \times H}$ is the recurrent transition weight matrix, $W_{xh} \in \mathbb{R}^{H \times D}$ is the input-to-hidden weight matrix, and $b_h \in \mathbb{R}^H$ is the hidden bias vector.
- The model computes an optional output prediction $\hat{y}_t$ by projecting the current hidden state:
  $$\hat{y}_t = g(W_{hy} h_t + b_y)$$
  where $W_{hy} \in \mathbb{R}^{K \times H}$ is the hidden-to-output matrix, and $g(\cdot)$ is an output activation (such as Softmax).

### Temporal Parameter Sharing

- An RNN applies the identical parameter matrices ($W_{hh}, W_{xh}, W_{hy}$) and biases across every time step $t \in \{1, \dots, T\}$.
- Temporal parameter sharing enables the network to process sequences of arbitrary length without allocating new weights for longer inputs.
- Shared parameters allow the model to recognize temporal patterns regardless of where they appear within the sequence duration.

```mermaid
flowchart LR
    subgraph Folded["Folded Representation"]
        x["x_t"] --> A["h_t"]
        A --> y["y_t"]
        A -- "W_hh" --> A
    end
    
    subgraph Unrolled["Unrolled Across Time"]
        x1["x_1"] --> h1["h_1"]
        h1 --> y1["y_1"]
        h1 -- "W_hh" --> h2["h_2"]
        
        x2["x_2"] --> h2
        h2 --> y2["y_2"]
        h2 -- "W_hh" --> h3["h_3"]
        
        x3["x_3"] --> h3
        h3 --> y3["y_3"]
    end
```

### Backpropagation Through Time (BPTT)

- Training an RNN requires unrolling the computational graph across all $T$ operational time steps.
- The total loss $\mathcal{L}$ evaluates as the sum of step-wise losses:
  $$\mathcal{L} = \sum_{t=1}^T \mathcal{L}_t(\hat{y}_t, y_t)$$
- Computing the gradient with respect to the recurrent matrix $W_{hh}$ requires applying the multivariate chain rule backward across time:
  $$\frac{\partial \mathcal{L}}{\partial W_{hh}} = \sum_{t=1}^T \sum_{k=1}^t \frac{\partial \mathcal{L}_t}{\partial h_t} \left( \frac{\partial h_t}{\partial h_k} \right) \frac{\partial h_k}{\partial W_{hh}}$$
- The Jacobian chain linking step $t$ to earlier step $k$ evaluates as a matrix product:
  $$\frac{\partial h_t}{\partial h_k} = \prod_{j=k+1}^t \frac{\partial h_j}{\partial h_{j-1}} = \prod_{j=k+1}^t W_{hh}^T \text{diag}(1 - h_j^2)$$

### The Mathematical Cause of Vanishing and Exploding Gradients

- The temporal Jacobian product $\prod_{j=k+1}^t W_{hh}^T \text{diag}(1 - h_j^2)$ compounds exponentially over temporal distance $(t - k)$:
  - **Vanishing Gradients:** Because the derivative of Tanh satisfies $|\tanh'(z)| \le 1.0$, if the spectral radius of $W_{hh}$ satisfies $\rho(W_{hh}) < 1.0$, the gradient norm decays to machine zero: $\lim_{t - k \to \infty} \left\| \frac{\partial h_t}{\partial h_k} \right\| = 0$.
  - **Exploding Gradients:** If $\rho(W_{hh}) > 1.0$, error signals compound exponentially toward infinity, triggering floating-point overflow and `NaN` parameter divergence.
- Because of vanishing gradients, vanilla RNNs suffer from **exponential forgetting**, making them incapable of learning dependencies that span more than 10 to 15 time steps.

> [!Tip]
> **Vanilla RNNs suffer from exponential forgetting**: multiplying by the recurrent transition matrix $W_{hh}^T$ at every step causes backpropagated error signals to decay exponentially, restricting learning to short, localized contexts.

## Gated Memory: Long Short-Term Memory

### The Constant Error Carousel and Additive Cell State

- Formulated by Sepp Hochreiter and Jürgen Schmidhuber (1997), **Long Short-Term Memory (LSTM)** eliminates vanishing gradients by separating memory storage from hidden feature representation.
- The LSTM introduces an explicit **cell state** vector $c_t \in \mathbb{R}^H$ that functions as a linear memory conveyor belt.
- While the hidden state $h_t$ undergoes non-linear projections at each step, the cell state updates primarily through **linear additive operations**, establishing a **Constant Error Carousel (CEC)** that preserves gradient signals across hundreds of steps.

### Gating Equations: Forget, Input, and Output Gates

- An LSTM regulates the flow of information using three parameterized **multiplicative gates** that use Sigmoid activations ($\sigma(z) \in [0, 1]$):
  1. **Forget Gate ($f_t$):** Controls what proportion of the previous cell state $c_{t-1}$ to discard:
     $$f_t = \sigma(W_f \cdot [h_{t-1}, x_t] + b_f)$$
  2. **Input Gate ($i_t$):** Controls which coordinates of the candidate memory to write into the cell state:
     $$i_t = \sigma(W_i \cdot [h_{t-1}, x_t] + b_i)$$
  3. **Candidate Memory ($\tilde{c}_t$):** Generates new candidate feature values using a Tanh activation:
     $$\tilde{c}_t = \tanh(W_c \cdot [h_{t-1}, x_t] + b_c)$$
  4. **Cell State Update ($c_t$):** Combines the gated historical memory with the gated candidate update via addition:
     $$c_t = f_t \odot c_{t-1} + i_t \odot \tilde{c}_t$$
  5. **Output Gate ($o_t$):** Controls which parts of the internal cell state to expose as the external hidden state:
     $$o_t = \sigma(W_o \cdot [h_{t-1}, x_t] + b_o)$$
     $$h_t = o_t \odot \tanh(c_t)$$

```mermaid
flowchart TD
    subgraph LSTMCell["LSTM Cell Operations at Time t"]
        C_prev["c_{t-1}"] --> Add(("Additive Sum"))
        Add --> C_curr["c_t"]
        
        H_prev["h_{t-1}"] --> Gates["Concatenate [h_{t-1}, x_t]"]
        X_curr["x_t"] --> Gates
        
        Gates --> F_Gate["Forget Gate: f_t = σ(...)"]
        Gates --> I_Gate["Input Gate: i_t = σ(...)"]
        Gates --> C_Cand["Candidate: c~_t = tanh(...)"]
        Gates --> O_Gate["Output Gate: o_t = σ(...)"]
        
        C_prev --> Mul_F(("f_t ⊙ c_{t-1}"))
        F_Gate --> Mul_F
        Mul_F --> Add
        
        I_Gate --> Mul_I(("i_t ⊙ c~_t"))
        C_Cand --> Mul_I
        Mul_I --> Add
        
        C_curr --> Tanh_C["tanh(c_t)"]
        Tanh_C --> Mul_O(("o_t ⊙ tanh(c_t)"))
        O_Gate --> Mul_O
        Mul_O --> H_curr["h_t"]
    end
```

### Uninterrupted Gradient Highways in the Cell State

- Differentiating the cell state update with respect to the previous cell state yields:
  $$\frac{\partial c_t}{\partial c_{t-1}} = f_t$$
- The backpropagated error signal along the cell state path evaluates as:
  $$\frac{\partial \mathcal{L}}{\partial c_k} = \frac{\partial \mathcal{L}}{\partial c_t} \left( \prod_{j=k+1}^t f_j \right)$$
- If the network learns to keep the forget gate open ($f_j \approx 1.0$), the gradient flows backward across arbitrary temporal distances without exponential decay, eliminating the vanishing gradient problem.

> [!Important]
> **Additiv