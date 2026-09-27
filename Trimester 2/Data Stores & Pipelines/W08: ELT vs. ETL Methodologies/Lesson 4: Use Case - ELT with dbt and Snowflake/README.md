# Migration in progress
# Lesson 4: Use Case - ELT with dbt and Snowflake

Initial directory setup.
Use Case: ELT with dbt and Snowflake:

The combination of Snowflake and dbt has become a standard architectural pattern for modern cloud data platforms. Under this ELT approach, raw data is loaded directly into Snowflake without pre-processing, and dbt coordinates the transformation process inside Snowflake using modular SQL statements. Snowflake supplies the scalable compute and storage infrastructure, while dbt introduces software engineering practices such as version control, automated testing, and lineage tracking to data transformation pipelines.

Snowflake Architecture and Ingestion Mechanics:

- Snowflake separates storage from compute, allowing data teams to scale storage independently from the virtual warehouses executing queries.
- Raw data lands in external cloud storage stages or internal Snowflake stages from transactional databases, streaming brokers, or application webhooks.
- Data ingestion utilizes automated loaders, scheduled COPY INTO commands, or continuous streaming services such as Snowpipe.
- Raw semi-structured records in formats like JSON, Avro, and Parquet are stored directly into Snowflake columns using the VARIANT data type.
- Raw tables remain untouched after loading, preserving a complete audit trail of the original source records.

The Role of dbt in the Transformation Phase:

- The tool dbt does not extract or load data; it focuses entirely on the transformation phase of the ELT lifecycle.
- Data transformations are authored as simple SQL select statements saved in individual model files.
- The dbt framework compiles these select statements into Data Definition and Data Manipulation Language statements that run directly on Snowflake compute nodes.
- Jinja templating and the ref function allow models to reference upstream tables dynamically, automatically constructing a directed acyclic graph of dependencies.
- Analytical engineers work within standard version control systems like Git, enabling pull request reviews, automated continuous integration tests, and collaborative modeling.

Structuring the Transformation Layers in dbt:

- Staging layer: Models read directly from raw Snowflake source tables. This layer cleans column naming conventions, standardizes data types, casts timestamps, and flattens nested JSON payloads using native Snowflake semi-structured SQL functions.
- Intermediate layer: Models join multiple staging tables, handle entity deduplication, resolve surrogate keys, and calculate intermediate business metrics.
- Marts layer: Models expose consumer-facing dimensional models, such as star schemas consisting of fact and dimension tables, structured for business intelligence tools and downstream dashboards.

Materialization Strategies:

- View materialization compiles models as