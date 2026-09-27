# Migration in progress
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

- **Bronze Layer (Raw)** – Ingests raw data