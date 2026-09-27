# Migration in progress
# Lab7: Real-time Data Ingestion - Stock Market

Lab 7: Real-time Data Ingestion - Stock Market:

This practical lab covers the end to end implementation of a real-time stock market data ingestion pipeline. In this lab, simulated or live stock market trade ticks are published to an Apache Kafka cluster, ingested continuously using Spark Structured Streaming, transformed using event-time tumbling windows to calculate financial candlestick bars, and written to durable storage with fault-tolerant checkpointing.

Lab Objectives:

- Set up an Apache Kafka topic partitioned by stock ticker symbol to ensure chronological ordering.
- Build a Python Kafka producer to publish simulated stock market trade events formatted as JSON records.
- Ingest the live Kafka stream into Apache Spark using the Structured Streaming DataFrame API.
- Parse JSON payloads, enforce data schemas, and cast fields to proper timestamp and numeric types.
- Apply watermarking and tumbling window aggregations to compute Open, High, Low, Close, and Volume metrics in real time.
- Write processed streams out to console sinks for real-time monitoring and durable Parquet or Delta files using checkpointing.

Pipeline Architecture and Components:

- Producer Layer: A Python script generating continuous trade events containing symbol, timestamp, price, and share quantity.
- Message Broker Layer: An Apache Kafka broker managing the stock-ticks topic with multiple partitions.
- Stream Processing Engine: A PySpark Structured Streaming application reading the topic stream.
- Storage and Sink Layer: A durable checkpoint directory tracking state and offset positions alongside target output folders for aggregated candlestick files.

Step 1: Kafka Topic Initialization:

- Start the Kafka environment along with KRaft or ZooKeeper cluster management services.
- Create a topic named stock-ticks using the kafka-topics command-line tool.
- Assign at least three partitions to the topic to allow concurrent multi-threaded processing.
- Set a replication factor of one for local standalone lab environments, or three for production multi-node clusters.
- Verify topic creation and inspect partition distribution using the describe command.

Step 2: Building the Stock Data Producer:

- Use a Python library such as kafka-python or confluent-kafka to initialize a KafkaProducer instance.
- Configure bootstrap servers pointing to the local or remote Kafka broker address.
- Define a serialization function to encode Python dictionaries into UTF-8 JSON byte strings.
- In a continuous loop, generate mock trade ticks representing popular equities such as AAPL, MSFT, and GOOGL.
- Assign the stock symbol as the message key to guarantee that all trade records for a given stock land in the same partition.
- Add randomized microsecond sleeps between message sends to simulate fluctuating market trade velocity.

Step 3: Ingestion with Spark Structured Streaming:

- Initialize a SparkSession configured with the spark-sql-kafka dependency package.
- Use spark.readStream with format set to kafka to establish the streaming connection.
- Set the kafka.bootstrap.servers option to the Kafka broker address.
- Set t