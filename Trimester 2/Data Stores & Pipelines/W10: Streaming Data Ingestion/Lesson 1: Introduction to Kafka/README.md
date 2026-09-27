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
- Kafka Raft Metadata Mode: Modern Kafka releases replace external ZooKeeper dependencies with an internal consensus protocol called KRaft. KRaft stores metadata directly inside Kafka as an internal quorum-managed topic, improving cluster scalability and simplifying operations.

Fault Tolerance and Replication:

- Replication factor: Defines the total number of duplicate copies maintained for each partition across distinct brokers. A replication factor of three guarantees data survival if two brokers fail.
- Partition leader: For every partition, one broker is designated as the leader. The leader handles all read and write requests for that partition.
- Follower replicas: Passive brokers that continuously fetch and replicate records from the partition leader to maintain synchronized local copies.
- In-sync replicas: The subset of follower replicas that are actively caught up with the leader within a configured lag time.
- Producer acknowledgment modes: Setting the acknowledgment configuration to zero provides maximum speed without waiting for broker confirmation. Setting it to one waits for the partition leader to write to local disk. Setting it to all waits for all in-sync replicas to confirm writes, providing maximum durability.
- Important: Total message ordering is guaranteed strictly within a single partition and is never guaranteed globally across an entire multi-partition topic.

Storage Mechanics and Performance Optimizations:

- Sequential disk writes: Kafka writes incoming messages sequentially to append-only log files on disk, avoiding expensive random disk seek operations and matching memory write speeds.
- Log segments: Partitions are physically divided into segment files on disk. As segments reach time or size limits, Kafka closes them and creates new active segments.
- Page cache and zero-copy: Kafka utilizes the operating system page cache heavily and employs the sendfile system call. This zero-copy approach transfers byte buffers directly from OS disk cache to the network socket, bypassing application memory entirely.
- Log retention and compaction: Topics can be configured to delete log segments after a specific time period or total size limit. Log compaction retains only the latest record value for each primary key, providing a compact snapshot of state changes.

Key Takeaways:

- Apache Kafka is a distributed append-only commit log optimized for horizontal scalability and high event throughput.
- Partitions allow topics to be distributed across multiple brokers, providing parallel write and read execution.
- Message ordering is guaranteed only within an individual partition using sequential offsets.
- Consumer groups enable horizontal read scaling, with the partition count setting the upper limit for active concurrent consumers.
- High availability is achieved through partition leader-follower replication and in-sync replica sets.
- Kafka achieves performance by combining sequential disk writes, operating system page cache caching, and zero-copy network transfers.
