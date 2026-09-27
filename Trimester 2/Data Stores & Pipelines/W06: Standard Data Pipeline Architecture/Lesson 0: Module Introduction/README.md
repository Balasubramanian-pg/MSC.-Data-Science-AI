# Lesson 0: Module Introduction

Here are structured notes on Standard Data Pipeline Architecture, based on current industry sources.

## Core Components of a Data Pipeline

A data pipeline moves data from sources through ingestion, transformation, storage, and delivery to enable analysis and decision-making. The **seven core components** that separate a well-designed pipeline from a fragile one are:

- **Data Ingestion** – Pulls records from source systems (databases, SaaS apps, IoT devices, log files, APIs) and passes them to the transformation layer.
- **Transformation** – Validates schema, cleans data, and outputs standardized records; includes deduplication, standardization, and enrichment.
- **Storage** – Writes transformed data to the appropriate destination, such as data lakes or data warehouses.
- **Orchestration** – Triggers each step in order, monitors for completion, and handles failures with retries or quarantine routing.
- **Monitoring & Observability** – Tracks the health of each step and alerts when something goes wrong.
- **Delivery** – Makes final data available to dashboards, reports, or downstream applications.
- **Data Quality & Governance** – Runs checks at multiple points to catch issues before they propagate.

> [!IMPORTANT]
> **Orchestration and monitoring are what separate a production-ready pipeline from a fragile script.**

## Standard Architecture Layers

Modern data pipeline architectures are commonly organized into **five interconnected layers**:

- **Ingestion Layer** – Collects raw data from APIs, databases, IoT devices, and SaaS applications.
- **Storage Layer** – Stores data in centralized repositories (data lakes or warehouses) for scalable access and long-term retention.
- **Processing Layer** – Cleans, validates, transforms, and enriches raw data for downstream use.
- **Consumption Layer** – Delivers curated data to BI platforms, ML models, and operational applications.
- **Monitoring & Orchestration Layer** – Coordinates execution, schedules workflows, monitors quality, and tracks system health.

The end-to-end flow can be summarized as: **Data Sources → Ingestion → Processing/Transformation → Storage → Governance/Quality → Consumption**.

> [!IMPORTANT]
> **Separating ingestion from processing preserves raw data for auditing while providing a reliable foundation for transformation.**

## Medallion Architecture (Bronze–Silver–Gold)

The Medallion architecture is one of the most commonly adopted data pipeline architectures, organizing data into three progressive layers:

- **Bronze Layer (Raw)** – Ingests raw data from source systems in native formats with minimal transformation. Stores data in data lakes (S3, ADLS) and includes metadata like ingestion timestamps. Provides **auditability** and enables **historical reprocessing**.
- **Silver Layer (Enriched)** – Applies deduplication, standardization, and validation. Ensures data quality and integrity, enforcing data contracts across the pipeline.
- **Gold Layer (Curated)** – Transforms data into datasets ready for analytics, BI platforms, and ML/AI systems.

> [!IMPORTANT]
> **The Bronze layer is your immutable log — a durable checkpoint that enables reprocessing even if original source data is no longer available.**

## Common Architecture Patterns

- **Batch ETL** – Moves data in scheduled chunks (hourly, nightly). Cost-effective for reporting, historical analysis, and warehouse loading where hour-old data is acceptable. Mature tooling: Airflow, dbt, Spark, Glue.
- **Streaming ETL** – Moves data continuously as events occur. Essential when decisions depend on fresh data — **fraud detection, real-time personalization, operational dashboards, AI feature pipelines**. Uses Kafka, Kinesis, Flink, CDC tools.
- **Lambda Architecture** – Hybrid (batch + stream). Divides processing into **batch layer, serving layer, and speed layer**. High accuracy via batch, low latency via speed layer. Downside: **logic must be maintained in two separate codebases**.
- **Kappa Architecture** – Stream-first. Eliminates the batch layer entirely, treating all data as continuous streams. Simplifies maintenance with **one codebase**. Requires high-performance streaming infrastructure; reprocessing involves replaying logs.

> [!IMPORTANT]
> **The choice between batch and streaming depends on how quickly you need data available for analysis.**

## Best Practices

- **Implement data contracts** at layer boundaries to ensure teams know what to expect.
- **Design for incremental processing** — process only new or changed data to reduce compute costs.
- **Enforce schema and data quality checks early** — catch issues before they propagate downstream.
- **Use queues with backpressure handling** to make pipelines resilient to variable load and bad data.
- **Monitor and optimize pipeline performance continuously** — tracking progress, logging, metrics, and alerts are essential for production reliability.
- **Build for reprocessing** — keep raw data in a durable bronze layer so you can replay history when requirements change.

> [!IMPORTANT]
> **Data quality issues caught early prevent problems from propagating through the rest of your pipeline.**
