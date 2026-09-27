# Migration in progress
# W05: Modern Table Formats - Iceberg, Hudi, Delta Lake

As data architectures evolved from Data Lakes to Lakehouses, a critical gap emerged: object storage (like S3) is immutable and lacks transaction support. Modern table formats solve this by adding a metadata layer on top of raw files, enabling ACID transactions, schema evolution, and time travel. This lesson compares the three leading open-table formats—Apache Iceberg, Apache Hudi, and Delta Lake—and guides you in choosing the right one for your workload.

```mermaid
flowchart TD
    A[Modern Table Formats] --> B[Core Capabilities]
    A --> C[Apache Iceberg]
    A --> D[Apache Hudi]
    A --> E[Delta Lake]
    B --> B1[ACID Transactions]
    B --> B2[Schema Evolution]
    B --> B3[Time Travel]
    C --> C1[Hidden Partitioning]
    C --> C2[Engine Agnostic]
    D --> D1[Upsert Optimization]
    D --> D2[Streaming Focus]
    E --> E1[Databricks Origin]
    E --> E2[Spark Integration]
```

## Why Do We Need Modern Table Formats?

Traditional Data Lakes stored data as flat files (CSV, JSON, Parquet). While cheap and scalable, they suffered from significant limitations:

1.  **No Atomicity**: If a write job failed halfway, you ended up with partial/corrupt data.
2.  **No Updates/Deletes**: Updating a single record required rewriting the entire file or partition.
3.  **Schema Rigidity**: Adding a column often broke downstream readers.
4.  **Small File Problem**: Streaming ingestion created thousands of tiny files, slowing down queries.
5.  **Partitioning Complexity**: Users had to know the physical directory structure to query efficiently.

Modern table formats introduce a **metadata layer** that tracks file locations, versions, and schemas, effectively turning object storage into a reliable database.

## Core Capabilities Shared by All Three

Regardless of the specific format, all three provide these essential Lakehouse features:

-   **ACID Transactions**: Ensure data consistency during concurrent reads and writes.
-   **Schema Evolution**: Allow adding, dropping, or renaming columns without breaking existing pipelines.
-   **Time Travel**: Query data as it existed at a specific point in time (useful for auditing and reproducibility).
-   **Upserts/Merges**: Efficiently update existing records or insert new ones based on a key.
-   **Compaction**: Automatically merge small files into larger ones for better query performance.

## Apache Iceberg

Developed by Netflix and now an Apache Top-Level Project, Iceberg was designed for huge analytic tables where performance and engine interoperability are critical.

### Key Features

-   **Hidden Partitioning**: Users define logical partitions (e.g., `date`), but Iceberg manages the physical layout. It can evolve partition schemes without rewriting data.
-   **Manifest Files**: Uses a tree-like metadata structure (Snapshot -> Manifest List -> Manifest File -> Data File) to quickly prune irrelevant data.
-   **Engine Agnostic**: Strong support across Spark, Trino, Presto, Flink, and Hive.
-   **Vendor Neutral**: Not tied to any specific cloud or company.

### Best For

-   Multi-engine environments (e.g., using Spark for ETL and Trino for BI).
-   Large-scale historical analytics.
-   Organizations wanting to avoid vendor lock-in.

> [!Tip]
> **Iceberg’s Hidden Partitioning is a game-changer**: In traditional systems, if you change how you partition data (e.g., from `year/month` to `date`), you must rewrite all data. Iceberg allows you to change partition specs logically without touching the underlying files.

## Apache Hudi (Hadoop Upserts Deletes and Incrementals)

Developed by Uber, Hudi was built to solve the problem of ingesting streaming data into Hadoop/S3 while supporting fast upserts.

### Key Features

-   **Indexing**: Maintains indexes to locate records quickly for upserts, making it highly efficient for row-level updates.
-   **Two Table Types**:
    -   **Copy-on-Write (CoW)**: Optimized for read-heavy workloads; rewrites files on update.
    -   **Merge-on-Read (MoR)**: Optimized for write-heavy/streaming workloads; logs updates separately and merges them at read time.
-   **Incremental Processing**: Natively supports reading only changed data since the last commit, ideal for incremental ETL.

### Best For

-   High-frequency streaming ingestion with frequent updates.
-   Use cases requiring low-latency upserts (e.g., order status updates).
-   Incremental data pipelines.

## Delta Lake

Developed by Databricks and donated to the Linux Foundation, Delta Lake is tightly integrated with the Apache Spark ecosystem.

### Key Features

-   **Transaction Log**: Uses a single JSON log file (`_delta_log`) to track commits, making it simple and robust.
-   **Optimize Command**: Built-in tools for Z-Ordering (co-localizing related data) and compaction.
-   **Unity Catalog Integration**: Seamless governance and security when used within the Databricks platform.
-   **Spark Native**: Performance is highly optimized for Spark jobs.

### Best For

-   Organizations heavily invested in Databricks or Spark.
-   Teams seeking simplicity and ease of setup.
-   Workloads inv