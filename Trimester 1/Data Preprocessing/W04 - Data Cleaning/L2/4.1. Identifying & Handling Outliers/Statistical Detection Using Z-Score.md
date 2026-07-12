# Statistical Detection Using Z-Score

Another common method is Z-score analysis.

The Z-score measures how many standard deviations a point lies away from the mean.

genui{"math_block_widget_always_prefetch_v2":{"content":"Z=\frac{x-\mu}{\sigma}"}}

where:

- $x$ = observation
    
- $\mu$ = mean
    
- $\sigma$ = standard deviation
    

A large absolute Z-score suggests an outlier.

Typically:

|Z-Score|Interpretation|
|---|---|
|$$\|Z\$$| < 2|Normal|
|$$2 < \|Z\$$| < 3|Suspicious|
|$$\|Z\$$| > 3|Likely Outlier|

Most normal observations lie within:

$$
-3\sigma \leq x \leq 3\sigma
$$
