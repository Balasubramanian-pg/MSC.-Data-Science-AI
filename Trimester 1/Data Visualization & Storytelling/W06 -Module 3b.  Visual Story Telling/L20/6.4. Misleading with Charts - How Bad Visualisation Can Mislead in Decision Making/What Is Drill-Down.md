# What Is Drill-Down?

Drill-down means:

> progressively adding dimensions to explore subgroup behavior.

Example hierarchy:

```mermaid
flowchart TD
    A[Overall Votes] --> B[Gender]
    B --> C[Ethnicity]
```

or:

```mermaid
flowchart TD
    A[Overall Votes] --> B[Ethnicity]
    B --> C[Gender]
```

Both lead to the same endpoint.

But the interpretive journey differs.
