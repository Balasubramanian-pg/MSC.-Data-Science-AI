---
title: W02 - Introduction To Statistical Inference
module: Statistical Modelling And Inferencing
week: W02 - Introduction To Statistical Inference
---

### Point Estimation: Theory and Properties

Point estimation is a fundamental process in inferential statistics used to approximate a population parameter using a single numerical value derived from a sample. While this value represents our "best guess" about the population, it may not perfectly match the true parameter.

#### Common Point Estimates

In statistics, we typically focus on three primary population parameters when performing point estimation:

- **Population [Mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#mean)**: Used for continuous variables, such as estimating the average height of individuals or the average age of a population.
    
- **Population Proportion**: Used for categorical variables, such as calculating the percentage of a population that voted for a specific political party.
    
- **Population Variance**: Used to measure the spread or dispersion of data within a population (e.g., how values are distributed around the [mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#mean)).
    

To approximate these population parameters, we use corresponding **sample statistics**: the sample [mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#mean), sample proportion, and sample variance.

#### Properties of a Good Estimator

A critical aspect of selecting an estimator is ensuring it is **unbiased**. An unbiased estimator is one where, on average, the sample statistic aligns with the true population parameter.

- **Unbiased Estimator**: Even if individual sample observations vary significantly, the average of multiple sample estimates converges to the true population parameter (the "target").
    
- **Biased Estimator**: The estimator is systematically skewed, meaning even with multiple samples, the results remain far away from the true population value.
    

Would you like to delve deeper into the mathematical [definitions](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W08 - Forecasting & Time Series Analysis/L0/Time%20Series%20Analysis.md#definitions) of bias versus variance, or would you prefer to explore how we transition from point estimates to **interval estimates** to better account for uncertainty?

Tags: #statistics #machine-learning #data-science #statistical-modelling
