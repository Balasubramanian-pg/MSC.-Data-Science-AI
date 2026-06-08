---
title: W02 - Introduction To Statistical Inference
module: Statistical Modelling And Inferencing
week: W02 - Introduction To Statistical Inference
---

### Sampling Theory and Representation

Before conducting any statistical inference, it is essential to define the sampling procedure. The validity of all subsequent interval estimations or hypothesis tests is fundamentally predicated on the quality of the sample.

#### Key Sampling Concepts

- **Simple [Random Sampling](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Reading%20Material%20The%20Chi-Square%20Test%20of%20Independence.md#random-sampling)**: Every member of the population has an equal probability of being selected. This serves as the foundation for most independent and identically distributed (i.i.d.) assumptions [in machine learning](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W01 - Basic Probability & Statistics/L1/Probability%20and%20Distribution.md#in-machine-learning) models.
    
- **Stratified Sampling**: The population is divided into distinct subgroups (strata), and samples are drawn from each group. This is an essential technique when dealing with minority classes in datasets to ensure adequate representation.
    
- **Sampling Error**: This represents the variance inherent in using a sample to estimate a population parameter rather than measuring the entire population. It is formally quantified by the **[Standard Error](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#standard-error) (SE)**.
    

#### Theoretical Considerations

- **Population vs. Sample Size**: As the sample size ($n$) approaches the population size ($N$), the sampling error approaches zero. However, in Big Data contexts, we often operate where $n \ll N$.
    
- **Central Limit Theorem (CLT)**: This theorem is the bedrock of inference. It ensures that as the sample size increases, the distribution of the sample [mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#mean) becomes approximately normal, regardless of the underlying distribution of the population.
    

## [Side Quest bro](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W02 - Introduction To Statistical Inference/L0/Inferential%20Statistics.md#side-quest-bro)

## Part 1: Mathematical Criteria for Optimal Sample Size

To determine the ideal sample size ($n$) for a two-sample hypothesis test, we have to mathematically balance our appetite for risk (Type I and Type II errors) against the size of the effect we want to detect.

### [The Mathematical Framework](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W11 - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods/L1/Maximum%20Likelihood%20Estimation.md#the-mathematical-framework)

We start by setting up our two key probability thresholds:

- **Significance Level ($\alpha$):** The probability of a Type I error (false positive). For a [two-tailed](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#two-tailed) test, we split this risk across both tails, giving us critical $Z$-scores at $Z_{1-\alpha/2}$.
    
- **Power ($1-\beta$):** The probability of correctly rejecting the [null hypothesis](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W03 - Estimation And Hypothesis Testing/L2/Errors%2C%20P-values%2C%20and%20Significance.md#null-hypothesis) when a true effect exists. $\beta$ is the Type II error rate (false negative), giving us a critical $Z$-score at $Z_{1-\beta}$.
    

We also define our target sensitivity:

- **Minimum Detectable Effect ($\delta$):** The smallest true difference between the control [mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#mean) and treatment [mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#mean) ($\mu_2 - \mu_1$) that we care about detecting.
    

### The Derivation

Assuming equal sample sizes ($n_1 = n_2 = n$) and equal historical population variances ($\sigma_1^2 = \sigma_2^2 = \sigma^2$), the [standard error](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#standard-error) of the difference between the two sample means is:

$$\sigma_{\Delta} = \sqrt{[\frac{](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L1/Inferences%20for%20Two%20Population%20Means.md#frac)\sigma^2}{n} + [\frac{](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L1/Inferences%20for%20Two%20Population%20Means.md#frac)\sigma^2}{n}} = \sqrt{\frac{2\sigma^2}{n}}$$

Under the **[Null Hypothesis](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W03 - Estimation And Hypothesis Testing/L2/Errors%2C%20P-values%2C%20and%20Significance.md#null-hypothesis) ($H_0$)**, the distribution of the difference between means is centered at 0. The boundary line for rejecting the [null hypothesis](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W03 - Estimation And Hypothesis Testing/L2/Errors%2C%20P-values%2C%20and%20Significance.md#null-hypothesis) sits at:

$$\text{Critical Value} = 0 + Z_{1-\alpha/2} \cdot \sigma_{\Delta}$$

Under the **[Alternative Hypothesis](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W03 - Estimation And Hypothesis Testing/L2/Errors%2C%20P-values%2C%20and%20Significance.md#alternative-hypothesis) ($H_a$)**, the true difference is centered at our MDE ($\delta$). To achieve our target statistical power, our critical value must simultaneously sit at a distance of $Z_{1-\beta}$ below $\delta$:

$$\text{Critical Value} = \delta - Z_{1-\beta} \cdot \sigma_{\Delta}$$

Because the critical value is a single physical point on our distribution curve, we can set these two equations equal to each other:

$$Z_{1-\alpha/2} \cdot \sigma_{\Delta} = \delta - Z_{1-\beta} \cdot \sigma_{\Delta}$$

Now, we isolate the effect size $\delta$:

$$\delta = (Z_{1-\alpha/2} + Z_{1-\beta}) \cdot \sigma_{\Delta}$$

Substitute our [definition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W01 - Basic Probability & Statistics/L1/Probability%20and%20Distribution.md#[definition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[definition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[definition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[definition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#definition))))) of $\sigma_{\Delta} = \sqrt{\frac{2\sigma^2}{n}}$ back into the equation:

$$\delta = (Z_{1-\alpha/2} + Z_{1-\beta}) \cdot \sqrt{\frac{2\sigma^2}{n}}$$

Square both sides to eliminate the square root:

$$\delta^2 = (Z_{1-\alpha/2} + Z_{1-\beta})^2 \cdot \frac{2\sigma^2}{n}$$

Finally, solve for $n$ to yield the classical sample size equation:

$$n = \frac{2\sigma^2(Z_{1-\alpha/2} + Z_{1-\beta})^2}{\delta^2}$$

## Part 2: Calculating [Standard Error](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#standard-error) for Different Metrics

Once your experiment runs, you need to calculate the [Standard Error](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#standard-error) ($SE$) to construct confidence intervals and run your $t$-tests. The mathematical approach changes entirely based on the mathematical properties of the metric you are tracking.

### 1. Continuous Metrics (e.g., Average Order Value)

For a continuous variable, the Central Limit Theorem dictates that as long as your sample size is sufficiently large, the distribution of the sample [mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#mean) will be normally distributed around the true population [mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#mean).

The variance of the sum of $n$ independent random variables is $n\sigma^2$. Since the sample [mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#mean) divides this sum by $n$, the variance of the sample [mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#mean) scales down by a factor of $n^2$:

$$\text{Var}(\bar{X}) = \text{Var}\left(\frac{1}{n}\sum X_i\right) = \frac{1}{n^2}\sum \text{Var}(X_i) = \frac{n\sigma^2}{n^2} = [\frac{](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L1/Inferences%20for%20Two%20Population%20Means.md#frac)\sigma^2}{n}$$

Taking the square root gives us the [standard error](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#standard-error) of a continuous [mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#mean):

$$\text{SE}_{\bar{X}} = [\frac{](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L1/Inferences%20for%20Two%20Population%20Means.md#frac)\sigma}{\sqrt{n}}$$

### 2. Proportion / Binary Metrics (e.g., Conversion Rate)

Binary outcomes follow a [Bernoulli distribution](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W01 - Basic Probability & Statistics/L1/Probability%20and%20Distribution.md#bernoulli-distribution) where a user either converts ($X=1$) with probability $p$, or does not convert ($X=0$) with probability $1-p$.

The underlying variance of a single Bernoulli trial is calculated as:

$$\sigma^2 = E[X^2] - (E[X])^2 = p - p^2 = p(1-p)$$

Because a sample proportion is just a sample [mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#mean) of 0s and 1s, we can directly substitute this variance into our continuous [standard error](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#standard-error) [formula](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#formula) ($SE = \sqrt{[\frac{](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L1/Inferences%20for%20Two%20Population%20Means.md#frac)\sigma^2}{n}}$):

$$\text{SE}_{\hat{p}} = \sqrt{\frac{p(1-p)}{n}}$$

### 3. Ratio Metrics (e.g., Revenue Per Paying User)

Ratio metrics occur when you divide one random variable by another, such as $\text{Ratio} = \frac{Y}{X} = [\frac{](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L1/Inferences%20for%20Two%20Population%20Means.md#frac)\text{Total Revenue}}{\text{Total Clicks}}$. Because both the numerator and the denominator vary independently across users, you cannot use classical [standard error](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#standard-error) formulas. Instead, statisticians rely on a first-order Taylor expansion approximation known as the **Delta Method**.

The Delta Method calculates the variance of the ratio $[\frac{](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L1/Inferences%20for%20Two%20Population%20Means.md#frac)[\bar{Y}](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L1/The%20Method%20of%20Least%20Squares.md#bary)}{\bar{X}}$ based on the individual variances and their covariance:

$$\text{Var}\left([\frac{](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L1/Inferences%20for%20Two%20Population%20Means.md#frac)[\bar{Y}](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L1/The%20Method%20of%20Least%20Squares.md#bary)}{\bar{X}}\right) \approx \frac{1}{n} \left[ \frac{\sigma_Y^2}{\mu_X^2} - \frac{2\mu_Y\sigma_{XY}}{\mu_X^3} + \frac{\mu_Y^2\sigma_X^2}{\mu_X^4} \right]$$

Where:

- $\sigma_X^2$ and $\sigma_Y^2$ are the sample variances of the denominator and numerator.
    
- $\sigma_{XY}$ is the covariance between the numerator and denominator for each user.
    
- $\mu_X$ and $\mu_Y$ are the respective sample means.
    

Taking the square root of this entire approximation yields the [standard error](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#standard-error) for your ratio metric, allowing you to safely calculate [statistical significance](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W03 - Estimation And Hypothesis Testing/L2/Errors%2C%20P-values%2C%20and%20Significance.md#statistical-significance) for complex financial and behavioral KPIs.

Tags: #statistics #machine-learning #data-science #statistical-modelling