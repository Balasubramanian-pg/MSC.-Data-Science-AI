---
title: W01 - Basic Probability & Statistics
module: Statistical Modelling And Inferencing
week: W01 - Basic Probability & Statistics
---

### Introduction to Decision Theory

Decision Theory provides a rigorous, mathematical framework for optimal choice-making under conditions of uncertainty. In data science, this framework is essential for moving from descriptive analysis (what happened) to prescriptive action (what we should do).

### 1. The Decision Matrix (The Three Pillars)

Every decision problem can be modeled as an interaction between controlled actions and uncontrolled environmental states:

1. **Decision Alternatives (Actions $A$):** The set of choices under the decision-maker's control.
    
2. **States of Nature (States $S$):** Future scenarios or conditions outside the decision-maker's control.
    
    - _Requirement:_ They must be **mutually exclusive** (cannot occur simultaneously) and **collectively exhaustive** (one must occur).
        
3. **Payoffs ($P$):** The quantitative consequence resulting from an action given a state: $P(a, s)$.
    

### 2. Organizing the Decision Environment

A **Payoff Table** is the standard analytical tool to structure these interactions.

|**Alternatives**|**State 1 (e.g., Sunny)**|**State 2 (e.g., Rain)**|
|---|---|---|
|**Action A**|Payoff $P(A, S_1)$|Payoff $P(A, S_2)$|
|**Action B**|Payoff $P(B, S_1)$|Payoff $P(B, S_2)$|

### 3. Decision Environments (The Information Spectrum)

The approach to solving a decision problem changes based on the information available regarding the States of Nature ($S$):

#### 3.1 Decision Making Under Certainty

- **Logic:** The state $S_i$ is known with 100% probability.
    
- **Strategy:** Simply select $\max[P(a, S_i)]$.
    

#### 3.2 Decision Making Under Risk (Probabilistic)

- **Logic:** Probabilities $P(S_i)$ are known (e.g., from historical data or predictive modeling).
    
- **Strategy:** Calculate the **Expected Monetary Value (EMV)** for each action $A$:
    
    $$EMV(A) = \sum_{i} [P(A, S_i) \times P(S_i)]$$
    
- **Goal:** Maximize the expected utility or payoff over the long run.
    

#### 3.3 Decision Making Under Uncertainty (Non-Probabilistic)

- **Logic:** Probabilities are unknown or impossible to estimate.
    
- **Strategies based on Risk Appetite:**
    
    - **Maximax (Optimist):** Choose the action that offers the highest possible payoff ("Go big").
        
    - **Maximin (Pessimist):** Choose the action that maximizes the minimum possible payoff (the "safest" bad option).
        
    - **Laplace (Principle of Insufficient Reason):** Assign equal probability to all states ($1/N$) and use EMV (effectively treating it as a risk scenario).
        

### 4. Application in Data Science

Decision Theory is the backbone of **A/B testing**, **model deployment strategies**, and **cost-sensitive learning**. For [example](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#example), in credit scoring:

- **Actions:** {Approve Loan, Deny Loan}
    
- **States:** {Customer Repays, Customer Defaults}
    
- **Payoffs:** Represented as a cost-benefit matrix (e.g., the cost of a false negative—approving a default—often outweighs the benefit of a true positive).
    

### Implementation: Expected Value in Python

```Python
import pandas as pd

## Payoff Table
data = {'Sunny': [10, 6], 'Rain': [2, 7]}
df = pd.DataFrame(data, index=['Picnic Outdoors', 'Picnic Indoors'])

## Probabilities
prob_sunny = 0.7
prob_rain = 0.3

## Calculate EMV
df['EMV'] = (df['Sunny'] * prob_sunny) + (df['Rain'] * prob_rain)

print(df)
## The optimal choice is the action with the highest EMV
```

**Would you like to move into decision-making with sequential events using Decision Trees, or discuss how Loss Functions (the statistical equivalent of negative payoffs) are used to train machine learning models?**

Tags: #statistics #machine-learning #data-science #statistical-modelling