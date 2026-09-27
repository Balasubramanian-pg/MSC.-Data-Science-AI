# Migration in progress
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
- **Database transaction logs** — SQL Server and similar databases expose row-level ch