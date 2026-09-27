# Lesson 2: Instance Types and Pricing Models

This lesson goes deeper into EC2 instance types and pricing models. It explains how instance families are organized, what each family is optimized for, and how to match workloads to the right instance type. It then covers the four pricing models in detail, including commitment levels, discounts, and interruption risks. The goal is to build the judgment needed to right-size instances and choose the most cost-effective pricing model.

```mermaid
flowchart TD
    A[EC2 Instance Types and Pricing] --> B[Instance Families]
    A --> C[Pricing Models]
    A --> D[Graviton Processors]
    A --> E[Cost Optimization]
    B --> B1[General Purpose]
    B --> B2[Compute Optimized]
    B --> B3[Memory Optimized]
    B --> B4[Storage Optimized]
    B --> B5[Accelerated Computing]
    C --> C1[On-Demand]
    C --> C2[Reserved Instances]
    C --> C3[Savings Plans]
    C --> C4[Spot Instances]
```

## EC2 Instance Families

EC2 instances are grouped into families based on their hardware characteristics and the workloads they are designed to run. AWS offers over 1,000 instance types across these families, each with different combinations of vCPU, memory, storage, and networking. Choosing the right family is the first step in right-sizing.

### General Purpose Instances

*Definition*: General purpose instances provide a balanced mix of compute, memory, and networking resources. They are the default choice for workloads that do not have a strong bias toward any single resource.

- Best for web servers, application servers, small and midsize databases, and development environments.
- Instance families include M (M5, M6i, M7g, M8g, M9g) and T (T2, T3, T4g) for burstable workloads.
- M-family instances are the most common general purpose choice for production workloads.
- T-family instances use CPU credits to provide a baseline level of performance with the ability to burst above baseline when needed.
- T4g instances are powered by AWS Graviton2 and are free-tier eligible.

> [!Tip]
> **Start with general purpose unless you have a specific need**: For most workloads, a general purpose instance from the M or T family is the right starting point. Move to a specialized family only when you can measure that the workload is consistently constrained by CPU, memory, storage, or GPU.

### Compute Optimized Instances

*Definition*: Compute optimized instances are designed for compute-intensive applications that benefit from high-performance processors.

- Best for batch processing, media transcoding, high-performance web servers, HPC, scientific modeling, dedicated gaming servers, and machine learning inference.
- Instance families include C5, C6i, C7g, C8i, and C9g.
- C7g and C9g are powered by AWS Graviton processors and offer the best price-performance for compute-intensive workloads.
- C8i and C8i-flex are powered by custom Intel Xeon 6 processors and are suited for workloads like web servers, caching, Apache Kafka, and distributed analytics.

> [!Important]
> **Compute optimized is not the same as memory optimized**: A compute optimized instance may have less memory than a general purpose instance at the same vCPU count. Verify the memory-to-vCPU ratio matches your workload before committing.

### Memory Optimized Instances

*Definition*: Memory optimized instances are designed for workloads that process large data sets in memory.

- Best for in-memory databases (Redis, Memcached), real-time big data analytics, and high-performance databases.
- Instance families include R (R5, R6i, R7g, R8g, R9g) and X (X1, X2) for extremely large memory footprints.
- R-family instances offer a higher memory-to-vCPU ratio than general purpose instances.
- R9g instances are powered by Graviton5 and deliver up to 25% better performance than the previous R8g generation.

> [!Tip]
> **Memory optimized instances are ideal for caching fleets**: If your workload runs an in-memory cache or database, a memory optimized instance from the R family gives you more memory per vCPU, reducing the number of instances you need.

### Storage Optimized Instances

*Definition*: Storage optimized instances are designed for workloads that require high, sequential read and write access to very large data sets on local storage.

- Best for data warehousing, distributed file systems, and high-frequency online transaction processing (OLTP) systems.
- Instance families include D (dense storage), H (HDD storage), and I (high IOPS SSD storage).
- I8ge instances are powered by Graviton4 and deliver up to 60% better compute performance than Graviton2-based equivalents.
- Storage optimized instances provide high IOPS and throughput to local instance store volumes.

### Accelerated Computing Instances

*Definition*: Accelerated computing instances use hardware accelerators, or co-processors, to perform functions such as floating-point number calculations, graphics processing, or data pattern matching more efficiently than is possible in software running on CPUs.

- Best for machine learning training and inference, graphics rendering, scientific simulation, and video encoding.
- Instance families include P (GPU training), G (GPU graphics), Inf (inference), and Trn (training).
- P4, P5, and P6 instances are designed for high-performance deep learning training.
- G5 and G7 instances are designed for graphics-intensive workloads and general-purpose GPU computing.
- Inf2 instances are designed for deep learning inference at scale.
- Trn1 and Trn2 instances are powered by AWS Trainium chips and offer up to 50% cost-to-train savings.

> [!Important]
> **Accelerated computing instances are the most expensive per hour**: A GPU instance can cost 10-20 times more per hour than a general purpose instance. Use them only for workloads that genuinely require GPU or FPGA acceleration, and consider Spot Instances for fault-tolerant training jobs.

## Graviton Processors

AWS Graviton is a family of custom silicon processors based on Arm architecture. They are designed to deliver the best price-performance for cloud workloads running on EC2.

- Graviton5 is the latest generation, powering instances like C9g, M9g, and R9g.
- Graviton5 delivers up to 25% better compute performance than Graviton4.
- Graviton-based instances offer up to 40% better price-performance than comparable x86 instances.
- Graviton4 powers storage-optimized instances like I8ge and offers up to 60% better compute performance than Graviton2-based equivalents.
- Graviton5 introduces the Nitro Isolation Engine, which uses formal verification to provide mathematical certainty that customer workloads are isolated from each other and from AWS operators.

### Real-World Benchmark

A Phoronix benchmark compared M8 instances powered by AMD EPYC Turin (M8a), Intel Xeon 6 Granite Rapids (M8i), and Graviton4 (M8g) at the same vCPU count (16 vCPUs, 64 GB RAM). The on-demand prices were:

| Instance | Processor | On-Demand Price (per hour) |
|---|---|---|
| m8g.4xlarge | AWS Graviton4 | $0.718 |
| m8i.4xlarge | Intel Xeon 6 Granite Rapids | $0.847 |
| m8a.4xlarge | AMD EPYC Turin | $0.974 |

> [!Tip]
> **Graviton is not a niche option**: If your application runs on Linux and supports Arm, Graviton typically offers 20-40% better price-performance than x86 equivalents. Test your workload on Graviton before committing to x86 for new deployments.

## EC2 Pricing Models

EC2 offers four pricing models designed to match different workload patterns and commitment levels. Choosing the right model is the single largest cost lever in EC2.

### Pricing Model Comparison

| Model | Commitment | Discount vs On-Demand | Interruption Risk | Best For |
|---|---|---|---|---|
| On-Demand | None | Baseline | None | Unpredictable workloads, short-term needs |
| Reserved Instances | 1 or 3 years | Up to 72% | None | Steady-state, predictable workloads |
| Savings Plans | 1 or 3 years | Up to 72% | None | Flexible workloads across instance families |
| Spot Instances | None | Up to 90% | Yes (2-minute warning) | Fault-tolerant, flexible workloads |

### On-Demand Pricing

- Pay per hour or second with no upfront cost and no long-term commitment.
- Per-second billing with a 60-second minimum eliminates the cost of unused compute time.
- Best for workloads with unpredictable traffic, short-term projects, and development or testing environments.
- No interruption risk. You pay for exactly what you use.

### Reserved Instances

- Commit to a specific instance family in a specific region for a 1-year or 3-year term.
- Offer a significant discount compared to On-Demand pricing, up to 72%.
- A 1-year Standard RI brings around 40% discount on On-Demand, and a 3-year Standard RI around 60%.
- Provide capacity reservation options for zonal RIs.
- Can be resold on the AWS marketplace if no longer needed.
- Best for steady-state, predictable workloads.

### Savings Plans

- Commit to a consistent amount of compute usage (measured in dollars per hour) for a 1-year or 3-year term.
- Two types: Compute Savings Plans (apply to EC2, Lambda, and Fargate across any region) and EC2 Instance Savings Plans (apply to a specific instance family in one region).
- Offer up to 72% discount, similar to Reserved Instances.
- More flexible than Reserved Instances because they apply automatically to eligible usage.
- Best for workloads that may change instance families or regions over time.

### Spot Instances

- Use spare EC2 capacity at up to 90% discount compared to On-Demand.
- Can be interrupted with a two-minute warning when AWS needs the capacity back.
- Best for fault-tolerant workloads: batch processing, CI/CD, big data analytics, and stateless web servers.
- Spot Fleet and EC2 Auto Scaling can manage Spot Instances automatically, replacing interrupted instances.
- Should never be used for workloads that cannot tolerate interruption, such as databases or stateful applications.

> [!Important]
> **Spot Instances require interruption-tolerant design**: Use Spot Instances for stateless, fault-tolerant workloads that can be restarted. Use Auto Scaling groups with mixed instance policies to automatically replace interrupted Spot Instances with On-Demand or new Spot capacity.

## Reserved Instances vs Savings Plans

| Dimension | Reserved Instances | Savings Plans |
|---|---|---|
| Commitment | Instance family, region, OS, tenancy | EC2: instance family and region; Compute: any region |
| Flexibility | Low | High (Compute Savings Plans) |
| Discount | Up to 72% | Up to 72% (EC2); up to 66% (Compute) |
| Capacity Reservation | Yes (zonal RIs) | No |
| Resale | Yes (marketplace) | No |
| Coverage | EC2 only | EC2, Lambda, and Fargate (Compute Savings Plans) |

- Reserved Instances provide capacity reservation options and can be resold on the AWS marketplace.
- Savings Plans are more flexible and apply automatically to eligible usage.
- Compute Savings Plans cover EC2, Lambda, and Fargate across any region and instance family.
- EC2 Instance Savings Plans offer the lowest prices with a commitment to a specific instance family in one region.

> [!Tip]
> **Start with Compute Savings Plans**: If you are unsure about long-term instance family choices, Compute Savings Plans offer the best balance of discount and flexibility. They cover EC2, Lambda, and Fargate across any region.

## Cost Optimization Strategy

The key to EC2 cost optimization is matching the pricing model to the workload pattern and right-sizing instances to the workload profile.

### Decision Framework

```mermaid
flowchart TD
    A[Start Cost Optimization] --> B{Workload Predictable?}
    B -->|Yes, 24/7| C[Reserved Instances or Savings Plans]
    B -->|No, Variable| D{Fault Tolerant?}
    B -->|Short-Term| E[On-Demand]
    D -->|Yes| F[Spot Instances]
    D -->|No| G[On-Demand or Savings Plans]
    C --> H{Instance Family Stable?}
    H -->|Yes| I[EC2 Instance Savings Plans or RIs]
    H -->|No| J[Compute Savings Plans]
    F --> K[Auto Scaling with Mixed Instances]
    G --> L[Right-Size and Monitor]
```

### Right-Sizing

- Right-sizing means choosing the smallest instance type that meets the workload's performance requirements.
- Over-provisioning wastes money. Under-provisioning hurts performance.
- Use AWS Compute Optimizer to get recommendations based on historical utilization metrics.
- Review instance utilization regularly and adjust as workload patterns change.
- Graviton instances often provide better price-performance than x86 for compatible workloads.

> [!Important]
> **Right-sizing is continuous**: Workload patterns change. An instance that was right-sized six months ago may be over-provisioned today. Review utilization monthly and adjust instance types and pricing models accordingly.

### Cost Optimization Checklist

| Action | Expected Savings |
|---|---|
| Use Graviton instances for compatible workloads | 20-40% better price-performance |
| Commit with Savings Plans for steady-state usage | Up to 72% |
| Use Spot Instances for fault-tolerant workloads | Up to 90% |
| Right-size instances with Compute Optimizer | 10-30% |
| Use Auto Scaling to match capacity to demand | Variable |
| Delete unused instances and volumes | 100% of wasted cost |

> [!Tip]
> **Layer your cost strategy**: Start with right-sizing and Graviton migration. Then commit with Savings Plans for predictable baseline usage. Then use Spot Instances for the flexible portion. This layered approach captures the most savings without sacrificing reliability.

## Assessment Preparation

### Practice Questions

1. List the five EC2 instance families and describe the workload profile each is optimized for.
2. Explain how Graviton processors differ from x86 processors and what benefits they offer.
3. Compare the four EC2 pricing models in terms of commitment, discount, and interruption risk.
4. Explain the difference between Reserved Instances and Savings Plans.
5. Describe when Spot Instances are appropriate and when they should be avoided.
6. Explain how right-sizing contributes to cost optimization.
7. Describe how to layer cost optimization strategies for maximum savings.

### Scenario Questions

**Scenario 1: Steady-State Web Application**
A company runs a web application with predictable traffic that runs 24/7. The application is Linux-based and uses Python. Which instance family and pricing model should they use?

- Use general purpose instances like M7g or M9g powered by Graviton.
- Use Reserved Instances or EC2 Instance Savings Plans for up to 72% discount.
- Deploy across multiple Availability Zones for high availability.
- Test the application on Graviton before committing to x86.

**Scenario 2: Batch Processing Job**
A research team needs to run large-scale batch processing jobs that can be interrupted and restarted. The jobs run for 2-4 hours each. Which pricing model should they use?

- Use Spot Instances for up to 90% discount.
- Choose compute optimized instances like C7g or C9g.
- Use Auto Scaling groups with mixed instance policies to handle interruptions.
- Design the job to checkpoint progress so it can resume after interruption.

**Scenario 3: In-Memory Database**
A company needs to run a Redis cache with a large memory footprint. The workload is steady-state and runs continuously. Which instance family and pricing model should they use?

- Use memory optimized instances like R7g or R9g.
- Use Reserved Instances for steady-state workloads to get up to 72% discount.
- Enable EBS encryption for data at rest.
- Monitor memory utilization and right-size as the cache grows.

**Scenario 4: Machine Learning Training**
A team needs to train deep learning models with GPU acceleration. Training jobs run for several hours and can be checkpointed. Which instance family and pricing model should they use?

- Use accelerated computing instances like P4, P5, or Trn1.
- Use Spot Instances for fault-tolerant training jobs to reduce cost.
- Consider Savings Plans for predictable training workloads.
- Use checkpointing to resume training after Spot interruptions.

## Key Takeaways

- EC2 offers over 1,000 instance types across five families: general purpose, compute optimized, memory optimized, storage optimized, and accelerated computing.
- General purpose instances (M, T) provide balanced resources for most workloads. Compute optimized (C) is for CPU-bound workloads. Memory optimized (R, X) is for in-memory databases. Storage optimized (D, H, I) is for high IOPS and throughput. Accelerated computing (P, G, Inf, Trn) is for GPU and ML workloads.
- AWS Graviton processors offer up to 40% better price-performance than comparable x86 instances.
- EC2 pricing models include On-Demand, Reserved Instances, Savings Plans, and Spot Instances.
- Reserved Instances and Savings Plans offer up to 72% discount for 1- or 3-year commitments.
- Spot Instances offer up to 90% discount but can be interrupted with a two-minute warning.
- Savings Plans are more flexible than Reserved Instances and cover EC2, Lambda, and Fargate.
- Right-sizing is the first step in cost optimization. Use Compute Optimizer to identify over-provisioned instances.
- Layer your cost strategy: right-size, migrate to Graviton, commit with Savings Plans, and use Spot for flexible capacity.
- Match instance family to the workload profile and pricing model to the workload pattern.

> [!Important]
> **Match the instance family to the workload, and the pricing model to the pattern**: The two biggest decisions in EC2 are which instance family to use and which pricing model to choose. Choosing the wrong family leads to poor performance or wasted cost. Choosing the wrong pricing model leaves money on the table. Right-size continuously and commit only when usage is predictable.
