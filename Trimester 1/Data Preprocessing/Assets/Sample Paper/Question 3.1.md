## Question 3.1 [5 Marks]

This question tests whether you can **identify the data quality problem, choose the right preprocessing technique, and explain why it is appropriate**.

### Recommended Answer Structure

| Issue                                                     | Data Quality Problem          | Preprocessing Technique                 | Justification                                                                                                                                                                                                           |
| --------------------------------------------------------- | ----------------------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Missing monthly recharge amounts**                      | Missing data                  | **Imputation**                          | Replace missing values using an appropriate method such as median or mean. Median is preferable if recharge amounts are skewed because it is less affected by extreme values.                                           |
| **Invalid customer ages**                                 | Invalid / inconsistent data   | **Validation and correction / removal** | Apply business rules such as a reasonable age range. Invalid values should be corrected if the true value is available; otherwise, they can be replaced or treated as missing.                                          |
| **Duplicate customer IDs**                                | Duplicate records             | **Deduplication**                       | Identify duplicate customer IDs and retain the correct or most recent customer record to prevent the same customer from being counted multiple times.                                                                   |
| **Different spellings of city names**                     | Inconsistent categorical data | **Standardization**                     | Map variations such as `Mumbai`, `Mumabi`, and `Bombay` to the approved standardized city name. This prevents the same city from being treated as multiple categories.                                                  |
| **Extremely high recharge values due to typing mistakes** | Outliers / erroneous data     | **Outlier detection and correction**    | Identify unusually high values using methods such as IQR or domain-specific limits. Since the extreme values are known to be typing errors, they should be corrected or treated as missing rather than simply retained. |
| **Blank occupation values**                               | Missing categorical data      | **Categorical imputation**              | Replace missing occupation with the mode, an `Unknown` category, or another suitable category based on the missingness pattern. This preserves the records without falsely assigning an occupation.                     |

### Detailed Explanation

#### 1. Missing monthly recharge amounts

**Problem:** Missing data.

**Technique:** Imputation.

For example, the missing recharge amount could be replaced with the **median recharge amount**.

**Why:** Recharge amounts may be highly skewed because some customers recharge much more than others. Median imputation is therefore more robust than mean imputation.

#### 2. Invalid customer ages

**Problem:** Invalid or erroneous values.

For example, an age of `-5` or `250` is not realistic.

**Technique:** **Data validation and correction.**

Define valid business rules for age and identify values outside the acceptable range. If the correct value cannot be recovered, the invalid value can be treated as missing and subsequently imputed.

**Why:** Using impossible ages directly could introduce misleading patterns into the churn model.

#### 3. Duplicate customer IDs

**Problem:** Duplicate records.

**Technique:** **Deduplication.**

Identify duplicate customer IDs and determine which record should be retained based on transaction date, record status, or data source priority.

**Why:** Duplicate customers can cause certain customers to receive excessive weight during model training and distort churn predictions.

#### 4. Different spellings of city names

**Problem:** Inconsistent categorical values.

**Technique:** **Standardization.**

For example:

`Mumbai`, `Mumabai`, `Bombay` → `Mumbai`

**Why:** Without standardization, the model may treat different spellings as separate cities, creating unnecessary categories and reducing data quality.

#### 5. Extremely high recharge values

**Problem:** Outlier caused by a data entry error.

**Technique:** **Outlier detection followed by correction or removal.**

Methods such as **IQR** or domain-specific thresholds can identify suspicious values.

**Why:** Because the question explicitly states that the extreme values are typing mistakes, simply capping the values is not necessarily appropriate. The preferred approach is to **correct the value if possible**, otherwise treat it as invalid/missing.

#### 6. Blank occupation values

**Problem:** Missing categorical data.

**Technique:** **Categorical imputation**, such as using the mode or an `Unknown` category.

**Why:** Occupation is categorical, so numerical methods such as mean imputation are inappropriate. Using `Unknown` can also be preferable when the missingness itself may contain information about customer behaviour.

### Final Exam Summary

**Missing recharge → Missing data → Imputation → Fill missing numerical values appropriately.**

**Invalid age → Invalid data → Validation/correction → Remove or correct impossible values.**

**Duplicate IDs → Duplicate data → Deduplication → Prevent duplicate customers from biasing the model.**

**City spellings → Inconsistent data → Standardization → Create consistent categorical values.**

**Extreme recharge → Outlier/error → Outlier detection + correction → Remove the effect of data-entry mistakes.**

**Blank occupation → Missing categorical data → Mode/Unknown imputation → Preserve records without introducing inappropriate numerical values.**
