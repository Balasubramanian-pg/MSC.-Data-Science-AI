# Week 7 Practice Quiz 

<img width="493" height="765" alt="image" src="https://github.com/user-attachments/assets/ccb027c1-f59b-484c-8e47-2f543c9a3b79" />

## Question 1

**Correct Answer:** ✅ **B. To capture local trends and smooth noise**

**Why:** Rolling statistics (moving averages, rolling std, etc.) are used to smooth short-term fluctuations and reveal underlying trends.

**Elimination:**

* ❌ **A. To perform one-hot encoding** → Unrelated to time-series analysis.
* ❌ **C. To increase the frequency of time stamps** → Frequency changes are done via resampling.
* ❌ **D. To delete outliers from the data** → Rolling statistics do not inherently remove outliers.

**Confidence:** **100%**

## Question 2

**Correct Answer:** ✅ **A. Missing values appear at the start of the dataset**

**Why:** Creating lag features shifts values downward, leaving the first few rows without historical observations.

**Elimination:**

* ❌ **B. Future values are added to the dataset** → Lag features use past values, not future values.
* ❌ **C. Data is transformed into categorical variables** → Lagging does not change data type.
* ❌ **D. The timestamps are removed** → Timestamps remain unchanged.

**Confidence:** **100%**

## Question 3

**Correct Answer:** ✅ **D. The market is overbought**

**Why:** In RSI analysis, values above **70** typically indicate overbought conditions.

**Elimination:**

* ❌ **A. There is no trading activity** → RSI measures momentum, not trading activity.
* ❌ **B. The market is oversold** → Oversold is usually RSI below 30.
* ❌ **C. A neutral trend is observed** → Neutral RSI is generally around 50.

**Confidence:** **100%**

## Question 4

**Correct Answer:** ✅ **B. Heart Rate Variability (HRV)**

**Why:** HRV is a healthcare-specific physiological feature widely used in medical time-series analysis.

**Elimination:**

* ❌ **A. Bollinger Bands** → Finance-specific indicator.
* ❌ **C. RSI (Relative Strength Index)** → Finance-specific indicator.
* ❌ **D. SMA (Simple Moving Average)** → General/financial indicator, not healthcare-specific.

**Confidence:** **100%**

## Question 5

**Correct Answer:** ✅ **D. Lag of previous values**

**Why:** Month, hour, and day are extracted directly from timestamps. Lag values are created from the target/series history, not directly from the timestamp itself.

**Elimination:**

* ❌ **A. Month of the year** → Common timestamp-derived feature.
* ❌ **B. Hour of the day** → Common timestamp-derived feature.
* ❌ **C. Day of the week** → Common timestamp-derived feature.

**Confidence:** **95%**

## Final Answers

| Q | Answer |
| - | ------ |
| 1 | **B**  |
| 2 | **A**  |
| 3 | **D**  |
| 4 | **B**  |
| 5 | **D**  |

**Overall confidence: 99%**. These are standard time-series feature engineering concepts.


Let us now move to [week 8 quiz](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W08%20-%20Automated%20Feature%20Engineering/Quiz.md)
