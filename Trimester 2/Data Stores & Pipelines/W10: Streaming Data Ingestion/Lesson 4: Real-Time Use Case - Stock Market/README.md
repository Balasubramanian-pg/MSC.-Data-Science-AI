# Lesson 4: Real-Time Use Case - Stock Market

Real-Time Use Case: Stock Market Ticker Pipeline:

Financial markets generate continuous streams of high-velocity market data, including order book updates, trade executions, bid-ask quotes, and index calculations. Financial institutions, algorithmic trading desks, and retail brokerage platforms rely on streaming pipelines to process millions of trade ticks per second with sub-second latency. This use case examines the end-to-end architecture, windowing calculations, time semantics, and fault tolerance mechanisms required to process live stock market data.

Market Ingestion Requirements:

- High event volume: Major equity exchanges generate hundreds of thousands of events per second during peak market opening and closing hours.
- Strict ordering per asset: Price movements for a specific stock ticker must be evaluated in exact chronological sequence to calculate accurate prices.
- Low-latency delivery: Market participants require analytical aggregates delivered within hundreds of milliseconds to detect momentum shifts and trigger automated trading strategies.
- Audit trail compliance: Regulatory financial standards mandate that every individual trade tick be persisted immutably for compliance monitoring and post-trade reporting.

System Architecture:

- Source connectivity: Financial feeds receive raw messages from exchange protocols such as FIX or binary feeds, converting raw network packets into structured JSON or Avro trade payloads.
- Message ingestion layer: Apache Kafka acts as the high-throughput buffer. Topics are partitioned by ticker symbol, ensuring that all trades for an individual stock land in the same partition in sequential order.
- Real-time processing engine: Spark Structured Streaming or Apache Flink consumes trade partitions to compute running metrics, aggregate candlestick bars, and detect market volatility spikes.
- Fast serving layer: In-memory key-value databases like Redis cache the latest prices, trade volumes, and moving averages for low-latency web interfaces and trading applications.
- Long-term historical store: Micro-batches write raw and aggregated ticks directly into columnar Delta Lake or Parquet files on cloud storage for quantitative research and model backtesting.

Stateful Market Calculations and Windowing:

- Candlestick bar generation: Tumbling windows of one minute, five minutes, or one hour group trades to calculate Open, High, Low, Close, and Volume (OHLCV) values. The open and close prices are derived from the earliest and latest trade records within the window, while high and low represent maximum and minimum trade prices.
- Volume-Weighted Average Price: Sliding windows calculate VWAP across rolling time intervals by dividing the cumulative dollar volume of all trades by the cumulative share volume.
- Moving averages: Real-time streams track simple moving averages and exponential moving averages over five-minute and fifteen-minute horizons to supply inputs for automated trading algorithms.
- Volatility alerts: Stateful anomaly filters trigger real-time alerts when a stock price moves beyond a defined percentage threshold within a thirty-second rolling window.

Time Semantics and Watermarking in Trading Feeds:

- Event time prioritization: Stock calculations must rely strictly on the exchange execution timestamp rather than consumer ingestion or system processing timestamps.
- Network jitter and delay: Disparate network routes between exchanges and data centers cause trade records to arrive out of chronological order.
- Watermark configuration: Stream engines define watermarks, such as five seconds, to instruct the engine to hold open window aggregations for late-arriving trade records before closing the window and writing to sinks.
- Handling expired records: Ticks arriving after the watermark threshold expires are rejected from primary candlestick aggregations and routed to a dedicated late-trade reconciliation log for auditing.
- Important: In stock market streaming, partitioning strictly by ticker symbol is critical because global multi-ticker ordering cannot be maintained across a distributed cluster.

Durability and High-Availability Engineering:

- Lossless producer settings: Kafka producers transmitting trade events use acks set to all, enable idempotent transmission, and use high retry counts to prevent dropped or duplicate trade signals.
- Checkpoint persistence: Streaming engines store offset checkpoints and window state stores in high-performance cloud object storage or distributed file systems to enable fast failover without losing intermediate calculations.
- Consumer lag monitoring: Trading operations monitor consumer lag metrics continuously. Growing lag triggers automated horizontal scaling of consumer pods to prevent analytical latency from exceeding trading service level agreements.

Key Takeaways:

- Stock market streaming requires low latency, fault tolerance, and guaranteed message ordering per asset.
- Partitioning Kafka topics by ticker symbol ensures that all events for a specific stock are processed sequentially.
- Tumbling windows aggregate raw trade ticks into standard OHLCV financial candlestick bars.
- Sliding windows compute continuous technical indicators such as rolling moving averages and Volume-Weighted Average Price.
- Event-time processing and watermarking allow stream engines to process delayed trades accurately while bounding intermediate memory state.
- Enterprise setups pair fast in-memory caches for real-time dashboards with durable columnar lakehouses for long-term quantitative backtesting.
