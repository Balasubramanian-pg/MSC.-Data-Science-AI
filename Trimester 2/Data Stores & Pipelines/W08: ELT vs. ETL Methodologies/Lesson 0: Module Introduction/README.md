# Migration in progress
## Module Introduction: ELT vs. ETL Methodologies

Modern data engineering relies on two foundational paradigms to ingest, clean, and prepare data for analytical consumption: Extract, Transform, Load (ETL) and Extract, Load, Transform (ELT). Understanding the architectural divergence between these strategies is critical for designing scalable data systems, controlling infrastructure expenditures, and meeting query performance demands. This module establishes the structural foundations, tool ecosystems, and trade-off criteria governing both methodologies.

**Core Definitions and Paradigm Shift**

- **Extract, Transform, Load (ETL)** defines a pipeline pattern where data is extracted from source operational systems, transformed in an independent staging compute layer, and loaded into a target data warehouse in a structured state.
- **Extract, Load, Transform (ELT)** defines a pipeline pattern where data is extracted from source systems, loaded directly in its raw format into target storage, and transformed in place using the warehouse compute engine.
- *Schema-on-write* represents the traditional ETL principle where data must conform to a predefined, rigid schema before persistence.
- *Schema-on-read* represents the modern ELT principle where schema validation and structural interpretations occur dynamically when queries execute.
- Legacy on-premises constraints historically necessitated ETL because target relational databases lacked the processing capacity to run analytics and heavy transformations simultaneously.
- Cloud object storage and modern cloud data platforms eliminated storage cost bottlenecks, allowing organizations to retain uncompressed raw data indefinitely.

> [!Important]
> **Compute and storage decoupling**: The separation of scalable cloud object storage from elastic compute clusters represents the primary catalyst driving the industry shift from legacy ETL to cloud ELT.

**Architectural Mechanics of ETL**

- **Data Extraction**: Pulls snapshots or change logs from online transaction processing (OLTP) databases, application programming interfaces (APIs), flat files, and message queues.
- **Transformation Server Layer**: Uses an external intermediate compute cluster such as Apache Spark, Informatica PowerCenter, or custom Python microservices.
- **Data Cleansing and Standardization**: Strips special characters, standardizes date-time formats, resolves null anomalies, and encodes categorical flags outside the warehouse.
- **Data Enrichment and Joins**: Merges disparate datasets, calculates rolling metrics, and applies master data management rules prior to database insertion.
- **Final Load**: Executes batched append, insert, or upsert commands into target tables within relational or star schema databases.
- Pipeline execution in ETL is strictly sequential; downstream analytical tables remain completely unavailable until the external transformation compute terminates.

> [!Tip]
> **Schema-on-write enforcement**: Applying rigid structural transformations before the storage phase prevents malformed records from contaminating downstream operational data stores.

**Architectural Mechanics of ELT**

- **Raw Ingestion**: Moves raw payloads directly into data lakes or cloud analytical warehouses using low-overhead stream or micro-batch loaders.
- **Target Storage Engine**: Persists unparsed JSON, Avro, Parquet, or raw CSV files directly into warehouse staging layers or object storage buckets.
- **Pushdown Transformation**: Executes transformation pipelines using the native, massively parallel processing (MPP) capabilities of SQL-based cloud warehouses.
- **Transformation Orchestration**: Uses specialized modern data stack tools to build directed acyclic graphs (DAGs) of SQL data models directly on persisted tables.
- **Auditing and Historical Replay**: Preserves untouched baseline data, permitting data engineers to modify transformation logic and regenerate tables retroactively.
- Compute scaling in ELT operates independently for ingestion and transformation, allowing workloads to scale dynamically based on analytics demand.

> [!Important]
> **Raw data preservation**: Retaining unaltered raw data inside the analytical warehouse ensures that evolving business logic can be recomputed retrospectively without re-extracting from source systems.

**Comparative Analysis: ETL versus ELT**

| Dimension | ETL (Extract, Transform, Load) | ELT (Extract, Load, Transform) |
|---|---|---|
| Transformation Engine | Dedicated secondary compute server or cluster | Target data warehouse or lakehouse engine |
| Primary Storage | Storage holds only transformed, modeled data | Storage holds both raw and modeled data |
| Schema Paradigm | Schema-on-write | Schema-on-read and schema-on-write hybrids |
| Pipeline Latency | Higher latency due to pre-load transformation bottlenecks | Lower ingestion latency; transformations run on schedule or query |
| Scalability | Constrained by transformation server capacity | Highly scalable via elastic cloud warehouse resources |
| Maintenance Overhead | High; pipeline logic changes require full extract reruns | Lower; logic updates are rerun directly against raw stored data |
| Compute Cost Model | Fixed server hardware or standalone cluster operational costs | Pay-as-you-go elastic query consumption |
| Data Privacy Handling | Masks and scrubs sensitive data before loading into warehouse | Requires column-level security or dynamic mask