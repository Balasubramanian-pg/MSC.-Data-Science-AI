# Why Outliers Matter in Machine Learning

Many machine learning algorithms are highly sensitive to outliers.

For example:

|Algorithm|Sensitivity|
|---|---|
|Linear Regression|High|
|K-Means Clustering|High|
|KNN|Moderate|
|Decision Trees|Lower|

Outliers can distort:

- Mean calculations
    
- Regression slopes
    
- Distance metrics
    
- Cluster boundaries
    

A single extreme value may significantly shift model behavior.

Example:

|Salary Values|
|---|
|5 LPA|
|6 LPA|
|7 LPA|
|10 Crore|

The final value dramatically alters the mean.
