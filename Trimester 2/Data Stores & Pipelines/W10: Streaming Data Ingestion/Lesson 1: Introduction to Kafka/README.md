# Migration in progress
# Lesson 1: Introduction to Kafka

Introduction to Apache Kafka:

Apache Kafka is an open-source distributed event streaming platform originally developed by LinkedIn and managed by the Apache Software Foundation. Designed to function as a distributed append-only commit log, Kafka provides high throughput, low latency, fault tolerance, and horizontal scalability. It serves as the primary messaging backbone for enterprise architectures, connecting heterogeneous data sources to downstream stream processors, data lakes, and transactional storage.

Core Architectural Components:

- Topics: A topic represents a named category or stream to which records are published. Topics in Kafka are multi-subscriber, meaning multiple independent systems can read from the same topic simultaneously.
- Partitions: Topics are divided into one or more partitions distributed across different servers. Partitions represent the fundamental unit of parallelism and physical storage in Kafka.
- Offsets: Within each partition, every message is assigned a unique, monotonically increasing sequential integer known as an offset. Offsets guarantee a strict order of messages within that specific partition.
- Producers: Client applications that write data into Kafka topics. Producers decide which partition within a topic receives each message, typically using key hashing or round-robin distribution.
- Consumers: Client applications that subscribe to topics and read records sequentially by tracking their current offset.
- Consumer Groups: A collection of consumers that cooperate to read from a topic. Each partition in a topic is assigned to exactly one consumer within a group, allowing consumer groups to scale read throughput horizontally.
- Brokers: Individual servers that make up a Kafka cluster. Brokers store partition logs on disk, receive messages from producers, and serve reads to consumers.

Message Distribution and Partitioning Logic:

- Key-based partitioning: When a producer assigns a key to a record, Kafka hashes the key to determine the target partition. All messages sharing the same key always land in the exact same partition, preserving strict chronological ordering for that entity.
- Round-robin partitioning: When records are sent without a key, the producer distributes messages evenly across all available partitions to ensure balanced cluster utilization.
- Consumer scaling limit: The number of active consumers in a single consumer group cannot exceed the total number of partitions in the subscribed topic. Excess consumers remain idle as standby backups.

Cluster Coordination and Metadata Management:

- Apache ZooKeeper: Historically used by Kafka to store cluster metadata, manage topic configurations, track broker availability, and elect cluster controllers.
- Kafka Raft Metadata Mode: Modern Kafka releases replace external ZooKeeper dependencies with an internal consensus protocol 