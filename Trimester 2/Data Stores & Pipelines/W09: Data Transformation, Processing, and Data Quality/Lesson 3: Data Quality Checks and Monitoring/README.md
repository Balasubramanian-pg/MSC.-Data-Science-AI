# Lesson 3: Data Quality Checks and Monitoring

Data Quality Checks and Monitoring:

Data pipelines can execute without technical runtime errors while still outputting corrupt, incomplete, or biased information. These issues, known as silent data failures, occur when data schemas drift unexpectedly, upstream systems drop essential values, or duplicate records slip through ingestion layers. Implementing automated data quality checks and continuous monitoring ensures that bad data is detected, reported, and remediated before it impacts downstream business intelligence dashboards or machine learning systems.

Categories of Data Quality Checks:

- Schema validation: Confirms that required column names exist, data types match intended definitions, and non-nullable attributes do not contain nulls.
- Range and domain constraints: Verifies that numerical values fall within realistic boundaries, strings match approved regular expression patterns, and categorical fields belong to predefined enumerated lists.
- Uniqueness and primary key verification: Checks that designated unique identifiers or composite keys contain zero duplicates across the entire table.
- Referential integrity: Confirms that foreign keys present in transactional child records correspond to existing primary keys in parent entity tables.
- Statistical distribution checks: Evaluates continuous metrics like column averages, standard deviations, and quartile spreads against expected historical baselines.
- Volume checks: Tracks total ingested row counts per batch to detect unexpected drops or spikes that indicate source outages or duplicate message processing.
- Freshness checks: Measures elapsed time between the most recent record timestamp and the current system time to verify that upstream feeds are updating within agreed service level agreements.

Tooling and Implementation Frameworks:

- Great Expectations: A Python framework that allows data teams to write declarative validation rules called expectations. It generates automated documentation and builds validation reports after evaluating data batches.
- PyDeequ: A Python wrapper for Amazon Deequ that computes distributed data quality metrics directly on Apache Spark DataFrames, enabling constraint verification on large-scale datasets.
- Soda Core: An open-source command-line tool that uses simple configuration files to run SQL-based data reliability checks across warehouses and databases.
- Native dbt tests: Provides pre-built assertions including unique, not null, relationships, and accepted values, alongside custom SQL models that return failing rows when business invariants are violated.

Data Observability Pillars:

- Freshness: Evaluates how recently data was created or updated, alerting teams when upstream ingestion processes stall.
- Volume: Monitors the completeness of data tables by assessing whether incoming row volumes match expected operational trends.
- Distribution: Analyzes the statistical spread of column values to identify unexpected shifts, such as sudden changes in the percentage of null entries or categorical distributions.
- Schema: Tracks table structural changes over time, including added, renamed, or deleted columns and altering data types.
- Lineage: Maps end-to-end dependencies between upstream sources, intermediate transformation models, and final consumption endpoints to isolate the root cause of pipeline anomalies.

Alerting and Remediation Strategies:

- Hard failure gates: Halts pipeline execution immediately when a critical validation rule fails, preventing invalid records from being written into downstream production models.
- Warning alerts: Dispatches asynchronous notifications to communication channels or ticketing systems when non-critical thresholds are breached, without halting overall execution.
- Quarantine routing: Diverts failing rows into an isolated quarantine table or dead-letter queue, allowing valid records to proceed through the pipeline while preserving corrupted records for engineering inspection.
- Important: Setting fixed static thresholds for dynamic data often causes alert fatigue, making statistical or adaptive anomaly detection necessary as data volume scales.

Key Takeaways:

- Silent data failures pass technical execution tests but corrupt analytical models and business reporting.
- Data quality checks must validate schema structure, value domains, uniqueness, referential integrity, volume, and freshness.
- Dedicated frameworks such as Great Expectations, PyDeequ, and dbt standardize and automate data validation within pipeline code.
- Data observability extends beyond basic quality checks by monitoring freshness, volume, distribution, schema drift, and lineage.
- Defensive architectures use hard failure gates, warning alerts, or quarantine routing depending on the business severity of the data error.
