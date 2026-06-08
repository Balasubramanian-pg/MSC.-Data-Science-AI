---
title: W01 - Basic Probability & Statistics
module: Statistical Modelling And Inferencing
week: W01 - Basic Probability & Statistics
---

### Foundations of Statistical Inference: Technical Notes

Statistical inference is the process of generalizing from a sample to a population. It bridges the gap between what we observe (sample statistics) and the true reality (population parameters) using probability theory.
![[Sampling & Representation.png]]
### 1. Sampling & Representation

Sampling is the foundation of inference. If the sample is biased, the inference will be invalid, regardless of the statistical rigor applied later.

#### 1.1 Taxonomy of Sampling

- **Probability Sampling:** Each element has a known non-zero probability of selection. Necessary for valid inference.
    
    - **Simple [Random Sampling](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Reading%20Material%20The%20Chi-Square%20Test%20of%20Independence.md#random-sampling) (SRS):** Every combination of $n$ elements has an equal probability.
        
    - **Stratified Sampling:** Ensures representation of subgroups (strata) by sampling from each independently.
        
    - **Cluster Sampling:** Efficient for large geographical areas; samples whole groups (clusters).
        
- **Non-Probability Sampling:** Convenience sampling; lacks theoretical justification for generalizing results.
    

### 2. Point Estimation
![[Point Estimation.png]]
A point estimator is a rule (statistic) used to estimate a population parameter.

- **Criteria for "Good" Estimators:**
    
    - **Unbiasedness:** The sampling distribution of the estimator is centered at the true parameter ($E[\hat{\theta}] = \theta$).
        
    - **Efficiency:** The estimator has the minimum possible variance among unbiased estimators.
        

### 3. The Central Limit Theorem (CLT)
![[CLT.png]]
The CLT is the bridge between raw data and the Normal Distribution. It asserts that for a sufficiently large sample size ($n \geq 30$), the sampling distribution of the sample [mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#mean) $\bar{x}$ will be approximately Normal, regardless of the population distribution shape.

- **Parameters of the Sampling Distribution:**
    
    - **Center:** [Mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#mean) $\mu_{\bar{x}} = \mu$ (Population [mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#mean)).
        
    - **Spread:** [Standard Error](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#standard-error) $SE = [\frac{](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L1/Inferences%20for%20Two%20Population%20Means.md#frac)\sigma}{\sqrt{n}}$ ([Standard deviation of the sampling distribution](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W03 - Estimation And Hypothesis Testing/L1/3.1%20Interval%20Estimation%20of%20the%20Mean.md#standard-deviation-of-the-sampling-distribution)).
        

### 4. Interval Estimation

Point estimates are inherently imprecise. Confidence Intervals (CI) quantify this uncertainty by providing a range of plausible values for the parameter.

#### 4.1 Confidence Interval Structure

$$\text{CI} = \text{Point Estimate} \pm (\text{Critical Value} \times \text{[Standard Error](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#standard-error)})$$

#### 4.2 Selection of Distribution

- **Z-Interval ($\sigma$ Known):** Used when the population standard deviation is known. Uses Z-scores from the Standard Normal distribution.
    
- **T-Interval ($\sigma$ Unknown):** Used when the population standard deviation is unknown (estimated by $s$). Uses the $t$-distribution, which accounts for the extra uncertainty by having "fatter tails," especially at small sample sizes ($df = n-1$).
    

#### 4.3 The "Net Fishing" Interpretation

A [95% confidence interval](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W03 - Estimation And Hypothesis Testing/L0/Statistical%20Inference%20in%20Modelling.md#95-confidence-interval) does **not** [mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#mean) there is a 95% probability that the true parameter $\mu$ is in _your_ specific interval. It means that if you were to repeat the sampling process 100 times, 95 of those intervals would capture the true population [mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#mean). **The confidence is in the procedure, not the specific outcome.**

### 5. Implementation in Python

```Python
import numpy as np
from scipy import stats

data = np.random.normal(loc=100, scale=15, size=50)

## Calculate 95% Confidence Interval for mean (σ unknown)
sample_mean = np.mean(data)
sem = stats.sem(data)  # Standard Error of the Mean
confidence = 0.95

## Using stats.t.interval
ci = stats.t.interval(confidence, df=len(data)-1, loc=sample_mean, scale=sem)

print(f"Sample Mean: {sample_mean:.2f}")
print(f"95% Confidence Interval: {ci}")
```

### [Summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W01 - Basic Probability & Statistics/L2/Reading%202%20Parametric%20vs.%20Non-Parametric%20Methods.md#[summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#[summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L1/The%20Multiple%20Regression%20Model.md#summary))) of Statistical Tools

|**Scenario**|**Estimator**|**Statistic**|**Distribution**|
|---|---|---|---|
|$\sigma$ Known|[Mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#mean)|$Z = [\frac{](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L1/Inferences%20for%20Two%20Population%20Means.md#frac)\bar{x} - \mu}{\sigma/\sqrt{n}}$|Normal ($Z$)|
|$\sigma$ Unknown|[Mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#mean)|$t = [\frac{](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L1/Inferences%20for%20Two%20Population%20Means.md#frac)\bar{x} - \mu}{s/\sqrt{n}}$|Student's $t$|

**Would you like to move into hypothesis testing, which builds on these intervals, or perhaps look at ANOVA to compare means across multiple groups?**

Tags: #statistics #machine-learning #data-science #statistical-modelling