# solid line and a 95% Confidence Interval (CI) as a shaded band around it.

plt.figure(figsize=(8, 4.5))

sns.lineplot(data=fmri_df, x="timepoint", y="signal", color="teal", linewidth=2)

plt.title("fMRI Signal Continuity Over Time (Aggregated Mean + 95% CI)")
plt.xlabel("Timepoint")
plt.ylabel("Signal Intensity")
plt.show()
