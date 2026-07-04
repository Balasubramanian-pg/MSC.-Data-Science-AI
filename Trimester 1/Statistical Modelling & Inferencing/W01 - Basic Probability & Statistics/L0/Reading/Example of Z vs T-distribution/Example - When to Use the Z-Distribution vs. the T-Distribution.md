# Example: When to Use the Z-Distribution vs. the T-Distribution

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
