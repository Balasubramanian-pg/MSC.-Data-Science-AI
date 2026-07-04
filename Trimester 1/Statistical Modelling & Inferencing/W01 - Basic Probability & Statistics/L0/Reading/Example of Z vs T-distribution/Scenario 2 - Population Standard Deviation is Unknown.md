# Scenario 2: Population Standard Deviation is Unknown

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
