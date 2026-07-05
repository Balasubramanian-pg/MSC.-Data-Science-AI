---
title: W02 - Module 1b. Taxonomy of Data Visualisation Methods
module: Statistical Modelling And Inferencing
week: W02 - Module 1b. Taxonomy of Data Visualisation Methods
---

### 1. The Frequentist Foundation: The Long-Run Frequency

To understand why the **Bayesian** approach is such a significant departure, we must first be clear about the **Frequentist** rules we have been following. The Frequentist paradigm defines probability as the limit of an event's relative frequency in an infinite number of trials.

#### The Core Assumptions of the Frequentist Framework

- **Fixed Parameters ($\theta$):** A parameter, such as the true success rate ($p$) of a drug, is viewed as a single, objective, fixed truth. It does not have a probability distribution; it simply _is_.
    
- **Random Samples:** Your data is treated as one random "realization" from a larger process. If you ran the experiment again, you would get different data, leading to a different point estimate.
    
- **Sampling Distributions:** Inference is built on what _would_ happen if you repeated the experiment infinitely. This is why we use p-values and confidence intervals—they describe the behavior of the _procedure_ over the long run, not the probability of the specific result you have in front of you.
    

#### The "Confidence Interval" Nuance

The most common misunderstanding in Frequentist statistics is the interpretation of the **95% Confidence Interval (CI)**.

- **The Reality:** When you calculate a 95% CI from a single study, you are creating an interval that _belongs_ to a family of intervals. That family has a 95% "success rate" of covering the true parameter over the long run.
    
- **The Misconception:** It is **not** a statement about your specific data. It does not mean "there is a 95% probability the true value is in _this_ interval." Once the data is observed, the true parameter is either in the interval or it isn't—the probability is either 0 or 1.
    

#### Why This Works (and Why It's Limited)

The Frequentist approach is the gold standard for clinical trials and regulatory approval precisely because it is **objective**. It doesn't rely on the researcher's beliefs; it relies entirely on the probability of the observed data under a specific null hypothesis.

However, as you move into complex pharmaceutical modeling—where you might have small sample sizes or need to incorporate prior knowledge—this "long-run frequency" requirement can become a limitation. You are often forced to ignore your professional experience because the Frequentist framework has no formal mechanism to "weight" a model with existing domain knowledge.

### Comparison: Defining the Paradigm

|**Concept**|**Frequentist Perspective**|
|---|---|
|**Probability**|Long-run frequency of events.|
|**Parameters ($\theta$)**|Fixed, unknown constants.|
|**Data**|Randomly sampled from a population.|
|**Goal**|Minimize error/bias in the procedure.|
|**Interpretation**|How reliable is the _method_?|

**Strategic Note:** Because Frequentist statistics focuses on the method rather than the specific outcome, it is excellent for standardizing clinical trial results. But when you need to make a specific business prediction (like "What is the probability this specific campaign succeeds?"), the Bayesian approach offers a more intuitive path.

**Since we have established the constraints of the Frequentist world, are you ready to contrast this with the "degree of belief" definition in the Bayesian paradigm, or would you like to explore how these two approaches handle "uncertainty" differently in a practical scenario?**

### Choosing the Right Visual: The "Less is More" Philosophy

As you progress in your role as a data mentor and analyst, you will find that the **effectiveness of your communication** often outweighs the complexity of your model. Cole Nussbaumer Knaflic’s _Storytelling with Data_ emphasizes that a vast array of chart types is rarely necessary. Most high-impact business insights can be communicated using a small, disciplined toolkit.

### The Analyst’s Toolkit: When to Use Which Visual

Choosing the right visual is a strategic decision. If you pick the wrong one, the signal gets lost in the noise.

|**Visual Category**|**Best Used For...**|**Pro-Tip for Analysts**|
|---|---|---|
|**Simple Text**|Highlighting a single, critical number (e.g., "Q1 Revenue Growth").|Use it when you have one powerful number that needs no context.|
|**Table / Heatmap**|Detailed data comparison; finding patterns in dense sets.|Use **heatmaps** when you need to draw the eye immediately to outliers or trends in large tables.|
|**Scatter Plot**|Showing the relationship between two continuous variables.|Essential for spotting correlations in pharmaceutical market data.|
|**Line / Slopegraph**|Showing trends over time (Line) or "before/after" change (Slopegraph).|Use **slopegraphs** for dramatic comparisons between two specific time points.|
|**Bar Charts**|Comparing categorical data (e.g., performance across different drug brands).|**Vertical** for time; **Horizontal** for long category names; **Stacked** for part-to-whole comparisons.|
|**Waterfall**|Showing a "bridge" from a starting value to an ending value.|Ideal for explaining changes in your RPT_EXECUTIVE_SUMMARY_MASTER_VW.|
|**Square Area**|Representing size or proportion of categories.|Use sparingly; humans are better at judging length (bars) than area.|

#### 3 Strategic Rules for Choosing Your Visual

1. **Start with the "So What?":** Before opening Power BI or Tableau, ask: _What do I want the audience to know or do?_ If you want to show a trend, use a line. If you want to compare categories, use a bar.
    
2. **Avoid the "Chart Junk":** If a visual element doesn't help the audience understand the data (like 3D effects, excessive gridlines, or heavy shadows), remove it. In data visualization, **simplicity is sophistication.**
    
3. **The "5-Second Test":** If a viewer cannot understand the core insight of your chart within five seconds, it is either too complex or the wrong chart type for the story you are telling.
    

### Integration with Your Workflow

In your current work with **Snowflake** and **Power BI**, you are likely dealing with high-volume data (like IQVIA patient metrics). Applying these visual principles will help you move from simply "presenting data" to "driving decisions." For instance, when you build your Tableau executive summaries, choosing a **Waterfall chart** to bridge current market access metrics to your goal is much more intuitive for a stakeholder than a standard table.

**You have a strong grasp of the "what" and "why" behind data visualization. Would you like to practice mapping a specific pharmaceutical dataset (like your DDD or LAAD data) to one of these visual types, or would you like to discuss how to apply "preattentive attributes" (like color and size) to make these visuals even more effective?**

### Choosing the Right Visual: The "Less is More" Philosophy

As you progress in your role as a data mentor and analyst, you will find that the **effectiveness of your communication** often outweighs the complexity of your model. Cole Nussbaumer Knaflic’s _Storytelling with Data_ emphasizes that a vast array of chart types is rarely necessary. Most high-impact business insights can be communicated using a small, disciplined toolkit.

### The Analyst’s Toolkit: When to Use Which Visual

Choosing the right visual is a strategic decision. If you pick the wrong one, the signal gets lost in the noise.

|**Visual Category**|**Best Used For...**|**Pro-Tip for Analysts**|
|---|---|---|
|**Simple Text**|Highlighting a single, critical number (e.g., "Q1 Revenue Growth").|Use it when you have one powerful number that needs no context.|
|**Table / Heatmap**|Detailed data comparison; finding patterns in dense sets.|Use **heatmaps** when you need to draw the eye immediately to outliers or trends in large tables.|
|**Scatter Plot**|Showing the relationship between two continuous variables.|Essential for spotting correlations in pharmaceutical market data.|
|**Line / Slopegraph**|Showing trends over time (Line) or "before/after" change (Slopegraph).|Use **slopegraphs** for dramatic comparisons between two specific time points.|
|**Bar Charts**|Comparing categorical data (e.g., performance across different drug brands).|**Vertical** for time; **Horizontal** for long category names; **Stacked** for part-to-whole comparisons.|
|**Waterfall**|Showing a "bridge" from a starting value to an ending value.|Ideal for explaining changes in your RPT_EXECUTIVE_SUMMARY_MASTER_VW.|
|**Square Area**|Representing size or proportion of categories.|Use sparingly; humans are better at judging length (bars) than area.|

#### 3 Strategic Rules for Choosing Your Visual

1. **Start with the "So What?":** Before opening Power BI or Tableau, ask: _What do I want the audience to know or do?_ If you want to show a trend, use a line. If you want to compare categories, use a bar.
    
2. **Avoid the "Chart Junk":** If a visual element doesn't help the audience understand the data (like 3D effects, excessive gridlines, or heavy shadows), remove it. In data visualization, **simplicity is sophistication.**
    
3. **The "5-Second Test":** If a viewer cannot understand the core insight of your chart within five seconds, it is either too complex or the wrong chart type for the story you are telling.
    

### Integration with Your Workflow

In your current work with **Snowflake** and **Power BI**, you are likely dealing with high-volume data (like IQVIA patient metrics). Applying these visual principles will help you move from simply "presenting data" to "driving decisions." For instance, when you build your Tableau executive summaries, choosing a **Waterfall chart** to bridge current market access metrics to your goal is much more intuitive for a stakeholder than a standard table.

**You have a strong grasp of the "what" and "why" behind data visualization. Would you like to practice mapping a specific pharmaceutical dataset (like your DDD or LAAD data) to one of these visual types, or would you like to discuss how to apply "preattentive attributes" (like color and size) to make these visuals even more effective?**

### Design Concepts: Bridging Form and Function

In the world of data visualization, design is not merely about making charts "look pretty." It is a disciplined process of enabling your audience to extract insight from data with zero friction. The philosophy **"Form follows function"** is your guiding principle: define the purpose (the function) first, and then build the visual (the form) that serves it best.

#### 1. Thinking Like a Designer

A designer doesn't start by picking colors; they start by asking, _"What does the user need to accomplish?"_ * **Define the Function:** Are they comparing market share? Identifying a downward trend? Spotting an anomaly in drug pricing?

- **Design the Form:** Once the function is clear, choose the simplest visual that facilitates that action. If the goal is comparison, use a bar chart. If it is a trend, use a line.
    

#### 2. Traditional Design Concepts Applied to Data

You can elevate your Tableau or Power BI reports by applying these three design pillars:

- **Affordances:** These are visual cues that tell the audience how to interact with your data.
    
    - _Example:_ A button in a report should _look_ clickable. If a chart has a drill-down feature, add a clear icon or a hover effect. Do not make the audience guess how to interact with your work.
        
- **Accessibility:** Design for everyone.
    
    - _Example:_ Avoid relying solely on color to convey meaning (e.g., "red for bad, green for good"), as this excludes colorblind users. Use redundant cues like shapes, labels, or patterns to ensure your insights are accessible to all stakeholders.
        
- **Aesthetics:** This is about "decluttering." A clean, well-aligned dashboard is not just professional—it’s cognitively easier to process.
    
    - _Example:_ Use consistent fonts, limit your color palette, and remove unnecessary borders. Aesthetics reduce the cognitive load, allowing your audience to focus on the story rather than the design.
        

#### 3. Gaining Audience Acceptance

Even the best design will fail if the audience rejects it. To gain acceptance:

1. **Iterate with Feedback:** Don't build in isolation. Show a draft to a colleague and observe where they get confused.
    
2. **Speak their Language:** If your stakeholders are focused on financial metrics, ensure your visualizations prioritize the KPIs that impact their bottom line.
    
3. **Transparency:** Explain _why_ you chose a specific visual. When you explain the "form" you chose, you build trust in your analysis.
    

### Integration with Your Analyst Workflow

In your role as a **Senior SQL Engineer and Data Mentor**, you are the architect of your organization's knowledge management. When you implement Python scripts for automation or build Snowflake schemas, treat the final output (the report) with the same care as the data pipeline.

|**Concept**|**Your Action as a Senior Analyst**|
|---|---|
|**Affordances**|Create intuitive navigation in Power BI dashboards.|
|**Accessibility**|Ensure color-blind friendly palettes in Tableau proofs-of-concept.|
|**Aesthetics**|Standardize report formatting (font, spacing, alignment).|
|**Acceptance**|Present your data stories with a focus on business-actionable KPIs.|

**You have moved from the "what" and "why" to the "how" of design. Would you like to deep-dive into "preattentive attributes"—the specific visual properties like color, size, and position that grab human attention first—or shall we discuss how to apply these design concepts to a dashboard you are currently building?**

### Plotting with Purpose: Matching Visuals to Insights

To be an effective communicator, you must stop thinking about "which chart I like" and start thinking about **"what is the specific communication task?"** Matching the method to the purpose is what separates a dashboard that sits idle from one that drives strategic decisions.

### The Communication Matrix: Mapping Tasks to Visuals

Every analysis has a clear intent. Use this matrix to select the right tool for the job.

|**Method**|**Communication Purpose**|**Recommended Visuals**|
|---|---|---|
|**Comparing Categories**|Comparing relative/absolute sizes of categorical values.|Bar charts, Dot plots|
|**Assessing Hierarchies**|Breakdown of values relative to a population or structure.|Treemaps, Sunbursts, Stacked bars|
|**Showing Changes Over Time**|Analyzing trends, patterns, and movement.|Line charts, Slopegraphs, Area charts|
|**Plotting Connections**|Exploring associations, distributions, and multivariate patterns.|Scatter plots, Bubble charts, Heatmaps|
|**Mapping Geo-spatial Data**|Visualizing location-based or regional datasets.|Choropleth maps, Bubble maps|

#### 1. Comparing Categories

When your goal is to compare values across categories (e.g., Sales per drug brand), **bar charts** are king. The human eye is highly skilled at comparing the lengths of bars aligned on a common axis.

- _Avoid:_ Pie charts for comparisons. They make it nearly impossible to accurately judge the difference between small slices.
    

#### 2. Assessing Hierarchies (Part-to-Whole)

If you need to show how individual components contribute to a total (e.g., market share of various pharma products within a therapeutic area), use structures that emphasize the "whole."

- _Example:_ **Treemaps** are excellent for displaying hierarchical data in a compact, organized space.
    

#### 3. Showing Changes Over Time

When dealing with temporal data, the **line chart** is your most powerful tool. It emphasizes the _flow_ and _velocity_ of change.

- _Pro-Tip:_ Use **Slopegraphs** when you only have two time points (e.g., "Start of Year" vs. "End of Year") to show the dramatic shift in status for multiple categories simultaneously.
    

#### 4. Plotting Connections and Relationships

Use **scatter plots** when you need to explore correlations between variables. This is the cornerstone of exploratory data analysis—it reveals clusters, outliers, and trends in multivariate data that tables simply cannot show.

#### 5. Mapping Geo-spatial Data

For data with geographical properties, maps provide immediate context.

- _Note:_ Use **choropleth maps** (color-shaded regions) for density or categorical comparisons across territories, and **bubble maps** for quantitative values at specific locations.
    

### Strategic Summary for Your Dashboard Designs

In your work with **Snowflake** and **Power BI**, you have the technical stack to execute these designs. When building your RPT_EXECUTIVE_SUMMARY_MASTER_VW or other reporting views, ask yourself:

1. **What is the task?** (Comparison? Correlation? Trend?)
    
2. **What is the best "method"?** (Match the purpose from the table above.)
    
3. **Does the form support the function?** (Is the chart clean? Is it accessible? Does it answer the question in 5 seconds?)
    

**You have a comprehensive overview of how to select the right plot for any analytical task. Would you like to practice creating a decision logic for a specific pharmaceutical dataset you are currently analyzing, or would you like to discuss the risks of "misleading" visuals—such as truncated axes—in business reports?**

### Analyzing Performance Ratios: Strategic Benchmarking

The data you provided offers a clear snapshot of performance across three distinct banking segments: **ASCBs** (All Scheduled Commercial Banks), **PSBs** (Public Sector Banks), and **PVBs** (Private Sector Banks).

As a business analyst, you can translate these raw figures into actionable insights by comparing the "efficiency" and "profitability" engines of these different sectors.

### Comparative Performance Analysis

|**Metric**|**ASCBs**|**PSBs**|**PVBs**|**Key Takeaway**|
|---|---|---|---|---|
|**NIM (Net Interest Margin)**|3.38|2.85|3.94|**PVBs** hold a stronger interest margin, indicating better pricing power or asset quality.|
|**Efficiency (Cost/Income)**|46.49|50.31|43.65|Lower is better. **PVBs** are the most cost-efficient.|
|**Return on Assets (ROA)**|1.30|1.00|1.65|**PVBs** demonstrate superior capability in generating profit from their asset base.|
|**Staff Expenses/Total Income**|11.50|13.59|9.21|**PVBs** maintain leaner operations regarding personnel costs.|

### Key Analytical Takeaways

- **Efficiency vs. Overhead:** Note the divergence between the "Efficiency (Cost/Income) Ratio" and the "Overhead Efficiency Ratio." While PVBs lead in Cost/Income efficiency (43.65), they also show higher overhead efficiency usage (79.18), suggesting they may be utilizing different operational models compared to the PSB segment.
    
- **The Profitability Engine:** PVBs are clearly outperforming the PSB cohort across nearly all profitability metrics (NIM of 3.94 vs 2.85; ROA of 1.65 vs 1.00). If you were presenting this to leadership, the focus would be on _what_ operational levers PVBs are pulling that PSBs are not—specifically looking at their lower staff-to-income ratio (9.21 vs 13.59).
    
- **Income Composition:** PSBs derive a larger proportion of their income from interest (85.63%) compared to PVBs (81.23%). This implies that PVBs are more diversified in their revenue streams, generating a higher percentage of "Non-Interest Income" (18.77%), which is typically less sensitive to interest rate volatility.
    

### Integration with Your Workflow

In your role as a **Data Mentor** and **Business Analyst**, this type of benchmarking is the foundation of competitive intelligence. When you automate these reports (using your Python/SQL workflow), consider:

1. **Visualization:** Use a **Heatmap** to show these ratios. The cells with the highest values (or lowest, depending on the metric) would visually "pop," allowing stakeholders to identify areas of competitive advantage or concern instantly.
    
2. **Dashboard Design:** Since this is time-series data (implied by "annualized"), a **Line Chart** displaying the _trend_ of these ratios over the last 3–5 years would be more valuable than a static table. It reveals whether the efficiency gap between PSBs and PVBs is widening or narrowing.
    

**You now have the analytical framework to interpret these banking metrics. Would you like to discuss how to build a SQL query to calculate these "annualized" ratios from raw ledger data, or shall we explore how to create a "Waterfall Chart" to explain the gap in "Return on Equity" between PSBs and PVBs?**

### Analyzing Deposit Costs and Profitability Dynamics

You have provided two key components for a financial health analysis: a **frequency distribution** of the "Cost of Deposits" and a **linear regression model** analyzing the relationship between "Return on Assets (ROA)" and "Net Interest Margin (NIM)."

### 1. Understanding the Cost of Deposits (Distribution)

The histogram data provided reveals how the bank's deposit costs are structured.

- **Frequency Breakdown:**
    
    - The peak of your distribution (mode) is in the **(5.59, 6.40]** range, with 31 observations.
        
    - The distribution is relatively centered around the stated average of **6.27%**.
        
- **Insight:** This tells you the "concentration" of your funding cost. Since the majority of your data points cluster around 5.59%–7.21%, your bank has a fairly tight control over its cost of funds.
    

### 2. ROA vs. NIM (Regression Analysis)

The scatter plot analysis, represented by the linear equation $y = 0.1483x + 0.5384$, explores the relationship between profitability (ROA) and margin (NIM).

- **The Equation:** $y = 0.1483x + 0.5384$
    
    - **$y$ (NIM):** Net Interest Margin
        
    - **$x$ (ROA):** Return on Assets
        
- **Interpretation:** * The slope of **0.1483** indicates a positive correlation. For every 1% increase in ROA, the NIM is expected to increase by approximately 0.148%.
    
    - The intercept of **0.5384** suggests that even at an ROA of 0% (break-even), the bank maintains a baseline NIM of ~0.54%.
        

### Integration with Your Workflow

As a **Senior SQL Engineer and Business Analyst**, these insights are operational triggers:

1. **Benchmarking the Cost of Deposits:** If your current "Cost of Deposits" average starts to drift above 6.27%, you can use your SQL pipeline to identify if the volume is shifting from the (5.59, 6.40] bucket to higher-cost buckets. This is a classic "Early Warning System" metric.
    
2. **Profitability Forecasting:** The regression equation allows you to build a **Predictive Scenario Model**. If you are forecasting an ROA improvement of 2% for the next fiscal year, your model predicts a corresponding NIM lift of ~0.30% ($0.1483 \times 2$). This is a powerful "What-If" tool for executive summaries.
    

#### Analytical Summary Table

|**Metric**|**Business Meaning**|**Analytical Action**|
|---|---|---|
|**Mode (5.59%–6.40%)**|Most common funding cost.|Monitor shifts to higher ranges (margin erosion).|
|**Slope (0.1483)**|Sensitivity of NIM to ROA.|Use for forecasting margin impact of ROA growth.|
|**Intercept (0.5384)**|Baseline margin at 0% ROA.|Indicator of base operational efficiency.|

**You have a strong understanding of how to interpret these distributions and regression models. Would you like to practice writing the SQL to calculate these frequency distributions from raw ledger data, or shall we discuss how to evaluate the _quality_ of your regression model using $R^2$ or residuals?**

Tags: #statistics #machine-learning #data-science #statistical-modelling
