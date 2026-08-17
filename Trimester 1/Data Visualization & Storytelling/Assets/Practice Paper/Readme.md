DVST Sample question paper 
[please note that these are indicative questions and actual questions in the exam may vary]

## 1.	What are the seven stages of data visualization and explain their importance in creating effective visualizations?
Every data visualisation exercise follows seven established stages to ensure that messages are delivered effectively to the audience. While these steps often appear sequential, they frequently run in parallel and, most importantly, **iteratively**.

The seven stages of data visualisation are as follows:

1.  **Acquire**: This first stage involves obtaining data from various sources, such as websites or files. It is critical at this stage to ensure the **compatibility** of the data format (like Excel or CSV) with the software tools you intend to use to avoid friction later in the process.
2.  **Parse**: Once acquired, you must understand the **underlying structure** of the data. This involves identifying different variables (textual or numerical), checking for data integrity, and spotting gaps. This stage helps the creator understand what information is available for use.
3.  **Filter**: In this stage, you create subsets or partitions in the data based on preliminary understanding. For example, you might sort data by a specific variable of interest, such as voter turnout ratio or gender, to focus the analysis on what is most important.
4.  **Mine**: This is a crucial step where you perform **exploratory analysis** to uncover hidden patterns and trends within the data. Mining allows you to understand how different data points are associated with one another, providing the foundation for the story you want to tell.
5.  **Represent**: After identifying patterns, you begin by creating simple visualisations, such as basic bar charts or distribution plots. This is the starting point for visualising your findings, even if these initial versions do not yet fully convey the intended message.
6.  **Refine**: This stage focuses on improving the effectiveness of the initial representations. You apply design principles (such as **Gestalt principles**) to add context, create natural ordering, and ensure the visual accurately reflects the insights found during the mining stage.
7.  **Interact**: The final stage involves sharing the visualisation with stakeholders and the audience. Feedback received during this stage often leads back to earlier steps—for instance, a question from an audience member might require you to acquire more data or re-mine existing data to provide a better answer.

**Importance of the Seven-Stage Process**
Following these stages is essential for creating **expressive and effective** visualisations. They guide the creator from raw data to actionable insights, ensuring that the final output is credible, easy to process, and retained at a higher rate by the audience. Because the process is iterative, it allows for constant improvement, ensuring the visual remains relevant and compelling.

## 3.	Explain the use of visual attributes for enhance designs or visualizations?
Visual attributes, also known as **pre-attentive attributes**, are specific design elements that the human brain processes almost instantaneously, even before conscious attention is focused on them. These attributes are processed by **iconic memory**, which has a very large capacity but lasts only a fraction of a second, allowing for **rapid scanning** and detection of patterns.

Strategic use of these attributes enhances visualizations by guiding the audience's attention to key insights and making the information easier to process.

### Types of Visual Attributes
Several attributes can be manipulated to improve the effectiveness of a design:
*   **Color (Hue and Intensity):** Color can be used to highlight specific categories or signal a meaningful message, such as using red to draw attention to high-risk issues. **Intensity** (dark vs. light) naturally indicates the strength of a phenomenon, where darker shades typically represent higher values.
*   **Size:** The size of an element communicates its importance. Larger bubbles or shapes are naturally perceived as more significant, such as highlighting higher CO2 emissions with larger bubble sizes.
*   **Thickness (Line Width):** Thicker lines can reflect the relative importance of a data series, such as emphasizing current-year fundraising over last-year data.
*   **Shape and Orientation:** Deviations in shape or a slanted line in a group of straight ones will immediately stand out to the viewer.
*   **Enclosure:** Drawing a border around a specific group of objects creates a common region, focusing the audience's attention on that particular space.

### Enhancing Design Through Strategic Use
To create effective visualizations, these attributes must be applied with purpose:

*   **Creating Visual Hierarchy:** By combining attributes like color, size, and bold text, designers can build a natural order. This allows readers to perceive the most important information first, reducing the **cognitive load** required to understand the visual.
*   **Strategic Positioning:** Human attention is preconditioned to follow a **"Z" pattern**—reading from top to bottom and left to right. Therefore, the most critical information should be placed in the **top-left or center** areas of a dashboard to receive the greatest emphasis.
*   **Consistency:** Maintaining the same visual attributes across different graphics is crucial for **recall and intuitive understanding**. For instance, if a specific region is assigned the color blue in one chart, it should remain blue throughout the entire presentation to help the audience quickly relate the color to that category.
*   **Using Contrast:** Contrast is used to emphasize a particular data point, de-emphasize background information, or maintain a neutral space. A plain background often provides the best contrast for highlighting key graphics.

### Importance of Judicious Use
While visual attributes are powerful, they must be used sparingly and with intention. Overusing them can lead to **clutter** and **cognitive fatigue**, where the message becomes lost because too many elements are competing for the viewer's attention. Designers should prioritize **accuracy and simplicity** over purely aesthetic decorations to ensure the story remains credible and clear.

## 4.	What are the difference between Dimensions and Measures in tableau environment? What is a calculated field and how is it useful in enhancing the effectiveness of visuals?

While the sources do not provide a specific glossary for the Tableau user interface, they define the fundamental data concepts that tools like **Tableau** use to organise information. In such an environment, the distinction between **Dimensions** and **Measures** is based on the difference between **categorical** and **quantitative** data.

### Dimensions vs. Measures
The sources distinguish these two types of data as follows:
*   **Dimensions (Categorical Data):** These represent the variables that identify **categories**, such as departments, regions, or products. In a dashboard, these are often used for **filtering** and creating **subsets** to understand how different units are performing. Dimensions provide the **context** for your analysis, allowing you to slice data into meaningful groups, such as "sales by region".
*   **Measures (Quantitative Data):** These are the **numerical values** that you track and portray in your visuals, such as sales volume, revenue, profits, calls handled, or GDP growth. Measures are typically used for **aggregation functions** (like sum or average) to show the "how much" of a phenomenon.

### Calculated Fields
A **calculated field** (referred to in the sources as **constructing variables** or **creating metrics**) is a new data point created by performing arithmetic operations or transformations on existing raw data. This is necessary when the specific variable of interest is not "readily available" in the original dataset.

### Usefulness in Enhancing Visual Effectiveness
Constructing these custom metrics is vital for creating **actionable insights** and improving the overall effectiveness of a visualisation in several ways:
*   **Providing Context:** Raw numbers alone are often insufficient; calculated fields allow you to contextualise them against **targets, benchmarks, or goals**. For instance, showing that 7% of a target is achieved is more illustrative than just showing the raw sales figure.
*   **Enabling Deeper Analysis:** They allow for the creation of metrics like **conversion rates** (e.g., number of purchases divided by total visits) or **rates of growth**, which can reveal trends that absolute numbers might miss.
*   **Simplifying the Narrative:** By calculating a single metric—such as the "unmet gap" in manpower planning—you can use a visual (like a stacked bar with a negative axis) to intuitively drive home a complex point.
*   **Supporting Interaction:** Custom metrics enable the **drill-down** functionality in dashboards, allowing users to move from aggregate trends to specific operational details to perform **root cause analysis**.

  
## 5.	What is use of subplots and when are they used is visualizations? How do you generate subplots in python environment (mentioning the syntax code for generating subplots is sufficient)

Subplots are used in visualisations to present multiple data series together in a single snapshot, allowing for **simultaneous comparison** across different variables. They are particularly useful when you want to observe different phenomena (such as temperature, precipitation, and wind) that share a **common axis**—most often a shared x-axis like a date range—even if their y-axis scales differ.

### When to Use Subplots
*   **Common Axis Comparison**: When multiple variables relate to the same independent variable (e.g., time), subplots allow you to compare their performance in the same vertical or horizontal section of the graph.
*   **Visualising Fluctuations**: They help in understanding how different categories fluctuate relative to one another, such as seeing that precipitation generally decreases when temperatures are high.
*   **Shared Scale Analysis**: They can be used to share a y-axis when comparing target achievements across different regions or products.
*   **Alternative to Small Multiples**: Subplots function similarly to "small multiples," dividing a graph based on a particular attribute to avoid clutter while enabling group comparisons.

### Generating Subplots in Python
In the Python environment (using the **Matplotlib** library), subplots are generated by defining a grid of rows and columns. The indexing for these subplots starts at **0**.

**Syntax Example:**
To create a grid (for example, 3 rows and 1 column) with a shared x-axis, the following syntax is used:

```python
# Create the figure and axis objects
fig, ax = plt.subplots(3, 1, sharex=True)

# Plotting on specific subplots using indices
ax.plot(data_x, data_y1, color='red')   # First subplot
ax.plot(data_x, data_y2, color='blue')  # Second subplot
ax.plot(data_x, data_y3, color='green') # Third subplot
```

## 6.	How is mathplotlib different from seaborn library in python environment – highlight the key differences between them
In the Python environment, **Matplotlib** and **Seaborn** are both powerful libraries for data visualisation, but they differ significantly in their level of abstraction, ease of use, and default aesthetics.

The key differences between them include:

### 1. Hierarchy and Relationship
*   **Matplotlib** is the fundamental, open-source plotting library within the Python ecosystem. It was originally inspired by the MATLAB environment.
*   **Seaborn** is an advanced visualisation library that is **built on top of Matplotlib**. It leverages Matplotlib’s underlying power while providing a more high-level interface.

### 2. Level of Abstraction and Coding Effort
*   **Matplotlib** is a **low-level library**, meaning it requires more lines of code to create and customise a plot. The user must manually define elements such as figures, axes, "spines" (the borders of the plotting area), and legends.
*   **Seaborn** provides **high-level functions** that simplify complex visualisations. It is designed to create attractive statistical graphics with significantly less code, often handling the "heavy lifting" of data aggregation and mapping internally.

### 3. Aesthetics and Default Styling
*   **Matplotlib** defaults to basic, "bland" styles. To make a graph visually appealing, the user must manually invoke **style sheets** (like the '538' template) or manually adjust colors, line widths, and grid settings.
*   **Seaborn** comes with **pre-established templates** and styles, such as `whitegrid`, which provide a professional and polished look by default.

### 4. Specialised Plot Types
*   While Matplotlib excels at native, basic plots like histograms, bar charts, and line graphs, **Seaborn** is often preferred for **advanced statistical plots**.
*   The sources highlight that Seaborn is particularly useful for creating complex multivariate visualisations such as **swarm plots** (which plot every individual data point), **joint plots**, and **pair plots**.

### 5. Integration with Data Frames
*   **Matplotlib** can work with various data types but often requires the user to explicitly define the X and Y variables from an array or list.
*   **Seaborn** is highly integrated with **Pandas data frames**, making it easier to parse structured data directly into a visual format.

In summary, **Matplotlib** offers ultimate **granular control** for those who want to customise every specific element of a graph, while **Seaborn** offers a **streamlined, aesthetically pleasing** approach for rapid statistical exploration and storytelling.

## 7.	What is role of filter in powerbi environment and how do they help in dashboard design?
In the **Power BI** environment—and in dashboard design more broadly—filters are a critical component of **interactivity**, allowing creators to transform static data into a dynamic, "reader-driven" experience. 

### **Role of Filters in Power BI**
Within a tool like Power BI, which is a menu-driven, low-code utility, filters serve several fundamental roles:

*   **Creating Subsets and Partitions:** Filtering is the third stage of the data visualisation process. It allows the user to reorient data based on specific attributes (such as gender or region) to focus on what is most important for a particular analysis.
*   **Enabling Drill-Downs:** Filters power the "drill-down" functionality, which allows users to move from aggregate, high-level KPIs to granular, operational details. For example, a user might filter by a specific region and then drill down to see the performance of individual stores or products within that region.
*   **Facilitating Root Cause Analysis:** By allowing users to isolate variables, filters help identify the reasons behind specific trends or anomalies discovered during the "mining" phase of analysis. 
*   **Managing Data Complexity:** Dashboards often condense complex datasets (e.g., growth rates across 183 countries) into single-screen summaries. Filters allow users to manage this complexity by selecting only the specific groups, such as "low-income countries" or "Southeast Asia," that they wish to examine.

### **How Filters Help in Dashboard Design**
Strategic use of filters enhances the effectiveness and usability of a dashboard in the following ways:

*   **Balancing Author and Reader Perspectives:** Filters allow a dashboard to be a hybrid narrative. The author provides the initial structure and key visuals, while the filters give the reader the flexibility to build their own story and own the resulting insights.
*   **Reducing Cognitive Load:** Instead of cluttering a single screen with every possible data point, designers can use filters to keep the interface "small, concise, and clear". Users only see the information they need at that moment, which prevents "cognitive fatigue".
*   **Supporting Multi-Level Decision-Making:** Filters allow a single dashboard to serve different audiences. A strategic manager can look at aggregate monthly trends, while an operational team can use the same dashboard to filter for "real-time" daily patterns in specific units.
*   **Improving Context and Narrative:** Filters help set the context for data. For example, a user might select a "flood" filter on a natural disaster dashboard, causing bars to update and pop-ups to provide specific details for that disaster type, making the estimation of quantities intuitive and immediate.

**Caution in Design:** Analysts must be careful with the **order of filtering**, as the sequence of drill-downs can unintentionally bias the audience toward a particular conclusion. Designers should ensure the data pipeline is efficient so that using filters does not result in high "latency," which can break the chain between insight and action.
