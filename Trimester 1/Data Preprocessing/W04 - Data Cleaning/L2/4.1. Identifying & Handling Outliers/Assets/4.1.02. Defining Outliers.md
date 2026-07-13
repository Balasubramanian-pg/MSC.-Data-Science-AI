# Defining Outliers

An outlier is a data point whose characteristics are considerably different from the rest of the dataset.

Consider a simple one-dimensional dataset:

|Point|Value|
|---|---|
|A|1|
|B|2|
|C|3|
|D|100|

Points A, B, and C are clustered closely together, while point D lies far away.

This makes D an outlier.

Conceptually:

$$
Distance(x_i,\mu) \gg \text{Normal Points}
$$

where:

- $x_i$ is the observation
    
- $\mu$ is the central tendency of the dataset
