# Set an overall master title above all subplots

grid_plot.fig.suptitle(
    "Side-by-Side Trend Analysis across Regions", y=1.05, fontsize=14
)

plt.show()
```

### 4. Cheat Sheet: `lineplot` vs `relplot`

| **Command**                    | **What it is**            | **Primary Use Case**                                                                                                                                           |
| ------------------------------ | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`sns.lineplot()`**           | **Axes-level** function   | Draws a single line chart on a standard Matplotlib canvas. Best for simple overlays.                                                                           |
| **`sns.relplot(kind="line")`** | **Figure-level** function | Wraps `lineplot` into a grid layout. Best when you want to use the `col` or `row` parameters to automatically split your trendlines into independent subplots. |
  
Based on your transcript, the lecturer is explaining a critical data science concept: **Cognitive Load Reduction** using Seaborn's high-level statistical features.

When visualizing multiple dimensions (Time, Signal, Region, and Event), putting everything on one graph can overwhelm an audience. Seaborn offers two distinct ways to handle this extra dimensionality: **Aesthetic Overlay** (using `hue` and `style`) and **Faceting / Small Multiples** (using `relplot` with columns/rows).

Here is the fully refactored, production-grade Python code that maps perfectly to this transcript, complete with professional documentation.
