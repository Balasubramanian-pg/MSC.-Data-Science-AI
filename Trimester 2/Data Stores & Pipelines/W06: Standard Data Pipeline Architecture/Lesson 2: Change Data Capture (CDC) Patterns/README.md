# Migration in progress
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

Snapshot differential compares **full snapshots** of tables ta