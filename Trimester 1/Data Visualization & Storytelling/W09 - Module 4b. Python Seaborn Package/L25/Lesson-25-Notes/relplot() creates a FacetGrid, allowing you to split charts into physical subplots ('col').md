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
