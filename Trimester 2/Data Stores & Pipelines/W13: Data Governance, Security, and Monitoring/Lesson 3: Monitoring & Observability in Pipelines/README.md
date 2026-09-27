# Migration in progress
# Lesson 3: Monitoring & Observability in Pipelines

Monitoring and Observability in Pipelines:

Operating distributed data platforms requires moving beyond basic system uptime checks toward comprehensive data observability. While traditional infrastructure monitoring focuses on whether servers, containers, and network switches are functioning, data pipeline observability evaluates whether the underlying data moving through those systems is accurate, timely, complete, and reliable. Observability provides the external telemetry necessary to understand the internal health of complex, multi-stage data pipelines.

Monitoring versus Observability:

- Monitoring: Focuses on known failure conditions and system performance metrics, tracking binary operational states such as whether an Airflow scheduler daemon is running or whether a database server has available disk capacity.
- Observability: Enables data engineers to investigate unexpected, novel failures and understand why data has degraded by analyzing structured telemetry across distributed pipeline stages.
- The silent failure problem: A pipeline can finish with a successful exit code while producing empty tables, duplicate records, or corrupted calculations that monitoring tools miss entirely.

The Five Pillars of Data Observability:

- Freshness: Evaluates how recently target tables and partitions have been updated, measuring the latency between real-world events and query availability against established service level agreements.
- Volume: Tracks the number of rows ingested, transformed, and loaded in each run, identifying unexpected data drops caused by source outages or data spikes caused by duplicate extractions.
- Distribution: Analyzes the statistical spread of column values, detecting subtle distribution drift, sudden increases in null percentages, or out-of-range numerical anomalies.
- Schema: Monitors structural changes to tables and files, capturing added, dropped, or renamed columns, as well as data type modifications, before downstream queries fail.
- Lineage: Visualizes the end-to-end dependency relationships connecting source systems, message queues, transformation models, and consumption reports, allowing engineers to trace root causes and assess blast radius during outages.

Telemetry Data: Metrics, Logs, and Traces:

- Metrics: Numerical measurements captured at regular intervals, such as consumer lag, task execution durations, memory utilization, and records processed per second.
- Structured logs: Event records formatted as structured JSON payloads that contain execution context, including pipeline run identifiers, task IDs, timestamps, and detailed error s