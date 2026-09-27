# Lesson 3: Lambda and Kappa Architectures

Here are structured notes on **Lambda and Kappa Architectures**, based on industry sources and your course module context.

## The Core Problem Both Architectures Solve

Both architectures address the same fundamental challenge: **how to process both historical (batch) and real-time (streaming) data in a single system**.

- **Batch processing** provides **accuracy** — it recomputes views from the complete dataset, fixing errors and handling late-arriving data.
- **Stream processing** provides **low latency** — it processes data as it arrives, enabling real-time responses.
- The tension: batch is accurate but slow; streaming is fast but may be approximate.

> [!IMPORTANT]
> **Lambda and Kappa are two answers to the same question: how do you balance accuracy with freshness in a data pipeline?**

## Lambda Architecture

Lambda was proposed by **Nathan Marz around 2011** and codified in his 2015 Manning book. It runs **two parallel pipelines** — batch for correctness and stream for freshness — and pays with dual codebases that can drift out of sync.

### Three Layers of Lambda

- **Batch Layer** — Manages the **master dataset** (immutable, append-only log) and pre-computes **batch views** by processing the complete dataset. This is the **source of truth** and aims for perfect accuracy.
- **Speed Layer (Real-Time Layer)** — Processes **recent incoming data** in real time, filling the gap between batch runs. Results are **approximate and temporary** — once batch layer catches up, speed layer outputs are discarded.
- **Serving Layer** — **Indexes batch views** for low-latency queries and **merges batch and speed results** at query time.

### How Data Flows in Lambda

1. **All incoming data is dispatched to both** batch and speed layers simultaneously.
2. The **batch layer** periodically recomputes views from the full history (hourly, daily).
3. The **speed layer** builds real-time views to answer queries **immediately**.
4. The **serving layer** merges both outputs to answer any incoming query.
5. Once batch processing catches up, **speed layer outputs can be discarded**.

### Advantages of Lambda

- **High accuracy** — batch layer recomputes from complete data, fixing any errors.
- **Low latency** — speed layer provides immediate results for recent data.
- **Fault tolerance** — immutable master dataset can reconstruct any view in case of failure.
- **Supports ML workflows** — batch layer trains models on historical data; speed layer enables real-time inference.

### Limitations of Lambda

- **Dual codebases** — same business logic must be written twice (batch framework + streaming framework).
- **Code drift** — different execution models, windowing semantics, and failure modes lead to **subtle discrepancies** that are painful to debug.
- **Reconciliation overhead** — the serving layer must merge batch and speed results and handle the transition when batch catches up.
- **Higher operational cost** — two pipelines mean **two on-call rotations, two scaling profiles, and constant drift-debugging**.

> [!IMPORTANT]
> **Lambda’s fundamental cost is maintaining the same logic in two separate distributed systems — as Jay Kreps put it, “exactly as painful as it seems like it would be.”**

## Kappa Architecture

Kappa was proposed by **Jay Kreps in 2014**, at the time leading data infrastructure at LinkedIn and co-creator of Kafka. His argument was straightforward: **if stream processing frameworks have matured enough to handle batch workloads, why maintain two systems?**

### The Core Idea

**Treat everything as a stream — including historical reprocessing.** Instead of maintaining a separate batch layer, Kappa stores all data in a **replayable, append-only log** (typically Kafka) and reprocesses by **replaying the log through an updated streaming job**.

The key insight: **a replayable log with sufficient retention IS your batch layer**. If you can read from the beginning of the log and replay every event through your streaming job, you get the same result as a batch recomputation — but using **the same code, the same framework, and the same operational model**.

### Three Components of Kappa

- **Immutable Log** — All incoming data is appended to a durable, ordered, replayable log (Kafka is the canonical implementation).
- **Stream Processing Layer** — A single streaming job reads from the log and applies transformations.
- **Serving Layer** — Makes processed results available for queries.

### How Reprocessing Works in Kappa

1. **Deploy a second instance** of the streaming job.
2. It reads from **offset zero** (the beginning of the log).
3. It processes **all historical events** through the same logic.
4. Once the replay **catches up**, reads **cut over to the new output table**.

### Advantages of Kappa

- **Single codebase** — one processing model for both historical and real-time data.
- **Eliminates code drift** — no reconciliation between two systems needed.
- **Simpler architecture** — fewer moving parts, lower operational burden.
- **Unified ML workflows** — same processing logic applies to historical training and real-time inference.
- **Industry momentum** — deployed by **Uber, Shopify, Twitter, Disney**, and others; considered the **default for modern architectures**.

### Limitations of Kappa

- **Requires high-performance streaming infrastructure** — must handle large-volume reprocessing and out-of-order events.
- **Log retention is critical** — log must retain data long enough to cover your worst-case replay window.
- **Reprocessing terabytes through a streaming engine may be infeasible** — some workloads are simply too large for pure streaming replay.
- **Higher data loss risk by design** — requires specific storage and recovery strategies.
- **Streaming engine must express every aggregation** the batch layer handled — if it can’t, Kappa won’t work.

> [!IMPORTANT]
> **Kappa eliminates Lambda’s operational tax but requires that your streaming engine can express all required analytics and that log retention covers every replay you will ever need.**

## Side-by-Side Comparison

| Dimension | Lambda | Kappa |
|---|---|---|
| **Pipelines** | Two (batch + stream) | One (stream-only) |
| **Codebases** | Dual — batch and streaming logic | Single — one processing model |
| **Accuracy** | High — batch recomputes from full history | High — if streaming engine handles all aggregations |
| **Latency** | Low — speed layer provides real-time views | Low — single streaming path |
| **Operational cost** | High — two on-call rotations, two scaling profiles | Lower — one pipeline to maintain |
| **Reprocessing** | Batch job recomputes from full dataset | Replay the log through updated streaming job |
| **Key dependency** | Batch framework (Spark, MapReduce) + streaming framework (Flink, Storm) | High-performance streaming infrastructure (Kafka, Flink) |
| **Best for** | Fraud detection, dashboards needing historical context, regulatory batch ground truth | IoT monitoring, log analysis, real-time event-driven systems, live analytics with historical reprocessing |

Source: 

> [!IMPORTANT]
> **The deciding dimension is whether the batch layer earns its operational cost — if streaming can handle everything, Kappa wins on simplicity.**

## When to Choose Which

**Choose Lambda when:**
- **Regulatory batch ground truth is required** — you need a provably correct batch recomputation.
- **Reprocessing terabytes through a streaming engine is infeasible**.
- Your streaming engine **cannot express every required aggregation**.
- You need **batch-grade correctness** as a non-negotiable requirement.

**Choose Kappa when:**
- Your **streaming engine can express all required analytics**.
- **Log retention covers your worst-case replay window**.
- You want to **eliminate dual codebases and reconciliation overhead**.
- You are **building a new modern architecture** — Kappa is now the **default choice** for new systems.

**Hybrid “Kappa-ish” approach:**
- Combine **streaming freshness with periodic batch reconciliation**.
- Use Kappa for most workloads, but fall back to Lambda-style batch for specific regulatory or high-volume reprocessing needs.

> [!IMPORTANT]
> **Default to Kappa when streaming can express everything and log retention is sufficient; fall back to Lambda when regulatory batch ground truth or massive reprocessing demands it.**

## Key Takeaway

**Lambda** solves the accuracy vs. latency problem by running **two pipelines** — it works, but the operational cost of maintaining dual codebases is real and constant. **Kappa** collapses both into **one streaming pipeline with log replay**, eliminating code duplication at the cost of requiring robust streaming infrastructure and sufficient log retention. The industry has largely shifted toward **Kappa as the default for new architectures**, but Lambda remains valid when **batch-grade correctness or massive reprocessing is non-negotiable**.

> [!IMPORTANT]
> **Both architectures solve the same problem — the choice comes down to whether the batch layer’s accuracy guarantee is worth the permanent operational tax of maintaining two codebases.**
