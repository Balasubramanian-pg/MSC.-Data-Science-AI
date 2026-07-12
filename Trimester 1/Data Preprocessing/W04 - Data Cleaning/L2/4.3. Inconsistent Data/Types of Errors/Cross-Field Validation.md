# Cross-Field Validation

Suppose:

|Age|Salary|
|---|---|
|12|₹50,000|

The system may define the rule:

$$
Age < 18 \Rightarrow Salary = 0
$$

Violation of this rule signals inconsistency.

These validation systems are extremely common in enterprise preprocessing pipelines.
