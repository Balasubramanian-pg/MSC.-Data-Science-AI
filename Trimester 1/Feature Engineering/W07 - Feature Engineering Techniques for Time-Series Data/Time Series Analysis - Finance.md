Time series feature engineering in finance requires a transition from raw price data to structured, domain-informed indicators. By transforming daily OHLCV (Open, High, Low, Close, Volume) data into indicators like **Moving Averages**, **RSI**, and **Bollinger Bands**, you move from observing raw price movement to capturing the "market psychology" of momentum and volatility.

### 1. Foundational Engineering Toolkit

Beyond basic calendar features (`day_of_week`, `month`), you must capture the temporal "state" of the market:

- **Lag Features:** $X_{t-1}, X_{t-3}, X_{t-7}$. These provide the model with a direct look at the recent past.
    
- **Rolling Statistics:** 7-day rolling mean and standard deviation. These filter noise and provide an estimate of local volatility.
    
- **Trend/Slope:** By fitting a simple linear regression to a rolling window of 7 days, you can explicitly quantify the **directionality** (slope) of the recent trend.
    

### 2. Domain-Specific Indicators

These three indicators are the gold standard for adding "context" to stock price data.

#### **Moving Average (14-day)**

- **Theory:** A smoothed average of prices over a rolling window. It represents the "fair value" or local trend.
    
- **Implementation:** Equivalent to a `rolling(window=14).mean()` in pandas.
    

#### **Relative Strength Index (RSI)**

- **Theory:** A momentum oscillator (0–100) that measures the speed and change of price movements.
    
- **Interpretation:**
    
    - **RSI > 70:** Potential "Overbought" condition (price may pullback).
        
    - **RSI < 30:** Potential "Oversold" condition (price may rebound).
        
- **Implementation Logic:**
    
    1. Calculate price differences.
        
    2. Separate into "Gain" and "Loss" streams (clip negative values to 0 for gains).
        
    3. Calculate rolling averages of gains/losses.
        
    4. Compute RSI: $100 - (100 / (1 + \text{AvgGain} / \text{AvgLoss}))$.
        

#### **Bollinger Bands**

- **Theory:** Visualizes volatility by plotting the moving average $\pm$ 2 standard deviations.
    
- **Implementation:**
    
    - `Upper Band = RollingMean + (2 * RollingStd)`
        
    - `Lower Band = RollingMean - (2 * RollingStd)`
        
- **Usage:** Provides a dynamic range of "normal" market behavior; price excursions outside these bands are statistically significant indicators of high-volatility events.
    

### 3. Implementation Trade-offs & The "Golden Rules"

- **Data Leakage Prevention:** When building these features, **never use a centered window**. For a 14-day RSI, ensure you are only using the 14 days preceding time $t$. Using data at time $t$ to construct a feature for $t$ is a classic error that will lead to artificially high model accuracy.
    
- **Stationarity Concerns:** Raw stock prices are almost never stationary (they exhibit trends/drift). While technical indicators help, you may also need to **difference** your features (i.e., calculate $Price_t - Price_{t-1}$) to stabilize the mean and variance for your models.
    
- **Dimensionality vs. Signal:** While RSI and Bollinger bands are powerful, adding too many indicators can result in a "feature explosion." Use **Time Series Cross-Validation** to verify that your domain indicators are actually improving predictive accuracy rather than simply adding correlated noise.
    

**Summary for Practical Application:**

1. **Prepare:** Generate synthetic data (or import Yahoo Finance data).
    
2. **Transform:** Apply calendar features, lags, and rolling stats.
    
3. **Enhance:** Layer on domain indicators (RSI/Bollinger) for sophisticated market context.
    
4. **Validate:** Use forward-chaining cross-validation to assess performance.
    

**Would you like me to provide the Python code template for the custom RSI function and Bollinger Band calculations to get you started on the implementation phase?**