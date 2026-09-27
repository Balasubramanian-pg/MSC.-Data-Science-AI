# Migration in progress
# W08: AWS Storage Services

AWS offers a broad portfolio of storage services designed for different data types, access patterns, performance requirements, and durability needs. The core services are Amazon S3 for object storage, Amazon EBS for block storage, Amazon EFS for file storage, and Amazon FSx for specialised file systems. Supporting services include AWS Storage Gateway for hybrid cloud, AWS Backup for centralised data protection, AWS DataSync for data transfer, and the Snow Family for offline migration. Choosing the right storage service is one of the most consequential architectural decisions because it directly affects performance, durability, cost, and operational complexity.

```mermaid
flowchart TD
    A[AWS Storage Services] --> B[Object Storage]
    A --> C[Block Storage]
    A --> D[File Storage]
    A --> E[Hybrid and Transfer]
    A --> F[Data Protection]
    B --> B1[Amazon S3]
    C --> C1[Amazon EBS]
    D --> D1[Amazon EFS]
    D --> D2[Amazon FSx]
    E --> E1[Storage Gateway]
    E --> E2[DataSync]
    E --> E3[Snow Family]
    F --> F1[AWS Backup]
```

## Amazon S3

*Definition*: Amazon Simple Storage Service (S3) is an object storage service that offers industry-leading scalability, data availability, security, and performance. Data is stored as objects within buckets, each object identified by a key.

- S3 stores data as objects, not files or blocks. An object consists of data, metadata, and a unique key.
- Buckets are the top-level containers for objects. Bucket names are globally unique.
- S3 provides 99.999999999% (11 nines) durability and 99.99% availability for the Standard storage class.
- S3 is accessed via HTTP/HTTPS APIs, the AWS Management Console, CLI, and SDKs.
- S3 has no minimum storage duration and no retrieval fees for Standard storage.

### S3 Bucket Types

AWS offers four bucket types for different workload requirements.

| Bucket Type | Optimised For | Key Feature |
|---|---|---|
| General Purpose | Most workloads | Full storage class selection, lifecycle, versioning, Object Lock |
| Directory (Express One Zone) | Ultra-low latency, AI/ML, real-time processing | Single-digit millisecond latency, 10x faster than S3 Standard, 50% lower request cost |
| Table (S3 Tables) | Data lake analytics | Managed Apache Iceberg tables, automatic compaction, up to 3x query performance |
| Vector (S3 Vectors) | RAG, semantic search, recommendations | Native vector storage and search, scales to 2 billion vectors per index |

> [!Important]
> **Choose the right bucket type before you build**: General purpose buckets handle almost all workloads. Directory buckets for ultra-low latency. Table buckets for Iceberg-based data lakes. Vector buckets for AI-native applications. The bucket type determines the API, pricing, and feature set. You cannot change it after creation.

### S3 Storage Classes

S3 offers a range of storage classes designed for different access patterns and cost requirements.

| Storage Class | Use Case | Retrieval Time | Min Storage Duration |
|---|---|---|---|
| S3 Standard | Frequently accessed data | Milliseconds | None |
| S3 Intelligent-Tiering | Unknown or changing access patterns | Milliseconds | None |
| S3 Standard-IA | Infrequent access, rapid retrieval | Milliseconds | 30 days |
| S3 One Zone-IA | Infrequent access, non-critical, single AZ | Milliseconds | 30 days |
| S3 Glacier Instant Retrieval | Archive data needing millisecond access | Milliseconds | 90 days |
| S3 Glacier Flexible Retrieval | Archive data, minutes to hours retrieval | 1-5 minutes (expedited), 3-5 hours (standard), 5-12 hours (bulk) | 90 days |
| S3 Glacier Deep Archive | Long-term archive, lowest cost | 12 hours (standard), 48 hours (bulk) | 180 days |

- S3 Intelligent-Tiering automatically moves objects between access tiers based on changing access patterns. No retrieval fees.
- S3 Standard-IA and One Zone-IA offer lower storage costs than Standard but charge retrieval fees.
- One Zone-IA stores data in a single Availability Zone. Use it for non-critical, reproducible data.
- Glacier Instant Retrieval is for archive data that still needs millisecond access.
- Glacier Deep Archive is the lowest-cost storage class for long-term retention. Retrieval takes up to 48 hours.

> [!Tip]
> **Use Intelligent-Tiering for unknown access patterns**: If you do not know how often data will be accessed, Intelligent-Tiering automatically optimises costs without retrieval fees. It monitors access patterns and moves objects between tiers automatically.

### S3 Lifecycle Policies

*Definition*: S3 lifecycle policies automate storage class transitions and object expiration to optimise storage costs without manual intervention.

- Lifecycle rules transition objects between storage classes based on age, prefix, or tag.
- Rules can expire objects after a specified period.
- Rules can also manage incomplete multipart uploads and old object versions.
- Lifecycle rules only move objects "downhill" from higher-cost to lower-cost classes.

#### Common Lifecycle Pattern

| Stage | Action | Rationale |
|---|---|---|
| Day 0 | Store in S3 Standard | Active use |
| Day 30 | Transition to S3 Standard-IA | Access frequency drops |
| Day 90 | Archive to S3 Glacier Deep Archive | Compliance retention |
| Day 365 | Delete object | Retention period ends |

#### Transition Constraints

| Source Class | Allowed Transitions |
|---|---|
| S3 Standard | Standard-IA, Intelligent-Tiering, One Zone-IA, Glacier Instant Retrieval, Glacier Flexible Retrieval, Glacier Deep Archive |
| S3 Intelligent-Tiering | Glacier Instant Retrieval, Glacier Flexible Retrieval, Glacier Deep Archive |
| S3 One Zone-IA | Glacier Flexible Retrieval, Glacier Deep Archive |

- Objects must be at least 128 KB to transition from Standard or Standard-IA to Intelligent-Tiering or Glacier Instant Retrieval.
- Standard to Standard-IA requires 30 days in the source class.
- After moving to Standard-IA, wait another 30 days before transitioning to any Glacier class.

> [!Important]
> **Violating minimum size or duration requirements causes lifecycle rules to skip transitions**: Always verify object metadata and understand the constraints before applying a rule. A rule that looks correct on paper may silently do nothing if the objects do not meet the criteria.

### S3 Versioning and Object Lock

- Versioning keeps multiple versions of an object in the same bucket.
- Once enabled, versioning cannot be disabled, only suspended.
- Versioning protects against accidental deletion and overwrites.
- Object Lock prevents objects from being deleted or overwritten for a fixed period or indefinitely.
- Object Lock uses a write-once-read-many (WORM) model.
- Object Lock requires versioning to be enabled.
- Object Lock retention modes: Governance mode (users with special permissions can override) and Compliance mode (no one can override, including root).

### S3 Security

- S3 Block Public Access prevents accidental public exposure of buckets and objects.
- Bucket policies define who can access the bucket and what actions they can perform.
- IAM policies define what users and roles can do with S3 resources.
- Access points simplify access management for shared data sets.
- S3 Access Analyzer identifies buckets shared with external entities.
- S3 encryption supports SSE-S3 (AWS-managed keys), SSE-KMS (KMS keys), and SSE-C (customer-provided keys).
- Encryption in transit is enforced with HTTPS.

> [!Important]
> **Enable S3 Block Public Access at the account level**: This is the single most effective control for preventing accidental data exposure. Even if a bucket policy or ACL allows public access, account-level Block Public Access overrides it.

## Amazon EBS

*Definition*: Amazon Elastic Block Store (EBS) provides persistent block-level storage volumes for use with EC2 instances. EBS volumes are network-attached, replicated within an Availability Zone, and independent of the instance lifecycle.

### EBS Volume Types

| Volume Type | Storage Media | Max IOPS | Max Throughput | Use Case |
|---|---|---|---|---|
| gp3 | SSD | 16,000 | 1,000 MB/s | General purpose, boot volumes |
| gp2 | SSD | 16,000 | 250 MB/s | Legacy general purpose |
| io2 Block Express | SSD | 256,000 | 4,000 MB/s | Mission-critical databases |
| io2 | SSD | 64,000 | 1,000 MB/s | High IOPS databases |
| io1 | SSD | 64,000 | 1,000 MB/s | Legacy high IOPS |
| st1 | HDD | 500 | 500 MB/s | Big data, log processing |
| sc1 | HDD | 250 | 250 MB/s | Cold data, archives |

- gp3 is the default general purpose SSD. It provides a baseline of 3,000 IOPS and 125 MB/s, with the ability to provision IOPS and throughput independently of volume size.
- io2 Block Express is designed for the most demanding I/O-intensive workloads, including mission-critical databases.
- HDD volumes cannot be used as boot volumes.
- st1 is optimised for sequential throughput workloads such as big data and log processing.
- sc1 is the lowest-cost EBS volume type for cold data.

### EBS Snapshots

- Snapshots are point-in-time backups of EBS volumes stored in Amazon S3.
- Snapshots are incremental. Only changed blocks are saved after the first snapshot.
- Snapshots are region-specific. You can copy them to other Regions for disaster recovery.
- Snapshots can be used to create new EBS volumes in any Availability Zone within the same Region.
- Snapshots of encrypted volumes are encrypted automatically.
- Fast Snapshot Restore pre-warms snapshots for immediate full performance.
- Snapshot Archive provides a low-cost storage tier for long-term retention.
- Recycle Bin retains deleted snapshots for recovery.

### EBS Encryption

- EBS encryption protects data at rest, data in transit between the instance and the volume, and snapshots created from encrypted volumes.
- Encryption uses AWS KMS customer master keys.
- Encryption is transparent to the operating system and applications.
- Enable encryption by default for all new EBS volumes.
- Snapshots of encrypted volumes are encrypted automatically.

> [!Tip]
> **Right-size volumes based on IOPS and throughput, not just capacity**: A volume that is large enough for your data may still be too slow for your workload. Match the volume type to the IOPS and throughput requirements of the application.

## Amazon EFS

*Definition*: Amazon Elastic File System (EFS) is a serverless, fully elastic file system for Linux workloads. It provides shared file storage that scales automatically as files are added or removed.

- EFS supports NFSv4.1 and NFSv4.0 protocols.
- EFS scales automatically from 1 MiB/s to 3 GiB/s based on activity.
- EFS provides 99.999999999% (11 nines) durability and up to 99.99% availability.
- EFS is accessible from EC2 Linux and Mac instances, ECS, EKS, and Lambda.
- EFS supports concurrent access from multiple instances.

### EFS Storage Classes

| Storage Class | Use Case | Cost |
|---|---|---|
| EFS Standard | Frequently accessed files | Higher |
| EFS Infrequent Access (IA) | Files accessed a few times per quarter | Lower, with retrieval fees |
| EFS Archive | Files accessed rarely | Lowest, with retrieval fees |

- EFS lifecycle management automatically moves files between storage classes based on access patterns.
- Lifecycle policies can transition files to IA after 7, 14, 30, 60, or 90 days.
- Archive class is designed for data accessed a few times per year.

### EFS Performance Modes

| Mode | Description | Use Case |
|---|---|---|
| General Purpose | Lowest latency per operation | Latency-sensitive applications, web serving |
| Max I/O | Higher aggregate throughput and IOPS | Big data, media processing, parallel workloads |

### EFS Throughput Modes

| Mode | Description | Use Case |
|---|---|---|
| Bursting | Throughput scales with file system size | Most workloads |
| Provisioned | Fixed throughput independent of size | Workloads needing higher throughput than size allows |
| Elastic | Automatically scales throughput based on demand | Unpredictable workloads |

> [!Tip]
> **Use EFS for shared Linux file storage**: EFS is ideal for container storage (ECS, EKS), content management systems, and machine learning workloads that need shared access to files across multiple instances.

## Amazon FSx

*Definition*: Amazon FSx provides fully managed third-generation file systems optimised for specific workloads. You choose the file system that matches your existing technology or workload requirements.

### FSx File System Types

| File System | Protocol | Best For | Key Feature |
|---|---|---|---|
| FSx for Windows File Server | SMB | Windows workloads, Active Directory integration | Native Windows file shares, DFS Namespaces |
| FSx for Lustre | Lustre | High-performance computing, ML training | Sub-millisecond latency, hundreds of GB/s throughput, S3 integration |
| FSx for NetApp ONTAP | NFS, SMB, iSCSI | Multi-protocol workloads, NAS migration | Virtually unlimited scale, SnapMirror, FlexCache |
| FSx for OpenZFS | NFS | Linux workloads, ZFS migration | Snapshots, clones, compression |

- FSx for Windows File Server supports SMB 2.0 through 3.1.1 and integrate