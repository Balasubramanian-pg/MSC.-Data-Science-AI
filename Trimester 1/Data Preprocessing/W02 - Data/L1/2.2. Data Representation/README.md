# 2.2. Data Representation: Topologies, Matrices, and Graph Structures

## 2.2.1. Introduction to Data Topologies and Representations

In computational systems, the physical reality of an event (a user clicking a webpage, reading a news article, or buying groceries) cannot be processed natively.

Data representation is the architectural step of mapping high-entropy physical events into mathematically tractable topologies. The choice of topology strictly governs which machine learning algorithms and statistical operations can be applied. When mapping real-world phenomena, we systematically select from three fundamental paradigms:

- **Record Data:** Representing instances as independent coordinate vectors in a flat design matrix.
- **Graph Data:** Modeling explicit pairwise relationships and link structures using networks.
- **Ordered Data:** Preserving sequence, chronological intervals, and temporal paths.

To understand how basic tabular records are mapped into vector spaces, we must explore the properties of record data.

## 2.2.2. Record Data: The Foundational Paradigm

Record data is the most common paradigm in database engineering, treating observations as independent row vectors in a flat matrix.

Within this framework, we classify datasets based on their coordinate structures:
- **Tabular Data:** Flat tables where each row is an instance and each column is a feature of a fixed data type.
- **Transaction Data:** Collections of transaction logs where each row represents a market basket containing a variable list of items.
- **Document-Term Data:** Sparse representations of text documents mapped across a shared vocabulary.

A prime application of record data in text analysis is the mapping of unstructured natural language documents into numerical tables called term-document matrices.

## 2.2.3. Term-Document Matrices and Sparse Vector Spaces

A **Term-Document Matrix** is an algebraic representation of text where rows correspond to unique documents, columns correspond to unique terms in a global vocabulary, and cells contain term frequencies.

Because any individual document contains only a tiny fraction of the global vocabulary, the resulting term-document matrix is highly sparse (dominated by zero values).

To compute similarity between two documents in this high-dimensional, sparse vector space, we utilize **Cosine Similarity**. This metric measures the angular difference between vectors rather than their absolute Euclidean lengths.

The Cosine Similarity formula is defined as:

$$
\text{Similarity}(x, y) = \frac{x \cdot y}{||x|| \cdot ||y||}
$$

where:
- $$x \cdot y$$ = the dot product of vectors $$x$$ and $$y$$
- $$||x||$$ = the Euclidean norm (magnitude) of vector $$x$$
- $$||y||$$ = the Euclidean norm (magnitude) of vector $$y$$

Let us explicitly restate this fundamental Cosine Similarity formula for emphasis:

$$
\text{Similarity}(x, y) = \frac{x \cdot y}{||x|| \cdot ||y||}
$$

To understand how this sparse vector metric works in practice, let us manually compute the similarity between two distinct document records.

## 2.2.4. Worked Mathematical Example: Cosine Similarity over Sparse Document Vectors

We will compute the cosine similarity between two natural language documents represented as term frequency vectors over a small three-word vocabulary.

Suppose:
- We have a global vocabulary consisting of three terms: `[machine, learning, statistics]`.
- Document 1 ($$x$$) contains the terms `machine` and `learning`, represented as:
  $$
  x = [1.000, 1.000, 0.000]
  $$
- Document 2 ($$y$$) contains the terms `machine` and `statistics`, represented as:
  $$
  y = [1.000, 0.000, 1.000]
  $$
- We wish to calculate the cosine similarity between these two sparse vectors.

We will follow a five-step calculation pipeline.

### Step 1: Define the Coordinate Vectors
We map our documents to coordinates in our 3-dimensional vocabulary space ($$d = 3$$):

$$
x = [1.000, 1.000, 0.000]
$$

$$
y = [1.000, 0.000, 1.000]
$$

### Step 2: Calculate the Vector Dot Product
We compute the sum of the element-wise products of our vectors:

$$
x \cdot y = (1.000 \times 1.000) + (1.000 \times 0.000) + (0.000 \times 1.000)
$$

$$
x \cdot y = 1.000 + 0.000 + 0.000 = 1.000
$$

### Step 3: Calculate the Euclidean Norms (Magnitudes)
We compute the magnitude of each document vector:

$$
||x|| = \sqrt{(1.000)^2 + (1.000)^2 + (0.000)^2} = \sqrt{1.000 + 1.000} = \sqrt{2.000} \approx 1.414
$$

$$
||y|| = \sqrt{(1.000)^2 + (0.000)^2 + (1.000)^2} = \sqrt{1.000 + 1.000} = \sqrt{2.000} \approx 1.414
$$

### Step 4: Formulate the Cosine Similarity Equation
We substitute our metrics into the cosine similarity equation:

$$
\text{Similarity}(x, y) = \frac{x \cdot y}{||x|| \cdot ||y||}
$$

### Step 5: Compute the Final Cosine Similarity Value
We substitute our calculated values:

$$
\text{Similarity}(x, y) = \frac{1.000}{\sqrt{2.000} \times \sqrt{2.000}} = \frac{1.000}{2.000} = 0.500
$$

The final cosine similarity between Document 1 and Document 2 is:

$$
\mathbf{\text{Similarity}(x, y) = 0.500}
$$

This score indicates a precise **0.500** directional alignment, meaning the documents share 50% of their word vectors in vocabulary space.

While record spaces treat data objects as independent entities, many systems are structured as interconnected networks where data elements share explicit relationships.

## 2.2.5. Graphical Data: Networks and Adjacency Topologies

Graph data represents physical events where relationships between data objects are more important than the individual attributes of the objects themselves.

A graph is mathematically represented as:

$$
G = (V, E)
$$

where:
- $$V$$ = the set of vertices (nodes) representing entities (e.g., webpages, social media profiles)
- $$E$$ = the set of edges representing connections (e.g., hyperlinks, followers)

To represent these network connections in a computable format, we construct an **Adjacency Matrix** $$A \in \mathbb{R}^{|V| \times |V|}$$:

$$
A_{ij} = 1 \quad \text{if } (v_i, v_j) \in E \quad \text{and} \quad A_{ij} = 0 \quad \text{otherwise}
$$

To calculate the global importance of a node within this network topology, we can apply an eigenvector centrality formulation known as PageRank.

## 2.2.6. Mathematical Formulation of the PageRank Eigenvector Problem

The **PageRank** algorithm measures the relative importance of nodes in a directed graph by simulating a user navigating the network.

The PageRank vector $$PR(u)$$ of a webpage $$u$$ is calculated using the following formula:

$$
PR(u) = \frac{1-d}{|V|} + d \sum_{v \in B_u} \frac{PR(v)}{L(v)}
$$

where:
- $$d$$ = the damping factor, representing the probability that the user continues clicking links (typically set to $$0.850$$)
- $$B_u$$ = the set of all nodes linking into node $$u$$
- $$L(v)$$ = the out-degree (number of outbound links) of node $$v$$
- $$|V|$$ = the total number of nodes in the graph

Let us explicitly restate this PageRank formula for emphasis:

$$
PR(u) = \frac{1-d}{|V|} + d \sum_{v \in B_u} \frac{PR(v)}{L(v)}
$$

By treating PageRank as an eigenvector problem, the system iteratively updates scores until they converge to a stable probability distribution.

Beyond spatial record spaces and network graphs, many physical events are fundamentally ordered, requiring sequential and temporal structures.

## 2.2.7. Ordered Data: Sequence, Temporal, and Genetic Dynamics

Ordered data preserves sequence, chronological intervals, and temporal paths as core features.

We classify ordered datasets based on their temporal and spatial indexing:
- **Time-Series Data:** Sequences of continuous measurements taken at uniform, consecutive intervals (e.g., hourly temperature logs, stock prices).
- **Sequence Data:** Ordered lists of discrete events where the intervals between events are not strictly uniform (e.g., a user's click path through an e-commerce website).
- **Genetic / Biological Sequence Data:** Long, discrete chains of molecular nucleotides (e.g., DNA sequences represented by characters A, C, T, and G) where sequence order determines biological function.

To observe how both record topologies and graph topologies are manipulated programmatically, let us build a unified Python script.

## 2.2.8. Python Implementation: Document Similarity and PageRank Network Modeling

The following Python script implements a text-vectorization similarity model and builds a directed webpage network to compute PageRank scores.

```python
import numpy as np
import pandas as pd
import networkx as nx
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# -------------------------------------------------------------------------
# TOPOLOGY 1: Record Data - Sparse Term-Document Matrix
# -------------------------------------------------------------------------
# Raw unstructured text documents
documents = [
    "machine learning is great",
    "machine learning and statistics",
    "statistics and analytics"
]

# Convert natural language text into a term-document frequency matrix
vectorizer = CountVectorizer()
term_doc_matrix = vectorizer.fit_transform(documents)

# Convert the sparse matrix into a structured pandas DataFrame
vocabulary = vectorizer.get_feature_names_out()
df_tdm = pd.DataFrame(term_doc_matrix.toarray(), columns=vocabulary, index=['Doc1', 'Doc2', 'Doc3'])

print("Structured Term-Document Matrix (Record Topology):")
print(df_tdm)
print("\n" + "="*60 + "\n")

# Calculate pairwise Cosine Similarity over the document vectors
cos_sim_matrix = cosine_similarity(term_doc_matrix)
df_similarity = pd.DataFrame(cos_sim_matrix, columns=['Doc1', 'Doc2', 'Doc3'], index=['Doc1', 'Doc2', 'Doc3'])

print("Pairwise Cosine Similarity Matrix:")
print(df_similarity)
print("\n" + "="*60 + "\n")

# -------------------------------------------------------------------------
# TOPOLOGY 2: Graph Data - Directed PageRank Link Network
# -------------------------------------------------------------------------
# Initialize a directed graph representing hyperlinked webpages
web_graph = nx.DiGraph()

# Add edges representing directed links between pages
web_graph.add_edges_from([
    ('Page_A', 'Page_B'),
    ('Page_B', 'Page_A'),
    ('Page_B', 'Page_C'),
    ('Page_C', 'Page_A'),
    ('Page_D', 'Page_C')
])

# Compute PageRank scores mathematically
pagerank_scores = nx.pagerank(web_graph, alpha=0.85)

# Extract the adjacency matrix representation of our graph
adjacency_matrix = nx.adjacency_matrix(web_graph).todense()

print("Graph Link Topology - Calculated PageRank Scores:")
for node, score in pagerank_scores.items():
    print(f"{node}: {score:.4f}")
print("\nAdjacency Matrix Representation of network:")
print(adjacency_matrix)
```

Now that we have demonstrated these data extractions programmatically, we can explore how dataset layout designs affect computational performance.

## 2.2.9. Performance and Systems Engineering Insights

When working with high-dimensional data, choosing how to represent matrices in memory is a critical systems engineering decision:

### Dense Matrix Representation
Storing high-dimensional matrices in standard dense formats (such as complete 2D arrays) allocates memory for every cell in the grid, regardless of whether it contains a value or a zero:

$$
\text{Memory Complexity} = O(N \cdot P)
$$

For a term-document matrix with $$100,000$$ documents and $$50,000$$ unique vocabulary words, storing it in a dense format requires allocating memory for $$5 \times 10^9$$ float values. This can easily exhaust system memory and slow down performance.

### Sparse Matrix Representation (CSR and CSC)
To optimize memory, we use sparse matrix representation formats like **Compressed Sparse Row (CSR)** or **Compressed Sparse Column (CSC)**.

A CSR representation optimizes memory usage to:

$$
\text{Memory Complexity} = O(\text{nnz})
$$

where:
- $$\text{nnz}$$ = the total number of non-zero elements in the matrix

By storing only non-zero values alongside their index offsets, CSR-formatted matrices reduce memory footprint by over 95% and allow for fast, hardware-optimized matrix multiplication.

Selecting the wrong matrix structure or topological assumption can introduce severe engineering failures during model execution.

## 2.2.10. Common Engineering Failure Modes and Modeling Pitfalls

When designing data representations, engineers frequently make critical mistakes that can compromise model performance.

### 10.1 Dense Storage Allocation of High-Dimensional Sparse Matrices

>[!Warning]
> **Converting Text Vectors to Dense Formats Prior to Training**
> Attempting to convert sparse text features (such as CountVectorizer outputs) to dense formats (using `.toarray()` or `.todense()`) on large datasets can easily trigger memory allocation errors. High-dimensional categorical vectors should always remain in their sparse CSR or CSC formats throughout the preprocessing pipeline to ensure the system is memory-stable.

### 10.2 Treating Temporal Time-Series as Permutable Tabular Records

>[!Warning]
> **Shuffling Time-Series Rows in Standard Design Matrices**
> Treating time-series data as flat, independent rows in a standard design matrix ignores chronological order. Many classical machine learning models assume observations are independent and identically distributed (*I.I.D.*). If you shuffle the rows of a time-series dataset, you destroy the temporal correlation structure, rendering forecasting models useless.

### 10.3 Ignoring Structural Sparsity in Graph Propagation Algorithms

>[!Warning]
> **Failing to Leverage Sparse PageRank Formulations on Scale-Free Networks**
> Executing graph algorithms (such as PageRank or Label Propagation) using dense adjacency matrices on scale-free graphs (e.g., social networks) leads to severe performance issues. Because real-world graphs are highly sparse, dense matrix calculations will waste CPU cycles computing multiplications by zero. This can cause memory crashes on relatively small networks.

In conclusion, understanding data representations defines the geometric and network reality of your feature space.

## 2.2.11. Conclusions and Topological Selection Matrix

Selecting the correct data representation maps real-world, high-entropy events into computationally tractable mathematical topologies.

Let us explicitly restate our fundamental PageRank formulation to highlight how network link structures determine node importance:

$$
PR(u) = \frac{1-d}{|V|} + d \sum_{v \in B_u} \frac{PR(v)}{L(v)}
$$

The following table summarizes when to apply each data representation based on the structural characteristics of your dataset.

| Data Topology | Primary Mathematical Structure | Fundamental Comparison Metric | Optimal Application |
| :---: | :---: | :---: | :---: |
| **Record Data** | Design Matrix ($$X \in \mathbb{R}^{n \times p}$$) | Cosine Similarity / Euclidean Distance | Natural Language Processing, customer clustering |
| **Graph Data** | Adjacency Matrix ($$A \in \mathbb{R}^{|V| \times |V|}$$) | PageRank Eigenvector centrality | Web crawling, social network analysis |
| **Ordered Data** | Sequential indexing ($$t_1 < t_2 < \dots < t_n$$) | Dynamic Time Warping (DTW) | Stock forecasting, DNA sequencing |

By carefully selecting your data representation to match the natural topology of the problem domain, you can prevent memory exhaustion, minimize computational latency, and build highly scalable, robust machine learning pipelines.
