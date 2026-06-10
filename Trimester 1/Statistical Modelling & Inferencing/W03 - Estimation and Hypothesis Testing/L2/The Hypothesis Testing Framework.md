# 1.  The Core Idea: Decision-Making Under Uncertainty

Hypothesis testing is a formal framework for making decisions using incomplete information.

We observe a sample:

$$  
x_1, x_2, x_3, \dots, x_n  
$$

and attempt to infer something about an unknown population parameter such as:

$$  
\mu,\ p,\ \sigma^2  
$$

Because we only observe a sample rather than the full population, every conclusion contains uncertainty.

Hypothesis testing provides a systematic method for deciding whether the observed evidence is strong enough to challenge an existing assumption.

At its core, hypothesis testing asks:

$$  
\text{Is the observed signal large enough to distinguish from random noise?}  
$$

# 2 The Logic Behind Hypothesis Testing

The structure of hypothesis testing is deeply conservative.

The default assumption is always maintained unless evidence becomes sufficiently strong to overturn it.

This mirrors many real-world systems:

- criminal courts
    
- scientific research
    
- medical approval
    
- anomaly detection
    
- cybersecurity monitoring
    

The system assumes normality or innocence until evidence suggests otherwise.

# 3 The Courtroom Analogy

The courtroom analogy is one of the most powerful ways to understand statistical inference.

|Criminal Trial|Hypothesis Testing|
|---|---|
|Presumed innocent|Null hypothesis assumed true|
|Prosecutor presents evidence|Researcher collects data|
|Jury evaluates evidence|Statistical test evaluates evidence|
|Guilty verdict|Reject $$H_0$$|
|Not guilty verdict|Fail to reject $$H_0$$|

The analogy matters because it highlights an essential principle:

> Failure to convict does not prove innocence.

Similarly:

> Failure to reject the null hypothesis does not prove the null hypothesis is true.

It only means the evidence was insufficient.

# 4 The Null Hypothesis

The null hypothesis represents:

- no effect
    
- no difference
    
- no relationship
    
- status quo
    

It is denoted by:

$$  
H_0  
$$

Examples:

$$  
H_0:\mu = 100  
$$

$$  
H_0:p = 0.5  
$$

$$  
H_0:\mu_1 - \mu_2 = 0  
$$

The null hypothesis is the claim subjected to skepticism and testing.
# 5 The Alternative Hypothesis

The alternative hypothesis represents the competing claim.

It is denoted by:

$$  
H_A  
\quad \text{or} \quad  
H_1  
$$

Examples:

$$  
H_A:\mu \ne 100  
$$

$$  
H_A:\mu > 100  
$$

$$  
H_A:\mu < 100  
$$

The alternative hypothesis represents the presence of:

- an effect
    
- a difference
    
- a deviation from the null
    
# 6 One-Tailed vs Two-Tailed Tests

The structure of the alternative hypothesis determines the type of test.


## 6.1 Two-Tailed Test

Used when deviations in either direction matter.

$$  
H_0:\mu = 100  
$$

$$  
H_A:\mu \ne 100  
$$

This tests for:

$$  
\mu > 100  
\quad \text{or} \quad  
\mu < 100  
$$

simultaneously.

## 6.2 Right-Tailed Test

Used when only increases matter.

$$  
H_0:\mu = 100  
$$

$$  
H_A:\mu > 100  
$$

## 6.3 Left-Tailed Test

Used when only decreases matter.

$$  
H_0:\mu = 100  
$$

$$  
H_A:\mu < 100  
$$

The choice of tail direction must be determined before examining data.

Changing tail direction after observing results is a form of statistical manipulation.

# 7 The Four-Step Hypothesis Testing Framework

Every formal hypothesis test follows four major steps:

|Step|Purpose|
|---|---|
|1|State hypotheses|
|2|Define significance level|
|3|Compute test statistic|
|4|Make decision|

This structure is universal across:

- Z-tests
    
- t-tests
    
- chi-square tests
    
- ANOVA
    
- regression testing
    

The details differ, but the logic remains identical.

# 8 Step 1: State the Hypotheses

The first step is translating the research question into mathematical form.

Suppose a manufacturer claims battery life is:

$$  
100 \text{ hours}  
$$

We might define:

$$  
H_0:\mu = 100  
$$

$$  
H_A:\mu \ne 100  
$$

This step matters enormously because poorly formulated hypotheses create invalid conclusions later.

A statistical test can only answer the question it was designed to test.
# 9 Step 2: Set the Significance Level

Before collecting data, we define the evidence threshold.

This threshold is the significance level:

$$  
\alpha  
$$

\alpha

The significance level represents:

$$  
P(\text{Type I Error})  
$$

P(\text{Type I Error})

or the probability of rejecting a true null hypothesis.

Common choices:

|Significance Level|Interpretation|
|---|---|
|$$0.10$$|More lenient|
|$$0.05$$|Standard default|
|$$0.01$$|Very strict|


# 10 Why $$\alpha$$ Is Chosen Before Seeing Data

Choosing:

$$  
\alpha  
$$

before examining results prevents moving the goalposts.

If researchers selected significance thresholds after observing outcomes, they could manipulate conclusions arbitrarily.

Pre-registering:

$$  
\alpha  
$$

helps preserve inferential integrity.

# 11 Step 3: Collect Data and Compute the Test Statistic

After defining the hypotheses and significance level, we collect sample data.

The evidence is summarized into a single quantity called the test statistic.

General structure:


$$
\text{Test Statistic} = \frac{\text{Sample Statistic} - \text{Null Value}}{\text{Standard Error}}
$$


The test statistic measures:

> How many standard errors the observed result lies from the null hypothesis expectation.

Large deviations imply stronger evidence against:

$$  
H_0  
$$

# 12 The Intuition Behind Standardization

Suppose two experiments both observe a mean difference of:

$$  
5  
$$

But:

- Experiment A has tiny variability
    
- Experiment B has huge variability
    

The same raw difference means very different things.

Standardization accounts for noise.

That is why hypothesis testing divides by the standard error.

Inference fundamentally depends on:

$$  
\text{Signal} \div \text{Noise}  
$$

# 13 Common Test Statistics

Different statistical problems require different test statistics.

|Test Statistic|Typical Use|
|---|---|
|$$Z$$|Known population variance or large samples|
|$$t$$|Unknown population variance|
|$$\chi^2$$|Variance tests, categorical analysis|
|$$F$$|Comparing multiple variances or means|

Each statistic has its own probability distribution under:

$$  
H_0  
$$

# 14 Example: One-Sample Z-Test

Suppose:

- claimed population mean:
    

$$  
\mu_0 = 50  
$$

- sample mean:
    

$$  
\bar{x} = 54  
$$

- population standard deviation:
    

$$  
\sigma = 10  
$$

- sample size:
    

$$  
n = 25  
$$

The Z-statistic is:

# $$  
Z

\frac{  
\bar{x} - \mu_0  
}{  
\sigma/\sqrt{n}  
}  
$$

genui{"math_block_widget_always_prefetch_v2":{"content":"Z=\frac{\bar{x}-\mu_0}{\sigma/\sqrt{n}}"}}

Substituting values:

$$
Z = \frac{54 - 50}{10 / \sqrt{25}} = \frac{4}{2} = 2
$$

This means the observed sample mean lies:

$$  
2  
$$

standard errors above the null expectation.

# 15 Step 4: Compute the P-Value

Once the test statistic is obtained, we calculate the p-value.

Definition:

# $$  
p

P(\text{Data at least as extreme as observed} \mid H_0 \text{ true})  
$$

p=P(\text{Data at least as extreme as observed}\mid H_0\text{ true})

The p-value quantifies how surprising the observed data would be if:

$$  
H_0  
$$

were true.

# 16 The Decision Rule

The final step compares:

- observed evidence:
    

$$  
p  
$$

- required standard:
    

$$  
\alpha  
$$


## Reject the Null Hypothesis

If:

$$  
p \le \alpha  
$$

then:

- result is statistically significant
    
- reject $$H_0$$
    

$$ p \le \alpha$$


## Fail to Reject the Null Hypothesis

If:

$$  
p > \alpha  
$$

then:

- result is not statistically significant
    
- fail to reject $$H_0$$
    

$$p > \alpha$$


# 17 Why We Never "Accept" the Null Hypothesis

This wording matters.

Statistics never proves:

$$  
H_0  
$$

true.

It only evaluates whether evidence against:

$$  
H_0  
$$

became sufficiently strong.

A non-significant result may occur because:

- effect absent
    
- sample too small
    
- noise too large
    
- study underpowered
    

Thus:

> "Fail to reject" is intentionally cautious language.

# 18 Rejection Regions and Critical Values

Before p-values became standard, many tests used critical values directly.

Example:

For a two-tailed Z-test with:

$$  
\alpha = 0.05  
$$

critical values are:

$$  
\pm 1.96  
$$

\pm 1.96

Decision rule:

- reject if:
    

$$  
|Z| > 1.96  
$$

- fail to reject otherwise
    

|Z| > 1.96

The p-value approach and critical-value approach are mathematically equivalent.

# 19 The Deep Structure of Hypothesis Testing

All hypothesis tests ultimately compare:

$$  
\text{Observed Result}  
$$

against

$$  
\text{Expected Random Variation}  
$$

If the observed result is too extreme to plausibly attribute to randomness alone, we reject:

$$  
H_0  
$$

This framework appears everywhere:

- machine learning anomaly detection
    
- A/B testing
    
- pharmaceutical trials
    
- quality control
    
- economics
    
- neuroscience
    
- cybersecurity
    

Hypothesis testing is fundamentally a formalized system for distinguishing signal from noise.


# 20 Statistical Significance Is Not Truth

A statistically significant result does not guarantee:

- causality
    
- practical importance
    
- replication
    
- correctness
    

It only means:

> The observed data would be relatively unlikely if the null hypothesis were true.

This is evidence, not certainty.

Statistical inference is probabilistic reasoning under uncertainty, not mechanical truth generation.

![[Pasted image 20260531145202.png]]