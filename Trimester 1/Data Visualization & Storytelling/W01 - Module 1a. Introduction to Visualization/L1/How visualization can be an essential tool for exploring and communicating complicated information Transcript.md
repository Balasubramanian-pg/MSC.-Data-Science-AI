---
title: W01 - Module 1a. Introduction to Visualization
module: Statistical Modelling And Inferencing
week: W01 - Module 1a. Introduction to Visualization
---

## Data Visualisation and Storytelling - Lecture Transcript

## Table of Contents

1. [Data Foundations](#1-data-foundations)
   - 1.1 [Structured vs Unstructured Data](#11-structured-vs-unstructured-data)
   - 1.2 [Data Type Taxonomy](#12-data-type-taxonomy)
2. [Univariate Analysis](#2-univariate-analysis)
   - 2.1 [Conversion Rate Analysis](#21-conversion-rate-analysis)
   - 2.2 [Composition Visualization](#22-composition-visualization)
   - 2.3 [Extended Univariate Analysis](#23-extended-univariate-analysis)
3. [Distribution Analysis](#3-distribution-analysis)
   - 3.1 [Histogram](#31-histogram)
   - 3.2 [Boxplot](#32-boxplot)
4. [Multivariate Analysis](#4-multivariate-analysis)
   - 4.1 [Stacked Bar Graph](#41-stacked-bar-graph)
   - 4.2 [Boxen Plot](#42-boxen-plot)
   - 4.3 [Swarm Plot](#43-swarm-plot)
5. [Multivariate Trend and Relationship Analysis](#5-multivariate-trend-and-relationship-analysis)
   - 5.1 [Scatter Plot and Correlation](#51-scatter-plot-and-correlation)
   - 5.2 [Correlation vs Causation](#52-correlation-vs-causation)
   - 5.3 [Joint Plot](#53-joint-plot)
   - 5.4 [Pair Plot](#54-pair-plot)
   - 5.5 [Heat Map](#55-heat-map)
6. [Advanced Multivariate Techniques](#6-advanced-multivariate-techniques)
   - 6.1 [Parallel Coordinates Plot](#61-parallel-coordinates-plot)
   - 6.2 [Trend Analysis with Line Graphs](#62-trend-analysis-with-line-graphs)
   - 6.3 [Dual Axis Chart](#63-dual-axis-chart)

## 1. Data Foundations

### 1.1 Structured vs Unstructured Data

Structured data is organized in matrices with clear variables, types, and contents. It is amenable to computation and relatively easy to visualize.

Unstructured data lacks proper structure. Examples include customer complaint emails and Twitter reviews. The information is not readily computable without reading and interpreting the text first.

Example of structured data: Sales data with four variables (customer, product, channel, revenue) running into thousands of rows.

Example of unstructured data: A customer review on Twitter with varying content, texture, and format.

### 1.2 Data Type Taxonomy

The lecture identifies four primary data types within structured data:

**Categorical (Nominal) Data**

Represents categories without inherent order. Examples: gender, race.

**Binary Data**

A special case of categorical data with exactly two mutually exclusive categories. Represents a phenomenon happening or not happening.

Examples: customer makes a purchase or not, ticket confirmed or not, credit default or payment on time. Being in one category precludes being in the other.

**Ordinal Data**

Data that can be ranked or ordered. Examples: review ratings on a scale of 1 to 5 or 1 to 10. Rankings allow for comparisons.

**Numerical Data**

Divided into two subtypes:

- Continuous: Can take any value in a range. Examples: revenue, growth, sales, GDP.
- Discrete: Countable whole units only. Examples: number of cars sold, number of houses. You cannot have 10.5 cars.

## 2. Univariate Analysis

Univariate analysis examines a single variable within a dataset. It is the first step in exploratory data analysis.

### 2.1 Conversion Rate Analysis

Dataset: Online retail sales data with approximately 12,000 transactions and 10-12 attributes.

Key metric: Conversion rate (whether a customer makes a purchase after visiting the website).

Formula:

```
Conversion Rate = (Purchase Transactions / Total Transactions) * 100
Conversion Rate = (1908 / 12000) * 100 = 15.5%
```

Visualization approach: Simple text is the best friend for a single key takeaway. The answer "15.5%" is sufficient for basic communication.

For comparison of purchasers vs non-purchasers, a bar chart is appropriate:

- Not Purchased: 10,442 customers
- Purchased: 1,908 customers

This represents a highly imbalanced dataset. Imbalanced datasets can produce skewed results in AML-based modeling. Exploratory data analysis using univariate and multivariate techniques is essential before deploying models to understand underlying data and apply appropriate corrections or transformations.

### 2.2 Composition Visualization

Pie charts or donut charts show the composition:

- 15.5% conversion rate means 84.5% of visitors did not buy.

### 2.3 Extended Univariate Analysis

Univariate analysis extends to understanding relationships between the main variable and other attributes.

Examples from the lecture:

**Weekend vs Weekday**

- Weekday visits: 9,462
- Weekend visits: 2,868

This informs internet traffic management decisions.

**Visitor Type**

- Returning visitors (repeat customers)
- New visitors

**Regional Breakup**

Sales or visits from different regions where the retail company operates.

In all cases, one parameter (number of visitors) is held constant while examining its distribution across another attribute (weekend/weekday, visitor type, region).

## 3. Distribution Analysis

### 3.1 Histogram

A histogram is a frequency plot of class intervals. It reveals the underlying data distribution.

Example: Customer visit frequency distribution.

- Large number of customers visited less than 50 times
- Very few visited more than 50 times
- Even fewer visited more than 100 times

The histogram provides insight into where to focus for maximum information extraction.

### 3.2 Boxplot

A boxplot presents distribution using quartiles.

Components:

- Box spans Q1 (25th percentile) to Q3 (75th percentile)
- Line inside box represents median (50th percentile)
- Whiskers extend to 1.5 times the interquartile range (IQR)
- Points beyond whiskers are outliers

Formula:

```
IQR = Q3 - Q1
Upper Whisker = Q3 + 1.5 * IQR
Lower Whisker = Q1 - 1.5 * IQR
```

In a perfectly normal distribution, the boxplot is symmetrical around the median with equal distances to Q1 and Q3.

Most real distributions are not normal. Boxplots reveal:

- Skewness (left or right)
- Distance of median from center
- Outliers (beyond whiskers)

Example: Bounce rates.

- Histogram shows skewed distribution with few low bounce rates
- Boxplot clearly shows outliers with very high values
- Same conclusion as histogram but outliers are much easier to read

Boxplot is an improvement over histogram for outlier detection and distribution summary. The recommendation is to examine both histogram and boxplot for clear insights on data distribution.

## 4. Multivariate Analysis

Multivariate analysis involves two or more variables and their comparisons or relationships.

### 4.1 Stacked Bar Graph

Used to compare variables while showing both absolute values and proportions.

Example: Weekend sales vs weekday sales.

Absolute scale shows higher weekday sales due to higher visit volume.

100% stacked bar graph shows proportions:

- Weekday conversion rate: approximately 15%
- Weekend conversion rate: approximately 17%

Insight: Weekend conversion rate is slightly higher than weekday conversion rate. If running a promotional campaign, weekends may be more efficient. Conversely, to improve weekday sales, focus on inventory management and weekday-specific strategies.

The stacked bar graph involves two variables:

1. Weekend vs weekday visit
2. Purchase vs no purchase

And reveals a third derived insight: conversion rate proportion.

### 4.2 Boxen Plot

An improvement over boxplot where the structure is extended to show more quantiles.

The data is plotted along with distribution and outliers, allowing comparison of distributions across categories.

Example: Administrative page visitors vs information page visitors, segmented by purchase behavior.

- Distributions of administrative page visitors who purchase are different from information page visitors
- Boxen plot shows distribution, grouping, and outliers simultaneously

Recommendation: Use boxplot first for simplicity, then boxen plot for deeper insights.

### 4.3 Swarm Plot

An extension where every individual data point is plotted without binning.

Example: Page values (number of visits before purchase) by visitor type and purchase status.

- Blue dots: not purchasing
- Orange dots: purchasing
- New visitors who purchase show higher page values than returning visitors who purchase
- Returning visitors who purchase average less than 50 visits (around 20)
- New visitors who purchase make higher visits before converting

Insight: The website may be harder for new visitors to navigate. Returning visitors, accustomed to the site, convert faster. This suggests a potential user experience redesign to make the site more customer-friendly for new visitors.

The same inference from a boxplot would be much more difficult to derive. Swarm plots provide precise point-level detail but should not be used for all purposes. Chart selection must match the specific insight being delivered.

## 5. Multivariate Trend and Relationship Analysis

### 5.1 Scatter Plot and Correlation

The scatter plot plots two variables on x and y axes to reveal data distribution and trend.

Correlation types:

- Positive correlation: as one variable increases, the other increases
- Negative correlation: as one variable increases, the other decreases
- No correlation: no discernible directional relationship

Correlation shapes:

- Linear
- Exponential
- Parabolic or U-shaped

Correlation strength:

- Strong correlation
- Weak correlation
- No correlation

Formula for Pearson correlation coefficient:

```
r = Σ((xi - x̄)(yi - ȳ)) / sqrt(Σ(xi - x̄)² * Σ(yi - ȳ)²)
```

Range: -1 to +1

### 5.2 Correlation vs Causation

Critical warning: Many analysts fall into the pitfall of assuming correlation implies causation.

Correlation is only a directional relationship. It indicates whether variables move together or in opposite directions. It does NOT confirm that one variable causes changes in another.

When a correlation exists that is not explained by common logic, consider confounding variables. These are unmeasured variables that may influence both plotted variables simultaneously.

When the effects of confounding variables are isolated, the observed correlation may change or disappear.

### 5.3 Joint Plot

An extension of the scatter plot where the marginal distributions of X and Y variables are plotted on the respective axes.

Benefits:

- See the bivariate relationship in the scatter plot
- See univariate distributions simultaneously
- Determine if correlation holds across the entire data range or only specific ranges

Example insight: Y variable may be centered with one peak while X variable has a long distribution with outliers. This allows isolation of specific ranges to verify if correlation holds.

### 5.4 Pair Plot

A matrix of scatter plots showing all variable combinations in a dataset.

Used to identify which variables influence a target outcome (e.g., purchase vs non-purchase) across all pairwise combinations.

Color-coding by target variable (purchased vs not purchased) reveals patterns.

### 5.5 Heat Map

A visualization of the correlation matrix between all variables in a dataset.

Properties:

- Diagonal elements are always 1 (correlation of a variable with itself)
- Off-diagonal elements show correlation between different variables
- Color saturation indicates correlation strength
- Range from -1 to +1

Color scheme depends on choice:

- One direction (positive or negative) as dark shade
- Opposite direction as light shade

Reading strategy: Examine color saturation to identify strongly correlated variable pairs, then investigate the nature of those relationships.

## 6. Advanced Multivariate Techniques

### 6.1 Parallel Coordinates Plot

Used to study 3-4 variables simultaneously with respect to a particular phenomenon (purchase vs non-purchase).

Requirements:

- All variables must be brought to a comparable axis scale
- Incompatible axes lead to incorrect comparisons

Example variables examined:

- Page values (average visits before purchase): clustering around 7-8 for both purchasers and non-purchasers
- Exit rates: no significant difference between purchasers and non-purchasers
- Bounce rates: no significant difference between purchasers and non-purchasers

Insight: Page visits show distinct patterns between groups, while exit rates and bounce rates do not differentiate purchasers from non-purchasers.

### 6.2 Trend Analysis with Line Graphs

Trend analysis examines changes over time. This is critical in business contexts for growth tracking and competitive comparison.

Example: Bounce rate trends over months, segmented by purchase status.

Observations:

- Bounce rates generally falling for both categories until October
- October: slight uptick for purchasers
- Post-October: bounce rates fall for purchasers but increase for non-purchasers

Business application: Sudden trend changes trigger root cause analysis. Addressing the increase in non-purchaser bounce rates may convert those visitors into customers.

Line graphs are simple and intuitive for indicating directional changes in phenomena.

### 6.3 Dual Axis Chart

A chart with two Y-axes (left and right) allowing comparison of two variables with different scales over the same X-axis (typically time).

Example:

- Left Y-axis: Total visitors (scale 500 to 3,000)
- Right Y-axis: Visitors who made purchase (scale 100 to 700)

X-axis: Months (July through November)

Observations:

- July through October: proportion of visitors to purchasers remained stable
- September: small uptick
- October through November: dramatic increase in both metrics
  - Visitors increased from approximately 500 to 3,000 per month
  - Sale conversions increased from approximately 100 to 700

Insight: As visitor volume increases, sales volume increases proportionally. The dual axis allows simultaneous trend comparison despite different magnitudes.

Implementation: Achievable in Excel as a combo chart.


## Visualization Decision Framework

```
Start: What do you want to show?
    |
    +-- One Variable
    |       |
    |       +-- Comparison --> Bar Chart
    |       +-- Composition --> Pie/Donut Chart
    |       +-- Distribution --> Histogram --> Boxplot --> Boxen --> Swarm
    |
    +-- Two or More Variables
            |
            +-- Categorical vs Categorical --> Stacked Bar / 100% Stacked
            +-- Numerical vs Numerical --> Scatter Plot --> Joint Plot
            +-- Multiple Numerical --> Pair Plot / Heat Map
            +-- 3+ Variables + Category --> Parallel Coordinates
            +-- Trend Over Time --> Line Graph / Dual Axis
```



## Golden Rules

1. Always identify variable types before choosing charts
2. Start simple before adding complexity
3. Correlation does not equal causation
4. Match visualization to the specific insight being delivered
5. Check axis compatibility in parallel coordinates and dual-axis charts
6. Handle imbalanced datasets with care before modeling
7. Trend changes demand root cause analysis

Tags: #statistics #machine-learning #data-science #statistical-modelling