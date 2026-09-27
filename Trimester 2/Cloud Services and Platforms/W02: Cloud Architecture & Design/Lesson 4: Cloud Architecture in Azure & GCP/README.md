# Migration in progress
# Lesson 4: Cloud Architecture in Azure & GCP

This lesson compares Azure and Google Cloud Platform architecture design. It covers the Well-Architected Frameworks of each provider, physical infrastructure organization, reliability mechanisms, load balancing services, and network design. Azure and GCP share common architectural goals but implement them with different service names, availability guarantees, and design patterns.

```mermaid
flowchart TD
    A[Cloud Architecture in Azure and GCP] --> B[Well-Architected Frameworks]
    A --> C[Physical Infrastructure]
    A --> D[Reliability Design]
    A --> E[Load Balancing]
    A --> F[Network Architecture]
    B --> B1[Azure WAF Pillars]
    B --> B2[GCP Architecture Framework]
    C --> C1[Regions, AZs, Fault Domains]
    D --> D1[Availability Sets and Zones]
    D --> D2[Multi-Region Patterns]
    E --> E1[Layer 4 and Layer 7]
    E --> E2[Global vs Regional]
```

## Azure Well-Architected Framework

*Definition*: The Azure Well-Architected Framework promotes architectural excellence at the foundational level of a workload. It provides a structured way to evaluate and improve cloud workloads across five core pillars, with sustainability as an emerging sixth.

### The Five Pillars

| Pillar | Workload Concern | Design Focus |
|---|---|---|
| Reliability | Resilience, availability, recovery | Design for business requirements, resilience, recovery, and operations while keeping it simple |
| Security | Data protection, threat detection, risk mitigation | Protect confidentiality, integrity, and availability |
| Cost Optimization | Cost modeling, budgets, waste reduction | Optimize usage and utilization while maintaining cost efficiency |
| Operational Excellence | Holistic observability, DevOps practices | Optimize operations with standards, comprehensive monitoring, and safe deployment |
| Performance Efficiency | Scalability, load testing | Scale horizontally, test early and often, and monitor solution health |

- Effective architecture relies on making deliberate, documented trade-offs between pillars.
- A common trade-off is balancing the added cost of redundancy against business uptime requirements.
- The Azure Architecture Center provides reference architectures designed according to these design principles.

> [!Important]
> **Trade-offs are deliberate**: Every architectural decision involves balancing pillars. Document the trade-offs so future teams understand why specific choices were made.

## GCP Cloud Architecture Framework

*Definition*: The Google Cloud Well-Architected Framework provides guidance on designing, building, and operating reliable, secure, efficient, and cost-optimized workloads in Google Cloud. Familiarity with the framework is a key requirement for the Professional Cloud Architect role.

### The Framework Pillars

- Operational Excellence: Deploy, operate, monitor, and manage cloud workloads efficiently.
- Security, Privacy, and Compliance: Protect information, systems, and assets while meeting regulatory needs.
- Reliability: Ensure availability and fault tolerance under expected and unexpected conditions.
- Performance Optimization: Use computing resources efficiently to meet system requirements.
- Cost Optimization: Achieve resource efficiency and financial governance.
- Sustainability: Minimize environmental impact of cloud workloads.

The framework's pillars are implicitly and explicitly woven throughout the Professional Cloud Architect exam objectives and should guide architectural decisions.

> [!Tip]
> **Use the framework as a guiding principle**: The GCP framework pillars are not separate checklists. Apply them together when making design decisions for any workload.

## Physical Infrastructure Comparison

### Azure Regions, Availability Zones, and Fault Domains

- A Region is made up of one or more Availability Zones.
- Availability Zones are physically separate locations within each Azure region.
- Each Azure region is paired with another region within the same geography at least 300 miles away. This allows replication across a geography to reduce the likelihood of interruptions from natural disasters, civil unrest, power outages, or physical network outages.
- Fault domains (FD) are groups of racks that share a common power source and network switch. A failure within a fault domain affects the entire domain.
- Update domains (UD) are logical sections of a datacenter. Maintenance updates are sequenced through update domains to avoid taking the whole datacenter offline at once.

```mermaid
flowchart TD
    R[Azure Region] --> AZ1[Availability Zone 1]
    R --> AZ2[Availability Zone 2]
    R --> AZ3[Availability Zone 3]
    AZ1 --> FD1[Fault Domain 1]
    AZ1 --> FD2[Fault Domain 2]
    AZ1 --> FD3[Fault Domain 3]
    FD1 --> UD1[Update Domain 1]
    FD1 --> UD2[Update Domain 2]
    FD1 --> UD3[Update Domain 3]
```

### GCP Regions and Zones

- A region refers to a specific geographical area where multiple zones exist.
- Zones are individual data centers within a region interconnected with low-latency links.
- A region typically comprises three or more zones, each playing a vital role in ensuring high availability and resilience.
- GCP offers six deployment archetypes: zonal, regional, multi-regional, global, hybrid, and multicloud.

| Archetype | Scope | Target Availability | Typical Use Case |
|---|---|---|---|
| Zonal | Single zone | Standard | Development and testing environments |
| Regional | Multiple zones in one region | 99.99% | Workloads needing resilience against zone outages |
| Multi-Regional | Two or more regions | 99.999% | Business-critical workloads and high availability applications |
| Global | Worldwide presence | Varies | Applications serving users across countries with low latency |

> [!Important]
> **Choose the right archetype**: The deployment archetype determines availability, cost, and operational complexity. A multi-regional architecture provides the highest availability but costs significantly more than a regional deployment.

## Reliability Design Comparison

### Azure Availability Options

| Option | Scope of Protection | SLA | Latency | Use Case |
|---|---|---|---|---|
| Availability Set | Rack-level within a datacenter | 99.95% | Very low | Regions without availability zones |
| Availability Zones | Datacenter-level within a region | 99.99% | Low | Mission-critical apps requiring high SLA |
| Region Pairs | Geographic territory | Varies | Mid to high | Disaster recovery across geographies |

- Availability sets distribute VMs across multiple fault domains to reduce correlated failures.
- Availability sets can have up to 3 fault domains and 20 update domains.
- Availability zones protect against datacenter-wide failures including power, networking, and cooling outages.
- Availability sets provide lower VM-to-VM latency than availability zones because VMs are placed in closer physical prox