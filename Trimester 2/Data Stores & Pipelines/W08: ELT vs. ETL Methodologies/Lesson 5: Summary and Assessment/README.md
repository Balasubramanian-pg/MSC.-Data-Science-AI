# Lesson 5: Summary and Assessment

Summary and Assessment:

This lesson summarizes the foundational principles, architectural trade-offs, and practical implementations of ETL and ELT methodologies covered throughout Week 8. It reviews key differences between external processing engines like PySpark and in-warehouse transformation frameworks like dbt with Snowflake, followed by conceptual review questions and practical architecture scenarios to prepare for evaluations.

Core Concepts Review:

- ETL processes data sequentially by extracting from source systems, transforming data on an intermediate compute cluster, and loading the finalized schema into a target data warehouse.
- ELT separates extraction and loading from transformation by ingesting raw data directly into scalable cloud storage or a data warehouse, followed by in-engine SQL transformations.
- Schema on write requires strict validation and structure before storage persistence, protecting analytical stores from corrupted records.
- Schema on read defers structure validation to query execution time, preserving raw records and supporting fast ingestion of semi-structured files.
- The shift from ETL to ELT was enabled by elastic cloud computing, massively parallel processing query engines, and declining cloud storage costs.

Summary of Architectural Trade-offs:

- Processing location: ETL uses standalone compute resources like Apache Spark clusters, whereas ELT utilizes the computational power of the destination warehouse like Snowflake or BigQuery.
- Data privacy: ETL strips, masks, or anonymizes sensitive fields before loading, preventing unauthorized data from ever landing in analytical storage. ELT requires internal access policies and dynamic data masking within the warehouse.
- Latency and throughput: ELT minimizes ingestion latency by moving raw data directly into the warehouse. ETL introduces higher pre-load latency due to heavy intermediate transformations.
- Schema drift and maintainability: ETL pipelines break when upstream schemas change without warning, requiring pipeline redeployment. ELT stores raw payloads in flexible formats, allowing transformation models to be updated without re-extracting history.
- Cost patterns: ETL incurs predictable infrastructure costs for compute servers. ELT relies on consumption-based cloud billing that can grow rapidly if query execution is not monitored and governed.

Assessment Preparation: Conceptual Questions:

Question 1: What is the primary operational difference between schema on write and schema on read?
- Answer: Schema on write validates and enforces data structure before data is written into permanent storage, discarding or rejecting non-conforming rows. Schema on read applies structure dynamically when data is read or queried, leaving the original stored records unaltered.

Question 2: In which situation is an ETL pipeline architecture strictly preferred over an ELT pipeline?
- Answer: ETL is preferred when stringent privacy regulations require personally identifiable information or protected health records to be scrubbed before crossing storage or network boundaries, or when source formats require specialized parsing libraries unavailable inside a SQL data warehouse.

Question 3: How does dbt interact with the data storage and compute layers during an ELT workflow?
- Answer: The tool dbt does not store data or process records on its own servers. It compiles SQL transformation models and pushes execution commands directly to the target cloud data warehouse, orchestrating transformations within the warehouse compute engine.

Question 4: What are the main performance bottlenecks in a PySpark ETL transformation stage?
- Answer: Performance bottlenecks in PySpark typically stem from wide transformations that force data shuffles across the network, skewed data partitions that overload individual executor nodes, and unoptimized schema inference scans on large text inputs.

Assessment Preparation: Scenario-Based Problems:

Scenario 1: Healthcare Integration
A regional hospital network needs to combine patient intake records from multiple legacy clinics into an analytics dashboard. Strict health data privacy regulations prohibit unencrypted Social Security numbers and personal contact details from being stored in analytical environments.
- Recommended Architecture: Pure ETL or a hybrid pipeline with an upfront ETL sanitization phase.
- Justification: An intermediate PySpark or Python pipeline extracts records, masks patient identifiers, removes unneeded fields, and encrypts sensitive attributes before writing into the warehouse. This ensures that non-compliant raw records are never persisted in downstream storage.

Scenario 2: High Velocity IoT Streaming
A logistics enterprise tracks vehicle telemetry from 50,000 delivery vans, generating continuous JSON telemetry payloads containing GPS coordinates, speed, and engine metrics. Schema attributes change periodically as vehicle sensors receive firmware updates.
- Recommended Architecture: ELT utilizing Snowflake and dbt, or a lakehouse architecture.
- Justification: Ingesting raw JSON directly into Snowflake tables using the VARIANT data type avoids ingestion failures caused by unexpected schema updates. Analytics engineers can deploy dbt models to parse new sensor metrics incrementally without requiring full pipeline redesigns or re-extracting sensor logs.

Scenario 3: Financial Daily Reconciliation
A payment processing firm processes millions of credit card transactions daily. Finance analysts require daily reconciled reports, month-to-date aggregates, and customer chargeback metrics ready by 06:00 each morning.
- Recommended Architecture: ELT with incremental dbt models running on a scheduled virtual warehouse.
- Justification: Raw transaction batches load into staging tables overnight. Incremental dbt models process only new transactions added within the previous 24 hours rather than scanning the full multi-year history, ensuring reports are completed well before the morning deadline while minimizing warehouse compute credits.

Key Takeaways:

- ETL and ELT represent two distinct philosophies for managing the flow, transformation, and storage of analytical data.
- The choice between ETL and ELT depends on security constraints, schema volatility, infrastructure cost controls, and team skill sets.
- PySpark provides distributed memory compute ideal for heavy pre-load transformations, external data cleaning, and strict regulatory masking.
- The combination of Snowflake and dbt exemplifies modern ELT by leveraging scalable cloud compute, flexible JSON storage, modular SQL, and automated testing.
- Hybrid approaches often provide the best balance by using lightweight ETL for initial compliance sanitization and ELT for business intelligence modeling.
