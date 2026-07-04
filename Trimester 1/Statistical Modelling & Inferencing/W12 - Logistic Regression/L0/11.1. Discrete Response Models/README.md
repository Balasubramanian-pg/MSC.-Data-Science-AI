# Discrete Response Models: Logistic Regression and Maximum Likelihood Estimation

This document provides a rigorous technical analysis of Logistic Regression within the framework of Generalized Linear Models (GLMs). It details the structural failures of the Linear Probability Model, the mathematical formulation of the Logit link function, the derivation of Maximum Likelihood Estimators, and the computational algorithms required for production-grade binary classification.

> [!IMPORTANT]
> Logistic Regression is the foundational algorithm for modeling dichotomous outcomes ($Y \in \{0, 1\}$). Unlike Ordinary Least Squares (OLS) regression, which assumes a continuous, unbounded dependent variable, Logistic Regression utilizes a non-linear link function to map the linear predictor to the strict $[0, 1]$ probability space. Parameter estimation is performed via Maximum Likelihood Estimation (MLE), yielding asymptotically efficient, consistent estimators.

## [1. Concept Introduction](./1.%20Concept%20Introduction.md)

## [2. Intuition Section](./2.%20Intuition%20Section.md)

## [3. Mathematical Explanation](./3.%20Mathematical%20Explanation.md)

## [4. Formula Breakdowns](./4.%20Formula%20Breakdowns.md)

## [5. Step-by-Step Derivations](./5.%20Step-by-Step%20Derivations.md)

## [6. Real-World Analogies](./6.%20Real-World%20Analogies.md)

## [7. Python Implementations](./7.%20Python%20Implementations.md)

## [8. Python Simulations](./8.%20Python%20Simulations.md)

## [9. Practical Engineering Examples](./9.%20Practical%20Engineering%20Examples.md)
