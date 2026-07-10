# 3.7.2. The Logic of Discriminative Power

The Fisher Score evaluates the quality of a predictive feature by balancing two opposing statistical properties.

The first property is **Between-Class Variance**. This represents the mathematical distance between the average values (means) of different target classes. A massive distance between class means suggests that the feature easily distinguishes between the distinct groups.

The second property is **Within-Class Variance**. This represents the dispersion or spread of the data points within a single target class. A tight, narrow spread indicates that the feature provides a highly consistent, reliable signal for that specific class. 

>[!Note]
> The optimal predictive feature simultaneously maximizes the distance between different classes while minimizing the internal spread within each individual class.

By balancing these two forces, the Fisher Score identifies features that create dense, easily separable clusters of data.
