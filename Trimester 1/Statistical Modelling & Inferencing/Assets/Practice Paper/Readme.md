# Statistical Modelling and Inferencing
### End Term Examination - Practice Paper
**Total Marks:** 40

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

---

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

---

### **Part (b) [2 marks]: Cramér’s V**

**1. Calculate Cramér's V:**
Using $V = \sqrt{\frac{\chi^2}{n \times \min(r-1, c-1)}}$

*   $\chi^2 = 9.4048$
*   $n = 400$
*   $\min(r-1, c-1) = \min(2, 2) = 2$

$V = \sqrt{\frac{9.4048}{400 \times 2}} = \sqrt{\frac{9.4048}{800}} = \sqrt{0.011756} \approx \mathbf{0.1084}$

**2. Interpretation:**
The computed Cramér's V is **0.1084**. Based on the provided guidelines ($0.1 \le V < 0.3$), the strength of the association between brand preference and age group is **small**. 

---

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
  
---

## QUESTION 2 (10 Marks)
A food processing company wants to study the effect of two factors on the shelf life (in days) of a packaged food product: **Packaging Material** (Plastic, Glass) and **Storage Temperature** (Low, Medium, High). A balanced experiment with 3 replications per combination was conducted, giving a total of $N=18$ observations. 

**Two-Way ANOVA Table (Partially Completed):**

| Source | SS | df | MS | F-statistic |
| :--- | :--- | :--- | :--- | :--- |
| **Packaging** | 150.0 | A | D | G |
| **Temperature** | 280.0 | B | E | H |
| **Interaction** | C | F | 45.0 | I |
| **Error** | 180.0 | 12 | — | — |
| **Total** | **700.0** | **17** | | |

**Formulas provided:**
*   $MS = \frac{SS}{df} \quad ; \quad F = \frac{MS_{\text{effect}}}{MS_{\text{error}}}$
*   $df_A = a-1 \quad ; \quad df_B = b-1 \quad ; \quad df_{A \times B} = (a-1)(b-1) \quad ; \quad df_{\text{error}} = N-ab$
*   $SS_{\text{Total}} = SS_A + SS_B + SS_{A \times B} + SS_{\text{Error}}$

**F-distribution Critical Values at $\alpha = 0.05$:**
| Degrees of Freedom $(df_1, df_2)$ | $F_{\text{critical}}$ |
| :--- | :--- |
| (1, 12) | 4.75 |
| (2, 12) | 3.89 |

**Questions:**
*   **Part (a) [3 marks]:** State the null hypotheses for: (i) the main effect of Packaging Material, (ii) the main effect of Storage Temperature, and (iii) the interaction effect. In practical terms, explain what a significant “interaction effect” between packaging and temperature would mean for the company.
*   **Part (b) [5 marks]:** Calculate the values A through I in the ANOVA table. Also, verify the Total SS. Show your working.
*   **Part (c) [2 marks]:** Using the F-critical values provided, determine which effects are statistically significant at $\alpha = 0.05$. If the interaction effect is significant, explain why interpreting the main effects alone would be misleading.

Here is the step-by-step solution for **QUESTION 2**.

---

### **Part (a) [3 marks]: Null Hypotheses and Practical Meaning of Interaction**

**1. State the Null Hypotheses ($H_0$):**
*   **(i) Main effect of Packaging Material:** There is no difference in the mean shelf life of the food product between the different packaging materials (Plastic vs. Glass).
*   **(ii) Main effect of Storage Temperature:** There is no difference in the mean shelf life of the food product across the different storage temperatures (Low, Medium, High).
*   **(iii) Interaction effect:** There is no interaction between packaging material and storage temperature regarding shelf life. (The effect of packaging material on shelf life is independent of the storage temperature).

**2. Practical Meaning of a Significant Interaction Effect:**
In practical terms, a significant interaction would mean that the effectiveness of the packaging material depends on the storage temperature (and vice versa). For example, Plastic might provide a longer shelf life at Low temperatures, while Glass might be better at High temperatures. If an interaction exists, the company cannot simply conclude one packaging type is universally "best"; they must tailor the packaging choice to the specific storage temperature.

---

### **Part (b) [5 marks]: Calculating ANOVA Table Values**

First, identify the number of levels for each factor:
*   Factor A (Packaging Material): $a = 2$ (Plastic, Glass)
*   Factor B (Storage Temperature): $b = 3$ (Low, Medium, High)

**1. Calculate Degrees of Freedom (df) - Values A, B, and F:**
*   **A ($df_{\text{Packaging}}$):** $a - 1 = 2 - 1 = \mathbf{1}$
*   **B ($df_{\text{Temperature}}$):** $b - 1 = 3 - 1 = \mathbf{2}$
*   **F ($df_{\text{Interaction}}$):** $(a - 1)(b - 1) = 1 \times 2 = \mathbf{2}$
*(Check: $Total\ df = 1 + 2 + 2 + 12 = 17$. Matches table).*

**2. Calculate Sum of Squares (SS) - Value C and Verify Total:**
*   We know $MS_{\text{Interaction}} = 45.0$ and $df_{\text{Interaction}} = 2$.
*   Since $MS = \frac{SS}{df}$, we find $SS = MS \times df$.
*   **C ($SS_{\text{Interaction}}$):** $45.0 \times 2 = \mathbf{90.0}$
*   **Verify Total SS:** $SS_{\text{Total}} = SS_A + SS_B + SS_{A \times B} + SS_{\text{Error}} = 150.0 + 280.0 + 90.0 + 180.0 = \mathbf{700.0}$. (This confirms the table's Total SS is correct).

**3. Calculate Mean Squares (MS) - Values D and E:**
*   **D ($MS_{\text{Packaging}}$):** $SS_{\text{Packaging}} / df_{\text{Packaging}} = 150.0 / 1 = \mathbf{150.0}$
*   **E ($MS_{\text{Temperature}}$):** $SS_{\text{Temperature}} / df_{\text{Temperature}} = 280.0 / 2 = \mathbf{140.0}$
*   *$MS_{\text{Error}}$ (Needed for F-calc):* $180.0 / 12 = \mathbf{15.0}$

**4. Calculate F-statistics - Values G, H, and I:**
*   **G ($F_{\text{Packaging}}$):** $MS_{\text{Packaging}} / MS_{\text{Error}} = 150.0 / 15.0 = \mathbf{10.00}$
*   **H ($F_{\text{Temperature}}$):** $MS_{\text{Temperature}} / MS_{\text{Error}} = 140.0 / 15.0 = \mathbf{9.33}$
*   **I ($F_{\text{Interaction}}$):** $MS_{\text{Interaction}} / MS_{\text{Error}} = 45.0 / 15.0 = \mathbf{3.00}$

**Summary of Calculated Values:**
*   **A** = 1
*   **B** = 2
*   **C** = 90.0
*   **D** = 150.0
*   **E** = 140.0
*   **F** = 2
*   **G** = 10.00
*   **H** = 9.33
*   **I** = 3.00

### **Part (c) [2 marks]: Statistical Significance and Interpretation**

**1. Determine Significance ($\alpha = 0.05$):**
Compare the calculated F-statistics to the given F-critical values:
*   **Packaging:** $F_{\text{calc}} = 10.00$. The $df$ is $(1, 12)$, so $F_{\text{critical}} = 4.75$. Since $10.00 > 4.75$, the main effect of packaging is **statistically significant**.
*   **Temperature:** $F_{\text{calc}} = 9.33$. The $df$ is $(2, 12)$, so $F_{\text{critical}} = 3.89$. Since $9.33 > 3.89$, the main effect of temperature is **statistically significant**.
*   **Interaction:** $F_{\text{calc}} = 3.00$. The $df$ is $(2, 12)$, so $F_{\text{critical}} = 3.89$. Since $3.00 < 3.89$, the interaction effect is **not statistically significant**.

**2. Why interpreting main effects alone is misleading IF the interaction is significant:**
Although the interaction is *not* significant in this specific dataset, if it *were* significant, interpreting main effects on their own would be misleading because the main effects only provide an "average" effect across all conditions. A significant interaction indicates that the factors do not act independently; the effect of one factor changes depending on the level of the other. Making a sweeping statement like "Plastic is better than Glass" would mask the reality that Glass might actually perform better under a specific temperature condition.

---

## QUESTION 3 (10 Marks)
A quality control manager at an electronics factory inspects circuit boards from a production line. 

### Part (a) - Maximum Likelihood Estimation [6 marks]
The manager randomly selects 25 circuit boards and finds that 5 are defective. Let $p$ denote the true defect rate. 

**Formulas provided:**
*   **Binomial probability:** $P(X=k) = \binom{n}{k} p^k (1-p)^{n-k}$
*   **Likelihood function:** $L(p) = \binom{n}{k} p^k (1-p)^{n-k}$
*   **Log-likelihood:** $l(p) = \ln\binom{n}{k} + k\ln(p) + (n-k)\ln(1-p)$

**Questions:**
1.  Write the likelihood function $L(p)$ for the observed data.
2.  Derive the log-likelihood $l(p)$ and find the MLE $\hat{p}$ by differentiating and setting it equal to zero.
3.  Using the invariance property of MLE, find the MLE of the odds of a defect, defined as $\frac{p}{1-p}$.
4.  State any two properties of MLEs (other than invariance) and briefly explain each.

### Part (b) - Bayesian Inference [4 marks]
The factory has two production machines. Based on maintenance records:
*   Prior probability that Machine 1 is the source: $P(\text{Machine 1}) = 0.30$
*   Prior probability that Machine 2 is the source: $P(\text{Machine 2}) = 0.70$
*   If from Machine 1, $P(\text{Defective}) = 0.25$
*   If from Machine 2, $P(\text{Defective}) = 0.05$

**Formulas provided:**
*   **Bayes’ Theorem:** $P(A \mid B) = \frac{P(B \mid A)P(A)}{P(B)}$
*   **Total Probability:** $P(B) = P(B \mid A)P(A) + P(B \mid A')P(A')$

**Questions:**
1.  A randomly selected circuit board is found defective. Using Bayes’ theorem, calculate the posterior probability that it came from Machine 1.
2.  Using the posterior from (i) as the new prior, a second circuit board is also found defective. Update the probability that it came from Machine 1.
3.  Briefly explain the difference between a frequentist confidence interval and a Bayesian credible interval.

---

## QUESTION 4 (10 Marks)
A municipal body collects data on 8 environmental indicators for 60 cities to build a “Green City Index.” A Principal Component Analysis (PCA) is performed on the standardized data. 

**PCA Results - Eigenvalues:**
| Component | Eigenvalue | Proportion of Variance |
| :--- | :--- | :--- |
| PC1 | 3.60 | 45.0% |
| PC2 | 1.80 | 22.5% |
| PC3 | 1.10 | 13.8% |
| PC4 | 0.65 | 8.1% |
| PC5 | 0.40 | 5.0% |
| PC6 | 0.22 | 2.8% |
| PC7 | 0.13 | 1.6% |
| PC8 | 0.10 | 1.2% |
| **Total** | **8.00** | **100%** |

*(Note: The Kaiser criterion recommends retaining components with eigenvalue > 1.)*

**Questions:**
*   **Part (a) [4 marks]:** Using the Kaiser criterion, how many principal components should be retained? What is the cumulative variance explained by the retained components? Explain why PCA is performed on standardized data rather than raw data when variables have different units.

After the PCA analysis, the municipal body also wants to group the 60 cities into clusters. A hierarchical clustering (agglomerative, using Ward’s linkage) was performed on 6 pilot cities (P, Q, R, S, T, U). The merging sequence from the dendrogram is:

| Stage | Clusters Merged | Distance at Merge |
| :--- | :--- | :--- |
| 1 | P and Q | 1.8 |
| 2 | T and U | 2.5 |
| 3 | {P, Q} and R | 4.2 |
| 4 | S and {T, U} | 5.0 |
| 5 | {P, Q, R} and {S, T, U} | 11.5 |

*   **Part (b) [3 marks]:** Using the merging distances above, identify where the largest “gap” occurs between successive merge distances. Based on this gap, how many clusters would you recommend? List the cities in each cluster. Explain the difference between Ward’s linkage and single linkage methods.
*   **Part (c) [3 marks]:** A colleague suggests using K-Means clustering instead. State one advantage of hierarchical clustering over K-Means and one advantage of K-Means over hierarchical clustering. If the number of cities were 10,000 instead of 60, which method would you prefer and why?
