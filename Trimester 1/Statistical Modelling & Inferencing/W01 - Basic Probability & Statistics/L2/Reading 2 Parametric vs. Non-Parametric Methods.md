---
title: W01 - Basic Probability & Statistics
module: Statistical Modelling And Inferencing
week: W01 - Basic Probability & Statistics
---

### Parametric vs. Non-Parametric Methods
![[Parametric vs Non Parametric Methods.png]]

Statistical inference requires a choice between efficiency (the power to detect true effects) and robustness (the reliability of [conclusions](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W03 - Estimation And Hypothesis Testing/L1/3.1%20Interval%20Estimation%20of%20the%20Mean.md#conclusions) across diverse data types). This choice is governed by the parametric vs. non-parametric dichotomy.

### 1. Parametric Methods: The "Model-Based" Approach

Parametric statistics assume that the population follows a specific, predefined mathematical form, most commonly the [Normal (Gaussian) distribution](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W01 - Basic Probability & Statistics/L1/Probability%20and%20Distribution.md#normal-gaussian-distribution).

- **Core Assumption:** The population is defined by a small set of **parameters** (e.g., $\mu$ and $\sigma$).
    
- **Mechanism:** Inference focuses on estimating these specific parameters from the sample data.
    
- **[Examples](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W08 - Forecasting & Time Series Analysis/L0/Time%20Series%20Analysis.md#examples):** Student’s t-test, ANOVA, Linear Regression.
    

#### Computational Trade-offs

- **Statistical Power:** When the data distribution satisfies the parametric assumptions (e.g., Normality), these tests provide the highest possible power—meaning they are the most sensitive at detecting real effects.
    
- **Fragility:** If the underlying population distribution is skewed or heavy-tailed, parametric tests can provide misleading p-values.
    

### 2. Non-Parametric Methods: The "Distribution-Free" Approach

Non-parametric methods make minimal assumptions about the population’s distribution. They are often called "distribution-free" because they do not rely on parameter estimation.

- **Core Assumption:** Little to none. They do not require the assumption of Normality.
    
- **Mechanism:** They often use **Rank-Based Statistics**. By converting absolute values to ranks (e.g., the smallest value is rank 1, second smallest is 2), they transform complex distributions into a uniform structure.
    
- **[Examples](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W08 - Forecasting & Time Series Analysis/L0/Time%20Series%20Analysis.md#examples):** Wilcoxon Rank-Sum Test (alternative to independent t-test), Kruskal-Wallis Test (alternative to ANOVA).
    

#### Computational Trade-offs

- **Robustness:** Because these tests rely on ranks rather than magnitudes, they are largely impervious to extreme **outliers**.
    
- **Information Loss:** Converting values to ranks discards the "distance" between values. Consequently, if the data _is_ actually normally distributed, a non-parametric test will be less likely to detect a true difference than its parametric equivalent.
    

### 3. Decision Framework: Choosing the Right Test

Choosing between these methods is a fundamental step in the data analysis pipeline.

|**Metric**|**Parametric Test**|**Non-Parametric Test**|
|---|---|---|
|**Data Distribution**|Normal / Symmetric|Skewed / Unknown|
|**Outliers**|Highly sensitive|Robust (Rank-based)|
|**Sample Size**|Preferred for large $n$ (CLT)|Preferred for small $n$|
|**Measurement Level**|Interval/Ratio (Numeric)|Ordinal / Ranked|
|**Power**|Higher (if assumptions hold)|Lower (but safer)|

### 4. Practical Implementation Path

To decide which path to take, always visualize the data first.

1. **Visualize:** Use a Histogram or [Q-Q plot](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#q-q-plot) to check for Normality.
    
2. **Statistically Test for Normality:** Use the **Shapiro-Wilk test**. If the p-value is significant ($p < 0.05$), the data is _not_ normal, and you should likely pivot to non-parametric methods.
    
3. **Outlier Check:** Use a boxplot to assess if extreme outliers are distorting the [mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#mean) and variance.


```Python
import numpy as np
from scipy import stats

## Check for normality
data = np.random.exponential(scale=1.0, size=50) # Non-normal data
stat, p_value = stats.shapiro(data)

if p_value < 0.05:
    print("Data is NOT normal: Use Non-Parametric tests (e.g., Mann-Whitney U)")
else:
    print("Data is normal: Use Parametric tests (e.g., t-test)")
```

### [Summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#[summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L1/The%20Multiple%20Regression%20Model.md#summary))

- **Parametric:** High efficiency; assumes "the recipe" (Normal distribution) is correct.
    
- **Non-Parametric:** High robustness; "distribution-free" but trades off statistical power for flexibility.
    

**Would you like to move into specific parametric vs. non-parametric comparison tables for different statistical tasks (e.g., [mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#mean) comparison, correlation), or should we discuss the impact of sample size on these test choices?**

Tags: #statistics #machine-learning #data-science #statistical-modelling