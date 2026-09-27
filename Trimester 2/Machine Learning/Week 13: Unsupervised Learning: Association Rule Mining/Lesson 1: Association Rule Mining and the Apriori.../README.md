# Migration in progress
# Lesson 1: Association Rule Mining and the Apriori...

## Association Rule Mining and the Apriori Algorithm

Association Rule Mining discovers non-trivial co-occurrence patterns, correlations, and predictive relationships within large transaction databases without supervision. Originating in retail market basket analysis, the task models relationships of the form $X \implies Y$, identifying items that frequently appear together in customer transactions. Because evaluating all possible combinations across an item universe creates a combinatorial explosion, efficient mining relies on the anti-monotonicity of support. The Apriori algorithm exploits this property to prune search spaces systematically, generating frequent itemsets and reliable association rules through level-wise exploration.

## Problem Formulation and the Combinatorial Challenge

### Transactional Databases and Itemset Lattice Geometry

- Let $\mathcal{I} = \{i_1, i_2, \dots, i_M\}$ denote the **item universe**, representing the set of $M$ distinct discrete items available in a domain.
- A **transaction database** $\mathcal{T} = \{t_1, t_2, \dots, t_N\}$ consists of $N$ unique transaction records, where each transaction $t_n \subseteq \mathcal{I}$ represents an observed subset of items.
- An **itemset** $X \subseteq \mathcal{I}$ is any collection of items; an itemset containing exactly $k$ items is termed a **$k$-itemset**.
- An observation $t_n$ contains an itemset $X$ if and only if $X$ is a subset of the transaction: $X \subseteq t_n$.
- Itemsets organize into a partially ordered set known as an **itemset lattice**, structured hierarchically from the empty set $\emptyset$ at the base to the complete set $\mathcal{I}$ at the apex.

### The Power Set Explosion

- The total number of possible itemset combinations generated from an item universe of cardinality $M$ equals the size of the power set:
  $$|\mathcal{P}(\mathcal{I})| = 2^M$$
- A supermarket inventory containing a modest catalog of $M = 100$ items yields $2^{100} \approx 1.26 \times 10^{30}$ candidate itemsets, rendering brute-force frequency counting computationally impossible.
- An itemset containing $k$ items can generate $2^k - 2$ candidate association rules, creating a secondary combinatorial challenge during rule extraction.

### Rule Syntax and Asymmetric Mapping

- An **association rule** is an implication between two mutually disjoint itemsets:
  $$X \implies Y, \quad \text{where } X, Y \subset \mathcal{I} \text{ and } X \cap Y = \emptyset$$
- **Antecedent ($X$):** The condition or body of the rule, representing the observed prerequisite items.
- **Consequent ($Y$):** The conclusion or head of the rule, representing the predicted co-occurring items.
- Association rules represent empirical correlations rather than causal mechanisms; observing antecedent $X$ increases the conditional likelihood of observing consequent $Y$ within the same transaction.

> [!Important]
> **Association rules express co-occurrence, not causality**: the rule $X \implies Y$ proves that items $X$ and $Y$ appear together with statistically significant frequency, but does not indicate that selecting $X$ causes the selection of $Y$.

## Quantitative Evaluation Metrics

### Support: Evaluating Empirical Frequency

- The **support** of an itemset $X$ quantifies its empirical probability of occurrence across the entire transaction database $\mathcal{T}$:
  $$\text{Supp}(X) = \frac{|\{t \in \mathcal{T} \mid X \subseteq t\}|}{|\mathcal{T}|} = P(X)$$
- The support of an association rule $X \implies Y$ equals the joint probability of both itemsets appearing simultaneously within a single transaction:
  $$\text{Supp}(X \implies Y) = \text{Supp}(X \cup Y) = P(X \cap Y)$$
- Enforcing a **minimum support threshold ($\text{minsup}$)** eliminates rare, idiosyncratic noise patterns, restricting analysis to statistically significant itemsets.

### Confidence: Directional Predictive Reliability

- The **confidence** of a rule $X \implies Y$ measures the conditional probability that a transaction contains consequent $Y$ given that it contains antecedent $X$:
  $$\text{Conf}(X \implies Y) = \frac{\text{Supp}(X \cup Y)}{\text{Supp}(X)} = \frac{P(X \cap Y)}{P(X)} = P(Y \mid X)$$
- Confidence is **asymmetric**: $\text{Conf}(X \implies Y) \neq \text{Conf}(Y \implies X)$ unless both itemsets possess identical support counts ($\text{Supp}(X) = \text{Supp}(Y)$).
- Setting a **minimum confidence threshold ($\text{minconf}$)** ensures that generated rules possess high conditional certainty.

### The Confidence Fallacy and Global Popularity Distortions

- Evaluating rules using only support and confidence often yields misleading inferences when consequent items are globally popular.
- Consider an item $Y$ that appears in 90% of all customer transactions ($P(Y) = 0.90$). For any arbitrary antecedent $X$:
  $$\text{Conf}(X \implies Y) = P(Y \mid X) \approx 0.90$$
- If the baseline probability of purchasing $Y$ without $X$ is 95% ($P(Y \mid \neg X) = 0.95$), purchasing $X$ actually *decreases* the likelihood of purchasing $Y$.
- Confidence fails as a standalone quality metric because it measures only the conditional probability $P(Y \mid X)$ while ignoring the baseline margin $P(Y)$.

### Lift: Quantifying Statistical Dependence

- **Lift** evaluates the ratio of observed joint support to the expected support under statistical independence:
  $$\text{Lift}(X \implies Y) = \frac{P(X \cap Y)}{P(X) P(Y)} = \frac{\text{Conf}(X \implies Y)}{\text{Supp}(Y)} = \frac{\text{Supp}(X \cup Y)}{\text{Supp}(X) \cdot \text{Supp}(Y)}$$
- Lift is **symmetric**: $\text{Lift}(X \implies Y) = \text{Lift}(Y \implies X)$.
- **Interpreting Lift Thresholds:**
  - **$\text{Lift} = 1.0$:** Itemsets $X$ and $Y$ are statistically independent ($P(X \cap Y) = P(X)P(Y)$); the rule provides zero predictive value over chance.
  - **$\text{Lift} > 1.0$:** Itemsets $X$ and $Y$ are **positively correlated**; observing $X$ increases the likelihood of observing $Y$.
  - **$\text{Lift} < 1.0$:** Itemsets $X$ and $Y$ are **negatively correlated** (substitutes); observing $X$ decreases the likelihood of observing $Y$.

### Conviction and Leverage Formulations

- **Conviction:** Measures the ratio of expected frequency of $X$ occurring without $Y$ under statistical independence to the observed frequency of $X$ occurring without $Y$:
  $$\text{Conv}(X \implies Y) = \frac{1 - \text{Supp}(Y)}{1 - \text{Conf}(X \implies Y)} = \frac{P(X) P(\neg Y)}{P(X \cap \neg Y)}$$
  Conviction is directional (asymmetric) and evaluates to infinity when the rule is a deterministic logical implication ($\text{Conf} = 1.0$).
- **Leverage:** Measures the absolute difference between observed joint support and expected support under independence:
  $$\text{Lev}(X \implies Y) = \text{Supp}(X \cup Y) - \text{Supp}(X) \cdot \text{Supp}(Y)$$
  Leverage quantifies the proportion of additional transactions explained by the rule over chance.

> [!Tip]
> **Use Lift to identify true correlation**: high confidence alone can produce misleading rules if the consequent is globally popular; a Lift score exceeding 1.0 confirms that the antecedent genuinely increases the likelihood of the consequent.

## The Apriori Principle and Anti-Monotonicity

### Mathematical Formulation of Support Monotonicity

- Let $X$ and $Y$ represent two itemsets such that $X \subseteq Y$.
- Any transaction $t_n$ containing superset $Y$ must contain subset $X$:
  $$Y \subseteq t_n \implies X \subseteq t_n$$
- The set of transactions containing $Y$ is a subset of the transactions containing $X$:
  $$\{t \in \mathcal{T} \mid Y \subseteq t\} \subseteq \{t \in \mathcal{T} \mid X \subseteq t\}$$
- Dividing by total database cardinality $|\mathcal{T}|$ yields the **monotonicity property of support**:
  $$X \subseteq Y \implies \text{Supp}(X) \ge \text{Supp}(Y)$$
- Adding items to an itemset cannot increase its support; support either decreases or remains constant as itemsets expand.

### The Contrapositive Pruning Mechanism

- Rakesh Agrawal and Ramakrishnan Srikant (1994) formulated the **Apriori Principle** by taking the contrapositive of support monotonicity:
  $$\text{If an itemset } X \text{ is frequent, all of its subsets } s \subseteq X \text{ must also be frequent.}$$
  $$\text{If an itemset } s \text{ is infrequent, all of its supersets } Y \supseteq s \text{ must be infrequent.}$$
- If candidate itemset $\{A, B\}$ fails the minimum support threshold ($\text{Supp}(\{A, B\}) < \text{minsup}$), all higher-order supersets ($\{A, B, C\}, \{A, B, D\}, \dots$) are guaranteed to fail and are pruned immediately without querying the database.

### Lattice Pruning Efficiency

- Pruning infrequent itemsets early eliminates entire exponential sub-lattices.
- If itemset $\{B\}$ is infrequent at level 1, all $2^{M-1}$ supersets containing item $B$ are pruned from consideration, reducing the required candidate search space.

```mermaid
flowchart TD
    subgraph Lattice["Itemset Search Lattice Pruning"]
        A["{A}"]
        B["{B} (Infrequent!)"]
        C["{C}"]
        
        AB["{A, B}"]
        BC["{B, C}"]
        AC["{A, C}"]
        
        ABC["{A, B, C}"]
        
        A --- AC
        B --- AB
        B --- BC
        C --- AC
        C --- BC
        
        AB --- ABC
        BC --- ABC
        AC --- ABC
    end
    
    classDef pruned fill:#f8d7da,stroke:#dc3545,color:#721c24,stroke-dasharray: 5 5;
    classDef valid fill:#d4edda,stroke:#28a745,color:#155724;
    
    class B,AB,BC,ABC pruned;
    class A,C,AC vali