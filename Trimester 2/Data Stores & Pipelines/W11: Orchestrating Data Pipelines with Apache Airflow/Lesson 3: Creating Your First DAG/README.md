# Migration in progress
# Lesson 3: Creating Your First DAG

Creating Your First DAG:

Building a data pipeline in Apache Airflow involves writing a standard Python script that defines a Directed Acyclic Graph, its operational parameters, its component tasks, and the execution dependencies connecting them. Airflow reads this file, registers the pipeline in its metadata database, and schedules task instances according to the defined intervals. Mastering the five foundational steps of DAG construction ensures that workflows remain robust, maintainable, and predictable.

The Five Steps of DAG Construction:

- Step 1: Import modules. Import necessary standard library packages, datetime utilities, the primary DAG class from airflow, and specific operator classes like BashOperator and PythonOperator.
- Step 2: Define default arguments. Create a dictionary holding baseline configuration values that apply automatically to all tasks within the DAG unless explicitly overridden.
- Step 3: Instantiate the DAG. Initialize the central DAG object by specifying a unique identifier, linking default arguments, setting the schedule frequency, and defining the start date.
- Step 4: Define individual tasks. Declare tasks as instances of specific operators, assigning each a unique task identifier and configuring task-specific parameters such as shell commands or Python callable functions.
- Step 5: Establish task dependencies. Link tasks together using directional dependency operators to establish the exact sequence in which tasks must execute.

Essential DAG Arguments and Configurations:

- dag id: A distinct string identifier used by the scheduler, database, and web interface to track the pipeline. Every DAG in an Airflow cluster must possess a globally unique identifier.
- start date: The timestamp marking when the DAG becomes active for scheduling. The start date must always be defined using a static, fixed historical datetime object.
- Important: Never set the start date dynamically using functions like datetime.now, because dynamic dates change on every scheduler parse cycle and prevent task runs from executing properly.
- schedule interval: Defines how frequently the pipeline runs, configured using standard cron expressions or preset shortcuts such as daily, hourly, or weekly. Setting this parameter to None creates a pipeline triggered exclusively by manual user action or external webhooks.
- catchup: A boolean setting controlling historical execution. Setting catchup to False instructs Airflow to run only the most recent scheduled interval when the pipeline is activated, avoiding the automatic backfilling of all historical intervals between the start date and the current day.
- max active runs: Restricts how many instances of the DAG can execute simultaneously, protecting target database systems from concurrent query spikes.

Core Airflo