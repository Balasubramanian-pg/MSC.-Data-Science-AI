# Migration in progress
# Lesson 1: Introduction to ETL and ELT Concepts

Introduction to ETL and ELT Concepts:

Data integration pipelines serve as the backbone for analytics and business intelligence. Organizations produce data across relational databases, application logs, flat files, and external APIs. To make this information usable, engineering teams rely on pipeline architectures that collect, clean, and organize records for analysis. The two primary paradigms for structuring these data workflows are ETL and ELT.

The ETL Workflow:

- Extract: Data is gathered from source operational systems such as transactional databases, streaming logs, and enterprise applications.
- Transform: Data travels to a separate staging area or compute cluster where it undergoes validation, normalization, duplicate removal, type conversion, and business aggregations.
- Load: Transformed and fully structured records are written into target storage systems such as relational data warehouses or data marts.
- Schema on write: The structure of the target database must be defined beforehand, and incoming data must conform strictly to this format before it is accepted.
- Processing location: Transformations occur entirely outside the analytical store using specialized processing engines or dedicated pipeline servers.

The ELT Workflow:

- Extract: Data is collected from source systems using connectors that read change logs, query tables, or consume event streams.
- Load: Extracted information is moved directly into a high capacity cloud data warehouse, data lake, or lakehouse without prior modification.
- Transform: SQL queries or in-engine transformation jobs run inside the target warehouse to model, clean, and aggregate the raw data on demand.
- Schema on read: Raw records are stored as-is, often in semi-structured formats like JSON, and schema interpretations are applied when queries execute.
- Processing location: The transformation workload relies on the native compute engine of the target storage platform rather than an external server.

Historical Drivers and the Cloud Shift:

- Traditional database constraints: Early on-premises databases had limited processor capacity and storage space, making it impractical to store raw data and run heavy transformations on the same system.
- Specialized ETL servers: Organizations previously relied on dedicated middleware servers t