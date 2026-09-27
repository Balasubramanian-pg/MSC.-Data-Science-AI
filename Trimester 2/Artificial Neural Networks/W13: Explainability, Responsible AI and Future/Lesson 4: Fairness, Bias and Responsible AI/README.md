# Migration in progress
# Lesson 4: Fairness, Bias and Responsible AI

Fairness, bias mitigation, and responsible AI frameworks establish mathematical principles and engineering protocols for preventing algorithmic discrimination across deep learning systems. Because neural networks optimize empirical loss over uncurated real-world datasets, they systematically extract, amplify, and encode societal inequities into latent representations. Quantifying demographic disparities through rigorous statistical fairness criteria and implementing targeted interventions across data, optimization, and inference pipelines ensures models satisfy both ethical principles and legal compliance mandates.

## The Taxonomy and Origins of Algorithmic Bias

### Data Ingestion and Representation Pathologies

- Neural networks inherit and compound biases originating across five distinct stages of the machine learning lifecycle:
  - **Historical Bias:** Occurs when training data accurately reflects existing societal disparities, prejudice, or socio-economic discrimination (such as historical arrest data reflecting disproportionate police deployment rather than underlying crime rates).
  - **Representation (Sampling) Bias:** Occurs when training datasets underrepresent specific demographic subgroups, causing models to perform with higher error rates on minority populations.
  - **Measurement (Proxy) Bias:** Arises when selected input features or ground-truth labels act as noisy, biased proxies for true abstract targets (such as utilizing annual healthcare expenditures as a proxy for medical need, which undervalues lower-income populations with restricted healthcare access).
  - **Aggregation Bias:** Arises when a single unified model is trained across heterogeneous subpopulations where distinct functional mappings operate, producing decisions that fail to serve minority demographic clusters.
  - **Evaluation Bias:** Occurs when benchmark test suites fail to mirror the demographic diversity of the real-world deployment domain.

### Algorithmic Amplification

- Deep architectures do not merely reproduce dataset imbalances; they exhibit *bias amplification*.
- During training, gradient descent minimizes global empirical risk by prioritizing high-frequency correlations, driving minority feature patterns toward zero to minimize loss across majority samples.
- If a training corpus associates a profession with a specific gender at a $70:30$ ratio, an unconstrained neural network frequently amplifies that prediction ratio to $90:10$ or higher at test time.

> [!Important]
> **Bias amplification mechanics**: minimizing global loss forces deep models to prioritize dominant majority correlations, causing networks to predict stereotypical demographic associations at rates higher than their baseline training distributions.

## Mathematical Formulations of Algorithmic Fairness

### Notational Framework

- Let $X \in \mathbb{R}^d$ represent the non-sensitive input feature vector.
- Let $A \in \{0, 1\}$ represent a protected or sensitive attribute (such as gender, race, or age).
- Let $Y \in \{0, 1\}$ represent the true binary target label ($1$ denoting a favorable outcome, such as loan approval).
- Let $\hat{Y} \in \{0, 1\}$ represent the discrete model prediction derived by applying a decision threshold $\tau$ to continuous probability score $R = P(\hat{Y}=1 \mid X, A)$.

### The Independence Paradigm (Demographic Parity)

- **Demographic Parity (Statistical Parity)** requires the probability of receiving a positive classification to be statistically independent of the protected attribute:
  $$P(\hat{Y} = 1 \mid A = 0) = P(\hat{Y} = 1 \mid A = 1)$$
- Under demographic parity, the selection rate must be equal across all demographic groups, regardless of underlying ground-truth base rate differences.
- Regulatory enforcement (such as the United States Equal Employment Opportunity Commission) operationalizes this through the **Four-Fifths (80%) Rule**, requiring the **Disparate Impact (DI)** ratio to satisfy:
  $$\text{DI} = \frac{P(\hat{Y} = 1 \mid A = 0)}{P(\hat{Y} = 1 \mid A = 1)} \ge 0.80$$
- A major limitation of demographic parity is that it can disincentivize selecting qualified candidates if ground-truth distributions exhibit historical imbalances.

### The Separation Paradigm (Equalized Odds and Equal Opportunity)

- **Equalized Odds** conditions fairness on the actual target outcome $Y$, requiring predictions to be conditionally independent of protected attribute $A$ given ground truth $Y$:
  $$P(\hat{Y} = 1 \mid A = 0, Y = y) = P(\hat{Y} = 1 \mid A = 1, Y = y) \quad \forall y \in \{0, 1\}$$
- Equalized odds requires that both the **True Positive Rate (TPR)** and the **False Positive Rate (FPR)** remain equal across groups:
  $$\text{TPR}_{A=0} = \text{TPR}_{A=1} \quad \text{and} \quad \text{FPR}_{A=0} = \text{FPR}_{A=1}$$
- **Equal Opportunity** relaxes equalized odds by constraining only the positive outcome ($Y=1$), ensuring that qualified individuals from all demographic groups have an equal probability of being identified:
  $$\text{TPR}_{A=0} = \text{TPR}_{A=1} \implies P(\hat{Y} = 1 \mid A = 0, Y = 1) = P(\hat{Y} = 1 \mid A = 1, Y = 1)$$
  This formulation permits unequal false positive rates across groups.

### The Sufficiency Paradigm (Predictive Parity and Calibration)

- **Predictive Parity** requires that a positive prediction confers identical true positive probability regardless of group membership:
  $$P(Y = 1 \mid \hat{Y} = 1, A = 0) = P(Y = 1 \mid \hat{Y} = 1, A = 1)$$
  which equates the *Positive Predictive Value (PPV)* across protected groups.
- **Calibration within Groups** extends this to continuous risk scores $R \in [0, 1]$:
  $$P(Y = 1 \mid R = r, A = 0) = P(Y = 1 \mid R = r, A = 1) \quad \forall r \in [0, 1]$$
- If a risk assessment tool assigns a credit default risk score of $r = 0.70$, exactly $70\%$ of individuals across both $A=0$ and $A=1$ cohorts must default.

> [!Tip]
> **Fairness metric selection**: adopt Equal Opportunity when the primary harm is denying a favorable outcome to qualified candidates, and enforce Group Calibration when continuous risk scores guide downstream human interventions.

## Theoretical Limits: The Impossibility Theorem of Fairness

### The Mutual Exclusivity of Fairness Criteria

- Mathematical proofs formulated by Kleinberg, Mullainathan, and Raghavan (2016) and Chouldechova (2017) establish the **Impossibility Theorem of Fairness**.
- If base acceptance rates differ across protected demographic groups ($P(Y=1 \mid A=0) \neq P(Y=1 \mid A=1)$) and the classification model is imperfect ($TPR < 1$ or $FPR > 0$), then:
  - **Independence** (Demographic Parity),
  - **Separation** (Equalized Odds), and
  - **Sufficiency** (Predictive Parity / Calibration)
  are mathematically mutually exclusive.
- A classifier cannot satisfy all three core fairness families simultaneously under unequal base rates.