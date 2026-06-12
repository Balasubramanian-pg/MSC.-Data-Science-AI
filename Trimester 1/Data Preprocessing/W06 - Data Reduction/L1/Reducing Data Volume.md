---
title: W06 - Data Reduction
module: Statistical Modelling And Inferencing
week: W06 - Data Reduction
---

## Summary: Reducing Data Volume Using Compression

This lecture focuses on **data volume reduction**, specifically through **data compression techniques** used in data preprocessing. The objective is to reduce storage and computational costs while preserving as much important information as possible.

## Core Idea of Data Compression

Data compression reduces the amount of stored or processed data by:

- Removing redundancy
    
- Encoding data efficiently
    
- Representing information in a compact form
    

The goal is to:

- Improve computational efficiency
    
- Reduce storage requirements
    
- Increase processing speed
    
- Simplify large-scale data handling
    

Example:

- 50 million rows → compressed into 5 million rows
    
- 50 attributes → reduced into 5 attributes
    

This is fundamentally about reducing the data footprint while retaining useful information.

## Two Main Types of Compression

|Type|Can Original Data Be Perfectly Reconstructed?|Information Loss?|
|---|---|---|
|Lossless Compression|Yes|No|
|Lossy Compression|No|Yes|


## 1. Lossless Compression

In lossless compression:

- Original data → compressed
    
- Compressed data → exact original reconstructed
    

No information is lost during transformation.

### Pipeline

```text
Original Data → Compression Algorithm → Compressed Data
Compressed Data → Decompression → Exact Original Data
```

### Examples

- ZIP files
    
- Huffman Coding
    
- Run-Length Encoding
    

### Key Property

Data integrity is perfectly preserved.

If you zip and unzip a file:

- Every bit remains identical
    
- Nothing changes
    

### Use Cases

Used when accuracy matters:

- Databases
    
- Medical records
    
- Financial data
    
- Source code
    
- Scientific datasets
    


## 2. Lossy Compression

In lossy compression:

- Original data is compressed
    
- Reconstruction only gives an approximation
    

Some information is permanently discarded.

### Pipeline

```text
Original Data → Compression → Reduced Representation
Reduced Representation → Reconstruction → Approximate Data
```

### Examples

- JPEG images
    
- MP3 audio
    
- Video compression
    

### Key Property

Smaller size comes at the cost of precision.

### Use Cases

Used when perfect reconstruction is unnecessary:

- Images
    
- Audio
    
- Video
    
- Streaming systems
    


## Compression Tradeoffs

The lecture emphasizes that compression is never free.

## 1. Data Integrity

If preserving exact information matters:

- Use lossless compression
    

If approximation is acceptable:

- Use lossy compression
    


## 2. Compression Ratio

Compression ratio measures:

```text
Original Size / Compressed Size
```

Higher compression ratio:

- Saves more storage
    
- May increase information loss
    
- May increase processing time
    


## 3. Processing Overhead

Compression/decompression consumes:

- CPU cycles
    
- Memory
    
- Compute resources
    

Example:

- ZIP/unzip operations require computation
    

So compression itself has a cost.


## 4. File Suitability

Not all data compresses effectively.

Some data:

- Already optimized
    
- Randomized
    
- Highly unique
    

may not benefit much from compression.


## Histogram as a Data Reduction Technique

The lecture uses histograms as a practical example of compression and data reduction.

## Original Data

Suppose we store 40 individual item prices:

```text
1, 1, 5, 5, 8, ...
```

This requires storing all 40 entries separately.


## Histogram Transformation 1

Convert the data into:

|Price|Count|
|---|---|
|1|2|
|5|2|
|8|2|

Instead of storing all raw values:

- Store unique prices
    
- Store frequencies
    

This drastically reduces storage.

### Important Insight

This transformation is:

## Lossless Compression

Because the original data can be perfectly reconstructed from:

- Value
    
- Frequency
    

Example:

```text
Price 1 appears 2 times → reconstruct [1,1]
```

No information is lost.


## Histogram Transformation 2

Now group prices into ranges:

|Price Range|Count|
|---|---|
|1-10|13|
|11-20|25|

This reduces data even further.

But now:

- Exact values are gone
    
- Only approximate distribution remains
    

You cannot reconstruct the original dataset exactly.

### Important Insight

This transformation is:

## Lossy Compression

Because only approximate information survives.


## Key Conceptual Difference

|Property|Lossless|Lossy|
|---|---|---|
|Exact reconstruction|Yes|No|
|Information preserved|Fully|Partially|
|Compression ratio|Lower|Higher|
|Data quality retained|Perfect|Approximate|
|Use cases|Critical systems|Multimedia|


## Why Compression Matters in ML and Data Mining

Compression helps:

- Scale large systems
    
- Reduce memory usage
    
- Speed up analytics
    
- Improve manageability
    
- Reduce computational cost
    

Especially important for:

- Big data pipelines
    
- Distributed systems
    
- Machine learning preprocessing
    
- Cloud storage optimization
    


## Final Takeaways

Data compression is a foundational data reduction strategy.

The central tradeoff is:

```text
Storage Efficiency vs Information Preservation
```

Lossless compression:

- Preserves exact data
    
- Safer
    
- Larger output
    

Lossy compression:

- More aggressive reduction
    
- Faster storage/transmission
    
- Sacrifices precision
    

Histograms demonstrate both ideas clearly:

- Exact frequency mapping → lossless
    
- Range-based binning → lossy
    

The lecture ultimately frames compression as an engineering decision based on:

- Accuracy requirements
    
- Storage limits
    
- Computational constraints
    
- Analytical goals

Tags: #statistics #machine-learning #data-science #statistical-modelling