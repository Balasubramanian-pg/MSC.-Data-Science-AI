# Migration in progress
# Lesson 5: Summary and Assessment
Summary and Assessment:

This lesson provides a comprehensive review of the workflow orchestration concepts, architectural patterns, and production engineering practices covered throughout Week 11 on Apache Airflow. It summarizes DAG authoring principles, executor configurations, scheduling mechanics, and error handling methods. The conceptual questions and real-world scenario problems below are designed to prepare for module examinations and technical architecture reviews.

Comprehensive Week 11 Review:

- Orchestration fundamentals: Apache Airflow replaces brittle cron schedules with explicit Directed Acyclic Graphs that define task execution order, manage inter-task dependencies, and provide centralized operational observability.
- Platform architecture: Airflow is built on a decoupled architecture comprising the Web Server for monitoring, the Scheduler for evaluating execution timelines, the Metadata Database for tracking state, and Executors that assign tasks to Worker processes or containers.
- Executor scalability: Organizations scale Airflow from single-node deployments using LocalExecutor to horizontally distributed environments using CeleryExecutor with message brokers, or KubernetesExecutor for dynamic pod-level isolation.
- Operators and sensors: Operators define discrete units of execution, including shell commands, custom Python callables, and external system connectors. Sensors pause workflows until specific external conditions, files, or database rows appear.
- Workflow as code: Authoring pipelines in standard Python enables software engineering practices including version control, automated unit testing, continuous integration, and modular code reuse.
- Inter-task communication: Airflow XComs provide a mechanism for sharing small metadata payloads such as run IDs, status flags, and record counts. XComs store values directly in the metadata database and must never transport large datasets.
- Scheduling and execution dates: The logical date represents the beginning of the data coverage window rather than the real-time execution clock. Catchup controls whether the scheduler automatically processes missed historical intervals when a DAG is turned on.
- The conductor principle: Airflow coordinates pipeline execution flows but delegates heavy computational workloads, such as big data sorting and distributed joins, to dedicated processing platforms like Apache Spark, Snowflake, or dbt.

Assessment Preparation: Conceptual Questions:

Question 1: What is the operational distinction between an Airflow logical date and the physical execution time?
- Answer: The logical date, formerly known as the execution date, represents the timestamp marking the start of the specific data interval being processed by the pipeline. The physical execution time is the actual wall-clock time when the worker machine starts running the task instance, which typically occurs after the data interval has closed.

Question 2: Why does declaring a dynamic start date such as datetime.now in an Airflow DAG file break the scheduler?
- Answer: The scheduler continuously evaluates and re-parses DAG files every few seconds. If the start date is defined dynamically, the start timestamp advances on every scheduler parse cycle, constantly shifting the baseline reference point and preventing the scheduler from ever triggering planned execution intervals.

Question 3: Under what operational circumstances should an engineer configure an Airflow sensor to use reschedule mode instead of poke mode?
- Answer: Poke mode keeps a worker slot continuously occupied in memory while looping and waiting for an external condition to be satisfied. Reschedule mode should be used when the expected wait duration is long, because it releases the worker slot 