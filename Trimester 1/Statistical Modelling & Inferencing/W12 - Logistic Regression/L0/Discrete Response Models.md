---
title: W12 - Logistic Regression - Logistic Regression - Logistic Regression - Logistic Regression - Logistic Regression
module: Statistical Modelling And Inferencing
week: W12 - Logistic Regression - Logistic Regression - Logistic Regression - Logistic Regression - Logistic Regression
---

### Welcome to Module 12: Discrete [Response](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#[response](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L1/The%20Multiple%20Regression%20Model.md#[response](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Model%20Assessment%20and%20Adjusted%20R%C2%B2.md#response))) Models

You have mastered the mechanics of Maximum Likelihood Estimation (MLE) and its application to continuous data. Now, we are shifting our focus to **Discrete [Response](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#[response](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L1/The%20Multiple%20Regression%20Model.md#[response](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Model%20Assessment%20and%20Adjusted%20R%C2%B2.md#response))) Models**, specifically **Logistic Regression**. This is a pivotal transition because, in your work as a pharmaceutical analyst, the most critical business questions are often binary: _Will a patient be readmitted? Does this physician adopt the new treatment protocol? Did the marketing campaign convert to a sale?_

### 1. The Challenge: Why Linear Regression Fails for Binary Data

You cannot simply use [Multiple Linear Regression](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L1/The%20Least%20Squares%20Method%20in%20Multiple%20Regression.md#multiple-linear-regression) for binary outcomes (0 or 1). If you do, you encounter the **Linear Probability Model (LPM)** problem:

- **The Boundary Problem:** A linear model can predict [probabilities](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W01 - Basic Probability & Statistics/L2/Reading%201%20An%20Introduction%20to%20Decision%20Theory.md#probabilities) outside the logical $[0, 1]$ range (e.g., predicting a probability of -0.2 or 1.5).
    
- **Heteroskedasticity:** The variance of the error terms in a binary model is not constant, which violates the fundamental assumptions of standard OLS regression.
    

### [2. Key Objectives for this Module](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W10 - Cluster Analysis - Cluster Analysis - Cluster Analysis - Cluster Analysis - Cluster Analysis/L0/Module%2010%20-%20Cluster%20Analysis.md#2-key-objectives-for-this-module)

We will bridge this gap using the principles of MLE to build robust classification tools:

#### A. Probability and Logit Models

Instead of modeling the probability directly as a straight line, we use the **Logit Link Function**. This uses the _Logistic Distribution_ to "squash" any input into a value strictly between 0 and 1, ensuring our [predictions](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/The%20Coefficient%20of%20Determination%20%28R%C2%B2%29.md#predictions) always make logical sense.

- **The Logit Transform:** We model the "Log-Odds" ($ln(\frac{p}{1-p})$) as a linear combination of our [predictors](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#[predictors](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L1/The%20Multiple%20Regression%20Model.md#[predictors](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Model%20Assessment%20and%20Adjusted%20R%C2%B2.md#predictors))). This is the foundation of Logistic Regression.
    

#### B. The Power of Odds and Log-Odds

You will learn to interpret coefficients in terms of **Odds Ratios**.

- Instead of saying "an increase of 1 in $X$ increases the probability of $Y$ by 0.05," you will learn to say "an increase of 1 in $X$ increases the _odds_ of $Y$ by a factor of 1.2." This is the industry-standard way to communicate decision-making insights to stakeholders.
    

#### C. Estimation via MLE

Because the relationship between the log-odds and the [predictors](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#[predictors](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L1/The%20Multiple%20Regression%20Model.md#[predictors](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Model%20Assessment%20and%20Adjusted%20R%C2%B2.md#predictors))) is nonlinear, we cannot use OLS to find the best-fitting line. We must use **Maximum Likelihood Estimation**. You will see how we iteratively find the parameters that make our observed binary outcomes ($0$s and $1$s) most likely to have occurred.

### Comparison: Continuous vs. Binary Modeling

|**Feature**|**[Multiple Linear Regression](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L1/The%20Least%20Squares%20Method%20in%20Multiple%20Regression.md#multiple-linear-regression)**|**Logistic Regression**|
|---|---|---|
|**Outcome Type**|Continuous|Binary (0 or 1)|
|**Prediction Range**|$(-\infty, +\infty)$|$[0, 1]$|
|**Estimation Method**|[Ordinary Least Squares (OLS)](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L1/The%20Least%20Squares%20Method%20in%20Multiple%20Regression.md#ordinary-least-squares-ols)|Maximum Likelihood Estimation (MLE)|
|**Interpretation**|Change in $Y$ per unit of $X$|Odds ratio (change in likelihood)|

### [Moving Forward](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W10 - Cluster Analysis - Cluster Analysis - Cluster Analysis - Cluster Analysis - Cluster Analysis/L0/Module%2010%20-%20Cluster%20Analysis.md#moving-forward)

By the end of this module, you will be able to handle "yes/no" data with the same rigor you apply to sales forecasting. You will be able to build models that inform high-stakes business decisions, like determining which physician segments are most likely to respond to a specific sales strategy.

**Would you like to start with the limitations of the Linear Probability Model (LPM), or shall we dive directly into the mathematical construction of the Logit function?**

Tags: #statistics #machine-learning #data-science #statistical-modelling