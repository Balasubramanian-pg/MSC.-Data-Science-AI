### 1. The Core Concept: Random Variables
![[Random Variable.png]]
A **Random Variable** serves as a bridge between the physical world of random outcomes and the formal world of mathematics. It is a function that maps the set of possible outcomes of a random experiment to a numerical value.

- **Formal Definition:** Let $S$ be the sample space (the set of all possible outcomes). A random variable $X$ is a function $X: S \to \mathbb{R}$.
    
- **Intuition:** While we might be interested in "Heads" or "Tails," a machine can only process numbers. A random variable defines the "translation" of these qualitative outcomes into quantitative data.
    

### 2. Taxonomy of Random Variables
![[Taxonomy of Random Variables.png]]
The nature of the numerical mapping determines the mathematical framework required for analysis.

|**Feature**|**Discrete Random Variable**|**Continuous Random Variable**|
|---|---|---|
|**Values**|Countable (gaps between values)|Uncountable (any value in an interval)|
|**Primary Tool**|Probability Mass Function (PMF)|Probability Density Function (PDF)|
|**Logic**|$P(X=x)$ is the probability of exact occurrence|$P(X=x)$ is essentially zero|
|**Probability**|Summation of discrete points|Area under the curve (Integral)|

### 3. Probability Distributions
![[Probability Distributions.png]]
#### 3.1 Probability Mass Function (PMF)

For discrete variables, the PMF assigns a specific probability to each individual value.

- **Summation Rule:** The sum of all probabilities must equal 1: $\sum_{i} P(X = x_i) = 1$.
    
- **Non-negativity:** $0 \leq P(X = x) \leq 1$ for all $x$.
    

#### 3.2 Probability Density Function (PDF)

For continuous variables, we cannot assign a non-zero probability to a single point (because there are infinitely many points in any interval). Instead, we describe the _density_ of probability over an interval.

- **Range Probability:** To find the probability that $X$ falls within an interval $[a, b]$, we calculate the integral of the PDF over that interval:
    
    $$P(a \leq X \leq b) = \int_{a}^{b} f(x) \, dx$$
    
- **Normalization Rule:** The total area under the entire PDF curve must equal 1: $\int_{-\infty}^{\infty} f(x) \, dx = 1$.
    

### 4. Implementation: Python Example

While formal calculus is used for theory, we often use `scipy.stats` in Python to work with distributions.



```Python
import numpy as np
from scipy.stats import binom, norm

# Discrete Example: Binomial Distribution (e.g., number of heads in 10 flips)
# PMF: Probability of getting exactly 5 heads in 10 flips
prob_5_heads = binom.pmf(k=5, n=10, p=0.5)
print(f"PMF (Discrete): {prob_5_heads:.4f}")

# Continuous Example: Normal Distribution (e.g., height of students)
# PDF: Probability density at a specific height (not a probability itself!)
# Area under curve (CDF): Probability that height is less than a value
prob_below_175 = norm.cdf(175, loc=170, scale=5)
print(f"CDF (Continuous): {prob_below_175:.4f}")
```

### 5. Why This Matters

Random variables and distributions are the language of **uncertainty**. In machine learning, every model—from a simple linear regression to complex neural networks—makes an underlying assumption about the distribution of its inputs and residuals (the error terms). Mastering these concepts allows you to:

1. Choose the right statistical test for your data (e.g., discrete vs. continuous targets).
    
2. Quantify the uncertainty in your predictions.
    
3. Design robust simulations that mimic real-world phenomena.
    

Would you like to explore how these definitions extend to **Expected Value and Variance**, or are you interested in how these distributions are used in practical data preprocessing?