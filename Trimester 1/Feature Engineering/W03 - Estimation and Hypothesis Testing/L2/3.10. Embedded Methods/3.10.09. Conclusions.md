# 3.10.9. Conclusions

Embedded methods merge the parameter optimization phase with the feature pruning phase, offering a highly scalable and mathematically rigorous approach to dimensionality reduction within machine learning pipelines.

### 9.1 Anatomy of the Embedded Process

Every embedded technique fundamentally relies on modifying the target algorithm's loss function or decision criteria to penalize uninformative variables. For linear shrinkage, this is definitively enforced by:

$$
Loss_{L1} = \sum_{i=1}^{n} (y_i - \hat{y}_i)^2 + \lambda \sum_{j=1}^{p} |\beta_j|
$$

### 9.2 Comparing Selection Paradigms

To finalize the structural taxonomy of feature selection, the table below contrasts the three fundamental engineering methodologies.

| Selection Taxonomy | Evaluation Phase | Computational Burden |
|:---|:---:|---:|
| **Filter Methods** | Pre-training execution | Lowest overhead |
| **Wrapper Methods** | Iterative subset training | Exponentially massive |
| **Embedded Methods** | Simultaneous with training | Moderately efficient |

>[!Tip]
> Always validate the engineered feature subset derived from an embedded method against the final deployment architecture to guarantee that the selected variables truly maximize generalizable predictive power.
