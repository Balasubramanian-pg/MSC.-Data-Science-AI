# Lesson 4: LSTM and GRU Architectures

## Gated Sequence Architectures: LSTM and GRU Mechanics

Vanilla Recurrent Neural Networks struggle to capture long-range temporal dependencies because continuous matrix multiplications across time steps cause backpropagated gradients to vanish or explode. Gated recurrent architectures resolve this mathematical breakdown by introducing continuous, differentiable gating mechanisms that regulate information flow into and out of persistent memory buffers. Analyzing the internal state equations, constant error dynamics, and computational trade-offs between Long Short-Term Memory (LSTM) networks and Gated Recurrent Units (GRUs) establishes the engineering principles governing modern recurrent modeling.

## The Gated Memory Paradigm

### The Need for Differentiable Switching

- In digital logic, physical transistors execute discrete binary switching ($0$ or $1$) to store or overwrite memory registers.
- Neural networks require all operations to be **end-to-end differentiable** to allow parameter optimization via gradient descent and Backpropagation Through Time (BPTT).
- Gated recurrent architectures emulate digital memory registers using **continuous soft gates** parameterized by the logistic sigmoid activation function:
  $$g = \sigma(W x + b) \in (0, 1)$$
- When gate activation approaches zero ($g \to 0$), the network blocks incoming information; when gate activation approaches one ($g \to 1$), the gate allows signals to pass unimpeded.

### The Mathematical Mechanics of Continuous Gates

- A gate evaluates as an affine combination of the incoming input vector $x_t \in \mathbb{R}^D$ and previous recurrent state $h_{t-1} \in \mathbb{R}^H$:
  $$g_t = \sigma(W_g \cdot [h_{t-1}, \; x_t] + b_g)$$
  where $[h_{t-1}, x_t] \in \mathbb{R}^{H+D}$ denotes vector concatenation along the feature dimension, and $W_g \in \mathbb{R}^{H \times (H+D)}$.
- The gate vector applies to a candidate memory tensor via the element-wise **Hadamard product** ($\odot$):
  $$\text{Filtered Signal} = g_t \odot C_t$$
- Because the gate outputs real numbers within the open unit interval $(0, 1)$, backpropagation calculates exact partial derivatives with respect to gate parameters, allowing the network to learn when to retain or erase memory.

### Additive Conveyor Belts Versus Multiplicative State Updates

- Vanilla RNNs update hidden states through continuous multiplicative mappings: $h_t = \tanh(W_{hh} h_{t-1} + \dots)$.
- Multiplicative transitions force the temporal Jacobian $\frac{\partial h_t}{\partial h_{t-1}}$ to depend directly on transition weights $W_{hh}^T$, causing exponential signal decay across time.
- Gated architectures replace multiplicative loops with **additive memory updates**:
  $$\text{State}_t = \text{State}_{t-1} + \Delta \text{State}$$
- Integrating information additively establishes an uninterrupted conveyor belt where error signals propagate backward across time without compounding through weight matrices.

> [!Tip]
> **Continuous gates make memory differentiable**: using Sigmoid activations allows networks to open or close memory channels via soft fractions in $(0, 1)$, preserving gradient flow during backpropagation.

## Long Short-Term Memory Architecture

### Dual-State Separation: Cell State Versus Hidden State

- Formulated by Sepp Hochreiter and Jürgen Schmidhuber (1997) and refined by Felix Gers et al. (2000), **Long Short-Term Memory (LSTM)** decomposes internal memory into two distinct vectors:
  - **Cell State ($c_t \in \mathbb{R}^H$):** Acts as a dedicated long-term memory conveyor belt, modified strictly through linear additive updates.
  - **Hidden State ($h_t \in \mathbb{R}^H$):** Acts as short-term working memory, representing the filtered, non-linear output exposed to downstream layers and output projections.

### The Mathematical Gate Equations

- At time step $t$, an LSTM cell receives input $x_t$, previous hidden state $h_{t-1}$, and previous cell state $c_{t-1}$, executing six sequential calculations:
  1. **Forget Gate ($f_t$):** Determines what proportion of the previous cell state $c_{t-1}$ to discard:
     $$f_t = \sigma(W_f \cdot [h_{t-1}, \; x_t] + b_f)$$
  2. **Input Gate ($i_t$):** Determines which coordinates of the candidate state to write into memory:
     $$i_t = \sigma(W_i \cdot [h_{t-1}, \; x_t] + b_i)$$
  3. **Candidate Cell State ($\tilde{c}_t$):** Creates new candidate memory values using a hyperbolic tangent activation:
     $$\tilde{c}_t = \tanh(W_c \cdot [h_{t-1}, \; x_t] + b_c)$$
  4. **Cell State Update ($c_t$):** Executes linear additive combination using the forget and input gates:
     $$c_t = f_t \odot c_{t-1} + i_t \odot \tilde{c}_t$$
  5. **Output Gate ($o_t$):** Determines which parts of the internal cell state to expose externally:
     $$o_t = \sigma(W_o \cdot [h_{t-1}, \; x_t] + b_o)$$
  6. **Hidden State Update ($h_t$):** Scales the normalized cell state by the output gate:
     $$h_t = o_t \odot \tanh(c_t)$$

```mermaid
flowchart TD
    subgraph LSTM["LSTM Internal Cell Dataflow"]
        C_prev["c_{t-1}"] --> Mul_F(("f_t ⊙ c_{t-1}"))
        Mul_F --> Add(("c_t = Sum"))
        Add --> C_curr["c_t"]
        
        Concat["[h_{t-1}, x_t]"] --> Gate_F["Forget Gate: f_t = σ(...)"]
        Concat --> Gate_I["Input Gate: i_t = σ(...)"]
        Concat --> Cand_C["Candidate: c~_t = tanh(...)"]
        Concat --> Gate_O["Output Gate: o_t = σ(...)"]
        
        Gate_F --> Mul_F
        Gate_I --> Mul_I(("i_t ⊙ c~_t"))
        Cand_C --> Mul_I
        Mul_I --> Add
        
        C_curr --> Tanh_C["tanh(c_t)"]
        Tanh_C --> Mul_O(("o_t ⊙ tanh(c_t)"))
        Gate_O --> Mul_O
        Mul_O --> H_curr["h_t"]
    end
```

### The Constant Error Carousel (CEC) and Gradient Preservation

- Differentiating the cell state update equation with respect to the previous cell state yields:
  $$\frac{\partial c_t}{\partial c_{t-1}} = \text{diag}(f_t)$$
- The backpropagated error signal along the cell state conveyor belt across a temporal span of $\tau = t - k$ steps expands as:
  $$\frac{\partial \mathcal{L}}{\partial c_k} = \frac{\partial \mathcal{L}}{\partial c_t} \left( \prod_{j=k+1}^t \frac{\partial c_j}{\partial c_{j-1}} \right) = \frac{\partial \mathcal{L}}{\partial c_t} \left( \prod_{j=k+1}^t \text{diag}(f_j) \right)$$
- If the network learns to keep the forget gate open ($f_j \approx 1.0$), the temporal Jacobian equals the identity matrix:
  $$\frac{\partial c_t}{\partial c_k} \approx I$$
- This structural identity creates the **Constant Error Carousel (CEC)**: error signals propagate backward across hundreds of time steps without exponential decay, eliminating the vanishing gradient problem.

### Architectural Variants: Peephole Connections and CIFG

- **Peephole Connections (Gers & Schmidhuber, 2000):** Standard LSTM gates observe only $h_{t-1}$ and $x_t$, remaining blind to the internal cell state $c_{t-1}$. Peephole connections allow gates to inspect the cell state directly:
  $$f_t = \sigma(W_f \cdot [h_{t-1}, \; x_t] + P_f \odot c_{t-1} + b_f)$$
  where $P_f \in \mathbb{R}^H$ is a diagonal weight vector. This enables precise timing coordination in sequence counting and frequency synchronization tasks.
- **Coupled Input and Forget Gate (CIFG):** Sets $i_t = 1 - f_t$, coupling writing and erasing into a single operation. The cell writes new candidate data only into coordinates that were erased, saving one gate projection.

> [!Important]
> **The Constant Error Carousel preserves gradients**: because the cell state updates additively ($c_t = f_t \odot c_{t-1} + \dots$), its temporal derivative equals the forget gate directly ($\frac{\partial c_t}{\partial c_{t-1}} = f_t$), creating a linear gradient highway across time.

## Gated Recurrent Unit Architecture

### State Consolidation and Component Simplification

- Proposed by Kyunghyun Cho et al. (2014), the **Gated Recurrent Unit (GRU)** streamlines recurrent gating by eliminating the separate cell state vector.
- The GRU tracks a single recurrent state vector $h_t \in \mathbb{R}^H$ that serves simultaneously as long-term memory storage and short-term working output.
- Structural gating complexity drops from three gates to **two gates**, reducing parameter counts and memory allocations.

### The Mathematical Gate Equations

- At time step $t$, a GRU cell receives input $x_t$ and previous hidden state $h_{t-1}$, executing four operations:
  1. **Reset Gate ($r_t$):** Controls how much historical context to expose to the candidate state calculation:
     $$r_t = \sigma(W_r \cdot [h_{t-1}, \; x_t] + b_r)$$
  2. **Update Gate ($z_t$):** Acts simultaneously as a forget gate and an input gate, regulating how much of the old state to carry forward:
     $$z_t = \sigma(W_z \cdot [h_{t-1}, \; x_t] + b_z)$$
  3. **Candidate Hidden State ($\tilde{h}_t$):** Uses the reset gate to selectively mask historical memory:
     $$\tilde{h}_t = \tanh(W_h \cdot [r_t \odot h_{t-1}, \; x_t] + b_h)$$
  4. **Hidden State Interpolation ($h_t$):** Executes a convex linear interpolation between past memory and candidate updates:
     $$h_t = (1 - z_t) \odot h_{t-1} + z_t \odot \tilde{h}_t$$

```mermaid
flowchart TD
    subgraph GRU["GRU Internal Cell Dataflow"]
        H_prev["h_{t-1}"] --> Concat["[h_{t-1}, x_t]"]
        X_curr["x_t"] --> Concat
        
        Concat --> Gate_R["Reset Gate: r_t = σ(...)"]
        Concat --> Gate_Z["Update Gate: z_t = σ(...)"]
        
        H_prev --> Mul_R(("r_t ⊙ h_{t-1}"))
        Gate_R --> Mul_R
        
        Mul_R --> Cand_Concat["[r_t ⊙ h_{t-1}, x_t]"]
        X_curr --> Cand_Concat
        Cand_Concat --> Cand_H["Candidate: h~_t = tanh(...)"]
        
        H_prev --> Interp_Old(("(1 - z_t) ⊙ h_{t-1}"))
        Gate_Z --> Invert["(1 - z_t)"]
        Invert --> Interp_Old
        
        Cand_H --> Interp_New(("z_t ⊙ h~_t"))
        Gate_Z --> Interp_New
        
        Interp_Old --> Add(("Additive Sum"))
        Interp_New --> Add
        Add --> H_curr["h_t"]
    end
```

### Convex Interpolation and Memory Management

- The update gate $z_t$ acts as an automated balance control:
  - If $z_t \approx 0$, the cell ignores candidate $\tilde{h}_t$ and copies the historical state forward unchanged: $h_t \approx h_{t-1}$.
  - If $z_t \approx 1$, the cell overwrites past memory completely with the candidate update: $h_t \approx \tilde{h}_t$.
- When the reset gate approaches zero ($r_t \approx 0$), the cell discards historical context entirely, allowing the model to reset its working state when encountering phrase boundaries or topic transitions.

> [!Tip]
> **GRUs manage memory via convex interpolation**: the update gate $z_t$ balances old memory retention against new candidate integration: $h_t = (1 - z_t) \odot h_{t-1} + z_t \odot \tilde{h}_t$, eliminating the need for a separate cell state.

## Structural and Empirical Trade-Offs: LSTM Versus GRU

### Parameter Accounting and Computational Footprint

- Let $D$ denote input feature dimension, and $H$ denote hidden state dimension:
  - **LSTM Parameters:** Incorporates four independent affine projections ($W_f, W_i, W_c, W_o$):
    $$P_{\text{LSTM}} = 4 \times \left( H \cdot (D + H) + H \right) = 4 H (D + H + 1)$$
  - **GRU Parameters:** Incorporates three independent affine projections ($W_r, W_z, W_h$):
    $$P_{\text{GRU}} = 3 \times \left( H \cdot (D + H) + H \right) = 3 H (D + H + 1)$$
- The GRU achieves an exact **25% reduction in parameter count** relative to an LSTM with identical hidden state capacity.
- In hardware execution, fewer gate projections translate to lower memory bandwidth consumption and reduced GPU kernel launch overhead.

### Training Speed, Memory Bandwidth, and Convergence Rates

- **Activation Memory Footprint:** During training, forward activations must be cached for backpropagation. The LSTM must cache $c_t$, $h_t$, $f_t$, $i_t$, $\tilde{c}_t$, and $o_t$ across every unrolled time step. The GRU caches fewer intermediate tensors ($h_t, r_t, z_t, \tilde{h}_t$), reducing memory consumption.
- **Convergence Speed:** On smaller datasets or resource-constrained settings, the GRU frequently converges faster and displays lower risk of overfitting due to its smaller parameter capacity.

### Expressive Capacity on Long-Range Sequence Tasks

- While GRUs match LSTMs across many natural language translation and speech benchmarks, LSTMs retain advantages in specific problem classes:
  - Tasks requiring counting mechanisms, precise temporal tracking, or unbounded long-range dependencies benefit from the dedicated cell state ($c_t$).
  - Separating the internal memory ($c_t$) from external output representations ($h_t$) allows LSTMs to retain internal variables without exposing them directly to intermediate downstream projections.

> [!Important]
> **Select between LSTM and GRU based on data scale**: deploy GRUs for faster training and parameter efficiency on small to medium datasets; choose LSTMs for complex long-range dependencies requiring isolated internal memory.

## Comparative Matrix of Recurrent Cell Architectures

| Feature Dimension | Vanilla RNN | Long Short-Term Memory (LSTM) | LSTM with Peepholes | Gated Recurrent Unit (GRU) |
|---|---|---|---|---|
| **State Vectors Maintained** | Single: Hidden $h_t$ | Dual: Hidden $h_t$ and Cell $c_t$ | Dual: Hidden $h_t$ and Cell $c_t$ | Single: Hidden $h_t$ |
| **Gating Primitives** | None ($0$ gates) | Three: Forget ($f$), Input ($i$), Output ($o$) | Three gates + cell state inspection | Two: Reset ($r$), Update ($z$) |
| **Affine Parameter Matrices** | $1 \times (H \times (D + H))$ | $4 \times (H \times (D + H))$ | $4 \times (H \times (D + H)) + 3H$ | $3 \times (H \times (D + H))$ |
| **Total Parameter Count** | $H(D + H + 1)$ | $4H(D + H + 1)$ | $4H(D + H + 1) + 3H$ | $3H(D + H + 1)$ |
| **Gradient Preservation Path** | Multiplicative $W_{hh}^T$ product | Additive linear cell state ($+I$) | Additive linear cell state ($+I$) | Convex linear interpolation ($+I$) |
| **Long-Range Reach** | $\approx 10$ to $15$ time steps | $100+$ time steps | $100+$ time steps | $100+$ time steps |
| **Relative Training Speed** | Fastest | Baseline ($1.0\times$) | Slightly slower ($\approx 0.9\times$) | Faster ($\approx 1.25\times$ to $1.3\times$) |

> [!Tip]
> **Gating adds parameters to save gradients**: while gated cells require three to four times more parameters than a vanilla RNN, their additive gradient pathways make training on long sequences computationally feasible.

## Key Takeaways

- **Vanilla RNNs fail on extended sequences** because multiplicative transitions cause temporal gradients to decay exponentially.
- **Continuous soft gates act as differentiable switches**, utilizing Sigmoid activations in $(0, 1)$ to regulate information flow while supporting backpropagation.
- **LSTMs separate memory from representation**, maintaining an additive **cell state** ($c_t$) alongside an exposed **hidden state** ($h_t$).
- **The Constant Error Carousel (CEC)** allows error signals to flow backward along the cell state conveyor belt without exponential decay when forget gates are open ($f_t \approx 1.0$).
- **The three LSTM gates serve specialized functions**: the forget gate erases stale memory, the input gate writes candidate updates, and the output gate scales external projections.
- **GRUs streamline recurrent processing by 25%**, merging cell and hidden states into a single vector governed by coupled reset and update gates.
- **The GRU update gate executes convex interpolation** ($h_t = (1 - z_t) \odot h_{t-1} + z_t \odot \tilde{h}_t$), balancing historical persistence against candidate integration.
- **LSTMs provide higher representational capacity** for complex, long-range dependencies, while **GRUs train faster** and use less memory on resource-constrained workflows.

> [!Tip]
> The foundational principle of gated sequence modeling: **additive memory channels prevent gradient decay**; whether implemented through dual-state LSTM conveyor belts or unified GRU convex interpolations, additive state updates allow recurrent networks to learn temporal dependencies across extended horizons.
