---
title: W08 - Moduel 4a.  Python Matplotlib (Continued)
module: Statistical Modelling And Inferencing
week: W08 - Moduel 4a.  Python Matplotlib (Continued)
---

This section explains how to create multiple related plots from a Pandas DataFrame using Matplotlib subplots, especially when the plots share the same time axis.

# Core Idea

You already have a DataFrame called `df.weather` that contains weather data for Seattle:

- date
    
- maximum temperature
    
- minimum temperature
    
- precipitation
    
- wind
    

The transcript first shows plotting a single variable like precipitation, then moves to plotting multiple variables together using subplots.

# Step 1: Plot a Single Column

Example:

```python
df.weather['precipitation'].plot(
    color='blue',
    title='Daily Precipitation in Seattle'
)

plt.ylabel('Precipitation (mm)')
plt.xlabel('Date')
plt.show()
```

This creates:

- X-axis → date
    
- Y-axis → precipitation
    
- Blue line → rainfall trend over time
    

The important idea:

```python
df.weather['precipitation']
```

selects one column from the DataFrame.

# Why Use Blue for Rainfall?

The instructor mentions:

> “The colour of the graphic should reflect the mood of the data.”

This is a visualization principle:

|Data Type|Typical Color|
|---|---|
|Rainfall|Blue|
|Heat|Red|
|Profit|Green|
|Danger/Loss|Red|

Good visualization is psychological, not just technical.

# Step 2: Problem With Separate Graphs

If you create:

- one graph for temperature
    
- one graph for rainfall
    
- one graph for wind
    

you cannot easily compare them.

The transcript moves toward:

> “I want to see the temperature variation, rainfall variation and maybe the wind variation in the same graph.”

This is where subplots become useful.

# Step 3: Shared X-Axis

All weather variables depend on the same timeline.

So:

- temperature changes over dates
    
- rainfall changes over dates
    
- wind changes over dates
    

The date axis should therefore be shared.

This is:

```python
sharex=True
```

# Creating Subplots

```python
fig, axes = plt.subplots(
    3, 1,
    sharex=True,
    figsize=(12, 8)
)
```

## Breakdown

|Part|Meaning|
|---|---|
|`3,1`|3 rows, 1 column|
|`sharex=True`|all plots use same x-axis|
|`fig`|overall figure container|
|`axes`|list of subplot axes|

The transcript explicitly explains:

> first value = rows  
> second value = columns

So:

```python
plt.subplots(3,1)
```

means:

```text
Plot 1
Plot 2
Plot 3
```

not side-by-side.

# Mental Model

Think of:

```python
fig
```

as the entire canvas.

Think of:

```python
axes
```

as individual graph slots.

Like:

```text
Figure
 ├── Axis 0
 ├── Axis 1
 └── Axis 2
```

# Step 4: Plot on Specific Axes

Example:

```python
axes[0].plot(
    df.weather.index,
    df.weather['temp_max'],
    color='crimson'
)

axes[1].plot(
    df.weather.index,
    df.weather['precipitation'],
    color='royalblue'
)

axes[2].plot(
    df.weather.index,
    df.weather['wind'],
    color='green'
)
```

# Important Python Concept: Indexing Starts at 0

The transcript emphasizes:

> “Python indexing starts with zero.”

So:

|Index|Meaning|
|---|---|
|`axes[0]`|first plot|
|`axes[1]`|second plot|
|`axes[2]`|third plot|

This is one of the biggest beginner mistakes.

# Why Use `df.weather.index`?

Earlier, the date column was set as the DataFrame index.

So:

```python
df.weather.index
```

contains:

```text
2012-01-01
2012-01-02
2012-01-03
...
```

That becomes the x-axis automatically.

# Full Example

```python
import matplotlib.pyplot as plt

fig, axes = plt.subplots(
    3, 1,
    sharex=True,
    figsize=(12, 10)
)

# Maximum temperature
axes[0].plot(
    df.weather.index,
    df.weather['temp_max'],
    color='crimson'
)

axes[0].set_title('Maximum Temperature')

# Minimum temperature
axes[1].plot(
    df.weather.index,
    df.weather['temp_min'],
    color='orange'
)

axes[1].set_title('Minimum Temperature')

# Rainfall
axes[2].plot(
    df.weather.index,
    df.weather['precipitation'],
    color='royalblue'
)

axes[2].set_title('Precipitation')

plt.tight_layout()
plt.show()
```

# What This Achieves

Now all variables align on the same timeline.

You can visually detect relationships such as:

- high temperatures → low rainfall
    
- winter → lower temperatures + higher precipitation
    
- seasonal patterns
    
- anomalies
    

The transcript explicitly mentions this insight:

> when temperatures are high, you don't have much precipitation happening

That is the real purpose of visualization:  
not drawing charts,  
but discovering relationships.

# Relation to Power BI

The instructor compares this to:

> “small multiples” in Power BI

This is correct.

Matplotlib subplots are essentially Python’s low-level version of:

- Power BI small multiples
    
- Tableau trellis charts
    
- faceting in Seaborn
    

# Engineering Insight

Why use separate y-axes but shared x-axis?

Because:

|Variable|Scale|
|---|---|
|Temperature|-5 to 30|
|Rainfall|0 to 50|
|Wind|0 to 20|

If plotted on one y-axis:

- some signals become unreadable
    
- smaller variables flatten
    

Subplots preserve clarity.

# Common Beginner Mistakes

## 1. Forgetting ShareX

Without:

```python
sharex=True
```

each subplot gets different date formatting.

Result:  
messy comparisons.

## 2. Wrong Axis Index

This fails:

```python
axes[3]
```

when only 3 plots exist.

Because valid indices are:

```python
0,1,2
```

## 3. Not Setting Datetime Index

If date isn't index:

```python
df.set_index('date', inplace=True)
```

time-series plotting becomes harder.

# Advanced Extension

You can loop dynamically instead of writing manually.

```python
columns = [
    ('temp_max', 'crimson'),
    ('temp_min', 'orange'),
    ('precipitation', 'royalblue')
]

fig, axes = plt.subplots(3,1,sharex=True)

for ax, (column, color) in zip(axes, columns):

    ax.plot(
        df.weather.index,
        df.weather[column],
        color=color
    )

    ax.set_title(column)

plt.tight_layout()
plt.show()
```

This scales much better for real dashboards.

# Key Takeaway

The important concepts here are not merely plotting.

The real lessons are:

1. DataFrames organize multivariate data
    
2. Time-series analysis requires aligned axes
    
3. Shared x-axis enables comparison
    
4. Subplots preserve readability
    
5. Visualization should reveal relationships, not decorate data
    
6. Matplotlib works at axis-level granularity
    
7. Good chart design includes semantic color choices