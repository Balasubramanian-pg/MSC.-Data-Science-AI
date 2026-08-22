**Part (b)**
*   **(i) What is feature construction? [2 Marks]**
    Feature construction is the manual process of creating new features from existing raw data to highlight underlying patterns or relationships. It involves applying mathematical formulas, domain knowledge, or logical operations to combine or transform variables, thereby increasing the predictive power of the model.
*   **(ii) Suggest one new feature from `MonthlyIncome` and `MonthlyExpense` and explain its usefulness. [3 Marks]**
    *   **Constructed Feature:** `Savings` (Calculated as `MonthlyIncome` - `MonthlyExpense`) or `SavingsRatio` (Calculated as `Savings` / `MonthlyIncome`).
    *   **Usefulness:** This feature explicitly represents a person's disposable income and financial health. In a use case like predicting loan default, a person's actual remaining money (`Savings`) is a far stronger and more direct predictor of their ability to repay a loan than looking at their income and expenses separately.
