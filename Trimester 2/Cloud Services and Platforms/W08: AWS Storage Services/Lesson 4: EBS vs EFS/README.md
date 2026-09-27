# Lesson 4: EBS vs EFS

Amazon EBS and Amazon EFS are both storage services, but they solve fundamentally different problems. The clearest difference is that an EFS file system can be mounted on thousands of ECS tasks or EC2 instances simultaneously, while an EBS volume does not support concurrent access. This single difference explains almost every other distinction between them, including scope, durability, performance, and cost. EBS is block storage attached to a single instance. EFS is a shared file system for many instances.

```mermaid
flowchart TD
    A[EBS vs EFS] --> B[EBS: Block Storage]
    A --> C[EFS: File Storage]
    B --> B1[Single-AZ, single-instance]
    B --> B2[Low latency, high IOPS]
    B --> B3[Snapshots to S3]
    C --> C1[Multi-AZ, multi-instance]
    C --> C2[Shared NFS file system]
    C --> C3[Elastic, auto-scaling]
```

## Core Conceptual Difference

*Definition*: EBS provides persistent block-level storage volumes for use with EC2 instances. Think of an EBS volume as a network-attached hard drive that you create, attach to an instance, and use as a block device.

*Definition*: EFS provides a simple, scalable, fully managed elastic NFS file system for use with AWS Cloud services and on-premises resources. It is designed to provide shared access to a file system for multiple EC2 instances simultaneously.

| Dimension | EBS | EFS |
|---|---|---|
| Storage Type | Block | File |
| Access Method | Attached to one EC2 instance | Mounted over NFS by many clients |
| Concurrent Access | No | Yes |
| Protocol | Block device (NVMe) | NFSv4.1 / NFSv4.0 |
| Scope | Single Availability Zone | Regional (multi-AZ) |
| OS Support | Linux and Windows | Linux only |

> [!Important]
> **The concurrent access distinction is the first question**: If multiple instances or containers need to read and write the same data at the same time, you need EFS. If a single instance needs a high-performance block device for a database or boot volume, you need EBS. There is no overlap for this primary decision.

## Scope and Durability

### EBS Scope

- An EBS volume is tied to a specific Availability Zone and can only be attached to instances in that same AZ.
- To move a volume to a different AZ, you must create a snapshot and then create a new volume from the snapshot in the desired AZ.
- Data is replicated within the AZ for durability, but not across AZs.
- EBS durability is 99.8-99.9% for most volume types and 99.999% for io2 Block Express.

### EFS Scope

- EFS stores data redundantly across multiple Availability Zones, ensuring high availability and durability.
- EFS provides 99.999999999% (11 nines) durability and up to 99.99% availability for Regional file systems.
- One Zone EFS stores data in a single AZ and is designed for 99.9% availability.
- EFS is accessible from multiple AZs and multiple instances concurrently.

| Dimension | EBS | EFS |
|---|---|---|
| AZ Scope | Single AZ | Multi-AZ (Regional) or single AZ (One Zone) |
| Durability | 99.8-99.999% | 11 nines |
| Availability SLA | 99.99% (io2 Block Express) | 99.99% (Regional), 99.9% (One Zone) |
| Cross-AZ Access | No | Yes |
| Data Replication | Within AZ | Across AZs (Regional) |

> [!Important]
> **EBS is AZ-bound, EFS is regional**: If your architecture spans multiple Availability Zones, EBS volumes cannot be shared across them. You need to replicate data at the application level, use snapshots, or choose a different storage service. EFS is designed for multi-AZ access from the start.

## Performance and Throughput

### EBS Performance

- EBS performance depends on volume type, provisioned IOPS, and instance-level EBS bandwidth limits.
- gp3 provides a baseline of 3,000 IOPS and 125 MiB/s, with the ability to provision up to 16,000 IOPS and 1,000 MiB/s independently of volume size.
- io2 Block Express provides up to 256,000 IOPS and 4,000 MiB/s for mission-critical databases.
- st1 and sc1 are HDD-backed volumes for throughput-intensive and cold data workloads.
- EBS provides lower latency and higher single-client IOPS than EFS.

### EFS Performance

- EFS offers two performance modes: General Purpose (lowest per-operation latency) and Max I/O (higher aggregate throughput and IOPS for parallel workloads).
- EFS offers three throughput modes: Bursting (scales with file system size), Provisioned (fixed throughput independent of size), and Elastic (automatically scales with demand).
- Elastic throughput is the default for new file systems and generates up to 90,000 IOPS.
- EFS scales automatically from 1 MiB/s to 3 GiB/s based on activity.

| Performance Characteristic | EBS | EFS |
|---|---|---|
| Latency | Sub-millisecond | Low millisecond |
| Max IOPS | 256,000 (io2 Block Express) | 90,000 (Elastic throughput) |
| Max Throughput | 4,000 MiB/s | 3 GiB/s |
| Scaling Model | Manual volume resize or provision | Automatic |
| Single-Client Performance | Higher | Lower |
| Multi-Client Performance | Not supported | Designed for |

> [!Tip]
> **EBS wins on single-client performance, EFS wins on shared access**: For a database that needs sustained high IOPS from one instance, EBS is the clear choice. For a container fleet or web server cluster that needs a shared filesystem, EFS is the only option.

## Storage Classes and Cost Optimisation

### EBS Volume Types and Pricing

| Volume Type | Storage Media | Storage $/GB-mo | Max IOPS | Use Case |
|---|---|---|---|---|
| gp3 | SSD | $0.08 | 16,000 | Default for ~95% of workloads |
| gp2 | SSD | $0.10 | 16,000 | Legacy, migrate to gp3 |
| io2 Block Express | SSD | $0.125 | 256,000 | Mission-critical databases |
| io1 | SSD | $0.125 | 64,000 | Legacy high IOPS |
| st1 | HDD | $0.045 | — | Big data, data warehouses |
| sc1 | HDD | $0.015 | — | Cold data, infrequent access |

### EFS Storage Classes and Pricing

| Storage Class | Designed For | Latency | Min File Size | Min Duration |
|---|---|---|---|---|
| EFS Standard | Frequently accessed data | Sub-millisecond | None | None |
| EFS Infrequent Access (IA) | Data accessed a few times per quarter | Tens of milliseconds | 128 KiB | None |
| EFS Archive | Data accessed a few times per year or less | Tens of milliseconds | 128 KiB | 90 days |

- EFS Lifecycle Management automatically moves files between storage classes based on access patterns.
- EFS IA and Archive have a minimum billable file size of 128 KiB.
- EFS Archive has a minimum storage duration of 90 days.

> [!Important]
> **EFS Archive is not available for all throughput modes**: The EFS Archive storage class is only supported for file systems with Elastic throughput. You cannot upgrade the throughput of a file system to Bursting or Provisioned once it contains Archive data.

## Use Cases and Decision Framework

### When to Use EBS

- Boot volumes for EC2 instances.
- Databases (MySQL, PostgreSQL, Oracle, SAP HANA) that need high IOPS and low latency from a single instance.
- Transactional workloads with strict performance requirements.
- Applications that do not need shared file access.
- Windows workloads (EFS is Linux-only).

### When to Use EFS

- Containerised applications that scale horizontally and need shared storage.
- Content management systems and web serving clusters.
- Machine learning workloads that need shared access to training data.
- Home directories for users across multiple instances.
- Applications that need POSIX-compliant shared file storage.
- Lift-and-shift of on-premises NFS workloads.

### Decision Framework

```mermaid
flowchart TD
    A[Storage Decision] --> B{Multiple Instances Need Access?}
    B -->|No| C[EBS]
    B -->|Yes| D[EFS]
    C --> E{Workload Type?}
    E -->|General Purpose| F[gp3]
    E -->|High IOPS Database| G[io2 Block Express]
    E -->|Throughput| H[st1]
    E -->|Cold Data| I[sc1]
    D --> J{Access Pattern?}
    J -->|Frequent| K[EFS Standard]
    J -->|Infrequent| L[EFS IA]
    J -->|Rare| M[EFS Archive]
```

> [!Tip]
> **Use EBS for boot volumes and databases, EFS for shared application data**: The two services are complementary, not competing. A typical three-tier application might use EBS for the database tier, EFS for the application tier's shared content, and S3 for static assets.

## Summary Comparison

| Dimension | EBS | EFS |
|---|---|---|
| Storage Type | Block | File |
| Access Method | Attached to one EC2 instance | Mounted over NFS by many clients |
| Concurrent Access | No | Yes |
| Protocol | Block device (NVMe) | NFSv4.1 / NFSv4.0 |
| Scope | Single AZ | Regional (multi-AZ) or One Zone |
| OS Support | Linux and Windows | Linux only |
| Durability | 99.8-99.999% | 11 nines |
| Availability SLA | 99.99% (io2 Block Express) | 99.99% (Regional) |
| Max IOPS | 256,000 | 90,000 |
| Max Throughput | 4,000 MiB/s | 3 GiB/s |
| Scaling | Manual resize or provision | Automatic |
| Snapshots | Yes (incremental, to S3) | Yes (via AWS Backup) |
| Encryption | KMS at rest and in transit | KMS at rest, TLS in transit |
| Best For | Boot volumes, databases, single-instance workloads | Shared file storage, containers, web clusters |

## Assessment Preparation

### Practice Questions

1. Explain the fundamental difference between EBS and EFS.
2. Describe the AZ scope of EBS and EFS and how it affects architecture.
3. Compare the durability and availability of EBS and EFS.
4. Explain the performance modes and throughput modes of EFS.
5. Compare EBS volume types and their use cases.
6. Describe the EFS storage classes and how lifecycle management works.
7. Explain why EBS is not suitable for shared access.
8. Describe the use cases where EFS is the better choice than EBS.
9. Explain why EFS is Linux-only and what that means for Windows workloads.
10. Describe how snapshots work for EBS and EFS.

### Scenario Questions

**Scenario 1: MySQL Database**
A company needs to run a MySQL database on EC2 with high IOPS and low latency. What should they use?

- Use EBS with io2 Block Express volumes.
- Provision 100,000+ IOPS for the database workload.
- Use EBS snapshots for backup.
- Enable encryption at rest with KMS.
- Deploy across multiple AZs using a Multi-AZ database architecture with separate EBS volumes in each AZ.

**Scenario 2: Containerised Web Application**
A containerised web application runs on ECS across multiple AZs and needs shared access to uploaded content. What should they use?

- Use EFS with Regional file system for multi-AZ access.
- Mount the EFS file system on all ECS tasks.
- Use EFS Lifecycle Management to move older content to IA.
- Use General Purpose performance mode for latency-sensitive access.
- Enable encryption at rest and in transit.

**Scenario 3: Machine Learning Training**
A research team needs shared access to training data across a fleet of EC2 instances running in parallel. What should they use?

- Use EFS with Max I/O performance mode.
- Use Provisioned or Elastic throughput mode for consistent performance.
- Mount the file system on all training instances.
- Use EFS Standard storage class for active training data.
- Use FSx for Lustre if sub-millisecond latency and hundreds of GB/s throughput are required.

**Scenario 4: Windows Workload**
A company needs to run a Windows application that requires shared file storage. What should they use?

- EFS is Linux-only, so it is not suitable for Windows.
- Use FSx for Windows File Server instead.
- Use EBS volumes attached to each Windows instance for local storage.
- Use SMB file shares for shared access.

**Scenario 5: Cost-Optimised Shared Storage**
A company needs shared file storage for a web cluster, but most files are accessed infrequently. How should they optimise cost?

- Use EFS with Lifecycle Management.
- Configure lifecycle policies to move files to EFS IA after 30 days.
- Move files to EFS Archive after 90 days.
- Use Elastic throughput mode for automatic scaling.
- Monitor access patterns to tune lifecycle policies.

```mermaid
flowchart TD
    A[EBS vs EFS Decision] --> B{Shared Access?}
    B -->|No| C[EBS]
    B -->|Yes| D[EFS]
    C --> E{Workload?}
    E -->|General| F[gp3]
    E -->|Database| G[io2 Block Express]
    E -->|Throughput| H[st1]
    D --> I{Access Frequency?}
    I -->|Frequent| J[EFS Standard]
    I -->|Infrequent| K[EFS IA]
    I -->|Rare| L[EFS Archive]
    J --> M{Performance Mode?}
    M -->|Latency-Sensitive| N[General Purpose]
    M -->|Parallel I/O| O[Max I/O]
```

## Key Takeaways

- EBS provides block storage attached to a single EC2 instance. EFS provides a shared file system accessible from many instances.
- EBS volumes are tied to a single Availability Zone. EFS file systems are regional and span multiple AZs.
- EBS does not support concurrent access. EFS supports concurrent access from thousands of clients.
- EBS provides lower latency and higher single-client IOPS. EFS provides shared access and automatic scaling.
- EBS supports both Linux and Windows. EFS is Linux-only.
- EBS durability is 99.8-99.999%. EFS durability is 11 nines.
- EBS volume types include gp3 (default), io2 Block Express (high IOPS), st1 (throughput), and sc1 (cold).
- EFS storage classes include Standard, Infrequent Access, and Archive. Lifecycle Management automates transitions.
- EBS snapshots are incremental and stored in S3. EFS backups use AWS Backup.
- Use EBS for boot volumes, databases, and single-instance workloads.
- Use EFS for containerised applications, shared web content, and machine learning workloads that need shared storage.
- The two services are complementary. A three-tier application may use EBS for the database, EFS for shared application data, and S3 for static assets.
- The first decision question is whether multiple instances need concurrent access. If yes, EFS. If no, EBS.

> [!Important]
> **Start with the access pattern, not the service**: The most common architectural mistake is choosing EBS for a workload that needs shared access, or choosing EFS for a workload that needs the high single-client IOPS of EBS. Ask first: does more than one instance need to read and write this data at the same time? If yes, EFS. If no, EBS. Everything else follows from that answer. Use EBS for databases and boot volumes. Use EFS for shared application data and containers. Use S3 for static assets and backups. Match the storage service to the access pattern, and the rest of the architecture becomes simpler.
