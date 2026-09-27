# Migration in progress
# Lesson 0: Module Introduction

Module Introduction: Streaming Data Ingestion:

Week 10 of Data Stores and Pipelines marks the transition from batch-oriented processing to continuous, real-time event streaming architectures. Modern digital businesses require data delivery measured in seconds or milliseconds rather than hours or days. This module introduces the architectural frameworks, distributed message brokers, delivery semantics, and design patterns required to ingest continuous event data at scale.

Context and Industry Need:

- Traditional batch pipelines accumulate records over hours or days before executing transformation jobs, introducing unavoidable analytical latency.
- Contemporary use cases such as credit card fraud detection, dynamic pricing, real-time logistics tracking, and operational monitoring demand immediate data availability.
- Event-driven architectures treat information as a continuous stream of occurrences rather than static database snapshots.
- Streaming ingestion systems decouple data producers from downstream consumers, preventing operational spikes from degrading analytical systems.

Module Learning Objectives:

- Understand the fundamental characteristics of unbounded data streams compared to bounded batch datasets.
- Master the internal mechanics of distributed append-only message logs, focusing on topic partitioning, consumer groups, and offset tracking.
- Analyze the trade-offs between delivery guarantees, specifically evaluating at-most-once, at-least-once, and exactly-once processing semantics.
- Resolve temporal complexities in distributed environments by differentiating between event time, ingestion time, and processing time.
- Implement event-time windowing and watermark strategies to process delayed, unordered records without data loss.
- Compare enterprise stream architectures, contrasting the dual-layer Lambda architecture against the stream-first Kappa architecture.

Weekly Lesson Structure:

- Lesson 1: Streaming Fundamentals and Event Concepts. Covers the transition from batch files to continuous event logs, message envelopes, and low-latency ingestion char