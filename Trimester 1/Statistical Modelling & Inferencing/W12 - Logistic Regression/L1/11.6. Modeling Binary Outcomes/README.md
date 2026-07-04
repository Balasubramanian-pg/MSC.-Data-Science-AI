# Binary Response Models: Linear Probability, Logit, and Probit Frameworks

This document provides a rigorous technical analysis of binary response models. It details the transition from continuous Ordinary Least Squares (OLS) regression to discrete Maximum Likelihood Estimation (MLE) frameworks, specifically the Linear Probability Model (LPM), Logit, and Probit models. It establishes the mathematical foundations for interpreting coefficients through log-odds, odds ratios, and marginal effects.

> [!IMPORTANT]
> Binary response models are a specialized class of Generalized Linear Models (GLMs). They model the conditional probability $P(Y=1|X)$ of a dichotomous outcome. Unlike OLS, which assumes a continuous, unbounded dependent variable with constant variance, binary models require non-linear link functions to bound predictions between 0 and 1 and account for the heteroskedasticity inherent in Bernoulli distributions.

## [1. Concept Introduction](./1.%20Concept%20Introduction.md)

## [2. Intuition Section](./2.%20Intuition%20Section.md)
