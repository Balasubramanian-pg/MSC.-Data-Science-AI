---

## Reading Material: Testing Population Proportions

---
## 1. Introduction to Proportions

Many statistical problems involve numerical measurements such as:

- height
    
- weight
    
- income
    
- [response](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#[response](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L1/The%20Multiple%20Regression%20Model.md#[response](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Model%20Assessment%20and%20Adjusted%20R%C2%B2.md#response))) time
    

These variables are continuous and are typically analyzed using means and variances.

However, a large class of real-world problems involves categorical outcomes instead.

In such situations, each observation belongs to one of two categories:

- success/failure
    
- yes/no
    
- defective/non-defective
    
- recovered/not recovered
    
- support/do not support
    

For binary outcomes, the primary population parameter is the population proportion:

$$  
p  
$$

p

The population proportion represents the fraction of the population possessing a particular characteristic.

## 2. [Examples](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W08 - Forecasting & Time Series Analysis/L0/Time%20Series%20Analysis.md#examples) of Population Proportions

[Examples](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W08 - Forecasting & Time Series Analysis/L0/Time%20Series%20Analysis.md#examples) of proportion-based questions include:

- proportion of voters supporting a candidate
    
- defect rate in [manufacturing](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W03 - Estimation And Hypothesis Testing/L2/Errors%2C%20P-values%2C%20and%20Significance.md#manufacturing)
    
- proportion of patients recovering after treatment
    
- click-through rate on advertisements
    
- conversion rate on a website
    
- proportion of customers who churn
    

In modern analytics, proportion inference is everywhere because many business and scientific decisions are fundamentally binary.

## 3. The Sample Proportion

Because the true population proportion:

$$  
p  
$$

is unknown, we estimate it using the sample proportion:

## $$  
\hat{p}

\frac{x}{n}  
$$

\hat{p}=\frac{x}{n}

where:

- $$x$$ = number of successes
    
- $$n$$ = sample size
    

The sample proportion acts as a point estimator for:

$$  
p  
$$

If:

- 120 customers out of 200 purchase a product
    

then:

## $$  
\hat{p}

## \frac{120}{200}

0.60  
$$

meaning the estimated purchase probability is:

$$  
60%  
$$

## 4. Sampling Distribution of the Sample Proportion

Like the sample mean, the sample proportion is also a random variable.

Different samples produce different values of:

$$  
\hat{p}  
$$

The sampling distribution of the sample proportion has:

## Mean

$$  
E(\hat{p}) = p  
$$

E(\hat{p})=p

meaning the sample proportion is an unbiased estimator.

---

## Standard Error

## $$  
SE(\hat{p})

\sqrt{  
[\frac{](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L1/Inferences%20for%20Two%20Population%20Means.md#frac)  
p(1-p)  
}{  
n  
}  
}  
$$

SE(\hat{p})=\sqrt{\frac{p(1-p)}{n}}

The standard error measures the natural variability of sample proportions across repeated sampling.

## 5. Why Proportion Variability Depends on $$p(1-p)$$

The quantity:

$$  
p(1-p)  
$$

determines variability in binary outcomes.

Variability is largest when:

$$  
p = 0.5  
$$

because uncertainty is highest when outcomes are evenly split.

Variability becomes smaller as:

$$  
p \rightarrow 0  
\quad \text{or} \quad  
p \rightarrow 1  
$$

because outcomes become increasingly predictable.

## 6. The One-Sample Z-Test for a Proportion

The one-sample Z-test evaluates a claim about a single population proportion.

The inferential [question](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[question](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[question](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#question))) becomes:

$$  
\text{Is the observed sample proportion significantly different from the hypothesized population proportion?}  
$$

This test follows the standard hypothesis-testing framework but uses formulas specialized for binary data.

## 7. Hypotheses for the One-Sample Proportion Test

The hypotheses are expressed in terms of:

$$  
p  
$$

the population proportion.

The [null hypothesis](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W03 - Estimation And Hypothesis Testing/L2/Errors%2C%20P-values%2C%20and%20Significance.md#null-hypothesis) is:

$$  
H_0:p = p_0  
$$

H_0

=p_0

where:

$$  
p_0  
$$

is the hypothesized proportion.

The [alternative hypothesis](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W03 - Estimation And Hypothesis Testing/L2/Errors%2C%20P-values%2C%20and%20Significance.md#alternative-hypothesis) may be:

## Two-Tailed

$$  
H_A:p \ne p_0  
$$

---

## Right-Tailed

$$  
H_A:p > p_0  
$$

---

## Left-Tailed

$$  
H_A:p < p_0  
$$

## 8. The One-Sample Z-Test Statistic

The Z-statistic measures how many standard errors the observed sample proportion lies from the hypothesized population proportion.

The [formula](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#formula) is:

## $$  
Z

[\frac{](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L1/Inferences%20for%20Two%20Population%20Means.md#frac)  
\hat{p} - p_0  
}{  
\sqrt{  
[\frac{](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L1/Inferences%20for%20Two%20Population%20Means.md#frac)  
p_0(1-p_0)  
}{  
n  
}  
}  
}  
$$

Z=[\frac{](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L1/Inferences%20for%20Two%20Population%20Means.md#frac)\hat{p}-p_0}{\sqrt{\frac{p_0(1-p_0)}{n}}}

where:

- $$\hat{p}$$ = sample proportion
    
- $$p_0$$ = hypothesized population proportion
    
- $$n$$ = sample size
    

## 9. Why the Standard Error Uses $$p_0$$

This is conceptually important.

When conducting hypothesis testing, we temporarily assume:

$$  
H_0  
$$

is true.

Therefore, the variability calculation must use the hypothesized proportion:

$$  
p_0  
$$

rather than the observed sample proportion.

This reflects the deeper logic of hypothesis testing:

> The [null hypothesis](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W03 - Estimation And Hypothesis Testing/L2/Errors%2C%20P-values%2C%20and%20Significance.md#null-hypothesis) defines the reference world against which evidence is evaluated.

## 10. Conditions for Validity

The one-sample Z-test for proportions depends on the normal approximation to the [binomial distribution](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W01 - Basic Probability & Statistics/L1/Probability%20and%20Distribution.md#binomial-distribution).

This approximation becomes reliable only under certain conditions.

## [Random Sampling](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Reading%20Material%20The%20Chi-Square%20Test%20of%20Independence.md#random-sampling)

The sample should reasonably represent the population.

Biased samples invalidate inference.

---

## Large Counts Condition

The expected number of successes and failures must both be sufficiently large.

The standard rule is:

$$  
np_0 \ge 10  
$$

and

$$  
n(1-p_0)\ge10  
$$

np_0\ge10

n(1-p_0)\ge10

These conditions ensure the sampling distribution of:

$$  
\hat{p}  
$$

is approximately normal.

## 11. Why Small Counts Are Problematic

When expected successes or failures are too small:

- the distribution becomes highly skewed
    
- the normal approximation fails
    
- p-values become unreliable
    

This occurs especially when:

$$  
p  
$$

is extremely close to:

$$  
0  
\quad \text{or} \quad  
1  
$$

or when sample sizes are small.

In such situations, exact methods such as the exact binomial test are preferred.

## 12. The Two-Sample Z-Test for Proportions

The two-sample proportion test compares proportions from two independent populations.

The inferential [question](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[question](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[question](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#question))) becomes:

$$  
\text{Are the two population proportions significantly different?}  
$$

Applications include:

- comparing conversion rates
    
- comparing defect rates
    
- comparing treatment success rates
    
- comparing voting preferences between groups
    

## 13. Hypotheses for the Two-Sample Test

The [null hypothesis](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W03 - Estimation And Hypothesis Testing/L2/Errors%2C%20P-values%2C%20and%20Significance.md#null-hypothesis) states equality of population proportions.

Equivalent forms are:

$$  
H_0:p_1 = p_2  
$$

or:

$$  
H_0:p_1-p_2=0  
$$

H_0

=0

The [alternative hypothesis](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W03 - Estimation And Hypothesis Testing/L2/Errors%2C%20P-values%2C%20and%20Significance.md#alternative-hypothesis) may be:

$$  
H_A:p_1 \ne p_2  
$$

or one-sided variants depending on the research objective.

## 14. The Logic of Pooling

Under the [null hypothesis](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W03 - Estimation And Hypothesis Testing/L2/Errors%2C%20P-values%2C%20and%20Significance.md#null-hypothesis):

$$  
p_1 = p_2 = p  
$$

p_1=p_2=p

If both populations truly share the same proportion, the best estimate of that common proportion uses information from both samples combined.

This produces the pooled proportion:

## $$  
\hat{p}_{\text{pool}}

[\frac{](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L1/Inferences%20for%20Two%20Population%20Means.md#frac)  
x_1+x_2  
}{  
n_1+n_2  
}  
$$

\hat{p}_{\text{pool}}=\frac{x_1+x_2}{n_1+n_2}

where:

- $$x_1,x_2$$ = number of successes
    
- $$n_1,n_2$$ = sample sizes
    

Pooling reflects the assumption that both populations share one common underlying probability under:

$$  
H_0  
$$

## 15. The Two-Sample Z-Test Statistic

[The test statistic](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W01 - Basic Probability & Statistics/L0/Inference%20%26%20Modelling.md#the-test-statistic) for comparing two proportions is:

## $$  
Z

[\frac{](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L1/Inferences%20for%20Two%20Population%20Means.md#frac)  
(\hat{p}_1-\hat{p}_2)-0  
}{  
\sqrt{  
\hat{p}_{\text{pool}}  
(1-\hat{p}_{\text{pool}})  
\left(  
\frac{1}{n_1}  
+  
\frac{1}{n_2}  
\right)  
}  
}  
$$

Z=[\frac{](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L1/Inferences%20for%20Two%20Population%20Means.md#frac)(\hat{p}_1-\hat{p}_2)-0}{\sqrt{\hat{p}_{\text{pool}}(1-\hat{p}_{\text{pool}})\left(\frac{1}{n_1}+\frac{1}{n_2}\right)}}

The numerator measures the observed difference in sample proportions.

The denominator measures expected random variation under the [null hypothesis](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W03 - Estimation And Hypothesis Testing/L2/Errors%2C%20P-values%2C%20and%20Significance.md#null-hypothesis).

## 16. Conditions for the Two-Sample Proportion Test

The test requires:

- independent random samples
    
- sufficiently large counts in both groups
    

Typically, both samples should satisfy:

$$  
n\hat{p}\ge10  
$$

and

$$  
n(1-\hat{p})\ge10  
$$

to ensure reliable normal approximation behavior.

## 17. Deep Statistical [Intuition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[intuition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[intuition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[intuition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#intuition))))

Proportion testing fundamentally evaluates:

$$  
\text{Observed Success Rate}  
\quad vs \quad  
\text{Expected Random Variation}  
$$

\text{Observed Success Rate}\quad vs \quad\text{Expected Random Variation}

The statistical machinery determines whether the observed difference is large enough to plausibly represent a genuine population effect rather than sampling randomness.

This framework powers much of modern experimentation:

- A/B testing
    
- election polling
    
- medical trials
    
- [quality control](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L1/Inferences%20for%20Two%20Population%20Variances.md#quality-control)
    
- online experimentation
    
- recommendation systems
    
- business analytics
    

Much of modern decision science ultimately reduces to inference about [probabilities](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W01 - Basic Probability & Statistics/L2/Reading%201%20An%20Introduction%20to%20Decision%20Theory.md#probabilities) and proportions.

Tags: #statistics #machine-learning #data-science #statistical-modelling