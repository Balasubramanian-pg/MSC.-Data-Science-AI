# Lesson 1: Comparison

This lesson compares AWS, Azure, and GCP across market position, service models, global infrastructure, core service categories, and architectural differences. The functional gap between providers has largely closed; the difference now lies in philosophy and operational fit. AWS favors autonomy and breadth, Azure reinforces enterprise governance and integration, and GCP optimizes for data, machine learning, and efficiency.

```mermaid
flowchart TD
    A[Major Cloud Providers Comparison] --> B[Market Context]
    A --> C[Service Models]
    A --> D[Global Infrastructure]
    A --> E[Core Service Categories]
    A --> F[Architectural Differences]
    A --> G[Selection Criteria]
    B --> B1[Market Share and Growth]
    C --> C1[IaaS, PaaS, SaaS]
    D --> D1[Regions, Zones, Edge]
    E --> E1[Compute, Storage, Database, Network]
    F --> F1[VPC Scope, Load Balancing, Identity]
    G --> G1[Team Skills, Compliance, Workload Fit]
```

## Market Context

Global cloud infrastructure spending reached $110.9 billion in Q4 2025, a 29% year-on-year increase. The three hyperscalers collectively hold 66% of the market.

| Provider | Q4 2025 Market Share | Year-over-Year Growth | Total Backlog | Primary Strength |
|---|---|---|---|---|
| AWS | 32% | 24% | $244 billion | Service breadth and ecosystem maturity |
| Azure | 22% | 39% | Not disclosed | Enterprise integration and Microsoft ecosystem |
| GCP | 12% | 50% | $240 billion | Data, analytics, Kubernetes, and AI |

- AWS launched in 2006 and remains the market leader with the broadest service catalog.
- Azure launched in 2010, leveraging Microsoft's enterprise footprint.
- GCP launched in 2011, building on Google's strengths in search, data, and machine learning.
- GCP recorded the fastest growth at 50%, increasing its market share to 12%.
- AWS ended Q4 2025 with a backlog of $244 billion, underscoring sustained demand.

> [!Important]
> **Market share is not the only metric**: Growth rates tell a different story. GCP and Azure are growing faster than AWS in percentage terms, which matters for long-term platform viability and talent availability.

## Cloud Service Models

Cloud services follow three fundamental models based on how much of the stack the provider manages versus the customer.

| Model | Provider Manages | Customer Manages | AWS Example | Azure Example | GCP Example |
|---|---|---|---|---|---|
| IaaS | Hardware, virtualization, networking | OS, runtime, apps, data | EC2 | Virtual Machines | Compute Engine |
| PaaS | Hardware, OS, runtime, middleware | Apps and data | Elastic Beanstalk | App Service | App Engine |
| SaaS | Entire stack including application | User configuration only | WorkMail | Microsoft 365 | Google Workspace |

- IaaS gives the most control but requires the most operational responsibility.
- PaaS removes server management so teams focus on application code.
- SaaS delivers ready-to-use software with minimal operational overhead.
- All three providers offer services across all three models.

```mermaid
flowchart LR
    subgraph IaaS
        I1[Provider: Hardware, Virtualization] --> I2[Customer: OS, Runtime, App]
    end
    subgraph PaaS
        P1[Provider: Hardware, OS, Runtime] --> P2[Customer: App Only]
    end
    subgraph SaaS
        S1[Provider: Entire Stack] --> S2[Customer: Configuration]
    end
```

> [!Tip]
> **Choose the model that matches your team's capacity**: IaaS makes sense when you need full control. PaaS accelerates delivery when you want to avoid infrastructure work. SaaS eliminates operational burden entirely.

## Global Infrastructure

All three providers organize physical infrastructure into regions, availability zones, and edge locations.

| Dimension | AWS | Azure | GCP |
|---|---|---|---|
| Regions | 34 regions | 60+ regions | 40 regions |
| Availability Zones | 108 zones | 300+ zones | 121 zones |
| Edge Locations | 750+ CloudFront PoPs | 300+ datacenters | ~202 edge PoPs |
| Region Pairing | No automatic pairing | Automatic region pairs within geography | No automatic pairing |
| Total Services | 240+ | 200+ | 150+ |

- Azure provides the highest regional density of the hyperscalers, allowing businesses to place data centers closer to specific localized user bases.
- AWS operates the largest number of availability zones and edge locations.
- GCP's private fiber backbone routes traffic globally without traversing the public internet.

```mermaid
flowchart TD
    subgraph AWS
        A_R[Region] --> A_AZ1[AZ 1]
        A_R --> A_AZ2[AZ 2]
        A_R --> A_AZ3[AZ 3]
    end
    subgraph Azure
        B_R[Region] --> B_AZ1[Zone 1]
        B_R --> B_AZ2[Zone 2]
        B_R --> B_AZ3[Zone 3]
        B_P[Paired Region 300+ miles away]
    end
    subgraph GCP
        C_R[Region] --> C_Z1[Zone a]
        C_R --> C_Z2[Zone b]
        C_R --> C_Z3[Zone c]
        C_G[Global VPC spans regions]
    end
```

> [!Important]
> **Availability Zones are the unit of resilience**: Deploying across multiple zones within a region protects against datacenter-level failures including power, cooling, and networking outages.

## Core Service Categories

Cloud services map across four fundamental domains: compute, storage, databases, and networking.

### Compute Services

| Capability | AWS | Azure | GCP |
|---|---|---|---|
| Virtual Machines | EC2 (750+ types) | Virtual Machines (700+) | Compute Engine (400+) |
| Managed Kubernetes | EKS | AKS | GKE (market leader) |
| Serverless Functions | Lambda | Azure Functions | Cloud Functions / Cloud Run |
| App Platform (PaaS) | Elastic Beanstalk | App Service | App Engine |
| ARM-based Instances | Graviton4 | Ampere Altra / Cobalt 100 | Tau T2A |
| Spot/Preemptible Discount | Up to 90% | Up to 90% | Up to 91% |

- AWS offers the broadest range of compute options, from bare metal to serverless.
- GKE is widely regarded as the leading managed Kubernetes service.
- Azure integrates tightly with Windows Server and Active Directory for enterprise workloads.

### Storage Services

| Capability | AWS | Azure | GCP |
|---|---|---|---|
| Object Storage | S3 (industry standard) | Blob Storage | Cloud Storage |
| Block Storage | EBS | Managed Disks | Persistent Disk |
| File Storage | EFS / FSx | Azure Files / NetApp | Filestore |
| Archive Tier (per GB/month) | $0.0036 (Glacier Deep) | $0.002 (Archive) | $0.0012 (Archive) |
| Data Transfer Out (per GB) | $0.09 | $0.087 | $0.12 |

- GCP offers the lowest archive storage pricing at $0.0012 per GB per month.
- AWS S3 is the industry standard for object storage with the most mature ecosystem.
- Azure provides strong hybrid storage options through Azure Stack.

### Database Services

| Capability | AWS | Azure | GCP |
|---|---|---|---|
| Managed Relational | RDS / Aurora | Azure SQL / SQL MI | Cloud SQL / AlloyDB |
| NoSQL Document | DynamoDB | Cosmos DB | Firestore |
| NoSQL Wide-Column | DynamoDB | Cosmos DB | Bigtable |
| In-Memory Cache | ElastiCache | Azure Cache for Redis | Memorystore |
| Data Warehouse | Redshift | Synapse Analytics | BigQuery (best-in-class) |
| Cloud-Native SQL | Aurora (MySQL/PostgreSQL) | Cosmos DB (relational) | Spanner (global) |

- GCP's BigQuery is widely considered best-in-class for serverless analytics.
- Azure Cosmos DB supports multiple data models with global distribution.
- AWS Aurora provides MySQL and PostgreSQL compatibility with cloud-native performance.

### Networking Services

| Capability | AWS | Azure | GCP |
|---|---|---|---|
| Virtual Network | VPC (regional) | VNet (regional) | VPC (global) |
| Load Balancing (L4) | Network Load Balancer | Azure Load Balancer | Network Load Balancer |
| Load Balancing (L7) | Application Load Balancer | Application Gateway | HTTP(S) Load Balancer |
| CDN | CloudFront | Azure CDN / Front Door | Cloud CDN |
| DNS | Route 53 | Azure DNS | Cloud DNS |
| Hybrid Connectivity | Direct Connect | ExpressRoute | Cloud Interconnect |

- VPCs provide network isolation and segmentation for cloud resources.
- Load balancers distribute traffic across compute instances for availability and scale.
- CDNs cache content at edge locations to reduce latency for global users.

```mermaid
flowchart TD
    A[Core Cloud Services] --> B[Compute]
    A --> C[Storage]
    A --> D[Databases]
    A --> E[Networking]
    B --> B1[VMs / Containers / Serverless]
    C --> C1[Object / Block / File / Archive]
    D --> D1[Relational / NoSQL / Cache / Warehouse]
    E --> E1[VPC / Load Balancers / CDN / DNS]
```

> [!Tip]
> **Services map across providers**: Once you learn one provider's service model, you can translate concepts to the others. A VPC is a VPC, whether it is called VPC, VNet, or VPC.

## Key Architectural Differences

### VPC Scope

| Dimension | AWS | Azure | GCP |
|---|---|---|---|
| Network Object | VPC (regional) | VNet (regional) | VPC (global) |
| Subnet Scope | One AZ | Spans zones within region | Regional (spans zones) |
| Per-Instance Firewall | Security group (stateful) | NSG (subnet or NIC) | VPC firewall rules by tag / service account |
| Cross-Region | VPC peering or Transit Gateway | VNet peering or Virtual WAN | No peering needed (global VPC) |

- AWS VPCs are regional with per-AZ subnets. Spanning regions requires peering or a transit hub.
- Azure VNets are regional with subnet-level NSGs.
- GCP VPCs are global by default. One VPC spans every region, with regional subnets and firewall rules. No peering is needed between regions.

> [!Important]
> **GCP global VPC is architecturally distinct**: Subnets in different regions sit in one VPC with private RFC1918 reachability and no peering. This simplifies multi-region design but creates a single blast radius for firewall and routing mistakes.

### Identity and Access Management

| Dimension | AWS | Azure | GCP |
|---|---|---|---|
| Identity Service | IAM | Entra ID (formerly Azure AD) | Cloud IAM |
| Policy Model | JSON policies | Azure Policy, RBAC | IAM policies, Organization Policy |
| Governance | Organizations, Control Tower | Management Groups | Folders, Organization |

- AWS IAM uses JSON-based policies and supports fine-grained permissions.
- Azure Entra ID integrates with Microsoft 365, Windows Server, and on-premises Active Directory.
- GCP Cloud IAM uses hierarchical resource organization with folders and organization policies.

### AI and Machine Learning Services

| Capability | AWS | Azure | GCP |
|---|---|---|---|
| LLM Platform | Bedrock (multi-model) | Azure OpenAI Service | Vertex AI (Gemini) |
| ML Training | SageMaker | Azure ML | Vertex AI |
| GPU Availability (2026) | Good (H100, H200) | Best (exclusive OpenAI partnership) | Good (TPU v5e/v6e unique) |

- Azure has the strongest GPU availability through its exclusive OpenAI partnership.
- GCP offers unique TPU options for ML training.
- AWS Bedrock provides a multi-model approach with access to multiple foundation models.

## Provider Differentiation and Selection

| Criterion | AWS | Azure | GCP |
|---|---|---|---|
| Best for | Broad enterprise workloads, startups | Microsoft-integrated enterprises, hybrid | Data, analytics, AI-native apps |
| Core strength | Service breadth, ecosystem, 240+ services | Hybrid, enterprise IT integration, governance | Kubernetes, ML, global network, BigQuery |
| Engineering culture | Autonomy, modular teams, service ownership | Standardization, central governance | Efficiency, data-driven, cloud-native |
| Pricing model | Most mature and complex | Competitive, integrated licensing benefits | Often lowest for data-heavy workloads |

- AWS favors autonomy and breadth. Multi-account landing zones support modular teams and independent pipelines.
- Azure favors standardization. Entra ID and Azure Policy provide centralized governance and uniform pipelines.
- GCP optimizes for data, ML, and efficiency. Its private fiber backbone and global VPC reduce latency for distributed workloads.

```mermaid
flowchart TD
    A[Start Architecture Decision] --> B{Existing Microsoft Stack?}
    B -->|Yes| C[Azure]
    B -->|No| D{Data / AI / Kubernetes Priority?}
    D -->|Yes| E[GCP]
    D -->|No| F{Service Breadth Needed?}
    F -->|Yes| G[AWS]
    F -->|No| H[Evaluate All Three]
    C --> I[Document Trade-Offs]
    E --> I
    G --> I
    H --> I
```

> [!Important]
> **Fit matters more than features**: The functional capabilities of AWS, Azure, and GCP are largely equivalent for most workloads. Provider selection depends on team skills, existing contracts, compliance needs, and workload requirements, not feature checklists alone.

## Assessment Preparation

### Practice Questions

1. Compare the market position and growth rates of AWS, Azure, and GCP in Q4 2025.
2. Explain the difference between IaaS, PaaS, and SaaS with examples from each provider.
3. Describe how GCP's global VPC differs architecturally from AWS and Azure regional VPCs.
4. Map the equivalent compute, storage, and database services across all three providers.
5. Explain how Azure's Regional Pairs differ from AWS and GCP multi-region approaches.
6. Identify which provider leads in Kubernetes, data analytics, and enterprise integration, and explain why.
7. Describe the decision criteria for selecting a cloud provider beyond feature comparison.

### Scenario Questions

**Scenario 1: Enterprise Microsoft Environment**
A company uses Windows Server, Active Directory, and Microsoft 365. Which provider offers the least friction?

- Azure integrates natively with Entra ID, Windows Server, and Microsoft 365.
- Hybrid licensing benefits reduce cost for existing Microsoft workloads.
- Azure Policy and management groups provide centralized governance.

**Scenario 2: Data and AI Startup**
A startup needs managed Kubernetes, serverless analytics, and ML training at scale. Which provider aligns best?

- GCP offers GKE for Kubernetes, BigQuery for analytics, and Vertex AI for ML.
- GCP's private network backbone reduces latency for global data access.
- Cost-effective pricing for data-heavy workloads.

**Scenario 3: Multi-Cloud Strategy**
An organization wants to avoid vendor lock-in and use best-of-breed services from multiple providers. How should they approach this?

- Standardize on Kubernetes and Terraform for portability.
- Use provider-neutral services where possible: object storage, VMs, managed databases.
- Accept that deep integration features will vary and plan abstraction layers accordingly.

```mermaid
flowchart TD
    A[Workload Requirements] --> B{Availability Target?}
    B -->|99.99%| C[Multi-Zone Regional]
    B -->|99.999%| D[Multi-Region Active-Active]
    C --> E{Provider Fit?}
    D --> E
    E -->|Microsoft Stack| F[Azure]
    E -->|Data / AI| G[GCP]
    E -->|Broad Services| H[AWS]
    F --> I[Review Against Well-Architected Framework]
    G --> I
    H --> I
    I --> J[Document Trade-Offs and Repeat]
```

## Key Takeaways

- AWS, Azure, and GCP collectively dominate global cloud infrastructure spending, holding 66% of the market in Q4 2025.
- AWS leads in market share and service breadth, Azure leads in enterprise integration and hybrid, and GCP leads in growth rate and data/AI capabilities.
- Cloud services follow three models: IaaS (most control), PaaS (balanced), and SaaS (most managed).
- Global infrastructure is organized into regions, availability zones, and edge locations across all providers.
- GCP's global VPC spans all regions by default. AWS and Azure VPCs are regional and require peering for cross-region communication.
- Azure pairs regions automatically within the same geography. AWS and GCP require manual multi-region configuration.
- Core service categories map across providers: compute, storage, databases, and networking.
- GCP offers BigQuery and GKE as differentiated strengths. Azure offers Cosmos DB and Entra ID integration. AWS offers the broadest catalog and Aurora.
- Provider selection should be based on team skills, compliance needs, existing contracts, and workload requirements, not feature checklists alone.
- Design decisions require documented trade-offs between availability, cost, and operational complexity.

> [!Important]
> **Learn the concepts, not just the service names**: Core cloud concepts stay consistent across providers. Mastering them lets you transfer knowledge between platforms and make architectural decisions independent of vendor marketing.
