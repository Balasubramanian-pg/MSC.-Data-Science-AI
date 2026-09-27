# Migration in progress
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
- Spark window functions allow data engineers to calculate running totals, moving averages, and analytical rankings over partitioned subse