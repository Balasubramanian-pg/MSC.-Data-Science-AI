# (columns/rows) for a crystal-clear side-by-side trend comparison.

grid_plot = sns.relplot(
    data=fmri_df,
    x="timepoint",
    y="signal",
    hue="event",
    col="region",  # Creates a distinct subplot column for each unique 'region'
    kind="line",  # Explicitly tells Seaborn to draw a line plot instead of scatter
    height=4.5,
    aspect=1.2,
)
