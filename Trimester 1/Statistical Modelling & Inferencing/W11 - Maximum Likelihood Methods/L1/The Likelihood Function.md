---
title: W11 - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods
module: Statistical Modelling And Inferencing
week: W11 - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods
---

### The Likelihood Function: The Engine of MLE

To move from the [intuition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[intuition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[intuition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#[intuition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Residual%20Analysis.md#intuition)))) of "picking the most likely parameter" to actually _calculating_ it, we use the **Likelihood Function**. This function is the mathematical bridge that quantifies how plausible any given parameter value is, based strictly on the data you have already observed.

#### 1. The Workflow: From Data to Maximum

To find the MLE, you follow a rigorous mathematical "recipe":

1. **Define the Likelihood Function $L(\theta | \text{Data})$:** You construct a [formula](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#formula) that relates your parameter ($\theta$) to the observed data.
    
2. **Take the Derivative:** You calculate the derivative of this function with respect to the parameter. This measures the slope of [the likelihood surface](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W11 - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods - Maximum Likelihood Methods/L1/Maximum%20Likelihood%20Estimation.md#the-likelihood-surface).
    
3. **Set to Zero:** You find the "critical points" where the slope is zero—the peaks or valleys of the function.
    
4. **Second Derivative Test:** You confirm that your critical point is a **maximum** (the peak), not a minimum (a valley).
    

#### 2. The Power of Log-Likelihood

In practice, we almost never maximize the raw likelihood function $L(\theta)$. Instead, we maximize the **Log-Likelihood** ($\ell(\theta) = \ln(L(\theta))$).

**Why the Log?**

- **Mathematical Convenience:** Likelihood functions are often products of many individual [probabilities](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W01 - Basic Probability & Statistics/L2/Reading%201%20An%20Introduction%20to%20Decision%20Theory.md#probabilities). Calculating the derivative of a massive product is a calculus nightmare. The logarithm turns these **products into sums**, which are far easier to differentiate.
    
- **Monotonicity:** The natural logarithm is a _monotonically increasing function_. This is crucial because it guarantees that the value of $\theta$ that maximizes the log-likelihood is **exactly the same** as the value that maximizes the original likelihood function.
    

#### 3. [Summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W01 - Basic Probability & Statistics/L2/Reading%202%20Parametric%20vs.%20Non-Parametric%20Methods.md#[summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#[summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L1/The%20Multiple%20Regression%20Model.md#summary))) of the Methodology

When we call it "Maximum Likelihood Estimation," we are describing exactly what we are doing: finding the point where the data is most "likely" to have been generated by a specific parameter. By using the **Log-Likelihood**, we maintain the integrity of our peak while making the calculation stable and efficient.

|**Step**|**Action**|**Statistical Goal**|
|---|---|---|
|**Construct**|Define $L(\theta)$|Relate parameters to observed data.|
|**Transform**|Take $\ln(L(\theta))$|Simplify products to sums for easier math.|
|**Optimize**|$\frac{d}{d\theta} \ell(\theta) = 0$|Find the point of maximum plausibility.|
|**Verify**|Second Derivative Test|Ensure it's a maximum, not a minimum.|

**Strategic Note:** This process—constructing the function, taking the log, and using calculus to find the peak—is the universal "language" of statistical modeling. Whether you are doing simple coin flips or training complex neural networks, this workflow remains the exact same.

**Since we have covered the methodology, are you ready to see a concrete [example](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#example) of this "recipe" in action with a specific distribution, or would you like to discuss the numerical challenges that arise when the calculus becomes too complex for a direct derivative?**

Tags: #statistics #machine-learning #data-science #statistical-modelling