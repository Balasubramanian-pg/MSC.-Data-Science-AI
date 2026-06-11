---
title: W10 - Module 4c. Python Bokeh package
module: Statistical Modelling And Inferencing
week: W10 - Module 4c. Python Bokeh package
---

## Categorical Data and Bar Charts in Bokeh

This final section introduces one of the most important visualization concepts:

```text
Categorical data visualization
```

Until now:

- x-axis contained continuous numeric values
    

Now:

- x-axis contains categories
    

Examples:

- fruits
    
- gender
    
- smoker/non-smoker
    
- weekdays
    
- product types
    

This changes how Bokeh handles the axis internally.

---

## Continuous vs Categorical Axes

## Continuous Axis

Used for:

- line plots
    
- scatter plots
    
- time series
    

Example:

```text
1, 2, 3, 4, 5
```

Bokeh interprets:

- distances numerically
    

---

## Categorical Axis

Used for:

- bar charts
    
- grouped comparisons
    

Example:

```text
["Apple", "Pear", "Plum"]
```

Now:

- spacing is symbolic
    
- not numerical
    

---

## Why Bar Charts Exist

Bar charts are designed to compare:

- quantities across categories
    

Good for:

- comparisons
    
- rankings
    
- frequencies
    
- counts
    

Bad for:

- continuous trends
    
- temporal continuity
    

---

## Fruit Dataset

The transcript defines:

```python
fruits = [
    "Apples",
    "Pears",
    "Plums",
    "Grapes",
    "Nectarines",
    "Strawberries"
]

counts = [5, 3, 4, 2, 6, 7]
```

---

## Understanding the Data

|Fruit|Count|
|---|---|
|Apples|5|
|Pears|3|
|Plums|4|
|Grapes|2|
|Nectarines|6|
|Strawberries|7|

---

## Key Concept: Categories

The transcript correctly says:

> "Each fruit is a category"

This is important.

Categories are:

- labels
    
- groups
    
- discrete entities
    

not continuous measurements.

---

## Why `x_range` Matters

This is the most important technical concept in this section.

The transcript uses:

```python
x_range=fruits
```

inside `figure()`.

---

## What `x_range` Does

It tells Bokeh:

```text
"Treat the x-axis as categorical."
```

Without this:

- Bokeh expects numeric coordinates.
    

---

## Important Architectural Insight

When using categorical data:

```python
figure(x_range=fruits)
```

creates:

- a categorical coordinate system
    

instead of:

- a numeric coordinate system
    

---

## Mental Model

## Numeric Axis

```text
0 --- 1 --- 2 --- 3
```

Distance matters.

---

## Categorical Axis

```text
Apple   Pear   Plum
```

Order matters.  
Distance does not.

---

## Complete Bar Chart Example

```python
from bokeh.plotting import figure, show
from bokeh.io import output_notebook

output_notebook()

fruits = [
    "Apples",
    "Pears",
    "Plums",
    "Grapes",
    "Nectarines",
    "Strawberries"
]

counts = [5, 3, 4, 2, 6, 7]

## Create categorical figure
p = figure(
    x_range=fruits,
    height=350,
    title="Fruit Counts",
    x_axis_label="Fruit Type",
    y_axis_label="Count"
)

## Vertical bar chart
p.vbar(
    x=fruits,
    top=counts,
    width=0.6,
    color="firebrick"
)

show(p)
```

---

## Understanding `vbar()`

The transcript uses:

```python
p.vbar(...)
```

This means:

- vertical bar chart
    

---

## Important Parameters

|Parameter|Meaning|
|---|---|
|x|category labels|
|top|bar heights|
|width|bar thickness|
|color|bar color|

---

## Understanding `top`

```python
top=counts
```

means:

- top edge of each bar
    

Bar starts at:

- y = 0
    

ends at:

- y = count value
    

---

## Visual Intuition

```text
7 |                    █
6 |              █     █
5 | █            █     █
4 | █      █     █     █
3 | █  █   █     █     █
2 | █  █   █  █  █     █
1 | █  █   █  █  █     █
  +-------------------------
    A  P   Pl G  N     S
```

---

## Why `width` Matters

The transcript uses:

```python
width=0.6
```

Controls:

- bar thickness
    

---

## Width Interpretation

|Width|Result|
|---|---|
|0.2|thin bars|
|0.6|balanced|
|1.0|touching bars|

---

## Why Color Matters

Transcript uses:

```python
color="firebrick"
```

Bokeh supports:

- named colors
    
- hex colors
    

---

## Why Bar Charts Are Powerful

Bar charts are extremely effective because humans compare:

- lengths
    
- heights
    

very accurately.

This makes bar charts excellent for:

- category comparison
    

---

## Business Intelligence Connection

Bar charts dominate BI dashboards because they answer:

```text
"Which category is bigger?"
```

Examples:

- sales by region
    
- customers by segment
    
- profit by product
    
- flights by airline
    

---

## Seaborn Connection

The transcript references:

- smoker vs non-smoker
    
- restaurant visits
    
- gender
    
- day/time
    

These are categorical variables.

---

## Typical Categorical Variables

|Variable|Categories|
|---|---|
|Gender|Male/Female|
|Smoker|Yes/No|
|Day|Mon/Tue/Wed|
|Product|A/B/C|

---

## Why Categorical Data Needs Different Handling

Numeric axes assume:

- arithmetic relationships
    

But categories do not support:

- subtraction
    
- interpolation
    
- continuity
    

Example:

```text
Apple - Pear
```

has no mathematical meaning.

---

## Internal Bokeh Representation

When using:

```python
x_range=fruits
```

Bokeh internally creates:

```text
FactorRange
```

This manages:

- category ordering
    
- spacing
    
- rendering
    

---

## Important Insight About Ordering

Transcript says:

> "They have to be in a particular order"

Correct.

Categorical order affects interpretation.

Different orders tell different stories.

---

## Example Orders

## Alphabetical

```text
Apple
Grape
Pear
```

---

## Frequency-Based

```text
Most common → least common
```

Usually more insightful.

---

## Combining Categorical + Numerical

Bar charts are fundamentally:

```text
Category
    →
Numerical aggregation
```

---

## Common Beginner Mistakes

## Forgetting `x_range`

Wrong:

```python
figure()
```

with string categories often fails or behaves incorrectly.

---

## Mismatched Data Lengths

Wrong:

```python
fruits = ["A", "B"]
counts = [1]
```

Must match lengths.

---

## Too Many Categories

Bar charts become unreadable with:

- 100+ categories
    

Alternatives:

- grouping
    
- filtering
    
- treemaps
    

---

## Random Color Usage

Avoid assigning random colors without meaning.

---

## Advanced Insight

Bokeh bar charts are glyph-based too.

Internally:

```text
vbar()
   ↓
Rectangular glyph renderer
```

Everything in Bokeh is still:

- glyph rendering
    

even bars.

---

## Machine Learning Connection

Categorical visualization is heavily used in ML for:

- class distributions
    
- feature analysis
    
- imbalance detection
    
- confusion matrices
    

---

## Mental Model

```text
Categories
    ↓
Categorical Axis
    ↓
Bar Glyphs
    ↓
Interactive Comparison
```

---

## Most Important Concept Here

The key idea is:

```text
x_range converts the axis
from continuous
to categorical.
```

That is the architectural shift enabling categorical plotting.

---

## Final Takeaways

## Core Workflow

```python
p = figure(x_range=categories)

p.vbar(
    x=categories,
    top=values
)

show(p)
```

---

## Important Concepts

|Concept|Meaning|
|---|---|
|x_range|categorical axis|
|vbar|vertical bar glyph|
|top|bar height|
|width|bar thickness|

---

## Key Visualization Principle

Use:

- line/scatter plots for continuous relationships
    
- bar charts for categorical comparisons
    

because they encode information differently and support different types of reasoning.

Tags: #statistics #machine-learning #data-science #statistical-modelling