# 3.5.5. Handling Continuous Data Through Discretization

A common challenge arises when a dataset contains a mixture of categorical and continuous variables, and the data scientist wishes to apply a unified filter method.

Because the Chi-Square test strictly requires categorical data, continuous numerical features cannot be evaluated natively. To resolve this, continuous features must undergo a process called discretization.

Discretization involves converting a continuous numerical range into distinct categorical bins. For example, a continuous feature representing "age" can be binned into discrete categories such as "young," "middle-aged," and "senior." Once the continuous data is appropriately binned, the Chi-Square filter can evaluate its dependency against the target variable just like any native categorical feature.
