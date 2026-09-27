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

- View materialization compiles models as standard database views, ensuring downstream reports always query live data with zero additional storage cost.
- Table materialization rebuilds the target model as a physical table on every execution run, maximizing query speed for end-users at the expense of longer model build times.
- Incremental materialization transforms and inserts only new or modified source rows since the previous dbt execution run, significantly reducing compute consumption on large tables.
- Ephemeral materialization interpolates models directly into downstream queries as common table expressions rather than saving database objects.
- Important: Choosing between view, table, and incremental materialization requires balancing warehouse query response times against dbt run times and compute credit usage.

Data Quality, Testing, and Documentation:

- Data quality checks are defined directly in project configuration files alongside the model code.
- Out of the box schema tests validate column assertions such as unique values, non-null values, accepted value lists, and foreign key relationships.
- Singular custom tests allow engineers to write bespoke SQL queries that fail if any invalid records are returned.
- Executing testing commands prior to production deployment prevents corrupted data or broken assumptions from reaching production dashboards.
- The framework generates interactive documentation and visual lineage graphs that map the complete path of data from raw source ingestion to final metrics.

Performance and Resource Optimization:

- Snowflake virtual warehouses can be resized on demand or dedicated to specific dbt transformation runs to isolate transformation workloads from interactive user queries.
- Micro-partitioning occurs automatically in Snowflake, but choosing appropriate incremental lookback windows and keys improves query pruning and minimizes full table scans.
- Suspending virtual warehouses automatically when dbt runs complete prevents unnecessary compute credit burn during idle intervals.

Key Takeaways:

- Snowflake provides the distributed storage and compute engine for ELT, while dbt manages the transformation logic through modular SQL models.
- Raw data is loaded directly into Snowflake using tools like Snowpipe or bulk loading commands, avoiding pre-load processing bottlenecks.
- The VARIANT data type in Snowflake allows ingestion of semi-structured JSON payloads without upfront schema definitions.
- Modern ELT structures transformations into layered staging, intermediate, and dimensional mart models.
- Materialization strategies such as tables, views, and incremental models allow data teams to balance query performance against compute costs.
- Integrating automated schema tests and data lineage graphs into the transformation workflow ensures data reliability and governance across the platform.
