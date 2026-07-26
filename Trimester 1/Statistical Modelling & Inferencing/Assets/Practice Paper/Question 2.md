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

