# Missing Values and Machine Learning Failure

The lecture explains that many machine learning algorithms depend on mathematical similarity calculations.

One of the most common examples is Euclidean distance.

If values are missing, these computations become impossible.

Suppose:

|Person|Age|Salary|
|---|---|---|
|A|25|50000|
|B|NULL|60000|

The algorithm cannot compute proper similarity because one attribute is absent.

This directly affects:

- Clustering
    
- Classification
    
- Recommendation systems
    
- Similarity matching
