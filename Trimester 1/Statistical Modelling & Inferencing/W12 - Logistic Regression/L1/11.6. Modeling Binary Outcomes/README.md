# Binary Response Models: Linear Probability, Logit, and Probit Frameworks

This document provides a rigorous technical analysis of binary response models. It details the transition from continuous Ordinary Least Squares (OLS) regression to discrete Maximum Likelihood Estimation (MLE) frameworks, specifically the Linear Probability Model (LPM), Logit, and Probit models. It establishes the mathematical foundations for interpreting coefficients through log-odds, odds ratios, and marginal effects.

> [!IMPORTANT]
> Binary response models are a specialized class of Generalized Linear Models (GLMs). They model the conditional probability $P(Y=1|X)$ of a dichotomous outcome. Unlike OLS, which assumes a continuous, unbounded dependent variable with constant variance, binary models require non-linear link functions to bound predictions between 0 and 1 and account for the heteroskedasticity inherent in Bernoulli distributions.

## [1. Concept Introduction](./1.%20Concept%20Introduction.md)

## [2. Intuition Section](./2.%20Intuition%20Section.md)

## [3. Mathematical Explanation](./3.%20Mathematical%20Explanation.md)

## [4. Formula Breakdowns](./4.%20Formula%20Breakdowns.md)

## [5. Step-by-Step Derivations](./5.%20Step-by-Step%20Derivations.md)

## [6. Real-World Analogies](./6.%20Real-World%20Analogies.md)

## [7. Python Implementations](./7.%20Python%20Implementations.md)

## [8. Python Simulations](./8.%20Python%20Simulations.md)

## [9. Practical Engineering Examples](./9.%20Practical%20Engineering%20Examples.md)

## [10. Common Mistakes](./10.%20Common%20Mistakes.md)

## [11. Visual Intuition](./11.%20Visual%20Intuition.md)

## [12. Mermaid Diagrams](./12.%20Mermaid%20Diagrams.md)

## [13. Real-World Applications](./13.%20Real-World%20Applications.md)

## [14. Machine Learning Connections](./14.%20Machine%20Learning%20Connections.md)

## [15. Interview-Style Insights](./15.%20Interview-Style%20Insights.md)

## [16. Edge Cases](./16.%20Edge%20Cases.md)

## [17. Mental Models](./17.%20Mental%20Models.md)

## [18. Performance and Computational Insights](./18.%20Performance%20and%20Computational%20Insights.md)
