
**1 What is Time Series Data?**  
Most of the data we encounter in introductory statistics is cross-sectional. For example, we might have a sample of 100 students and record their exam scores and hours studied. Each student is an independent observation. The order in which we list the students in our dataset has no meaning.  
A time series, in contrast, is a set of observations on a variable collected over time. The data points are recorded at a regular frequency, such as hourly, daily, weekly, monthly, quarterly, or annually. The defining characteristic of a time series is that the order of the observations is crucial. The data is not a collection of independent points; it is a sequenced trajectory.
![[Pasted image 20260523104458.png]]
_Figure 1:_ A classic example of a time series: monthly international airline passengers. The ordering of the data points is essential to see the patterns.

**2 Key Characteristics of Time Series**

- **Temporal Dependence:** The value of the series at one point in time is not independent of its past values. Today’s stock price is highly dependent on yesterday’s price. This property, known as autocorrelation or serial correlation, is the key feature we exploit in forecasting. In a sense, the series contains information about its own history that we can use to predict its future.
- **Frequency:** The frequency is the time interval at which the data is collected. It is a fundamental property that defines the scale of the patterns we can observe. You cannot see hourly fluctuations in daily data, nor can you see seasonal holiday patterns in annual data. The chosen frequency must be appropriate for the question being asked.
- **Potential for Trends and Seasonality:** Many time series exhibit systematic patterns that repeat or evolve over time. A trend is a long-term increase or decrease in the data. Seasonality refers to predictable, repeating patterns that occur over fixed periods, such as a year (e.g., higher sales in December), a week (e.g., more traffic on Fridays), or a day (e.g., higher electricity usage in the evening).

**3 The Goals of Time Series Analysis**  
Why do we go to the trouble of analyzing this special type of data? The objectives generally fall into one of two categories:

1. **Analysis and Understanding:** The first goal is to understand the underlying structure that generated the data. This involves identifying and modeling the components of the series, such as trend and seasonality. By doing this, we can answer questions like:
    - “Is our company’s revenue showing a consistent long-term growth?” (Identifying the trend).
    - “How much do our sales typically increase during the holiday season?” (Quantifying seasonality).
    - “Did our new marketing campaign cause a significant change in the series, or was it just random noise?” (Intervention analysis).
2. **Forecasting:** This is the most common objective of time series analysis. The goal is to predict future values of the series based on the patterns observed in its past. Forecasting is a critical activity in nearly every business and scientific field. It is used to:
    - Forecast sales to manage inventory and staffing.
    - Predict stock prices or exchange rates to inform investment strategies.
    - Predict patient load at a hospital to schedule doctors and nurses.
    - Forecast electricity demand to optimize power generation.

To achieve these goals, we must first learn how to break down a time series into its constituent parts, which is the subject of the next topic.