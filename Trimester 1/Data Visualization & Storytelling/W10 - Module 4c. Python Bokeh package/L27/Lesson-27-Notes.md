---
title: W10 - Module 4c. Python Bokeh package
module: Statistical Modelling And Inferencing
week: W10 - Module 4c. Python Bokeh package
---

Here is a clean, production-ready, and fully documented version of your Lesson 27 notes.

The original notes had a few broken syntax issues (such as `x2` and `x3` instead of proper Python exponents `x2` and `x3`). This refactored version fixes those errors, organizes the concepts logically, adds explicit comments detailing _why_ certain methods are used, and includes a comprehensive cheat sheet for your study reference.

## Refactored & Documented Bokeh Visualization Guide

```Python
import numpy as np
import pandas as pd
from datetime import date
from bokeh.io import output_notebook, show
from bokeh.plotting import figure
from bokeh.models import DateRangeSlider
from bokeh.layouts import row, column, gridplot

# =====================================================================
# 1. INITIALIZATION
# =====================================================================
# Call this once per notebook session to prepare the client-side 
# JavaScript library (BokehJS) to render interactive output inline.
output_notebook()


# =====================================================================
# 2. SECTIONS 7 & 8: Layered Glyph Architecture & Interactive Legends
# =====================================================================
# Preparing base coordinate matrices
x_vals = [1, 2, 3, 4, 5]
y_vals_main = [2, 5, 8, 2, 7]
y_vals_offset = [1, 4, 7, 1, 6]  # Varied data for structural contrast

# Initialize the main canvas object using the high-level plotting interface
p = figure(
    title="Layered Glyphs with Multi-Type Markers",
    x_axis_label="Independent Axis (X)",
    y_axis_label="Dependent Outcome (Y)",
    width=650,
    height=400,
    tools="pan,box_zoom,wheel_zoom,reset,save" # Explicitly defining toolbar capabilities
)

# Render Layer 1: Continuous line glyph acting as a structural trend indicator
p.line(
    x_vals, y_vals_main, 
    line_width=2, 
    color="teal", 
    legend_label="Trendline"
)

# Render Layer 2: Circle markers overlaid precisely on top of the main data points
p.circle(
    x_vals, y_vals_main, 
    size=10, 
    color="red", 
    alpha=0.8, 
    legend_label="Primary Node"
)

# Render Layer 3: Square markers mapped to a secondary distribution stream
p.square(
    x_vals, y_vals_offset, 
    size=12, 
    color="navy", 
    alpha=0.5, 
    legend_label="Baseline Offset"
)

# Audience Control Narrative: Turn the legend items into interactive toggle switches.
# 'hide' will vanish the corresponding glyph layer when clicked; can also be set to 'mute'.
p.legend.click_policy = "hide"
p.legend.location = "top_left"

# Deploy canvas components to the browser window
show(p)


# =====================================================================
# 3. SECTION 9: Interactive UI Widgets (Standalone Layer)
# =====================================================================
# Using concrete python 'date' objects prevents string interpretation errors
date_range_slider = DateRangeSlider(
    title="Temporal Filter Range",
    start=date(2022, 7, 1),
    end=date(2023, 3, 31),
    value=(date(2022, 10, 1), date(2022, 12, 31)),
    width=400
)

show(date_range_slider)


# =====================================================================
# 4. SECTION 10: Advanced Document Layout Architecture
# =====================================================================
# --- Example A: Side-by-Side Function Multiplots (Row Layout) ---
x_curve = np.linspace(0, 10, 100)

# FIX: Corrected original notes math text syntax errors (x2 / x3) to explicit Python operators (**2 / **3)
y_quadratic = x_curve ** 2
y_cubic = x_curve ** 3

# Configure Canvas A
p_quad = figure(title="Quadratic Trend (x²)", width=300, height=300, tools="pan,reset")
p_quad.line(x_curve, y_quadratic, color="blue", line_width=3)

# Configure Canvas B
p_cube = figure(title="Cubic Trend (x³)", width=300, height=300, tools="pan,reset")
p_cube.line(x_curve, y_cubic, color="green", line_width=3)

# Arrange horizontally as an integrated sub-layout row row array
function_dashboard = row(p_quad, p_cube)
show(function_dashboard)


# --- Example B: Heterogeneous Distribution Metrics (Grid Layout) ---
x_scatter = list(range(11))
dist_0 = x_scatter
dist_1 = [10 - i for i in x_scatter]
dist_2 = [abs(i - 5) for i in x_scatter]

# Using shared styling dictionary arguments to optimize setup clutter
canvas_config = dict(width=220, height=220, background_fill_color="#fafafa", tools="wheel_zoom,reset")

s1 = figure(title="Linear Vector", **canvas_config)
s1.scatter(x_scatter, dist_0, size=12, color="#53777a", alpha=0.8, marker="circle")

s2 = figure(title="Inverse Vector", **canvas_config)
s2.scatter(x_scatter, dist_1, size=12, color="#c02942", alpha=0.8, marker="triangle")

s3 = figure(title="Modulus Center", **canvas_config)
s3.scatter(x_scatter, dist_2, size=12, color="#d95b43", alpha=0.8, marker="square")

# gridplot organizes elements seamlessly into balanced matrices automatically handling layout padding
metric_matrix = gridplot([[s1, s2], [s3, None]]) # Subplot position [1,1] intentionally left blank
show(metric_matrix)
```

## Architectural Deep-Dive & Cheat Sheet

### 1. Data Pipeline Pipeline Mechanism

Unlike static rendering engines (such as Matplotlib and Seaborn) that push flattened images to the frontend, Bokeh creates a two-tier application stack:

- **The Python Context:** You define the structural business logic, data scopes, glyph overlays, canvas parameters, and widget dimensions. This architecture state is automatically serialized into a **JSON schema payload**.
    
- **The Browser JavaScript Client Context:** The built-in client framework, **BokehJS**, directly ingests that JSON package data stream and tracks canvas vectors instantly onto an interactive web-native HTML5 viewport.
    

### 2. Interface Selection Blueprint

|**Feature Matrix**|**High-Level Plotting (bokeh.plotting)**|**Low-Level Models (bokeh.models)**|
|---|---|---|
|**Operational Purpose**|Fast, general-use, descriptive dashboard creation.|Explicit custom widget, tool, or component tailoring.|
|**API Code Footprint**|Extremely compact and familiar if transitioning from Matplotlib/Seaborn.|Highly verbose; requires individual object instantiation layouts.|
|**Design Automations**|Default color groupings, anti-aliasing text, and auto-ranged axes fields are handled automatically.|Zero defaults. You must explicitly build out every axes range, scale, and grid matrix parameter manual block by manual block.|

### 3. Toolbar Engines Glossary

- **`pan`**: Allows the user to click and drag across the plot canvas to shift the viewport focus range along $x$ or $y$ parameters seamlessly.
    
- **`box_zoom`**: Lets the operator specify a custom bounding rectangle area to magnifying target subsections into immediate, sharp view.
    
- **`wheel_zoom`**: Binds standard trackpad scrolling actions or mouse wheels directly to expanding or shrinking the current axes dimensions incrementally.
    
- **`reset`**: Automatically drops any user transformations or scale changes, snapping all plot components instantly back to the baseline configuration parameters.

Bokeh is a Python library used to create interactive visualizations inside web browsers.

Unlike Matplotlib, which mainly creates static charts, Bokeh creates charts that users can:

- zoom
    
- pan
    
- hover
    
- hide/show data
    
- interact with
    

Source:

# Basic Flow

Bokeh works like this:

```text
Python Code
    ↓
Bokeh converts plot into JSON
    ↓
BokehJS (JavaScript)
    ↓
Browser renders interactive graph
```

Source:

# Step 1: Install Bokeh

```python
pip install bokeh
```

Source:

# Step 2: Enable Notebook Rendering

```python
from bokeh.io import output_notebook

output_notebook()
```

Why?

Bokeh graphs run using browser rendering.

`output_notebook()` initializes Bokeh inside Jupyter Notebook.

Without this:

- plots may not display properly
    

Source:

# Step 3: Create a Figure

A figure is the plotting area.

```python
from bokeh.plotting import figure

p = figure(title="My First Plot")
```

Think of `figure()` as:

- chart canvas
    
- graph container
    

Everything gets added onto this figure.

# Step 4: Add Glyphs

A glyph is a visual representation of data.

Examples:

- line
    
- circle
    
- square
    
- bar
    

Source:

# Example: Line Glyph

```python
from bokeh.plotting import figure, show
from bokeh.io import output_notebook

output_notebook()

# Create figure
p = figure(title="Simple Line Plot")

# Data
x = [1, 2, 3, 4, 5]
y = [2, 5, 8, 2, 7]

# Add line glyph
p.line(x, y, line_width=2)

# Display plot
show(p)
```

# What Happens Internally

```text
figure()
    creates plot area

p.line()
    adds visual layer

show()
    renders browser visualization
```

# Important Interactive Tools

Bokeh automatically provides tools like:

- zoom
    
- pan
    
- reset
    
- save
    

Source:

# Example

```python
p = figure(
    title="Interactive Plot",
    tools="pan,wheel_zoom,box_zoom,reset,save"
)
```

# Tool Meaning

|Tool|Purpose|
|---|---|
|pan|move graph|
|wheel_zoom|mouse zoom|
|box_zoom|drag-to-zoom|
|reset|restore original|
|save|export image|

# Multiple Glyphs

You can overlay multiple visual layers.

Source:

# Example

```python
from bokeh.plotting import figure, show

x_vals = [1, 2, 3, 4, 5]

p = figure(title="Multiple Glyphs")

# Line
p.line(
    x_vals,
    [2, 5, 8, 2, 7],
    line_width=2,
    legend_label="Line"
)

# Circles
p.circle(
    x_vals,
    [2, 5, 8, 2, 7],
    size=10,
    color="red",
    legend_label="Circles"
)

# Squares
p.square(
    x_vals,
    [1, 4, 7, 1, 6],
    size=12,
    color="navy",
    legend_label="Squares"
)

show(p)
```

# Why Multiple Glyphs Matter

This allows:

- trends
    
- observations
    
- forecasts
    
- anomalies
    

to exist in the same chart.

# Legend Interactivity

Bokeh legends can become clickable.

```python
p.legend.click_policy = "hide"
```

Source:

Now users can:

- hide circles
    
- hide squares
    
- show only lines
    

This is extremely useful in dashboards.

# Widgets

Widgets are UI controls.

Examples:

- sliders
    
- dropdowns
    
- date pickers
    

Source:

# Date Slider Example

```python
from bokeh.models import DateRangeSlider
from bokeh.io import show

date_slider = DateRangeSlider(
    value=("2022-10-01", "2022-12-31"),
    start="2022-07-01",
    end="2023-03-31"
)

show(date_slider)
```

# Why Widgets Matter

Users can interact with data dynamically.

Example:

- select quarter
    
- filter dates
    
- explore trends
    

without changing code.

# Layouts

Layouts organize multiple plots together.

Source:

# Row Layout

```python
from bokeh.layouts import row

show(row(plot1, plot2, plot3))
```

Result:

```text
[Plot1] [Plot2] [Plot3]
```

# Column Layout

```python
from bokeh.layouts import column

show(column(plot1, plot2))
```

Result:

```text
[Plot1]
[Plot2]
```

# Full Example

```python
from bokeh.plotting import figure, show
from bokeh.layouts import row

x = list(range(11))

y0 = x
y1 = [10 - i for i in x]
y2 = [abs(i - 5) for i in x]

# First plot
s1 = figure(width=250, height=250)
s1.scatter(x, y0)

# Second plot
s2 = figure(width=250, height=250)
s2.scatter(x, y1)

# Third plot
s3 = figure(width=250, height=250)
s3.scatter(x, y2)

# Arrange horizontally
show(row(s1, s2, s3))
```

# What This Produces

Three interactive plots displayed side-by-side.

Useful for:

- comparisons
    
- dashboards
    
- monitoring systems
    

# High-Level vs Low-Level APIs

Bokeh has two major interfaces.

Source:

## High-Level

```python
from bokeh.plotting import figure
```

Easy to use.  
Most people use this.

## Low-Level

```python
from bokeh.models import *
```

Used for:

- deep customization
    
- advanced dashboards
    
- widget logic
    

# Core Mental Model

```text
Data
  ↓
Figure
  ↓
Glyphs
  ↓
Interactivity
  ↓
Widgets
  ↓
Layouts
  ↓
Dashboard
```

# Most Important Difference From Matplotlib

Matplotlib mindset:

```text
Create static chart
```

Bokeh mindset:

```text
Create interactive browser application
```

That is the real conceptual shift.

Source:

Tags: #statistics #machine-learning #data-science #statistical-modelling