# Taxonomy of Data Visualization Methods

**Module:** Statistical Modelling and Inferencing  
**Topic:** Taxonomy of Data Visualization Methods

## Learning Objectives

After studying this module, you should be able to:

- Understand the major categories of data visualizations
- Select the appropriate chart based on analytical objectives
- Distinguish between relationship, trend, comparison, and composition charts
- Identify when a graph is unnecessary
- Avoid common visualization selection mistakes
- Apply a structured framework for choosing visualizations

## 1. Introduction

Modern BI tools such as:

- Tableau
- Power BI
- Qlik
- Excel
- Python Visualization Libraries

offer hundreds of visualization options.

However, in practice:

> Approximately 90% of business reporting and analytical communication can be effectively handled using about 10–12 core visualization types.

The challenge is not learning hundreds of charts.

The challenge is selecting the correct visualization for the question being asked.

[!IMPORTANT]

A poor chart can hide insights.

A good chart can reveal them immediately.

## 2. Why Visualization Selection Matters

Every visualization has a purpose.

Different charts answer different questions.

| Question | Appropriate Visual |
|-----------|-------------------|
| What is the value? | Text |
| What are the exact numbers? | Table |
| Which category is highest? | Bar Chart |
| How did performance change over time? | Line Chart |
| Are two variables related? | Scatter Plot |
| What contributes to the total? | Stacked Bar |
| How did a metric move from A to B? | Waterfall Chart |

Choosing the wrong chart creates confusion.

Choosing the correct chart creates clarity.

## 3. Visualization Selection Framework

The first question should always be:

> What am I trying to communicate?

```mermaid
flowchart TD

A[Start]
--> B{Objective?}

B --> C[Single Number]
B --> D[Exact Values]
B --> E[Relationship]
B --> F[Trend]
B --> G[Comparison]
B --> H[Composition]
B --> I[Cumulative Change]
````

The objective determines the visual.

## 4. Four Major Categories of Visualizations

The lecture groups visualization methods into four broad families:

```mermaid
mindmap
  root((Visualization Types))

    Text-Based
      Simple Text
      Tables
      Heatmaps

    Relationship & Trend
      Scatter Plot
      Bubble Chart
      Line Graph
      Slope Graph

    Comparison & Composition
      Bar Chart
      Stacked Bar
      Waterfall

    Area Charts
      Treemap
      Square Area Chart
```

## 5. Text-Based Visualizations

These are not traditional graphs.

The actual numbers are the primary message.

### 5.1 Simple Text

#### Purpose

Used when only one or two numbers matter.

Sometimes a chart adds unnecessary complexity.

#### Example

Instead of:

```text
1970: █████████████████ 41%

2024: ████████ 20%
```

Simply write:

> The proportion of stay-at-home mothers declined from 41% in 1970 to 20% today.

#### Why It Works

The audience instantly understands:

* The values
* The comparison
* The message

without interpreting a graph.

#### Best Practices

* Large font
* Bold numbers
* Contrasting colors
* Strategic spacing

#### When to Use

* One KPI matters
* A dashboard tile is required
* The change is obvious

### 5.2 Tables

#### Purpose

Used when precise values matter.

Tables support lookup behavior.

People naturally:

* Read rows
* Read columns
* Compare values

#### Example

| Product | Revenue |
| ------- | ------- |
| A       | ₹50M    |
| B       | ₹42M    |
| C       | ₹39M    |

#### Strengths

* High precision
* Easy lookup
* Suitable for reports

#### Weaknesses

* Poor at showing patterns
* Poor at showing trends

#### Best Use Cases

* Financial reports
* Detailed datasets
* Audit reports
* Regulatory reporting

### 5.3 Heatmaps

#### Purpose

Combine the precision of tables with rapid visual pattern detection.

#### Benefits

Humans detect color differences faster than numerical differences.

This allows quick identification of:

* High concentration
* Low performance
* Outliers

[!TIP]

Heatmaps are often the most effective upgrade when a large table becomes difficult to interpret.

## 6. Relationship & Trend Visualizations

These charts answer:

> How are variables related?

or

> How do values change over time?

### 6.1 Scatter Plot

#### Purpose

Show relationships between two quantitative variables.

#### Questions Answered

* Is there a relationship?
* Is it positive?
* Is it negative?
* Are there outliers?

#### Advantages

* Detects patterns
* Detects clusters
* Detects anomalies

#### Limitations

* Difficult for non-technical audiences
* Correlation does not imply causation

[!WARNING]

Scatter plots are excellent analytical tools but are often poor executive communication tools unless properly annotated.

### 6.2 Bubble Chart

#### Purpose

Adds a third quantitative variable through bubble size.

| Visual Element | Represents |
| -------------- | ---------- |
| X Position     | Variable 1 |
| Y Position     | Variable 2 |
| Bubble Size    | Variable 3 |

#### Advantage

Displays three dimensions simultaneously.

#### Limitation

Area perception is imperfect, making exact comparisons difficult.

### 6.3 Line Graph

#### Purpose

Display continuous trends over time.

#### Best Applications

* Revenue growth
* Temperature changes
* Stock prices
* Website traffic
* Population growth

#### Best Practices

* Limit the number of lines
* Highlight key series
* Label directly whenever possible

### 6.4 Slope Graph

#### Purpose

Compare changes between two points in time.

#### Best Use Cases

* Ranking changes
* Before vs After analysis
* Employee survey comparisons
* Market share shifts

## 7. Comparison & Composition Visualizations

These charts leverage one of the strongest human perceptual abilities:

> Comparing lengths.

### 7.1 Bar Charts

#### Purpose

Compare categorical values.

#### Why They Work

Humans compare lengths more accurately than areas, angles, or volumes.

#### Applications

* Sales by region
* Product performance
* Department comparison
* Survey responses

[!IMPORTANT]

If the goal is simple comparison, start with a bar chart.

Most alternatives are usually worse.

### 7.2 Stacked Bar Charts

#### Purpose

Show both total value and composition simultaneously.

#### Reveals

* Overall size
* Internal breakdown

#### Applications

* Revenue mix
* Product mix
* Survey segmentation

### 7.3 100% Stacked Bar Charts

#### Purpose

Compare proportions rather than absolute values.

#### Advantages

* Easier comparison than pie charts
* Supports multiple categories
* Standardized scale

### 7.4 Waterfall Charts

#### Purpose

Explain movement from an initial value to a final value.

#### Common Applications

* Profit bridges
* Workforce changes
* Budget analysis
* Revenue decomposition

## 8. Area Charts

Area charts communicate proportions through physical space.

### 8.1 Treemap Charts

#### Purpose

Represent composition using rectangles.

#### Applications

* Market share
* Population distribution
* Revenue contribution

#### Limitation

Precise comparisons are harder than with bars.

### 8.2 Square Area Charts

#### Purpose

Represent composition using equal-sized units.

#### Best Applications

* Demographic comparisons
* Population composition
* Time-based composition changes

## 9. Visualization Selection Cheat Sheet

| Objective             | Best Visual       |
| --------------------- | ----------------- |
| One KPI               | Simple Text       |
| Exact Numbers         | Table             |
| Highlight Patterns    | Heatmap           |
| Relationship Analysis | Scatter Plot      |
| Three Variables       | Bubble Chart      |
| Trend Over Time       | Line Graph        |
| Two-Point Change      | Slope Graph       |
| Category Comparison   | Bar Chart         |
| Composition Analysis  | Stacked Bar       |
| Proportion Comparison | 100% Stacked Bar  |
| Cumulative Movement   | Waterfall Chart   |
| Area Composition      | Treemap           |
| Composition Over Time | Square Area Chart |

## 10. Common Mistakes

1. Using a chart when text is sufficient.
2. Using tables to communicate trends.
3. Using pie charts for complex comparisons.
4. Overloading line charts with many series.
5. Using scatter plots for non-technical audiences.
6. Selecting visuals based on aesthetics rather than communication value.

## Examination Notes

### What determines chart selection?

The communication objective.

### What is the best chart for discovering relationships?

Scatter Plot.

### What chart adds a third variable to a scatter plot?

Bubble Chart.

### Which chart is best for continuous trends?

Line Graph.

### Which chart is best for comparing categories?

Bar Chart.

### Which chart is a strong alternative to pie charts?

100% Stacked Bar Chart.

### Which chart explains movement from a starting value to an ending value?

Waterfall Chart.

## Final Takeaways

[!IMPORTANT]

Visualization selection should be driven by the question being answered, not by chart popularity or software availability.

Remember:

1. Start with the objective.
2. Understand the audience.
3. Choose the simplest chart that answers the question.
4. Use comparison charts for comparison problems.
5. Use trend charts for trend problems.
6. Use relationship charts for analytical discovery.
7. Use composition charts for part-to-whole analysis.

### One-Line Summary

> The best visualization is not the most sophisticated one; it is the one that communicates the intended insight with the least cognitive effort.
