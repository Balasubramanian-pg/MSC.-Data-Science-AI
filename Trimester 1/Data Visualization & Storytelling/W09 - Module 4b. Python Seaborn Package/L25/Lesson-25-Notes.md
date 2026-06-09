---
title: W09 - Module 4b. Python Seaborn Package
module: Statistical Modelling And Inferencing
week: W09 - Module 4b. Python Seaborn Package
---

Here is a clean, production-ready, and well-documented version of your notes.

I have organized the code into a logical, executable structure using a mock dataset so you can run it instantly. The documentation relies on **clean code practices** (meaningful variables, clear comments) and explicitly highlights **why** we choose one library over the other for specific tasks.

## Refactored & Documented Visualization Guide

```python
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns

# =====================================================================
# 0. SETUP: Create Mock Data for Demonstration
# =====================================================================
# Setting a seed ensures the random data is reproducible every time you run it
np.random.seed(42)

mock_data = {
    "study_hours": np.random.uniform(1, 10, 50),
    "exam_score": np.random.randint(50, 100, 50),
    "course": np.random.choice(["Math", "Physics", "Chemistry"], 50),
}
df = pd.DataFrame(mock_data)

# Apply Seaborn's default aesthetic theme globally for cleaner visuals
sns.set_theme(style="darkgrid")


# =====================================================================
# 1 & 2. Basic Syntax & Core Philosophical Differences
# =====================================================================

# --- Approach A: Matplotlib (Low-level, Explicit, Array-based) ---
# Matplotlib requires you to pass the exact data arrays/Series directly.
plt.figure(figsize=(6, 4))
plt.scatter(df["study_hours"], df["exam_score"], color="royalblue", alpha=0.7)
plt.title("Matplotlib: Explicit & Array-Based")
plt.xlabel("Study Hours")
plt.ylabel("Exam Score")
plt.show()

# --- Approach B: Seaborn (High-level, Declarative, DataFrame-aware) ---
# Seaborn maps variables directly to DataFrame column names using the `data` argument.
plt.figure(figsize=(6, 4))
sns.scatterplot(data=df, x="study_hours", y="exam_score", color="teal")
plt.title("Seaborn: Declarative & DataFrame-Aware")
plt.xlabel("Study Hours")
plt.ylabel("Exam Score")
plt.show()


# =====================================================================
# 3 & 4. Aesthetics & Statistical Aggregation
# =====================================================================

# --- Approach A: Matplotlib (Requires manual data aggregation) ---
# To plot categorical means in Matplotlib, you must calculate them manually first.
plt.figure(figsize=(6, 4))
course_means = df.groupby("course")["exam_score"].mean()

plt.bar(
    course_means.index,
    course_means.values,
    color="lightcoral",
    edgecolor="black",
)
plt.title("Matplotlib: Manual Aggregation (Mean Only)")
plt.xlabel("Course")
plt.ylabel("Mean Exam Score")
plt.show()

# --- Approach B: Seaborn (Automated Statistical Inference) ---
# Seaborn automatically calculates the mean AND adds a 95% Confidence Interval (CI) error bar.
plt.figure(figsize=(6, 4))
sns.barplot(data=df, x="course", y="exam_score", palette="muted")
plt.title("Seaborn: Automatic Mean + 95% Confidence Intervals")
plt.xlabel("Course")
plt.ylabel("Exam Score")
plt.show()


# =====================================================================
# 5. Hybrid Approach: Combining Seaborn and Matplotlib
# =====================================================================
# Best Practice: Use Seaborn for complex data plotting, use Matplotlib for fine-tuning layout/annotations.
plt.figure(figsize=(6, 4))

# 1. Draw the core statistical plot with Seaborn
sns.boxplot(data=df, x="course", y="exam_score", palette="Pastel1")

# 2. Use Matplotlib to overlay custom reference lines and titles
overall_mean = df["exam_score"].mean()
plt.axhline(
    overall_mean,
    color="crimson",
    linestyle="--",
    linewidth=1.5,
    label=f"Overall Mean ({overall_mean:.1f})",
)

plt.title("Exam Scores by Course (with Overall Mean Reference)")
plt.xlabel("Course")
plt.ylabel("Exam Score")
plt.legend(loc="lower left")  # Displays the label we assigned to plt.axhline
plt.show()


# =====================================================================
# 6. Advanced Multidimensional Faceting (Using Built-in fMRI Data)
# =====================================================================
# Load real-world time-series data
fmri = sns.load_dataset("fmri")

# --- Example 6a: Basic Line Plot ---
# Seaborn automatically aggregates multiple data points per timepoint into a mean line + CI band
plt.figure(figsize=(7, 4))
sns.lineplot(data=fmri, x="timepoint", y="signal", color="purple")
plt.title("fMRI Signal Over Time (Aggregated with CI)")
plt.show()

# --- Example 6b: Mapping Extra Dimensions (Color & Style) ---
# 'hue' splits data by color; 'style' splits data by line dashes/markers
plt.figure(figsize=(7, 4))
sns.lineplot(
    data=fmri, x="timepoint", y="signal", hue="region", style="event"
)
plt.title("fMRI Signal: Split by Region (Color) & Event (Style)")
plt.legend(bbox_to_anchor=(1.05, 1), loc="upper left")  # Move legend outside plot
plt.tight_layout()
plt.show()

# --- Example 6c: Grid Faceting using Figure-level Functions ---
# relplot() creates a FacetGrid, allowing you to split charts into physical subplots ('col')
g = sns.relplot(
    data=fmri,
    x="timepoint",
    y="signal",
    hue="event",
    col="region",  # Creates a separate column/subplot for each unique region
    kind="line",
    height=4,
    aspect=1.2,
)
g.fig.suptitle(
    "Multi-plot Faceting: fMRI Signal by Region", y=1.05
)  # y=1.05 pushes title slightly up
plt.show()
```

## Key Takeaways Cheatsheet

|**Feature**|**Matplotlib (plt)**|**Seaborn (sns)**|
|---|---|---|
|**Abstraction Level**|Low-level (Control over every pixel)|High-level (Focus on data relationships)|
|**Data Format**|Arrays, Lists, or Pandas Series|Pandas DataFrames (`data=df, x='col'`)|
|**Aesthetics**|Basic, utilitarian defaults|Modern, professionally designed themes|
|**Statistical Power**|None. You must group/aggregate data manually|Built-in (auto-computes Means, CIs, Regressions)|
|**Best Used For...**|Final layout tweeks, custom annotations, canvas setups|Quick data exploration, complex statistical grids|

Tags: #statistics #machine-learning #data-science #statistical-modelling