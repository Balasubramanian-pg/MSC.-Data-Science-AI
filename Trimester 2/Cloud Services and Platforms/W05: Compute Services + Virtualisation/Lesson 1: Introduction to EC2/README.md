# Migration in progress
# Lesson 1: Introduction to EC2

Amazon Elastic Compute Cloud (EC2) is the foundational compute service in AWS. It provides secure, resizable virtual servers called instances, giving you full control over the operating system and the flexibility to run almost any workload. EC2 is the most mature and widely used AWS compute service, offering over 1,000 instance types across Intel, AMD, and Arm processors.

```mermaid
flowchart TD
    A[Amazon EC2] --> B[Instance Families]
    A --> C[Pricing Models]
    A --> D[Key Features]
    A --> E[Security]
    A --> F[Use Cases]
    B --> B1[General Purpose]
    B --> B2[Compute Optimized]
    B --> B3[Memory Optimized]
    B --> B4[Storage Optimized]
    B --> B5[Accelerated Computing]
    C --> C1[On-Demand]
    C --> C2[Reserved Instances]
    C --> C3[Savings Plans]
    C --> C4[Spot Instances]
    D --> D1[Graviton Processors]
    D --> D2[Nitro System]
    D --> D3[EBS and Networking]
```

## What Is EC2

*Definition*: Amazon EC2 is a web service that provides secure, resizable compute capacity in the cloud as virtual servers. You can launch instances with a variety of operating systems, instance types, and configurations, paying only for the capacity you use.

- EC2 provides virtual servers with full OS-level control, from the kernel to the application.
- It offers over 1,000 instance types spanning Intel, AMD, and Arm processor architectures.
- It is backed by a 99.99% availability SLA for multi-AZ deployments.
- It supports a wide range of workloads including web applications, HPC, machine learning, and Windows workloads.
- The AWS Nitro System builds security into the foundation of every EC2 instance.

> [!Important]
> **EC2 is the foundation of AWS compute**: Understanding EC2 is essential because it underpins many other AWS services, including ECS, EKS, and even Lambda (which runs on EC2 infrastructure). The concepts of instance types, pricing models, and security groups apply across the AWS ecosystem.

## EC2 Instance Families

EC2 instances are grouped into families based on their compute, memory, storage, and networking characteristics. Choosing the right family is critical for cost and performance.

### Instance Family Comparison

| Family | Optimized For | Use Cases | Example Types |
|---|---|---|---|
| General Purpose | Balanced compute, memory, and networking | Web servers, application servers, small databases | M5, M6i, M7g, T3, T4g |
| Compute Optimized | High-performance processors | Batch processing, gaming, HPC, video encoding | C5, C6i, C7g, C9g |
| Memory Optimized | Large memory-to-vCPU ratio | In-memory databases, real-time big data analytics | R5, R6i, R7g, R9g, X1 |
| Storage Optimized | High sequential read/write and IOPS | Data warehousing, distributed file systems | D2, H1, I3, I8ge |
| Accelerated Computing | GPU or FPGA accelerators | Machine learning, graphics rendering, scientific simulation | P4, G5, G7, Inf2, Trn1 |

- General purpose instances like M7g offer the best price-performance for general workloads.
- Compute optimized instances like C9g are powered by AWS Graviton5 processors and offer the best price-performance for compute-intensive workloads.
- Memory optimized instances like R9g are powered by Graviton5 and deliver up to 25% better performance than the previous R8g generation.
- Accelerated computing instances like G7 feature NVIDIA RTX PRO 4500 GPUs and Intel Xeon Granite Rapids processors for demanding GPU workloads.

> [!Tip]
> **Choose instance family by workload profile**: Match the instance family to the dominant resource requirement. If the workload is CPU-bound, choose compute optimized. If it is memory-bound, choose memory optimized. If it needs GPUs, choose accelerated computing.

### AWS Graviton Processors

- Graviton is AWS's custom silicon family based on Arm architecture.
- Graviton5 is the latest generation, powering instances like C9g, M9g, and R9g.
- Graviton5 delivers up to 25% better performance than Graviton4 and up to 35% better web application performance.
- Graviton-based instances offer better price-performance than comparable Intel or AMD instances for many workloads.
- Graviton4 powers storage-optimized instances like I8ge, delivering up to 60% better compute performance than Graviton2-based equivalents.

> [!Important]
> **Graviton is not a niche option**: Graviton instances now power a significant share of AWS workloads. If your application runs on Linux and supports Arm, Graviton typically offers 20-40% better price-performance than x86 equivalents. Test your workload on Graviton before committing to x86 for new deployments.

## EC2 Pricing Models

EC2 offers four pricing models designed to match different workload patterns and commitment levels.

### Pricing Model Comparison

| Model | Description | Best For | Discount vs On-Demand |
|---|---|---|---|
| On-Demand | Pay per hour or second, no commitment | Unpredictable workloads, short-term needs | Baseline |
| Reserved Instances | Commit to 1 or 3 years | Steady-state, predictable workloads | Up to 72% |
| Savings Plans | Commit to a consistent amount of compute usage | Flexible workloads across instance families | Up to 72% |
| Spot Instances | Bid on unused EC2 capacity | Fault-tolerant, flexible workloads | Up to 90% |

- On-Demand pricing is per-second with a 60-second minimum, eliminating the cost of unused compute time.
- Reserved Instances offer the highest discount for steady-state workloads but require a commitment to a specific instance family in a region.
- Savings Plans offer similar discounts with more flexibility. Compute Savings Plans apply across EC2, Lambda, and Fargate in any region, while EC2 Instance Savings Plans apply to a specific instance family in one region.
- Spot Instances let you use spare EC2 capacity at up to 90% off On-Demand prices, but they can be interrupted with a two-minute warning when AWS needs the capacity back.

> [!Important]
> **Pricing model choice can cut costs by 72-90%**: A steady-state production workload can save up to 72% with Reserved Instances or Savings Plans. Fault-tolerant workloads can save up to 90% with Spot Instances. Choosing the right pricing model is the single largest cost lever in EC2.

### Reserved Instances vs Savings Plans

| Dimension | Reserved Instances | Savings Plans |
|---|---|---|
| Commitment | Instance family, region, OS, tenancy | EC2: instance family and region; Compute: any region |
| Flexibility | Low | High (Compute Savings Plans) |
| Discount | Up to 72% | Up to 72% (EC2); up to 66% (Compute) |
| Capacity Reservation | Yes (zonal RIs) | No |
| Resale | Yes (marketplace) | No |

- Reserved Instances provide capacity reservation options and can be resold on the AWS marketplace.
- Savings Plans are more flexible and apply automatically to eligible usage.
- Compute Savings Plans cover EC2, Lambda, and Fargate across any region and instance family.
- EC2 Instance Savings Plans offer the lowest prices with a commitment to a specific instance family in one region.

> [!Tip]
> **Start with Compute Savings Plans**: If you are unsure about long-term instance family choices, Compute Savings Plans offer the best balance of discount and flexibility. They cover EC2, Lambda, and Fargate across any region.

### Spot Instances

- Spot Instances use spare EC2 capacity and offer up to 90% discount compared to On-Demand.
- They can be interrupted with a two-minute warning when AWS needs the capacity back.
- They are ideal for fault-tolerant workloads: batch processing, CI/CD, big data analytics, and stateless web servers.
- Spot Fleet and EC2 Auto Scaling can manage Spot Instances automatically, replacing interrupted instances.
- Spot Instances should never be used for workloads that cannot tolerate interruption, such as databases or stateful applications.

> [!Important]
> **Spot Instances require interruption-tolerant design**: Use Spot Instances for stateless, fault-tolerant workloads that can be restarted. Use Auto Scaling groups with mixed instance policies to automatically replace interrupted Spot Instances with On-Demand or new Spot capacity.

## Key EC2 Features

### Instance Lifecycle

EC2 instances go through a lifecycle from launch to termination.

```mermaid
flowchart TD
    A[Launch] --> B[Pending]
    B --> C[Running]
    C --> D[Stopping]
    D --> E[Stopped]
    E --> C
    C --> F[Rebooting]
    F --> C
    C --> G[Terminating]
    G --> H[Terminated]
    C --> I[Hibernating]
    I --> E
```

- **Pending**: The instance is preparing to enter the running state.
- **Running**: The instance is active an