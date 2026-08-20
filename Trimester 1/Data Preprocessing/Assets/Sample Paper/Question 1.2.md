# Question 1.2 [5 Marks]

An e-commerce company wants to perform the following analyses:
- Predict whether a customer is likely to return a purchased product.
- Discover groups of customers based on browsing behaviour.
- Recommend products that are frequently bought together.
- Estimate the future spending value of each customer.

For each business objective,<br>
i. Identify whether it is Predictive or Descriptive data mining.<br>
ii. Recommend one suitable analytical technique.<br>
iii. Justify your recommendation.


This question is testing whether you can **identify the type of data mining problem, choose an appropriate technique, and justify why that technique fits the business objective**.

A clean structure is:

| Business Objective                                                | Type            | Suitable Technique          | Why?                                                                                                                                                                                           |
| ----------------------------------------------------------------- | --------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1. Predict whether a customer will return a purchased product** | **Predictive**  | **Classification**          | The outcome has predefined categories, such as *Return* or *Not Return*. A classification model can learn from historical customer and purchase data to predict the outcome for new purchases. |
| **2. Discover groups of customers based on browsing behaviour**   | **Descriptive** | **Clustering**              | There is no predefined customer group. Clustering automatically groups customers with similar browsing patterns, such as pages viewed, session duration, and product categories visited.       |
| **3. Recommend products that are frequently bought together**     | **Descriptive** | **Association Rule Mining** | Association rules identify relationships between products frequently purchased together, such as customers who buy a laptop also buying a laptop bag.                                          |
| **4. Estimate the future spending value of each customer**        | **Predictive**  | **Regression**              | Future spending is a numerical value. Regression can use historical purchases, frequency, recency, and customer behaviour to estimate the customer's future spending.                          |

### Recommended Answer Structure

For **each business objective**, answer using three parts:

**i. Type:** Predictive or Descriptive
**ii. Technique:** Name one suitable analytical technique
**iii. Justification:** Explain why that technique is appropriate for the objective.

### The key logic to remember

**Predictive vs Descriptive**

* **Predictive:** "What is likely to happen?"
  Examples: classification, regression
* **Descriptive:** "What patterns or groups exist?"
  Examples: clustering, association rule mining

So the final mapping is:

**Return prediction → Predictive → Classification**

**Customer grouping → Descriptive → Clustering**

**Frequently bought together → Descriptive → Association Rule Mining**

**Future spending → Predictive → Regression**

One subtle point: **recommendation systems can also be built using predictive techniques**, but given the wording "frequently bought together," **association rule mining** is the most direct answer for this question.
