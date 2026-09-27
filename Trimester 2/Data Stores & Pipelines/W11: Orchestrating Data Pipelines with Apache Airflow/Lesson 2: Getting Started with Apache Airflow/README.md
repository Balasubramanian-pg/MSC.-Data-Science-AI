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
- Plugins directory: A location for custom operators, custom hooks, and external platform integrations that extend core Airflow capabilities.
- Local standalone execution: Running the airflow standalone command automatically initializes a local SQLite database, creates default user credentials, and starts the scheduler and web server simultaneously for development.

The Airflow User Interface:

- Grid view: Displays a comprehensive historical matrix of recent pipeline runs, showing run durations, execution states, and task failure patterns across time.
- Graph view: Shows the visual layout of tasks within a DAG, illustrating directional execution paths and explicit dependency arrows between steps.
- Task instance states: Tasks transition through standard states including queued, running, success, failed, up for retry, skipped, and upstream failed.
- Execution logs: Clicking any task instance in the web interface provides direct access to standard output logs, error traces, and runtime duration metrics for fast debugging.
- Connections and Variables: Administrative menus where developers securely store database connection parameters, API keys, and global configuration values without hardcoding them in Python scripts.

The Workflow Execution Lifecycle:

- Script evaluation: The scheduler parses Python scripts in the dags folder at regular intervals and writes the directed acyclic graph structure into the metadata database.
- DAG run creation: When a pipeline schedule interval arrives, the scheduler creates a new DagRun entry in the database.
- Task scheduling: The scheduler evaluates task dependencies. When a task has all upstream dependencies marked as successful, the scheduler updates the task state to scheduled and sends it to the executor.
- Worker execution: The worker picks up the task from the executor, updates the state to running, executes the operator logic, and records final status as success or failed in the metadata database.
- Downstream triggering: The scheduler detects the task completion in the database and immediately evaluates downstream dependent tasks to continue pipeline execution.
- Important: The scheduler continuously re-evaluates Python files in the DAGs folder, meaning any heavy processing or slow external network calls placed outside operator functions will severely degrade overall system scheduling performance.

Key Takeaways:

- Apache Airflow orchestrates complex data pipelines programmatically using standard Python scripts.
- The platform architecture separates responsibilities across the web server, scheduler, metadata database, executor, and worker nodes.
- Choosing the right executor depends on operational scale, moving from LocalExecutor for single nodes to Celery or Kubernetes for distributed environments.
- The web interface offers centralized visibility into task dependencies, historical run states, and detailed execution logs.
- Workflows progress through a defined lifecycle where the scheduler creates DAG runs, queues tasks, and triggers downstream dependencies upon worker completion.
- DAG files must remain lightweight and contain only workflow definitions to avoid exhausting scheduler resources during file parsing.
