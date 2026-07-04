# Question 2

**Correct Answer:** ✅ **A. Missing values appear at the start of the dataset**

**Why:** Creating lag features shifts values downward, leaving the first few rows without historical observations.

**Elimination:**

* ❌ **B. Future values are added to the dataset** → Lag features use past values, not future values.
* ❌ **C. Data is transformed into categorical variables** → Lagging does not change data type.
* ❌ **D. The timestamps are removed** → Timestamps remain unchanged.

**Confidence:** **100%**
