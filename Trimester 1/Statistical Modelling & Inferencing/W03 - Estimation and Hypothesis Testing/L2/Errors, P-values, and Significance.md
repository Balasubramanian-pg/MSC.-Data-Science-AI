
# 1. The Nature of Statistical Decisions

Hypothesis testing is fundamentally a decision-making framework under uncertainty.

We observe a sample:

$$  
x_1, x_2, x_3, \dots, x_n  
$$

and attempt to infer something about an unknown population parameter such as:

$$  
\mu,\ p,\ \sigma^2  
$$

But because samples are incomplete representations of populations, every statistical conclusion carries uncertainty.

This creates a deep reality of inference:

> Statistical decisions are probabilistic, not certain.

Unlike pure mathematics, statistics does not produce absolute truth.  
It produces quantified uncertainty.

# 2 The Logic of Hypothesis Testing

Every hypothesis test begins with two competing claims.

## Null Hypothesis

The null hypothesis represents:

- no effect
    
- no difference
    
- no relationship
    
- status quo
    

Usually denoted:

$$  
H_0  
$$

Examples:

$$  
H_0:\mu = 50  
$$

$$  
H_0:p = 0.5  
$$

---

## Alternative Hypothesis

The alternative hypothesis represents:

- a real effect
    
- a difference
    
- a deviation from the null
    

Usually denoted:

$$  
H_a  
\quad \text{or} \quad  
H_1  
$$

Examples:

$$  
H_a:\mu \ne 50  
$$

$$  
H_a:\mu > 50  
$$

$$  
H_a:\mu < 50  
$$

---

# 3 The Four Possible Outcomes

Reality itself is hidden from us.

We never directly know whether:

$$  
H_0  
$$

is actually true or false.

We only make decisions based on sample evidence.

This creates four logical possibilities:

|Decision|$$H_0$$ True|$$H_0$$ False|
|---|---|---|
|Fail to Reject $$H_0$$|Correct Decision|Type II Error|
|Reject $$H_0$$|Type I Error|Correct Decision|

---

# 4 Type I Error: The False Positive

A Type I Error occurs when we reject a null hypothesis that is actually true.

Formally:

# $$  
\text{Type I Error}

\text{Reject } H_0  
\text{ when } H_0 \text{ is true}  
$$

The probability of committing a Type I Error is:

$$  
\alpha  
$$

called the significance level.

\alpha

---

## 4.1 Interpretation of $$\alpha$$

If:

$$  
\alpha = 0.05  
$$

then we are accepting a:

$$  
5%  
$$

risk of falsely rejecting the null hypothesis.

This means:

> Even when the null hypothesis is perfectly true, our testing procedure will falsely reject it about 5% of the time in repeated sampling.

---

## 4.2 Examples of Type I Errors

### Medicine

- Healthy patient diagnosed with disease
    
- False positive cancer screening
    

---

### Criminal Justice

- Innocent person convicted
    

---

### Manufacturing

- Good product classified as defective
    

---

### Cybersecurity

- Legitimate activity flagged as malicious
    

---

# 5 Type II Error: The False Negative

A Type II Error occurs when we fail to reject a false null hypothesis.

Formally:

# $$  
\text{Type II Error}

\text{Fail to Reject } H_0  
\text{ when } H_0 \text{ is false}  
$$

The probability of a Type II Error is:

$$  
\beta  
$$

\beta

---

## 5.1 Examples of Type II Errors

### Medicine

- Diseased patient incorrectly declared healthy
    

---

### Fraud Detection

- Fraudulent transaction passes unnoticed
    

---

### Engineering

- Defective component passes inspection
    

---

### National Security

- Real threat not detected
    

---

# 6 Statistical Power

The complement of a Type II Error is called statistical power.

$$  
\text{Power} = 1 - \beta  
$$

\text{Power} = 1 - \beta

Power represents:

> The probability of correctly detecting a real effect.

High power means:

- low false negative rate
    
- sensitive detection capability
    
- greater ability to discover true effects
    

---

# 7 The Tradeoff Between $$\alpha$$ and $$\beta$$

There is no free lunch in statistical inference.

Reducing one type of error often increases the other.

Suppose we reduce:

$$  
\alpha  
$$

from:

$$  
0.05 \rightarrow 0.001  
$$

We become much more cautious about false positives.

But now stronger evidence is required to reject:

$$  
H_0  
$$

This makes real effects harder to detect.

Thus:

$$  
\beta  
\uparrow  
$$

and power decreases.

---

## Deep Intuition

Statistical testing is fundamentally threshold detection under uncertainty.

A very strict threshold:

- reduces false alarms
    
- increases missed detections
    

A very lenient threshold:

- catches more true effects
    
- increases false alarms
    

This is the exact same tradeoff seen in:

- radar systems
    
- spam filters
    
- anomaly detection
    
- medical diagnostics
    
- machine learning classifiers
    

Hypothesis testing is essentially signal detection theory in mathematical form.

---

# 8 The Role of Sample Size

Sample size is the primary mechanism for improving both error rates simultaneously.

As:

$$  
n \uparrow  
$$

we obtain:

- more precise estimates
    
- smaller standard errors
    
- greater separation between signal and noise
    

This allows:

- smaller $$\alpha$$
    
- smaller $$\beta$$
    
- higher power
    

simultaneously.

Large samples partially break the tradeoff.

---

# 9 The P-Value

The p-value is one of the most misunderstood concepts in all of statistics.

Formally:

> The p-value is the probability of observing a test statistic at least as extreme as the one obtained, assuming the null hypothesis is true.

Mathematically:

# $$  
p

P(\text{Data as extreme as observed}\mid H_0 \text{ true})  
$$

p = P(\text{Data as extreme as observed}\mid H_0\text{ true})

---

# 10 Understanding "Extreme"

Suppose:

$$  
H_0:\mu = 50  
$$

and we observe:

$$  
\bar{x} = 84  
$$

If the standard error is small, this observation is extremely far from the null expectation.

Under:

$$  
H_0  
$$

such a result would be very unlikely.

Thus the p-value becomes small.

A small p-value means:

> "If the null hypothesis were true, seeing data this extreme would be rare."

That rarity becomes evidence against:

$$  
H_0  
$$

---

# 11 P-Values as Measures of Surprise

The p-value quantifies surprise under the null model.

|P-Value|Interpretation|
|---|---|
|Large|Data unsurprising under $$H_0$$|
|Small|Data surprising under $$H_0$$|
|Very small|Strong evidence against $$H_0$$|

Examples:

|P-Value|Informal Interpretation|
|---|---|
|$$0.45$$|Extremely consistent with $$H_0$$|
|$$0.12$$|Weak evidence against $$H_0$$|
|$$0.03$$|Moderate evidence against $$H_0$$|
|$$0.001$$|Very strong evidence against $$H_0$$|

---

# 12 What the P-Value Is NOT

This is critical.

The p-value is NOT:

$$  
P(H_0 \text{ true})  
$$

P(H_0\text{ true})

Statistics students constantly reverse the conditional probability.

The p-value assumes:

$$  
H_0  
$$

is true and asks:

> "How unusual is this data?"

It does NOT ask:

> "How likely is the hypothesis itself?"

Those are fundamentally different questions.

---

# 13 The Decision Rule

Hypothesis testing compares:

|Quantity|Meaning|
|---|---|
|$$p$$|Evidence from data|
|$$\alpha$$|Required standard of proof|

Decision rule:

## Reject the Null

If:

$$  
p \le \alpha  
$$

then:

- result is statistically significant
    
- reject $$H_0$$
    

p \le \alpha

---

## Fail to Reject the Null

If:

$$  
p > \alpha  
$$

then:

- result is not statistically significant
    
- fail to reject $$H_0$$
    

p > \alpha

Notice carefully:

We do NOT "accept" the null hypothesis.

Failing to reject simply means:

> Evidence was insufficient.

Absence of evidence is not evidence of absence.

---

# 14 Why "Fail to Reject" Matters

Suppose a drug trial yields:

$$  
p = 0.08  
$$

with:

$$  
\alpha = 0.05  
$$

The result is not statistically significant.

But this does NOT prove:

$$  
H_0  
$$

is true.

Possible explanations:

- effect genuinely absent
    
- sample size too small
    
- noise too high
    
- study underpowered
    

This distinction matters enormously in scientific interpretation.

---

# 15 Statistical Significance vs Practical Significance

One of the biggest failures in applied statistics is confusing significance with importance.

---

## Statistical Significance

Means:

> The effect is unlikely due to random chance.

---

## Practical Significance

Means:

> The effect is large enough to matter in reality.

These are not the same thing.

---

# 16 Large Samples Can Detect Tiny Effects

Suppose a drug lowers blood pressure by:

$$  
0.01 \text{ mmHg}  
$$

With millions of observations:

$$  
p < 0.000001  
$$

The result is statistically significant.

But medically?

Almost meaningless.

This is why effect size matters.

---

# 17 Effect Size

A p-value only measures evidence against:

$$  
H_0  
$$

It does NOT measure:

- magnitude
    
- practical impact
    
- economic value
    
- scientific importance
    

Effect size metrics attempt to quantify magnitude.

Examples:

- Cohen's $$d$$
    
- Pearson correlation $$r$$
    
- odds ratio
    
- relative risk
    

Modern statistics increasingly emphasizes:

- confidence intervals
    
- effect sizes
    
- uncertainty quantification
    

rather than binary significance decisions alone.

---

# 18 The Replication Crisis

Many scientific fields experienced replication failures because of overreliance on p-values.

Researchers often treated:

$$  
p < 0.05  
$$

as equivalent to truth.

This caused:

- publication bias
    
- p-hacking
    
- selective reporting
    
- multiple testing abuse
    

A statistically significant result can still be:

- false
    
- fragile
    
- exaggerated
    
- non-replicable
    

Statistical significance is evidence, not proof.

---

# 19 Confidence Intervals and P-Values

Confidence intervals provide richer information than p-values alone.

Suppose a confidence interval for a mean difference is:

$$  
(2.1,\ 7.4)  
$$

Since:

$$  
0  
$$

is not inside the interval:

$$  
H_0:\mu_1 - \mu_2 = 0  
$$

would be rejected.

Confidence intervals simultaneously show:

- direction
    
- magnitude
    
- uncertainty
    
- statistical significance
    

This is why many statisticians prefer them over isolated p-values.

---

# 20 One of the Deepest Misconceptions in Statistics

Many people implicitly believe:

> A statistically significant result is probably true.

That is not necessarily correct.

If:

- many hypotheses are tested
    
- prior probability is low
    
- studies are noisy
    

then false positives can dominate published findings.

This is mathematically related to Bayesian base-rate effects.

In some fields, a large fraction of "significant" findings may actually be false discoveries.

---

# 21 Deep Intuition Behind Hypothesis Testing

At its core, hypothesis testing asks:

$$  
\text{Signal}  
\quad vs \quad  
\text{Noise}  
$$

Observed data always contains both.

The entire machinery of:

- test statistics
    
- p-values
    
- significance levels
    
- confidence intervals
    
- power
    

exists to determine whether the observed signal is too large to plausibly attribute to random variation alone.

Statistics is not about certainty.

It is about disciplined skepticism under uncertainty.