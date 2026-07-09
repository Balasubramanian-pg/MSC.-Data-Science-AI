#### [2.5. Attribute Transformations and Distributional Alchemy](./2.5.%20Attribute%20Transformations%20and%20Distributional%20Alchemy.md)

Attribute transformations modify the distribution of numerical features to improve their statistical properties. These techniques reduce skewness, stabilize variance, and produce features that are better suited for machine learning algorithms.

#### [2.5.1. From Raw Distributions to Statistical Symmetry](./2.5.01.%20From%20Raw%20Distributions%20to%20Statistical%20Symmetry.md)

Many real-world numerical variables exhibit skewed or asymmetric distributions. Attribute transformations reshape these distributions to make them more balanced, improving their suitability for statistical analysis and predictive modeling.

#### [2.5.2. The Geometry of Skewness](./2.5.02.%20The%20Geometry%20of%20Skewness.md)

Skewness measures the degree of asymmetry in a distribution. Understanding the direction and magnitude of skewness helps determine whether a transformation is necessary and which technique is most appropriate.

#### [2.5.3. The Logarithmic Transformation](./2.5.03.%20The%20Logarithmic%20Transformation.md)

The logarithmic transformation compresses large values while preserving the order of observations. It is commonly used to reduce positive skewness and lessen the influence of extreme values.

#### [2.5.4. The Yeo-Johnson Power Transformation](./2.5.04.%20The%20Yeo-Johnson%20Power%20Transformation.md)

The Yeo-Johnson transformation applies a power-based adjustment to both positive and negative values, making it suitable for a wider range of datasets than logarithmic or Box-Cox transformations.

#### [2.5.5. Example of Logarithmic Transformation](./2.5.05.%20Example%20of%20Logarithmic%20Transformation.md)

This example demonstrates how a skewed numerical feature is transformed using the logarithmic function, illustrating the resulting reduction in skewness and improved distribution.

#### [2.5.6. Factors Affecting Transformation Efficacy](./2.5.06.%20Factors%20Affecting%20Transformation%20Efficacy.md)

The effectiveness of a transformation depends on the original data distribution, the presence of outliers, feature characteristics, and the assumptions of the machine learning algorithm being used.

#### [2.5.7. Common Misinterpretations](./2.5.07.%20Common%20Misinterpretations.md)

Attribute transformations do not eliminate outliers or improve data quality by themselves. Their primary purpose is to reshape feature distributions to better satisfy statistical assumptions and improve model learning.

#### [2.5.8. Conclusions](./2.5.08.%20Conclusions.md)

Attribute transformations are an important preprocessing technique for numerical data. By producing more balanced feature distributions, they improve model stability, support statistical assumptions, and enhance predictive performance.
