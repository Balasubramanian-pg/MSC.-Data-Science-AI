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

Here is the step-by-step solution for **QUESTION 3**.

---

### **Part (a) - Maximum Likelihood Estimation [6 marks]**

**1. Write the likelihood function $L(p)$ for the observed data.**
Given $n = 25$ total circuit boards and $k = 5$ defective boards, we substitute these values into the provided likelihood function:
$L(p) = \binom{25}{5} p^5 (1-p)^{25-5}$
**$L(p) = \binom{25}{5} p^5 (1-p)^{20}$**

**2. Derive the log-likelihood $l(p)$ and find the MLE $\hat{p}$.**
First, take the natural logarithm of the likelihood function to get $l(p)$:
$l(p) = \ln\left[ \binom{25}{5} p^5 (1-p)^{20} \right]$
$l(p) = \ln\binom{25}{5} + 5\ln(p) + 20\ln(1-p)$

Next, differentiate $l(p)$ with respect to $p$ and set it to zero to find the maximum:
$\frac{d}{dp} l(p) = 0 + \frac{5}{p} - \frac{20}{1-p}$

Set the derivative equal to zero:
$\frac{5}{p} - \frac{20}{1-p} = 0$
$\frac{5}{p} = \frac{20}{1-p}$
$5(1-p) = 20p$
$5 - 5p = 20p$
$25p = 5$
$\hat{p} = \frac{5}{25} = \mathbf{0.20}$

**3. Use the invariance property of MLE to find the MLE of the odds.**
The invariance property states that if $\hat{\theta}$ is the MLE of a parameter $\theta$, then $g(\hat{\theta})$ is the MLE of $g(\theta)$ for any function $g$. 
Therefore, the MLE of the odds $\frac{p}{1-p}$ is simply:
$\widehat{\text{Odds}} = \frac{\hat{p}}{1-\hat{p}} = \frac{0.20}{1 - 0.20} = \frac{0.20}{0.80} = \mathbf{0.25}$

**4. State any two properties of MLEs (other than invariance) and briefly explain.**
1.  **Consistency:** As the sample size ($n$) increases and approaches infinity, the Maximum Likelihood Estimate ($\hat{\theta}$) converges in probability to the true value of the parameter ($\theta$). In other words, with enough data, the MLE will highly likely be very close to the true parameter.
2.  **Asymptotic Efficiency:** Among all consistent estimators, the MLE has the smallest possible variance for large sample sizes. It achieves the Cramér-Rao lower bound, making it the most "efficient" estimator asymptotically.
*(Note: Another valid property is **Asymptotic Normality**, meaning as the sample size grows, the distribution of the MLE tends towards a Normal distribution centered on the true parameter).*

---

### **Part (b) - Bayesian Inference [4 marks]**

**1. Calculate the posterior probability that the first defective board came from Machine 1.**
Let $M1$ be Machine 1, $M2$ be Machine 2, and $D$ be a Defective board.
*   Priors: $P(M1) = 0.30$, $P(M2) = 0.70$
*   Likelihoods: $P(D \mid M1) = 0.25$, $P(D \mid M2) = 0.05$

First, calculate the total probability of a defective board $P(D)$:
$P(D) = P(D \mid M1)P(M1) + P(D \mid M2)P(M2)$
$P(D) = (0.25 \times 0.30) + (0.05 \times 0.70)$
$P(D) = 0.075 + 0.035 = \mathbf{0.110}$

Now apply Bayes' Theorem:
$P(M1 \mid D) = \frac{P(D \mid M1)P(M1)}{P(D)} = \frac{0.075}{0.110} \approx \mathbf{0.6818} \text{ (or } \frac{15}{22} \text{)}$

**2. Update the probability after a second circuit board is also found defective.**
We now use the posterior from step 1 as our new prior probabilities:
*   New Priors: $P(M1_{\text{new}}) = \frac{15}{22} \approx 0.6818$,  $P(M2_{\text{new}}) = 1 - \frac{15}{22} = \frac{7}{22} \approx 0.3182$
*   Likelihoods (unchanged): $P(D \mid M1) = 0.25$, $P(D \mid M2) = 0.05$

Calculate the new total probability $P(D_{\text{new}})$:
$P(D_{\text{new}}) = \left(0.25 \times \frac{15}{22}\right) + \left(0.05 \times \frac{7}{22}\right) = \frac{3.75}{22} + \frac{0.35}{22} = \frac{4.10}{22}$

Apply Bayes' Theorem again to find the updated posterior $P(M1 \mid D_2)$:
$P(M1 \mid D_2) = \frac{P(D \mid M1)P(M1_{\text{new}})}{P(D_{\text{new}})} = \frac{\frac{3.75}{22}}{\frac{4.10}{22}} = \frac{3.75}{4.10} = \frac{375}{410} \approx \mathbf{0.9146}$
*(Conclusion: The probability that the machine is Machine 1 increases to 91.46% after observing two consecutive defective boards).*

**3. Explain the difference between a frequentist confidence interval and a Bayesian credible interval.**
*   **Frequentist Confidence Interval:** Treats the true parameter as a **fixed but unknown** constant. The interval itself is considered a random variable dependent on the sample data. A 95% confidence interval means that if we were to repeat the experiment many times and calculate the interval each time, roughly 95% of those computed intervals would contain the true fixed parameter. (It does *not* mean there is a 95% chance the parameter is in a specific calculated interval).
*   **Bayesian Credible Interval:** Treats the true parameter as a **random variable** with a probability distribution. A 95% credible interval means that, given the specific observed data and our prior beliefs, there is an actual **95% probability** that the true parameter value falls within that specific calculated interval.
  
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

Here is the step-by-step solution for **QUESTION 4**.

---

### **Part (a) [4 marks]: Principal Component Analysis (PCA)**

**1. Number of Principal Components to Retain (Kaiser Criterion):**
The Kaiser criterion recommends retaining components with an eigenvalue greater than 1 ($> 1$). 
Looking at the table:
*   PC1: 3.60 (> 1)
*   PC2: 1.80 (> 1)
*   PC3: 1.10 (> 1)
*   PC4: 0.65 (< 1)

Therefore, **3 principal components** should be retained.

**2. Cumulative Variance Explained:**
To find the cumulative variance, sum the proportions of variance for the retained components:
Cumulative Variance = PC1 + PC2 + PC3 
Cumulative Variance = $45.0\% + 22.5\% + 13.8\%$ = **81.3%**
*(The retained components explain 81.3% of the total variance in the dataset).*

**3. Why PCA is performed on standardized data:**
PCA looks for directions (principal components) that maximize the variance in the data. If variables are on completely different scales or units (e.g., measuring carbon emissions in millions of tons vs. particulate matter in micrograms), the variables with larger numerical ranges will exhibit artificially higher variance. If raw data is used, PCA will incorrectly give these large-scale variables the most weight, ignoring the actual underlying correlations. Standardizing the data (scaling variables to have a mean of 0 and a variance of 1) ensures that every environmental indicator contributes equally to the analysis at the start.

---

### **Part (b) [3 marks]: Hierarchical Clustering and Linkage Methods**

**1. Identify the Largest Gap in Merge Distances:**
Let's calculate the difference (gap) between successive merge distances:
*   Gap between Stage 1 and 2: $2.5 - 1.8 = 0.7$
*   Gap between Stage 2 and 3: $4.2 - 2.5 = 1.7$
*   Gap between Stage 3 and 4: $5.0 - 4.2 = 0.8$
*   Gap between Stage 4 and 5: $11.5 - 5.0 = \mathbf{6.5}$

The largest gap occurs **between Stage 4 and Stage 5**.

**2. Recommended Number of Clusters and List of Cities:**
A large jump in merge distance indicates that we are forcing two highly dissimilar clusters to merge. Therefore, we should "cut" the dendrogram right *before* this massive jump occurs (before Stage 5).
*   **Recommended Clusters:** Cutting before Stage 5 leaves us with **2 clusters**. 
*   **Cities in Each Cluster:** Based on the state of the clusters at the end of Stage 4, the clusters are:
    *   **Cluster 1:** {P, Q, R}
    *   **Cluster 2:** {S, T, U}

**3. Ward’s Linkage vs. Single Linkage:**
*   **Ward’s Linkage:** This method evaluates the distance between two clusters by calculating the increase in the total within-cluster variance (or Sum of Squared Errors) after merging them. It seeks to minimize this variance, which tends to produce compact, spherical, and relatively evenly-sized clusters.
*   **Single Linkage:** This method defines the distance between two clusters as the shortest distance between any single data point in the first cluster and any single data point in the second cluster (the "nearest neighbor" approach). While it can identify non-elliptical cluster shapes, it is highly prone to "chaining" (where loose, elongated clusters merge prematurely due to a single close pair of points).

---

### **Part (c) [3 marks]: Comparing K-Means and Hierarchical Clustering**

**1. Advantage of Hierarchical Clustering over K-Means:**
*   **No need to pre-specify $K$:** Hierarchical clustering does not require you to input the number of clusters beforehand. It produces a dendrogram (a visual tree), allowing the user to inspect the data's structure and decide on the optimal number of clusters later (as done in Part b). Furthermore, it is a deterministic algorithm, meaning it will always yield the exact same result for the same dataset, whereas K-Means can yield different results depending on the initial random placement of centroids.

**2. Advantage of K-Means over Hierarchical Clustering:**
*   **Computational Efficiency:** K-Means is much faster and more memory-efficient for large datasets. Its time complexity is linear, roughly $O(n)$, whereas hierarchical clustering has a time complexity of $O(n^3)$ or $O(n^2 \log n)$ and requires generating an $N \times N$ distance matrix, which consumes massive amounts of memory as the dataset grows.

**3. Method Preference for 10,000 Cities:**
If the dataset scaled to 10,000 cities, I would prefer **K-Means clustering**.
*   **Why:** Hierarchical clustering for 10,000 data points would require computing and storing a distance matrix of $10,000 \times 10,000$ (100 million distances), which is highly memory-intensive and computationally slow. K-Means scales extremely well to thousands (or millions) of data points and would be able to partition the 10,000 cities rapidly and efficiently.
