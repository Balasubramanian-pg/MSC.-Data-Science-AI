# Migration in progress
# Lesson 2: Getting Started with Apache Airflow

Getting Started with Apache Airflow:

Apache Airflow is an open-source platform created to programmatically author, schedule, and monitor workflows. Developed at Airbnb in 2014 and open-sourced through the Apache Software Foundation, Airflow has become an industry standard for data engineering orchestration. It allows engineers to write workflows as Python code, providing dynamic pipeline generation, modular extensibility, and centralized operational monitoring.

Core Architectural Components:

- Web Server: A Python web application that renders the user interface. It provides visual access to pipeline graphs, execution timelines, task run logs, and administrative configuration settings.
- Scheduler: The central engine of Airflow. It continuously scans DAG files, tracks execution schedules, checks task dependencies, and queues eligible tasks for execution.
- Metadata Database: A relational database such as PostgreSQL or MySQL that stores all internal operational state, including DAG definitions, execution history, user permissions, global variables, and secure connection credentials.
- Executor: The component that defines how queued tasks are physically executed. Executors allocate workloads locally on the host machine or distribute them across remote worker clusters.
- Worker Nodes: The compute processes or containers that pull assigned tasks from the executor queue, run the designated code, and report final status back to the metadata database.
- Triggerer: A specialized daemon introduced in modern Airflow versions that runs an asynchronous event loop to support deferrable operators, freeing up worker slots while waiting on external systems.

Airflow Execution Modes and Executors:

- SequentialExecutor: Runs tasks one by one in series on a single machine using SQLite. It is intended strictly for initial software testing and learning environments.
- LocalExecutor: Runs multiple tasks concurrently on a single machine by spawning separate worker processes, suitable for light production workloads on modest virtual machines.
- CeleryExecutor: Distributes task execution across multiple independent worker nodes using a message broker like Redis or RabbitMQ, providing horizontal scalability for large teams.
- KubernetesExecutor: Spawns an isolated Kubernetes pod for each task instance and destroys the pod upon task completion, offering resource elasticity and isolated dependency environments.

Environment Setup and Project Structure:

- AIRFLOW HOME: An environment variable defining the root directory where Airflow stores its configuration files, local database, and log directories.
- Configuration file: The airflow.cfg file controls core settings such as database connection strings, executor types, parallelism limits, and web server ports.
- DAG directory: A dedicated folder named dags where engineers place Python workflow scripts. The scheduler scans this folder periodically to discover new or updated pipelines.
- Plugins directory: A location for custom operators, custom hooks, and external platform integration