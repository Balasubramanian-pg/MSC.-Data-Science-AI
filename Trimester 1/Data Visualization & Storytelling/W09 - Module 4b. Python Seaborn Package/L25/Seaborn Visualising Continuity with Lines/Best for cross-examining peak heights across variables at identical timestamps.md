# Best for cross-examining peak heights across variables at identical timestamps.

col_grid = sns.relplot(data=fmri_df, x="timepoint", y="signal", hue="event", col="region", kind="line")
