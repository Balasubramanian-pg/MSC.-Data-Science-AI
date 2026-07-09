#### [2.1. Numeric Data Preprocessing and Feature Engineering](./2.1.%20Numeric%20Data%20Preprocessing%20and%20Feature%20Engineering.md)

Numeric data preprocessing prepares raw numerical features for machine learning by improving their quality, consistency, and representation. Common techniques include scaling, transformation, discretization, and feature creation to enhance predictive performance.

#### [2.1.1. From Raw Measurements to Statistical Reality](./2.1.01.%20From%20Raw%20Measurements%20to%20Statistical%20Reality.md)

Raw numerical measurements rarely capture the complete statistical characteristics of a dataset. Understanding their distribution, variability, and relationships is the first step toward effective feature engineering.

#### [2.1.2. Why Raw Numeric Features Are Fundamentally Incomplete](./2.1.02.%20Why%20Raw%20Numeric%20Features%20Are%20Fundamentally%20Incomplete.md)

Raw features often contain noise, skewness, outliers, and scale differences that limit their usefulness. Preprocessing transforms these variables into representations that better capture the underlying information.

#### [2.1.3. The Geometry of Scale: Normalization and Standardization](./2.1.03.%20The%20Geometry%20of%20Scale%20-%20Normalization%20and%20Standardization.md)

Normalization and standardization adjust feature scales to ensure numerical consistency across variables. These techniques are essential for algorithms that rely on distances, gradients, or variance.

#### [2.1.4. Taming the Tails: Attribute Transformations](./2.1.04.%20Taming%20the%20Tails%20-%20Attribute%20Transformations.md)

Attribute transformations, such as logarithmic or power transformations, reduce skewness and stabilize variance. These methods improve the statistical properties of features and make patterns easier for models to learn.

#### [2.1.5. Discretization and the Loss of Precision](./2.1.05.%20Discretization%20and%20the%20Loss%20of%20Precision.md)

Discretization converts continuous variables into categorical intervals. Although this reduces numerical precision, it can improve interpretability, reduce noise, and capture nonlinear relationships.

#### [2.1.6. The Instrumentation of Preprocessing](./2.1.06.%20The%20Instrumentation%20of%20Preprocessing.md)

Modern preprocessing relies on statistical methods and software libraries to automate feature transformations while maintaining consistency between training and inference datasets.

#### [2.1.7. Example of Feature Standardization](./2.1.07.%20Example%20of%20Feature%20Standardization.md)

This example demonstrates how a numerical feature is standardized using its mean and standard deviation, producing values with a mean of 0 and a standard deviation of 1.

#### [2.1.8. Factors Affecting Numeric Preprocessing](./2.1.08.%20Factors%20Affecting%20Numeric%20Preprocessing.md)

The choice of preprocessing technique depends on feature distribution, outliers, missing values, algorithm requirements, and business objectives. Selecting the appropriate approach is critical for effective modeling.

#### [2.1.9. Common Misinterpretations](./2.1.09.%20Common%20Misinterpretations.md)

Numeric preprocessing does not automatically improve model accuracy. Its purpose is to create more suitable feature representations while preserving the underlying information contained in the data.

#### [2.1.10. Conclusions](./2.1.10.%20Conclusions.md)

Numeric preprocessing is a foundational stage of feature engineering that transforms raw numerical data into robust, consistent, and model-ready features, enabling more accurate and reliable machine learning models.
