## Example: When to Use the Z-Distribution vs. the T-Distribution

Suppose a pharmaceutical company wants to estimate the average time physicians spend using a new EMR system.

A random sample of **25 physicians** is selected.

The sample results are:

* Sample size: $$(n = 25)$$
* Sample mean: $$(\bar{x} = 42)$$ minutes

We will examine two different situations.

### Scenario 1: Population Standard Deviation is Known

Previous studies have established that the population standard deviation is:

$$[
\sigma = 8 \text{ minutes}
]$$

Since the population variability is known, we use the **Z-distribution**. ([Wikipedia][1])

The standardized test statistic is:

$$[
Z=\frac{\bar{x}-\mu}{\sigma/\sqrt{n}}
]$$

Suppose we want to test:

$$[
H_0:\mu=40
]$$

Then:

$$[
Z=\frac{42-40}{8/\sqrt{25}}
]$$

$$[
Z=\frac{2}{1.6}
]$$

$$[
Z=1.25
]$$

We would compare this value to the standard normal distribution to determine significance. ([Wikipedia][1])

## Scenario 2: Population Standard Deviation is Unknown

Now suppose the company does **not** know the true population standard deviation.

Instead, the sample itself produces:

$$[
s=8.5 \text{ minutes}
]$$

Because (\sigma) is unknown, we replace it with the sample standard deviation (s).

This introduces extra uncertainty, so we must use the **Student's t-distribution**. ([Wikipedia][1])

The test statistic becomes:

$$[
t=\frac{\bar{x}-\mu}{s/\sqrt{n}}
]$$

Substituting values:

$$[
t=\frac{42-40}{8.5/\sqrt{25}}
]$$

$$[
t=\frac{2}{1.7}
]$$

$$[
t=1.176
]$$

The degrees of freedom are:

$$[
\nu=n-1
]$$

$$[
\nu=25-1=24
]$$

Thus, we compare:

$$[
t=1.176
]$$

against a **t-distribution with 24 degrees of freedom**. ([Wikipedia][1])

## Why Does the T-Distribution Have Heavier Tails?

When $$(\sigma)$$ is known, there is only one source of randomness:

* the sample mean $$(\bar{x})$$

When (\sigma) is unknown, there are two sources of randomness:

1. the sample mean $$(\bar{x})$$
2. the estimated standard deviation $$(s)$$

Since (s) varies from sample to sample, additional uncertainty is introduced. The t-distribution compensates for this by placing more probability in the tails, making extreme values more likely. ([Wikipedia][1])

## Summary

| Condition                                      | Distribution Used | Formula                               |
| ---------------------------------------------- | ----------------- | ------------------------------------- |
| Population standard deviation known ((\sigma)) | Z-distribution    | $$(\frac{\bar{x}-\mu}{\sigma/\sqrt{n}})$$ |
| Population standard deviation unknown ((s))    | t-distribution    | $$(\frac{\bar{x}-\mu}{s/\sqrt{n}})$$      |

As the sample size grows, (s) becomes an increasingly accurate estimate of (\sigma), causing the t-distribution to converge to the Z-distribution. ([Wikipedia][1])

[1]: https://en.wikipedia.org/wiki/Student%27s_t-distribution?utm_source=chatgpt.com "Student's t-distribution"

