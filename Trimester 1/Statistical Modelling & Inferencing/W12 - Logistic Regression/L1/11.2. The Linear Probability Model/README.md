# The Linear Probability Model: Theoretical Foundations and Structural Limitations

This document provides a rigorous technical analysis of the Linear Probability Model (LPM). It details the mathematical formulation of applying Ordinary Least Squares (OLS) to binary dependent variables, derives the structural violations of OLS assumptions, and establishes the engineering contexts where the LPM remains a viable baseline despite its theoretical flaws.

> [!IMPORTANT]
> The Linear Probability Model is the naive application of multiple linear regression to a binary dependent variable $Y \in \{0, 1\}$. While it violates the Gauss-Markov assumptions regarding error distribution and homoskedasticity, it remains a critical baseline in econometrics and causal inference due to its computational efficiency, direct interpretability of coefficients as marginal effects, and compatibility with high-dimensional fixed effects.
