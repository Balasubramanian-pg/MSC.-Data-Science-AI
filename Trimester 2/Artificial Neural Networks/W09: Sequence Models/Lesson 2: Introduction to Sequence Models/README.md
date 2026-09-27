# Lesson 2: Introduction to Sequence Models

## Mathematical Formulations of Sequence Models and Token Representations

Sequence modeling addresses the problem of estimating probability distributions over ordered collections of discrete tokens or continuous vectors. Before a neural network can process temporal dynamics, raw symbolic data must be mapped into continuous vector spaces that preserve semantic geometry. Analyzing the mathematical mechanics of token encodings, probabilistic chain rule factorizations, classical Markovian approximations, and autoregressive decoding strategies establishes the analytical foundation for all sequence modeling architectures.

## Token Encoding and Vector Representations

### Discrete Vocabulary Indexing and One-Hot Vectors

- A sequential dataset begins as an ordered sequence of discrete symbolic tokens drawn from a finite vocabulary $\mathcal{V}$:
  $$X = (w_1, w_2, \dots, w_T), \quad w_t \in \mathcal{V}$$
  where $|\mathcal{V}|$ represents the total vocabulary size.
- The classical numerical baseline encodes each token as a **one-hot vector** $x_t \in \{0, 1\}^{|\mathcal{V}|}$:
  $$x_t = [0, \; \dots, \; 0, \; 1, \; 0, \; \dots, \; 0]^T$$
  where a single index corresponding to the token's dictionary rank contains a one, and all other entries are zero.
- In real-world natural language processing, vocabulary sizes range from $|\mathcal{V}| \approx 30,000$ to $250,000$, making one-hot vectors high-dimensional and computationally sparse.

### The Orthogonality Bottleneck of One-Hot Encodings

- One-hot vectors are mutually **orthogonal** in Euclidean vector space:
  $$x_i^T x_j = \begin{cases} 1 & \text{if } i = j \\ 0 & \text{if } i \neq j \end{cases}$$
- The Euclidean distance between any two distinct tokens is identical and invariant:
  $$\|x_i - x_j\|_2 = \sqrt{(1)^2 + (-1)^2} = \sqrt{2} \quad \forall i \neq j$$
- Orthogonal encodings contain zero semantic distance metrics: the mathematical representation of the word *king* shares the exact same geometric distance with *queen* as it does with an unrelated word like *refrigerator*.
- A model trained on one-hot encodings cannot generalize across synonymous words without independently learning identical parameter sets for each dictionary index.

### Continuous Dense Embeddings

- Neural sequence models project high-dimensional sparse one-hot vectors into a low-dimensional, continuous vector space using an **embedding matrix** $E \in \mathbb{R}^{D \times |\mathcal{V}|}$:
  $$e_t = E x_t \in \mathbb{R}^D$$
  where $D \ll |\mathcal{V}|$ denotes the embedding dimension (typically $D \in [256, 1024]$).
- Multiplying the embedding matrix by a one-hot vector acts as a lookup operation that extracts the $k$-th column of matrix $E$.
- The embedding matrix parameters are optimized end-to-end via backpropagation.
- During training, tokens appearing in similar contextual distributions are pulled together in embedding space, allowing the inner product $e_i^T e_j$ to encode continuous **cosine similarity** and semantic relationships.

```mermaid
flowchart LR
    Token["Token: 'king'"] --> OneHot["One-Hot Vector: x_t (Sparse: |V| x 1)"]
    OneHot --> Matrix["Embedding Matrix: E (D x |V|)"]
    Matrix --> Dense["Dense Embedding: e_t (Continuous: D x 1)"]
    Dense --> Similarity["Semantic Inner Product: e_king^T e_queen > 0"]
```

> [!Tip]
> **Dense embeddings introduce semantic geometry**: projecting sparse one-hot vectors through an embedding matrix compresses dimensionality from $|\mathcal{V}|$ to $D$, allowing vector inner products to reflect semantic similarity.

## Statistical Language Modeling and the Chain Rule

### Joint Sequence Probability Formulation

- A **statistical language model** quantifies the likelihood of an entire ordered sequence of tokens occurring within a domain:
  $$P(X) = P(w_1, w_2, \dots, w_T)$$
- Computing this joint distribution allows models to evaluate whether a generated sentence is syntactically coherent and semantically plausible.
- Because language exhibits combinatorial diversity, estimating the joint probability of an entire multi-token sequence directly from empirical frequency tables is impossible.

### Autoregressive Factorization via the Chain Rule of Probability

- Applying the **chain rule of probability** decomposes the joint probability of any sequence into an exact product of conditional next-token probabilities:
  $$P(w_1, w_2, \dots, w_T) = P(w_1) P(w_2 \mid w_1) P(w_3 \mid w_1, w_2) \cdots P(w_T \mid w_1, \dots, w_{T-1})$$
- Compactly, the joint probability expresses as an **autoregressive product**:
  $$P(X) = \prod_{t=1}^T P(w_t \mid w_{<t})$$
  where $w_{<t} = (w_1, \dots, w_{t-1})$ represents the historical context prefix preceding time step $t$.
- This factorization transforms the global sequence estimation problem into a sequence of local **next-token prediction** subproblems.

### Conditional Next-Token Prediction

- An **autoregressive model** estimates the conditional probability distribution over the entire vocabulary at each time step:
  $$P(w_t = v \mid w_{<t}) \quad \forall v \in \mathcal{V}$$
- The model processes the historical prefix $w_{<t}$, outputs a raw real-valued logit vector $z_t \in \mathbb{R}^{|\mathcal{V}|}$, and normalizes values using the Softmax function:
  $$P(w_t = v \mid w_{<t}) = \frac{\exp(z_t[v])}{\sum_{j=1}^{|\mathcal{V}|} \exp(z_t[j])}$$
- Training minimizes the **cross-entropy loss** between the predicted categorical distribution and the true target token $w_t$:
  $$\mathcal{L}_t = -\ln P(w_t \mid w_{<t})$$

> [!Important]
> **The chain rule enables autoregressive modeling**: factorizing joint sequence distributions into conditional next-token probabilities transforms sequence learning into a step-by-step classification task across the vocabulary.

## Classical N-Gram Models Versus Neural Sequences

### The Markov Property in Sequence Modeling

- Evaluating the full conditional probability $P(w_t \mid w_1, \dots, w_{t-1})$ requires conditioning on an expanding historical prefix that grows with sequence length $t$.
- Classical statistical modeling simplifies this dependency using a stationary **Markov assumption** of order $k$:
  $$P(w_t \mid w_1, \dots, w_{t-1}) \approx P(w_t \mid w_{t-k}, \dots, w_{t-1})$$
- Under a $k$-th order Markov assumption, token $w_t$ depends exclusively on the immediately preceding $k$ tokens, treating all earlier historical context as conditionally independent.

### N-Gram Frequency Estimation and Combinatorial Explosion

- An **N-gram model** sets the Markov order to $k = N - 1$, estimating conditional probabilities using maximum likelihood frequency counts from a text corpus:
  $$P_{\text{N-gram}}(w_t \mid w_{t-N+1}, \dots, w_{t-1}) = \frac{\text{Count}(w_{t-N+1}, \dots, w_{t-1}, w_t)}{\text{Count}(w_{t-N+1}, \dots, w_{t-1})}$$
- **Combinatorial Parameter Explosion:** Storing frequency tables for an $N$-gram model requires parameter space that scales exponentially with sequence context length:
  $$\text{Storage Complexity} \in O(|\mathcal{V}|^N)$$
- For a vocabulary of $|\mathcal{V}| = 100,000$, a 4-gram model theoretically requires storing up to $100,000^4 = 10^{20}$ possible frequency entries, making scaling beyond $N=5$ computationally impossible.

### The Zero-Probability Sparsity Trap

- Because the vast majority of valid $N$-token phrases never appear within a finite training corpus, empirical counts evaluate to zero:
  $$\text{Count}(w_{t-N+1}, \dots, w_t) = 0 \implies P(w_t \mid w_{<t}) = 0$$
- A single zero-probability token causes the entire multiplicative joint sequence probability $P(X) = \prod P(w_t \mid w_{<t})$ to collapse to zero.
- Mitigating this failure requires heuristic statistical smoothing algorithms (e.g., Kneser-Ney smoothing), which reallocate probability mass to unseen phrases but fail to capture underlying semantics.

### Continuous Hidden States as Universal Context Compactors

- Neural sequence models eliminate the Markov limitation by replacing discrete frequency tables with an evolving continuous **hidden state vector** $h_t \in \mathbb{R}^H$:
  $$h_t = f(h_{t-1}, e_t; \theta)$$
  $$P(w_t \mid w_{<t}) = \text{Softmax}(W_{\text{vocab}} h_t + b)$$
- The continuous hidden state acts as an internal context compactor, carrying information across arbitrary temporal distances without restricting dependencies to a rigid $N$-token window.

```mermaid
flowchart TD
    subgraph NGram["Classical N-Gram (Markov Order k)"]
        Context["History: w_1, ..., w_{t-2}"] -. "Discarded (Amnesia)" .-> X["Drop"]
        NContext["Local Window: w_{t-1}"] --> Est["Frequency Table Lookup"]
        Est --> Pred1["P(w_t | w_{t-1})"]
    end

    subgraph Neural["Neural Sequence Model"]
        H_prev["Hidden State: h_{t-1} (Encodes w_1...w_{t-1})"] --> Transition["Recurrent Update f(h_{t-1}, e_t)"]
        Token_t["Input Token: e_t"] --> Transition
        Transition --> H_curr["Updated State: h_t"]
        H_curr --> Pred2["P(w_t | Context) via Softmax"]
    end
```

> [!Tip]
> **Neural states replace combinatorial tables**: while classical N-grams suffer from combinatorial explosion ($O(|\mathcal{V}|^N)$) and context amnesia, neural models compress arbitrary histories into continuous hidden vectors $h_t$.

## Autoregressive Inference and Training Dynamics

### Teacher Forcing During Training

- During training, neural sequence models utilize **Teacher Forcing** to parallelize gradient updates and stabilize optimization.
- At time step $t$, the model receives the **ground-truth target token** $w_{t-1}^*$ from the dataset as its input, rather than the token predicted by the model at step $t-1$:
  $$h_t = f(h_{t-1}, E w_{t-1}^*; \theta)$$
- Teacher forcing prevents errors made early in a sequence from compounding downstream during training, allowing every time step to calculate exact cross-entropy loss against true historical prefixes.

### Exposure Bias and Autoregressive Divergence

- A discrepancy emerges during evaluation and deployment: ground-truth tokens are unavailable, forcing the model to generate text **autoregressively** by feeding its own generated output back as the next input:
  $$\hat{w}_t \sim P(w \mid \hat{w}_{<t}), \quad x_{t+1} = E \hat{w}_t$$
- **Exposure Bias** describes this training-inference mismatch: because the model was trained exclusively on perfect ground-truth inputs, an error made at step $t$ introduces an out-of-distribution prefix.
- Compounding errors cause autoregressive rollouts to drift rapidly into ungrammatical, repetitive, or nonsensical states over extended generation horizons.

### Decoding Strategies: Greedy Search Versus Stochastic Sampling

- Generating sequences from conditional Softmax distributions requires a decoding strategy:
  - **Greedy Search:** Selects the token with the highest predicted probability at each step:
    $$\hat{w}_t = \arg\max_{v \in \mathcal{V}} P(w_t = v \mid w_{<t})$$
    Greedy search is computationally fast ($O(1)$ per step), but prone to sub-optimal, repetitive text loops.
  - **Temperature-Scaled Sampling:** Controls the entropy of the categorical distribution by scaling logits by temperature $\tau > 0$ before Softmax:
    $$P(w_t = v) = \frac{\exp(z_v / \tau)}{\sum_j \exp(z_j / \tau)}$$
    High temperatures ($\tau > 1.0$) flatten the distribution, increasing diversity; low temperatures ($\tau < 1.0$) sharpen peaks, producing conservative outputs.
  - **Top-$k$ Sampling:** Restricts the candidate selection pool to the $k$ highest-probability tokens, zeroing out the remaining vocabulary tail to prevent nonsensical token selections.
  - **Top-$p$ (Nucleus) Sampling:** Dynamically truncates the candidate pool to the smallest set of tokens whose cumulative probability exceeds a threshold $p \in (0, 1]$, adapting the candidate set size based on model confidence.

```mermaid
flowchart TD
    H_t["Hidden State: h_t"] --> Logits["Vocabulary Logits: z_t (|V|)"]
    Logits --> Temp["Scale by Temperature: z_t / τ"]
    Temp --> Softmax["Softmax Normalization"]
    Softmax --> Nucleus["Top-p / Top-k Truncation"]
    Nucleus --> Sample["Categorical Sampling"]
    Sample --> Token_Out["Generated Token: w^_t"]
    Token_Out -- "Feedback to Input" --> NextStep["Time Step t+1 Input"]
```

> [!Important]
> **Exposure bias creates generation drift**: models trained via teacher forcing rely on clean historical prefixes; during deployment, their own generation mistakes compound, requiring sampling controls like top-$p$ and temperature to maintain coherence.

## Comparative Matrix: Classical N-Grams Versus Neural Sequence Models

| Architectural Dimension | Classical N-Gram Models | Neural Sequence Models |
|---|---|---|
| **Context Representation** | Discrete string prefixes ($w_{t-N+1}, \dots, w_{t-1}$) | Continuous hidden state vector ($h_t \in \mathbb{R}^H$) |
| **Historical Reach** | Rigid window: strictly bounded by $N-1$ tokens | Flexible: unbounded theoretical historical context |
| **Parameter Scaling** | Combinatorial explosion: $O(|\mathcal{V}|^N)$ | Compact scaling: $O(H^2 + H \cdot |\mathcal{V}|)$ |
| **Token Representation** | Discrete, orthogonal surface symbols | Continuous semantic embeddings ($E \in \mathbb{R}^{D \times |\mathcal{V}|}$) |
| **Unseen Context Handling** | Assigns zero probability; requires smoothing tables | Interpolates smoothly via vector space proximity |
| **Generalization Mechanism** | Direct corpus frequency matching | Statistical feature abstraction and shared weights |
| **Inference Latency** | Instantaneous hash table lookup ($O(1)$) | Matrix multiplications per token ($O(H^2)$) |

> [!Tip]
> **Neural models overcome discrete data sparsity**: continuous vector embeddings and recurrent states interpolate between unseen word sequences, eliminating the zero-probability failure mode of classical frequency tables.

## Key Takeaways

- **One-hot encodings create orthogonal representations** that fail to capture semantic relationships due to equidistant geometric spacing.
- **Dense word embeddings compress dimensionality** ($|\mathcal{V}| \to D$), mapping tokens into continuous geometric spaces where inner products reflect semantic similarity.
- **The chain rule of probability factorizes joint distributions** into autoregressive conditional next-token probabilities: $P(X) = \prod P(w_t \mid w_{<t})$.
- **Classical N-gram models rely on the Markov assumption**, causing combinatorial parameter explosion ($O(|\mathcal{V}|^N)$) and context amnesia beyond $N-1$ words.
- **The zero-frequency problem** causes classical N-grams to fail on novel phrases, requiring complex statistical smoothing algorithms.
- **Neural sequence models use continuous hidden states** as dynamic memory buffers that compress arbitrary historical prefixes into vector representations.
- **Teacher forcing accelerates training** by feeding ground-truth tokens as inputs, but creates **exposure bias** when the model must generate text autoregressively at inference time.
- **Decoding strategies balance coherence and diversity**: greedy search picks the mode, while temperature scaling, top-$k$, and top-$p$ (nucleus) sampling introduce controlled stochasticity.

> [!Tip]
> The defining principle of sequence representation: **continuous vectors replace combinatorial tables**; mapping discrete symbols to dense embeddings and compressing historical context into continuous hidden states allows neural models to evaluate variable-length dependencies without encountering the combinatorial explosion of discrete models.
