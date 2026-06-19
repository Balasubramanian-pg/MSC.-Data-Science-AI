# 4.1. Introduction to Tableau for Statistical Visualisation

## 4.1.1. The Role of Visualisation in Statistical Inference

Statistical modelling and inferencing produce estimates, test statistics, and uncertainty intervals. However, these numerical outputs remain abstract until they are communicated effectively to decision-makers.

Visualisation serves as the bridge between statistical computation and human understanding. A well-constructed visualisation:

- reveals patterns that summary statistics obscure
- communicates uncertainty intuitively
- enables rapid comparison across groups
- supports data-driven storytelling

Tableau is a visual analytics platform designed to address these needs, transforming raw data and statistical outputs into interactive, interpretable visualisations.

>[!Note]
> Tableau is not a statistical computing environment like R or Python. Instead, it is a visualisation and business intelligence tool that connects to statistical outputs and presents them in an accessible format.

## 4.1.2. Why Tableau Matters for Statistical Communication

Statisticians and data scientists often focus on computational accuracy and model diagnostics. Yet the ultimate value of statistical work depends on how well insights are communicated to non-technical audiences.

Tableau addresses several challenges in statistical communication:

|**Challenge**|**Tableau Solution**|
|:---|:---|
|Static outputs (e.g., printed tables)|Interactive dashboards enabling exploration|
|Complex model results|Visual summaries (plots, confidence bands, heatmaps)|
|Data fragmentation across sources|Unified data connectors and blending|
|Audience disengagement|Storytelling features that guide the viewer|

Tableau's intuitive interface allows analysts to spend more time on analytical thinking and less time on coding visualisations from scratch.

## 4.1.3. Overview of the Tableau Ecosystem

Tableau is owned by Salesforce and offers a range of products, from free public-facing tools to enterprise-grade server solutions. Understanding this ecosystem helps in selecting the appropriate tool for statistical communication needs.

### 3.1 Tableau Public

- **Cost:** Free
- **Use Case:** Learning, public portfolios, sharing visualisations online
- **Limitations:** Data must be saved to Tableau Public servers; no private data storage
- **Relevance for this Course:** This is the version used for learning Tableau fundamentals

### 3.2 Tableau Desktop

- **Cost:** Paid (subscription)
- **Use Case:** Professional development, private data analysis, publishing to Tableau Server or Tableau Cloud
- **Features:** Full data connectivity, advanced analytics, offline data storage

### 3.3 Tableau Server / Tableau Cloud

- **Cost:** Paid (subscription)
- **Use Case:** Enterprise deployment, organisation-wide dashboards, scheduled data refreshes
- **Features:** Centralised sharing, user permissions, production-ready dashboards

### 3.4 Tableau Prep

- **Cost:** Included with Desktop or separate subscription
- **Use Case:** Data cleaning, reshaping, and preparation before visualisation
- **Relevance:** Reduces time spent on data wrangling, allowing more focus on analysis

## 4.1.4. Connecting Tableau to Data Sources

Tableau supports connections to numerous data formats and systems, making it highly flexible for statistical workflows.

### 4.1 Supported Data Sources

|**Source Type**|**Examples**|
|:---|:---|
|Flat files|Excel (`.xlsx`), CSV (`.csv`), text files, JSON|
|Relational databases|SQL Server, PostgreSQL, MySQL, Oracle|
|Cloud platforms|Google BigQuery, Amazon Redshift, Snowflake|
|Statistical software|R, SAS, Python (via integration)|
|Web data|Web data connectors, APIs|

### 4.2 Live vs Extract Connections

Tableau offers two modes of connecting to data:

- **Live Connection:** Queries the data source in real time. Suitable for large databases where data changes frequently.
  
- **Data Extract:** Creates a local snapshot of the data. Improves performance and enables offline work. Extracts can be refreshed manually or on a schedule.

>[!Tip]
> For statistical teaching and learning purposes, extracts are often preferable because they reduce dependence on live database connections and ensure consistent data across sessions.

## 4.1.5. The Tableau Interface: A Guided Tour

Understanding the Tableau workspace is essential before building statistical visualisations.

### 5.1 Key Components

**Data Pane:** Displays the available data fields (dimensions and measures). Dimensions are categorical; measures are quantitative. This distinction is crucial for statistical plotting.

**Sheets Tab:** Each sheet represents a single visualisation, worksheet, or dashboard. Statistical workflows often involve multiple sheets building toward a dashboard.

**Shelves and Cards:** Rows, Columns, Marks, Filters, and Pages are the primary shelves. These control how data is visualised.

**Marks Card:** Controls visual properties:
- Colour (for highlighting categories or ranges)
- Size (for scaling points, bars, or lines)
- Label (for adding data values)
- Detail (for adding granularity)
- Tooltip (for interactive hover information)

**Filters Shelf:** Applies conditional subsets to the data, useful for focusing on specific statistical groups or time periods.

### 5.2 Data Types in Tableau

Tableau infers data types when connecting to a source. The main distinctions are:

|**Tableau Data Type**|**Role**|**Statistical Relevance**|
|:---|:---|:---|
|Dimension (categorical)|Creates headers or axis labels|Groups for comparison, ANOVA, contingency tables|
|Measure (continuous)|Aggregates (sum, average, etc.)|Quantitative variables for means, proportions, regression|
|Date|Time-based analysis|Time series, trends, seasonality|

## 4.1.6. Creating Basic Charts in Tableau

Statistical visualisations often begin with simple plots that reveal distributional properties and relationships.

### 6.1 Building a Bar Chart

Bar charts display categorical data and are useful for comparing group means, proportions, or frequencies.

**Steps to build a bar chart:**
1. Drag a dimension to **Columns**
2. Drag a measure to **Rows**
3. Optionally, drag additional dimensions to **Colour** on the Marks Card

For statistical comparison, error bars can be added to display confidence intervals around group means.

### 6.2 Building a Histogram

Histograms display the distribution of a continuous variable.

**Steps:**
1. Drag a measure to **Columns**
2. Select **Histogram** from the Show Me menu
3. Tableau automatically creates bins

The number of bins can be manually adjusted by right-clicking the bin field and selecting **Edit**.

### 6.3 Building a Box Plot

Box plots display the five-number summary (minimum, Q1, median, Q3, maximum) and are essential for identifying outliers and comparing distributions across groups.

**Steps:**
1. Drag a dimension to **Columns** (groups)
2. Drag a measure to **Rows**
3. Select **Box Plot** from the Show Me menu

### 6.4 Building a Scatter Plot

Scatter plots visualise the relationship between two continuous variables and are foundational for correlation and regression.

**Steps:**
1. Drag one measure to **Columns**
2. Drag another measure to **Rows**
3. Optionally, drag a dimension to **Colour** for grouping

Trend lines (regression lines) can be added by right-clicking in the plot area and selecting **Analytics > Trend Line**.

## 4.1.7. Statistical Features in Tableau

Tableau includes several built-in statistical features that reduce the need for external computation.

### 7.1 Reference Lines

Reference lines add context to visualisations:
- Constant lines (e.g., target values, thresholds)
- Distribution bands (e.g., $$\pm 1$$ standard deviation, confidence intervals)
- Percentile lines

### 7.2 Trend Lines

Tableau can fit trend lines to scatter plots:
- Linear (ordinary least squares)
- Logarithmic
- Exponential
- Power
- Polynomial

>[!Note]
> Trend lines are purely descriptive. For formal statistical inference, use specialised statistical software. Tableau's trend lines provide visual guidance, not rigorous hypothesis tests.

### 7.3 Forecasting

Tableau includes built-in exponential smoothing models for time series forecasting. These provide:
- Point forecasts
- Prediction intervals (80% and 95% by default)
- Model quality metrics (MAPE, RMSE)

### 7.4 Calculated Fields

Tableau supports calculated fields using a syntax similar to Excel or SQL. This enables:
- Creating new variables (e.g., log transformations, standardised scores)
- Conditional logic (e.g., IF statements for categorising continuous variables)
- Statistical transformations (e.g., $$Z$$-scores, percentage changes)

## 4.1.8. Dashboards: Integrating Multiple Views

A dashboard in Tableau combines multiple sheets into a single interactive view. This is particularly valuable for statistical reporting because it:

- presents complementary analyses simultaneously
- enables cross-filtering (selecting in one chart filters others)
- guides the viewer through a statistical narrative

### 8.1 Dashboard Anatomy

|**Component**|**Purpose**|
|:---|:---|
|Visualisation containers|Organise sheets horizontally or vertically|
|Filters|Control data across all sheets|
|Actions|Enable interactivity (filtering, highlighting, URL linking)|
|Legends and colour palettes|Maintain consistent statistical encoding|
|Text boxes|Provide context, explain statistical quantities, state conclusions|

### 8.2 Statistical Dashboard Best Practices

When designing statistical dashboards:

- **Start with the conclusion:** Place the main statistical finding prominently
- **Show uncertainty:** Include confidence intervals, error bars, or prediction bands
- **Provide context:** Include sample sizes, confidence levels, and p-values where relevant
- **Enable drill-down:** Allow users to filter by subgroups or time periods
- **Limit cognitive load:** Use clear titles, consistent colour schemes, and minimise clutter

>[!Warning]
> Dashboards are powerful communication tools, but they can also mislead. Always ensure that interactive exploration does not encourage *ad hoc* hypothesis testing or cherry-picking of statistically significant subsets.

## 4.1.9. Data Storytelling in Tableau

Tableau's Story feature enables analysts to create guided narratives, leading audiences through a sequence of visualisations in a structured progression.

### 9.1 Structure of a Statistical Story

A typical statistical story might follow this flow:

1. **The Question:** What statistical problem is being addressed?
2. **The Data:** Where does the data come from? What are its limitations?
3. **The Analysis:** What patterns, relationships, or differences are observed?
4. **The Uncertainty:** How certain are we about these findings? (Confidence intervals, standard errors)
5. **The Conclusion:** What decisions or actions follow from the evidence?

### 9.2 Storytelling Guidelines

- Each story point should focus on one key insight
- Annotations should explain statistical quantities without overloading the audience
- Captions should state conclusions in plain language, not just repeat axis labels

## 4.1.10. Advantages and Limitations of Tableau for Statistical Work

### 10.1 Advantages

|**Advantage**|**Statistical Benefit**|
|:---|:---|
|Intuitive interface|Rapid prototyping of visualisations|
|Interactive dashboards|Engaging communication of uncertainty|
|Wide data connectivity|Integration with statistical data sources|
|Built-in forecasting and trend lines|Quick exploratory analysis|
|Storytelling features|Guided communication of statistical findings|

### 10.2 Limitations

|**Limitation**|**Statistical Implication**|
|:---|:---|
|Limited statistical modelling|Not a replacement for R, Python, or specialised statistical software|
|No formal hypothesis testing|Cannot conduct ANOVA, regression diagnostics, or complex inference directly|
|Aggregation complexity|May hide important distributional features|
|Cost for full features|Enterprise versions are expensive|
|Learning curve|Advanced features require substantial practice|

>[!Tip]
> Tableau is best understood as a *presentation layer* for statistical work, not a *computation layer*. Conduct rigorous modelling in dedicated statistical software, then use Tableau to communicate results effectively.

## 4.1.11. Recommended Learning Resources

Given the constraints of any single course, additional self-guided learning is encouraged.

### 11.1 Official Resources

- Tableau Public Gallery: Examples of statistical and non-statistical visualisations
- Tableau Help Documentation: Comprehensive reference for all features
- Tableau Learning Videos: Structured courses on Tableau's website

### 11.2 Community Resources

- YouTube tutorials: Extensive coverage of specific techniques
- Tableau Community Forums: Problem-solving and best practices
- Data Visualisation Society: Broader context on visual communication

## 4.1.12. Conclusions

### 12.1 Tableau as a Statistical Communication Tool

Tableau is a powerful platform for transforming statistical outputs into interactive, interpretable visualisations. Its primary value lies not in computation but in communication:

- **Clarity:** Complex statistical concepts become accessible
- **Interactivity:** Audiences can explore uncertainty and heterogeneity
- **Storytelling:** Statistical findings are embedded in a coherent narrative

### 12.2 Key Takeaways

|**Concept**|**Application**|
|:---|:---|
|Visualisation complements statistical inference|Plots reveal patterns that numbers obscure|
|Tableau is a BI tool, not a statistical package|Use R/Python for modelling, Tableau for presentation|
|Interactivity enhances understanding|Dashboards and stories engage audiences|
|Uncertainty must be shown|Include confidence intervals, error bars, and prediction bands|

### 12.3 Final Advice

>[!Tip]
> Statistical rigour is the foundation. Tableau is the vehicle for sharing that rigour with decision-makers and stakeholders. A technically perfect model that cannot be understood has limited practical value.

The skills developed in Tableau—connecting data, designing visualisations, building dashboards, and crafting stories—are increasingly essential for statisticians who wish to influence real-world decisions.
