# Causes of Data Inconsistency

The lecture identifies several practical reasons why inconsistency emerges in real-world systems.

|Cause|Description|
|---|---|
|Human Error|Incorrect manual entry|
|System Glitches|Software-related corruption|
|Data Integration|Merging incompatible datasets|
|Lack of Standards|No common formatting rules|
|Schema Differences|Different database structures|

The most common reason is blind integration of heterogeneous data sources.

```mermaid
flowchart LR
    A[Dataset A]
    B[Dataset B]

    A --> C[Blind Merge]
    B --> C

    C --> D[Inconsistent Dataset]
```
