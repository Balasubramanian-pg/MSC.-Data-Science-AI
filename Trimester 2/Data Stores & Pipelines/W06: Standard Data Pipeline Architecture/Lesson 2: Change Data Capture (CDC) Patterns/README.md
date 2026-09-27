# Lesson 2: Change Data Capture (CDC) Patterns

Here are structured notes on **Change Data Capture (CDC) Patterns**, based on industry sources and your course module context.

## What CDC Solves

CDC is a **data integration pattern** that detects and streams **row-level database changes** — inserts, updates, and deletes — as they happen, instead of re-copying entire tables on a schedule. It addresses three core limitations of batch-based synchronization:

- **Performance impact** — full table scans consume database resources and slow operational systems
- **Data freshness** — batch intervals create latency, meaning stale dashboards and outdated operational decisions
- **Deleted records** — standard queries cannot detect deletes unless soft deletes are implemented

> [!IMPORTANT]
> **CDC captures changes at the source with minimal overhead, enabling real-time pipelines and accurate change history.**

## Core CDC Approaches

There are **four main CDC patterns**, each with different trade-offs in performance, complexity, and capability.

### Log-Based CDC (The Standard)

Log-based CDC reads the database's **transaction log** (write-ahead log or WAL) to reconstruct row-level changes. The database writes all changes to the log before applying them to tables; CDC tools read these logs, parse change events, and emit them downstream.

**Advantages:**
- **Minimal performance impact** on source database — no queries against tables
- **Captures all changes including deletes**
- **No schema modifications required**
- **Preserves exact order of operations**
- **High throughput** — can process millions of events per minute

**Limitations:**
- Requires **elevated database permissions** and log access
- **Log format varies** by database system, creating vendor lock-in
- **Log retention policies** must accommodate CDC processing
- Some SaaS databases **do not expose their logs** at all

> [!IMPORTANT]
> **Log-based CDC is the most efficient and comprehensive approach — it reads existing logs without querying production tables, so source systems feel no additional load.**

### Trigger-Based CDC

Trigger-based CDC uses **database triggers** that fire on every INSERT, UPDATE, or DELETE, writing change records to a separate **shadow or audit table**. The pipeline then reads that audit stream.

**Advantages:**
- **Works with any database** that supports triggers
- **Can include custom business logic** directly in the trigger body (e.g., enriching events with user IDs)
- **Change data is explicitly stored and queryable**
- **Captures all change types** including deletes

**Limitations:**
- **Performance overhead on every write operation** — each transaction executes extra writes
- **Requires schema modifications** to add triggers and audit tables
- **Trigger maintenance complexity** — every schema change requires updating triggers
- **Can be disabled** by users with appropriate permissions

> [!IMPORTANT]
> **Trigger-based CDC captures every change type and works on any database, but it adds write overhead to every transaction and creates tight schema coupling.**

### Query-Based (Timestamp-Based) CDC

Query-based CDC **periodically queries tables** for changes, typically using timestamp columns like `updated_at` or `created_at`. A scheduled process runs filters such as `WHERE updated_at > last_processed_time` to identify modified records.

**Advantages:**
- **Simple to implement**
- **No special database permissions** required
- **Works with any database**

**Limitations:**
- **Cannot reliably detect deletes** — a deleted row simply disappears
- **Requires timestamp columns** to be present on all tables
- **Performance impact** from repeated full-row scans
- **Potential race conditions** with concurrent updates
- **Not truly real-time** — latency depends on poll interval

> [!IMPORTANT]
> **Timestamp-based CDC is the simplest to implement but cannot capture deletes — a fundamental limitation for accurate replication.**

### Snapshot Differential CDC

Snapshot differential compares **full snapshots** of tables taken at different points in time to identify what changed. It suits **small or legacy datasets** but has **high latency** and **no event context** — you see the net difference, not the individual operations.

## CDC Architecture Patterns

Four architecture patterns dominate production deployments in 2026.

### Pattern 1: Log-Based CDC with Debezium (The Traditional Pattern)

Source Database → Debezium (Kafka Connect plugin) → Kafka Topics → Multiple Independent Consumers. Debezium reads the database replication log and publishes change events to Kafka; each downstream system (search indexer, data lake loader, stream processor, notification service) is an independent Kafka consumer.

**Use cases:** multi-system fan-out, event replay, decoupled teams

**Trade-offs:** High operational burden — Kafka brokers, Kafka Connect workers, Debezium config, and schema registry each have their own failure modes.

### Pattern 2: Embedded CDC in a Streaming Database (The Simplified Pattern)

CDC logic runs **inside a streaming database**, eliminating the need for separate Kafka infrastructure. This reduces moving parts and operational overhead.

### Pattern 3: Managed CDC (The Outsourced Pattern)

A **managed service** handles CDC capture, routing, and delivery. This minimizes operational burden but introduces vendor dependency and potential cost implications.

### Pattern 4: Hybrid CDC

Combines **Debezium with a streaming database**, using Debezium for capture and the streaming database for processing and querying. This provides both flexibility and query capability.

> [!IMPORTANT]
> **The traditional Debezium + Kafka pattern offers the most flexibility but the highest operational burden — managed and embedded patterns reduce complexity at the cost of control.**

## CDC Approach Comparison

| Method | Source Load | Captures Deletes? | Latency | Setup Complexity |
|---|---|---|---|---|
| **Log-based** | Minimal — reads existing log | ✅ Yes | Seconds | High (permissions, log access) |
| **Trigger-based** | High — extra write per mutation | ✅ Yes | Seconds | Medium (schema changes) |
| **Query-based** | Full scan per poll | ❌ No | Poll interval | Low |
| **Snapshot differential** | High — full snapshots | ✅ Yes (net difference) | High | Low |

Source:

## Best Practices for CDC Implementation

- **Start small** — validate CDC on a single table or limited dataset before expanding
- **Manage log retention** — ensure logs are retained long enough for CDC processing to complete
- **Test schema evolution** — CDC pipelines must handle source schema changes gracefully
- **Build error handling** — account for trigger failures, log parsing errors, and destination write conflicts
- **Use upsert semantics (MERGE, not blind inserts)** — applying CDC events correctly requires merge logic at the destination
- **Handle deletes as first-class events** — log-based CDC flags deleted rows explicitly; the destination merge must process them
- **Prioritize security** — CDC often requires elevated database permissions; secure credentials and access
- **Document troubleshooting** — log format quirks and vendor-specific behaviors vary widely

> [!IMPORTANT]
> **Capturing changes is only half the pipeline — orchestration, error recovery, idempotent loading, and delete handling are what make CDC production-ready.**

## Key Takeaway

CDC has evolved from a niche database trick into a **foundational pattern for real-time data systems**. The choice of CDC approach and architecture pattern depends on your **source database capabilities, latency requirements, operational capacity, and whether you need to capture deletes**. For most production use cases, **log-based CDC with Debezium** is the de-facto standard — it offers the best balance of performance, fidelity, and completeness, though it requires the most operational investment.

> [!IMPORTANT]
> **Log-based CDC is the production standard — it reads existing transaction logs with minimal source impact, captures all change types including deletes, and preserves exact operation order.**
