# Lab5: Building ETL Pipelines using PySpark

Project Overview:

This repository contains the coursework and lab implementation for Week 8 of Data Stores and Pipelines, focused on building end to end ETL pipelines using PySpark and comparing ETL with ELT patterns. The project is organized into dedicated Jupyter notebooks covering each stage of the data pipeline lifecycle.

Repository Structure:

- 01_data_extraction_and_ingestion.ipynb: Covers extraction from varied file formats, schema definition, and raw data ingestion.
- 02_data_profiling_and_validation.ipynb: Covers null value detection, schema enforcement, duplicate analysis, and data quality checks.
- 03_data_cleaning_and_transformations.ipynb: Covers type casting, string standardisation, date parsing, handling missing data, and regex operations.
- 04_business_logic_and_aggregations.ipynb: Covers complex joins, window functions, aggregations, rollups, and derived analytical features.
- 05_data_loading_and_partitioning.ipynb: Covers writing to target formats such as Parquet and Delta Lake, partition strategies, and database loading via JDBC.
- 06_etl_vs_elt_benchmarking.ipynb: Compares traditional ETL transformation in Spark with ELT loading and warehouse-side transformations, analyzing latency and resource cost.

Notebook Breakdown:

Notebook 1: Data Extraction and Ingestion
- Setting up the PySpark session and local driver configuration.
- Ingesting raw input data from multiple formats including CSV, JSON, and Parquet.
- Defining explicit schemas using StructType and StructField instead of relying on schema inference.
- Handling malformed records with modes such as permissive, dropMalformed, and failFast.

Notebook 2: Data Profiling and Validation
- Inspecting data dimensions, record counts, and partition counts.
- Identifying missing values, unexpected nulls, and duplicate primary keys.
- Applying schema validation to ensure types align with target expectations.
- Establishing basic rule checks to filter out invalid records before transformation.

Notebook 3: Data Cleaning and Transformations
- Casting dirty data types to standard integer, float, and timestamp formats.
- Cleaning string fields by trimming whitespace and normalizing cases.
- Imputing missing values using mean, median, or placeholder indicators.
- Parsing custom date and time formats into standard PySpark timestamps.
- Dropping redundant columns and filtering out corrupted records.

Notebook 4: Business Logic and Aggregations
- Merging multiple datasets using inner, left, and broadcast joins.
- Utilizing Spark window functions for ranking, cumulative sums, and moving averages.
- Computing business level aggregations by customer, product, and time dimensions.
- Creating flag columns and derived key performance indicators using PySpark conditional expressions.

Notebook 5: Data Loading and Partitioning
- Writing cleaned datasets to columnar formats including Parquet and Delta Lake.
- Implementing partitioning by date or region to optimize future query performance.
- Managing write modes such as append, overwrite, and errorIfExists.
- Establishing JDBC connections to push aggregated tables into an external relational database or data warehouse staging area.

Notebook 6: ETL vs. ELT Benchmarking
- Simulating a pure ETL pipeline where heavy transformations happen entirely inside the PySpark compute engine prior to loading.
- Simulating an ELT pipeline where raw or minimally cleaned data is loaded directly into target storage and transformed via downstream SQL queries.
- Measuring execution time, memory usage, and storage overhead between both patterns.
- Identifying scenarios where Spark ETL is superior to database-centric ELT, and vice versa.

Prerequisites and Setup:

- Python 3.8 or higher.
- Java 8 or Java 11 runtime environment required by Apache Spark.
- PySpark, PyArrow, and Delta Lake library installations via pip.
- Jupyter Notebook or JupyterLab interface.

Key Takeaways:

- Dividing a data engineering pipeline into modular notebooks isolates concerns and makes debugging simpler.
- Explicit schema declaration avoids expensive Spark schema inference jobs on large files.
- PySpark is well suited for the transformation step of ETL when processing unstructured or high volume data before it reaches a data warehouse.
- Partitioning during the load step is critical to ensure fast retrieval and low storage costs.
- The choice between ETL and ELT depends on data volume, data variety, compute capabilities, and storage layer costs.
