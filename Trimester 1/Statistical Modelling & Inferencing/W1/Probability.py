even_numbers = [2, 4, 6]
total_outcomes = 6

probability = len(even_numbers) / total_outcomes

print(probability)

# Output: 0.5

# Explanation:
# There are 3 even numbers (2, 4, 6) out of a total of 6 possible outcomes (1, 2, 3, 4, 5, 6). Therefore, the probability of rolling an even number on a six-sided die is 3/6, which simplifies to 0.5 or 50%.

from scipy.stats import bernoulli

# Probability of success
p = 0.7

sample = bernoulli.rvs(p)

print(sample)

from scipy.stats import binom

# Probability of exactly 7 heads in 10 tosses
probability = binom.pmf(
    k=7,
    n=10,
    p=0.5
)

print(probability)


