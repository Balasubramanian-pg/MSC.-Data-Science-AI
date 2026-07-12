# Distance-Based Intuition Behind Outliers

The lecture introduces a simple intuitive method for understanding outliers.

Suppose distances between nearby points are small:

|Pair|Distance|
|---|---|
|A-B|1|
|B-C|1|
|C-D|1|

But:

|Pair|Distance|
|---|---|
|D-E|5|

The average distance from E to the remaining points becomes significantly larger.

This suggests:

$$
\text{Average Distance}(E) \gg \text{Average Distance of Other Points}
$$

Outlier detection methods often rely fundamentally on this idea.
