# Note: Great for digital presentations, but has limitations in Black & White printouts.

plt.figure(figsize=(12, 6))

sns.lineplot(
    data=fmri_df,
    x="timepoint",
    y="signal",
    hue="region",    # Separates data into different colors (Parietal vs Frontal)
    style="event",   # Separates data into different line patterns (Stimulus vs Cue)
    markers=True,    # Adds clean markers to each individual data point
    dashes=True      # Renders explicit dash styles for accessibility
)

plt.title("Multidimensional fMRI Trends: Split by Region (Color) & Event (Pattern)", fontsize=14, pad=15)
plt.xlabel("Timepoint")
plt.ylabel("Signal Strength")
