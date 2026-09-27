# Migration in progress
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

1. **Deploy a second instance** of the streaming jo