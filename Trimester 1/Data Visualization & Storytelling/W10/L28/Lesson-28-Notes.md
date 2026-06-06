Here is a comprehensive, heavily documented master script based on your Lesson 28 notes. To fulfill your request to make the documentation "as big as you can," I have transformed the raw snippets into a fully annotated, production-ready tutorial format.

Every single function, method, and parameter is explained in detail using Python docstrings, inline comments, and Markdown blocks.

# Master Guide: Interactive Graphics & Storytelling with Bokeh

This document serves as a complete, self-contained reference guide to building interactive visualizations using `bokeh.plotting`. The code is divided into logical modules, progressing from basic line charts to advanced data structures and interactive transformations.

### **Prerequisites & Setup**

Before running these examples, ensure you have the necessary libraries installed:

Bash

```
pip install bokeh pandas numpy
```

## 🟢 Module 1: Foundations of Bokeh & Simple Line Plots

The core workflow in Bokeh consists of three steps:

1. Initialize a blank canvas (`figure`).
    
2. Add geometric shapes/markers called "glyphs" (`line`, `circle`, `vbar`).
    
3. Render the output (`show`).
    

```Python
# ==========================================
# MODULE 1: BASIC LINE PLOTTING
# ==========================================

# output_notebook is used to render plots directly in Jupyter notebooks.
# If you are running this in a standard Python script, you would import 
# output_file and call output_file("filename.html") instead.
from bokeh.io import output_notebook
from bokeh.plotting import figure, show

# Initialize the notebook output mode
output_notebook()  

def create_basic_line_plot():
    """
    Creates and displays a basic line plot using raw Python lists.
    Demonstrates figure instantiation, adding a line glyph, and basic styling.
    """
    # STEP 1: Create the figure (the canvas)
    # We define the dimensions (height/width) and add a descriptive title.
    p = figure(
        height=300, 
        width=300, 
        title="Basic Line Plot"
    )

    # STEP 2: Prepare the data
    # Standard Python lists representing X and Y coordinates
    x_coords = [1, 2, 3, 4, 5]
    y_coords = [6, 7, 2, 1, 5]

    # STEP 3: Add the glyph (line)
    # We bind the data to the line glyph and apply aesthetic formatting.
    p.line(
        x=x_coords, 
        y=y_coords,
        legend_label="Series 1", # Adds an entry to the legend
        line_width=2,            # Thickness of the line in pixels
        line_color="red",        # Color of the line
    )

    # STEP 4: Render the plot
    show(p)

# Execute the function to see the plot
create_basic_line_plot()
```

## 🟢 Module 2: Integrating Pandas DataFrames

In real-world data science, data is rarely stored in raw lists. Bokeh integrates seamlessly with Pandas DataFrames.



```Python
# ==========================================
# MODULE 2: DATAFRAMES & LINE PLOTS
# ==========================================
import pandas as pd
from bokeh.plotting import figure, show

def create_dataframe_line_plot():
    """
    Generates a line chart plotting monthly airline passengers using a Pandas DataFrame.
    Demonstrates extracting indices and columns for x/y coordinates.
    """
    # Generate a list of months (1 through 12)
    months = list(range(1, 13))
    
    # Raw data representing passengers in millions
    passengers_in_millions = [35.1, 38.4, 45.2, 51.0, 58.9, 63.1, 65.4, 64.9, 59.3, 55.1, 52.8, 54.6]

    # Construct the Pandas DataFrame
    monthly_values_df = pd.DataFrame(
        data={"passengers": passengers_in_millions},
        index=months
    )
    # Name the index for clarity
    monthly_values_df.index.name = "month"

    # Initialize the figure with a wider aspect ratio (600 width)
    p = figure(
        height=300,
        width=600,
        title="Domestic Airline Passengers (2021)",
    )

    # Extract X (index) and Y (passengers column) from the DataFrame
    x = monthly_values_df.index
    y = monthly_values_df["passengers"]

    # Add the line glyph to the figure
    p.line(
        x, y, 
        legend_label="Passengers", 
        line_width=3, 
        line_color="blue"
    )

    # Display the plot
    show(p)

create_dataframe_line_plot()
```

## 🟢 Module 3: Scatter Plots and Markers

Sometimes a line isn't enough; you need to see the exact data points. Bokeh allows you to layer multiple glyphs on the same figure (e.g., lines _and_ scatter points).


```Python
# ==========================================
# MODULE 3: SCATTER PLOTS & GLYPH LAYERING
# ==========================================
from bokeh.plotting import figure, show

def create_layered_scatter_plot():
    """
    Demonstrates layering multiple glyphs (a line and a scatter marker) 
    on the exact same set of coordinates to highlight specific data points.
    """
    # Create the base canvas
    p = figure(height=300, width=400, title="Layered Line & Scatter")

    # Data coordinates
    x = [1, 2, 3, 4, 5]
    y = [6, 7, 2, 1, 5]

    # Layer 1: The connecting line
    p.line(x, y)

    # Layer 2: The scatter markers placed directly on top of the line points
    # alpha controls transparency (0.0 is invisible, 1.0 is solid)
    p.scatter(
        x, y, 
        size=15,               # Size of the marker
        color="red",           # Fill and outline color
        alpha=0.5,             # 50% opacity
        marker="circle_dot"    # Specific marker style (others: square, triangle, asterisk)
    )

    # Display the final composite image
    show(p)

create_layered_scatter_plot()
```

## 🟢 Module 4: Categorical Bar Charts

When dealing with non-numeric X-axes (like names, categories, or labels), Bokeh requires you to explicitly define the `x_range` during the `figure()` instantiation.


```Python
# ==========================================
# MODULE 4: CATEGORICAL DATA (vbar)
# ==========================================
import pandas as pd
from bokeh.plotting import figure, show

def create_categorical_bar_chart():
    """
    Builds a vertical bar chart from categorical data extracted from a DataFrame.
    Demonstrates x_range setup and axis label formatting.
    """
    # Dataset representing top airlines and passenger volume
    top_airlines = {
        "unique_carrier_name": [
            "Southwest Airlines", "American Airlines", "Delta Air Lines",
            "United Airlines", "SkyWest Airlines", "Alaska Airlines",
            "Spirit Airlines", "JetBlue Airways", "Frontier Airlines", "Republic Airline"
        ],
        "passengers": [11.5, 10.8, 9.9, 9.1, 7.6, 5.4, 5.1, 4.8, 3.9, 3.5]
    }

    # Convert to DataFrame
    airlines_by_passengers_df = pd.DataFrame(top_airlines)

    # CRITICAL STEP FOR CATEGORICAL AXES:
    # We must pass the categorical labels to the 'x_range' parameter of the figure.
    # Here we pass the first 10 carrier names.
    p = figure(
        x_range=airlines_by_passengers_df["unique_carrier_name"][:10],
        title="Top 10 carriers by passengers (domestic routes)",
        height=300,
        width=600,
    )

    # Add the vertical bar ('vbar') glyph
    p.vbar(
        x=airlines_by_passengers_df["unique_carrier_name"],
        top=airlines_by_passengers_df["passengers"],
        width=0.6,                 # Width of the bars (1.0 means bars touch)
        legend_label="Passengers",
        color="firebrick"          # Setting a nice visual color
    )

    # FORMATTING: Rotate the X-axis labels so long airline names don't overlap
    # 0.8 radians is approximately 45 degrees
    p.xaxis.major_label_orientation = 0.8  

    # Display the chart
    show(p)

create_categorical_bar_chart()
```

## 🟢 Module 5: The ColumnDataSource & Interactivity

The `ColumnDataSource` (CDS) is the fundamental data structure in Bokeh. It standardizes data mapping so that multiple glyphs and interactive tools (like the `HoverTool`) can all read from a single, unified source of truth.

```Python
# ==========================================
# MODULE 5: ColumnDataSource & HoverTool
# ==========================================
from bokeh.plotting import figure, show
from bokeh.models import ColumnDataSource, HoverTool

def create_interactive_hover_plot():
    """
    Introduces the ColumnDataSource (CDS) and the HoverTool.
    Instead of passing raw arrays to glyphs, we map them via a CDS.
    """
    # STEP 1: Construct the ColumnDataSource
    # A CDS is essentially a dictionary where keys are column names, 
    # and values are equal-length lists/arrays of data.
    source = ColumnDataSource(
        data=dict(
            x_vals=[1, 2, 3, 4, 5],
            y_vals=[2, 5, 8, 2, 7],
            descriptions=["Point A", "Point B", "Point C", "Point D", "Point E"],
        )
    )

    # STEP 2: Initialize figure
    p = figure(height=300, title="Interactive Hover Tool Example")

    # STEP 3: Draw glyphs using the CDS
    # We tell Bokeh: "Use 'source' for data. Look for 'x_vals' for the X coordinate."
    p.circle(
        x="x_vals", 
        y="y_vals", 
        size=20, 
        source=source # Connecting the glyph to our CDS
    )

    # STEP 4: Configure the HoverTool
    # The '@' symbol tells Bokeh to look up that column name in the ColumnDataSource.
    # The '$' symbol refers to special variables inherent to the plot (like the row index).
    hover = HoverTool(
        tooltips=[
            ("Row Index", "$index"),             # Shows the index number of the data point
            ("Coordinates (x, y)", "(@x_vals, @y_vals)"), # Pulls exact x/y values
            ("Label", "@descriptions"),          # Pulls custom text from the 'descriptions' column
        ]
    )

    # STEP 5: Add the configured tool to the figure
    p.add_tools(hover)

    # Render
    show(p)

create_interactive_hover_plot()
```

## 🟢 Module 6: Advanced Layouts - Stacked Bars

Visualizing parts-to-whole relationships over time is easily achieved using Bokeh's `vbar_stack` method.


```Python
# ==========================================
# MODULE 6: STACKED BAR CHARTS
# ==========================================
import pandas as pd
import numpy as np
from bokeh.plotting import figure, show
from bokeh.models import ColumnDataSource
from bokeh.palettes import HighContrast3 # Importing a pre-built color palette

def create_stacked_bar_chart():
    """
    Generates a stacked bar chart showing three categories (freight, passengers, mail) 
    stacked on top of each other over 12 months.
    """
    # Generate synthetic mock data for 12 months
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    data = {
        'month_name': months,
        'passengers': np.random.randint(1000, 5000, size=12),
        'freight': np.random.randint(500, 2000, size=12),
        'mail': np.random.randint(100, 500, size=12),
    }

    # Convert to DataFrame, then directly into a ColumnDataSource
    monthly_values_df = pd.DataFrame(data)
    source = ColumnDataSource(monthly_values_df)

    # Setup the figure (Remember: pass the categorical range!)
    p = figure(
        x_range=source.data["month_name"],
        width=750,
        title="Monthly Transportation Values (Stacked)",
    )

    # Define the columns we want to stack vertically
    columns_to_stack = ["freight", "passengers", "mail"]

    # Draw the stacked bars
    p.vbar_stack(
        stackers=columns_to_stack, # The data columns to stack
        x="month_name",            # The categorical x-axis column
        width=0.9,                 # Bar width
        source=source,             # Our linked dataset
        color=HighContrast3,       # Map the 3 columns to 3 high-contrast colors
        legend_label=columns_to_stack,
    )

    # Move the legend so it doesn't cover the data points
    p.legend.location = "top_left"

    show(p)

create_stacked_bar_chart()
```

## 🟢 Module 7: On-the-fly Transformations

Bokeh allows you to perform calculations directly inside the plotting function without altering your underlying DataFrame, using modules like `cumsum` (cumulative sum) and `linear_cmap` (color mapping).


```Python
# ==========================================
# MODULE 7: DATA TRANSFORMATIONS
# ==========================================
import numpy as np
from bokeh.plotting import figure, show
from bokeh.transform import linear_cmap

def create_color_mapped_scatter():
    """
    Demonstrates using linear_cmap to automatically assign colors to scatter points 
    based on the numeric value of their X-coordinate.
    """
    # Generate random data: 2000 points
    N = 2000
    source = dict(
        x=np.random.random(size=N) * 100,  # X coordinates from 0 to 100
        y=np.random.random(size=N) * 100,  # Y coordinates from 0 to 100
        r=np.random.random(size=N) * 1.5,  # Random radii for the circles
    )

    # Create canvas
    p = figure(height=300, title="Color Mapped Scatter by X-Value")

    # Add circle glyphs
    p.circle(
        x="x",
        y="y",
        radius="r",
        source=source,
        fill_alpha=0.6, # Make points slightly transparent to see overlaps
        # linear_cmap transformation:
        # 1. Field to check: "x"
        # 2. Palette: "Viridis256" (a continuous color scale)
        # 3. Min value: 0 (maps to start of palette)
        # 4. Max value: 100 (maps to end of palette)
        color=linear_cmap("x", "Viridis256", 0, 100), 
    )

    show(p)

create_color_mapped_scatter()
```