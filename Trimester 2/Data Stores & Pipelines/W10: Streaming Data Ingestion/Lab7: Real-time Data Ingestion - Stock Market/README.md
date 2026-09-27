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
- Set the subscribe option to stock-ticks.
- Set the startingOffsets option to latest to process new market data as it arrives.
- The resulting streaming DataFrame exposes metadata fields including key, value, topic, partition, and offset.

Step 4: Payload Extraction and Schema Enforcement:

- Define an explicit StructType schema matching the incoming trade event structure with symbol as string, timestamp as timestamp, price as double, and volume as long.
- Cast the binary value column to a string using standard PySpark SQL functions.
- Parse the string column into structured DataFrame columns using the from_json function along with the defined schema.
- Select the parsed fields into top-level columns and verify column data types.

Step 5: Event-Time Windowing and Candlestick Aggregation:

- Apply a watermark to the trade timestamp column, such as withWatermark using a ten-second threshold, to bound late-arriving trade records.
- Group the streaming DataFrame by the stock symbol and a tumbling window of one minute defined on the trade timestamp column.
- Compute the aggregate volume using the sum function.
- Compute the highest price using the max function and lowest price using the min function within each window.
- Extract the opening price and closing price using first and last aggregation functions ordered by the trade timestamp.
- Important: In Spark Structured Streaming, computing accurate first and last values within a window requires careful timestamp sorting to ensure valid market candlestick results.

Step 6: Writing Stream Output with Checkpointing:

- Write the aggregated stream using writeStream with an appropriate output mode.
- Use append mode when writing finalized window records to file sinks alongside an event-time watermark.
- Use update mode or complete mode when streaming directly to memory or console sinks for interactive dashboard monitoring.
- Specify a durable checkpointLocation directory on local disk, HDFS, or cloud object storage.
- Trigger the query using a processing time interval, such as every ten seconds, and call awaitTermination to keep the stream running.

Validation and Monitoring:

- Check Kafka producer activity by running a console consumer to inspect raw outgoing JSON payloads.
- Observe Spark execution in the Spark Web UI, tracking input rate, process rate, and micro-batch completion times.
- Inspect the checkpoint directory to verify that commit logs and offset files are incrementing with each micro-batch.
- Verify partition pruning and window emissions by querying output Parquet files after several one-minute windows expire.

Key Takeaways:

- Streaming market pipelines require message keys to preserve sequential trade tick ordering per equity ticker.
- Explicit schema parsing with from_json converts unstructured Kafka byte streams into typed Spark DataFrames.
- Tumbling windows aggregate unbounded raw trade ticks into bounded one-minute OHLCV financial bars.
- Watermarks dictate how long Spark waits for delayed trade ticks before closing a window and freeing state memory.
- Durable checkpointing provides fault recovery, ensuring streaming queries resume from exact offsets after failures.
