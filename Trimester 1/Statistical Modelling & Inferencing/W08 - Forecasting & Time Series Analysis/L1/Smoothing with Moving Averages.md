---

## Reading Material: Smoothing with Moving Averages

---

### 1. The Philosophy of Smoothing: [Signal](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#[signal](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#signal)) Extraction

In time series analysis, we operate under the assumption that the observed data ($Y_t$) is a composite: a mix of the true "[signal](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#[signal](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#signal))" and "[noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#[noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#noise))." Smoothing is essentially a low-pass filter. It works by suppressing high-frequency oscillations (the [noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#[noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#noise))) while preserving the low-frequency components (the trend and cyclical patterns).

The choice of smoothing method is a trade-off between **smoothness** (how much [noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#[noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#noise)) is removed) and **fidelity** (how much of the original trend information is retained).

### 2. The Mechanics of the Moving Average

The moving average is the workhorse of smoothing. It operates on the principle of a **rolling window**.

#### Simple Moving Average (SMA)

For a window of size $k$, the smoothed value $\hat{Y}_t$ is calculated as the arithmetic [mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#mean) of the current observation and the previous $(k-1)$ observations:

$$\hat{Y}_t = \frac{1}{k} \sum_{i=0}^{k-1} Y_{t-i}$$

- **The Window ($k$):** This is your tuning parameter. A smaller $k$ keeps the trend responsive but retains more [noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#[noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#noise)). A larger $k$ produces a very "clean" line but introduces "lag"—the smoothed [signal](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#[signal](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#signal)) will appear shifted in time, potentially missing the exact point where a trend changes.
    

#### Centered Moving Average

If you are analyzing historical data and do not need a real-time forecast, you use a **centered** moving average. This averages observations before and after the current point $t$, effectively eliminating the lag issue:

$$\hat{Y}_t = \frac{1}{2k+1} \sum_{i=-k}^{k} Y_{t+i}$$

### 3. Advanced Smoothing Techniques

When the Simple Moving Average is too restrictive, analysts turn to more sophisticated methods:

- **Weighted Moving Average (WMA):** Not all past data is equally relevant. WMA assigns higher weights to more recent observations, allowing the trend to be more responsive to recent shifts while still filtering out [noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#[noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#noise)).
    
- **Exponential Smoothing (EMA):** This is a recursive approach where the weight of older observations decreases exponentially as we go back in time. It is defined as:
    
    $$\hat{Y}_t = \alpha Y_t + (1 - \alpha) \hat{Y}_{t-1}$$
    
    where $\alpha$ (the smoothing factor) is between 0 and 1. A high $\alpha$ makes the model highly responsive to current data (closer to the raw data), while a low $\alpha$ makes it extremely smooth.
    

### 4. Why Smoothing Matters in Business Strategy

Smoothing is not just a data transformation; it is a management tool.

- **Decoupling [Noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#[noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#noise)) from Signals:** By smoothing revenue data, you prevent "over-reacting" to a bad week or an uncharacteristically good month, allowing leadership to focus on the actual growth trajectory.
    
- **Baseline for Anomaly Detection:** Once the smoothed trend is established, you can identify anomalies. If a data point deviates significantly from the smoothed moving average, it acts as a "trigger" for further investigation (e.g., a potential supply chain error or a sudden change in customer behavior).
    

### [Moving Forward](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W10 - Cluster Analysis - Cluster Analysis - Cluster Analysis - Cluster Analysis/L0/Module%2010%20-%20Cluster%20Analysis.md#moving-forward)

Smoothing gives us a clear look at the trend, but it often hides the "seasonal" nuances that are critical for industries like pharmaceuticals, where demand spikes at predictable intervals.

Would you like to explore **Seasonal Decomposition** to isolate those patterns, or would you like to see the Python implementation of these smoothing techniques using a standard library like `pandas` or `statsmodels`?

### Deep Dive: The Mechanics and Implications of the Simple Moving Average (SMA)

The Simple Moving Average (SMA) is the most intuitive approach to [signal](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#[signal](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#signal)) extraction. By transforming a volatile, "jagged" series into a smoother curve, we reduce the variance of the random component ($\epsilon_t$) while preserving the underlying trend.

#### The Sliding Window Geometry
![[Pasted image 20260525121538.png]]
The term "moving" refers to the computational window that shifts one time step forward for every new calculation.

- **Centered Windows:** As you noted, $k$ is usually odd. This allows for a **perfectly centered** average. For a 3-point average at time $t$, you are pulling one observation from the past ($t-1$), the current observation ($t$), and one from the future ($t+1$).
    
- **Edge Effects:** A significant technical challenge with centered SMAs is the "endpoints." If you have 100 days of data, you cannot calculate a centered 3-point moving average for Day 1 or Day 100 because you lack the "future" data for the first point and the "past" data for the last. Analysts often solve this by using trailing averages at the boundaries or simply accepting the truncation of the series.
    

#### The Impact of Window Size ($k$)

Choosing $k$ is not arbitrary; it is a balancing act between **Bias** and **Variance**:

|**Window Size (k)**|**Impact on Smoothness**|**Responsiveness to Trend**|**Risk**|
|---|---|---|---|
|**Small (e.g., $k=3$)**|Low (remains noisy)|High (tracks quick changes)|Retains too much "white [noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#[noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#noise))."|
|**Large (e.g., $k=13$)**|High (very smooth)|Low (significant lag)|"Smooths out" actual trend reversals.|

#### Mathematical Limitations: The "Lag" Problem

The fundamental drawback of the SMA is **phase shift** or **lag**. Because the SMA incorporates past values, the smoothed [signal](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#[signal](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#signal)) often "chases" the actual trend. In a business context, this means that if your revenue takes a sharp upturn on Day 50, the smoothed line might not reflect that full change until Day 52 or 53.

- **In-Sample Analysis:** If you are analyzing last year's sales, lag is acceptable because you can use centered averages to eliminate it.
    
- **Forecasting:** If you are projecting tomorrow's demand, you are restricted to a **trailing** (or one-sided) moving average:
    
    $$\hat{Y}_{t+1} = \frac{1}{k} \sum_{i=0}^{k-1} Y_{t-i}$$
    
    This **must** inherently include lag, as it is composed strictly of historical data.
    

#### When to Use SMA vs. More Complex Models
![[Pasted image 20260525121119.png]]
The SMA is an "equal-weight" model—it assumes that a data point from 3 days ago is just as important as the data point from yesterday.

- **Use SMA when:** The [signal-to-noise ratio](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#[signal](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#[signal](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#signal))-to-[noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#[noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#noise))-ratio) is relatively stable and you need a quick, explainable, and transparent baseline.
    
- **Move beyond SMA when:** You detect that recent history is more predictive than distant history (requiring Weighted Moving Averages or Exponential Smoothing) or when there is strong seasonality (requiring STL or SARIMA models).
    

Would you like to move into how we handle the "lag" issue using **Weighted Moving Averages**, or would you like to see how we implement a 5-point SMA in Python to filter out [noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#[noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#noise)) from a sample dataset?

### 2.1 Applied Mechanics: Walking Through the Calculation

The [example](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#example) you provided highlights the "data loss" phenomenon inherent in **centered** moving averages. When we align the average to the middle of the window, the observations at the very start and the very end of your timeline become "orphaned" because they lack the necessary neighbors to complete the calculation.

#### [Visualization](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/The%20Coefficient%20of%20Determination%20%28R%C2%B2%29.md#visualization) of the Window Shift

To see why this happens, think of the 3-point moving average as a physical frame that covers three consecutive weeks. As the frame slides, it requires a "before" and "after" for every "now."

#### Expanded Calculation Table

To visualize exactly how the [signal](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#[signal](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#signal)) is being compressed, we can map your data into a structured format. This clarifies why the first and last weeks of your original series are omitted in the final output:

|**Week (t)**|**Sales (Yt​)**|**Window Used**|**Calculation**|**Smoothed (Y^t​)**|
|---|---|---|---|---|
|**1**|10|-|-|**(Null)**|
|**2**|12|(10, 12, 11)|$33 / 3$|**11.00**|
|**3**|11|(12, 11, 15)|$38 / 3$|**12.67**|
|**4**|15|(11, 15, 14)|$40 / 3$|**13.33**|
|**5**|14|(15, 14, 16)|$45 / 3$|**15.00**|
|**6**|16|(14, 16, 18)|$48 / 3$|**16.00**|
|**7**|18|-|-|**(Null)**|

### Strategic Implications of Data Loss
![[Pasted image 20260525120918.png]]
While losing the first and last data points may seem like a minor technicality, in a business context, it carries two major implications:

1. **The "Current Status" Blind Spot:** Notice that your most recent week (Week 7, where Sales = 18) does not have a corresponding smoothed value. If you are a business analyst trying to decide on inventory for Week 8, you have lost your most relevant data point in the smoothed series.
    
    - _Solution:_ Analysts often use a **Trailing Moving Average** (averaging the last $k$ periods including the current one) to ensure the current week is represented, accepting that this introduces a slight **lag** in the trend.
        
2. **Boundary Sensitivity:** The smoothing at the edges (e.g., Week 2) is highly sensitive to outliers. If Week 1 had been an anomalous 50 instead of 10, the smoothed value for Week 2 would have been skewed significantly.
    

#### Bridging the Gap

To fix these issues, practitioners often use:

- **Padding:** Filling the missing $Y_0$ and $Y_8$ with forecasted values or historical averages from a previous cycle.
    
- **Asymmetric Windows:** Using a 2-point average for the very first and last observations, though this changes the "smoothing intensity" relative to the rest of the series.
    

Would you like to see how we could write a Python function to handle these edge cases automatically using `pandas` (which has built-in arguments for window handling), or should we continue into the next component of decomposition: **Seasonality**?

### 3. The Window Size ($k$): Balancing Fidelity and Lag

The parameter $k$ is the "control knob" of your smoothing filter. It defines the **bandwidth** of your moving average. Choosing the wrong $k$ is the most common error in exploratory data analysis, often resulting in either "over-smoothing" (hiding the truth) or "under-smoothing" (getting distracted by [noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#[noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#noise))).

#### The Bias-Variance Trade-off in Smoothing
![[Pasted image 20260525120609.png]]
In time series, we have a specific type of bias-variance trade-off:

- **Low $k$ (High Variance, Low Bias):** The model is "jittery." It captures the [noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#[noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#noise)) ($\epsilon_t$) as if it were a structural change. You risk reacting to a random spike in demand as if it were a new, sustained growth trend.
    
- **High $k$ (Low Variance, High Bias):** The model is "sluggish." By averaging over a wide window, you dampen the impact of sharp, legitimate changes in the business environment. This introduces significant **lag**, meaning your smoothed [signal](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#[signal](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#signal)) might tell you a trend has shifted long after the market has actually moved on.
    

#### Defining the "Optimal" $k$

There is no "golden rule" for $k$, but there is a logical heuristic: **$k$ should match the periodicity of your data's [noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#[noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#noise)).**

1. **Understand the Frequency:** If your data is weekly and you know that "holiday shopping" creates a 4-week cycle of [noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#[noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#noise)), a $k < 4$ will be ineffective at removing that specific fluctuation.
    
2. **Visual Inspection (The "Eyeball" Test):** Plot your raw data against multiple SMA lines (e.g., $k=3, 7, 12$). You are looking for the "elbow" where the line becomes smooth enough to see the slope, but not so smooth that it flattens out significant peaks or troughs.
    
3. **Cross-Validation:** If you are using these smoothed values for forecasting, you can test different $k$ values to see which one results in the lowest **[Mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W04 - Estimation And Hypothesis Testing Cont/L2/Testing%20Population%20Proportions.md#mean) Absolute Error (MAE)** against actual historical outcomes.
    

#### The "Lost Data" Penalty

As you rightly noted, larger $k$ values destroy your ability to see the "now." If you use a 9-point centered moving average, you effectively lose 4 weeks of data at the start and 4 weeks at the end of your series.

- **Business Impact:** In a fast-moving pharmaceutical market—where demand data distribution (DDD) can change weekly due to new competitor entrants or supply chain disruptions—losing 8 weeks of analytical visibility (4 at the start, 4 at the end) is often unacceptable.
    
- **Mitigation Strategy:** Analysts often use **Asymmetric Smoothing** or **Exponential Smoothing (EMA)** for the most recent data points. EMA (as discussed earlier) does not suffer from the same "boundary loss" as SMA because it never truly "loses" the past; it just discounts it.
    

### Comparison of Sensitivity to Window Size

|**Feature**|**Small Window (k=3)**|**Large Window (k=9+)**|
|---|---|---|
|**[Noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#[noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#noise)) Reduction**|Minimal|High|
|**Trend Preservation**|High (captures sharp turns)|Low (blunts sharp turns)|
|**Lag**|Negligible|Substantial|
|**Data Loss**|Low (only 1 point at each end)|High (multiple points at each end)|
|**Best Used For**|Short-term operational tracking|Long-term strategic planning|

### Practical Application: How to Decide

If you were looking at your pharmaceutical product sales, how would you decide between $k=3$ and $k=9$?

- **Use $k=3$** if you need to monitor daily sales volatility for a highly responsive supply chain where stockouts are a major risk.
    
- **Use $k=9$ (or higher)** if you are reporting to senior leadership on quarterly market share growth, where the "[noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#[noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#noise))" of weekly fluctuations is irrelevant to the long-term trend.
    
![[Pasted image 20260525120314.png]]
Would you like to explore **how to mathematically quantify the lag** introduced by different $k$ values, or are you ready to dive into **Seasonal Decomposition** to see how we handle patterns that aren't just random [noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#[noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#noise)), but fixed, periodic cycles?

### 4. Advanced Smoothing: Centered Averages and Classical Decomposition

The transition from simple moving averages (SMA) to **centered** moving averages (CMA) is a prerequisite for professional-grade time series analysis, especially when dealing with data that exhibits inherent calendar-based rhythms.

#### The Problem of Even-Numbered Windows

When $k$ is an even number (e.g., $k=4$ for quarterly data), the average falls _between_ time periods. If you have data for Q1, Q2, Q3, and Q4, the average of these four points falls at 2.5—a point that does not exist in your dataset.

To "re-center" this, we apply a **centered moving average of an even order**. We take a 4-point MA, and then average that result with the _next_ 4-point MA. This "2-by-4" MA aligns the result perfectly with the third quarter, creating a valid, time-aligned estimate.

#### Classical Decomposition: The Smoothing Foundation
![[Pasted image 20260525120506.png]]
Classical decomposition (also known as the additive decomposition model) relies on the moving average to extract the **Trend-Cycle ($T_t$)**.

1. **Extract the Trend:** Use a centered moving average (e.g., 12-month MA for monthly data) to calculate $\hat{T}_t$. This filter is specifically chosen because it spans one full year, meaning the "seasonal" highs and lows in that window cancel each other out.
    
2. **Detrend the Data:** Subtract the trend from the original series to isolate the seasonal and irregular components: $Y_t - \hat{T}_t = S_t + I_t$.
    
3. **Average the Seasonality:** To find the seasonal component ($S_t$), you take all the values for January across multiple years and average them (and repeat for all 12 months).
    
4. **Extract Irregularity:** Finally, the remaining [noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W06 - Simple Linear Regression/L2/Testing%20for%20Significance%20in%20Regression.md#[noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Significance%20Testing%20and%20Multicollinearity.md#noise)) ($I_t$) is what is left after subtracting both the Trend and the Seasonality from your original data.
    

#### The "Real-World" Limitations: Why We Evolve

As noted, SMA and CMA have three critical weaknesses that lead analysts to adopt more advanced methods like **Exponential Smoothing (ETS)** or **SARIMA**:

- **The "Equal Weight" Fallacy:** SMA assumes a observation from 6 months ago is as important as last month's result. In business, market dynamics usually dictate that the most recent data is significantly more representative of the future.
    
- **The "End-of-Series" Blind Spot:** The inability to compute values for the most recent periods is a major hurdle for tactical planning.
    
- **Lack of Flexibility:** SMA cannot adapt its smoothing parameter. If your volatility changes (e.g., a quiet period followed by a chaotic market), the SMA cannot "learn" to adjust its window size on the fly.
    

#### Moving Toward Exponential Smoothing (ETS)

Exponential Smoothing resolves these by introducing a smoothing constant, $\alpha$ (alpha). Instead of an equal window, it uses a **weighted average**:

$$\hat{Y}_{t+1} = \alpha Y_t + \alpha(1-\alpha)Y_{t-1} + \alpha(1-\alpha)^2 Y_{t-2} + \dots$$

This gives the highest weight to the most recent observation ($Y_t$) and exponentially decaying weights to the past. It effectively retains the entire history of the series without requiring a fixed $k$, and crucially, it allows us to project values _forward_ in time.

### Comparison of Smoothing Methodologies

|**Feature**|**Moving Averages (SMA/CMA)**|**Exponential Smoothing (ETS)**|
|---|---|---|
|**Data Weighting**|Equal|Exponentially decaying (Recent > Past)|
|**[Response](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#[response](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L1/The%20Multiple%20Regression%20Model.md#[response](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W07 - Multiple Regression/L2/Model%20Assessment%20and%20Adjusted%20R%C2%B2.md#response))) to Recent Data**|Rigid (fixed $k$)|Adaptive (determined by $\alpha$)|
|**End-of-Series Data**|Loss (truncated)|Full coverage (recursive)|
|**Complexity**|Low (easy to explain)|Moderate (requires parameter optimization)|

**Would you like to see the mathematical derivation of why a 12-month moving average is the standard for monthly seasonal data, or would you like to compare how an Exponential Smoothing model would handle the "lag" problem compared to the SMA we calculated earlier?**

Tags: #statistics #machine-learning #data-science #statistical-modelling