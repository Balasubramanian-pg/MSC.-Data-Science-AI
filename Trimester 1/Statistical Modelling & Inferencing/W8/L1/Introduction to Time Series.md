### 1. Advanced [Definition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W1/L1/Probability%20and%20Distribution.md#[definition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W6/L2/Residual%20Analysis.md#[definition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W6/L2/Residual%20Analysis.md#[definition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W6/L2/Residual%20Analysis.md#[definition](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W6/L2/Residual%20Analysis.md#definition))))): The Logic of Sequentiality

To deeply grasp time series, one must look beyond simple "data points" and view the series as a **dynamic system**. In introductory statistics, cross-sectional data treats observations as independent realizations of a random variable. In time series, we treat each observation $Y_t$ as a component of a single, unfolding process.

#### The Mathematical Foundation

Formally, a time series is a stochastic process $\{Y_t : t \in T\}$, where the index $t$ represents time. The crucial shift here is that the **probability distribution** of $Y_t$ is conditional upon the history of the process $\{Y_{t-1}, Y_{t-2}, \dots\}$. This means that we are not just analyzing the values, but the _transition mechanics_ that move the system from $t$ to $t+1$.

### 2. Expanded [Key Characteristics](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W9/L1/PCA%20Vs%20Factor%20Analysis.md#key-characteristics): Beyond the Basics

While temporal dependence and frequency are fundamental, advanced time series analysis relies on several deeper properties:

#### A. The Autocorrelation Function (ACF) and Partial ACF (PACF)

Autocorrelation is not just a binary existence; it is a measurable intensity.

- **ACF:** Measures the correlation between $Y_t$ and $Y_{t-k}$. It captures both direct and indirect dependencies.
    
- **PACF:** Measures the correlation between $Y_t$ and $Y_{t-k}$ _after_ removing the effects of the intervening observations ($Y_{t-1}, \dots, Y_{t-k+1}$). This is vital for identifying the order of autoregressive models.
    

#### B. Stationarity and Ergodicity

Most modern forecasting models (ARIMA, SARIMA, VAR) assume **Weak Stationarity**. A series is stationary if:

1. The **[Mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W4/L2/Testing%20Population%20Proportions.md#mean)** is constant over time.
    
2. The **Variance** is constant (Homoscedasticity).
    
3. The **Autocovariance** depends only on the lag $k$, not the actual time $t$.
    
    If a series violates these—often due to a deterministic trend or varying volatility—we must transform it (e.g., differencing, log transformation, or Box-Cox transformation) to achieve stationarity.
    

#### C. The Spectrum of [Noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W6/L2/Testing%20for%20Significance%20in%20Regression.md#[noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W7/L2/Significance%20Testing%20and%20Multicollinearity.md#noise))

Not all "error" is simple randomness. In time series, we often encounter:

- **White [Noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W6/L2/Testing%20for%20Significance%20in%20Regression.md#[noise](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W7/L2/Significance%20Testing%20and%20Multicollinearity.md#noise)):** The ideal state of [residuals](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W6/L2/Residual%20Analysis.md#residuals), where values are independent and identically distributed (i.i.d.) with zero [mean](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W4/L2/Testing%20Population%20Proportions.md#mean) and [constant variance](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W6/L0/Linear%20Regression.md#constant-variance).
    
- **[Heteroscedasticity](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W6/L2/Residual%20Analysis.md#heteroscedasticity):** Where the variance changes over time (common in financial markets, where volatility "clusters").
    
- **Structural Breaks:** Sudden shifts in the underlying process (e.g., a major policy change or a market crash) that render past patterns temporarily irrelevant.
    

### 3. The Goals of Analysis: Strategic Frameworks

The transition from "Analysis" to "Forecasting" is the core value proposition for data analysts.

#### I. Advanced Diagnostic Analysis

Beyond just "seeing" patterns, diagnostic analysis seeks to **attribute causality and influence**:

- **Decomposition Techniques:** Breaking $Y_t$ into $T_t + S_t + C_t + \epsilon_t$. We use additive models when the magnitude of the seasonal fluctuations does not vary with the level of the trend, and multiplicative models ($T_t \times S_t \times \dots$) when the seasonal variation increases as the trend grows.
    
- **Intervention Analysis:** Quantifying the impact of specific events (e.g., a regulatory change in the pharma industry or a supply chain disruption). This requires analyzing the _impulse [response](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W7/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#[response](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W7/L1/The%20Multiple%20Regression%20Model.md#[response](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W7/L2/Model%20Assessment%20and%20Adjusted%20R%C2%B2.md#response))) function_ of the series.
    

#### II. Forecasting Architectures

When moving to prediction, the choice of strategy is defined by the objective:

- **Univariate Forecasting:** Predicting a variable based solely on its own history (e.g., predicting future IQVIA sales using only past demand data).
    
- **Multivariate Forecasting:** Incorporating exogenous variables (e.g., predicting sales using past sales _plus_ marketing spend, competitor pricing, and macroeconomic indicators).
    
- **Probabilistic Forecasting:** Rather than providing a single number, we generate density forecasts. This allows organizations to build "What-if" scenarios, enabling decision-makers to prepare for the _best_, _worst_, and _most likely_ cases.
    

### [Summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W1/L2/Reading%202%20Parametric%20vs.%20Non-Parametric%20Methods.md#[summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W7/L0/Module%207%20Introduction%20-%20Multiple%20Linear%20Regression.md#[summary](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W7/L1/The%20Multiple%20Regression%20Model.md#summary))) Comparison of Analytical Objectives

|**Objective**|**Focus**|**Key Methodologies**|
|---|---|---|
|**Exploratory**|Understanding historical drivers|Decomposition (STL), ACF/PACF analysis, [Visualization](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Statistical%20Modelling%20%26%20Inferencing/W6/L2/The%20Coefficient%20of%20Determination%20%28R%C2%B2%29.md#visualization)|
|**Causal**|Quantifying the impact of an event|Intervention Analysis, Transfer Function Models|
|**Predictive**|Estimating future values|ARIMA, Exponential Smoothing, Prophet, LSTM/RNNs|

As you move into decomposing these series, would you like to explore the specific mathematical differences between additive and multiplicative decomposition, or shall we look at how to test for stationarity using the Augmented Dickey-Fuller (ADF) test?