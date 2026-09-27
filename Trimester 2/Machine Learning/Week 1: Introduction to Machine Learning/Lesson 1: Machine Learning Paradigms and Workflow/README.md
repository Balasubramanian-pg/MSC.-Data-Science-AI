# Migration in progress
# Lesson 1: Machine Learning Paradigms and Workflow

## Machine Learning Paradigms and Engineering Workflow

Machine learning formalizes the automated extraction of predictive models and latent representations directly from empirical data. Selecting an appropriate learning paradigm establishes the supervisory signal, mathematical objective, and evaluation criteria required to address a specific problem. Structuring projects within a disciplined engineering workflow ensures that feature preprocessing, model selection, hyperparameter tuning, and validation isolation occur without data contamination.

## Formalization of Core Learning Paradigms

### Supervised Learning: Mapping Inputs to Labels

- **Supervised Learning** operates on datasets containing input features paired with verified target outputs:
  $$\mathcal{D}_{\text{train}} = \{(x^{(1)}, y^{(1)}), (x^{(2)}, y^{(2)}), \dots, (x^{(N)}, y^{(N)})\}, \quad x^{(i)} \in \mathcal{X}, \; y^{(i)} \in \mathcal{Y}$$
- The objective is discovering a parameterized function $f: \mathcal{X} \to \mathcal{Y}$ that minimizes the expected empirical risk:
  $$\min_\theta \frac{1}{N} \sum_{i=1}^N \mathcal{L}(f(x^{(i)}; \theta), y^{(i)})$$
- **Regression:** Targets belong to a continuous real-valued space ($\mathcal{Y} \subseteq \mathbb{R}^K$). The model predicts quantities such as temperature, financial asset values, or physical velocities using objective losses like Mean Squared Error (MSE).
- **Classification:** Targets belong to a discrete categorical set ($\mathcal{Y} = \{1, 2, \dots, C\}$). The model predicts discrete class memberships or posterior probabilities using loss functions like Cross-Entropy.

### Unsupervised Learning: Uncovering Latent Structure

- **Unsupervised Learning** operates on unlabeled observations containing only input feature vectors:
  $$\mathcal{D} = \{x^{(1)}, x^{(2)}, \dots, x^{(N)}\}, \quad x^{(i)} \in \mathcal{X}$$
- The objective is estimating the underlying data-generating distribution $P(x)$, identifying dense geometric clusters, or projecting data onto compressed latent manifolds.
- Core tasks include partitional clustering (K-Means), density-based clustering (DBSCAN), hierarchical clustering, dimensionality reduction (PCA, t-SNE), and association rule discovery (Apriori).

### Semi-Supervised and Self-Supervised Formulations

- **Semi-Supervised Learning:** Combines a small set of labeled instances $\mathcal{D}_L = \{(x_l, y_l)\}_{l=1}^{N_L}$ with a large pool of unlabeled instances $\mathcal{D}_U = \{x_u\}_{u=1}^{N_U}$ where $N_U \gg N_L$.
- The unlabeled observations provide structural regularization, guiding decision boundaries through low-density regions in the input space to improve generalization when ground-truth annotation is expensive.
- **Self-Supervised Learning:** Generates supervisory training targets autonomously from the structure of unlabeled data by defining a surrogate **pretext task**.
- The model withholds a portion of the input signal (e.g., masking tokens in a text sequence or occluding patches in an image) and trains to reconstruct the missing component conditioned on the unmasked context.

### Reinforcement Learning and Markov Decision Processes

- **Reinforcement Learning (RL)** frames learning as an active trial-and-error process where an **agent** interacts with an external, uncertain **environment** modeled as a **Markov Decision Process (MDP)**:
  $$\mathcal{M} = (\mathcal{S}, \mathcal{A}, \mathcal{P}, \mathcal{R}, \gamma)$$
- At discrete time step $t$, the agent observes environment state $s_t \in \mathcal{S}$ and selects action $a_t \in \mathcal{A}$ according to its internal **policy** $\pi(a_t \mid s_t)$.
- The environment transitions to a new state $s_{t+1} \sim \mathcal{P}(s_{t+1} \mid s_t, a_t)$ and emits a scalar **reward** $r_{t+1} \in \mathbb{R}$.
- The objective is discovering the optimal policy $\pi^*$ that maximizes the expected cumulative discounted return:
  $$J(\pi) = \mathbb{E}_\pi \left[ \sum_{t=0}^\infty \gamma^t r_{t+1} \right], \quad \gamma \in [0, 1)$$

> [!Important]
> **Supervision format dictates the learning objective**: supervised models minimize empirical label errors, unsupervised models uncover intrinsic geometric structures, self-supervised models solve pretext reconstruction tasks, and reinforcement learning agents optimize cumulative scalar rewards.

## The End-to-End Machine Learning Workflow

```mermaid
flowchart TD
    Frame["1. Problem Formulation & Metric Selection"] --> Ingest["2. Data Ingestion & Exploratory Analysis (EDA)"]
    Ingest --> Split["3. Strict Dataset Splitting (Train / Val / Test)"]
    
    subgraph DataEngineering["Feature Engineering (Fit on Train ONLY)"]
        Split --> Clean["Clean Missing Values & Encode Categoricals"]
        Clean --> Scale["Feature Scaling (Standardize / Normalize)"]
    end
    
    Scale --> Train["4. Model Training & Optimization"]
    Train --> Evaluate["5. Validation Diagnostic & Error Analysis"]
    
    Evaluate -- "High Bias / Underfitting" --> Arch["Increase Capacity / Engineer Features"]
    Arch --> Train
    
    Evaluate -- "High Variance / Overfitting" --> Reg["Add Regularization / Tune Hyperparameters"]
    Reg --> Train
    
    Evaluate -- "Validation Target Met" --> Audit["6. Single Generalization Audit on Test Set"]
    Audit --> Deploy["7. Production Deployment & Continuous Drift Monitoring"]
```

### Problem Framing and Objective Alignment

- Project execution begins by translating an abstract business or domain objective into a formal machine learning task ($T$), identifying quantifiable performance metrics ($P$), and auditing data sources ($E$).
- Defining the evaluation metric in advance prevents metric gaming and ensures alignment with business costs (e.g., choosing Area Under the Precision-Recall Curve over Accuracy for imbalanced fraud detection).

### Data Ingestion and Exploratory Data Analysis

- **Exploratory Data Analysis (EDA):** Assesses data distributions, missingness patterns, class balance, outliers, and feature correlations before selecting architectures.
- Visualizing feature distributions reveals skewness that requires logarithmic transformations and identifies high-cardinality categorical features that demand specialized encodings.

### Model Selection, Training, and Iterative Diagnostics

- Establishing a simple, deterministic **baseline model** (such as Logistic Regression or a shallow Decision Tree) provides a lower performance benchmark before deploying complex deep architectures.
- Parameter optimization minimizes empirical training loss while validation tracking diagnoses whether the model occupies an underfitting regime (high bias) or an overfitting regime (high variance).

### Production Deployment and Drift Monitoring

- Deploying a model into production initiates the operational monitoring phase:
  - **Data Drift:** The input distribution changes over time ($P_{\text{train}}(x) \neq P_{\text{production}}(x)$) due to seasonal shifts, sensor degradation, or changing consumer habits.
  - **Concept Drift:** The mathematical mapping connecting inputs to outputs shifts ($P(y \mid x)$ changes), rendering historic parameter weights obsolete.
- Production pipelines require automated alerting systems that monitor inference distributions and trigger scheduled model retraining when drift metrics exceed tolerance limits.

> [!Tip]
> **Establish simple baselines before training complex models**: deploying a linear or tree-based baseline provides an empirical performance floor, verifying that added architectural complexity delivers measurable accuracy gains.

## Dataset Partitioning and Cross-Validation Mechanics

### The Three-Way Partition: Train, Validation, and Test Sets

- Evaluating models on the data used to train parameters yields overfitted, uninformative metrics.
- Empirical datasets divide into three non-overlapping subsets:
  - **Training Set (60% to 80%):** Consumed by optimization algorithms to update model parameters (weights and biases).
  - **Validation Set (10% to 20%):** Evaluated repeatedly during development to compare architectures, guide hyperparameter tuning, and trigger early stopping.
  - **Test Set (10% to 20%):** Held strictly in an uninspected, locked state until model development concludes; it evaluates once to provide an unbiased estimate of generalization error.

### K-Fold and Stratified Cross-Validation

- When dataset size is limited ($N < 50,000$), standard three-way splits reduce training data volume too severely.
- **$K$-Fold Cross-Validation** partitions the non-test data into $K$ equal-sized subsets (folds):
  - The model trains $K$ times; each iteration trains on $K-1$ folds and evaluates on the remaining held-out fold.
  - The final validation score averages the performance across all $K$ validation runs:
    $$\text{Score}_{\text{CV}} = \frac{1}{K} \sum_{k=1}^K \text{Score}_k$$
- **Stratified $K$-Fold Cross-Validation:** Enforces that every individual fold preserves the exact class percentage distribution of the global dataset, preventing class imbalances from creating unrepresentative validation splits.

```mermaid
flowchart TD
    subgraph KFold["5-Fold Cross-Validation Protocol"]
        F1["Fold 1: [Val]   [Train] [Train] [Train] [Train] -> Score