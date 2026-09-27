# W08: AWS Storage Services - Lesson 5: Summary and Assessment

This module covers the AWS storage portfolio: object storage with Amazon S3, block storage with Amazon EBS, file storage with Amazon EFS and Amazon FSx, hybrid storage with AWS Storage Gateway, data transfer with AWS DataSync and the Snow Family, and centralised data protection with AWS Backup. The goal is to select and configure the right storage service for any workload based on data type, access pattern, durability, performance, and cost.

```mermaid
flowchart TD
    W08[W08 AWS Storage Services] --> L1[Lesson 1: Introduction to AWS Storage Services]
    W08 --> L2[Lesson 2: Amazon S3 Fundamentals]
    W08 --> L3[Lesson 3: Access and Security in S3]
    W08 --> L4[Lesson 4: EBS vs EFS]
    W08 --> L5[Lesson 5: Summary and Assessment]
    L1 --> L1A[Object, Block, File, Hybrid]
    L2 --> L2A[Bucket Types, Storage Classes, Lifecycle]
    L3 --> L3A[Access Control, Encryption, Monitoring]
    L4 --> L4A[Shared vs Single-Instance Storage]
    L5 --> L5A[Review and Scenarios]
```

## Lesson 1: Introduction to AWS Storage Services Summary

AWS storage services split into object, block, file, and hybrid categories. Each category maps to a different service, and each service is optimised for different access patterns, durability requirements, and cost profiles. Storage is typically 20-30% of an AWS bill.

### The Three Storage Types

| Type | AWS Service | Access Method | Use Case |
|---|---|---|---|
| Object | Amazon S3 | HTTP/HTTPS API | Data lakes, backups, static assets |
| Block | Amazon EBS | Attached to EC2 instance | Boot volumes, databases, transactional workloads |
| File | Amazon EFS, Amazon FSx | NFS, SMB, Lustre | Shared file storage, content management, HPC |
| Hybrid | AWS Storage Gateway | iSCSI, SMB, NFS | On-premises applications accessing cloud storage |

### Service Portfolio

- Amazon S3 is object storage. It offers four bucket types and seven storage classes.
- Amazon EBS is block storage attached to EC2 instances. gp3 is the default general purpose SSD.
- Amazon EFS is serverless, elastic NFS file storage for Linux workloads.
- Amazon FSx provides four file system types: Windows File Server, Lustre, NetApp ONTAP, and OpenZFS.
- AWS Storage Gateway extends on-premises storage to AWS using file, volume, and tape gateways.
- AWS Backup centralises data protection across AWS services.
- AWS DataSync moves data between on-premises and AWS, or between AWS storage services.
- The Snow Family provides physical devices for offline data transfer and edge computing.

### Storage Decision Framework

```mermaid
flowchart TD
    A[Storage Decision] --> B{Data Type?}
    B -->|Object| C[Amazon S3]
    B -->|Block| D[Amazon EBS]
    B -->|File| E{Protocol?}
    E -->|NFS Linux| F[Amazon EFS]
    E -->|SMB Windows| G[FSx for Windows]
    E -->|Lustre HPC| H[FSx for Lustre]
    A --> I{Hybrid?}
    I -->|Yes| J[Storage Gateway]
    A --> K{Offline Transfer?}
    K -->|Yes| L[Snow Family]
    K -->|No| M[DataSync]
    A --> N{Backup?}
    N -->|Centralised| O[AWS Backup]
```

> [!Important]
> **Match the storage service to the data type and access pattern**: Objects belong in S3. Block data belongs in EBS. Shared files belong in EFS or FSx. Hybrid belongs in Storage Gateway. Forcing data into the wrong service leads to poor performance, unnecessary cost, or both.

## Lesson 2: Amazon S3 Fundamentals Summary

Amazon S3 is an object storage service that stores data as objects within buckets. It provides 11 nines of durability and 99.99% availability for the Standard storage class.

### S3 Bucket Types

| Bucket Type | Optimised For | Key Feature |
|---|---|---|
| General Purpose | Most workloads | Full storage class selection, lifecycle, versioning, Object Lock |
| Directory (Express One Zone) | Ultra-low latency, AI/ML | Single-digit millisecond latency, 10x faster, 80% lower request cost |
| Table (S3 Tables) | Data lake analytics | Managed Apache Iceberg tables, automatic compaction |
| Vector (S3 Vectors) | RAG, semantic search | Native vector storage, scales to 2 billion vectors per index |

### S3 Storage Classes

| Storage Class | Designed For | Availability | Min Duration | Min Object Size | Retrieval Time |
|---|---|---|---|---|---|
| S3 Standard | Frequently accessed data | 99.99% | None | None | Milliseconds |
| S3 Intelligent-Tiering | Unknown or changing access | 99.9% | 30 days | None | Milliseconds |
| S3 Standard-IA | Infrequent access | 99.9% | 30 days | 128 KB | Milliseconds |
| S3 One Zone-IA | Infrequent, non-critical | 99.5% | 30 days | 128 KB | Milliseconds |
| S3 Glacier Instant Retrieval | Archive with instant access | 99.9% | 90 days | 128 KB | Milliseconds |
| S3 Glacier Flexible Retrieval | Archive, minutes to hours | 99.9% | 90 days | None | 1-12 hours |
| S3 Glacier Deep Archive | Long-term archive | 99.9% | 180 days | None | 12-48 hours |

### Lifecycle Policies

- Lifecycle rules transition objects between storage classes based on age, prefix, or tag.
- Rules only move objects downhill from higher-cost to lower-cost classes.
- Objects must be at least 128 KB to transition to Intelligent-Tiering or Glacier Instant Retrieval.
- Standard to Standard-IA requires 30 days in the source class. After that, wait another 30 days before transitioning to any Glacier class.
- Common pattern: Day 0 Standard, Day 30 Standard-IA, Day 90 Glacier Deep Archive, Day 365 delete.

### Versioning and Object Lock

- Versioning keeps multiple versions of an object. Once enabled, it cannot be disabled, only suspended.
- Object Lock provides WORM protection. It requires versioning to be enabled.
- Governance mode can be bypassed with `s3:BypassGovernanceRetention` permission.
- Compliance mode cannot be overridden, including by the root user.

### S3 Pricing

| Component | Price (US-East-1) |
|---|---|
| S3 Standard storage | $0.023 per GB-month (first 50 TB) |
| S3 Standard-IA storage | $0.0125 per GB-month |
| S3 One Zone-IA storage | $0.01 per GB-month |
| S3 Glacier Instant Retrieval | $0.004 per GB-month |
| S3 Glacier Flexible Retrieval | $0.0036 per GB-month |
| S3 Glacier Deep Archive | $0.00099 per GB-month |
| Requests | Per 1,000 requests |
| Data transfer out | Per GB |

> [!Tip]
> **Use S3 Intelligent-Tiering for unknown access patterns**: It automatically moves objects between access tiers based on usage patterns, saving up to 95% on storage costs with no performance impact and no retrieval fees.

## Lesson 3: Access and Security in S3 Summary

S3 security is built on three pillars: access control, encryption, and monitoring.

### Access Control

| Mechanism | Scope | Use Case |
|---|---|---|
| IAM Policies | Identity-based | Access for identities within your account |
| Bucket Policies | Resource-based | Access for identities outside your account |
| ACLs | Legacy | Disabled by default. Use Object Ownership instead. |
| Block Public Access | Account, bucket, access point, organisation | Prevent accidental public exposure |
| Access Points | Per-application | Simplify access management for shared data sets |

- All new buckets have Block Public Access enabled by default.
- Block Public Access can be applied at four levels. S3 applies the most restrictive combination.
- Since April 2023, all new S3 buckets have ACLs disabled by default. S3 Object Ownership defaults to bucket owner enforced.

### Encryption

| Encryption Type | Key Management | Use Case |
|---|---|---|
| SSE-S3 | S3-managed keys | Default for all buckets. No additional cost. |
| SSE-KMS | AWS KMS keys | Audit trail, granular access control, compliance |
| DSSE-KMS | AWS KMS keys (dual-layer) | Regulated workloads requiring dual-layer encryption |
| SSE-C | Customer-provided keys | Disabled by default for new buckets as of April 2026 |

- All S3 objects are encrypted by default with SSE-S3.
- When you change default encryption to SSE-KMS, existing objects are not automatically re-encrypted. Use S3 Batch Operations with a Copy action.
- Encryption in transit uses SSL/TLS. AWS supports hybrid post-quantum key exchange.

### Monitoring and Auditing

| Tool | Purpose |
|---|---|
| AWS CloudTrail | Records API calls made to S3 |
| S3 Server Access Logging | Records detailed requests to a bucket |
| S3 Storage Lens | Organisation-wide visibility into storage usage |
| IAM Access Analyzer for S3 | Identifies buckets shared externally |

- IAM Access Analyzer for S3 provides external access findings at no extra cost.
- Findings are automatically updated once every 24 hours.
- Access Analyzer does not analyse access point policies attached to cross-account access points.

### Advanced Features

- VPC endpoints provide private access to S3 without internet exposure. Use `aws:SourceVpce` conditions in bucket policies.
- Presigned URLs grant temporary access to specific objects. Treat them as secrets.
- Cross-Region Replication replicates objects to another Region for disaster recovery and compliance.

> [!Important]
> **Secure S3 before you put data in it**: Enable Block Public Access at the account level. Disable ACLs. Enable versioning and encryption. Turn on CloudTrail logging. Use IAM Access Analyzer to find external sharing. These controls take minutes to enable and prevent the vast majority of S3 security incidents.

## Lesson 4: EBS vs EFS Summary

EBS and EFS are both storage services, but they solve fundamentally different problems. The clearest difference is that an EFS file system can be mounted on thousands of clients simultaneously, while an EBS volume does not support concurrent access.

### Core Comparison

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
| Best For | Boot volumes, databases, single-instance workloads | Shared file storage, containers, web clusters |

### EBS Volume Types

| Volume Type | Storage Media | Storage $/GB-mo | Max IOPS | Use Case |
|---|---|---|---|---|
| gp3 | SSD | $0.08 | 16,000 | Default for ~95% of workloads |
| gp2 | SSD | $0.10 | 16,000 | Legacy, migrate to gp3 |
| io2 Block Express | SSD | $0.125 | 256,000 | Mission-critical databases |
| io1 | SSD | $0.125 | 64,000 | Legacy high IOPS |
| st1 | HDD | $0.045 | — | Big data, data warehouses |
| sc1 | HDD | $0.015 | — | Cold data, infrequent access |

### EFS Storage Classes

| Storage Class | Designed For | Latency | Min File Size |
|---|---|---|---|
| EFS Standard | Frequently accessed data | Sub-millisecond | None |
| EFS Infrequent Access | Data accessed a few times per quarter | Tens of milliseconds | 128 KiB |
| EFS Archive | Data accessed a few times per year | Tens of milliseconds | 128 KiB |

- EFS offers three throughput modes: Bursting, Provisioned, and Elastic.
- EFS Archive is only supported for file systems with Elastic throughput.
- EBS snapshots are incremental and stored in S3. EFS backups use AWS Backup.

### Decision Framework

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
```

> [!Important]
> **The concurrent access distinction is the first question**: If multiple instances or containers need to read and write the same data at the same time, you need EFS. If a single instance needs a high-performance block device for a database or boot volume, you need EBS. There is no overlap for this primary decision.

## Integrated View

```mermaid
flowchart TD
    A[Data Type] --> B{Object?}
    B -->|Yes| C[S3]
    B -->|No| D{Block?}
    D -->|Yes| E[EBS]
    D -->|No| F{File?}
    F -->|NFS Linux| G[EFS]
    F -->|SMB Windows| H[FSx for Windows]
    F -->|Lustre HPC| I[FSx for Lustre]
    A --> J{Hybrid?}
    J -->|Yes| K[Storage Gateway]
    A --> L{Transfer?}
    L -->|Online| M[DataSync]
    L -->|Offline| N[Snow Family]
    A --> O{Protection?}
    O -->|Centralised| P[AWS Backup]
```

- Storage decisions start with the data type: object, block, or file.
- Each data type maps to a primary service: S3, EBS, EFS or FSx.
- Hybrid and transfer services extend storage beyond AWS Regions.
- AWS Backup provides centralised protection across all services.
- Encryption and access control apply at every layer.
- Cost optimisation is continuous: lifecycle policies, right-sizing, and storage class selection.

## Assessment Preparation

### Practice Questions

1. Compare object, block, and file storage and give an AWS service for each.
2. Compare the four S3 bucket types and their use cases.
3. List the S3 storage classes and describe the access pattern each is designed for.
4. Explain how S3 lifecycle policies work and describe a common transition pattern.
5. Describe the constraints on S3 lifecycle transitions.
6. Explain how S3 versioning and Object Lock protect data.
7. Compare IAM policies and bucket policies for S3 access control.
8. Explain why ACLs are disabled by default for new S3 buckets.
9. Describe the four levels of S3 Block Public Access and how S3 applies the most restrictive combination.
10. Compare SSE-S3, SSE-KMS, DSSE-KMS, and SSE-C encryption options.
11. Explain the April 2026 change to SSE-C encryption on new buckets.
12. Describe the purpose of IAM Access Analyzer for S3.
13. Explain the security considerations for presigned URLs.
14. Compare EBS volume types and their performance characteristics.
15. Explain the fundamental difference between EBS and EFS.
16. Describe the AZ scope of EBS and EFS and how it affects architecture.
17. Compare the durability and availability of EBS and EFS.
18. Describe the EFS storage classes and how lifecycle management works.
19. Explain when to use EBS and when to use EFS.
20. Compare S3, EBS, EFS, and FSx across access protocol, scope, and use case.

### Scenario Questions

**Scenario 1: Data Lake and Analytics**
A company needs to store petabytes of structured and unstructured data for analytics and machine learning. What should they use?

- Use Amazon S3 with Table buckets for Iceberg-based data lakes.
- Use lifecycle policies to transition older data to lower-cost storage classes.
- Use S3 Intelligent-Tiering for unknown access patterns.
- Enable versioning and Object Lock for compliance.
- Use S3 Vectors for RAG and semantic search workloads.

**Scenario 2: Compliance and Immutable Retention**
A financial services firm needs to store regulatory records for seven years with immutable retention. How should they configure S3?

- Enable versioning on the bucket.
- Enable Object Lock in Compliance mode.
- Set a default retention period of seven years.
- Use S3 Glacier Deep Archive for long-term storage.
- Enable CloudTrail logging for audit purposes.
- Use Bucket owner enforced for Object Ownership.

**Scenario 3: Private S3 Access from a VPC**
A private subnet needs to access S3 without going through a NAT gateway. How do you configure this?

- Create a gateway endpoint for S3.
- Add the endpoint as a target in the private subnet route table.
- Update the bucket policy to allow access only from the VPC endpoint using the `aws:SourceVpce` condition.
- Gateway endpoints are free and eliminate NAT data processing charges.

**Scenario 4: MySQL Database**
A company needs to run a MySQL database on EC2 with high IOPS and low latency. What should they use?

- Use EBS with io2 Block Express volumes.
- Provision 100,000+ IOPS for the database workload.
- Use EBS snapshots for backup.
- Enable encryption at rest with KMS.
- Deploy across multiple AZs using a Multi-AZ database architecture.

**Scenario 5: Containerised Web Application**
A containerised web application runs on ECS across multiple AZs and needs shared access to uploaded content. What should they use?

- Use EFS with a Regional file system for multi-AZ access.
- Mount the EFS file system on all ECS tasks.
- Use EFS Lifecycle Management to move older content to IA.
- Use General Purpose performance mode for latency-sensitive access.
- Enable encryption at rest and in transit.

**Scenario 6: Centralised Backup**
A company runs workloads across EC2, RDS, EFS, and DynamoDB. They need a single backup policy across all services. What should they use?

- Use AWS Backup.
- Define backup policies once and apply them across all supported services.
- Use tag-based policies for automatic resource assignment.
- Configure cross-Region and cross-account backup for disaster recovery.
- Use logically air-gapped vaults for ransomware protection.

**Scenario 7: Large-Scale Data Migration**
A company needs to migrate 500 TB of data from its data center to AWS. Network transfer would take months. What should they use?

- Use AWS Snowball Edge Storage Optimized devices.
- Order multiple devices and transfer data locally.
- Ship the devices back to AWS for upload to S3.
- Data is encrypted end-to-end with KMS.
- For ongoing transfers after migration, use DataSync.

**Scenario 8: Windows Workload with Shared Storage**
A company needs to run a Windows application that requires shared file storage. What should they use?

- EFS is Linux-only, so it is not suitable for Windows.
- Use FSx for Windows File Server instead.
- Use SMB file shares for shared access.
- Integrate with Active Directory for authentication.

```mermaid
flowchart TD
    A[Storage Assessment] --> B{Data Type?}
    B -->|Object| C[S3]
    B -->|Block| D[EBS]
    B -->|File| E{Protocol?}
    E -->|NFS| F[EFS]
    E -->|SMB| G[FSx for Windows]
    E -->|Lustre| H[FSx for Lustre]
    A --> I{Hybrid?}
    I -->|Yes| J[Storage Gateway]
    A --> K{Transfer?}
    K -->|Online| L[DataSync]
    K -->|Offline| M[Snow Family]
    A --> N{Protection?}
    N -->|Centralised| O[AWS Backup]
    C --> P[Security: Block Public Access, Encryption, Versioning]
    D --> Q[Security: KMS Encryption, Snapshots]
    F --> R[Security: KMS Encryption, Lifecycle]
    G --> R
    H --> R
```

## Key Takeaways

- AWS storage services split into object (S3), block (EBS), file (EFS and FSx), and hybrid (Storage Gateway).
- S3 is the default storage service for most workloads. It offers four bucket types and seven storage classes.
- S3 lifecycle policies automate cost optimisation by transitioning objects between storage classes. They only move objects downhill.
- Objects must be at least 128 KB to transition to Intelligent-Tiering or Glacier Instant Retrieval.
- S3 versioning protects against accidental deletion. Object Lock provides WORM protection for compliance.
- S3 security is built on access control, encryption, and monitoring. Block Public Access is the single most effective control.
- All S3 objects are encrypted by default with SSE-S3. SSE-KMS provides an audit trail. SSE-C is disabled by default for new buckets as of April 2026.
- IAM Access Analyzer for S3 identifies buckets shared externally at no extra cost.
- VPC endpoints provide private access to S3. Presigned URLs grant temporary access.
- EBS provides persistent block storage for a single EC2 instance. EFS provides shared file storage for many clients.
- EBS volumes are tied to a single AZ. EFS file systems are regional and span multiple AZs.
- EBS supports Linux and Windows. EFS is Linux-only.
- EBS provides lower latency and higher single-client IOPS. EFS provides shared access and automatic scaling.
- gp3 is the default EBS volume type. io2 Block Express is for mission-critical databases.
- EFS offers Standard, Infrequent Access, and Archive storage classes. Lifecycle Management automates transitions.
- Use EBS for boot volumes and databases. Use EFS for shared application data and containers. Use S3 for objects and backups.
- FSx provides four file system types: Windows File Server, Lustre, NetApp ONTAP, and OpenZFS.
- Storage Gateway extends on-premises storage to AWS. DataSync moves data online. Snow Family moves data offline.
- AWS Backup centralises data protection across AWS services with policy-based backup and cross-Region and cross-account capabilities.
- The first storage decision is the data type. The second is the access pattern. The third is the durability and performance requirement.
- Match the storage service to the workload. Start with S3 unless you have a specific requirement for block or file storage.
- Secure storage from day one: Block Public Access, encryption, versioning, and monitoring.
- Optimise storage cost continuously: lifecycle policies, right-sizing, and storage class selection.

> [!Important]
> **Match the storage service to the data type and access pattern**: The most common architectural mistake is forcing data into the wrong storage service. Objects belong in S3. Block data belongs in EBS. Shared files belong in EFS or FSx. Hybrid belongs in Storage Gateway. Ask first whether the data is an object, a block, or a file. Then ask whether one instance or many need access. Then ask about durability, performance, and cost. The answers to those questions determine the service. Use lifecycle policies to optimise cost over time. Enable encryption and backup from day one. Storage decisions are long-lived and hard to reverse. Choose carefully, secure by default, and optimise continuously.
