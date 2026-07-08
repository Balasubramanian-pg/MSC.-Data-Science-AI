# Doc1 and Doc3 will have 0.0 similarity (orthogonal vectors).

```

### 2.3 Transactional Data
Used heavily in e-commerce and retail (e.g., DMart, Amazon). Unlike a data matrix where every attribute is present, transactional data consists of variable-length lists of items purchased together.

**Mathematical Formulation:**
Let $I = \{i_1, i_2, \dots, i_k\}$ be the set of all inventory items. A transaction $T$ is a subset $T \subseteq I$.

Transactional data is typically converted into a heavily sparse binary matrix where rows are transactions and columns are inventory items ($1$ if purchased, $0$ otherwise). This representation is foundational for **Association Rule Mining** (Apriori algorithm).
