# categories into distinct subplot columns, we drastically reduce the audience's mental processing effort.

grid = sns.relplot(
    data=fmri_df,
    x="timepoint",
    y="signal",
    hue="event",     # Keep color focused only on the Event type
    col="region",    # Create individual physical columns for each brain region (Parietal vs Frontal)
    kind="line",     # Specify that we are building relational line graphs
    height=5,
    aspect=1.2,
    linewidth=2.5
)
