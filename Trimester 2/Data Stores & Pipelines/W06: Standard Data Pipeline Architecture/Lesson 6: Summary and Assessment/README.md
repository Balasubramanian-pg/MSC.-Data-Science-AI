# Lesson 6: Summary and Assessment

Here are structured notes on **Summary and Assessment**, consolidating the core concepts from the entire module and providing assessment preparation materials.

## Module Recap: The Full Pipeline Picture

This module traced the standard data pipeline architecture from **ingestion through processing to serving**, covering the patterns and trade-offs that define modern data systems.

**The end-to-end flow:** Data Sources → Ingestion → Processing/Transformation → Storage → Governance/Quality → Consumption

### What Each Lesson Covered

- **Lesson 0 — Module Introduction:** Pipeline components (ingestion, transformation, storage, orchestration, monitoring, delivery, quality/governance), architecture layers, the Medallion (Bronze–Silver–Gold) pattern, and batch vs. streaming vs. Lambda vs. Kappa patterns.
- **Lesson 1 — Data Ingestion Patterns:** Batch vs. streaming, full vs. incremental extraction, push vs. pull, file-based vs. API-based, and CDC as a bridge between batch and streaming.
- **Lesson 2 — CDC Patterns:** Log-based, trigger-based, timestamp-based, and snapshot differential CDC; four architecture patterns (Debezium+Kafka, embedded streaming DB, managed CDC, hybrid).
- **Lesson 3 — Lambda and Kappa:** Lambda’s three layers (batch, speed, serving) and dual-codebase tax; Kappa’s single streaming pipeline with log replay; the “Kappa-ish” hybrid.
- **Lesson 4 — Event-Driven Pipelines:** Producers, brokers, consumers, CDC, schema registry; fan-in/fan-out; event sourcing; push vs. pull; anti-patterns.
- **Lesson 5 — Food Delivery Deep Dive:** Two-plane architecture (transactional + analytical), production case studies (Swiggy, Uber, iFood), and reference architecture.

> **Important**
> **The standard pipeline architecture separates ingestion, processing, storage, and serving into distinct layers — each layer can be independently scaled and its technology chosen based on latency, cost, and consistency requirements.**

## Key Architecture Concepts Summary

### The Five Layers of a Standard Pipeline

| Layer | Purpose | Typical Technologies |
|---|---|---|
| **Ingestion** | Collect raw data from sources | Kafka, Debezium, Airbyte, Fivetran |
| **Storage** | Persist data for scalable access | S3, ADLS, Iceberg, Hudi, Delta Lake |
| **Processing** | Clean, validate, transform, enrich | Spark, Flink, dbt, SQL |
| **Consumption** | Serve curated data to users/apps | Snowflake, BigQuery, Databricks, BI tools |
| **Orchestration & Monitoring** | Coordinate, schedule, monitor quality | Airflow, Dagster, Prefect, Great Expectations |

The end-to-end flow: **Data Sources → Ingestion → Processing → Storage → Governance/Quality → Consumption** 

### Medallion Architecture (Bronze–Silver–Gold)

| Layer | What It Holds | Key Property |
|---|---|---|
| **Bronze** | Raw, ingested data as-is | Immutable ground truth; enables reprocessing after bug fixes  |
| **Silver** | Cleaned, validated, deduplicated data | Trustworthy analytics/ML source; quality rules live here  |
| **Gold** | Business aggregates, ML predictions | Ready for dashboards and decision-making |

> **Important**
> **The Bronze layer is the recoverable ground truth — when a transformation has a bug, you can reprocess from Bronze without re-fetching from the source, even if the source no longer has the data.** 

## Data Ingestion Patterns: Key Takeaways

### Batch vs. Streaming Decision

- **Batch ingestion** processes data in scheduled chunks. It is the **simplest pattern, cheapest to run, and the right default** unless requirements demand otherwise .
- **Streaming ingestion** processes events as they arrive. It delivers the **lowest latency** and is ideal for real-time dashboards, alerting, and anomaly detection.
- **The choice between batch, streaming and hybrid determines the architecture, cost and complexity of everything downstream** .

### Extraction Types

| Type | What It Does | When to Use |
|---|---|---|
| **Full load** | Drop target table, reload from source | Small tables (<10M rows), slowly changing reference data  |
| **Incremental load** | Process only new/changed records | Large tables where full loads are too expensive (1% daily change on 1TB = 10GB instead of 1TB)  |
| **Snapshot comparison** | Full table today vs. yesterday, diff to find changes | Sources with no reliable watermark; requirements to detect deletes  |

### Push vs. Pull

- **Push sources** actively send data to a pipeline as it becomes available.
- **Pull sources** require the pipeline to actively query or retrieve data.
- Push patterns are generally more performant — one study found push-based approaches can be **up to 2x more performant** compared to pull-based designs.

> **Important**
> **Incremental extraction processes only what changed — this is the foundation of modern efficient pipelines. A 1TB table with 1% daily changes means processing 10GB instead of 1TB.**

## Change Data Capture (CDC): Key Takeaways

### The Four CDC Approaches

| Method | Source Load | Captures Deletes? | Latency | Setup Complexity |
|---|---|---|---|---|
| **Log-based** | Minimal — reads existing log | ✅ Yes | Seconds | High (permissions, log access) |
| **Trigger-based** | High — extra write per mutation (10–30% overhead) | ✅ Yes | Seconds | Medium (schema changes)  |
| **Timestamp-based** | Full scan per poll | ❌ No | Poll interval | Low  |
| **Snapshot differential** | High — full snapshots | ✅ Yes (net difference) | High | Low |

**Log-based CDC is the gold standard:** low overhead, captures deletes, preserves ordering. Debezium on MySQL sustains roughly **10K changes/sec with under 1% overhead** on the source database .

### CDC Architecture Patterns

- **Debezium + Kafka** — maximum flexibility, highest operational burden (Kafka brokers, Connect workers, schema registry each have failure modes).
- **Embedded streaming DB** — CDC logic runs inside the streaming database; fewer moving parts.
- **Managed CDC** — outsourced to a service; minimal operational burden but vendor dependency.
- **Hybrid** — Debezium for capture, streaming database for processing and querying.

> **Important**
> **Log-based CDC is the production standard — it reads existing transaction logs with minimal source impact, captures all change types including deletes, and preserves exact operation order.**

## Lambda vs. Kappa: Key Takeaways

### The Core Trade-off

**Lambda** runs two pipelines (batch for correctness, stream for freshness) and pays with **dual codebases that drift out of sync**. **Kappa** collapses both into one streaming job and **replays the retained log for reprocessing** .

**Jay Kreps’ summary:** *“Maintaining code that needs to produce the same result in two complex distributed systems is exactly as painful as it seems like it would be.”* 

### Side-by-Side Comparison

| Dimension | Lambda | Kappa |
|---|---|---|
| **Pipelines** | Two (batch + stream) | One (stream-only) |
| **Codebases** | Dual — batch and streaming logic | Single — one processing model |
| **Accuracy** | High — batch recomputes from full history | High — if streaming engine handles all aggregations |
| **Operational cost** | High — two on-call rotations, two scaling profiles | Lower — one pipeline to maintain |
| **Reprocessing** | Batch job recomputes from full dataset | Replay the log through updated streaming job |
| **Key dependency** | Batch framework + streaming framework | High-performance streaming infrastructure |

### When to Choose Which

- **Default to Kappa** when your streaming engine can express all required analytics and log retention covers your worst-case replay window .
- **Fall back to Lambda (or a Kappa-ish hybrid)** when regulatory batch ground truth is required or reprocessing terabytes through a streaming engine is infeasible .
- **The deciding dimension is whether the batch layer earns its operational cost.** 

> **Important**
> **Default to Kappa when streaming can express everything and log retention is sufficient; fall back to Lambda when regulatory batch ground truth or massive reprocessing demands it.**

## Event-Driven Pipelines: Key Takeaways

### Core Components

- **Producers** — data sources that emit events when state changes occur.
- **Broker** — Kafka, Pulsar, or Kinesis stores and routes events to subscribers .
- **Consumers** — pipelines and jobs that process each event.
- **CDC** — streams database mutations as events in real time without full table scans, **cutting warehouse latency to seconds** .
- **Schema Registry** — enforces event format contracts between producers and consumers.

### Push vs. Pull in Event-Driven Contexts

- **Push architectures** deliver events the moment they occur with **no idle compute cost** — lower latency, enables dependent runs.
- **Pull architectures** avoid unnecessary runs but **risk missing events between polling intervals** and consume compute during idle periods.

### Common Anti-Patterns

- **Subscribing to broad event streams without filtering** — wastes compute on events that are immediately discarded.
- **Using polling-based event detection instead of push-based delivery** — adds latency and consumes compute during idle periods.
- **Including full data payloads in events** rather than event references — inflates event size and network transfer time.

> **Important**
> **Filter at the bus, keep events lightweight, use idempotency keys, and monitor event-to-invocation latency — these four practices prevent the most common event-driven failures.**

## Assessment Preparation: Key Questions to Review

### From the Module Quiz Bank

1. **In the medallion architecture, the Bronze layer holds:**
   - A. Raw, ingested data as-is — the immutable ground truth ✅
   - B. Business aggregates
   - C. ML predictions
   - D. Cleaned and deduplicated data 

2. **The Silver layer is where you:**
   - D. Clean, validate, deduplicate, and conform data to a consistent schema ✅ 

3. **Keeping an immutable Bronze layer is valuable mainly because:**
   - C. You can reprocess downstream data after fixing a bug without re-fetching from the source ✅ 

4. **An orchestrator (like Airflow) manages a pipeline by:**
   - D. Running tasks in dependency order, on schedule, with retries and observability ✅ 

5. **A task is idempotent if:**
   - B. Running it twice produces the same result as running it once ✅ 

6. **The classic non-idempotent anti-pattern is:**
   - A. Appending data without keys, so a retry duplicates rows ✅ 

7. **A lakehouse format like Delta Lake adds to Parquet:**
   - A. ACID transactions, schema enforcement, time travel, and atomic MERGE ✅ 

8. **Time travel in Delta Lake lets you:**
   - C. Query a previous version of the table (for debugging, auditing, reproducibility) ✅ 

9. **A good data-quality gate should, on bad input:**
   - C. Fail loudly and stop, rather than shipping garbage to consumers ✅ 

### Practice Scenarios to Review

**Scenario 1: IoT Sensor Pipeline**
A company needs to build a data pipeline that processes streaming data from IoT sensors in real-time, detects anomalies, and stores results for further analysis. The pipeline should handle late-arriving data and provide exactly-once processing guarantees.

**What architecture should they design?**
- Consider: Kafka for ingestion, Flink for stream processing with event-time windowing, idempotent sinks with upsert semantics, checkpointing for exactly-once.

**Scenario 2: Late-Arriving Data**
A data pipeline needs to handle late-arriving data — events can arrive up to 24 hours after their actual occurrence time.

**What architecture should they design?**
- Consider: Event-time processing, watermarking with allowed lateness, session windows, a Bronze layer for replay.

**Scenario 3: CDC for Legacy Database**
A legacy application produces data in CSV format and the source database does not expose transaction logs. Deletes must be captured for regulatory compliance.

**What CDC approach should they use?**
- Consider: Trigger-based CDC (works without log access, captures deletes) or snapshot differential (reliable but expensive), depending on write volume tolerance.

> **Important**
> **The most common assessment mistake is confusing the Bronze layer's purpose — it is not for analytics, but for recovery and reprocessing. The Silver layer is where quality rules live and where analytics reads from.**

## Best Practices Summary

- **Define latency requirements first** — seconds vs. sub-second determines your entire architecture.
- **Ensure idempotency at every layer** — retries are inevitable; deduplicate by key.
- **Use event-time processing, not processing-time** — late data is a daily reality, not an edge case.
- **Separate operational and analytical planes** — never query the transactional database for analytics.
- **Plan for schema evolution** — use a schema registry and backward-compatible changes.
- **Monitor freshness as a first-class metric** — measure end-to-end latency from source event to dashboard update.
- **Consolidate pipelines where possible** — fewer pipelines mean less maintenance, better governance, lower cost.
- **Handle small files in streaming ingestion** — use row-group-level merging or declarative pipeline optimization.
- **Design for reprocessing** — keep raw data in a durable Bronze layer so you can replay history when requirements change.
- **Apply AI governance to AI agents** — same permissions, credentials, and audit trails as human users.

> **Important**
> **The most impactful practice across all lessons is separating ingestion from processing and keeping a durable raw layer — this preserves auditability, enables reprocessing, and decouples pipeline stages for independent scaling.**

## Key Takeaways for the Module

- **Standard pipeline architecture separates concerns** into ingestion, processing, storage, and serving — each layer independently scalable.
- **Batch vs. streaming is a business decision**, not a technology preference — start with the latency requirement.
- **CDC is the bridge** between batch and streaming — log-based CDC is the production standard for its minimal source impact and completeness.
- **Kappa is the default for new architectures** — but Lambda remains valid when batch-grade correctness or massive reprocessing is non-negotiable.
- **Event-driven pipelines shift the unit of work** from job runs to individual events — this makes real-time a configuration choice, not an architectural commitment.
- **Production platforms (Swiggy, Uber, iFood) prove** that freshness is a product requirement — and that pipeline consolidation and declarative design reduce operational burden dramatically.

> **Important**
> **The single most important architectural principle from this module: design workloads as streams first, then choose your processing speed — this makes real-time a configuration choice rather than an architectural commitment.**
