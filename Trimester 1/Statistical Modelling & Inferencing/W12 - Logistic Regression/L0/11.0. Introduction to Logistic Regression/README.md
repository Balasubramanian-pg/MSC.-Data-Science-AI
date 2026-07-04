# Binary Response Models: Linear Probability, Logit, and Probit Frameworks

This document provides a rigorous technical analysis of binary response models. It details the transition from continuous Ordinary Least Squares (OLS) regression to discrete Maximum Likelihood Estimation (MLE) frameworks, specifically the Linear Probability Model (LPM), Logit, and Probit models. 

> [!IMPORTANT]
> Binary response models are a specialized class of Generalized Linear Models (GLMs). They model the conditional probability $P(Y=1|X)$ of a dichotomous outcome. Unlike OLS, which assumes a continuous, unbounded dependent variable with constant variance, binary models require non-linear link functions to bound predictions between 0 and 1 and account for heteroskedasticity inherent in Bernoulli distributions.

## [1. Concept Introduction](./1.%20Concept%20Introduction.md)

## [2. Intuition Section](./2.%20Intuition%20Section.md)

## [3. Mathematical Explanation](./3.%20Mathematical%20Explanation.md)

## [4. Formula Breakdowns](./4.%20Formula%20Breakdowns.md)

## [5. Step-by-Step Derivations](./5.%20Step-by-Step%20Derivations.md)

## [6. Real-World Analogies](./6.%20Real-World%20Analogies.md)

## [7. Python Implementations](./7.%20Python%20Implementations.md)

## [8. Practical Engineering Examples](./8.%20Practical%20Engineering%20Examples.md)

## [9. Common Mistakes](./9.%20Common%20Mistakes.md)

## [10. Visual Intuition](./10.%20Visual%20Intuition.md)

## [11. Mermaid Diagrams](./11.%20Mermaid%20Diagrams.md)

## [12. Machine Learning Connections](./12.%20Machine%20Learning%20Connections.md)

## [13. Interview-Style Insights](./13.%20Interview-Style%20Insights.md)

## [14. Edge Cases](./14.%20Edge%20Cases.md)

## [15. Mental Models](./15.%20Mental%20Models.md)

## [16. Performance and Computational Insights](./16.%20Performance%20and%20Computational%20Insights.md)

## [17. Advanced Notes](./17.%20Advanced%20Notes.md)

## [18. Final Takeaways](./18.%20Final%20Takeaways.md)
