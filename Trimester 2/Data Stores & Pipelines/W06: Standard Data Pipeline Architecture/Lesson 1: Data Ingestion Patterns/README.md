# Lesson 1: Data Ingestion Patterns

Here are structured notes on **Data Ingestion Patterns**, based on industry sources and your course module context.

## The Fundamental Choice: Batch vs. Streaming

Data ingestion runs in one of two primary modes:

- **Batch ingestion** moves data at **fixed intervals or on a trigger**, loading files, database extracts, or query results in bounded chunks. It is **simple to reason about**, tolerates source downtime, and suits **nightly reporting, regulatory reporting cycles, and historical data loads**.
- **Streaming ingestion** continuously processes data from event sources like **Kafka, Kinesis, Pub/Sub, or Event Hubs** as records arrive. It delivers the **lowest latency** and is ideal for **real-time dashboards, alerting systems, and anomaly detection**.

> [!IMPORTANT]
> **Batch is simpler and cheaper; streaming is faster and more complex — choose based on how fresh your data needs to be.**

## Extraction Types: Full vs. Incremental vs. Streaming

Extraction type determines how you capture data from source systems and directly impacts **timeliness and efficiency**.

- **Full extraction** reads the **entire dataset** from the source system during each ingestion run. It works well when source systems don't support change tracking, data volumes are small, or you need to rebuild destination tables from scratch periodically. It becomes **impractical as data volumes grow** — reprocessing millions of records when only a few thousand changed wastes compute resources.
- **Incremental extraction** processes **only new or changed records** since the last ingestion run. It requires a reliable **change indicator** (timestamp, sequence number, or version column), **state management** to track the last processed position, and logic to handle late-arriving or out-of-order records. It **significantly improves efficiency** for large datasets.
- **Streaming extraction** provides **near real-time data capture** through continuous processing. Jobs remain active and process records as they arrive. It requires always-on infrastructure but delivers the **lowest latency**.

> [!IMPORTANT]
> **Incremental extraction processes only what changed — this is the foundation of modern efficient pipelines.**

## Change Data Capture (CDC)

**Change data capture (CDC)** is a specialized extraction pattern that captures **individual row-level changes**, including **inserts, updates, and deletes**. Unlike simple incremental extraction, CDC **preserves the operation type** for each change.

A typical CDC feed contains:
- **Data columns** — the actual values for each field
- **Operation type** — INSERT, UPDATE, or DELETE
- **Sequence column** — a timestamp or sequence number that determines the order of changes

CDC offers **reduced latency** (changes flow within minutes rather than hours), **lower costs** (processing fewer records), and **minimal source impact** (reading change logs puts less load on production databases than full table scans).

**Source systems produce CDC records through**:
- **Database transaction logs** — SQL Server and similar databases expose row-level changes
- **Change data feeds** — Delta tables and Azure Cosmos DB provide built-in change tracking
- **Periodic snapshots** — some systems require you to compare snapshots to determine changes

> [!IMPORTANT]
> **CDC enables accurate replication of deletes and maintains audit trails — capabilities that simple incremental extraction cannot support.**

## Push vs. Pull Ingestion

Data sources generally fall into one of two categories:

- **Push sources** actively **send data to a pipeline** as the data becomes available. This can occur in **real time or in batches** at certain intervals. CRM systems that generate end-of-day reports are a common example.
- **Pull sources** require the **data pipeline to actively query or retrieve data** from the data source. This can use real-time streaming methods or periodic queries for batch processing. Social media APIs and threat intelligence feeds are common pull sources.

Push patterns are generally more performant — one study found push-based approaches can be **up to 2x more performant** compared to pull-based designs. Pull patterns are useful when data is needed **on demand**, such as during real-time data augmentation scenarios.

> [!IMPORTANT]
> **Push sources send data to you; pull sources require you to fetch it — the choice affects pipeline architecture and latency.**

## File-Based vs. API-Based Ingestion

When data arrives as files rather than from transactional systems, the **file format influences your ingestion design**.

- **File-based ingestion** exchanges data via **flat files (CSV, Parquet, text)**. It is best for **batch processing and static data**, is **cost-effective**, and works with legacy systems. However, files often require **all required fields to be present** to process successfully, and uploaded files may sit in a **queue before processing**.
- **API-based ingestion** exchanges data via **JSON** in **real-time or near real-time**. Updates are processed **immediately**, with **immediate confirmation of success or failure**. APIs are preferred when there is a need for **frequent or immediate data exchange** or when integrating with complex systems.

> [!IMPORTANT]
> **File-based ingestion is simpler and cheaper for bulk data; API-based ingestion is necessary when you need real-time sync or complex interactions.**

## Best Practices for Data Ingestion

- **Define your latency requirement first** — seconds versus sub-second determines your entire architecture.
- **Ensure data is idempotent** to prevent duplicates when retries occur.
- **Implement backpressure handling** to manage data flow under variable load.
- **Use windowing techniques** for time-based aggregation in streaming pipelines.
- **Choose between full and incremental loads** based on data volume and change tracking support.
- **Hybrid workflows** — mixing full and incremental modes — are efficient for handling real-world ingestion needs across diverse data sources.

> [!IMPORTANT]
> **Data ingestion is where every pipeline starts — the choice between batch, streaming, and hybrid determines the architecture, cost, and complexity of everything downstream**.
