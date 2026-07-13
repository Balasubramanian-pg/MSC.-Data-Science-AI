# 6.2. Reducing Data Volume Using Compression

## 6.2.1. Introduction to Data Volume Reduction

In large-scale data engineering and machine learning, datasets can grow to petabyte scales, making storage and processing extremely expensive.

**Data Volume Reduction** is a core phase of data preprocessing designed to shrink the physical footprint of datasets. By reducing data volume, organizations can minimize cloud storage costs, optimize memory utilization, and significantly decrease input/output (I/O) latency during model training. One of the most powerful and mathematically rigorous methods for achieving this reduction is **Data Compression**.

To understand this reduction phase systematically, we must first establish the core concept of data compression.

## 6.2.2. The Core Idea of Data Compression

The core objective of data compression is to represent the same underlying information using fewer bits.

Mathematically, let our original dataset be represented as a bit stream of size $$S_{\text{uncompressed}}$$. A compression algorithm maps this stream to a compressed representation of size $$S_{\text{compressed}}$$ such that:

$$
S_{\text{compressed}} < S_{\text{uncompressed}}
$$

Depending on whether we require the original data to be perfectly reconstructible, we select from two primary types of compression.

## 6.2.3. Two Main Types of Compression

We categorize compression techniques into two major classes based on their mathematical preservation of the original data:

### 3.1 Lossless Compression
This method ensures that the original raw data can be perfectly, bit-for-bit reconstructed from the compressed representation.
- No information is lost during the compression or decompression phases.
- Examples include Run-Length Encoding (RLE), Huffman coding, LZW compression, and columnar formats like Apache Parquet.
- It is highly suited for database tables, text logs, and categorical keys where any loss of detail would corrupt the dataset's logical integrity.

### 3.2 Lossy Compression
This method permanently discards less informative parts of the data to achieve much higher compression ratios.
- The original raw values cannot be perfectly reconstructed; instead, we obtain an approximation.
- Examples include JPEG for images, MP3 for audio, wavelets, and histogram binning for continuous features.
- It is highly suited for high-dimensional sensory data (such as images, video, and audio) where small, high-frequency variations can be discarded without affecting human perception or downstream model accuracy.

Selecting between these two compression types requires evaluating several key operational trade-offs.

## 6.2.4. Compression Tradeoffs and Evaluation Metrics

When implementing data compression pipelines, data engineers must balance four critical operational trade-offs:

### 4.1 Data Integrity
This refers to whether the dataset's exact values must be preserved (lossless) or if a statistical approximation is acceptable (lossy).

### 4.2 The Compression Ratio
The primary metric used to evaluate the efficiency of a compression algorithm is the **Compression Ratio ($$C_R$$)**:

$$
C_R = \frac{S_{\text{uncompressed}}}{S_{\text{compressed}}}
$$

where:
- $$C_R$$ = the compression ratio (a higher value indicates more efficient compression)
- $$S_{\text{uncompressed}}$$ = the physical storage size of the original uncompressed dataset
- $$S_{\text{compressed}}$$ = the physical storage size of the compressed dataset

Let us explicitly restate this Compression Ratio formula for emphasis:

$$
C_R = \frac{S_{\text{uncompressed}}}{S_{\text{compressed}}}
$$

### 4.3 Processing and Computational Overhead
Compression and decompression require CPU cycles. If an algorithm achieves a high compression ratio but requires massive computing overhead, it can introduce latency bottlenecks during model training.

### 4.4 File and Domain Suitability
Different file structures and data distributions require different compression algorithms. For example, text fields with repeating sequences are highly suited for LZW, while sparse matrices are best optimized using Compressed Sparse Row (CSR) representation.

To see how these tradeoffs operate on structured data, we can analyze how a histogram functions as both a lossless and a lossy compression technique.

## 6.2.5. Histogram as a Data Reduction Technique

A histogram can function as both a lossless and a lossy compression technique, depending on how we structure the transformation:

### 5.1 Original Data Representation
Consider a raw sorted continuous vector of transaction amounts:

$$
X = [12.000,\ 15.000,\ 15.000,\ 24.000,\ 24.000,\ 24.000,\ 24.000,\ 35.000,\ 35.000,\ 35.000]
$$

Storing this raw vector requires allocating memory for all $$10$$ continuous coordinates.

### 5.2 Histogram Transformation 1: Lossless Compression
By performing a value-frequency aggregation, we represent the distinct values and their frequency counts:

$$
X_{\text{lossless}} = \{(12.000, 1), (15.000, 2), (24.000, 4), (35.000, 3)\}
$$

This is a **lossless compression** because we can perfectly reconstruct the original $$10$$-element vector from this summary while reducing our storage footprint from $$10$$ floats to $$4$$ distinct tuples.

### 5.3 Histogram Transformation 2: Lossy Compression
If we partition the feature space into two wide bins and store only the bin boundaries and count, we have:
- Bin 1 ($$[10.000, 25.000)$$): count = 7
- Bin 2 ($$[25.000, 40.000]$$): count = 3

This is a **lossy compression** because we can no longer reconstruct the exact original values (such as $$12.000$$ or $$15.000$$). We only know that $$7$$ values fall within the first interval. However, it achieves a much higher compression ratio, storing only $$2$$ bin summary rows.

### 5.4 Key Conceptual Difference
The fundamental difference is:
- Lossless compression reduces volume by removing redundancy while preserving the exact original values.
- Lossy compression discards detailed, high-frequency variance, trading statistical precision for a significantly smaller storage footprint.

To observe how these compression ratios and information loss values are calculated mathematically, let us walk through a manual calculation step-by-step.

## 6.2.6. Worked Mathematical Example: Compression Ratio and Information Loss Quantitative Analysis

We will calculate the compression ratios and information loss (reconstruction error) achieved by applying both lossless value-frequency encoding and lossy histogram-binned encoding to a continuous data stream.

Suppose:
- We have a raw sorted continuous dataset of size $$N = 10$$ where each value takes $$64\text{ bits}$$ of storage:
  $$
  X = [12.000,\ 15.000,\ 15.000,\ 24.000,\ 24.000,\ 24.000,\ 24.000,\ 35.000,\ 35.000,\ 35.000]
  $$
- We use a lossless value-frequency encoding where each distinct tuple (value, frequency) takes $$80\text{ bits}$$ of storage (a $$64\text{-bit}$$ float and a $$16\text{-bit}$$ frequency integer).
- We use a lossy histogram encoding with two bins ($$k = 2$$) where we store only the bin average and bin count:
  - Bin 1 ($$[10.000, 25.000)$$): contains $$[12.000, 15.000, 15.000, 24.000, 24.000, 24.000, 24.000]$$ (count = 7)
  - Bin 2 ($$[25.000, 40.000]$$): contains $$[35.000, 35.000, 35.000]$$ (count = 3)
  - Each bin summary tuple (average, count) takes $$80\text{ bits}$$ of storage.
- We wish to calculate the original size, the lossless compressed size and its compression ratio, the lossy compressed size and its compression ratio, and quantify the Mean Squared Error (MSE) reconstruction loss for the lossy representation.

We will follow a five-step calculation pipeline.

### Step 1: Calculate Original Uncompressed Memory Footprint
We calculate the physical storage size of our original vector:

$$
S_{\text{uncompressed}} = 10 \times 64\text{ bits} = 640\text{ bits}
$$

### Step 2: Execute Lossless Value-Frequency Compression and Compute Compression Ratio
We extract the distinct values and their frequency counts: $$(12.000, 1)$$, $$(15.000, 2)$$, $$(24.000, 4)$$, $$(35.000, 3)$$. We have $$4$$ distinct tuples. The compressed size is:

$$
S_{\text{lossless}} = 4 \times 80\text{ bits} = 320\text{ bits}
$$

We calculate the lossless compression ratio:

$$
C_{R,\text{lossless}} = \frac{S_{\text{uncompressed}}}{S_{\text{lossless}}} = \frac{640\text{ bits}}{320\text{ bits}} = 2.000
$$

### Step 3: Execute Lossy Histogram-Binned Compression and Compute Compression Ratio
We calculate the arithmetic mean for each of our two bins.

For Bin 1 ($$[10.000, 25.000)$$):

$$
\mu_1 = \frac{12.000 + 15.000 + 15.000 + 4 \times 24.000}{7} = \frac{138.000}{7} \approx 19.714
$$

For Bin 2 ($$[25.000, 40.000]$$):

$$
\mu_2 = \frac{3 \times 35.000}{3} = 35.000
$$

We store $$2$$ summary tuples: $$(19.714, 7)$$ and $$(35.000, 3)$$. The compressed size is:

$$
S_{\text{lossy}} = 2 \times 80\text{ bits} = 160\text{ bits}
$$

We calculate the lossy compression ratio:

$$
C_{R,\text{lossy}} = \frac{S_{\text{uncompressed}}}{S_{\text{lossy}}} = \frac{640\text{ bits}}{160\text{ bits}} = 4.000
$$

### Step 4: Quantify the Relative Information Loss (Reconstruction Error)
We reconstruct our dataset using the compressed lossy representation, replacing each original value with its corresponding bin average:

$$
X_{\text{reconstructed}} \approx [19.714,\ 19.714,\ 19.714,\ 19.714,\ 19.714,\ 19.714,\ 19.714,\ 35.000,\ 35.000,\ 35.000]
$$

We compute the Mean Squared Error (MSE) reconstruction error:

$$
MSE = \frac{1}{N} \sum_{i=1}^{N} (x_i - \hat{x}_i)^2
$$

Let us restate this Mean Squared Error formula for emphasis:

$$
MSE = \frac{1}{N} \sum_{i=1}^{N} (x_i - \hat{x}_i)^2
$$

We calculate the sum of squared differences for our Bin 1 points (reconstructed as $$19.714$$):

$$
\sum_{i \in \text{Bin 1}} (x_i - \hat{x}_i)^2 = (12.000 - 19.714)^2 + 2 \times (15.000 - 19.714)^2 + 4 \times (24.000 - 19.714)^2
$$

$$
\approx (-7.714)^2 + 2 \times (-4.714)^2 + 4 \times (4.286)^2 \approx 59.506 + 44.444 + 73.480 = 177.430
$$

For Bin 2, because the raw values ($$35.000$$) are exactly equal to the bin average ($$35.000$$), the squared differences are zero.

The total MSE is:

$$
MSE = \frac{177.430 + 0.000}{10} = 17.743
$$

### Step 5: Output the Compression Performance Tradeoffs
We summarize the performance metrics:

$$
\mathbf{C_{R,\text{lossless}} = 2.000 \quad \text{with} \quad MSE = 0.000}
$$

$$
\mathbf{C_{R,\text{lossy}} = 4.000 \quad \text{with} \quad MSE = 17.743}
$$

The lossless compression ratio is **2.000** (with **0.000** reconstruction error), while the lossy compression ratio is **4.000** (with **17.743** reconstruction error). This demonstrates the fundamental trade-off: lossy compression achieves higher data volume reduction at the expense of introducing reconstruction error.

Understanding these tradeoffs is essential when designing pipelines for high-throughput machine learning systems.

## 6.2.7. Why Compression Matters in ML and Data Mining

Implementing data compression is critical for scalable data systems:

- **I/O Latency Reduction:** High-throughput machine learning pipelines are often bounded by disk I/O speeds (the time required to load data from storage into RAM). Compressed datasets load significantly faster, reducing GPU idle time and accelerating training.
- **Enabling In-Memory Training:** Large datasets can easily exceed the RAM capacity of a single machine. Compressing datasets can shrink them enough to fit entirely within memory, avoiding the need for slow disk-caching methods.
- **Distributed Compute Optimization:** When training models on distributed clusters, transferring massive uncompressed files over the network can create severe bandwidth bottlenecks. Compressing data minimizes network transfer times, accelerating distributed training.

However, compressing data without validating its impact can introduce serious errors into downstream models.

## 6.2.8. Common Preprocessing and Modeling Failure Modes

When designing compression pipelines, practitioners frequently make critical mistakes that can compromise model performance.

### 8.1 Applying Lossy Compression Prior to Feature Engineering on Fine Anomalies

>[!Warning]
> **Using Lossy Compression on Anomaly Detection Features**
> Applying lossy compression (such as wide histogram binning or wavelet transforms) to datasets built for rare-event detection (such as credit card fraud or network intrusion) is a major engineering mistake. Lossy compression discards the high-frequency, detailed variance where these rare anomalies reside, making them invisible to downstream models. For anomaly detection, always use lossless compression.

### 8.2 Disregarding Computational CPU Latency in Real-Time Compression Pipelines

>[!Warning]
> **Failing to Account for Decompression CPU Overhead**
> Using complex compression algorithms with high decompression costs in real-time inference pipelines can introduce significant latency. While the compressed files are smaller, the CPU cycles spent decompressing the data on-the-fly can easily exceed the time saved in network transfer, increasing system latency. For real-time applications, prioritize lightweight, fast-decompression formats.

### 8.3 Blindly Trusting Naive RLE on High-Variance Non-Repeating Continuous Features

>[!Warning]
> **Applying Run-Length Encoding to Continuous Attribute Columns**
> Applying Run-Length Encoding (RLE) to high-variance continuous columns (such as continuous coordinates or sensor readings) is highly inefficient. RLE reduces storage by representing repeating sequences (e.g., $$[5, 5, 5] \to (5, 3)$$). Because continuous attributes rarely repeat exactly, applying RLE will actually increase the file size by adding coordinate headers without finding any duplicates.

In conclusion, understanding these preprocessing techniques defines the statistical and mathematical limits of your feature space.

## 6.2.9. Conclusions and Compression Selection Matrix

Selecting the correct compression strategy is a crucial design choice in scalable machine learning.

Let us explicitly restate our core Compression Ratio formula:

$$
C_R = \frac{S_{\text{uncompressed}}}{S_{\text{compressed}}}
$$

Let us explicitly restate our Mean Squared Error formula to highlight how reconstruction error is evaluated:

$$
MSE = \frac{1}{N} \sum_{i=1}^{N} (x_i - \hat{x}_i)^2
$$

The following table summarizes when to apply each compression strategy based on the analytical requirements of your system.

| Compression Strategy | Target Preservation | Reconstruction Error ($$MSE$$) | Best For | Key Pipeline Risk |
| :---: | :---: | :---: | :---: | :---: |
| **Lossless** | Perfect, bit-for-bit | Exactly $$0.000$$ | Database tables, text logs, categorical keys | Lower compression ratios |
| **Lossy** | Approximate representation | Bounded ($$MSE > 0.000$$) | Image pixels, audio streams, sensory readings | Discards detailed, high-frequency variance |

By strategically identifying redundant sequences and applying appropriate compression techniques, machine learning engineers can ensure their pipelines ingest clean, mathematically sound datasets, establishing a reliable geometric foundation for predictive models.
