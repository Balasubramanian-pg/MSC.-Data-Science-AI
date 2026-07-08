# Detecting Inconsistency

One major strategy is data profiling.

Data analysts inspect:

- Distribution patterns
    
- Column formats
    
- Frequency distributions
    
- Type consistency
    
- Data ranges
    

The objective is to identify irregular patterns that violate expected standards.

```mermaid
flowchart TD
    A[Raw Dataset]
    --> B[Profile Data]

    B --> C[Check Formats]
    B --> D[Check Ranges]
    B --> E[Check Units]

    C --> F[Identify Inconsistency]
    D --> F
    E --> F
```
