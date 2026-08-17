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
6.	How is mathplotlib different from seaborn library in python environment – highlight the key differences between them
7.	What is role of filter in powerbi environment and how do they help in dashboard design?

