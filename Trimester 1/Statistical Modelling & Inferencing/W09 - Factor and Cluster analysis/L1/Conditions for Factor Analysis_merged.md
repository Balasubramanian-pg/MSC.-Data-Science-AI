---

## Reading Material: Conditions for Factor Analysis


### 1. Foundational Assumptions: Ensuring Factorability
![[Pasted image 20260525122624.png]]
Factor Analysis is not a "black box" that works on any dataset. Because it relies on analyzing the _patterns of correlation_ between variables to uncover hidden latent factors, if your data doesn't contain reliable underlying associations, the results will be mathematically unstable and interpretatively useless.

As you noted, we must validate both the data characteristics and the statistical properties. Here are the core assumptions you need to verify before proceeding:

### 2. Data Characteristics: The "[Quality Control](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L1/Inferences%20for%20Two%20Population%20Variances.md#quality-control)" Phase

Before running the model, ensure your variables meet these prerequisites:

- **Measurement Level:** Factor Analysis (specifically Exploratory Factor Analysis) generally requires **continuous (interval or ratio) data**. If you are using categorical data, you may need specialized versions (like Polychoric correlation-based factor analysis).
    
- **Sample Size:** Factor Analysis is data-hungry. A common rule of thumb is the **10:1 ratio**—at least 10 observations for every variable included in the analysis. Smaller samples lead to unstable "factor loadings" that fluctuate wildly if you add or remove a single data point.
    
- **Normality:** Most extraction methods (like Maximum Likelihood) assume **multivariate normality**. If your data is highly skewed or contains extreme outliers, your factor estimates may be biased.
    

### 3. Statistical Properties: Diagnostic Tests

This is the "Factorability" test. We are looking for proof that the variables are "talking to each other" enough to form latent factors.

#### A. Correlation Matrix Strength

- **Visual Inspection:** If your correlation matrix consists mostly of low correlations (e.g., $r < 0.3$), factor analysis will fail. There is no "common variance" to extract.
    
- **Bartlett’s Test of Sphericity:** This test checks the [null hypothesis](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W03 - Estimation And Hypothesis Testing/L2/Errors%2C%20P-values%2C%20and%20Significance.md#null-hypothesis) that your correlation matrix is an "identity matrix" (all variables are uncorrelated). **You want a significant result ($p < 0.05$)** to reject this hypothesis, indicating that your variables are sufficiently correlated to proceed.
    

#### B. The KMO (Kaiser-Meyer-Olkin) Measure

The KMO test assesses the _sampling adequacy_ by measuring the proportion of variance in your variables that might be caused by underlying factors.

- **KMO > 0.9:** Marvelous.
    
- **KMO 0.7–0.8:** Middling to Good.
    
- **KMO < 0.5:** Unacceptable; the correlations are too weak to support factor analysis.
    

#### C. Communalities

The "communality" of a variable is the proportion of its variance that can be explained by the retained factors.

- If a variable has a very low communality (e.g., $< 0.3$), it does not share enough variance with the other variables. It is essentially an "outsider" that should likely be removed from the analysis to improve the model's reliability.
    

### [Summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W01 - Basic Probability & Statistics/L2/Reading%202%20Parametric%20vs.%20Non-Parametric%20Methods.md#[summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#[summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L1/The%20Multiple%20Regression%20Model.md#summary))) Checklist for Factorability

|**Diagnostic**|**Goal**|**Interpretation**|
|---|---|---|
|**Sample Size**|$N \ge 10 \times \text{Variables}$|Ensures stability of factor loadings.|
|**Bartlett’s Test**|Significant ($p < 0.05$)|Confirms variables are correlated.|
|**KMO Measure**|$> 0.6$ or $0.7$|Confirms patterns are dense enough.|
|**Communality**|$> 0.3$|Confirms variables belong in the model.|

**Strategic Note:** In your work as a pharmaceutical business analyst, if you are attempting to reduce a large set of KPIs for a regional market performance dashboard, these checks are your first line of defense. They ensure that the "factors" you eventually present to leadership are based on genuine market patterns, not just random numerical [noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#[noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#noise)).

Would you like to explore **how to interpret the Scree Plot and Eigenvalues** to determine _how many_ factors you should actually extract, or would you like to see a Python script that calculates these KMO and Bartlett tests on a sample dataset?

### 1.1 Data Characteristics: The Architectural Prerequisites

Factor analysis works by decomposing the **covariance structure** of your data. If your data doesn't conform to the fundamental requirements of [linearity](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L0/Linear%20Regression.md#linearity) and sufficient density, the "hidden structures" (factors) the model identifies will be mathematical mirages rather than genuine insights.

#### A. Level of Measurement: Why Metrics Matter

Factor analysis computes correlations (typically Pearson’s $r$), which are designed for continuous, interval-level data.

- **The Likert Exception:** In [social sciences](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/The%20Coefficient%20of%20Determination%20%28R%C2%B2%29.md#social-sciences) and market research, you will often encounter Likert-type scales (e.g., "1 to 5" rating of brand perception). While technically ordinal, these are treated as "quasi-continuous" in factor analysis, provided the scale has at least 5–7 points. If your data is binary or has very few categories, standard factor analysis may yield biased results, and you might need to use **Polychoric Correlations** instead.
    

#### B. The Sample Size Imperative

The stability of your **Factor Loadings** (the weights assigned to each variable) is the primary casualty of a small sample size.

- **The Danger of [Overfitting](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Model%20Assessment%20and%20Adjusted%20R%C2%B2.md#overfitting):** With a small $N$, the model may identify patterns that are specific to your unique sample rather than the general population. If you ran the same analysis on a different group of patients or regions, your "factors" would change completely.
    
- **The 10:1 Rule:** Always strive for the 10:1 ratio. If you are analyzing 20 pharmaceutical KPIs, you should aim for at least 200 observations.
    

#### C. [Linearity](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L0/Linear%20Regression.md#linearity): The "Straight-Line" Assumption

Factor analysis assumes that as one variable increases, the other increases (or decreases) at a consistent rate.

- **[Why it matters](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#why-it-matters):** If two variables have a U-shaped or exponential relationship, Pearson correlation will underestimate their true association. Because factor analysis _builds_ the factors from these correlations, it will effectively "ignore" the relationship between non-linear variables.
    
- **Diagnostic Check:** Before running the model, create a **scatter plot matrix** of your key variables. If you see curved patterns rather than linear clouds, consider transforming your data (e.g., using log or square root transformations) before proceeding.
    

### Critical [Summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W01 - Basic Probability & Statistics/L2/Reading%202%20Parametric%20vs.%20Non-Parametric%20Methods.md#[summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#[summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L1/The%20Multiple%20Regression%20Model.md#summary))) Table for Data Preparation

|**Characteristic**|**Requirement**|**Risk of Violation**|
|---|---|---|
|**Measurement**|Continuous/Interval (Likert 5+)|Low validity in latent structure.|
|**Sample Size**|$N \ge 150$ or $10:1$ ratio|Unreliable, non-replicable loadings.|
|**[Linearity](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L0/Linear%20Regression.md#linearity)**|Linear associations|Missed associations; distorted factors.|

**Pro-Tip:** In the pharmaceutical sector, you often work with data where KPIs are on completely different scales (e.g., "Market Share %" vs. "Number of Prescribing Physicians"). **Always standardize your variables (Z-score transformation)** before running factor analysis, so that variables with larger numerical ranges don't dominate the variance purely by virtue of their scale.

Would you like to explore the **mathematical process of Standardizing your data** to prepare for Factor Analysis, or should we proceed to the **Bartlett’s and KMO diagnostic tests** to mathematically prove your data is ready?

### 2. Assessing the Data’s Factorability: The "Talking" Test

The correlation matrix is the DNA of your Factor Analysis. It provides the evidence that your variables share common variance. If the variables aren't "talking" to each other (i.e., correlating), there is no hidden structure for the model to uncover.

#### 2.1 The Inspection Strategy: Seeking "Pockets" of Correlation

When you look at the correlation matrix (a square table showing $r$ values between every pair of variables), you are looking for specific structural signatures:

- **The Signature of Factors:** You want to see clusters—subsets of variables that correlate strongly with each other but less strongly with variables outside their group.
    
    - **High Inter-correlations ($|r| > 0.3$):** These indicate that the variables likely share a latent source. For instance, in pharma data, metrics like _Total Prescriptions_, _New-to-Brand Prescriptions_, and _Average Daily Dose_ might all cluster together because they are all manifestations of the same underlying "Market Adoption" factor.
        
    - **The "Pockets":** Factor Analysis excels at identifying these pockets. If your matrix is filled with scattered, low-intensity numbers, the analysis will fail to produce distinct, interpretable factors.
        

#### What is Problematic? (The "Identity Matrix" Trap)

- **The Void ($|r| < 0.1$):** If the majority of your correlations are near zero, your variables are independent. Factor Analysis will essentially treat each variable as its own unique entity, failing to extract any meaningful latent dimensions.
    
- **The Extreme ($|r| > 0.9$):** While high correlation is good, _extreme_ correlation is problematic. This is called **[Multicollinearity](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L1/The%20Least%20Squares%20Method%20in%20Multiple%20Regression.md#[multicollinearity](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#[multicollinearity](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#multicollinearity)))**. If two variables are perfectly correlated (e.g., _Total Sales in Units_ and _Total Sales in Dollars_ for the same product), they are redundant. The model may struggle to distinguish their unique contributions, leading to numerical instability in the factor extraction process.
    

#### Professional Diagnostic Workflow

Before moving to complex extraction, use these formal tests to confirm your visual inspection:

1. **Bartlett’s Test of Sphericity:** This statistical test formally checks if your matrix is an **Identity Matrix** (a matrix where all diagonal values are 1 and all off-diagonal values are 0).
    
    - **[Null Hypothesis](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W03 - Estimation And Hypothesis Testing/L2/Errors%2C%20P-values%2C%20and%20Significance.md#null-hypothesis) ($H_0$):** Variables are independent (no correlations).
        
    - **Decision:** You **want** a significant result ($p < 0.05$). This allows you to reject $H_0$ and confirm that the matrix contains enough correlation to proceed.
        
2. **KMO Measure of Sampling Adequacy (MSA):**
    
    - Calculates the ratio of common variance to unique variance.
        
    - **Guidelines:** * $0.8$ or higher: Excellent factorability.
        
        - $0.6$ or below: The factor structure is likely to be weak; consider removing variables or increasing sample size.
            

### [Summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W01 - Basic Probability & Statistics/L2/Reading%202%20Parametric%20vs.%20Non-Parametric%20Methods.md#[summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#[summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L1/The%20Multiple%20Regression%20Model.md#summary))) Checklist for Matrix Inspection

|**Observation**|**Implication**|**Action**|
|---|---|---|
|**Many $r < 0.1$**|Data lacks shared structure.|Do not proceed; evaluate variable selection.|
|**Clusters ($r > 0.3$)**|Strong potential for latent factors.|Proceed with factor extraction.|
|**Singularities ($r > 0.9$)**|Redundancy/[Multicollinearity](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L1/The%20Least%20Squares%20Method%20in%20Multiple%20Regression.md#[multicollinearity](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#[multicollinearity](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#multicollinearity))).|Consider removing or combining variables.|

**Pro-Tip:** In Python, you can quickly visualize this using `seaborn.heatmap()`. A heatmap allows you to see the "pockets" of correlation instantly, which is far more efficient than scanning hundreds of individual cells in a table.

Would you like to see how to generate a **heatmap of a correlation matrix** in Python to identify these clusters, or are you ready to discuss the **different extraction methods (like PCA vs. Common Factor Analysis)** that we use once we've confirmed the data is factorable?

![[Pasted image 20260523105943.png]]

_Figure 1:_ A heatmap of a correlation matrix suitable for factor analysis. Note the two clear clusters of high correlation (V1-V3 and V4-V6), suggesting two underlying factors.

### 2.2.1 Bartlett’s Test of Sphericity: The "Baseline" Gatekeeper

Bartlett’s Test of Sphericity is your formal "Go/No-Go" decision point. Before you spend time on complex extraction algorithms, this test confirms that there is actually something worth extracting from your correlation matrix.

#### The Mathematical Logic

The test assesses whether your correlation matrix deviates significantly from an **Identity Matrix ($I$)**.

- **The Identity Matrix ($I$):** This is the matrix of total [independence](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L0/Linear%20Regression.md#independence). It contains 1s on the diagonal (a variable always correlates perfectly with itself) and 0s everywhere else. If your data were an identity matrix, every variable would be its own island with no shared variance, rendering factor analysis mathematically impossible.
    
- **The [Null Hypothesis](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W03 - Estimation And Hypothesis Testing/L2/Errors%2C%20P-values%2C%20and%20Significance.md#null-hypothesis) ($H_0$):** $H_0: \text{The correlation matrix is an identity matrix.}$
    
- **The Goal ($p < 0.05$):** By achieving a significant $p$-value, you are statistically demonstrating that the off-diagonal correlations are **not all zero**. You are proving that your variables are significantly related to one another.
    

#### Why it is Essential (but Not Sufficient)

Bartlett’s test is highly sensitive to sample size. In very large datasets (like many of those in pharmaceutical analytics), even tiny, practically meaningless correlations can produce a significant $p$-value.

- **The Trap:** A "significant" result ($p < 0.05$) only tells you that the variables are _not_ independent. It does _not_ tell you if the correlations are strong enough to form _useful_ factors.
    
- **The Protocol:** You must pass Bartlett’s Test **and** then use a secondary measure—like the **KMO (Kaiser-Meyer-Olkin)** test—to verify that the correlations are not just "statistically significant" but also "strong enough" (i.e., factorable).
    

#### [Summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W01 - Basic Probability & Statistics/L2/Reading%202%20Parametric%20vs.%20Non-Parametric%20Methods.md#[summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#[summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L1/The%20Multiple%20Regression%20Model.md#summary))) Checklist for Bartlett's

|**Outcome**|**Interpretation**|**Action**|
|---|---|---|
|**$p > 0.05$**|Fail to reject $H_0$; variables are independent.|**STOP.** Factor analysis is inappropriate.|
|**$p < 0.05$**|Significant; variables share variance.|**PROCEED** to verify with KMO/MSA.|

#### The Complementary Diagnostic: KMO (Kaiser-Meyer-Olkin)

While Bartlett’s tests if _any_ correlation exists, the KMO test evaluates the _strength_ of the relationships. It provides a measure of **Sampling Adequacy (MSA)**.

- **The Logic:** KMO compares the magnitude of the observed correlations to the magnitude of the partial correlations. If variables share factors, their partial correlations should be small.
    
- **The Threshold:** Aim for a KMO value of at least **0.6**, but ideally **> 0.7**.
    

**Pro-Tip:** In Python, you can find these functions within the `factor_analyzer` library. Running `calculate_bartlett_sphericity(df)` and `calculate_kmo(df)` takes only seconds, but it saves hours of troubleshooting by confirming your data's readiness before you attempt to rotate and interpret your factors.

Would you like to move on to **Section 2.2.2 (The KMO Measure)** to complete our diagnostic framework, or shall we look at how to **handle variables that fail these tests**—perhaps by removing them or transforming the data?

### 2.2.2 The KMO Measure: The "Gold Standard" for Sampling Adequacy

While Bartlett’s Test tells you if your variables are correlated at all, the **Kaiser-Meyer-Olkin (KMO) Measure** tells you if those correlations are strong enough to form **distinct, reliable factors**. It is the bridge between confirming that data is "statistically non-random" and confirming that it is "structurally factorable."

#### The [Intuition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[intuition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[intuition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[intuition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#intuition)))): Observed vs. Partial Correlations

The KMO statistic is essentially a ratio. It tests the relationship between the observed correlation between two variables ($r_{ij}$) and their partial correlation ($\text{pr}_{ij}$), which represents the correlation between variables after removing the influence of all other variables in the dataset.

- **The Logic:** If your variables are perfectly suited for factor analysis, it means they are organized into tight "pockets" or groups. Within those groups, variables should be highly correlated with each other. When you "control" for the effects of other variables (by calculating the partial correlation), the _remaining_ correlation should be very small.
    
- **The [Formula](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#formula):** The KMO index is calculated as:
    
    $$\text{KMO} = [\frac{](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L1/Inferences%20for%20Two%20Population%20Means.md#frac)\sum \sum_{i \neq j} r_{ij}^2}{\sum \sum_{i \neq j} r_{ij}^2 + \sum \sum_{i \neq j} \text{pr}_{ij}^2}$$
    

#### Interpreting the "Grade"

Think of the KMO index as a report card for your dataset’s suitability for factor analysis:

|**KMO Score**|**Rating**|**Actionability**|
|---|---|---|
|**> 0.9**|**Marvelous**|Data is perfect; factors will be clean and robust.|
|**> 0.8**|**Meritorious**|Strong data structure; highly reliable.|
|**> 0.7**|**Middling**|Acceptable; proceed with caution.|
|**> 0.6**|**Mediocre**|Weak structure; consider dropping low-communality variables.|
|**> 0.5**|**Miserable**|Poor; structure is very weak; results likely unstable.|
|**< 0.5**|**Unacceptable**|**STOP.** Your variables are not suitable for factor analysis.|

#### Why "Mediocre" Matters (The Analyst's Dilemma)

In your pharmaceutical analytics, you might encounter a KMO of 0.62. Should you proceed?

- **The "Clean-Up" Protocol:** Before abandoning the analysis, perform a **Variable-Level MSA (Measure of Sampling Adequacy)**. Most statistical software provides an MSA score for _each individual variable_ in addition to the overall KMO.
    
- **The Strategy:** If your overall KMO is 0.62, but one specific variable (e.g., "Market Share in Rural Regions") has an MSA of 0.35, that variable is acting as a "[noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#[noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#noise)) injector." By simply removing that single weak variable, you can often watch your overall KMO jump from "Mediocre" to "Meritorious."
    

**Pro-Tip:** Always check your variable-level MSAs before interpreting your final factors. A high overall KMO is great, but a single variable with a low MSA will "pollute" your entire factor structure, making your factors difficult to interpret and mathematically unstable.

Now that we have confirmed your data is "factorable" via Bartlett’s and KMO, we are ready for the fun part: **Extraction**. We need to decide how to mathematically pull those latent factors out of the variables.

Would you like to discuss the **different extraction methods (such as Principal Component Analysis vs. Common Factor Analysis)** and when to choose one over the other?

Tags: #statistics #machine-learning #data-science #statistical-modelling