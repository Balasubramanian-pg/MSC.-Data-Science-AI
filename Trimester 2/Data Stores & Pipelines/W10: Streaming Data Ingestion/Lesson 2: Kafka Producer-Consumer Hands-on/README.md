# Migration in progress
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
- The poll mechanism: Consumers retrieve records using an infinite loop that cal