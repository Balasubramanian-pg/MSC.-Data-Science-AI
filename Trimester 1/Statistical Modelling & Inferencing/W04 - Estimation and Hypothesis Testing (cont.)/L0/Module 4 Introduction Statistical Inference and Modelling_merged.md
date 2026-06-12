---
title: W04 - Estimation And Hypothesis Testing Cont
module: Statistical Modelling And Inferencing
week: W04 - Estimation And Hypothesis Testing Cont
---


## 1 Transition from Single Population Inference to Comparative Inference

In previous modules, statistical inference focused primarily on a single population.

Typical questions included:

- estimating a single population [mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#mean)
    
- constructing confidence intervals for one parameter
    
- testing hypotheses about a single proportion
    
- estimating population variance
    
- conducting one-sample tests
    

[Examples](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W08 - Forecasting & Time Series Analysis/L0/Time%20Series%20Analysis.md#examples):

$$  
H_0:\mu = 100  
$$

or

$$  
H_0:p = 0.5  
$$

These problems involve inference about one unknown population parameter.

However, real-world decision-making rarely stops at analyzing a single population in isolation.

Most practical problems are comparative.

Organizations usually want to know:

- whether one strategy outperforms another
    
- whether two customer groups behave differently
    
- whether treatment effects vary across populations
    
- whether categorical variables are associated
    

This module expands statistical inference into multi-population settings.

## 2 The Core Shift in This Module

The major conceptual transition is:

$$  
\text{Single Population Inference}  
\rightarrow  
\text{Comparative Inference}  
$$

\text{Single Population Inference}\rightarrow\text{Comparative Inference}

Instead of estimating:

$$  
\mu  
$$

we now compare:

$$  
\mu_1 - \mu_2  
$$

\mu_1 - \mu_2

Instead of testing:

$$  
p = 0.5  
$$

we may test:

$$  
p_1 = p_2  
$$

p_1 = p_2

This changes both:

- the structure of the hypotheses
    
- the variability calculations
    

because uncertainty now comes from multiple samples simultaneously.


## 3 Why Comparative Inference Matters

Modern statistics is fundamentally comparative.

Almost every business, scientific, or [engineering](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W03 - Estimation And Hypothesis Testing/L2/Errors%2C%20P-values%2C%20and%20Significance.md#engineering) decision depends on comparing alternatives.

[Examples](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W08 - Forecasting & Time Series Analysis/L0/Time%20Series%20Analysis.md#examples):

|Domain|Comparative [Question](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[question](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[question](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#question)))|
|---|---|
|Marketing|Which campaign generates higher conversion?|
|[Medicine](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W03 - Estimation And Hypothesis Testing/L2/Errors%2C%20P-values%2C%20and%20Significance.md#[medicine](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W03 - Estimation And Hypothesis Testing/L2/Errors%2C%20P-values%2C%20and%20Significance.md#medicine))|Which treatment improves recovery more?|
|[Manufacturing](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W03 - Estimation And Hypothesis Testing/L2/Errors%2C%20P-values%2C%20and%20Significance.md#manufacturing)|Which process has lower defect rates?|
|[Finance](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L1/Inferences%20for%20Two%20Population%20Variances.md#[finance](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/The%20Coefficient%20of%20Determination%20%28R%C2%B2%29.md#finance))|Which portfolio produces higher returns?|
|[Education](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L1/Inferences%20for%20Two%20Population%20Variances.md#education)|Which teaching method improves scores more?|
|Technology|Which algorithm performs better?|

Inference becomes meaningful because decisions require comparisons.

A single isolated number is often insufficient.


## 4 Learning Objective 1: Inference for Multiple Population Means

One major focus of this module is comparing means across populations.


## 4.1 Two-Population [Mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#mean) Problems

Suppose we compare average sales under two pricing strategies.

We may define:

## $$  
\mu_1

\text{[mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#mean) sales under strategy A}  
$$

## $$  
\mu_2

\text{[mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#mean) sales under strategy B}  
$$

The central [question](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[question](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[question](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#question))) becomes:

$$  
H_0:\mu_1 - \mu_2 = 0  
$$

H_0:\mu_1-\mu_2=0

versus:

$$  
H_A:\mu_1 - \mu_2 \ne 0  
$$

This asks whether the observed difference is statistically distinguishable from random variation.


## 4.2 More Than Two Population Means

When comparing several groups simultaneously, pairwise testing becomes inefficient and statistically dangerous.

Suppose:

- four marketing campaigns
    
- five [manufacturing](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W03 - Estimation And Hypothesis Testing/L2/Errors%2C%20P-values%2C%20and%20Significance.md#manufacturing) plants
    
- three treatment groups
    

Instead of conducting many separate t-tests, we use:

$$  
\text{ANOVA}  
$$

[Analysis of Variance](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#analysis-of-variance).

ANOVA tests whether all population means are equal:

$$  
H_0:  
\mu_1 = \mu_2 = \mu_3 = \dots = \mu_k  
$$

H_0:\mu_1=\mu_2=\mu_3=\dots=\mu_k

This becomes foundational in experimental design and business analytics.


## 5 Learning Objective 2: Comparing Population Variances

Means describe central tendency.

But variance describes consistency and risk.

Two processes may have identical averages but radically different variability.

[Example](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#example):

|Process|Average Output|Variability|
|---|---|---|
|A|100|Low|
|B|100|High|

In [manufacturing](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W03 - Estimation And Hypothesis Testing/L2/Errors%2C%20P-values%2C%20and%20Significance.md#manufacturing), [finance](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L1/Inferences%20for%20Two%20Population%20Variances.md#[finance](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/The%20Coefficient%20of%20Determination%20%28R%C2%B2%29.md#finance)), and [quality control](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L1/Inferences%20for%20Two%20Population%20Variances.md#quality-control), variability often matters more than the [mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#mean).

This module introduces inference procedures for comparing population variances.

Common questions include:

- Is one production process more stable?
    
- Does one investment have higher volatility?
    
- Is one machine more consistent?
    

Variance comparison often uses:

$$  
F  
$$

statistics and chi-square distributions.


## 6 Learning Objective 3: Testing Population Proportions

Many real-world variables are categorical rather than numerical.

[Examples](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W08 - Forecasting & Time Series Analysis/L0/Time%20Series%20Analysis.md#examples):

- yes/no
    
- success/failure
    
- defective/non-defective
    
- click/no click
    
- churn/no churn
    

For such data, the population parameter becomes:

$$  
p  
$$

the population proportion.


## 6.1 Comparing Two Proportions

Suppose:

- website A conversion rate:
    

$$  
p_1  
$$

- website B conversion rate:
    

$$  
p_2  
$$

We may test:

$$  
H_0:p_1 = p_2  
$$

H_0

=p_2

This forms the statistical foundation of:

- A/B testing
    
- marketing experiments
    
- product optimization
    
- online experimentation
    

Much of modern digital business depends heavily on proportion testing.


## 7 Introduction to Categorical Data Analysis

A major conceptual expansion in this module is the introduction of categorical data.

Numerical data measures quantities.

Categorical data measures group membership.

[Examples](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W08 - Forecasting & Time Series Analysis/L0/Time%20Series%20Analysis.md#examples):

|Variable|Categories|
|---|---|
|Gender|Male / Female|
|Purchase Decision|Buy / Not Buy|
|Political Preference|Party A / B / C|
|Device Type|Mobile / Desktop / Tablet|

Categorical analysis studies relationships between such groups.


## 8 Chi-Square Testing

The chi-square test is one of the most widely used methods for categorical analysis.

The core logic is:

$$  
\text{Observed Frequencies}  
\quad vs \quad  
\text{Expected Frequencies}  
$$

\text{Observed Frequencies}\quad vs \quad\text{Expected Frequencies}

If observed counts differ too strongly from expected counts under:

$$  
H_0  
$$

then the [null hypothesis](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W03 - Estimation And Hypothesis Testing/L2/Errors%2C%20P-values%2C%20and%20Significance.md#null-hypothesis) is rejected.


## 9 Types of Chi-Square Tests

This module typically introduces two major forms.


## 9.1 Chi-Square Goodness-of-Fit Test

Tests whether observed categorical frequencies match a claimed distribution.

[Example](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#example):

- Is a die fair?
    
- Do customer preferences follow expected proportions?
    


## 9.2 Chi-Square Test of [Independence](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L0/Linear%20Regression.md#independence)

Tests whether two categorical variables are associated.

[Example](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#example):

- Is purchasing behavior associated with gender?
    
- Is device type associated with conversion rate?
    

This becomes extremely important in:

- business intelligence
    
- survey analysis
    
- social science
    
- healthcare analytics
    


## 10 The Big Statistical Progression

This module represents a major conceptual progression:

|Earlier Modules|This Module|
|---|---|
|Single parameter inference|Multi-group inference|
|Numerical means|Categorical relationships|
|One-sample tests|Comparative testing|
|Isolated estimation|Association analysis|

The statistical machinery becomes more general and more realistic.


## 11 The Deep Structure Behind All These Methods

Despite the variety of techniques, the underlying logic remains identical.

Every inferential procedure asks:

$$  
\text{Observed [Signal](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#[signal](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#signal))}  
\quad vs \quad  
\text{Expected Random Variation}  
$$

\text{Observed [Signal](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#[signal](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#signal))}\quad vs \quad\text{Expected Random Variation}

Whether using:

- t-tests
    
- ANOVA
    
- proportion tests
    
- chi-square tests
    

the core [question](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[question](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[question](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#question))) remains:

> Is the observed pattern too extreme to plausibly attribute to random chance alone?

That is the unifying principle behind statistical inference.


## 12 Why This Module Matters Practically

This module moves statistics closer to real-world analytics.

These methods power:

- A/B testing systems
    
- business experimentation
    
- recommendation systems
    
- healthcare studies
    
- [manufacturing](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W03 - Estimation And Hypothesis Testing/L2/Errors%2C%20P-values%2C%20and%20Significance.md#manufacturing) [quality control](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L1/Inferences%20for%20Two%20Population%20Variances.md#quality-control)
    
- public policy analysis
    
- survey research
    
- product optimization
    

Much of modern data science and business intelligence relies heavily on comparative inference and categorical analysis.

This module is where statistics begins to resemble real operational decision-making rather than isolated textbook calculations.

Tags: #statistics #machine-learning #data-science #statistical-modelling