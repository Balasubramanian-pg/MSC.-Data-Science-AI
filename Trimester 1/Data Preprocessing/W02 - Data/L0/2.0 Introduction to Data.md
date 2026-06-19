# 2.0. Introduction to Data

## 2.0.1. What Constitutes a Dataset

A dataset is a structured collection of data points, typically organized as a table where each row represents an observation and each column represents an attribute. Before any analysis can begin, we must understand the anatomy of the data we are working with.

Formally, a dataset with $$n$$ records and $$d$$ attributes can be represented as a matrix:

$$
X = \begin{bmatrix} x_{11} & x_{12} & \cdots & x_{1d} \\ x_{21} & x_{22} & \cdots & x_{2d} \\ \vdots & \vdots & \ddots & \vdots \\ x_{n1} & x_{n2} & \cdots & x_{nd} \end{bmatrix}
$$

where:

- $$X$$ = data matrix
- $$n$$ = number of records (rows)
- $$d$$ = number of attributes (columns)
- $$x_{ij}$$ = value of the $$j$$-th attribute for the $$i$$-th record

To emphasize the matrix representation of a dataset, we restate it:

$$
X = \begin{bmatrix} x_{11} & x_{12} & \cdots & x_{1d} \\ x_{21} & x_{22} & \cdots & x_{2d} \\ \vdots & \vdots & \ddots & \vdots \\ x_{n1} & x_{n2} & \cdots & x_{nd} \end{bmatrix}
$$

### 2.0.1.1. Records and Attributes

Each row in the dataset is called a **record**, also referred to as an observation, data point, instance, or sample. Records represent the individual objects being studied.

Each column is called an **attribute**, also known as a feature, variable, characteristic, or field. Attributes capture specific properties of the records.

The choice of attributes determines what questions can be answered. A dataset about customers might include age, income, purchase history, and location. Each of these is an attribute describing a different facet of the customer.

## 2.0.2. Types of Attributes

Transitioning from the structure of a dataset to its contents, we must classify the attributes it contains. The type of an attribute determines what mathematical operations are meaningful and, consequently, what analysis techniques can be applied.

Attributes are classified into four types based on their mathematical properties.

### 2.0.2.1. Nominal Attributes

Nominal attributes represent categories with no inherent ordering. The values are simply names or labels. The only meaningful operations are equality and inequality.

Examples include:

- Eye color (blue, brown, green)
- Country of residence
- Zip codes
- Marital status

Meaningful operations: equality ($$=$$), inequality ($$\neq$$)

Not meaningful: ordering ($$<$$, $$>$$), addition, multiplication

### 2.0.2.2. Ordinal Attributes

Ordinal attributes have a meaningful order or ranking, but the differences between values are not quantifiable. The order matters, but the magnitude of differences does not.

Examples include:

- Education level (high school $$<$$ bachelor's $$<$$ master's $$<$$ PhD)
- Satisfaction ratings (poor $$<$$ fair $$<$$ good $$<$$ excellent)
- Military ranks
- Competition placements (1st, 2nd, 3rd)

Meaningful operations: equality, inequality, ordering ($$<$$, $$>$$)

Not meaningful: addition, multiplication, ratios

### 2.0.2.3. Interval Attributes

Interval attributes have ordered values with meaningful, equal differences between them. However, there is no true zero point, meaning ratios are meaningless.

Examples include:

- Temperature in Celsius or Fahrenheit
- Calendar dates
- IQ scores
- Standardized test scores

Meaningful operations: equality, inequality, ordering, addition, subtraction

Not meaningful: multiplication, division (ratios are meaningless)

>[!Note]
> 20°C is not "twice as hot" as 10°C because the zero point in Celsius is arbitrary. This is the defining limitation of interval attributes.

### 2.0.2.4. Ratio Attributes

Ratio attributes possess all the properties of interval attributes, plus a true zero point. This means ratios between values are meaningful.

Examples include:

- Height, weight
- Temperature in Kelvin
- Income, age
- Duration, distance
- Number of children

Meaningful operations: all arithmetic operations including multiplication and division

The following table summarizes the properties of each attribute type.

| Attribute Type | Order | Equal Intervals | True Zero | Example |
|:---|:---:|:---:|:---:|---:|
| Nominal | No | No | No | Color |
| Ordinal | Yes | No | No | Rank |
| Interval | Yes | Yes | No | Celsius |
| Ratio | Yes | Yes | Yes | Kelvin |

## 2.0.3. Types of Datasets

Having classified individual attributes, we now turn to the overall structure of datasets. Datasets come in various forms depending on the nature of the data and the relationships between records.

### 2.0.3.1. Record Data

Record data consists of a collection of records with a fixed set of attributes. This is the most common type, typically stored in relational databases or CSV files.

Examples include:

- Transaction data (shopping records)
- Census data
- Scientific measurements
- Student grades

### 2.0.3.2. Graph Data

Graph data represents objects as nodes and relationships as edges. This is essential for modeling networks where relationships between entities are as important as the entities themselves.

Examples include:

- Social networks (users as nodes, friendships as edges)
- Web graphs (pages as nodes, hyperlinks as edges)
- Molecular structures (atoms as nodes, bonds as edges)
- Road networks (intersections as nodes, roads as edges)

### 2.0.3.3. Ordered Data

Ordered data has temporal or spatial ordering that is critical to analysis. The sequence of records carries information beyond the values themselves.

Examples include:

- Time series (stock prices, sensor readings, weather data)
- Video sequences (ordered frames)
- DNA sequences (ordered nucleotides)
- Speech signals (ordered audio samples)

### 2.0.3.4. Non-Record Data

Some datasets do not fit the traditional tabular format and require specialized representation.

Examples include:

- Text documents (collections of words)
- Images (2D arrays of pixels)
- Audio signals (waveforms)
- Video (sequences of images)

## 2.0.4. Data Quality Issues

Real-world data is rarely clean. Before any analysis can be trusted, we must identify and address common data quality issues. Garbage in, garbage out remains the fundamental rule of data science.

### 2.0.4.1. Noise and Outliers

**Noise** refers to errors or variances in measured values. It distorts the true signal in the data and can arise from measurement errors, data entry mistakes, or technological limitations.

**Outliers** are data objects that have characteristics considerably different from most other data objects. They may represent errors, or they may represent genuinely rare events worth investigating.

>[!Warning]
> Outliers can severely distort statistical measures like the mean and standard deviation. Always investigate outliers before deciding whether to remove them. Deleting an outlier without investigation is intellectual laziness.

### 2.0.4.2. Missing Values

Missing values occur when an attribute is not recorded for a particular record. Common reasons include:

- Missing information (not collected)
- Not applicable (e.g., credit card number for a non-cardholder)
- Data entry errors
- Equipment malfunction

Common handling strategies include:

- Remove records with missing values
- Impute with mean, median, or mode
- Use algorithms that handle missing values natively
- Treat missingness as a separate category

### 2.0.4.3. Duplicates and Inconsistencies

**Duplicates** are records that appear multiple times, often from data integration or merging multiple sources. They can bias analysis by over-representing certain observations.

**Inconsistencies** occur when data violates defined rules or constraints. Examples include:

- Age recorded as -5
- End date before start date
- Total not equal to sum of parts
- Conflicting information across sources

## 2.0.5. Data Preprocessing Techniques

Once data quality issues are identified, we apply preprocessing techniques to prepare data for analysis. These techniques transform raw data into a form suitable for mining and modeling.

### 2.0.5.1. Aggregation

Aggregation combines two or more attributes or objects into a single attribute or object. It serves two primary purposes:

- **Data reduction**: Reducing the number of distinct values by grouping
- **Scale change**: Moving from finer to coarser granularity

Example: Aggregating city-level population data to country-level totals, or aggregating daily sales to monthly totals.

### 2.0.5.2. Sampling

Sampling selects a subset of the data to represent the entire dataset. It is used when processing the full dataset is computationally expensive or when the dataset is too large to fit in memory.

For sampling to be effective, the sample must be representative. Simple random sampling is the baseline, but stratified sampling often provides better representation of minority classes.

### 2.0.5.3. Dimensionality Reduction

High-dimensional data suffers from the **curse of dimensionality**: as the number of dimensions increases, data becomes increasingly sparse, making distance measures less meaningful and models more prone to overfitting.

Dimensionality reduction techniques include:

- **Feature selection**: Selecting a subset of relevant features
- **Feature extraction**: Creating new features from combinations of original ones (e.g., PCA)

### 2.0.5.4. Feature Creation

Feature creation generates new attributes that are more informative or easier to work with than the original attributes. Three common methods include:

- **Feature mapping**: Transforming data to a new space
- **Feature extraction**: Deriving new features automatically
- **Domain-specific features**: Creating features based on domain knowledge

## 2.0.6. Data Representation and Similarity

Transitioning from preprocessing to analysis, we need quantitative measures of how similar or different two objects are. Many data mining tasks, including clustering and classification, rely on these proximity measures.

### 2.0.6.1. Proximity Measures

**Similarity** is a numerical measure of how alike two objects are, with higher values indicating greater similarity. Similarity is typically normalized to the range $$[0, 1]$$.

**Dissimilarity** (or distance) is a numerical measure of how different two objects are, with lower values indicating greater similarity. Distance is typically non-negative, with zero indicating identical objects.

### 2.0.6.2. Distance Measures for Numeric Attributes

For numeric attributes, the most common distance measure is the **Euclidean distance**:

$$
d(x, y) = \sqrt{\sum_{k=1}^{n} (x_k - y_k)^2}
$$

where:

- $$d(x, y)$$ = Euclidean distance between objects $$x$$ and $$y$$
- $$x_k$$ = value of the $$k$$-th attribute for object $$x$$
- $$y_k$$ = value of the $$k$$-th attribute for object $$y$$
- $$n$$ = number of attributes

To emphasize the Euclidean distance formula, we restate it:

$$
d(x, y) = \sqrt{\sum_{k=1}^{n} (x_k - y_k)^2}
$$

**Manhattan distance** (also called L1 norm or city-block distance) is another common measure:

$$
d(x, y) = \sum_{k=1}^{n} |x_k - y_k|
$$

**Minkowski distance** is a generalized form that encompasses both:

$$
d(x, y) = \left( \sum_{k=1}^{n} |x_k - y_k|^r \right)^{1/r}
$$

where $$r$$ is a positive integer. When $$r = 1$$, this is Manhattan distance. When $$r = 2$$, this is Euclidean distance.

### 2.0.6.3. Similarity for Binary Attributes

For binary attributes, we use contingency tables. Let:

- $$M_{11}$$ = number of attributes where both $$x$$ and $$y$$ are 1
- $$M_{10}$$ = number of attributes where $$x$$ is 1 and $$y$$ is 0
- $$M_{01}$$ = number of attributes where $$x$$ is 0 and $$y$$ is 1
- $$M_{00}$$ = number of attributes where both $$x$$ and $$y$$ are 0

The **Simple Matching Coefficient (SMC)** treats 0-0 matches the same as 1-1 matches:

$$
\text{SMC}(x, y) = \frac{M_{11} + M_{00}}{M_{11} + M_{00} + M_{10} + M_{01}}
$$

The **Jaccard Coefficient** ignores 0-0 matches, which is useful for asymmetric binary attributes where the presence of a feature (1) is more informative than its absence (0):

$$
J(x, y) = \frac{M_{11}}{M_{11} + M_{10} + M_{01}}
$$

## 2.0.7. Example of Computing Distance Measures

To solidify the mathematical concepts of proximity measures, we apply the formulas to a concrete scenario.

Suppose:

- Object $$x$$ = (1, 0, 1, 1, 0)
- Object $$y$$ = (1, 1, 0, 1, 0)
- We want to compute Euclidean distance, Manhattan distance, SMC, and Jaccard coefficient.

### Step 1: Identify Attribute-wise Comparisons

Comparing position by position:

- Position 1: (1, 1) → contributes to $$M_{11}$$
- Position 2: (0, 1) → contributes to $$M_{01}$$
- Position 3: (1, 0) → contributes to $$M_{10}$$
- Position 4: (1, 1) → contributes to $$M_{11}$$
- Position 5: (0, 0) → contributes to $$M_{00}$$

### Step 2: Count Matching Categories

$$M_{11} = 2, \quad M_{00} = 1, \quad M_{10} = 1, \quad M_{01} = 1$$

### Step 3: Compute Euclidean Distance

$$
d_E(x, y) = \sqrt{(1-1)^2 + (0-1)^2 + (1-0)^2 + (1-1)^2 + (0-0)^2} = \sqrt{0 + 1 + 1 + 0 + 0} = \sqrt{2} \approx 1.414
$$

### Step 4: Compute Manhattan Distance

$$
d_M(x, y) = |1-1| + |0-1| + |1-0| + |1-1| + |0-0| = 0 + 1 + 1 + 0 + 0 = 2
$$

### Step 5: Compute SMC and Jaccard

$$
\text{SMC} = \frac{2 + 1}{2 + 1 + 1 + 1} = \frac{3}{5} = 0.6
$$

$$
J = \frac{2}{2 + 1 + 1} = \frac{2}{4} = 0.5
$$

The Euclidean distance is **1.414**, Manhattan distance is **2**, SMC is **0.6**, and Jaccard coefficient is **0.5**.

## 2.0.8. Conclusions

Understanding the structure of datasets, the types of attributes they contain, and the appropriate representation methods is the foundation of all data preprocessing. Without this foundation, subsequent analysis and modeling steps are built on sand.

### 8.1. Summary of Attribute Types

The following table recaps the four attribute types and their permitted operations.

| Attribute Type | Permitted Operations | Typical Examples |
|:---|:---|:---|
| Nominal | $$=, \neq$$ | Color, zip code |
| Ordinal | $$=, \neq, <, >$$ | Rank, rating |
| Interval | $$=, \neq, <, >, +, -$$ | Celsius, dates |
| Ratio | $$=, \neq, <, >, +, -, \times, \div$$ | Height, weight |

### 8.2. Choosing the Right Proximity Measure

The following table guides the selection of proximity measures based on attribute type.

| Attribute Type | Recommended Measure |
|:---|:---|
| Nominal | SMC, Hamming distance |
| Ordinal | Rank-based distances |
| Interval/Ratio | Euclidean, Manhattan, Minkowski |
| Binary (symmetric) | SMC |
| Binary (asymmetric) | Jaccard |

>[!Tip]
> Always match your proximity measure to your attribute type. Using Euclidean distance on nominal attributes produces mathematically valid but semantically meaningless results. The math will run, but the conclusions will be wrong.
