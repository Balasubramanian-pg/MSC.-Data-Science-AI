---
title: W10 - Module 4c. Python Bokeh package - Module 4c. Python Bokeh package
module: Statistical Modelling And Inferencing
week: W10 - Module 4c. Python Bokeh package - Module 4c. Python Bokeh package
---

Here is a technical document created from the transcript, designed for self-paced learning.

## [Technical Document: Decorating Visuals in Bokeh](./Technical%20Document%20-%20Decorating%20Visuals%20in%20Bokeh.md)

## [1. Learning Objectives](./1.%20Learning%20Objectives.md)

## [2. Prerequisites & Setup](./2.%20Prerequisites%20%26%20Setup.md)

## [3. Colors in Bokeh](./3.%20Colors%20in%20Bokeh.md)

## [4. Code Structure & Execution](./4.%20Code%20Structure%20%26%20Execution.md)

## [Data being used in the demonstration](./Data%20being%20used%20in%20the%20demonstration.md)

## [STEP 1: Import](./STEP%201%20-%20Import.md)

## [STEP 2: Prepare data](./STEP%202%20-%20Prepare%20data.md)

## [STEP 3: Create figure](./STEP%203%20-%20Create%20figure.md)

## [STEP 4: Add glyphs (visual elements)](./STEP%204%20-%20Add%20glyphs%20%28visual%20elements%29.md)

## [STEP 5: Display](./STEP%205%20-%20Display.md)

## [5. Customization Categories](./5.%20Customization%20Categories.md)

## [6. Key Bokeh vs. Matplotlib/Seaborn Differences](./6.%20Key%20Bokeh%20vs.%20MatplotlibSeaborn%20Differences.md)

## [7. Practice Exercise](./7.%20Practice%20Exercise.md)

## [Task: Create a colored bar chart of fruit counts](./Task%20-%20Create%20a%20colored%20bar%20chart%20of%20fruit%20counts.md)

## [1. Import figure and show](./1.%20Import%20figure%20and%20show.md)

## [2. Create fruit names and count data](./2.%20Create%20fruit%20names%20and%20count%20data.md)

## [3. Define a list of different colors (use at least two different color formats)](./3.%20Define%20a%20list%20of%20different%20colors%20%28use%20at%20least%20two%20different%20color%20formats%29.md)

## [4. Create a figure with fruit names on x-axis](./4.%20Create%20a%20figure%20with%20fruit%20names%20on%20x-axis.md)

## [5. Add vertical bars with your colors](./5.%20Add%20vertical%20bars%20with%20your%20colors.md)

## [6. Display the plot using show()](./6.%20Display%20the%20plot%20using%20show%28%29.md)

## [8. Common Errors & Troubleshooting](./8.%20Common%20Errors%20%26%20Troubleshooting.md)

## [9. Next Steps (Preview)](./9.%20Next%20Steps%20%28Preview%29.md)

## [10. Reference: Color Format Quick Guide](./10.%20Reference%20-%20Color%20Format%20Quick%20Guide.md)

## [All THREE formats work in Bokeh - use whichever is convenient](./All%20THREE%20formats%20work%20in%20Bokeh%20-%20use%20whichever%20is%20convenient.md)

## [Option 1: Named color (easiest for common colors)](./Option%201%20-%20Named%20color%20%28easiest%20for%20common%20colors%29.md)

## [Option 2: Hexadecimal (good for exact web colors)](./Option%202%20-%20Hexadecimal%20%28good%20for%20exact%20web%20colors%29.md)

## [Option 3: RGB tuple (good for programmatic generation)](./Option%203%20-%20RGB%20tuple%20%28good%20for%20programmatic%20generation%29.md)

## [Option 4: RGBA tuple (use when transparency is needed)](./Option%204%20-%20RGBA%20tuple%20%28use%20when%20transparency%20is%20needed%29.md)

## [Core Idea](./Core%20Idea.md)

## [Basic Bokeh Bar Chart](./Basic%20Bokeh%20Bar%20Chart.md)

## [Define figure](./Define%20figure.md)

## [Create vertical bars](./Create%20vertical%20bars.md)

## [What `x_range=fruits` Does](./What%20%60x_range%3Dfruits%60%20Does.md)

## [Understanding `vbar()`](./Understanding%20%60vbar%28%29%60.md)

## [Parameters](./Parameters.md)

## [How Color Works in Bokeh](./How%20Color%20Works%20in%20Bokeh.md)

## [1. Named Colors](./1.%20Named%20Colors.md)

## [RGB Tuple Colors](./RGB%20Tuple%20Colors.md)

## [RGB Color Intuition](./RGB%20Color%20Intuition.md)

## [Example](./Example.md)

## [RGBA: Adding Transparency](./RGBA%20-%20Adding%20Transparency.md)

## [Lower Transparency](./Lower%20Transparency.md)

## [Visual Intuition](./Visual%20Intuition.md)

## [Hexadecimal Colors](./Hexadecimal%20Colors.md)

## [Structure](./Structure.md)

## [Full Example](./Full%20Example.md)

## [Engineering Insight](./Engineering%20Insight.md)

## [Useful Cases](./Useful%20Cases.md)

## [Common Mistakes](./Common%20Mistakes.md)

## [Mistake 1](./Mistake%201.md)

## [Mistake 2](./Mistake%202.md)

## [Mistake 3](./Mistake%203.md)

## [Mental Model](./Mental%20Model.md)

## [Important Concept](./Important%20Concept.md)

## [Big Picture](./Big%20Picture.md)

## [What the Instructor is Building](./What%20the%20Instructor%20is%20Building.md)

## [Imports](./Imports.md)

## [Why Each Library Is Used](./Why%20Each%20Library%20Is%20Used.md)

## [Figure Setup](./Figure%20Setup.md)

## [Important Concept: Figure Object](./Important%20Concept%20-%20Figure%20Object.md)

## [Synthetic Data Generation](./Synthetic%20Data%20Generation.md)

## [Understanding `np.random.randint()`](./Understanding%20%60np.random.randint%28%29%60.md)

## [Why Size = 12?](./Why%20Size%20%3D%2012.md)

## [Creating the DataFrame](./Creating%20the%20DataFrame.md)

## [Why Use a DataFrame?](./Why%20Use%20a%20DataFrame.md)

## [Visual Properties in Bokeh](./Visual%20Properties%20in%20Bokeh.md)

## [1. Text Properties](./1.%20Text%20Properties.md)

## [Common Text Properties](./Common%20Text%20Properties.md)

## [2. Line Properties](./2.%20Line%20Properties.md)

## [Line Dash Types](./Line%20Dash%20Types.md)

## [3. Fill Properties](./3.%20Fill%20Properties.md)

## [Important Distinction](./Important%20Distinction.md)

## [4. Hatch Properties](./4.%20Hatch%20Properties.md)

## [Hatch Styling](./Hatch%20Styling.md)

## [Why Hatch Patterns Matter](./Why%20Hatch%20Patterns%20Matter.md)

## [Full Example Combining Properties](./Full%20Example%20Combining%20Properties.md)

## [Generate random data](./Generate%20random%20data.md)

## [Create figure](./Create%20figure.md)

## [Add bars](./Add%20bars.md)

## [Text styling](./Text%20styling.md)

## [Common Beginner Mistakes](./Common%20Beginner%20Mistakes.md)

## [Mistake 1: Confusing Fill vs Line](./Mistake%201%20-%20Confusing%20Fill%20vs%20Line.md)

## [Mistake 2: Alpha Overuse](./Mistake%202%20-%20Alpha%20Overuse.md)

## [Mistake 3: Excessive Styling](./Mistake%203%20-%20Excessive%20Styling.md)

## [Important Design Principle](./Important%20Design%20Principle.md)

## [Step-by-Step Breakdown](./Step-by-Step%20Breakdown.md)

## [1. Creating the DataFrame](./1.%20Creating%20the%20DataFrame.md)

## [Important Concept: Index](./Important%20Concept%20-%20Index.md)

## [Extracting Columns](./Extracting%20Columns.md)

## [Key Bokeh Pattern](./Key%20Bokeh%20Pattern.md)

## [Breaking This Down](./Breaking%20This%20Down.md)

## [Another Example](./Another%20Example.md)

## [Visual Hierarchy](./Visual%20Hierarchy.md)

## [Understanding `"1.2em"`](./Understanding%20%601.2em%60.md)

## [Meaning](./Meaning.md)

## [Why Use Relative Units?](./Why%20Use%20Relative%20Units.md)

## [Creating the Line Plot](./Creating%20the%20Line%20Plot.md)

## [Important Insight](./Important%20Insight.md)

## [Glyph = Renderable Visual Object](./Glyph%20%3D%20Renderable%20Visual%20Object.md)

## [Why This Matters](./Why%20This%20Matters.md)

## [Understanding Layering](./Understanding%20Layering.md)

## [Visual Model](./Visual%20Model.md)

## [Example of Combined Plot](./Example%20of%20Combined%20Plot.md)

## [Data](./Data.md)

## [Variables](./Variables.md)

## [Figure](./Figure.md)

## [Title customization](./Title%20customization.md)

## [Line glyph](./Line%20glyph.md)

## [Bar glyph](./Bar%20glyph.md)

## [Hatch Pattern Insight](./Hatch%20Pattern%20Insight.md)

## [Transparency (`alpha`)](./Transparency%20%28%60alpha%60%29.md)

## [Why Transparency Is Powerful](./Why%20Transparency%20Is%20Powerful.md)

## [Common Jupyter Notebook Problem](./Common%20Jupyter%20Notebook%20Problem.md)

## [Good Practice](./Good%20Practice.md)

## [The Most Important Takeaway](./The%20Most%20Important%20Takeaway.md)

## [Deep Insight](./Deep%20Insight.md)

## [Two Ways to Configure a Plot](./Two%20Ways%20to%20Configure%20a%20Plot.md)

## [Method 1: Configure Inside `figure()`](./Method%201%20-%20Configure%20Inside%20%60figure%28%29%60.md)

## [Method 2: Configure After Creation](./Method%202%20-%20Configure%20After%20Creation.md)

## [Core Architectural Pattern](./Core%20Architectural%20Pattern.md)

## [Visual Interpretation](./Visual%20Interpretation.md)

## [Important Difference](./Important%20Difference.md)

## [Plot Styling Properties](./Plot%20Styling%20Properties.md)

## [Visualization Layers](./Visualization%20Layers.md)

## [Plot Height and Width](./Plot%20Height%20and%20Width.md)

## [Outline Styling](./Outline%20Styling.md)

## [Border Width](./Border%20Width.md)

## [Border Transparency](./Border%20Transparency.md)

## [Background Fill](./Background%20Fill.md)

## [Removing Grid Lines](./Removing%20Grid%20Lines.md)

## [Understanding the Hierarchy](./Understanding%20the%20Hierarchy.md)

## [Setting `None`](./Setting%20%60None%60.md)

## [Why Remove Grid Lines?](./Why%20Remove%20Grid%20Lines.md)

## [Edward Tufte Principle](./Edward%20Tufte%20Principle.md)

## [Scatter Plot](./Scatter%20Plot.md)

## [Scatter Plot Logic](./Scatter%20Plot%20Logic.md)

## [`size=10`](./%60size%3D10%60.md)

## [Create empty figure](./Create%20empty%20figure.md)

## [Plot dimensions](./Plot%20dimensions.md)

## [Border styling](./Border%20styling.md)

## [Background styling](./Background%20styling.md)

## [Remove grid lines](./Remove%20grid%20lines.md)

## [Scatter plot](./Scatter%20plot.md)

## [Engineering Analogy](./Engineering%20Analogy.md)

## [Mistake 1: Overstyling](./Mistake%201%20-%20Overstyling.md)

## [Mistake 2: Removing All Grids](./Mistake%202%20-%20Removing%20All%20Grids.md)

## [Mistake 3: Confusing Plot vs Glyph Styling](./Mistake%203%20-%20Confusing%20Plot%20vs%20Glyph%20Styling.md)

## [Most Important Takeaway](./Most%20Important%20Takeaway.md)

## [Key Concept](./Key%20Concept.md)

## [Important Idea](./Important%20Idea.md)

## [What Is a Glyph?](./What%20Is%20a%20Glyph.md)

## [Important Clarification](./Important%20Clarification.md)

## [Basic Example](./Basic%20Example.md)

## [Understanding the Parameters](./Understanding%20the%20Parameters.md)

## [Coordinates](./Coordinates.md)

## [Marker Size](./Marker%20Size.md)

## [Fill Color](./Fill%20Color.md)

## [Line Color](./Line%20Color.md)

## [Important Bokeh Design Principle](./Important%20Bokeh%20Design%20Principle.md)

## [This Is the Big Idea](./This%20Is%20the%20Big%20Idea.md)

## [Object Flow](./Object%20Flow.md)

## [Styling During Creation](./Styling%20During%20Creation.md)

## [Alternative: Style After Creation](./Alternative%20-%20Style%20After%20Creation.md)

## [Why?](./Why.md)

## [Internal Structure](./Internal%20Structure.md)

## [Accessing Glyph Properties](./Accessing%20Glyph%20Properties.md)

## [Why the `.glyph` Layer Exists](./Why%20the%20%60.glyph%60%20Layer%20Exists.md)

## [Example of Dynamic Modification](./Example%20of%20Dynamic%20Modification.md)

## [Modify later](./Modify%20later.md)

## [Engineering Parallel](./Engineering%20Parallel.md)

## [Fill vs Line Properties](./Fill%20vs%20Line%20Properties.md)

## [Common Beginner Confusion](./Common%20Beginner%20Confusion.md)

## [Important Design Philosophy](./Important%20Design%20Philosophy.md)

## [Hidden Lesson in This Section](./Hidden%20Lesson%20in%20This%20Section.md)

## [Part 1: Editing Glyphs After Creation](./Part%201%20-%20Editing%20Glyphs%20After%20Creation.md)

## [Initial Circle Glyph](./Initial%20Circle%20Glyph.md)

## [Dynamic Modification](./Dynamic%20Modification.md)

## [What Happens Internally?](./What%20Happens%20Internally.md)

## [Then Border Change](./Then%20Border%20Change.md)

## [Important Architectural Idea](./Important%20Architectural%20Idea.md)

## [Core Pattern](./Core%20Pattern.md)

## [General Form](./General%20Form.md)

## [Common Editable Properties](./Common%20Editable%20Properties.md)

## [Important Software Engineering Insight](./Important%20Software%20Engineering%20Insight.md)

## [Part 2: Axis Customization](./Part%202%20-%20Axis%20Customization.md)

## [The Instructor Mentions "True Zero"](./The%20Instructor%20Mentions%20True%20Zero.md)

## [Why True Zero Matters](./Why%20True%20Zero%20Matters.md)

## [This Is a Common Visualization Manipulation Technique](./This%20Is%20a%20Common%20Visualization%20Manipulation%20Technique.md)

## [Important Principle](./Important%20Principle.md)

## [Axis Customization in Bokeh](./Axis%20Customization%20in%20Bokeh.md)

## [Basic Line Plot](./Basic%20Line%20Plot.md)

## [Axis Objects in Bokeh](./Axis%20Objects%20in%20Bokeh.md)

## [Common Axis Properties](./Common%20Axis%20Properties.md)

## [Styling Axis Lines](./Styling%20Axis%20Lines.md)

## [Styling Tick Labels](./Styling%20Tick%20Labels.md)

## [Grid Customization](./Grid%20Customization.md)

## [Why Grid Styling Matters](./Why%20Grid%20Styling%20Matters.md)

## [Professional Visualization Principle](./Professional%20Visualization%20Principle.md)

## [Full Axis Styling Example](./Full%20Axis%20Styling%20Example.md)

## [Line graph](./Line%20graph.md)

## [Axis labels](./Axis%20labels.md)

## [Axis styling](./Axis%20styling.md)

## [Tick styling](./Tick%20styling.md)
