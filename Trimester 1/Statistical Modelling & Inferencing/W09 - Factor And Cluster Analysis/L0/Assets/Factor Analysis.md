---
title: W09 - Factor And Cluster Analysis
module: Statistical Modelling And Inferencing
week: W09 - Factor And Cluster Analysis
---

### [Welcome to Module 9: Factor Analysis](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W09 - Factor And Cluster Analysis/L0/Module%20Intro.md#welcome-to-module-9-factor-analysis)

You have successfully navigated the landscapes of regression and time series. While those methods are primarily concerned with **predictive relationships** (how $X$ influences $Y$ over time or space), **Factor Analysis** shifts our focus toward **data reduction and latent structure detection**.

It is common in pharmaceutical and business analytics to face "high-dimensional" data—datasets where you have hundreds of variables (e.g., patient health metrics, regional market KPIs, or survey items). Factor analysis is the primary statistical tool for identifying the "hidden" signals within this [noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#[noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#noise)).

### [1. The Philosophy: Why Factor Analysis?](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W09 - Factor And Cluster Analysis/L0/Module%20Intro.md#1-the-philosophy-why-factor-analysis)

The core premise of Factor Analysis is that your observed variables ($Y_1, Y_2, \dots, Y_n$) are not entirely independent. They are often "manifestations" of a smaller set of unobservable, underlying variables called **Latent Factors**.

- **Data Simplification:** Instead of analyzing 50 different KPIs, you might find that 45 of them are heavily correlated and can be represented by 3 "super-variables" or **Factors**.
    
- **Latent Structure:** It allows you to move from _observable behavior_ to _underlying characteristics_. In pharma, this might [mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#mean) grouping various symptoms into a single "Health Index" factor or consolidating complex market variables into "Market Sentiment" or "Product Accessibility" factors.
    

### [2. Key Objectives for this Module](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W10 - Cluster Analysis - Cluster Analysis - Cluster Analysis - Cluster Analysis - Cluster Analysis - Cluster Analysis - Cluster Analysis/L0/Module%2010%20-%20Cluster%20Analysis.md#2-key-objectives-for-this-module)

As we progress, we will focus on three distinct pillars:

#### [A. The Conceptual Foundation](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W09 - Factor And Cluster Analysis/L0/Module%20Intro.md#a-the-conceptual-foundation)

We will explore the mathematical [definition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W01 - Basic Probability & Statistics/L1/Probability%20and%20Distribution.md#[definition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[definition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[definition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[definition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#definition))))) of a factor. We distinguish between **Common Variance** (the variance shared with other variables, which factors capture) and **Unique Variance** (variance specific to a single variable).

- **The Factor Loading:** This is the correlation between a specific variable and a factor. High loadings tell us which variables "belong" to which underlying factor.
    

#### [B. Application and Execution](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W09 - Factor And Cluster Analysis/L0/Module%20Intro.md#b-application-and-execution)

You will learn the end-to-end workflow of applying Factor Analysis:

- **Assumptions Checking:** Ensuring your data is suitable (e.g., using the Kaiser-Meyer-Olkin (KMO) test and Bartlett's Test of Sphericity).
    
- **Extraction Methods:** Choosing between Principal Axis Factoring or Maximum Likelihood estimation.
    
- **Rotation Techniques:** Using methods like **Varimax (orthogonal)** or **Promax (oblique)** to make your factors more interpretable. Rotation is the "secret sauce" that turns a blurry data pattern into a clear, explainable business insight.
    

#### [C. Analytical Practice](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W09 - Factor And Cluster Analysis/L0/Module%20Intro.md#c-analytical-practice)

We will move beyond theory to analyze real-world datasets. This will involve:

- Determining the **number of factors to retain** using tools like the Scree Plot or the Kaiser Criterion (eigenvalues > 1).
    
- Validating our findings to ensure the simplified factor structure makes logical sense within the pharmaceutical or business context you work in.
    

### [Comparison: Regression vs. Factor Analysis](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W09 - Factor And Cluster Analysis/L0/Module%20Intro.md#comparison-regression-vs-factor-analysis)

|**Feature**|**Regression**|**Factor Analysis**|
|---|---|---|
|**Primary Goal**|Prediction/Forecasting|Data Reduction/Structure Discovery|
|**Relationship**|Dependent variable ($Y$) vs. [Predictors](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#[predictors](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L1/The%20Multiple%20Regression%20Model.md#[predictors](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Model%20Assessment%20and%20Adjusted%20R%C2%B2.md#predictors))) ($X$)|Inter-dependencies among variables|
|**Output**|Coefficients/Weights|Factor Loadings/Factor Scores|
|**Business Use**|Estimating future sales|Consolidating 50 KPIs into 5 strategy drivers|

### [Moving Forward](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W10 - Cluster Analysis - Cluster Analysis - Cluster Analysis - Cluster Analysis - Cluster Analysis - Cluster Analysis - Cluster Analysis/L0/Module%2010%20-%20Cluster%20Analysis.md#moving-forward)

Factor Analysis will fundamentally change how you handle "big data" in your business analytics career. It allows you to present senior leadership with concise, high-level insights derived from massive, complex datasets.

**Would you like to start with the mathematical assumptions required for factor analysis, or shall we jump straight into the steps for interpreting factor loadings and deciding how many factors to retain?**

Tags: #statistics #machine-learning #data-science #statistical-modelling