# Why Inconsistency Breaks Machine Learning

Machine learning algorithms fundamentally depend on mathematical consistency.

Many systems rely on operations such as:

- Euclidean distance
    
- Mean calculation
    
- Similarity comparison
    
- Feature encoding
    
- Statistical aggregation
    

Suppose a model computes Euclidean distance:

d(x,y)=\sqrt{\sum_{i=1}^{n}(x_i-y_i)^2}

If one value is stored in kilometers and another in miles, the calculation becomes misleading because the numerical representations are incompatible.

Similarly, categorical encoding fails when identical entities use inconsistent naming conventions.

The model begins learning artificial distinctions that do not exist in reality.
