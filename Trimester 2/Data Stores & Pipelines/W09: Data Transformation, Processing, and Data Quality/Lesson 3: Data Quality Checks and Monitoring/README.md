# Migration in progress
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
- Soda Core: An open-source command-line tool that uses simple configuration files to run SQL-based data reliability checks across warehouses an