# Apply global title architecture across the complete Figure grid

grid.fig.suptitle("fMRI Signal Comparison Across Brain Regions (Faceted View)", y=1.05, fontsize=16, fontweight='bold')
grid.set_axis_labels("Timepoint", "Signal Strength")

plt.show()
```

### 3. Structural Variations: Columns vs. Rows in Faceting

As explicitly highlighted in the transcript, you can dynamically alter how your subplots are mathematically arranged on the canvas by tweaking the orientation parameters inside `sns.relplot()`:

Python

```
