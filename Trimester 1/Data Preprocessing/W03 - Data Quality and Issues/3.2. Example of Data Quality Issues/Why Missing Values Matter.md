# Why Missing Values Matter

Machine learning algorithms rely heavily on mathematical operations such as distance calculations, similarity measures, probability estimation, and optimization.

A common similarity computation is Euclidean distance:

d(x,y)=\sqrt{\sum_{i=1}^{n}(x_i-y_i)^2}

If one or more values are missing:

$$
x_i = \text{NULL}
$$

then the distance computation becomes invalid or misleading.

This creates major problems in:

- Clustering
    
- K-Nearest Neighbors
    
- Regression
    
- Neural Networks
    
- Statistical inference
    

Most machine learning systems therefore require missing-value handling before training.
