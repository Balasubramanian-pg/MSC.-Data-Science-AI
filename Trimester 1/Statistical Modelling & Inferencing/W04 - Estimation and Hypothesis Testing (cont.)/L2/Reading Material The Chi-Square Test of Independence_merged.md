---

## Reading Material: The Chi-Square Test of [Independence](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L0/Linear%20Regression.md#independence)

---
## 1. Testing for Relationships in Categorical Data

The Chi-Square Test of [Independence](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L0/Linear%20Regression.md#independence) is used to determine whether two categorical variables are statistically associated.

The central inferential [question](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[question](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[question](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#question))) is:

$$  
\text{Are the variables related, or are they independent?}  
$$

Unlike t-tests or ANOVA, which analyze numerical measurements such as means, the chi-square test analyzes categorical frequency data.

[Examples](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W08 - Forecasting & Time Series Analysis/L0/Time%20Series%20Analysis.md#examples) include:

- relationship between political preference and age group
    
- relationship between customer income and car brand choice
    
- relationship between educational major and learning style
    
- relationship between device type and purchase behavior
    

The test does not measure causation.

It only evaluates whether an observed association is stronger than expected from random variation alone.

## 2. Categorical Variables

Categorical variables classify observations into groups or categories.

[Examples](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W08 - Forecasting & Time Series Analysis/L0/Time%20Series%20Analysis.md#examples) include:

|Variable|Categories|
|---|---|
|Gender|Male / Female|
|Device Type|Mobile / Desktop / Tablet|
|Political Preference|Party A / B / C|
|Purchase Decision|Buy / Not Buy|

Unlike numerical variables, categorical variables do not represent measurable quantities.

The analysis therefore focuses on counts and frequencies rather than averages.

## 3. Contingency Tables

Data for chi-square tests is organized into contingency tables, also called two-way tables.

A contingency table summarizes how observations are distributed across combinations of categories.

[Example](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#example):

|Learning Style|Visual|Auditory|Kinesthetic|Total|
|---|---|---|---|---|
|Science Students|40|25|35|100|
|Arts Students|20|30|50|100|
|Total|60|55|85|200|

Each cell contains a frequency count representing observed occurrences.

These observed frequencies form the basis of the chi-square analysis.

## 4. The Core Logic of the Chi-Square Test

The chi-square framework compares:

$$  
\text{Observed Frequencies}  
\quad vs \quad  
\text{Expected Frequencies}  
$$

\text{Observed Frequencies}\quad vs \quad\text{Expected Frequencies}

The key idea is:

- if variables are independent, observed counts should resemble expected counts
    
- if variables are associated, observed counts will systematically deviate from expected counts
    

The test measures how large those deviations become.

## 5. Observed Frequencies

Observed frequencies are the actual counts collected from the sample.

They are denoted by:

$$  
O  
$$

O

Observed frequencies represent real outcomes in the dataset.

For [example](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#example):

- number of students preferring visual learning
    
- number of customers purchasing a product
    
- number of users selecting a mobile device
    

The observed table is the raw empirical evidence.

## 6. Expected Frequencies

Expected frequencies represent the counts we would anticipate if the variables were completely independent.

They are denoted by:

$$  
E  
$$

E

Expected frequencies are not directly observed.

They are computed mathematically using marginal totals.

The expected frequency [formula](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#formula) is:

## $$  
E

[\frac{](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L1/Inferences%20for%20Two%20Population%20Means.md#frac)  
(\text{Row Total})(\text{Column Total})  
}{  
\text{Grand Total}  
}  
$$

E=[\frac{](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L1/Inferences%20for%20Two%20Population%20Means.md#frac)(\text{Row Total})(\text{Column Total})}{\text{Grand Total}}

This [formula](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#formula) embodies the assumption of [independence](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L0/Linear%20Regression.md#independence).

## 7. Why the Expected Frequency [Formula](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#formula) Works

Suppose:

- 60% of all students are science students
    
- 30% of all students prefer visual learning
    

If the variables are independent, we would expect:

$$  
0.60 \times 0.30 = 0.18  
$$

or:

$$  
18%  
$$

of all students to belong to both categories simultaneously.

The expected frequency [formula](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#formula) operationalizes this probability logic using counts.

## 8. Hypotheses for the Chi-Square Test

The [null hypothesis](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W03 - Estimation And Hypothesis Testing/L2/Errors%2C%20P-values%2C%20and%20Significance.md#null-hypothesis) states that the variables are independent.

$$  
H_0:  
\text{The variables are independent}  
$$

H_0:\text{The variables are independent}

The [alternative hypothesis](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W03 - Estimation And Hypothesis Testing/L2/Errors%2C%20P-values%2C%20and%20Significance.md#alternative-hypothesis) states that an association exists.

$$  
H_A:  
\text{The variables are dependent}  
$$

H_A:\text{The variables are dependent}

The test therefore evaluates whether observed deviations from [independence](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L0/Linear%20Regression.md#independence) are too large to plausibly attribute to [random sampling](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#random-sampling) variation.

## 9. The Chi-Square Test Statistic

The chi-square statistic summarizes the total discrepancy between observed and expected counts.

The [formula](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#formula) is:

## $$  
\chi^2

\sum  
[\frac{](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L1/Inferences%20for%20Two%20Population%20Means.md#frac)  
(O-E)^2  
}{  
E  
}  
$$

\chi^2=\sum\frac{(O-E)^2}{E}

where:

- $$O$$ = observed frequency
    
- $$E$$ = expected frequency
    

The calculation is performed across all cells in the contingency table.

## 10. Interpreting the Chi-Square Statistic

The chi-square statistic measures [total deviation](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/The%20Coefficient%20of%20Determination%20%28R%C2%B2%29.md#total-deviation) from [independence](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L0/Linear%20Regression.md#independence).

## Small Chi-Square Values

If:

$$  
O \approx E  
$$

then:

$$  
\chi^2 \approx 0  
$$

\chi^2\approx0

This suggests little evidence against [independence](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L0/Linear%20Regression.md#independence).

---

## Large Chi-Square Values

If observed and expected frequencies differ substantially:

$$  
|O-E|  
$$

becomes large.

Because differences are squared:

$$  
(O-E)^2  
$$

all deviations contribute positively to the statistic.

Large chi-square values indicate stronger evidence of association.

## 11. Why the Test Is Always [Right-Tailed](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#right-tailed)

The chi-square statistic cannot become negative because:

$$  
(O-E)^2 \ge 0  
$$

(O-E)^2\ge0

As discrepancies increase:

$$  
\chi^2  
\uparrow  
$$

Therefore, evidence against:

$$  
H_0  
$$

always appears in the right tail of the chi-square distribution.

## 12. The Chi-Square Distribution

The chi-square statistic follows a chi-square distribution.

The distribution has several important properties:

- non-negative
    
- right-skewed
    
- dependent on degrees of freedom
    

Unlike the normal distribution, the chi-square distribution is asymmetric.

Its exact shape depends on the degrees of freedom parameter.

## 13. Degrees of Freedom

For a chi-square test of [independence](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L0/Linear%20Regression.md#independence):

## $$  
df

(\text{Rows}-1)  
(\text{Columns}-1)  
$$

df=(\text{Rows}-1)(\text{Columns}-1)

[Examples](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W08 - Forecasting & Time Series Analysis/L0/Time%20Series%20Analysis.md#examples):

- a $$2 \times 2$$ table:
    

$$  
df = (2-1)(2-1)=1  
$$

- a $$3 \times 4$$ table:
    

$$  
df=(3-1)(4-1)=6  
$$

Degrees of freedom represent how many independent cell counts remain variable once row and column totals are fixed.

## 14. Conditions for Validity

The chi-square test requires several assumptions for reliable inference.

## Count Data

The data must consist of frequency counts rather than:

- percentages
    
- proportions
    
- averages
    

The chi-square test fundamentally analyzes counts.

---

## [Random Sampling](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#random-sampling)

The sample should represent the target population reasonably well.

Biased sampling invalidates inference regardless of the mathematical calculations.

---

## Expected Count Condition

Expected frequencies should generally satisfy:

$$  
E \ge 5  
$$

E\ge5

for every cell.

Very small expected counts produce unstable approximations and unreliable p-values.

## 15. Why Small Expected Counts Are Dangerous

The chi-square approximation depends on large-sample behavior.

When expected counts become too small:

- the sampling distribution becomes distorted
    
- p-values lose accuracy
    
- Type I error rates become unreliable
    

Sparse contingency tables are especially problematic.

This issue becomes common in:

- rare-event analysis
    
- small surveys
    
- highly fragmented categories
    

## 16. Practical Remedies for Small Expected Counts

When expected frequencies are too small, analysts may:

- combine categories
    
- increase sample size
    
- use Fisher's Exact Test
    
- apply simulation methods
    

Fisher's Exact Test is especially important for small:

$$  
2 \times 2  
$$

tables.

## 17. Chi-Square Tests Measure Association, Not Causation

A significant chi-square result indicates statistical association.

It does NOT prove:

- causality
    
- directional influence
    
- mechanism
    

For [example](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#example):

- ice cream sales and drowning deaths may be associated
    
- both may increase during summer
    
- neither necessarily causes the other
    

This distinction is fundamental in statistical reasoning.

## 18. Deep Statistical [Intuition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[intuition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[intuition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[intuition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#intuition))))

The chi-square framework evaluates:

$$  
\text{Observed Pattern}  
\quad vs \quad  
\text{Pattern Expected Under [Independence](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L0/Linear%20Regression.md#independence)}  
$$

\text{Observed Pattern}\quad vs \quad\text{Pattern Expected Under [Independence](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L0/Linear%20Regression.md#independence)}

If the discrepancy becomes too large to plausibly attribute to random variation alone, we reject:

$$  
H_0  
$$

The deeper statistical principle is broader:

> [Independence](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L0/Linear%20Regression.md#independence) creates predictable structure.

When reality systematically deviates from that structure, statistical evidence for association emerges.

The chi-square test therefore becomes one of the foundational tools for discovering relationships in categorical data across business analytics, healthcare, social science, marketing, and machine learning.

Tags: #statistics #machine-learning #data-science #statistical-modelling