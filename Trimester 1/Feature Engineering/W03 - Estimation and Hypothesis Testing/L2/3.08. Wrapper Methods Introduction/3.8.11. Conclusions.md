# 3.8.11. Conclusions

Wrapper methods transform feature selection from a mathematical exercise into an applied machine learning optimization problem, capturing deep interactions that filter methods ignore.

### 11.1. Anatomy of the Search Space

The entire necessity for heuristic sequential search stems from the exponential explosion of feature combinations:

$$
S = 2^n
$$

By deploying SFS or SBS, data scientists navigate this massive space efficiently, securing high-performing feature combinations without infinite compute time.

### 11.2. Comparing Wrappers and Filters

Understanding the structural trade-offs between filter and wrapper approaches dictates the success of a machine learning pipeline. The following table contrasts the foundational mechanics of both methods.

| **Factor** | **Wrapper Methods** | **Filter Methods** |
|----------|:---:|---:|
| **Evaluation Base** | `:---:` Model accuracy/error | ---: Statistical scores |
| **Interaction Capture** | `:---:` High (evaluates combinations) | ---: Low (evaluates isolation) |
| **Computational Cost** | `:---:` Extremely high | ---: Extremely low |
| **Overfitting Risk** | `:---:` High validation bias | ---: Low validation bias |

By recognizing the heavy computational cost and overfitting risks associated with wrapper methods, data scientists can strategically deploy them only after filter methods have safely reduced the initial dimensionality of the dataset.
