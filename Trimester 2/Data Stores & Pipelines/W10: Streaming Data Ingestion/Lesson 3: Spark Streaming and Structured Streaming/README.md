# Migration in progress
# Lesson 3: Spark Streaming and Structured Streaming

Spark Streaming and Structured Streaming:

Apache Spark provides distributed processing capabilities for continuous streaming data. The framework evolved from its original RDD-based Discretized Streams model into Structured Streaming, which integrates directly with Spark DataFrames, Datasets, and SQL engines. Structured Streaming simplifies stream processing by allowing developers to express streaming computations using the exact same programmatic APIs and query optimizer used for standard batch data processing.

Evolution from Legacy DStreams to Structured Streaming:

- Legacy Discretized Streams: The older Spark Streaming framework divided continuous input streams into discrete mini-batches represented as Resilient Distributed Datasets across small time intervals.
- Limitations of DStreams: DStreams operated strictly on processing time rather than event time, required complex low-level code for stateful calculations, and used an entirely different programming interface than Spark SQL.
- Structured Streaming introduction: Built directly on top of the Spark SQL Catalyst engine and Tungsten execution backend, offering unified syntax, schema enforcement, and declarative query planning.
- Unbounded table model: Structured Streaming treats an incoming data stream as an unbounded table where new incoming events are conceptually appended as new rows to an infinitely growing table.

Input Sources and Ingestion Mechanics:

- Initiating stream readers: Applications invoke spark.readStream instead of spark.read to initialize streaming inputs.
- Kafka source integration: Built-in Kafka connectors consume topics directly, exposing metadata columns such as key, value, topic, partition, offset, and message timestamp.
- File sources: Monitors a directory on local storage, cloud object storage, or HDFS for newly arrived files in formats such as CSV, JSON, Parquet, or ORC.
- Delta Lake source: Supports reading transaction log changes continuously from a Delta table as a high-throughput streaming source.
- Socket and memory sources: Used exclusively for local development, unit testing, and educational debugging due to lack of end-to-end fault tolerance.

Output Modes in Structured Streaming:

- Append Mode: Only records added to the result table since the last processing trigger are written to the external sink. It is the default mode for stateless queries and queries utilizing event-time watermarks.
- Complete Mode: The entire updated result table is re-written to the target sink after every trigger. It is required for stateful aggregations that recalculate all summary metrics across the entire stream history.
- Update Mode: Only the specific rows that were updated or modified since the last trigger run are written to the sink. If a query contains no aggregations, update mode behaves identically to append mode.

Execution Triggers and Latency Controls:

- Default micro-batching: Executes a new micro-batch as soon as the previous micro-batch finishes pro