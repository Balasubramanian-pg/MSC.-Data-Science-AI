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
  
