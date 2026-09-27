# Migration in progress
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
| **Key dependency** | Batch framework + streaming framework | High-performance st