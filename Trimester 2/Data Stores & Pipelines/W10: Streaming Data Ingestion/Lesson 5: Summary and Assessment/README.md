# Migration in progress
# Lesson 5: Summary and Assessment

Summary and Assessment:

This lesson summarizes the foundational principles, distributed technologies, and operational strategies covered throughout Week 10 on Streaming Data Ingestion. It reviews core concepts spanning event-driven architectures, Apache Kafka internals, client development patterns, Spark Structured Streaming mechanics, temporal semantics, and practical real-time architectures. Conceptual questions and scenario-based engineering exercises are included below to prepare for examinations and technical design evaluations.

Comprehensive Week 10 Review:

- Streaming data ingestion processes continuous, unbounded streams of events with low latency, contrasting with batch models that process bounded historical files at scheduled intervals.
- Apache Kafka serves as a distributed, append-only commit log. Topics are divided into partitions to provide parallel processing and horizontal scaling across broker nodes.
- Message ordering in Kafka is strictly guaranteed only within an individual partition through monotonically increasing sequential offsets. Assigning keys to messages hashes records to specific partitions.
- Kafka achieves performance by writing sequentially to disk segments, utilizing the operating system page cache, and leveraging zero-copy network data transfers.
- In consumer groups, each partition is read by exactly one consumer at any given time. Consumer scaling is capped by the total partition count of the subscribed topic.
- Manual offset commits allow developers to implement reliable at-least-once delivery by acknowledging offsets only after records have been processed and saved.
- Spark Structured Streaming models streaming data as an append-only unbounded table, unifying the programming interface across batch and stream computations using DataFrames and SQL.
- Structured Streaming supports three output modes: append mode writes only newly finalized rows, update mode writes modified rows, and complete mode recalculates and rewrites the entire state table.
- Fault tolerance and recovery in Structured Streaming rely on write-ahead logs and state snapshots persisted to a durable checkpoint storage directory.
- Time semantics require distinguishing between event time, ingestion time, and processing time. Watermarking defines how long stream engines buffer out-of-order records before closing time windows.

Assessment Preparation: Conceptual Questions:

Question 1: Why does Apache Kafka guarantee message ordering within a partition but not across an entire topic?
- Answer: Partitions are physically independent log files distributed across different broker nodes. Kafka consumers read independently from each partition without cross-broker synchronization to achieve high throughput and horizontal scalability. Consequently, global topic ordering across partitions is omitted to prevent cluster-wide locking bottlenecks.

Question 2: Under what conditions must an engineer use complete mode versus append mode in Spark Structured Streaming?
- Answer: Complete mode is mandatory for streaming queries that perform aggregations without watermarks, because the query must output the entire recalculated aggregation table upon every trigger. Append mode is used for stateless transformations, or for stateful windowed aggregations configured with an event-time watermark where only finalized historical rows are emitted.

Question 3: How does an event-time watermark prevent state store memory exhaustion during continuous windowed aggregations?
- Answer: Watermarking tracks the maximum observed event time minus an allowable delay threshold. When the watermark advances past the end boundary of an aggregation window, the engine closes the window, emits the final aggregat