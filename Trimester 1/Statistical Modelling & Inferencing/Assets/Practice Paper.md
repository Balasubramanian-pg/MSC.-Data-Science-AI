Here is the cleaned-up, properly structured, and formatted version of your practice paper. I have fixed the broken tables, organized the layout, and converted the messy equations into professional mathematical notation so it is easy to read. 

***

# Statistical Modelling and Inferencing
### End Term Examination - Practice Paper
**Total Marks:** 40

---

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
