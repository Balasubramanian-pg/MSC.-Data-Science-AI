# Seaborn automatically aggregates multiple data points per timepoint into a mean line + CI band

plt.figure(figsize=(7, 4))
sns.lineplot(data=fmri, x="timepoint", y="signal", color="purple")
plt.title("fMRI Signal Over Time (Aggregated with CI)")
plt.show()
