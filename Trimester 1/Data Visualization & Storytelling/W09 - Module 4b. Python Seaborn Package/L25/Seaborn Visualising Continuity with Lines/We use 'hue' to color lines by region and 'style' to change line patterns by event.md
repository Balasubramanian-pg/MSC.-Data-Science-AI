# We use 'hue' to color lines by region and 'style' to change line patterns by event.

plt.figure(figsize=(8, 4.5))

sns.lineplot(
    data=fmri_df,
    x="timepoint",
    y="signal",
    hue="region",  # Visualizes categories by color
    style="event",  # Visualizes categories by line pattern (solid vs dashed)
    markers=True,  # Adds specific points/dots on top of the continuous lines
    dashes=True,
)

plt.title("fMRI Trends Split by Region and Event Type")
plt.xlabel("Timepoint")
plt.ylabel("Signal Intensity")
