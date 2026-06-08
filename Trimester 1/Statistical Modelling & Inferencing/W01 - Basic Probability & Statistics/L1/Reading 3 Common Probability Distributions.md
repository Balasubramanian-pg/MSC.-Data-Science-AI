---
title: W01 - Basic Probability & Statistics
module: Statistical Modelling And Inferencing
week: W01 - Basic Probability & Statistics
---

Standard probability distributions serve as the "canonical recipes" of statistics. Instead of deriving [probabilities](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W01 - Basic Probability & Statistics/L2/Reading%201%20An%20Introduction%20to%20Decision%20Theory.md#probabilities) from first principles for every new dataset, we map our data to these established forms, which come with well-understood properties, formulas, and parameters.

### 1. Discrete Distributions (The Counters)

These models are appropriate when your random variable is the result of counting, meaning it takes on integer values with distinct gaps.

#### 1.1 [Bernoulli Distribution](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W01 - Basic Probability & Statistics/L1/Probability%20and%20Distribution.md#bernoulli-distribution) (The Binary Trial)

The fundamental building block for binary outcomes.

- **Theory:** Models a single experiment with two outcomes: Success (1) or Failure (0).
    
- **Parameters:** $p$ (probability of success).
    
- **Mathematical Property:** $E[X] = p$, $Var(X) = p(1-p)$.
    
- **Use Case:** Any binary choice (e.g., Click vs. No-click, Pass vs. Fail).
    

#### 1.2 [Binomial Distribution](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W01 - Basic Probability & Statistics/L1/Probability%20and%20Distribution.md#binomial-distribution) (The Repeated Trial)

The extension of the [Bernoulli distribution](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W01 - Basic Probability & Statistics/L1/Probability%20and%20Distribution.md#bernoulli-distribution) for repeated, independent trials.

- **Theory:** Counts the number of successes ($k$) in $n$ independent trials.
    
- **Parameters:** $n$ (number of trials), $p$ (probability of success per trial).
    
- **PMF:** $P(X=k) = \binom{n}{k} p^k (1-p)^{n-k}$.
    
- **Use Case:** [Quality control](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L1/Inferences%20for%20Two%20Population%20Variances.md#quality-control) (number of defects in a batch of $n$ items) or surveying (number of yes-responses in a sample).
    

### 2. Continuous Distributions (The Measurers)

These models are appropriate for data that exists on a continuous scale (e.g., time, mass, length).

#### 2.1 [Uniform Distribution](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W01 - Basic Probability & Statistics/L1/Probability%20and%20Distribution.md#uniform-distribution) (The Flat Baseline)

The simplest continuous model, where every outcome in a range is equally likely.

- **Theory:** Every value in the interval $[a, b]$ has the same probability density.
    
- **Parameters:** $a$ (min), $b$ (max).
    
- **Use Case:** Random number generation, modeling waiting times where there is zero prior knowledge of the arrival distribution.
    

#### 2.2 [Normal (Gaussian) Distribution](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W01 - Basic Probability & Statistics/L1/Probability%20and%20Distribution.md#normal-gaussian-distribution) (The Universal Pattern)

The most important distribution in statistics due to the **Central Limit Theorem (CLT)**, which states that the sum/average of many independent random variables tends toward a normal distribution, regardless of the original distribution.

- **Theory:** A symmetric, bell-shaped curve defined by [mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#mean) ($\mu$) and standard deviation ($\sigma$).
    
- **Parameters:**
    
    - $\mu$ ([mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#mean)): Locates the peak of the bell.
        
    - $\sigma$ (standard deviation): Controls the dispersion or "spread."
        
- **The Empirical Rule (68-95-99.7):**
    
    - $68\%$ of data falls within $\mu \pm 1\sigma$
        
    - $95\%$ of data falls within $\mu \pm 2\sigma$
        
    - $99.7\%$ of data falls within $\mu \pm 3\sigma$
        

### 3. Comparison Table: Selecting the "Recipe"

|**Distribution**|**Variable Type**|**Key Parameters**|**[Intuition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[intuition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[intuition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[intuition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#intuition))))**|
|---|---|---|---|
|**Bernoulli**|Discrete|$p$|Single binary event.|
|**Binomial**|Discrete|$n, p$|Count of events across trials.|
|**Uniform**|Continuous|$a, b$|Total indifference; equal likelihood.|
|**Normal**|Continuous|$\mu, \sigma$|Natural accumulation of random error.|

### 4. Implementation: Python Perspective

In practice, you rarely need to implement these from scratch. Python's `scipy.stats` library provides a unified interface for these models.

Python

```
from scipy.stats import bernoulli, binom, uniform, norm

## Define a Normal Distribution with mean 0 and std 1
dist = norm(loc=0, scale=1)

## Calculate the probability of being between -1 and 1
## This should be ~68% based on the Empirical Rule
prob = dist.cdf(1) - dist.cdf(-1)
print(f"Probability within 1 sigma: {prob:.4f}")
```

### 5. Hidden Assumptions

When you use a distribution as a "recipe," you are implicitly accepting its assumptions:

- **[Independence](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L0/Linear%20Regression.md#independence):** The [Binomial distribution](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W01 - Basic Probability & Statistics/L1/Probability%20and%20Distribution.md#binomial-distribution) assumes each trial does not influence the next. If the result of one trial changes the probability of the next (e.g., picking items without replacement), you should use a **Hypergeometric distribution** instead.
    
- **Symmetry:** The Normal distribution assumes symmetry. If your data has a "long tail" (like wealth distribution), the Normal distribution will fail to model the extreme values accurately, necessitating a **Log-Normal** or **Pareto distribution**.
    

Would you like to explore how to test whether your data actually fits a Normal distribution using the **Shapiro-Wilk test** or **Q-Q plots**, or shall we look at **Expected Value and Variance** next?

Tags: #statistics #machine-learning #data-science #statistical-modelling