# Migration in progress
# W09: Databases & Data Processing - Lesson 4: Summary and Assessment

This lesson summarizes the AWS database portfolio and data processing services. It covers relational databases with Amazon RDS and Aurora, NoSQL with Amazon DynamoDB, data warehousing with Amazon Redshift, data integration with AWS Glue, streaming with Amazon Kinesis, migration with AWS DMS, and orchestration with AWS Step Functions. The goal is to select the right database for a workload and build pipelines that move, transform, and analyse data at scale.

```mermaid
flowchart TD
    W09[W09 Databases and Data Processing] --> L0[Lesson 0: Module Introduction]
    W09 --> L1[Lesson 1: Introduction to Cloud Databases]
    W09 --> L2[Lesson 2: Amazon RDS Fundamentals]
    W09 --> L3[Lesson 3: DynamoDB Basics]
    W09 --> L4[Lesson 4: Summary and Assessment]
    L1 --> L1A[Database Categories]
    L2 --> L2A[RDS Engines, Multi-AZ, Read Replicas]
    L3 --> L3A[Tables, Keys, Capacity Modes, Indexes]
    L4 --> L4A[Data Processing, Review, Scenarios]
```

## Database Portfolio Summary

AWS offers purpose-built databases for different data models and access patterns. The right choice depends on how the application reads and writes data, not on familiarity with a single engine.

| Category | AWS Service | Data Model | Use Case |
|---|---|---|---|
| Relational | Amazon RDS | Tables with rows and columns, ACID transactions | ERP, CRM, e-commerce, traditional applications |
| Relational cloud-native | Amazon Aurora | MySQL and PostgreSQL compatible, distributed storage | High-traffic web apps, SaaS, gaming |
| Key-value and document | Amazon DynamoDB | Key-value and document, single-digit millisecond latency | Session state, shopping carts, gaming leaderboards |
| Document | Amazon DocumentDB | MongoDB-compatible document store | Content management, catalogues, user profiles |
| In-memory | Amazon ElastiCache | Key-value with microsecond latency | Caching, session management, leaderboards |
| Graph | Amazon Neptune | Nodes and edges | Fraud detection, social networks, recommendations |
| Time-series | Amazon Timestream | Time-stamped data | IoT, DevOps, industrial telemetry |
| Wide column | Amazon Keyspaces | Apache Cassandra compatible | Low-latency applications, Cassandra migration |
| Ledger | Amazon QLDB | Immutable, verifiable transaction log | Systems of record, supply chain, healthcare |
| Data warehouse | Amazon Redshift | Columnar, MPP | BI reporting, analytics, data warehousing |

> [!Important]
> **Choose the database by access pattern, not by familiarity**: Relational for ACID transactions. Key-value for high-throughput lookups. Document for flexible schemas. Graph for relationships. Time-series for timestamped data. The most common architectural mistake is forcing data into the wrong database.

## Amazon RDS Summary

*Definition*: Amazon RDS is a managed relational database service that automates provisioning, patching, backup, recovery, failure detection, and repair.

- RDS supports six engines: PostgreSQL, MySQL, MariaDB, Oracle, SQL Server, and Db2.
- RDS offers three deployment modes: Single-AZ, Multi-AZ DB instance, and Multi-AZ DB cluster.
- Multi-AZ DB instance deployments have one standby for failover. The standby does not serve read traffic.
- Multi-AZ DB cluster deployments have one writer and two readers across three Availability Zones. They provide high availability, increased read capacity, and lower write latency.
- Read replicas use asynchronous replication for read scaling, analytics, and disaster recovery. Each DB instance can have up to 15 read replicas.
- Automated backups include daily snapshots and transaction logs. Point-in-time recovery restores to any second within the retention period, up to 35 days.
- RDS Proxy pools and reuses database connections for serverless and connection-heavy applications.
- Encryption at rest uses AWS KMS with AES-256. Encryption in transit enforces TLS 1.2, with TLS 1.3 recommended.
- RDS supports IAM database authentication, Secrets Manager integration, and Kerberos authentication.
- RDS pricing includes instance hours, storage, I/O, and backup storage. Reserved Instances offer up to 69% savings compared to On-Demand.

> [!Important]
> **RDS Multi-AZ is for high availability, not read scaling**: The standby instance in a Multi-AZ DB instance deployment does not serve read traffic. Use read replicas for read scaling. Use Multi-AZ for automatic failover and disaster recovery.

## Amazon Aurora Summary

*Definition*: Amazon Aurora is a MySQL and PostgreSQL-compatible relational database built for the cloud. It features a distributed, fault-tolerant, self-healing storage system that auto-scales up to 128 TB.

- Aurora decouples compute from storage. Data is stored in a cluster volume that spans three Availability Zones.
- Aurora supports up to 15 low-latency read replicas.
- Failover is typically under 30 seconds.
- Aurora Serverless v2 automatically scales capacity in fine-grained increments based on demand.
- Aurora Global Database spans multiple Regions with sub-second replication and promotion under 1 minute.
- Aurora offers better price-performance than RDS for most production workloads.

> [!Tip]
> **Start with Aurora for new PostgreSQL and MySQL workloads**: Aurora offers auto-scaling storage, faster failover, and more read replicas than RDS. Choose RDS when you need Oracle, SQL Server, or Db2, or when minimising cost for small workloads.

## Amazon DynamoDB Summary

*Definition*: Amazon DynamoDB is a fully managed, serverless, NoSQL key-value and document database that delivers single-digit millisecond performance at any scale.

- DynamoDB stores data in tables, items, and attributes. Tables are schemaless except for the primary key.
- A primary key can be a simple partition key or a composite partition key and sort key.
- Use a high-cardinality partition key to distribute load evenly. Each partition provides 3,000 read units and 1,000 write units per second.
- DynamoDB offers two capacity modes: on-demand and provisioned. On-demand is recommended for most workloads.
- Global Secondary Indexes can have a different partition key and sort key. Up to 20 per table.
- Local Secondary Indexes have the same partition key but a different sort key. Up to 5 per table.
- DynamoDB Streams captures item-level changes for event-driven processing with Lambda.
- DynamoDB Accelerator provides microsecond read latency for read-heavy workloads.
- Global Tables provide multi-Region active-active replication with automatic conflict resolution.
- DynamoDB transactions provide ACID guarantees across up to 10 items within and across tables.
- Time to Live automatically deletes expired items. Deletions may take up to 48 hours.

> [!Tip]
> **Model DynamoDB for access patterns, not relationships**: Design tables around how you will query the data. Choose a high-cardinality partition key. Use composite keys for hierarchical data. Use GSIs to support additional access patterns. Denormalise where necessary.

## Data Processing and Integration Summary

Data processing services match the velocity and shape of the data. Batch ETL, real-time streaming, migration, and orchestration each use different services.

| Service | Purpose | Data Velocity | Use Case |
|---|---|---|---|
| Amazon Redshift | Data warehousing and analytics | Batch | BI reporting, analytics, petabyte-scale queries |
| AWS Glue | Serverless ETL and data cataloguing | Batch and micro-batch | Schema discovery, transformation, Parquet conversion |
| Amazon Kinesis | Real-time streaming | Streaming | Clickstream, IoT telemetry, log processing |
| AWS DMS | Database migration | Batch and continuous | Homogeneous and heterogeneous migrations |
| AWS Step Functions | Workflow orchestration | Event-driven | Serverless ETL pipelines, error handling, retries |

### Amazon Redshift

- Redshift is a petabyte-scale data warehouse with massively parallel processing and columnar storage.
- Redshift Spectrum queries S3 data directly without loading it into Redshift.
- Federated queries access RDS and Aurora data without ETL.
- Concurrency Scaling automatically adds clusters for concurrent queries.
- RA3 instances separate compute and storage for independent scaling.

### AWS Glue

- Glue is a serverless data integration service for ETL, schema discovery, and data cataloguing.
- Glue crawlers discover schemas and populate the Data Catalog.
- Glue ETL jobs transform, co