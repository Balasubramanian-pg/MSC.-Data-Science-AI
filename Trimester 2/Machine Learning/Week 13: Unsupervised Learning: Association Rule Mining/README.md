# Week 13: Unsupervised Learning: Association Rule Mining

## Unsupervised Learning: Association Rule Mining and Pattern Discovery

Association Rule Mining (ARM) identifies non-trivial co-occurrence patterns, correlations, and predictive relationships within large transaction databases without supervision. Originating in retail market basket analysis to analyze customer purchasing tendencies, association algorithms uncover rules governing items that frequently appear together. Analyzing combinatorial itemset spaces, rule evaluation metrics, the anti-monotonicity of support, candidate generation in Apriori, compressed prefix trees in FP-Growth, and vertical intersections in ECLAT establishes the technical foundation for unsupervised pattern discovery.

## Foundations of Association Rule Mining

### Transactional Databases and Itemset Formalism

- Let $\mathcal{I} = \{i_1, i_2, \dots, i_M\}$ denote a finite set of $M$ distinct categorical symbols, termed the **item universe**.
- A **transaction database** $\mathcal{T} = \{t_1, t_2, \dots, t_N\}$ consists of $N$ unique transaction records, where each transaction $t_n \subseteq \mathcal{I}$ represents an arbitrary subset of items.
- An **itemset** $X \subseteq \mathcal{I}$ is a collection of items; an itemset containing exactly $k$ items is termed a **$k$-itemset**.
- A transaction $t_n$ satisfies or contains an itemset $X$ if and only if $X$ is a subset of the transaction: $X \subseteq t_n$.

### The Combinatorial Explosion of Itemsets and Rules

- For an item universe containing $M$ unique items, the total number of candidate itemsets equals the size of the power set:
  $$|\mathcal{P}(\mathcal{I})| = 2^M$$
- An item universe of modest size ($M = 100$) yields $2^{100} \approx 1.26 \times 10^{30}$ possible itemsets, creating an intractable search space for brute-force frequency counting.
- Once a frequent itemset $Z$ of size $k$ is identified, generating non-trivial binary rules ($X \implies Y$ where $X \subset Z, Y = Z \setminus X$) yields $2^k - 2$ possible rule combinations.

### Rule Syntax: Antecedent and Consequent

- An **association rule** is an implication expression between two disjoint itemsets:
  $$X \implies Y, \quad \text{where } X, Y \subset \mathcal{I} \text{ and } X \cap Y = \emptyset$$
- **Antecedent ($X$):** The condition or body of the rule, representing the observed prerequisite items.
- **Consequent ($Y$):** The result or head of the rule, representing the inferred co-occurring items.
- Association rules represent empirical correlations, not causal relationships: observing itemset $X$ increases the statistical likelihood of observing itemset $Y$ within the same transaction.

> [!Important]
> **Association rules express co-occurrence, not causality**: finding that $X \implies Y$ establishes that items $X$ and $Y$ appear together with statistically significant frequency, but does not indicate that purchasing $X$ causes the purchase of $Y$.

## Quantitative Rule Evaluation Metrics

### Support: Quantifying Statistical Frequency

- The **support** of an itemset $X$ measures its empirical frequency of occurrence across the transaction database $\mathcal{T}$:
  $$\text{Supp}(X) = \frac{|\{t \in \mathcal{T} \mid X \subseteq t\}|}{|\mathcal{T}|} = P(X)$$
- The support of an association rule $X \implies Y$ evaluates the joint probability of both itemsets appearing simultaneously within a single transaction:
  $$\text{Supp}(X \implies Y) = \text{Supp}(X \cup Y) = P(X \cap Y)$$
- Setting a **minimum support threshold ($\text{minsup}$)** filters out rare, idiosyncratic noise patterns, restricting analysis to statistically significant itemsets.

### Confidence: Directional Conditional Probability

- The **confidence** of a rule $X \implies Y$ measures the conditional probability that a transaction contains consequent $Y$ given that it contains antecedent $X$:
  $$\text{Conf}(X \implies Y) = \frac{\text{Supp}(X \cup Y)}{\text{Supp}(X)} = \frac{P(X \cap Y)}{P(X)} = P(Y \mid X)$$
- Confidence is asymmetric: $\text{Conf}(X \implies Y) \neq \text{Conf}(Y \implies X)$ unless $\text{Supp}(X) = \text{Supp}(Y)$.
- Enforcing a **minimum confidence threshold ($\text{minconf}$)** ensures that generated rules possess high predictive certainty.

### The Confidence Fallacy and Misleading Rules

- Relying exclusively on high support and high confidence often extracts misleading or uninformative rules.
- Consider an item $Y$ that appears in 90% of all transactions ($P(Y) = 0.9$). Any arbitrary item $X$ will yield high confidence:
  $$\text{Conf}(X \implies Y) = P(Y \mid X) \approx 0.9$$
- If the baseline probability of purchasing $Y$ without $X$ is 95% ($P(Y \mid \neg X) = 0.95$), purchasing $X$ actually *decreases* the likelihood of purchasing $Y$.
- Confidence fails because it evaluates only the conditional probability $P(Y \mid X)$ while ignoring the baseline margin $P(Y)$.

### Lift: Measuring Statistical Dependence

- **Lift** evaluates the ratio of observed joint support to the expected support under statistical independence:
  $$\text{Lift}(X \implies Y) = \frac{P(X \cap Y)}{P(X) P(Y)} = \frac{\text{Conf}(X \implies Y)}{\text{Supp}(Y)} = \frac{\text{Supp}(X \cup Y)}{\text{Supp}(X) \cdot \text{Supp}(Y)}$$
- Lift is **symmetric**: $\text{Lift}(X \implies Y) = \text{Lift}(Y \implies X)$.
- **Interpreting Lift Values:**
  - **$\text{Lift} = 1.0$:** Itemsets $X$ and $Y$ are statistically independent ($P(X \cap Y) = P(X)P(Y)$); the rule provides zero predictive value.
  - **$\text{Lift} > 1.0$:** Itemsets $X$ and $Y$ are **positively correlated**; the presence of $X$ increases the likelihood of observing $Y$.
  - **$\text{Lift} < 1.0$:** Itemsets $X$ and $Y$ are **negatively correlated** (substitutes); the presence of $X$ decreases the likelihood of observing $Y$.

### Conviction and Leverage Metrics

- **Conviction:** Measures the ratio of expected frequency of $X$ occurring without $Y$ under statistical independence to the observed frequency of $X$ occurring without $Y$:
  $$\text{Conv}(X \implies Y) = \frac{1 - \text{Supp}(Y)}{1 - \text{Conf}(X \implies Y)} = \frac{P(X) P(\neg Y)}{P(X \cap \neg Y)}$$
  Conviction is directional (asymmetric) and evaluates to infinity when the rule is a deterministic logical implication ($\text{Conf} = 1.0$).
- **Leverage:** Measures the absolute difference between observed joint frequency and expected frequency under independence:
  $$\text{Lev}(X \implies Y) = \text{Supp}(X \cup Y) - \text{Supp}(X) \cdot \text{Supp}(Y)$$
  Leverage quantifies the net number of additional transactions explained by the rule over chance.

> [!Tip]
> **Use Lift to identify true correlation**: high confidence alone can produce misleading rules if the consequent is globally popular; a Lift score exceeding 1.0 confirms that the antecedent genuinely increases the likelihood of the consequent.

## The Apriori Algorithm and Anti-Monotonicity

### The Apriori Principle (Anti-Monotonicity of Support)

- Rakesh Agrawal and Ramakrishnan Srikant (1994) introduced the **Apriori Principle**, formalizing the **anti-monotonicity of support**:
  $$\text{If an itemset } X \text{ is frequent, every subset } s \subseteq X \text{ must also be frequent.}$$
- Stating the contrapositive provides the pruning foundation:
  $$\text{If an itemset } s \text{ is infrequent, every superset } X \supseteq s \text{ must be infrequent.}$$
- If candidate itemset $\{A, B\}$ fails the minimum support threshold, all supersets ($\{A, B, C\}, \{A, B, D\}, \dots$) are guaranteed to fail and are pruned immediately without querying the database.

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
    class A,C,AC valid;
```

### Level-Wise Search: Join and Prune Steps

- Apriori executes a level-wise breadth-first search across the itemset lattice, discovering frequent $k$-itemsets ($L_k$) before advancing to $(k+1)$-itemsets:
  1. **Candidate Generation ($C_{k+1}$ - Join Step):** Join frequent itemsets in $L_k$ with themselves. Two itemsets $l_1, l_2 \in L_k$ join if they share their first $k - 1$ items in lexicographical order:
     $$l_1 = \{i_1, \dots, i_{k-1}, i_k\}, \quad l_2 = \{i_1, \dots, i_{k-1}, i_k'\} \implies c = \{i_1, \dots, i_{k-1}, i_k, i_k'\}$$
  2. **Candidate Pruning (Prune Step):** For each candidate $c \in C_{k+1}$, check all of its $k$-subsets. If any $k$-subset is not present in $L_k$, prune $c$ from $C_{k+1}$ immediately.
  3. **Database Scan and Support Counting:** Scan the full transaction database $\mathcal{T}$ to compute empirical support for surviving candidates in $C_{k+1}$. Candidates meeting $\text{minsup}$ form $L_{k+1}$.
  4. Repeat until $L_{k+1} = \emptyset$.

### Generating Rules from Frequent Itemsets

- For each frequent itemset $l \in L_k$, generate non-empty subsets $s \subset l$.
- Evaluate rule confidence:
  $$\text{Conf}(s \implies l \setminus s) = \frac{\text{Supp}(l)}{\text{Supp}(s)}$$
- If $\text{Conf} \ge \text{minconf}$, retain the rule.
- Confidence is anti-monotonic with respect to the rule consequent: if a rule $X \setminus Y_1 \implies Y_1$ fails minimum confidence, any rule with a larger consequent $X \setminus Y_2 \implies Y_2$ (where $Y_1 \subset Y_2$) will also fail.

> [!Important]
> **Anti-monotonicity enables candidate pruning**: if any $k$-subset of a candidate itemset is infrequent, the candidate cannot be frequent, allowing Apriori to eliminate entire sub-trees of the search lattice without scanning the database.

## Frequent Pattern Growth (FP-Growth)

### Limitations of Apriori's Repeated Database Scans

- While Apriori prunes the search space, it suffers from two major scalability bottlenecks:
  - **Repeated Disk I/O Scans:** Discovering frequent itemsets of maximum size $K_{\max}$ requires $K_{\max} + 1$ full scans of the transaction database.
  - **Massive Candidate Generation:** Generating $C_k$ on dense datasets containing thousands of frequent 1-itemsets produces millions of intermediate candidate tuples.

### The FP-Tree: Compressed Prefix Tree Representation

- Jiawei Han, Jian Pei, and Yiwen Yin (2000) formulated **FP-Growth (Frequent Pattern Growth)**, which mines patterns without generating candidate itemsets.
- The algorithm encodes the transaction database into a compact, in-memory **Frequent Pattern Tree (FP-Tree)** using only **two sequential database scans**:
  - **Scan 1:** Compute the support count of all individual items. Discard infrequent items ($s < \text{minsup}$) and sort surviving items in descending order of frequency (creating an F-List).
  - **Scan 2:** Read transactions sequentially, filter out infrequent items, sort the remaining items according to the F-List, and insert the ordered transaction into the FP-Tree as a path sharing common prefixes.
- **Node Structure:** Each node stores an item label, a traversal count, and structural pointers (parent, children, and horizontal node-links connecting identical items).

```mermaid
flowchart TD
    subgraph FPTree["FP-Tree Prefix Architecture"]
        Root["Root (null)"]
        
        Root --> N_I2["I2: Count 7"]
        N_I2 --> N_I1["I1: Count 4"]
        N_I2 --> N_I3["I3: Count 2"]
        N_I1 --> N_I5["I5: Count 2"]
        
        Root --> N_I1_alt["I1: Count 2"]
        N_I1_alt --> N_I3_alt["I3: Count 2"]
    end
    
    Header["Header Table<br/>Item | HeadPointer<br/>I2  | -> Node I2<br/>I1  | -> Node I1 -> Node I1_alt<br/>I3  | -> Node I3 -> Node I3_alt<br/>I5  | -> Node I5"]
    Header -.-> N_I2
    Header -.-> N_I1
    Header -.-> N_I3
    Header -.-> N_I5
```

### Mining Conditional Pattern Bases Without Candidate Generation

- FP-Growth mines patterns recursively using a divide-and-conquer strategy:
  1. Iterate through items in the Header Table in reverse order of frequency (from rarest to most common).
  2. For target item $X$, follow its horizontal node-links to collect all prefix paths ending in $X$, termed the **conditional pattern base**.
  3. Treat the prefix paths as a localized transaction database and construct a small, localized **conditional FP-Tree**.
  4. If the conditional tree contains a single path, enumerate all possible combinations directly; if branching, recurse.
- FP-Growth eliminates candidate generation entirely and reduces disk access to two initial passes, running orders of magnitude faster than Apriori on dense, large-scale databases.

> [!Tip]
> **FP-Growth mines patterns without candidate generation**: encoding transactions into a shared prefix tree requires only two database passes, using recursive conditional trees to discover frequent patterns directly.

## The ECLAT Algorithm: Vertical Data Layouts

### Horizontal Versus Vertical Transaction Formats

- Standard databases store records in a **horizontal data format**: each entry pairs a unique Transaction Identifier (TID) with its associated set of items:
  $$\text{TID}_1 \to \{A, B, D\}, \quad \text{TID}_2 \to \{B, C, D\}$$
- Proposed by Mohammed Zaki (2000), **ECLAT (Equivalence Class Clustering and Data Transformation)** inverts the representation into a **vertical data format**: each item maps to its corresponding **TID-list** (the set of transactions containing that item):
  $$\text{Item } A \to \{1, 4, 5\}, \quad \text{Item } B \to \{1, 2, 3, 4\}$$

### Set Intersection Operations on TID-Lists

- In a vertical layout, the support of an itemset equals the cardinality of its TID-list:
  $$\text{Supp}(X) = \frac{|\text{TID}(X)|}{|\mathcal{T}|}$$
- To evaluate the joint support of candidate itemset $\{A, B\}$, ECLAT computes the **set intersection** of their respective TID-lists:
  $$\text{TID}(\{A, B\}) = \text{TID}(A) \cap \text{TID}(B)$$
- Counting support requires no scans across raw transactions; the algorithm evaluates the length of the intersected index set: $|\text{TID}(\{A, B\})|$.

### Depth-First Exploration Advantages

- ECLAT traverses the search lattice using a **depth-first search (DFS)** strategy.
- Intersecting compact bit-vectors or sorted integer arrays executes rapidly in memory.
- The primary limitation occurs on massive datasets where early TID-lists become very long, consuming substantial RAM unless compressed using diffsets (tracking difference vectors rather than full lists).

> [!Tip]
> **ECLAT computes support via set intersections**: using a vertical format maps items to transaction IDs, allowing the support of multi-item combinations to be evaluated through fast intersection operations ($|\text{TID}(A) \cap \text{TID}(B)|$).

## Comparative Matrices of Mining Algorithms and Evaluation Metrics

| Algorithmic Dimension | Apriori (Agrawal & Srikant) | FP-Growth (Han et al.) | ECLAT (Zaki) |
|---|---|---|---|
| **Underlying Data Layout** | Horizontal (TID $\to$ Items) | Horizontal $\to$ Prefix Tree | **Vertical (Item $\to$ TIDs)** |
| **Search Strategy** | Level-wise Breadth-First Search | Recursive Divide-and-Conquer | **Depth-First Search (DFS)** |
| **Number of Database Scans** | $K_{\max} + 1$ full scans | **Exactly 2 sequential scans** | 1 initial pass to build TID-lists |
| **Candidate Generation** | Explicit (Join + Prune steps) | **Zero candidate generation** | Implicit via TID-list intersections |
| **Memory Consumption** | Low (bounded by $C_k$ per level) | Moderate to High (holds FP-Tree in RAM) | High (long TID-lists consume memory) |
| **Execution Bottleneck** | Repeated disk I/O and candidate volume | Memory allocation for complex trees | Memory consumption of dense TID-lists |
| **Optimal Application** | Sparse datasets; small itemsets | Dense datasets; complex long patterns | Moderate datasets; memory-rich systems |

### Comparison of Association Rule Evaluation Metrics

| Metric | Mathematical Definition | Numerical Range | Directional / Symmetric? | Baseline Threshold / Ideal Value | Primary Diagnostic Role |
|---|---|---|---|---|---|
| **Support** | $\frac{\text{Count}(X \cup Y)}{N}$ | $[0, \; 1]$ | Symmetric | Minimum support ($\text{minsup}$) | Filters out rare, uninformative noise patterns |
| **Confidence** | $\frac{\text{Supp}(X \cup Y)}{\text{Supp}(X)}$ | $[0, \; 1]$ | **Asymmetric** | Minimum confidence ($\text{minconf}$) | Measures rule predictive reliability $P(Y \mid X)$ |
| **Lift** | $\frac{P(X \cap Y)}{P(X) P(Y)}$ | $[0, \; \infty)$ | **Symmetric** | $> 1.0$ (Positive correlation) | Identifies true statistical dependence |
| **Conviction** | $\frac{1 - \text{Supp}(Y)}{1 - \text{Conf}(X \implies Y)}$ | $[0, \; \infty)$ | **Asymmetric** | $= \infty$ (Perfect implication) | Measures directional implication strength |
| **Leverage** | $P(X \cap Y) - P(X)P(Y)$ | $[-0.25, \; +0.25]$ | **Symmetric** | $> 0$ (Surplus co-occurrence) | Measures absolute transaction lift over chance |

> [!Important]
> **Combine metrics to isolate quality rules**: support ensures statistical significance, confidence measures directional predictive reliability, and lift verifies that the relationship exceeds random chance.

## Key Takeaways

- **Association Rule Mining extracts unguided patterns** from transactional databases, modeling co-occurrences of the form $X \implies Y$.
- **Combinatorial itemset scaling ($2^M$)** makes brute-force pattern enumeration impossible for large item universes.
- **Support measures joint frequency**, **confidence measures conditional probability**, and **lift measures statistical dependence**.
- **The confidence fallacy** produces misleading rules when consequent items are globally popular; calculating lift confirms genuine positive correlation.
- **The Apriori Principle (anti-monotonicity)** states that all subsets of a frequent itemset must be frequent, allowing algorithms to prune candidate supersets without querying databases.
- **Apriori executes level-wise breadth-first search**, but requires repeated full database scans and extensive candidate generation.
- **FP-Growth eliminates candidate generation**, compressing transactions into an in-memory prefix tree using only two database scans and mining patterns via recursive conditional trees.
- **ECLAT uses a vertical data format**, mapping items to transaction ID lists and evaluating joint support through fast set intersections ($|\text{TID}(A) \cap \text{TID}(B)|$).

> [!Tip]
> The foundational rule of association mining: **prune itemset lattices before generating directional rules**; whether pruning via Apriori anti-monotonicity, compacting into FP-trees, or intersecting vertical TID-lists, scalable mining relies on discarding unpromising candidates early to discover statistically dependable association rules.
