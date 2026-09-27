# Lesson 3: Use Case - ETL Pipeline with PySpark
Use Case: ETL Pipeline with PySpark:

Apache Spark is a distributed computing framework designed for fast processing of large-scale datasets across a cluster of machines. PySpark exposes the Spark programming model to Python developers, making it a primary choice for implementing the transformation phase of traditional ETL pipelines. In an ETL architecture, PySpark acts as the intermediate compute engine that extracts data from raw sources, applies cleansing and business logic in memory, and writes structured outputs to a target repository.

Architecture and Execution Model:

- The Spark application runs using a master driver process that coordinates work across multiple distributed executor nodes.
- PySpark DataFrames provide a structured, tabular abstraction built on top of resilient distributed datasets.
- Lazy evaluation ensures that Spark builds an execution plan using a directed acyclic graph and optimizes transformations before executing any physical computation.
- Transformations are classified into narrow transformations, such as filters and column derivations, and wide transformations, such as joins and aggregations that require network shuffles across executors.

Extract Phase in PySpark:

- Spark can ingest data from multiple file formats including comma-separated values, JSON, Avro, and columnar Parquet files.
- Reading data from relational databases is achieved using standard Java Database Connectivity connectors with configurable partition boundaries.
- Schema inference on large text files introduces overhead because Spark must scan the file twice to determine data types.
- Explicit schema declaration using StructType and StructField objects improves ingestion performance and enforces strict data types.
- Read modes such as permissive, dropMalformed, and failFast allow engineers to determine how corrupt records are processed during file ingestion.

Transform Phase in PySpark:

- Data cleansing operations cast raw string fields into target numeric or timestamp types, trim extra whitespace, and normalize string casing.
- Missing values and nulls are addressed by dropping incomplete rows or applying imputation using constant values, column means, or forward-fill logic.
- Complex conditional columns and flag definitions are constructed using conditional expressions such as the when and otherwise methods.
- Spark window functions allow data engineers to calculate running totals, moving averages, and analytical rankings over partitioned subsets of data without collapsing rows.
- Broadcast joins optimize performance when joining large fact datasets with small lookup tables by copying the lookup table directly to all worker nodes, eliminating costly shuffles.
- Repartitioning redistributes data evenly across cluster nodes to maximize parallelism, while coalesce reduces the number of partitions to prevent writing excessive small output files.
- Important: Unnecessary shuffling during joins and group-by operations is the leading cause of memory spill to disk and pipeline degradation in PySpark transformations.

Load Phase in PySpark:

- Transformed DataFrames are written out to durable storage targets including cloud object storage, distributed file systems, or analytical databases.
- Writing to columnar formats like Parquet or Delta Lake compresses data on disk and speeds up downstream analytical queries.
- Partitioning the output directory by time attributes or geographic regions allows query engines to skip irrelevant folders during reads.
- Common write modes include append for adding new rows to existing tables, overwrite for replacing entire tables or partitions, and errorIfExists to prevent unintended writes.
- Loading data back to relational databases via JDBC requires tuning batch sizes and write concurrency to avoid overloading target database connection limits.

Pipeline Monitoring and Operational Maintenance:

- The Spark Web UI serves as the primary tool to track running jobs, inspect individual execution stages, and identify skewed partitions.
- Out of memory errors typically indicate that executor memory is insufficient, shuffle partitions are too small, or a skewed key is overloading a single worker node.
- Memory management involves balancing storage memory for cached datasets against execution memory allocated for sorting, shuffling, and joins.

Key Takeaways:

- PySpark functions as a powerful intermediate processing layer within an ETL pipeline by distributing heavy computations across a compute cluster.
- Declaring explicit schemas prevents costly read passes and provides reliable data quality controls during extraction.
- The transform stage handles cleansing, standardization, conditional logic, windowing, and joins using in-memory distributed DataFrames.
- Performance tuning in PySpark ETL relies on broadcast joins, proper partition sizing, and minimizing network shuffles across executors.
- The load stage leverages partition schemes and compressed columnar formats such as Parquet to optimize downstream query access.
