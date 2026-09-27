# Lesson 4: Event-Driven Pipelines

Here are structured notes on **Event-Driven Pipelines**, based on industry sources and your course module context.

## What Event-Driven Pipelines Are

Event-driven architecture (EDA) for data pipelines is a design pattern where **data movement is triggered by events** — a row inserted into a database, a file landing in object storage, a user completing a transaction — **rather than a fixed schedule**.

- **Instead of waiting for a batch window**, each event flows through a message broker to downstream consumers **the moment it occurs**.
- **Batch and streaming are not fundamentally different architectures** — they are the **same model operating at different speeds**. When teams design pipelines around intervals instead of events, they **lock themselves into unnecessary complexity** and make future change expensive.
- **Designing workloads as streams first** allows processing speed to become a **configuration choice** rather than an architectural constraint.

> [!IMPORTANT]
> **Event-driven pipelines react to data the moment it changes, not when a schedule says so — making change explicit removes the need for artificial intervals.**

## Core Components

Event-driven pipelines have **four foundational components**:

- **Producers** — Data sources that **emit events when state changes occur** (applications, databases, IoT devices, APIs).
- **Broker** — A message broker (**Kafka, Pulsar, Kinesis, EventBridge**) **stores and routes events** to subscribers. It receives events from producers, **durably stores them**, and makes them available to one or more consumers — often **replaying them** for new consumers or audit purposes.
- **Consumers** — Pipelines and jobs that **process each event** and pass results downstream.
- **CDC (Change Data Capture)** — Streams database mutations as events in **real time without full table scans**, cutting warehouse latency to seconds.
- **Schema Registry** — **Enforces event format contracts** between producers and consumers, standardizing event formats so consumers can generate code bindings rather than parsing one-time JSON.

> [!IMPORTANT]
> **The message broker is the backbone — it decouples producers from consumers, enables independent scaling, and provides durable event storage for replay.**

## Key Architecture Patterns

### Fan-In and Fan-Out

- **Fan-in** — **Multiple data sources are ingested and processed within a single pipeline**. This pattern handles real-time event streams (Kafka, Kinesis) and cloud storage (S3, ADLS, GCS) converging into one processing flow.
- **Fan-out** — **A single processed data stream is routed to multiple destinations**. This **one-to-many** approach enables different downstream systems (analytics, search, cache, microservices) to consume the same event stream independently.

### CDC-to-Kafka (Event Backbone)

- **Treat your database as the event source it already is** — every transaction that commits writes to its transaction log, and CDC reads that log and **publishes each change as a Kafka event**.
- **The result is an event backbone** that every downstream system can subscribe to, built **without modifying a single line of application code**.
- **CDC from the transaction log sidesteps dual-write problems**: there is **no dual-write risk** because the database transaction is the **single source of truth**; there are **no application code changes**; and there is **no polling delay**.

> [!IMPORTANT]
> **CDC-to-Kafka turns your existing database into a real-time event source — the transaction log captures every INSERT, UPDATE, and DELETE, and Kafka distributes it without application changes.**

### Event Sourcing

- **Event sourcing** stores **state changes as events in a data store** rather than storing only current state. This preserves **full history** and enables **temporal queries** and **replay**.
- Often paired with **CQRS (Command Query Responsibility Segregation)** or materialized views to update data projections, accepting **eventual consistency** from events.

### Fan-In/Fan-Out with Declarative Pipelines

- **Use independent streams for destination-specific logic** when ETL logic varies across targets.
- **ForEachBatch** can be used for **custom routing** when a single stream needs to be routed differently based on content.

> [!IMPORTANT]
> **Fan-in and fan-out patterns let you consolidate multiple event sources into one pipeline and then route that stream to multiple consumers — enabling flexible, scalable event distribution.**

## Push vs. Pull Architecture

Event-driven pipelines use a **push architecture**: the **server pushes data to clients** as updates become available. With a data orchestrator acting as a client, instructions for which task to execute next are **pushed to the client by a data asset when it changes state**.

- **Sensors use a pull architecture**: they **continuously occupy compute resources** and **halt pipeline execution** until they receive the request they are waiting for.
- **Push-based delivery reduces latency** between event occurrence and agent invocation; **filtering at the event bus reduces compute waste** by invoking agents only for relevant events.

**Pull architecture pros and cons**:
- **Pros:** Avoids running no-op pipelines, more efficient than scheduling.
- **Cons:** Could **miss critical events** between pulls.

**Push architecture pros and cons**:
- **Pros:** Lower latency, enables dependent runs, no wasted compute during idle periods.
- **Cons:** Requires event infrastructure, may require idempotency handling.

> [!IMPORTANT]
> **Push architectures deliver events the moment they occur with no idle compute cost; pull architectures avoid unnecessary runs but risk missing events between polling intervals.**

## Event-Driven vs. Batch: The Real Difference

- **Batch systems**: The unit is usually a **job run**. You pay when the job runs. Cost is tied to compute hours, storage scans, and job orchestration.
- **Event-driven systems**: The unit is an **event**. The architecture is built around **triggers** — a new order arrives, a file lands in S3, a row changes in DynamoDB. Something happens **immediately**.
- **From a finance lens**, this becomes a math problem: **cost per batch job run vs. cost per event processed**.
- **Batch systems concentrate cost into time windows; event systems distribute cost across the day**. The shape of your workload matters more than ideology.
- **Batch systems do not care about micro-spikes**; they scan what is there when they run. **Streaming systems care deeply** — a flash sale can multiply event volume, meaning more Lambda invocations and more throughput costs.

> [!IMPORTANT]
> **The unit of cost shifts from job runs to individual events — event-driven systems distribute cost across the day but are sensitive to volume spikes.**

## Benefits of Event-Driven Pipelines

- **Low latency** — Events are processed the moment they occur, enabling **real-time dashboards, alerting, and anomaly detection**.
- **Decoupled producers and consumers** — Brokers enable **independent scaling** and development.
- **Replay capability** — Kafka's retention model means downstream teams can **join a pipeline after the fact and replay historical events** — a capability batch pipelines cannot offer.
- **No dual-write risk** — CDC reads the transaction log, so the database transaction is the **single source of truth**.
- **No application code changes** — CDC-to-Kafka captures changes **without modifying application code**.
- **Backfills become replays** — With event-based systems, **backfills become replays**, late data becomes a **first-class concern**, and debugging shifts from **job-centric to time-centric reasoning**.

> [!IMPORTANT]
> **Event-driven pipelines decouple producers from consumers, enable replay for backfills, and eliminate dual-write complexity by reading directly from transaction logs.**

## Challenges and Anti-Patterns

### Common Anti-Patterns

- **Subscribing to broad event streams without filtering** — Forces agents to receive and process events they immediately discard, **wasting compute resources**.
- **Using polling-based event detection instead of push-based delivery** — Adds **latency** and consumes compute during **idle periods**.
- **Including full data payloads in events** rather than event references — Inflates **event size and network transfer time** when most consumers only need a subset.

### Operational Challenges

- **Distributed debugging** — Event-driven architectures are distributed, asynchronous, and often multi-service. Debugging can mean **tracing an event from API Gateway to Lambda to SQS to Glue to Redshift**.
- **Operational overhead is not always visible in cost reports** but shows up in **engineering hours**.
- **Governance and cross-instance coordination** emerge as ongoing challenges.
- **Cost sensitivity** — If you design poorly, your real-time pipeline becomes a **real-time bill shock**.

> [!IMPORTANT]
> **Unfiltered event subscriptions, polling instead of push delivery, and full payloads in events are the three most common anti-patterns — all waste compute and latency.**

## Best Practices

- **Configure content-based filtering** — Use event bus rules so agents receive only events whose attributes match their responsibilities.
- **Design minimal event schemas with references rather than full payloads** — Keep event payloads to **routing metadata and identifiers**, store full data in S3 or DynamoDB, and register schemas in a schema registry.
- **Implement DynamoDB Streams for data-change-driven triggers** — Trigger agents directly from data changes **without polling**.
- **Implement idempotency keys for event deduplication** — Apply idempotency keys so agents **don't process the same event twice** under at-least-once delivery.
- **Monitor event processing metrics** — Track **event-to-invocation latency, filter efficiency, and throughput**, and publish these metrics so filtering and routing can be tuned from measured behavior.
- **Use ForEachBatch for custom routing** when a single stream needs to be routed differently based on content.

> [!IMPORTANT]
> **Filter at the bus, keep events lightweight, use idempotency keys, and monitor event-to-invocation latency — these four practices prevent the most common event-driven failures.**

## Use Cases

- **Real-time dashboards and alerting** — When decisions depend on fresh data.
- **Anomaly detection** — Reacting to abnormal patterns as they emerge.
- **Microservices integration** — Decoupled services communicating via events.
- **Search indexing** — Keeping search indexes synchronized with database changes in near real-time.
- **Cache invalidation** — Updating caches when underlying data changes.
- **IoT and event monitoring** — Processing high-volume sensor data streams.
- **Fraud detection** — Identifying suspicious transactions as they occur.
- **Customer experience personalization** — Responding to user actions in real time.

> [!IMPORTANT]
> **Event-driven pipelines shine when the business value of fresh data exceeds the operational cost of distributed, always-on infrastructure.**

## Key Takeaway

Event-driven pipelines **shift the unit of work from job runs to individual events**. They **decouple producers from consumers**, enable **replay for backfills**, and **eliminate dual-write complexity** by reading directly from transaction logs. The trade-off is **operational complexity** — distributed debugging, cost sensitivity to volume spikes, and the need for disciplined filtering, idempotency, and schema management. The right approach is not "always real-time" but rather **designing workloads as streams first** so that processing speed becomes a **configuration choice** rather than an architectural constraint.

> [!IMPORTANT]
> **Design event-first, then choose your processing speed — this makes real-time a configuration choice, not an architectural commitment.**
