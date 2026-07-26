## QUESTION 1 (10 Marks)
A mobile phone manufacturer surveyed 400 customers to study whether the preferred phone brand (Brand X, Brand Y, or Brand Z) is associated with the customer’s age group. The observed frequencies are:

| Age Group | Brand X | Brand Y | Brand Z | Total |
| :--- | :---: | :---: | :---: | :---: |
| **18–30 years** | 60 | 80 | 60 | **200** |
| **31–50 years** | 50 | 40 | 30 | **120** |
| **51+ years** | 30 | 20 | 30 | **80** |
| **Total** | **140** | **140** | **120** | **400** |

**Formulas provided:**
*   **Expected frequency:** $E_{ij} = \frac{\text{Row Total}_i \times \text{Column Total}_j}{\text{Grand Total}}$
*   **Chi-Square:** $\chi^2 = \sum \frac{(O_{ij} - E_{ij})^2}{E_{ij}} \quad ; \quad df = (r-1)(c-1)$
*   **Cramér’s V:** $V = \sqrt{\frac{\chi^2}{n \times \min(r-1, c-1)}}$
*   **Proportion test:** $z = \frac{\hat{p} - p_0}{\sqrt{\frac{p_0(1-p_0)}{n}}}$

**Critical Values ($\alpha = 0.05$):**
| Test | df / Tail | Critical Value |
| :--- | :--- | :--- |
| Chi-Square | df = 2 | 5.991 |
| Chi-Square | df = 4 | 9.488 |
| Z (two-tailed) | — | ±1.960 |
| Z (one-tailed, right) | — | 1.645 |

**Questions:**
*   **Part (a) [5 marks]:** State the null and alternative hypotheses for testing whether brand preference is independent of age group. Calculate all expected frequencies, compute the chi-square test statistic, and state your conclusion at $\alpha = 0.05$.
*   **Part (b) [2 marks]:** Compute Cramér’s V for the chi-square test performed in Part (a). Interpret the strength of association using the following guidelines: $V < 0.1$ (negligible), $0.1 \le V < 0.3$ (small), $0.3 \le V < 0.5$ (medium), $V \ge 0.5$ (large).
*   **Part (c) [3 marks]:** The marketing team claims that more than 30% of customers aged 18–30 prefer Brand Y. Using the observed data (80 out of 200 in the 18–30 group prefer Brand Y), test this claim at $\alpha = 0.05$ using a one-tailed proportion test. State your hypotheses and conclusion.

Here is the step-by-step solution for **QUESTION 1**.

### **Part (a) [5 marks]: Chi-Square Test for Independence**

**1. State the Hypotheses:**
*   **Null Hypothesis ($H_0$):** Brand preference is independent of age group (there is no association).
*   **Alternative Hypothesis ($H_1$):** Brand preference is not independent of age group (there is an association).

**2. Calculate Expected Frequencies:**
The formula for expected frequency is $E_{ij} = \frac{\text{Row Total}_i \times \text{Column Total}_j}{\text{Grand Total}}$. 
Grand Total = 400.

*   **18–30 years (Row Total = 200):**
    *   Brand X: $(200 \times 140) / 400 = \mathbf{70}$
    *   Brand Y: $(200 \times 140) / 400 = \mathbf{70}$
    *   Brand Z: $(200 \times 120) / 400 = \mathbf{60}$
*   **31–50 years (Row Total = 120):**
    *   Brand X: $(120 \times 140) / 400 = \mathbf{42}$
    *   Brand Y: $(120 \times 140) / 400 = \mathbf{42}$
    *   Brand Z: $(120 \times 120) / 400 = \mathbf{36}$
*   **51+ years (Row Total = 80):**
    *   Brand X: $(80 \times 140) / 400 = \mathbf{28}$
    *   Brand Y: $(80 \times 140) / 400 = \mathbf{28}$
    *   Brand Z: $(80 \times 120) / 400 = \mathbf{24}$

*Summary of Expected Frequencies:*
| Age Group | Brand X | Brand Y | Brand Z |
| :--- | :---: | :---: | :---: |
| 18–30 | 70 | 70 | 60 |
| 31–50 | 42 | 42 | 36 |
| 51+ | 28 | 28 | 24 |

**3. Compute the Chi-Square Test Statistic ($\chi^2$):**
Using $\chi^2 = \sum \frac{(O - E)^2}{E}$

*   **Row 1:** 
    *   $(60 - 70)^2 / 70 = 100 / 70 \approx 1.4286$
    *   $(80 - 70)^2 / 70 = 100 / 70 \approx 1.4286$
    *   $(60 - 60)^2 / 60 = 0 / 60 = 0$
*   **Row 2:** 
    *   $(50 - 42)^2 / 42 = 64 / 42 \approx 1.5238$
    *   $(40 - 42)^2 / 42 = 4 / 42 \approx 0.0952$
    *   $(30 - 36)^2 / 36 = 36 / 36 = 1.0000$
*   **Row 3:** 
    *   $(30 - 28)^2 / 28 = 4 / 28 \approx 0.1429$
    *   $(20 - 28)^2 / 28 = 64 / 28 \approx 2.2857$
    *   $(30 - 24)^2 / 24 = 36 / 24 = 1.5000$

$\chi^2 = 1.4286 + 1.4286 + 0 + 1.5238 + 0.0952 + 1.000 + 0.1429 + 2.2857 + 1.500$
$\chi^2 = \mathbf{9.4048}$

**4. Degrees of Freedom and Conclusion:**
*   $df = (r - 1)(c - 1) = (3 - 1)(3 - 1) = 2 \times 2 = \mathbf{4}$
*   Critical value for $df = 4$ at $\alpha = 0.05$ is **9.488**.
*   **Conclusion:** Since the calculated test statistic ($\chi^2 = 9.405$) is less than the critical value ($9.488$), we **fail to reject the null hypothesis**. At the 5% significance level, there is insufficient evidence to conclude that brand preference is associated with age group.
### **Part (b) [2 marks]: Cramér’s V**

**1. Calculate Cramér's V:**
Using $V = \sqrt{\frac{\chi^2}{n \times \min(r-1, c-1)}}$

*   $\chi^2 = 9.4048$
*   $n = 400$
*   $\min(r-1, c-1) = \min(2, 2) = 2$

$V = \sqrt{\frac{9.4048}{400 \times 2}} = \sqrt{\frac{9.4048}{800}} = \sqrt{0.011756} \approx \mathbf{0.1084}$

**2. Interpretation:**
The computed Cramér's V is **0.1084**. Based on the provided guidelines ($0.1 \le V < 0.3$), the strength of the association between brand preference and age group is **small**. 

### **Part (c) [3 marks]: One-Tailed Proportion Test**

**1. State the Hypotheses:**
Let $p$ be the true proportion of customers aged 18–30 who prefer Brand Y.
*   **Null Hypothesis ($H_0$):** $p \le 0.30$ (The proportion is 30% or less).
*   **Alternative Hypothesis ($H_1$):** $p > 0.30$ (The marketing team's claim: the proportion is more than 30%).

**2. Perform Calculations:**
*   Sample size ($n$) = 200
*   Sample proportion ($\hat{p}$) = $80 / 200 = \mathbf{0.40}$
*   Hypothesized proportion ($p_0$) = $\mathbf{0.30}$

Test statistic $z = \frac{\hat{p} - p_0}{\sqrt{\frac{p_0(1-p_0)}{n}}}$

$z = \frac{0.40 - 0.30}{\sqrt{\frac{0.30 \times 0.70}{200}}}$

$z = \frac{0.10}{\sqrt{\frac{0.21}{200}}}$

$z = \frac{0.10}{\sqrt{0.00105}}$

$z = \frac{0.10}{0.0324} \approx \mathbf{3.086}$

**3. State Conclusion:**
*   The test is one-tailed (right), and the given critical value for $\alpha = 0.05$ is **$1.645$**.
*   Since the calculated $z$-statistic ($3.086$) is greater than the critical value ($1.645$), we **reject the null hypothesis**. 
*   **Conclusion:** At the 5% level of significance, there is sufficient statistical evidence to support the marketing team's claim that more than 30% of customers aged 18–30 prefer Brand Y.
