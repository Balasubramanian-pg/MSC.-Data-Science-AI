# Lesson 2: Kafka Producer-Consumer Hands-on

Kafka Producer-Consumer Hands-on:

Developing applications on Apache Kafka requires practical knowledge of creating topics, configuring producer clients, implementing resilient consumer poll loops, and managing partition offsets. Client libraries such as kafka-python or confluent-kafka interact with the Kafka cluster through standardized binary protocols over TCP network connections. This hands-on guide details the essential administrative steps, configuration parameters, implementation patterns, and debugging workflows needed to build production-grade producers and consumers.

Topic Administration and Setup:

- Creating topics: The kafka-topics script initializes new topics by specifying topic name, partition count, and replication factor against the cluster bootstrap server.
- Partition planning: Increasing partition count increases potential consumer parallelism, but partitions cannot be decreased once created without deleting and recreating the topic.
- Topic inspection: Running describe commands outputs cluster metadata including partition IDs, leader broker addresses, in-sync replica lists, and configuration overrides.
- Retention configuration: Administrators configure segment retention by duration using log.retention.hours or by storage limit using log.retention.bytes.

Kafka Producer Implementation and Tuning:

- Bootstrap servers: A comma-separated list of host-port pairs used by the client library to establish initial contact with the Kafka cluster and discover the full broker topology.
- Key and value serializers: Producers transmit raw byte arrays over the network. Serialization functions convert application objects, such as Python dictionaries or strings, into byte arrays using formats like UTF-8, JSON, or Apache Avro.
- Asynchronous transmission: Modern producers buffer outgoing messages in local memory accumulators and send them in batches asynchronously to maximize network throughput.
- Delivery callbacks: Registering success and error callbacks ensures the application captures partition metadata, published offset values, or network exception details without blocking main threads.
- Linger and batch settings: The linger.ms setting delays transmission by a few milliseconds to allow outgoing message batches to accumulate, while batch.size establishes the maximum memory cap per batch.
- Compression codecs: Enabling compression types like Snappy, LZ4, or GZIP reduces network bandwidth consumption and saves broker disk storage with low CPU overhead.
- Acknowledgment controls: Configuring acks to all ensures that the leader broker waits for all in-sync replicas to persist the message before acknowledging success.

Kafka Consumer Implementation and the Poll Loop:

- Group identifier: Setting group.id assigns the consumer instance to a specific consumer group, enabling Kafka to balance topic partitions across active group members automatically.
- Offset reset policy: The auto.offset.reset setting dictates behavior when no prior committed offset exists for the group. Setting it to earliest reads from the beginning of the partition log, while latest reads only newly published messages.
- Deserialization: Converts raw bytes received from Kafka back into structured programming objects using matching deserializer functions.
- The poll mechanism: Consumers retrieve records using an infinite loop that calls the poll function. The poll call fetches batches of messages, sends periodic heartbeats to the broker coordinator, and handles internal partition rebalancing.
- Processing timeouts: If message processing inside the poll loop exceeds max.poll.interval.ms, the coordinator assumes the consumer died, evicts it from the group, and triggers a partition rebalance.

Offset Management and Processing Guarantees:

- Automatic offset commits: Setting enable.auto.commit to true commits the highest fetched offset at fixed intervals defined by auto.commit.interval.ms.
- Risks of auto-commit: Auto-commit can acknowledge records before application processing finishes. If an application crashes during computation, uncompleted records are skipped on restart, causing data loss.
- Manual offset commit: Setting auto-commit to false gives developers explicit control over when offsets persist to the internal __consumer_offsets topic.
- Synchronous commits: The commitSync function blocks execution until the broker acknowledges that the offset has been saved, ensuring robust at-least-once delivery at the cost of processing latency.
- Asynchronous commits: The commitAsync function dispatches offset commits without blocking, using optional callbacks to log failures.
- Important: Implementing manual offset commits immediately after successful record persistence or database writing guarantees at-least-once delivery semantics without skipping records.

Consumer Scaling and Group Rebalancing:

- Partition assignment strategies: Protocols such as Range, RoundRobin, and Cooperative Sticky determine how partitions distribute across active group instances.
- Rebalance triggers: Rebalancing occurs whenever a consumer joins, leaves cleanly, crashes, or when topic partition counts change.
- Cooperative rebalancing: Modern rebalance assignors reassign only the affected partitions rather than revoking all partitions cluster-wide, minimizing pause times during scaling.

Monitoring and Operational Debugging:

- Consumer lag inspection: Using the kafka-consumer-groups command-line utility measures the difference between the latest partition log-end offset and the consumer group's last committed offset.
- Diagnosing lag: Rising consumer lag indicates that downstream processing throughput is slower than upstream production volume, requiring partition expansion, consumer scaling, or logic optimization.
- Poison pills: A malformed record that cannot be parsed by consumer deserializers will crash the poll loop repeatedly. Handling poison pills requires try-except blocks that log the corrupted payload and forward it to a dead-letter topic.

Key Takeaways:

- Producer performance is optimized by batching records, enabling compression, and using asynchronous delivery callbacks.
- Topic partition count defines the maximum horizontal concurrency limit for consumers within a single group.
- The consumer poll loop drives both record retrieval and the background heartbeat signals required to maintain group membership.
- Automatic offset committing risks silent data loss; manual synchronous or asynchronous commits provide reliable at-least-once delivery.
- Consumer lag is the primary health metric indicating whether downstream consumers are keeping pace with message ingestion rates.
- Unparseable poison pill records must be caught and routed to dead-letter topics to prevent continuous consumer crash loops.
