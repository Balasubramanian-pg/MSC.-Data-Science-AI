# Step 3: Bin Aggregation

Example bins:

|Range|Count|
|---|---|
|1–10|13|
|11–20|25|
|21–30|15|

Now only:

$$
6 \text{ cells}
$$

are required.

```mermaid
flowchart TD
    A[40 Raw Entries]
    --> B[26 Frequency Entries]

    B --> C[6 Aggregated Bin Entries]
```

This illustrates the compression power of aggregation.
