# 3.9.12. Conclusions

Sequential wrapper methods provide a powerful, model-aware mechanism for reducing dimensionality, strictly prioritizing actual predictive performance over theoretical statistical proxies.

### 12.1. Anatomy of the Search Problem

The foundation of heuristic wrapper methods exists to bypass the impossible calculation of the total search space:

$$
S = 2^n
$$

By accepting a greedy constraint, SFS and SBS provide computationally feasible pathways to highly optimized, albeit locally optimal, subsets.

### 12.2. Methodological Comparison

Understanding the strategic differences between bottom-up and top-down approaches allows data scientists to select the appropriate tool for their specific dataset. The following table contrasts the critical dynamics of the two wrapper methods.

| **Metric** | **Sequential Forward Selection (SFS)** | **Sequential Backward Selection (SBS)** |
|----------|----------|----------|
| **Search Strategy** | `:---:` Greedy bottom-up | ---: Greedy top-down |
| **Starting State** | `:---:` Zero features | ---: All available features |
| **Interaction Capture** | `:---:` Low (builds isolated features) | ---: High (starts with all interactions) |
| **Ideal Use Case** | `:---:` Targeting a very small subset | ---: Pruning a slightly bloated dataset |

By balancing computational constraints against the absolute need to capture complex mathematical interactions, practitioners can deploy wrapper methods to extract the maximum predictive power from their machine learning models.
