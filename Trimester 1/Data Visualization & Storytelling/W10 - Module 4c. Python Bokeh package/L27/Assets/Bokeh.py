## =====================================================================
## 1. INSTALLATION & ENVIRONMENT SETUP
## =====================================================================
## In a Colab/Jupyter cell, you would run: !pip install bokeh

import numpy as np
import pandas as pd
from bokeh.io import output_notebook, show
from bokeh.plotting import figure

## CRITICAL: Initialize the corporate workspace inside your notebook browser.
## This ensures BokehJS loads correctly to render interactive elements.
output_notebook()

## =====================================================================
## 2. GENERATING DATA
## =====================================================================
np.random.seed(42)
x_data = np.linspace(0, 10, 50)
y_data = np.sin(x_data) + np.random.normal(0, 0.1, 50)

## =====================================================================
## 3. HIGH-LEVEL BOKEH PLOTTING INTERFACE
## =====================================================================

## Step A: Initialize the Figure object (Defines canvas size and default tools)
## Bokeh automatically adds web tools like Pan, Box Zoom, Wheel Zoom, Reset, and Save.
p = figure(
    title="Interactive Wave Patterns (Author-Driven Baseline)",
    x_axis_label="Time Interval",
    y_axis_label="Signal Value",
    width=700,
    height=400,
    tools="pan,box_zoom,wheel_zoom,reset,save,hover"
)

## Step B: Render Glyphs (Geometric data markers)
## Adding a continuous trendline
p.line(x_data, y_data, legend_label="Trend", line_width=2, line_color="navy")

## Overlaying individual scatter points that the audience can interact with
p.circle(x_data, y_data, legend_label="Data Points", size=8, color="orange", alpha=0.7)

## Step C: Style layout properties
p.legend.location = "top_right"
p.title.text_font_size = "14pt"

## Step D: Deploy the plot to the browser canvas
show(p)
