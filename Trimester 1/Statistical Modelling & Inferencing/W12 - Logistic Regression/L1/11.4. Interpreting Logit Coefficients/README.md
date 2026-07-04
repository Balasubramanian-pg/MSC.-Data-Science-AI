# Interpreting Logistic Regression Coefficients: Log-Odds, Odds Ratios, and Marginal Effects

This document provides a rigorous technical analysis of coefficient interpretation in logistic regression (logit) models. It details the mathematical transition from linear probability to log-odds, derives the formulas for odds ratios and marginal effects, and establishes the standard engineering practices for translating model parameters into actionable business insights.

> [!IMPORTANT]
> In a logistic regression model, the estimated coefficients ($\beta$) do **not** represent the change in the probability of the outcome for a unit change in the predictor. Instead, they represent the change in the **log-odds** of the outcome. To communicate model results effectively, coefficients must be transformed into Odds Ratios (OR) or Average Marginal Effects (AME).

## [1. Concept Introduction](./1.%20Concept%20Introduction.md)

## [2. Intuition Section](./2.%20Intuition%20Section.md)

## [3. Mathematical Explanation](./3.%20Mathematical%20Explanation.md)

## [4. Formula Breakdowns](./4.%20Formula%20Breakdowns.md)

## [5. Step-by-Step Derivations](./5.%20Step-by-Step%20Derivations.md)
