# Second Assessment
<img width="444" height="844" alt="image" src="https://github.com/user-attachments/assets/5c5fb223-a671-4ee6-b60b-1b8ba08a53f3" />

### **Question 1**

* **Correct Answer:** **The predictor X explains none of the variation in Y; all of it is left to error.**
* **Eliminations:**
* *The sample size is too small:* $R^2$ measures explanatory power, not sample size constraints.
* *The model explains all of the variation in Y:* This describes $R^2 = 1$, not $0$.
* *The slope coefficient is very large:* A large slope can still exist with low explanatory power if the data is highly scattered.

### **Question 2**

* **Correct Answer:** **$H_0: \beta_1 = 0 \text{ versus } H_1: \beta_1 \neq 0$**
* **Eliminations:**
* *$H_0: \epsilon = 0 \text{ versus } H_1: \epsilon \neq 0$:* The error term ($\epsilon$) is a random variable, not a fixed parameter tested with a t-test.
* *$H_0: R^2 = 0 \text{ versus } H_1: R^2 > 0$:* $R^2$ is evaluated using an F-test, not a t-test.
* *$H_0: \beta_0 = 0 \text{ versus } H_1: \beta_0 \neq 0$:* This tests the intercept ($\beta_0$), not the slope coefficient ($\beta_1$).

### **Question 3**

* **Correct Answer:** **fail to reject $H_0$; there is not enough evidence of an association**
* **Eliminations:**
* *there is a significant association between campus and major:* A p-value of 0.21 is greater than $\alpha = 0.05$, meaning the result is not statistically significant.
* *the test is invalid because $\chi^2$ is small:* A small $\chi^2$ value is completely valid and simply indicates a close fit to the null hypothesis.
* *the two variables are proven to be independent:* Statistical tests never definitively "prove" the null hypothesis to be true.

### **Question 4**

* **Correct Answer:** **the hypothesised proportion $p_0$ under the null hypothesis**
* **Eliminations:**
* *the observed sample proportion computed from the data:* The sample proportion ($\hat{p}$) is used for confidence intervals, not the standard error of a one-sample Z-test statistic.
* *the sample standard deviation s:* Standard deviation ($s$) is used for testing means (T-tests), not proportions.
* *the population mean:* Proportions deal with categorical counts, not population means ($\mu$).

### **Question 5**

* **Correct Answer:** **lies below the mean**
* **Eliminations:**
* *is an outlier that should be removed:* A negative z-score just means it is below average; it is only an outlier if it is extremely large (e.g., $< -3$).
* *has a negative probability:* Probabilities can never be negative, regardless of the z-score value.
* *lies above the mean:* Positive z-scores indicate values above the mean.

### **Question 6**

* **Correct Answer:** **The regression sum of squares (SSR) and the error sum of squares (SSE).**
* **Eliminations:**
* *A treatment sum of squares and a block sum of squares:* This partition belongs specifically to a randomized block ANOVA design.
* *Between-group variance and within-group variance:* This terminology is used for a standard one-way ANOVA, not simple linear regression.
* *The mean and the standard deviation of Y:* These are descriptive statistics of a variable, not components that sum up to total variation (SST).

<img width="444" height="612" alt="image" src="https://github.com/user-attachments/assets/3ae52f46-14f4-4bf7-852d-a76355ed58ee" />

### **Question 7**

* **Correct Answer:** **the ratio of the two sample variances, larger over smaller by convention**
* **Eliminations:**
* *the square root of the pooled variance:* This is used to calculate the standard error for a two-sample t-test, not an F-test.
* *the difference between the two sample variances:* The F-test relies on a quotient (division) to compare variance scales, not subtraction.
* *the product of the two sample variances:* Multiplying variances serves no comparative statistical purpose in a variance equality test.

### **Question 8**

* **Correct Answer:** **Carry out pairwise comparisons (such as t-tests) between specific groups.**
* **Eliminations:**
* *Compute a chi-square statistic:* Chi-square tests are used for categorical count data, not continuous means following an ANOVA.
* *Declare that all groups differ because the ANOVA was significant:* An omnibus ANOVA test only confirms that *at least one* pair differs, not necessarily all of them.
* *Raise the significance level and rerun the ANOVA:* Changing $\alpha$ and repeating the exact same overall test will not pinpoint where individual differences lie.

### **Question 9**

* **Correct Answer:** **A one-way ANOVA.**
* **Eliminations:**
* *A chi-square test:* This is designed for testing relationships between categorical variables, not comparing numeric mileage means.
* *A paired t-test:* This is used for matching pairs of data within two dependent groups, not three independent groups.
* *An independent two-sample t-test:* This test is restricted to comparing means between exactly two groups, whereas we have three plants.

### **Question 10**

* **Correct Answer:** **Paired t-test**
* **Eliminations:**
* *Chi-square test of independence:* This evaluates the association between categorical factors, not continuous pre/post weights.
* *F-test for variances:* This tests differences in data spread/variability, not whether a mean value changed over time.
* *Independent two-sample t-test:* This requires separate, unrelated groups, whereas this design tracks the exact same individuals over two time intervals.
